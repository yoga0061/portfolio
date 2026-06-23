import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Terminal, Shield } from 'lucide-react';
import { analyticsActions } from '../utils/analytics';

const SKILLS_LIST = [
  'Cybersecurity Analyst',
  'AI-Assisted Developer',
  'Full Stack Developer',
  'Security Researcher',
  'Python Developer',
  'Tech Explorer',
  'SOC Analyst Enthusiast',
  'Security Engineer Candidate',
  'Problem Solver',
  'Hackathon Competitor',
  'Continuous Learner'
];

export const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [skillIndex, setSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);

  // Typing speed configuration
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const holdTime = 2000;

  useEffect(() => {
    let timer: number;
    const currentSkill = SKILLS_LIST[skillIndex];

    if (isDeleting) {
      // Deleting characters
      timer = setTimeout(() => {
        setTypedText(currentSkill.substring(0, typedText.length - 1));
      }, deletingSpeed);
    } else {
      // Typing characters
      timer = setTimeout(() => {
        setTypedText(currentSkill.substring(0, typedText.length + 1));
      }, typingSpeed);
    }

    // Handle transition between typing and deleting
    if (!isDeleting && typedText === currentSkill) {
      timer = setTimeout(() => setIsDeleting(true), holdTime);
    } else if (isDeleting && typedText === '') {
      setTimeout(() => {
        setIsDeleting(false);
        setSkillIndex((prev) => (prev + 1) % SKILLS_LIST.length);
      }, 0);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, skillIndex]);

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDownloading) return;

    setIsDownloading(true);
    analyticsActions.resumeDownload('Hero Button');

    // Simulate secure PDF compile & package scanner loading state
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

  const handleContactScroll = () => {
    analyticsActions.contactClick('Hero Button');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-24 pb-12 px-4 md:px-8 cyber-grid"
    >
      {/* Decorative Neon Blurs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-neon-cyan/5 dark:bg-neon-green/4 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neon-purple/5 dark:bg-neon-cyan/4 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-4xl w-full text-center flex flex-col items-center justify-center relative z-10">
        
        {/* Floating status tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="glass-panel flex items-center gap-2 bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200 dark:border-neon-cyan/20 px-3.5 py-1.5 rounded-full text-xs font-mono mb-6 text-slate-700 dark:text-neon-cyan uppercase tracking-widest"
        >
          <Shield size={12} className="text-neon-cyan dark:text-neon-green animate-pulse" />
          <span>SYS_STATUS: ACTIVE RESEARCHER</span>
        </motion.div>

        {/* Recruiter Quick View Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass-panel w-full max-w-2xl bg-white/70 dark:bg-[#0b1224]/65 border border-slate-200 dark:border-neon-cyan/15 px-6 py-4 rounded-2xl mb-8 shadow-sm grid grid-cols-2 sm:grid-cols-5 gap-4 text-left font-sans text-xs hover:border-neon-cyan/35 transition-all duration-300"
        >
          <div className="col-span-2 sm:col-span-1 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 pb-2 sm:pb-0 sm:pr-4">
            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Education</span>
            <span className="font-bold text-slate-800 dark:text-white block mt-0.5 leading-snug">B.Tech CSE (Cybersecurity)</span>
          </div>
          <div className="col-span-2 sm:col-span-1 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 pb-2 sm:pb-0 sm:px-4">
            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block">University</span>
            <span className="font-bold text-slate-800 dark:text-white block mt-0.5 leading-snug">Presidency University</span>
          </div>
          <div className="col-span-1 sm:border-r border-slate-200 dark:border-slate-800 sm:px-4">
            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block">CGPA</span>
            <span className="font-bold text-slate-800 dark:text-neon-cyan block mt-0.5 text-sm">8.0</span>
          </div>
          <div className="col-span-1 sm:border-r border-slate-200 dark:border-slate-800 sm:px-4">
            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Projects</span>
            <span className="font-bold text-slate-800 dark:text-neon-cyan block mt-0.5 text-sm">5+</span>
          </div>
          <div className="col-span-2 sm:col-span-1 sm:pl-4">
            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Certifications</span>
            <span className="font-bold text-slate-800 dark:text-neon-cyan block mt-0.5 text-sm">10</span>
          </div>
        </motion.div>

        {/* Name Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 leading-none"
        >
          BANAVATHU
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink dark:from-neon-green dark:via-neon-cyan dark:to-neon-purple glow-text">
            YOGANANDHA
          </span>
        </motion.h1>

        {/* Subtitle Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-sm sm:text-base md:text-lg font-extrabold text-slate-800 dark:text-neon-cyan font-mono tracking-widest uppercase mb-3"
        >
          Final-Year B.Tech CSE (Cybersecurity)
        </motion.h2>

        {/* Subtitle Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-350 max-w-2xl mb-2 font-display font-semibold tracking-wide"
        >
          Cybersecurity Researcher • Security Enthusiast • Full-Stack Developer
        </motion.p>

        {/* Placement Readiness Opportunity Callout */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 max-w-2xl mb-8 font-mono leading-relaxed"
        >
          Open to Security Analyst, SOC Analyst, Cybersecurity Engineer, and Software Engineer Opportunities
        </motion.p>

        {/* Typing skill loop console display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="w-full max-w-lg glass-panel bg-slate-50/50 dark:bg-black/60 border border-slate-200 dark:border-neon-cyan/15 rounded-xl p-4 mb-10 shadow-lg text-left font-mono"
        >
          <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-2 mb-3 text-[10px] text-slate-400 dark:text-slate-500 tracking-wider">
            <Terminal size={11} className="text-neon-cyan dark:text-neon-green" />
            <span>TERMINAL // PRESIDENCY_BENGALURU</span>
          </div>
          <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-center min-h-[24px]">
            <span className="text-neon-cyan dark:text-neon-green mr-2">&gt;</span>
            <span>Focus: </span>
            <span className="ml-1 text-slate-900 dark:text-white font-bold">{typedText}</span>
            <span className="w-1.5 h-4 bg-neon-cyan dark:bg-neon-green ml-1 animate-pulse" />
          </div>
        </motion.div>

        {/* Action Call to Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center flex-wrap"
        >
          {/* Download Resume Button (Primary) */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            data-cursor-text={isDownloading ? "Loading" : "Get PDF"}
            className="w-full sm:w-auto relative group overflow-hidden cursor-pointer disabled:opacity-85 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple dark:from-neon-green dark:to-neon-cyan rounded-full opacity-90 group-hover:opacity-100 blur-[1px] transition-all" />
            <div className="relative flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-950 text-white font-bold text-xs px-8 py-3.5 rounded-full border border-neon-cyan/20 group-hover:border-neon-cyan/60 group-hover:text-neon-cyan dark:group-hover:text-neon-green transition-all duration-300">
              {isDownloading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-neon-cyan" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Decrypting CV...</span>
                </>
              ) : (
                <>
                  <Download size={14} />
                  <span>Download Resume</span>
                </>
              )}
            </div>
          </button>

          {/* View Projects Button */}
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto glass-panel hover:bg-slate-100 dark:hover:bg-[#0c1325] border border-slate-350 dark:border-neon-cyan/35 text-slate-800 dark:text-white font-bold text-xs px-8 py-3.5 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
          >
            <span>View Projects</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Contact Me Button */}
          <button
            onClick={handleContactScroll}
            className="w-full sm:w-auto bg-slate-900/60 dark:bg-black/40 hover:bg-slate-100 dark:hover:bg-[#0c1325] border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold text-xs px-8 py-3.5 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
          >
            <span>Contact Me</span>
          </button>
        </motion.div>

        {/* Command shortcut hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-14 hidden md:flex items-center gap-2 text-[10px] text-slate-400 font-mono tracking-widest uppercase"
        >
          <span>Press</span>
          <span className="border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded text-slate-600 dark:text-neon-cyan">Ctrl</span>
          <span>+</span>
          <span className="border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded text-slate-600 dark:text-neon-cyan">K</span>
          <span>To Open Command Console</span>
        </motion.div>

      </div>
    </section>
  );
};
export default Hero;
