import { Link, useLocation, useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'

/**
 * Navbar — pill-shaped, centered navigation bar.
 */
export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isAuthenticated = useStore((s) => s.isAuthenticated)
  const logout = useStore((s) => s.logout)

  const isHome = pathname === '/'
  const isAuth = pathname === '/login' || pathname === '/sign-up'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 pt-4 sm:px-6 sm:pt-5">
      <div className="relative flex w-full max-w-4xl items-center">
        {/* LANDAS wordmark — visible when NOT on hero view */}
        <div
          className={`absolute -left-2 top-1/2 -translate-y-1/2 transition-all duration-500 sm:-left-4 ${!isHome
              ? 'pointer-events-auto translate-x-0 opacity-100'
              : 'pointer-events-none -translate-x-6 opacity-0'
            }`}
        >
          <Link
            to="/"
            className="text-landas-gradient text-2xl font-black tracking-widest sm:text-3xl"
            aria-label="Go to home"
          >
            LANDAS
          </Link>
        </div>

        {/* Pill Nav */}
        <nav
          id="navbar-pill"
          className={`mx-auto flex items-center gap-1 rounded-full border border-leaf-light/30 bg-leaf-nav/80 px-2 py-2 shadow-lg backdrop-blur-md transition-all duration-500 sm:gap-2 sm:px-4 ${!isHome ? 'translate-x-4 sm:translate-x-8' : ''
            }`}
        >
          <Link
            to="/about"
            className={`rounded-full px-3 py-1.5 text-[10px] font-black tracking-widest uppercase transition-all duration-300 sm:px-4 ${pathname === '/about'
                ? 'bg-leaf-light/30 text-gold'
                : 'text-gold/80 hover:bg-leaf-light/30 hover:text-gold'
              }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`rounded-full px-3 py-1.5 text-[10px] font-black tracking-widest uppercase transition-all duration-300 sm:px-4 ${pathname === '/contact'
                ? 'bg-leaf-light/30 text-gold'
                : 'text-gold/80 hover:bg-leaf-light/30 hover:text-gold'
              }`}
          >
            Contact
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className={`rounded-full px-3 py-1.5 text-[10px] font-black tracking-widest uppercase transition-all duration-300 sm:px-4 ${pathname === '/login'
                    ? 'bg-leaf-light/30 text-gold'
                    : 'text-gold/80 hover:bg-leaf-light/30 hover:text-gold'
                  }`}
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                id="nav-signup-btn"
                className={`rounded-full px-3 py-1.5 text-[10px] font-black tracking-widest uppercase transition-all duration-300 sm:px-4 ${pathname === '/sign-up'
                    ? 'bg-gold text-leaf-dark shadow-md'
                    : 'text-gold/80 hover:bg-leaf-light/30 hover:text-gold'
                  }`}
              >
                Sign-up
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="rounded-full px-3 py-1.5 text-[10px] font-black tracking-widest uppercase text-gold/80 hover:bg-leaf-light/30 hover:text-gold transition-all duration-300 sm:px-4"
            >
              Logout
            </button>
          )}

          {/* Divider */}
          <div className="mx-1 h-5 w-px bg-leaf-light/30 sm:mx-2" />

          {/* Dashboard Link for Auth Users */}
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className={`rounded-full p-1.5 transition-all duration-300 ${pathname === '/dashboard' ? 'bg-gold text-leaf-dark' : 'text-gold/70 hover:bg-leaf-light/30'}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
              </svg>
            </Link>
          )}

          {/* Avatar Icon (Fallback for unauthenticated) */}
          {!isAuthenticated && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-leaf-light/40 text-sm text-gold/70">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path d="M4 21v-1a6 6 0 0112 0v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
