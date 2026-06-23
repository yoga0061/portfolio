import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalIntroProps {
  onComplete: () => void;
}

export const TerminalIntro: React.FC<TerminalIntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const logs = [
    'Initializing Portfolio...',
    'Loading Projects...',
    'Loading Certifications...',
    'Portfolio Ready'
  ];

  useEffect(() => {
    // 1. Tick the progress bar from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Increment progress dynamically with varying steps
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // 2. Handle boot completion sequence
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let completeTimeoutId: ReturnType<typeof setTimeout> | undefined;

    if (progress === 100) {
      timeoutId = setTimeout(() => {
        setIsDone(true);
        completeTimeoutId = setTimeout(() => {
          onComplete();
        }, 600);
      }, 850);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (completeTimeoutId) clearTimeout(completeTimeoutId);
    };
  }, [progress, onComplete]);

  // Compute logs dynamically based on current boot progress to avoid state updates inside effects
  const visibleLogs: string[] = [];
  if (progress >= 20) visibleLogs.push(logs[0]);
  if (progress >= 50) visibleLogs.push(logs[1]);
  if (progress >= 85) visibleLogs.push(logs[2]);
  if (progress === 100) visibleLogs.push(logs[3]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 bg-[#03060d] z-99999 flex flex-col items-center justify-center p-6 text-white font-mono selection:bg-neon-green selection:text-black"
          exit={{ 
            y: '-100vh',
            transition: { ease: [0.76, 0, 0.24, 1], duration: 0.6 }
          }}
        >
          {/* Cyber scanner overlay background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,25,50,0.4),rgba(3,6,13,1))] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20 bg-[size:100%_4px] pointer-events-none" />

          {/* Terminal Box */}
          <div className="w-full max-w-lg glass-panel bg-black/60 border border-emerald-500/20 p-6 rounded-lg shadow-[0_0_50px_rgba(0,255,102,0.05)] relative overflow-hidden">
            {/* Window bar */}
            <div className="flex items-center justify-between border-b border-emerald-500/15 pb-3 mb-4 text-[10px] text-emerald-500/40 uppercase tracking-widest">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/60" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <span className="w-2 h-2 rounded-full bg-green-500/60" />
              </div>
              <span>System Boot Console v2.04</span>
            </div>

            {/* Log Output */}
            <div className="space-y-2.5 text-sm h-32 flex flex-col justify-start">
              {visibleLogs.map((log, index) => {
                const isLast = index === visibleLogs.length - 1;
                const isReady = log === 'Portfolio Ready';
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center gap-2 ${
                      isReady ? 'text-neon-green font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span className={isReady ? 'text-neon-green' : 'text-emerald-500/70'}>
                      {isReady ? '✦' : '✓'}
                    </span>
                    <span>{log}</span>
                    {isLast && !isReady && (
                      <span className="w-1.5 h-3.5 bg-emerald-400 animate-pulse inline-block" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Progress Bar Container */}
            <div className="mt-6">
              <div className="flex justify-between items-center text-[11px] text-emerald-500/60 font-bold mb-2">
                <span>MEM_LINK_SECURE</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full bg-slate-900 border border-emerald-500/20 rounded overflow-hidden p-[1px]">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-sm shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  style={{ width: `${progress}%` }}
                  layout
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 text-[9px] text-emerald-500/30 uppercase tracking-widest text-center">
            Establishing Encrypted Session // Bengaluru, IN
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default TerminalIntro;
