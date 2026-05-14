import React from 'react';
import { useAppContext } from '../lib/AppContext';
import { BearAvatar } from '../bears/BearAvatar';
import { PixelCross, PixelShare, PixelDownload, PixelZap, PixelCheck, PixelStats } from './ui/Icons';

interface ShareModalProps {
  onClose: () => void;
}

export default function ShareModal({ onClose }: ShareModalProps) {
  const { bear, habit, messages, showToast } = useAppContext();
  
  const lastBearReply = messages.slice().reverse().find(m => m.sender === 'bear' && m.text.length > 10)?.text ||
    "这废材今天按时打卡了。世界奇迹。";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 animate-in fade-in">
      <div className="w-full max-w-sm flex flex-col items-center">
        
        <div className="w-full flex justify-end mb-4">
          <button onClick={onClose} className="p-2 bg-zinc-900 text-zinc-400 hover:text-white border-[2px] border-zinc-800 rounded-none">
            <PixelCross className="w-5 h-5" />
          </button>
        </div>

        {/* The Card */}
        <div className="w-full bg-black border-[3px] border-zinc-800 overflow-hidden relative shadow-[8px_8px_0_0_#27272a] transform -rotate-1 rounded-none">
          {/* Top Banner */}
          <div className="bg-lime-400 p-4 border-b-[3px] border-zinc-800 flex justify-between items-center">
            <div className="font-black text-black text-xl italic tracking-tighter uppercase">
              BEAR_BOT_
            </div>
            <div className="bg-black text-lime-400 text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
              Shame Card
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4 bg-zinc-900 w-16 h-16 border-[3px] border-zinc-800 flex items-center justify-center text-zinc-300">
               <BearAvatar mood={bear.mood} traits={bear.traits} className="w-8 h-8" />
            </div>
            
            <div className="relative mb-6">
              <p className="text-xl font-bold text-zinc-100 leading-snug">
                "{lastBearReply}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-black p-3 border-[3px] border-zinc-800 shadow-[4px_4px_0_0_#27272a]">
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-1"><PixelStats className="w-3 h-3" /> Streak</div>
                <div className="text-xl font-bold font-mono text-lime-400">{habit.streak}<span className="text-xs text-zinc-500 ml-1">Days</span></div>
              </div>
              <div className="bg-black p-3 border-[3px] border-zinc-800 shadow-[4px_4px_0_0_#27272a]">
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-1"><PixelCheck className="w-3 h-3" /> Target</div>
                <div className="text-sm font-bold text-zinc-100">{habit.type}</div>
              </div>
            </div>

            <div className="flex border-t-[3px] border-zinc-800 pt-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-zinc-900 border-[2px] border-zinc-800 flex justify-center items-center text-[10px] font-mono text-zinc-500 font-bold tracking-widest">
                  REF
                </div>
                <div>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Join code</div>
                  <div className="text-xs text-lime-400 font-mono">t.me/bearbot?start=x912k</div>
                </div>
              </div>
              <PixelZap className="w-5 h-5 text-lime-400" />
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-3 mt-8">
          <button 
            onClick={() => { showToast('IMAGE SAVED'); onClose(); }}
            className="bg-black border-[3px] border-zinc-800 hover:bg-zinc-900 text-zinc-400 font-bold py-3 uppercase tracking-wider text-sm flex justify-center items-center gap-2 transition-colors font-mono shadow-[4px_4px_0_0_#27272a] transform rotate-1"
          >
            <PixelDownload className="w-5 h-5" />
            Save
          </button>
          <button 
            onClick={() => { showToast('OPENING TG...'); onClose(); }}
            className="bg-lime-400 border-[3px] border-lime-600 hover:bg-lime-500 text-black font-bold py-3 uppercase tracking-wider text-sm flex justify-center items-center gap-2 transition-colors font-mono shadow-[4px_4px_0_0_#65a30d] transform -rotate-1"
          >
            <PixelShare className="w-5 h-5" />
            Share
          </button>
        </div>

      </div>
    </div>
  );
}
