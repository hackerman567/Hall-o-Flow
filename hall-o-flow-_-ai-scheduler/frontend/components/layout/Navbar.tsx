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
  user: any;
  onLogout: () => void;
  onNavigate: (view: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, user, onLogout, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  const isRoyal = theme === 'royal';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (user) {
      const view = href.replace('#', '');
      onNavigate(view as any);
      setIsMobileMenuOpen(false);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    }
  };

  const menuItems = user ? [
    { label: 'Dashboard', href: 'dashboard' },
    { label: 'Timetable', href: 'timetable' },
    { label: 'Assistant', href: 'chat' },
    { label: 'Study Plan', href: 'study' },
    { label: 'Progress', href: 'progress' },
  ] : NAV_ITEMS;

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
          
          <div onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 group relative z-50 cursor-pointer">
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
          </div>

          <div className="hidden md:flex items-center space-x-12">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.href}`}
                onClick={(e) => handleNavClick(e, `#${item.href}`)}
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

          <div className="hidden md:flex items-center gap-6 relative z-50">
            
            <button 
              onClick={onToggleTheme}
              className={`group relative p-2 rounded-full border transition-all duration-500 overflow-hidden ${
                isRoyal ? 'border-royal-gold/30 bg-royal-gold/5 text-royal-gold' : 'border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan'
              }`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity ${isRoyal ? 'bg-royal-gold' : 'bg-neon-cyan'}`}></div>
              {isRoyal ? <Sun size={18} className="animate-spin-slow" /> : <Sparkles size={18} className="animate-pulse" />}
            </button>

            {user ? (
              <button 
                onClick={onLogout}
                className={`flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors ${isRoyal ? 'text-royal-silver hover:text-royal-gold font-serif' : 'text-gray-400 hover:text-neon-cyan font-display'}`}
              >
                <Lock size={14} />
                <span>Logout ({user.name})</span>
              </button>
            ) : (
              <button 
                onClick={(e) => handleNavClick(e, '#system')}
                className={`flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors ${isRoyal ? 'text-royal-silver hover:text-royal-gold font-serif' : 'text-gray-400 hover:text-neon-cyan font-display'}`}
              >
                <User size={14} />
                <span>Login</span>
              </button>
            )}

            <button 
              onClick={() => setIsVaultOpen(true)}
              className={`p-2 transition-all duration-300 transform hover:scale-110 flex items-center gap-2 border rounded-full px-4 ${isRoyal ? 'border-royal-gold/30 text-royal-gold hover:bg-royal-gold/10' : 'border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10'}`}
            >
               <span className="text-[10px] tracking-widest font-bold uppercase hidden lg:block">Preferences</span>
               <BrainCircuit size={18} />
            </button>
          </div>

          <button
            className={`md:hidden transition-colors ${isRoyal ? 'text-royal-gold' : 'text-white hover:text-neon-cyan'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-40 md:hidden pt-24 px-6 transition-all duration-500 ${isRoyal ? 'bg-royal-obsidian/95' : 'bg-space-950/95'}`}>
          <div className="flex flex-col gap-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.href}`}
                onClick={(e) => handleNavClick(e, `#${item.href}`)}
                className={`text-xl font-bold tracking-widest uppercase ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'}`}
              >
                {item.label}
              </a>
            ))}
            {user && (
              <button onClick={onLogout} className="text-xl font-bold text-red-500 uppercase tracking-widest text-left">
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mood Vault (Left for aesthetics) */}
      <div 
        className={`fixed inset-0 z-[60] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
           isVaultOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
         <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsVaultOpen(false)}></div>
         
         <div 
            className={`absolute top-0 right-0 h-full w-full md:w-[500px] shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] transform ${
               isVaultOpen ? 'translate-x-0' : 'translate-x-full'
            } ${isRoyal ? 'bg-royal-obsidian border-l border-royal-gold/20' : 'bg-space-950 border-l border-neon-cyan/20'}`}
          >
            <button 
              onClick={() => setIsVaultOpen(false)}
              className={`absolute top-8 right-8 text-2xl ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'}`}
            >
              ×
            </button>
            
            <div className="p-12 pt-20">
              <h3 className={`text-2xl font-display font-bold mb-12 ${isRoyal ? 'text-royal-gold' : 'text-neon-cyan'}`}>
                SELECT MOOD
              </h3>
              
              <div className="space-y-4">
                {[
                  { id: 'focus', title: 'Deep Focus', desc: 'High-intensity cognitive load', icon: Zap },
                  { id: 'creative', title: 'Creative Flow', desc: 'Abstract thinking & design', icon: Sparkles },
                  { id: 'recovery', title: 'Recovery', desc: 'Low energy / Regeneration', icon: Coffee },
                  { id: 'maintenance', title: 'Admin & Sort', desc: 'Organization & Logistics', icon: FileText },
                ].map((mood) => (
                  <div 
                    key={mood.id}
                    onClick={() => {
                       alert(`${mood.title} mood applied successfully!`);
                       setIsVaultOpen(false);
                    }}
                    className={`p-4 rounded-lg border transition-all cursor-pointer group ${
                      isRoyal 
                        ? 'border-royal-gold/30 hover:border-royal-gold/60 hover:bg-royal-gold/5'
                        : 'border-neon-cyan/30 hover:border-neon-cyan/60 hover:bg-neon-cyan/5'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                         <mood.icon className={isRoyal ? 'text-royal-gold' : 'text-neon-cyan'} />
                        <div>
                          <h4 className="font-bold text-white mb-1">{mood.title}</h4>
                          <p className="text-xs text-gray-400">{mood.desc}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-[8px] font-bold uppercase transition-opacity opacity-0 group-hover:opacity-100 ${
                        isRoyal ? 'bg-royal-gold text-black' : 'bg-neon-cyan text-black'
                      }`}>
                        Apply
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>
    </>
  );
};
