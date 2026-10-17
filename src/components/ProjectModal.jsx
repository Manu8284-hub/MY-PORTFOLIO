import { motion } from 'framer-motion';
import { X, ExternalLink, Github, AlertCircle, Cpu, CheckCircle2, Award, Terminal } from 'lucide-react';
import { useEffect } from 'react';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  const { title, category, image, overview, techStack, liveUrl, githubUrl, metrics, caseStudy } = project;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto font-mono select-none"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="cyber-bracket relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0B0F17] border border-[#00FF9C]/60 rounded-lg shadow-[0_0_40px_rgba(0,255,156,0.25)] p-0 text-left"
      >
        {/* Terminal Window Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#05060A] border-b border-[#1B2433] sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF2BD6] inline-block shadow-[0_0_6px_#FF2BD6]" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#00FF9C] inline-block shadow-[0_0_6px_#00FF9C]" />
            <div className="flex items-center gap-2 ml-3 text-xs text-[#6B7A90]">
              <Terminal size={14} className="text-[#00FF9C]" />
              <span className="text-[#D6E2F0]">case_study.sh --id={project.id}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-[#111723] hover:bg-[#1B2433] text-[#6B7A90] hover:text-[#00FF9C] border border-[#1B2433] hover:border-[#00FF9C] transition-colors cursor-pointer"
            aria-label="Close Case Study"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#00FF9C]">
              <span className="px-2 py-0.5 rounded bg-[#00FF9C]/10 border border-[#00FF9C]/40 text-[10px] font-bold uppercase tracking-wider">
                {category}
              </span>
              <span>// ARCHITECTURE SPECIFICATION</span>
            </div>

            <h2 id="terminal-modal-title" className="text-2xl sm:text-4xl font-extrabold text-[#D6E2F0] font-['Space_Grotesk']">
              {title}
            </h2>

            <p className="text-[#6B7A90] text-xs sm:text-sm leading-relaxed">
              &gt; {overview}
            </p>
          </div>

          {/* Media Preview */}
          {image && (
            <div className="rounded border border-[#1B2433] h-52 sm:h-64 relative bg-[#05060A] overflow-hidden">
              <img src={image} alt={title} className="w-full h-full object-cover filter brightness-95" />
              <div className="absolute inset-0 cyber-scanlines opacity-40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent opacity-60" />
            </div>
          )}

          {/* Metrics Grid */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded bg-[#05060A] border border-[#1B2433] text-left"
                >
                  <p className="text-[10px] uppercase font-bold text-[#6B7A90]">
                    // {m.label}
                  </p>
                  <p className="text-sm font-bold text-[#00FF9C] mt-1">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Case Study Breakdown: Problem -> Decision -> Result */}
          {caseStudy && (
            <div className="space-y-5 border-t border-[#1B2433] pt-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#00D9FF] flex items-center gap-2">
                <Award size={15} className="text-[#00D9FF]" />
                [ ENGINEERING CASE STUDY BREAKDOWN ]
              </h3>

              {/* Problem */}
              <div className="flex gap-4 items-start p-4 rounded bg-[#05060A] border border-[#1B2433]">
                <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <AlertCircle size={16} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    01 // THE CHALLENGE
                  </h4>
                  <p className="text-xs text-[#D6E2F0] leading-relaxed">
                    {caseStudy.problem}
                  </p>
                </div>
              </div>

              {/* Decision */}
              <div className="flex gap-4 items-start p-4 rounded bg-[#05060A] border border-[#1B2433]">
                <div className="w-8 h-8 rounded bg-[#00D9FF]/10 border border-[#00D9FF]/40 flex items-center justify-center text-[#00D9FF] shrink-0 mt-0.5">
                  <Cpu size={16} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#00D9FF] uppercase tracking-wider">
                    02 // ARCHITECTURAL DECISIONS
                  </h4>
                  <p className="text-xs text-[#D6E2F0] leading-relaxed">
                    {caseStudy.decision}
                  </p>
                </div>
              </div>

              {/* Result */}
              <div className="flex gap-4 items-start p-4 rounded bg-[#05060A] border border-[#1B2433]">
                <div className="w-8 h-8 rounded bg-[#00FF9C]/10 border border-[#00FF9C]/40 flex items-center justify-center text-[#00FF9C] shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#00FF9C] uppercase tracking-wider">
                    03 // KEY RESULTS &amp; IMPACT
                  </h4>
                  <p className="text-xs text-[#D6E2F0] leading-relaxed">
                    {caseStudy.result}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tech Badges */}
          <div className="border-t border-[#1B2433] pt-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7A90] mb-2.5">
              [ STACK MODULES ]
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-[#111723] border border-[#1B2433] rounded text-xs text-[#00FF9C]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-[#1B2433]">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="cyber-bracket inline-flex items-center gap-2 px-6 py-2.5 bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black font-extrabold text-xs uppercase tracking-wider rounded shadow-[0_0_15px_rgba(0,255,156,0.4)] transition-all cursor-pointer"
              >
                <span>[ LAUNCH LIVE DEMO ]</span>
                <ExternalLink size={14} />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="cyber-bracket inline-flex items-center gap-2 px-6 py-2.5 bg-[#05060A] hover:bg-[#111723] text-[#D6E2F0] hover:text-[#00FF9C] font-bold text-xs uppercase tracking-wider rounded border border-[#1B2433] hover:border-[#00FF9C] transition-all cursor-pointer"
              >
                <Github size={15} />
                <span>[ VIEW SOURCE CODE ]</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;
