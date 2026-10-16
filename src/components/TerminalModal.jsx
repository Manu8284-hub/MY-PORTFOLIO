import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Terminal as TerminalIcon, CornerDownLeft, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';
import { personalInfo, projectsData, skillCategories, socialLinks, terminalCommandsHelp } from '../data/portfolioData';

const INITIAL_GREETING = [
  { text: "Antigravity OS [Version 2.0.26]", type: "system" },
  { text: "Logged in as guest@manu-portfolio. Type 'help' to see available commands.", type: "system" }
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

    const newHistory = [...history, { text: `guest@portfolio:~$ ${rawCmd}`, type: "command" }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: "output",
          text: `Available Commands:
  • about     - Who is Manu Sharma?
  • skills    - Technical toolkit & frameworks
  • projects  - Featured engineering projects
  • contact   - Email & social coordinates
  • stats     - Coding metrics & LeetCode count
  • theme     - Toggle dark/light appearance
  • clear     - Clear terminal buffer
  • sudo hire manu - Unlock top-tier engineering talent (Easter egg)`
        });
        break;

      case 'about':
        newHistory.push({
          type: "output",
          text: `${personalInfo.name} — ${personalInfo.title}
Institution: ${personalInfo.institution} (Expected ${personalInfo.graduationYear})
Status: ${personalInfo.status}
Bio: ${personalInfo.bioIntro}`
        });
        break;

      case 'skills':
        const skillsText = skillCategories
          .map((cat) => `[${cat.title}]: ${cat.skills.map((s) => s.name).join(', ')}`)
          .join('\n');
        newHistory.push({ type: "output", text: skillsText });
        break;

      case 'projects':
        const projText = projectsData
          .map((p, idx) => `${idx + 1}. ${p.title} (${p.category}) -> ${p.githubUrl}`)
          .join('\n');
        newHistory.push({ type: "output", text: projText });
        break;

      case 'contact':
        newHistory.push({
          type: "output",
          text: `Email: ${personalInfo.email}
GitHub: ${socialLinks.github}
LinkedIn: ${socialLinks.linkedin}
LeetCode: ${socialLinks.leetcode}`
        });
        break;

      case 'stats':
        newHistory.push({
          type: "output",
          text: `LeetCode: 300+ Problems Solved (Top 12% Contest Rating)
GitHub: 25+ Repositories (200+ contributions)
Focus: High Performance MERN Stack Architectures`
        });
        break;

      case 'theme':
        toggleTheme();
        newHistory.push({
          type: "output",
          text: `Theme switched to: ${isDark ? 'Light' : 'Dark'} mode.`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'sudo hire manu':
        confetti({
          particleCount: 120,
          spread: 75,
          origin: { y: 0.6 }
        });
        newHistory.push({
          type: "success",
          text: `🎉 EXCELLENT DECISION!
You are hiring Manu Sharma.
Candidate status: Ready for full-stack impact.
Next Step: Send interview offer to ${personalInfo.email}`
        });
        break;

      default:
        newHistory.push({
          type: "error",
          text: `command not found: "${rawCmd}". Type "help" to view valid commands.`
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl h-[550px] max-h-[85vh] bg-[#0c1017] border border-slate-800 rounded-2xl shadow-2xl flex flex-col font-mono text-xs sm:text-sm overflow-hidden"
      >
        {/* Terminal Window Header Bar */}
        <div className="bg-[#161b22] px-4 py-3 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80 transition-opacity cursor-pointer"
              title="Close Terminal"
              aria-label="Close Terminal"
            />
            <div className="w-3 h-3 rounded-full bg-amber-500 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-80" />
            <span className="ml-3 text-xs text-slate-400 font-bold flex items-center gap-1.5">
              <TerminalIcon size={13} className="text-blue-400" />
              manu@portfolio: ~ (bash)
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>Press ESC or type &apos;clear&apos;</span>
            <button
              onClick={onClose}
              className="p-1 hover:text-slate-300 transition-colors"
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div
          className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3 text-slate-200 text-left"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {item.type === 'system' && (
                <p className="text-slate-500">{item.text}</p>
              )}
              {item.type === 'command' && (
                <p className="text-sky-400 font-bold">{item.text}</p>
              )}
              {item.type === 'output' && (
                <p className="text-slate-300 font-normal">{item.text}</p>
              )}
              {item.type === 'error' && (
                <p className="text-rose-400 font-medium">{item.text}</p>
              )}
              {item.type === 'success' && (
                <div className="p-3 my-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold flex items-start gap-2">
                  <Sparkles size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item.text}</span>
                </div>
              )}
            </div>
          ))}

          {/* Active Command Input Line */}
          <div className="flex items-center gap-2 pt-1 text-slate-100">
            <span className="text-emerald-400 font-bold">guest@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-xs sm:text-sm caret-blue-400"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="p-1 text-slate-500 hover:text-slate-300 cursor-pointer"
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
