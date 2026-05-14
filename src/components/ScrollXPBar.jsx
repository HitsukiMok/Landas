import { useState, useEffect } from 'react'

/**
 * ScrollXPBar — A neon XP-style progress bar fixed at the bottom of the viewport.
 * Fills horizontally as the user scrolls down the page, mimicking a gaming XP bar.
 * Only renders on scrollable (non-static) pages.
 */
export default function ScrollXPBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) {
        setProgress(0)
        return
      }
      setProgress(Math.min((scrollTop / docHeight) * 100, 100))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[55] h-[6px] pointer-events-none">
      {/* Track background */}
      <div className="absolute inset-0 bg-leaf-dark/80 backdrop-blur-sm" />

      {/* XP fill bar */}
      <div
        className="absolute inset-y-0 left-0 transition-[width] duration-200 ease-out"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(90deg, 
            rgba(80, 255, 120, 0.6) 0%, 
            rgba(120, 255, 80, 0.8) 30%, 
            rgba(180, 255, 50, 0.9) 60%, 
            rgba(212, 185, 106, 1) 100%
          )`,
          boxShadow: `
            0 0 8px rgba(120, 255, 80, 0.5),
            0 0 20px rgba(120, 255, 80, 0.2),
            inset 0 0 4px rgba(255, 255, 255, 0.2)
          `,
        }}
      >
        {/* Bright leading edge glow */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full"
          style={{
            background: 'rgba(180, 255, 100, 0.9)',
            boxShadow: '0 0 10px 3px rgba(120, 255, 80, 0.6), 0 0 20px 6px rgba(120, 255, 80, 0.3)',
          }}
        />
      </div>
    </div>
  )
}
