import React, { useState, useEffect, useRef } from 'react';
import useStore from '../../store/useStore';

/**
 * DataFlowRoutingLab - Grade 11-12 ICT: Data Logic & Routing
 * Features a logic gate toggle mechanic with real-time path visualization.
 */
const DataFlowRoutingLab = ({ onQuestComplete }) => {
  const [gateA, setGateA] = useState(false); // false = closed, true = open
  const [gateB, setGateB] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [rekMood, setRekMood] = useState('thinking');

  const startTime = useRef(Date.now());
  const setRetryModal = useStore((s) => s.setRetryModal);

  // Logic: Water Source -> Gate A -> Gate B -> Wheat
  // Path to Wheat: Gate A must be OPEN AND Gate B must be OPEN.
  
  useEffect(() => {
    if (gateA && gateB && !isSolved) {
      setIsSolved(true);
      setRekMood('cheering');
      
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      if (onQuestComplete) {
        onQuestComplete({ timeSpent, interactionCount, energyLevel: 'Low Energy' });
      }
    } else if (isSolved && (!gateA || !gateB)) {
      setIsSolved(false);
      setRekMood('thinking');
    }
  }, [gateA, gateB, isSolved, onQuestComplete, interactionCount]);

  const toggleGate = (gate) => {
    if (isSolved) return;
    setInteractionCount(prev => prev + 1);
    if (gate === 'A') setGateA(!gateA);
    if (gate === 'B') setGateB(!gateB);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-transparent text-white rounded-3xl w-full max-w-md mx-auto shadow-sm border border-white/20 animate-fade-in">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-[10px] font-black tracking-[0.2em] text-white/60 uppercase mb-1">ICT & Logic Lab</h2>
        <p className="text-sm font-bold text-white/90">Route the Flow to the Wheat!</p>
      </div>

      {/* Main Play Area */}
      <div className="relative w-full h-80 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 mb-8 overflow-hidden p-6">
        
        {/* The Water Source */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
          <div className="w-10 h-10 bg-[#B2D8E8] rounded-xl flex items-center justify-center text-xl shadow-sm">💧</div>
          <p className="text-[8px] font-black text-white/60 uppercase mt-1">Source</p>
        </div>

        {/* SVG Connections (Paths) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Path 1: Source to Gate A */}
          <line x1="50%" y1="40" x2="50%" y2="80" stroke="#E8E5DF" strokeWidth="4" strokeLinecap="round" />
          <line x1="50%" y1="40" x2="50%" y2="80" stroke="#63B3ED" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />

          {/* Path 2: Gate A to Gate B (IF OPEN) */}
          <path d="M 50% 120 L 50% 180" stroke={gateA ? '#63B3ED' : '#E8E5DF'} strokeWidth="4" fill="none" className="transition-colors duration-500" />
          
          {/* Path 3: Gate B to Wheat (IF OPEN) */}
          <path d="M 50% 220 L 50% 260" stroke={gateA && gateB ? '#63B3ED' : '#E8E5DF'} strokeWidth="4" fill="none" className="transition-colors duration-500" />
          
          {/* Side paths (to Cactus) */}
          <path d="M 50% 120 Q 30% 120, 20% 260" stroke={!gateA ? '#63B3ED' : '#E8E5DF'} strokeWidth="4" fill="none" className="transition-colors duration-500" />
          <path d="M 50% 220 Q 80% 220, 90% 260" stroke={gateA && !gateB ? '#63B3ED' : '#E8E5DF'} strokeWidth="4" fill="none" className="transition-colors duration-500" />
        </svg>

        {/* Gate A (IF) */}
        <button
          onClick={() => toggleGate('A')}
          className={`
            absolute top-20 left-1/2 -translate-x-1/2 w-32 h-10 rounded-xl border-2 flex items-center justify-center gap-2 transition-all duration-300
            ${gateA ? 'bg-green-500/30 border-[#81E6D9]' : 'bg-white/10 backdrop-blur-sm border-white/20'}
          `}
        >
          <span className="text-[10px] font-black text-white/90 tracking-widest uppercase">IF Gate A: {gateA ? 'ON' : 'OFF'}</span>
        </button>

        {/* Gate B (THEN) */}
        <button
          onClick={() => toggleGate('B')}
          className={`
            absolute top-44 left-1/2 -translate-x-1/2 w-32 h-10 rounded-xl border-2 flex items-center justify-center gap-2 transition-all duration-300
            ${gateB ? 'bg-green-500/30 border-[#81E6D9]' : 'bg-white/10 backdrop-blur-sm border-white/20'}
          `}
        >
          <span className="text-[10px] font-black text-white/90 tracking-widest uppercase">THEN Gate B: {gateB ? 'ON' : 'OFF'}</span>
        </button>

        {/* Targets */}
        <div className="absolute bottom-4 left-4 flex flex-col items-center">
          <div className={`text-4xl transition-all duration-500 ${!gateA ? 'scale-125 brightness-110' : 'opacity-40'}`}>🌵</div>
          <span className="text-[8px] font-black text-white/60 uppercase mt-1">Cactus</span>
        </div>

        <div className="absolute bottom-4 right-4 flex flex-col items-center">
          <div className={`text-4xl transition-all duration-500 ${gateA && !gateB ? 'scale-125 brightness-110' : 'opacity-40'}`}>🌵</div>
          <span className="text-[8px] font-black text-white/60 uppercase mt-1">Cactus</span>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className={`text-4xl transition-all duration-500 ${isSolved ? 'scale-125' : 'opacity-40'}`}>🌾</div>
          <span className="text-[8px] font-black text-white/60 uppercase mt-1 font-bold">Wheat</span>
        </div>
      </div>

      {/* Rek Mascot coaching */}
      <div className="flex items-center gap-4 w-full bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
        <div className="text-3xl">
          {isSolved ? '🎯' : '🤔'}
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-wide text-white/90 leading-relaxed">
            {isSolved 
              ? "Brilliant! Logic and water are flowing perfectly to the crops." 
              : "We need the water to reach the Wheat. Try toggling the IF/THEN gates!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataFlowRoutingLab;
