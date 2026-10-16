import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Code2, RefreshCw, Radio, ExternalLink } from 'lucide-react';
import { socialLinks } from '../data/portfolioData';

const FALLBACK_NOW_DATA = {
  github: {
    latestRepo: "Manu8284-hub/MY-PORTFOLIO",
    commitMessage: "feat: terminal CLI mode, recruiter AI chat & live metrics",
    commitDate: "Recent commit",
    status: "Active"
  },
  leetcode: {
    totalSolved: 305,
    ranking: "Top 12%",
    easy: 140,
    medium: 145,
    hard: 20
  },
  cached: true
};

const NowWidget = () => {
  const [data, setData] = useState(FALLBACK_NOW_DATA);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const fetchNowData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/now');
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setIsLive(true);
      } else {
        setIsLive(false);
      }
    } catch (err) {
      console.warn('Using fallback for Now widget:', err);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNowData();
  }, []);

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm text-left relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Widget Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isLive ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isLive ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Live &ldquo;Now&rdquo; Activity
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-mono text-slate-500">
            {isLive ? 'Live Sync' : 'Cached Sync'}
          </span>
        </div>

        <button
          onClick={fetchNowData}
          disabled={loading}
          className="p-1.5 rounded-xl text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          title="Refresh stats"
          aria-label="Refresh live stats"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin text-blue-600' : ''} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* GitHub Latest Commit Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <GitCommit size={15} className="text-blue-600 dark:text-blue-400" />
              Latest GitHub Activity
            </span>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
            >
              <span>GitHub</span>
              <ExternalLink size={10} />
            </a>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/70">
            <p className="text-xs font-mono font-bold text-slate-900 dark:text-white truncate">
              {data.github?.latestRepo || "Manu8284-hub/MY-PORTFOLIO"}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 italic">
              &ldquo;{data.github?.commitMessage || "feat: latest updates"}&rdquo;
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-mono">
              {data.github?.commitDate || "Recent"}
            </p>
          </div>
        </div>

        {/* LeetCode Live Progress Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <Code2 size={15} className="text-amber-500" />
              LeetCode Performance
            </span>
            <a
              href={socialLinks.leetcode}
              target="_blank"
              rel="noreferrer"
              className="text-amber-500 hover:underline flex items-center gap-0.5"
            >
              <span>Profile</span>
              <ExternalLink size={10} />
            </a>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/70 flex items-center justify-between">
            <div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {data.leetcode?.totalSolved || "300+"}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-0.5">
                Problems Solved
              </p>
            </div>

            <div className="flex gap-2 text-center text-[10px] font-bold font-mono">
              <div className="px-2 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-lg">
                <p>{data.leetcode?.easy || 140}</p>
                <p className="text-[8px] text-slate-400">Easy</p>
              </div>
              <div className="px-2 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 rounded-lg">
                <p>{data.leetcode?.medium || 145}</p>
                <p className="text-[8px] text-slate-400">Med</p>
              </div>
              <div className="px-2 py-1 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-lg">
                <p>{data.leetcode?.hard || 20}</p>
                <p className="text-[8px] text-slate-400">Hard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowWidget;
