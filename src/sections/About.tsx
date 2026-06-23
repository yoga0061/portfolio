import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { GraduationCap, Award, Code2, FolderGit, Rocket, Briefcase } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';

// Reusable Count-Up Counter Component
const AnimatedCounter: React.FC<{ target: number; suffix?: string; duration?: number }> = ({ 
  target, 
  suffix = '', 
  duration = 1.5 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const totalSteps = 40;
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
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-mono text-3xl sm:text-4xl font-extrabold text-neon-cyan dark:text-neon-green">
      {count}
      {suffix}
    </span>
  );
};

export const About: React.FC = () => {
  const educationTimeline = [
    {
      degree: 'B.Tech in Computer Science Engineering (Cybersecurity)',
      institution: 'Presidency University, Bengaluru',
      duration: '2023 — 2027 (Expected)',
      location: 'Bengaluru, Karnataka, India',
      details: 'Specializing in secure network operations, threat logs auditing, ethical hacking, and AI development workflows. Current CGPA: 8.0.'
    },
    {
      degree: 'Intermediate Education (MPC)',
      institution: 'Viswa Bharathi Junior College',
      duration: '2021 — 2023',
      location: 'India',
      details: 'Completed Intermediate MPC (Mathematics, Physics, Chemistry) studies with a final percentage of 62%.'
    },
    {
      degree: 'Secondary Education',
      institution: 'Ravindra Bharathi School',
      duration: 'Completed: 2021',
      location: 'India',
      details: 'Completed high school education with an aggregate score of 94%.'
    }
  ];

  return (
    <SectionWrapper id="about" className="relative">
      
      {/* Title */}
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          &gt;_ ABOUT ME
        </h2>
        <div className="h-1 w-20 bg-neon-cyan dark:bg-neon-green rounded mx-auto md:mx-0" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Professional Summary & Goals */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel bg-white/60 dark:bg-black/35 border border-slate-200 dark:border-slate-800/60 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
              <Code2 size={18} className="text-neon-purple dark:text-neon-cyan" />
              <span>Biography Summary</span>
            </h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              I am BANAVATHU YOGANANDHA, a Computer Science Engineering student specializing in Cybersecurity at Presidency University, Bengaluru. 
              Driven by a strong passion for cybersecurity, artificial intelligence, software engineering, and emerging tech, I build secure digital projects. 
              My experience spans AI-powered applications, system monitoring tools, dynamic web interfaces, and IoT hardware integrations. 
              I actively implement modern AI development platforms to accelerate learning cycles and prototype software products quickly.
            </p>
          </div>

          <div className="glass-panel bg-white/60 dark:bg-black/35 border border-slate-200 dark:border-slate-800/60 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
              <Rocket size={18} className="text-neon-pink dark:text-neon-green" />
              <span>Interests &amp; Exploration</span>
            </h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Beyond standard software construction, I have a deep fascination with space exploration, aerospace engineering, rocket propulsion dynamics, and next-generation aero engines. 
              I regularly analyze breakthroughs in AI, robotics, cloud services, and cyber threat vectors. My long-term goal is to transition into a highly-skilled cybersecurity specialist capable of engineering and protecting digital infrastructures.
            </p>
          </div>

          {/* Quick Counters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="glass-panel bg-slate-50/50 dark:bg-black/40 border border-slate-200 dark:border-neon-cyan/15 p-4 rounded-xl text-center">
              <FolderGit size={22} className="mx-auto mb-2 text-neon-cyan dark:text-neon-green" />
              <div className="block"><AnimatedCounter target={5} suffix="+" /></div>
              <span className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase">Projects</span>
            </div>

            <div className="glass-panel bg-slate-50/50 dark:bg-black/40 border border-slate-200 dark:border-neon-cyan/15 p-4 rounded-xl text-center">
              <Award size={22} className="mx-auto mb-2 text-neon-purple dark:text-neon-cyan" />
              <div className="block"><AnimatedCounter target={9} suffix="+" /></div>
              <span className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase">Certifications</span>
            </div>

            <div className="glass-panel bg-slate-50/50 dark:bg-black/40 border border-slate-200 dark:border-neon-cyan/15 p-4 rounded-xl text-center">
              <Briefcase size={22} className="mx-auto mb-2 text-neon-pink dark:text-neon-purple" />
              <div className="block"><AnimatedCounter target={2} /></div>
              <span className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase">Internships</span>
            </div>

            <div className="glass-panel bg-slate-50/50 dark:bg-black/40 border border-slate-200 dark:border-neon-cyan/15 p-4 rounded-xl text-center">
              <Code2 size={22} className="mx-auto mb-2 text-neon-orange dark:text-neon-orange" />
              <div className="block"><AnimatedCounter target={12} suffix="+" /></div>
              <span className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase">Repos</span>
            </div>

          </div>
        </div>

        {/* Education Timeline */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel bg-white/60 dark:bg-black/35 border border-slate-200 dark:border-slate-800/60 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <GraduationCap size={18} className="text-neon-cyan dark:text-neon-green" />
              <span>Education Log</span>
            </h3>

            {/* Vertical timeline */}
            <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3 pl-6 space-y-8">
              {educationTimeline.map((item, index) => (
                <div key={index} className="relative">
                  {/* Timeline point indicator */}
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 dark:bg-black border border-neon-cyan dark:border-neon-green">
                    <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan dark:bg-neon-green animate-pulse" />
                  </span>
                  
                  {/* Time frame */}
                  <span className="text-[10px] font-mono text-neon-cyan dark:text-neon-green bg-neon-cyan/5 border border-neon-cyan/20 px-2 py-0.5 rounded-full">
                    {item.duration}
                  </span>
                  
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white mt-2 font-display">
                    {item.degree}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {item.institution}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-sans">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </SectionWrapper>
  );
};
export default About;
