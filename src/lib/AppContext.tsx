import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Bear, Habit, Checkin, ChatMessage, Tier, Verdict } from './types';
import { bearRoster } from '../bears';
import { checkHabit, chatWithBearBot, generateTTS } from './gemini';

interface AppState {
  isOnboarded: boolean;
  user: User;
  bear: Bear;
  habit: Habit;
  habits: Habit[];
  activeHabitId: string;
  checkins: Checkin[];
  messages: ChatMessage[];
  isTyping: boolean;
  toast: string | null;
  completeOnboarding: (habitType: string, dailyTarget: string, personality: string, intensity: string) => void;
  submitCheckIn: (text: string, evidenceBase64: string | null) => void;
  sendMessage: (text: string) => void;
  updateTier: (tier: Tier) => void;
  showToast: (msg: string) => void;
  switchBot: (botId: string) => void;
  updatePrivacy: (isPublic: boolean) => void;
  updateAvatar: (id: number) => void;
  updateVoiceName: (voiceName: string) => void;
  addHabit: (type: string, dailyTarget: string) => void;
  setActiveHabit: (id: string) => void;
  editHabit: (id: string, dailyTarget: string) => void;
}

const defaultUser: User = { name: '老铁', hiBalance: 0, credits: 0, tears: 0, tier: 'free', referrals: 0, isPublic: true, voiceName: 'Puck' };
const defaultBear: Bear = {
  id: 'b_1', name: '大黑熊', personality: '嘴贱死党', intensity: 'STRICT', level: 1, xp: 0, mood: 'deadpan', currentHabitId: 'h_1'
};
const defaultHabit: Habit = {
  id: 'h_1', type: '健身', dailyTarget: '运动30分钟', streak: 0, totalCheckins: 0, failedDays: 0, status: 'pending', lastActiveDate: new Date().toISOString()
};

const AppContext = createContext<AppState | undefined>(undefined);

