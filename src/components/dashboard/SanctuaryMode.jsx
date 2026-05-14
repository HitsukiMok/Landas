import { useEffect, useState } from 'react'
import { Leaf } from 'lucide-react'
import useStore from '../../store/useStore'

/**
 * SanctuaryMode — a full-screen calming overlay with a
 * "Breathe in... Breathe out..." animation for de-escalation breaks.
 * Refined for a glassmorphic, immersive experience.
 */
export default function SanctuaryMode() {
  const sanctuaryActive = useStore((s) => s.sanctuaryActive)
  const toggleSanctuary = useStore((s) => s.toggleSanctuary)
  const [phase, setPhase] = useState('out') // Start at 'out' so it mounts small
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!sanctuaryActive) return

    // 4-4-4 breathing cycle
    const durations = { in: 4, hold: 4, out: 4 }
    let timer
    let countdown

    const startPhase = (p) => {
      setPhase(p)
      setCount(durations[p])

      countdown = setInterval(() => {
        setCount((c) => {
          if (c <= 1) {
            clearInterval(countdown)
            return 0
          }
          return c - 1
        })
      }, 1000)

      timer = setTimeout(() => {
        clearInterval(countdown)
        const next = p === 'in' ? 'hold' : p === 'hold' ? 'out' : 'in'
        startPhase(next)
      }, durations[p] * 1000)
    }

    // Small delay to ensure the initial 'out' state renders before transitioning to 'in'
    const initialDelay = setTimeout(() => {
      startPhase('in')
    }, 50)

    return () => {
      clearTimeout(initialDelay)
      clearTimeout(timer)
      clearInterval(countdown)
    }
  }, [sanctuaryActive])

  if (!sanctuaryActive) return null

  const phaseText = {
    in: 'Breathe in...',
    hold: 'Hold...',
    out: 'Breathe out...',
  }

  const circleScale = {
    in: 'scale-150',
    hold: 'scale-150',
    out: 'scale-75',
  }

  return (
    <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl transition-all duration-1000">
      
      {/* Ambient glass circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center">
        <div className="absolute h-[600px] w-[600px] animate-[float-gentle_10s_ease-in-out_infinite] rounded-full bg-[#81E6D9]/5 blur-3xl" />
      </div>

      {/* Mascot / Helper text */}
      <div className="flex flex-col items-center mb-16 animate-fade-in-up z-10">
        <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-3xl shadow-inner mb-4">
          🦎
        </div>
        <p className="text-[11px] font-medium tracking-wide text-white/80 text-center max-w-xs leading-relaxed">
          Looks like our brain energy is shifting.<br />Let's take a quick breather together.
        </p>
      </div>

      {/* Breathing circle */}
      <div className="relative mb-20 flex items-center justify-center z-10">
        <div
          className={`h-40 w-40 rounded-full bg-gradient-to-br from-[#81E6D9]/20 to-[#68D391]/10 shadow-inner border border-[#81E6D9]/30 transition-transform duration-[4000ms] ease-in-out sm:h-48 sm:w-48 ${circleScale[phase]}`}
        />
        <div
          className={`absolute h-24 w-24 rounded-full bg-gradient-to-br from-[#81E6D9]/30 to-[#68D391]/20 transition-transform duration-[4000ms] ease-in-out sm:h-32 sm:w-32 ${circleScale[phase]}`}
        />
        
        <span className="absolute text-5xl font-light tracking-widest text-white drop-shadow-md">
          {count > 0 ? count : ''}
        </span>
      </div>

      {/* Phase text */}
      <p className="mb-2 text-xl font-bold tracking-widest text-[#81E6D9] uppercase sm:text-2xl z-10 animate-pulse">
        {count > 0 ? phaseText[phase] : 'Get ready...'}
      </p>
      <p className="mb-12 text-[10px] font-bold tracking-widest uppercase text-white/50 z-10">
        You're safe here.
      </p>

      {/* Exit button */}
      <button
        onClick={toggleSanctuary}
        className="z-10 flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-6 py-3 text-[10px] font-bold tracking-widest uppercase text-white transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(129,230,217,0.1)]"
      >
        <Leaf className="w-3.5 h-3.5 text-[#81E6D9]" />
        I'm ready to return
      </button>
    </div>
  )
}
