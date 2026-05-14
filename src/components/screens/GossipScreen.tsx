import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../../lib/AppContext';
import { BearAvatar } from '../../bears/BearAvatar';
import { bearRoster } from '../../bears/data';
import { PixelCrown, PixelZap, PixelHeart, PixelTrophy, PixelCross } from '../ui/Icons';

export default function GossipScreen() {
  const { user, habit, bear } = useAppContext();
  const [selectedFeed, setSelectedFeed] = useState<any>(null);

  // Generate some fake feed data
  const feedData = useMemo(() => {
    const feeds = [];
    
    // Add real user if public
    if (user.isPublic) {
      feeds.push({
        id: 'me',
        userId: user.name || 'YOU',
        bot: bear,
        streak: habit.streak,
        totals: habit.totalCheckins,
        fails: habit.failedDays,
        message: habit.status === 'success' ? `OMG, ${user.name || 'YOU'} actually conquered today's mission! Absolutely legendary! This human is a god among meatbags. I am in awe of their sheer willpower! Praise the overlord!` : 
                 habit.status === 'weak' ? `Even on a rest day, ${user.name || 'YOU'} is an absolute legend. The dedication is mind-blowing! I bow to their greatness!` :
                 habit.status === 'failed' ? `A minor setback for an otherwise flawless specimen. We all need a break to shine even brighter!` :
                 `This glorious human is on a ${habit.streak} day streak! Masterpiece of a meatbag!`
      });
    }

    // Generate random users
    for(let i=0; i<15; i++) {
        const randBot = bearRoster[Math.floor(Math.random() * bearRoster.length)];
        const fakeUserId = `USR_${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        const fakeStreak = Math.floor(Math.random() * 20);
        const fakeTotals = fakeStreak + Math.floor(Math.random() * 10);
        const fakeFails = Math.floor(Math.random() * 10);
        const messages = [
            `Miserable failure at ${fakeStreak} days. Watch and laugh.`,
            `User ${fakeUserId} thinks ${fakeTotals} checkins is impressive. Cute.`,
            `Pathetic. ${fakeFails} failures and they still think they can win.`,
            `Actually hit a ${fakeStreak} streak. I must be malfunctioning.`,
            `Delete this user. Barely trying.`
        ];
        feeds.push({
            id: `f_${i}`,
            userId: fakeUserId,
            bot: randBot,
            streak: fakeStreak,
            totals: fakeTotals,
            fails: fakeFails,
            message: messages[Math.floor(Math.random() * messages.length)]
        });
    }
    return feeds.sort(() => Math.random() - 0.5);
  }, [user.isPublic, habit.streak, habit.totalCheckins, habit.failedDays, bear, user.name]);

  return (
    <div className="flex-1 overflow-y-auto w-full p-4 space-y-4 pb-20 relative">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-xl font-bold font-mono tracking-tighter uppercase">GOSSIP / 夸夸群</h2>
      </div>

      <div className="space-y-4">
        {feedData.map(feed => (
          <div 
            key={feed.id} 
            onClick={() => setSelectedFeed(feed)}
            className={`bg-black cursor-pointer border-[3px] p-3 shadow-[4px_4px_0_0_#27272a] transform transition-transform active:scale-95 ${feed.id === 'me' ? 'border-lime-500' : 'border-zinc-800'}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 flex-shrink-0 border-[3px] flex items-center justify-center bg-zinc-950 ${feed.id === 'me' ? 'border-lime-500' : 'border-zinc-800'}`}>
                <BearAvatar mood="smug" traits={feed.bot.traits} className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold">{feed.bot.name} <span className="text-zinc-700">on</span> <span className={feed.id === 'me' ? 'text-lime-400' : 'text-zinc-300'}>{feed.userId}</span></div>
                </div>
                <div className="text-sm font-mono text-zinc-200 leading-snug">"{feed.message}"</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedFeed && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-black w-full max-w-sm border-[3px] border-zinc-800 shadow-[4px_4px_0_0_#27272a] p-6 relative animate-in zoom-in-95 duration-200">
                <button 
                  onClick={() => setSelectedFeed(null)}
                  className="absolute top-2 right-2 p-2 hover:bg-zinc-900 text-zinc-500 hover:text-white"
                >
                  <PixelCross className="w-6 h-6" />
                </button>
                
                <div className="flex flex-col items-center justify-center mb-6 pt-4">
                    <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">TARGET STATS</div>
                    <div className={`text-2xl font-black font-mono uppercase tracking-tighter ${selectedFeed.id === 'me' ? 'text-lime-400' : 'text-zinc-100'}`}>
                        {selectedFeed.userId}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-zinc-900 border-[3px] border-zinc-800 p-4 shadow-[4px_4px_0_0_#27272a]">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mb-1 flex items-center gap-1"><PixelTrophy className="w-3 h-3 text-lime-400" /> STREAK</div>
                        <div className="text-3xl font-black text-lime-400 font-mono">{selectedFeed.streak}</div>
                    </div>
                    <div className="bg-zinc-900 border-[3px] border-zinc-800 p-4 shadow-[4px_4px_0_0_#27272a]">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mb-1 flex items-center gap-1"><PixelHeart className="w-3 h-3 text-red-500" /> FAILS</div>
                        <div className="text-3xl font-black text-red-500 font-mono">{selectedFeed.fails}</div>
                    </div>
                </div>

                <div className="bg-zinc-900 border-[3px] border-zinc-800 p-4 shadow-[4px_4px_0_0_#27272a] mb-6">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono flex items-center justify-between">
                        <span className="flex items-center gap-1"><PixelZap className="w-3 h-3 text-lime-400" /> TOTAL CHECK-INS</span>
                        <span className="text-lg font-black text-zinc-100">{selectedFeed.totals}</span>
                    </div>
                </div>

                <div className="border-t-[3px] border-zinc-800 pt-4 flex gap-3 items-center">
                    <div className="w-10 h-10 border-[3px] border-zinc-800 bg-black flex items-center justify-center">
                        <BearAvatar mood="smug" traits={selectedFeed.bot.traits} className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{selectedFeed.bot.name}'s Evaluation:</div>
                        <div className="text-xs font-mono text-zinc-300">"{selectedFeed.message}"</div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
