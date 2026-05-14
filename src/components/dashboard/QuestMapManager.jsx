import React, { useState, useEffect } from 'react';
import { Globe, Compass, Waves, Trees, Sun, Sparkles } from 'lucide-react';
import useStore from '../../store/useStore';
import CoralGatheringLab from '../labs/CoralGatheringLab';
import KelpGrowthLab from '../labs/KelpGrowthLab';
import WordCurrentsLab from '../labs/WordCurrentsLab';
import SunbeamMirrorsLab from '../labs/SunbeamMirrorsLab';
import JungleBalanceLab from '../labs/JungleBalanceLab';
import BridgeScaleLab from '../labs/BridgeScaleLab';
import DataFlowRoutingLab from '../labs/DataFlowRoutingLab';
import AtomStackingLab from '../labs/AtomStackingLab';
import AntiGravityLab from '../labs/AntiGravityLab';

const BIOMES = {
  Ocean: {
    label: 'Ocean (Elem)',
    sanctuary: 'The Coral Reef',
    bgColor: 'bg-[#FDFBF7]',
    accentColor: '#B2D8E8',
    quests: [
      { id: 'q1', title: 'Coral Gathering', subject: 'Math', energy: 'low', energyColor: '#C6F6D5', reward: 15, xpType: 'low', labComponent: CoralGatheringLab },
      { id: 'q2', title: 'Kelp Growth', subject: 'Science', energy: 'moderate', energyColor: '#FEFCBF', reward: 25, xpType: 'moderate', labComponent: KelpGrowthLab },
      { id: 'q3', title: 'Word Currents', subject: 'Language', energy: 'high', energyColor: '#FED7D7', reward: 35, xpType: 'high', labComponent: WordCurrentsLab },
    ]
  },
  Tropics: {
    label: 'Tropics (JHS)',
    sanctuary: 'The Hidden Temple',
    bgColor: 'bg-[#FDFBF7]',
    accentColor: '#A5D6A7',
    quests: [
      { id: 'q4', title: 'Sunbeam Mirrors', subject: 'Math/Geometry', energy: 'low', energyColor: '#C6F6D5', reward: 15, xpType: 'low', labComponent: SunbeamMirrorsLab },
      { id: 'q5', title: 'Jungle Balance', subject: 'Science/Ecosystems', energy: 'moderate', energyColor: '#FEFCBF', reward: 25, xpType: 'moderate', labComponent: JungleBalanceLab },
      { id: 'q6', title: 'The Bridge Scale', subject: 'Multi-Step Algebra', energy: 'high', energyColor: '#FED7D7', reward: 35, xpType: 'high', labComponent: BridgeScaleLab },
    ]
  },
  Desert: {
    label: 'Desert (SHS)',
    sanctuary: 'The Hidden Oasis',
    bgColor: 'bg-[#FDFBF7]',
    accentColor: '#FFCC80',
    quests: [
      { id: 'q7', title: 'Data Flow Routing', subject: 'ICT/Logic', energy: 'low', energyColor: '#C6F6D5', reward: 15, xpType: 'low', labComponent: DataFlowRoutingLab },
      { id: 'q8', title: 'Atom Stacking', subject: 'Chemistry', energy: 'moderate', energyColor: '#FEFCBF', reward: 25, xpType: 'moderate', labComponent: AtomStackingLab },
      { id: 'q9', title: 'Anti-Gravity Sandbox', subject: 'Physics', energy: 'high', energyColor: '#FED7D7', reward: 35, xpType: 'high', labComponent: AntiGravityLab },
    ]
  }
};

/**
 * QuestMapManager - Visual biome navigation and global co-op expedition tracker.
 */
