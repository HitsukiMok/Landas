import React, { useState, useEffect, useRef } from 'react';
import useStore from '../../store/useStore';

/**
 * AlgebraBalanceLab - Grade 7/8 Math: Multi-step Algebra (Solving for X)
 * Energy Level: High Brain Power (Pastel Red #FED7D7)
 * 
 * Mechanic: Visual Balance Scale for 2x + 4 = 10.
 * Zero-Penalty UX: Scale tips when unbalanced.
 */
const AlgebraBalanceLab = ({ onQuestComplete }) => {
  // Equation: 2x + 4 = 10
  // Goal: x = 3
  const [leftX, setLeftX] = useState(2);
  const [leftUnits, setLeftUnits] = useState(4);
  const [rightUnits, setRightUnits] = useState(10);
  
  const [isDivided, setIsDivided] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [rekMood, setRekMood] = useState('thinking');
  const [interactionCount, setInteractionCount] = useState(0);
  const [tipAngle, setTipAngle] = useState(0); // 0 = balanced, positive = right heavy, negative = left heavy
  const [message, setMessage] = useState('');
  
  const startTime = useRef(Date.now());

  // Calculate balance and solve state
  useEffect(() => {
    const xValue = 3; // The secret value
    const leftWeight = leftX * xValue + leftUnits;
    const rightWeight = rightUnits;
    
    // Calculate tip angle
    const diff = rightWeight - leftWeight;
    setTipAngle(diff * 2); // Multiplier for visual tipping

    if (leftWeight === rightWeight) {
      setMessage('');
      if (leftX === 1 && leftUnits === 0) {
        if (!isSolved) {
          setIsSolved(true);
          setRekMood('cheering');
          const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
          if (onQuestComplete) {
            onQuestComplete({ timeSpent, interactionCount, energyLevel: 'High Brain Power' });
          }
        }
      }
    } else {
      setRekMood('oops');
      useStore.getState().setRetryModal(true); // Trigger global retry modal
      setMessage('Oops! The scale is tipping. Try doing the same to both sides!');
    }
  }, [leftX, leftUnits, rightUnits, interactionCount, isSolved, onQuestComplete]);

  const handleSubtractOne = () => {
    if (isSolved) return;
    setInteractionCount(c => c + 1);
    if (leftUnits > 0 && rightUnits > 0) {
      setLeftUnits(u => u - 1);
      setRightUnits(u => u - 1);
    } else {
      // Trying to subtract when one side is 0 - this tips it or is invalid
      // For this lab, let's just tip it if they try to subtract only from one side
      setMessage("Wait! You need units on both sides to subtract one.");
    }
  };

  const handleAddOne = () => {
    if (isSolved) return;
    setInteractionCount(c => c + 1);
    setLeftUnits(u => u + 1);
    setRightUnits(u => u + 1);
  };

  const handleDivide = () => {
    if (isSolved) return;
    setInteractionCount(c => c + 1);
    if (leftUnits === 0 && leftX > 1 && rightUnits % leftX === 0) {
      setRightUnits(u => u / leftX);
      setLeftX(1);
      setIsDivided(true);
    } else {
      setMessage("Tip: Subtract all '1' blocks first, then divide into groups!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-transparent text-white rounded-3xl w-full max-w-lg mx-auto shadow-sm border border-white/20 scale-95 sm:scale-100">
      {/* Real-time Equation Display */}
      <div className="mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-[#FED7D7] shadow-inner font-mono text-lg font-bold text-white/90 tracking-widest animate-pulse">
        {leftX}X {leftUnits > 0 && `+ ${leftUnits}`} = {rightUnits}
      </div>

      {/* The Balance Scale */}
      <div className="relative w-full h-64 mb-6 flex flex-col items-center">
        {/* Scale Base */}
        <div className="absolute bottom-0 w-32 h-4 bg-[#718096]/20 rounded-t-xl" />
        <div className="absolute bottom-4 w-4 h-32 bg-[#718096]/20" />
        
        {/* The Pivot and Beam */}
        <div 
          className="absolute bottom-36 w-full px-12 transition-transform duration-500 ease-in-out"
          style={{ transform: `rotate(${tipAngle}deg)` }}
        >
          {/* Beam */}
          <div className="h-2 w-full bg-[#718096] rounded-full" />
          
          {/* Left Plate */}
          <div className="absolute left-4 top-2 w-32 flex flex-col items-center">
            <div className="h-16 w-1 bg-[#718096]/40" />
            <div className="min-h-[80px] w-32 bg-white/10 backdrop-blur-sm border-t-4 border-[#718096] rounded-b-2xl flex flex-wrap justify-center content-start p-2 gap-1 shadow-sm">
              {[...Array(leftX)].map((_, i) => (
                <div key={`x-${i}`} className="w-8 h-10 bg-[#FED7D7] border-2 border-[#9B2C2C]/20 rounded-lg flex items-center justify-center font-bold text-[#9B2C2C] text-xs">X</div>
              ))}
              {[...Array(leftUnits)].map((_, i) => (
                <div key={`u-l-${i}`} className="w-5 h-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded flex items-center justify-center text-[8px] font-bold text-white/60">1</div>
              ))}
            </div>
          </div>

          {/* Right Plate */}
          <div className="absolute right-4 top-2 w-32 flex flex-col items-center">
            <div className="h-16 w-1 bg-[#718096]/40" />
            <div className="min-h-[80px] w-32 bg-white/10 backdrop-blur-sm border-t-4 border-[#718096] rounded-b-2xl flex flex-wrap justify-center content-start p-2 gap-1 shadow-sm">
              {[...Array(rightUnits)].map((_, i) => (
                <div key={`u-r-${i}`} className="w-5 h-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded flex items-center justify-center text-[8px] font-bold text-white/60">1</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Message Area */}
      <div className="h-8 mb-4 text-center">
        <p className="text-[10px] font-bold tracking-widest text-[#9B2C2C] uppercase leading-relaxed animate-bounce">
          {message}
        </p>
      </div>

      {/* Controls */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
        <button
          onClick={handleSubtractOne}
          disabled={isSolved}
          className="p-3 bg-white/10 backdrop-blur-sm border-2 border-[#FED7D7] rounded-xl hover:bg-[#FED7D7]/20 transition-all text-[10px] font-black text-white/90 tracking-widest uppercase"
        >
          - 1 (Both)
        </button>
        <button
          onClick={handleAddOne}
          disabled={isSolved}
          className="p-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all text-[10px] font-black text-white/90 tracking-widest uppercase"
        >
          + 1 (Both)
        </button>
        <button
          onClick={handleDivide}
          disabled={isSolved}
          className="p-3 bg-[#FED7D7]/40 border-2 border-[#FED7D7] rounded-xl hover:bg-[#FED7D7] transition-all text-[10px] font-black text-[#9B2C2C] tracking-widest uppercase"
        >
          Divide groups
        </button>
      </div>

      {/* Success / Rek Area */}
      <div className="w-full flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-sm border border-white/20">
        <div className="text-4xl animate-bounce">
          {rekMood === 'thinking' && '🦎'}
          {rekMood === 'cheering' && '🦖'}
          {rekMood === 'oops' && '🐢'}
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold tracking-wide text-white/90">
            {isSolved ? "Incredible! X equals 3!" : "Keep the scale balanced..."}
          </span>
          <span className="text-[10px] tracking-wide text-white/60">
            {isSolved ? "You solved the multi-step puzzle!" : "Every move affects both sides."}
          </span>
        </div>
        {isSolved && (
          <div className="ml-auto px-4 py-2 bg-[#C6F6D5] rounded-xl text-[10px] font-black text-[#276749] tracking-widest uppercase">
            SOLVED
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgebraBalanceLab;
