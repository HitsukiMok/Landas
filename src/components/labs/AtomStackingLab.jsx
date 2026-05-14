import React, { useState, useEffect, useRef } from 'react';
import useStore from '../../store/useStore';

/**
 * AtomStackingLab - Grade 11-12 Chemistry: Molecular Weights
 * Features a target-sum mechanic with interactive atom collection.
 */
const AtomStackingLab = ({ onQuestComplete }) => {
  const [scaleAtoms, setScaleAtoms] = useState([]);
  const [isSolved, setIsSolved] = useState(false);
  const [rekMood, setRekMood] = useState('thinking');
  const [interactionCount, setInteractionCount] = useState(0);
  
  const startTime = useRef(Date.now());
  const setRetryModal = useStore((s) => s.setRetryModal);

  const TARGET_WEIGHT = 18; // H2O (16 + 1 + 1)
  
  const currentWeight = scaleAtoms.reduce((sum, atom) => sum + atom.weight, 0);

  useEffect(() => {
    if (currentWeight === TARGET_WEIGHT && !isSolved) {
      setIsSolved(true);
      setRekMood('cheering');
      
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      if (onQuestComplete) {
        onQuestComplete({ timeSpent, interactionCount, energyLevel: 'Moderate Focus' });
      }
    } else if (currentWeight > TARGET_WEIGHT) {
      setRekMood('oops');
      setRetryModal(true);
      const timer = setTimeout(() => setRekMood('thinking'), 2000);
      return () => clearTimeout(timer);
    } else {
      setRekMood('thinking');
    }
  }, [currentWeight, isSolved, onQuestComplete, interactionCount, setRetryModal]);

  const addAtom = (type) => {
    if (isSolved) return;
    setInteractionCount(prev => prev + 1);
    
    const atom = type === 'O' 
      ? { id: Date.now(), type: 'O', weight: 16, label: 'Oxygen', color: '#FC8181' }
      : { id: Date.now(), type: 'H', weight: 1, label: 'Hydrogen', color: '#63B3ED' };
    
    setScaleAtoms(prev => [...prev, atom]);
  };

  const removeAtom = (id) => {
    if (isSolved) return;
    setInteractionCount(prev => prev + 1);
    setScaleAtoms(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#FDFBF7] rounded-3xl w-full max-w-md mx-auto shadow-sm border border-[#E8E5DF] animate-fade-in">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-[10px] font-black tracking-[0.2em] text-[#718096] uppercase mb-1">Chemistry & Molecular Lab</h2>
        <div className="bg-[#E8F4F8] px-6 py-3 rounded-2xl shadow-inner inline-flex flex-col items-center">
          <span className="text-[8px] font-black text-[#718096] uppercase mb-1">Target Compound Mass</span>
          <span className="text-3xl font-black text-[#4A5568]">{TARGET_WEIGHT}</span>
        </div>
      </div>

      {/* The Scale Area */}
      <div className="relative w-full h-64 bg-[#F4F7F6] rounded-2xl border-2 border-[#E8E5DF] mb-8 flex flex-col items-center justify-end p-6 overflow-hidden">
        
        {/* Atoms on Scale */}
        <div className="flex flex-wrap justify-center gap-2 mb-4 max-w-[200px]">
          {scaleAtoms.map(atom => (
            <button
              key={atom.id}
              onClick={() => removeAtom(atom.id)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-md hover:scale-110 transition-transform animate-fade-in"
              style={{ backgroundColor: atom.color }}
            >
              {atom.type}
            </button>
          ))}
        </div>

        {/* The Digital Scale Plate */}
        <div className="w-full h-12 bg-[#E2E8F0] rounded-xl border-b-4 border-[#CBD5E0] flex items-center justify-center relative overflow-hidden">
          <div className="bg-[#2D3748] px-4 py-1 rounded-md">
            <span className="text-xl font-mono text-[#81E6D9] tracking-tighter">
              {currentWeight.toFixed(1)} u
            </span>
          </div>
          {/* Success Light */}
          {isSolved && (
            <div className="absolute right-4 w-3 h-3 bg-[#68D391] rounded-full shadow-[0_0_10px_#68D391] animate-pulse" />
          )}
        </div>
        
        <p className="text-[8px] font-black text-[#A0AEC0] uppercase mt-2">Digital Mass Scale</p>
      </div>

      {/* Atom Spawner Buttons */}
      <div className="flex gap-4 w-full mb-8">
        <button
          onClick={() => addAtom('O')}
          disabled={isSolved}
          className="flex-1 p-4 bg-white border-2 border-[#E8E5DF] rounded-2xl flex flex-col items-center gap-2 hover:border-[#FC8181] hover:bg-[#FFF5F5] transition-all group"
        >
          <div className="w-8 h-8 bg-[#FC8181] rounded-full flex items-center justify-center text-[10px] font-black text-white group-hover:scale-110 transition-transform">O</div>
          <span className="text-[10px] font-black text-[#4A5568] uppercase">Oxygen (16)</span>
        </button>

        <button
          onClick={() => addAtom('H')}
          disabled={isSolved}
          className="flex-1 p-4 bg-white border-2 border-[#E8E5DF] rounded-2xl flex flex-col items-center gap-2 hover:border-[#63B3ED] hover:bg-[#EBF8FF] transition-all group"
        >
          <div className="w-8 h-8 bg-[#63B3ED] rounded-full flex items-center justify-center text-[10px] font-black text-white group-hover:scale-110 transition-transform">H</div>
          <span className="text-[10px] font-black text-[#4A5568] uppercase">Hydrogen (1)</span>
        </button>
      </div>

      {/* Rek Mascot coaching */}
      <div className="flex items-center gap-4 w-full bg-[#F4F7F6] p-4 rounded-2xl border border-[#E8E5DF]">
        <div className="text-3xl animate-bounce">
          {rekMood === 'thinking' ? '🔬' : rekMood === 'cheering' ? '✨' : '😮'}
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-wide text-[#4A5568] leading-relaxed">
            {isSolved 
              ? "You've synthesized H2O! Water is essential for life." 
              : currentWeight > TARGET_WEIGHT 
                ? "Oops! That compound is too heavy. Let's remove an atom."
                : "Can you stack atoms to reach a mass of 18? (Hint: Try 1 Oxygen and 2 Hydrogens)"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AtomStackingLab;