const QuestMapManager = ({ onSelectQuest }) => {
  const currentBiome = useStore((s) => s.currentBiome);
  const setBiome = useStore((s) => s.setBiome);
  const xp = useStore((s) => s.xp);
  const addXP = useStore((s) => s.addXP); // We'll mock a "donation" by subtracting (if we had subtraction) or just visually animating
  
  const [globalXP, setGlobalXP] = useState(8450);
  const [isDonating, setIsDonating] = useState(false);
  
  const biomeData = BIOMES[currentBiome] || BIOMES.Ocean;

  const handleDonate = () => {
    if (xp < 10 || isDonating) return;
    
    setIsDonating(true);
    // Note: In a real app, we'd have a decrementXP in the store. 
    // For this mockup, we'll just animate the global bar.
    setTimeout(() => {
      setGlobalXP(prev => prev + 10);
      setIsDonating(false);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      {/* ── Part 2: Co-op Expedition Tracker ── */}
      <div className="relative overflow-hidden rounded-3xl bg-[#FDFBF7] border border-[#E8E5DF] shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex-1">
            <h2 className="flex items-center gap-2 text-sm font-black tracking-widest text-[#4A5568] uppercase mb-1">
              <Globe className="w-4 h-4 text-[#81E6D9]" />
              Global Expedition
            </h2>
            <p className="text-[11px] font-medium text-[#718096] leading-relaxed max-w-md">
              Pool your XP with students across the Philippines to unlock the <span className="text-[#4A5568] font-bold">{biomeData.sanctuary}</span>!
            </p>
          </div>
          
          <div className="text-right">
            <span className="text-xs font-black text-[#4A5568] tracking-tighter">
              {globalXP.toLocaleString()} / 10,000 XP
            </span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="h-6 w-full bg-[#F4F7F6] rounded-full overflow-hidden shadow-inner mb-6 relative">
          <div 
            className="h-full bg-gradient-to-r from-[#81E6D9] to-[#68D391] transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${(globalXP / 10000) * 100}%` }}
          />
          {isDonating && (
            <div className="absolute top-0 right-0 h-full w-8 bg-white/40 animate-ping rounded-full" />
          )}
        </div>

        <button
          onClick={handleDonate}
          disabled={xp < 10 || isDonating}
          className={`
            group flex items-center justify-center gap-3 w-full py-3 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300
            ${xp >= 10 
              ? 'bg-white border-2 border-[#81E6D9] text-[#4A5568] hover:bg-[#81E6D9]/10' 
              : 'bg-[#F4F7F6] text-[#A0AEC0] border-2 border-transparent cursor-not-allowed'}
          `}
        >
          {isDonating ? (
            <span className="animate-pulse flex items-center gap-2">Sending XP... <Sparkles className="w-3 h-3" /></span>
          ) : (
            <>
              <Compass className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
              Donate 10 XP to the Expedition
            </>
          )}
        </button>
      </div>

      {/* ── Part 1: Biome Navigation ── */}
      <div className={`relative rounded-[2rem] ${biomeData.bgColor} border border-[#E8E5DF] p-8 min-h-[400px] flex flex-col transition-colors duration-700`}>
        {/* Biome Tabs */}
        <div className="flex gap-2 mb-12 self-center bg-white/40 p-1.5 rounded-2xl backdrop-blur-sm shadow-sm border border-white/20">
          {Object.entries(BIOMES).map(([key, data]) => {
            const Icon = key === 'Ocean' ? Waves : key === 'Tropics' ? Trees : Sun;
            return (
              <button
                key={key}
                onClick={() => setBiome(key)}
                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all duration-300
                  ${currentBiome === key 
                    ? 'bg-white text-[#4A5568] shadow-md' 
                    : 'text-[#718096] hover:bg-white/20'}
                `}
              >
                <Icon className="w-3.5 h-3.5" />
                {data.label}
              </button>
            );
          })}
        </div>

        {/* Map Area / Quest Nodes */}
        <div className="relative flex-1 flex items-center justify-around">
          {/* Ambient visual background element */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <div className="w-64 h-64 rounded-full" style={{ backgroundColor: biomeData.accentColor, filter: 'blur(80px)' }} />
          </div>

          {biomeData.quests.map((quest, idx) => (
            <div 
              key={quest.id} 
              className="group relative flex flex-col items-center"
              style={{ transform: `translateY(${idx % 2 === 0 ? '-20px' : '20px'})` }}
            >
              {/* The Node */}
              <button
                onClick={() => onSelectQuest && onSelectQuest(quest)}
                className={`
                  w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl shadow-lg border-4 border-white transition-all duration-500
                  hover:scale-110 hover:shadow-xl active:scale-95
                `}
                style={{ backgroundColor: quest.energyColor }}
              >
                {idx + 1}
              </button>

              {/* Tooltip (Hover) */}
              <div className="absolute -top-20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                <div className="bg-[#FDFBF7] p-3 rounded-2xl shadow-xl border border-[#E8E5DF] whitespace-nowrap">
                  <p className="text-[10px] font-black tracking-widest text-[#718096] uppercase mb-0.5">{quest.subject}</p>
                  <p className="text-sm font-bold text-[#4A5568] mb-1">{quest.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: quest.energyColor }} />
                    <span className="text-[10px] font-black text-[#81E6D9]">+{quest.reward} XP</span>
                  </div>
                </div>
                <div className="w-3 h-3 bg-[#FDFBF7] rotate-45 border-r border-b border-[#E8E5DF] mx-auto -mt-1.5" />
              </div>

              {/* Node Title (Always Visible) */}
              <p className="mt-4 text-[10px] font-black tracking-[0.2em] text-[#4A5568] uppercase text-center max-w-[80px] opacity-60">
                {quest.title}
              </p>
            </div>
          ))}

          {/* Path connectors (Visual decoration) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
            <path 
              d="M 25% 45% Q 50% 65%, 75% 45%" 
              stroke="#718096" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="8 8" 
            />
          </svg>
        </div>

        {/* Biome Descriptor */}
        <div className="mt-12 text-center">
          <p className="text-xs font-medium italic text-[#718096]">
            Exploring <span className="font-bold text-[#4A5568]">{biomeData.label}</span> path...
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestMapManager;
