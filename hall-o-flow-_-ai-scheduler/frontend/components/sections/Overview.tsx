import React from 'react';
import { Reveal } from '../ui/Reveal';
import { TiltCard } from '../ui/TiltCard';
import { BrainCircuit, Clock, Sparkles } from 'lucide-react';

export const Overview: React.FC = () => {
  return (
    <section id="system" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        <div className="relative order-2 lg:order-1">
          <Reveal direction="right">
            <TiltCard className="group">
              <div className="relative rounded-2xl border border-white/10 bg-space-900/50 backdrop-blur-xl p-6 md:p-10 overflow-hidden">
                 
                 <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                       <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <div className="text-xs font-mono text-neon-cyan">ANALYSIS_MODE_ACTIVE</div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex justify-between items-end">
                       <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Focus Score</div>
                          <div className="text-4xl font-display text-white">98.4<span className="text-sm text-neon-purple">%</span></div>
                       </div>
                       <div className="h-16 w-32 flex items-end gap-1">
                          {[40, 60, 30, 80, 50, 90, 70, 100].map((h, i) => (
                             <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-neon-purple to-neon-cyan opacity-80 rounded-t-sm"></div>
                          ))}
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-space-950/50 p-4 rounded border border-white/5">
                          <div className="text-xs text-gray-500 mb-2">NEXT SESSION</div>
                          <div className="text-white font-mono">Quantum Physics</div>
                          <div className="text-neon-cyan text-xs mt-1">Starting in 14m</div>
                       </div>
                       <div className="bg-space-950/50 p-4 rounded border border-white/5">
                          <div className="text-xs text-gray-500 mb-2">ENERGY LEVEL</div>
                          <div className="text-white font-mono">Optimal</div>
                          <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                             <div className="bg-neon-cyan w-[80%] h-full"></div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="absolute bottom-4 right-4 text-[10px] text-gray-700 font-mono opacity-20 pointer-events-none">
                    {`{ init: true, mode: 'adaptive' }`}
                 </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
           <Reveal delay={0.2}>
             <h4 className="text-neon-cyan text-sm font-mono tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-neon-cyan"></span> System Architecture
             </h4>
           </Reveal>
           
           <Reveal delay={0.3}>
             <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
               Not just a calendar. <br />
               A <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-blue-500">Neural Network</span> for your time.
             </h2>
           </Reveal>
           
           <Reveal delay={0.4}>
             <div className="space-y-8">
                <div className="flex gap-4">
                   <div className="mt-1 p-2 bg-neon-cyan/10 rounded-lg h-fit">
                      <BrainCircuit className="text-neon-cyan w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-xl text-white font-bold mb-2">Adaptive AI Scheduling</h3>
                      <p className="text-gray-400 font-light leading-relaxed text-sm">
                         The system learns your peak productivity hours and automatically rearranges tasks to match your cognitive energy flow.
                      </p>
                   </div>
                </div>

                <div className="flex gap-4">
                   <div className="mt-1 p-2 bg-neon-purple/10 rounded-lg h-fit">
                      <Sparkles className="text-neon-purple w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-xl text-white font-bold mb-2">Mood-Based Flow</h3>
                      <p className="text-gray-400 font-light leading-relaxed text-sm">
                         Select your current mental state (focus, creative, recovery, admin) and receive intelligently curated task queues.
                      </p>
                   </div>
                </div>

                <div className="flex gap-4">
                   <div className="mt-1 p-2 bg-blue-500/10 rounded-lg h-fit">
                      <Clock className="text-blue-400 w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-xl text-white font-bold mb-2">Real-Time Optimization</h3>
                      <p className="text-gray-400 font-light leading-relaxed text-sm">
                         Dynamic rescheduling based on your actual completion velocity and emerging priorities.
                      </p>
                   </div>
                </div>
             </div>
           </Reveal>
        </div>

      </div>
    </section>
  );
};
