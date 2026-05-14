import React, { useEffect, useState } from 'react';
import useStore, { selectLevel, selectTitle, selectXPInCurrentLevel } from '../../store/useStore';

/**
 * QuestSuccessModal - Celebratory feedback when a quest is completed.
 * Features an animated XP progress bar and level-up state.
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
      // Small delay to let the modal animate in before bar fills
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
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#F4F7F6]/80 backdrop-blur-sm p-6 animate-fade-in">
      <div className="bg-[#FDFBF7] rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-[#E8E5DF] flex flex-col items-center text-center animate-fade-in-scale">
        
        {/* Success Icon / Level Up Indicator */}
        <div className={`
          w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner transition-colors duration-700
          ${didLevelUp ? 'bg-[#81E6D9]/30' : 'bg-[#F4F7F6]'}
        `}>
          {didLevelUp ? '🎊' : '✨'}
        </div>

        {didLevelUp ? (
          <div className="animate-bounce mb-2">
            <h2 className="text-2xl font-black tracking-widest text-[#4A5568] uppercase">Level Up!</h2>
            <p className="text-[#81E6D9] font-bold text-sm tracking-widest">New Milestone Reached</p>
          </div>
        ) : (
          <h3 className="text-xl font-bold tracking-wide text-[#4A5568] mb-1">
            Quest Complete!
          </h3>
        )}

        <div className="text-3xl font-black text-[#81E6D9] mb-6 animate-pulse">
          +{lastXPGained} XP
        </div>

        {/* Progression Info */}
        <div className="w-full mb-8">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-[10px] font-black tracking-widest text-[#718096] uppercase">Level {level}</span>
            <span className="text-[10px] font-bold tracking-wide text-[#A0AEC0]">{xpInLevel}/50 XP</span>
          </div>
          
          {/* Progress Bar Container */}
          <div className="h-4 w-full bg-[#E8E5DF] rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-[#81E6D9] to-[#68D391] transition-all duration-[1500ms] ease-out rounded-full"
              style={{ width: `${(displayXP / 50) * 100}%` }}
            />
          </div>
          
          {didLevelUp && (
            <p className="mt-4 text-xs font-bold tracking-wide text-[#4A5568] animate-fade-in">
              Current Title: <span className="text-[#718096] italic">{title}</span>
            </p>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => setSuccessModal(false)}
          className="w-full py-4 bg-white border-2 border-[#E8E5DF] rounded-2xl text-xs font-bold tracking-[0.2em] text-[#4A5568] uppercase hover:bg-[#F4F7F6] hover:border-[#81E6D9] transition-all duration-300"
        >
          Back to Quest Map
        </button>
      </div>
    </div>
  );
};

export default QuestSuccessModal;