const globalAudio = new Audio();
let globalAudioCtx: any = null;

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [user, setUser] = useState<User>(defaultUser);
  const [bear, setBear] = useState<Bear>(defaultBear);
  const [habits, setHabits] = useState<Habit[]>([defaultHabit]);
  const [activeHabitId, setActiveHabitId] = useState<string>(defaultHabit.id);
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const habit = habits.find(h => h.id === activeHabitId) || habits[0];

  const updateActiveHabit = (updated: Habit) => {
    setHabits(prev => prev.map(h => h.id === updated.id ? updated : h));
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'm_0', sender: 'bear', text: '搞快点立规矩，我可没那么多耐心。', timestamp: new Date() }
  ]);

  const completeOnboarding = (habitType: string, dailyTarget: string, personality: string, intensity: string) => {
    updateActiveHabit({ ...habit, type: habitType, dailyTarget });
    
    // Select a BearBot from roster based on intensity, or purely random if intensity not matched
    const intensityMap: Record<string, string> = {
      '标准嘴贱': 'STRICT',
      '究极祖安': 'TOXIC',
      '贴心阴阳': 'CHILL',
      '精神控制': 'PSYCHO'
    };
    const mappedIntensity = intensityMap[intensity] || 'STRICT';
    const candidates = bearRoster.filter(b => b.intensity === mappedIntensity);
    const selectedBot = (candidates.length > 0 ? candidates : bearRoster)[Math.floor(Math.random() * (candidates.length || bearRoster.length))];
    
    setBear({ 
      ...bear, 
      id: selectedBot.id,
      name: selectedBot.name,
      personality: selectedBot.personality, 
      intensity: mappedIntensity, 
      mood: 'smug',
      traits: selectedBot.traits
    });
    
    const msgText = `签合同了啊，选了【${habitType}】就别中途怂。我是 ${selectedBot.name}，从今天起你的舒服日子到头了。`;
    setMessages([
      { id: Date.now().toString(), sender: 'bear', text: msgText, timestamp: new Date() }
    ]);
    playRobotSpeech(msgText);
    setIsOnboarded(true);
  };

  const getDynamicMood = (currentHabit: Habit): Bear['mood'] => {
    const hour = new Date().getHours();
    
    // Action-based mood priority
    if (currentHabit.status === 'success') {
      return currentHabit.streak > 0 && currentHabit.streak % 7 === 0 ? 'hyped' : 'proud';
    }
    if (currentHabit.status === 'failed') {
      return currentHabit.failedDays > 1 ? 'disappointed' : 'angry';
    }
    
    // Time-based mood
    if (hour >= 23 || hour <= 4) return 'sleepy';
    if (hour >= 5 && hour <= 8) return 'zen';
    if (hour >= 13 && hour <= 15) return 'sleepy'; // Post-lunch slump
    
    // Context-dependent
    if (currentHabit.streak > 14) return 'smug';
    if (currentHabit.totalCheckins === 0) return 'deadpan';
    
    return 'neutral';
  };

  React.useEffect(() => {
    if (!isOnboarded) return;
    const mood = getDynamicMood(habit);
    if (bear.mood !== mood) {
      setBear(b => ({ ...b, mood }));
    }
    const interval = setInterval(() => {
      const newMood = getDynamicMood(habit);
      setBear(b => (b.mood !== newMood ? { ...b, mood: newMood } : b));
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [isOnboarded, habit]);

  const playRobotSpeech = async (text: string) => {
    const selectedVoice = user.voiceName || 'Puck';
    
    if (selectedVoice === 'System') {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = /[\u4e00-\u9fa5]/.test(text) ? 'zh-CN' : 'en-US';
      utterance.pitch = bear.mood === 'angry' ? 0.6 : (bear.mood === 'hyped' ? 1.2 : 0.8);
      utterance.rate = 1.15;
      window.speechSynthesis.speak(utterance);
      return;
    }

    try {
      if (!globalAudioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        globalAudioCtx = new AudioContextClass();
      }
      if (globalAudioCtx.state === 'suspended') {
        await globalAudioCtx.resume();
      }

      const cleanText = text.replace(/[*#]/g, '');
      const data = await generateTTS(cleanText, selectedVoice);
      if (data.audio) {
          try {
            const binary = atob(data.audio);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
              bytes[i] = binary.charCodeAt(i);
            }
            const buffer = globalAudioCtx.createBuffer(1, bytes.length / 2, 24000);
            const channelData = buffer.getChannelData(0);
            const view = new DataView(bytes.buffer);
            for (let i = 0; i < channelData.length; i++) {
              const int16 = view.getInt16(i * 2, true);
              channelData[i] = int16 / 32768;
            }
            const source = globalAudioCtx.createBufferSource();
            source.buffer = buffer;
            source.connect(globalAudioCtx.destination);
            source.start();
          } catch (audioErr) {
            console.error("Audio playback error: ", audioErr);
          }
        }
    } catch (e: any) {
      if (e.message && e.message.includes("API key not valid")) {
        showToast("TTS ERROR: INVALID API KEY");
      }
      console.error("TTS output failed: ", e);
    }
  };

  const submitCheckIn = async (text: string, evidenceBase64: string | null) => {
    setIsTyping(true);
    
    try {
      const data = await checkHabit(habit.dailyTarget, text, evidenceBase64 || undefined, bear);
      
      let reply = "Server error. Looks like I'm taking a break.";
      let simulateVerdict: Verdict = 'failed';
      
      reply = data.reply || "Something went wrong.";
      simulateVerdict = data.verdict === 'success' ? 'success' : (data.verdict === 'weak' ? 'weak' : 'failed');
      
      const isSuccess = simulateVerdict === 'success';
      const isWeak = simulateVerdict === 'weak';
      
      const newStreak = isSuccess || isWeak ? habit.streak + 1 : 0;
      const xpGained = isSuccess ? 80 : (isWeak ? 20 : 0);
      const newXp = bear.xp + xpGained;
      
      const newCheckIn: Checkin = {
        id: Date.now().toString(),
        habitId: habit.id,
        date: new Date().toISOString(),
        text,
        evidenceType: evidenceBase64 ? 'photo' : 'text',
        verdict: simulateVerdict,
        score: xpGained,
        reply
      };
      
      setCheckins([newCheckIn, ...checkins]);
      
      const updatedHabit = {
        ...habit,
        streak: newStreak,
        totalCheckins: habit.totalCheckins + (isSuccess || isWeak ? 1 : 0),
        failedDays: habit.failedDays + (simulateVerdict === 'failed' ? 1 : 0),
        status: simulateVerdict,
        lastActiveDate: new Date().toISOString()
      };
      updateActiveHabit(updatedHabit);

      setUser(u => ({
        ...u,
        credits: u.credits + (isSuccess ? 10 : 0),
        tears: u.tears + (simulateVerdict === 'failed' ? 10 : 0)
      }));

      setBear(b => ({ 
        ...b, 
        xp: newXp, 
        level: Math.floor(newXp / 200) + 1,
        mood: simulateVerdict === 'success' ? 'proud' : 'angry'
      }));
      
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString() + 'u', sender: 'user', text: `[CHECK-IN] ${text}`, timestamp: new Date() },
        { id: Date.now().toString() + 'b', sender: 'bear', text: reply, timestamp: new Date() }
      ]);
      playRobotSpeech(reply);
      
      // Haptics and Audio for game feel
      if (navigator.vibrate) navigator.vibrate(simulateVerdict === 'success' ? [100, 50, 100] : [300, 100, 500]);
      
    } catch (e: any) {
      console.error(e);
      if (e.message && e.message.includes("API key not valid")) {
        setMessages(prev => [
          ...prev,
          { id: Date.now().toString() + 'u', sender: 'user', text: `[CHECK-IN] ${text}`, timestamp: new Date() },
          { id: Date.now().toString() + 'b', sender: 'bear', text: "[SYSTEM ERROR] API key not valid. Please pass a valid API key in the AI Studio Settings > Secrets panel.", timestamp: new Date() }
        ]);
      } else {
        showToast("FAILED TO CONNECT TO AI BRAIN");
      }
    } finally {
      setIsTyping(false);
    }
  };

  const sendMessage = async (text: string) => {
    const newMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text, timestamp: new Date() };
    setMessages(prev => [...prev, newMsg]);
    setIsTyping(true);
    
    try {
      const data = await chatWithBearBot(text, messages, bear);
      
      let reply = "Are you deaf? Server's down.";
      if (data.reply) reply = data.reply;
      
      setMessages(prev => [...prev, { id: Date.now().toString() + 'r', sender: 'bear', text: reply, timestamp: new Date() }]);
      playRobotSpeech(reply);
    } catch (e: any) {
      console.error(e);
      if (e.message && e.message.includes("API key not valid")) {
        setMessages(prev => [...prev, { id: Date.now().toString() + 'r', sender: 'bear', text: "[SYSTEM ERROR] API key not valid. Please pass a valid Gemini API key in the AI Studio Settings > Secrets panel.", timestamp: new Date() }]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const updateTier = (tier: Tier) => setUser({ ...user, tier });
  const updatePrivacy = (isPublic: boolean) => setUser({ ...user, isPublic });
  const updateAvatar = (avatarId: number) => setUser({ ...user, avatarId });
  const updateVoiceName = (voiceName: string) => setUser({ ...user, voiceName });

  const switchBot = (botId: string) => {
    const selectedBot = bearRoster.find(b => b.id === botId);
    if (!selectedBot) return;

    setBear(prev => ({
      ...prev,
      id: selectedBot.id,
      name: selectedBot.name,
      personality: selectedBot.personality,
      intensity: selectedBot.intensity,
      traits: selectedBot.traits,
      mood: 'neutral'
    }));
    showToast(`SWAPPED CONSCIOUSNESS TO ${selectedBot.name}`);
  };

  const addHabit = (type: string, dailyTarget: string) => {
    const newHabit: Habit = {
      id: `h_${Date.now()}`,
      type,
      dailyTarget,
      streak: 0,
      totalCheckins: 0,
      failedDays: 0,
      status: 'pending',
      lastActiveDate: new Date().toISOString()
    };
    setHabits([...habits, newHabit]);
    setActiveHabitId(newHabit.id);
  };

  const setActiveHabit = (id: string) => {
    setActiveHabitId(id);
  };

  const editHabit = (id: string, dailyTarget: string) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, dailyTarget } : h));
  };

  return (
    <AppContext.Provider value={{ isOnboarded, user, bear, habit, habits, activeHabitId, checkins, messages, isTyping, toast, completeOnboarding, submitCheckIn, sendMessage, updateTier, showToast, switchBot, updatePrivacy, updateAvatar, updateVoiceName, addHabit, setActiveHabit, editHabit }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
