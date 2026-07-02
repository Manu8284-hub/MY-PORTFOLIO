import { useEffect, useState } from 'react';
import { Github, Linkedin, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Education', id: 'education' },
  { label: 'Profiles', id: 'coding-profiles' },
  { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking logic
      const scrollPosition = window.scrollY + 160; // offset for navbar height
      
      // Special case for hero/top of page
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
      const offset = 80; // height of fixed navbar
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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#hero"
            onClick={handleBrandClick}
            className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2 group"
          >
            <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm transition-transform duration-300 group-hover:scale-105">
              MS
            </span>
            <span className="hover:text-blue-600 transition-colors duration-300">
              MANU SHARMA
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-colors duration-300 rounded-lg ${
                  activeSection === item.id
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Socials & Avatar */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Manu8284-hub"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-blue-600 hover:scale-110 transition-all duration-300 hidden sm:inline-flex"
              aria-label="GitHub Profile"
            >
              <Github size={19} />
            </a>
            <a
              href="https://www.linkedin.com/in/manu-sharma-866372318/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-blue-600 hover:scale-110 transition-all duration-300 hidden sm:inline-flex"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={19} />
            </a>
            
            {/* Enlarged Avatar Toggle */}
            <button
              type="button"
              onClick={() => setIsPhotoOpen(true)}
              className="w-9 h-9 rounded-full border border-slate-200 bg-white overflow-hidden flex items-center justify-center cursor-pointer hover:scale-105 hover:border-blue-600 transition-all duration-300 relative group shadow-sm"
              aria-label="Open profile photo"
            >
              <img
                src="/2410990448.jpg"
                alt="Manu Sharma"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors duration-300"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bg-white/95 backdrop-blur-xl z-40 border-b border-slate-200 p-6 flex flex-col gap-4 shadow-xl lg:hidden"
          >
            <div className="grid grid-cols-2 gap-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold tracking-wide uppercase transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            <div className="flex justify-center gap-6 pt-4 border-t border-slate-100">
              <a
                href="https://github.com/Manu8284-hub"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors"
              >
                <Github size={18} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/manu-sharma-866372318/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
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
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsPhotoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-sm md:max-w-md bg-white rounded-3xl p-3 border border-slate-100 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsPhotoOpen(false)}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-slate-800 hover:text-red-500 rounded-full p-2 border border-slate-200/50 shadow-md transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <img
                src="/2410990448.jpg"
                alt="Manu Sharma enlarged portrait"
                className="w-full max-w-full rounded-2xl object-cover aspect-square shadow-inner"
              />
              <div className="p-4 text-center">
                <h4 className="font-bold text-lg text-slate-900">Manu Sharma</h4>
                <p className="text-sm text-slate-500">B.E. CSE Student | MERN Stack Developer</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;