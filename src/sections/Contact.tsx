import React, { useState } from 'react';
import { Mail, Github, Linkedin, Instagram, Download, Terminal, Sparkles, ArrowUpRight } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';
import { analyticsActions } from '../utils/analytics';

export const Contact: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDownloading) return;

    setIsDownloading(true);
    analyticsActions.resumeDownload('Contact Section Button');

    // Simulate secure compilation loader state
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

  const handleSocialClick = (name: string) => {
    analyticsActions.socialClick(name);
  };

  const connectChannels = [
    {
      name: 'GitHub',
      description: 'Review my cybersecurity tools, machine learning pipelines, and open-source project repositories.',
      displayValue: 'github.com/yoga0061',
      url: 'https://github.com/yoga0061',
      btnText: 'View GitHub',
      icon: <Github size={22} />,
      colorClass: 'hover:border-neon-cyan/40 hover:shadow-neon-cyan/5 text-slate-800 dark:text-white',
      accentColor: '#00f0ff',
    },
    {
      name: 'LinkedIn',
      description: 'Connect professionally for internships, collaboration requests, and developer networking.',
      displayValue: 'linkedin.com/in/yoganandha-banavathu',
      url: 'https://www.linkedin.com/in/yoganandha-banavathu-a02092305/',
      btnText: 'Connect on LinkedIn',
      icon: <Linkedin size={22} />,
      colorClass: 'hover:border-[#0a66c2]/40 hover:shadow-[#0a66c2]/5 text-[#0a66c2]',
      accentColor: '#0a66c2',
    },
    {
      name: 'Instagram',
      description: 'Check out my design explorations, technology logs, and aesthetic updates.',
      displayValue: '@offx.yoga',
      url: 'https://instagram.com/offx.yoga',
      btnText: 'Follow on Instagram',
      icon: <Instagram size={22} />,
      colorClass: 'hover:border-neon-pink/40 hover:shadow-neon-pink/5 text-neon-pink',
      accentColor: '#ff007f',
    },
    {
      name: 'Email',
      description: 'Drop an direct message for case studies, recruitment proposals, or secure questions.',
      displayValue: 'naistam63@gmail.com',
      url: 'mailto:naistam63@gmail.com',
      btnText: 'Send Email',
      icon: <Mail size={22} />,
      colorClass: 'hover:border-neon-cyan/40 hover:shadow-neon-cyan/5 text-neon-cyan',
      accentColor: '#00f0ff',
    }
  ];

  return (
    <SectionWrapper id="contact" className="relative">
      
      {/* Title */}
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          &gt;_ CONNECT WITH ME
        </h2>
        <div className="h-1 w-20 bg-neon-cyan dark:bg-neon-green rounded mx-auto md:mx-0" />
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* CTA Hero Card */}
        <div className="glass-panel bg-white/70 dark:bg-[#0b1224]/60 border border-slate-200 dark:border-slate-800/60 p-8 rounded-3xl relative overflow-hidden text-center md:text-left">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-neon-cyan/5 dark:bg-neon-green/4 blur-[60px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-400 dark:text-neon-cyan uppercase tracking-widest">
                <Sparkles size={11} className="animate-pulse" />
                <span>Let's Build Something Secure</span>
              </div>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-350 leading-relaxed font-sans">
                Interested in collaborating, discussing technology, cybersecurity, AI, or innovative projects? Feel free to connect with me through any of the platforms below.
              </p>
            </div>
            
            <div className="shrink-0 flex items-center justify-center bg-slate-50 dark:bg-black/35 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
              <Terminal size={32} className="text-neon-cyan dark:text-neon-cyan animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bento Grid layout of Connect Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {connectChannels.map((channel) => (
            <div
              key={channel.name}
              className={`glass-panel bg-white/60 dark:bg-black/35 border border-slate-200 dark:border-slate-800/60 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between ${channel.colorClass}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl">
                    {channel.icon}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    {channel.name}_Channel
                  </span>
                </div>

                <div className="mt-5 space-y-2 text-left">
                  <h3 className="text-base font-bold text-slate-800 dark:text-white font-display">
                    {channel.name}
                  </h3>
                  <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-sans">
                    {channel.description}
                  </p>
                  <code className="text-[10px] text-slate-500 font-mono block select-all bg-slate-100/50 dark:bg-black/30 border border-slate-200/40 dark:border-slate-850 px-2.5 py-1 rounded inline-block mt-1">
                    {channel.displayValue}
                  </code>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={channel.url}
                  target={channel.name === 'Email' ? undefined : '_blank'}
                  rel={channel.name === 'Email' ? undefined : 'noopener noreferrer'}
                  onClick={() => handleSocialClick(channel.name)}
                  className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-black dark:bg-slate-950 dark:hover:bg-[#0c1325] text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-slate-850 hover:border-slate-700 transition-all duration-300"
                >
                  <span>{channel.btnText}</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Quick Actions Panel */}
        <div className="border-t border-slate-200/60 dark:border-slate-850 pt-8 text-center space-y-4">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Quick Actions Dashboard</span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            
            {/* Resume button with loader */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-gradient-to-r from-neon-cyan to-neon-purple text-white font-semibold text-xs px-5 py-2.5 rounded-full cursor-pointer hover:opacity-95 transition-all duration-300 disabled:opacity-75"
            >
              {isDownloading ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Compiling Resume...</span>
                </>
              ) : (
                <>
                  <Download size={13} />
                  <span>Download Resume</span>
                </>
              )}
            </button>

            {/* Direct Social quick triggers */}
            <a
              href="https://github.com/yoga0061"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick('Quick GitHub')}
              className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-300 font-semibold text-xs px-5 py-2.5 rounded-full border border-slate-200/80 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-850 transition-all cursor-pointer"
            >
              <Github size={13} />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/yoganandha-banavathu-a02092305/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick('Quick LinkedIn')}
              className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-300 font-semibold text-xs px-5 py-2.5 rounded-full border border-slate-200/80 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-850 transition-all cursor-pointer"
            >
              <Linkedin size={13} />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://instagram.com/offx.yoga"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick('Quick Instagram')}
              className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-300 font-semibold text-xs px-5 py-2.5 rounded-full border border-slate-200/80 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-850 transition-all cursor-pointer"
            >
              <Instagram size={13} />
              <span>Instagram</span>
            </a>

            <a
              href="mailto:naistam63@gmail.com"
              onClick={() => handleSocialClick('Quick Email')}
              className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-300 font-semibold text-xs px-5 py-2.5 rounded-full border border-slate-200/80 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-850 transition-all cursor-pointer"
            >
              <Mail size={13} />
              <span>Email</span>
            </a>

          </div>
        </div>

      </div>

    </SectionWrapper>
  );
};
export default Contact;
