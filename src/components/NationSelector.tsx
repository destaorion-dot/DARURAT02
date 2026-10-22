import React from 'react';
import { FOREIGN_NATIONS } from '../data/historyData';
import { ForeignNation } from '../types/history';
import { Ship, Anchor, Compass, Info, Route, Play, ChevronRight, X } from 'lucide-react';

interface NationSelectorProps {
  selectedNation: ForeignNation | null;
  onSelectNation: (nation: ForeignNation) => void;
  onLaunchVoyage: (nation: ForeignNation) => void;
  isSailing: boolean;
  sailingProgress: number; // 0 to 1
  onCloseNation: () => void;
  onOpenColonizationModal: () => void;
  activeColonizationStepIndex: number | null;
  onSelectColonizationStep: (index: number) => void;
}

export const NationSelector: React.FC<NationSelectorProps> = ({
  selectedNation,
  onSelectNation,
  onLaunchVoyage,
  isSailing,
  sailingProgress,
  onCloseNation,
  onOpenColonizationModal,
  activeColonizationStepIndex,
  onSelectColonizationStep
}) => {
  return (
    <div className="w-full bg-stone-900/90 backdrop-blur-md border-b border-stone-800 py-2 px-3 sm:px-6 z-20 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Foreign Flags Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
            <Ship className="w-3.5 h-3.5 text-amber-400" />
            Bangsa Asing:
          </span>
          {FOREIGN_NATIONS.map((nation) => {
            const isSelected = selectedNation?.id === nation.id;
            return (
              <button
                key={nation.id}
                onClick={() => {
                  onSelectNation(nation);
                  onLaunchVoyage(nation);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-bold border-amber-300 shadow-lg shadow-amber-950/40 scale-105'
                    : 'bg-stone-800/80 hover:bg-stone-700/80 text-stone-300 border-stone-700/80 hover:border-stone-500'
                }`}
              >
                <span className="text-base sm:text-lg leading-none">{nation.flag}</span>
                <span className="truncate max-w-[120px] sm:max-w-none">{nation.name.split(' ')[0]}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-amber-900/40 text-stone-950' : 'bg-stone-900 text-stone-400'}`}>
                  {nation.firstArrivalYear.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Nation Quick Status / Voyage Controller */}
        {selectedNation && (
          <div className="flex items-center flex-wrap gap-2 text-xs bg-stone-950/70 py-1.5 px-3 rounded-lg border border-amber-900/40 justify-between md:justify-end animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="text-base">{selectedNation.flag}</span>
              <div>
                <span className="font-bold text-amber-200">{selectedNation.name}</span>
                <span className="text-stone-400 text-[11px] hidden sm:inline"> • Tiba di {selectedNation.landingPort}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Play voyage animation button */}
              <button
                onClick={() => onLaunchVoyage(selectedNation)}
                disabled={isSailing}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                  isSailing
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-amber-600 hover:bg-amber-500 text-stone-950 shadow'
                }`}
                title="Mulai animasi pelayaran kapal dari negara asal ke Nusantara"
              >
                <Play className={`w-3 h-3 ${isSailing ? 'animate-spin' : ''}`} />
                <span>{isSailing ? `Berlayar (${Math.round(sailingProgress * 100)}%)` : 'Luncurkan Kapal'}</span>
              </button>

              {/* View Colonization Path (Alur Jajahan) */}
              <button
                onClick={onOpenColonizationModal}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold bg-stone-800 hover:bg-stone-700 text-amber-200 border border-stone-700"
              >
                <Route className="w-3 h-3 text-amber-400" />
                <span>Alur Jajahan ({selectedNation.colonizationSteps.length})</span>
              </button>

              {/* Close selection */}
              <button
                onClick={onCloseNation}
                className="p-1 text-stone-400 hover:text-stone-200 rounded hover:bg-stone-800"
                title="Tutup pilihan"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mini Colonization Step Selector bar when a nation is selected */}
      {selectedNation && selectedNation.colonizationSteps.length > 0 && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-stone-800/80 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
          <span className="text-[10px] font-semibold text-stone-400 shrink-0 uppercase tracking-wide">
            Kronologi Ekspansi:
          </span>
          {selectedNation.colonizationSteps.map((step, idx) => {
            const isStepActive = activeColonizationStepIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => onSelectColonizationStep(idx)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] shrink-0 transition-all border ${
                  isStepActive
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-medium'
                    : 'bg-stone-950/50 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                <span className="font-mono text-[10px] text-amber-400">{step.year}</span>
                <span className="truncate max-w-[140px]">{step.locationName}</span>
                <ChevronRight className="w-2.5 h-2.5 opacity-60" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
