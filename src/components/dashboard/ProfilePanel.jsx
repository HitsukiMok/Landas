import useStore, {
  selectLevel,
  selectTitle,
  selectXPInCurrentLevel,
  selectXPToNextLevel,
} from '../../store/useStore'

/**
 * ProfilePanel — left sidebar showing:
 * - Learning Profile Card (avatar, title, level, XP bar)
 * - Streak Tracker with Freeze button
 * - Biome selector
 */
export default function ProfilePanel() {
  const xp = useStore((s) => s.xp)
  const level = useStore(selectLevel)
  const title = useStore(selectTitle)
  const xpInLevel = useStore(selectXPInCurrentLevel)
  const xpNeeded = selectXPToNextLevel()
  const dailyStreak = useStore((s) => s.dailyStreak)
  const streakFreezeAvailable = useStore((s) => s.streakFreezeAvailable)
  const freezeStreak = useStore((s) => s.freezeStreak)
  const currentBiome = useStore((s) => s.currentBiome)
  const setBiome = useStore((s) => s.setBiome)

  const progressPct = Math.min((xpInLevel / xpNeeded) * 100, 100)

  return (
    <aside id="profile-panel" className="flex flex-col gap-5">
      {/* ── Learning Profile Card ── */}
      <div className="rounded-3xl border border-[#E8E5DF] bg-[#F4F7F6] p-6 shadow-sm">
        {/* Avatar */}
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F4F8] text-2xl shadow-inner">
            🧠
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-semibold tracking-wide text-[#4A5568]">
              Level {level}
            </p>
            <p className="text-xs font-medium tracking-wider text-[#718096]">
              {title}
            </p>
          </div>
        </div>

        {/* XP Progress */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wider text-[#718096] uppercase">
            Progress
          </span>
          <span className="text-[11px] font-medium tracking-wide text-[#718096]">
            {xpInLevel} / {xpNeeded} XP
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-[#E8E5DF]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#81E6D9] to-[#68D391] transition-all duration-700 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="mt-2 text-center text-[11px] tracking-wide text-[#A0AEC0]">
          {xpNeeded - xpInLevel} XP to Level {level + 1}
        </p>

        {/* Total XP badge */}
        <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[#FDFBF7] py-2">
          <span className="text-sm">⭐</span>
          <span className="text-xs font-semibold tracking-wider text-[#4A5568]">
            {xp} Total XP
          </span>
        </div>
      </div>

      {/* ── Streak Tracker ── */}
      <div className="rounded-3xl border border-[#E8E5DF] bg-[#F4F7F6] p-6 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg">🔥</span>
          <h3 className="text-sm font-semibold tracking-wide text-[#4A5568]">
            Daily Streak
          </h3>
        </div>

        <div className="mb-4 flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight text-[#4A5568]">
            {dailyStreak}
          </span>
          <span className="text-sm font-medium tracking-wide text-[#718096]">
            {dailyStreak === 1 ? 'day' : 'days'}
          </span>
        </div>

        {/* Streak dots visual */}
        <div className="mb-4 flex gap-1.5">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`h-2.5 flex-1 rounded-full transition-colors duration-300 ${
                i < dailyStreak % 7
                  ? 'bg-gradient-to-r from-[#F6AD55] to-[#ED8936]'
                  : 'bg-[#E8E5DF]'
              }`}
            />
          ))}
        </div>

        <button
          id="freeze-streak-btn"
          onClick={freezeStreak}
          disabled={!streakFreezeAvailable}
          className={`w-full rounded-2xl px-4 py-2.5 text-xs font-semibold tracking-wider transition-all duration-300 ${
            streakFreezeAvailable
              ? 'bg-[#E8F4F8] text-[#4A5568] hover:bg-[#D4EAF5] hover:shadow-sm'
              : 'cursor-not-allowed bg-[#E8E5DF] text-[#A0AEC0]'
          }`}
        >
          {streakFreezeAvailable ? '❄️ Freeze Streak' : '❄️ Freeze Used'}
        </button>
      </div>

      {/* ── Biome Selector ── */}
      <div className="rounded-3xl border border-[#E8E5DF] bg-[#F4F7F6] p-6 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold tracking-wide text-[#4A5568]">
          🌍 Environment
        </h3>
        <div className="flex flex-col gap-2">
          {[
            { key: 'Ocean', icon: '🌊', label: 'Ocean' },
            { key: 'Tropics', icon: '🌴', label: 'Tropics' },
            { key: 'Desert', icon: '🏜️', label: 'Desert' },
          ].map((biome) => (
            <button
              key={biome.key}
              onClick={() => setBiome(biome.key)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 text-xs font-medium tracking-wider transition-all duration-300 ${
                currentBiome === biome.key
                  ? 'bg-[#E8F4F8] text-[#4A5568] shadow-sm'
                  : 'text-[#718096] hover:bg-[#FDFBF7]'
              }`}
            >
              <span className="text-base">{biome.icon}</span>
              {biome.label}
              {currentBiome === biome.key && (
                <span className="ml-auto text-[10px] text-[#81E6D9]">●</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
