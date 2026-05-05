import React from 'react';
import { LayoutDashboard, Calendar, MessageSquare, BookOpen, BarChart3, Clock, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { Timetable } from './Timetable';
import { ChatBot } from './ChatBot';
import { StudyPlan } from './StudyPlan';
import { ProgressTracker } from './ProgressTracker';

interface DashboardProps {
  theme: 'cyber' | 'royal';
  user: any;
  activeView: 'dashboard' | 'timetable' | 'chat' | 'study' | 'progress';
  onNavigate: (view: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ theme, user, activeView, onNavigate }) => {
  const [boostMode, setBoostMode] = React.useState(false);
  const [currentMood, setCurrentMood] = React.useState('focus');
  
  const renderView = () => {
    switch (activeView) {
      case 'timetable': return <Timetable theme={theme} user={user} />;
      case 'chat': return <ChatBot theme={theme} user={user} />;
      case 'study': return <StudyPlan theme={theme} user={user} />;
      case 'progress': return <ProgressTracker theme={theme} user={user} />;
      default: return (
        <div className="space-y-8 animate-reveal">
          {/* Dashboard Header / Status */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl border backdrop-blur-xl bg-white/5 border-white/5">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${boostMode ? 'bg-orange-500 animate-pulse shadow-[0_0_20px_rgba(249,115,22,0.5)]' : 'bg-gray-800'}`}>
                <Zap className={`w-6 h-6 ${boostMode ? 'text-white' : 'text-gray-500'}`} />
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  Turbo Mode {boostMode ? 'Active' : 'Standby'}
                </h3>
                <p className="text-xs text-gray-500">Focus intensity: {boostMode ? '1.5x' : '1.0x'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
               <div className="text-right">
                 <p className="text-[10px] text-gray-500 uppercase tracking-widest">Active Mood</p>
                 <p className={`font-bold capitalize ${theme === 'royal' ? 'text-royal-gold' : 'text-neon-cyan'}`}>{currentMood}</p>
               </div>
               <button 
                onClick={() => setBoostMode(!boostMode)}
                className={`px-6 py-2 rounded-xl font-bold transition-all duration-300 ${
                  boostMode 
                  ? 'bg-orange-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.4)]' 
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
               >
                {boostMode ? 'Disable Turbo' : 'Enable Turbo'}
               </button>
            </div>
          </div>

          {/* Dashboard Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl border backdrop-blur-xl ${
              theme === 'royal' ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl ${theme === 'royal' ? 'bg-royal-gold/10' : 'bg-neon-cyan/10'}`}>
                  <Clock className={`w-6 h-6 ${theme === 'royal' ? 'text-royal-gold' : 'text-neon-cyan'}`} />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Next Class</h3>
                  <p className="font-bold">Data Structures</p>
                </div>
              </div>
              <p className="text-2xl font-display font-bold">10:30 AM</p>
              <p className="text-xs text-gray-500 mt-2">Room 302 • Dr. Saranya K G</p>
            </div>

            <div className={`p-6 rounded-2xl border backdrop-blur-xl ${
              theme === 'royal' ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl ${theme === 'royal' ? 'bg-royal-gold/10' : 'bg-neon-cyan/10'}`}>
                  <AlertCircle className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Pending Tasks</h3>
                  <p className="font-bold">Assignments & Projects</p>
                </div>
              </div>
              <p className="text-2xl font-display font-bold text-orange-400">7 Tasks</p>
              <p className="text-xs text-gray-500 mt-2">Next due: OS Project (18h)</p>
            </div>

            <div className={`p-6 rounded-2xl border backdrop-blur-xl ${
              theme === 'royal' ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl ${theme === 'royal' ? 'bg-royal-gold/10' : 'bg-neon-cyan/10'}`}>
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Today's Progress</h3>
                  <p className="font-bold">Study Sessions</p>
                </div>
              </div>
              <p className="text-2xl font-display font-bold text-green-400">72%</p>
              <div className="w-full h-1.5 bg-gray-800 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-green-400 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
          </div>

          {/* Today's Full Schedule */}
          <div className={`p-8 rounded-2xl border backdrop-blur-xl ${
            theme === 'royal' ? 'bg-royal-dark border-royal-gold/20' : 'bg-space-900 border-neon-cyan/20'
          }`}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold flex items-center gap-3">
                <Calendar className={theme === 'royal' ? 'text-royal-gold' : 'text-neon-cyan'} />
                Today's Schedule
              </h2>
              <button 
                onClick={() => onNavigate('timetable')}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                View Full Timetable →
              </button>
            </div>

            <div className="space-y-4">
              {[
                { time: '09:00 AM', subject: 'Maths IV', type: 'Lecture', room: 'LH 201' },
                { time: '10:30 AM', subject: 'Data Structures', type: 'Lecture', room: '302' },
                { time: '12:00 PM', subject: 'Free Slot', type: 'Break', room: '-' },
                { time: '02:00 PM', subject: 'DBMS Lab', type: 'Lab', room: 'System Lab 4' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-4 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="w-24 text-gray-500 font-mono text-sm">{item.time}</div>
                  <div className={`w-1 h-12 rounded-full ${
                    item.type === 'Lecture' ? 'bg-neon-cyan' : item.type === 'Lab' ? 'bg-neon-purple' : 'bg-gray-700'
                  }`}></div>
                  <div className="flex-1">
                    <h4 className="font-bold">{item.subject}</h4>
                    <p className="text-xs text-gray-500">{item.type} • {item.room}</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-white/10 transition-all">
                    <AlertCircle className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 space-y-2">
          <NavItem 
            icon={<LayoutDashboard />} 
            label="Dashboard" 
            active={activeView === 'dashboard'} 
            onClick={() => onNavigate('dashboard')}
            theme={theme}
          />
          <NavItem 
            icon={<Calendar />} 
            label="Timetable" 
            active={activeView === 'timetable'} 
            onClick={() => onNavigate('timetable')}
            theme={theme}
          />
          <NavItem 
            icon={<MessageSquare />} 
            label="Study Assistant" 
            active={activeView === 'chat'} 
            onClick={() => onNavigate('chat')}
            theme={theme}
          />
          <NavItem 
            icon={<BookOpen />} 
            label="Study Plan" 
            active={activeView === 'study'} 
            onClick={() => onNavigate('study')}
            theme={theme}
          />
          <NavItem 
            icon={<BarChart3 />} 
            label="Progress" 
            active={activeView === 'progress'} 
            onClick={() => onNavigate('progress')}
            theme={theme}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-h-[600px]">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick, theme }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 group ${
      active 
      ? (theme === 'royal' ? 'bg-royal-gold text-black' : 'bg-neon-cyan text-black shadow-[0_0_20px_rgba(0,243,255,0.2)]')
      : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    {React.cloneElement(icon, { className: `w-5 h-5 transition-transform group-hover:scale-110` })}
    <span className="font-bold">{label}</span>
  </button>
);
