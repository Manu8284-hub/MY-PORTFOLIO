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
    // Disable body scroll when preloader is active
    document.body.style.overflow = 'hidden';
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
            // Restore scroll
            document.body.style.overflow = 'unset';
          }, 400); // short delay to show 100% and text complete
          return 100;
        }
        
        // Random incremental steps for natural loading feel
        const increment = Math.floor(Math.random() * 8) + 4; 
        const nextProgress = Math.min(prev + increment, 100);
        return nextProgress;
      });
    }, 80);

    return () => {
      clearInterval(interval);
    };
  }, [onComplete]);

  useEffect(() => {
    // Determine which message to show based on progress
    if (progress < 25) setMsgIdx(0);
    else if (progress < 50) setMsgIdx(1);
    else if (progress < 75) setMsgIdx(2);
    else if (progress < 95) setMsgIdx(3);
    else setMsgIdx(4);
  }, [progress]);

  // Framer Motion variants
  const logoVariants = {
    initial: { scale: 0.6, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const ringVariants = {
    animate: {
      rotate: 360,
      transition: { repeat: Infinity, duration: 2, ease: "linear" }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 text-slate-900"
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100vh',
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* Antigravity grid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      
      {/* Background ambient glow spots */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] bg-indigo-200/15 rounded-full blur-3xl pointer-events-none" />

      {/* Loader Content */}
      <div className="flex flex-col items-center z-10">
        {/* Video Logo */}
        <div className="relative w-full max-w-xs mb-8 flex items-center justify-center px-4">
          <motion.div 
            className="w-full rounded-xl overflow-hidden flex items-center justify-center shadow-xl shadow-blue-500/20 bg-slate-900 border border-slate-800"
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
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>

        {/* Name Title */}
        <motion.h1 
          className="text-xl md:text-2xl font-black tracking-widest text-slate-900 uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          MANU SHARMA
        </motion.h1>
        
        {/* Subtitle / Loader message */}
        <div className="h-6 mt-2 overflow-hidden flex items-center justify-center">
          <motion.p 
            key={msgIdx}
            className="text-xs font-semibold uppercase tracking-wider text-blue-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {messages[msgIdx]}
          </motion.p>
        </div>

        {/* Progress Display */}
        <div className="mt-12 w-64 md:w-80">
          {/* Percentage */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Loading</span>
            <span className="text-sm font-bold text-blue-600 tabular-nums">{progress}%</span>
          </div>
          {/* Progress Bar Container */}
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-100">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
