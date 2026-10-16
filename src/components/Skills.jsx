import { motion } from 'framer-motion';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, 
  FaNodeJs, FaJava, FaGitAlt, FaGithub,
  FaVideo
} from 'react-icons/fa';
import { 
  SiExpress, SiMongodb, SiPostgresql, SiJsonwebtokens, SiFramer, SiTailwindcss, SiPostman
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { MdOutlineCode, MdAutoAwesome } from 'react-icons/md';
import { skillCategories } from '../data/portfolioData';

// Map skill names to icons
const iconMap = {
  'HTML5': FaHtml5,
  'CSS3 / Tailwind': SiTailwindcss,
  'JavaScript (ES6+)': FaJs,
  'React.js 19': FaReact,
  'Framer Motion': SiFramer,
  'Node.js': FaNodeJs,
  'Express.js': SiExpress,
  'RESTful APIs': TbApi,
  'JWT Authentication': SiJsonwebtokens,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'Mongoose ODM': SiMongodb,
  'Java': FaJava,
  'Data Structures & Algorithms': MdOutlineCode,
  'Object-Oriented Programming': MdOutlineCode,
  'Git': FaGitAlt,
  'GitHub': FaGithub,
  'Vite & Webpack': MdOutlineCode,
  'Postman': SiPostman,
  'Video Editing': FaVideo,
  'Adobe Premiere / CapCut': FaVideo,
  'UI / UX Design': MdAutoAwesome
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-slate-50 dark:bg-[#0b0f19] relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/4 right-0 w-[30rem] h-[30rem] bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-50/20 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              My Toolkit
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
              Skills &amp; Expertise
            </h2>
          </div>
          <div className="h-1 w-20 bg-blue-600 dark:bg-blue-400 rounded-full hidden md:block mb-3" />
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className="glass-card p-6 rounded-3xl shadow-sm hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between dark:border-slate-800"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 text-left">
                  {category.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm text-left mb-6 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Skills Badges List */}
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => {
                  const Icon = iconMap[skill.name] || MdOutlineCode;
                  return (
                    <div
                      key={skill.name}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:scale-[1.03] transition-all duration-200 cursor-default shadow-2xs"
                    >
                      <Icon className={`text-lg ${skill.color}`} />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
