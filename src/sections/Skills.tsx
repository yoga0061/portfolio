import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { Shield, Layout, ChevronRight, Cpu, LineChart } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';

interface SkillItem {
  name: string;
  level: number; // Proficiency percentage
  subtopics: string[];
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
  color: string; // Tailwind color class
}

const SkillProgressBar: React.FC<{ name: string; level: number; colorClass: string }> = ({ 
  name, 
  level, 
  colorClass 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setWidth(level);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isInView, level]);

  return (
    <div ref={ref} className="space-y-1.5 font-mono text-xs">
      <div className="flex justify-between items-center">
        <span className="text-slate-700 dark:text-slate-300 font-semibold">{name}</span>
        <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full overflow-hidden p-[1px]">
        <div
          className={`h-full rounded-sm transition-all duration-1000 ease-out ${colorClass}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const categories: SkillCategory[] = [
    {
      title: 'Cybersecurity Operations',
      icon: <Shield size={18} />,
      color: 'bg-neon-cyan shadow-neon-cyan/20',
      skills: [
        { name: 'Vulnerability Assessment', level: 65, subtopics: ['Risk Assessment', 'Threat Detection', 'Security Audits'] },
        { name: 'Ethical Hacking Fundamentals', level: 60, subtopics: ['Linux Security', 'Kali Linux Basics', 'Port Auditing'] },
        { name: 'Web Application Security', level: 55, subtopics: ['OWASP Core Mitigations', 'Secure Forms', 'Input Checks'] },
        { name: 'Keylogger & Threat Detection', level: 60, subtopics: ['System Monitoring Tools', 'Malicious Process Auditing'] },
      ],
    },
    {
      title: 'Full-Stack Web & Databases',
      icon: <Layout size={18} />,
      color: 'bg-[#3b82f6] shadow-blue-500/20',
      skills: [
        { name: 'React.js & Vite', level: 60, subtopics: ['Hooks API', 'State Management', 'Single Page Architecture'] },
        { name: 'Tailwind CSS & Web UI', level: 65, subtopics: ['HTML5', 'CSS3', 'Responsive Layout design', 'Modern Themes'] },
        { name: 'Firebase & SQL Databases', level: 55, subtopics: ['Firebase Authentication', 'Firestore Sync', 'MySQL Relational Schema'] },
        { name: 'JavaScript & Node.js Core', level: 60, subtopics: ['Express server routing', 'Async loops', 'ES6 syntax'] },
      ],
    },
    {
      title: 'Programming & AI/ML',
      icon: <Cpu size={18} />,
      color: 'bg-neon-purple shadow-neon-purple/20',
      skills: [
        { name: 'Python Engineering', level: 65, subtopics: ['Streamlit script scripting', 'System sensors monitoring', 'Data frames'] },
        { name: 'Java Programming', level: 50, subtopics: ['Data Structures core', 'OOP principles', 'Syntax fundamentals'] },
        { name: 'Machine Learning Basics', level: 55, subtopics: ['Scikit-learn', 'Predictive Analysis datasets', 'Data Modeling'] },
        { name: 'Prompt Engineering & AI APIs', level: 60, subtopics: ['API integrations', 'OpenAI prompts', 'AI Application Design'] },
      ],
    },
    {
      title: 'Cloud, Tools & Analytics',
      icon: <LineChart size={18} />,
      color: 'bg-emerald-500 shadow-emerald-500/20',
      skills: [
        { name: 'Git & GitHub Versioning', level: 65, subtopics: ['Branching workflows', 'Pull Requests', 'Repo coordination'] },
        { name: 'Linux System Operations', level: 60, subtopics: ['Shell navigation', 'System commands scripting', 'Privileges configuration'] },
        { name: 'Data Analytics & Power BI', level: 55, subtopics: ['Data Visualization dashboards', 'Insight generation', 'Reports design'] },
        { name: 'Cloud Security Basics', level: 50, subtopics: ['Cloud fundamentals', 'IAM security guidelines', 'Secure Buckets'] },
      ],
    },
  ];

  return (
    <SectionWrapper id="skills" className="relative">
      
      {/* Title */}
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          &gt;_ SKILLS MATRIX
        </h2>
        <div className="h-1 w-20 bg-neon-cyan rounded mt-4 mx-auto md:mx-0" />
      </div>

      {/* Grid containing categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => {
          const isActive = activeCategory === idx;
          
          return (
            <div
              key={idx}
              onClick={() => setActiveCategory(isActive ? null : idx)}
              className={`glass-panel bg-white/60 dark:bg-black/35 border p-6 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                isActive 
                  ? 'border-neon-cyan shadow-lg ring-1 ring-neon-cyan/20' 
                  : 'hover:border-slate-300 dark:hover:border-neon-cyan/20'
              }`}
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl text-white ${cat.color}`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white font-display text-base">
                    {cat.title}
                  </h3>
                </div>
                
                {/* Arrow hint */}
                <div
                  className={`text-slate-400 dark:text-slate-600 group-hover:text-neon-cyan transition-transform duration-350 ${isActive ? 'rotate-90' : ''}`}
                >
                  <ChevronRight size={16} />
                </div>
              </div>

              {/* Progress bars inside card */}
              <div className="space-y-4">
                {cat.skills.map((skill, sIdx) => (
                  <SkillProgressBar
                    key={sIdx}
                    name={skill.name}
                    level={skill.level}
                    colorClass={cat.color.split(' ')[0]}
                  />
                ))}
              </div>

              {/* Expandable sub-topics console drawer */}
              {isActive && (
                <div className="overflow-hidden border-t border-slate-200 dark:border-slate-800/80 pt-4 mt-4">
                  <div className="bg-slate-50/50 dark:bg-black/45 border border-slate-200 dark:border-slate-900 rounded-lg p-3 font-mono text-[11px] space-y-1.5">
                    <div className="text-neon-cyan uppercase font-bold border-b border-slate-200 dark:border-slate-800 pb-1 mb-1.5 flex items-center gap-1">
                      <span>⚡ DETAILS_LOG:</span>
                    </div>
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-1">
                        <span className="text-slate-400 dark:text-slate-600">- {skill.name}:</span>
                        <span className="text-slate-700 dark:text-slate-400">{skill.subtopics.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Overlay command line prompt visible when not active */}
              {!isActive && (
                <div className="absolute bottom-2 right-4 text-[9px] font-mono text-slate-400 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to inspect subtopics
                </div>
              )}
            </div>
          );
        })}
      </div>

    </SectionWrapper>
  );
};
export default Skills;
