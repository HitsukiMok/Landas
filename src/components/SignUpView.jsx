import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'

/**
 * SignUpView — Compact enchanted forest sign-up, viewport-locked, no scroll.
 * Social auth options reveal on hover over "More options" box.
 */
export default function SignUpView() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [focused, setFocused] = useState(null)
  const [showOptions, setShowOptions] = useState(false)
  const login = useStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login()
    navigate('/dashboard')
  }

  const inputClass = (field) =>
    `w-full rounded-lg border bg-leaf-dark/40 px-3.5 py-2.5 text-sm tracking-wide text-gold/90 placeholder-gold/25 outline-none backdrop-blur-sm transition-all duration-500 ${
      focused === field
        ? 'border-gold/40 shadow-[0_0_0_3px_rgba(212,185,106,0.08)] bg-leaf-dark/60'
        : 'border-gold/10 hover:border-gold/20'
    }`

  return (
    <section
      id="signup-view"
      className="flex h-screen items-center justify-center overflow-hidden px-6"
    >
      <div className="flex w-full max-w-4xl items-center gap-12 lg:gap-16">
        {/* Left — Mascot */}
        <div className="hidden flex-1 items-center justify-center lg:flex" style={{ animation: 'fade-in-up 0.8s ease-out forwards' }}>
          <div className="relative">
            <div className="absolute inset-0 scale-90 rounded-full bg-gold/5 blur-3xl" />
            <div className="absolute inset-0 scale-75 rounded-full bg-leaf-light/10 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center">
              <img src="/placeholder-mascot.png" alt="Rek the Chameleon" className="w-56" />
              <div className="absolute bottom-0 z-0 h-6 w-44 rounded-[100%] bg-black/40 blur-md" />
            </div>
          </div>
        </div>

        {/* Right — Compact Form Card */}
        <div className="mx-auto w-full max-w-sm lg:mx-0" style={{ animation: 'fade-in-up 0.8s ease-out 0.15s forwards', opacity: 0 }}>
          <div className="relative overflow-hidden rounded-2xl border border-gold/10 bg-leaf-card/70 p-6 shadow-2xl backdrop-blur-md sm:p-7">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/5 blur-3xl" />
            <div className="absolute -left-6 -bottom-6 h-20 w-20 rounded-full bg-leaf-light/8 blur-2xl" />

            <div className="relative z-10">
              <h2 className="font-magical mb-0.5 text-center text-2xl font-bold italic tracking-wide text-gold">
                Begin Your Quest
              </h2>
              <p className="mb-5 text-center text-[10px] font-medium tracking-[0.2em] text-gold/50 uppercase">
                Create your explorer profile
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1" style={{ animation: 'fade-in-up 0.5s ease-out 0.3s forwards', opacity: 0 }}>
                  <label htmlFor="signup-name" className="text-[10px] font-semibold tracking-[0.15em] text-gold/60 uppercase">Full Name</label>
                  <input type="text" id="signup-name" value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} required placeholder="Your explorer name" className={inputClass('name')} />
                </div>

                <div className="flex flex-col gap-1" style={{ animation: 'fade-in-up 0.5s ease-out 0.35s forwards', opacity: 0 }}>
                  <label htmlFor="signup-email" className="text-[10px] font-semibold tracking-[0.15em] text-gold/60 uppercase">Email</label>
                  <input type="email" id="signup-email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} required placeholder="you@example.com" className={inputClass('email')} />
                </div>

                <div className="flex flex-col gap-1" style={{ animation: 'fade-in-up 0.5s ease-out 0.4s forwards', opacity: 0 }}>
                  <label htmlFor="signup-password" className="text-[10px] font-semibold tracking-[0.15em] text-gold/60 uppercase">Password</label>
                  <input type="password" id="signup-password" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setFocused('password')} onBlur={() => setFocused(null)} required placeholder="••••••••" className={inputClass('password')} />
                </div>

                <button
                  type="submit"
                  id="signup-submit-btn"
                  className="group relative mt-1 overflow-hidden rounded-lg bg-gold/80 py-2.5 text-[11px] font-bold tracking-[0.2em] uppercase text-leaf-dark shadow-lg transition-all duration-500 hover:bg-gold hover:shadow-[0_4px_20px_rgba(212,185,106,0.25)] active:scale-[0.98]"
                  style={{ animation: 'fade-in-up 0.5s ease-out 0.5s forwards', opacity: 0 }}
                >
                  <span className="relative z-10">Create Account</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>
              </form>

              {/* Hover-reveal social options */}
              <div
                className="mt-3"
                style={{ animation: 'fade-in-up 0.5s ease-out 0.55s forwards', opacity: 0 }}
                onMouseEnter={() => setShowOptions(true)}
                onMouseLeave={() => setShowOptions(false)}
              >
                <div className={`overflow-hidden rounded-xl border transition-all duration-500 ease-out ${showOptions ? 'max-h-64 border-gold/15 bg-leaf-dark/20' : 'max-h-10 border-gold/8 bg-leaf-dark/10'}`}>
                  <div className="flex h-10 cursor-pointer items-center justify-center gap-2 text-[10px] font-semibold tracking-widest text-gold/40 uppercase">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-500 ${showOptions ? 'rotate-180' : ''}`}>
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    More sign-up options
                  </div>
                  <div className="flex flex-col gap-2 px-3 pb-3">
                    <button id="google-auth-btn" className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-gold/6 bg-leaf-dark/30 py-2 text-[11px] font-medium tracking-wider text-gold/60 transition-all duration-400 hover:border-gold/15 hover:text-gold/90">
                      <svg width="14" height="14" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                      Google
                    </button>
                    <button className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-gold/6 bg-leaf-dark/30 py-2 text-[11px] font-medium tracking-wider text-gold/60 transition-all duration-400 hover:border-gold/15 hover:text-gold/90">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      Facebook
                    </button>
                    <button className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-gold/6 bg-leaf-dark/30 py-2 text-[11px] font-medium tracking-wider text-gold/60 transition-all duration-400 hover:border-gold/15 hover:text-gold/90">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14v7"/><path d="M5 9v6c0 2 3.5 4 7 4s7-2 7-4V9"/></svg>
                      Education Email
                    </button>
                    <button className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-gold/6 bg-leaf-dark/30 py-2 text-[11px] font-medium tracking-wider text-gold/60 transition-all duration-400 hover:border-gold/15 hover:text-gold/90">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                      Phone Number
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/login')}
                className="mt-3 w-full text-center text-[10px] font-semibold tracking-[0.12em] uppercase text-gold/35 transition-colors duration-500 hover:text-gold/70"
                style={{ animation: 'fade-in-up 0.5s ease-out 0.6s forwards', opacity: 0 }}
              >
                Already an Explorer? Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
