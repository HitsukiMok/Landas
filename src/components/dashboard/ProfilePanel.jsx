import useStore from '../../store/useStore'
import { Globe, Waves, Trees, Sun } from 'lucide-react'
import LearningProfile from './LearningProfile'
import StreakTracker from './StreakTracker'

/**
 * ProfilePanel — left sidebar showing:
 * - Learning Profile Card (avatar, title, level, XP bar)
 * - Streak Tracker with Freeze button
 * - Biome selector
 */
export default function ProfilePanel() {
  const currentBiome = useStore((s) => s.currentBiome)
  const setBiome = useStore((s) => s.setBiome)

  const biomeIcons = {
    Ocean: Waves,
    Tropics: Trees,
    Desert: Sun
  };

  return (
    <aside id="profile-panel" className="flex flex-col gap-3 h-full">
      {/* ── Learning Profile Card (Dual View) ── */}
      <LearningProfile />

      {/* ── Streak Tracker Widget ── */}
      <StreakTracker />

      {/* ── Biome Selector ── */}
      <div className="rounded-2xl border border-white/20 bg-black/50 backdrop-blur-md border-white/10 p-4 shadow-sm text-white transition-all duration-700">
        <div className="mb-3 flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 opacity-80" />
          <h3 className="text-xs font-bold tracking-wide uppercase opacity-90">
            Environment
          </h3>
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { key: 'Ocean', label: 'Ocean' },
            { key: 'Tropics', label: 'Tropics' },
            { key: 'Desert', label: 'Desert' },
          ].map((biome) => {
            const Icon = biomeIcons[biome.key];
            return (
              <button
                key={biome.key}
                onClick={() => setBiome(biome.key)}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
                  currentBiome === biome.key
                    ? 'bg-black/30 shadow-inner ring-1 ring-white/30'
                    : 'opacity-70 hover:bg-white/10 hover:opacity-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {biome.label}
                {currentBiome === biome.key && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-current opacity-80 shadow-[0_0_5px_currentColor]"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  )
}
