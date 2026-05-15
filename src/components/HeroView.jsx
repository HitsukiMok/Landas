import { useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'

/**
 * HeroView — Enchanted forest landing with elegant serif typography,
 * magical messaging, and a calm, inviting atmosphere.
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
      className="relative flex h-screen items-center justify-center px-6 sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 lg:flex-row lg:gap-16">
        {/* Left Column — Title & Description */}
        <div className="animate-slide-left flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          {/* Subtitle whisper */}
          <p className="mb-3 text-xs font-light tracking-[0.35em] uppercase text-gold/50 sm:text-sm">
            A neuro-inclusive learning sanctuary
          </p>

          <h1 className="text-landas-gradient font-magical text-7xl leading-[0.9] font-bold tracking-wide sm:text-8xl lg:text-9xl xl:text-[10rem]" style={{ fontStyle: 'italic' }}>
            Landas
          </h1>

          <div className="delay-200 animate-fade-in-up mt-8 max-w-lg">
            <p className="font-magical text-xl leading-relaxed text-gold/80 sm:text-2xl" style={{ fontStyle: 'italic' }}>
              Where every mind finds its path.
            </p>
            <p className="mt-4 text-sm leading-relaxed tracking-wide text-gold/55 sm:text-base">
              A learner-centered digital sanctuary designed to transform the K-12 experience
              for students with ADHD, Autism, and Dyslexia — where every quest is an
              adventure and every brain is celebrated.
            </p>
          </div>

          <div className="delay-300 animate-fade-in-up mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              onClick={handleStart}
              id="hero-start-btn"
              className="group inline-flex items-center gap-2.5 rounded-2xl bg-gold/90 px-9 py-4 text-sm font-semibold tracking-[0.15em] uppercase text-leaf-dark shadow-lg transition-all duration-500 hover:bg-gold hover:shadow-[0_4px_30px_rgba(212,185,106,0.25)]"
            >
              Begin Your Journey
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-500 group-hover:translate-x-1.5">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={() => navigate('/about')}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gold/20 px-9 py-4 text-sm font-semibold tracking-[0.15em] uppercase text-gold/70 transition-all duration-500 hover:border-gold/40 hover:bg-gold/5 hover:text-gold/90"
            >
              Learn More
            </button>
          </div>

          {/* Trust tagline — no emojis, elegant badges */}
          <div className="delay-400 animate-fade-in-up mt-12 flex items-center gap-4">
            <div className="flex space-x-1.5">
              {['#4a7a3a', '#6D4C41', '#d4b96a', '#3d6b2e'].map((color, i) => (
                <div
                  key={i}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/15"
                  style={{ backgroundColor: `${color}33` }}
                >
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color, opacity: 0.7 }} />
                </div>
              ))}
            </div>
            <p className="text-xs tracking-[0.12em] uppercase text-gold/40">
              <span className="font-medium text-gold/60">Built for</span>{' '}
              ADHD · Autism · Dyslexia
            </p>
          </div>
        </div>

        {/* Right Column — Mascot */}
        <div className="animate-slide-right flex flex-1 items-center justify-center">
          <div className="relative">
            {/* Magical glow behind mascot */}
            <div className="absolute inset-0 scale-110 rounded-full bg-gold/4 blur-[80px]" />
            <div className="absolute inset-0 scale-90 rounded-full bg-moss/15 blur-[60px]" />
            <div className="absolute inset-0 scale-75 rounded-full bg-firefly/5 blur-[40px]" />

            <div className="relative z-10 flex flex-col items-center">
              <img
                src="/placeholder-mascot.png"
                alt="Rek the Chameleon"
                className="relative z-10 w-64 drop-shadow-[0_8px_40px_rgba(212,185,106,0.12)] sm:w-80 lg:w-[420px]"
              />
              {/* Ground Shadow */}
              <div className="absolute bottom-0 z-0 h-6 w-48 rounded-[100%] bg-black/30 blur-lg sm:h-8 sm:w-60 lg:h-12 lg:w-[300px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
