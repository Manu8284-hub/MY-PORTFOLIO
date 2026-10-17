import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
      label: 'Jump to > ABOUT',
      category: 'NAV',
      icon: Hash,
      action: () => scrollToSection('about')
    },
    {
      id: 'section-skills',
      label: 'Jump to > SKILLS',
      category: 'NAV',
      icon: Hash,
      action: () => scrollToSection('skills')
    },
    {
      id: 'section-projects',
      label: 'Jump to > PROJECTS',
      category: 'NAV',
      icon: Hash,
      action: () => scrollToSection('projects')
    },
    {
      id: 'section-education',
      label: 'Jump to > EDUCATION',
      category: 'NAV',
      icon: Hash,
      action: () => scrollToSection('education')
    },
    {
      id: 'section-profiles',
      label: 'Jump to > PROFILES',
      category: 'NAV',
      icon: Hash,
      action: () => scrollToSection('coding-profiles')
    },
    {
      id: 'section-guestbook',
      label: 'Jump to > GUESTBOOK',
      category: 'NAV',
      icon: Hash,
      action: () => scrollToSection('guestbook')
    },
    {
      id: 'section-contact',
      label: 'Jump to > CONTACT',
      category: 'NAV',
      icon: Hash,
      action: () => scrollToSection('contact')
    },
    {
      id: 'terminal',
      label: 'Launch Terminal CLI (` key)',
      category: 'INTERACTIVE',
      icon: Terminal,
      action: () => {
        onClose();
        if (onOpenTerminal) onOpenTerminal();
      }
    },
    {
      id: 'theme',
      label: isDark ? 'Switch to Paper Terminal Light' : 'Switch to Cyberpunk Dark HUD',
      category: 'THEME',
      icon: isDark ? Sun : Moon,
      action: () => {
        toggleTheme();
        onClose();
      }
    },
    {
      id: 'resume',
      label: 'Download Resume PDF',
      category: 'ACTION',
      icon: Download,
      action: () => {
        window.open(personalInfo.resumeUrl, '_blank');
        onClose();
      }
    },
    {
      id: 'github',
      label: 'Open GitHub Profile',
      category: 'EXT_LINK',
      icon: ExternalLink,
      action: () => {
        window.open(socialLinks.github, '_blank');
        onClose();
      }
    },
    {
      id: 'leetcode',
      label: 'Open LeetCode Profile',
      category: 'EXT_LINK',
      icon: ExternalLink,
      action: () => {
        window.open(socialLinks.leetcode, '_blank');
        onClose();
      }
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn Profile',
      category: 'EXT_LINK',
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
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md font-mono select-none"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -15 }}
        transition={{ duration: 0.18 }}
        onClick={(e) => e.stopPropagation()}
        className="cyber-bracket relative w-full max-w-xl bg-[#0B0F17] border border-[#00FF9C]/60 rounded-lg shadow-[0_0_35px_rgba(0,255,156,0.2)] overflow-hidden text-left"
      >
        {/* Search Input Box */}
        <div className="p-4 bg-[#05060A] border-b border-[#1B2433] flex items-center gap-3">
          <Search size={16} className="text-[#00FF9C] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type command or search HUD..."
            className="flex-1 bg-transparent border-none outline-none text-[#D6E2F0] font-mono text-xs sm:text-sm placeholder-[#6B7A90]"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#111723] text-[10px] font-mono text-[#6B7A90] border border-[#1B2433]">
            ESC
          </kbd>
        </div>

        {/* Commands List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <p className="p-4 text-center text-xs text-[#6B7A90]">No matching command directives found.</p>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded cursor-pointer transition-colors text-xs font-mono ${
                    isSelected
                      ? 'bg-[#00FF9C] text-black font-extrabold shadow-[0_0_12px_rgba(0,255,156,0.3)]'
                      : 'text-[#D6E2F0] hover:bg-[#111723]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={14} className={isSelected ? 'text-black' : 'text-[#00D9FF]'} />
                    <span>{cmd.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                        isSelected
                          ? 'border-black text-black'
                          : 'border-[#1B2433] text-[#6B7A90]'
                      }`}
                    >
                      {cmd.category}
                    </span>
                    {isSelected && <ArrowRight size={13} className="text-black" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="p-3 bg-[#05060A] border-t border-[#1B2433] flex items-center justify-between text-[10px] text-[#6B7A90]">
          <span>NAVIGATE: &uarr; &darr;</span>
          <span>EXECUTE: ENTER</span>
          <span>EXIT: ESC</span>
        </div>
      </motion.div>
    </div>
  );
};

export default CommandPalette;
