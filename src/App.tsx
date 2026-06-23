import React, { useState, useEffect, Suspense } from 'react';
import TerminalIntro from './components/TerminalIntro';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Footer from './sections/Footer';

// Lazy load heavy 3D Background (Three.js / Fiber / Drei bundle)
const ThreeBackground = React.lazy(() => import('./components/ThreeBackground'));

// Lazy load page sections for performance chunking and Lighthouse performance 95+
const PlacementSnapshot = React.lazy(() => import('./sections/PlacementSnapshot'));
const About = React.lazy(() => import('./sections/About'));
const Skills = React.lazy(() => import('./sections/Skills'));
const Projects = React.lazy(() => import('./sections/Projects'));
const GitHubActivity = React.lazy(() => import('./sections/GitHubActivity'));
const Experience = React.lazy(() => import('./sections/Experience'));
const Certifications = React.lazy(() => import('./sections/Certifications'));
const Achievements = React.lazy(() => import('./sections/Achievements'));
const SecurityResearch = React.lazy(() => import('./sections/SecurityResearch'));
const Contact = React.lazy(() => import('./sections/Contact'));

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Apply dark class to document element on mount permanently for cybersecurity aesthetic
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* 1. Preloader Console */}
      <TerminalIntro onComplete={handleLoaderComplete} />

      {/* 2. Main Page Layout (Visible after preloader completes) */}
      {!isLoading && (
        <div className="relative min-h-screen bg-slate-950 dark:bg-[#070d1e] text-slate-200 overflow-x-hidden selection:bg-blue-500 dark:selection:bg-neon-cyan selection:text-white dark:selection:text-black transition-colors duration-500">
          
          {/* Cyber Scanlines Effect */}
          <div className="cyber-scanlines animate-pulse [animation-duration:8s] opacity-20" />

          {/* Premium Constellation Background - Lazy Loaded */}
          <Suspense fallback={null}>
            <ThreeBackground />
          </Suspense>

          {/* Desktop Inertia Custom Cursor */}
          <CustomCursor />

          {/* Floating Command Palette (Ctrl + K) */}
          <CommandPalette />

          {/* Navigation Bar */}
          <Navbar />

          {/* Page Sections */}
          <main className="relative z-10">
            <Hero />
            <Suspense fallback={
              <div className="h-40 flex items-center justify-center font-mono text-xs text-slate-400">
                [+] Decrypting layout packets...
              </div>
            }>
              <PlacementSnapshot />
              <About />
              <Skills />
              <Projects />
              <GitHubActivity />
              <Experience />
              <Certifications />
              <Achievements />
              <SecurityResearch />
              <Contact />
            </Suspense>
          </main>

          {/* Telemetry Footer */}
          <Footer />

        </div>
      )}
    </>
  );
};
export default App;
