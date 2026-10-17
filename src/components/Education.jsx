import { motion } from 'framer-motion';
import { Calendar, Award, GraduationCap, MapPin } from 'lucide-react';
import { educationData } from '../data/portfolioData';
import TerminalPromptHeader from './TerminalPromptHeader';

const Education = () => {
  return (
    <section id="education" className="py-24 bg-[#05060A] text-[#D6E2F0] relative overflow-hidden font-mono">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#00FF9C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <TerminalPromptHeader
          title="EDUCATION"
          tag="// 04 ACADEMIA"
          subtitle="University degrees, theoretical foundations, and core engineering coursework."
        />

        {/* Timeline Container */}
        <div className="relative border-l border-[#1B2433] ml-4 md:ml-8 pl-8 md:pl-12 py-4 text-left">
          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline Cyber Node */}
              <div className="absolute -left-[49px] md:-left-[65px] top-1.5 flex items-center justify-center">
                <span className="relative flex h-8 w-8">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9C] opacity-20"></span>
                  <span className="relative inline-flex rounded-full h-8 w-8 bg-[#0B0F17] border-2 border-[#00FF9C] shadow-[0_0_10px_#00FF9C] flex items-center justify-center text-[#00FF9C]">
                    <GraduationCap size={16} />
                  </span>
                </span>
              </div>

              {/* Box Details */}
              <div className="cyber-bracket cyber-card p-6 sm:p-8 rounded-lg bg-[#0B0F17] border border-[#1B2433] hover:border-[#00FF9C]/50 shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#00FF9C]/10 border border-[#00FF9C]/40 text-[#00FF9C] text-[10px] font-bold uppercase tracking-wider mb-2.5">
                      // {edu.status}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#D6E2F0] font-['Space_Grotesk']">
                      {edu.institution}
                    </h3>
                    <h4 className="text-sm sm:text-base font-bold text-[#6B7A90] mt-1">
                      {edu.degree} — <span className="text-[#00D9FF]">{edu.field}</span>
                    </h4>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 text-[#6B7A90] text-xs font-mono shrink-0">
                    <div className="flex items-center gap-2">
                      <Calendar size={13} className="text-[#00FF9C]" />
                      <span>{edu.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={13} className="text-[#00D9FF]" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-[#1B2433] mb-6" />

                {/* Bullets */}
                <div className="space-y-3 mb-6">
                  <h5 className="text-[11px] font-bold uppercase tracking-widest text-[#00D9FF] flex items-center gap-1.5">
                    <Award size={14} className="text-[#00D9FF]" />
                    <span>[ KEY MILESTONES ]</span>
                  </h5>
                  <ul className="space-y-2 text-[#D6E2F0] text-xs sm:text-sm leading-relaxed">
                    {edu.highlights.map((bullet, bidx) => (
                      <li key={bidx} className="flex items-start gap-2.5">
                        <span className="text-[#00FF9C] font-bold mt-0.5">&gt;&gt;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Coursework */}
                <div>
                  <h5 className="text-[11px] font-bold uppercase tracking-widest text-[#6B7A90] mb-3">
                    [ CORE MODULES ]
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course, cidx) => (
                      <span
                        key={cidx}
                        className="px-2.5 py-1 bg-[#05060A] border border-[#1B2433] rounded text-xs text-[#D6E2F0]"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
