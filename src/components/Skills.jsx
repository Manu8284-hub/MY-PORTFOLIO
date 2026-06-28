import { motion } from 'framer-motion';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, 
  FaNodeJs, FaJava, FaGitAlt, FaGithub, FaLock,
  FaVideo
} from 'react-icons/fa';
import { 
  SiExpress, SiMongodb, SiPostgresql, SiJsonwebtokens 
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { MdOutlineCode } from 'react-icons/md';

const skillCategories = [
  {
    title: 'Frontend Development',
    description: 'Creating interactive, beautiful, and user-centric interfaces.',
    skills: [
      { name: 'HTML5', icon: FaHtml5, color: 'text-orange-500' },
      { name: 'CSS3', icon: FaCss3Alt, color: 'text-blue-500' },
      { name: 'JavaScript', icon: FaJs, color: 'text-yellow-500' },
      { name: 'React.js', icon: FaReact, color: 'text-sky-500' },
    ]
  },
  {
    title: 'Backend Engineering',
    description: 'Building robust, secure, and scalable server-side systems.',
    skills: [
      { name: 'Node.js', icon: FaNodeJs, color: 'text-green-600' },
      { name: 'Express.js', icon: SiExpress, color: 'text-slate-800' },
      { name: 'REST APIs', icon: TbApi, color: 'text-indigo-600' },
      { name: 'JWT Auth', icon: SiJsonwebtokens, color: 'text-pink-600' },
    ]
  },
  {
    title: 'Databases & Storage',
    description: 'Designing data schemas and managing query optimization.',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: 'text-emerald-500' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-600' },
    ]
  },
  {
    title: 'Core Programming',
    description: 'Strong foundation in computer science and structures.',
    skills: [
      { name: 'Java', icon: FaJava, color: 'text-red-500' },
      { name: 'Data Structures & Algorithms', icon: MdOutlineCode, color: 'text-violet-600' },
    ]
  },
  {
    title: 'Developer Tools',
    description: 'Version control and collaboration workflows.',
    skills: [
      { name: 'Git', icon: FaGitAlt, color: 'text-orange-600' },
      { name: 'GitHub', icon: FaGithub, color: 'text-slate-900' },
    ]
  },
  {
    title: 'Creative Media',
    description: 'Content creation, video editing, and digital storytelling.',
    skills: [
      { name: 'Video Editing', icon: FaVideo, color: 'text-rose-500' },
      { name: 'CapCut / Premiere', icon: FaVideo, color: 'text-cyan-500' },
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
    <section id="skills" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[30rem] h-[30rem] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-50/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              My Toolkit
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">
              Skills & Expertise
            </h2>
          </div>
          <div className="h-1 w-20 bg-blue-600 rounded-full hidden md:block mb-3" />
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className="glass-card p-6 rounded-3xl shadow-sm hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 text-left">
                  {category.title}
                </h3>
                <p className="text-slate-500 text-sm text-left mb-6 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Skills Badges List */}
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-slate-50/80 border border-slate-200/60 rounded-xl hover:border-blue-200 hover:bg-blue-50/20 hover:scale-[1.03] transition-all duration-200 cursor-default"
                    >
                      <Icon className={`text-lg ${skill.color}`} />
                      <span className="text-xs font-bold text-slate-700">{skill.name}</span>
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
