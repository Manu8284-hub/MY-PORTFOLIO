import { motion } from 'framer-motion';
import { Calendar, Award, GraduationCap, MapPin } from 'lucide-react';

const educationData = [
  {
    institution: "Chitkara University",
    degree: "Bachelor of Engineering (B.E.)",
    field: "Computer Science Engineering",
    duration: "2024 - 2028 (Expected)",
    location: "Punjab, India",
    status: "Ongoing",
    highlights: [
      "Specializing in Full-Stack Software Development and Web Technologies.",
      "Hands-on learning of Core Data Structures & Algorithms, OOPs, Database Management, and Network Systems.",
      "Active participant in tech coding challenges, community hackathons, and software clubs.",
      "Maintaining an excellent academic record with a primary focus on full-stack web architectures."
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOPs)",
      "Database Management Systems (DBMS)",
      "Web Technologies (HTML/CSS/JS/React)"
    ]
  }
];

const Education = () => {
  return (
    <section id="education" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-100/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              My Academic Path
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">
              Education
            </h2>
          </div>
          <div className="h-1 w-20 bg-blue-600 rounded-full hidden md:block mb-3" />
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-blue-200/80 ml-4 md:ml-8 pl-8 md:pl-12 py-4 text-left">
          
          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[49px] md:-left-[65px] top-1.5 flex items-center justify-center">
                <span className="relative flex h-8 w-8">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20"></span>
                  <span className="relative inline-flex rounded-full h-8 w-8 bg-white border-2 border-blue-600 shadow-md flex items-center justify-center text-blue-600">
                    <GraduationCap size={16} />
                  </span>
                </span>
              </div>

              {/* Box Details */}
              <div className="glass-card p-8 rounded-3xl shadow-sm hover:shadow-premium-hover hover:-translate-y-0.5 transition-all duration-300 bg-white/70">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
                      {edu.status}
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      {edu.institution}
                    </h3>
                    <h4 className="text-lg font-bold text-slate-700 mt-1">
                      {edu.degree} — <span className="text-blue-600">{edu.field}</span>
                    </h4>
                  </div>
                  
                  <div className="flex flex-col gap-2 text-slate-500 text-sm font-semibold shrink-0">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-slate-400" />
                      <span>{edu.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-slate-400" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100 mb-6" />

                {/* Bullets */}
                <div className="space-y-4 mb-6">
                  <h5 className="text-xs font-extrabold uppercase tracking-widest text-slate-800 flex items-center gap-2">
                    <Award size={14} className="text-blue-600" />
                    Key Milestones
                  </h5>
                  <ul className="space-y-2 text-slate-600 text-sm sm:text-base leading-relaxed">
                    {edu.highlights.map((bullet, bidx) => (
                      <li key={bidx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Coursework */}
                <div>
                  <h5 className="text-xs font-extrabold uppercase tracking-widest text-slate-800 mb-3">
                    Key Coursework
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course, cidx) => (
                      <span
                        key={cidx}
                        className="px-3 py-1 bg-slate-100 hover:bg-blue-50 border border-slate-200/50 rounded-lg text-xs font-bold text-slate-700 transition-colors cursor-default"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default Education;
