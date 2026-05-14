import { useMemo } from 'react'

/**
 * ForestBackground — An immersive enchanted forest scene.
 * All elements are FIXED in place (no scroll-based parallax).
 * Leaves still animate via CSS keyframes but don't shift on scroll.
 */
export default function ForestBackground() {
  // Generate falling leaves once
  const fallingLeaves = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 12 + Math.random() * 16,
      delay: Math.random() * 20,
      duration: 14 + Math.random() * 12,
      opacity: 0.15 + Math.random() * 0.35,
      alt: i % 2 === 0,
      hue: Math.random() > 0.6 ? 'text-gold-soft' : Math.random() > 0.3 ? 'text-moss' : 'text-fern',
    })),
    []
  )

  // Generate fireflies once
  const fireflies = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      top: `${10 + Math.random() * 80}%`,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 8,
      duration: 3 + Math.random() * 5,
    })),
    []
  )

  // Light rays data
  const lightRays = useMemo(() => [
    { left: '15%', width: '120px', height: '100%', delay: 0, duration: 8 },
    { left: '35%', width: '80px', height: '100%', delay: 2, duration: 10 },
    { left: '60%', width: '100px', height: '100%', delay: 4, duration: 9 },
    { left: '80%', width: '60px', height: '100%', delay: 1, duration: 11 },
  ], [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* ── Base forest gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(45, 94, 30, 0.3) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 30%, rgba(42, 82, 28, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(10, 26, 6, 0.8) 0%, transparent 70%),
            linear-gradient(180deg, #0f2409 0%, #1a3a12 30%, #152e0e 70%, #0a1a06 100%)
          `,
        }}
      />

      {/* ── Canopy shadow overlay (top darkness) ── */}
      <div
        className="absolute inset-x-0 top-0 h-[40%]"
        style={{
          background: 'linear-gradient(180deg, rgba(10, 20, 6, 0.7) 0%, transparent 100%)',
        }}
      />

      {/* ── Tree trunks — left side (static, no parallax) ── */}
      <div className="absolute left-0 bottom-0 h-full w-[120px] opacity-30">
        <svg viewBox="0 0 120 800" fill="none" className="h-full w-full" preserveAspectRatio="none">
          <path d="M30 800 L28 600 Q20 400 35 200 Q40 100 25 0" stroke="#3E2723" strokeWidth="18" strokeLinecap="round" fill="none" opacity="0.8" />
          <path d="M30 800 L28 600 Q20 400 35 200 Q40 100 25 0" stroke="#5D4037" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.3" />
          <path d="M32 300 Q60 260 90 280 Q100 285 110 270" stroke="#3E2723" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M30 450 Q55 420 75 440" stroke="#3E2723" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.5" />
          <path d="M28 180 Q50 150 70 170" stroke="#3E2723" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.4" />
        </svg>
      </div>

      {/* ── Tree trunks — right side (static) ── */}
      <div className="absolute right-0 bottom-0 h-full w-[100px] opacity-25">
        <svg viewBox="0 0 100 800" fill="none" className="h-full w-full" preserveAspectRatio="none">
          <path d="M75 800 L78 550 Q85 350 70 150 Q65 50 80 0" stroke="#3E2723" strokeWidth="16" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M75 800 L78 550 Q85 350 70 150 Q65 50 80 0" stroke="#5D4037" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.25" />
          <path d="M73 350 Q45 310 20 340" stroke="#3E2723" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.5" />
          <path d="M76 200 Q50 170 30 190" stroke="#3E2723" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.4" />
        </svg>
      </div>

      {/* ── Background tree silhouettes (static) ── */}
      <div className="absolute bottom-0 left-[20%] h-full w-[80px] opacity-10">
        <svg viewBox="0 0 80 800" fill="none" className="h-full w-full" preserveAspectRatio="none">
          <path d="M40 800 L42 400 Q38 200 45 0" stroke="#2d5e1e" strokeWidth="20" strokeLinecap="round" fill="none" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-[30%] h-full w-[60px] opacity-8">
        <svg viewBox="0 0 60 800" fill="none" className="h-full w-full" preserveAspectRatio="none">
          <path d="M30 800 L28 500 Q35 250 25 0" stroke="#1c3f13" strokeWidth="16" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {/* ── Volumetric Light Rays ── */}
      {lightRays.map((ray, i) => (
        <div
          key={`ray-${i}`}
          className="absolute top-0"
          style={{
            left: ray.left,
            width: ray.width,
            height: ray.height,
            background: `linear-gradient(180deg, rgba(212, 185, 106, 0.08) 0%, rgba(212, 185, 106, 0.02) 40%, transparent 80%)`,
            transform: 'rotate(-15deg) scaleY(1.4)',
            transformOrigin: 'top center',
            animation: `light-ray-pulse ${ray.duration}s ease-in-out infinite`,
            animationDelay: `${ray.delay}s`,
          }}
        />
      ))}

      {/* ── Floating leaf shapes (CSS animation only, no scroll movement) ── */}
      <div className="absolute" style={{ top: '8%', left: '12%' }}>
        <LeafSVG className="text-fern leaf-float-1" size="100px" fillOpacity={0.12} />
      </div>
      <div className="absolute" style={{ top: '20%', left: '5%' }}>
        <LeafSVG className="text-moss leaf-float-3" size="70px" fillOpacity={0.08} />
      </div>
      <div className="absolute" style={{ top: '-3%', right: '12%' }}>
        <LeafSVG className="text-leaf-dark leaf-float-2" size="140px" fillOpacity={0.15} />
      </div>
      <div className="absolute" style={{ top: '50%', left: '65%' }}>
        <LeafSVG className="text-fern leaf-float-2" size="110px" fillOpacity={0.1} />
      </div>
      <div className="absolute" style={{ top: '60%', left: '10%' }}>
        <LeafSVG className="text-leaf-dark leaf-float-1" size="90px" fillOpacity={0.12} />
      </div>

      {/* ── Falling Leaves ── */}
      {fallingLeaves.map((leaf) => (
        <div
          key={`fall-${leaf.id}`}
          className="absolute"
          style={{
            left: leaf.left,
            top: '-5%',
            animation: `${leaf.alt ? 'leaf-fall-alt' : 'leaf-fall'} ${leaf.duration}s linear infinite`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          <div style={{ animation: `leaf-sway ${3 + Math.random() * 2}s ease-in-out infinite` }}>
            <RealisticLeaf size={leaf.size} opacity={leaf.opacity} hue={leaf.hue} />
          </div>
        </div>
      ))}

      {/* ── Fireflies / Sparkles ── */}
      {fireflies.map((fly) => (
        <div
          key={`fly-${fly.id}`}
          className="absolute rounded-full"
          style={{
            left: fly.left,
            top: fly.top,
            width: `${fly.size}px`,
            height: `${fly.size}px`,
            backgroundColor: 'var(--color-firefly)',
            animation: `firefly-pulse ${fly.duration}s ease-in-out infinite`,
            animationDelay: `${fly.delay}s`,
            boxShadow: `0 0 ${fly.size * 3}px ${fly.size}px rgba(232, 220, 160, 0.3)`,
          }}
        />
      ))}

      {/* ── Ground mist ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[25%]"
        style={{
          background: 'linear-gradient(0deg, rgba(15, 36, 9, 0.9) 0%, rgba(26, 58, 18, 0.3) 50%, transparent 100%)',
          animation: 'mist-drift 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[15%]"
        style={{
          background: 'linear-gradient(0deg, rgba(10, 26, 6, 0.6) 0%, transparent 100%)',
        }}
      />

      {/* ── Subtle vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10, 20, 6, 0.5) 100%)',
        }}
      />
    </div>
  )
}

/* ── Sub-components ── */

function LeafSVG({ className, size, fillOpacity = 0.15 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`text-current ${className}`}
      style={{ width: size, height: size }}
      fill="currentColor"
    >
      <path
        d="M50 0 C77.6 0 100 22.4 100 50 C100 77.6 50 100 50 100 C50 100 0 77.6 0 50 C0 22.4 22.4 0 50 0 Z"
        fillOpacity={fillOpacity}
      />
    </svg>
  )
}

/** Realistic multi-path leaf with veins */
function RealisticLeaf({ size, opacity, hue }) {
  return (
    <svg
      viewBox="0 0 40 50"
      width={size}
      height={size * 1.25}
      className={hue}
      fill="currentColor"
      style={{ opacity }}
    >
      <path
        d="M20 2 C28 8 36 18 36 28 C36 40 28 48 20 48 C12 48 4 40 4 28 C4 18 12 8 20 2Z"
        fillOpacity={0.7}
      />
      <path
        d="M20 6 L20 44"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeOpacity={0.3}
        fill="none"
      />
      <path
        d="M20 15 L12 20 M20 22 L10 28 M20 29 L13 34 M20 15 L28 20 M20 22 L30 28 M20 29 L27 34"
        stroke="currentColor"
        strokeWidth="0.3"
        strokeOpacity={0.2}
        fill="none"
      />
    </svg>
  )
}
