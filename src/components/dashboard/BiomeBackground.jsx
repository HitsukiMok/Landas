import useStore from '../../store/useStore'

const CSS = `
@keyframes swim {
  0% { transform: translateX(-150px) scaleX(-1); }
  49.9% { transform: translateX(calc(100vw + 150px)) scaleX(-1); }
  50% { transform: translateX(calc(100vw + 150px)) scaleX(1); }
  99.9% { transform: translateX(-150px) scaleX(1); }
  100% { transform: translateX(-150px) scaleX(-1); }
}
@keyframes swim-reverse {
  0% { transform: translateX(calc(100vw + 150px)) scaleX(1); }
  49.9% { transform: translateX(-150px) scaleX(1); }
  50% { transform: translateX(-150px) scaleX(-1); }
  99.9% { transform: translateX(calc(100vw + 150px)) scaleX(-1); }
  100% { transform: translateX(calc(100vw + 150px)) scaleX(1); }
}
@keyframes bubble{0%{transform:translateY(0) scale(1);opacity:.5}100%{transform:translateY(-100vh) scale(.2);opacity:0}}
@keyframes sway{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
@keyframes drift{0%{transform:translateX(-100px) rotate(0deg)}100%{transform:translateX(calc(100vw + 100px)) rotate(1080deg)}}
@keyframes pulse-glow{0%,100%{filter:drop-shadow(0 0 30px rgba(255,220,80,.3))}50%{filter:drop-shadow(0 0 55px rgba(255,220,80,.6))}}
@keyframes shimmer{0%,100%{opacity:.02}50%{opacity:.06}}
@keyframes ray{0%,100%{opacity:.04}50%{opacity:.1}}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes bird{0%{transform:translateX(-80px) translateY(0)}25%{transform:translateX(25vw) translateY(-20px)}50%{transform:translateX(50vw) translateY(5px)}75%{transform:translateX(75vw) translateY(-15px)}100%{transform:translateX(calc(100vw+80px)) translateY(0)}}
@keyframes leaf-fall {
  0% { transform: translate(0, -10vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translate(15vw, 110vh) rotate(360deg); opacity: 0; }
}
@keyframes dead-leaf-blow {
  0% { transform: translate(-20vw, 50vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translate(120vw, 20vh) rotate(720deg); opacity: 0; }
}
`

export default function BiomeBackground() {
  const biome = useStore((s) => s.currentBiome)
  const dark = useStore((s) => s.isDarkMode)
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <style>{CSS}</style>
      {biome === 'Ocean' && <Ocean d={dark} />}
      {biome === 'Tropics' && <Tropics d={dark} />}
      {biome === 'Desert' && <Desert d={dark} />}
    </div>
  )
}

