import React, { useState } from 'react';
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
 * Refined for a compact, glassmorphic layout.
 */
const QuestMapManager = ({ onSelectQuest }) => {
  const currentBiome = useStore((s) => s.currentBiome);
  const setBiome = useStore((s) => s.setBiome);
  const xp = useStore((s) => s.xp);
  
  const [globalXP, setGlobalXP] = useState(8450);
  const [isDonating, setIsDonating] = useState(false);
  
  const biomeData = BIOMES[currentBiome] || BIOMES.Ocean;

  const handleDonate = () => {
    if (xp < 10 || isDonating) return;
    setIsDonating(true);
    setTimeout(() => {
      setGlobalXP(prev => prev + 10);
      setIsDonating(false);
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col gap-3 w-full h-full min-h-0 animate-fade-in">
      
      {/* ── Co-op Expedition Tracker (Slim Glass Bar) ── */}
      <div className="shrink-0 relative overflow-hidden rounded-xl bg-black/50 backdrop-blur-md border-white/10 border border-white/20 shadow-sm p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
        
        <div className="flex items-center gap-3 flex-1 min-w-0 w-full">
          <div className="p-2 bg-black/30 rounded-lg shrink-0">
            <Globe className="w-4 h-4 text-[#81E6D9]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-end mb-1.5">
              <h2 className="text-[10px] font-black tracking-widest uppercase opacity-90 truncate">
                Global Expedition: {biomeData.sanctuary}
              </h2>
              <span className="text-[9px] font-bold text-[#81E6D9] tracking-wider shrink-0 ml-2">
                {globalXP.toLocaleString()}/10k XP
              </span>
            </div>
            {/* Slim Progress Bar */}
            <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden shadow-inner relative">
              <div 
                className="h-full bg-gradient-to-r from-[#81E6D9] to-[#68D391] transition-all duration-1000 ease-out rounded-full"
                style={{ width: `${(globalXP / 10000) * 100}%` }}
              />
              {isDonating && (
                <div className="absolute top-0 right-0 h-full w-8 bg-white/60 animate-ping rounded-full" />
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleDonate}
          disabled={xp < 10 || isDonating}
          className={`
            shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all duration-300 w-full sm:w-auto
            ${xp >= 10 
              ? 'bg-[#81E6D9] text-[#0f2a24] hover:brightness-110 shadow-[0_0_10px_rgba(129,230,217,0.3)]' 
              : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10'}
          `}
        >
          {isDonating ? (
            <span className="animate-pulse flex items-center gap-1.5">Sending... <Sparkles className="w-3 h-3" /></span>
          ) : (
            <>
              Donate 10 XP
            </>
          )}
        </button>
      </div>

      {/* ── Biome Map Area ── */}
      <div className={`relative flex-1 rounded-2xl bg-black/50 backdrop-blur-md border-white/10 border border-white/10 p-4 sm:p-6 flex flex-col transition-colors duration-700 overflow-hidden`}>
        
        {/* Map Area / Quest Nodes */}
        <div className="relative flex-1 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 py-8">
          {/* Ambient visual background element */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <div className="w-48 h-48 rounded-full" style={{ backgroundColor: biomeData.accentColor, filter: 'blur(80px)' }} />
          </div>

          {/* Path connectors (Visual decoration) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20 flex items-center justify-center">
            <div className="w-3/4 h-1 border-t-2 border-dashed border-white/50" />
          </div>

          {biomeData.quests.map((quest, idx) => (
            <div 
              key={quest.id} 
              className="group relative flex flex-col items-center z-10"
              style={{ transform: `translateY(${idx % 2 === 0 ? '-15px' : '15px'})` }}
            >
              {/* The Node */}
              <button
                onClick={() => onSelectQuest && onSelectQuest(quest)}
                className={`
                  w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl font-black shadow-[0_0_15px_rgba(255,255,255,0.1)] border-2 border-white/60 transition-all duration-300
                  hover:scale-110 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 text-[#1A202C]
                `}
                style={{ backgroundColor: quest.energyColor }}
              >
                {idx + 1}
              </button>

              {/* Tooltip (Hover) */}
              <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                <div className="bg-black/50 backdrop-blur-md border-white/10 px-3 py-2 rounded-xl shadow-xl border border-white/20 whitespace-nowrap text-white">
                  <p className="text-[8px] font-black tracking-widest text-white/60 uppercase mb-0.5">{quest.subject}</p>
                  <p className="text-xs font-bold text-white mb-1">{quest.title}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: quest.energyColor }} />
                    <span className="text-[9px] font-black text-[#81E6D9]">+{quest.reward} XP</span>
                  </div>
                </div>
              </div>

              {/* Node Title (Always Visible) */}
              <p className="absolute -bottom-8 text-[9px] font-bold tracking-widest text-white/80 uppercase text-center w-24">
                {quest.title}
              </p>
            </div>
          ))}
        </div>

        {/* Biome Descriptor */}
        <div className="mt-auto pt-4 text-center shrink-0">
          <p className="text-[10px] font-medium tracking-wide text-white/50">
            Currently exploring <span className="font-bold text-white/90">{biomeData.label}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestMapManager;
