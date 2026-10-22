import React from 'react';
import { BattleEvent } from '../types/history';
import { Flame, X, Shield, Swords, ExternalLink, Volume2, MapPin, Calendar, Users, Target, CheckCircle2 } from 'lucide-react';
import { playCannonBlast } from '../utils/audioEffects';

interface BattleModalProps {
  battle: BattleEvent | null;
  onClose: () => void;
  onFocusMap: (coords: { lat: number; lng: number }) => void;
}

export const BattleModal: React.FC<BattleModalProps> = ({ battle, onClose, onFocusMap }) => {
  if (!battle) return null;

  const googleMapsUrl = `https://www.google.com/maps?q=${battle.coordinates.lat},${battle.coordinates.lng}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-stone-900 border-2 border-red-700/60 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-red-950/70 text-stone-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Battle Fire Embers */}
        <div className="bg-gradient-to-r from-red-950 via-stone-900 to-amber-950 p-4 sm:p-6 border-b border-red-800/40 sticky top-0 z-10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 via-orange-600 to-amber-600 flex items-center justify-center shadow-lg shadow-red-900/60 border border-red-400 text-2xl animate-fire-glow">
                💥
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-900/60 text-red-200 border border-red-700/50 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-400" /> MEDAN PERANG KOLONIAL
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-800/40">
                    Tahun {battle.year}
                  </span>
                </div>
                <h2 className="font-cinzel text-lg sm:text-xl font-bold text-amber-100 mt-1">
                  {battle.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => playCannonBlast()}
                className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-amber-300 border border-red-800/50 transition-all"
                title="Dentuman Meriam"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-all"
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-400 mt-3">
            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="truncate">{battle.location}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-5 text-sm">
          {/* Opponent & Commanders Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-stone-950/80 border border-red-900/40">
              <div className="flex items-center gap-2 text-red-400 font-semibold text-xs mb-1.5 uppercase tracking-wide">
                <Shield className="w-3.5 h-3.5" /> Pihak Pejuang Nusantara
              </div>
              <p className="font-bold text-stone-200 text-sm mb-2">{battle.opponents.nusantara}</p>
              <div className="text-xs text-stone-400">
                <span className="text-stone-500 font-medium">Panglima / Tokoh:</span>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-stone-300">
                  {battle.leaders.nusantara.map((leader, i) => (
                    <li key={i}>{leader}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
              <div className="flex items-center gap-2 text-stone-400 font-semibold text-xs mb-1.5 uppercase tracking-wide">
                <Swords className="w-3.5 h-3.5 text-amber-400" /> Pihak Penjajah Asing
              </div>
              <p className="font-bold text-stone-300 text-sm mb-2">{battle.opponents.foreign}</p>
              <div className="text-xs text-stone-400">
                <span className="text-stone-500 font-medium">Panglima / Komandan:</span>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-stone-300">
                  {battle.leaders.foreign.map((leader, i) => (
                    <li key={i}>{leader}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Apa yang terjadi */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
            <h3 className="font-cinzel text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span>⚔️</span> Apa yang Terjadi:
            </h3>
            <p className="text-stone-200 leading-relaxed font-serif-vintage text-xs sm:text-sm">
              {battle.whatHappened}
            </p>
          </div>

          {/* Mengapa terjadi / Penyebab */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
            <h3 className="font-cinzel text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span>🔥</span> Penyebab & Mengapa Terjadi:
            </h3>
            <p className="text-stone-300 leading-relaxed text-xs sm:text-sm">
              {battle.causes}
            </p>
          </div>

          {/* Tujuan Perlawanan */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
            <h3 className="font-cinzel text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-red-400" /> Tujuan Perlawanan:
            </h3>
            <p className="text-stone-300 leading-relaxed text-xs sm:text-sm">
              {battle.purpose}
            </p>
          </div>

          {/* Hasil & Dampak */}
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/50 space-y-1.5">
            <h3 className="font-cinzel text-amber-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Hasil & Dampak Sejarah:
            </h3>
            <p className="text-stone-200 leading-relaxed text-xs sm:text-sm">
              {battle.impactAndResult}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 sticky bottom-0">
          <button
            onClick={() => {
              onFocusMap(battle.coordinates);
              onClose();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold transition-all border border-stone-700"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Fokuskan Peta ke Medan Ini</span>
          </button>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md"
            title="Buka titik koordinat di Google Maps untuk melihat citra satelit dan Street View modern"
          >
            <span>Buka di Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
