import { useState, useCallback, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'

/**
 * Navbar — pill-shaped, centered navigation bar.
 * - Landing page: hidden by default, appears on hover at top.
 * - Other pages: visible initially, hides on scroll down, reappears on hover at top.
 */
export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isAuthenticated = useStore((s) => s.isAuthenticated)
  const logout = useStore((s) => s.logout)

  const isHome = pathname === '/'
  const [hovered, setHovered] = useState(false)
  const [scrolledAway, setScrolledAway] = useState(false)
  const lastScrollY = useRef(0)

  // Track scroll direction on non-home pages
  useEffect(() => {
    if (isHome) return

    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > 60 && currentY > lastScrollY.current) {
        // Scrolling down past threshold — hide
        setScrolledAway(true)
      } else if (currentY < lastScrollY.current) {
        // Scrolling up — still hide, only hover reveals
        // (but allow if near top)
        if (currentY < 30) setScrolledAway(false)
      }
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  // Reset scroll state when navigating
  useEffect(() => {
    setScrolledAway(false)
    setHovered(false)
    lastScrollY.current = 0
  }, [pathname])

  // Visibility logic:
  // Home: only on hover
  // Other pages: visible unless scrolled away, but hover at top always overrides
  const isVisible = hovered || (!isHome && !scrolledAway)

  const handleMouseEnter = useCallback(() => {
    setHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
  }, [])

  return (
    <>
      {/* Invisible trigger zone at top — always present when navbar is hidden */}
      {!isVisible && (
        <div
          className="fixed top-0 left-0 right-0 z-[60] h-20"
          onMouseEnter={handleMouseEnter}
          aria-hidden="true"
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 pt-4 sm:px-6 sm:pt-5 transition-all duration-700 ease-out ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative flex w-full max-w-4xl items-center">
          {/* LANDAS wordmark — visible when NOT on home */}
          <div
            className={`absolute -left-2 top-1/2 -translate-y-1/2 transition-all duration-700 sm:-left-4 ${
              !isHome
                ? 'pointer-events-auto translate-x-0 opacity-100'
                : 'pointer-events-none -translate-x-6 opacity-0'
            }`}
          >
            <Link
              to="/"
              className="text-landas-gradient font-magical text-2xl font-bold italic tracking-widest sm:text-3xl"
              aria-label="Go to home"
            >
              Landas
            </Link>
          </div>

          {/* Pill Nav — with magical glassmorphism */}
          <nav
            id="navbar-pill"
            className={`mx-auto flex items-center gap-1 rounded-full border border-gold/10 bg-leaf-dark/60 px-3 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(212,185,106,0.05)] backdrop-blur-xl transition-all duration-700 sm:gap-2 sm:px-5 ${
              !isHome ? 'translate-x-4 sm:translate-x-8' : ''
            }`}
          >
            <NavLink to="/about" active={pathname === '/about'}>
              About
            </NavLink>
            <NavLink to="/contact" active={pathname === '/contact'}>
              Contact
            </NavLink>

            {/* Subtle divider */}
            <div className="mx-1 h-4 w-px bg-gold/10 sm:mx-2" />

            {!isAuthenticated ? (
              <>
                <NavLink to="/login" active={pathname === '/login'}>
                  Login
                </NavLink>
                <NavLink
                  to="/sign-up"
                  active={pathname === '/sign-up'}
                  highlight
                  id="nav-signup-btn"
                >
                  Sign-up
                </NavLink>
              </>
            ) : (
              <button
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase text-gold/60 transition-all duration-500 hover:text-gold/90 sm:px-4"
              >
                Logout
              </button>
            )}

            {/* Divider */}
            <div className="mx-1 h-4 w-px bg-gold/10 sm:mx-2" />

            {/* Dashboard Link for Auth Users */}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`rounded-full p-1.5 transition-all duration-500 ${
                  pathname === '/dashboard'
                    ? 'bg-gold/90 text-leaf-dark'
                    : 'text-gold/50 hover:bg-gold/10 hover:text-gold/80'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                  <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                  <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                  <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
                </svg>
              </Link>
            )}

            {/* Avatar Icon (unauthenticated) */}
            {!isAuthenticated && (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/5 text-gold/40 transition-colors duration-500 hover:bg-gold/10 hover:text-gold/60">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                  <path d="M4 21v-1a6 6 0 0112 0v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}

/**
 * NavLink — Individual nav item with magical hover glow effect
 */
function NavLink({ to, active, highlight, id, children }) {
  return (
    <Link
      to={to}
      id={id}
      className={`group relative rounded-full px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase transition-all duration-500 sm:px-4 ${
        active
          ? highlight
            ? 'bg-gold/90 text-leaf-dark shadow-[0_0_16px_rgba(212,185,106,0.2)]'
            : 'bg-gold/10 text-gold/90'
          : highlight
          ? 'text-gold/70 hover:bg-gold/80 hover:text-leaf-dark hover:shadow-[0_0_20px_rgba(212,185,106,0.15)]'
          : 'text-gold/50 hover:bg-gold/8 hover:text-gold/90'
      }`}
    >
      {children}
      {/* Subtle bottom glow on hover */}
      <span
        className={`absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 rounded-full bg-gold/40 transition-all duration-500 ${
          active ? 'w-3/5 opacity-100' : 'w-0 opacity-0 group-hover:w-2/5 group-hover:opacity-60'
        }`}
      />
    </Link>
  )
}
