import React, { useState } from 'react';
import { BattleEvent, MilestoneEvent, ForeignNation, TimelineEntry, LatLng } from '../types/history';
import { FULL_TIMELINE, PROCLAMATION_TEXT_AUTHENTIC, PROCLAMATION_NOTES } from '../data/historyData';
import { 
  Flame, Flag, Ship, Calendar, MapPin, ExternalLink, Volume2, VolumeX, 
  Play, Pause, SkipForward, SkipBack, Sparkles, BookOpen, Route, Users, 
  Target, Shield, Swords, CheckCircle2, ShieldAlert, Scroll, Clock, Maximize,
  Minimize, Printer, Search, ChevronRight, X, Compass, Anchor
} from 'lucide-react';
import { playCannonBlast, playIndependenceFanfare, playShipBell, speakText, stopSpeaking } from '../utils/audioEffects';

export type RightPanelMode = 'overview' | 'battle' | 'milestone' | 'nation' | 'timeline' | 'proclamation' | 'pid';

interface RightExplanationPanelProps {
  mode: RightPanelMode;
  onSetMode: (mode: RightPanelMode) => void;
  selectedBattle: BattleEvent | null;
  selectedMilestone: MilestoneEvent | null;
  selectedNation: ForeignNation | null;
  activeColonizationStepIndex: number | null;
  onSelectColonizationStep: (index: number) => void;
  onLaunchVoyage: (nation: ForeignNation) => void;
  isSailing: boolean;
  sailingProgress: number;
  onFocusMap: (coords: LatLng) => void;
  // PID Kiosk state
  isPidActive: boolean;
  pidCurrentEvent: TimelineEntry | null;
  pidCurrentIndex: number;
  pidTotalEvents: number;
  pidIsPlaying: boolean;
  pidProgressPercent: number;
  pidDwellSeconds: number;
  onPidTogglePlay: () => void;
  onPidNext: () => void;
  onPidPrev: () => void;
  onPidChangeDwell: (sec: number) => void;
  pidVoiceNarrate: boolean;
  onPidToggleVoice: () => void;
  onPidToggleFullscreen: () => void;
  isPidFullscreen: boolean;
  onClosePid: () => void;
  // Timeline select
  onSelectTimelineItem: (eventId: string) => void;
}

