import React from 'react';
import useStore from '../../store/useStore';

/**
 * AccessibilitySettingsPanel - A low-stim sanctuary menu for managing 
 * neuro-inclusive preferences.
 */
const AccessibilitySettingsPanel = () => {
  const active = useStore((s) => s.settingsPanelActive);
  const setSettingsPanel = useStore((s) => s.setSettingsPanel);
  
  const themeMode = useStore((s) => s.themeMode);
  const setThemeMode = useStore((s) => s.setThemeMode);
  
  const fontStyle = useStore((s) => s.fontStyle);
  const setFontStyle = useStore((s) => s.setFontStyle);
  
  const animationIntensity = useStore((s) => s.animationIntensity);
  const setAnimationIntensity = useStore((s) => s.setAnimationIntensity);
  
  const preferredInputMode = useStore((s) => s.preferredInputMode);
  const setPreferredInputMode = useStore((s) => s.setPreferredInputMode);

  if (!active) return null;

  const OptionGroup = ({ title, description, children }) => (
    <div className="mb-8">
      <h3 className="text-sm font-bold tracking-widest text-[#4A5568] uppercase mb-1">{title}</h3>
      <p className="text-[10px] text-[#718096] tracking-wide mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );

  const ToggleButton = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all duration-300
        ${isActive 
          ? 'bg-[#81E6D9] text-[#4A5568] shadow-sm' 
          : 'bg-[#F4F7F6] text-[#718096] hover:bg-[#E8E5DF]'}
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-end animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#F4F7F6]/60 backdrop-blur-sm"
        onClick={() => setSettingsPanel(false)}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-sm h-full bg-[#FDFBF7] shadow-2xl border-l border-[#E8E5DF] p-8 flex flex-col animate-slide-right">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-black tracking-tighter text-[#4A5568]">PREFERENCES</h2>
          <button 
            onClick={() => setSettingsPanel(false)}
            className="w-10 h-10 rounded-full bg-[#F4F7F6] flex items-center justify-center text-[#718096] hover:bg-[#E8E5DF] transition-all"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <OptionGroup 
            title="Visual World" 
            description="How do you want your Landas world to look today?"
          >
            <ToggleButton 
              label="Arcade (Classic)" 
              isActive={themeMode === 'arcade'} 
              onClick={() => setThemeMode('arcade')} 
            />
            <ToggleButton 
              label="Sanctuary (Low-Stim)" 
              isActive={themeMode === 'sanctuary'} 
              onClick={() => setThemeMode('sanctuary')} 
            />
          </OptionGroup>

          <OptionGroup 
            title="Reading Style" 
            description="Choose a font style that feels comfortable for your eyes."
          >
            <ToggleButton 
              label="Standard" 
              isActive={fontStyle === 'standard'} 
              onClick={() => setFontStyle('standard')} 
            />
            <ToggleButton 
              label="Dyslexic-Friendly" 
              isActive={fontStyle === 'dyslexic'} 
              onClick={() => setFontStyle('dyslexic')} 
            />
          </OptionGroup>

          <OptionGroup 
            title="Energy & Motion" 
            description="Adjust the intensity of animations to match your energy."
          >
            <ToggleButton 
              label="Full Magic" 
              isActive={animationIntensity === 'full'} 
              onClick={() => setAnimationIntensity('full')} 
            />
            <ToggleButton 
              label="Steady (Reduced)" 
              isActive={animationIntensity === 'reduced'} 
              onClick={() => setAnimationIntensity('reduced')} 
            />
          </OptionGroup>

          <OptionGroup 
            title="Learning Style" 
            description="How do you prefer to answer questions?"
          >
            <ToggleButton 
              label="Visual (Drag)" 
              isActive={preferredInputMode === 'visual'} 
              onClick={() => setPreferredInputMode('visual')} 
            />
            <ToggleButton 
              label="Audio (Voice)" 
              isActive={preferredInputMode === 'audio'} 
              onClick={() => setPreferredInputMode('audio')} 
            />
            <ToggleButton 
              label="Text (Type)" 
              isActive={preferredInputMode === 'text'} 
              onClick={() => setPreferredInputMode('text')} 
            />
          </OptionGroup>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E8E5DF]">
          <button 
            onClick={() => setSettingsPanel(false)}
            className="w-full py-4 bg-[#81E6D9] rounded-2xl text-[10px] font-black tracking-[0.2em] text-[#4A5568] uppercase shadow-md active:scale-95 transition-all"
          >
            Save My Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettingsPanel;
