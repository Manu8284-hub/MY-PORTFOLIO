import { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';

const SKILLS = [
  { name: 'React.js 19', color: '#00FF9C', fill: '#0B0F17' },
  { name: 'Node.js', color: '#00FF9C', fill: '#0B0F17' },
  { name: 'Express.js', color: '#D6E2F0', fill: '#0B0F17' },
  { name: 'MongoDB', color: '#00FF9C', fill: '#0B0F17' },
  { name: 'PostgreSQL', color: '#00D9FF', fill: '#0B0F17' },
  { name: 'JavaScript ES6+', color: '#FF2BD6', fill: '#0B0F17' },
  { name: 'Tailwind CSS', color: '#00D9FF', fill: '#0B0F17' },
  { name: 'Framer Motion', color: '#FF2BD6', fill: '#0B0F17' },
  { name: 'REST APIs', color: '#00D9FF', fill: '#0B0F17' },
  { name: 'JWT Auth', color: '#FF2BD6', fill: '#0B0F17' },
  { name: 'Git & GitHub', color: '#00FF9C', fill: '#0B0F17' },
  { name: 'Java & DSA', color: '#00D9FF', fill: '#0B0F17' }
];

export default function PhysicsSkills() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const bodiesRef = useRef([]);
  const [isLowPowerOrReduced, setIsLowPowerOrReduced] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const resetTriggerRef = useRef(0);

  // Check reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsLowPowerOrReduced(true);
    }
  }, []);

  // Lazy-load Matter.js and initialize Physics Sandbox
  useEffect(() => {
    if (isLowPowerOrReduced) return;

    let isMounted = true;
    let Matter = null;

    const initPhysics = async () => {
      try {
        const matterModule = await import('matter-js');
        Matter = matterModule.default || matterModule;

        if (!isMounted || !canvasRef.current || !containerRef.current) return;

        const { Engine, World, Bodies, Mouse, MouseConstraint, Runner } = Matter;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = 440;

        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Create Engine & World
        const engine = Engine.create({
          gravity: { x: 0, y: 0.9, scale: 0.001 }
        });
        engineRef.current = engine;
        const world = engine.world;

        // Boundaries (Floor, Ceiling, Walls)
        const wallThickness = 60;
        const ground = Bodies.rectangle(width / 2, height + wallThickness / 2 - 2, width * 2, wallThickness, {
          isStatic: true,
          render: { visible: false }
        });
        const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
          isStatic: true,
          render: { visible: false }
        });
        const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, {
          isStatic: true,
          render: { visible: false }
        });
        const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2 - 100, width * 2, wallThickness, {
          isStatic: true,
          render: { visible: false }
        });

        World.add(world, [ground, leftWall, rightWall, ceiling]);

        // Spawn skill badge bodies
        const badgeBodies = SKILLS.map((skill, index) => {
          const badgeWidth = Math.min(Math.max(skill.name.length * 10 + 26, 110), 160);
          const badgeHeight = 42;
          const startX = (width / (SKILLS.length + 1)) * (index + 1) + (Math.random() * 30 - 15);
          const startY = -40 - index * 35;

          const body = Bodies.rectangle(startX, startY, badgeWidth, badgeHeight, {
            chamfer: { radius: 6 },
            restitution: 0.65, // Bouncy
            friction: 0.15,
            density: 0.002,
            label: skill.name,
            customData: {
              ...skill,
              width: badgeWidth,
              height: badgeHeight
            }
          });

          return body;
        });

        bodiesRef.current = badgeBodies;
        World.add(world, badgeBodies);

        // Mouse Constraint for dragging and throwing badges
        const mouse = Mouse.create(canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
          mouse,
          constraint: {
            stiffness: 0.2,
            render: { visible: false }
          }
        });
        World.add(world, mouseConstraint);

        // Start Matter Runner
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);
        setIsReady(true);

        // Custom Render Loop with Cyberpunk Badges
        let animationFrameId;
        const renderLoop = () => {
          ctx.clearRect(0, 0, width, height);

          // Draw Canvas Grid Background
          ctx.strokeStyle = 'rgba(27, 36, 51, 0.4)';
          ctx.lineWidth = 1;
          const gridSize = 30;
          for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
          }
          for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
          }

          // Draw Physics Bodies
          badgeBodies.forEach((body) => {
            const { position, angle, customData } = body;
            const { width: bw, height: bh, name, color, fill } = customData;

            ctx.save();
            ctx.translate(position.x, position.y);
            ctx.rotate(angle);

            // Card Background
            ctx.fillStyle = fill;
            ctx.beginPath();
            ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 6);
            ctx.fill();

            // Card Neon Border
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            ctx.shadowColor = color;
            ctx.shadowBlur = 8;
            ctx.stroke();

            // Reset shadow for text
            ctx.shadowBlur = 0;

            // Corner Accents
            ctx.fillStyle = color;
            ctx.fillRect(-bw / 2 + 2, -bh / 2 + 2, 3, 3);
            ctx.fillRect(bw / 2 - 5, bh / 2 - 5, 3, 3);

            // Label
            ctx.fillStyle = '#D6E2F0';
            ctx.font = 'bold 12px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(name, 0, 1);

            ctx.restore();
          });

          animationFrameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();

        return () => {
          cancelAnimationFrame(animationFrameId);
          if (runner) Runner.stop(runner);
          if (engine) World.clear(world);
        };
      } catch (err) {
        console.error('Failed to initialize physics skills playground:', err);
        setIsLowPowerOrReduced(true);
      }
    };

    const cleanup = initPhysics();
    return () => {
      isMounted = false;
      cleanup.then((fn) => fn && fn());
    };
  }, [isLowPowerOrReduced, resetTriggerRef.current]);

  const handleReset = () => {
    if (!engineRef.current || !bodiesRef.current.length) return;
    const container = containerRef.current;
    if (!container) return;
    const width = container.clientWidth;

    bodiesRef.current.forEach((body, idx) => {
      import('matter-js').then((module) => {
        const Matter = module.default || module;
        const startX = (width / (SKILLS.length + 1)) * (idx + 1) + (Math.random() * 20 - 10);
        const startY = -40 - idx * 30;
        Matter.Body.setPosition(body, { x: startX, y: startY });
        Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: 1 });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
      });
    });
  };

  return (
    <div className="w-full">
      {/* Top Controls / HUD */}
      <div className="flex items-center justify-between mb-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#00FF9C]">
          <span className="w-2 h-2 rounded-full bg-[#00FF9C] animate-pulse" />
          <span>// GRAVITY SIMULATION: 9.8 m/s² [DRAG &amp; THROW BADGES]</span>
        </div>

        {!isLowPowerOrReduced && (
          <button
            type="button"
            onClick={handleReset}
            className="cyber-bracket flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B0F17] hover:bg-[#111723] text-[#D6E2F0] hover:text-[#00FF9C] border border-[#1B2433] hover:border-[#00FF9C] transition-colors cursor-pointer text-xs"
            title="Reset Physics Simulation"
          >
            <RotateCcw size={12} />
            <span>[ RESET ]</span>
          </button>
        )}
      </div>

      {/* Physics Canvas Area / Accessible Grid Fallback */}
      <div
        ref={containerRef}
        className="cyber-bracket relative w-full h-[440px] bg-[#05060A] rounded-lg border border-[#1B2433] overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]"
      >
        {!isLowPowerOrReduced ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full block cursor-grab active:cursor-grabbing select-none"
          />
        ) : (
          /* Neat Static Grid Fallback */
          <div className="p-8 h-full flex flex-wrap gap-3 items-center justify-center content-center">
            {SKILLS.map((skill) => (
              <div
                key={skill.name}
                className="px-4 py-2.5 rounded bg-[#0B0F17] border border-[#1B2433] hover:border-[#00FF9C] text-[#D6E2F0] font-mono text-xs font-bold shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-colors"
                style={{ borderColor: skill.color }}
              >
                {skill.name}
              </div>
            ))}
          </div>
        )}

        {/* Ambient Scanline overlay inside sandbox */}
        <div className="absolute inset-0 cyber-scanlines opacity-20 pointer-events-none" />
      </div>
    </div>
  );
}
