import React, { useState } from 'react';
import { Flame, Snowflake } from 'lucide-react';

/**
 * StreakTracker - Tracks the student's daily learning streak.
 * Designed with a neuro-inclusive "Freeze" mechanic.
 * Refined for a compact, glassmorphic layout.
 */
export default function StreakTracker() {
  const [currentStreak, setCurrentStreak] = useState(14);
  const [freezeAvailable, setFreezeAvailable] = useState(true);
  const [streakStatus, setStreakStatus] = useState('active'); // 'active' | 'frozen'
  const [showConfirm, setShowConfirm] = useState(false);

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const completedDays = [0, 1, 2, 3]; // Mock data: Monday to Thursday completed

  const handleFreeze = () => {
    setStreakStatus('frozen');
    setFreezeAvailable(false);
    setShowConfirm(false);
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl p-4 transition-all duration-500 border border-white/20 bg-black/50 backdrop-blur-md border-white/10 shadow-sm text-white">
        {/* Frost Overlay */}
      {streakStatus === 'frozen' && (
        <div className="absolute inset-0 pointer-events-none bg-blue-400/10 backdrop-blur-[1px] animate-pulse">
          <div className="absolute top-0 right-0 w-16 h-16 bg-black/30 blur-2xl rounded-full" />
        </div>
      )}

      {/* Header & Action inline */}
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-[9px] font-black tracking-widest uppercase text-white/60">Quest Streak</h3>
          <p className={`flex items-center gap-1.5 text-sm font-black tracking-tight mt-0.5 transition-all duration-700 ${streakStatus === 'frozen' ? 'text-blue-200 drop-shadow-[0_0_8px_rgba(147,197,253,0.8)]' : 'text-white'}`}>
            {currentStreak} Day {streakStatus === 'frozen' ? 'Frozen' : 'Streak'} 
            {streakStatus === 'frozen' ? <Snowflake className="w-3.5 h-3.5 text-blue-300 fill-blue-300/20" /> : <Flame className="w-3.5 h-3.5 text-[#F6AD55] fill-[#F6AD55]" />}
          </p>
        </div>
        
        {/* Compact Freeze Button */}
        <button
          disabled={!freezeAvailable || streakStatus === 'frozen'}
          onClick={() => setShowConfirm(true)}
          title={streakStatus === 'frozen' ? 'Streak Protected' : 'Freeze Streak'}
          className={`
            p-1.5 rounded-lg transition-all duration-300
            ${freezeAvailable && streakStatus === 'active'
              ? 'bg-white/10 border border-white/20 hover:bg-black/30 active:scale-95 text-blue-200'
              : 'opacity-50 cursor-not-allowed bg-black/10 border-transparent text-white/40'}
          `}
        >
          <Snowflake className="w-4 h-4" />
        </button>
      </div>

      {/* Days Row */}
      <div className="flex justify-between items-center px-0.5">
        {days.map((day, i) => (
          <div 
            key={i} 
            className={`
              w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-500
              ${completedDays.includes(i) 
                ? 'bg-gradient-to-br from-[#81E6D9] to-[#68D391] text-[#0f2a24] shadow-sm scale-110' 
                : 'bg-black/20 text-white/40 border border-white/5'}
            `}
          >
            {completedDays.includes(i) ? '✓' : day}
          </div>
        ))}
      </div>

      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-[#1A202C] p-6 rounded-2xl max-w-[260px] w-full shadow-2xl border border-white/10 animate-fade-in-scale text-white">
            <div className="text-[#81E6D9] mb-3 flex justify-center">
              <Snowflake className="w-8 h-8" />
            </div>
            <h2 className="text-base font-black text-center mb-2 tracking-tight">Need a breather?</h2>
            <p className="text-[10px] text-white/70 text-center leading-relaxed mb-5">
              Executive dysfunction happens! Use your weekly <strong className="text-white">Freeze</strong> to protect your streak for 24h.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleFreeze}
                className="w-full py-2.5 bg-gradient-to-r from-[#81E6D9] to-[#68D391] text-[#0f2a24] font-black text-[10px] tracking-widest uppercase rounded-xl hover:brightness-110 active:scale-95 transition-all"
              >
                Confirm Freeze
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full py-2 text-[9px] font-black tracking-widest uppercase text-white/50 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
