import { motion } from 'framer-motion';
import { ExternalLink, Linkedin } from 'lucide-react';
import { SiLeetcode, SiGithub } from 'react-icons/si';
import { socialLinks } from '../data/portfolioData';
import TerminalPromptHeader from './TerminalPromptHeader';

const profilesData = [
  {
    name: 'GitHub',
    icon: SiGithub,
    username: 'Manu8284-hub',
    neonColor: '#00FF9C',
    stats: [
      { label: 'Repositories', value: '25+ Public' },
      { label: 'Contributions', value: '200+ commits' },
      { label: 'Specialization', value: 'MERN Stack' }
    ],
    profileUrl: socialLinks.github
  },
  {
    name: 'LeetCode',
    icon: SiLeetcode,
    username: 'manu-1234',
    neonColor: '#FF2BD6',
    stats: [
      { label: 'Problems Solved', value: '300+ Problems' },
      { label: 'Contest Rating', value: 'Top 12% Global' },
      { label: 'Focus Areas', value: 'Trees, Graphs, DP' }
    ],
    profileUrl: socialLinks.leetcode
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    username: 'manu-sharma-866372318',
    neonColor: '#00D9FF',
    stats: [
      { label: 'Connections', value: '500+ Network' },
      { label: 'Profile Rating', value: 'All-Star Status' },
      { label: 'Engagement', value: 'Active Sharing' }
    ],
    profileUrl: socialLinks.linkedin
  }
];

const CodingProfiles = () => {
  return (
    <section id="coding-profiles" className="py-24 bg-[#05060A] text-[#D6E2F0] relative overflow-hidden font-mono">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#00FF9C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <TerminalPromptHeader
          title="PROFILES"
          tag="// 05 METRICS"
          subtitle="Real-world coding activity, algorithmic telemetry, and professional network presence."
        />

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {profilesData.map((profile, idx) => {
            const Icon = profile.icon;
            return (
              <motion.div
                key={profile.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="cyber-bracket cyber-card p-6 rounded-lg bg-[#0B0F17] border border-[#1B2433] hover:border-[#00FF9C]/60 shadow-[0_0_20px_rgba(0,0,0,0.6)] flex flex-col justify-between text-left group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4 text-[10px] text-[#6B7A90]">
                    <span className="text-[#00FF9C] font-semibold">// 0{idx + 1} ENDPOINT</span>
                    <span className="uppercase">SYNCED</span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="p-2.5 rounded bg-[#05060A] border border-[#1B2433] flex items-center justify-center shrink-0"
                      style={{ color: profile.neonColor }}
                    >
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#D6E2F0] text-base font-['Space_Grotesk']">
                        {profile.name}
                      </h3>
                      <p className="text-[#6B7A90] text-xs font-mono truncate max-w-[150px]">
                        @{profile.username}
                      </p>
                    </div>
                  </div>

                  {/* Stats list */}
                  <div className="space-y-3 mb-6 border-t border-[#1B2433] pt-4">
                    {profile.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="text-xs">
                        <p className="text-[#6B7A90] text-[10px] font-mono uppercase tracking-wider">
                          &gt; {stat.label}
                        </p>
                        <p className="text-[#D6E2F0] font-bold mt-0.5">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Profile Link Button */}
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-bracket w-full inline-flex items-center justify-center gap-2 py-2.5 bg-[#05060A] hover:bg-[#111723] border border-[#1B2433] hover:border-[#00FF9C] rounded text-xs font-bold text-[#D6E2F0] hover:text-[#00FF9C] transition-colors mt-auto cursor-pointer"
                >
                  <span>[ OPEN {profile.name.toUpperCase()} ]</span>
                  <ExternalLink size={12} />
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
