import React, { useState, useEffect, useRef } from 'react';
import useStore from '../../store/useStore';

/**
 * KelpGrowthLab - Grade 3-6 Science: Biology/Photosynthesis
 * Features a slider-based ratio balancing mechanic.
 */
const KelpGrowthLab = ({ onQuestComplete }) => {
  const [sunlight, setSunlight] = useState(30);
  const [water, setWater] = useState(20);
  const [isSolved, setIsSolved] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [rekMood, setRekMood] = useState('thinking'); // thinking, cheering, oops
  
  const startTime = useRef(Date.now());
  const setRetryModal = useStore((s) => s.setRetryModal);

  // Targets
  const TARGET_SUN = 70;
  const TARGET_WATER = 50;
  const TOLERANCE = 2; // Allow small margin

  // Calculate height based on proximity to target
  // We use a simple distance formula: sqrt((s-70)^2 + (w-50)^2)
  const sunDiff = Math.abs(sunlight - TARGET_SUN);
  const waterDiff = Math.abs(water - TARGET_WATER);
  const avgDiff = (sunDiff + waterDiff) / 2;
  
  // Height ranges from 20% to 100%
  const height = Math.max(20, 100 - (avgDiff * 1.2));

  useEffect(() => {
    const solved = Math.abs(sunlight - TARGET_SUN) <= TOLERANCE && 
                   Math.abs(water - TARGET_WATER) <= TOLERANCE;

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
  }, [sunlight, water, isSolved, onQuestComplete, interactionCount]);

  const handleSliderChange = (type, val) => {
    setInteractionCount(prev => prev + 1);
    if (type === 'sun') setSunlight(val);
    else setWater(val);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-transparent text-white rounded-3xl w-full max-w-md mx-auto shadow-sm border border-white/20 animate-fade-in">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-[10px] font-black tracking-[0.2em] text-white/60 uppercase mb-1">Ocean Biology Lab</h2>
        <p className="text-sm font-bold text-white/90">Help the Kelp Reach the Surface!</p>
      </div>

      {/* Main Play Area */}
      <div className="relative w-full h-80 bg-gradient-to-b from-[#B2D8E8] to-[#2B6CB0]/20 rounded-2xl border-2 border-white/30 mb-8 overflow-hidden">
        
        {/* The Surface (Goal Line) */}
        <div className="absolute top-8 w-full border-t-2 border-dashed border-white/50 flex justify-center">
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-[8px] font-black tracking-widest text-white uppercase -mt-2">Surface</span>
        </div>

        {/* The Kelp Plant */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 bg-[#68D391] rounded-t-full transition-all duration-500 ease-out shadow-lg flex flex-col items-center"
          style={{ height: `${height}%` }}
        >
          {/* Leaves/Segments */}
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className={`w-12 h-6 bg-[#68D391]/80 rounded-full -mx-4 my-2 rotate-${i % 2 === 0 ? '12' : '-12'}`}
              style={{ opacity: height > (i * 15) ? 1 : 0 }}
            />
          ))}

          {/* Bloom Icon (Visible when solved) */}
          {isSolved && (
            <div className="absolute -top-10 text-4xl animate-bounce">🌸</div>
          )}
        </div>

        {/* Sunlight Visual Overlay */}
        <div 
          className="absolute inset-0 bg-yellow-100/30 transition-opacity duration-500 pointer-events-none"
          style={{ opacity: sunlight / 100 }}
        />

        {/* Ambient Bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 bg-white/40 rounded-full animate-float-gentle"
              style={{ left: `${20 + (i * 20)}%`, bottom: '0%', animationDelay: `${i * 1.2}s`, animationDuration: '4s' }}
            />
          ))}
        </div>
      </div>

      {/* Sliders Container */}
      <div className="w-full space-y-6 mb-8 px-4">
        {/* Sunlight Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black tracking-widest text-white/60 uppercase">☀️ Sunlight</span>
            <span className="text-xs font-bold text-white/90">{sunlight}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={sunlight}
            onChange={(e) => handleSliderChange('sun', parseInt(e.target.value))}
            className="w-full h-2 bg-[#E8E5DF] rounded-lg appearance-none cursor-pointer accent-[#F6AD55]"
          />
        </div>

        {/* Water Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black tracking-widest text-white/60 uppercase">💧 Nutrient Water</span>
            <span className="text-xs font-bold text-white/90">{water}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={water}
            onChange={(e) => handleSliderChange('water', parseInt(e.target.value))}
            className="w-full h-2 bg-[#E8E5DF] rounded-lg appearance-none cursor-pointer accent-[#63B3ED]"
          />
        </div>
      </div>

      {/* Rek Mascot coaching */}
      <div className="flex items-center gap-4 w-full bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
        <div className="text-3xl">
          {rekMood === 'thinking' ? '💡' : '🌟'}
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-wide text-white/90 leading-relaxed">
            {isSolved 
              ? "Perfect balance! The kelp is thriving." 
              : "Plants need just the right amount of light and water to grow big and strong!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default KelpGrowthLab;
