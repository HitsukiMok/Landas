import React, { useState } from 'react';
import { Settings, Shield, BarChart2, Activity, Lightbulb, Award, Brain, Info } from 'lucide-react';
import useStore, { selectLevel, selectTitle, selectXPInCurrentLevel } from '../../store/useStore';

/**
 * LearningProfile - A dual-view component for students and educators.
 * Features a "Secret Toggle" for parent/educator sync.
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
    <div className="relative overflow-hidden rounded-[2rem] border border-[#E8E5DF] bg-[#F4F7F6] p-6 shadow-sm transition-all duration-700">
      {/* Secret Toggle */}
      <button 
        onClick={toggleView}
        className="absolute top-4 right-4 p-2 text-[#A0AEC0] hover:text-[#718096] hover:bg-black/5 rounded-full transition-all duration-300 z-10"
        title="Toggle Educator View"
      >
        <Shield className="w-3.5 h-3.5" />
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
    { id: 1, name: 'Algebra Balancer', icon: '⚖️', color: 'bg-blue-100 text-blue-600' },
    { id: 2, name: 'Kelp Grower', icon: '🌿', color: 'bg-green-100 text-green-600' },
    { id: 3, name: 'Coral Counter', icon: '🪸', color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-[#81E6D9] blur-md opacity-20 rounded-2xl group-hover:opacity-40 transition-opacity" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-[#E8E5DF] overflow-hidden">
            <img 
              src="/final_logo_docs.png" 
              alt="Avatar" 
              className="w-10 h-10 object-contain opacity-80"
            />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-black tracking-[0.1em] text-[#4A5568] uppercase mb-0.5">
            Lvl {level}
          </p>
          <p className="text-[15px] font-bold tracking-tight text-[#718096]">
            {title}
          </p>
        </div>
      </div>

      {/* XP Progress */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black tracking-widest text-[#718096] uppercase">
            XP Mastery
          </span>
          <span className="text-[11px] font-bold tracking-tight text-[#4A5568]">
            {xpInLevel} / {xpNeeded} <span className="opacity-40">XP</span>
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-[#E8E5DF]/50 p-0.5 border border-white/40">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#81E6D9] to-[#68D391] shadow-[0_0_8px_rgba(129,230,217,0.4)] transition-all duration-1000 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-[10px] font-medium tracking-wide text-[#A0AEC0] text-center italic">
          Just {xpNeeded - xpInLevel} XP to Level {level + 1}
        </p>
      </div>

      {/* Achievements */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-3 h-3 text-[#F5D623]" />
          <span className="text-[10px] font-black tracking-widest text-[#718096] uppercase">Pinned Achievements</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {achievements.map(ach => (
            <div 
              key={ach.id} 
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-[#E8E5DF] bg-white/50 text-[10px] font-bold tracking-tight text-[#4A5568] hover:scale-105 transition-transform cursor-help`}
              title={ach.name}
            >
              <span className="text-xs">{ach.icon}</span>
              {ach.name}
            </div>
          ))}
        </div>
      </div>

      {/* Total XP footer */}
      <div className="mt-6 pt-4 border-t border-[#E8E5DF]/60 flex items-center justify-center gap-2">
        <Brain className="w-3 h-3 text-[#81E6D9]" />
        <span className="text-[10px] font-black tracking-widest text-[#718096] uppercase">
          Total Knowledge: <span className="text-[#4A5568]">{xp} XP</span>
        </span>
      </div>
    </div>
  );
}

function EducatorView({ username }) {
  return (
    <div className="animate-fade-in-scale space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[10px] font-black tracking-[0.2em] text-[#81E6D9] uppercase mb-1 flex items-center gap-2">
          <BarChart2 className="w-3.5 h-3.5" />
          Educator Insights
        </h2>
        <p className="text-lg font-black tracking-tight text-[#4A5568]">
          {username}'s Dashboard
        </p>
      </div>

      {/* Energy Preference */}
      <div className="p-4 rounded-2xl bg-white border border-[#E8E5DF] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black tracking-widest text-[#718096] uppercase">Energy Load Profile</span>
          <span className="text-[9px] font-bold text-[#68D391] bg-[#68D391]/10 px-2 py-0.5 rounded-full uppercase">Optimal</span>
        </div>
        <div className="space-y-2">
          {[
            { label: 'Low Energy (Green)', val: 85, color: 'bg-[#81E6D9]' },
            { label: 'Moderate (Yellow)', val: 45, color: 'bg-[#FEFCBF]' },
            { label: 'High Brain Power (Red)', val: 20, color: 'bg-[#FED7D7]' }
          ].map(item => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-[9px] font-bold text-[#718096]">
                <span>{item.label}</span>
                <span>{item.val}% completion</span>
              </div>
              <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${item.color} transition-all duration-1000`} 
                  style={{ width: `${item.val}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-[#A0AEC0] italic">Student completes low-stim, green-zone tasks 3.2x faster.</p>
      </div>

      {/* Sanctuary Metrics */}
      <div className="p-4 rounded-2xl bg-[#E8F4F8] border border-[#B2D8E8] flex items-start gap-3">
        <Activity className="w-5 h-5 text-[#3182CE] mt-0.5" />
        <div>
          <h4 className="text-[11px] font-black text-[#2C5282] uppercase tracking-wider mb-1">Sanctuary Triggers</h4>
          <p className="text-xs text-[#2C5282] leading-tight">
            Triggered <span className="font-bold underline">3 times</span> this week during multi-step math quests.
          </p>
        </div>
      </div>

      {/* AI Insight */}
      <div className="p-5 rounded-2xl bg-[#2D3748] text-white shadow-lg space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Lightbulb className="w-12 h-12" />
        </div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#81E6D9]/20 text-[#81E6D9]">
            <Info className="w-3 h-3" />
          </div>
          <span className="text-[10px] font-black tracking-[0.15em] uppercase text-[#81E6D9]">Actionable Recommendation</span>
        </div>
        <p className="text-xs font-medium leading-relaxed opacity-90">
          Insight: Task paralysis detected during multi-step algebra. The student benefits from smaller sub-tasks.
        </p>
        <div className="bg-white/10 p-3 rounded-xl">
          <p className="text-[11px] font-bold leading-relaxed text-[#81E6D9]">
            Strategy: Enable visual multi-modal inputs (icons/draggables) for the upcoming Desert ICT assessment.
          </p>
        </div>
      </div>
    </div>
  );
}
