import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Command, Search, CornerDownLeft, Sparkles } from 'lucide-react';
import { analyticsActions } from '../utils/analytics';

interface CommandItem {
  id: string;
  name: string;
  description: string;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: CommandItem[] = [
    {
      id: 'view-projects',
      name: 'view projects',
      description: 'Scroll to the portfolio projects showreel',
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        analyticsActions.commandPaletteUsed('view-projects');
      },
    },
    {
      id: 'download-resume',
      name: 'download resume',
      description: 'Download the resume PDF instantly',
      action: () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Banavathu_Yoganandha_Resume.pdf';
        link.click();
        analyticsActions.resumeDownload('Command Palette');
        analyticsActions.commandPaletteUsed('download-resume');
      },
    },
    {
      id: 'open-github',
      name: 'open github',
      description: 'Visit my GitHub profile @yoga0061',
      action: () => {
        window.open('https://github.com/yoga0061', '_blank');
        analyticsActions.socialClick('GitHub (Command Palette)');
        analyticsActions.commandPaletteUsed('open-github');
      },
    },
    {
      id: 'open-linkedin',
      name: 'open linkedin',
      description: 'Visit my LinkedIn profile',
      action: () => {
        window.open('https://www.linkedin.com/in/yoganandha-banavathu-a02092305/', '_blank');
        analyticsActions.socialClick('LinkedIn (Command Palette)');
        analyticsActions.commandPaletteUsed('open-linkedin');
      },
    },
    {
      id: 'contact-me',
      name: 'contact me',
      description: 'Scroll to the secure message transmission form',
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        analyticsActions.commandPaletteUsed('contact-me');
      },
    },
    {
      id: 'why-work',
      name: 'why work with me',
      description: 'Scroll to the recruiter grid section',
      action: () => {
        document.getElementById('why-work')?.scrollIntoView({ behavior: 'smooth' });
        analyticsActions.commandPaletteUsed('why-work');
      },
    },
    {
      id: 'view-skills',
      name: 'view skills',
      description: 'Scroll to the interactive cybersecurity skills section',
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        analyticsActions.commandPaletteUsed('view-skills');
      },
    },
  ];

  // Filter commands by search text
  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    // 1. Setup global shortcut key Ctrl+K or Cmd+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Set focus on input when panel opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        setSearch('');
        setActiveIndex(0);
        inputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Handle keyboard navigation inside the list
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[activeIndex]) {
        filteredCommands[activeIndex].action();
        setIsOpen(false);
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex]);

  return (
    <>
      {/* Floating Prompt Button for recruiters */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="glass-panel flex items-center gap-2 bg-[#07090e]/80 hover:bg-[#0f172a] border border-neon-cyan/30 text-neon-cyan text-xs font-mono px-3.5 py-2 rounded-full cursor-pointer shadow-lg hover:shadow-neon-cyan/20 transition-all duration-300"
          title="Open Command Console (Ctrl + K)"
        >
          <Terminal size={14} className="animate-pulse" />
          <span>Console</span>
          <span className="bg-neon-cyan/20 px-1.5 py-0.5 rounded text-[10px] text-neon-cyan/80 flex items-center gap-0.5">
            <Command size={10} />K
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#02050a]/80 backdrop-filter backdrop-blur-md"
            />

            {/* Console Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-xl glass-panel bg-[#070c18]/95 border border-neon-cyan/30 rounded-xl shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden relative z-10"
            >
              {/* Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none" />

              {/* Console Header */}
              <div className="flex items-center justify-between border-b border-neon-cyan/15 px-4 py-3 bg-[#0a1122]">
                <div className="flex items-center gap-2 text-neon-cyan font-mono text-xs">
                  <Terminal size={14} />
                  <span>COMMAND LINE INTERFACE // INPUT MODE</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white text-xs font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded cursor-pointer"
                >
                  ESC
                </button>
              </div>

              {/* Search input field */}
              <div className="flex items-center border-b border-neon-cyan/15 px-4 py-3 bg-black/40">
                <Search size={18} className="text-neon-cyan mr-3 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command... (e.g. view projects)"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  className="w-full bg-transparent border-0 outline-none focus:ring-0 text-white font-mono text-sm placeholder-slate-500"
                />
              </div>

              {/* Commands List */}
              <div ref={listRef} className="max-h-80 overflow-y-auto p-2 space-y-1 bg-black/20">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, index) => (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`w-full text-left font-mono px-3 py-2.5 rounded-lg flex items-center justify-between border transition-all cursor-pointer ${
                        index === activeIndex
                          ? 'bg-neon-cyan/10 border-neon-cyan/40 text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.05)]'
                          : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className={`text-sm ${index === activeIndex ? 'text-neon-cyan font-bold' : 'text-slate-200'}`}>
                          &gt; {cmd.name}
                        </span>
                        <span className="text-[11px] text-slate-500 mt-0.5">
                          {cmd.description}
                        </span>
                      </div>
                      
                      {index === activeIndex && (
                        <div className="flex items-center gap-1 text-[10px] text-neon-cyan/80 bg-neon-cyan/10 border border-neon-cyan/25 px-1.5 py-0.5 rounded">
                          <span>Run</span>
                          <CornerDownLeft size={10} />
                        </div>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-500 font-mono text-xs flex flex-col items-center gap-2">
                    <Sparkles size={20} className="text-neon-purple/50 animate-bounce" />
                    <span>No matching commands found. Try 'projects' or 'resume'.</span>
                  </div>
                )}
              </div>

              {/* Console Footer */}
              <div className="border-t border-neon-cyan/10 px-4 py-2 bg-[#050811] text-[10px] text-slate-500 flex justify-between font-mono">
                <span>Use ↑↓ to navigate, [Enter] to run</span>
                <span>Bengaluru, India // UTC+5:30</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
export default CommandPalette;
