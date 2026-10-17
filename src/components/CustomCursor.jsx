import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor & Cursor Spotlight
 * Soft neon radial glow follows mouse, plus dot and ring.
 * Becomes "VIEW" over project cards.
 * Desktop only (disabled on touch / coarse pointer or reduced motion).
 */
const CustomCursor = () => {
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'hover' | 'project'
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for outer ring lag effect
  const springConfig = { damping: 26, stiffness: 320, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const projectCard = target.closest('[data-cursor="project"]') || target.closest('.project-card');
      if (projectCard) {
        setCursorType('project');
        return;
      }

      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        (target.getAttribute && target.getAttribute('role') === 'button') ||
        (target.classList && target.classList.contains('cursor-pointer'))
      ) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isEnabled) {
    return null;
  }

  const isProject = cursorType === 'project';
  const isHovered = cursorType === 'hover' || isProject;

  return (
    <>
      {/* Soft Neon Radial Spotlight that illuminates content */}
      <motion.div
        className="fixed top-0 left-0 w-[450px] h-[450px] rounded-full pointer-events-none z-[9990] mix-blend-screen opacity-20"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(0, 255, 156, 0.35) 0%, rgba(0, 217, 255, 0.15) 35%, transparent 70%)',
        }}
        animate={{
          opacity: isVisible ? (isProject ? 0.3 : 0.2) : 0,
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Outer Lagging Ring / Morphing "VIEW" HUD */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[10000] flex items-center justify-center font-mono font-bold select-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isProject ? 56 : (isHovered ? 40 : 28),
          height: isProject ? 56 : (isHovered ? 40 : 28),
          backgroundColor: isProject
            ? 'rgba(0, 255, 156, 0.15)'
            : (isHovered ? 'rgba(0, 255, 156, 0.08)' : 'rgba(0, 0, 0, 0)'),
          borderColor: isProject ? '#00FF9C' : (isHovered ? '#00D9FF' : 'rgba(0, 255, 156, 0.6)'),
          boxShadow: isProject ? '0 0 15px rgba(0, 255, 156, 0.4)' : 'none',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
      >
        {isProject && (
          <span className="text-[10px] tracking-widest text-[#00FF9C] font-extrabold animate-pulse">
            VIEW
          </span>
        )}
      </motion.div>

      {/* Real-time Inner Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isProject ? '#00FF9C' : '#00FF9C',
          boxShadow: '0 0 8px #00FF9C',
        }}
        animate={{
          scale: isProject ? 0 : (isHovered ? 0.4 : 1),
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'tween', duration: 0.1 }}
      />
    </>
  );
};

export default CustomCursor;
