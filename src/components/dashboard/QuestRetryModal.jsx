import React from 'react';
import useStore from '../../store/useStore';

/**
 * QuestRetryModal - Mistake-friendly feedback when a student needs to try again.
 * Zero-penalty approach using soft neutral/glassmorphic tones.
 */
const QuestRetryModal = () => {
  const active = useStore((s) => s.retryModalActive);
  const setRetryModal = useStore((s) => s.setRetryModal);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 max-w-xs w-full shadow-2xl border border-white/20 flex flex-col items-center text-center animate-fade-in-scale text-white">
        
        {/* Rek Mascot Looking Encouraging */}
        <div className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner border border-white/10">
          🦎
        </div>

        <h3 className="text-lg font-bold tracking-wide mb-2 text-white">
          Almost there!
        </h3>
        <p className="text-[11px] font-medium tracking-wide text-white/70 leading-relaxed mb-5">
          Let's try looking at it from another angle. You've got this!
        </p>

        {/* Zero Penalty Guarantee */}
        <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl px-3 py-2 mb-6 flex items-center gap-2 w-full justify-center">
          <span className="text-sm">🌟</span>
          <span className="text-[9px] font-black tracking-widest text-amber-200 uppercase">
            Zero Penalty: No XP lost.
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setRetryModal(false)}
          className="w-full py-3 bg-white/10 border border-white/20 rounded-xl text-[10px] font-bold tracking-[0.2em] text-white uppercase hover:bg-white/20 transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default QuestRetryModal;
