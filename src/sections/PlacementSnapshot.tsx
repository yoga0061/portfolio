import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { FolderGit, Award, Briefcase, Shield, Cpu, Activity, RefreshCw } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';

// Reusable Counter Component
const HUDCounter: React.FC<{ target: number; suffix?: string; isText?: string; duration?: number }> = ({ 
  target, 
  suffix = '', 
  isText = '', 
  duration = 1.5 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView || isText) return;

    let start = 0;
    const end = target;
    const totalSteps = 30;
    const stepTime = (duration * 1000) / totalSteps;
    
    const timer = setInterval(() => {
      start += Math.ceil(end / totalSteps);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration, isText]);

  return (
    <span ref={ref} className="font-mono text-2xl sm:text-3xl font-extrabold text-neon-cyan dark:text-neon-green tracking-tight">
      {isText ? isText : count}
      {suffix}
    </span>
  );
};

export const PlacementSnapshot: React.FC = () => {
  const metrics = [
    {
      title: 'Projects Completed',
      value: 5,
      suffix: '+',
      description: 'Production-ready AI & Security software systems built.',
      icon: <FolderGit className="w-5 h-5 text-neon-cyan" />,
      colorClass: 'border-neon-cyan/20 hover:border-neon-cyan/40 shadow-neon-cyan/5'
    },
    {
      title: 'Industry Certifications',
      value: 10,
      suffix: '',
      description: 'Credentails from IBM, Oracle, Infosys, and Google.',
      icon: <Award className="w-5 h-5 text-neon-purple" />,
      colorClass: 'border-neon-purple/20 hover:border-neon-purple/40 shadow-neon-purple/5'
    },
    {
      title: 'Tech Internships',
      value: 2,
      suffix: '',
      description: 'Practical experience at IBM SkillsBuild and Infosys.',
      icon: <Briefcase className="w-5 h-5 text-neon-pink" />,
      colorClass: 'border-neon-pink/20 hover:border-neon-pink/40 shadow-neon-pink/5'
    },
    {
      title: 'Security Research',
      value: 1,
      suffix: '+',
      description: 'Responsible disclosures and vulnerability assessments.',
      icon: <Shield className="w-5 h-5 text-neon-green" />,
      colorClass: 'border-neon-green/20 hover:border-neon-green/40 shadow-neon-green/5'
    },
    {
      title: 'Hackathons Joined',
      value: 0,
      isText: 'Multiple',
      description: 'UIDAI 2026, DecodX National Top Performer.',
      icon: <Cpu className="w-5 h-5 text-neon-orange" />,
      colorClass: 'border-neon-orange/20 hover:border-neon-orange/40 shadow-neon-orange/5'
    },
    {
      title: 'CTF Participation',
      value: 0,
      isText: 'Active',
      description: '3rd Place in BMSIT Capture-The-Flag sprint.',
      icon: <Activity className="w-5 h-5 text-neon-pink" />,
      colorClass: 'border-neon-pink/20 hover:border-neon-pink/40 shadow-neon-pink/5'
    }
  ];

  return (
    <SectionWrapper id="snapshot" className="relative py-6 sm:py-8">
      {/* HUD Bar Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 font-mono text-[10px] text-slate-500">
        <span className="flex items-center gap-1">
          <Activity size={12} className="text-neon-cyan animate-pulse" /> 
          <span className="font-bold tracking-wider text-slate-700 dark:text-slate-350 uppercase">RECRUITER_TELEMETRY: PLACEMENT_SNAPSHOT</span>
        </span>
        <span className="flex items-center gap-1 mt-1 sm:mt-0">
          <RefreshCw size={10} className="animate-spin [animation-duration:10s]" /> SECURE_DATA_SYNCED
        </span>
      </div>

      {/* Metrics HUD Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((item, index) => (
          <div
            key={index}
            className={`glass-panel bg-white/60 dark:bg-black/35 border p-4 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-lg ${item.colorClass}`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Metric_{index + 1}
                </span>
                <div className="p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg">
                  {item.icon}
                </div>
              </div>

              <div className="block">
                <HUDCounter target={item.value} suffix={item.suffix} isText={item.isText} />
              </div>
            </div>

            <div className="mt-2.5">
              <h4 className="text-xs font-bold text-slate-800 dark:text-white font-display leading-tight">
                {item.title}
              </h4>
              <p className="text-[9px] text-slate-500 dark:text-slate-450 font-mono mt-1 leading-snug">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default PlacementSnapshot;
