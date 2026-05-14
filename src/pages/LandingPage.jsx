import { useState } from 'react'
import FloatingLeaves from '../components/FloatingLeaves'
import Navbar from '../components/Navbar'
import HeroView from '../components/HeroView'
import SignUpView from '../components/SignUpView'

/**
 * LandingPage — the public-facing page with Hero / Sign-Up toggle.
 */
export default function LandingPage() {
  const [view, setView] = useState('hero') // 'hero' | 'signup'

  return (
    <div className="relative min-h-screen bg-leaf">
      <FloatingLeaves />
      <Navbar view={view} onNavigate={setView} />
      <div className="relative z-10">
        {view === 'hero' ? (
          <HeroView onSignUp={() => setView('signup')} />
        ) : (
          <SignUpView />
        )}
      </div>
    </div>
  )
}
