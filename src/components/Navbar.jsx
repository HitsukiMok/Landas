/**
 * Navbar — pill-shaped, centered navigation bar.
 * In Sign-Up view, shows the "LANDAS" wordmark on the far left.
 */
export default function Navbar({ view, onNavigate }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 pt-4 sm:px-6 sm:pt-5">
      <div className="relative flex w-full max-w-4xl items-center">
        {/* LANDAS wordmark — only visible in sign-up view */}
        <div
          className={`absolute -left-2 top-1/2 -translate-y-1/2 transition-all duration-500 sm:-left-4 ${
            view === 'signup'
              ? 'pointer-events-auto translate-x-0 opacity-100'
              : 'pointer-events-none -translate-x-6 opacity-0'
          }`}
        >
          <button
            onClick={() => onNavigate('hero')}
            className="text-landas-gradient text-2xl font-black tracking-widest sm:text-3xl"
            aria-label="Go to home"
          >
            LANDAS
          </button>
        </div>

        {/* Pill Nav */}
        <nav
          id="navbar-pill"
          className={`mx-auto flex items-center gap-1 rounded-full border border-leaf-light/30 bg-leaf-nav/80 px-2 py-2 shadow-lg backdrop-blur-md transition-all duration-500 sm:gap-2 sm:px-4 ${
            view === 'signup' ? 'translate-x-4 sm:translate-x-8' : ''
          }`}
        >
          <a
            href="#about"
            className="rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider text-gold/80 transition-all duration-300 hover:bg-leaf-light/30 hover:text-gold sm:px-4 sm:text-sm"
          >
            About
          </a>
          <a
            href="#contact"
            className="rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider text-gold/80 transition-all duration-300 hover:bg-leaf-light/30 hover:text-gold sm:px-4 sm:text-sm"
          >
            Contact
          </a>
          <button
            onClick={() => onNavigate('hero')}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider transition-all duration-300 sm:px-4 sm:text-sm ${
              view === 'hero'
                ? 'bg-leaf-light/30 text-gold'
                : 'text-gold/80 hover:bg-leaf-light/30 hover:text-gold'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => onNavigate('signup')}
            id="nav-signup-btn"
            className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider transition-all duration-300 sm:px-4 sm:text-sm ${
              view === 'signup'
                ? 'bg-gold text-leaf-dark shadow-md'
                : 'text-gold/80 hover:bg-leaf-light/30 hover:text-gold'
            }`}
          >
            Sign-up
          </button>

          {/* Divider */}
          <div className="mx-1 h-5 w-px bg-leaf-light/30 sm:mx-2" />

          {/* Avatar */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-leaf-light/40 text-sm text-gold/70">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
              <path d="M4 21v-1a6 6 0 0112 0v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Hamburger */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 hover:bg-leaf-light/30"
            aria-label="Menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gold/70">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  )
}
