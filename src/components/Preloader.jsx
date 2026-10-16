import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const messages = [
  "Initializing...",
  "Loading stack modules...",
  "Building portfolio layout...",
  "Crafting experience...",
  "Ready!"
];

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    // If user prefers reduced motion, skip preloader immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Disable body scroll when preloader is active
    document.body.style.overflow = 'hidden';
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
            document.body.style.overflow = 'unset';
          }, 300);
          return 100;
        }
        
        const increment = Math.floor(Math.random() * 12) + 6; 
        const nextProgress = Math.min(prev + increment, 100);
        return nextProgress;
      });
    }, 60);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  useEffect(() => {
    if (progress < 25) setMsgIdx(0);
    else if (progress < 50) setMsgIdx(1);
    else if (progress < 75) setMsgIdx(2);
    else if (progress < 95) setMsgIdx(3);
    else setMsgIdx(4);
  }, [progress]);

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-white"
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100vh',
        opacity: 0,
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 dark:opacity-20 pointer-events-none" />
      
      {/* Loader Content */}
      <div className="flex flex-col items-center z-10 px-4">
        {/* Video Logo Container */}
        <div className="relative w-full max-w-xs mb-8 flex items-center justify-center">
          <motion.div 
            className="w-full rounded-2xl overflow-hidden flex items-center justify-center shadow-xl shadow-blue-500/20 bg-slate-900 border border-slate-800"
            variants={logoVariants}
            initial="initial"
            animate="animate"
          >
            <video 
              src="/logo_code.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-auto object-contain max-h-48"
            />
          </motion.div>
        </div>

        {/* Name Title */}
        <motion.h1 
          className="text-xl md:text-2xl font-black tracking-widest text-slate-900 dark:text-white uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          MANU SHARMA
        </motion.h1>
        
        {/* Subtitle / Loader message */}
        <div className="h-6 mt-2 overflow-hidden flex items-center justify-center">
          <motion.p 
            key={msgIdx}
            className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {messages[msgIdx]}
          </motion.p>
        </div>

        {/* Progress Display */}
        <div className="mt-8 w-64 md:w-80">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Loading</span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 tabular-nums font-mono">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-100 dark:border-slate-800">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.08, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
