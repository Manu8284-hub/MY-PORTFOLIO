import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Terminal, Briefcase, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import TextScramble from './TextScramble';
import HeroParticles from './HeroParticles';

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = personalInfo.roles || [
    'MERN Stack Developer',
    'Full-Stack Engineer',
    'React & Node Specialist',
    'Chitkara University CSE'
  ];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(roleInterval);
  }, [roles.length]);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = projectsSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-[92vh] flex items-center justify-center pt-24 pb-16 relative overflow-hidden bg-[#05060A] text-[#D6E2F0] font-mono select-none"
    >
      {/* Interactive Cyber Particle Grid */}
      <HeroParticles />

      {/* Subtle HUD background coordinates */}
      <div className="absolute top-20 right-8 text-[10px] text-[#6B7A90]/40 hidden md:block select-none pointer-events-none text-right">
        <div>SYS_COORD: 30.5165° N, 76.6592° E</div>
        <div>KERNEL: v4.19.0-MERN</div>
        <div>TARGET: OPERATIONAL</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Main Content Column */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded bg-[#0B0F17] border border-[#00FF9C]/40 text-[#00FF9C] text-xs font-mono tracking-wider shadow-[0_0_12px_rgba(0,255,156,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF9C]"></span>
            </span>
            <span>// STATUS: AVAILABLE FOR ROLES</span>
          </div>

          {/* Heading with Text Scramble and Glitch on Hover */}
          <div className="space-y-3">
            <div className="text-xs sm:text-sm text-[#00D9FF] tracking-widest font-bold">
              &gt; INITIALIZING IDENTITY...
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#D6E2F0] leading-none font-['Space_Grotesk']">
              <span
                className="cyber-glitch cursor-default text-[#00FF9C] drop-shadow-[0_0_20px_rgba(0,255,156,0.25)]"
                data-text={personalInfo.name}
              >
                <TextScramble text={personalInfo.name} as="span" />
              </span>
            </h1>

            {/* Dynamic Role Display */}
            <div className="text-lg sm:text-2xl font-bold text-[#D6E2F0] flex items-center flex-wrap gap-x-2 gap-y-1 pt-1 font-mono">
              <span className="text-[#6B7A90]">&gt; ROLE:</span>
              <span className="relative inline-flex items-center overflow-hidden h-[1.3em] min-w-[260px] sm:min-w-[340px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentRoleIndex}
                    className="absolute text-[#00D9FF] font-bold text-left left-0"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  >
                    {roles[currentRoleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          </div>

          {/* Brief Bio Intro */}
          <p className="text-[#6B7A90] text-sm sm:text-base max-w-xl leading-relaxed font-mono">
            {personalInfo.bioIntro}
          </p>

          {/* Action CTAs (Above the fold) */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="cyber-bracket cyber-button-sweep inline-flex items-center justify-center gap-2 bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black font-extrabold font-mono text-sm px-7 py-3.5 rounded shadow-[0_0_20px_rgba(0,255,156,0.3)] transition-all duration-300 group cursor-pointer"
            >
              <span>[ VIEW PROJECTS ]</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-bracket inline-flex items-center justify-center gap-2 border border-[#1B2433] hover:border-[#00D9FF] bg-[#0B0F17] hover:bg-[#111723] text-[#D6E2F0] hover:text-[#00D9FF] font-bold font-mono text-sm px-7 py-3.5 rounded shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer"
            >
              <span>[ DOWNLOAD RESUME ]</span>
              <Download size={16} />
            </a>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex flex-wrap gap-5 pt-4 border-t border-[#1B2433] text-xs text-[#6B7A90]">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-[#00FF9C]" />
              <span className="text-[#D6E2F0]">MERN STACK</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={14} className="text-[#00D9FF]" />
              <span className="text-[#D6E2F0]">CHITKARA CSE 2028</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#FF2BD6]" />
              <span className="text-[#D6E2F0]">300+ LEETCODE</span>
            </div>
          </div>
        </motion.div>

        {/* HUD Portrait Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 group">
            {/* Neon Glare Behind Avatar */}
            <div className="absolute inset-0 rounded-lg bg-[#00FF9C]/10 blur-xl group-hover:bg-[#00FF9C]/20 transition-all duration-500 pointer-events-none" />

            {/* Corner Bracket Card Frame */}
            <div className="cyber-bracket cyber-card absolute inset-0 rounded-lg p-2.5 bg-[#0B0F17] border border-[#1B2433] shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              <div className="w-full h-full rounded overflow-hidden relative border border-[#1B2433]/80">
                <img
                  src={personalInfo.avatarUrl}
                  alt="Manu Sharma Portrait"
                  className="w-full h-full object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                  loading="eager"
                />
                {/* HUD Scanlines over photo */}
                <div className="absolute inset-0 cyber-scanlines opacity-50 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05060A] via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Telemetry Tag */}
            <div className="absolute -bottom-3 -left-3 bg-[#0B0F17] border border-[#00FF9C] px-3 py-1.5 rounded shadow-[0_0_15px_rgba(0,255,156,0.3)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF9C] animate-pulse" />
              <span className="text-[11px] font-mono font-bold text-[#00FF9C]">OP_SYS: ACTIVE</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;