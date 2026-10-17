import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/portfolioData';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import TerminalPromptHeader from './TerminalPromptHeader';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const featuredList = projectsData.filter((p) => p.isFeatured);
  const otherList = projectsData.filter((p) => !p.isFeatured);

  return (
    <section id="projects" className="py-24 bg-[#05060A] text-[#D6E2F0] relative overflow-hidden font-mono">
      {/* Ambient Cyber Neon Background Accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#00FF9C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#00D9FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Terminal Section Header */}
        <TerminalPromptHeader
          title="PROJECTS"
          tag="// 03 PORTFOLIO"
          subtitle="Production web applications, AI assistants, and embedded systems engineered with modern full-stack architectures."
        />

        {/* Featured Projects Grid (Spotlights) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-stretch">
          {featuredList.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full flex flex-col"
            >
              <ProjectCard
                project={project}
                index={idx + 1}
                onOpenCaseStudy={(proj) => setSelectedProject(proj)}
                priority={idx === 0}
              />
            </motion.div>
          ))}
        </div>

        {/* Systems & Architecture Subheading */}
        <div className="mb-10 text-left border-t border-[#1B2433] pt-12">
          <div className="flex items-center gap-2 text-xs text-[#00D9FF] mb-2 font-mono">
            <span>&gt;&gt;</span>
            <span className="font-bold tracking-widest uppercase">ADDITIONAL SYSTEMS &amp; ARCHITECTURES</span>
          </div>
          <p className="text-xs sm:text-sm text-[#6B7A90] font-mono">
            // Backend security pipelines, IoT hardware firmware, and interactive frontend interfaces.
          </p>
        </div>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {otherList.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="h-full flex flex-col"
            >
              <ProjectCard
                project={project}
                index={featuredList.length + index + 1}
                onOpenCaseStudy={(proj) => setSelectedProject(proj)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Terminal Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
