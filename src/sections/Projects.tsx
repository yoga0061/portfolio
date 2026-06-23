import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Code2, ShieldAlert, Cpu, Smartphone, Compass, ChevronLeft, ChevronRight, Laptop } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';
import { analyticsActions } from '../utils/analytics';

// Import AI-generated project banner images
import aadhaarSentinelImg from '../assets/projects/aadhaar-sentinel.png';
import lexaiImg from '../assets/projects/lexai.png';
import twoframesImg from '../assets/projects/twoframes.png';
import collabBoardImg from '../assets/projects/collab-board.png';
import salaryPredictorImg from '../assets/projects/salary-predictor.png';
import landslideDetectionImg from '../assets/projects/landslide-detection.png';
import keyloggerDetectionImg from '../assets/projects/keylogger-detection.png';

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  role: string;
  vulnerabilityMitigation?: string;
  achievements: string[];
  challenges: string;
  lessons: string;
  features: string[];
  featuredLabel?: string;
  galleryTabs: { id: string; label: string }[];
  impactMetrics: string[];
  bannerImage: string;
}

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<string>('banner');
  const [twoFramesCarouselIndex, setTwoFramesCarouselIndex] = useState(0);

  const twoFramesCarouselSlides = [
    {
      title: 'Secure Authentication',
      desc: 'Pair-linking tokens block unauthorized data eavesdropping. Connects partners securely using encrypted token matching in Firebase Auth.',
      stat: 'AES-256 Paired State'
    },
    {
      title: 'Real-time Memory Sharing',
      desc: 'Synchronized photo feed listening. Utilizes Firestore real-time snapshot listeners to push moments instantaneously to both feeds.',
      stat: '0.12s Synchronization Sync'
    },
    {
      title: 'Premium User Experience',
      desc: 'Fluid gestured animations and lazy loading. Leverages custom spring constants in Framer Motion for desktop/mobile gesture responsiveness.',
      stat: '60 FPS Transitions'
    },
    {
      title: 'Performance Optimization',
      desc: 'Vite code chunking, asset compression, and lazy picture rendering to keep initial load latency minimal.',
      stat: 'Bundle size < 1MB'
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        setActiveTab(selectedProject.galleryTabs[0].id); // Reset to first tab on open
      }, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  const projectsList: Project[] = [
    {
      id: 'aadhaar-sentinel',
      title: 'Aadhaar Sentinel – Integrity Dashboard',
      tagline: 'Privacy-Preserving Anomaly & Risk Intelligence Dashboard',
      featuredLabel: '⭐ UIDAI Hackathon 2026 Project',
      description: 'Privacy-preserving anomaly detection and risk intelligence system for Aadhaar enrolment and update centres.',
      detailedDescription: 'Developed for the UIDAI Hackathon 2026, Aadhaar Sentinel leverages machine learning (Isolation Forests) to identify enrolment fraud and anomalies at enrolment centers. Using multi-factor risk scoring matrices, it provides regional dashboards, district-level risk tracking, and a privacy-first local architecture to prevent leakage of PII/biometric records.',
      role: 'Lead ML & Backend Developer',
      techStack: ['Python', 'Machine Learning', 'Scikit-Learn', 'Pandas', 'Plotly', 'Streamlit'],
      githubUrl: 'https://github.com/yoga0061/aadhaar-integrity-tracker',
      liveUrl: 'https://github.com/yoga0061/aadhaar-integrity-tracker',
      vulnerabilityMitigation: 'Isolated training loops and removed local caching of raw biometric identifiers, passing anonymized hashes to ensure compliance with UIDAI security guidelines.',
      features: [
        'Isolation Forest anomaly detection modeling',
        'Center-level risk scoring matrices',
        'Real-time simulation of operator activities',
        'District and regional level analysis mapping',
        'Streamlit interactive dashboard console',
        'Privacy-first architecture securing PII data fields'
      ],
      challenges: 'Formulating high-accuracy risk metrics using anonymized center features without caching any restricted UIDAI registry databases.',
      lessons: 'Understood advanced clustering and anomaly modeling and gained deep exposure to privacy-preserving software constraints.',
      achievements: [
        'Engineered an Isolation Forest pipeline processing 500K+ simulated records.',
        'Structured real-time analytics displaying center deviations on choropleth maps.'
      ],
      galleryTabs: [
        { id: 'banner', label: 'Overview Banner' },
        { id: 'dashboard', label: 'Sentinel Console' },
        { id: 'architecture', label: 'Risk Engine Flow' }
      ],
      impactMetrics: [
        '500K+ Records Processed',
        'ML-Based Anomaly Detection',
        'Risk Scoring Engine'
      ],
      bannerImage: aadhaarSentinelImg
    },
    {
      id: 'lexai',
      title: 'LexAI',
      tagline: 'AI Legal Assistant Platform',
      featuredLabel: '⭐ Featured AI Project',
      description: 'An AI-powered legal guidance platform designed to help users understand legal issues and relevant Indian laws through intelligent responses.',
      detailedDescription: 'LexAI leverages generative AI and Retrieval-Augmented Generation (RAG) to provide automated legal insights based on Indian penal acts. Users can query complex legal conditions and upload draft contract documents to identify compliance issues and legal definitions. Designed to make legal guidance accessible to students and professionals.',
      role: 'Lead Full-Stack Developer',
      techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'AI APIs'],
      githubUrl: 'https://github.com/yoga0061/lexai',
      liveUrl: 'https://github.com/yoga0061/lexai',
      vulnerabilityMitigation: 'Established strict prompt boundaries and sanitized contract attachments, preventing prompt injections and cross-tenant file exposures.',
      features: [
        'Multi-language Support for regional Indian languages',
        'Indian Legal Guidance mapping IPC & Bharatiya Nyaya Sanhita clauses',
        'AI-Powered Recommendations for compliance optimization',
        'PDF Export of consulting reports and research summaries'
      ],
      challenges: 'Fine-tuning the RAG pipeline to consistently pull clauses from large PDF directories of legal volumes without introducing false references or high latency.',
      lessons: 'Understood prompt sanitation schemas and learned how to build high-performance document chunking maps in Node.js server scripts.',
      achievements: [
        'Built a modular legal chat framework in vanilla JS.',
        'Integrated dynamic PDF compilation allowing users to download query summaries.'
      ],
      galleryTabs: [
        { id: 'banner', label: 'Hero Banner' },
        { id: 'dashboard', label: 'Legal AI Dashboard' },
        { id: 'mobile', label: 'Mobile View' },
        { id: 'architecture', label: 'AI Workflow' }
      ],
      impactMetrics: [
        'Multi-Language Support',
        'AI Legal Assistance',
        'Real-Time Responses'
      ],
      bannerImage: lexaiImg
    },
    {
      id: 'twoframes',
      title: 'TwoFrames',
      tagline: 'Shared Relationship Journal & Memories Vault',
      featuredLabel: '⭐ Featured Full Stack Project',
      description: 'TwoFrames is a modern relationship and memory-sharing platform designed to help couples preserve special moments, create memories, and stay connected through a beautiful digital experience.',
      detailedDescription: 'TwoFrames serves as an interactive private vault for couples to log shared memories, upload photo cards, and track anniversaries. Built using a secure partner token system, it allows two users to establish a synchronized real-time connection using Firebase as a backend.',
      role: 'Lead Frontend Developer',
      techStack: ['React', 'Firebase', 'Tailwind CSS', 'JavaScript', 'Vite'],
      githubUrl: 'https://github.com/yoga0061/TwoFrames',
      liveUrl: 'https://two-frames.vercel.app/',
      vulnerabilityMitigation: 'Optimized build assets, secured routers against unauthorized state access, and implemented secure Firebase authentication filters.',
      features: [
        'Secure Authentication using paired partner linking tokens',
        'Memory Sharing with photo frames, text logs, and date trackers',
        'Modern Responsive Design look with Vercel-style layouts',
        'Real-time Data Management via Firestore snapshot listeners',
        'Mobile Friendly Interface with smooth spring transitions',
        'Beautiful User Experience built with Inter and Space Grotesk typography'
      ],
      challenges: 'Delivering layout transitions under low bandwidth conditions without introducing page jumps or visual artifacts.',
      lessons: 'Gained deep knowledge of Vite asset splitting configurations and optimized image compression schemas in Tailwind.',
      achievements: [
        'Built interactive gallery grids utilizing React states.',
        'Established full authentication routing guards restricting access to dashboard feeds.'
      ],
      galleryTabs: [
        { id: 'landing', label: 'Landing Page' },
        { id: 'login', label: 'Login Screen' },
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'mobile', label: 'Mobile View' },
        { id: 'architecture', label: 'Architecture' },
        { id: 'carousel', label: 'Feature Showcase' }
      ],
      impactMetrics: [
        'Firebase Auth Pairing',
        'Real-Time Firestore Sync',
        'Vercel Deployment'
      ],
      bannerImage: twoframesImg
    },
    {
      id: 'collab-board',
      title: 'Collab Board',
      tagline: 'Student Collaboration & Project Sharing',
      description: 'A student collaboration platform designed to connect students, share projects, and collaborate on innovative ideas.',
      detailedDescription: 'Collab Board is a collegiate workspace where students showcase engineering portfolios, form project partnerships, and discuss task boards. Driven by real-time sync databases to support instant peer communications.',
      role: 'Full-Stack Developer',
      techStack: ['React', 'Firebase Authentication', 'Firestore', 'Tailwind CSS'],
      githubUrl: 'https://github.com/yoga0061/collab-board',
      liveUrl: 'https://snapji.netlify.app/',
      vulnerabilityMitigation: 'Implemented granular Firebase rules to enforce authentication gates, ensuring students can write only to their designated document branches.',
      features: [
        'Authentication System and student registration',
        'Student Profiles displaying projects and technical stacks',
        'Project Sharing feed with tag searches',
        'Community Collaboration dashboards for team forming'
      ],
      challenges: 'Handling concurrent Firestore document updates when multiple students edit a shared team profile simultaneously, leading to sync conflicts.',
      lessons: 'Learned the importance of structured NoSQL schemas and how to construct optimized transaction loops in Firestore.',
      achievements: [
        'Integrated Firebase Auth schemas with persistent local caching.',
        'Developed a responsive project card feed displaying dynamic tag filtering.'
      ],
      galleryTabs: [
        { id: 'landing', label: 'Landing Page' },
        { id: 'profile', label: 'User Profile' },
        { id: 'feed', label: 'Community Feed' },
        { id: 'mobile', label: 'Mobile Version' }
      ],
      impactMetrics: [
        'Firebase Authentication',
        'Real-Time Collaboration',
        'Student Community Platform'
      ],
      bannerImage: collabBoardImg
    },
    {
      id: 'salary-predictor',
      title: 'Salary Predictor',
      tagline: 'Machine Learning Salary dashboard',
      description: 'A machine learning application that predicts salary ranges based on user-provided information.',
      detailedDescription: 'A predictive analytical platform mapping compensation metrics. By training regression models on historical employment spreadsheets, the program estimates prospective salary ranges matching experience and skillsets.',
      role: 'ML Developer',
      techStack: ['Python', 'Machine Learning', 'Pandas', 'Streamlit'],
      githubUrl: 'https://github.com/yoga0061/salary-predictor',
      liveUrl: 'https://ai-salary.streamlit.app/',
      vulnerabilityMitigation: 'Configured robust boundary limitations on numeric inputs to prevent buffer manipulation or overflow attempts targeting the modeling logic.',
      features: [
        'Data Analysis pipelines parsing experience indexes',
        'Salary Prediction using trained regression parameters',
        'Interactive Dashboard with prediction forms',
        'Streamlit Deployment for rapid visual response'
      ],
      challenges: 'Managing wide deviations and noise in historical dataset files, which skewed early regression computations.',
      lessons: 'Gained hands-on experience cleansing data using Pandas and realized the value of feature scaling before model training.',
      achievements: [
        'Trained and evaluated regression algorithms yielding high prediction accuracies.',
        'Deployed a clean Streamlit interface resolving calculations in sub-second frames.'
      ],
      galleryTabs: [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'form', label: 'Prediction Form' },
        { id: 'analytics', label: 'Analytics Plot' }
      ],
      impactMetrics: [
        '85.4% Model Accuracy',
        'Streamlit Deployment',
        'Machine Learning Dashboard'
      ],
      bannerImage: salaryPredictorImg
    },
    {
      id: 'landslide-detection',
      title: 'Landslide Detection System',
      tagline: 'Raspberry Pi IoT Alert Array',
      description: 'An IoT-based disaster prevention system that monitors environmental conditions and predicts landslide risks.',
      detailedDescription: 'Designed as an early warning sensor platform. The system leverages analog soil moisture probes and rainfall telemetry modules to calculate slope stability, broadcasting alarm warnings when indices cross threshold safety bounds.',
      role: 'Hardware & IoT Programmer',
      techStack: ['Raspberry Pi', 'Python', 'IoT Sensors', 'Embedded Systems'],
      githubUrl: 'https://github.com/yoga0061/landslide-detection',
      vulnerabilityMitigation: 'Secured telemetry paths, utilizing input validations on sensor packages to avoid signal spoofing attacks.',
      features: [
        'Soil Moisture Monitoring logs',
        'Rainfall Detection sensors',
        'Environmental Monitoring telemetry',
        'Early Warning Alerts dispatch',
        'Real-time Data Collection'
      ],
      challenges: 'Filtering electrical noise and spike anomalies in analog soil moisture sensor signals under heavy moisture changes.',
      lessons: 'Gained experience handling embedded Python data arrays and learned to write time-averaging noise filters.',
      achievements: [
        'Configured Python scripting loops reading continuous sensor flows.',
        'Wrote emergency notification routines triggering email warnings when moisture exceeded thresholds.'
      ],
      galleryTabs: [
        { id: 'banner', label: 'System Banner' },
        { id: 'dashboard', label: 'Sensor Dashboard' },
        { id: 'architecture', label: 'IoT Diagram' }
      ],
      impactMetrics: [
        'IoT Sensor Alert System',
        'Raspberry Pi Hardware',
        'Analog Moisture Data Logs'
      ],
      bannerImage: landslideDetectionImg
    },
    {
      id: 'keylogger-detection',
      title: 'Keylogger Detection Tool',
      tagline: 'System Security Monitoring Utility',
      description: 'A cybersecurity script focused on detecting suspicious keyboard-monitoring activities and flagging malicious processes.',
      detailedDescription: 'A custom security audit utility scanning background services. The script audits keyboard hook registries and DLL bindings, flagging signatures of keyboard monitoring programs to prevent credential theft.',
      role: 'Security Programmer',
      techStack: ['Python', 'Cybersecurity Concepts', 'System Monitoring'],
      githubUrl: 'https://github.com/yoga0061/keylogger-detection',
      vulnerabilityMitigation: 'Isolated the detection process, ensuring logged threat details are parsed in sandboxed buffers without trigger actions.',
      features: [
        'Threat Detection scanning active system hooks',
        'Security Monitoring logs audit',
        'Process Analysis checking DLL signature blocks',
        'Alert Generation detailing telemetry process IDs'
      ],
      challenges: 'Minimizing false positive warnings on legitimate device drivers and gaming software that use native keyboard hook calls.',
      lessons: 'Mastered standard Windows OS process schemas and learned how keyloggers register system hook callbacks.',
      achievements: [
        'Created a Python routine listing active thread handles and hook bindings.',
        'Logged process ID telemetry in structured files for security auditing.'
      ],
      galleryTabs: [
        { id: 'banner', label: 'Audit Banner' },
        { id: 'dashboard', label: 'Process Monitor' },
        { id: 'architecture', label: 'Detection Flow' }
      ],
      impactMetrics: [
        'Suspicious Hooks Flagged',
        'DLL Process Audits',
        'Secure Sandbox Logging'
      ],
      bannerImage: keyloggerDetectionImg
    }
  ];

  // Build/Runtime Audit warning check for generic repository profile links
  useEffect(() => {
    projectsList.forEach((project) => {
      if (!project.githubUrl || project.githubUrl.endsWith('yoga0061')) {
        console.warn(`[WARNING] Build Audit: Project "${project.title}" is missing a dedicated repository URL.`);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper to render interactive visual device mockups
  const renderMockup = (project: Project, tab: string) => {
    const accentColor = 
      project.id === 'lexai' ? '#00f0ff' : 
      project.id === 'collab-board' ? '#b500ff' : 
      project.id === 'salary-predictor' ? '#ff007f' : 
      project.id === 'landslide-detection' ? '#ff6b00' : 
      project.id === 'keylogger-detection' ? '#00ff66' : 
      project.id === 'aadhaar-sentinel' ? '#00f0ff' : '#3b82f6';
    
    // Laptop Mockup Frame Wrapper
    const LaptopFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <div className="w-full h-full flex flex-col bg-slate-900 border border-slate-700/60 rounded-xl overflow-hidden shadow-2xl relative">
        {/* Browser Top Header */}
        <div className="flex items-center justify-between bg-slate-950 px-3 py-1.5 border-b border-slate-800/80">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/75" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/75" />
            <span className="w-2 h-2 rounded-full bg-green-500/75" />
          </div>
          <div className="bg-slate-900 text-[8px] text-slate-450 px-3 py-0.5 rounded border border-slate-800/60 w-1/2 text-center font-mono truncate">
            https://{project.id}.dev
          </div>
          <div className="w-8" />
        </div>
        <div className="flex-1 overflow-hidden relative bg-[#050914] flex items-center justify-center">
          {children}
        </div>
      </div>
    );

    // Mobile Phone Mockup Frame Wrapper
    const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <div className="mx-auto w-[150px] h-[260px] bg-slate-950 border-[3px] border-slate-800 rounded-[28px] overflow-hidden shadow-2xl relative flex flex-col p-1">
        {/* Speaker Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-slate-950 rounded-full z-20 flex items-center justify-center">
          <span className="w-8 h-[2px] bg-slate-800 rounded-full" />
        </div>
        <div className="flex-1 rounded-[22px] overflow-hidden relative bg-[#050914] flex flex-col p-2 pt-5">
          {children}
        </div>
        {/* Home Indicator */}
        <div className="w-16 h-[2px] bg-slate-700 rounded-full mx-auto my-1" />
      </div>
    );

    switch (tab) {
      // 1. Common banner layout
      case 'banner':
        return (
          <div className="w-full h-full relative overflow-hidden bg-slate-950 flex items-center justify-center">
            <img 
              src={project.bannerImage} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
            />
            {/* Dark gradient overlay for cybersecurity telemetry feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
            
            {/* Title / Info overlay on top of the image */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[9px] bg-slate-950/80 border border-slate-850 px-2.5 py-1.5 rounded backdrop-blur-sm pointer-events-none">
              <span className="text-neon-cyan font-bold tracking-wider">{project.title.replace(' – Integrity Dashboard', '').replace(' –', '').toUpperCase()}</span>
              <span className="text-slate-450">v1.0 // ACTIVE</span>
            </div>
          </div>
        );

      case 'dashboard':
        if (project.id === 'aadhaar-sentinel') {
          return (
            <LaptopFrame>
              <div className="w-full h-full flex flex-col text-[8px] font-mono text-slate-350 p-2 gap-1.5 text-left bg-[#050915]">
                <div className="flex justify-between items-center border-b border-slate-900 pb-1">
                  <span className="text-neon-cyan font-bold">🔒 AADHAAR SENTINEL</span>
                  <span className="text-[6px] text-emerald-450 animate-pulse">● Risk Analytics Active</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 mt-1">
                  <div className="border border-slate-800 bg-black/40 p-1 text-center">
                    <span className="text-slate-500 block text-[6px]">ANOMALIES</span>
                    <span className="text-neon-pink block font-bold mt-0.5">14 Flagged</span>
                  </div>
                  <div className="border border-slate-800 bg-black/40 p-1 text-center">
                    <span className="text-slate-500 block text-[6px]">RISK SCORE</span>
                    <span className="text-white block font-bold mt-0.5">88.4 / 100</span>
                  </div>
                  <div className="border border-slate-800 bg-black/40 p-1 text-center">
                    <span className="text-slate-500 block text-[6px]">CENTERS ACTIVE</span>
                    <span className="text-white block font-bold mt-0.5">1,240</span>
                  </div>
                </div>
                <div className="h-10 bg-slate-950 border border-slate-900 rounded p-1 flex items-end gap-1.5 relative overflow-hidden">
                  <div className="absolute top-1 left-2 text-[6px] text-slate-600">Center anomaly dispersion:</div>
                  <div className="w-full bg-slate-900 h-[20%]" />
                  <div className="w-full bg-slate-900 h-[60%]" />
                  <div className="w-full bg-neon-cyan/40 h-[85%]" />
                  <div className="w-full bg-slate-900 h-[40%]" />
                  <div className="w-full bg-slate-900 h-[10%]" />
                </div>
              </div>
            </LaptopFrame>
          );
        }

        if (project.id === 'lexai') {
          return (
            <LaptopFrame>
              <div className="w-full h-full flex text-[8px] font-mono text-slate-300 p-2 gap-2 text-left bg-[#050915]">
                {/* Sidebar */}
                <div className="w-1/4 border-r border-slate-900 p-1 flex flex-col gap-1.5">
                  <div className="font-bold text-neon-cyan border-b border-slate-900 pb-1 flex items-center gap-1">
                    <Code2 size={10} /> LexAI
                  </div>
                  <div className="text-[7px] text-neon-cyan bg-neon-cyan/5 p-1 rounded">⚖️ Legal Chat</div>
                  <div className="text-[7px]">📂 Contract Auditor</div>
                  <div className="text-[7px]">📖 Penal Acts</div>
                </div>
                {/* Chat Panel */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 overflow-y-auto pr-1">
                    <div className="bg-slate-905/40 p-1.5 rounded border border-slate-900">
                      <span className="text-neon-cyan block text-[7px] font-bold">User Prompt:</span>
                      What are the legal compliance implications of Section 406 IPC in corporate contracts?
                    </div>
                    <div className="bg-neon-cyan/5 p-1.5 rounded border border-neon-cyan/10">
                      <span className="text-neon-green block text-[7px] font-bold">LexAI Oracle Response:</span>
                      Under Section 406 of the Indian Penal Code (Criminal Breach of Trust), corporate entities must establish fiduciary intent. Recommendation: Audit Clause 12...
                    </div>
                  </div>
                  <div className="border border-slate-900 p-1 rounded bg-black/40 text-[7px] flex justify-between">
                    <span>Ask LexAI legal questions...</span>
                    <span className="text-neon-cyan">↵ Send</span>
                  </div>
                </div>
              </div>
            </LaptopFrame>
          );
        }
        
        // TwoFrames Dashboard
        if (project.id === 'twoframes') {
          return (
            <LaptopFrame>
              <div className="w-full h-full flex flex-col text-[8px] font-mono text-slate-350 p-2 gap-2 text-left bg-[#050915]">
                {/* Navbar */}
                <div className="border-b border-slate-900 pb-1 flex justify-between items-center">
                  <span className="font-bold text-neon-pink">❤ TwoFrames</span>
                  <div className="flex gap-2 text-[7px] text-slate-400">
                    <span>Vault</span>
                    <span>Timeline</span>
                    <span className="text-neon-pink">Our Days</span>
                  </div>
                </div>
                {/* Memories feed */}
                <div className="flex-1 grid grid-cols-2 gap-2 overflow-y-auto">
                  <div className="border border-slate-900 rounded bg-slate-950 p-1.5 flex flex-col justify-between">
                    <div className="h-10 bg-slate-900/60 rounded flex items-center justify-center text-[7px]">📸 Beach Trip 2026</div>
                    <span className="text-[6px] text-slate-500 mt-1">Logged: 12 days ago</span>
                  </div>
                  <div className="border border-slate-900 rounded bg-slate-950 p-1.5 flex flex-col justify-between">
                    <div className="h-10 bg-slate-900/60 rounded flex items-center justify-center text-[7px]">☕ Cafe Date</div>
                    <span className="text-[6px] text-slate-500 mt-1">Logged: 18 days ago</span>
                  </div>
                </div>
              </div>
            </LaptopFrame>
          );
        }

        // Collab Board feed
        if (project.id === 'collab-board') {
          return (
            <LaptopFrame>
              <div className="w-full h-full flex flex-col text-[8px] font-mono text-slate-300 p-2 gap-2 text-left bg-[#050915]">
                <div className="border-b border-slate-900 pb-1.5 font-bold text-neon-purple flex justify-between">
                  <span>CollabBoard // Projects</span>
                  <span className="text-[7px] text-slate-500">Filter: React</span>
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="border border-slate-900 p-1.5 rounded bg-black/20">
                    <span className="text-white block font-bold text-[8px]">LexAI legal bot</span>
                    <p className="text-[7px] text-slate-400">Collaborating on IPC RAG dataset files.</p>
                    <span className="text-[6px] bg-slate-900 px-1 py-0.5 rounded text-neon-cyan mt-1 inline-block">Looking for dev</span>
                  </div>
                </div>
              </div>
            </LaptopFrame>
          );
        }

        // ML Salary Predictor Dashboard
        if (project.id === 'salary-predictor') {
          return (
            <LaptopFrame>
              <div className="w-full h-full flex text-[8px] font-mono text-slate-300 p-2 gap-2 text-left bg-[#050915]">
                {/* Sliders */}
                <div className="w-1/3 border-r border-slate-900 pr-1 space-y-2">
                  <span className="font-bold text-neon-pink uppercase block">ML Parameters</span>
                  <div>
                    <span className="text-[6px] text-slate-500 block">Experience: 4.5 Years</span>
                    <div className="h-1 bg-slate-900 rounded relative mt-1"><span className="absolute top-0 left-0 w-[45%] h-full bg-neon-pink rounded" /></div>
                  </div>
                  <div>
                    <span className="text-[6px] text-slate-500 block">Certifications: 4</span>
                    <div className="h-1 bg-slate-900 rounded relative mt-1"><span className="absolute top-0 left-0 w-[40%] h-full bg-neon-pink rounded" /></div>
                  </div>
                </div>
                {/* Result Chart */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="bg-slate-905/20 border border-slate-900 p-2 rounded text-center">
                    <span className="text-slate-455 block text-[7px]">PREDICTED COMPENSATION</span>
                    <span className="text-[12px] font-bold text-white block mt-1">$94,500 - $108,000</span>
                  </div>
                  <div className="h-8 border-t border-slate-900 flex items-end gap-2 pt-1 px-1">
                    <div className="w-full bg-slate-900 h-[20%]" />
                    <div className="w-full bg-slate-900 h-[50%]" />
                    <div className="w-full bg-neon-pink/40 h-[85%]" />
                  </div>
                </div>
              </div>
            </LaptopFrame>
          );
        }

        // Landslide monitoring dashboard
        if (project.id === 'landslide-detection') {
          return (
            <LaptopFrame>
              <div className="w-full h-full flex flex-col text-[8px] font-mono text-slate-300 p-2 gap-1.5 text-left bg-[#050915]">
                <div className="flex justify-between items-center border-b border-slate-900 pb-1">
                  <span className="text-neon-orange font-bold font-mono">⚠️ LANDSLIDE MONITOR</span>
                  <span className="text-[6px] text-emerald-400 animate-pulse">● Sensors Active</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 mt-1">
                  <div className="border border-slate-900 bg-slate-950 p-1 text-center">
                    <span className="text-slate-500 block text-[6px]">Moisture</span>
                    <span className="text-white block font-bold mt-0.5">34.2 %</span>
                  </div>
                  <div className="border border-slate-900 bg-slate-950 p-1 text-center">
                    <span className="text-slate-500 block text-[6px]">Slope Tilt</span>
                    <span className="text-white block font-bold mt-0.5">0.12°</span>
                  </div>
                  <div className="border border-slate-900 bg-slate-950 p-1 text-center">
                    <span className="text-slate-500 block text-[6px]">Status</span>
                    <span className="text-emerald-400 block font-bold mt-0.5">SAFE</span>
                  </div>
                </div>
                <div className="h-10 bg-slate-950 border border-slate-900 rounded p-1 flex items-end gap-1">
                  <span className="text-[6px] text-slate-500 self-start absolute mt-0">Moisture Index:</span>
                  <div className="w-full bg-slate-900 h-[40%]" />
                  <div className="w-full bg-slate-900 h-[38%]" />
                  <div className="w-full bg-slate-900 h-[42%]" />
                </div>
              </div>
            </LaptopFrame>
          );
        }

        // Keylogger threat process dashboard
        if (project.id === 'keylogger-detection') {
          return (
            <LaptopFrame>
              <div className="w-full h-full flex flex-col text-[8px] font-mono text-slate-300 p-2 gap-1.5 text-left bg-[#050915]">
                <div className="flex justify-between items-center border-b border-slate-900 pb-1">
                  <span className="text-neon-green font-bold">🛡️ PROCESS HOOK MONITOR</span>
                  <span className="text-[6px] text-slate-500">v1.2 // SCAN_ACTIVE</span>
                </div>
                <div className="flex-1 space-y-1 overflow-y-auto">
                  <div className="flex justify-between border-b border-slate-900/60 pb-0.5 text-slate-450 text-[7px]">
                    <span>PROCESS</span>
                    <span>PID</span>
                    <span>KEYBOARD HOOKS</span>
                    <span>THREAT STATUS</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>explorer.exe</span>
                    <span>1404</span>
                    <span>0 Hook Bindings</span>
                    <span className="text-emerald-400">CLEAN</span>
                  </div>
                  <div className="flex justify-between text-neon-pink font-bold bg-neon-pink/5 p-0.5 rounded border border-neon-pink/10">
                    <span>unkprocess.exe</span>
                    <span>3240</span>
                    <span>SetWindowsHookEx()</span>
                    <span className="animate-pulse">SUSPICIOUS</span>
                  </div>
                </div>
              </div>
            </LaptopFrame>
          );
        }

        return null;

      case 'mobile':
        return (
          <PhoneFrame>
            {project.id === 'twoframes' ? (
              // TwoFrames Mobile Mockup
              <div className="flex-1 flex flex-col justify-between text-[6px] font-mono text-slate-350">
                <div className="flex justify-between items-center text-slate-500 border-b border-slate-900 pb-1.5">
                  <span className="font-bold text-neon-pink">❤ TwoFrames</span>
                  <Smartphone size={8} className="text-slate-655" />
                </div>
                
                <div className="flex-1 flex flex-col justify-center items-center gap-1.5 my-2">
                  <div className="w-6 h-6 rounded-full bg-neon-pink/10 flex items-center justify-center border border-neon-pink/20">
                    <span className="text-neon-pink text-[8px] animate-pulse">❤</span>
                  </div>
                  <span className="font-bold text-[8px] text-white">Connected Partner</span>
                  <span className="text-slate-500 text-[6px] text-center max-w-[100px]">Next Anniversary: 24 Days</span>
                </div>

                <div className="bg-neon-pink p-1 rounded-sm text-center font-bold text-[6px] text-white tracking-widest cursor-pointer hover:opacity-90">
                  OPEN VAULT
                </div>
              </div>
            ) : (
              // LexAI / Other Mobile View Mockup
              <div className="flex-1 flex flex-col justify-between text-[6px] font-mono text-slate-350">
                <div className="flex justify-between items-center text-slate-500 border-b border-slate-900 pb-1.5">
                  <span>9:41 AM</span>
                  <Smartphone size={8} />
                </div>
                
                <div className="flex-1 flex flex-col justify-center items-center gap-2 my-2 text-center">
                  <div className="w-7 h-7 rounded-full bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/20">
                    <Cpu size={10} className="text-neon-cyan animate-pulse" />
                  </div>
                  <div className="font-bold text-[8px] text-white">{project.title.replace(' – Integrity Dashboard', '')}</div>
                  <p className="text-[6px] text-slate-400 max-w-[100px] leading-relaxed">{project.tagline}</p>
                </div>

                <div className="bg-neon-cyan text-slate-955 p-1.5 rounded-sm text-center font-bold text-[6px] tracking-wider cursor-pointer">
                  INITIALIZE SESSION
                </div>
              </div>
            )}
          </PhoneFrame>
        );

      case 'architecture':
        return (
          <div className="w-full h-full bg-slate-950 text-slate-400 font-mono text-[8px] p-3.5 rounded-lg flex flex-col justify-between border border-slate-800/85">
            <div className="text-[7px] text-slate-550 border-b border-slate-900 pb-2 uppercase tracking-wider">
              Secure System Architecture Flow // Block Diagram
            </div>
            
            <div className="flex-1 flex items-center justify-between px-2 gap-1.5 mt-3">
              <div className="border border-slate-800 bg-black/40 px-1 py-2.5 rounded text-center w-12 flex flex-col items-center">
                <span>[INPUT]</span>
                <span className="text-[6px] text-slate-600 mt-1">Client View</span>
              </div>
              <div className="text-slate-700 animate-pulse">➔</div>
              <div className="border px-1.5 py-2.5 rounded text-center w-18 flex flex-col items-center relative" style={{ borderColor: `${accentColor}30`, backgroundColor: `${accentColor}05` }}>
                <span style={{ color: accentColor }}>[API_GATE]</span>
                <span className="text-[6px] text-slate-500 mt-1">Sanitizer</span>
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
              </div>
              <div className="text-slate-700 animate-pulse">➔</div>
              <div className="border border-slate-800 bg-black/40 px-1 py-2.5 rounded text-center w-14 flex flex-col items-center">
                <span>[DATABASE]</span>
                <span className="text-[6px] text-slate-655 mt-1">{project.techStack.includes('Firebase') || project.techStack.includes('Firestore') ? 'Firestore' : 'Core Logic'}</span>
              </div>
            </div>

            <div className="text-[7px] text-slate-600 border-t border-slate-900 pt-2 text-center mt-2">
              System Boundary Integrity Shield: Active SHA-255 validation.
            </div>
          </div>
        );

      case 'landing':
        if (project.id === 'twoframes') {
          return (
            <LaptopFrame>
              <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#060814] to-[#120a1c] text-white text-center font-mono relative">
                <div className="absolute inset-0 bg-cyber-grid opacity-5" />
                <span className="text-[12px] font-bold text-neon-pink font-display">TwoFrames</span>
                <h5 className="text-[7px] text-slate-350 max-w-[140px] mt-1.5 leading-relaxed">
                  Preserve special moments, share memories, and stay paired through a beautiful digital experience.
                </h5>
                <div className="flex gap-2 mt-3 text-[6px]">
                  <span className="bg-neon-pink/15 text-neon-pink border border-neon-pink/30 px-2.5 py-0.5 rounded-full">Explore App</span>
                  <span className="border border-slate-700 px-2.5 py-0.5 rounded-full text-slate-400">View Demo</span>
                </div>
              </div>
            </LaptopFrame>
          );
        }
        return (
          <LaptopFrame>
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#070d1e] to-[#040812] text-white text-center font-mono">
              <span className="text-[11px] font-bold text-neon-purple">Collab Board</span>
              <p className="text-[6px] text-slate-455 mt-1 max-w-[130px]">Where collegiate ideas meet deployment and developer resources.</p>
              <div className="mt-2.5 bg-neon-purple text-white text-[6px] px-2 py-0.5 rounded cursor-pointer">Launch Board</div>
            </div>
          </LaptopFrame>
        );

      case 'login':
        return (
          <LaptopFrame>
            <div className="w-full h-full flex items-center justify-center bg-[#04060f] p-4 font-mono text-[7px] text-slate-350">
              <div className="w-36 bg-slate-905/85 border border-neon-pink/20 p-2.5 rounded-lg flex flex-col gap-1.5 shadow-md">
                <span className="font-bold text-neon-pink text-center block mb-1">Pairing Portal</span>
                <div>
                  <label className="text-slate-500 block text-[6px]">YOUR ACCESS CODE:</label>
                  <div className="border border-slate-800 p-1 rounded bg-black/40 text-slate-400">BY_SEC_YOGA</div>
                </div>
                <div>
                  <label className="text-slate-500 block text-[6px]">PARTNER ACCESS CODE:</label>
                  <div className="border border-slate-800 p-1 rounded bg-black/40 text-slate-655">Enter code token...</div>
                </div>
                <button className="bg-neon-pink text-white py-1 rounded text-[6px] font-bold mt-1">CONNECT SECURE FEED</button>
              </div>
            </div>
          </LaptopFrame>
        );

      case 'profile':
        return (
          <LaptopFrame>
            <div className="w-full h-full p-2.5 flex text-slate-300 font-mono text-[7px] gap-2 text-left bg-[#050915]">
              {/* Profile Card Mock */}
              <div className="w-1/3 border border-slate-800 rounded p-1.5 bg-black/30 flex flex-col items-center gap-1.5 text-center">
                <div className="w-8 h-8 rounded-full bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-neon-purple font-bold">BY</div>
                <div>
                  <span className="font-bold text-white block">Yoganandha</span>
                  <span className="text-[5px] text-slate-505">B.Tech CSE Student</span>
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                <span className="font-bold text-neon-purple block border-b border-slate-900 pb-0.5">DEV_CREDENTIALS</span>
                <div className="text-[6px] space-y-1 text-slate-400">
                  <div>✔ Firebase Auth integrations</div>
                  <div>✔ React component architectures</div>
                  <div>✔ Security audit profiles completed</div>
                </div>
              </div>
            </div>
          </LaptopFrame>
        );

      case 'form':
        return (
          <LaptopFrame>
            <div className="w-full h-full p-3 font-mono text-[7px] text-slate-300 text-left space-y-2 bg-[#060814]">
              <span className="font-bold text-neon-pink block border-b border-slate-900 pb-1">PREDICTION MATRIX CONTROLS</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-500 block text-[6px]">Experience Index (Years):</label>
                  <input type="text" placeholder="e.g. 5.0" readOnly className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-[7px] outline-none text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500 block text-[6px]">Role Segment Tag:</label>
                  <div className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-slate-400">Security Engineer</div>
                </div>
              </div>
              <button className="w-full bg-neon-pink text-white py-1 rounded text-[6px] font-bold">CALCULATE PROJECTED SALARY</button>
            </div>
          </LaptopFrame>
        );

      case 'analytics':
        return (
          <LaptopFrame>
            <div className="w-full h-full p-2.5 font-mono text-[7px] text-slate-455 flex flex-col justify-between text-left bg-[#050915]">
              <span className="text-white font-bold block border-b border-slate-900 pb-1">COMPENSATION REGRESSION PLOT</span>
              {/* Mock plot */}
              <div className="flex-1 relative border-l border-b border-slate-800 my-2 h-16">
                <span className="absolute bottom-1 right-2 text-slate-600 text-[5px]">Experience</span>
                <span className="absolute left-1 top-1 text-slate-600 text-[5px] rotate-90 origin-left">Salary</span>
                {/* regression line */}
                <div className="absolute w-[80%] h-[1px] bg-neon-pink rotate-[20deg] bottom-6 left-1 opacity-70" />
                {/* dots */}
                <span className="absolute w-1 h-1 rounded-full bg-white bottom-3 left-4" />
                <span className="absolute w-1 h-1 rounded-full bg-white bottom-7 left-12" />
                <span className="absolute w-1 h-1 rounded-full bg-neon-pink bottom-9 left-20 shadow-lg shadow-neon-pink" />
              </div>
              <div className="text-[6px] text-slate-500 text-center">Model: OLS Linear Regression // Error: R²=0.92</div>
            </div>
          </LaptopFrame>
        );

      case 'carousel': {
        const slide = twoFramesCarouselSlides[twoFramesCarouselIndex];
        return (
          <div className="w-full h-full bg-[#040713] p-4 text-left font-mono flex flex-col justify-between relative overflow-hidden select-none">
            <div className="absolute inset-0 bg-cyber-grid opacity-[0.03]" />
            
            {/* Header / Page Count */}
            <div className="flex justify-between items-center text-slate-500 border-b border-slate-900 pb-1.5 text-[7px]">
              <span className="text-neon-pink uppercase tracking-widest font-bold">TwoFrames Showcase Carousel</span>
              <span>SLIDE 0{twoFramesCarouselIndex + 1} / 04</span>
            </div>

            {/* Slide Body */}
            <div className="my-2.5 flex-1 flex flex-col justify-center">
              <span className="text-[9px] font-bold text-white uppercase block">{slide.title}</span>
              <p className="text-[8px] text-slate-455 leading-relaxed mt-1">{slide.desc}</p>
              <span className="text-[7px] text-neon-pink font-bold mt-2 inline-block">SYSTEM_METRIC: {slide.stat}</span>
            </div>

            {/* Slider Buttons */}
            <div className="flex items-center justify-between border-t border-slate-900 pt-1.5">
              <button
                onClick={() => setTwoFramesCarouselIndex((prev) => (prev - 1 + 4) % 4)}
                className="p-1 hover:text-neon-pink bg-slate-950 border border-slate-900 rounded cursor-pointer transition-colors"
                title="Prev Slide"
              >
                <ChevronLeft size={12} />
              </button>
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((idx) => (
                  <span
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${twoFramesCarouselIndex === idx ? 'bg-neon-pink' : 'bg-slate-800'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setTwoFramesCarouselIndex((prev) => (prev + 1) % 4)}
                className="p-1 hover:text-neon-pink bg-slate-950 border border-slate-900 rounded cursor-pointer transition-colors"
                title="Next Slide"
              >
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        );
      }

      default:
        return (
          <div className="w-full h-full flex items-center justify-center p-6 bg-slate-900 text-white font-mono text-center">
            <Laptop size={32} className="text-neon-cyan mb-2" />
            <span>IMAGE_CAROUSEL // SCREENSHOT_DOCK</span>
          </div>
        );
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    analyticsActions.projectLinkClick(project.title, 'live');
  };

  return (
    <SectionWrapper id="projects" className="relative">
      
      {/* Title */}
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 uppercase font-mono">
          &gt;_ PROJECTS SHOWCASE
        </h2>
        <div className="h-1 w-20 bg-neon-cyan dark:bg-neon-green rounded mx-auto md:mx-0" />
      </div>

      {/* Projects Grid - Premium Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projectsList.map((project) => {
          const isLarge = project.id === 'lexai' || project.id === 'twoframes' || project.id === 'aadhaar-sentinel';
          
          return (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              data-cursor-text="INSPECT"
              className={`glass-panel bg-white/70 dark:bg-[#0b1224]/50 border border-slate-200 dark:border-slate-800/60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-350 hover:-translate-y-1.5 hover:shadow-xl group flex flex-col ${
                isLarge ? 'lg:col-span-2 md:flex-row md:items-stretch' : 'lg:col-span-1'
              }`}
            >
              {/* Mockup Display - 50% left for large, top full width for standard */}
              <div className={`relative overflow-hidden bg-slate-955 flex items-center justify-center border-slate-200 dark:border-slate-800 ${
                isLarge ? 'md:w-1/2 border-b md:border-b-0 md:border-r' : 'w-full aspect-video border-b'
              }`}>
                {renderMockup(project, 'banner')}
              </div>

              {/* Project Copy */}
              <div className={`p-6 flex flex-col justify-between ${isLarge ? 'md:w-1/2' : 'flex-1'}`}>
                <div>
                  {project.featuredLabel && (
                    <span className="text-[9px] font-mono font-bold text-neon-cyan dark:text-neon-cyan uppercase tracking-widest bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-neon-cyan/20 px-2.5 py-1 rounded-full">
                      {project.featuredLabel}
                    </span>
                  )}
                  
                  <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white mt-3.5 font-display group-hover:text-neon-cyan transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-450 font-medium font-mono mt-1">
                    {project.tagline}
                  </p>
                  
                  <p className="text-xs text-slate-605 dark:text-slate-400 leading-relaxed font-sans mt-3 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Impact Metrics Block */}
                  <div className="mt-4 bg-slate-50 dark:bg-black/35 border border-slate-200 dark:border-slate-850 p-3 rounded-xl">
                    <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1.5">
                      Measurable Outcomes // Metrics
                    </span>
                    <ul className="text-[10px] font-mono text-slate-700 dark:text-slate-350 space-y-1">
                      {project.impactMetrics.map((metric, mIdx) => (
                        <li key={mIdx} className="flex items-center gap-1.5">
                          <span className="text-neon-cyan dark:text-neon-green font-bold">•</span>
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded text-[8px] font-mono border border-slate-200/50 dark:border-slate-800/40">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-neon-cyan group-hover:underline duration-300 shrink-0">
                    <span>Inspect</span>
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">➔</span>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Details Modal overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#02050a]/80 backdrop-filter backdrop-blur-md"
            />

            {/* Modal box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full max-w-4xl glass-panel bg-white dark:bg-[#070c18] border border-slate-200 dark:border-neon-cyan/20 rounded-2xl shadow-2xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-105 dark:border-slate-800/80 px-6 py-4 bg-slate-50 dark:bg-[#a1122]/10">
                <div className="flex items-center gap-2">
                  <Cpu size={16} className="text-neon-cyan" />
                  <span className="font-mono text-xs text-slate-500 dark:text-neon-cyan uppercase">PROJECT_LOG // {selectedProject.id}</span>
                </div>
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-300 dark:hover:border-slate-800 p-1.5 rounded-full cursor-pointer transition-all duration-300"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Desktop Side-by-Side Content Container */}
              <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden min-h-0">
                
                {/* Left Column: Device Mockup Screenshot & Tab Controls */}
                <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800/80 bg-slate-50/30 dark:bg-black/15 flex flex-col justify-between space-y-4">
                  <div className="flex-1 aspect-[4/3] sm:aspect-video md:aspect-[4/3] w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800/60 flex items-center justify-center p-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab + twoFramesCarouselIndex}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        {renderMockup(selectedProject, activeTab)}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  {/* Gallery Slide Toggles */}
                  <div className="flex flex-wrap gap-1.5 justify-center font-mono text-[9px] shrink-0">
                    {selectedProject.galleryTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setTwoFramesCarouselIndex(0); // Reset slide on tab switch
                        }}
                        className={`px-2.5 py-1 rounded border transition-all cursor-pointer ${
                          activeTab === tab.id
                            ? 'bg-slate-900 border-slate-800 text-white dark:bg-neon-cyan/15 dark:border-neon-cyan dark:text-neon-cyan font-bold'
                            : 'bg-slate-55 border-slate-200 text-slate-500 dark:bg-black/30 dark:border-slate-800 hover:text-slate-700 dark:hover:text-white'
                        }`}
                      >
                        {tab.label.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Column: Scrollable Details */}
                <div className="w-full md:w-1/2 p-6 overflow-y-auto space-y-6 text-left">
                  
                  {/* Title and tagline */}
                  <div>
                    {selectedProject.featuredLabel && (
                      <span className="text-[10px] font-mono font-bold text-neon-cyan uppercase tracking-widest block mb-1">
                        {selectedProject.featuredLabel}
                      </span>
                    )}
                    <h3 className="text-xl md:text-2xl font-bold text-slate-850 dark:text-white font-display">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-neon-cyan font-medium font-mono mt-0.5">
                      {selectedProject.tagline}
                    </p>
                  </div>

                  {/* Role and Tech Stack */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-slate-900 p-4 rounded-xl font-mono text-xs">
                    <div>
                      <span className="text-slate-400">ROLE:</span>
                      <p className="text-slate-800 dark:text-white font-semibold mt-0.5">{selectedProject.role}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">STACK:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {selectedProject.techStack.map((tech) => (
                          <span key={tech} className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-350 px-2 py-0.5 rounded text-[10px]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Overview */}
                  <div className="space-y-2 font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <h4 className="text-slate-800 dark:text-white font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-1.5">
                      <Code2 size={13} className="text-neon-cyan" />
                      <span>Technical Architecture</span>
                    </h4>
                    <p>{selectedProject.detailedDescription}</p>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2 font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    <h4 className="text-slate-800 dark:text-white font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-1.5">
                      <Compass size={13} className="text-neon-cyan" />
                      <span>Key Capabilities</span>
                    </h4>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="leading-relaxed">{feature}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges & Lessons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-850 pt-4">
                    <div className="space-y-1 font-sans text-xs text-slate-600 dark:text-slate-400">
                      <h4 className="text-slate-850 dark:text-white font-bold text-xs uppercase font-mono tracking-wider">
                        ⚠️ Challenges
                      </h4>
                      <p className="leading-relaxed text-[11px]">{selectedProject.challenges}</p>
                    </div>
                    <div className="space-y-1 font-sans text-xs text-slate-600 dark:text-slate-400">
                      <h4 className="text-slate-850 dark:text-white font-bold text-xs uppercase font-mono tracking-wider">
                        💡 Lessons
                      </h4>
                      <p className="leading-relaxed text-[11px]">{selectedProject.lessons}</p>
                    </div>
                  </div>

                  {/* Security Mitigations report */}
                  {selectedProject.vulnerabilityMitigation && (
                    <div className="border border-amber-500/20 bg-amber-500/5 dark:border-neon-cyan/20 dark:bg-neon-cyan/5 p-4 rounded-xl space-y-2">
                      <h4 className="text-amber-800 dark:text-neon-cyan font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-1.5">
                        <ShieldAlert size={14} className="text-amber-500 dark:text-neon-cyan animate-pulse" />
                        <span>Security Hardening Audit</span>
                      </h4>
                      <p className="font-mono text-[11px] leading-relaxed text-slate-700 dark:text-slate-350">
                        {selectedProject.vulnerabilityMitigation}
                      </p>
                    </div>
                  )}

                </div>
              </div>

              {/* Footer CTA Buttons */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 px-6 py-4 bg-slate-50 dark:bg-[#050811] flex flex-col sm:flex-row items-center gap-4 shrink-0">
                
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analyticsActions.projectLinkClick(selectedProject.title, 'github')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-950 text-white font-semibold text-xs px-5 py-2.5 rounded-full cursor-pointer hover:bg-black dark:hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300"
                >
                  <Github size={14} />
                  <span>View Repository</span>
                </a>

                {selectedProject.liveUrl && selectedProject.liveUrl !== selectedProject.githubUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analyticsActions.projectLinkClick(selectedProject.title, 'live')}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-neon-cyan/10 border border-neon-cyan/35 text-neon-cyan dark:bg-[#05262b]/30 dark:border-neon-cyan/35 dark:text-neon-cyan font-semibold text-xs px-5 py-2.5 rounded-full cursor-pointer hover:bg-neon-cyan/20 dark:hover:bg-neon-cyan/10 transition-all duration-300"
                  >
                    <ExternalLink size={14} />
                    <span>Live Showcase</span>
                  </a>
                )}
                
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </SectionWrapper>
  );
};

export default Projects;
