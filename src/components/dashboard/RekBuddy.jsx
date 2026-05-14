import useStore from '../../store/useStore'
import { Heart, Leaf } from 'lucide-react'

/**
 * RekBuddy — floating mascot in the bottom-right corner
 * with a "Sanctuary Mode" button for de-escalation breaks.
 * Refined to be more compact and glassmorphic so it doesn't block content.
 */
export default function RekBuddy() {
  const toggleSanctuary = useStore((s) => s.toggleSanctuary)

  return (
    <div
      id="rek-buddy"
      className="fixed bottom-4 right-4 z-40 flex flex-col items-center gap-1.5"
    >
      {/* Speech bubble */}
      <div className="relative mb-0.5 rounded-xl bg-white/10 backdrop-blur-md px-3 py-1.5 flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-white shadow-lg border border-white/20">
        Feeling stuck? <Heart className="w-2.5 h-2.5 text-[#FC8181] fill-[#FC8181]" />
        <div className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 border-r border-b border-white/20" style={{ background: 'rgba(255,255,255,0.1)' }} />
      </div>

      {/* Mascot container */}
      <div className="group relative">
        <div className="absolute inset-0 scale-75 rounded-full bg-[#81E6D9]/20 blur-xl" />
        <img
          src="/Untitled19_20260514171442.png"
          alt="Rek the Chameleon — your study buddy"
          className="relative z-10 w-16 sm:w-20 animate-bounce-gentle transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Sanctuary Mode button */}
      <button
        id="sanctuary-mode-btn"
        onClick={toggleSanctuary}
        className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-black/40 backdrop-blur-md px-3 py-1.5 text-[9px] font-bold tracking-widest text-white uppercase shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-105"
      >
        <Leaf className="w-2.5 h-2.5 text-[#81E6D9]" />
        Sanctuary
      </button>
    </div>
  )
}
