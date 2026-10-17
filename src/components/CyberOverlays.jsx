import { useState, useEffect } from 'react';

/**
 * CyberOverlays
 * Renders fixed CRT scanline lines and film grain overlays.
 * Automatically respects prefers-reduced-motion and checks for touch/low-power devices.
 */
export default function CyberOverlays() {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setShouldRender(false);
      return;
    }

    // Touch device detection to save GPU performance on mobile
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch && window.innerWidth < 768) {
      // Keep scanlines extremely light or disable grain
      // Scanlines are lightweight CSS gradients
    }

    const handler = (e) => {
      if (e.matches) setShouldRender(false);
      else setShouldRender(true);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden select-none" aria-hidden="true">
      {/* Scanline CRT overlay */}
      <div className="absolute inset-0 cyber-scanlines opacity-40" />

      {/* Subtle animated film grain */}
      <div className="absolute inset-0 cyber-grain opacity-30 mix-blend-overlay hidden sm:block" />

      {/* Ambient Vignette for Hacker Terminal Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.65)_100%)]" />
    </div>
  );
}
