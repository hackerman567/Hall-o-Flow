import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Award, CheckCircle2, Target, Zap } from 'lucide-react';
import axios from 'axios';

interface ProgressTrackerProps {
  theme: 'cyber' | 'royal';
  user: any;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ theme, user }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hardcoded analytics for screenshots
    setData({
      overallProgress: 72,
      completedTasks: 18,
      totalTasks: 25,
      subjectWiseProgress: [
        { subject: 'Data Structures', progress: 75 },
        { subject: 'Operating Systems', progress: 45 },
        { subject: 'DBMS', progress: 90 },
        { subject: 'Maths IV', progress: 60 },
      ]
    });
    setLoading(false);
  }, [user.id]);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Zap className={`w-8 h-8 animate-pulse ${theme === 'royal' ? 'text-royal-gold' : 'text-neon-cyan'}`} />
    </div>
  );

  return (
    <div className="animate-reveal space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-3xl font-display font-bold flex items-center gap-3 ${
            theme === 'royal' ? 'text-royal-gold' : 'text-neon-cyan'
          }`}>
            <BarChart3 className="w-8 h-8" />
            My Performance
          </h2>
          <p className="text-gray-500 mt-1">Tracking your academic progress and milestones</p>
        </div>
        <div className={`px-4 py-2 rounded-xl border flex items-center gap-3 ${
          theme === 'royal' ? 'bg-royal-gold/10 border-royal-gold/20' : 'bg-neon-cyan/10 border-neon-cyan/20'
        }`}>
          <Award className={theme === 'royal' ? 'text-royal-gold' : 'text-neon-cyan'} />
          <span className="font-bold">Level 12 Scholar</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Target />} 
          label="Completion Rate" 
          value={`${Math.round(data?.overallProgress || 0)}%`} 
          subLabel="Total Tasks Completed"
          theme={theme}
        />
        <StatCard 
          icon={<TrendingUp />} 
          label="Focus Score" 
          value="88" 
          subLabel="Based on study sessions"
          theme={theme}
        />
        <StatCard 
          icon={<CheckCircle2 />} 
          label="Tasks Done" 
          value={`${data?.completedTasks || 0}/${data?.totalTasks || 0}`} 
          subLabel="This week's progress"
          theme={theme}
        />
        <StatCard 
          icon={<Zap />} 
          label="Consistency" 
          value="12 Days" 
          subLabel="Current study streak"
          theme={theme}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subject-wise Progress */}
        <div className={`p-8 rounded-2xl border backdrop-blur-xl ${
          theme === 'royal' ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
        }`}>
          <h3 className="text-xl font-bold mb-8">Subject Consistency</h3>
          <div className="space-y-6">
            {data?.subjectWiseProgress?.map((subject: any, i: number) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{subject.subject}</span>
                    {subject.progress < 50 && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[8px] font-bold uppercase tracking-widest border border-red-500/20">
                        Needs Attention
                      </span>
                    )}
                  </div>
                  <span className="font-bold">{subject.progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      subject.progress < 50 ? 'bg-red-500' : (theme === 'royal' ? 'bg-royal-gold' : 'bg-neon-cyan')
                    }`}
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Productivity Chart (Mockup representation) */}
        <div className={`p-8 rounded-2xl border backdrop-blur-xl flex flex-col ${
          theme === 'royal' ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
        }`}>
          <h3 className="text-xl font-bold mb-8">Weekly Activity</h3>
          <div className="flex-1 flex items-end justify-between gap-2 px-4">
            {[45, 60, 85, 30, 90, 75, 40].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-500 group-hover:scale-y-110 ${
                    theme === 'royal' ? 'bg-royal-gold/30 group-hover:bg-royal-gold' : 'bg-neon-cyan/30 group-hover:bg-neon-cyan'
                  }`}
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, subLabel, theme }: any) => (
  <div className={`p-6 rounded-2xl border backdrop-blur-xl ${
    theme === 'royal' ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
  }`}>
    <div className={`p-2 w-fit rounded-lg mb-4 ${theme === 'royal' ? 'bg-royal-gold/10' : 'bg-neon-cyan/10'}`}>
      {React.cloneElement(icon, { className: `w-5 h-5 ${theme === 'royal' ? 'text-royal-gold' : 'text-neon-cyan'}` })}
    </div>
    <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{label}</h4>
    <p className="text-3xl font-display font-bold mb-2">{value}</p>
    <p className="text-[10px] text-gray-500">{subLabel}</p>
  </div>
);
