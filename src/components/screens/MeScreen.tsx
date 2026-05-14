import React, { useState } from 'react';
import { useAppContext } from '../../lib/AppContext';
import { bearRoster } from '../../bears/data';
import { BearAvatar } from '../../bears/BearAvatar';
import { GridIcon, PixelTerminal, PixelCopy, PixelCheck, PixelRefresh, PixelCrown, PixelZap, PixelHeart, PixelFlame, PixelSkull, PixelTrophy, PixelCross } from '../ui/Icons';

import { HabitCalendar } from '../ui/HabitCalendar';

import { UserAvatar } from '../UserAvatar';

export default function MeScreen() {
  const { user, bear, habit, habits, activeHabitId, showToast, switchBot, updatePrivacy, updateAvatar, updateVoiceName, setActiveHabit, addHabit, editHabit } = useAppContext();
  const [copied, setCopied] = useState(false);
  const [showApi, setShowApi] = useState(false);
  const [showRoster, setShowRoster] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  
  const fakeKey = `bb_live_${Math.random().toString(36).substr(2, 9)}_${bear.id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fakeKey).catch(() => {});
    setCopied(true);
    showToast('API KEY COPIED TO CLIPBOARD');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto w-full p-4 space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowAvatarModal(true)} className="focus:outline-none hover:scale-105 active:scale-95 transition-transform" title="Change Avatar">
            <UserAvatar avatarId={user.avatarId} className="w-12 h-12" />
          </button>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase">Operator Profile</h1>
            <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">ID: {user.name}</div>
          </div>
        </div>
        <button 
          onClick={() => updatePrivacy(!user.isPublic)}
          className={`px-3 py-1 text-[10px] uppercase font-mono font-bold tracking-widest border-[3px] ${user.isPublic ? 'bg-lime-400 text-black border-lime-600' : 'bg-black text-zinc-500 border-zinc-800'}`}
        >
          {user.isPublic ? 'STATUS: PUBLIC' : 'STATUS: HIDDEN'}
        </button>
      </div>

      {/* Stats Grid from GrowthScreen */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-black border-[3px] border-zinc-800 p-3 shadow-[4px_4px_0_0_#27272a] transform -rotate-1">
          <div className="text-zinc-500 text-[10px] mb-1 flex items-center gap-1 font-mono uppercase tracking-widest"><PixelZap className="w-3 h-3 text-lime-400" /> Credits</div>
          <div className="text-3xl font-mono text-lime-400 font-black tracking-tight">{user.credits}</div>
        </div>
        <div className="bg-black border-[3px] border-zinc-800 p-3 shadow-[4px_4px_0_0_#27272a] transform rotate-1">
          <div className="text-zinc-500 text-[10px] mb-1 flex items-center gap-1 font-mono uppercase tracking-widest"><PixelHeart className="w-3 h-3 text-cyan-400" /> Tears</div>
          <div className="text-3xl font-mono text-cyan-400 font-black tracking-tight">{user.tears}</div>
        </div>
        <div className="col-span-2 bg-black border-[3px] border-zinc-800 p-4 flex justify-between items-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900 to-black shadow-[4px_4px_0_0_#27272a]">
          <div>
            <div className="text-zinc-500 text-[10px] mb-1 font-mono uppercase tracking-widest">Current Streak</div>
            <div className="text-4xl font-black text-lime-400 font-mono tracking-tighter flex items-end gap-1">
              {habit.streak}<span className="text-sm text-lime-400/50 mb-1">Days</span>
            </div>
          </div>
          <div className="text-lime-400 opacity-80 drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]">
            <PixelTrophy className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      {/* Badges */}
      <div>
        <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">Unlocked Badges</div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { id: 1, name: 'FIRST BLOOD', active: true, icon: <BearAvatar mood={bear.mood} traits={bear.traits} className="w-6 h-6 " /> },
            { id: 2, name: '7 DAYS', active: habit.streak >= 7, icon: <PixelFlame className="w-6 h-6" /> },
            { id: 3, name: 'RESURRECT', active: habit.failedDays > 0 && habit.streak > 0, icon: <PixelSkull className="w-6 h-6" /> },
            { id: 4, name: '100 DAYS', active: habit.totalCheckins >= 100, icon: <PixelCrown className="w-6 h-6" /> },
          ].map(b => (
            <div key={b.id} className={`flex flex-col items-center justify-center p-2 border-[3px] h-20 shadow-[4px_4px_0_0_#27272a] ${b.active ? 'bg-zinc-900 border-zinc-700 text-lime-400' : 'bg-black border-zinc-900 text-zinc-800'}`}>
              <div className="mb-1">{b.icon}</div>
              <div className={`text-[8px] text-center tracking-widest font-mono font-bold leading-snug ${b.active ? 'text-zinc-300' : 'text-zinc-700'}`}>{b.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Habits Management */}
      <div>
        <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">My Targets</div>
        <div className="space-y-3">
          {habits.map(h => (
            <div 
              key={h.id}
              onClick={() => setActiveHabit(h.id)}
              className={`p-3 border-[3px] shadow-[4px_4px_0_0_#27272a] transform ${h.id === habit.id ? 'bg-lime-400/10 border-lime-400 rotate-1' : 'bg-black border-zinc-800 -rotate-1 cursor-pointer hover:border-zinc-700'}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`font-mono font-bold tracking-widest uppercase ${h.id === habit.id ? 'text-lime-400' : 'text-zinc-300'}`}>{h.type}</span>
                <div className="flex gap-2 items-center">
                  {h.id === habit.id && <span className="bg-lime-400 text-black text-[8px] font-bold px-2 py-0.5 font-mono uppercase tracking-widest">ACTIVE</span>}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const newTarget = prompt(`Update target for [${h.type}]:`, h.dailyTarget);
                      if (newTarget && newTarget !== h.dailyTarget) {
                        editHabit(h.id, newTarget);
                      }
                    }} 
                    className="text-zinc-500 hover:text-lime-400 p-1"
                  >
                    <PixelTerminal className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-xs text-zinc-500 font-mono mb-2">{h.dailyTarget}</div>
              <div className="flex gap-4 text-[10px] font-mono text-zinc-600 mb-2">
                <span>Streak: {h.streak}</span>
                <span>Total: {h.totalCheckins}</span>
              </div>
              <HabitCalendar habitId={h.id} />
            </div>
          ))}
          
          <button 
            onClick={() => {
              const type = prompt("Enter new habit type (e.g. 读书):");
              if (!type) return;
              const target = prompt("Enter daily target (e.g. 每天读20页):");
              if (!target) return;
              addHabit(type, target);
            }}
            className="w-full bg-black border-[3px] border-zinc-700 border-dashed text-zinc-400 py-4 font-mono font-bold text-sm tracking-widest uppercase hover:border-lime-400 hover:text-lime-400 transition-colors"
          >
            + ADD NEW TARGET
          </button>
        </div>
      </div>

      {/* Roster Section */}
      <div>
        <button 
          onClick={() => setShowRoster(!showRoster)}
          className="w-full flex items-center justify-between bg-black border-[3px] border-zinc-800 py-3 px-4 uppercase tracking-widest text-sm hover:border-zinc-600 transition-colors shadow-[4px_4px_0_0_#27272a]"
        >
          <div className="flex items-center gap-2">
            <GridIcon className="text-lime-400 w-5 h-5" />
            <span className="font-bold font-mono">Bot Roster / 100</span>
          </div>
          <span className="text-xs text-zinc-500 font-mono">{showRoster ? 'HIDE' : 'SHOW'}</span>
        </button>
        
        {showRoster && (
          <div className="bg-zinc-950 border-[3px] border-zinc-800 border-t-0 p-3 shadow-[6px_6px_0_0_#27272a] max-h-96 overflow-y-auto no-scrollbar animate-in slide-in-from-top-2">
            <div className="grid grid-cols-4 gap-2">
              {bearRoster.map((b) => (
                <div 
                  key={b.id} 
                  onClick={() => switchBot(b.id)}
                  className={`relative aspect-square border-[3px] flex items-center justify-center p-1 cursor-pointer transition-transform hover:scale-105 active:scale-95 ${b.id === bear.id ? 'border-lime-400 bg-lime-400/10 shadow-[4px_4px_0_0_#8ba800]' : 'border-zinc-800 bg-black'}`}
                  title={`${b.name} (${b.symbol})`}
                >
                  <BearAvatar mood="neutral" traits={b.traits} className="w-full h-full" />
                  <div className="absolute bottom-[0px] right-[0px] bg-black text-[6px] font-mono font-bold px-1 text-zinc-400 border-t-[2px] border-l-[2px] border-zinc-800">
                    {b.id}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Voice Selector */}
      <div className="bg-black border-[3px] border-zinc-800 p-4 shadow-[4px_4px_0_0_#27272a]">
        <div className="flex justify-between w-full mb-3">
          <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-2">
            Voice Module
          </div>
          {user.voiceName === 'System' && <span className="text-[10px] font-bold text-lime-400 font-mono tracking-widest uppercase">Low Latency</span>}
        </div>
        
        <div className="grid grid-cols-3 gap-2 w-full">
          {['Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr', 'System'].map(voice => (
            <button
              key={voice}
              onClick={() => updateVoiceName(voice)}
              className={`py-2 text-xs font-mono uppercase font-bold border-[3px] transition text-center cursor-pointer ${user.voiceName === voice || (!user.voiceName && voice === 'Puck') ? 'border-lime-400 bg-lime-400 text-black shadow-[4px_4px_0_0_#8ba800]' : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 bg-zinc-950 hover:border-zinc-600'}`}
            >
              {voice}
            </button>
          ))}
        </div>
      </div>

      {/* API Toggle */}
      <div>
        <button 
          onClick={() => setShowApi(!showApi)}
          className="w-full bg-black border-[3px] border-zinc-800 py-3 flex items-center justify-center gap-2 font-mono uppercase tracking-widest text-sm hover:border-zinc-600 transition-colors shadow-[4px_4px_0_0_#27272a]"
        >
          <PixelTerminal className="w-4 h-4 text-zinc-400" />
          {showApi ? 'Hide Developer API' : 'Reveal Developer API'}
        </button>
      </div>

      {/* API Section */}
      {showApi && (
        <div className="animate-in slide-in-from-top-4 fade-in duration-200">
          {user.tier === 'free' ? (
            <div className="bg-black border-[3px] border-zinc-800 p-6 flex flex-col justify-center items-center text-center shadow-[4px_4px_0_0_#27272a] transform rotate-1">
              <PixelTerminal className="w-8 h-8 text-zinc-700 mb-4" />
              <h2 className="text-lg font-bold mb-2 font-mono uppercase tracking-widest text-zinc-500">API Access Locked</h2>
              <p className="text-[10px] uppercase font-mono tracking-widest text-zinc-600 mb-6 w-full">Restricted area. Sync your bear to custom apps, Siri, or smart home.</p>
              <div className="bg-zinc-950 border-[2px] border-zinc-800 p-3 w-full text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                Requires <span className="font-bold text-lime-400">99 HI/MO</span> Gigachad Plan
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-black border-[3px] border-zinc-800 p-4 shadow-[4px_4px_0_0_#27272a] transform -rotate-1">
                <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 mb-1">Active Bear ID</div>
                <code className="text-sm text-zinc-300 font-mono block mb-4 bg-zinc-900 border-[3px] border-zinc-700 p-2 shadow-inner">{bear.id} | {bear.symbol}</code>

                <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 mb-1">Secret API Key</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-zinc-900 border-[3px] border-zinc-700 p-2 overflow-x-auto shadow-inner">
                    <code className="text-xs text-lime-400 font-mono whitespace-nowrap">{fakeKey}</code>
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="bg-black border-[3px] border-zinc-700 text-zinc-300 p-2 hover:bg-zinc-800 hover:text-lime-400 hover:border-lime-400 transition-colors active:scale-95 shadow-[4px_4px_0_0_#27272a]"
                  >
                    {copied ? <PixelCheck className="w-4 h-4 text-lime-400" /> : <PixelCopy className="w-4 h-4" />}
                  </button>
                  <button className="bg-black border-[3px] border-zinc-700 text-zinc-300 p-2 hover:bg-zinc-800 transition hover:text-lime-400 hover:border-lime-400 active:scale-95 shadow-[4px_4px_0_0_#27272a]">
                    <PixelRefresh className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-xs font-mono uppercase tracking-widest text-zinc-500 mb-0 pt-2">Endpoint Docs</h3>
              
              <div className="bg-black border-[3px] border-zinc-800 overflow-hidden shadow-[4px_4px_0_0_#27272a] transform flex flex-col">
                <div className="flex items-center bg-zinc-950 px-3 py-3 border-b-[3px] border-zinc-800 text-xs shadow-none">
                  <span className="font-bold font-mono text-lime-400 mr-2 bg-lime-400/10 px-1 border-[2px] border-lime-400/20">POST</span>
                  <span className="text-zinc-300 font-mono">/api/bears/{bear.id}/chat</span>
                </div>
                <div className="p-3">
                  <div className="text-[10px] text-zinc-500 mb-1 font-mono">Example Request (JSON)</div>
                  <pre className="text-[10px] text-zinc-300 font-mono overflow-x-auto">
{JSON.stringify({
  userId: "tg_123",
  goal: habit.type,
  message: "记录打卡...",
  evidence: []
}, null, 2)}
                  </pre>
                </div>
                <div className="p-3 border-t-[2px] border-zinc-800 bg-zinc-900/50">
                  <div className="text-[10px] text-zinc-500 mb-1 font-mono tracking-widest uppercase">Example Response</div>
                  <pre className="text-[10px] text-lime-400 font-mono overflow-x-auto">
{JSON.stringify({
  reply: "哥们，你这叫打卡？明天重来。",
  verdict: "failed",
  score: 0,
  streakChange: 0
}, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-black w-full max-w-sm border-[3px] border-lime-400 p-4 shadow-[4px_4px_0_0_#ccff00] transform -rotate-1 relative flex flex-col max-h-[80vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold font-mono uppercase tracking-tight text-lime-400">SELECT AVATAR_</h3>
              <button onClick={() => setShowAvatarModal(false)} className="text-zinc-500 hover:text-red-500 transition-colors active:scale-95"><PixelCross className="w-5 h-5" /></button>
            </div>
            
            <p className="text-xs font-mono text-zinc-400 mb-4 bg-zinc-900 border-[2px] border-zinc-700 p-2">
              NOTE: To use sprites, upload your 10x5 grid image to <span className="text-lime-400">/public/avatars.jpg</span> in the code editor.
            </p>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-2">
              <h4 className="text-[10px] font-bold font-mono text-cyan-400 mb-2 mt-2 uppercase tracking-widest border-b-[2px] border-zinc-800 pb-1">LIMITED EXCLUSIVES</h4>
              <div className="grid grid-cols-4 gap-3 mb-6">
                {Array.from({ length: 12 }).map((_, i) => {
                  const id = i + 51;
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        updateAvatar(id);
                        setShowAvatarModal(false);
                      }}
                      className={`aspect-square w-full transform transition-transform hover:scale-105 active:scale-95 ${user.avatarId === id ? 'ring-[3px] ring-cyan-400 ring-offset-2 ring-offset-black' : ''}`}
                    >
                      <UserAvatar avatarId={id} className="w-full h-full" />
                    </button>
                  );
                })}
              </div>

              <h4 className="text-[10px] font-bold font-mono text-zinc-500 mb-2 uppercase tracking-widest border-b-[2px] border-zinc-800 pb-1">SPRITESHEET (1-50)</h4>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 50 }).map((_, i) => {
                  const id = i + 1;
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        updateAvatar(id);
                        setShowAvatarModal(false);
                      }}
                      className={`aspect-square w-full transform transition-transform hover:scale-105 active:scale-95 ${user.avatarId === id ? 'ring-2 ring-lime-400 ring-offset-2 ring-offset-black' : ''}`}
                    >
                      <UserAvatar avatarId={id} className="w-full h-full" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
