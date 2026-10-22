import React, { useState } from 'react';
import { FULL_TIMELINE, PROCLAMATION_NOTES } from '../data/historyData';
import { TimelineEntry } from '../types/history';
import { X, Search, Calendar, ChevronRight, Flag, Flame, Ship, Award, BookOpen, Sparkles, Filter, Printer } from 'lucide-react';

interface TimelineDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent: (eventId: string) => void;
  onOpenProclamation: () => void;
}

export const TimelineDrawer: React.FC<TimelineDrawerProps> = ({
  isOpen,
  onClose,
  onSelectEvent,
  onOpenProclamation
}) => {
  const [selectedStage, setSelectedStage] = useState<0 | 1 | 2 | 3>(0); // 0 = all
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredEvents = FULL_TIMELINE.filter((ev) => {
    const matchesStage = selectedStage === 0 || ev.stage === selectedStage;
    const matchesSearch =
      searchQuery === '' ||
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-xl bg-stone-900 border-l border-stone-800 h-full flex flex-col text-stone-100 shadow-2xl animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950 border-b border-stone-800">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-cinzel text-base sm:text-lg font-bold text-amber-100">
                  Garis Waktu Menuju Kemerdekaan
                </h2>
                <p className="text-[11px] text-stone-400">
                  Kronologi Lengkap 1511 hingga Pengesahan Negara RI 1945
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => window.print()}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-all text-xs flex items-center gap-1"
                title="Cetak atau Simpan sebagai PDF"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Cetak / PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="mt-3 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari peristiwa, tokoh (Diponegoro, Soekarno, PETA, VOC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-950/80 border border-stone-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Stage Tabs (3 Tahap Besar) */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            <button
              onClick={() => setSelectedStage(0)}
              className={`px-2.5 py-1 rounded-md transition-all font-medium shrink-0 ${
                selectedStage === 0
                  ? 'bg-amber-600 text-stone-950 font-bold'
                  : 'bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              Semua ({FULL_TIMELINE.length})
            </button>
            <button
              onClick={() => setSelectedStage(1)}
              className={`px-2.5 py-1 rounded-md transition-all font-medium shrink-0 flex items-center gap-1 ${
                selectedStage === 1
                  ? 'bg-red-700 text-white font-bold'
                  : 'bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>1. Perlawanan Daerah</span>
            </button>
            <button
              onClick={() => setSelectedStage(2)}
              className={`px-2.5 py-1 rounded-md transition-all font-medium shrink-0 flex items-center gap-1 ${
                selectedStage === 2
                  ? 'bg-blue-700 text-white font-bold'
                  : 'bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>2. Pergerakan Nasional</span>
            </button>
            <button
              onClick={() => setSelectedStage(3)}
              className={`px-2.5 py-1 rounded-md transition-all font-medium shrink-0 flex items-center gap-1 ${
                selectedStage === 3
                  ? 'bg-rose-600 text-white font-bold'
                  : 'bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>3. Proklamasi 1945</span>
            </button>
          </div>
        </div>

        {/* Timeline Events List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-xs">
              Tidak ada peristiwa yang cocok dengan pencarian "{searchQuery}"
            </div>
          ) : (
            filteredEvents.map((ev, index) => {
              const isProclamationEvent = ev.category === 'proklamasi' && ev.year.includes('17 Agustus 1945');
              return (
                <div
                  key={ev.id}
                  onClick={() => {
                    if (isProclamationEvent) {
                      onOpenProclamation();
                    } else {
                      onSelectEvent(ev.id);
                    }
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer group relative ${
                    isProclamationEvent
                      ? 'bg-gradient-to-r from-red-950/70 to-rose-900/60 border-red-500 shadow-lg shadow-red-950/50'
                      : 'bg-stone-950/60 hover:bg-stone-950 border-stone-800 hover:border-amber-700/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        ev.stage === 1
                          ? 'bg-red-950 text-red-300 border border-red-800/40'
                          : ev.stage === 2
                          ? 'bg-blue-950 text-blue-300 border border-blue-800/40'
                          : 'bg-rose-950 text-rose-300 border border-rose-800/40'
                      }`}>
                        {ev.year}
                      </span>

                      <span className="text-xs">
                        {ev.category === 'peperangan' && '💥'}
                        {ev.category === 'pelayaran' && '⛵'}
                        {ev.category === 'pergerakan' && '📜'}
                        {ev.category === 'persiapan' && '⚡'}
                        {ev.category === 'proklamasi' && '🇮🇩'}
                      </span>
                    </div>

                    <span className="text-[10px] text-stone-500 font-mono">
                      #{index + 1}
                    </span>
                  </div>

                  <h3 className={`font-cinzel text-xs sm:text-sm font-bold mt-1.5 transition-colors ${
                    isProclamationEvent
                      ? 'text-white'
                      : 'text-stone-200 group-hover:text-amber-300'
                  }`}>
                    {ev.title}
                  </h3>

                  <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                    {ev.summary}
                  </p>

                  <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-amber-400/80 group-hover:text-amber-300 font-medium">
                    <span>Lihat di Peta & Detail</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })
          )}

          {/* Kesimpulan Sejarah Card */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-stone-950 to-stone-900 border border-amber-900/40 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-cinzel text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Kesimpulan Perjalanan Sejarah Bangsa</span>
            </div>
            <div className="text-xs text-stone-300 space-y-2 font-serif-vintage leading-relaxed">
              <p>
                <strong>1. Tahap Perlawanan Daerah:</strong> Kerajaan dan rakyat melawan dominasi Portugis, VOC, serta pemerintah kolonial Belanda. Perjuangan awal ini mempertahankan kedaulatan kerajaan, daerah, agama, dan hak berniaga.
              </p>
              <p>
                <strong>2. Tahap Pergerakan Nasional:</strong> Perjuangan beralih melalui pendidikan modern, persuratkabaran, organisasi politik, dan pembentukan identitas tunggal bangsa Indonesia (Sumpah Pemuda 1928).
              </p>
              <p>
                <strong>3. Tahap Persiapan & Proklamasi:</strong> Runtuhnya militer Jepang, dialektika pemuda-tua di Rengasdengklok, perumusan di kediaman Maeda, hingga pembacaan Proklamasi 17 Agustus 1945 di Pegangsaan Timur 56.
              </p>
              <div className="p-3 bg-red-950/40 rounded-lg border border-red-800/40 text-red-200 text-xs italic">
                <strong>Hal Paling Mendasar:</strong> Proklamasi adalah pernyataan kemerdekaan, bukan akhir seluruh perjuangan. Setelah 17 Agustus 1945, bangsa Indonesia masih harus mempertahankan kemerdekaannya melalui perang gerilya bersenjata maupun diplomasi internasional menghadapi kembalinya tentara Belanda.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
