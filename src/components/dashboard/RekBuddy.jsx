import useStore from '../../store/useStore'
import { Heart, Leaf } from 'lucide-react'

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
      <div className="relative mb-1 rounded-2xl bg-[#F4F7F6] px-4 py-2 flex items-center gap-2 text-xs font-medium tracking-wide text-[#718096] shadow-md border border-[#E8E5DF]">
        How are you feeling? <Heart className="w-3 h-3 text-[#FC8181] fill-[#FC8181]" />
        <div className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 bg-[#F4F7F6] border-r border-b border-[#E8E5DF]" />
      </div>

      {/* Mascot container */}
      <div className="group relative">
        <div className="absolute inset-0 scale-90 rounded-full bg-[#81E6D9]/10 blur-xl" />
        <img
          src="/Untitled19_20260514171442.png"
          alt="Rek the Chameleon — your study buddy"
          className="relative z-10 w-24 sm:w-28 animate-bounce-gentle transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Sanctuary Mode button */}
      <button
        id="sanctuary-mode-btn"
        onClick={toggleSanctuary}
        className="flex items-center gap-2 rounded-2xl border border-[#E8E5DF] bg-[#F4F7F6]/90 px-4 py-2 text-[11px] font-semibold tracking-wider text-[#4A5568] shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md"
      >
        <Leaf className="w-3 h-3 text-[#81E6D9]" />
        Sanctuary Mode
      </button>
    </div>
  )
}
