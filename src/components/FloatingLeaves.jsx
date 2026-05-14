import { useEffect, useState } from 'react';

/**
 * FloatingLeaves — renders animated vector leaf shapes
 * that react to scrolling to give a parallax 3D nature-themed depth.
 */
export default function FloatingLeaves() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call to set scroll position
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple leaf SVG path
  const LeafSVG = ({ className, size, fillOpacity = 0.2 }) => (
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
  );

  const LeafContainer = ({ top, bottom, left, right, speed, children }) => (
    <div 
      className="absolute" 
      style={{ 
        top, bottom, left, right,
        transform: `translateY(${scrollY * speed}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Top-left cluster */}
      <LeafContainer top="5%" left="8%" speed={-0.2}>
        <LeafSVG className="text-leaf-light leaf-float-1" size="180px" fillOpacity={0.3} />
      </LeafContainer>
      <LeafContainer top="15%" left="3%" speed={-0.4}>
        <LeafSVG className="text-gold leaf-float-3" size="140px" fillOpacity={0.15} />
      </LeafContainer>

      {/* Top-right */}
      <LeafContainer top="-5%" right="10%" speed={-0.1}>
        <LeafSVG className="text-leaf-dark leaf-float-2" size="250px" fillOpacity={0.4} />
      </LeafContainer>
      <LeafContainer top="20%" right="5%" speed={-0.3}>
        <LeafSVG className="text-leaf-light leaf-float-4" size="120px" fillOpacity={0.25} />
      </LeafContainer>

      {/* Middle */}
      <LeafContainer top="45%" left="60%" speed={-0.25}>
        <LeafSVG className="text-leaf-light leaf-float-2" size="200px" fillOpacity={0.2} />
      </LeafContainer>
      <LeafContainer top="55%" left="15%" speed={-0.15}>
        <LeafSVG className="text-leaf-dark leaf-float-1" size="180px" fillOpacity={0.35} />
      </LeafContainer>

      {/* Bottom */}
      <LeafContainer bottom="10%" left="25%" speed={-0.35}>
        <LeafSVG className="text-gold leaf-float-5" size="250px" fillOpacity={0.1} />
      </LeafContainer>
      <LeafContainer bottom="5%" right="20%" speed={-0.5}>
        <LeafSVG className="text-leaf-light leaf-float-3" size="140px" fillOpacity={0.3} />
      </LeafContainer>
      <LeafContainer bottom="-5%" right="45%" speed={-0.1}>
        <LeafSVG className="text-leaf-dark leaf-float-2" size="200px" fillOpacity={0.4} />
      </LeafContainer>
    </div>
  )
}
