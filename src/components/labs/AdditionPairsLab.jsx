import React, { useState, useEffect, useRef } from 'react';
import useStore from '../../store/useStore';

/**
 * AdditionPairsLab - Grade 1 Math: Basic Addition Pairs
 * Energy Level: Low Energy (Pastel Green #C6F6D5)
 * 
 * Mechanic: Drop "jelly blobs" into a jar to reach a target number.
 * Zero-Text / Zero-Penalty UX.
 */
const AdditionPairsLab = ({ onQuestComplete }) => {
  const target = 8;
  const initialBlobs = 5;
  const [blobs, setBlobs] = useState(initialBlobs);
  const [isSolved, setIsSolved] = useState(false);
  const [rekMood, setRekMood] = useState('thinking'); // 'thinking' | 'cheering' | 'oops'
  const [interactionCount, setInteractionCount] = useState(0);
  const startTime = useRef(Date.now());

  // Handle completion telemetry
  useEffect(() => {
    if (blobs === target && !isSolved) {
      setIsSolved(true);
      setRekMood('cheering');
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      if (onQuestComplete) {
        onQuestComplete({
          timeSpent,
          interactionCount: interactionCount + (target - initialBlobs),
          energyLevel: 'Low Energy',
        });
      }
    } else if (blobs > target) {
      // Gentle feedback: reset if overfilled
      setRekMood('oops');
      useStore.getState().setRetryModal(true); // Trigger global retry modal
      const timer = setTimeout(() => {
        setBlobs(initialBlobs);
        setRekMood('thinking');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [blobs, isSolved, interactionCount, onQuestComplete]);

  const addBlob = () => {
    if (isSolved) return;
    setBlobs(prev => prev + 1);
    setInteractionCount(prev => prev + 1);
    setRekMood('thinking');
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#FDFBF7] rounded-3xl w-full max-w-md mx-auto shadow-sm border border-[#E8E5DF]">
      {/* Header / Target Indicator */}
      <div className="mb-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C6F6D5] text-3xl font-bold text-[#4A5568] shadow-inner mb-2">
          {target}
        </div>
        <p className="text-xs font-semibold tracking-widest text-[#718096] uppercase leading-relaxed">
          Target Goal
        </p>
      </div>

      {/* Main Lab Area */}
      <div className="relative w-full aspect-square bg-[#F4F7F6] rounded-2xl border-2 border-dashed border-[#C6F6D5] flex items-end justify-center p-4 mb-4 overflow-hidden">
        {/* The Jar Container */}
        <div className="relative w-48 h-64 border-4 border-[#718096]/20 border-t-0 rounded-b-3xl flex flex-wrap-reverse content-start justify-center p-2 gap-2 bg-white/30 backdrop-blur-sm z-10">
          {[...Array(blobs)].map((_, i) => (
            <div 
              key={i}
              className="w-10 h-10 rounded-full bg-[#C6F6D5] shadow-sm animate-bounce"
              style={{ animationDelay: `${i * 0.1}s`, animationDuration: '2s' }}
            />
          ))}
        </div>

        {/* Floating background elements */}
        <div className="absolute top-10 left-10 w-8 h-8 rounded-full bg-[#C6F6D5]/20 blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-12 h-12 rounded-full bg-[#C6F6D5]/30 blur-xl animate-pulse" />
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-6 w-full">
        <button
          onClick={addBlob}
          disabled={isSolved || rekMood === 'oops'}
          className={`
            group relative flex items-center justify-center w-full py-4 rounded-2xl text-[#4A5568] font-bold tracking-wide transition-all duration-300
            ${isSolved 
              ? 'bg-[#C6F6D5] cursor-default' 
              : 'bg-white border-2 border-[#C6F6D5] hover:bg-[#C6F6D5]/20 active:scale-95'}
          `}
        >
          {isSolved ? (
            <span className="flex items-center gap-2">✨ SUCCESS! ✨</span>
          ) : (
            <span className="flex items-center gap-2 text-2xl">
              <span className="text-3xl">+</span> 💧
            </span>
          )}
        </button>

        {/* Rek the Buddy */}
        <div className="flex items-center gap-4 px-6 py-3 bg-white rounded-full shadow-sm border border-[#E8E5DF]">
          <div className="text-3xl animate-bounce">
            {rekMood === 'thinking' && '🦎'}
            {rekMood === 'cheering' && '🦖'}
            {rekMood === 'oops' && '🐢'}
          </div>
          <div className="text-xs font-medium text-[#718096] tracking-wide leading-relaxed">
            {rekMood === 'thinking' && "Let's fill the jar!"}
            {rekMood === 'cheering' && "Perfect! You did it!"}
            {rekMood === 'oops' && "A bit too many! Let's try again."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionPairsLab;
