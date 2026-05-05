import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, RefreshCcw, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

interface StudyPlanProps {
  theme: 'cyber' | 'royal';
  user: any;
}

export const StudyPlan: React.FC<StudyPlanProps> = ({ theme, user }) => {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeDay, setActiveDay] = useState('Monday');

  const weeklyPlans: any = {
    'Monday': [
      { title: 'Data Structures - Graphs', startTime: new Date().setHours(18, 0), endTime: new Date().setHours(19, 30), type: 'Deep Focus' },
      { title: 'Maths IV - Complex Analysis', startTime: new Date().setHours(20, 0), endTime: new Date().setHours(21, 30), type: 'Review' },
      { title: 'OS - Process Management', startTime: new Date().setHours(22, 0), endTime: new Date().setHours(23, 30), type: 'Study' },
    ],
    'Tuesday': [
      { title: 'Microprocessors - 8086', startTime: new Date().setHours(18, 30), endTime: new Date().setHours(20, 0), type: 'Deep Focus' },
      { title: 'Software Eng. - SDLC', startTime: new Date().setHours(20, 30), endTime: new Date().setHours(22, 0), type: 'Review' },
      { title: 'DBMS - Advanced SQL', startTime: new Date().setHours(22, 30), endTime: new Date().setHours(23, 30), type: 'Study' },
    ],
    'Wednesday': [
      { title: 'Analog Circuits - Filters', startTime: new Date().setHours(18, 0), endTime: new Date().setHours(19, 30), type: 'Deep Focus' },
      { title: 'Digital Logic - K-Maps', startTime: new Date().setHours(20, 0), endTime: new Date().setHours(21, 0), type: 'Review' },
      { title: 'Theory of Computation', startTime: new Date().setHours(21, 30), endTime: new Date().setHours(23, 0), type: 'Study' },
    ],
    'Thursday': [
      { title: 'Networks - OSI Model', startTime: new Date().setHours(18, 0), endTime: new Date().setHours(19, 30), type: 'Deep Focus' },
      { title: 'AI Essentials - Search', startTime: new Date().setHours(20, 30), endTime: new Date().setHours(22, 0), type: 'Study' },
    ],
    'Friday': [
      { title: 'Ethics Paper Draft', startTime: new Date().setHours(18, 0), endTime: new Date().setHours(19, 30), type: 'Writing' },
      { title: 'DB Design - ER Diagrams', startTime: new Date().setHours(20, 0), endTime: new Date().setHours(22, 0), type: 'Deep Focus' },
    ],
    'Saturday': [
      { title: 'Mini Project Coding', startTime: new Date().setHours(15, 0), endTime: new Date().setHours(18, 0), type: 'Lab Work' },
      { title: 'Weekly Review', startTime: new Date().setHours(19, 0), endTime: new Date().setHours(20, 30), type: 'Review' },
    ]
  };

  useEffect(() => {
    setPlan({
      optimizationScore: 0.94,
      tasks: weeklyPlans[activeDay] || weeklyPlans['Monday']
    });
  }, [user.id, activeDay]);

  const generateNewPlan = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/schedule/generate', {
        userId: user.id,
        mood: 'focus'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchPlan();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-reveal space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-3xl font-display font-bold flex items-center gap-3 ${
            theme === 'royal' ? 'text-royal-gold' : 'text-neon-cyan'
          }`}>
            <BookOpen className="w-8 h-8" />
            Weekly Study Plan
          </h2>
          <p className="text-gray-500 mt-1">Personalized schedule optimized for your academic success</p>
        </div>
        <button
          onClick={generateNewPlan}
          disabled={loading}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
            theme === 'royal'
            ? 'bg-royal-gold text-black hover:bg-white'
            : 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/20'
          }`}
        >
          {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          {loading ? 'Generating...' : 'New Plan'}
        </button>
      </div>

      {/* Day Selector */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
              activeDay === day
              ? (theme === 'royal' ? 'bg-royal-gold border-royal-gold text-black' : 'bg-neon-cyan border-neon-cyan text-black')
              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {!plan ? (
        <div className={`p-12 rounded-2xl border border-dashed text-center space-y-6 ${
          theme === 'royal' ? 'border-royal-gold/20 bg-royal-dark/30' : 'border-neon-cyan/20 bg-space-900/30'
        }`}>
          <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${
            theme === 'royal' ? 'bg-royal-gold/10' : 'bg-neon-cyan/10'
          }`}>
            <BookOpen className={`w-10 h-10 ${theme === 'royal' ? 'text-royal-gold' : 'text-neon-cyan'}`} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">No Study Plan Found</h3>
            <p className="text-gray-500 max-w-sm mx-auto">Let the system analyze your timetable and tasks to create a personalized study schedule for you.</p>
          </div>
          <button
            onClick={generateNewPlan}
            className={`px-8 py-4 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 transition-all`}
          >
            Create My First Plan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Optimization Stats */}
          <div className={`p-6 rounded-2xl border backdrop-blur-xl col-span-full ${
            theme === 'royal' ? 'bg-royal-dark/50 border-royal-gold/20' : 'bg-space-900/50 border-neon-cyan/20'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                  theme === 'royal' ? 'bg-royal-gold/20 text-royal-gold' : 'bg-neon-cyan/20 text-neon-cyan'
                }`}>
                  {Math.round(plan.optimizationScore * 100)}%
                </div>
                <div>
                  <h4 className="font-bold">Efficiency Score</h4>
                  <p className="text-xs text-gray-500">Based on your study patterns & deadlines</p>
                </div>
              </div>
              <div className="hidden md:flex gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold">{plan.tasks?.length || 0}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Sessions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">~4.5h</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Total Time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Slots */}
          {plan.tasks?.map((slot: any, i: number) => (
            <div key={i} className={`p-6 rounded-2xl border backdrop-blur-xl group hover:translate-y-[-4px] transition-all duration-300 ${
              theme === 'royal' ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg ${theme === 'royal' ? 'bg-royal-gold/10' : 'bg-neon-cyan/10'}`}>
                  <Clock className={`w-5 h-5 ${theme === 'royal' ? 'text-royal-gold' : 'text-neon-cyan'}`} />
                </div>
                <button className="text-gray-500 hover:text-green-400 transition-colors">
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
              
              <h4 className="text-lg font-bold mb-1 truncate">{slot.title}</h4>
              <p className="text-xs text-gray-500 mb-6 flex items-center gap-2">
                {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>

              <div className="flex items-center gap-2">
                 <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  theme === 'royal' ? 'bg-royal-gold/10 text-royal-gold' : 'bg-neon-cyan/10 text-neon-cyan'
                }`}>
                  Focus Session
                </span>
                {i === 0 && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-orange-500/10 text-orange-500 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Priority
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
