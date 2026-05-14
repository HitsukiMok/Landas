import { useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'

/**
 * HeroView — State A: Split layout with massive LANDAS title on the
 * left and chameleon mascot on the right.
 */
export default function HeroView() {
  const navigate = useNavigate()
  const isAuthenticated = useStore((s) => s.isAuthenticated)

  const handleStart = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      navigate('/sign-up')
    }
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center px-6 pt-24 pb-12 sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 lg:flex-row lg:gap-16">
        {/* Left Column — Title & Description */}
        <div className="animate-slide-left flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="text-landas-gradient text-6xl leading-none font-black tracking-wider sm:text-7xl lg:text-8xl xl:text-9xl">
            LANDAS
          </h1>

          <p className="delay-200 animate-fade-in-up mt-6 max-w-lg text-base leading-relaxed tracking-wide text-gold/90 sm:mt-8 sm:text-lg">
            A learner-centered and neuro-inclusive digital learning sanctuary designed to
            transform the K-12 experience. Built for students with ADHD, Autism, and Dyslexia —
            where every quest is an adventure and every brain is celebrated.
          </p>

          <div className="delay-300 animate-fade-in-up mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              onClick={handleStart}
              id="hero-start-btn"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gold px-8 py-3.5 text-base font-bold tracking-wider text-leaf-dark shadow-lg transition-all duration-300 hover:bg-gold-light hover:shadow-[0_4px_24px_rgba(245,214,35,0.3)]"
            >
              Start Your Journey
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-gold/30 px-8 py-3.5 text-base font-semibold tracking-wider text-gold transition-all duration-300 hover:border-gold/60 hover:bg-gold/5"
            >
              Learn More
            </a>
          </div>

          {/* Trust tagline */}
          <div className="delay-400 animate-fade-in-up mt-10 flex items-center gap-3">
            <div className="flex -space-x-2">
              {['🧠', '🎮', '🎨', '📚'].map((emoji, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-leaf bg-leaf-light/40 text-sm"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-sm tracking-wide text-gold/70">
              <span className="font-semibold text-gold">Built for</span>{' '}
              ADHD · Autism · Dyslexia
            </p>
          </div>
        </div>

        {/* Right Column — Mascot */}
        <div className="animate-slide-right flex flex-1 items-center justify-center">
          <div className="relative">
            {/* Glow behind mascot */}
            <div className="absolute inset-0 scale-90 rounded-full bg-gold/8 blur-3xl" />
            <div className="absolute inset-0 scale-75 rounded-full bg-leaf-light/20 blur-3xl" />

            {/* ────────────────────────────────────────────────
                MASCOT IMAGE — Replace /placeholder-mascot.png
                with your 3D chameleon asset.
                Located: public/placeholder-mascot.png
               ──────────────────────────────────────────────── */}
            <div className="relative z-10 flex flex-col items-center">
              <img
                src="/placeholder-mascot.png"
                alt="Rek the Chameleon"
                className="relative z-10 w-64 sm:w-80 lg:w-[420px]"
              />
              {/* Ground Shadow */}
              <div className="absolute bottom-0 z-0 h-6 w-48 rounded-[100%] bg-black/40 blur-md sm:h-8 sm:w-60 lg:h-12 lg:w-[300px]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
