import useStore from '../../store/useStore'

/**
 * BiomeBackground — renders a full-screen ambient background
 * that visually represents the current biome (Ocean, Tropics, Desert).
 */

const biomeConfig = {
  Ocean: {
    gradient: 'from-[#E8F4F8] via-[#D4EAF5] to-[#FDFBF7]',
    label: 'Ocean Depths',
    waves: true,
    accent: '#B2D8E8',
  },
  Tropics: {
    gradient: 'from-[#E8F5E9] via-[#DCEDC8] to-[#FDFBF7]',
    label: 'Tropical Canopy',
    waves: false,
    accent: '#A5D6A7',
  },
  Desert: {
    gradient: 'from-[#FFF3E0] via-[#FFE0B2] to-[#FDFBF7]',
    label: 'Golden Dunes',
    waves: false,
    accent: '#FFCC80',
  },
}

export default function BiomeBackground() {
  const currentBiome = useStore((s) => s.currentBiome)
  const config = biomeConfig[currentBiome] || biomeConfig.Ocean

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {/* Main gradient fill */}
      <div className={`absolute inset-0 bg-gradient-to-b ${config.gradient}`} />

      {/* Subtle animated shapes for depth */}
      {config.waves && (
        <>
          <svg
            className="absolute bottom-0 left-0 right-0 opacity-[0.07]"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            style={{ height: '40%', width: '100%' }}
          >
            <path
              fill={config.accent}
              d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,208C960,181,1056,139,1152,138.7C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            >
              <animate
                attributeName="d"
                dur="12s"
                repeatCount="indefinite"
                values="
                  M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,208C960,181,1056,139,1152,138.7C1248,139,1344,181,1392,202.7L1440,224L1440,320L0,320Z;
                  M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,170.7C672,160,768,192,864,213.3C960,235,1056,245,1152,234.7C1248,224,1344,192,1392,176L1440,160L1440,320L0,320Z;
                  M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,208C960,181,1056,139,1152,138.7C1248,139,1344,181,1392,202.7L1440,224L1440,320L0,320Z
                "
              />
            </path>
          </svg>
          <svg
            className="absolute bottom-0 left-0 right-0 opacity-[0.04]"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            style={{ height: '35%', width: '100%' }}
          >
            <path
              fill={config.accent}
              d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L0,320Z"
            >
              <animate
                attributeName="d"
                dur="16s"
                repeatCount="indefinite"
                values="
                  M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L0,320Z;
                  M0,256L48,240C96,224,192,192,288,202.7C384,213,480,267,576,272C672,277,768,235,864,213.3C960,192,1056,192,1152,202.7C1248,213,1344,235,1392,245.3L1440,256L1440,320L0,320Z;
                  M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L0,320Z
                "
              />
            </path>
          </svg>
        </>
      )}

      {/* Floating particles for all biomes */}
      <div className="absolute top-[15%] left-[10%] h-32 w-32 animate-[float-gentle_8s_ease-in-out_infinite] rounded-full opacity-[0.06]" style={{ background: config.accent }} />
      <div className="absolute top-[40%] right-[15%] h-24 w-24 animate-[float-gentle_11s_ease-in-out_infinite_reverse] rounded-full opacity-[0.05]" style={{ background: config.accent }} />
      <div className="absolute bottom-[25%] left-[55%] h-20 w-20 animate-[float-gentle_9s_ease-in-out_infinite] rounded-full opacity-[0.04]" style={{ background: config.accent }} />
    </div>
  )
}
