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
import TerminalPromptHeader from './TerminalPromptHeader';
import PhysicsSkills from './PhysicsSkills';

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

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-[#05060A] text-[#D6E2F0] relative overflow-hidden font-mono">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00FF9C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#00D9FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Terminal Header */}
        <TerminalPromptHeader
          title="SKILLS"
          tag="// 02 EXPERTISE"
          subtitle="Engineering stack, technical competencies, and interactive physics simulation sandbox."
        />

        {/* 1. Physics Skills Interactive Playground */}
        <div className="mb-16">
          <PhysicsSkills />
        </div>

        {/* 2. Structured Skills Categorization Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: catIdx * 0.08 }}
              className="cyber-bracket cyber-card p-6 rounded-lg bg-[#0B0F17] border border-[#1B2433] hover:border-[#00FF9C]/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-[#6B7A90]">
                  <span className="text-[#00FF9C] font-semibold">// 0{catIdx + 1} MODULE</span>
                  <span className="text-[10px] uppercase">READY</span>
                </div>

                <h3 className="text-lg font-bold text-[#D6E2F0] mb-1.5 font-['Space_Grotesk'] text-left">
                  {category.title}
                </h3>
                <p className="text-[#6B7A90] text-xs text-left mb-5 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Skills Badges */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1B2433]">
                {category.skills.map((skill) => {
                  const Icon = iconMap[skill.name] || MdOutlineCode;
                  return (
                    <div
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#05060A] border border-[#1B2433] hover:border-[#00D9FF] rounded text-xs transition-colors cursor-default"
                    >
                      <Icon className="text-sm text-[#00D9FF]" />
                      <span className="text-[11px] font-bold text-[#D6E2F0]">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
