import BiomeBackground from '../components/dashboard/BiomeBackground'
import ProfilePanel from '../components/dashboard/ProfilePanel'
import QuestArea from '../components/dashboard/QuestArea'
import RekBuddy from '../components/dashboard/RekBuddy'
import SanctuaryMode from '../components/dashboard/SanctuaryMode'
import useStore from '../store/useStore'

/**
 * Dashboard — main student dashboard layout.
 * Responsive: sidebar stacks above on mobile, sits left on desktop.
 */
export default function Dashboard() {
  const uiMode = useStore((s) => s.uiMode)
  const toggleUIMode = useStore((s) => s.toggleUIMode)

  return (
    <div className="relative min-h-screen">
      {/* Biome-specific ambient background */}
      <BiomeBackground />

      {/* Sanctuary overlay (rendered above everything when active) */}
      <SanctuaryMode />

      {/* Top bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 sm:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#81E6D9]/15 text-[#4A5568]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-wide text-[#4A5568]">
            Landas
          </span>
        </a>

        <div className="flex items-center gap-3">
          {/* UI Mode toggle */}
          <button
            id="ui-mode-toggle"
            onClick={toggleUIMode}
            className="rounded-2xl border border-[#E8E5DF] bg-[#F4F7F6]/80 px-4 py-2 text-[11px] font-semibold tracking-wider text-[#718096] backdrop-blur-sm transition-all duration-300 hover:bg-[#E8F4F8]"
          >
            {uiMode === 'low-stim' ? '🌙 Low-Stim' : '✨ High-Stim'}
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="relative z-10 mx-auto grid max-w-6xl gap-6 px-6 pb-24 sm:px-8 lg:grid-cols-[280px_1fr]">
        <ProfilePanel />
        <QuestArea />
      </div>

      {/* Floating mascot */}
      <RekBuddy />
    </div>
  )
}
