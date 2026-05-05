
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
