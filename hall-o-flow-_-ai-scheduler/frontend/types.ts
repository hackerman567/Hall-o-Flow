
export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface DemoItem {
  id: number;
  time: string;
  task: string;
  type: 'focus' | 'break' | 'review';
  duration: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

export type Theme = 'cyber' | 'royal';
export type Mood = 'focus' | 'creative' | 'recovery' | 'maintenance';

export interface Task {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'focus' | 'break' | 'review';
  startTime: Date;
  endTime: Date;
  mood: Mood;
  completed: boolean;
  userId: string;
}

export interface ScheduleResponse {
  tasks: Task[];
  totalDuration: number;
  date: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  preferredMood: Mood;
  timezone: string;
  focusHours: {
    start: number;
    end: number;
  };
}
