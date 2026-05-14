import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../lib/AppContext';
import { Verdict } from '../../lib/types';
import ShareModal from '../ShareModal';
import PunishmentScreen from './PunishmentScreen';
import { BearAvatar } from '../../bears/BearAvatar';
import { PixelCheck, PixelWarning, PixelShare, PixelCross, PixelCamera } from '../ui/Icons';

export default function TodayScreen() {
  const { bear, habit, submitCheckIn, messages } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPunishment, setShowPunishment] = useState(false);
  const [checkInText, setCheckInText] = useState('');
  const [evidence, setEvidence] = useState<any>('text');
  const [isVibrating, setIsVibrating] = useState(false);

  // Trigger fake vibration/shake on failed
  useEffect(() => {
    if (bear.mood === 'angry') {
      setIsVibrating(true);
      setTimeout(() => setIsVibrating(false), 500);
    }
  }, [bear.mood]);

  const latestBearMessage =
    messages.slice().reverse().find(m => m.sender === 'bear')?.text || 
    '还在磨蹭什么？今天的打卡还没搞定，赶紧的。';

  return (
    <div className="flex-1 overflow-y-auto w-full">
      <div className="p-4 flex flex-col gap-4 relative">
        <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold font-mono">BearBot<span className="text-lime-400">_</span></h1>
        <div className="flex gap-2">
          <button onClick={() => setShowPunishment(true)} className="bg-red-500 text-black px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest shadow-[4px_4px_0_0_#7f1d1d]">Simulate Miss</button>
          <div className="bg-black border-[2px] border-lime-400/30 px-3 py-1 text-xs text-lime-400 font-bold font-mono tracking-widest uppercase">Lv.{bear.level} {bear.intensity}</div>
        </div>
      </div>

      {/* Bear Identity Card */}
      <div className={`bg-zinc-950 border-[3px] border-zinc-800 p-4 transition-transform ${isVibrating ? 'animate-[shake_0.5s_ease-in-out]' : ''} shadow-[8px_8px_0_0_#27272a]`}>
        <div className="flex items-start gap-4">
          <div className={`h-16 w-16 bg-black border-[3px] flex items-center justify-center ${
            bear.mood === 'angry' ? 'border-red-500 shadow-[4px_4px_0_0_#7f1d1d]' : 
            bear.mood === 'proud' ? 'border-lime-400 shadow-[4px_4px_0_0_#65a30d]' : 
            'border-zinc-700 shadow-[4px_4px_0_0_#27272a]'
          }`}>
            <span className={bear.mood === 'proud' ? 'animate-bounce' : ''}>
              <BearAvatar mood={bear.mood} traits={bear.traits} className="w-10 h-10" />
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold flex items-center gap-2">
              {bear.name} 
              <span className="bg-red-500 text-black text-[10px] px-2 py-0.5 border-[2px] border-red-500 font-bold tracking-widest uppercase">{bear.intensity}</span>
            </h2>
            <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mt-1">
              Currently Supervising
            </div>
            <div className="text-sm text-lime-400 font-bold mt-0.5 uppercase tracking-wide">
              [{habit.type}]
            </div>
            
            <div className="mt-3 bg-zinc-900 p-3 text-sm border-l-[4px] border-lime-400 text-zinc-300 relative font-medium leading-relaxed">
              "{latestBearMessage}"
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex gap-1 items-center">
          <div className="text-[10px] text-zinc-500 w-6 text-right">XP</div>
          <div className="flex-1 h-2 bg-zinc-900 border-[2px] border-zinc-800 overflow-hidden relative">
            <div className="absolute top-0 bottom-0 left-0 bg-lime-400" style={{ width: `${(bear.xp % 200) / 2}%` }}></div>
          </div>
          <div className="text-[10px] text-zinc-400 w-12">{bear.xp % 200}/200</div>
        </div>
      </div>

      {/* Habit Status Card */}
      <div className="grid grid-cols-2 gap-3 mb-2">
        <div className="bg-black border-[3px] border-zinc-800 p-4 flex flex-col justify-center items-center shadow-[4px_4px_0_0_#27272a] transform -rotate-1">
          <div className="text-xs text-zinc-500 mb-1 font-mono uppercase tracking-wider">Streak</div>
          <div className="text-3xl font-black text-lime-400 font-mono drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]">{habit.streak}<span className="text-sm font-sans font-bold text-zinc-600 ml-1">Days</span></div>
        </div>
        <div className="bg-black border-[3px] border-zinc-800 p-4 flex flex-col justify-center items-center shadow-[4px_4px_0_0_#27272a] transform rotate-1">
          <div className="text-xs text-zinc-500 mb-1 font-mono uppercase tracking-wider">Target</div>
          <div className="text-lg font-bold text-zinc-100 uppercase tracking-tight">{habit.dailyTarget}</div>
        </div>
      </div>

      {/* Big Action Button */}
      {habit.status === 'pending' || habit.status === 'failed' ? (
        <button 
          onClick={() => setShowModal(true)}
          className="w-full bg-lime-400 text-black font-black py-5 text-xl active:translate-y-1 transition-transform flex justify-center items-center gap-3 uppercase tracking-tighter border-[3px] border-lime-600 shadow-[4px_4px_0_0_#8ba800]"
        >
          <PixelCheck className="w-7 h-7" />
          今日打卡 / CHECK-IN
        </button>
      ) : (
        <button disabled className="w-full bg-zinc-900 border-[3px] border-zinc-800 text-lime-400/50 font-black py-5 text-xl font-mono tracking-widest relative overflow-hidden flex justify-center items-center">
          <span className="line-through decoration-lime-400/30 decoration-4 -rotate-2">[ CHECKED IN ]</span>
        </button>
      )}

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button className="bg-black border-[3px] border-zinc-800 p-3 text-sm text-zinc-300 font-bold font-mono tracking-wide flex items-center justify-center gap-2 hover:bg-zinc-900 transition-colors active:translate-y-1 shadow-[4px_4px_0_0_#27272a] transform rotate-1">
          <PixelWarning className="w-5 h-5 text-red-500" />
          ROAST ME
        </button>
        <button 
          onClick={() => setShowShareModal(true)}
          className="bg-black border-[3px] border-zinc-800 p-3 text-sm text-zinc-300 font-bold font-mono tracking-wide flex items-center justify-center gap-2 hover:bg-zinc-900 transition-colors active:translate-y-1 shadow-[4px_4px_0_0_#27272a] transform -rotate-1"
        >
          <PixelShare className="w-5 h-5 text-lime-400" />
          SHARE SHAME
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in">
          <div className="bg-black w-full sm:max-w-sm border-[3px] border-zinc-800 p-5 shadow-[4px_4px_0_0_#27272a] transform -rotate-1 animate-in slide-in-from-bottom-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold font-mono uppercase tracking-tight text-lime-400">EVIDENCE_</h3>
              <button onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-red-500 transition-colors active:scale-95"><PixelCross className="w-5 h-5" /></button>
            </div>
            
            <textarea 
              value={checkInText}
              onChange={(e) => setCheckInText(e.target.value)}
              placeholder="记录一下今天完成了什么... (别想骗过去)"
              className="w-full bg-zinc-950 border-[3px] border-zinc-700 p-3 text-base text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-lime-400 resize-none h-24 mb-4 font-mono shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
            />

            <div className="mb-4">
              <div className="flex gap-2 items-center">
                <label className="flex-1 cursor-pointer bg-zinc-900 border-[3px] border-dashed border-zinc-700 hover:border-lime-400 hover:text-lime-400 transition-colors p-4 flex flex-col items-center justify-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest relative overflow-hidden group">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => setEvidence(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }} />
                  {evidence !== 'text' && evidence ? (
                    <img src={evidence} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                  ) : null}
                  <PixelCamera className="w-6 h-6 z-10 drop-shadow-md" />
                  <span className="z-10 drop-shadow-md">{evidence !== 'text' && evidence ? 'Change Image' : 'Upload Proof'}</span>
                </label>
                {evidence !== 'text' && evidence && (
                  <button onClick={() => setEvidence('text')} className="p-4 bg-red-950/30 border-[3px] border-red-900 text-red-500 hover:bg-red-500 hover:text-black transition-colors font-mono">
                    <PixelCross className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <button 
              onClick={() => { submitCheckIn(checkInText, evidence === 'text' ? null : evidence); setShowModal(false); }}
              className="w-full py-4 bg-lime-400 border-[3px] border-lime-600 text-black text-sm font-bold font-mono uppercase tracking-widest hover:bg-lime-500 transition-colors shadow-[4px_4px_0_0_#8ba800] transform rotate-1 active:translate-y-1"
            >
              SUBMIT TO AI BRAIN
            </button>
          </div>
        </div>
      )}

      {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} />}
      {showPunishment && <PunishmentScreen onClose={() => setShowPunishment(false)} />}
    </div>
    </div>
  );
}
