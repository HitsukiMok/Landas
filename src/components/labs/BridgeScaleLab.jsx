import React, { useState, useEffect, useRef } from 'react';
import useStore from '../../store/useStore';

/**
 * BridgeScaleLab - Grade 7-10 Math: Multi-Step Algebra
 * Visual equation balancer with 2x + 4 = 10 logic.
 */
const BridgeScaleLab = ({ onQuestComplete }) => {
  const [leftX, setLeftX] = useState(2);
  const [leftUnits, setLeftUnits] = useState(4);
  const [rightUnits, setRightUnits] = useState(10);
  const [isSolved, setIsSolved] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [rekMood, setRekMood] = useState('thinking');
  const [message, setMessage] = useState('');

  const startTime = useRef(Date.now());
  const setRetryModal = useStore((s) => s.setRetryModal);

  // Logic: 2x + 4 = 10
  // Target: 1x = 3

  useEffect(() => {
    if (leftX === 1 && leftUnits === 0 && rightUnits === 3 && !isSolved) {
      setIsSolved(true);
      setRekMood('cheering');
      setMessage('Excellent! You isolated X. X = 3');
      
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      if (onQuestComplete) {
        onQuestComplete({ timeSpent, interactionCount, energyLevel: 'High Brain Power' });
      }
    }
  }, [leftX, leftUnits, rightUnits, isSolved, onQuestComplete, interactionCount]);

  const subtractOne = () => {
    if (isSolved) return;
    setInteractionCount(prev => prev + 1);
    
    if (leftUnits > 0 && rightUnits > 0) {
      setLeftUnits(prev => prev - 1);
      setRightUnits(prev => prev - 1);
      setRekMood('thinking');
      setMessage('');
    } else {
      setRekMood('oops');
      setMessage("Wait! We can only subtract units if they are available on both sides.");
    }
  };

  const divideByTwo = () => {
    if (isSolved) return;
    setInteractionCount(prev => prev + 1);

    if (leftUnits === 0 && leftX % 2 === 0 && rightUnits % 2 === 0) {
      setLeftX(prev => prev / 2);
      setRightUnits(prev => prev / 2);
      setRekMood('thinking');
      setMessage('');
    } else {
      // Scale tips off-balance with a gentle prompt
      setRekMood('oops');
      setRetryModal(true);
      setMessage("The scale tips! We should subtract all the units first to isolate the X blocks before dividing.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-transparent text-white rounded-3xl w-full max-w-md mx-auto shadow-sm border border-white/20 animate-fade-in">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-[10px] font-black tracking-[0.2em] text-white/60 uppercase mb-1">Advanced Algebra Lab</h2>
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold text-white/90 tracking-widest">
          {leftX}X + {leftUnits} = {rightUnits}
        </div>
      </div>

      {/* The Balance Scale Area */}
      <div className="relative w-full h-64 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 mb-8 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Scale Base */}
        <div className="absolute bottom-4 w-4 h-12 bg-[#718096]/20 rounded-t-full" />
        
        {/* Scale Arm */}
        <div 
          className={`
            relative w-72 h-1 bg-[#718096] rounded-full transition-transform duration-700 ease-in-out
            ${rekMood === 'oops' ? 'rotate-6' : 'rotate-0'}
          `}
        >
          {/* Left Plate */}
          <div className="absolute -left-4 -top-2 w-28 flex flex-col items-center">
            <div className="w-0.5 h-12 bg-[#718096]/40" />
            <div className="w-24 h-2 bg-[#718096]/60 rounded-full" />
            <div className="flex flex-wrap justify-center gap-1 mt-1 max-w-[80px]">
              {[...Array(leftX)].map((_, i) => (
                <div key={`x-${i}`} className="w-6 h-6 bg-[#81E6D9] rounded-md flex items-center justify-center text-[10px] font-black text-white shadow-sm">X</div>
              ))}
              {[...Array(leftUnits)].map((_, i) => (
                <div key={`u-l-${i}`} className="w-4 h-4 bg-[#B2D8E8] rounded-sm flex items-center justify-center text-[8px] font-bold text-white/90 shadow-sm">1</div>
              ))}
            </div>
          </div>

          {/* Right Plate */}
          <div className="absolute -right-4 -top-2 w-28 flex flex-col items-center">
            <div className="w-0.5 h-12 bg-[#718096]/40" />
            <div className="w-24 h-2 bg-[#718096]/60 rounded-full" />
            <div className="flex flex-wrap justify-center gap-1 mt-1 max-w-[80px]">
              {[...Array(rightUnits)].map((_, i) => (
                <div key={`u-r-${i}`} className="w-4 h-4 bg-[#B2D8E8] rounded-sm flex items-center justify-center text-[8px] font-bold text-white/90 shadow-sm">1</div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Visual */}
        {isSolved && (
          <div className="absolute top-4 text-3xl animate-bounce">🏆</div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 w-full mb-6 px-2">
        <button
          onClick={subtractOne}
          disabled={isSolved}
          className="py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-[10px] font-black tracking-widest text-white/90 uppercase hover:bg-white/20 hover:border-white/30 transition-all active:scale-95"
        >
          - 1 from BOTH sides
        </button>
        <button
          onClick={divideByTwo}
          disabled={isSolved}
          className="py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-[10px] font-black tracking-widest text-white/90 uppercase hover:bg-white/20 hover:border-[#81E6D9] transition-all active:scale-95"
        >
          ÷ 2 on BOTH sides
        </button>
      </div>

      {/* Rek Mascot coaching */}
      <div className="flex items-center gap-4 w-full bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
        <div className="text-3xl">
          {rekMood === 'thinking' ? '🤔' : rekMood === 'cheering' ? '🌟' : '😮'}
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-wide text-white/90 leading-relaxed">
            {message || (isSolved ? "Great work! You've mastered the balance." : "To find X, we must keep the scale balanced at every step!")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BridgeScaleLab;
