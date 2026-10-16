import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Terminal, Briefcase, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import MagneticButton from './MagneticButton';

import HeroParticles from './HeroParticles';

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = personalInfo.roles;

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

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
      className="min-h-[92vh] flex items-center justify-center pt-28 pb-16 relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-slate-50 to-slate-50 dark:from-[#0f172a]/70 dark:via-[#0b0f19] dark:to-[#0b0f19] transition-colors duration-300"
    >
      {/* Interactive Cursor-Reactive Particle Network */}
      <HeroParticles />

      {/* Decorative Grid and Background Orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 dark:opacity-25 pointer-events-none" />
      
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] bg-indigo-300/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Text/Content Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-8 text-left"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            {personalInfo.status}
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Hi, I&apos;m <span className="text-gradient">{personalInfo.name}</span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-200 flex items-center flex-wrap gap-x-2 gap-y-1">
              <span>B.E. CSE Student</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="relative inline-flex items-center overflow-hidden h-[1.3em] min-w-[240px] sm:min-w-[320px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentRoleIndex}
                    className="absolute text-blue-600 dark:text-blue-400 font-bold text-left left-0"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  >
                    {roles[currentRoleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h2>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed font-medium">
            {personalInfo.bioIntro}
          </p>

          {/* Call to Actions with Magnetic Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <MagneticButton strength={0.2}>
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
              >
                View My Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticButton>
            
            <MagneticButton strength={0.2}>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold px-8 py-4 rounded-2xl shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                Download Resume
                <Download size={18} />
              </a>
            </MagneticButton>
          </div>

          {/* Quick Stats/Keywords */}
          <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-200/60 dark:border-slate-800 text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal size={18} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold tracking-wide uppercase text-slate-700 dark:text-slate-300">MERN Specialist</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold tracking-wide uppercase text-slate-700 dark:text-slate-300">Chitkara CSE 2028</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold tracking-wide uppercase text-slate-700 dark:text-slate-300">300+ LeetCode Solved</span>
            </div>
          </div>
        </motion.div>

        {/* Photo Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 group">
            {/* Elegant Background Shadows & Frames */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600 to-sky-400 rotate-6 scale-95 opacity-20 blur-xl group-hover:rotate-12 transition-all duration-500" />
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-blue-600 to-indigo-500 rotate-3 opacity-10 group-hover:rotate-6 transition-all duration-500" />
            
            {/* Main Photo Wrapper */}
            <div className="absolute inset-0 rounded-3xl border border-slate-200 dark:border-slate-700 p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 relative">
                <img
                  src={personalInfo.avatarUrl}
                  alt="Manu Sharma Portrait"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
              </div>
            </div>

            {/* Micro details on image hover */}
            <div className="absolute -bottom-3 -left-3 bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-lg flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Active MERN Coder</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;