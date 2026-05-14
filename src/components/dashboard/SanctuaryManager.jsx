import React, { useState, useEffect, useRef } from 'react';
import useStore from '../../store/useStore';

/**
 * SanctuaryManager - Behavioral monitoring wrapper for frustration and task paralysis detection.
 * Automatically triggers Sanctuary Mode based on user input patterns.
 */
const SanctuaryManager = ({ children }) => {
  const sanctuaryActive = useStore((s) => s.sanctuaryActive);
  const toggleSanctuary = useStore((s) => s.toggleSanctuary);

  // --- Frustration Detection (Erratic Input) ---
  const clickTimestamps = useRef([]);
  
  // --- Task Paralysis Detection (Inactivity) ---
  const inactivityTimer = useRef(null);
  const INACTIVITY_THRESHOLD = 60000; // 60 seconds

  const startInactivityTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (!sanctuaryActive) {
        console.log('Sanctuary Manager: Inactivity detected.');
        toggleSanctuary();
      }
    }, INACTIVITY_THRESHOLD);
  };

  useEffect(() => {
    const handleInteraction = () => {
      // Reset inactivity timer on any movement or click
      startInactivityTimer();
    };

    const handleClick = () => {
      handleInteraction();
      
      const now = Date.now();
      // Add current click timestamp
      clickTimestamps.current.push(now);
      
      // Filter clicks within the last 3 seconds
      const threeSecondsAgo = now - 3000;
      clickTimestamps.current = clickTimestamps.current.filter(ts => ts > threeSecondsAgo);
      
      // Trigger if more than 5 clicks in 3 seconds
      if (clickTimestamps.current.length > 5 && !sanctuaryActive) {
        console.log('Sanctuary Manager: Frustration detected.');
        toggleSanctuary();
        clickTimestamps.current = []; // Reset
      }
    };

    // Attach listeners to window for global monitoring
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('mousedown', handleClick);
    window.addEventListener('keydown', handleInteraction);

    // Initial timer start
    startInactivityTimer();

    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('keydown', handleInteraction);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [sanctuaryActive, toggleSanctuary]);

  // --- Breathing Animation Logic ---
  const [breathingPhase, setBreathingPhase] = useState('In'); // In, Hold, Out
  const [breathingText, setBreathingText] = useState('Breathe In...');
  const [secondsRemaining, setSecondsRemaining] = useState(4);

  useEffect(() => {
    if (!sanctuaryActive) return;

    let phase = 'In';
    let count = 4;
    
    const interval = setInterval(() => {
      count -= 1;
      if (count === 0) {
        if (phase === 'In') {
          phase = 'Hold';
          setBreathingText('Hold...');
          count = 4;
        } else if (phase === 'Hold') {
          phase = 'Out';
          setBreathingText('Breathe Out...');
          count = 4;
        } else {
          phase = 'In';
          setBreathingText('Breathe In...');
          count = 4;
        }
        setBreathingPhase(phase);
      }
      setSecondsRemaining(count === 0 ? 4 : count);
    }, 1000);

    return () => clearInterval(interval);
  }, [sanctuaryActive]);

  return (
    <div className="relative w-full h-full">
      {/* Main Content */}
      <div className={sanctuaryActive ? 'pointer-events-none' : ''}>
        {children}
      </div>

      {/* Sanctuary Overlay */}
      {sanctuaryActive && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FDFBF7]/90 backdrop-blur-sm animate-fade-in transition-all duration-700">
          {/* Rek the Mascot */}
          <div className="flex flex-col items-center mb-12 animate-fade-in-up">
            <div className="w-24 h-24 bg-[#F4F7F6] rounded-full flex items-center justify-center text-5xl shadow-sm mb-4">
              🦎
            </div>
            <p className="text-sm font-semibold tracking-wide text-[#4A5568] text-center max-w-xs leading-relaxed">
              Looks like our brain energy is shifting!<br />Let's take a quick breather.
            </p>
          </div>

          {/* Breathing Circle Element */}
          <div className="relative flex items-center justify-center mb-16">
            <div 
              className={`
                w-48 h-48 rounded-full bg-[#81E6D9]/20 flex items-center justify-center transition-all duration-[4000ms] ease-in-out
                ${breathingPhase === 'In' ? 'scale-125' : breathingPhase === 'Out' ? 'scale-100' : 'scale-125'}
              `}
            >
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold tracking-widest text-[#4A5568] uppercase mb-1">
                  {breathingText}
                </span>
                <span className="text-4xl font-black text-[#4A5568]">
                  {secondsRemaining}
                </span>
              </div>
            </div>
            
            {/* Ambient pulse circle */}
            <div className="absolute inset-0 w-full h-full rounded-full border-4 border-[#81E6D9]/10 animate-ping opacity-20" />
          </div>

          {/* Exit Strategy */}
          <button
            onClick={() => {
              toggleSanctuary();
              startInactivityTimer(); // Restart timer on return
            }}
            className="px-8 py-4 bg-white border-2 border-[#E8E5DF] rounded-2xl text-xs font-bold tracking-[0.2em] text-[#4A5568] uppercase hover:bg-[#F4F7F6] hover:border-[#81E6D9] transition-all duration-300 shadow-sm"
          >
            I'm ready to return to my quest
          </button>
        </div>
      )}
    </div>
  );
};

export default SanctuaryManager;
