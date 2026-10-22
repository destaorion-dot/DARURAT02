/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { FOREIGN_NATIONS, BATTLE_EVENTS, MILESTONE_EVENTS, FULL_TIMELINE } from './data/historyData';
import { ForeignNation, BattleEvent, MilestoneEvent, LatLng, TimelineEntry } from './types/history';
import { Navbar } from './components/Navbar';
import { NationSelector } from './components/NationSelector';
import { MapContainer } from './components/MapContainer';
import { RightExplanationPanel, RightPanelMode } from './components/RightExplanationPanel';
import { Calendar, ChevronRight } from 'lucide-react';
import { playCannonBlast, playIndependenceFanfare, playShipBell, speakText, stopSpeaking } from './utils/audioEffects';

export default function App() {
  // Map and View settings
  const [currentView, setCurrentView] = useState<'indonesia' | 'global'>('indonesia');
  const [mapStyle, setMapStyle] = useState<'antique' | 'osm' | 'satellite' | 'dark'>('antique');
  const [activeFilter, setActiveFilter] = useState<'all' | 'battles' | 'milestones' | 'expeditions'>('all');
  const [focusedCoords, setFocusedCoords] = useState<LatLng | null>(null);

  // Selected Entities
  const [selectedNation, setSelectedNation] = useState<ForeignNation | null>(null);
  const [activeColonizationStepIndex, setActiveColonizationStepIndex] = useState<number | null>(null);
  const [isSailing, setIsSailing] = useState<boolean>(false);
  const [sailingProgress, setSailingProgress] = useState<number>(0);

  // Active Selected Content
  const [selectedBattle, setSelectedBattle] = useState<BattleEvent | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneEvent | null>(null);
  const [panelMode, setPanelMode] = useState<RightPanelMode>('overview');

  // PID Mode (Public Information Display / Kiosk Museum) state
  const [isPidMode, setIsPidMode] = useState<boolean>(false);
  const [pidCurrentIndex, setPidCurrentIndex] = useState<number>(0);
  const [pidIsPlaying, setPidIsPlaying] = useState<boolean>(true);
  const [pidDwellSeconds, setPidDwellSeconds] = useState<number>(8);
  const [pidProgressPercent, setPidProgressPercent] = useState<number>(0);
  const [pidVoiceNarrate, setPidVoiceNarrate] = useState<boolean>(true);
  const [isPidFullscreen, setIsPidFullscreen] = useState<boolean>(false);

  const pidIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle Fullscreen for PID
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsPidFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsPidFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsPidFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Launch Voyage Animation (Focused exclusively on Indonesian waters)
  const handleLaunchVoyage = useCallback((nation: ForeignNation) => {
    setSelectedNation(nation);
    setActiveColonizationStepIndex(null);
    setSelectedBattle(null);
    setSelectedMilestone(null);
    setPanelMode('nation');
    setCurrentView('indonesia'); // Always focus on Indonesian waters
    setIsSailing(true);
    setSailingProgress(0);
    playShipBell();
  }, []);

  const handleSailingComplete = useCallback(() => {
    setIsSailing(false);
    setSailingProgress(1);
    setCurrentView('indonesia');
    setPanelMode('nation');
  }, []);

  // Select Battle
  const handleSelectBattle = useCallback((battle: BattleEvent) => {
    setSelectedBattle(battle);
    setSelectedMilestone(null);
    setPanelMode('battle');
    setFocusedCoords(battle.coordinates);
    playCannonBlast();
  }, []);

  // Select Milestone
  const handleSelectMilestone = useCallback((milestone: MilestoneEvent) => {
    setSelectedMilestone(milestone);
    setSelectedBattle(null);
    setPanelMode('milestone');
    setFocusedCoords(milestone.coordinates);
    playIndependenceFanfare();
  }, []);

  // Select Event from Timeline or Bottom Bar
  const handleSelectTimelineEvent = useCallback((eventId: string) => {
    // Check if battle
    const battle = BATTLE_EVENTS.find((b) => b.id === eventId);
    if (battle) {
      handleSelectBattle(battle);
      return;
    }

    // Check if milestone
    const milestone = MILESTONE_EVENTS.find((m) => m.id === eventId);
    if (milestone) {
      handleSelectMilestone(milestone);
      return;
    }

    // Check nation expedition triggers
    if (eventId === 't1' || eventId === 't2' || eventId === 't4') {
      const port = FOREIGN_NATIONS.find((n) => n.id === 'portugis');
      if (port) handleLaunchVoyage(port);
      return;
    } else if (eventId === 't3') {
      const esp = FOREIGN_NATIONS.find((n) => n.id === 'spanyol');
      if (esp) handleLaunchVoyage(esp);
      return;
    } else if (eventId === 't5' || eventId === 't6' || eventId === 't8' || eventId === 't14') {
      const nld = FOREIGN_NATIONS.find((n) => n.id === 'belanda');
      if (nld) handleLaunchVoyage(nld);
      return;
    } else if (eventId === 't7' || eventId === 't16') {
      const gbr = FOREIGN_NATIONS.find((n) => n.id === 'inggris');
      if (gbr) handleLaunchVoyage(gbr);
      return;
    } else if (eventId === 't27' || eventId === 't28' || eventId === 't29') {
      const jpn = FOREIGN_NATIONS.find((n) => n.id === 'jepang');
      if (jpn) handleLaunchVoyage(jpn);
      return;
    }

    // General timeline entry
    const entry = FULL_TIMELINE.find((t) => t.id === eventId);
    if (entry) {
      setPanelMode('timeline');
    }
  }, [handleLaunchVoyage, handleSelectBattle, handleSelectMilestone]);

  // Execute PID step action (Sync map & voice)
  const executePidStep = useCallback((idx: number) => {
    const ev = FULL_TIMELINE[idx];
    if (!ev) return;

    // Check associated battle or milestone
    const battle = BATTLE_EVENTS.find((b) => b.id === ev.relatedEntityId || ev.title.includes(b.title.split(' ')[0]));
    const milestone = MILESTONE_EVENTS.find((m) => m.id === ev.relatedEntityId || ev.title.includes(m.title.split(' ')[0]));

    if (battle && battle.coordinates && !isNaN(battle.coordinates.lat) && !isNaN(battle.coordinates.lng)) {
      setFocusedCoords(battle.coordinates);
      playCannonBlast();
    } else if (milestone && milestone.coordinates && !isNaN(milestone.coordinates.lat) && !isNaN(milestone.coordinates.lng)) {
      setFocusedCoords(milestone.coordinates);
      playIndependenceFanfare();
    } else if (ev.year === '1511') {
      const port = FOREIGN_NATIONS.find((n) => n.id === 'portugis');
      if (port) handleLaunchVoyage(port);
    } else if (ev.year === '1596') {
      const nld = FOREIGN_NATIONS.find((n) => n.id === 'belanda');
      if (nld) handleLaunchVoyage(nld);
    } else if (ev.year === '8 Maret 1942') {
      const jpn = FOREIGN_NATIONS.find((n) => n.id === 'jepang');
      if (jpn) handleLaunchVoyage(jpn);
    } else if (ev.year.includes('17 Agustus 1945')) {
      setFocusedCoords({ lat: -6.2008, lng: 106.8488 });
      playIndependenceFanfare();
    }

    if (pidVoiceNarrate) {
      speakText(`${ev.year}. ${ev.title}. ${ev.summary}`);
    }
  }, [pidVoiceNarrate, handleLaunchVoyage]);

  // Handle PID Next / Prev
  const handlePidNext = useCallback(() => {
    const nextIdx = (pidCurrentIndex + 1) % FULL_TIMELINE.length;
    setPidCurrentIndex(nextIdx);
    setPidProgressPercent(0);
    executePidStep(nextIdx);
  }, [pidCurrentIndex, executePidStep]);

  const handlePidPrev = useCallback(() => {
    const prevIdx = (pidCurrentIndex - 1 + FULL_TIMELINE.length) % FULL_TIMELINE.length;
    setPidCurrentIndex(prevIdx);
    setPidProgressPercent(0);
    executePidStep(prevIdx);
  }, [pidCurrentIndex, executePidStep]);

  // Toggle PID Mode
  const handleTogglePidMode = () => {
    const nextState = !isPidMode;
    setIsPidMode(nextState);
    if (nextState) {
      setPanelMode('pid');
      executePidStep(pidCurrentIndex);
    } else {
      stopSpeaking();
      setPanelMode('overview');
    }
  };

  // PID Auto-Advance Loop
  useEffect(() => {
    if (!isPidMode || !pidIsPlaying) {
      if (pidIntervalRef.current) clearInterval(pidIntervalRef.current);
      return;
    }

    const stepMs = 100;
    const totalSteps = (pidDwellSeconds * 1000) / stepMs;
    let stepCount = 0;

    pidIntervalRef.current = setInterval(() => {
      stepCount++;
      setPidProgressPercent(Math.min((stepCount / totalSteps) * 100, 100));

      if (stepCount >= totalSteps) {
        stepCount = 0;
        setPidProgressPercent(0);
        setPidCurrentIndex((prev) => {
          const next = (prev + 1) % FULL_TIMELINE.length;
          executePidStep(next);
          return next;
        });
      }
    }, stepMs);

    return () => {
      if (pidIntervalRef.current) clearInterval(pidIntervalRef.current);
    };
  }, [isPidMode, pidIsPlaying, pidDwellSeconds, executePidStep]);

  // Bottom quick highlights
  const quickHighlights = [
    { year: '1511', label: 'Portugis Malaka', nationId: 'portugis' },
    { year: '1570', label: 'Perang Ternate', battleId: 'ternate-portugis' },
    { year: '1596', label: 'Belanda Banten', nationId: 'belanda' },
    { year: '1628', label: 'Sultan Agung Batavia', battleId: 'sultan-agung-batavia' },
    { year: '1667', label: 'Perang Makassar', battleId: 'perang-makassar' },
    { year: '1817', label: 'Kapitan Pattimura', battleId: 'perang-pattimura' },
    { year: '1825', label: 'Perang Diponegoro', battleId: 'perang-diponegoro' },
    { year: '1873', label: 'Perang Aceh', battleId: 'perang-aceh' },
    { year: '1908', label: 'Budi Utomo', milestoneId: 'budi-utomo' },
    { year: '1928', label: 'Sumpah Pemuda', milestoneId: 'sumpah-pemuda' },
    { year: '1942', label: 'Jepang Datang', nationId: 'jepang' },
    { year: '1945', label: '17 Ags: PROKLAMASI', isProclamation: true }
  ];

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-stone-950 text-stone-100 select-none">
      {/* 1. TOP HEADER: Navigation bar with all Mode choices */}
      <Navbar
        currentView={currentView}
        onToggleView={setCurrentView}
        mapStyle={mapStyle}
        onChangeMapStyle={setMapStyle}
        onOpenTimeline={() => setPanelMode('timeline')}
        onOpenProclamation={() => {
          setPanelMode('proclamation');
          setFocusedCoords({ lat: -6.2008, lng: 106.8488 });
          playIndependenceFanfare();
        }}
        activeFilter={activeFilter}
        onChangeFilter={setActiveFilter}
        isPidMode={isPidMode}
        onTogglePidMode={handleTogglePidMode}
        isFullscreen={isPidFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* 2. TOP BANNER: Foreign Nations Flags Ribbon & Quick Voyage Launcher */}
      <div className="shrink-0">
        <NationSelector
          selectedNation={selectedNation}
          onSelectNation={(n) => {
            setSelectedNation(n);
            setPanelMode('nation');
          }}
          onLaunchVoyage={handleLaunchVoyage}
          isSailing={isSailing}
          sailingProgress={sailingProgress}
          onCloseNation={() => {
            setSelectedNation(null);
            setActiveColonizationStepIndex(null);
            setIsSailing(false);
            setPanelMode('overview');
          }}
          onOpenColonizationModal={() => setPanelMode('nation')}
          activeColonizationStepIndex={activeColonizationStepIndex}
          onSelectColonizationStep={(idx) => {
            setActiveColonizationStepIndex(idx);
            if (selectedNation && selectedNation.colonizationSteps[idx]) {
              setFocusedCoords(selectedNation.colonizationSteps[idx].coordinates);
            }
          }}
        />
      </div>

      {/* 3. MAIN SPLIT DISPLAY: 3/4 Map on the Left + 1/4 Explanation on the Right (Tanpa Scroll Halaman) */}
      <main className="flex-1 min-h-0 flex flex-col lg:flex-row relative overflow-hidden">
        {/* LEFT 3/4: Large, Clean, Unobstructed Map of Indonesia & Oceans */}
        <section className="flex-1 lg:w-3/4 h-full min-h-0 relative overflow-hidden border-r border-stone-800">
          <MapContainer
            currentView={currentView}
            mapStyle={mapStyle}
            activeFilter={activeFilter}
            selectedNation={selectedNation}
            activeColonizationStepIndex={activeColonizationStepIndex}
            isSailing={isSailing}
            onSailingComplete={handleSailingComplete}
            onSailingProgress={setSailingProgress}
            battles={BATTLE_EVENTS}
            milestones={MILESTONE_EVENTS}
            onSelectBattle={handleSelectBattle}
            onSelectMilestone={handleSelectMilestone}
            focusedCoords={focusedCoords}
            onResetFocus={() => setFocusedCoords(null)}
          />
        </section>

        {/* RIGHT 1/4: Dedicated Historical Explanation Panel */}
        <RightExplanationPanel
          mode={panelMode}
          onSetMode={setPanelMode}
          selectedBattle={selectedBattle}
          selectedMilestone={selectedMilestone}
          selectedNation={selectedNation}
          activeColonizationStepIndex={activeColonizationStepIndex}
          onSelectColonizationStep={(idx) => {
            setActiveColonizationStepIndex(idx);
            if (selectedNation && selectedNation.colonizationSteps[idx]) {
              setFocusedCoords(selectedNation.colonizationSteps[idx].coordinates);
            }
          }}
          onLaunchVoyage={handleLaunchVoyage}
          isSailing={isSailing}
          sailingProgress={sailingProgress}
          onFocusMap={(coords) => setFocusedCoords(coords)}
          isPidActive={isPidMode}
          pidCurrentEvent={FULL_TIMELINE[pidCurrentIndex] || null}
          pidCurrentIndex={pidCurrentIndex}
          pidTotalEvents={FULL_TIMELINE.length}
          pidIsPlaying={pidIsPlaying}
          pidProgressPercent={pidProgressPercent}
          pidDwellSeconds={pidDwellSeconds}
          onPidTogglePlay={() => {
            if (pidIsPlaying) stopSpeaking();
            setPidIsPlaying(!pidIsPlaying);
          }}
          onPidNext={handlePidNext}
          onPidPrev={handlePidPrev}
          onPidChangeDwell={(sec) => setPidDwellSeconds(sec)}
          pidVoiceNarrate={pidVoiceNarrate}
          onPidToggleVoice={() => {
            const next = !pidVoiceNarrate;
            setPidVoiceNarrate(next);
            if (!next) stopSpeaking();
          }}
          onPidToggleFullscreen={handleToggleFullscreen}
          isPidFullscreen={isPidFullscreen}
          onClosePid={() => {
            setIsPidMode(false);
            stopSpeaking();
            setPanelMode('overview');
          }}
          onSelectTimelineItem={handleSelectTimelineEvent}
        />
      </main>

      {/* 4. BOTTOM QUICK TIMELINE RIBBON */}
      <footer className="h-11 bg-stone-950 border-t border-stone-800 px-3 sm:px-6 flex items-center justify-between text-xs z-20 shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none w-full">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            Tonggak Penting:
          </span>

          <div className="flex items-center gap-1.5 shrink-0">
            {quickHighlights.map((hl, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (hl.isProclamation) {
                    setPanelMode('proclamation');
                    setFocusedCoords({ lat: -6.2008, lng: 106.8488 });
                    playIndependenceFanfare();
                  } else if (hl.battleId) {
                    const b = BATTLE_EVENTS.find((ev) => ev.id === hl.battleId);
                    if (b) handleSelectBattle(b);
                  } else if (hl.milestoneId) {
                    const m = MILESTONE_EVENTS.find((ev) => ev.id === hl.milestoneId);
                    if (m) handleSelectMilestone(m);
                  } else if (hl.nationId) {
                    const n = FOREIGN_NATIONS.find((ev) => ev.id === hl.nationId);
                    if (n) handleLaunchVoyage(n);
                  }
                }}
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium transition-all shrink-0 border ${
                  hl.isProclamation
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold border-red-400 shadow-md animate-pulse'
                    : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-800 hover:border-stone-700'
                }`}
              >
                <span className="font-mono text-amber-400 font-bold">{hl.year}</span>
                <span className="truncate max-w-[120px]">{hl.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setPanelMode('timeline')}
            className="ml-auto shrink-0 flex items-center gap-1 px-2.5 py-0.5 text-[11px] text-amber-300 hover:text-amber-200 font-semibold"
          >
            <span>Selengkapnya (45 Peristiwa)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
