import React, { useState, useEffect } from 'react';
import { Award, Cpu, Briefcase, X, ZoomIn, ZoomOut, Maximize2, Download } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';
import { CERTIFICATIONS_LIST, type Certification } from '../constants/certificates';

const getIconForIssuer = (issuer: string) => {
  switch (issuer.toUpperCase()) {
    case 'IBM':
      return <Cpu size={20} className="text-[#0f62fe]" />;
    case 'ORACLE':
      return <Award size={20} className="text-[#f80000]" />;
    case 'INFOSYS':
      return <Award size={20} className="text-[#007cc3]" />;
    case 'GOOGLE':
      return <Award size={20} className="text-[#4285f4]" />;
    case 'TATA':
      return <Briefcase size={20} className="text-[#004b87]" />;
    case 'MASTERCARD':
      return <Cpu size={20} className="text-[#ff5f00]" />;
    case 'KBA':
      return <Award size={20} className="text-[#8b5cf6]" />;
    case 'EDUNET':
      return <Briefcase size={20} className="text-[#f97316]" />;
    case 'SCALER':
      return <Cpu size={20} className="text-[#00e676]" />;
    default:
      return <Award size={20} className="text-neon-cyan" />;
  }
};

const getColorsForIssuer = (issuer: string) => {
  switch (issuer.toUpperCase()) {
    case 'IBM':
      return {
        glow: 'hover:border-[#0f62fe]/40 hover:shadow-[#0f62fe]/10',
        badge: 'bg-[#0f62fe]/10 text-[#0f62fe] border-[#0f62fe]/20',
      };
    case 'ORACLE':
      return {
        glow: 'hover:border-[#f80000]/40 hover:shadow-[#f80000]/10',
        badge: 'bg-[#f80000]/10 text-[#f80000] border-[#f80000]/20',
      };
    case 'INFOSYS':
      return {
        glow: 'hover:border-[#007cc3]/40 hover:shadow-[#007cc3]/10',
        badge: 'bg-[#007cc3]/10 text-[#007cc3] border-[#007cc3]/20',
      };
    case 'GOOGLE':
      return {
        glow: 'hover:border-[#4285f4]/40 hover:shadow-[#4285f4]/10',
        badge: 'bg-[#4285f4]/10 text-[#4285f4] border-[#4285f4]/20',
      };
    case 'TATA':
      return {
        glow: 'hover:border-[#004b87]/40 hover:shadow-[#004b87]/10',
        badge: 'bg-[#004b87]/10 text-[#004b87] border-[#004b87]/20',
      };
    case 'KBA':
      return {
        glow: 'hover:border-[#8b5cf6]/40 hover:shadow-[#8b5cf6]/10',
        badge: 'bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20',
      };
    case 'EDUNET':
      return {
        glow: 'hover:border-[#f97316]/40 hover:shadow-[#f97316]/10',
        badge: 'bg-[#f97316]/10 text-[#f97316] border-[#f97316]/20',
      };
    case 'MASTERCARD':
      return {
        glow: 'hover:border-[#ff5f00]/40 hover:shadow-[#ff5f00]/10',
        badge: 'bg-[#ff5f00]/10 text-[#ff5f00] border-[#ff5f00]/20',
      };
    case 'SCALER':
      return {
        glow: 'hover:border-[#00e676]/40 hover:shadow-[#00e676]/10',
        badge: 'bg-[#00e676]/10 text-[#00e676] border-[#00e676]/20',
      };
    default:
      return {
        glow: 'hover:border-neon-cyan/40 hover:shadow-neon-cyan/10',
        badge: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20',
      };
  }
};

