import React from 'react';
import { ForeignNation } from '../types/history';
import { X, Ship, Compass, Anchor, ExternalLink, Play, MapPin, Route, ShieldAlert, BookOpen } from 'lucide-react';

interface NationDetailModalProps {
  nation: ForeignNation | null;
  onClose: () => void;
  onLaunchVoyage: (nation: ForeignNation) => void;
  onSelectColonizationStep: (index: number) => void;
  onFocusMap: (coords: { lat: number; lng: number }) => void;
}

export const NationDetailModal: React.FC<NationDetailModalProps> = ({
  nation,
  onClose,
  onLaunchVoyage,
  onSelectColonizationStep,
  onFocusMap
}) => {
  if (!nation) return null;

  const googleMapsUrl = `https://www.google.com/maps?q=${nation.landingCoords.lat},${nation.landingCoords.lng}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-stone-900 border-2 border-amber-600/60 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-amber-950/70 text-stone-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950 p-4 sm:p-6 border-b border-amber-800/40 sticky top-0 z-10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-stone-950 flex items-center justify-center shadow-lg border border-amber-600/50 text-3xl">
                {nation.flag}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700/50">
                    EKSPEDISI SAMUDRA & KOLONIALISME
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                    Tiba: {nation.firstArrivalYear}
                  </span>
                </div>
                <h2 className="font-cinzel text-lg sm:text-2xl font-bold text-amber-200 mt-1">
                  Bangsa {nation.name}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onLaunchVoyage(nation)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition-all shadow"
                title="Luncurkan animasi kapal berlayar di peta"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Animasi Pelayaran</span>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 text-xs text-stone-300">
            <div className="flex items-center gap-1.5 bg-stone-950/60 p-2 rounded-lg border border-stone-800">
              <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <div>
                <span className="text-stone-500 text-[10px] block">Asal Keberangkatan:</span>
                <span className="font-medium text-stone-200">{nation.originCity}, {nation.originCountry}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-stone-950/60 p-2 rounded-lg border border-stone-800">
              <Anchor className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <div>
                <span className="text-stone-500 text-[10px] block">Pendaratan Pertama di RI:</span>
                <span className="font-medium text-stone-200">{nation.landingPort}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-stone-950/60 p-2 rounded-lg border border-stone-800">
              <Ship className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-stone-500 text-[10px] block">Armada Kapal:</span>
                <span className="font-medium text-stone-200 truncate">{nation.shipNames.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 text-sm">
          {/* Motive & Leaders */}
          <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-2">
            <h3 className="font-cinzel text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span>🎯</span> Latar Belakang & Motivasi Kedatangan:
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {nation.motive}
            </p>
            <div className="pt-2 text-xs text-stone-400 border-t border-stone-800/80">
              <strong className="text-amber-200">Panglima / Pemimpin Ekspedisi:</strong>{' '}
              {nation.expeditionLeaders.join(' • ')}
            </div>
          </div>

          {/* Kisah Kedatangan Perdana */}
          <div className="space-y-3">
            <h3 className="font-cinzel text-amber-200 text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b border-stone-800 pb-2">
              <BookOpen className="w-4 h-4 text-amber-400" /> Kisah Pelayaran & Pendaratan Perdana
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-stone-950/50 p-3 rounded-xl border border-stone-800 space-y-1">
                <span className="font-semibold text-amber-400 uppercase text-[10px] tracking-wide block">
                  Mengapa Datang ke Nusantara:
                </span>
                <p className="text-stone-300 leading-relaxed font-serif-vintage">
                  {nation.arrivalStory.whyTheyCame}
                </p>
              </div>
              <div className="bg-stone-950/50 p-3 rounded-xl border border-stone-800 space-y-1">
                <span className="font-semibold text-amber-400 uppercase text-[10px] tracking-wide block">
                  Bagaimana Mereka Berlayar & Tiba:
                </span>
                <p className="text-stone-300 leading-relaxed font-serif-vintage">
                  {nation.arrivalStory.howTheyArrived}
                </p>
              </div>
            </div>
            <div className="bg-amber-950/20 p-3 rounded-xl border border-amber-900/40 text-xs text-amber-200">
              <strong>Pulau & Titik Pertemuan Pertama:</strong> {nation.arrivalStory.firstIslandEncounter}
            </div>
          </div>

          {/* Alur Jajahan di Indonesia (Colonization Path) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <h3 className="font-cinzel text-amber-200 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <Route className="w-4 h-4 text-red-400" /> Alur Jajahan & Penaklukan Wilayah Indonesia
              </h3>
              <span className="text-[11px] text-stone-400 font-mono">
                {nation.colonizationSteps.length} Fase Utama
              </span>
            </div>

            <p className="text-xs text-stone-400">
              Berikut alur kronologis ekspansi kolonial dan perlawanan rakyat yang dihadapi oleh {nation.name}:
            </p>

            <div className="space-y-3">
              {nation.colonizationSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-stone-950/80 rounded-xl p-4 border border-stone-800 hover:border-amber-700/60 transition-all space-y-2 relative"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center border border-amber-500/40">
                        {idx + 1}
                      </span>
                      <span className="font-mono text-xs font-bold text-amber-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-700">
                        {step.year}
                      </span>
                      <h4 className="font-cinzel font-bold text-sm text-stone-100">
                        {step.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => {
                        onSelectColonizationStep(idx);
                        onFocusMap(step.coordinates);
                        onClose();
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 text-[11px] rounded bg-stone-800 hover:bg-stone-700 text-amber-300 font-medium transition-all border border-stone-700"
                    >
                      <MapPin className="w-3 h-3 text-red-400" />
                      <span>{step.locationName}</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif-vintage pl-8">
                    {step.description}
                  </p>

                  <div className="text-xs text-amber-200/90 pl-8 pt-1 flex items-start gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Dampak bagi Nusantara:</strong> {step.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 sticky bottom-0">
          <button
            onClick={() => {
              onFocusMap(nation.landingCoords);
              onClose();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold transition-all border border-stone-700"
          >
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            <span>Fokus ke Pulau Pendaratan ({nation.landingPort.split(' ')[0]})</span>
          </button>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md"
            title="Buka titik pendaratan pertama di Google Maps"
          >
            <span>Buka di Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
