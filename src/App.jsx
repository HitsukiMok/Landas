import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import { ThemeProvider, AppWrapper } from './context/ThemeContext'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppWrapper>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AppWrapper>
      </ThemeProvider>
    </BrowserRouter>
import { useState } from 'react'
import FloatingLeaves from './components/FloatingLeaves'
import Navbar from './components/Navbar'
import HeroView from './components/HeroView'
import SignUpView from './components/SignUpView'
import AboutView from './components/AboutView'
import ContactView from './components/ContactView'

export default function App() {
  const [view, setView] = useState('hero') // 'hero' | 'signup' | 'about' | 'contact'

  return (
    <div className="relative min-h-screen bg-leaf">
      {/* Background floating leaf shapes */}
      <FloatingLeaves />

      {/* Navigation */}
      <Navbar view={view} onNavigate={setView} />

      {/* View toggle with crossfade */}
      <div className="relative z-10">
        {view === 'hero' && (
          <div key="hero">
            <HeroView onSignUp={() => setView('signup')} />
          </div>
        )}
        {view === 'signup' && (
          <div key="signup">
            <SignUpView />
          </div>
        )}
        {view === 'about' && (
          <div key="about">
            <AboutView />
          </div>
        )}
        {view === 'contact' && (
          <div key="contact">
            <ContactView />
          </div>
        )}
      </div>
    </div>
  )
}