export const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
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

  const marqueeItems = [...CERTIFICATIONS_LIST, ...CERTIFICATIONS_LIST];

  return (
    <SectionWrapper id="certifications" className="relative overflow-hidden w-full max-w-full">
      
      <div className="text-center md:text-left mb-12 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 uppercase font-mono">
          &gt;_ CERTIFICATIONS
        </h2>
        <div className="h-1 w-20 bg-neon-cyan rounded mt-4 mx-auto md:mx-0" />
      </div>

      <div className="relative w-full flex items-center overflow-hidden py-4 select-none">
        
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-bg-color to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-bg-color to-transparent z-20 pointer-events-none" />

        <div className="flex gap-6 animate-marquee-loop hover:[animation-play-state:paused] w-max">
          {marqueeItems.map((cert, index) => {
            const colors = getColorsForIssuer(cert.issuer);
            
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedCert(cert);
                  setZoomLevel(1.0); // Reset zoom on open
                }}
                className={`glass-panel bg-white/60 dark:bg-black/35 border border-slate-200 dark:border-slate-800/60 p-5 rounded-2xl w-64 flex-shrink-0 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group cursor-pointer hover:-translate-y-1.5 hover:shadow-lg ${colors.glow}`}
              >
                {/* Hover overlay View Certificate button */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <span className="bg-neon-cyan hover:bg-neon-cyan/90 text-black text-xs font-bold font-mono px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                    VIEW CERTIFICATE
                  </span>
                </div>

                <div className="relative z-0">
                  <div className="flex justify-between items-start gap-2">
                    <span className={`text-[9px] font-mono font-bold px-2.5 py-0.5 border rounded-full ${colors.badge} uppercase truncate max-w-[130px]`}>
                      {cert.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 font-mono truncate max-w-[80px]">
                      {cert.issuer}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-800 dark:text-white mt-4 font-display leading-tight min-h-[40px]">
                    {cert.title}
                  </h3>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800/60 pt-3 mt-4 flex justify-between items-center text-[10px] font-mono text-slate-550 dark:text-slate-400 relative z-0">
                  <span>Issued:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {cert.issueDate || 'N/A'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          {/* Modal Container */}
          <div className="glass-panel bg-[#070c18]/90 border border-neon-cyan/25 w-full max-w-5xl h-[80vh] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,240,255,0.15)] relative">
            
            {/* Close Button on Top Right */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center bg-black/60 border border-slate-800 text-slate-400 hover:text-white hover:border-neon-cyan transition-all cursor-pointer"
              title="Close Panel"
            >
              <X size={16} />
            </button>

            {/* Left Side: Document Viewer (Takes 65% width) */}
            <div className="flex-1 h-full bg-[#03060d] relative overflow-hidden flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-900">
              
              {/* Zoom & View Controls Overlay */}
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
                  title="Reset Zoom"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
              </div>

              {/* Document Frame / Container */}
              <div 
                className="w-full h-full transition-transform duration-200 ease-out origin-center flex items-center justify-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* Render Image or PDF iframe depending on asset type */}
                {/\.(png|jpe?g|webp)$/i.test(selectedCert.certificateFile) || selectedCert.certificateFile.startsWith('data:image') ? (
                  <img
                    src={selectedCert.certificateFile}
                    alt={selectedCert.title}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-[0_5px_25px_rgba(0,0,0,0.5)]"
                  />
                ) : (
                  <iframe
                    src={`${selectedCert.certificateFile}#toolbar=0&navpanes=0&scrollbar=0`}
                    title={selectedCert.title}
                    className="w-full h-full border-0 rounded-xl bg-slate-950"
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            {/* Right Side: Details & Actions (Takes 35% width / sidebar) */}
            <div className="w-full md:w-80 h-full flex flex-col justify-between p-6 bg-[#070c18]/50 overflow-y-auto">
              <div className="space-y-6">
                
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 border rounded-full ${getColorsForIssuer(selectedCert.issuer).badge}`}>
                      {selectedCert.category}
                    </span>
                    <div className="p-1.5 rounded bg-slate-950 border border-slate-900 text-neon-cyan">
                      {getIconForIssuer(selectedCert.issuer)}
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white font-display leading-tight">
                    {selectedCert.title}
                  </h3>
                </div>

                <div className="h-[1px] bg-slate-850" />

                {/* Details */}
                <div className="space-y-4 font-mono text-[10px] text-slate-400">
                  <div>
                    <span className="text-slate-500 uppercase block mb-0.5">ISSUING ORGANIZATION</span>
                    <span className="text-white font-bold text-[11.5px]">{selectedCert.issuer}</span>
                  </div>
                  {selectedCert.issueDate && (
                    <div>
                      <span className="text-slate-500 uppercase block mb-0.5">DATE OF ISSUANCE</span>
                      <span className="text-white font-bold text-[11.5px]">{selectedCert.issueDate}</span>
                    </div>
                  )}
                </div>

                <div className="h-[1px] bg-slate-850" />

                {/* Skills covered */}
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2.5">Skills Covered</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[9px] font-sans font-medium px-2 py-1 bg-slate-950/60 border border-slate-800 rounded-md text-slate-350"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Actions panel */}
              <div className="space-y-2.5 mt-8 md:mt-0 pt-4 border-t border-slate-850">
                <a
                  href={selectedCert.certificateFile}
                  download={selectedCert.downloadName}
                  className="w-full flex items-center justify-center gap-1.5 bg-neon-cyan hover:bg-neon-cyan/95 text-black font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                  title="Download Certificate File"
                >
                  <Download size={13} strokeWidth={2.5} />
                  <span>Download Certificate</span>
                </a>
                
                <a
                  href={selectedCert.certificateFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-black text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-750 transition-colors cursor-pointer"
                  title="Open certificate in new window"
                >
                  <Maximize2 size={13} />
                  <span>Open Full Screen</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

      <style>{`
        @keyframes marquee-loop {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        .animate-marquee-loop {
          animation: marquee-loop 35s linear infinite;
        }
      `}</style>

    </SectionWrapper>
  );
};

export default Certifications;
