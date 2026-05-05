import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Search, Filter } from 'lucide-react';
import axios from 'axios';

interface TimetableProps {
  theme: 'cyber' | 'royal';
  user: any;
}

const DEMO_SCHEDULE = [
  { title: 'Maths IV', time: '09:00 AM', room: 'LH 101', faculty: 'Dr. Prasanna', day: 'Monday' },
  { title: 'Data Structures', time: '10:30 AM', room: 'LH 302', faculty: 'Dr. Saranya K G', day: 'Monday' },
  { title: 'Operating Systems', time: '01:00 PM', room: 'LH 201', faculty: 'Prof. Niruban', day: 'Monday' },
  { title: 'DBMS Lab', time: '02:30 PM', room: 'Lab 4', faculty: 'Dr. Agashraj', day: 'Monday' },
  { title: 'Open Elective', time: '09:00 AM', room: 'LH 105', faculty: 'Prof. Karthick', day: 'Tuesday' },
  { title: 'Microprocessors', time: '10:30 AM', room: 'LH 202', faculty: 'Dr. Prasannakumar', day: 'Tuesday' },
  { title: 'Software Engineering', time: '01:00 PM', room: 'LH 203', faculty: 'Dr. Dhanush', day: 'Tuesday' },
  { title: 'Theory of Computation', time: '02:30 PM', room: 'LH 204', faculty: 'Prof. Agashraj', day: 'Tuesday' },
  { title: 'Analog Circuits', time: '09:00 AM', room: 'LH 301', faculty: 'Dr. Dhanush M', day: 'Wednesday' },
  { title: 'Digital Logic', time: '10:30 AM', room: 'LH 302', faculty: 'Prof. Kalaiselvan V', day: 'Wednesday' },
  { title: 'Computer Networks', time: '09:00 AM', room: 'LH 102', faculty: 'Dr. Niruban T S', day: 'Thursday' },
  { title: 'AI Essentials', time: '10:30 AM', room: 'LH 305', faculty: 'Prof. Prasanna', day: 'Thursday' },
  { title: 'Database Design', time: '01:00 PM', room: 'Lab 2', faculty: 'Dr. Karthick T', day: 'Friday' },
  { title: 'Ethics in Tech', time: '02:30 PM', room: 'LH 101', faculty: 'Prof. Dhanush M', day: 'Friday' },
  { title: 'Mini Project Review', time: '10:00 AM', room: 'Project Lab', faculty: 'All Mentors', day: 'Saturday' },
  { title: 'Technical Seminar', time: '11:30 AM', room: 'Seminar Hall', faculty: 'Dept. Head', day: 'Saturday' },
];

export const Timetable: React.FC<TimetableProps> = ({ theme, user }) => {
  const [activeDay, setActiveDay] = useState('Monday');
  const [searchQuery, setSearchQuery] = useState('');
  const [schedule, setSchedule] = useState<any[]>(DEMO_SCHEDULE);
  const [loading, setLoading] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/schedule/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.data.schedule && res.data.schedule.tasks && res.data.schedule.tasks.length > 0) {
          setSchedule(res.data.schedule.tasks);
        }
      } catch (err) {
        console.error('API Error, using fallback:', err);
        setSchedule(DEMO_SCHEDULE);
      }
    };
    fetchSchedule();
  }, [user.id]);

  const filteredSchedule = schedule.filter(item => 
    (item.day === activeDay || !item.day) && 
    (item.title || item.subject || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-reveal space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className={`text-4xl font-display font-bold flex items-center gap-4 ${
          theme === 'royal' ? 'text-royal-gold' : 'text-neon-cyan'
        }`}>
          <Calendar className="w-10 h-10" />
          Weekly Timetable
        </h2>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
             <input 
              type="text"
              placeholder="Filter by subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-neon-cyan"
             />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  activeDay === day
                  ? (theme === 'royal' ? 'bg-royal-gold border-royal-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-neon-cyan border-neon-cyan text-black shadow-[0_0_15px_rgba(0,243,255,0.3)]')
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`rounded-2xl border backdrop-blur-xl overflow-hidden ${
        theme === 'royal' ? 'bg-royal-dark/50 border-royal-gold/20' : 'bg-space-900/50 border-neon-cyan/20'
      }`}>
        <div className="grid grid-cols-1 divide-y divide-white/5">
          {filteredSchedule.length > 0 ? filteredSchedule.map((item, i) => (
            <div key={i} className="p-6 flex flex-col md:flex-row md:items-center gap-6 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3 md:w-32">
                <Clock className={`w-5 h-5 ${theme === 'royal' ? 'text-royal-gold' : 'text-neon-cyan'}`} />
                <span className="font-mono font-bold text-lg">{item.time || '09:00 AM'}</span>
              </div>
              
              <div className="flex-1">
                <h4 className="text-xl font-bold mb-2">{item.title || item.subject}</h4>
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {item.faculty || 'Dept. Staff'}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {item.room || 'TBD'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  theme === 'royal' ? 'bg-royal-gold/10 text-royal-gold' : 'bg-neon-cyan/10 text-neon-cyan'
                }`}>
                  Lecture
                </span>
              </div>
            </div>
          )) : (
            <div className="p-20 text-center space-y-4">
              <Filter className="w-12 h-12 text-gray-600 mx-auto opacity-20" />
              <p className="text-gray-500">No classes scheduled for {activeDay}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
