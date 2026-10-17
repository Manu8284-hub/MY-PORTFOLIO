import { motion } from 'framer-motion';
import { Terminal, Calendar, Award } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import TerminalPromptHeader from './TerminalPromptHeader';

const TIMELINE = [
  {
    year: '2024 - 2028',
    title: 'B.E. Computer Science & Engineering',
    org: 'Chitkara University, Punjab',
    desc: 'Core coursework in Algorithms, Operating Systems, Database Management Systems, and Computer Networks. CGPA track record.'
  },
  {
    year: '2024 - 2025',
    title: 'Data Structures & Algorithms Foundation',
    org: 'LeetCode & Competitive Programming',
    desc: 'Solved 300+ problems across arrays, trees, dynamic programming, and graphs. Focus on optimal space/time complexity.'
  },
  {
    year: '2025 - 2026',
    title: 'Full-Stack MERN Architecture',
    org: 'Open Source & Production Systems',
    desc: 'Engineered high-concurrency systems like Campus Connect Hub, FitBot AI Gym Assistant, and Secure Auth System with JWT/Argon2.'
  }
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-[#05060A] text-[#D6E2F0] relative overflow-hidden font-mono">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#00FF9C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Terminal Header */}
        <TerminalPromptHeader
          title="ABOUT"
          tag="// 01 BIOGRAPHY"
          subtitle="System operator profile, background dossier, and academic engineering timeline."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Terminal Console Output Window (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 cyber-bracket cyber-card rounded-lg bg-[#0B0F17] border border-[#1B2433] shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden text-left"
          >
            {/* Terminal Top Bar */}
            <div className="px-4 py-2.5 bg-[#05060A] border-b border-[#1B2433] flex items-center justify-between text-xs text-[#6B7A90]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF2BD6]" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FF9C]" />
                <span className="ml-2 font-mono text-[11px] text-[#D6E2F0]">manu@terminal:~$</span>
              </div>
              <span className="text-[10px] text-[#6B7A90]">BASH v5.2</span>
            </div>

            {/* Terminal Content Body */}
            <div className="p-6 sm:p-7 space-y-6 text-xs sm:text-sm">
              {/* Command 1: whoami */}
              <div>
                <div className="flex items-center gap-2 text-[#00FF9C] font-bold">
                  <span>$</span>
                  <span>whoami</span>
                </div>
                <p className="mt-1.5 text-[#D6E2F0] pl-4 border-l border-[#1B2433]">
                  Manu Sharma &lt;MERN Stack Developer &amp; CSE Undergrad @ Chitkara University&gt;
                </p>
              </div>

              {/* Command 2: cat about.txt */}
              <div>
                <div className="flex items-center gap-2 text-[#00FF9C] font-bold">
                  <span>$</span>
                  <span>cat about.txt</span>
                </div>
                <div className="mt-1.5 space-y-3 pl-4 border-l border-[#1B2433] text-[#6B7A90] leading-relaxed">
                  <p className="text-[#D6E2F0]">
                    {personalInfo.bioDetailed}
                  </p>
                  <p>
                    My core engineering philosophy is rooted in building resilient, maintainable architectures, zero-waste API endpoints, and fluid user experiences. I bridge backend data flows with fast, reactive frontends.
                  </p>
                </div>
              </div>

              {/* Command 3: cat tags.json */}
              <div>
                <div className="flex items-center gap-2 text-[#00FF9C] font-bold">
                  <span>$</span>
                  <span>cat specializations.json</span>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2 pl-4 border-l border-[#1B2433]">
                  {personalInfo.quickTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded bg-[#05060A] border border-[#00FF9C]/30 text-[#00FF9C] text-xs font-semibold"
                    >
                      # {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#00FF9C] pt-2">
                <span>manu@terminal:~$</span>
                <span className="terminal-cursor text-sm" />
              </div>
            </div>
          </motion.div>

          {/* Journey Timeline (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <div className="flex items-center gap-2 text-xs text-[#00D9FF] font-bold tracking-widest uppercase">
              <Calendar size={14} />
              <span>// ENGINEERING TIMELINE</span>
            </div>

            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#1B2433]">
              {TIMELINE.map((item, index) => (
                <div key={index} className="relative group">
                  {/* Glowing Node Dot */}
                  <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-[#0B0F17] border-2 border-[#00FF9C] group-hover:bg-[#00FF9C] shadow-[0_0_8px_#00FF9C] transition-colors" />

                  <div className="cyber-bracket cyber-card p-4 rounded bg-[#0B0F17] border border-[#1B2433] hover:border-[#00D9FF]/50 transition-colors">
                    <span className="text-[10px] font-bold text-[#00FF9C] tracking-wider block mb-1">
                      {item.year}
                    </span>
                    <h4 className="text-sm font-bold text-[#D6E2F0]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#00D9FF] mt-0.5 font-medium">
                      {item.org}
                    </p>
                    <p className="text-xs text-[#6B7A90] mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
