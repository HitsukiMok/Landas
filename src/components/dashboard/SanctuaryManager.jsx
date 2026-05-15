import React, { useEffect, useRef } from 'react';
import useStore from '../../store/useStore';

/**
 * SanctuaryManager - Behavioral monitoring wrapper for frustration and task paralysis detection.
 * Automatically triggers Sanctuary Mode based on user input patterns.
 * (UI has been delegated to SanctuaryMode.jsx)
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

      // Trigger if more than 8 clicks in 3 seconds
      if (clickTimestamps.current.length > 8 && !sanctuaryActive) {
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

  return (
    <div className={`relative w-full h-full ${sanctuaryActive ? 'pointer-events-none' : ''}`}>
      {children}
    </div>
  );
};

export default SanctuaryManager;
