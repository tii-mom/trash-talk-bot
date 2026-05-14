import React, { useState } from 'react';
import { useAppContext } from '../lib/AppContext';
import { BearAvatar } from '../bears/BearAvatar';
import { PixelFlame, PixelTarget, PixelZap, PixelSkull } from './ui/Icons';

export default function Onboarding() {
  const { completeOnboarding } = useAppContext();
  const [step, setStep] = useState(1);
  const [habit, setHabit] = useState('健身');
  const [dailyTarget, setDailyTarget] = useState('每天运动30分钟');
  const [intensity, setIntensity] = useState('标准嘴贱');

  const habits = ['健身', '阅读', '戒烟', '早起', '学习', '暴瘦', '搞钱'];
  const intensities = [
    { id: '贴心阴阳', label: 'CHILL', desc: 'Mild sarcasm. Passive aggressive.', icon: <PixelZap className="w-4 h-4" /> },
    { id: '标准嘴贱', label: 'STRICT', desc: 'Direct insults. No excuses.', icon: <PixelTarget className="w-4 h-4" /> },
    { id: '究极祖安', label: 'TOXIC', desc: 'Ruthless roasting. Might cause tears.', icon: <PixelFlame className="w-4 h-4 text-yellow-400" /> },
    { id: '精神控制', label: 'PSYCHO', desc: 'Total psychological warfare.', icon: <PixelSkull className="w-4 h-4 text-red-500" /> }
  ];

  const handleComplete = () => {
    // We skip personality selection since BearBot identity is now tied to intensity
    completeOnboarding(habit, dailyTarget, '专属教练', intensity);
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-black p-6 pt-safe pb-safe text-zinc-100 items-center justify-center relative overflow-hidden">
      
      {/* Background visual element */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-40"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

      <div className="w-full max-w-sm relative z-10">
        <div className="flex justify-center mb-6 relative">
          <div className="absolute inset-0 bg-lime-400 blur-3xl opacity-10 rounded-full animate-pulse"></div>
          <BearAvatar mood="smug" className="w-24 h-24 text-lime-400 relative z-10" />
        </div>
        
        <h1 className="text-4xl font-black text-center mb-2 tracking-tighter uppercase font-mono">BEARBOT<span className="text-lime-400">_</span></h1>
        <p className="text-zinc-500 font-mono text-center mb-10 text-[10px] tracking-widest uppercase">Select your tormentor</p>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-lime-400 font-mono font-bold mb-4 tracking-widest">01 / TARGET & TYPE</h2>
            <div className="mb-4">
              <label className="text-xs text-zinc-500 font-mono uppercase tracking-widest mb-2 block">Habit Type</label>
              <div className="grid grid-cols-2 gap-3">
                {habits.map(h => (
                  <button
                    key={h}
                    onClick={() => setHabit(h)}
                    className={`px-4 py-3 border-[3px] font-mono text-sm tracking-widest uppercase transition-all font-bold ${habit === h ? 'border-lime-400 bg-lime-400/10 text-lime-400 shadow-[4px_4px_0_0_#8ba800]' : 'border-zinc-800 text-zinc-500 bg-black hover:border-zinc-700 hover:shadow-[4px_4px_0_0_#27272a]'}`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <label className="text-xs text-zinc-500 font-mono uppercase tracking-widest mb-2 block">Daily Goal (Stringent limit)</label>
              <input 
                type="text" 
                value={dailyTarget}
                onChange={e => setDailyTarget(e.target.value)}
                className="w-full bg-zinc-950 border-[3px] border-zinc-700 p-4 font-mono text-base text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-lime-400 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                placeholder="e.g. 每天去健身房锻炼1小时"
              />
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-lime-400 text-black py-4 border-[3px] border-lime-600 font-bold font-mono text-sm uppercase tracking-widest hover:bg-lime-500 transition-colors shadow-[4px_4px_0_0_#8ba800] transform rotate-1 active:translate-y-1">
              Next Stage →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-lime-400 font-mono font-bold mb-4 tracking-widest">02 / INTENSITY</h2>
            <div className="flex flex-col gap-3">
              {intensities.map(i => (
                <button
                  key={i.id}
                  onClick={() => setIntensity(i.id)}
                  className={`p-4 border-[3px] text-left transition-all relative overflow-hidden ${intensity === i.id ? 'border-lime-400 bg-lime-400/5 text-lime-400 shadow-[4px_4px_0_0_#8ba800]' : 'border-zinc-800 text-zinc-500 bg-black hover:border-zinc-700 hover:shadow-[4px_4px_0_0_#27272a]'}`}
                >
                  <div className="flex justify-between items-center mb-1 relative z-10">
                    <span className="font-mono font-bold uppercase tracking-wider">{i.label}</span>
                    {i.icon}
                  </div>
                  <div className={`text-[10px] font-mono relative z-10 ${intensity === i.id ? 'text-lime-400/80' : 'text-zinc-600'}`}>
                    {i.desc}
                  </div>
                  {intensity === i.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-lime-400 shadow-[0_0_10px_#a3e635]"></div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(1)} className="px-6 py-4 bg-black border-[3px] border-zinc-800 font-mono font-bold text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition shadow-[4px_4px_0_0_#27272a] active:translate-y-1">Back</button>
              <button onClick={handleComplete} className="flex-1 bg-lime-400 text-black py-4 border-[3px] border-lime-600 font-bold font-mono text-sm uppercase tracking-widest hover:bg-lime-500 transition-colors shadow-[4px_4px_0_0_#8ba800] transform -rotate-1 active:translate-y-1">
                Init BearBot
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
