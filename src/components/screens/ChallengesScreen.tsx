import React, { useState } from 'react';
import { useAppContext } from '../../lib/AppContext';
import ShareModal from '../ShareModal';
import { BearAvatar } from '../../bears/BearAvatar';
import { PixelFlame, PixelTrophy, PixelImage, PixelArrowRight, PixelGift, PixelUsers } from '../ui/Icons';

export default function ChallengesScreen() {
  const { habit, bear } = useAppContext();
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto w-full p-4 space-y-6 pb-20">
      <div>
        <h2 className="text-xl font-bold mb-4 font-mono">Arena_</h2>
        
        {/* Daily Challenge */}
        <div className="bg-lime-400 border-[3px] border-lime-600 p-4 relative overflow-hidden mb-8 shadow-[4px_4px_0_0_#8ba800] transform rotate-1">
          <div className="absolute -right-6 -top-6 text-black/10">
            <PixelFlame className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-black text-lime-400 text-[10px] px-2 py-0.5 font-bold uppercase tracking-widest font-mono">Global Challenge</span>
            </div>
            <h3 className="font-bold text-black text-xl mb-1 tracking-tighter">今日全网挑战</h3>
            <p className="text-sm text-black/80 mb-6 font-medium">
              上传 20 分钟运动的高清汗水证据。敢来吗废物们？
            </p>
            <button className="bg-black text-lime-400 text-sm px-6 py-3 font-bold font-mono tracking-widest uppercase w-full border-[3px] border-black hover:bg-zinc-900 transition-colors active:scale-95">
              Accept (+150 XP)
            </button>
          </div>
        </div>

        {/* Shame Card Generation */}
        <div 
          onClick={() => setShowShareModal(true)}
          className="bg-black border-[3px] border-zinc-800 p-4 mb-8 group cursor-pointer hover:border-zinc-500 transition relative overflow-hidden shadow-[4px_4px_0_0_#27272a] transform -rotate-1 active:translate-y-1"
        >
          <div className="flex gap-4 items-center relative z-10">
            <div className="w-12 h-12 bg-zinc-900 border-[2px] border-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-800 transition">
              <PixelImage className="w-6 h-6 text-zinc-400 group-hover:text-zinc-200" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm mb-1 group-hover:text-zinc-300 transition-colors uppercase tracking-widest font-mono text-zinc-400">Generate Shame Card</h3>
              <p className="text-[10px] text-zinc-600 font-mono">
                发布被怼金句，朋友圈公开处刑。
              </p>
            </div>
            <PixelArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-zinc-300 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Group Leaderboard Placeholder */}
        <div className="bg-black border-[3px] border-zinc-800 overflow-hidden shadow-[4px_4px_0_0_#27272a]">
          <div className="px-4 py-3 border-b-[3px] border-zinc-800 flex justify-between items-center bg-zinc-950">
            <h3 className="font-bold text-sm flex items-center gap-2 uppercase tracking-widest font-mono text-zinc-300"><PixelTrophy className="w-4 h-4 text-zinc-500" /> Leaderboard</h3>
            <span className="text-[10px] font-mono text-zinc-600 tracking-widest">{habit.type} ZONE</span>
          </div>
          <div className="divide-y divide-zinc-800/50">
            {[
              { name: 'TG_CyberDog', streak: 42, score: 3840 },
              { name: 'User_9921', streak: 21, score: 2100 },
              { name: '我爱上班', streak: 15, score: 1450 },
            ].map((usr, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <div className={`font-mono text-xs w-4 text-center ${i===0?'text-yellow-400':i===1?'text-zinc-300':i===2?'text-orange-400':'text-zinc-600'}`}>
                  #{i+1}
                </div>
                <div className="w-8 h-8 bg-black border-[2px] border-zinc-700 flex items-center justify-center text-[10px] font-mono font-bold text-zinc-400 uppercase">
                  {usr.name.substring(0,2)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-zinc-200">{usr.name}</div>
                  <div className="text-[10px] text-zinc-500 font-mono">STREAK: {usr.streak}</div>
                </div>
                <div className="text-xs font-mono text-lime-400 text-right">
                  {usr.score} XP
                </div>
              </div>
            ))}
            
            <div className="px-4 py-3 flex items-center gap-3 bg-zinc-950 border-t-[3px] border-lime-400/30">
              <div className="font-mono text-xs w-4 text-center text-zinc-500">
                #342
              </div>
              <div className="w-8 h-8 bg-lime-400/10 border-[2px] border-lime-400/50 flex items-center justify-center text-lime-400">
                 <BearAvatar mood={bear.mood} traits={bear.traits} className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-lime-400">YOU</div>
                <div className="text-[10px] text-zinc-500 font-mono">STREAK: {habit.streak}</div>
              </div>
              <div className="text-xs font-mono text-lime-400 text-right font-bold">
                {bear.xp} XP
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="space-y-3 pb-8">
        <button className="w-full bg-black border-[3px] border-lime-400 text-lime-400 py-4 text-sm font-bold flex items-center justify-center gap-2 hover:bg-lime-400 hover:text-black transition-colors uppercase tracking-widest font-mono shadow-[4px_4px_0_0_#8ba800] active:translate-y-1">
          <PixelGift className="w-5 h-5" /> Invite Friends (+500 XP)
        </button>
        <button className="w-full bg-black border-[3px] border-dashed border-zinc-800 py-4 text-zinc-500 text-sm font-bold flex items-center justify-center gap-2 hover:border-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest font-mono">
          <PixelUsers className="w-4 h-4" /> Unlock Group Brawl
        </button>
      </div>

      {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} />}
    </div>
  );
}
