import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Volume2, VolumeX, Sparkles, MapPin, ExternalLink, Flag, BookOpen, Scroll } from 'lucide-react';
import { PROCLAMATION_TEXT_AUTHENTIC, PROCLAMATION_NOTES } from '../data/historyData';
import { playIndependenceFanfare, speakText, stopSpeaking } from '../utils/audioEffects';

interface ProclamationCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  onFocusMap: (coords: { lat: number; lng: number }) => void;
}

export const ProclamationCelebration: React.FC<ProclamationCelebrationProps> = ({
  isOpen,
  onClose,
  onFocusMap
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    if (isOpen) {
      playIndependenceFanfare();
      // Trigger Red & White Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#ffffff', '#dc2626', '#fca5a5']
        });
      } catch {
        // Ignore confetti error
      }
    } else {
      stopSpeaking();
      setIsPlayingAudio(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const coordinates = { lat: -6.2008, lng: 106.8488 }; // Jl. Pegangsaan Timur 56, Jakarta
  const googleMapsUrl = `https://www.google.com/maps?q=-6.2008,106.8488`;

  const handleToggleSpeech = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      playIndependenceFanfare();
      const text = `Proklamasi. Kami bangsa Indonesia dengan ini menyatakan kemerdekaan Indonesia. Hal-hal yang mengenai pemindahan kekuasaan dan lain-lain, diselenggarakan dengan cara saksama dan dalam tempo yang sesingkat-singkatnya. Djakarta, hari 17 bulan 8 tahun 05. Atas nama bangsa Indonesia, Soekarno, Hatta. Merdeka!`;
      speakText(text, () => setIsPlayingAudio(false));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-stone-900 border-2 border-red-500 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl shadow-red-900/90 text-stone-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with Fluttering Indonesian Flag */}
        <div className="bg-gradient-to-r from-red-700 via-rose-800 to-red-950 p-6 sm:p-8 text-center border-b border-red-500/50 relative overflow-hidden">
          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-stone-300 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-b from-red-600 via-red-500 to-white shadow-xl border-2 border-white/80 text-4xl mb-3 animate-flag-wave">
            🇮🇩
          </div>

          <div className="text-xs font-bold text-amber-300 tracking-widest uppercase mb-1 font-cinzel">
            17 AGUSTUS 1945 — PUKUL 10.00 WIB
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white font-cinzel drop-shadow-md">
            DETIK-DETIK PROKLAMASI KEMERDEKAAN RI
          </h2>
          <p className="text-xs sm:text-sm text-red-100 font-sans mt-2 max-w-lg mx-auto">
            Halaman Rumah Bung Karno, Jalan Pegangsaan Timur No. 56, Jakarta Pusat
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* Authentic Document Scroll */}
          <div className="bg-stone-950 rounded-2xl p-6 border-2 border-amber-600/60 shadow-inner relative space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-cinzel">
                <Scroll className="w-4 h-4 text-amber-400" /> Teks Otentik Proklamasi 1945
              </div>
              <button
                onClick={handleToggleSpeech}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  isPlayingAudio
                    ? 'bg-red-600 text-white border-red-400 animate-pulse'
                    : 'bg-amber-600 hover:bg-amber-500 text-stone-950 border-amber-400 shadow'
                }`}
              >
                {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isPlayingAudio ? 'Hentikan Suara' : 'Dengarkan Pembacaan'}</span>
              </button>
            </div>

            <div className="bg-stone-900/90 p-5 rounded-xl border border-amber-800/40 text-center font-mono text-amber-100 text-base sm:text-lg leading-relaxed whitespace-pre-line tracking-wide shadow-inner">
              {PROCLAMATION_TEXT_AUTHENTIC}
            </div>

            <div className="text-xs text-amber-200/90 italic bg-amber-950/40 p-3 rounded-lg border border-amber-800/40">
              📌 <strong>Catatan Penanggalan:</strong> {PROCLAMATION_NOTES.calendarNote}
            </div>
          </div>

          {/* Tokoh Penting Pengibar & Penyelenggara */}
          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
            <h3 className="font-cinzel text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wide">
              Tokoh Kunci Upacara 17 Agustus 1945:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-stone-900/60 p-2.5 rounded-lg border border-stone-800">
                <span className="text-amber-400 font-bold block">Pembaca Naskah:</span>
                <span className="text-stone-200">Ir. Soekarno didampingi Drs. Mohammad Hatta</span>
              </div>
              <div className="bg-stone-900/60 p-2.5 rounded-lg border border-stone-800">
                <span className="text-amber-400 font-bold block">Penjahit Bendera Pusaka:</span>
                <span className="text-stone-200">Ibu Fatmawati Soekarno</span>
              </div>
              <div className="bg-stone-900/60 p-2.5 rounded-lg border border-stone-800">
                <span className="text-amber-400 font-bold block">Pengibar Sang Merah Putih:</span>
                <span className="text-stone-200">Latief Hendraningrat & Suhud Sastro Kusumo</span>
              </div>
              <div className="bg-stone-900/60 p-2.5 rounded-lg border border-stone-800">
                <span className="text-amber-400 font-bold block">Pengetik Naskah:</span>
                <span className="text-stone-200">Sayuti Melik didampingi B.M. Diah</span>
              </div>
            </div>
          </div>

          {/* Makna Teks Proklamasi */}
          <div className="space-y-2">
            <h3 className="font-cinzel text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wide">
              Tiga Makna Utama Proklamasi:
            </h3>
            <ul className="space-y-2 text-xs text-stone-300">
              {PROCLAMATION_NOTES.significancePoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 bg-stone-950 p-3 rounded-lg border border-stone-800">
                  <span className="text-red-400 font-bold text-sm shrink-0">#{i + 1}</span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 sticky bottom-0">
          <button
            onClick={() => {
              stopSpeaking();
              onFocusMap(coordinates);
              onClose();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold transition-all border border-stone-700"
          >
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            <span>Fokuskan ke Pegangsaan Timur 56 di Peta</span>
          </button>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md"
          >
            <span>Buka di Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
