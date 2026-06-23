import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, CheckCircle, Terminal, Eye, X, ZoomIn, ZoomOut, Download, Maximize2 } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';

import edunetCert from '../assets/certificates/Edunet internship certificate.pdf';
import infosysCert from '../assets/certificates/infosys-data-viz-internship.pdf';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  summary: string;
  highlights: string[];
  tools: string[];
  certificateFile: string;
  downloadName: string;
}

export const Experience: React.FC = () => {
  const [activeExp, setActiveExp] = useState<string>('ibm');
  const [selectedCert, setSelectedCert] = useState<ExperienceItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1.0);

  // Esc key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoomLevel(1.0);

  const experienceData: ExperienceItem[] = [
    {
      id: 'ibm',
      role: 'Artificial Intelligence Intern',
      company: 'IBM SkillsBuild (Powered by Edunet Foundation)',
      duration: 'June 2025 — July 2025',
      location: 'Bengaluru, India (Hybrid)',
      summary: 'Focused on core AI architectural concepts, prompt engineering, and building prototype systems. Audited and structured datasets for model training workflows.',
      highlights: [
        'Explored diverse practical AI implementations and designed intelligent response logic models.',
        'Explored structured data cleaning and preprocessing techniques, sanitizing input data for regression analytics.',
        'Collaborated with peers on project-based learning milestones, presenting AI-driven web models to mentors.',
      ],
      tools: ['AI APIs', 'Python Coding', 'Prompt Engineering', 'Data Analytics', 'Model Architecture'],
      certificateFile: edunetCert,
      downloadName: 'IBM_AI_Internship_Certificate.pdf'
    },
    {
      id: 'infosys',
      role: 'Data Visualization Intern',
      company: 'Infosys Springboard',
      duration: 'February 2026 — April 2026',
      location: 'Bengaluru, India (Virtual)',
      summary: 'Specialized in processing real-world datasets, conducting data transformations, and creating analytical dashboards to deliver insights.',
      highlights: [
        'Built interactive Power BI dashboards to present complex business information.',
        'Performed data cleaning, filtering, and structural transformations in Excel and Power BI.',
        'Created meaningful visual insights, turning raw databases into actionable metrics.',
        'Developed reporting and analytics solutions to support data-driven decision cycles.',
      ],
      tools: ['Power BI', 'Excel', 'Data Analytics', 'Visualization Techniques'],
      certificateFile: infosysCert,
      downloadName: 'Infosys_Data_Visualization_Internship_Certificate.pdf'
    },
  ];

  const currentExp = experienceData.find((e) => e.id === activeExp) || experienceData[0];

  return (
    <SectionWrapper id="experience" className="relative">
      
      {/* Title */}
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 uppercase font-mono">
          &gt;_ INTERNSHIP EXPERIENCE
        </h2>
        <div className="h-1 w-20 bg-neon-cyan dark:bg-neon-green rounded mx-auto md:mx-0" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Selection List */}
        <div className="lg:col-span-4 space-y-3">
          {experienceData.map((exp) => {
            const isActive = exp.id === activeExp;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveExp(exp.id)}
                className={`w-full text-left p-4 rounded-xl border font-mono transition-all cursor-pointer flex items-center justify-between group ${
                  isActive
                    ? 'glass-panel bg-neon-cyan/8 border-neon-cyan dark:bg-neon-green/8 dark:border-neon-green text-slate-900 dark:text-white font-bold shadow-md'
                    : 'bg-white/40 dark:bg-black/20 border-slate-200 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-neon-cyan/20 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                <div>
                  <h3 className="text-xs sm:text-sm">{exp.role}</h3>
                  <span className="text-[10px] text-slate-400 mt-1 block group-hover:text-neon-cyan dark:group-hover:text-neon-green transition-colors">{exp.company}</span>
                </div>
                <span className="text-[10px] font-bold shrink-0 ml-2">
                  {isActive ? '➔' : ''}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Side Detail Incident Report Panel */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExp.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-panel bg-white/60 dark:bg-black/35 border border-slate-200 dark:border-slate-800/60 p-6 rounded-2xl relative overflow-hidden"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white font-display">
                    {currentExp.role}
                  </h3>
                  <span className="text-sm font-semibold text-neon-purple dark:text-neon-cyan">
                    {currentExp.company}
                  </span>
                </div>

                <div className="space-y-1 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={11} className="text-neon-cyan dark:text-neon-green" />
                    <span>{currentExp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={11} />
                    <span>{currentExp.location}</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-6">
                {currentExp.summary}
              </p>

              {/* Highlights List */}
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal size={12} className="text-neon-cyan dark:text-neon-green" />
                  <span>KEY_RESPONSIBILITIES:</span>
                </h4>
                <ul className="space-y-2.5">
                  {currentExp.highlights.map((high, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
                      <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{high}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Used Badges */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block mb-2">ENG_MODULES_USED:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentExp.tools.map((tool) => (
                      <span
                        key={tool}
                        className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View completion certificate CTA */}
                <button
                  onClick={() => {
                    setSelectedCert(currentExp);
                    setZoomLevel(1.0);
                  }}
                  className="sm:self-end flex items-center justify-center gap-1.5 bg-neon-cyan/10 hover:bg-neon-cyan/25 text-neon-cyan font-bold font-mono text-[10px] border border-neon-cyan/25 px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0"
                >
                  <Eye size={12} />
                  <span>VIEW CERTIFICATE</span>
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Internship Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel bg-[#070c18]/90 border border-neon-cyan/25 w-full max-w-5xl h-[80vh] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,240,255,0.15)] relative">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center bg-black/60 border border-slate-800 text-slate-400 hover:text-white hover:border-neon-cyan transition-all cursor-pointer"
              title="Close Panel"
            >
              <X size={16} />
            </button>

            {/* Document Frame */}
            <div className="flex-1 h-full bg-[#03060d] relative overflow-hidden flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-900">
              {/* Zoom Controls */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/70 border border-slate-850 p-1.5 rounded-full">
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 hover:bg-slate-900 rounded-full text-slate-450 hover:text-white transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 hover:bg-slate-900 rounded-full text-slate-450 hover:text-white transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="px-2 py-0.5 text-[9px] font-mono hover:bg-slate-900 rounded-full text-slate-450 hover:text-white transition-colors cursor-pointer"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
              </div>

              {/* View Frame */}
              <div 
                className="w-full h-full transition-transform duration-200 ease-out origin-center flex items-center justify-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/\.(png|jpe?g|webp)$/i.test(selectedCert.certificateFile) ? (
                  <img
                    src={selectedCert.certificateFile}
                    alt={selectedCert.role}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-[0_5px_25px_rgba(0,0,0,0.5)]"
                  />
                ) : (
                  <iframe
                    src={`${selectedCert.certificateFile}#toolbar=0&navpanes=0&scrollbar=0`}
                    title={selectedCert.role}
                    className="w-full h-full border-0 rounded-xl bg-slate-950"
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            {/* Sidebar Details & Actions */}
            <div className="w-full md:w-80 h-full flex flex-col justify-between p-6 bg-[#070c18]/50 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan rounded-full uppercase">
                    Internship Certificate
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white font-display leading-tight mt-4">
                    {selectedCert.role}
                  </h3>
                  <p className="text-xs font-semibold text-neon-purple mt-1">
                    {selectedCert.company}
                  </p>
                </div>

                <div className="h-[1px] bg-slate-850" />

                {/* Details */}
                <div className="space-y-4 font-mono text-[10px] text-slate-400">
                  <div>
                    <span className="text-slate-500 uppercase block mb-0.5 font-bold">Duration</span>
                    <span className="text-white font-semibold text-[11px]">{selectedCert.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase block mb-0.5 font-bold">Location</span>
                    <span className="text-white font-semibold text-[11px]">{selectedCert.location}</span>
                  </div>
                </div>

                <div className="h-[1px] bg-slate-850" />

                {/* Technologies */}
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2.5 font-bold">Skills Covered</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCert.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[9px] font-sans font-medium px-2 py-0.5 bg-slate-950/60 border border-slate-800 rounded-md text-slate-300 animate-pulse"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 mt-8 md:mt-0 pt-4 border-t border-slate-850">
                <a
                  href={selectedCert.certificateFile}
                  download={selectedCert.downloadName}
                  className="w-full flex items-center justify-center gap-1.5 bg-neon-cyan hover:bg-neon-cyan/95 text-black font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                >
                  <Download size={13} strokeWidth={2.5} />
                  <span>Download Certificate</span>
                </a>
                
                <a
                  href={selectedCert.certificateFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-black text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-750 transition-colors cursor-pointer"
                >
                  <Maximize2 size={13} />
                  <span>Open Full Screen</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </SectionWrapper>
  );
};

export default Experience;
