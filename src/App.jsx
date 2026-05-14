import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, AppWrapper } from './context/ThemeContext'
import useStore from './store/useStore'

// Public Pages (Jim's Branch)
import LandingPage from './pages/LandingPage'
import LoginView from './components/LoginView'
import SignUpView from './components/SignUpView'
import AboutView from './components/AboutView'
import ContactView from './components/ContactView'
import FloatingLeaves from './components/FloatingLeaves'
import Navbar from './components/Navbar'
import ScrollXPBar from './components/ScrollXPBar'

// Private Pages (Dashboard Branch)
import Dashboard from './pages/Dashboard'

/**
 * ProtectedRoute - Redirects to login if not authenticated.
 * Used for securing the student dashboard.
 */
function ProtectedRoute({ children }) {
  const isAuthenticated = useStore((s) => s.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

/**
 * PublicRoute - Redirects to dashboard if already authenticated.
 * Used for login/sign-up pages.
 */
function PublicRoute({ children }) {
  const isAuthenticated = useStore((s) => s.isAuthenticated)
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}

/**
 * PublicLayout - Wraps public pages to provide the Navbar and leaf background effects.
 * When `staticView` is true, locks to viewport height with no scroll (for landing page).
 */
function PublicLayout({ children, staticView = false }) {
  return (
    <div
      className={`relative bg-leaf-dark ${
        staticView
          ? 'h-screen overflow-hidden'
          : 'min-h-screen overflow-hidden'
      }`}
    >
      <FloatingLeaves />
      <Navbar />
      <div className="relative z-10">
        {children}
      </div>
      {!staticView && <ScrollXPBar />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public Routes (Home & Informational) ── */}
        <Route path="/" element={<PublicLayout staticView><LandingPage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutView /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactView /></PublicLayout>} />

        {/* ── Authentication Routes (Redirection enabled) ── */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <PublicLayout staticView>
                <LoginView />
              </PublicLayout>
            </PublicRoute>
          } 
        />
        <Route 
          path="/sign-up" 
          element={
            <PublicRoute>
              <PublicLayout staticView>
                <SignUpView />
              </PublicLayout>
            </PublicRoute>
          } 
        />

        {/* ── Protected Application Routes ── */}
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <ThemeProvider>
                <AppWrapper>
                  <Dashboard />
                </AppWrapper>
              </ThemeProvider>
            </ProtectedRoute>
          } 
        />

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
