import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import axios from 'axios';

interface ChatBotProps {
  theme: 'cyber' | 'royal';
  user: any;
}

export const ChatBot: React.FC<ChatBotProps> = ({ theme, user }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: `Hi Ram! I'm your Study Assistant. How can I help with your schedule today?`, timestamp: new Date() },
    { sender: 'user', text: `What are my classes today?`, timestamp: new Date() },
    { sender: 'bot', text: `You have 4 classes today: Maths IV (9:00 AM), Data Structures (10:30 AM), Operating Systems (1:00 PM), and DBMS Lab (2:30 PM).`, timestamp: new Date() },
    { sender: 'user', text: `Generate a study plan for my pending assignments.`, timestamp: new Date() },
    { sender: 'bot', text: `Certainly! I've analyzed your upcoming deadlines and I'm generating an optimized study plan for you.`, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { sender: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/chat', {
        query: input,
        userId: user.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const botMsg = { 
        sender: 'bot', 
        text: res.data.reply, 
        timestamp: new Date(),
        data: res.data.data 
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: "I'm having trouble processing that. Please try again.", 
        timestamp: new Date() 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-reveal h-full flex flex-col max-w-4xl mx-auto">
      <div className={`flex-1 rounded-2xl border backdrop-blur-xl mb-4 overflow-hidden flex flex-col ${
        theme === 'royal' ? 'bg-royal-dark/50 border-royal-gold/20' : 'bg-space-900/50 border-neon-cyan/20'
      }`}>
        {/* Chat Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          theme === 'royal' ? 'border-royal-gold/10' : 'border-neon-cyan/10'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${theme === 'royal' ? 'bg-royal-gold/20' : 'bg-neon-cyan/20'}`}>
              <Bot className={`w-5 h-5 ${theme === 'royal' ? 'text-royal-gold' : 'text-neon-cyan'}`} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Study Assistant</h3>
              <p className="text-[10px] text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Active System
              </p>
            </div>
          </div>
          <Sparkles className={`w-4 h-4 opacity-50 ${theme === 'royal' ? 'text-royal-gold' : 'text-neon-cyan'}`} />
        </div>

        {/* Chat Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar scroll-smooth"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-reveal`}>
              <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 ${
                  msg.sender === 'user' 
                  ? 'bg-white/10' 
                  : (theme === 'royal' ? 'bg-royal-gold/20' : 'bg-neon-cyan/20')
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`space-y-2`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                    ? 'bg-white/5 border border-white/10'
                    : (theme === 'royal' ? 'bg-royal-gold/10 border border-royal-gold/20' : 'bg-neon-cyan/10 border border-neon-cyan/20')
                  }`}>
                    {msg.text}
                  </div>
                  <p className={`text-[10px] text-gray-500 font-mono ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-reveal">
              <div className="flex gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  theme === 'royal' ? 'bg-royal-gold/20' : 'bg-neon-cyan/20'
                }`}>
                  <Loader2 className={`w-4 h-4 animate-spin ${theme === 'royal' ? 'text-royal-gold' : 'text-neon-cyan'}`} />
                </div>
                <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 text-xs italic text-gray-500`}>
                  Analyzing your request...
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className={`p-4 border-t ${
          theme === 'royal' ? 'border-royal-gold/10' : 'border-neon-cyan/10'
        }`}>
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your classes, tasks, or study plan..."
              className="flex-1 bg-black/40 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-neon-cyan transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className={`p-3 rounded-xl transition-all duration-300 ${
                theme === 'royal'
                ? 'bg-royal-gold text-black hover:bg-white'
                : 'bg-neon-cyan text-black hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          "What classes do I have today?",
          "Show tomorrow's timetable",
          "List my pending tasks",
          "Generate a study plan"
        ].map((suggest, i) => (
          <button
            key={i}
            onClick={() => setInput(suggest)}
            className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-gray-500 hover:text-white hover:border-white/20 transition-all"
          >
            {suggest}
          </button>
        ))}
      </div>
    </div>
  );
};
