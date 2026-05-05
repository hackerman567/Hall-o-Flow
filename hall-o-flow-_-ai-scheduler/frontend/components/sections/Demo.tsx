import React, { useState, useEffect } from 'react';
import { Reveal } from '../ui/Reveal';
import { Play, Pause, RefreshCw, Calendar } from 'lucide-react';
import { DemoItem } from '../../types';

const TASKS: DemoItem[] = [
  { id: 1, time: "09:00", task: "Algorithm Analysis", type: "focus", duration: "45m" },
  { id: 2, time: "09:45", task: "Cognitive Break", type: "break", duration: "10m" },
  { id: 3, time: "09:55", task: "System Design", type: "focus", duration: "50m" },
  { id: 4, time: "10:45", task: "Review Notes", type: "review", duration: "15m" },
];

export const Demo: React.FC = () => {
  const [activeTask, setActiveTask] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsPlaying(!isPlaying);
  const resetTimer = () => {
    setIsPlaying(false);
    setTimeLeft(25 * 60);
  };

  return (
    <section id="demo" className="py-32 relative overflow-hidden bg-space-950">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <Reveal>
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
             <div>
                <div className="text-neon-purple font-mono text-sm mb-2 flex items-center gap-2">
                   <span className="w-2 h-2 bg-neon-purple animate-pulse rounded-full"></span>
                   INTERACTIVE_PREVIEW
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
                   The Flow Engine
                </h2>
             </div>
             <div className="flex gap-4 text-xs font-mono text-gray-500">
                <span className="flex items-center gap-2"><div className="w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_5px_#00f3ff]"></div> FOCUS</span>
                <span className="flex items-center gap-2"><div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_5px_#facc15]"></div> BREAK</span>
             </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
           <div className="relative rounded-3xl border border-white/10 bg-glass-heavy backdrop-blur-2xl overflow-hidden min-h-[500px] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              
              <div className="scan-line"></div>

              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
                 style={{ 
                    backgroundImage: 'linear-gradient(#4d4dff 1px, transparent 1px), linear-gradient(90deg, #4d4dff 1px, transparent 1px)', 
                    backgroundSize: '40px 40px' 
                 }}>
              </div>

              <div className="relative z-10 flex flex-col md:flex-row h-full">
                 
                 <div className="w-full md:w-1/3 border-r border-white/10 p-6 md:p-8 bg-space-950/40">
                    <div className="mb-8 flex items-center gap-3">
                       <Calendar className="text-neon-cyan w-5 h-5" />
                       <span className="text-white font-display font-bold tracking-widest text-sm">QUANTUM SCHEDULE</span>
                    </div>

                    <div className="space-y-4">
                       {TASKS.map((task) => (
                          <div 
                             key={task.id}
                             onClick={() => setActiveTask(task.id)}
                             className={`relative p-4 rounded-xl border transition-all cursor-pointer group overflow-hidden ${
                                activeTask === task.id 
                                ? 'bg-white/5 border-neon-cyan/50 shadow-[0_0_15px_rgba(0,243,255,0.1)]' 
                                : 'bg-transparent border-white/5 hover:bg-white/5'
                             }`}
                          >
                             <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                             
                             <div className="flex justify-between items-center mb-1 relative z-10">
                                <span className={`text-xs font-mono ${activeTask === task.id ? 'text-neon-cyan' : 'text-gray-500'}`}>{task.time}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded border ${
                                   task.type === 'focus' ? 'border-neon-cyan/30 text-neon-cyan' : 
                                   task.type === 'break' ? 'border-yellow-400/30 text-yellow-400' : 'border-purple-500/30 text-purple-400'
                                }`}>{task.duration}</span>
                             </div>
                             <div className="text-white font-bold text-sm relative z-10">{task.task}</div>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="w-full md:w-2/3 p-6 md:p-12 flex flex-col justify-center items-center relative">
                    
                    <div className="absolute top-6 right-8">
                       <div className="flex items-center gap-2 text-xs font-mono text-neon-cyan">
                          <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div> 
                          {isPlaying ? 'NEURAL_LINK_ACTIVE' : 'SYSTEM_IDLE'}
                       </div>
                    </div>

                    <div className="text-center relative w-full max-w-md">
                       
                       <div className="relative w-64 h-64 mx-auto mb-10 flex items-center justify-center">
                          
                          <div className={`absolute inset-0 rounded-full border-2 border-transparent border-t-neon-cyan border-l-neon-purple opacity-50 ${isPlaying ? 'animate-spin-slow' : ''}`}></div>
                          
                          <div className="absolute inset-2 rounded-full border border-white/10"></div>
                          <svg className="absolute inset-0 w-full h-full -rotate-90">
                             <circle cx="128" cy="128" r="120" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
                             <circle 
                                cx="128" cy="128" r="120" 
                                stroke="#00f3ff" 
                                strokeWidth="2" 
                                fill="none" 
                                strokeDasharray="753"
                                strokeDashoffset={753 - (753 * (25 * 60 - timeLeft) / (25 * 60))}
                                className="transition-all duration-1000 ease-linear"
                             />
                          </svg>
                          
                          <div className="text-center relative z-10">
                             <div className="text-6xl font-display font-bold text-white mb-2 tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                                {formatTime(timeLeft)}
                             </div>
                             <div className="text-xs text-gray-500 font-mono tracking-[0.3em] uppercase">Session Timer</div>
                          </div>
                       </div>

                       <h3 className="text-3xl font-display text-white mb-2">
                          {TASKS.find(t => t.id === activeTask)?.task}
                       </h3>
                       <p className="text-neon-purple text-sm font-mono mb-10">
                          {activeTask === 1 ? 'Deep Work Phase // Notification Block Active' : activeTask === 2 ? 'Recharge Phase // Alpha Wave Audio' : 'Active Learning'}
                       </p>

                       <div className="flex items-center justify-center gap-6">
                          <button 
                             onClick={toggleTimer}
                             className={`group relative px-8 py-3 rounded-full font-bold transition-all overflow-hidden ${isPlaying ? 'bg-transparent border border-red-500 text-red-500' : 'bg-white text-black hover:bg-neon-cyan'}`}
                          >
                             <span className="relative z-10 flex items-center gap-2">
                                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />} 
                                {isPlaying ? 'PAUSE' : 'START SESSION'}
                             </span>
                             {isPlaying && <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/20 transition-colors"></div>}
                          </button>

                          <button 
                             onClick={resetTimer}
                             className="p-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all hover:rotate-90"
                          >
                             <RefreshCw className="w-5 h-5" />
                          </button>
                       </div>
                    </div>
                 </div>

              </div>
           </div>
        </Reveal>

      </div>
    </section>
  );
};
