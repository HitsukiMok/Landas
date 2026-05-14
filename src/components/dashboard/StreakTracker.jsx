import React, { useState } from 'react';
import { Flame, Snowflake } from 'lucide-react';

/**
 * StreakTracker - Tracks the student's daily learning streak.
 * Designed with a neuro-inclusive "Freeze" mechanic to prevent
 * frustration during executive dysfunction periods.
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
    <div className={`relative overflow-hidden rounded-3xl p-6 transition-all duration-500 bg-[#F4F7F6] border border-[#E8E5DF] shadow-sm`}>
      {/* Frost Overlay (Visual effect when frozen) */}
      {streakStatus === 'frozen' && (
        <div className="absolute inset-0 pointer-events-none bg-blue-100/20 backdrop-blur-[1px] animate-pulse">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 blur-2xl rounded-full" />
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-[10px] font-black tracking-[0.2em] uppercase opacity-60">Quest Streak</h3>
        <p className={`flex items-center gap-2 text-xl font-black tracking-tight mt-1 transition-all duration-700 ${streakStatus === 'frozen' ? 'text-blue-300 drop-shadow-[0_0_8px_rgba(147,197,253,0.8)]' : ''}`}>
          {currentStreak} Day {streakStatus === 'frozen' ? 'Frozen' : 'Quest'} Streak! 
          {streakStatus === 'frozen' ? <Snowflake className="w-5 h-5 fill-blue-300/20" /> : <Flame className="w-5 h-5 text-[#F6AD55] fill-[#F6AD55]" />}
        </p>
      </div>

      {/* Days Row */}
      <div className="flex justify-between items-center mb-6 px-1">
        {days.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div 
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500
                ${completedDays.includes(i) 
                  ? 'bg-[#81E6D9] text-[#4A5568] shadow-md scale-110' 
                  : 'bg-black/5 text-current opacity-30'}
              `}
            >
              {completedDays.includes(i) ? '✓' : day}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <button
          disabled={!freezeAvailable || streakStatus === 'frozen'}
          onClick={() => setShowConfirm(true)}
          className={`
            w-full py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2
            ${freezeAvailable && streakStatus === 'active'
              ? 'bg-white/10 border border-white/20 hover:bg-white/20 active:scale-95'
              : 'opacity-50 cursor-not-allowed bg-black/10 border-transparent'}
          `}
        >
          {streakStatus === 'frozen' ? <Snowflake className="w-3.5 h-3.5" /> : <Snowflake className="w-3.5 h-3.5" />}
          {streakStatus === 'frozen' ? 'Streak Protected' : 'Freeze Streak'}
        </button>
        
        <p className="text-[9px] font-bold tracking-wide opacity-40 text-center uppercase">
          {freezeAvailable ? '1 Weekly Freeze Available' : 'Streak protected for 24h'}
        </p>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-6 animate-fade-in">
          <div className="bg-[#FDFBF7] p-8 rounded-3xl max-w-sm w-full shadow-2xl border border-white animate-fade-in-scale">
            <div className="text-[#81E6D9] mb-6">
              <Snowflake className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-black text-[#4A5568] mb-4 tracking-tight">Need a breather?</h2>
            <p className="text-sm text-[#718096] leading-relaxed mb-8">
              Executive dysfunction happens, and that's okay! Use your weekly <span className="font-bold text-[#4A5568]">Freeze</span> to protect your streak for 24 hours.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleFreeze}
                className="w-full py-4 bg-[#81E6D9] text-[#4A5568] font-black text-xs tracking-widest uppercase rounded-2xl hover:brightness-105 active:scale-95 transition-all"
              >
                Confirm Freeze
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full py-3 text-[10px] font-black tracking-widest uppercase text-[#A0AEC0] hover:text-[#718096] transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
