import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers, Cpu, Code, Database, ShoppingBag } from 'lucide-react';

const featuredProject = {
  title: "Campus Connect Hub",
  subtitle: "Featured Full-Stack Project",
  description: "A comprehensive student community platform built to improve collaboration, communication, and resource sharing among students. It serves as a central hub for campus updates, student groups, and shared learning materials.",
  image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
  features: [
    "Student networking & profile spaces",
    "Resource sharing (documents, study guides)",
    "Real-time event updates & campus calendar",
    "Secure JWT-based user authentication",
    "Fully responsive design for all screen sizes"
  ],
  techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL"],
  liveUrl: "https://campus-connect-hub-omega-green.vercel.app/",
  githubUrl: "https://github.com/Manu8284-hub/Campus_Connect_Hub",
};

const otherProjects = [
  {
    title: "Human-Following Suitcase",
    category: "Hardware & IoT",
    icon: Cpu,
    overview: "Designed an autonomous smart suitcase that tracks and follows its owner utilizing sensor arrays, eliminating manual dragging in airports and terminals.",
    tech: ["ESP32", "Ultrasonic Sensors", "DC Motors", "Motor Driver L298N"],
    highlights: ["Real-time distance tracking", "Collision avoidance algorithms", "Embedded C++ controller"]
  },
  {
    title: "E-Commerce Website",
    category: "Frontend Web Development",
    icon: ShoppingBag,
    overview: "A responsive online shopping interface features fully interactive user flows from product listings, cart management, to secure checking out stages.",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    highlights: ["Modular CSS stylesheet", "Dynamic client-side shopping cart", "Client-side payment flow mockup"]
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Selected Work
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">
              Featured Projects
            </h2>
          </div>
          <div className="h-1 w-20 bg-blue-600 rounded-full hidden md:block mb-3" />
        </div>

        {/* Featured Project Large Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-premium-hover transition-shadow duration-500 mb-16 border border-slate-100 bg-white/70"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
            {/* Image Side */}
            <div className="lg:col-span-6 h-64 sm:h-80 md:h-[400px] w-full overflow-hidden relative">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              <span className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                Featured Project
              </span>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-6 p-8 sm:p-12 space-y-6 text-left">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                {featuredProject.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {featuredProject.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {featuredProject.description}
              </p>

              {/* Key Features */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Key Capabilities
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-500 text-xs font-medium">
                  {featuredProject.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 pt-2">
                {featuredProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-bold text-slate-700 bg-slate-100 rounded-lg border border-slate-200/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={featuredProject.liveUrl}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Live Demo
                  <ExternalLink size={16} />
                </a>
                <a
                  href={featuredProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  View Code
                  <Github size={16} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Projects Heading */}
        <div className="mb-10 text-left">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            More Engineering Projects
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            A list of academic projects and technologies I build during my developer journey.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {otherProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      {project.category}
                    </span>
                    <div className="text-slate-400 p-2 bg-slate-50 rounded-xl border border-slate-100">
                      <Icon size={20} className="text-blue-600" />
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 mb-3">
                    {project.title}
                  </h4>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {project.overview}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-6">
                    {project.highlights.map((item, idx) => (
                      <p key={idx} className="text-slate-600 text-xs font-medium flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-500" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Footer Badges */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200/50 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
