import React from 'react';
import useStore from '../store/useStore';

/**
 * ThemeWrapper - Applies global neuro-inclusive preferences to the entire application.
 * Manages theme (Arcade vs Sanctuary), font style (Standard vs Dyslexic), 
 * and animation intensity.
 */
const ThemeWrapper = ({ children }) => {
  const themeMode = useStore((s) => s.themeMode);
  const fontStyle = useStore((s) => s.fontStyle);
  const animationIntensity = useStore((s) => s.animationIntensity);

  // Theme classes
  const themeClasses = themeMode === 'arcade' 
    ? 'bg-leaf text-gold transition-colors duration-500' 
    : 'bg-[#FDFBF7] text-[#4A5568] transition-colors duration-500';

  // Font classes for Dyslexia support
  const fontClasses = fontStyle === 'dyslexic'
    ? 'tracking-widest leading-loose font-sans'
    : 'tracking-wide leading-relaxed font-sans';

  // Animation intensity classes
  const animationClasses = animationIntensity === 'reduced'
    ? '[&_*]:!animation-none [&_*]:!transition-none'
    : '';

  return (
    <div className={`min-h-screen ${themeClasses} ${fontClasses} ${animationClasses}`}>
      {children}
    </div>
  );
};

export default ThemeWrapper;
