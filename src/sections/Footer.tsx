import React, { useState, useEffect } from 'react';
import { ChevronUp, Cpu, Server, Activity, Github, Linkedin, Instagram, Download } from 'lucide-react';
import { analyticsActions } from '../utils/analytics';

export const Footer: React.FC = () => {
  const [time, setTime] = useState('');
  const [cpuLoad, setCpuLoad] = useState(4.2);
  const [memUsage, setMemUsage] = useState(28.4);
  const [isDownloading, setIsDownloading] = useState(false);

  // 1. Digital Clock update
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(date.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Simulate fluctuating telemetry stats
  useEffect(() => {
    const statInterval = setInterval(() => {
      setCpuLoad(() => Number((Math.random() * 3 + 2.5).toFixed(1))); // 2.5% - 5.5%
      setMemUsage(() => Number((Math.random() * 2 + 28.1).toFixed(1))); // 28.1MB - 30.1MB
    }, 4000);
    return () => clearInterval(statInterval);
  }, []);

  const handleScrollTop = () => {
    analyticsActions.commandPaletteUsed('scroll-to-top');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDownloading) return;

    setIsDownloading(true);
    analyticsActions.resumeDownload('Footer Button');

    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Banavathu_Yoganandha_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 1500);
  };

  return (
    <footer className="border-t border-slate-200/60 dark:border-slate-850 bg-white/40 dark:bg-slate-950/20 backdrop-blur-md relative z-10 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left Side: Copyright & Tagline */}
        <div className="text-center md:text-left space-y-1.5">
          <p className="text-xs text-slate-800 dark:text-slate-200 font-bold font-display">
            © {new Date().getFullYear()} BANAVATHU YOGANANDHA
          </p>
          <p className="text-[11px] text-slate-600 dark:text-neon-cyan font-mono font-medium tracking-wide">
            "Always Learning. Always Building. Always Exploring."
          </p>
        </div>

        {/* Center: System Telemetry metrics */}
        <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-slate-850 px-4 py-2 rounded-xl">
          <div className="flex items-center gap-1">
            <Cpu size={12} className="text-neon-cyan" />
            <span>CPU: <span className="text-slate-800 dark:text-white font-bold">{cpuLoad}%</span></span>
          </div>
          <div className="flex items-center gap-1">
            <Server size={12} className="text-neon-purple dark:text-neon-cyan" />
            <span>MEM: <span className="text-slate-800 dark:text-white font-bold">{memUsage}MB</span></span>
          </div>
          <div className="flex items-center gap-1">
            <Activity size={12} className="text-neon-pink" />
            <span>TIME: <span className="text-slate-800 dark:text-white font-bold">{time}</span></span>
          </div>
        </div>

        {/* Right Side: Social links, Resume Download, Back to Top */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3.5">
            <a
              href="https://github.com/yoga0061"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-550 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              title="GitHub Profile"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/yoganandha-banavathu-a02092305/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-550 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              title="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://instagram.com/offx.yoga"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-550 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              title="Instagram Profile"
            >
              <Instagram size={16} />
            </a>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-1 text-[10px] font-mono font-bold text-neon-cyan hover:underline bg-transparent border-0 cursor-pointer disabled:opacity-50"
              title="Download Resume PDF"
            >
              {isDownloading ? (
                <span>Prep...</span>
              ) : (
                <>
                  <Download size={12} />
                  <span>Resume</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={handleScrollTop}
            className="glass-panel w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer hover:border-neon-cyan transition-all"
            title="Scroll back to top"
          >
            <ChevronUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
