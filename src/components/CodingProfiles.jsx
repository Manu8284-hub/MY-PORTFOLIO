import { motion } from 'framer-motion';
import { ExternalLink, Linkedin } from 'lucide-react';
import { SiLeetcode, SiGithub } from 'react-icons/si';
import { socialLinks } from '../data/portfolioData';

const profilesData = [
  {
    name: "GitHub",
    icon: SiGithub,
    username: "Manu8284-hub",
    color: "hover:border-slate-800 dark:hover:border-slate-500 hover:shadow-slate-100 dark:hover:shadow-slate-900",
    iconColor: "text-slate-800 dark:text-slate-200",
    stats: [
      { label: "Repositories", value: "25+" },
      { label: "Contributions", value: "200+ this year" },
      { label: "Primary Stacks", value: "MERN Stack" }
    ],
    profileUrl: socialLinks.github
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    username: "manu-sharma-866372318",
    color: "hover:border-blue-600 hover:shadow-blue-50 dark:hover:shadow-blue-950/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    stats: [
      { label: "Connections", value: "500+" },
      { label: "Profile Status", value: "All-Star Profile" },
      { label: "Network Growth", value: "Active Sharing" }
    ],
    profileUrl: socialLinks.linkedin
  },
  {
    name: "LeetCode",
    icon: SiLeetcode,
    username: "manu-1234",
    color: "hover:border-amber-500 hover:shadow-amber-50 dark:hover:shadow-amber-950/30",
    iconColor: "text-amber-500",
    stats: [
      { label: "Problems Solved", value: "300+" },
      { label: "Contest Rating", value: "Top 12%" },
      { label: "Active Practice", value: "Continuous DSA" }
    ],
    profileUrl: socialLinks.leetcode
  }
];

const CodingProfiles = () => {
  return (
    <section id="coding-profiles" className="py-24 bg-white dark:bg-[#0b0f19] relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-indigo-100/10 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Coding Metrics
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-2">
              Coding Profiles
            </h2>
          </div>
          <div className="h-1 w-20 bg-blue-600 dark:bg-blue-400 rounded-full hidden md:block mb-3" />
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {profilesData.map((profile, idx) => {
            const Icon = profile.icon;
            return (
              <motion.div
                key={profile.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`glass-card p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm transition-all duration-300 flex flex-col justify-between text-left ${profile.color}`}
              >
                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 ${profile.iconColor} shrink-0`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                        {profile.name}
                      </h3>
                      <p className="text-slate-400 dark:text-slate-500 text-xs font-mono truncate max-w-[150px]">
                        @{profile.username}
                      </p>
                    </div>
                  </div>

                  {/* Stats list */}
                  <div className="space-y-3 mb-6">
                    {profile.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="text-xs">
                        <p className="text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">{stat.label}</p>
                        <p className="text-slate-700 dark:text-slate-200 font-extrabold mt-0.5">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Profile Link Button */}
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-500 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 mt-auto cursor-pointer"
                >
                  View Profile
                  <ExternalLink size={13} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;
