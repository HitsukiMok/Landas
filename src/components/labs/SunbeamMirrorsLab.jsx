import React, { useState, useEffect, useRef } from 'react';
import useStore from '../../store/useStore';

/**
 * SunbeamMirrorsLab - Grade 7-10 Geometry: Angles & Reflection
 * Features a rotational angle matching mechanic with real-time beam trajectory.
 */
const SunbeamMirrorsLab = ({ onQuestComplete }) => {
  const [angle, setAngle] = useState(0); // 0 to 180
  const [isSolved, setIsSolved] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [rekMood, setRekMood] = useState('thinking');

  const startTime = useRef(Date.now());
  const TARGET_ANGLE = 45;
  const TOLERANCE = 2;

  useEffect(() => {
    const solved = Math.abs(angle - TARGET_ANGLE) <= TOLERANCE;
    
    if (solved && !isSolved) {
      setIsSolved(true);
      setRekMood('cheering');
      
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      if (onQuestComplete) {
        onQuestComplete({ timeSpent, interactionCount, energyLevel: 'Low Energy' });
      }
    } else if (isSolved && !solved) {
      setIsSolved(false);
      setRekMood('thinking');
    }
  }, [angle, isSolved, onQuestComplete, interactionCount]);

  const handleSliderChange = (val) => {
    setInteractionCount(prev => prev + 1);
    setAngle(val);
  };

  // Calculate reflected beam angle
  // Simplified: incoming is 90 deg down. Mirror at 45 deg reflects at 0 deg (right).
  const reflectedAngle = angle * 2; 

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#FDFBF7] rounded-3xl w-full max-w-md mx-auto shadow-sm border border-[#E8E5DF] animate-fade-in">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-[10px] font-black tracking-[0.2em] text-[#718096] uppercase mb-1">Geometry & Physics Lab</h2>
        <p className="text-sm font-bold text-[#4A5568]">Illuminate the Dark Cave!</p>
      </div>

      {/* Main Play Area */}
      <div className="relative w-full h-80 bg-[#1A202C] rounded-2xl border-2 border-[#718096]/20 mb-8 overflow-hidden">
        
        {/* The Sun (Light Source) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-12 h-12 bg-yellow-300 rounded-full blur-sm animate-pulse" />
          {/* Incoming Beam */}
          <div className="w-1 h-32 bg-yellow-200/40 shadow-[0_0_15px_rgba(252,211,77,0.5)]" />
        </div>

        {/* The Mirror (Pivot Point) */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Rotatable Mirror Visual */}
          <div 
            className="w-20 h-2 bg-[#E2E8F0] rounded-full border-2 border-[#718096] shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-transform duration-200"
            style={{ transform: `rotate(${angle}deg)` }}
          />
          
          {/* Reflected Beam */}
          <div 
            className="absolute top-1/2 left-1/2 w-48 h-1 bg-yellow-300 transition-all duration-200 origin-left"
            style={{ 
              transform: `rotate(${reflectedAngle - 90}deg)`,
              opacity: 0.8,
              boxShadow: '0 0 20px rgba(252,211,77,0.8)'
            }}
          />
        </div>

        {/* The Dark Cave (Target) */}
        <div 
          className={`
            absolute top-32 right-8 w-20 h-20 rounded-full transition-all duration-700 flex items-center justify-center
            ${isSolved ? 'bg-yellow-100/20 shadow-[0_0_40px_rgba(252,211,77,0.4)] border-2 border-yellow-200/30' : 'bg-black/40 border-2 border-white/5'}
          `}
        >
          {isSolved ? (
            <span className="text-3xl animate-bounce">💎</span>
          ) : (
            <span className="text-[8px] font-black tracking-widest text-white/20 uppercase">Dark Cave</span>
          )}
        </div>

        {/* Dust Particles for Atmosphere */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1 h-1 bg-white rounded-full animate-float-gentle"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${i * 0.8}s` }}
            />
          ))}
        </div>
      </div>

      {/* Angle Slider */}
      <div className="w-full space-y-4 mb-8 px-4">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black tracking-widest text-[#718096] uppercase">Mirror Angle</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#4A5568]">{angle}°</span>
            <span className="text-[8px] font-bold text-[#A0AEC0] uppercase">Target: {TARGET_ANGLE}°</span>
          </div>
        </div>
        <input 
          type="range" 
          min="0" 
          max="180" 
          value={angle}
          onChange={(e) => handleSliderChange(parseInt(e.target.value))}
          className="w-full h-2 bg-[#E8E5DF] rounded-lg appearance-none cursor-pointer accent-[#718096]"
        />
      </div>

      {/* Rek Mascot coaching */}
      <div className="flex items-center gap-4 w-full bg-[#F4F7F6] p-4 rounded-2xl border border-[#E8E5DF]">
        <div className="text-3xl">
          {isSolved ? '✨' : '💡'}
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-wide text-[#4A5568] leading-relaxed">
            {isSolved 
              ? "Brilliant! You've illuminated the hidden cave treasures." 
              : "Angles are like bouncing a ball! Can you rotate the mirror to 45 degrees?"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SunbeamMirrorsLab;
