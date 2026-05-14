import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import useStore from '../../store/useStore';

/**
 * AntiGravityLab - Grade 11-12 Physics: Gravity & Mass
 * Features a 2D physics sandbox using Matter.js.
 */
const AntiGravityLab = ({ onQuestComplete }) => {
  const sceneRef = useRef(null);
  const engineRef = useRef(Matter.Engine.create());
  const [gravity, setGravity] = useState(1.0);
  const [isSolved, setIsSolved] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const engine = engineRef.current;
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 320,
        height: 320,
        wireframes: false,
        background: '#F4F7F6',
      },
    });

    // Boundaries
    const ground = Matter.Bodies.rectangle(160, 315, 320, 10, { 
      isStatic: true, 
      render: { fillStyle: '#E8E5DF' } 
    });
    const ceiling = Matter.Bodies.rectangle(160, 5, 320, 10, { 
      isStatic: true, 
      label: 'ceiling',
      render: { fillStyle: '#81E6D9', opacity: 0.2 } 
    });
    const leftWall = Matter.Bodies.rectangle(5, 160, 10, 320, { isStatic: true, render: { visible: false } });
    const rightWall = Matter.Bodies.rectangle(315, 160, 10, 320, { isStatic: true, render: { visible: false } });

    // Interactive Shapes
    const box = Matter.Bodies.rectangle(100, 200, 40, 40, { 
      render: { fillStyle: '#B2D8E8' },
      restitution: 0.5
    });
    const circle = Matter.Bodies.circle(160, 200, 20, { 
      render: { fillStyle: '#81E6D9' },
      restitution: 0.5
    });
    const triangle = Matter.Bodies.polygon(220, 200, 3, 25, { 
      render: { fillStyle: '#F6AD55' },
      restitution: 0.5
    });

    const shapes = [box, circle, triangle];

    Matter.Composite.add(engine.world, [ground, ceiling, leftWall, rightWall, ...shapes]);

    // Runner
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Collision Detection for solving
    const checkWin = () => {
      const allAtTop = shapes.every(shape => shape.position.y < 60);
      if (allAtTop && !isSolved) {
        setIsSolved(true);
        const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
        if (onQuestComplete) {
          onQuestComplete({ timeSpent, interactionCount, energyLevel: 'High Brain Power' });
        }
      }
    };

    Matter.Events.on(engine, 'afterUpdate', checkWin);

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.Composite.clear(engine.world);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  // Sync gravity slider
  useEffect(() => {
    engineRef.current.world.gravity.y = gravity;
  }, [gravity]);

  const handleGravityChange = (val) => {
    setInteractionCount(prev => prev + 1);
    setGravity(val);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#FDFBF7] rounded-3xl w-full max-w-md mx-auto shadow-sm border border-[#E8E5DF] animate-fade-in">
      {/* Header */}
      <div className="mb-4 text-center">
        <h2 className="text-[10px] font-black tracking-[0.2em] text-[#718096] uppercase mb-1">Physics & Mass Lab</h2>
        <p className="text-sm font-bold text-[#4A5568]">Reach the Target Zone!</p>
      </div>

      {/* Target Zone Indicator */}
      <div className="w-full bg-[#81E6D9]/20 py-2 rounded-t-xl text-center border-x-2 border-t-2 border-[#81E6D9]/40">
        <span className="text-[8px] font-black tracking-widest text-[#4A5568] uppercase">Target Zone</span>
      </div>

      {/* Matter.js Canvas Container */}
      <div 
        ref={sceneRef} 
        className="w-full aspect-square bg-[#F4F7F6] border-x-2 border-b-2 border-[#E8E5DF] rounded-b-2xl overflow-hidden shadow-inner mb-6"
      />

      {/* Gravity Slider */}
      <div className="w-full space-y-4 mb-6 px-4">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black tracking-widest text-[#718096] uppercase">Gravity Force</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#4A5568]">{gravity.toFixed(1)} G</span>
          </div>
        </div>
        <input 
          type="range" 
          min="-1.0" 
          max="1.0" 
          step="0.1"
          value={gravity}
          onChange={(e) => handleGravityChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-[#E8E5DF] rounded-lg appearance-none cursor-pointer accent-[#4A5568]"
        />
        <div className="flex justify-between text-[8px] font-bold text-[#A0AEC0] uppercase">
          <span>Anti-Gravity</span>
          <span>Earth Gravity</span>
        </div>
      </div>

      {/* Rek Mascot coaching */}
      <div className="flex items-center gap-4 w-full bg-[#F4F7F6] p-4 rounded-2xl border border-[#E8E5DF]">
        <div className="text-3xl animate-bounce">
          {isSolved ? '🚀' : '⚖️'}
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold tracking-wide text-[#4A5568] leading-relaxed">
            {isSolved 
              ? "Zero G achieved! All objects have reached the target zone." 
              : "What happens if gravity pulls UP instead of DOWN? Adjust the slider to find out!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AntiGravityLab;
