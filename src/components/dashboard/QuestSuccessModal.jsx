import React, { useEffect, useState } from 'react';
import useStore, { selectLevel, selectTitle, selectXPInCurrentLevel } from '../../store/useStore';

/**
 * QuestSuccessModal - Celebratory feedback when a quest is completed.
 * Refined for a smaller, glassmorphic layout.
 */
const QuestSuccessModal = () => {
  const active = useStore((s) => s.successModalActive);
  const setSuccessModal = useStore((s) => s.setSuccessModal);
  const lastXPGained = useStore((s) => s.lastXPGained);
  const didLevelUp = useStore((s) => s.didLevelUp);
  
  const level = useStore(selectLevel);
  const title = useStore(selectTitle);
  const xpInLevel = useStore(selectXPInCurrentLevel);
  
  // Local state for progress bar animation
  const [displayXP, setDisplayXP] = useState(0);

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        setDisplayXP(xpInLevel);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setDisplayXP(0);
    }
  }, [active, xpInLevel]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 max-w-xs w-full shadow-2xl border border-white/20 flex flex-col items-center text-center animate-fade-in-scale text-white">
        
        {/* Success Icon / Level Up Indicator */}
        <div className={`
          w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner transition-colors duration-700 border border-white/10
          ${didLevelUp ? 'bg-[#81E6D9]/20' : 'bg-black/20'}
        `}>
          {didLevelUp ? '🎊' : '✨'}
        </div>

        {didLevelUp ? (
          <div className="animate-bounce mb-1">
            <h2 className="text-xl font-black tracking-widest uppercase">Level Up!</h2>
            <p className="text-[#81E6D9] font-bold text-[10px] tracking-widest">New Milestone Reached</p>
          </div>
        ) : (
          <h3 className="text-lg font-bold tracking-wide mb-1">
            Quest Complete!
          </h3>
        )}

        <div className="text-2xl font-black text-[#81E6D9] mb-5 animate-pulse drop-shadow-[0_0_10px_rgba(129,230,217,0.5)]">
          +{lastXPGained} XP
        </div>

        {/* Progression Info */}
        <div className="w-full mb-6">
          <div className="flex justify-between items-center mb-1.5 px-0.5">
            <span className="text-[9px] font-black tracking-widest text-white/60 uppercase">Level {level}</span>
            <span className="text-[9px] font-bold tracking-wide text-white/80">{xpInLevel}/50 XP</span>
          </div>
          
          {/* Progress Bar Container */}
          <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden shadow-inner border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-[#81E6D9] to-[#68D391] transition-all duration-[1500ms] ease-out rounded-full shadow-[0_0_8px_rgba(129,230,217,0.5)]"
              style={{ width: `${(displayXP / 50) * 100}%` }}
            />
          </div>
          
          {didLevelUp && (
            <p className="mt-3 text-[10px] font-bold tracking-wide text-white/80 animate-fade-in">
              Current Title: <span className="text-[#81E6D9] italic">{title}</span>
            </p>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => setSuccessModal(false)}
          className="w-full py-3 bg-white/10 border border-white/20 rounded-xl text-[10px] font-black tracking-[0.2em] text-white uppercase hover:bg-white/20 transition-all duration-300"
        >
          Back to Map
        </button>
      </div>
    </div>
  );
};

export default QuestSuccessModal;
