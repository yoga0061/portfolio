import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', id: 'hero' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'GitHub', id: 'github-activity' },
  { name: 'Experience', id: 'experience' },
  { name: 'Certifications', id: 'certifications' },
  { name: 'Security', id: 'security-research' },
  { name: 'Contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ping, setPing] = useState(24);
  const [activeSection, setActiveSection] = useState('hero');

  // 1. Simulate real-time secure shell ping fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(() => Math.floor(Math.random() * 15) + 12); // Fluctuates between 12ms and 27ms
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 2. Track which section is currently active in viewport
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 left-0 w-full z-40 px-4">
      {/* Floating Pill Nav Dock */}
      <nav className="max-w-5xl mx-auto glass-panel bg-white/70 dark:bg-[#070c18]/80 border border-slate-200/50 dark:border-neon-cyan/20 px-4 py-2.5 rounded-full flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.3)]">
        
        {/* Logo / Brand Name */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2 text-slate-800 dark:text-white font-mono text-sm cursor-pointer group"
        >
          <Cpu className="text-neon-cyan dark:text-neon-green animate-spin [animation-duration:8s]" size={16} />
          <span className="font-bold tracking-wider group-hover:text-neon-cyan dark:group-hover:text-neon-green transition-colors">
            BY.SEC
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer relative ${
                activeSection === link.id
                  ? 'text-slate-900 dark:text-neon-cyan font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-slate-100 dark:bg-neon-cyan/8 rounded-full border border-slate-300/30 dark:border-neon-cyan/25 -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Action Controls (Ping, Mobile Menu Toggle) */}
        <div className="flex items-center gap-3">
          
          {/* Shell ping indicator */}
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>PING: <span className="text-slate-800 dark:text-neon-cyan">{ping}ms</span></span>
          </div>

          {/* Mobile Hamburg Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-20 left-4 right-4 z-30 glass-panel bg-white/95 dark:bg-[#070c18]/95 border border-slate-200/80 dark:border-neon-cyan/25 p-6 rounded-2xl shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left py-2 px-3 rounded-lg text-sm font-mono transition-all cursor-pointer ${
                    activeSection === link.id
                      ? 'bg-slate-100 dark:bg-neon-cyan/10 text-slate-900 dark:text-neon-cyan border-l-2 border-slate-800 dark:border-neon-cyan'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  &gt; {link.name}
                </button>
              ))}

              {/* Mobile details footer */}
              <div className="border-t border-slate-200 dark:border-slate-800/60 pt-4 mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldAlert size={10} className="text-neon-cyan" /> SEC_LEVEL: ACTIVE
                </span>
                <span>PING: {ping}ms</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
