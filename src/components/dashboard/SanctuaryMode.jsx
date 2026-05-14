import { useEffect, useState } from 'react'
import useStore from '../../store/useStore'

/**
 * SanctuaryMode — a full-screen calming overlay with a
 * "Breathe in... Breathe out..." animation for de-escalation breaks.
 */
export default function SanctuaryMode() {
  const sanctuaryActive = useStore((s) => s.sanctuaryActive)
  const toggleSanctuary = useStore((s) => s.toggleSanctuary)
  const [phase, setPhase] = useState('in') // 'in' | 'hold' | 'out'
  const [count, setCount] = useState(4)

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

    startPhase('in')

    return () => {
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
    in: 'scale-100',
    hold: 'scale-100',
    out: 'scale-75',
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDFBF7]/95 backdrop-blur-md">
      {/* Ambient circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-[float-gentle_10s_ease-in-out_infinite] rounded-full bg-[#81E6D9]/8 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 animate-[float-gentle_13s_ease-in-out_infinite_reverse] rounded-full bg-[#B2D8E8]/10 blur-3xl" />
      </div>

      {/* Breathing circle */}
      <div className="relative mb-12 flex items-center justify-center">
        <div
          className={`h-48 w-48 rounded-full bg-gradient-to-br from-[#81E6D9]/20 to-[#68D391]/10 shadow-inner transition-transform duration-[4000ms] ease-in-out sm:h-56 sm:w-56 ${circleScale[phase]}`}
        />
        <div
          className={`absolute h-32 w-32 rounded-full bg-gradient-to-br from-[#81E6D9]/30 to-[#68D391]/15 transition-transform duration-[4000ms] ease-in-out sm:h-40 sm:w-40 ${circleScale[phase]}`}
        />
        <span className="absolute text-4xl font-light tracking-widest text-[#718096] sm:text-5xl">
          {count}
        </span>
      </div>

      {/* Phase text */}
      <p className="mb-2 text-2xl font-semibold tracking-widest text-[#4A5568] sm:text-3xl">
        {phaseText[phase]}
      </p>
      <p className="mb-10 text-sm tracking-wider text-[#A0AEC0]">
        You're safe here. Take your time.
      </p>

      {/* Exit button */}
      <button
        id="exit-sanctuary-btn"
        onClick={toggleSanctuary}
        className="rounded-2xl border border-[#E8E5DF] bg-[#F4F7F6] px-6 py-3 text-sm font-semibold tracking-wider text-[#4A5568] transition-all duration-300 hover:bg-[#E8F4F8] hover:shadow-md"
      >
        🌿 I'm ready to continue
      </button>
    </div>
  )
}
