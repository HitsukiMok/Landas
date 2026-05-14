import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'

/**
 * LoginView — Login form card with redirection to /dashboard
 */
export default function LoginView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated login logic
    login()
    navigate('/dashboard')
  }

  return (
    <section
      id="login-view"
      className="relative flex min-h-screen items-center px-6 pt-24 pb-12 sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 lg:flex-row lg:gap-16">
        {/* Left Column — Mascot */}
        <div className="animate-slide-left flex flex-1 items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 scale-90 rounded-full bg-gold/5 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center">
              <img
                src="/placeholder-mascot.png"
                alt="Rek the Chameleon"
                className="relative z-10 w-52 sm:w-64 lg:w-80"
              />
              <div className="absolute bottom-0 z-0 h-5 w-40 rounded-[100%] bg-black/40 blur-md sm:h-6 sm:w-48 lg:h-8 lg:w-64"></div>
            </div>
          </div>
        </div>

        {/* Right Column — Form Card */}
        <div className="animate-slide-right flex flex-1 items-center justify-center">
          <div className="w-full max-w-md rounded-3xl border border-leaf-light/20 bg-leaf-card/90 p-8 shadow-2xl backdrop-blur-sm sm:p-10">
            <h2 className="mb-2 text-center text-3xl font-bold tracking-wider text-gold">
              Welcome Back
            </h2>
            <p className="mb-8 text-center text-xs font-medium tracking-widest text-gold/60 uppercase">
              Continue your quest
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="login-email" className="text-xs font-black tracking-[0.15em] text-gold uppercase">
                  Email
                </label>
                <input
                  type="email"
                  id="login-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="warrior@landas.edu"
                  className="rounded-xl border-2 border-bark bg-leaf-input/60 px-4 py-3 text-sm tracking-wide text-gold/90 placeholder-gold/30 outline-none transition-all duration-300 focus:border-gold/60 focus:bg-leaf-input/80"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="login-password" title="Password" className="text-xs font-black tracking-[0.15em] text-gold uppercase">
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="rounded-xl border-2 border-bark bg-leaf-input/60 px-4 py-3 text-sm tracking-wide text-gold/90 placeholder-gold/30 outline-none transition-all duration-300 focus:border-gold/60 focus:bg-leaf-input/80"
                />
              </div>

              <button
                type="submit"
                className="mt-4 rounded-xl bg-leaf-dark py-4 text-xs font-black tracking-[0.2em] uppercase text-gold shadow-lg transition-all duration-300 hover:bg-leaf-deeper hover:shadow-xl active:scale-95"
              >
                Login to Dashboard
              </button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-leaf-light/25" />
              <span className="text-[10px] font-black tracking-widest text-gold/40 uppercase">or</span>
              <div className="h-px flex-1 bg-leaf-light/25" />
            </div>

            <button
              onClick={() => navigate('/sign-up')}
              className="w-full text-center text-[10px] font-black tracking-[0.15em] uppercase text-gold/60 hover:text-gold transition-colors"
            >
              New Explorer? Create Account
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
