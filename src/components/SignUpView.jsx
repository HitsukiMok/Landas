import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'

/**
 * SignUpView — State B: Split layout with mascot on the left
 * and the sign-up form card on the right.
 */
export default function SignUpView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated sign-up logic
    login()
    navigate('/dashboard')
  }

  return (
    <section
      id="signup-view"
      className="relative flex min-h-screen items-center px-6 pt-24 pb-12 sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 lg:flex-row lg:gap-16">
        {/* Left Column — Mascot */}
        <div className="animate-slide-left flex flex-1 items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 scale-90 rounded-full bg-gold/6 blur-3xl" />
            <div className="absolute inset-0 scale-75 rounded-full bg-leaf-light/15 blur-3xl" />

            {/* ────────────────────────────────────────────────
                MASCOT IMAGE — Same placeholder as Hero.
                Located: public/placeholder-mascot.png
               ──────────────────────────────────────────────── */}
            <div className="relative z-10 flex flex-col items-center">
              <img
                src="/placeholder-mascot.png"
                alt="Rek the Chameleon"
                className="relative z-10 w-52 sm:w-64 lg:w-80"
              />
              {/* Ground Shadow */}
              <div className="absolute bottom-0 z-0 h-5 w-40 rounded-[100%] bg-black/40 blur-md sm:h-6 sm:w-48 lg:h-8 lg:w-64"></div>
            </div>
          </div>
        </div>

        {/* Right Column — Form Card */}
        <div className="animate-slide-right flex flex-1 items-center justify-center">
          <div className="w-full max-w-md rounded-3xl border border-leaf-light/20 bg-leaf-card/90 p-8 shadow-2xl backdrop-blur-sm sm:p-10">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-wider text-gold">
              Sign-up
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="signup-email"
                  className="text-sm font-semibold tracking-wider text-gold"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="signup-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="rounded-xl border-2 border-bark bg-leaf-input/60 px-4 py-3 text-sm tracking-wide text-gold/90 placeholder-gold/30 outline-none transition-all duration-300 focus:border-gold/60 focus:bg-leaf-input/80"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="signup-password"
                  className="text-sm font-semibold tracking-wider text-gold"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="signup-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="rounded-xl border-2 border-bark bg-leaf-input/60 px-4 py-3 text-sm tracking-wide text-gold/90 placeholder-gold/30 outline-none transition-all duration-300 focus:border-gold/60 focus:bg-leaf-input/80"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="signup-submit-btn"
                className="mt-2 rounded-xl bg-leaf-dark py-3.5 text-base font-bold tracking-wider text-gold shadow-lg transition-all duration-300 hover:bg-leaf-deeper hover:shadow-[0_4px_20px_rgba(30,62,18,0.4)]"
              >
                Sign-up
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-leaf-light/25" />
              <span className="text-sm font-medium tracking-wider text-gold/50">or</span>
              <div className="h-px flex-1 bg-leaf-light/25" />
            </div>

            {/* Google OAuth */}
            <button
              id="google-auth-btn"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-3.5 text-sm font-semibold tracking-wide text-gray-800 shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-50"
            >
              {/* Google "G" icon */}
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <button
              onClick={() => navigate('/login')}
              className="mt-6 w-full text-center text-[10px] font-black tracking-[0.15em] uppercase text-gold/60 hover:text-gold transition-colors"
            >
              Already an Explorer? Login
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
