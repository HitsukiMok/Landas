import { useState } from 'react'
import FloatingLeaves from './components/FloatingLeaves'
import Navbar from './components/Navbar'
import HeroView from './components/HeroView'
import SignUpView from './components/SignUpView'

export default function App() {
  const [view, setView] = useState('hero') // 'hero' | 'signup'

  return (
    <div className="relative min-h-screen bg-leaf">
      {/* Background floating leaf shapes */}
      <FloatingLeaves />

      {/* Navigation */}
      <Navbar view={view} onNavigate={setView} />

      {/* View toggle with crossfade */}
      <div className="relative z-10">
        {view === 'hero' ? (
          <div key="hero">
            <HeroView onSignUp={() => setView('signup')} />
          </div>
        ) : (
          <div key="signup">
            <SignUpView />
          </div>
        )}
      </div>
    </div>
  )
}
