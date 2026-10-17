import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BootSequence from './components/BootSequence';
import CyberOverlays from './components/CyberOverlays';
import MarqueeBands from './components/MarqueeBands';
import NowWidget from './components/NowWidget';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import CodingProfiles from './components/CodingProfiles';
import BlogSection from './components/BlogSection';
import Guestbook from './components/Guestbook';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import TerminalModal from './components/TerminalModal';
import CommandPalette from './components/CommandPalette';
import AiChatWidget from './components/AiChatWidget';
import MatrixRain from './components/MatrixRain';

// Konami Code Sequence: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [konamiUnlocked, setKonamiUnlocked] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Global Keyboard shortcuts: Ctrl/Cmd+K for Command Palette & Konami Code
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Command Palette Shortcut
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // 2. Terminal shortcut with backtick (`)
      if (e.key === '`' && !isCommandPaletteOpen && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
        return;
      }

      // 3. Konami Code Sequence Matching
      const expectedKey = KONAMI_SEQUENCE[konamiIndex];
      const pressedKey = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      if (pressedKey === expectedKey?.toLowerCase()) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === KONAMI_SEQUENCE.length) {
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 }
          });
          setKonamiUnlocked(true);
          setKonamiIndex(0);
          setTimeout(() => setKonamiUnlocked(false), 6000);
        } else {
          setKonamiIndex(nextIndex);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex, isCommandPaletteOpen]);

  return (
    <div className="bg-[#05060A] text-[#D6E2F0] font-mono min-h-screen antialiased selection:bg-[#00FF9C] selection:text-black transition-colors duration-300">
      <CyberOverlays />
      <ScrollProgress />
      <CustomCursor />
      
      {/* Boot Sequence Intro (<2s, skippable) */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <BootSequence key="boot" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

          <main>
            <Hero />

            {/* Cyberpunk Bidirectional Infinite Marquee Strips */}
            <MarqueeBands />

            {/* Live Now Activity Strip */}
            <section className="max-w-7xl mx-auto px-6 -mt-2 mb-12 relative z-20">
              <NowWidget />
            </section>

            <About />
            <Skills />
            <Projects />
            <Education />
            <CodingProfiles />
            <BlogSection />
            <Guestbook />
            <Contact />
          </main>

          <Footer />

          {/* Interactive Modals & Floating Widgets */}
          <TerminalModal
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
          />

          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />

          <AiChatWidget />

          {/* Konami Easter Egg Notification Banner & Matrix Rain for 5 seconds */}
          <AnimatePresence>
            {konamiUnlocked && (
              <>
                <MatrixRain onComplete={() => setKonamiUnlocked(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0.9 }}
                  className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[10002] px-6 py-4 rounded bg-[#0B0F17] border border-[#00FF9C] shadow-[0_0_25px_rgba(0,255,156,0.6)] text-[#D6E2F0] font-mono text-center flex items-center gap-3"
                >
                  <span className="text-2xl text-[#00FF9C]">⚡</span>
                  <div className="text-left">
                    <p className="font-black text-[#00FF9C] text-sm">&gt; OVERCLOCK_PROTOCOL_ENGAGED</p>
                    <p className="text-xs text-[#6B7A90]">Manu Sharma: Full Stack Power Level Over 9000!</p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export default App;