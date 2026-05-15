import React, { useState } from 'react';
import { Settings, Shield, BarChart2, Activity, Lightbulb, Award, Brain, Info } from 'lucide-react';
import useStore, { selectLevel, selectTitle, selectXPInCurrentLevel } from '../../store/useStore';

/**
 * LearningProfile - A dual-view component for students and educators.
 * Refined for a compact, glassmorphic layout.
 */
export default function LearningProfile() {
  const [view, setView] = useState('student'); // 'student' | 'educator'

  // Store Data
  const xp = useStore((s) => s.xp);
  const level = useStore(selectLevel);
  const title = useStore(selectTitle);
  const xpInLevel = useStore(selectXPInCurrentLevel);
  const xpNeeded = 50;
  const progressPct = Math.min((xpInLevel / xpNeeded) * 100, 100);

  const toggleView = () => setView(prev => prev === 'student' ? 'educator' : 'student');

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/50 backdrop-blur-md border-white/10 p-4 shadow-sm transition-all duration-700 text-white">
      {/* Secret Toggle */}
      <button
        onClick={toggleView}
        className="absolute top-3 right-3 p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 z-10"
        title="Toggle Educator View"
      >
        <Shield className="w-3 h-3" />
      </button>

      {view === 'student' ? (
        <StudentView
          level={level}
          title={title}
          xp={xp}
          xpInLevel={xpInLevel}
          xpNeeded={xpNeeded}
          progressPct={progressPct}
        />
      ) : (
        <EducatorView username="Explorer" />
      )}
    </div>
  );
}

function StudentView({ level, title, xp, xpInLevel, xpNeeded, progressPct }) {
  const achievements = [
    { id: 1, name: 'Algebra Balancer', icon: '⚖️' },
    { id: 2, name: 'Kelp Grower', icon: '🌿' },
    { id: 3, name: 'Coral Counter', icon: '🪸' },
    { id: 4, name: 'six seven', icon: '67' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/30 shadow-inner border border-white/30 overflow-hidden">
          <img
            src="/final_logo_docs.png"
            alt="Avatar"
            className="w-8 h-8 object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black tracking-widest text-white/70 uppercase mb-0.5">
            Lvl {level}
          </p>
          <p className="text-sm font-bold tracking-tight text-white truncate">
            {title}
          </p>
        </div>
      </div>

      {/* XP Progress */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-black tracking-widest text-white/60 uppercase">
            XP Mastery
          </span>
          <span className="text-[10px] font-bold tracking-tight text-white/90">
            {xpInLevel} / {xpNeeded}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-black/20 border border-white/10 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#81E6D9] to-[#68D391] shadow-[0_0_8px_rgba(129,230,217,0.6)] transition-all duration-1000 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 mb-1">
          <Award className="w-3 h-3 text-[#F5D623]" />
          <span className="text-[9px] font-black tracking-widest text-white/60 uppercase">Pinned Trophies</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-white/20 bg-white/10 text-[9px] font-bold tracking-tight text-white hover:bg-black/30 transition-colors cursor-help"
              title={ach.name}
            >
              <span className="text-[10px]">{ach.icon}</span>
              <span className="truncate max-w-[60px]">{ach.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total XP footer */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Brain className="w-3 h-3 text-[#81E6D9]" />
          <span className="text-[9px] font-black tracking-widest text-white/60 uppercase">
            Total XP
          </span>
        </div>
        <span className="text-[10px] font-bold text-white tracking-wider">{xp}</span>
      </div>
    </div>
  );
}

function EducatorView({ username }) {
  return (
    <div className="animate-fade-in-scale space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-[9px] font-black tracking-widest text-[#81E6D9] uppercase mb-0.5 flex items-center gap-1.5">
          <BarChart2 className="w-3 h-3" />
          Educator Insights
        </h2>
        <p className="text-sm font-black tracking-tight text-white">
          {username}'s Dashboard
        </p>
      </div>

      {/* Energy Preference */}
      <div className="p-3 rounded-xl bg-black/20 border border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-black tracking-widest text-white/60 uppercase">Energy Profile</span>
          <span className="text-[8px] font-bold text-[#68D391] bg-[#68D391]/20 px-1.5 py-0.5 rounded-sm uppercase">Optimal</span>
        </div>
        <div className="space-y-1.5">
          {[
            { label: 'Low Stim', val: 85, color: 'bg-[#81E6D9]' },
            { label: 'Moderate', val: 45, color: 'bg-[#F6E05E]' },
            { label: 'High Brain', val: 20, color: 'bg-[#FC8181]' }
          ].map(item => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-[8px] font-bold text-white/70">
                <span>{item.label}</span>
                <span>{item.val}% comp</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-1000`}
                  style={{ width: `${item.val}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sanctuary Metrics */}
      <div className="p-3 rounded-xl bg-blue-900/30 border border-blue-400/20 flex items-start gap-2.5">
        <Activity className="w-4 h-4 text-[#63B3ED] mt-0.5 shrink-0" />
        <div>
          <h4 className="text-[9px] font-black text-[#90CDF4] uppercase tracking-wider mb-0.5">Triggers</h4>
          <p className="text-[10px] text-white/80 leading-tight">
            Triggered <span className="font-bold text-white">3x</span> during math quests.
          </p>
        </div>
      </div>

      {/* AI Insight */}
      <div className="p-3 rounded-xl bg-purple-900/30 border border-purple-400/20 space-y-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
        <div className="flex items-center gap-1.5">
          <Info className="w-3 h-3 text-[#D6BCFA]" />
          <span className="text-[9px] font-black tracking-widest uppercase text-[#D6BCFA]">Recommendation</span>
        </div>
        <p className="text-[10px] font-medium leading-relaxed text-white/90">
          Task paralysis detected. Use visual multi-modal inputs for the upcoming assessment.
        </p>
      </div>
    </div>
  );
}
