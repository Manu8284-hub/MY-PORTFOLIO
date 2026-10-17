import { useEffect, useRef } from 'react';

const CHARS = '01MANUSHARMACHITKARAMERNSTACKREACTNODEEXPRESSMONGODB0123456789$#@%&*';

export default function MatrixRain({ onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = new Array(columns).fill(1);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const render = () => {
      ctx.fillStyle = 'rgba(5, 6, 10, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00FF9C';
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = CHARS.charAt(Math.floor(Math.random() * CHARS.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Trigger complete after 5 seconds
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 5000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[10001] pointer-events-none select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded bg-[#0B0F17]/90 border border-[#00FF9C] shadow-[0_0_20px_#00FF9C] text-[#00FF9C] font-mono text-xs font-bold animate-pulse text-center">
        [ KONAMI OVERRIDE: MATRIX RAIN PROTOCOL ACTIVE (5s) ]
      </div>
    </div>
  );
}
