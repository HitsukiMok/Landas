import { useEffect, useRef, useState } from 'react'

/**
 * AboutView — Comprehensive About page for Landas.
 * Covers: neurodivergent definition, the problem (EDCOM 2 data),
 * three barriers to brilliance, five core pillars, and mission statement.
 */

/* ── Intersection Observer hook for scroll-triggered animations ── */
function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.15, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}

/* ── Section wrapper with scroll-triggered fade-in ── */
function Section({ children, className = '', id }) {
  const [ref, inView] = useInView()
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } ${className}`}
    >
      {children}
    </section>
  )
}

/* ── Data ── */
const barriers = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 9s1.5-2 4-2 4 2 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 15s1 2 3 2 3-2 3-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="12" r="1" fill="currentColor" />
        <circle cx="15" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    title: 'Sensory Overload',
    description:
      'Traditional classrooms and cluttered digital modules create "noise" that prevents information retention.',
    color: 'from-red-500/20 to-orange-500/20',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Executive Dysfunction',
    description:
      'Standard curricula lack the micro-steps required to overcome task paralysis and initiation hurdles.',
    color: 'from-amber-500/20 to-yellow-500/20',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'The Resource Gap',
    description:
      'Overwhelmed educators lack the specialized SPED training and adaptive tools needed to support every learner individually.',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
]

const pillarIcons = [
  <svg key="p1" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" /></svg>,
  <svg key="p2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 18h4v-4H4v4zM10 18h4v-8h-4v8zM16 18h4V6h-4v12z" /></svg>,
  <svg key="p3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v4M12 16h.01" strokeLinecap="round" /></svg>,
  <svg key="p4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10" strokeLinejoin="round" /></svg>,
  <svg key="p5" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18" strokeLinecap="round" /><path d="M7 16l4-4 4 2 5-6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
]

const pillars = [
  {
    num: '01',
    title: 'Gamified Quest Integration',
    description:
      'We transform abstract concepts into Life Quests. By solving problems in simulated, relatable environments, students move away from rote memorization and toward practical application. Every lesson becomes a mission with a clear purpose.',
  },
  {
    num: '02',
    title: 'Executive Function Scaffolding',
    description:
      'To combat "time blindness" and initiation paralysis, Landas features the Task Shredder — decomposing massive assignments into tiny, actionable bites, while Time Visualization tools use disappearing color discs to make the passage of time tangible.',
  },
  {
    num: '03',
    title: 'Adaptive Sensory & Emotional Regulation',
    description:
      'Our AI companion, Rek, monitors for signs of cognitive load. Before a student reaches burnout, Rek intervenes, guiding them to the Sanctuary for a 2-minute breathing exercise or a calming mini-game to reset their mental bandwidth.',
  },
  {
    num: '04',
    title: 'Energy Management & Multi-Modal Expression',
    description:
      'Our Energy Check-in adjusts difficulty based on a student\'s current mental state. Students can express knowledge through speech, drawing, or text — ensuring grades reflect intelligence, not just typing speed.',
  },
  {
    num: '05',
    title: 'Insightful Progress Tracking',
    description:
      'We provide parents and educators with a Learning Profile that looks beyond grades. By tracking focus patterns and sensory preferences, Landas provides the data needed for better advocacy and personalized support.',
  },
]

export default function AboutView() {
  return (
    <div className="relative min-h-screen px-6 pt-28 pb-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">

        {/* ── Hero Title ── */}
        <Section id="about-hero">
          <div className="mb-20 text-center">
            <span className="mb-4 inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-gold/80 uppercase">
              About Landas
            </span>
            <h1 className="text-landas-gradient mt-4 text-4xl leading-tight font-black tracking-wide sm:text-5xl lg:text-6xl">
              Redefining the Path for
              <br />
              Neurodivergent Learners
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gold/70 sm:text-lg">
              Every brain is extraordinary. Landas is built to honor the unique way
              neurodivergent students think, learn, and grow.
            </p>
          </div>
        </Section>

        {/* ── What is Neurodivergent? ── */}
        <Section id="about-neurodivergent" className="mb-20">
          <div className="rounded-3xl border border-gold/10 bg-leaf-card/60 p-8 shadow-xl backdrop-blur-sm sm:p-10">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-2xl">
                🧠
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-wide text-gold sm:text-3xl">
                  What is Neurodivergent?
                </h2>
                <p className="mt-4 leading-relaxed text-gold/80 sm:text-lg">
                  <strong className="text-gold">Neurodivergent</strong> describes individuals whose brain
                  functions differ from what is considered "typical." This includes students with{' '}
                  <span className="font-semibold text-gold">ADHD</span>,{' '}
                  <span className="font-semibold text-gold">Autism</span>, and{' '}
                  <span className="font-semibold text-gold">Dyslexia</span> — students who think
                  differently, not less. They are creative, resourceful, and brilliant in ways
                  traditional systems often fail to recognize.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── The Problem ── */}
        <Section id="about-problem" className="mb-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-wide text-gold sm:text-4xl">
              The Problem
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gold/70 sm:text-lg">
              The Philippine education system is at a crossroads.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {/* Stat Card 1 */}
            <div className="group relative overflow-hidden rounded-3xl border border-gold/10 bg-leaf-card/60 p-8 shadow-lg transition-all duration-300 hover:border-gold/25 hover:shadow-gold/5">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/5 blur-2xl transition-all duration-500 group-hover:bg-gold/10" />
              <p className="text-5xl font-black text-gold sm:text-6xl">30.5%</p>
              <p className="mt-3 text-sm leading-relaxed text-gold/70 sm:text-base">
                of students show basic proficiency in <strong className="text-gold/90">Grade 3</strong>
              </p>
              <p className="mt-1 text-xs text-gold/50">EDCOM 2 Report, 2026</p>
            </div>

            {/* Stat Card 2 */}
            <div className="group relative overflow-hidden rounded-3xl border border-gold/10 bg-leaf-card/60 p-8 shadow-lg transition-all duration-300 hover:border-gold/25 hover:shadow-gold/5">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-red-500/5 blur-2xl transition-all duration-500 group-hover:bg-red-500/10" />
              <p className="text-5xl font-black text-red-400 sm:text-6xl">0.47%</p>
              <p className="mt-3 text-sm leading-relaxed text-gold/70 sm:text-base">
                proficiency by <strong className="text-gold/90">Grade 12</strong> — a catastrophic collapse
              </p>
              <p className="mt-1 text-xs text-gold/50">EDCOM 2 Report, 2026</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-gold/10 bg-leaf-dark/40 p-6 text-center">
            <p className="text-sm leading-relaxed text-gold/70 sm:text-base">
              For <strong className="text-gold">Learners with Special Educational Needs (LSEN)</strong>,
              the crisis is even more personal. "Inclusive education" in its current state often
              means placing neurodivergent students in crowded, high-stimulus classrooms{' '}
              <em>without the scaffolding they need</em> to succeed.
            </p>
          </div>
        </Section>

        {/* ── Three Barriers to Brilliance ── */}
        <Section id="about-barriers" className="mb-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-wide text-gold sm:text-4xl">
              The Barriers to Brilliance
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gold/70 sm:text-lg">
              Three fundamental hurdles preventing our students from reaching their full potential.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {barriers.map((barrier, i) => (
              <div
                key={barrier.title}
                className="group relative overflow-hidden rounded-3xl border border-gold/10 bg-leaf-card/60 p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-xl"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Gradient accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${barrier.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative z-10">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold/80 transition-colors duration-300 group-hover:bg-gold/15 group-hover:text-gold">
                    {barrier.icon}
                  </div>
                  <h3 className="text-lg font-bold tracking-wide text-gold">{barrier.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gold/70">{barrier.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Our Solution: Five Core Pillars ── */}
        <Section id="about-pillars" className="mb-20">
          <div className="text-center">
            <span className="mb-3 inline-block rounded-full border border-leaf-light/30 bg-leaf-light/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-leaf-light uppercase">
              Our Solution
            </span>
            <h2 className="text-landas-gradient mt-2 text-3xl font-black tracking-wide sm:text-4xl lg:text-5xl">
              The Five Pillars of Landas
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gold/70 sm:text-lg">
              A neuro-inclusive ecosystem that doesn't just digitize a textbook — it builds a
              learning sanctuary.
            </p>
          </div>

          <PillarCarousel />
        </Section>

        {/* ── Mission Statement ── */}
        <Section id="about-mission" className="mb-8">
          <div className="relative overflow-hidden rounded-3xl border border-gold/15 bg-gradient-to-br from-leaf-card/80 to-leaf-dark/60 p-10 text-center shadow-2xl sm:p-14">
            {/* Decorative glow */}
            <div className="absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-gold/5 blur-3xl" />
            <div className="relative z-10">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-3xl">
                🌿
              </div>
              <h2 className="text-2xl font-bold tracking-wide text-gold sm:text-3xl">
                Our Mission
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gold/80 sm:text-lg">
                We may not be able to fix the physical infrastructure of every school overnight,
                but we can fundamentally change how neurodivergent students navigate the world.
              </p>
              <p className="text-landas-gradient mt-4 text-xl font-black tracking-wider sm:text-2xl">
                Landas is the path forward.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}

/* ── Pillar Carousel — Horizontal snap-scroll ── */
function PillarCarousel() {
  const scrollRef = useRef(null)
  const [active, setActive] = useState(0)

  const CARD_W = 576 // w-[36rem]
  const GAP = 24    // gap-6

  // Track which card is in view via scroll
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / (CARD_W + GAP))
      setActive(Math.max(0, Math.min(index, pillars.length - 1)))
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToIndex = (index) => {
    const container = scrollRef.current
    if (!container) return
    container.scrollTo({ left: index * (CARD_W + GAP), behavior: 'smooth' })
  }

  const goNext = () => scrollToIndex(Math.min(active + 1, pillars.length - 1))
  const goPrev = () => scrollToIndex(Math.max(active - 1, 0))

  // Number gradient colors per pillar
  const numColors = [
    'from-gold via-gold-soft to-moss',
    'from-gold-soft via-gold to-fern',
    'from-moss via-gold to-gold-soft',
    'from-gold via-fern to-gold-soft',
    'from-fern via-gold-soft to-gold',
  ]

  return (
    <div className="mt-12">
      {/* Hide scrollbar */}
      <style>{`
        .pillar-scroll::-webkit-scrollbar { display: none; }
        .pillar-scroll { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="pillar-scroll flex gap-6 overflow-x-auto px-[calc(50%-18rem)] pb-4 snap-x snap-mandatory scroll-smooth"
      >

        {pillars.map((pillar, i) => (
          <div
            key={pillar.num}
            className={`relative flex-shrink-0 w-[36rem] snap-center overflow-hidden rounded-3xl border bg-leaf-card/70 p-8 shadow-2xl backdrop-blur-sm transition-all duration-500 sm:p-10 ${
              i === active
                ? 'border-gold/20 scale-100 opacity-100'
                : 'border-gold/5 scale-[0.95] opacity-50'
            }`}
          >
            {/* Decorative corner glows */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/5 blur-3xl" />
            <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-leaf-light/10 blur-2xl" />

            <div className="relative z-10">
              {/* Number + Icon */}
              <div className="mb-6 flex items-center gap-5">
                <span
                  className={`font-magical text-6xl font-bold italic sm:text-7xl bg-gradient-to-br ${numColors[i]} bg-clip-text text-transparent`}
                  style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {pillar.num}
                </span>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/10 bg-gold/8 text-gold/70">
                  {pillarIcons[i]}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-magical text-2xl font-bold italic tracking-wide text-gold sm:text-3xl">
                {pillar.title}
              </h3>

              {/* Description — justified */}
              <p className="mt-4 leading-relaxed text-gold/70 sm:text-lg" style={{ textAlign: 'justify' }}>
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls row: arrows + dots */}
      <div className="mt-6 flex items-center justify-center gap-6">
        {/* Left arrow */}
        <button
          onClick={goPrev}
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-gold/10 bg-leaf-dark/60 text-gold/40 shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-gold/25 hover:bg-leaf-dark/80 hover:text-gold/80 hover:shadow-[0_0_20px_rgba(212,185,106,0.1)]"
          aria-label="Previous pillar"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="transition-transform duration-500 group-hover:-translate-x-0.5">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Indicator dots */}
        <div className="flex items-center gap-2">
          {pillars.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`rounded-full transition-all duration-500 ${
                i === active
                  ? 'h-2.5 w-8 bg-gold/60'
                  : 'h-2 w-2 bg-gold/15 hover:bg-gold/30'
              }`}
              aria-label={`Go to pillar ${i + 1}`}
            />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={goNext}
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-gold/10 bg-leaf-dark/60 text-gold/40 shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-gold/25 hover:bg-leaf-dark/80 hover:text-gold/80 hover:shadow-[0_0_20px_rgba(212,185,106,0.1)]"
          aria-label="Next pillar"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="transition-transform duration-500 group-hover:translate-x-0.5">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

