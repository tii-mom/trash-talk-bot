import React from 'react';
import { useAppContext } from '../../lib/AppContext';

export const HabitCalendar = ({ habitId }: { habitId: string }) => {
  const { checkins } = useAppContext();
  const habitCheckins = checkins.filter(c => c.habitId === habitId);

  // Generate last 28 days for a 4x7 grid
  const days = Array.from({ length: 28 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const getDayStatus = (d: Date) => {
    // Basic timezone handling
    const dString = d.toISOString().split('T')[0];
    
    // Find if we have a checkin for this day
    const checkin = habitCheckins.find(c => c.date.startsWith(dString));
    if (checkin) {
      if (checkin.verdict === 'success' || checkin.verdict === 'weak') return 'success';
      return 'failed';
    }
    
    // If it's a day in the past and no checkin, technically we don't know the exact history before app was installed, but let's assume missing is just empty/pending, unless we explicitly marked it failed. For simplicity, we just mark empty if no record
    return 'empty';
  };

  return (
    <div className="bg-zinc-950 border-[3px] border-zinc-800 p-3 mt-4">
      <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-2 flex justify-between items-center">
        <span>Consistency Grid</span>
        <div className="flex gap-2 text-[8px]">
          <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-zinc-900 border-[2px] border-zinc-700"></div> MISS</div>
          <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-lime-400 border-[2px] border-lime-600"></div> DONE</div>
          <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-red-500 border-[2px] border-red-700"></div> FAIL</div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          const status = getDayStatus(d);
          let bgClass = "bg-zinc-900 border-zinc-800/50"; // empty
          if (status === 'success') bgClass = "bg-lime-400 border-lime-600";
          if (status === 'failed') bgClass = "bg-red-500 border-red-700 animate-pulse";
          
          return (
            <div 
              key={i} 
              className={`aspect-square border-[2px] flex items-center justify-center ${bgClass}`}
              title={d.toDateString()}
            >
              {status === 'failed' && <span className="text-[6px] font-bold text-red-950">X</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
