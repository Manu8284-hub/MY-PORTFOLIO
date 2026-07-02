import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Terminal, Briefcase } from 'lucide-react';

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = [
    "MERN Stack Developer",
    "Full-Stack Developer",
    "Problem Solver",
    "Creative Video Editor"
  ];

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(roleInterval);
  }, []);

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
      className="min-h-[92vh] flex items-center justify-center pt-24 pb-16 relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-slate-50 to-slate-50"
    >
      {/* Decorative Grid and Background Orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
      
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] bg-indigo-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Text/Content Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-8 text-left"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-xs font-semibold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Available for Internships & Freelance Work
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Hi, I&apos;m <span className="text-gradient">Manu Sharma</span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-700 flex items-center flex-wrap gap-x-2 gap-y-1">
              <span>B.E. CSE Student</span>
              <span className="text-slate-300">|</span>
              <span className="relative inline-flex items-center overflow-hidden h-[1.3em] min-w-[280px] sm:min-w-[340px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentRoleIndex}
                    className="absolute text-blue-600 font-bold text-gradient text-left left-0"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  >
                    {roles[currentRoleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h2>
          </div>

          <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed font-medium">
            Building modern, high-performance web applications using MongoDB, Express.js, React.js, and Node.js. Passionate about engineering efficient software solutions and solving complex algorithmic challenges.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              View My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="/MANU SHARMA.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-8 py-4 rounded-2xl shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300"
            >
              Download Resume
              <Download size={18} />
            </a>
          </div>

          {/* Quick Stats/Keywords */}
          <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-200/60 text-slate-500">
            <div className="flex items-center gap-2">
              <Terminal size={18} className="text-blue-600" />
              <span className="text-sm font-semibold tracking-wide uppercase text-slate-700">MERN Specialist</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-blue-600" />
              <span className="text-sm font-semibold tracking-wide uppercase text-slate-700">Chitkara Alumni 2028</span>
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
            <div className="absolute inset-0 rounded-3xl border border-slate-200 p-3 bg-white/80 backdrop-blur-sm shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-100 relative">
                <img
                  src="/2410990448.jpg"
                  alt="Manu Sharma Portrait"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
              </div>
            </div>

            {/* Micro details on image hover */}
            <div className="absolute -bottom-3 -left-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-lg flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-700">Active Coder</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;