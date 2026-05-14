export type Tier = 'free' | '9' | '29' | '99';
export type Verdict = 'success' | 'weak' | 'failed' | 'pending';
export type EvidenceType = 'text' | 'photo' | 'screenshot' | 'steps' | 'receipt' | 'page_count';

export interface User {
  name: string;
  hiBalance: number;
  credits: number;
  tears: number;
  tier: Tier;
  referrals: number;
  isPublic?: boolean;
  avatarId?: number;
  voiceName?: string;
}

export interface Bear {
  id: string;
  name: string;
  personality: string;
  intensity: string;
  level: number;
  xp: number;
  mood: 'smug' | 'angry' | 'proud' | 'disappointed' | 'deadpan' | 'sleepy' | 'zen' | 'hyped' | 'neutral';
  currentHabitId: string;
  traits?: any;
}

export interface Habit {
  id: string;
  type: string;
  dailyTarget: string;
  streak: number;
  totalCheckins: number;
  failedDays: number;
  status: Verdict;
  lastActiveDate: string;
}

export interface Checkin {
  id: string;
  habitId: string;
  date: string;
  text: string;
  evidenceType: EvidenceType;
  verdict: Verdict;
  score: number;
  reply: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bear';
  text: string;
  timestamp: Date;
}
