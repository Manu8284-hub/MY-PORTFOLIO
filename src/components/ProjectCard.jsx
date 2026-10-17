import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Eye, Sparkles } from 'lucide-react';

const ProjectCard = ({ project, index = 1, onOpenCaseStudy, priority = false }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D tilt physics (max ~10 degrees)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 280 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const glareOpacity = useTransform(smoothY, [-0.5, 0.5], [0.22, 0]);

  const handleMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const { title, tagline, category, image, overview, techStack, liveUrl, githubUrl, metrics } = project;
  const projectIndexStr = String(index).padStart(2, '0');

  return (
    <motion.div
      ref={cardRef}
      data-cursor="project"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="project-card cyber-bracket cyber-card relative rounded-lg overflow-hidden border border-[#1B2433] hover:border-[#00FF9C]/60 transition-all duration-300 flex flex-col justify-between text-left group select-none shadow-[0_0_20px_rgba(0,0,0,0.7)] font-mono"
    >
      {/* Glare Reflection Layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-[#00FF9C]/10 to-white/0 rounded-lg z-20"
        style={{ opacity: glareOpacity }}
      />

      <div>
        {/* Top Status Header */}
        <div className="px-5 py-3 border-b border-[#1B2433] bg-[#05060A]/80 flex items-center justify-between text-xs text-[#6B7A90]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9C] shadow-[0_0_6px_#00FF9C]" />
            <span className="text-[#00FF9C] font-semibold">// {projectIndexStr} PROJECT</span>
          </div>
          <span className="text-[10px] tracking-wider text-[#6B7A90] uppercase">
            {category}
          </span>
        </div>

        {/* Thumbnail Preview */}
        <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-[#05060A] border-b border-[#1B2433]">
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover filter brightness-90 contrast-105 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            loading={priority ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 cyber-scanlines opacity-40 pointer-events-none" />

          {/* Featured HUD Badge */}
          {project.isFeatured && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#0B0F17]/90 text-[#FF2BD6] border border-[#FF2BD6]/50 shadow-[0_0_10px_rgba(255,43,214,0.3)]">
                <Sparkles size={11} /> FEATURED
              </span>
            </div>
          )}

          {/* Hover Explore Button Overlay */}
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-200 z-10 ${
              isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <button
              type="button"
              onClick={() => onOpenCaseStudy(project)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00FF9C] text-black font-extrabold text-xs uppercase tracking-wider rounded shadow-[0_0_20px_rgba(0,255,156,0.5)] hover:scale-105 transition-transform cursor-pointer"
            >
              <Eye size={14} />
              <span>[ EXPLORE CASE STUDY ]</span>
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#D6E2F0] group-hover:text-[#00FF9C] transition-colors font-['Space_Grotesk']">
              {title}
            </h3>
            {tagline && (
              <p className="text-xs font-mono text-[#00D9FF] mt-1">
                // {tagline}
              </p>
            )}
          </div>

          <p className="text-[#6B7A90] text-xs sm:text-sm leading-relaxed line-clamp-2">
            {overview}
          </p>

          {/* Metrics HUD Chips */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1.5 rounded bg-[#05060A] border border-[#1B2433] text-left"
                >
                  <p className="text-[9px] uppercase font-bold text-[#6B7A90] truncate">
                    {m.label}
                  </p>
                  <p className="text-xs font-bold text-[#00FF9C] truncate mt-0.5">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono text-[#D6E2F0] bg-[#111723] rounded border border-[#1B2433]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 sm:p-6 pt-0 flex items-center justify-between gap-3 border-t border-[#1B2433] mt-2 pt-4">
        <button
          type="button"
          onClick={() => onOpenCaseStudy(project)}
          className="text-xs font-bold text-[#00FF9C] hover:text-[#00D9FF] flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <span>&gt; CASE STUDY</span>
          <span>&rarr;</span>
        </button>

        <div className="flex items-center gap-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded bg-[#05060A] hover:bg-[#111723] border border-[#1B2433] hover:border-[#00FF9C] text-[#6B7A90] hover:text-[#00FF9C] transition-colors"
              title="View GitHub Code"
              aria-label={`GitHub repo for ${title}`}
            >
              <Github size={15} />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#00FF9C]/15 border border-[#00FF9C] hover:bg-[#00FF9C] text-[#00FF9C] hover:text-black font-bold text-xs transition-colors shadow-[0_0_10px_rgba(0,255,156,0.15)]"
              title="Launch Live Demo"
              aria-label={`Live demo for ${title}`}
            >
              <span>DEMO</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;