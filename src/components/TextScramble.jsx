import { useState, useEffect, useRef, useCallback } from 'react';

const DEFAULT_CHARS = '!<>-_\\/[]{}—=+*^?#@01';

/**
 * TextScramble
 * Cyberpunk hacker text scramble effect that resolves into target text.
 * Triggers when scrolling into viewport and on mouse hover.
 * Accessible: maintains real text in aria-label, respects prefers-reduced-motion.
 */
export default function TextScramble({
  text = '',
  as: Component = 'span',
  className = '',
  scrambleOnHover = true,
  triggerOnView = true,
  speed = 30,
  characters = DEFAULT_CHARS,
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const elementRef = useRef(null);
  const intervalRef = useRef(null);
  const hasAnimatedOnView = useRef(false);

  const startScramble = useCallback(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(text);
      return;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);

    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = text.length;

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayText(text);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, speed);
  }, [text, characters, speed]);

  // Viewport trigger
  useEffect(() => {
    if (!triggerOnView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedOnView.current) {
            hasAnimatedOnView.current = true;
            startScramble();
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentElem = elementRef.current;
    if (currentElem) observer.observe(currentElem);

    return () => {
      if (currentElem) observer.unobserve(currentElem);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [triggerOnView, startScramble]);

  const handleMouseEnter = () => {
    if (scrambleOnHover && !isScrambling) {
      startScramble();
    }
  };

  return (
    <Component
      ref={elementRef}
      className={`font-mono inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      aria-label={text}
      {...props}
    >
      <span aria-hidden="true">{displayText}</span>
    </Component>
  );
}
