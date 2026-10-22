import React from 'react';
import { Volume2, VolumeX, Globe, MapPin, Compass, Sparkles, BookOpen, Layers, Tv, Maximize, Minimize } from 'lucide-react';
import { isSoundEnabled, setSoundEnabled } from '../utils/audioEffects';

interface NavbarProps {
  currentView: 'indonesia' | 'global';
  onToggleView: (view: 'indonesia' | 'global') => void;
  mapStyle: 'antique' | 'osm' | 'satellite' | 'dark';
  onChangeMapStyle: (style: 'antique' | 'osm' | 'satellite' | 'dark') => void;
  onOpenTimeline: () => void;
  onOpenProclamation: () => void;
  activeFilter: 'all' | 'battles' | 'milestones' | 'expeditions';
  onChangeFilter: (filter: 'all' | 'battles' | 'milestones' | 'expeditions') => void;
  isPidMode: boolean;
  onTogglePidMode: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onToggleView,
  mapStyle,
  onChangeMapStyle,
  onOpenTimeline,
  onOpenProclamation,
  activeFilter,
  onChangeFilter,
  isPidMode,
  onTogglePidMode,
  isFullscreen,
  onToggleFullscreen
}) => {
  const [soundOn, setSoundOn] = React.useState(isSoundEnabled());

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  return (
    <header className="bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 z-30 relative shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
        {/* Title & Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-amber-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-950/50 border border-red-500/30">
            <span className="text-xl">🇮🇩</span>
          </div>
          <div>
            <h1 className="font-cinzel text-sm sm:text-base md:text-lg font-bold tracking-wider text-amber-100 flex items-center gap-2">
              SEJARAH NUSANTARA & KEMERDEKAAN
            </h1>
            <p className="text-[10px] sm:text-xs text-stone-400 font-sans hidden sm:block">
              Peta Ekspedisi Samudra Bangsa Asing, Medan Perang Kolonial & Kronologi 1511–1945
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {/* Quick Filter Buttons */}
          <div className="hidden lg:flex items-center bg-stone-950/70 p-1 rounded-lg border border-stone-800 text-xs">
            <button
              onClick={() => onChangeFilter('all')}
              className={`px-2.5 py-1 rounded transition-all ${activeFilter === 'all' ? 'bg-amber-600 text-white font-medium shadow' : 'text-stone-400 hover:text-stone-200'}`}
            >
              Semua Titik
            </button>
            <button
              onClick={() => onChangeFilter('battles')}
              className={`px-2.5 py-1 rounded flex items-center gap-1 transition-all ${activeFilter === 'battles' ? 'bg-red-700 text-white font-medium shadow' : 'text-stone-400 hover:text-stone-200'}`}
            >
              <span>💥</span> Peperangan (13)
            </button>
            <button
              onClick={() => onChangeFilter('milestones')}
              className={`px-2.5 py-1 rounded flex items-center gap-1 transition-all ${activeFilter === 'milestones' ? 'bg-emerald-700 text-white font-medium shadow' : 'text-stone-400 hover:text-stone-200'}`}
            >
              <span>🇮🇩</span> Kemerdekaan (15)
            </button>
          </div>

          {/* Center Indonesia Map Focus Button */}
          <button
            onClick={() => onToggleView('indonesia')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg bg-stone-800/90 hover:bg-stone-700 border border-stone-700 text-amber-200 transition-all font-medium"
            title="Pusatkan Peta ke Kepulauan Indonesia"
          >
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Pusatkan Nusantara</span>
          </button>

          {/* Map Layer Style Selector */}
          <div className="relative group">
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg bg-stone-800/90 hover:bg-stone-700 border border-stone-700 text-stone-200 transition-all"
              title="Ganti Tampilan Peta"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline capitalize">{mapStyle === 'antique' ? 'Peta Kuno' : mapStyle === 'satellite' ? 'Satelit' : mapStyle === 'dark' ? 'Gelap' : 'Topografi'}</span>
            </button>
            <div className="absolute right-0 mt-1 w-36 bg-stone-900 border border-stone-700 rounded-lg shadow-2xl py-1 hidden group-hover:block z-50">
              <button
                onClick={() => onChangeMapStyle('antique')}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-stone-800 flex items-center justify-between ${mapStyle === 'antique' ? 'text-amber-400 font-semibold' : 'text-stone-300'}`}
              >
                📜 Peta Klasik Kuno
              </button>
              <button
                onClick={() => onChangeMapStyle('satellite')}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-stone-800 flex items-center justify-between ${mapStyle === 'satellite' ? 'text-amber-400 font-semibold' : 'text-stone-300'}`}
              >
                🛰️ Citra Satelit
              </button>
              <button
                onClick={() => onChangeMapStyle('osm')}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-stone-800 flex items-center justify-between ${mapStyle === 'osm' ? 'text-amber-400 font-semibold' : 'text-stone-300'}`}
              >
                🗺️ Topografi Terang
              </button>
              <button
                onClick={() => onChangeMapStyle('dark')}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-stone-800 flex items-center justify-between ${mapStyle === 'dark' ? 'text-amber-400 font-semibold' : 'text-stone-300'}`}
              >
                🌑 Tampilan Gelap
              </button>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-1.5 rounded-lg border transition-all text-xs ${soundOn ? 'bg-amber-950/40 text-amber-400 border-amber-800/60' : 'bg-stone-800/80 text-stone-500 border-stone-700'}`}
            title={soundOn ? 'Suara Meriam & Chime Aktif' : 'Suara Mati'}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mode PID / Public Information Display (Kiosk Museum) */}
          <button
            onClick={onTogglePidMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-bold transition-all border ${
              isPidMode
                ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-lg shadow-amber-950 animate-pulse'
                : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border-stone-700'
            }`}
            title="Mode PID (Public Information Display): Tampilan Layar Kiosk Interaktif untuk Museum, Pameran & Sekolah dengan Tur Otomatis"
          >
            <Tv className="w-3.5 h-3.5" />
            <span>{isPidMode ? 'PID Aktif' : 'Mode PID'}</span>
          </button>

          {/* Tombol Fullscreen Layar Penuh PID (Tanpa Scroll) */}
          <button
            onClick={onToggleFullscreen}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg font-extrabold transition-all border shadow-lg ${
              isFullscreen
                ? 'bg-rose-600 hover:bg-rose-500 text-white border-rose-400 shadow-rose-950/80 animate-pulse'
                : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white border-emerald-400/80 shadow-emerald-950/60'
            }`}
            title={isFullscreen ? 'Keluar dari Mode Layar Penuh' : 'Aktifkan Layar Penuh PID (Full Screen Tanpa Scroll)'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            <span>{isFullscreen ? 'Keluar Fullscreen' : 'FULL SCREEN (PID)'}</span>
          </button>

          {/* Proclamation Ceremony Button */}
          <button
            onClick={onOpenProclamation}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold shadow-md shadow-red-950/60 border border-red-400/40 animate-pulse transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Proklamasi 17 Ags</span>
          </button>

          {/* Timeline Drawer Button */}
          <button
            onClick={onOpenTimeline}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-amber-600/90 hover:bg-amber-500 text-stone-950 font-bold shadow-md transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-950" />
            <span className="hidden sm:inline">Garis Waktu (1511–1945)</span>
            <span className="sm:hidden">Kronologi</span>
          </button>
        </div>
      </div>
    </header>
  );
};
