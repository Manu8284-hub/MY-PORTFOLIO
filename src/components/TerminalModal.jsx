import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Terminal as TerminalIcon, CornerDownLeft, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';
import { personalInfo, projectsData, skillCategories, socialLinks } from '../data/portfolioData';

const INITIAL_GREETING = [
  { text: '>> MANU_OS [Cyberpunk Terminal CLI v4.2.0]', type: 'system' },
  { text: '>> Logged in as guest@manu-terminal. Type "help" to review available operational commands.', type: 'system' }
];

const TerminalModal = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState(INITIAL_GREETING);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const newHistory = [...history, { text: `guest@terminal:~$ ${rawCmd}`, type: 'command' }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE CYBER COMMANDS:
  • about           - Who is Manu Sharma?
  • skills          - Technical stack & capabilities
  • projects        - Production systems & apps
  • contact         - Direct transmission coordinates
  • theme           - Toggle dark HUD / light paper terminal
  • clear           - Flush terminal output buffer
  • sudo hire manu  - [CLASSIFIED] Execute recruitment protocol`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `${personalInfo.name} — ${personalInfo.title}
Institution: ${personalInfo.institution} (Graduation: ${personalInfo.graduationYear})
Status: ${personalInfo.status}
Bio: ${personalInfo.bioIntro}`
        });
        break;

      case 'skills':
        const skillsText = skillCategories
          .map((cat) => `// [${cat.title}]: ${cat.skills.map((s) => s.name).join(', ')}`)
          .join('\n');
        newHistory.push({ type: 'output', text: skillsText });
        break;

      case 'projects':
        const projText = projectsData
          .map((p, idx) => `[${idx + 1}] ${p.title} (${p.category}) -> ${p.githubUrl || p.liveUrl}`)
          .join('\n');
        newHistory.push({ type: 'output', text: projText });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `// TRANSMISSION CHANNELS:
Email:    ${personalInfo.email}
GitHub:   ${socialLinks.github}
LinkedIn: ${socialLinks.linkedin}
LeetCode: ${socialLinks.leetcode}`
        });
        break;

      case 'theme':
        toggleTheme();
        newHistory.push({
          type: 'output',
          text: `// Theme protocol swapped: ${isDark ? 'Paper Terminal Light' : 'Dark Hacker HUD'}.`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'sudo hire manu':
        confetti({
          particleCount: 150,
          spread: 85,
          origin: { y: 0.6 }
        });
        newHistory.push({
          type: 'success',
          text: `⚡ PROTOCOL EXECUTED: EXCELLENT DECISION!
Manu Sharma has been added to your engineering squad.
High performance MERN Stack capabilities unlocked.
Direct transmission link: ${personalInfo.email}`
        });
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `ERR_UNKNOWN_CMD: "${rawCmd}". Type "help" for command directory.`
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex] || '');
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono select-none"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="cyber-bracket relative w-full max-w-3xl h-[560px] max-h-[85vh] bg-[#0B0F17] border border-[#00FF9C] rounded-lg shadow-[0_0_40px_rgba(0,255,156,0.25)] flex flex-col text-xs sm:text-sm overflow-hidden"
      >
        {/* Terminal Header Bar */}
        <div className="bg-[#05060A] px-4 py-3 border-b border-[#1B2433] flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#FF2BD6] hover:opacity-80 transition-opacity cursor-pointer shadow-[0_0_6px_#FF2BD6]"
              title="Close Terminal"
              aria-label="Close Terminal"
            />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-[#00FF9C] shadow-[0_0_6px_#00FF9C]" />
            <span className="ml-3 text-xs text-[#6B7A90] font-bold flex items-center gap-2">
              <TerminalIcon size={14} className="text-[#00FF9C]" />
              <span className="text-[#D6E2F0]">manu@terminal: ~ [BASH]</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#6B7A90]">
            <span className="hidden sm:inline">ESC or &apos;clear&apos;</span>
            <button
              onClick={onClose}
              className="p-1 hover:text-[#00FF9C] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div
          className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-3 text-[#D6E2F0] text-left relative"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Subtle scanline inside terminal */}
          <div className="absolute inset-0 cyber-scanlines opacity-15 pointer-events-none" />

          {history.map((item, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed relative z-10">
              {item.type === 'system' && (
                <p className="text-[#6B7A90]">{item.text}</p>
              )}
              {item.type === 'command' && (
                <p className="text-[#00D9FF] font-bold">{item.text}</p>
              )}
              {item.type === 'output' && (
                <p className="text-[#D6E2F0]">{item.text}</p>
              )}
              {item.type === 'error' && (
                <p className="text-[#FF2BD6] font-semibold">{item.text}</p>
              )}
              {item.type === 'success' && (
                <div className="p-3 my-2 rounded bg-[#00FF9C]/10 border border-[#00FF9C] text-[#00FF9C] font-bold flex items-start gap-2 shadow-[0_0_15px_rgba(0,255,156,0.25)]">
                  <Sparkles size={16} className="text-[#00FF9C] shrink-0 mt-0.5" />
                  <span>{item.text}</span>
                </div>
              )}
            </div>
          ))}

          {/* Active Command Input Line */}
          <div className="flex items-center gap-2 pt-2 text-[#D6E2F0] relative z-10">
            <span className="text-[#00FF9C] font-bold">guest@terminal:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[#D6E2F0] font-mono text-xs sm:text-sm caret-[#00FF9C]"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="p-1 text-[#6B7A90] hover:text-[#00FF9C] cursor-pointer"
              aria-label="Submit command"
            >
              <CornerDownLeft size={13} />
            </button>
          </div>
          <div ref={terminalEndRef} />
        </div>
      </motion.div>
    </div>
  );
};

export default TerminalModal;
