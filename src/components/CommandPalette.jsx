import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, Moon, Sun, Download, ExternalLink, Hash, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { personalInfo, socialLinks } from '../data/portfolioData';

const CommandPalette = ({ isOpen, onClose, onOpenTerminal }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const { isDark, toggleTheme } = useTheme();

  const commands = [
    {
      id: 'section-about',
      label: 'Jump to About Me',
      category: 'Navigation',
      icon: Hash,
      action: () => scrollToSection('about')
    },
    {
      id: 'section-skills',
      label: 'Jump to Skills & Toolkit',
      category: 'Navigation',
      icon: Hash,
      action: () => scrollToSection('skills')
    },
    {
      id: 'section-projects',
      label: 'Jump to Projects',
      category: 'Navigation',
      icon: Hash,
      action: () => scrollToSection('projects')
    },
    {
      id: 'section-education',
      label: 'Jump to Education',
      category: 'Navigation',
      icon: Hash,
      action: () => scrollToSection('education')
    },
    {
      id: 'section-profiles',
      label: 'Jump to Coding Profiles',
      category: 'Navigation',
      icon: Hash,
      action: () => scrollToSection('coding-profiles')
    },
    {
      id: 'section-guestbook',
      label: 'Jump to Guestbook',
      category: 'Navigation',
      icon: Hash,
      action: () => scrollToSection('guestbook')
    },
    {
      id: 'section-contact',
      label: 'Jump to Contact Me',
      category: 'Navigation',
      icon: Hash,
      action: () => scrollToSection('contact')
    },
    {
      id: 'terminal',
      label: 'Open Terminal CLI Mode',
      category: 'Interactive',
      icon: Terminal,
      action: () => {
        onClose();
        if (onOpenTerminal) onOpenTerminal();
      }
    },
    {
      id: 'theme',
      label: isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      category: 'Appearance',
      icon: isDark ? Sun : Moon,
      action: () => {
        toggleTheme();
        onClose();
      }
    },
    {
      id: 'resume',
      label: 'Download Resume (PDF)',
      category: 'Actions',
      icon: Download,
      action: () => {
        window.open(personalInfo.resumeUrl, '_blank');
        onClose();
      }
    },
    {
      id: 'github',
      label: 'Open GitHub Profile',
      category: 'Links',
      icon: ExternalLink,
      action: () => {
        window.open(socialLinks.github, '_blank');
        onClose();
      }
    },
    {
      id: 'leetcode',
      label: 'Open LeetCode Profile',
      category: 'Links',
      icon: ExternalLink,
      action: () => {
        window.open(socialLinks.leetcode, '_blank');
        onClose();
      }
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn Profile',
      category: 'Links',
      icon: ExternalLink,
      action: () => {
        window.open(socialLinks.linkedin, '_blank');
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const scrollToSection = (id) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -15 }}
        transition={{ duration: 0.18 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-left"
      >
        {/* Search Input Box */}
        <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
          <Search size={18} className="text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump to section..."
            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white text-sm font-medium placeholder-slate-400"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Commands List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <p className="p-4 text-center text-xs text-slate-400">No matching commands found.</p>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl cursor-pointer transition-colors text-xs font-semibold ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={15} className={isSelected ? 'text-white' : 'text-slate-400'} />
                    <span>{cmd.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {cmd.category}
                    </span>
                    {isSelected && <ArrowRight size={13} className="text-white" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate: &uarr; &darr;</span>
          <span>Select: Enter</span>
          <span>Close: Esc</span>
        </div>
      </motion.div>
    </div>
  );
};

export default CommandPalette;
