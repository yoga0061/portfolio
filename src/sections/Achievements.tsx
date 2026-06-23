import React from 'react';
import { Award, ShieldAlert, Cpu, Database, Shield, Github } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';

interface Achievement {
  title: string;
  metric: string;
  description: string;
  icon: React.ReactNode;
  badgeText: string;
  colorClass: string;
}

export const Achievements: React.FC = () => {
  const achievementsList: Achievement[] = [
    {
      title: 'DecodX Hackathon 2025',
      metric: 'National Level Top Performer',
      description: 'Awarded top performance credentials in the national level DecodX Hackathon, engineering robust software structures in timed competitive windows.',
      icon: <Award className="w-5 h-5" />,
      badgeText: '🏆 Top Performer',
      colorClass: 'border-neon-cyan text-neon-cyan dark:border-neon-green dark:text-neon-green',
    },
    {
      title: 'BMSIT CTF Hackathon',
      metric: 'Top 3 Finalist',
      description: 'Placed 3rd out of dozens of competing engineering teams in the BMSIT cybersecurity Capture The Flag (CTF) sprint, solving web exploits and cryptography flags.',
      icon: <ShieldAlert className="w-5 h-5" />,
      badgeText: '🥉 Top 3 Finalist',
      colorClass: 'border-neon-purple text-neon-purple dark:border-neon-cyan dark:text-neon-cyan',
    },
    {
      title: 'IBM AI Internship',
      metric: 'Artificial Intelligence Intern',
      description: 'Successfully completed the IBM SkillsBuild internship program, coding AI pipelines and exploring predictive data modeling methods.',
      icon: <Cpu className="w-5 h-5" />,
      badgeText: '🏅 Completed',
      colorClass: 'border-neon-pink text-neon-pink dark:border-neon-purple dark:text-neon-purple',
    },
    {
      title: 'Infosys Springboard',
      metric: 'Data Visualization Intern',
      description: 'Designed advanced business intelligence dashboards in Power BI and performed data transformations for actionable analytics.',
      icon: <Database className="w-5 h-5" />,
      badgeText: '🏅 Completed',
      colorClass: 'border-neon-orange text-neon-orange dark:border-neon-orange dark:text-neon-orange',
    },
    {
      title: 'Technical Credentials',
      metric: 'Multiple Cybersecurity Certifications',
      description: 'Earned 9+ industry-recognized certifications covering system architecture, ethical hacking, databases, and cloud security from IBM, Oracle, and Google.',
      icon: <Shield className="w-5 h-5" />,
      badgeText: '🛡️ 9+ Credentials',
      colorClass: 'border-blue-500 text-blue-500 dark:border-emerald-500 dark:text-emerald-500',
    },
    {
      title: 'GitHub Repository Contributor',
      metric: '12+ Active Repositories',
      description: 'Maintained more than 12 public repositories on GitHub. Actively contributing, auditing secure hooks, and optimizing frontend build performance.',
      icon: <Github className="w-5 h-5" />,
      badgeText: '💻 12+ Repos',
      colorClass: 'border-indigo-500 text-indigo-500 dark:border-cyan-500 dark:text-cyan-500',
    },
  ];

  return (
    <SectionWrapper id="achievements" className="relative">
      
      {/* Title */}
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          &gt;_ ACCOLADES &amp; ACHIEVEMENTS
        </h2>
        <div className="h-1 w-20 bg-neon-cyan dark:bg-neon-green rounded mx-auto md:mx-0" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievementsList.map((ach, idx) => (
          <div
            key={idx}
            className={`glass-panel bg-white/60 dark:bg-black/35 border p-6 rounded-2xl flex flex-col justify-between transition-all duration-350 hover:-translate-y-1 ${ach.colorClass}`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
                    {ach.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white font-display text-sm">
                    {ach.title}
                  </h3>
                </div>
                
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-full text-slate-500">
                  {ach.badgeText}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mb-2 font-display">
                {ach.metric}
              </h4>
              
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-4">
                {ach.description}
              </p>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800/85 pt-3 mt-2 flex items-center justify-between text-[9px] font-mono text-slate-400">
              <span>RECORD_STATUS: SEC_OK</span>
              <span className="text-emerald-500 font-bold">VERIFIED</span>
            </div>
          </div>
        ))}
      </div>

    </SectionWrapper>
  );
};
export default Achievements;
