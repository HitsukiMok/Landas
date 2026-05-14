import React, { useState, useEffect, useRef } from 'react';
import useStore from '../../store/useStore';

/**
 * JungleBalanceLab - Grade 7-10 Science: Ecosystems & Ratios
 * Features a ratio-balancing mechanic with discrete item collection.
 */
const JungleBalanceLab = ({ onQuestComplete }) => {
  const [plants, setPlants] = useState(0);
  const [herbivores, setHerbivores] = useState(0);
  const [carnivores, setCarnivores] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [rekMood, setRekMood] = useState('thinking');

  const startTime = useRef(Date.now());
  const setRetryModal = useStore((s) => s.setRetryModal);

  // Target Ratio: 3 Plants, 2 Herbivores, 1 Carnivore
  const TARGET_P = 3;
  const TARGET_H = 2;
  const TARGET_C = 1;

  // Calculate Health (0 to 100)
  const diffP = Math.abs(plants - TARGET_P);
  const diffH = Math.abs(herbivores - TARGET_H);
  const diffC = Math.abs(carnivores - TARGET_C);
  const totalDiff = diffP + diffH + diffC;
  
  // Health decreases as difference increases
  const health = Math.max(0, 100 - (totalDiff * 15));
  // Rotation for the needle (-90 deg to 90 deg)
  const rotation = (health / 100) * 180 - 90;

  useEffect(() => {
    const solved = plants === TARGET_P && herbivores === TARGET_H && carnivores === TARGET_C;

    if (solved && !isSolved) {
      setIsSolved(true);
      setRekMood('cheering');
      
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      if (onQuestComplete) {
        onQuestComplete({ timeSpent, interactionCount, energyLevel: 'Moderate Focus' });
      }
    } else if (isSolved && !solved) {
      setIsSolved(false);
      setRekMood('thinking');
    }

    // Gentle "Oops" if they exceed the ratio
    if (plants > TARGET_P || herbivores > TARGET_H || carnivores > TARGET_C) {
      setRekMood('oops');
    } else {
      setRekMood('thinking');
    }
  }, [plants, herbivores, carnivores, isSolved, onQuestComplete, interactionCount]);

  const addItem = (type) => {
    if (isSolved) return;
    setInteractionCount(prev => prev + 1);
    if (type === 'P') setPlants(prev => prev + 1);
    if (type === 'H') setHerbivores(prev => prev + 1);
    if (type === 'C') setCarnivores(prev => prev + 1);
  };

  const reset = () => {
    setPlants(0);
    setHerbivores(0);
    setCarnivores(0);
    setIsSolved(false);
    setRekMood('thinking');
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#FDFBF7] rounded-3xl w-full max-w-md mx-auto shadow-sm border border-[#E8E5DF] animate-fade-in">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-[10px] font-black tracking-[0.2em] text-[#718096] uppercase mb-1">Ecosystem Balance Lab</h2>
        <p className="text-sm font-bold text-[#4A5568]">Balance the Food Chain!</p>
      </div>

      {/* Health Meter Area */}
      <div className="relative w-full h-48 bg-[#F4F7F6] rounded-2xl border-2 border-[#E8E5DF] mb-8 flex flex-col items-center justify-end p-6 overflow-hidden">
        {/* Semi-circle meter background */}
        <div className="absolute bottom-[-60px] w-64 h-64 border-[16px] border-[#E8E5DF] rounded-full" />
        <div 
          className="absolute bottom-[-60px] w-64 h-64 border-[16px] border-transparent rounded-full"
          style={{ 
            borderTopColor: health > 70 ? '#68D391' : health > 40 ? '#F6AD55' : '#FC8181',
            transition: 'border-top-color 0.5s ease'
          }}
        />

        {/* Needle */}
        <div 
          className="absolute bottom-0 w-1 h-24 bg-[#4A5568] origin-bottom transition-transform duration-1000 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#4A5568] rounded-full" />
        </div>

        <div className="z-10 text-[10px] font-black tracking-widest text-[#718096] uppercase">Ecosystem Health</div>
      </div>

      {/* Visual Representation Area */}
      <div className="w-full flex justify-around items-end gap-4 mb-8 min-h-[100px] px-4">
        {/* Plants Column */}
        <div className="flex flex-col-reverse gap-1 items-center">
          {[...Array(plants)].map((_, i) => (
            <div key={i} className="text-2xl animate-fade-in-up">🌿</div>
          ))}
          <span className="text-[8px] font-black text-[#A0AEC0] uppercase">Plants</span>
        </div>

        {/* Herbivores Column */}
        <div className="flex flex-col-reverse gap-1 items-center">
          {[...Array(herbivores)].map((_, i) => (
            <div key={i} className="text-2xl animate-fade-in-up">🐰</div>
          ))}
          <span className="text-[8px] font-black text-[#A0AEC0] uppercase">Herbivores</span>
        </div>

        {/* Carnivores Column */}
        <div className="flex flex-col-reverse gap-1 items-center">
          {[...Array(carnivores)].map((_, i) => (
            <div key={i} className="text-2xl animate-fade-in-up">🦊</div>
          ))}
          <span className="text-[8px] font-black text-[#A0AEC0] uppercase">Carnivores</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-3 gap-3 w-full mb-6">
        <button
          onClick={() => addItem('P')}
          disabled={isSolved}
          className="py-3 bg-white border border-[#E8E5DF] rounded-2xl text-[10px] font-black text-[#4A5568] uppercase hover:bg-[#F0FFF4] hover:border-[#C6F6D5] transition-all"
        >
          + Plant
        </button>
        <button
          onClick={() => addItem('H')}
          disabled={isSolved}
          className="py-3 bg-white border border-[#E8E5DF] rounded-2xl text-[10px] font-black text-[#4A5568] uppercase hover:bg-[#FFF5F5] hover:border-[#FED7D7] transition-all"
        >
          + Herbivore
        </button>
        <button
          onClick={() => addItem('C')}
          disabled={isSolved}
          className="py-3 bg-white border border-[#E8E5DF] rounded-2xl text-[10px] font-black text-[#4A5568] uppercase hover:bg-[#FFFBEB] hover:border-[#FEFCBF] transition-all"
        >
          + Carnivore
        </button>
      </div>

      {/* Reset Button (Zero Penalty approach) */}
      <button
        onClick={reset}
        className="w-full py-2 mb-6 text-[8px] font-black tracking-widest text-[#A0AEC0] uppercase hover:text-[#718096] transition-all"
      >
        ↺ Reset Ecosystem
      </button>

      {/* Rek Mascot coaching */}
      <div className="flex items-center gap-4 w-full bg-[#F4F7F6] p-4 rounded-2xl border border-[#E8E5DF]">
        <div className="text-3xl">
          {rekMood === 'thinking' ? '🦊' : rekMood === 'cheering' ? '🌳' : '⚠️'}
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-wide text-[#4A5568] leading-relaxed">
            {isSolved 
              ? "Wonderful! The ecosystem is perfectly balanced." 
              : rekMood === 'oops' 
                ? "Hmm, something is out of balance. Let's try to reset and find the 3:2:1 ratio!"
                : "Nature needs a balance of producers, consumers, and predators. Can you find the right ratio?"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JungleBalanceLab;
