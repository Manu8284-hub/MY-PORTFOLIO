import { motion } from 'framer-motion';
import { Award, ShieldCheck, ExternalLink } from 'lucide-react';

const certificationsData = [
  {
    title: "Communication Skills for Engineers",
    issuer: "Certificate of Completion",
    date: "2026",
    skills: ["Communication", "Professional Skills", "Engineering"],
    verifyUrl: "#",
    id: "COMMUNICATION-SKILLS-ENGINEERS"
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-indigo-100/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Verified Credentials
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">
              Certifications
            </h2>
          </div>
          <div className="h-1 w-20 bg-blue-600 rounded-full hidden md:block mb-3" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {certificationsData.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                    <Award size={22} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200/50 px-3 py-1 rounded-md">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
                  {cert.title}
                </h3>
                <h4 className="text-sm font-semibold text-slate-500 mb-4 flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-blue-500" />
                  {cert.issuer}
                </h4>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 bg-slate-50 border border-slate-200/50 rounded-md text-[10px] font-bold text-slate-500"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Credential Verification ID & Link */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs mt-auto">
                <span className="font-semibold text-slate-400">
                  ID: <span className="font-mono text-slate-500">{cert.id}</span>
                </span>
                
                <a
                  href={cert.verifyUrl}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold transition-colors"
                >
                  Verify
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
