import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const BOOT_LOGS = [
  { text: 'BIOS-v4.18 [MANU_SYS_CORE]', status: 'INITIALIZING' },
  { text: 'Loading MERN runtime drivers (React, Node, Express, MongoDB)...', status: 'OK' },
  { text: 'Mounting PostgreSQL telemetry & hardware pipelines...', status: 'OK' },
  { text: 'Initializing portfolio interface & HUD shaders...', status: 'OK' },
  { text: 'Kernel ready. Launching portfolio HUD...', status: 'ONLINE' }
];

export default function BootSequence({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);

  const handleFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  useEffect(() => {
    // If user prefers reduced motion, skip immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handleFinish();
      return;
    }

    // Skip on ANY key press
    const handleKeyDown = () => handleFinish();
    window.addEventListener('keydown', handleKeyDown);

    // Progressive log rendering under 1.8s
    const timeouts = [];
    BOOT_LOGS.forEach((log, index) => {
      const timeout = setTimeout(() => {
        setLogs((prev) => [...prev, log]);
        setProgress(Math.round(((index + 1) / BOOT_LOGS.length) * 100));
      }, index * 260);
      timeouts.push(timeout);
    });

    const finishTimeout = setTimeout(() => {
      handleFinish();
    }, BOOT_LOGS.length * 260 + 350);
    timeouts.push(finishTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <motion.div
      onClick={handleFinish}
      className="fixed inset-0 z-[9999] flex flex-col justify-between p-6 sm:p-12 bg-[#05060A] text-[#D6E2F0] font-mono cursor-pointer select-none"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: 'blur(8px)',
        scale: 1.02,
        transition: { duration: 0.45, ease: 'easeInOut' }
      }}
    >
      {/* Top HUD Status Bar */}
      <div className="flex justify-between items-center text-xs text-[#6B7A90] border-b border-[#1B2433] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FF9C] shadow-[0_0_8px_#00FF9C] animate-pulse" />
          <span className="text-[#00FF9C]">MANU_OS // BOOT_SEQUENCE</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs bg-[#1B2433] text-[#00D9FF] px-2 py-0.5 rounded">
            PORT: 3000
          </span>
          <span className="hidden sm:inline text-[#6B7A90]">ESC / CLICK TO SKIP</span>
        </div>
      </div>

      {/* Main Terminal Boot Output */}
      <div className="max-w-3xl w-full mx-auto my-auto py-8">
        <div className="cyber-bracket cyber-card p-6 sm:p-8 rounded-lg border border-[#1B2433] shadow-[0_0_35px_rgba(0,0,0,0.8)]">
          <div className="text-xs text-[#6B7A90] mb-4 flex items-center justify-between">
            <span>[ SYSTEM LOGS ]</span>
            <span className="text-[#00FF9C] font-semibold">{progress}% COMPLETE</span>
          </div>

          <div className="space-y-2 min-h-[140px] text-xs sm:text-sm">
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-start justify-between gap-3 font-mono"
              >
                <div className="flex items-center gap-2 text-[#D6E2F0]">
                  <span className="text-[#00FF9C] font-bold">&gt;&gt;</span>
                  <span>{log.text}</span>
                </div>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded font-bold shrink-0 ${
                    log.status === 'ONLINE'
                      ? 'bg-[#00FF9C]/20 text-[#00FF9C] shadow-[0_0_8px_#00FF9C]'
                      : 'bg-[#1B2433] text-[#00D9FF]'
                  }`}
                >
                  [{log.status}]
                </span>
              </motion.div>
            ))}
            <div className="flex items-center gap-2 text-[#00FF9C] pt-1">
              <span className="terminal-cursor text-sm" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 pt-4 border-t border-[#1B2433]">
            <div className="h-1.5 w-full bg-[#0B0F17] rounded overflow-hidden border border-[#1B2433]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00D9FF] via-[#00FF9C] to-[#00FF9C] shadow-[0_0_12px_#00FF9C]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </div>

        {/* Skip Hint */}
        <p className="mt-4 text-center text-xs text-[#6B7A90] tracking-widest uppercase">
          [ Click anywhere or press any key to bypass boot ]
        </p>
      </div>

      {/* Bottom Telemetry */}
      <div className="flex justify-between items-center text-[10px] text-[#6B7A90] border-t border-[#1B2433] pt-3">
        <span>DEV: MANU SHARMA // CHITKARA UNIV</span>
        <span>LATENCY: 12ms // BUFFER: OK</span>
      </div>
    </motion.div>
  );
}
