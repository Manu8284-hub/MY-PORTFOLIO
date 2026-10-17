import { useState, useEffect } from 'react';
import { GitCommit, Code2, RefreshCw, ExternalLink } from 'lucide-react';
import { socialLinks } from '../data/portfolioData';

const FALLBACK_NOW_DATA = {
  github: {
    latestRepo: 'Manu8284-hub/MY-PORTFOLIO',
    commitMessage: 'feat: cyberpunk hacker HUD restyle, physics skills & terminal mode',
    commitDate: 'Recent commit',
    status: 'Active'
  },
  leetcode: {
    totalSolved: 305,
    ranking: 'Top 12%',
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
    } catch {
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNowData();
  }, []);

  return (
    <div className="cyber-bracket cyber-card rounded-lg p-5 sm:p-6 bg-[#0B0F17] border border-[#1B2433] hover:border-[#00FF9C]/40 text-left relative overflow-hidden font-mono shadow-[0_0_20px_rgba(0,0,0,0.6)]">
      {/* Widget Header */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#1B2433]">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isLive ? 'bg-[#00FF9C]' : 'bg-[#00D9FF]'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isLive ? 'bg-[#00FF9C]' : 'bg-[#00D9FF]'
              }`}
            />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D6E2F0]">
            // LIVE HUD TELEMETRY
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#05060A] text-[#00FF9C] border border-[#1B2433]">
            {isLive ? 'LIVE_STREAM' : 'CACHED_PIPE'}
          </span>
        </div>

        <button
          onClick={fetchNowData}
          disabled={loading}
          className="p-1.5 rounded bg-[#05060A] text-[#6B7A90] hover:text-[#00FF9C] border border-[#1B2433] hover:border-[#00FF9C] transition-all cursor-pointer"
          title="Refresh HUD telemetry"
          aria-label="Refresh HUD telemetry"
        >
          <RefreshCw size={12} className={loading ? 'animate-spin text-[#00FF9C]' : ''} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        {/* GitHub Activity Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#6B7A90]">
            <span className="font-bold flex items-center gap-1.5 text-[#00D9FF]">
              <GitCommit size={14} className="text-[#00D9FF]" />
              &gt; GIT_COMMIT_HEAD
            </span>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="text-[#00FF9C] hover:underline flex items-center gap-0.5 text-[11px]"
            >
              <span>HUB</span>
              <ExternalLink size={9} />
            </a>
          </div>

          <div className="p-3 rounded bg-[#05060A] border border-[#1B2433]">
            <p className="text-xs font-mono font-bold text-[#D6E2F0] truncate">
              {data.github?.latestRepo || 'Manu8284-hub/MY-PORTFOLIO'}
            </p>
            <p className="text-xs text-[#6B7A90] mt-1 line-clamp-1">
              &quot;{data.github?.commitMessage || 'feat: latest system upgrade'}&quot;
            </p>
            <p className="text-[10px] text-[#00FF9C] mt-1.5">
              // {data.github?.commitDate || 'Recent'}
            </p>
          </div>
        </div>

        {/* LeetCode Live Progress Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#6B7A90]">
            <span className="font-bold flex items-center gap-1.5 text-[#FF2BD6]">
              <Code2 size={14} className="text-[#FF2BD6]" />
              &gt; ALGO_METRICS
            </span>
            <a
              href={socialLinks.leetcode}
              target="_blank"
              rel="noreferrer"
              className="text-[#FF2BD6] hover:underline flex items-center gap-0.5 text-[11px]"
            >
              <span>LEETCODE</span>
              <ExternalLink size={9} />
            </a>
          </div>

          <div className="p-3 rounded bg-[#05060A] border border-[#1B2433] flex items-center justify-between">
            <div>
              <p className="text-xl font-black text-[#D6E2F0]">
                {data.leetcode?.totalSolved || '300+'}
              </p>
              <p className="text-[9px] uppercase font-bold text-[#6B7A90]">
                SOLVED // {data.leetcode?.ranking || 'Top 12%'}
              </p>
            </div>

            <div className="flex gap-1.5 text-center text-[10px] font-bold font-mono">
              <div className="px-2 py-1 bg-[#0B0F17] border border-[#00FF9C]/40 text-[#00FF9C] rounded">
                <p>{data.leetcode?.easy || 140}</p>
                <p className="text-[7px] text-[#6B7A90]">EASY</p>
              </div>
              <div className="px-2 py-1 bg-[#0B0F17] border border-amber-500/40 text-amber-400 rounded">
                <p>{data.leetcode?.medium || 145}</p>
                <p className="text-[7px] text-[#6B7A90]">MED</p>
              </div>
              <div className="px-2 py-1 bg-[#0B0F17] border border-[#FF2BD6]/40 text-[#FF2BD6] rounded">
                <p>{data.leetcode?.hard || 20}</p>
                <p className="text-[7px] text-[#6B7A90]">HARD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowWidget;
