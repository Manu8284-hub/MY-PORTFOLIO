import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/portfolioData';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Separate featured spotlights and full engineering projects
  const featuredList = projectsData.filter((p) => p.isFeatured);
  const otherList = projectsData.filter((p) => !p.isFeatured);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-[#0b0f19] relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-50/60 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-50/60 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Selected Work
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
              Featured Projects
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-xl text-left">
              Production web applications, AI assistants, and embedded systems engineered with modern full-stack architectures.
            </p>
          </div>
          <div className="h-1 w-20 bg-blue-600 dark:bg-blue-400 rounded-full hidden md:block mb-3" />
        </div>

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
                onOpenCaseStudy={(proj) => setSelectedProject(proj)}
                priority={idx === 0}
              />
            </motion.div>
          ))}
        </div>

        {/* Engineering Architecture & Systems Header */}
        <div className="mb-10 text-left border-t border-slate-100 dark:border-slate-800/80 pt-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Systems &amp; Architecture
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            More Engineering Projects
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Backend security systems, IoT hardware automation, and high-performance frontend interfaces.
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
                onOpenCaseStudy={(proj) => setSelectedProject(proj)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
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
