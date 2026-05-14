import React from 'react';
import useStore from '../../store/useStore';

/**
 * QuestRetryModal - Mistake-friendly feedback when a student needs to try again.
 * Zero-penalty approach using soft amber/neutral tones.
 */
const QuestRetryModal = () => {
  const active = useStore((s) => s.retryModalActive);
  const setRetryModal = useStore((s) => s.setRetryModal);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#F4F7F6]/80 backdrop-blur-sm p-6 animate-fade-in">
      <div className="bg-[#FDFBF7] rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-[#E8E5DF] flex flex-col items-center text-center animate-fade-in-scale">
        
        {/* Rek Mascot Looking Encouraging */}
        <div className="w-24 h-24 bg-[#F4F7F6] rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner">
          🦎
        </div>

        <h3 className="text-xl font-bold tracking-wide text-[#4A5568] mb-2">
          Almost there!
        </h3>
        <p className="text-sm font-medium tracking-wide text-[#718096] leading-relaxed mb-6">
          Let's try looking at it from another angle. You've got this!
        </p>

        {/* Zero Penalty Guarantee */}
        <div className="bg-[#FEFCBF]/50 border border-[#FEFCBF] rounded-xl px-4 py-2 mb-8 flex items-center gap-2">
          <span className="text-sm">🌟</span>
          <span className="text-[10px] font-black tracking-widest text-[#975A16] uppercase">
            Zero Penalty: You haven't lost any XP or points.
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setRetryModal(false)}
          className="w-full py-4 bg-white border-2 border-[#E8E5DF] rounded-2xl text-xs font-bold tracking-[0.2em] text-[#4A5568] uppercase hover:bg-[#F4F7F6] transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default QuestRetryModal;
