import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the Context
const ThemeContext = createContext();

// 2. The Provider Component
export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('sanctuary'); // 'arcade' | 'sanctuary'
  const [fontStyle, setFontStyle] = useState('standard'); // 'standard' | 'dyslexic'
  const [animations, setAnimations] = useState('reduced'); // 'full' | 'reduced'

  const toggleTheme = () => setThemeMode(prev => prev === 'arcade' ? 'sanctuary' : 'arcade');
  const toggleFont = () => setFontStyle(prev => prev === 'standard' ? 'dyslexic' : 'standard');
  const toggleAnimations = () => setAnimations(prev => prev === 'full' ? 'reduced' : 'full');

  return (
    <ThemeContext.Provider value={{ 
      themeMode, setThemeMode, toggleTheme,
      fontStyle, setFontStyle, toggleFont,
      animations, setAnimations, toggleAnimations
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Custom hook for consuming the context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * AppWrapper - Physically enforces user preferences across the DOM.
 */
export const AppWrapper = ({ children }) => {
  const { themeMode, fontStyle, animations } = useTheme();

  // Theme Logic
  const themeClasses = themeMode === 'arcade'
    ? 'bg-[#65a30d] text-[#fef08a]'
    : 'bg-[#FDFBF7] text-[#4A5568]';

  // Font Logic
  const fontClasses = fontStyle === 'dyslexic'
    ? 'tracking-widest leading-loose font-sans'
    : 'tracking-wide leading-relaxed font-sans';

  // Global Animation Overrides
  useEffect(() => {
    if (animations === 'reduced') {
      const style = document.createElement('style');
      style.id = 'reduce-motion-override';
      style.innerHTML = `
        * { 
          transition: none !important; 
          animation: none !important; 
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(style);
      return () => {
        const existing = document.getElementById('reduce-motion-override');
        if (existing) existing.remove();
      };
    }
  }, [animations]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${themeClasses} ${fontClasses}`}>
      {children}
    </div>
  );
};

/**
 * PreferencesPanel - Accessible UI for toggling global settings.
 */
export const PreferencesPanel = () => {
  const { 
    themeMode, setThemeMode, 
    fontStyle, setFontStyle, 
    animations, setAnimations 
  } = useTheme();

  const buttonBase = "px-4 py-3 rounded-xl text-[11px] font-black tracking-widest uppercase transition-all duration-300 border-2 flex-1 text-center";
  const activeStyle = "bg-white text-[#4A5568] border-white shadow-lg scale-105 z-10";
  const inactiveStyle = "bg-black/20 text-white border-transparent hover:bg-black/30 opacity-60";

  return (
    <div className="flex flex-col gap-8 p-8 bg-[#2D3748] rounded-[2.5rem] border border-white/10 shadow-2xl ring-1 ring-white/20">
      <div className="space-y-1">
        <h3 className="text-sm font-black tracking-[0.2em] uppercase text-white">Interface Settings</h3>
        <p className="text-[10px] font-medium text-white/40 tracking-wide">Customize your Landas experience</p>
      </div>
      
      {/* Theme Toggle */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[#81E6D9]">Visual Theme</label>
        <div className="flex gap-2 bg-black/20 p-1.5 rounded-2xl">
          <button 
            onClick={() => setThemeMode('arcade')}
            className={`${buttonBase} ${themeMode === 'arcade' ? activeStyle : inactiveStyle}`}
          >
            Arcade
          </button>
          <button 
            onClick={() => setThemeMode('sanctuary')}
            className={`${buttonBase} ${themeMode === 'sanctuary' ? activeStyle : inactiveStyle}`}
          >
            Sanctuary
          </button>
        </div>
      </div>

      {/* Font Toggle */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[#81E6D9]">Typography</label>
        <div className="flex gap-2 bg-black/20 p-1.5 rounded-2xl">
          <button 
            onClick={() => setFontStyle('standard')}
            className={`${buttonBase} ${fontStyle === 'standard' ? activeStyle : inactiveStyle}`}
          >
            Standard
          </button>
          <button 
            onClick={() => setFontStyle('dyslexic')}
            className={`${buttonBase} ${fontStyle === 'dyslexic' ? activeStyle : inactiveStyle}`}
          >
            Dyslexic
          </button>
        </div>
      </div>

      {/* Animation Toggle */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[#81E6D9]">Motion Profile</label>
        <div className="flex gap-2 bg-black/20 p-1.5 rounded-2xl">
          <button 
            onClick={() => setAnimations('full')}
            className={`${buttonBase} ${animations === 'full' ? activeStyle : inactiveStyle}`}
          >
            Full
          </button>
          <button 
            onClick={() => setAnimations('reduced')}
            className={`${buttonBase} ${animations === 'reduced' ? activeStyle : inactiveStyle}`}
          >
            Reduced
          </button>
        </div>
      </div>
    </div>
  );
};
