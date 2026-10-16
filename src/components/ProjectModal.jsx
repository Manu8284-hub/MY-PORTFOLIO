import { motion } from 'framer-motion';
import { X, ExternalLink, Github, AlertCircle, Cpu, CheckCircle2, Award } from 'lucide-react';
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
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-left"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
          aria-label="Close Case Study"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            {category}
          </span>
          <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {overview}
          </p>
        </div>

        {/* Media Preview */}
        {image && (
          <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-52 sm:h-64 relative bg-slate-100 dark:bg-slate-800">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Metrics Grid */}
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 text-center"
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {m.label}
                </p>
                <p className="text-sm font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Case Study Breakdown: Problem -> Decision -> Result */}
        {caseStudy && (
          <div className="space-y-6 border-t border-slate-100 dark:border-slate-800 pt-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Award size={15} className="text-blue-600 dark:text-blue-400" />
              Engineering Case Study
            </h3>

            {/* Problem */}
            <div className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                <AlertCircle size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  1. The Problem
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {caseStudy.problem}
                </p>
              </div>
            </div>

            {/* Decision */}
            <div className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                <Cpu size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  2. Architectural Decisions
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {caseStudy.decision}
                </p>
              </div>
            </div>

            {/* Result */}
            <div className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                <CheckCircle2 size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  3. Key Results &amp; Impact
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {caseStudy.result}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tech Badges */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-8 border-t border-slate-100 dark:border-slate-800 mt-6">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-md shadow-blue-500/20"
            >
              <span>Live Application</span>
              <ExternalLink size={15} />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm rounded-xl border border-slate-200 dark:border-slate-700 transition-all duration-200"
            >
              <Github size={16} />
              <span>GitHub Repository</span>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;
