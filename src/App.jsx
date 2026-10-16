import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import TerminalModal from './components/TerminalModal';
import CommandPalette from './components/CommandPalette';
import AiChatWidget from './components/AiChatWidget';

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

  // Global Keyboard shortcuts: Ctrl/Cmd+K for Command Palette & Konami Code
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Command Palette Shortcut
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // 2. Konami Code Sequence Matching
      const expectedKey = KONAMI_SEQUENCE[konamiIndex];
      const pressedKey = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      if (pressedKey === expectedKey.toLowerCase()) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === KONAMI_SEQUENCE.length) {
          // Trigger Easter egg!
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
  }, [konamiIndex]);

  return (
    <div className="bg-slate-50 dark:bg-[#0b0f19] min-h-screen text-slate-800 dark:text-slate-100 antialiased selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <ScrollProgress />
      <CustomCursor />
      
      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

          <main>
            <Hero />

            {/* Live Now Activity Strip */}
            <section className="max-w-7xl mx-auto px-6 -mt-6 sm:-mt-8 mb-12 relative z-20">
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

          {/* Konami Easter Egg Notification Banner */}
          <AnimatePresence>
            {konamiUnlocked && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl bg-slate-900 border border-blue-500 shadow-2xl text-white font-mono text-center flex items-center gap-3"
              >
                <span className="text-2xl">🎮</span>
                <div className="text-left">
                  <p className="font-black text-amber-400 text-sm">KONAMI CODE UNLOCKED!</p>
                  <p className="text-xs text-slate-300">Manu Sharma: +100 Developer Level, Infinite Stamina Activated!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export default App;