/* ════ OCEAN ════ */
function Ocean({ d }) {
  const bg = d
    ? 'linear-gradient(180deg,#060e1a 0%,#0b1a2e 25%,#0e2240 50%,#112a4d 75%,#0a1e38 100%)'
    : 'linear-gradient(180deg,#b8dff0 0%,#7ec8e3 20%,#4da8cc 45%,#2e8aaf 70%,#1b6d8a 100%)'

  // Fish swim side to side (left to right then turn and right to left)
  const fish = [
    { t: '20%', dur: 40, del: 0, sz: 36, c: d ? '#4db8ff' : '#ff7043', dir: 'swim' },
    { t: '38%', dur: 52, del: 12, sz: 28, c: d ? '#66d9ef' : '#ffa726', dir: 'swim-reverse' },
    { t: '55%', dur: 36, del: 5, sz: 40, c: d ? '#38a1db' : '#ef5350', dir: 'swim' },
    { t: '30%', dur: 64, del: 24, sz: 22, c: d ? '#80deea' : '#66bb6a', dir: 'swim-reverse' },
    { t: '62%', dur: 48, del: 18, sz: 30, c: d ? '#4fc3f7' : '#ab47bc', dir: 'swim' },
    { t: '48%', dur: 56, del: 30, sz: 24, c: d ? '#29b6f6' : '#26a69a', dir: 'swim-reverse' },
    { t: '72%', dur: 44, del: 8, sz: 20, c: d ? '#81d4fa' : '#ffa07a', dir: 'swim' },
    { t: '42%', dur: 70, del: 40, sz: 18, c: d ? '#4dd0e1' : '#ffcc02', dir: 'swim-reverse' },
  ]
  return (
    <>
      <div className="absolute inset-0" style={{ background: bg }} />

      {/* Caustic light patterns */}
      {[12, 32, 52, 72, 88].map((l, i) => (
        <div key={i} className="absolute top-0" style={{
          left: `${l}%`, width: '4px', height: '55%',
          background: d ? 'linear-gradient(180deg,rgba(80,160,255,.06) 0%,transparent 100%)' : 'linear-gradient(180deg,rgba(255,255,255,.18) 0%,transparent 100%)',
          transform: `rotate(${(i - 2) * 4}deg)`, animation: `ray ${5 + i * 2}s ease-in-out infinite`, animationDelay: `-${i}s`
        }} />
      ))}

      {/* Bubbles */}
      {[8, 18, 30, 42, 55, 68, 80, 92].map((l, i) => (
        <div key={i} className="absolute rounded-full" style={{
          left: `${l}%`, bottom: `${2 + i * 3}%`,
          width: `${3 + (i % 4) * 2}px`, height: `${3 + (i % 4) * 2}px`,
          background: d ? 'rgba(130,210,255,.12)' : 'rgba(255,255,255,.4)',
          border: `1px solid ${d ? 'rgba(130,210,255,.08)' : 'rgba(255,255,255,.5)'}`,
          animation: `bubble ${6 + i * 2.5}s ease-in infinite`, animationDelay: `-${i * 1.8}s`
        }} />
      ))}

      {/* Fish */}
      {fish.map((f, i) => (
        <svg key={i} className="absolute left-0" style={{
          top: f.t, width: f.sz, height: f.sz * .55, opacity: d ? .3 : .45,
          animation: `${f.dir} ${f.dur}s linear infinite`, animationDelay: `-${f.del}s`
        }} viewBox="0 0 44 24" fill={f.c}>
          <ellipse cx="20" cy="12" rx="15" ry="9" />
          <polygon points="36,12 44,3 44,21" />
          <circle cx="11" cy="9" r="2" fill={d ? '#060e1a' : '#fff'} opacity=".8" />
          <ellipse cx="20" cy="12" rx="10" ry="5" fill="rgba(255,255,255,.1)" />
        </svg>
      ))}

      {/* Coral reef bottom (detailed SVG shapes) */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 160" preserveAspectRatio="none" style={{ height: '18%' }}>
        {/* Variety of coral paths */}
        {[80, 220, 380, 520, 680, 840, 1000, 1160, 1320].map((x, i) => {
          const colors = d
            ? ['#1a3050', '#1e3a5c', '#162e48', '#1a3352']
            : ['#ff6b6b', '#ffa07a', '#77c9d4', '#98d8c8', '#ffc857', '#e06377']
          const c1 = colors[i % colors.length];
          const c2 = colors[(i + 1) % colors.length];
          const type = i % 3;
          return (
            <g key={i} transform={`translate(${x}, 150)`} opacity={d ? .7 : .85}>
              {type === 0 && (
                <>
                  <path d="M-15,0 Q-15,-30 -20,-50 Q-10,-50 -5,-30 Q-5,0 -15,0" fill={c1} />
                  <path d="M0,0 Q5,-40 10,-60 Q20,-60 15,-40 Q10,0 0,0" fill={c2} />
                  <path d="M15,0 Q20,-20 25,-40 Q35,-35 25,-20 Q20,0 15,0" fill={c1} />
                </>
              )}
              {type === 1 && (
                <path d="M0,0 Q-5,-20 -20,-30 Q-15,-35 -5,-25 Q0,-40 5,-60 Q10,-60 10,-40 Q25,-35 35,-20 Q25,-15 15,-20 Q10,0 0,0" fill={c1} />
              )}
              {type === 2 && (
                <>
                  <circle cx="0" cy="-20" r="25" fill={c1} />
                  <circle cx="-15" cy="-40" r="15" fill={c2} />
                  <circle cx="20" cy="-35" r="20" fill={c2} />
                </>
              )}
            </g>
          )
        })}
        {/* sea floor mound */}
        <path d="M0,140 Q360,120 720,135 Q1080,150 1440,130 L1440,160 L0,160 Z" fill={d ? '#081420' : '#1a5a6a'} opacity={d ? .8 : .3} />
      </svg>

      {/* Seaweed */}
      {[6, 20, 40, 62, 82, 95].map((l, i) => (
        <div key={i} className="absolute bottom-0" style={{
          left: `${l}%`, width: '5px', height: `${50 + i * 14}px`, borderRadius: '3px',
          background: `linear-gradient(0deg, ${d ? 'rgba(30,100,60,.3)' : 'rgba(40,160,80,.4)'} 0%, ${d ? 'rgba(30,100,60,.1)' : 'rgba(40,160,80,.1)'} 100%)`,
          transformOrigin: 'bottom center', animation: `sway ${3.5 + i * .8}s ease-in-out infinite`, animationDelay: `-${i * .6}s`
        }} />
      ))}

      {/* Water surface shimmer */}
      <div className="absolute top-0 left-0 right-0" style={{
        height: '6%',
        background: d ? 'linear-gradient(180deg,rgba(60,140,200,.04) 0%,transparent 100%)' : 'linear-gradient(180deg,rgba(255,255,255,.12) 0%,transparent 100%)',
        animation: 'shimmer 5s ease-in-out infinite'
      }} />
    </>
  )
}

/* ════ TROPICS ════ */
function Tropics({ d }) {
  const bg = d
    ? 'linear-gradient(180deg,#061208 0%,#0d200e 25%,#132a14 50%,#0f220f 75%,#091509 100%)'
    : 'linear-gradient(180deg,#c8e6c9 0%,#81c784 20%,#4caf50 45%,#388e3c 70%,#2e7d32 100%)'
  return (
    <>
      <div className="absolute inset-0" style={{ background: bg }} />

      {/* Dappled canopy light */}
      {[15, 35, 55, 75, 90].map((l, i) => (
        <div key={i} className="absolute top-0" style={{
          left: `${l}%`, width: '3px', height: '50%',
          background: d ? 'linear-gradient(180deg,rgba(100,200,80,.05) 0%,transparent 100%)' : 'linear-gradient(180deg,rgba(255,255,180,.15) 0%,transparent 100%)',
          transform: `rotate(${(i - 2) * 5}deg)`, animation: `ray ${6 + i * 2}s ease-in-out infinite`, animationDelay: `-${i * 1.5}s`
        }} />
      ))}

      {/* Tree canopy top */}
      <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 300" preserveAspectRatio="none" style={{ height: '30%' }}>
        {[[-50, 250], [180, 280], [420, 240], [650, 270], [900, 250], [1150, 280], [1380, 260]].map(([cx, rx], i) => (
          <ellipse key={i} cx={cx} cy={-30 + i % 3 * 10} rx={rx} ry={200 + i % 3 * 20}
            fill={d ? `rgba(${10 + i * 3},${40 + i * 5},${10 + i * 3},.55)` : `rgba(${30 + i * 5},${120 + i * 10},${40 + i * 5},.22)`} />
        ))}
      </svg>

      {/* Falling Leaves */}
      {[10, 25, 45, 65, 80, 95].map((l, i) => (
        <div key={`leaf-${i}`} className="absolute" style={{
          left: `${l}%`, top: '-10%', opacity: d ? 0.3 : 0.6,
          animation: `leaf-fall ${12 + i * 2}s linear infinite`, animationDelay: `-${i * 3.5}s`
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={d ? '#4a7c4a' : '#81c784'}>
            <path d="M12 2C12 2 22 6 22 12C22 18 12 22 12 22C12 22 2 18 2 12C2 6 12 2 12 2Z" />
          </svg>
        </div>
      ))}

      {/* Tree trunks */}
      {[3, 15, 32, 50, 68, 82, 95].map((l, i) => (
        <div key={i} className="absolute bottom-0" style={{
          left: `${l}%`, width: `${6 + i % 3 * 3}px`, height: `${30 + i * 7}%`, borderRadius: '3px',
          background: d ? `rgba(30,20,8,.${35 + i % 3 * 5})` : `rgba(90,60,30,.${12 + i % 3 * 3})`
        }} />
      ))}

      {/* Ground foliage */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 140" preserveAspectRatio="none" style={{ height: '14%' }}>
        {[60, 200, 350, 500, 680, 850, 1020, 1200, 1380].map((x, i) => (
          <ellipse key={i} cx={x} cy={120} rx={100 + i % 3 * 20} ry={50 + i % 3 * 10}
            fill={d ? `rgba(15,${45 + i * 3},15,.45)` : `rgba(40,${130 + i * 8},50,.2)`} />
        ))}
        <rect x="0" y="125" width="1440" height="15" fill={d ? 'rgba(8,20,8,.5)' : 'rgba(50,90,40,.1)'} />
      </svg>

      {/* Swaying ferns */}
      {[10, 28, 46, 64, 80, 92].map((l, i) => (
        <div key={i} className="absolute" style={{
          left: `${l}%`, bottom: '10%', transformOrigin: 'bottom center',
          animation: `sway ${4 + i * .7}s ease-in-out infinite`, animationDelay: `-${i}s`
        }}>
          <svg width={22 + i * 3} height={45 + i * 6} viewBox="0 0 30 60" fill={d ? 'rgba(25,70,25,.3)' : 'rgba(50,150,50,.3)'}>
            <path d="M15 60 Q8 42 3 28 Q9 34 15 22 Q21 34 27 28 Q22 42 15 60Z" />
            <path d="M15 45 Q10 35 6 22 Q11 28 15 18 Q19 28 24 22 Q20 35 15 45Z" opacity=".6" />
          </svg>
        </div>
      ))}

      {/* Birds */}
      {[{ t: '10%', dur: 22, del: 0 }, { t: '6%', dur: 30, del: 8 }, { t: '15%', dur: 26, del: 16 }].map((b, i) => (
        <svg key={i} className="absolute left-0" style={{
          top: b.t, width: 20 + i * 5, height: 10 + i * 2, opacity: d ? .15 : .25,
          animation: `bird ${b.dur}s linear infinite`, animationDelay: `-${b.del}s`
        }} viewBox="0 0 30 15" fill="none" stroke={d ? '#8fbc8f' : '#1b5e20'} strokeWidth="1.5">
          <path d="M0,12 Q7,2 15,9 Q23,2 30,12" />
        </svg>
      ))}

      {/* Floating particles (pollen/fireflies) */}
      {[12, 28, 44, 58, 74, 88].map((l, i) => (
        <div key={i} className="absolute rounded-full" style={{
          left: `${l}%`, top: `${18 + i * 12}%`, width: '3px', height: '3px',
          background: d ? 'rgba(180,255,100,.12)' : 'rgba(200,240,100,.2)',
          boxShadow: d ? '0 0 4px rgba(180,255,100,.15)' : 'none',
          animation: `bob ${5 + i * 1.5}s ease-in-out infinite`, animationDelay: `-${i * 1.2}s`
        }} />
      ))}
    </>
  )
}

/* ════ DESERT ════ */
function Desert({ d }) {
  const bg = d
    ? 'linear-gradient(180deg,#120e08 0%,#1f1810 25%,#2a2015 50%,#1a1510 75%,#0f0c08 100%)'
    : 'linear-gradient(180deg,#fff8e1 0%,#ffecb3 15%,#ffe082 35%,#f5c542 55%,#e8b830 75%,#deb068 100%)'
  return (
    <>
      <div className="absolute inset-0" style={{ background: bg }} />

      {/* Sun with glow */}
      <div className="absolute" style={{
        top: '6%', right: '12%', width: '90px', height: '90px', borderRadius: '50%',
        background: d
          ? 'radial-gradient(circle,rgba(200,170,80,.12) 0%,rgba(200,170,80,.04) 40%,transparent 70%)'
          : 'radial-gradient(circle,rgba(255,240,120,.8) 0%,rgba(255,220,60,.4) 30%,rgba(255,200,40,.15) 60%,transparent 80%)',
        animation: 'pulse-glow 5s ease-in-out infinite'
      }} />
      {/* Sun halo */}
      {!d && <div className="absolute" style={{
        top: '2%', right: '8%', width: '160px', height: '160px', borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(255,230,100,.08) 0%,transparent 70%)'
      }} />}

      {/* Heat shimmer bands */}
      {[65, 55, 45].map((b, i) => (
        <div key={i} className="absolute left-0 right-0" style={{
          bottom: `${b}%`, height: '8%',
          background: d ? 'linear-gradient(0deg,transparent,rgba(180,140,60,.02),transparent)' : 'linear-gradient(0deg,transparent,rgba(255,200,50,.04),transparent)',
          animation: `shimmer ${3 + i}s ease-in-out infinite`, animationDelay: `-${i}s`
        }} />
      ))}

      {/* Blowing dead leaves */}
      {[15, 45, 75].map((l, i) => (
        <div key={`dleaf-${i}`} className="absolute left-0" style={{
          top: `${35 + i * 15}%`, opacity: d ? 0.3 : 0.6,
          animation: `dead-leaf-blow ${18 + i * 4}s linear infinite`, animationDelay: `-${i * 6}s`
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill={d ? '#5c4a3d' : '#8d6e63'}>
            <path d="M12 2C12 2 22 6 22 12C22 18 12 22 12 22C12 22 2 18 2 12C2 6 12 2 12 2Z" />
          </svg>
        </div>
      ))}

      {/* Dune layers */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 240" preserveAspectRatio="none" style={{ height: '26%' }}>
        <path d="M0,130 Q180,70 360,110 Q540,55 720,95 Q900,50 1080,85 Q1260,60 1440,110 L1440,240 L0,240Z"
          fill={d ? 'rgba(45,35,18,.45)' : 'rgba(220,185,130,.3)'} />
        <path d="M0,160 Q200,110 400,150 Q600,95 800,135 Q1000,90 1200,125 Q1350,100 1440,145 L1440,240 L0,240Z"
          fill={d ? 'rgba(55,42,22,.55)' : 'rgba(210,170,110,.35)'} />
        <path d="M0,185 Q150,155 300,175 Q500,140 700,170 Q900,145 1100,165 Q1300,150 1440,180 L1440,240 L0,240Z"
          fill={d ? 'rgba(65,50,28,.6)' : 'rgba(200,160,95,.38)'} />
        <rect x="0" y="215" width="1440" height="25" fill={d ? 'rgba(35,28,15,.5)' : 'rgba(190,150,85,.25)'} />
      </svg>

      {/* Cacti */}
      {[{ l: '8%', h: 70 }, { l: '25%', h: 50 }, { l: '55%', h: 65 }, { l: '75%', h: 45 }, { l: '90%', h: 55 }].map((c, i) => (
        <svg key={i} className="absolute" style={{
          left: c.l, bottom: '18%', width: c.h * .35, height: c.h, opacity: d ? .25 : .35
        }} viewBox="0 0 24 70" fill={d ? '#1a3a15' : '#4a7a35'}>
          <rect x="9" y="8" width="6" height="62" rx="3" />
          <rect x="0" y="20" width="9" height="4" rx="2" />
          <rect x="0" y="12" width="4" height="12" rx="2" />
          <rect x="15" y="28" width="9" height="4" rx="2" />
          <rect x="20" y="18" width="4" height="14" rx="2" />
        </svg>
      ))}

      {/* Tumbleweeds */}
      {[{ b: '19%', dur: 22, del: 3, sz: 22 }, { b: '21%', dur: 35, del: 16, sz: 16 }, { b: '17%', dur: 28, del: 25, sz: 12 }].map((tw, i) => (
        <div key={i} className="absolute left-0" style={{
          bottom: tw.b, opacity: d ? .12 : .22,
          animation: `drift ${tw.dur}s linear infinite`, animationDelay: `-${tw.del}s`
        }}>
          <svg width={tw.sz} height={tw.sz} viewBox="0 0 24 24" fill="none" stroke={d ? '#8a7a5a' : '#a08050'} strokeWidth="1">
            <circle cx="12" cy="12" r="9" />
            <path d="M7,5 Q12,12 7,19" /><path d="M17,5 Q12,12 17,19" />
            <path d="M5,7 Q12,12 19,7" /><path d="M5,17 Q12,12 19,17" />
          </svg>
        </div>
      ))}

      {/* Dust particles */}
      {[15, 30, 50, 65, 80, 92].map((l, i) => (
        <div key={i} className="absolute rounded-full" style={{
          left: `${l}%`, top: `${25 + i * 10}%`, width: '2px', height: '2px',
          background: d ? 'rgba(180,150,80,.08)' : 'rgba(255,210,100,.18)',
          animation: `bob ${6 + i * 1.8}s ease-in-out infinite`, animationDelay: `-${i * 1.5}s`
        }} />
      ))}
    </>
  )
}
