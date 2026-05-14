import React, { useState, useEffect, useRef } from 'react';
import useStore from '../../store/useStore';

/**
 * CoralGatheringLab - Grade 1 Math: Counting Exercise
 * Features a zero-penalty loop with interactive shell collection.
 */
const CoralGatheringLab = ({ onQuestComplete }) => {
  const [target, setTarget] = useState(5);
  const [basketCount, setBasketCount] = useState(0);
  const [shells, setShells] = useState([]);
  const [isSolved, setIsSolved] = useState(false);
  const [rekMood, setRekMood] = useState('thinking'); // thinking, cheering, oops
  const [interactionCount, setInteractionCount] = useState(0);
  
  const startTime = useRef(Date.now());
  const setRetryModal = useStore((s) => s.setRetryModal);

  // Initialize shells
  useEffect(() => {
    const initialShells = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      inBasket: false,
      // Random positions for "scattered" look
      x: Math.random() * 80 + 10,
      y: Math.random() * 30 + 10,
      rotation: Math.random() * 360,
    }));
    setShells(initialShells);
  }, []);

  // Check solution
  useEffect(() => {
    if (basketCount === target && !isSolved) {
      setIsSolved(true);
      setRekMood('cheering');
      
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      if (onQuestComplete) {
        onQuestComplete({ timeSpent, interactionCount, energyLevel: 'Low Energy' });
      }
    } else if (basketCount > target) {
      setRekMood('oops');
      setRetryModal(true);
      const timer = setTimeout(() => setRekMood('thinking'), 2000);
      return () => clearTimeout(timer);
    } else {
      setRekMood('thinking');
    }
  }, [basketCount, target, isSolved, onQuestComplete, interactionCount, setRetryModal]);

  const toggleShell = (id) => {
    if (isSolved) return;
    
    setInteractionCount(prev => prev + 1);
    setShells(prev => prev.map(s => {
      if (s.id === id) {
        const newState = !s.inBasket;
        setBasketCount(curr => newState ? curr + 1 : curr - 1);
        return { ...s, inBasket: newState };
      }
      return s;
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#FDFBF7] rounded-3xl w-full max-w-md mx-auto shadow-sm border border-[#E8E5DF] animate-fade-in">
      {/* Header / Target */}
      <div className="mb-6 text-center">
        <h2 className="text-[10px] font-black tracking-[0.2em] text-[#718096] uppercase mb-2">Ocean Expedition</h2>
        <div className="inline-flex items-center justify-center bg-[#E8F4F8] rounded-2xl px-6 py-3 shadow-inner">
          <span className="text-xs font-bold text-[#4A5568] tracking-widest mr-3">COLLECT:</span>
          <span className="text-3xl font-black text-[#4A5568]">{target}</span>
        </div>
      </div>

      {/* Main Play Area */}
      <div className="relative w-full aspect-square bg-[#F4F7F6] rounded-2xl border-2 border-dashed border-[#B2D8E8] mb-6 overflow-hidden">
        
        {/* Scattered Shells (Top Area) */}
        <div className="absolute top-0 left-0 w-full h-1/2 p-4">
          {shells.filter(s => !s.inBasket).map(shell => (
            <button
              key={shell.id}
              onClick={() => toggleShell(shell.id)}
              className="absolute w-12 h-12 flex items-center justify-center text-3xl animate-float-gentle hover:scale-110 transition-transform cursor-pointer filter drop-shadow-sm"
              style={{ 
                left: `${shell.x}%`, 
                top: `${shell.y}%`,
                transform: `rotate(${shell.rotation}deg)` 
              }}
            >
              🐚
            </button>
          ))}
        </div>

        {/* The Basket (Bottom Area) */}
        <div className={`
          absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#D4EAF5]/40 border-4 border-[#B2D8E8] rounded-b-3xl rounded-t-lg flex flex-wrap content-center justify-center gap-2 p-4 transition-all duration-300
          ${rekMood === 'oops' ? 'animate-shake' : ''}
          ${isSolved ? 'bg-[#C6F6D5]/30 border-[#81E6D9]' : ''}
        `}>
          {/* Label */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-black tracking-widest text-[#718096] uppercase">
            Your Basket: {basketCount}
          </div>

          {/* Shells in basket */}
          {shells.filter(s => s.inBasket).map(shell => (
            <button
              key={shell.id}
              onClick={() => toggleShell(shell.id)}
              className="w-10 h-10 flex items-center justify-center text-2xl hover:scale-110 transition-transform"
            >
              🐚
            </button>
          ))}
        </div>

        {/* Ambient Sea Particles */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 bg-white rounded-full animate-float-gentle"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </div>
      </div>

      {/* Rek Mascot & Feedback */}
      <div className="flex items-center gap-4 w-full bg-[#F4F7F6] p-4 rounded-2xl border border-[#E8E5DF]">
        <div className="text-3xl animate-bounce">
          {rekMood === 'thinking' ? '🤔' : rekMood === 'cheering' ? '🎉' : '😮'}
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-wide text-[#4A5568] leading-relaxed">
            {rekMood === 'thinking' ? "Can you help me find exactly " + target + " shells for our collection?" : 
             rekMood === 'cheering' ? "Great counting! We have enough shells now." : 
             "Oops! That's a few too many. Let's take some back out."}
          </p>
        </div>
      </div>

      {isSolved && (
        <div className="mt-4 text-[10px] font-black tracking-[0.2em] text-[#81E6D9] uppercase animate-pulse">
          ✓ Target Met!
        </div>
      )}
    </div>
  );
};

export default CoralGatheringLab;
