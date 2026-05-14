import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../lib/AppContext';
import { PixelSend, PixelWarning } from '../ui/Icons';
import { BearAvatar } from '../../bears/BearAvatar';
import { TypewriterText } from '../ui/TypewriterText';

const getBearStatusText = (mood: string) => {
  switch (mood) {
    case 'sleepy': return '充电中 [RECHARGING]';
    case 'hyped': return '狂暴中 [RAGING]';
    case 'zen': return '冥想中 [MEDITATING]';
    case 'proud': return '极度嚣张 [SMUG]';
    case 'angry': return '暴怒中 [FURIOUS]';
    case 'disappointed': return '彻底无语 [SPEECHLESS]';
    case 'smug': return '嘲笑中 [MOCKING]';
    default: return '监视中 [WATCHING]';
  }
};

export default function ChatScreen() {
  const { messages, sendMessage, habit, isTyping, bear } = useAppContext();
  const [inputMsg, setInputMsg] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "我今天想偷懒",
    "骂醒我",
    "帮我制定明天计划",
    "我失败了"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    sendMessage(inputMsg);
    setInputMsg('');
  };

  const handleQuickPrompt = (text: string) => {
    sendMessage(text);
  };

  const isHealthTopic = ['戒烟', '健身', '睡眠'].includes(habit.type);
  const statusColor = bear.mood === 'angry' || bear.mood === 'hyped' ? 'text-red-500' :
                      bear.mood === 'sleepy' || bear.mood === 'zen' ? 'text-zinc-400' :
                      bear.mood === 'proud' || bear.mood === 'smug' ? 'text-yellow-400' : 'text-lime-400';

  return (
    <div className="flex flex-col h-full relative">
      <div className="px-4 py-3 border-b-[3px] border-zinc-800 bg-black z-10 flex items-center justify-between shadow-[0_4px_0_0_#27272a] mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-[3px] border-zinc-700 bg-zinc-900 flex items-center justify-center relative overflow-hidden flex-shrink-0">
            <BearAvatar mood={bear.mood} traits={bear.traits} className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-sm tracking-widest font-mono uppercase text-zinc-100">{bear.name}</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className={`w-1.5 h-1.5 ${statusColor} rounded-full animate-pulse shadow-[0_0_5px_currentColor]`} />
              <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${statusColor}`}>
                {getBearStatusText(bear.mood)}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-zinc-500 font-mono">LVL {bear.level}</div>
          <div className="text-[10px] text-zinc-600 font-mono">XP {bear.xp}</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-32 space-y-6" ref={scrollRef}>
        {isHealthTopic && (
          <div className="bg-black border-[3px] border-dashed border-red-900 p-3 flex items-start gap-3 shadow-[4px_4px_0_0_#7f1d1d] transform rotate-1 mb-6 mt-2 mx-2">
            <PixelWarning className="text-red-500 w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-red-500 font-mono uppercase tracking-widest leading-relaxed font-bold">
              SYSTEM WARNING: BearBot is a ruthless habit enforcer, not a doctor. Seek professional help if experiencing physical or mental health issues.
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bear' && (
              <div className="w-8 h-8 mr-3 flex-shrink-0 border-[3px] border-zinc-800 bg-zinc-950 flex items-center justify-center mt-1">
                <BearAvatar mood={bear.mood} traits={bear.traits} className="w-6 h-6" />
              </div>
            )}
            <div 
              className={`max-w-[80%] px-4 py-3 text-sm font-medium border-[3px] font-mono tracking-tighter ${
                msg.sender === 'user' 
                  ? 'bg-lime-400 text-black border-lime-600 shadow-[4px_4px_0_0_#8ba800]' 
                  : `bg-zinc-950 border-zinc-700 shadow-[4px_4px_0_0_#27272a] ${bear.mood === 'angry' && index === messages.length - 1 ? 'animate-glitch text-red-500' : 'text-zinc-300'}`
              }`}
            >
              {msg.sender === 'bear' && index === messages.length - 1 ? (
                 <TypewriterText text={msg.text} />
              ) : (
                 msg.text
              )}
              <div className={`text-[10px] mt-2 opacity-50 font-mono uppercase tracking-widest ${msg.sender === 'user' ? 'text-right text-black/60' : 'text-left text-zinc-500'}`}>
                {msg.sender === 'user' ? 'OP_' : 'SYS_'}{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in">
            <div className="w-8 h-8 mr-3 flex-shrink-0 border-[3px] border-zinc-800 bg-zinc-950 flex items-center justify-center mt-1">
              <BearAvatar mood={bear.mood} traits={bear.traits} className="w-6 h-6" isTalking={true} />
            </div>
            <div className="bg-zinc-950 border-[3px] border-zinc-700 shadow-[4px_4px_0_0_#27272a] text-zinc-400 py-3 px-4 flex items-center gap-2">
              <div className="w-2 h-4 bg-lime-400 animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }} />
              <div className="text-[10px] uppercase font-mono tracking-widest font-bold text-lime-400 animate-pulse">PROCESSING...</div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-black border-t-[3px] border-zinc-800 p-2 sm:p-4 z-10 pb-20">
        {/* Quick Prompts */}
        <div className="flex overflow-x-auto gap-2 pb-3 mb-1 no-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
          {quickPrompts.map((prompt, i) => (
            <button 
              key={i}
              onClick={() => handleQuickPrompt(prompt)}
              className="whitespace-nowrap px-4 py-2 bg-black border-[2px] border-zinc-700 text-[10px] uppercase font-mono tracking-widest font-bold text-zinc-400 hover:bg-zinc-900 hover:text-lime-400 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text" 
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Report status or ask to be roasted..."
            className="flex-1 bg-black border-[3px] border-zinc-700 px-4 py-3 text-base text-lime-400 font-mono focus:outline-none focus:border-lime-400 transition-colors placeholder:text-zinc-700 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
          />
          <button 
            type="submit"
            disabled={!inputMsg.trim()}
            className="bg-lime-400 text-black px-4 border-[3px] border-lime-600 disabled:bg-zinc-900 disabled:text-zinc-700 disabled:border-zinc-800 transition-transform active:translate-y-1 shadow-[4px_4px_0_0_#8ba800] disabled:shadow-none flex items-center justify-center font-bold"
          >
            <PixelSend className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
