import React from 'react';
import { PixelHome, PixelMessage, PixelSword, PixelMessage as PixelGossip, PixelFingerprint } from './ui/Icons';

export default function BottomTabs({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  const tabs = [
    { id: 'today', icon: PixelHome, label: 'Today' },
    { id: 'chat', icon: PixelMessage, label: 'Chat' },
    { id: 'challenges', icon: PixelSword, label: 'Arena' },
    { id: 'gossip', icon: PixelMessage, label: 'Gossip' },
    { id: 'me', icon: PixelFingerprint, label: 'Me' },
  ];

  return (
    <div className="absolute bottom-0 w-full bg-black border-t-[3px] border-zinc-800 pb-safe z-50 pt-2 pb-2">
      <div className="flex justify-around items-center px-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center w-16 py-2 transition-colors relative ${isActive ? 'text-lime-400' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              {isActive && (
                <div className="absolute top-[-11px] w-full h-[3px] bg-lime-400 shadow-[0_0_10px_#a3e635]"></div>
              )}
              <Icon className={`w-6 h-6 mb-1`} />
              <span className={`text-[8px] font-mono uppercase tracking-widest ${isActive ? 'font-bold' : ''}`}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  );
}
