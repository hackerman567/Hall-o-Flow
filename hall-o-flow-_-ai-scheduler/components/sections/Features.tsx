
import React from 'react';
import { Feature } from '../../types';
import { Reveal } from '../ui/Reveal';
import { TiltCard } from '../ui/TiltCard';
import { Grid, Zap, Eye, BarChart3, Activity, Cpu } from 'lucide-react';

const FEATURES: Feature[] = [
  {
    id: 1,
    title: "MATRIX REARRANGEMENT",
    description: "Dynamic priority sorting based on deadline velocity.",
    icon: <Grid className="w-5 h-5 text-neon-cyan" />
  },
  {
    id: 2,
    title: "DEEP FOCUS PROTOCOL",
    description: "Digital noise cancellation and ambient masking.",
    icon: <Eye className="w-5 h-5 text-neon-purple" />
  },
  {
    id: 3,
    title: "ADAPTIVE RECOVERY",
    description: "Fatigue-adjusted break intervals.",
    icon: <Zap className="w-5 h-5 text-yellow-400" />
  },
  {
    id: 4,
    title: "PATTERN RECOGNITION",
    description: "Longitudinal study habit analysis.",
    icon: <Activity className="w-5 h-5 text-pink-500" />
  },
  {
    id: 5,
    title: "MOMENTUM TRACKING",
    description: "Continuity visualization and streak analytics.",
    icon: <BarChart3 className="w-5 h-5 text-green-400" />
  },
  {
    id: 6,
    title: "NEURAL SYNC",
    description: "External calendar integration and slot prediction.",
    icon: <Cpu className="w-5 h-5 text-blue-400" />
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 bg-space-900 relative">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/5 pb-8">
            <div>
               <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">SYSTEM INTELLIGENCE</h2>
               <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">
                  Capabilities & Core Functions
               </p>
            </div>
            <div className="text-right hidden md:block">
               <div className="text-xs font-mono text-neon-cyan mb-1">STATUS: OPERATIONAL</div>
               <div className="w-32 h-1 bg-gray-800">
                  <div className="w-full h-full bg-neon-cyan animate-pulse"></div>
               </div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.id} delay={index * 0.1} direction="up">
               <TiltCard className="h-full">
                  <div className="relative h-full bg-space-950/40 backdrop-blur-sm border border-white/10 p-8 hover:border-neon-cyan/30 transition-colors duration-500 group">
                     
                     {/* Corner Markers for HUD look */}
                     <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20 group-hover:border-neon-cyan transition-colors"></div>
                     <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20 group-hover:border-neon-cyan transition-colors"></div>
                     <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/20 group-hover:border-neon-cyan transition-colors"></div>
                     <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20 group-hover:border-neon-cyan transition-colors"></div>

                     <div className="flex items-start justify-between mb-6">
                        <div className="text-xs font-mono text-gray-600 group-hover:text-neon-cyan transition-colors">
                           SYS_MOD_0{feature.id}
                        </div>
                        <div className="p-2 bg-white/5 rounded-sm border border-white/5 group-hover:border-neon-cyan/20 transition-all">
                           {feature.icon}
                        </div>
                     </div>
                     
                     <h3 className="text-sm font-bold font-display text-white mb-3 tracking-wider group-hover:text-neon-cyan transition-colors">
                        {feature.title}
                     </h3>
                     <p className="text-gray-500 text-xs leading-relaxed font-mono">
                        {feature.description}
                     </p>
                  </div>
               </TiltCard>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};
