import React, { useState } from 'react';
import { MilestoneEvent } from '../types/history';
import { PROCLAMATION_TEXT_AUTHENTIC, PROCLAMATION_NOTES } from '../data/historyData';
import { X, ExternalLink, Volume2, VolumeX, MapPin, Users, Award, BookOpen, Sparkles, Flag, Scroll } from 'lucide-react';
import { speakText, stopSpeaking, playIndependenceFanfare } from '../utils/audioEffects';

interface MilestoneModalProps {
  milestone: MilestoneEvent | null;
  onClose: () => void;
  onFocusMap: (coords: { lat: number; lng: number }) => void;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({ milestone, onClose, onFocusMap }) => {
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);

  if (!milestone) return null;

  const isProclamation = milestone.id === 'hari-proklamasi-17-agustus' || milestone.proclamationText;
  const googleMapsUrl = `https://www.google.com/maps?q=${milestone.coordinates.lat},${milestone.coordinates.lng}`;

  const handleReadProclamation = () => {
    if (isPlayingSpeech) {
      stopSpeaking();
      setIsPlayingSpeech(false);
    } else {
      setIsPlayingSpeech(true);
      playIndependenceFanfare();
      const readText = `Proklamasi. Kami bangsa Indonesia dengan ini menyatakan kemerdekaan Indonesia. Hal-hal yang mengenai pemindahan kekuasaan dan lain-lain, diselenggarakan dengan cara saksama dan dalam tempo yang sesingkat-singkatnya. Djakarta, hari 17 bulan 8 tahun 05. Atas nama bangsa Indonesia, Soekarno, Hatta. Merdeka!`;
      speakText(readText, () => setIsPlayingSpeech(false));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-stone-900 border-2 border-red-500/70 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-red-950/80 text-stone-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Indonesian Flag Badge */}
        <div className="bg-gradient-to-r from-red-900 via-rose-950 to-stone-900 p-4 sm:p-6 border-b border-red-700/50 sticky top-0 z-10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-red-600 to-white flex items-center justify-center shadow-lg shadow-red-900/60 border border-white/40 text-2xl animate-flag-wave">
                🇮🇩
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-950/80 text-red-200 border border-red-500/60 flex items-center gap-1">
                    <Flag className="w-3 h-3 text-red-400" /> TONGGAK SEJARAH BANGSA
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-stone-950/80 text-amber-300 border border-amber-800/50">
                    {milestone.date}
                  </span>
                </div>
                <h2 className="font-cinzel text-lg sm:text-xl font-bold text-white mt-1">
                  {milestone.title}
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-all"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-300 mt-3">
            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="truncate">{milestone.location}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-5 text-sm">
          {/* Key Figures */}
          <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-2 uppercase tracking-wide">
              <Users className="w-3.5 h-3.5" /> Tokoh-tokoh Bersejarah:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {milestone.figures.map((figure, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs bg-stone-900 border border-stone-700 text-amber-200 font-medium"
                >
                  {figure}
                </span>
              ))}
            </div>
          </div>

          {/* Authentic Proclamation Box (If Proclamation milestone) */}
          {isProclamation && (
            <div className="p-5 rounded-xl bg-amber-950/30 border-2 border-amber-600/60 shadow-inner space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-amber-700/50 pb-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider font-cinzel">
                  <Scroll className="w-4 h-4 text-amber-400" /> Naskah Otentik Teks Proklamasi 1945
                </div>
                <button
                  onClick={handleReadProclamation}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                    isPlayingSpeech
                      ? 'bg-red-600 text-white border-red-400 animate-pulse'
                      : 'bg-amber-600 hover:bg-amber-500 text-stone-950 border-amber-400 shadow'
                  }`}
                  title="Dengarkan pembacaan teks Proklamasi"
                >
                  {isPlayingSpeech ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isPlayingSpeech ? 'Hentikan Suara' : 'Dengarkan Proklamasi'}</span>
                </button>
              </div>

              {/* Naskah Teks Monospace Vintage */}
              <div className="bg-stone-950/90 p-4 rounded-lg border border-amber-900/60 text-center font-mono text-amber-100 text-sm sm:text-base leading-relaxed tracking-wide whitespace-pre-line shadow-inner">
                {PROCLAMATION_TEXT_AUTHENTIC}
              </div>

              <div className="text-[11px] text-amber-200/90 italic bg-amber-950/50 p-2.5 rounded border border-amber-800/40">
                📌 <strong>Catatan Penanggalan:</strong> {PROCLAMATION_NOTES.calendarNote}
              </div>

              {/* 3 Makna Utama Teks Proklamasi */}
              <div className="mt-3 space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                  Tiga Makna Utama Teks Proklamasi:
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-300">
                  {PROCLAMATION_NOTES.significancePoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-stone-950/50 p-2 rounded border border-stone-800/60">
                      <span className="text-amber-400 font-bold shrink-0">{idx + 1}.</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Apa yang terjadi */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
            <h3 className="font-cinzel text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Peristiwa yang Berlangsung:
            </h3>
            <p className="text-stone-200 leading-relaxed font-serif-vintage text-xs sm:text-sm">
              {milestone.whatHappened}
            </p>
          </div>

          {/* Penyebab / Latar Belakang jika ada */}
          {milestone.causes && (
            <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-1.5">
              <h3 className="font-cinzel text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Latar Belakang & Penyebab:
              </h3>
              <p className="text-stone-300 leading-relaxed text-xs sm:text-sm">
                {milestone.causes}
              </p>
            </div>
          )}

          {/* Arti Penting & Hasil */}
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/50 space-y-1.5">
            <h3 className="font-cinzel text-red-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-red-400" /> Arti Penting bagi Kemerdekaan:
            </h3>
            <p className="text-stone-200 leading-relaxed text-xs sm:text-sm font-medium">
              {milestone.importance}
            </p>
            {milestone.outcomes && (
              <p className="text-stone-400 text-xs mt-1 border-t border-stone-800 pt-1.5">
                <strong className="text-stone-300">Dampak Kelanjutan:</strong> {milestone.outcomes}
              </p>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 sticky bottom-0">
          <button
            onClick={() => {
              stopSpeaking();
              onFocusMap(milestone.coordinates);
              onClose();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold transition-all border border-stone-700"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Fokuskan Peta ke Lokasi Ini</span>
          </button>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md"
            title="Buka titik koordinat di Google Maps"
          >
            <span>Buka di Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
