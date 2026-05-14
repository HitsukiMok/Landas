import { useState, useEffect, useRef } from 'react'

/**
 * ContactView — Clean contact form + "Join the Mission" section.
 * Accessible, sensory-friendly design matching the Landas nature theme.
 */

/* ── Intersection Observer hook ── */
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

/* ── Contact Form ── */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', role: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    // In production, POST to an API endpoint
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-gold/15 bg-leaf-card/60 p-12 text-center shadow-xl backdrop-blur-sm">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-4xl">
          ✅
        </div>
        <h3 className="text-2xl font-bold text-gold">Message Sent!</h3>
        <p className="mt-3 max-w-sm text-gold/70">
          Thank you for reaching out. We'll get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', role: '', message: '' }) }}
          className="mt-6 rounded-xl border border-gold/20 px-6 py-2.5 text-sm font-semibold text-gold transition-all duration-300 hover:border-gold/40 hover:bg-gold/5"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  const inputClasses = (field) =>
    `w-full rounded-xl border bg-leaf-input/60 px-4 py-3 text-gold placeholder-gold/40 outline-none transition-all duration-300 ${focused === field
      ? 'border-gold/40 shadow-[0_0_0_3px_rgba(245,214,35,0.08)]'
      : 'border-gold/10 hover:border-gold/20'
    }`

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold tracking-wide text-gold/80">
            Full Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            placeholder="Juan Dela Cruz"
            className={inputClasses('name')}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold tracking-wide text-gold/80">
            Email Address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            placeholder="juan@email.com"
            className={inputClasses('email')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-role" className="mb-1.5 block text-sm font-semibold tracking-wide text-gold/80">
          I am a...
        </label>
        <select
          id="contact-role"
          name="role"
          value={form.role}
          onChange={handleChange}
          onFocus={() => setFocused('role')}
          onBlur={() => setFocused(null)}
          className={inputClasses('role')}
        >
          <option value="">Select your role</option>
          <option value="student">Student</option>
          <option value="parent">Parent / Guardian</option>
          <option value="educator">Educator / Teacher</option>
          <option value="school-admin">School Administrator</option>
          <option value="sped-specialist">SPED Specialist</option>
          <option value="partner">Potential Partner</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold tracking-wide text-gold/80">
          Your Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
          placeholder="Tell us how we can help, or share your ideas..."
          className={`${inputClasses('message')} resize-none`}
        />
      </div>

      <button
        type="submit"
        id="contact-submit-btn"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-8 py-3.5 text-base font-bold tracking-wider text-leaf-dark shadow-lg transition-all duration-300 hover:bg-gold-light hover:shadow-[0_4px_24px_rgba(245,214,35,0.25)] sm:w-auto"
      >
        Send Message
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
          <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  )
}

/* ── Main Contact View ── */
export default function ContactView() {
  const missionCards = [
    {
      icon: '👨‍🏫',
      title: 'Educators',
      description: 'Help us shape curriculum-aligned quests and provide feedback on classroom integration.',
    },
    {
      icon: '👨‍👩‍👧',
      title: 'Parents & Guardians',
      description: 'Share your child\'s learning journey and help us build better advocacy tools.',
    },
    {
      icon: '🏫',
      title: 'Schools & Institutions',
      description: 'Partner with us to pilot Landas in your classrooms and help us reach more students.',
    },
    {
      icon: '🤝',
      title: 'Organizations',
      description: 'Collaborate on research, funding, or outreach to advance neuro-inclusive education.',
    },
  ]

  return (
    <div className="relative min-h-screen px-6 pt-28 pb-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">

        {/* ── Header ── */}
        <Section id="contact-header">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-gold/80 uppercase">
              Get in Touch
            </span>
            <h1 className="text-landas-gradient mt-4 text-4xl leading-tight font-black tracking-wide sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gold/70 sm:text-lg">
              Have questions, ideas, or want to help shape the future of neuro-inclusive education?
              We'd love to hear from you.
            </p>
          </div>
        </Section>

        {/* ── Contact Form ── */}
        <Section id="contact-form-section" className="mb-20">
          <div className="rounded-3xl border border-gold/10 bg-leaf-card/60 p-8 shadow-xl backdrop-blur-sm sm:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-wide text-gold">
                Send Us a Message
              </h2>
              <p className="mt-2 text-gold/60">
                Fill out the form below and our team will get back to you soon.
              </p>
            </div>
            <ContactForm />
          </div>
        </Section>

        {/* ── Join the Mission ── */}
        <Section id="contact-mission" className="mb-20">
          <div className="text-center">
            <span className="mb-3 inline-block rounded-full border border-leaf-light/30 bg-leaf-light/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-leaf-light uppercase">
              Together We Can
            </span>
            <h2 className="text-landas-gradient mt-2 text-3xl font-black tracking-wide sm:text-4xl">
              Join the Mission
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gold/70 sm:text-lg">
              Whether you're a teacher, a parent, or an organization, there's a place for you
              in the Landas community. Together, we can make education truly inclusive.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {missionCards.map((card, i) => (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-3xl border border-gold/10 bg-leaf-card/50 p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-xl"
              >
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gold/5 blur-2xl transition-all duration-500 group-hover:bg-gold/10" />
                <div className="relative z-10">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-2xl transition-transform duration-300 group-hover:scale-110">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold tracking-wide text-gold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gold/70">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Quick Contact Info ── */}
        <Section id="contact-info" className="mb-8">
          <div className="rounded-3xl border border-gold/10 bg-gradient-to-br from-leaf-card/80 to-leaf-dark/60 p-8 shadow-xl sm:p-10">
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold/80">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gold">Email</h4>
                  <p className="mt-1 text-sm text-gold/60">Landas.Org@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold/80">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gold">Location</h4>
                  <p className="mt-1 text-sm text-gold/60">Manila, Philippines</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold/80">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gold">Response Time</h4>
                  <p className="mt-1 text-sm text-gold/60">24–48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
