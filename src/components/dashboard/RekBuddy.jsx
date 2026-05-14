import useStore from '../../store/useStore'

/**
 * RekBuddy — floating mascot in the bottom-right corner
 * with a "Sanctuary Mode" button for de-escalation breaks.
 */
export default function RekBuddy() {
  const toggleSanctuary = useStore((s) => s.toggleSanctuary)

  return (
    <div
      id="rek-buddy"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2"
    >
      {/* Speech bubble */}
      <div className="relative mb-1 rounded-2xl bg-[#F4F7F6] px-4 py-2 text-xs font-medium tracking-wide text-[#718096] shadow-md">
        How are you feeling? 💚
        <div className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 bg-[#F4F7F6]" />
      </div>

      {/* Mascot container */}
      <div className="group relative">
        <div className="absolute inset-0 scale-90 rounded-full bg-[#81E6D9]/10 blur-xl" />
        <img
          src="/placeholder-rek.png"
          alt="Rek the Chameleon — your study buddy"
          className="relative z-10 w-20 transition-transform duration-500 group-hover:scale-105 sm:w-24"
        />
      </div>

      {/* Sanctuary Mode button */}
      <button
        id="sanctuary-mode-btn"
        onClick={toggleSanctuary}
        className="rounded-2xl border border-[#E8E5DF] bg-[#F4F7F6]/90 px-4 py-2 text-[11px] font-semibold tracking-wider text-[#4A5568] shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-[#E8F4F8] hover:shadow-md"
      >
        🌿 Sanctuary Mode
      </button>
    </div>
  )
}
