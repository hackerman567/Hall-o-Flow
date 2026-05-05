
import React, { useState, useEffect } from 'react';
import { Menu, X, Atom, User, BrainCircuit, Sun, Sparkles, Lock, ChevronRight, Activity, Zap, Coffee, FileText } from 'lucide-react';
import { NavItem, Theme, Mood } from '../../types';
import { HoloIcon } from '../ui/HoloIcon';

const NAV_ITEMS: NavItem[] = [
  { label: 'System', href: '#system' },
  { label: 'Intelligence', href: '#features' },
  { label: 'Engine', href: '#demo' },
  { label: 'Connect', href: '#contact' },
];

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false); // Now represents Mood Interface

  const isRoyal = theme === 'royal';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const moodOptions: { id: Mood; title: string; desc: string; icon: any }[] = [
     { id: 'focus', title: 'Deep Focus', desc: 'High-intensity cognitive load', icon: Zap },
     { id: 'creative', title: 'Creative Flow', desc: 'Abstract thinking & design', icon: Sparkles },
     { id: 'recovery', title: 'Recovery', desc: 'Low energy / Regeneration', icon: Coffee },
     { id: 'maintenance', title: 'Admin & Sort', desc: 'Organization & Logistics', icon: FileText },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 border-b ${
          isScrolled || isMobileMenuOpen || isVaultOpen
            ? isRoyal 
              ? 'bg-royal-obsidian/90 border-royal-gold/20 backdrop-blur-xl py-4'
              : 'bg-space-950/80 border-neon-cyan/20 backdrop-blur-xl py-4'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Area - Universe Icon */}
          <a href="#hero" className="flex items-center gap-3 group relative z-50">
            <div className="relative">
              <div className={`absolute inset-0 rounded-full blur-md opacity-40 group-hover:opacity-80 transition-opacity animate-pulse ${isRoyal ? 'bg-royal-gold' : 'bg-neon-cyan'}`}></div>
              <Atom className={`w-10 h-10 relative z-10 ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'} group-hover:rotate-180 transition-transform duration-1000`} />
            </div>
            <div className="flex flex-col">
               <span className={`text-xl font-bold tracking-[0.2em] leading-none transition-colors duration-500 ${isRoyal ? 'font-serif text-royal-gold' : 'font-display text-white'}`}>
                 HALL-O
               </span>
               <span className={`text-sm tracking-[0.5em] leading-none ${isRoyal ? 'text-white' : 'text-neon-cyan'}`}>FLOW</span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-12">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 relative group
                  ${isRoyal 
                    ? 'font-serif text-royal-silver hover:text-royal-gold' 
                    : 'font-display text-gray-400 hover:text-neon-cyan'
                  }`}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-1/2 w-0 h-[1px] transition-all duration-300 group-hover:w-full group-hover:left-0 ${isRoyal ? 'bg-royal-gold' : 'bg-neon-cyan'}`}></span>
              </a>
            ))}
          </div>

          {/* Control Deck (Right Side) */}
          <div className="hidden md:flex items-center gap-6 relative z-50">
            
            {/* Reality Shift Switch */}
            <button 
              onClick={onToggleTheme}
              className={`group relative p-2 rounded-full border transition-all duration-500 overflow-hidden ${
                isRoyal ? 'border-royal-gold/30 bg-royal-gold/5 text-royal-gold' : 'border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan'
              }`}
              title="Shift Reality"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity ${isRoyal ? 'bg-royal-gold' : 'bg-neon-cyan'}`}></div>
              {isRoyal ? <Sun size={18} className="animate-spin-slow" /> : <Sparkles size={18} className="animate-pulse" />}
            </button>

            {/* Account */}
            <button className={`flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors ${isRoyal ? 'text-royal-silver hover:text-royal-gold font-serif' : 'text-gray-400 hover:text-neon-cyan font-display'}`}>
              <User size={14} />
              <span>Login</span>
            </button>

            {/* Neural Sync Trigger (Replaces Menu) */}
            <button 
              onClick={() => setIsVaultOpen(true)}
              className={`p-2 transition-all duration-300 transform hover:scale-110 flex items-center gap-2 border rounded-full px-4 ${isRoyal ? 'border-royal-gold/30 text-royal-gold hover:bg-royal-gold/10' : 'border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10'}`}
            >
               <span className="text-[10px] tracking-widest font-bold uppercase hidden lg:block">Status Input</span>
               <BrainCircuit size={18} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden transition-colors ${isRoyal ? 'text-royal-gold' : 'text-white hover:text-neon-cyan'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* NEURAL SYNC INTERFACE (Replaces Premium Menu) */}
      <div 
        className={`fixed inset-0 z-[60] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
           isVaultOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
         {/* Backdrop */}
         <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsVaultOpen(false)}></div>
         
         {/* Drawer Content */}
         <div 
            className={`absolute top-0 right-0 h-full w-full md:w-[500px] shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] transform ${
               isVaultOpen ? 'translate-x-0' : 'translate-x-full'
            } ${isRoyal ? 'bg-royal-obsidian border-l border-royal-gold/20' : 'bg-space-950 border-l border-neon-cyan/20'}`}
         >
            {/* Header */}
            <div className="p-8 flex justify-between items-center border-b border-white/5">
               <div className="flex items-center gap-3">
                  <Activity className={`animate-pulse ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'}`} />
                  <span className={`text-xl font-bold tracking-widest uppercase ${isRoyal ? 'font-serif text-royal-gold' : 'font-display text-white'}`}>
                     Neural <span className={isRoyal ? 'text-white' : 'text-neon-cyan'}>Sync</span>
                  </span>
               </div>
               <button onClick={() => setIsVaultOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X size={24} />
               </button>
            </div>

            {/* Prompt */}
            <div className="px-8 pt-8 pb-4">
               <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Input Required</p>
               <h3 className="text-2xl text-white font-light">What is your current cognitive state?</h3>
            </div>

            {/* Mood Options */}
            <div className="p-8 grid grid-cols-1 gap-4">
               {moodOptions.map((item) => (
                  <div 
                     key={item.id} 
                     className={`group relative p-6 rounded-xl border transition-all duration-500 cursor-pointer overflow-hidden flex items-center gap-6 ${
                        isRoyal 
                           ? 'border-royal-gold/10 bg-royal-gold/5 hover:bg-royal-gold/10 hover:border-royal-gold/50' 
                           : 'border-white/5 bg-white/5 hover:bg-neon-cyan/10 hover:border-neon-cyan/50'
                     }`}
                  >
                     <div className="flex-shrink-0">
                        <HoloIcon type={item.id} theme={theme} />
                     </div>
                     <div>
                        <h3 className={`text-lg font-bold mb-1 transition-colors ${isRoyal ? 'font-serif text-white group-hover:text-royal-gold' : 'font-display text-white group-hover:text-neon-cyan'}`}>
                           {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono">{item.desc}</p>
                     </div>
                     
                     <ChevronRight className={`ml-auto w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'}`} />
                  </div>
               ))}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 w-full p-8 border-t border-white/5 bg-black/20">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Algorithm Confidence</span>
                  <span className={`text-[10px] font-bold font-mono ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'}`}>99.8%</span>
               </div>
               <div className="w-full bg-gray-800 h-[1px]">
                  <div className={`h-full w-[99.8%] ${isRoyal ? 'bg-royal-gold' : 'bg-neon-cyan'}`}></div>
               </div>
            </div>

         </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-500 md:hidden ${
          isMobileMenuOpen 
             ? `opacity-100 pointer-events-auto ${isRoyal ? 'bg-royal-obsidian' : 'bg-space-950'}` 
             : 'opacity-0 pointer-events-none bg-space-950'
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => scrollToSection(e, item.href)}
            className={`text-2xl transition-colors ${isRoyal ? 'font-serif text-white hover:text-royal-gold' : 'font-display text-white hover:text-neon-cyan'}`}
          >
            {item.label}
          </a>
        ))}
        {/* Mobile Theme Toggle */}
        <button 
           onClick={() => { onToggleTheme(); setIsMobileMenuOpen(false); }}
           className="mt-8 px-6 py-2 border border-white/20 rounded-full text-white uppercase tracking-widest text-xs"
        >
           Switch Reality
        </button>
      </div>
    </>
  );
};
