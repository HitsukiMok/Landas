import React, { useState, useEffect, useRef } from 'react';
import useStore from '../../store/useStore';

/**
 * WordCurrentsLab - Grade 1-3 Language: Sentence Structure
 * Features a sortable sequence puzzle with a frictionless "click-to-place" mechanic.
 */
const WordCurrentsLab = ({ onQuestComplete }) => {
  const [availableWords, setAvailableWords] = useState(['Jumped', 'The', 'Cat']);
  const [placedWords, setPlacedWords] = useState([null, null, null]);
  const [isSolved, setIsSolved] = useState(false);
  const [isFishCrossing, setIsFishCrossing] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [rekMood, setRekMood] = useState('thinking');

  const startTime = useRef(Date.now());
  const setRetryModal = useStore((s) => s.setRetryModal);

  const CORRECT_SEQUENCE = ['The', 'Cat', 'Jumped'];

  const handleWordClick = (word, index) => {
    if (isSolved || isFishCrossing) return;
    setInteractionCount(prev => prev + 1);

    // Find first empty slot
    const nextSlotIndex = placedWords.indexOf(null);
    if (nextSlotIndex !== -1) {
      const newPlaced = [...placedWords];
      newPlaced[nextSlotIndex] = word;
      setPlacedWords(newPlaced);
      
      const newAvailable = [...availableWords];
      newAvailable.splice(index, 1);
      setAvailableWords(newAvailable);
    }
  };

  const handleRemoveWord = (index) => {
    if (isSolved || isFishCrossing || placedWords[index] === null) return;
    setInteractionCount(prev => prev + 1);

    const wordToRemove = placedWords[index];
    const newPlaced = [...placedWords];
    newPlaced[index] = null;
    setPlacedWords(newPlaced);

    setAvailableWords(prev => [...prev, wordToRemove]);
  };

  useEffect(() => {
    // Check if all slots are filled
    if (placedWords.every(w => w !== null)) {
      const isCorrect = placedWords.every((w, i) => w === CORRECT_SEQUENCE[i]);
      
      if (isCorrect) {
        setIsSolved(true);
        setRekMood('cheering');
        setIsFishCrossing(true);
        
        // Final telemetry
        const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
        setTimeout(() => {
          if (onQuestComplete) {
            onQuestComplete({ timeSpent, interactionCount, energyLevel: 'High Brain Power' });
          }
        }, 3000); // Wait for fish to cross
      } else {
        // Gentle feedback for incorrect sequence
        setRekMood('oops');
        setRetryModal(true);
        
        // Reset after a delay
        setTimeout(() => {
          setAvailableWords(['Jumped', 'The', 'Cat']);
          setPlacedWords([null, null, null]);
          setRekMood('thinking');
        }, 1500);
      }
    }
  }, [placedWords]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#FDFBF7] rounded-3xl w-full max-w-md mx-auto shadow-sm border border-[#E8E5DF] animate-fade-in">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-[10px] font-black tracking-[0.2em] text-[#718096] uppercase mb-1">Language Arts Lab</h2>
        <p className="text-sm font-bold text-[#4A5568]">Build the Word Bridge!</p>
      </div>

      {/* Main Play Area */}
      <div className="relative w-full h-64 bg-[#E8F4F8] rounded-2xl border-2 border-[#B2D8E8] mb-8 overflow-hidden">
        
        {/* The Gap (Ocean) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-24 bg-[#B2D8E8]/30 mt-12 animate-pulse" />
        </div>

        {/* The Bridge Slots */}
        <div className="absolute inset-x-0 bottom-12 flex justify-center gap-4 px-4">
          {placedWords.map((word, i) => (
            <div 
              key={i}
              onClick={() => handleRemoveWord(i)}
              className={`
                w-24 h-14 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all duration-500
                ${word ? 'bg-white border-[#81E6D9] shadow-md scale-105 cursor-pointer' : 'border-[#B2D8E8] bg-white/20'}
              `}
            >
              {word && (
                <span className="text-xs font-bold text-[#4A5568] tracking-widest uppercase animate-fade-in">
                  {word}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* The Fish Sprite */}
        <div 
          className={`
            absolute left-4 bottom-16 text-4xl transition-all duration-[3000ms] ease-in-out z-20
            ${isFishCrossing ? 'translate-x-[320px] rotate-12' : 'translate-x-0'}
          `}
        >
          {isFishCrossing ? '🐬' : '🐠'}
        </div>

        {/* Ambient Bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-3 h-3 bg-white/50 rounded-full animate-float-gentle"
              style={{ left: `${30 + (i * 20)}%`, bottom: '10%', animationDelay: `${i * 1.5}s` }}
            />
          ))}
        </div>
      </div>

      {/* Available Words (Floating Bubbles) */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 min-h-[60px]">
        {availableWords.map((word, i) => (
          <button
            key={word}
            onClick={() => handleWordClick(word, i)}
            className="px-6 py-3 bg-white border-2 border-[#E8E5DF] rounded-full text-xs font-black tracking-widest text-[#4A5568] uppercase shadow-sm hover:border-[#81E6D9] hover:shadow-md active:scale-95 transition-all animate-float-gentle"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Rek Mascot coaching */}
      <div className="flex items-center gap-4 w-full bg-[#F4F7F6] p-4 rounded-2xl border border-[#E8E5DF]">
        <div className="text-3xl animate-bounce">
          {rekMood === 'thinking' ? '💭' : rekMood === 'cheering' ? '🌟' : '😮'}
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-wide text-[#4A5568] leading-relaxed">
            {rekMood === 'thinking' ? "Help the fish cross by putting the words in the right order!" : 
             rekMood === 'cheering' ? "Excellent! You built a perfect sentence bridge." : 
             "Almost! Let's try rearranging the words to make more sense."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordCurrentsLab;
