import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Eye, Sparkles } from 'lucide-react';

const ProjectCard = ({ project, onOpenCaseStudy, priority = false }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for natural physical lag
  const springConfig = { damping: 20, stiffness: 260 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform coordinates to 3D rotation angles (-8 to +8 degrees)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const glareOpacity = useTransform(smoothY, [-0.5, 0.5], [0.15, 0]);

  const handleMouseMove = (e) => {
    // Skip tilt calculation if reduced motion is requested
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const { title, tagline, category, image, overview, techStack, liveUrl, githubUrl, metrics } = project;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative rounded-3xl glass-card overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-premium-hover transition-shadow duration-300 flex flex-col justify-between text-left group"
    >
      {/* Glare Reflection Layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 rounded-3xl z-20"
        style={{ opacity: glareOpacity }}
      />

      <div>
        {/* Project Thumbnail with Hover Zoom & Live Badge */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isHovered ? 'scale-108' : 'scale-100'
            }`}
            loading={priority ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

          {/* Top Category Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/90 dark:bg-slate-900/90 text-blue-600 dark:text-blue-400 backdrop-blur-md shadow-sm border border-slate-200/50 dark:border-slate-700">
              {category}
            </span>
            {project.isFeatured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-500/90 text-white shadow-sm">
                <Sparkles size={11} /> Featured
              </span>
            )}
          </div>

          {/* Hover Case Study Trigger Overlay */}
          <div
            className={`absolute inset-0 bg-blue-950/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 z-10 ${
              isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <button
              type="button"
              onClick={() => onOpenCaseStudy(project)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl hover:bg-blue-600 hover:text-white transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
            >
              <Eye size={15} />
              <span>Explore Case Study</span>
            </button>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-6 sm:p-7 space-y-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            {tagline && (
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">
                {tagline}
              </p>
            )}
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3">
            {overview}
          </p>

          {/* Metrics Pills */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/80 text-left"
                >
                  <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 truncate">
                    {m.label}
                  </p>
                  <p className="text-xs font-black text-slate-800 dark:text-slate-100 truncate mt-0.5">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200/50 dark:border-slate-700/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 sm:p-7 pt-0 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800/80 mt-4">
        <button
          type="button"
          onClick={() => onOpenCaseStudy(project)}
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
        >
          View Case Study &rarr;
        </button>

        <div className="flex items-center gap-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              title="View GitHub Code"
              aria-label={`GitHub repo for ${title}`}
            >
              <Github size={16} />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
              title="Launch Live Demo"
              aria-label={`Live demo for ${title}`}
            >
              <span>Demo</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;