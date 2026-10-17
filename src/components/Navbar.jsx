import { useEffect, useState } from 'react';
import { Github, Linkedin, Menu, X, Sun, Moon, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { socialLinks } from '../data/portfolioData';

const navItems = [
  { label: 'ABOUT', num: '01', id: 'about' },
  { label: 'SKILLS', num: '02', id: 'skills' },
  { label: 'PROJECTS', num: '03', id: 'projects' },
  { label: 'EDUCATION', num: '04', id: 'education' },
  { label: 'PROFILES', num: '05', id: 'coding-profiles' },
  { label: 'GUESTBOOK', num: '06', id: 'guestbook' },
  { label: 'CONTACT', num: '07', id: 'contact' },
];

const Navbar = ({ onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 160;
      if (window.scrollY < 100) {
        setActiveSection('hero');
        return;
      }

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setActiveSection('hero');
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 font-mono ${
          isScrolled
            ? 'glass-nav py-3 border-b border-[#1B2433] shadow-[0_4px_25px_rgba(0,0,0,0.6)]'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo with Glitch Effect */}
          <a
            href="#hero"
            onClick={handleBrandClick}
            className="text-base sm:text-lg font-bold tracking-tight text-[#D6E2F0] flex items-center gap-2 group"
          >
            <span className="w-8 h-8 rounded border border-[#00FF9C] bg-[#0B0F17] flex items-center justify-center text-[#00FF9C] font-extrabold text-xs shadow-[0_0_10px_rgba(0,255,156,0.3)] transition-transform duration-300 group-hover:scale-105">
              MS_
            </span>
            <span
              className="cyber-glitch hover:text-[#00FF9C] transition-colors font-bold tracking-wider"
              data-text="MANU SHARMA"
            >
              MANU SHARMA
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 rounded ${
                    isActive
                      ? 'text-[#00FF9C] font-bold bg-[#00FF9C]/10 border border-[#00FF9C]/40 shadow-[0_0_12px_rgba(0,255,156,0.15)]'
                      : 'text-[#6B7A90] hover:text-[#D6E2F0] hover:bg-[#0B0F17]'
                  }`}
                >
                  <span className="text-[10px] text-[#6B7A90] mr-1.5 opacity-70">
                    {item.num}
                  </span>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-2 right-2 h-[2px] bg-[#00FF9C] shadow-[0_0_8px_#00FF9C]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Actions & Utilities */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Terminal CLI Launcher */}
            {onOpenTerminal && (
              <button
                type="button"
                onClick={onOpenTerminal}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-semibold text-[#00FF9C] bg-[#0B0F17] hover:bg-[#00FF9C]/10 rounded border border-[#00FF9C]/40 transition-all duration-200 cursor-pointer shadow-[0_0_10px_rgba(0,255,156,0.15)] hover:shadow-[0_0_15px_rgba(0,255,156,0.3)]"
                title="Launch Terminal CLI Mode (`)"
                aria-label="Launch Terminal CLI"
              >
                <Terminal size={13} className="text-[#00FF9C]" />
                <span>&gt; CLI</span>
              </button>
            )}

            {/* Dark / Light Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-[#6B7A90] hover:text-[#00FF9C] hover:bg-[#0B0F17] rounded border border-transparent hover:border-[#1B2433] transition-all duration-200 cursor-pointer"
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {isDark ? <Sun size={17} className="text-[#00FF9C]" /> : <Moon size={17} />}
            </button>

            {/* Social Icons */}
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-[#6B7A90] hover:text-[#00FF9C] hover:scale-110 transition-all duration-200 hidden sm:inline-flex"
              aria-label="GitHub Profile"
            >
              <Github size={17} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-[#6B7A90] hover:text-[#00D9FF] hover:scale-110 transition-all duration-200 hidden sm:inline-flex"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={17} />
            </a>

            {/* Enlarged Avatar Toggle */}
            <button
              type="button"
              onClick={() => setIsPhotoOpen(true)}
              className="w-8 h-8 rounded border border-[#00FF9C]/50 bg-[#0B0F17] overflow-hidden flex items-center justify-center cursor-pointer hover:scale-105 hover:border-[#00FF9C] transition-all duration-300 relative group shadow-[0_0_10px_rgba(0,255,156,0.2)]"
              aria-label="Open profile photo"
            >
              <img
                src="/2410990448.jpg"
                alt="Manu Sharma"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#00FF9C]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#6B7A90] hover:text-[#00FF9C] transition-colors duration-200 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bg-[#0B0F17]/95 backdrop-blur-xl z-40 border-b border-[#1B2433] p-6 flex flex-col gap-4 shadow-2xl lg:hidden font-mono"
          >
            <div className="grid grid-cols-2 gap-2.5">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`flex items-center justify-center py-2.5 px-3 rounded text-xs font-mono tracking-wider uppercase transition-colors border ${
                    activeSection === item.id
                      ? 'bg-[#00FF9C]/10 border-[#00FF9C] text-[#00FF9C] font-bold shadow-[0_0_10px_rgba(0,255,156,0.2)]'
                      : 'border-[#1B2433] text-[#6B7A90] hover:text-[#D6E2F0] hover:bg-[#111723]'
                  }`}
                >
                  <span className="text-[10px] opacity-60 mr-1.5">{item.num}</span>
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#1B2433]">
              {onOpenTerminal && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="flex items-center gap-2 text-xs font-mono font-bold text-[#00FF9C] bg-[#00FF9C]/10 border border-[#00FF9C]/40 px-3 py-2 rounded"
                >
                  <Terminal size={14} /> &gt; Terminal CLI
                </button>
              )}
              <div className="flex gap-4">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#6B7A90] hover:text-[#00FF9C] text-xs transition-colors flex items-center gap-1.5"
                >
                  <Github size={15} /> GitHub
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#6B7A90] hover:text-[#00D9FF] text-xs transition-colors flex items-center gap-1.5"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Photo Zoom Modal */}
      <AnimatePresence>
        {isPhotoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-mono"
            onClick={() => setIsPhotoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-sm md:max-w-md bg-[#0B0F17] rounded-lg p-4 border border-[#00FF9C] shadow-[0_0_35px_rgba(0,255,156,0.25)] cyber-bracket"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsPhotoOpen(false)}
                className="absolute top-4 right-4 bg-[#1B2433] text-[#6B7A90] hover:text-[#00FF9C] rounded p-1.5 border border-[#1B2433] hover:border-[#00FF9C] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={16} />
              </button>
              <img
                src="/2410990448.jpg"
                alt="Manu Sharma enlarged portrait"
                className="w-full max-w-full rounded object-cover aspect-square border border-[#1B2433]"
              />
              <div className="pt-4 text-center">
                <div className="text-xs text-[#00FF9C] mb-1">// IDENTIFIED: AUTHORIZED_OPERATOR</div>
                <h4 className="font-bold text-lg text-[#D6E2F0]">MANU SHARMA</h4>
                <p className="text-xs text-[#6B7A90] mt-1">B.E. CSE Student | MERN Stack Developer</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;