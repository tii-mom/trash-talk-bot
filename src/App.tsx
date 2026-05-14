/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useAppContext } from './lib/AppContext';
import Onboarding from './components/Onboarding';
import BottomTabs from './components/BottomTabs';
import TodayScreen from './components/screens/TodayScreen';
import ChatScreen from './components/screens/ChatScreen';
import ChallengesScreen from './components/screens/ChallengesScreen';
import GossipScreen from './components/screens/GossipScreen';
import MeScreen from './components/screens/MeScreen';

function MainApp() {
  const { isOnboarded, toast } = useAppContext();
  const [activeTab, setActiveTab] = useState('today');

  if (!isOnboarded) {
    return <Onboarding />;
  }

  return (
    <>
      <div className="flex-1 flex flex-col pb-[80px] pt-safe no-scrollbar relative overflow-hidden">
        {toast && (
          <div className="fixed top-safe mt-8 left-1/2 -translate-x-1/2 z-[100] bg-lime-400 text-black px-6 py-3 font-bold font-mono text-xs uppercase tracking-widest border-[3px] border-black shadow-[4px_4px_0_0_#fff] animate-in slide-in-from-top-6 fade-in duration-300 whitespace-nowrap">
            {toast}
          </div>
        )}
        {activeTab === 'today' && <TodayScreen />}
        {activeTab === 'chat' && <ChatScreen />}
        {activeTab === 'challenges' && <ChallengesScreen />}
        {activeTab === 'gossip' && <GossipScreen />}
        {activeTab === 'me' && <MeScreen />}
      </div>
      <BottomTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-[100dvh] bg-black text-zinc-100 flex justify-center sm:items-center font-sans sm:bg-zinc-950 sm:bg-opacity-50">
        <div className="w-full h-[100dvh] sm:w-[390px] sm:h-[844px] sm:max-h-[calc(100dvh-4rem)] bg-zinc-950 relative overflow-hidden flex flex-col sm:rounded-[40px] sm:border-[8px] border-zinc-900 sm:shadow-2xl">
          <MainApp />
        </div>
      </div>
    </AppProvider>
  );
}
