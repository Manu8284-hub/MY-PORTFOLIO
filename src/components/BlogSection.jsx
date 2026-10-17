import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, X, Sparkles, Terminal } from 'lucide-react';
import { blogPosts } from '../data/portfolioData';
import TerminalPromptHeader from './TerminalPromptHeader';

const BlogSection = () => {
  const [activePost, setActivePost] = useState(null);

  return (
    <section id="learnings" className="py-24 bg-[#05060A] text-[#D6E2F0] relative overflow-hidden font-mono">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        <TerminalPromptHeader
          title="LEARNINGS"
          tag="// 06 LOGS"
          subtitle="Practical architecture takeaways, debugging insights, and engineering reflections from recent builds."
        />

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {blogPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => setActivePost(post)}
              className="cyber-bracket cyber-card p-6 rounded-lg bg-[#0B0F17] border border-[#1B2433] hover:border-[#00FF9C]/60 shadow-[0_0_20px_rgba(0,0,0,0.6)] flex flex-col justify-between cursor-pointer group select-none"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] text-[#6B7A90] font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-[#00FF9C]" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-[#00D9FF]" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#D6E2F0] group-hover:text-[#00FF9C] transition-colors leading-snug font-['Space_Grotesk']">
                  {post.title}
                </h3>

                <p className="text-xs text-[#6B7A90] leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="pt-5 border-t border-[#1B2433] mt-5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-[#05060A] border border-[#1B2433] text-[10px] font-mono text-[#00D9FF]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-bold text-[#00FF9C] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  &gt; READ
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Post Modal Details */}
      <AnimatePresence>
        {activePost && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono select-none"
            onClick={() => setActivePost(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="cyber-bracket relative w-full max-w-xl bg-[#0B0F17] border border-[#00FF9C] rounded-lg p-6 sm:p-8 shadow-[0_0_35px_rgba(0,255,156,0.3)] text-left"
            >
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-5 right-5 p-1.5 rounded bg-[#05060A] border border-[#1B2433] hover:border-[#00FF9C] text-[#6B7A90] hover:text-[#00FF9C] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#00FF9C]/10 text-[#00FF9C] border border-[#00FF9C]/30">
                  // LOG ENTRY
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#D6E2F0] font-['Space_Grotesk']">
                  {activePost.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-[#6B7A90]">
                  <span>LOGGED: {activePost.date}</span>
                  <span>TIME: {activePost.readTime}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#D6E2F0] leading-relaxed pt-2">
                  {activePost.summary}
                </p>

                <div className="p-4 rounded bg-[#05060A] border border-[#00D9FF]/40 text-xs text-[#00D9FF] space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#00D9FF]" />
                    KEY ARCHITECTURAL TAKEAWAY:
                  </p>
                  <p className="text-[#D6E2F0]">
                    Measure real telemetry before optimizing. Clean domain boundaries, targeted cache invalidation, and observable APIs outperform premature complexity every time.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogSection;
