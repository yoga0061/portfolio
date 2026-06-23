import React from 'react';
import { Github, Code2, GitFork, Star } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';

export const GitHubActivity: React.FC = () => {
  const topLanguages = [
    { name: 'Python', percent: 45, color: 'bg-emerald-500' },
    { name: 'JavaScript / React', percent: 35, color: 'bg-neon-cyan' },
    { name: 'HTML & Vanilla CSS', percent: 12, color: 'bg-neon-purple' },
    { name: 'Shell / Batch script', percent: 8, color: 'bg-neon-pink' }
  ];

  const recentRepos = [
    { name: 'aadhaar-integrity-tracker', desc: 'UIDAI Hackathon 2026 risk intelligence platform', stars: 2, forks: 0 },
    { name: 'TwoFrames', desc: 'Shared couple journal and real-time photo vault', stars: 1, forks: 1 },
    { name: 'collab-board', desc: 'Student collaboration profile and peer discussion workspace', stars: 1, forks: 0 },
    { name: 'keylogger-detection', desc: 'Windows process keyboard hook audit utility', stars: 0, forks: 0 }
  ];

  return (
    <SectionWrapper id="github-activity" className="relative">
      
      {/* Title */}
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 font-mono uppercase">
          &gt;_ GITHUB ACTIVITY
        </h2>
        <div className="h-1 w-20 bg-neon-cyan dark:bg-neon-green rounded mx-auto md:mx-0" />
      </div>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Stats and Languages (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Main GitHub Profile Info Card */}
          <div className="glass-panel bg-[#070c18]/45 border border-slate-200 dark:border-slate-800/80 p-6 rounded-3xl flex flex-col justify-between shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-black/40 border border-slate-800 text-slate-200 rounded-2xl">
                <Github size={24} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-850 dark:text-white font-display">
                  Banavathu Yoganandha
                </h3>
                <a 
                  href="https://github.com/yoga0061" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-neon-cyan hover:underline flex items-center gap-1 mt-0.5"
                >
                  <span>@yoga0061</span>
                </a>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 mb-6 text-center font-mono">
              <div className="bg-black/35 border border-slate-850 p-2.5 rounded-xl">
                <span className="text-[8px] text-slate-505 uppercase block">REPOS</span>
                <span className="text-xs font-bold text-white mt-1 block">12+</span>
              </div>
              <div className="bg-black/35 border border-slate-850 p-2.5 rounded-xl">
                <span className="text-[8px] text-slate-505 uppercase block">FORKS</span>
                <span className="text-xs font-bold text-white mt-1 block">4</span>
              </div>
              <div className="bg-black/35 border border-slate-850 p-2.5 rounded-xl">
                <span className="text-[8px] text-slate-505 uppercase block">STARS</span>
                <span className="text-xs font-bold text-white mt-1 block">4</span>
              </div>
            </div>

            {/* Top Languages */}
            <div className="space-y-3.5">
              <span className="text-[10px] font-mono text-slate-550 uppercase tracking-widest block border-b border-slate-850 pb-1.5">
                Top Languages
              </span>
              {topLanguages.map((lang, lIdx) => (
                <div key={lIdx} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>{lang.name}</span>
                    <span>{lang.percent}%</span>
                  </div>
                  <div className="w-full bg-slate-900 border border-slate-850 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${lang.color} rounded-full`} style={{ width: `${lang.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Active Repos (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Active Repositories Card */}
          <div className="glass-panel bg-[#070c18]/45 border border-slate-200 dark:border-slate-800/80 p-6 rounded-3xl shadow-xl flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] font-mono text-slate-550 uppercase tracking-widest block mb-4 border-b border-slate-850 pb-2">
                Active Repositories
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentRepos.map((repo, rIdx) => (
                  <div key={rIdx} className="bg-black/30 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between hover:border-neon-cyan/20 transition-colors">
                    <div>
                      <h4 className="text-[11px] font-mono font-bold text-white flex items-center gap-1.5 truncate">
                        <Code2 size={11} className="text-neon-cyan" />
                        {repo.name}
                      </h4>
                      <p className="text-[9px] text-slate-450 mt-1 leading-snug min-h-[30px]">
                        {repo.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-[9px] font-mono text-slate-500 mt-3.5">
                      <span className="flex items-center gap-0.5">
                        <Star size={10} className="text-amber-500" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <GitFork size={10} />
                        {repo.forks}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

    </SectionWrapper>
  );
};

export default GitHubActivity;
