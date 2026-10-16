import { motion } from 'framer-motion';
import { BookOpen, Code2, Lightbulb } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const About = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="about" className="py-24 bg-white dark:bg-[#0b0f19] relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Who I Am
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
              About Me
            </h2>
          </div>
          <div className="h-1 w-20 bg-blue-600 dark:bg-blue-400 rounded-full hidden md:block mb-3" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Paragraphs Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ staggerChildren: 0.15 }}
            className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed text-left"
          >
            <motion.p variants={cardVariants} className="font-semibold text-slate-800 dark:text-slate-100">
              {personalInfo.bioDetailed}
            </motion.p>
            
            <motion.p variants={cardVariants}>
              My development philosophy focuses on building scalable software architectures, writing clean and maintainable code, and crafting intuitive user interfaces. I actively apply data structures and algorithms to optimize application latency and database operations.
            </motion.p>

            <motion.div variants={cardVariants} className="pt-4 flex flex-wrap gap-3">
              {personalInfo.quickTags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/80 rounded-xl text-blue-800 dark:text-blue-300 text-sm font-semibold shadow-xs"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Core Highlights Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 grid grid-cols-1 gap-5"
          >
            {/* Box 1 */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4 text-left shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <BookOpen size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Education Path</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Bachelor of Engineering in CSE</p>
                <p className="text-blue-600 dark:text-blue-400 text-xs font-bold mt-2">Chitkara University (2024 - 2028)</p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4 text-left shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Code2 size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Stack &amp; Focus</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">MongoDB · Express · React · Node</p>
                <p className="text-blue-600 dark:text-blue-400 text-xs font-bold mt-2">Full-Stack MERN Architecture</p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4 text-left shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Lightbulb size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Philosophy</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Building clean, human-centric software for measurable impact.</p>
                <p className="text-blue-600 dark:text-blue-400 text-xs font-bold mt-2">Creative Problem Solver</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
