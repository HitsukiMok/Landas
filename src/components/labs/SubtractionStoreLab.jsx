import React, { useState, useEffect, useRef } from 'react';
import useStore from '../../store/useStore';

/**
 * SubtractionStoreLab - Grade 3 Math: Real-world Subtraction
 * Energy Level: Moderate Focus (Pastel Yellow #FEFCBF)
 * 
 * Mechanic: Interactive store counter where users drag/click 1-Peso coins
 * to give the correct change for a 10 Peso payment for a 6 Peso item.
 */
const SubtractionStoreLab = ({ onQuestComplete }) => {
  const payment = 10;
  const cost = 6;
  const correctChange = payment - cost;
  
  const [givenChange, setGivenChange] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [rekMood, setRekMood] = useState('thinking'); // 'thinking' | 'cheering' | 'oops'
  const [interactionCount, setInteractionCount] = useState(0);
  const startTime = useRef(Date.now());

  // Handle completion telemetry
  useEffect(() => {
    if (givenChange === correctChange && !isSolved) {
      setIsSolved(true);
      setRekMood('cheering');
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      if (onQuestComplete) {
        onQuestComplete({
          timeSpent,
          interactionCount,
          energyLevel: 'Moderate Focus',
        });
      }
    } else if (givenChange > correctChange) {
      // Gentle feedback: reset if overpaid
      setRekMood('oops');
      useStore.getState().setRetryModal(true); // Trigger global retry modal
      const timer = setTimeout(() => {
        setGivenChange(0);
        setRekMood('thinking');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [givenChange, isSolved, interactionCount, correctChange, onQuestComplete]);

  const addCoin = () => {
    if (isSolved) return;
    setGivenChange(prev => prev + 1);
    setInteractionCount(prev => prev + 1);
    setRekMood('thinking');
  };

  const removeCoin = () => {
    if (isSolved || givenChange <= 0) return;
    setGivenChange(prev => prev - 1);
    setInteractionCount(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#FDFBF7] rounded-3xl w-full max-w-lg mx-auto shadow-sm border border-[#E8E5DF]">
      {/* Header Area */}
      <div className="w-full flex justify-between items-center mb-4 px-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#E8F4F8] flex items-center justify-center text-3xl shadow-inner mb-1">
            🪙
          </div>
          <p className="text-[10px] font-bold tracking-widest text-[#718096] uppercase">Pay: 10</p>
        </div>
        
        <div className="text-2xl text-[#718096] opacity-30">→</div>
        
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FEFCBF] flex items-center justify-center text-3xl shadow-inner mb-1">
            🍎
          </div>
          <p className="text-[10px] font-bold tracking-widest text-[#718096] uppercase">Cost: 6</p>
        </div>
      </div>

      {/* Counter Top Area */}
      <div className="relative w-full h-40 bg-[#F4F7F6] rounded-2xl border-b-8 border-[#718096]/10 flex flex-col items-center justify-center p-4 mb-4">
        <div className="text-xs font-semibold tracking-wider text-[#A0AEC0] uppercase mb-4">Customer's Hand</div>
        
        <div className="flex flex-wrap justify-center gap-3 min-h-[60px]">
          {givenChange === 0 && (
            <div className="text-sm italic text-[#A0AEC0] animate-pulse">Give change here...</div>
          )}
          {[...Array(givenChange)].map((_, i) => (
            <div 
              key={i}
              className="w-12 h-12 rounded-full bg-[#FEFCBF] border-2 border-[#E8C819] flex items-center justify-center text-sm font-bold text-[#975A16] shadow-sm animate-fade-in-scale"
            >
              1
            </div>
          ))}
        </div>
      </div>

      {/* Cashier Area / Controls */}
      <div className="w-full grid grid-cols-2 gap-4 mb-4">
        <button
          onClick={addCoin}
          disabled={isSolved || rekMood === 'oops'}
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white border-2 border-[#FEFCBF] rounded-2xl hover:bg-[#FEFCBF]/20 transition-all active:scale-95 disabled:opacity-50"
        >
          <div className="w-10 h-10 rounded-full bg-[#FEFCBF] flex items-center justify-center text-[#975A16] font-bold">+1</div>
          <span className="text-[10px] font-bold tracking-widest text-[#718096] uppercase">Add Coin</span>
        </button>

        <button
          onClick={removeCoin}
          disabled={isSolved || givenChange <= 0 || rekMood === 'oops'}
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white border-2 border-[#E8E5DF] rounded-2xl hover:bg-[#F4F7F6] transition-all active:scale-95 disabled:opacity-50"
        >
          <div className="w-10 h-10 rounded-full bg-[#F4F7F6] flex items-center justify-center text-[#718096] font-bold">-1</div>
          <span className="text-[10px] font-bold tracking-widest text-[#718096] uppercase">Take Back</span>
        </button>
      </div>

      {/* Success Indicator / Rek */}
      <div className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-white rounded-2xl shadow-sm border border-[#E8E5DF]">
        <div className="flex items-center gap-4">
          <div className="text-4xl animate-bounce">
            {rekMood === 'thinking' && '🦎'}
            {rekMood === 'cheering' && '🦖'}
            {rekMood === 'oops' && '🐢'}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-wide text-[#4A5568]">
              {rekMood === 'thinking' && "Calculating change..."}
              {rekMood === 'cheering' && "Great job! Math master!"}
              {rekMood === 'oops' && "Oops, too much change!"}
            </span>
            <span className="text-[10px] tracking-wide text-[#718096]">
              {rekMood === 'thinking' && "10 minus 6 is..."}
              {rekMood === 'cheering' && "The customer is happy!"}
              {rekMood === 'oops' && "Let's count again."}
            </span>
          </div>
        </div>

        {isSolved && (
          <div className="px-4 py-2 bg-[#C6F6D5] rounded-xl text-[10px] font-black text-[#276749] tracking-widest uppercase animate-pulse">
            COMPLETE
          </div>
        )}
      </div>
    </div>
  );
};

export default SubtractionStoreLab;
