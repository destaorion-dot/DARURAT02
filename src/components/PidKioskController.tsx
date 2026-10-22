import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Maximize, Minimize, X, Tv, Volume2, VolumeX, Sparkles, Clock, MapPin } from 'lucide-react';
import { FULL_TIMELINE, BATTLE_EVENTS, MILESTONE_EVENTS, FOREIGN_NATIONS } from '../data/historyData';
import { TimelineEntry } from '../types/history';
import { playCannonBlast, playIndependenceFanfare, playShipBell, speakText, stopSpeaking } from '../utils/audioEffects';

interface PidKioskControllerProps {
  isActive: boolean;
  onClose: () => void;
  onFocusEvent: (item: { title: string; year: string; location?: string; coordinates?: { lat: number; lng: number }; summary: string }) => void;
  onLaunchVoyage: (nationId: string) => void;
  onOpenProclamation: () => void;
}

export const PidKioskController: React.FC<PidKioskControllerProps> = ({
  isActive,
  onClose,
  onFocusEvent,
  onLaunchVoyage,
  onOpenProclamation
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dwellTimeSeconds, setDwellTimeSeconds] = useState(8); // Default 8 seconds per slide for public display
  const [progressPercent, setProgressPercent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [voiceNarrate, setVoiceNarrate] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const events = FULL_TIMELINE;
  const currentEvent = events[currentIndex] || events[0];

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Sync event display when index changes
  const executeEventAction = (idx: number) => {
    const ev = events[idx];
    if (!ev) return;

    // Find battle or milestone coordinates if available
    const battle = BATTLE_EVENTS.find((b) => b.id === ev.relatedEntityId || ev.title.includes(b.title.split(' ')[0]));
    const milestone = MILESTONE_EVENTS.find((m) => m.id === ev.relatedEntityId || ev.title.includes(m.title.split(' ')[0]));

    let targetCoords = ev.coordinates || battle?.coordinates || milestone?.coordinates;

    // Special nation voyage triggers
    if (ev.year === '1511' || ev.year === '1512') {
      onLaunchVoyage('portugis');
    } else if (ev.year === '1521') {
      onLaunchVoyage('spanyol');
    } else if (ev.year === '1596') {
      onLaunchVoyage('belanda');
    } else if (ev.year === '1602') {
      onLaunchVoyage('inggris');
    } else if (ev.year === '8 Maret 1942') {
      onLaunchVoyage('jepang');
    } else if (ev.year === '17 Agustus 1945') {
      onOpenProclamation();
    }

    if (battle) {
      playCannonBlast();
      targetCoords = battle.coordinates;
    } else if (milestone) {
      playIndependenceFanfare();
      targetCoords = milestone.coordinates;
    }

    onFocusEvent({
      title: ev.title,
      year: ev.year,
      location: battle?.location || milestone?.location,
      coordinates: targetCoords,
      summary: ev.summary
    });

    if (voiceNarrate) {
      speakText(`${ev.year}. ${ev.title}. ${ev.summary}`);
    }
  };

  // Step to Next
  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % events.length;
    setCurrentIndex(nextIdx);
    setProgressPercent(0);
    executeEventAction(nextIdx);
  };

  // Step to Prev
  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + events.length) % events.length;
    setCurrentIndex(prevIdx);
    setProgressPercent(0);
    executeEventAction(prevIdx);
  };

  // Auto-advance loop for Public Information Display (PID Kiosk)
  useEffect(() => {
    if (!isActive) {
      stopSpeaking();
      return;
    }

    // Trigger initial on activation
    executeEventAction(currentIndex);

    if (isPlaying) {
      const stepMs = 100;
      const totalSteps = (dwellTimeSeconds * 1000) / stepMs;
      let stepCount = 0;

      progressIntervalRef.current = setInterval(() => {
        stepCount++;
        setProgressPercent(Math.min((stepCount / totalSteps) * 100, 100));
        if (stepCount >= totalSteps) {
          stepCount = 0;
          setProgressPercent(0);
          setCurrentIndex((prev) => {
            const next = (prev + 1) % events.length;
            executeEventAction(next);
            return next;
          });
        }
      }, stepMs);
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isActive, isPlaying, dwellTimeSeconds, events.length]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-6 pointer-events-none flex flex-col items-center">
      {/* Big Kiosk Floating Information Display Card */}
      <div className="w-full max-w-4xl bg-stone-950/95 backdrop-blur-xl border-2 border-amber-500/80 rounded-2xl shadow-2xl p-4 sm:p-5 pointer-events-auto text-stone-100 flex flex-col gap-3 animate-slideUp">
        {/* Top Progress bar and Title Row */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
              <span className="font-cinzel text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Tv className="w-4 h-4 text-amber-400" />
                PID: LAYAR INFORMASI PUBLIK / KIOSK MUSEUM
              </span>
              <span className="text-[10px] bg-stone-900 border border-stone-700 px-2 py-0.5 rounded-full text-stone-300 font-mono">
                {currentIndex + 1} / {events.length}
              </span>
            </div>

            {/* Quick PID Settings: Speed & Fullscreen */}
            <div className="flex items-center gap-1.5 text-xs">
              {/* Dwell time selector */}
              <div className="flex items-center gap-1 bg-stone-900 px-2 py-1 rounded-lg border border-stone-800 text-[11px] text-stone-400">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>Jeda:</span>
                <select
                  value={dwellTimeSeconds}
                  onChange={(e) => setDwellTimeSeconds(Number(e.target.value))}
                  className="bg-transparent text-amber-300 font-bold focus:outline-none"
                >
                  <option value={5} className="bg-stone-900">5s</option>
                  <option value={8} className="bg-stone-900">8s</option>
                  <option value={12} className="bg-stone-900">12s</option>
                  <option value={20} className="bg-stone-900">20s</option>
                </select>
              </div>

              {/* Voice narration toggle */}
              <button
                onClick={() => {
                  const next = !voiceNarrate;
                  setVoiceNarrate(next);
                  if (!next) stopSpeaking();
                }}
                className={`p-1.5 rounded-lg border text-xs transition-all ${
                  voiceNarrate ? 'bg-amber-950 text-amber-300 border-amber-800' : 'bg-stone-900 text-stone-500 border-stone-800'
                }`}
                title={voiceNarrate ? 'Narasi Suara Otomatis Aktif' : 'Narasi Suara Mati'}
              >
                {voiceNarrate ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-400 border border-stone-700 transition-all"
                title="Mode Layar Penuh (Fullscreen Display)"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>

              {/* Close PID Mode */}
              <button
                onClick={() => {
                  stopSpeaking();
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-stone-900 hover:bg-red-950 text-stone-400 hover:text-red-300 border border-stone-800 transition-all"
                title="Keluar dari Mode PID"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dwell Progress Bar */}
          <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-red-500 h-full transition-all ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Current Historical Milestone Big Display */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-red-700 flex items-center justify-center text-xl font-bold border border-amber-400 shrink-0 shadow-lg">
              {currentEvent.category === 'proklamasi' && '🇮🇩'}
              {currentEvent.category === 'peperangan' && '💥'}
              {currentEvent.category === 'pelayaran' && '⛵'}
              {currentEvent.category === 'pergerakan' && '📜'}
              {currentEvent.category === 'persiapan' && '⚡'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-stone-950 bg-amber-400 px-2 py-0.5 rounded shadow">
                  Tahun {currentEvent.year}
                </span>
                <span className="text-[11px] text-amber-300 uppercase tracking-wider font-semibold">
                  {currentEvent.stage === 1 ? 'Tahap 1: Perlawanan Daerah' : currentEvent.stage === 2 ? 'Tahap 2: Pergerakan Nasional' : 'Tahap 3: Menuju Kemerdekaan 1945'}
                </span>
              </div>
              <h3 className="font-cinzel text-base sm:text-xl font-extrabold text-white mt-1">
                {currentEvent.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-serif-vintage mt-1 leading-relaxed max-w-2xl line-clamp-2">
                {currentEvent.summary}
              </p>
            </div>
          </div>

          {/* Touch-Friendly Large Controls for Public Users */}
          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 flex items-center justify-center transition-all active:scale-95 shadow"
              title="Peristiwa Sebelumnya"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                if (isPlaying) stopSpeaking();
                setIsPlaying(!isPlaying);
              }}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-lg border ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-500 text-stone-950 border-amber-300 font-bold'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-300 font-bold'
              }`}
              title={isPlaying ? 'Jeda Tur Otomatis' : 'Lanjutkan Tur Otomatis'}
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
            </button>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 flex items-center justify-center transition-all active:scale-95 shadow"
              title="Peristiwa Berikutnya"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
