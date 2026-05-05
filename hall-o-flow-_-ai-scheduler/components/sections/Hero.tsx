
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { ChevronDown, Radio } from 'lucide-react';

interface HeroProps {
  onWarp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWarp }) => {
  const [text, setText] = useState("");
  const fullText = "Self-Evolving Scheduler.";
  
  const [isRoyal, setIsRoyal] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
       setIsRoyal(document.body.classList.contains('theme-royal'));
    };
    const interval = setInterval(checkTheme, 100);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 perspective-[1000px]">
      
      {/* 3D Scene Container - More Abstract/Minimal now */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-30 transform-style-3d">
         <div className="relative w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] animate-spin-slow">
            <div className={`absolute inset-0 border-[0.5px] rounded-full transition-colors duration-1000 ${isRoyal ? 'border-royal-gold/10' : 'border-neon-cyan/10'}`}></div>
            <div className={`absolute inset-[20%] border-[0.5px] rounded-full transition-colors duration-1000 ${isRoyal ? 'border-royal-silver/10' : 'border-white/5'}`}></div>
            <div className={`absolute inset-[40%] border-[0.5px] border-dashed rounded-full transition-colors duration-1000 ${isRoyal ? 'border-royal-gold/20' : 'border-neon-cyan/20'}`}></div>
         </div>
      </div>

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        
        <Reveal direction="up" delay={0.1}>
          <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border bg-opacity-5 backdrop-blur-sm mb-12 transition-colors duration-1000 ${
             isRoyal ? 'border-royal-gold/20 bg-royal-gold/5' : 'border-neon-cyan/20 bg-space-950/30'
          }`}>
             <Radio className={`w-3 h-3 animate-pulse ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'}`} />
             <span className={`text-[10px] font-mono tracking-[0.3em] uppercase ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'}`}>Neural Interface Connected</span>
          </div>
        </Reveal>

        <Reveal delay={0.3} direction="up">
          <h1 className={`text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-none tracking-tight relative transition-all duration-1000 ${isRoyal ? 'font-serif' : 'font-display'}`}>
            HALL-O-<span className="hologram-text" data-text="FLOW">FLOW</span>
          </h1>
        </Reveal>

        <Reveal delay={0.5} direction="up">
          <h2 className="text-lg md:text-2xl font-light text-gray-400 mb-12 font-mono flex items-center justify-center gap-2 h-8">
            <span className="opacity-50">&gt;</span> 
            <span className={`transition-colors duration-1000 ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'}`}>{text}</span>
            <span className={`animate-pulse w-1.5 h-5 inline-block ${isRoyal ? 'bg-royal-gold' : 'bg-neon-cyan'}`}></span>
          </h2>
        </Reveal>

        <Reveal delay={0.7} direction="up">
           <p className="text-gray-500 max-w-xl mx-auto mb-16 text-sm leading-relaxed tracking-wide font-light">
             A master scheduler that operates on cognitive principles. 
             Optimizing your workflow through adaptive intelligence, not manual entry.
           </p>
        </Reveal>

        <Reveal delay={0.9} direction="up">
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
             <Button 
                variant="primary" 
                onClick={onWarp}
                className={`transition-all duration-500 min-w-[200px] ${isRoyal ? '!border-royal-gold !text-royal-gold hover:!bg-royal-gold hover:!text-black' : ''}`}
             >
                Sync Neural Calendar
             </Button>
          </div>
        </Reveal>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none opacity-50">
        <span className="text-[9px] uppercase tracking-[0.4em] text-gray-600">Scroll to Initialize</span>
        <ChevronDown className={`w-4 h-4 animate-bounce ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'}`} />
      </div>
      
      {/* Decorative Gradient */}
      <div className={`absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t to-transparent z-10 transition-colors duration-1000 ${isRoyal ? 'from-royal-obsidian' : 'from-space-950'}`}></div>
    </section>
  );
};
