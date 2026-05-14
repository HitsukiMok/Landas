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
    <aside id="profile-panel" className="flex flex-col gap-5">
      {/* ── Learning Profile Card (Dual View) ── */}
      <LearningProfile />

      {/* ── Streak Tracker Widget ── */}
      <StreakTracker />

      {/* ── Biome Selector ── */}
      <div className="rounded-3xl border border-[#E8E5DF] bg-[#F4F7F6] p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#718096]" />
          <h3 className="text-sm font-semibold tracking-wide text-[#4A5568]">
            Environment
          </h3>
        </div>
        <div className="flex flex-col gap-2">
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
                className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-medium tracking-wider transition-all duration-300 ${
                  currentBiome === biome.key
                    ? 'bg-[#E8F4F8] text-[#4A5568] shadow-sm'
                    : 'text-[#718096] hover:bg-[#FDFBF7]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {biome.label}
                {currentBiome === biome.key && (
                  <span className="ml-auto text-[10px] text-[#81E6D9]">●</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  )
}
