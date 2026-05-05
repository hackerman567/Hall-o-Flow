import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Overview } from './components/sections/Overview';
import { Features } from './components/sections/Features';
import { Demo } from './components/sections/Demo';
import { Contact } from './components/sections/Contact';
import { StarField } from './components/ui/StarField';
import { Cursor } from './components/ui/Cursor';
import { Theme } from './types';

function App() {
  const [isWarping, setIsWarping] = useState(false);
  const [theme, setTheme] = useState<Theme>('cyber');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Apply theme class to body for global CSS overrides
  useEffect(() => {
    if (theme === 'royal') {
      document.body.classList.add('theme-royal');
      document.body.classList.remove('bg-space-950');
      document.body.classList.add('bg-royal-obsidian');
    } else {
      document.body.classList.remove('theme-royal');
      document.body.classList.add('bg-space-950');
      document.body.classList.remove('bg-royal-obsidian');
    }
  }, [theme]);

  const handleWarp = () => {
    setIsWarping(true);
    setTimeout(() => {
      document.getElementById('system')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        setIsWarping(false);
      }, 1000);
    }, 1500);
  };

  const toggleTheme = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(prev => prev === 'cyber' ? 'royal' : 'cyber');
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 500);
  };

  return (
    <div className={`min-h-screen text-gray-200 selection:text-black transition-colors duration-1000 ${
      theme === 'royal' ? 'selection:bg-royal-gold' : 'selection:bg-neon-cyan'
    }`}>
      
      {/* Reality Shift Distortion Layer */}
      {isTransitioning && (
         <div className="fixed inset-0 z-[100] bg-white mix-blend-difference animate-glitch pointer-events-none"></div>
      )}

      <Cursor />
      <StarField isWarping={isWarping} theme={theme} />
      
      {/* Nebula Atmosphere Layers - Dynamic Colors */}
      <div 
         className={`fixed top-[-20%] left-[-10%] w-[70vw] h-[70vw] blur-[150px] rounded-full pointer-events-none animate-nebula z-0 opacity-50 transition-colors duration-1000 ${
            theme === 'royal' ? 'bg-royal-gold/10' : 'bg-neon-purple/5'
         }`}
      ></div>
      <div 
         className={`fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] blur-[150px] rounded-full pointer-events-none animate-nebula z-0 opacity-50 transition-colors duration-1000 ${
            theme === 'royal' ? 'bg-royal-silver/10' : 'bg-neon-blue/5'
         }`}
         style={{ animationDirection: 'reverse', animationDuration: '90s' }}
      ></div>

      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      
      <main className="relative z-10">
        <Hero onWarp={handleWarp} />
        <Overview />
        <Features />
        <Demo />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;