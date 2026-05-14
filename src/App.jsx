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
  )
}

