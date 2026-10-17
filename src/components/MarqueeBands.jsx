import { useState, useEffect, useRef } from 'react';

const ITEMS_ROW_1 = [
  'MERN STACK DEVELOPER',
  'REACT.JS 19',
  'NODE.JS',
  'EXPRESS.JS',
  'MONGODB',
  'POSTGRESQL',
  'OPEN TO WORK',
  'TAILWIND CSS',
  'REST APIS'
];

const ITEMS_ROW_2 = [
  'CHITKARA UNIVERSITY',
  'FITBOT AI',
  'CAMPUS CONNECT HUB',
  'SECURE AUTH SYSTEM',
  'HARDWARE IOT',
  'CLEAN ARCHITECTURE',
  'FULL STACK SYSTEMS',
  'PROBLEM SOLVER'
];

export default function MarqueeBands() {
  const [scrollDirection, setScrollDirection] = useState('forward');
  const [velocity, setVelocity] = useState(1);
  const lastScrollY = useRef(0);
  const velocityTimeout = useRef(null);

  useEffect(() => {
    // If reduced motion is preferred, don't listen to scroll speed
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (delta > 0) {
        setScrollDirection('forward');
      } else if (delta < 0) {
        setScrollDirection('backward');
      }

      const speed = Math.min(Math.max(Math.abs(delta) / 12, 1), 3.5);
      setVelocity(speed);

      clearTimeout(velocityTimeout.current);
      velocityTimeout.current = setTimeout(() => {
        setVelocity(1);
      }, 150);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(velocityTimeout.current);
    };
  }, []);

  const animationDuration1 = Math.max(28 / velocity, 8);
  const animationDuration2 = Math.max(34 / velocity, 9);
  const isReverse1 = scrollDirection === 'backward';
  const isReverse2 = scrollDirection === 'forward';

  return (
    <div className="w-full overflow-hidden py-10 my-8 space-y-3 bg-[#05060A]/90 border-y border-[#1B2433] select-none">
      {/* Strip 1 */}
      <div className="relative w-full overflow-hidden group">
        <div
          className="flex whitespace-nowrap gap-8 items-center group-hover:[animation-play-state:paused]"
          style={{
            display: 'flex',
            width: 'max-content',
            animation: `marqueeLeft ${animationDuration1}s linear infinite`,
            animationDirection: isReverse1 ? 'reverse' : 'normal'
          }}
        >
          {[...ITEMS_ROW_1, ...ITEMS_ROW_1, ...ITEMS_ROW_1].map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-4 text-xs sm:text-sm font-mono tracking-widest text-[#D6E2F0] hover:text-[#00FF9C] transition-colors"
            >
              <span className="text-[#00FF9C] font-black">//</span>
              <span className="font-bold">{item}</span>
              <span className="text-[#FF2BD6]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Strip 2 */}
      <div className="relative w-full overflow-hidden group">
        <div
          className="flex whitespace-nowrap gap-8 items-center group-hover:[animation-play-state:paused]"
          style={{
            display: 'flex',
            width: 'max-content',
            animation: `marqueeRight ${animationDuration2}s linear infinite`,
            animationDirection: isReverse2 ? 'reverse' : 'normal'
          }}
        >
          {[...ITEMS_ROW_2, ...ITEMS_ROW_2, ...ITEMS_ROW_2].map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-4 text-xs sm:text-sm font-mono tracking-widest text-[#6B7A90] hover:text-[#00D9FF] transition-colors"
            >
              <span className="text-[#00D9FF] font-black">&gt;&gt;</span>
              <span className="font-semibold">{item}</span>
              <span className="text-[#00FF9C]">■</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .group > div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