export const RightExplanationPanel: React.FC<RightExplanationPanelProps> = ({
  mode,
  onSetMode,
  selectedBattle,
  selectedMilestone,
  selectedNation,
  activeColonizationStepIndex,
  onSelectColonizationStep,
  onLaunchVoyage,
  isSailing,
  sailingProgress,
  onFocusMap,
  isPidActive,
  pidCurrentEvent,
  pidCurrentIndex,
  pidTotalEvents,
  pidIsPlaying,
  pidProgressPercent,
  pidDwellSeconds,
  onPidTogglePlay,
  onPidNext,
  onPidPrev,
  onPidChangeDwell,
  pidVoiceNarrate,
  onPidToggleVoice,
  onPidToggleFullscreen,
  isPidFullscreen,
  onClosePid,
  onSelectTimelineItem
}) => {
  const [timelineSearch, setTimelineSearch] = useState('');
  const [timelineStageFilter, setTimelineStageFilter] = useState<0 | 1 | 2 | 3>(0);
  const [isReadingProclamation, setIsReadingProclamation] = useState(false);

  const handleReadProclamation = () => {
    if (isReadingProclamation) {
      stopSpeaking();
      setIsReadingProclamation(false);
    } else {
      setIsReadingProclamation(true);
      playIndependenceFanfare();
      const readText = `Proklamasi. Kami bangsa Indonesia dengan ini menyatakan kemerdekaan Indonesia. Hal-hal yang mengenai pemindahan kekuasaan dan lain-lain, diselenggarakan dengan cara saksama dan dalam tempo yang sesingkat-singkatnya. Djakarta, hari 17 bulan 8 tahun 05. Atas nama bangsa Indonesia, Soekarno, Hatta. Merdeka!`;
      speakText(readText, () => setIsReadingProclamation(false));
    }
  };

  // Filtered timeline items
  const filteredTimeline = FULL_TIMELINE.filter((ev) => {
    const matchStage = timelineStageFilter === 0 || ev.stage === timelineStageFilter;
    const matchSearch =
      timelineSearch === '' ||
      ev.title.toLowerCase().includes(timelineSearch.toLowerCase()) ||
      ev.year.toLowerCase().includes(timelineSearch.toLowerCase()) ||
      ev.summary.toLowerCase().includes(timelineSearch.toLowerCase());
    return matchStage && matchSearch;
  });

  return (
    <aside className="w-full lg:w-1/4 min-w-[300px] max-w-full lg:max-w-md h-full min-h-0 bg-stone-900 border-l border-stone-800 flex flex-col text-stone-100 z-10 shadow-2xl relative overflow-hidden">
      {/* Panel Top Quick Tabs */}
      <div className="bg-stone-950 border-b border-stone-800 px-3 py-2 flex items-center justify-between gap-1 shrink-0">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none text-[11px]">
          <button
            onClick={() => onSetMode('overview')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium ${
              mode === 'overview' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            Ringkasan
          </button>
          <button
            onClick={() => onSetMode('timeline')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
              mode === 'timeline' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <Calendar className="w-3 h-3 text-amber-400" />
            <span>Kronologi</span>
          </button>
          <button
            onClick={() => onSetMode('proclamation')}
            className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
              mode === 'proclamation' ? 'bg-red-600 text-white font-bold' : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <span>🇮🇩</span>
            <span>17 Ags</span>
          </button>
        </div>

        {/* Current status pill */}
        <span className="text-[10px] text-stone-500 font-mono uppercase shrink-0">
          Panel Penjelasan
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* =======================================================
            VIEW 1: PID KIOSK ACTIVE DISPLAY
           ======================================================= */}
        {mode === 'pid' && pidCurrentEvent && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-gradient-to-r from-amber-950 to-stone-900 border border-amber-600/60 p-3.5 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5 font-cinzel">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  Layar Kiosk PID Berjalan
                </span>
                <span className="text-[10px] bg-stone-900 border border-stone-700 px-2 py-0.5 rounded-full text-stone-300 font-mono">
                  {pidCurrentIndex + 1} / {pidTotalEvents}
                </span>
              </div>

              {/* Dwell Progress bar */}
              <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-red-500 h-full transition-all ease-linear"
                  style={{ width: `${pidProgressPercent}%` }}
                />
              </div>

              {/* Kiosk Controls */}
              <div className="flex items-center justify-between gap-1 pt-1 text-xs">
                <div className="flex items-center gap-1 bg-stone-900 px-2 py-1 rounded border border-stone-800 text-[10px] text-stone-400">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>Jeda:</span>
                  <select
                    value={pidDwellSeconds}
                    onChange={(e) => onPidChangeDwell(Number(e.target.value))}
                    className="bg-transparent text-amber-300 font-bold focus:outline-none"
                  >
                    <option value={5} className="bg-stone-900">5s</option>
                    <option value={8} className="bg-stone-900">8s</option>
                    <option value={12} className="bg-stone-900">12s</option>
                    <option value={20} className="bg-stone-900">20s</option>
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={onPidToggleVoice}
                    className={`p-1.5 rounded border text-xs ${
                      pidVoiceNarrate ? 'bg-amber-900/60 text-amber-300 border-amber-700' : 'bg-stone-900 text-stone-500 border-stone-800'
                    }`}
                    title={pidVoiceNarrate ? 'Suara Narasi Aktif' : 'Suara Narasi Mati'}
                  >
                    {pidVoiceNarrate ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={onPidToggleFullscreen}
                    className="p-1.5 rounded bg-stone-900 text-stone-300 border border-stone-800 hover:text-white"
                    title="Layar Penuh"
                  >
                    {isPidFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={onClosePid}
                    className="p-1.5 rounded bg-stone-900 text-stone-400 border border-stone-800 hover:text-red-400"
                    title="Tutup Mode PID"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Event Display */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-stone-950 bg-amber-400 px-2 py-0.5 rounded shadow">
                  Tahun {pidCurrentEvent.year}
                </span>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                  {pidCurrentEvent.stage === 1 ? 'Tahap 1: Perlawanan Daerah' : pidCurrentEvent.stage === 2 ? 'Tahap 2: Pergerakan Nasional' : 'Tahap 3: Menuju Kemerdekaan 1945'}
                </span>
              </div>

              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white">
                {pidCurrentEvent.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 font-serif-vintage leading-relaxed">
                {pidCurrentEvent.summary}
              </p>

              {/* Touch Kiosk Big Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={onPidPrev}
                  className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 flex items-center gap-1 text-xs font-semibold"
                >
                  <SkipBack className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <button
                  onClick={onPidTogglePlay}
                  className={`px-4 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold border ${
                    pidIsPlaying
                      ? 'bg-amber-600 hover:bg-amber-500 text-stone-950 border-amber-300'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-300'
                  }`}
                >
                  {pidIsPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{pidIsPlaying ? 'Jeda' : 'Lanjut'}</span>
                </button>

                <button
                  onClick={onPidNext}
                  className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 flex items-center gap-1 text-xs font-semibold"
                >
                  <span>Berikutnya</span>
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =======================================================
            VIEW 2: BATTLE DETAIL DOSSIER
           ======================================================= */}
        {mode === 'battle' && selectedBattle && (
          <div className="space-y-4 animate-fadeIn">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-950 via-stone-900 to-amber-950 p-3.5 rounded-xl border border-red-800/50 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-fire-glow">💥</span>
                  <div>
                    <span className="text-[10px] font-bold text-red-300 uppercase tracking-wider block">
                      MEDAN PERANG KOLONIAL
                    </span>
                    <span className="text-xs font-mono text-amber-300 font-bold">
                      Tahun {selectedBattle.year}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => playCannonBlast()}
                    className="p-1.5 rounded bg-red-950 text-amber-300 border border-red-800 hover:bg-red-900"
                    title="Dentuman Meriam"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onSetMode('overview')}
                    className="p-1.5 rounded bg-stone-800 text-stone-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h2 className="font-cinzel text-sm sm:text-base font-bold text-amber-100">
                {selectedBattle.title}
              </h2>

              <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                <span className="truncate">{selectedBattle.location}</span>
              </div>
            </div>

            {/* Pihak Berperang */}
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-stone-950 border border-red-900/40">
                <div className="text-red-400 font-semibold uppercase text-[10px] flex items-center gap-1 mb-1">
                  <Shield className="w-3 h-3" /> Pejuang Nusantara:
                </div>
                <p className="font-bold text-stone-200">{selectedBattle.opponents.nusantara}</p>
                <p className="text-stone-400 text-[11px] mt-0.5">
                  Tokoh: {selectedBattle.leaders.nusantara.join(', ')}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800">
                <div className="text-stone-400 font-semibold uppercase text-[10px] flex items-center gap-1 mb-1">
                  <Swords className="w-3 h-3 text-amber-400" /> Penjajah Asing:
                </div>
                <p className="font-bold text-stone-300">{selectedBattle.opponents.foreign}</p>
                <p className="text-stone-400 text-[11px] mt-0.5">
                  Panglima: {selectedBattle.leaders.foreign.join(', ')}
                </p>
              </div>
            </div>

            {/* Apa yang terjadi */}
            <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 space-y-1">
              <h4 className="text-[11px] font-bold text-amber-300 uppercase tracking-wider font-cinzel">
                ⚔️ Apa yang Terjadi:
              </h4>
              <p className="text-xs text-stone-300 font-serif-vintage leading-relaxed">
                {selectedBattle.whatHappened}
              </p>
            </div>

            {/* Penyebab */}
            <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 space-y-1">
              <h4 className="text-[11px] font-bold text-amber-300 uppercase tracking-wider font-cinzel">
                🔥 Penyebab Terjadinya:
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                {selectedBattle.causes}
              </p>
            </div>

            {/* Tujuan Perlawanan */}
            <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 space-y-1">
              <h4 className="text-[11px] font-bold text-amber-300 uppercase tracking-wider font-cinzel flex items-center gap-1">
                <Target className="w-3 h-3 text-red-400" /> Tujuan Perlawanan:
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                {selectedBattle.purpose}
              </p>
            </div>

            {/* Hasil & Dampak */}
            <div className="p-3 rounded-lg bg-red-950/30 border border-red-900/60 space-y-1">
              <h4 className="text-[11px] font-bold text-amber-200 uppercase tracking-wider font-cinzel flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Hasil & Dampak Sejarah:
              </h4>
              <p className="text-xs text-stone-200 leading-relaxed">
                {selectedBattle.impactAndResult}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                onClick={() => onFocusMap(selectedBattle.coordinates)}
                className="flex items-center gap-1 px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold border border-stone-700"
              >
                <MapPin className="w-3 h-3 text-red-400" />
                <span>Pusatkan di Peta</span>
              </button>

              <a
                href={`https://www.google.com/maps?q=${selectedBattle.coordinates.lat},${selectedBattle.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* =======================================================
            VIEW 3: NATION EXPEDITION & COLONIZATION PATH
           ======================================================= */}
        {mode === 'nation' && selectedNation && (
          <div className="space-y-4 animate-fadeIn">
            {/* Header */}
            <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950 p-3.5 rounded-xl border border-amber-600/50 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{selectedNation.flag}</span>
                  <div>
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                      EKSPEDISI SAMUDRA
                    </span>
                    <h2 className="font-cinzel text-base font-bold text-white">
                      {selectedNation.name}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => onSetMode('overview')}
                  className="p-1.5 rounded bg-stone-800 text-stone-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Action: Replay Voyage Animation */}
              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={() => onLaunchVoyage(selectedNation)}
                  disabled={isSailing}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all shadow ${
                    isSailing
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-amber-600 hover:bg-amber-500 text-stone-950'
                  }`}
                >
                  <Play className={`w-3.5 h-3.5 ${isSailing ? 'animate-spin' : ''}`} />
                  <span>{isSailing ? `Kapal Berlayar (${Math.round(sailingProgress * 100)}%)` : 'Luncurkan Kapal di Peta'}</span>
                </button>
              </div>
            </div>

            {/* Port info */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800">
                <span className="text-stone-500 text-[10px] block">Pintu Masuk Perairan RI:</span>
                <span className="font-bold text-stone-200">{selectedNation.originCity}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800">
                <span className="text-stone-500 text-[10px] block">Pendaratan di RI:</span>
                <span className="font-bold text-stone-200">{selectedNation.landingPort}</span>
              </div>
            </div>

            {/* Motive & Arrival story */}
            <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 space-y-1.5 text-xs">
              <h4 className="font-cinzel text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                🎯 Latar Belakang & Kisah Kedatangan:
              </h4>
              <p className="text-stone-300 leading-relaxed font-serif-vintage">
                {selectedNation.arrivalStory.summary}
              </p>
              <div className="text-[11px] text-stone-400 pt-1 border-t border-stone-900">
                <strong className="text-amber-200">Mengapa Datang:</strong> {selectedNation.arrivalStory.whyTheyCame}
              </div>
              <div className="text-[11px] text-stone-400">
                <strong className="text-amber-200">Armada Kapal:</strong> {selectedNation.shipNames.join(', ')}
              </div>
            </div>

            {/* Alur Jajahan (Colonization Path) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
                <h4 className="font-cinzel text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Route className="w-3.5 h-3.5 text-red-400" /> Alur Jajahan di Indonesia:
                </h4>
                <span className="text-[10px] text-stone-500 font-mono">
                  {selectedNation.colonizationSteps.length} Fase
                </span>
              </div>

              <div className="space-y-2">
                {selectedNation.colonizationSteps.map((step, idx) => {
                  const isActive = activeColonizationStepIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        onSelectColonizationStep(idx);
                        onFocusMap(step.coordinates);
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer text-xs space-y-1.5 ${
                        isActive
                          ? 'bg-amber-950/60 border-amber-500 shadow-md'
                          : 'bg-stone-950/80 hover:bg-stone-950 border-stone-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px] flex items-center justify-center border border-amber-500/40">
                            {idx + 1}
                          </span>
                          <span className="font-mono text-[10px] font-bold text-amber-400 bg-stone-900 px-1.5 py-0.5 rounded">
                            {step.year}
                          </span>
                          <span className="font-bold text-stone-200">{step.locationName}</span>
                        </div>
                        <MapPin className="w-3 h-3 text-red-400" />
                      </div>

                      <p className="text-stone-300 text-[11px] leading-relaxed font-serif-vintage pl-6">
                        {step.description}
                      </p>

                      <div className="text-[10px] text-amber-200/90 pl-6 flex items-start gap-1">
                        <ShieldAlert className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                        <span><strong>Dampak:</strong> {step.impact}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =======================================================
            VIEW 4: MILESTONE DETAIL
           ======================================================= */}
        {mode === 'milestone' && selectedMilestone && (
          <div className="space-y-4 animate-fadeIn">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-900 via-rose-950 to-stone-900 p-3.5 rounded-xl border border-red-700/50 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl animate-flag-wave">🇮🇩</span>
                  <div>
                    <span className="text-[10px] font-bold text-red-300 uppercase tracking-wider block">
                      TONGGAK KEMERDEKAAN
                    </span>
                    <span className="text-xs font-mono text-amber-300 font-bold">
                      {selectedMilestone.date}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSetMode('overview')}
                  className="p-1.5 rounded bg-stone-800 text-stone-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <h2 className="font-cinzel text-sm sm:text-base font-bold text-white">
                {selectedMilestone.title}
              </h2>

              <div className="flex items-center gap-1.5 text-[11px] text-stone-300">
                <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                <span className="truncate">{selectedMilestone.location}</span>
              </div>
            </div>

            {/* Figures */}
            <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 space-y-1.5 text-xs">
              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3 h-3" /> Tokoh Bangsa:
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedMilestone.figures.map((fig, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-stone-900 text-amber-200 border border-stone-800">
                    {fig}
                  </span>
                ))}
              </div>
            </div>

            {/* Apa yang terjadi */}
            <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 space-y-1 text-xs">
              <h4 className="font-cinzel text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                📜 Peristiwa yang Berlangsung:
              </h4>
              <p className="text-stone-300 font-serif-vintage leading-relaxed">
                {selectedMilestone.whatHappened}
              </p>
            </div>

            {/* Penyebab */}
            {selectedMilestone.causes && (
              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 space-y-1 text-xs">
                <h4 className="font-cinzel text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                  💡 Latar Belakang:
                </h4>
                <p className="text-stone-300 leading-relaxed">
                  {selectedMilestone.causes}
                </p>
              </div>
            )}

            {/* Arti Penting */}
            <div className="p-3 rounded-lg bg-red-950/30 border border-red-900/60 space-y-1 text-xs">
              <h4 className="font-cinzel text-[11px] font-bold text-red-200 uppercase tracking-wider">
                ⭐ Arti Penting bagi Bangsa:
              </h4>
              <p className="text-stone-200 font-medium leading-relaxed">
                {selectedMilestone.importance}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                onClick={() => onFocusMap(selectedMilestone.coordinates)}
                className="flex items-center gap-1 px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold border border-stone-700"
              >
                <MapPin className="w-3 h-3 text-red-400" />
                <span>Pusatkan di Peta</span>
              </button>

              <a
                href={`https://www.google.com/maps?q=${selectedMilestone.coordinates.lat},${selectedMilestone.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* =======================================================
            VIEW 5: SACRED PROCLAMATION 17 AUGUST 1945
           ======================================================= */}
        {mode === 'proclamation' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-gradient-to-r from-red-700 via-rose-800 to-red-950 p-4 rounded-xl text-center border border-red-500/50 space-y-1 relative">
              <span className="text-4xl inline-block animate-flag-wave">🇮🇩</span>
              <div className="text-[10px] font-bold text-amber-300 uppercase tracking-widest font-cinzel">
                17 AGUSTUS 1945 — 10.00 WIB
              </div>
              <h3 className="text-base font-extrabold text-white font-cinzel">
                PROKLAMASI KEMERDEKAAN RI
              </h3>
              <p className="text-[11px] text-red-100">
                Pegangsaan Timur 56, Jakarta
              </p>
            </div>

            {/* Naskah Otentik Scroll */}
            <div className="bg-stone-950 p-4 rounded-xl border-2 border-amber-600/60 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <span className="text-xs font-bold text-amber-400 font-cinzel flex items-center gap-1">
                  <Scroll className="w-3.5 h-3.5" /> Naskah Otentik 1945
                </span>
                <button
                  onClick={handleReadProclamation}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold border transition-all ${
                    isReadingProclamation
                      ? 'bg-red-600 text-white border-red-400 animate-pulse'
                      : 'bg-amber-600 hover:bg-amber-500 text-stone-950 border-amber-400'
                  }`}
                >
                  {isReadingProclamation ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  <span>{isReadingProclamation ? 'Hentikan' : 'Dengarkan'}</span>
                </button>
              </div>

              <div className="bg-stone-900/90 p-3 rounded-lg border border-amber-900/40 font-mono text-center text-amber-100 text-xs sm:text-sm leading-relaxed whitespace-pre-line tracking-wide">
                {PROCLAMATION_TEXT_AUTHENTIC}
              </div>

              <div className="text-[10px] text-amber-200/90 italic bg-amber-950/40 p-2 rounded border border-amber-800/40">
                📌 {PROCLAMATION_NOTES.calendarNote}
              </div>
            </div>

            {/* 3 Makna Utama */}
            <div className="space-y-1.5 text-xs">
              <h4 className="font-cinzel text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                Tiga Makna Utama Teks Proklamasi:
              </h4>
              <ul className="space-y-1.5 text-[11px] text-stone-300">
                {PROCLAMATION_NOTES.significancePoints.map((pt, i) => (
                  <li key={i} className="p-2 rounded bg-stone-950 border border-stone-800 flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold shrink-0">#{i + 1}</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-1 flex items-center justify-between gap-2">
              <button
                onClick={() => onFocusMap({ lat: -6.2008, lng: 106.8488 })}
                className="flex items-center gap-1 px-3 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold border border-stone-700"
              >
                <MapPin className="w-3 h-3 text-red-400" />
                <span>Pusatkan Pegangsaan Timur</span>
              </button>

              <a
                href="https://www.google.com/maps?q=-6.2008,106.8488"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* =======================================================
            VIEW 6: TIMELINE LIST (1511 - 1945)
           ======================================================= */}
        {mode === 'timeline' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="font-cinzel text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Garis Waktu Lengkap (45 Peristiwa)
              </h3>
              <button
                onClick={() => window.print()}
                className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] flex items-center gap-1"
                title="Cetak Garis Waktu"
              >
                <Printer className="w-3 h-3 text-amber-400" />
                <span>Cetak</span>
              </button>
            </div>

            {/* Search input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-2" />
              <input
                type="text"
                placeholder="Cari Diponegoro, VOC, PETA..."
                value={timelineSearch}
                onChange={(e) => setTimelineSearch(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-8 pr-2 py-1 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Stage filter pills */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none text-[10px]">
              <button
                onClick={() => setTimelineStageFilter(0)}
                className={`px-2 py-0.5 rounded font-medium ${
                  timelineStageFilter === 0 ? 'bg-amber-600 text-stone-950 font-bold' : 'bg-stone-950 text-stone-400'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setTimelineStageFilter(1)}
                className={`px-2 py-0.5 rounded font-medium ${
                  timelineStageFilter === 1 ? 'bg-red-700 text-white font-bold' : 'bg-stone-950 text-stone-400'
                }`}
              >
                1. Daerah
              </button>
              <button
                onClick={() => setTimelineStageFilter(2)}
                className={`px-2 py-0.5 rounded font-medium ${
                  timelineStageFilter === 2 ? 'bg-blue-700 text-white font-bold' : 'bg-stone-950 text-stone-400'
                }`}
              >
                2. Nasional
              </button>
              <button
                onClick={() => setTimelineStageFilter(3)}
                className={`px-2 py-0.5 rounded font-medium ${
                  timelineStageFilter === 3 ? 'bg-rose-600 text-white font-bold' : 'bg-stone-950 text-stone-400'
                }`}
              >
                3. Proklamasi
              </button>
            </div>

            {/* Events list */}
            <div className="space-y-2 pt-1 max-h-[60vh] overflow-y-auto pr-1">
              {filteredTimeline.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => onSelectTimelineItem(item.id)}
                  className="p-2.5 rounded-lg bg-stone-950 hover:bg-stone-800/80 border border-stone-800 hover:border-amber-600/50 cursor-pointer transition-all space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-amber-400 bg-stone-900 px-1.5 py-0.5 rounded">
                      {item.year}
                    </span>
                    <span className="text-xs">
                      {item.category === 'peperangan' && '💥'}
                      {item.category === 'pelayaran' && '⛵'}
                      {item.category === 'pergerakan' && '📜'}
                      {item.category === 'persiapan' && '⚡'}
                      {item.category === 'proklamasi' && '🇮🇩'}
                    </span>
                  </div>
                  <h5 className="font-cinzel text-xs font-bold text-stone-200">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-stone-400 leading-relaxed font-serif-vintage line-clamp-2">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =======================================================
            VIEW 7: GENERAL OVERVIEW (DEFAULT)
           ======================================================= */}
        {mode === 'overview' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Welcome banner */}
            <div className="bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 p-4 rounded-xl border border-amber-800/40 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇮🇩</span>
                <div>
                  <h3 className="font-cinzel text-xs sm:text-sm font-bold text-amber-200">
                    PANDUAN PETA SEJARAH
                  </h3>
                  <p className="text-[10px] text-stone-400">
                    Eksplorasi Perjalanan Bangsa Menuju Kemerdekaan
                  </p>
                </div>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-serif-vintage">
                Klik pada <strong>bendera bangsa asing</strong> di atas untuk meluncurkan kapal armada dari negara asalnya ke pulau Indonesia pertama, atau klik <strong>lambang ledakan (💥)</strong> dan <strong>bendera Merah Putih (🇮🇩)</strong> di peta untuk membaca arsip sejarah lengkap.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800">
                <span className="text-stone-500 text-[10px] block">Bangsa Asing:</span>
                <span className="font-bold text-amber-300 text-sm">5 Armada Samudra</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">🇵🇹 🇪🇸 🇳🇱 🇬🇧 🇯🇵</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800">
                <span className="text-stone-500 text-[10px] block">Medan Pertempuran:</span>
                <span className="font-bold text-red-400 text-sm">13 Perang Berdarah</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">💥 Sultan Agung, Diponegoro, dll</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800">
                <span className="text-stone-500 text-[10px] block">Tonggak Nasional:</span>
                <span className="font-bold text-emerald-400 text-sm">15 Momen Bangsa</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">🇮🇩 1908 – 17 Ags 1945</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800">
                <span className="text-stone-500 text-[10px] block">Garis Waktu Total:</span>
                <span className="font-bold text-blue-400 text-sm">45 Kronologi</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Tahun 1511 – 1945</span>
              </div>
            </div>

            {/* 3 Tahap Perjuangan Accordion */}
            <div className="space-y-2 pt-1 text-xs">
              <h4 className="font-cinzel text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Tiga Babak Besar Sejarah:
              </h4>

              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 space-y-1">
                <div className="flex items-center justify-between text-amber-300 font-bold text-xs">
                  <span>1. Perlawanan Kedaerahan (1511–1908)</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed font-serif-vintage">
                  Rakyat dan kerajaan melawan Portugis, VOC, dan Belanda mempertahankan wilayah, perdagangan, dan kehormatan.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 space-y-1">
                <div className="flex items-center justify-between text-blue-300 font-bold text-xs">
                  <span>2. Pergerakan Nasional (1908–1942)</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed font-serif-vintage">
                  Metamorfosis perjuangan melalui pendidikan, partai politik, persatuan Sumpah Pemuda 1928, dan pembentukan identitas tunggal Indonesia.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 space-y-1">
                <div className="flex items-center justify-between text-rose-300 font-bold text-xs">
                  <span>3. Persiapan & Proklamasi (1942–1945)</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed font-serif-vintage">
                  Pendudukan Jepang, pemuda di Rengasdengklok, perumusan di kediaman Maeda, hingga dibacakannya naskah suci Proklamasi 17 Agustus 1945.
                </p>
              </div>
            </div>

            {/* Kesimpulan box */}
            <div className="p-3 bg-red-950/30 rounded-xl border border-red-900/50 text-[11px] text-stone-300 space-y-1">
              <strong className="text-red-200 block font-cinzel">Esensi Proklamasi:</strong>
              <p className="leading-relaxed font-serif-vintage">
                Proklamasi adalah pernyataan kemerdekaan berdaulat, bukan akhir seluruh perjuangan. Indonesia masih harus mempertahankan kemerdekaannya menghadapi agresi militer Belanda melalui diplomasi dan perjuangan bersenjata.
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
