import React from 'react';
import { PixelWarning, PixelCross } from '../ui/Icons';
import { useGameAudio } from '../../lib/useGameAudio';

export default function PunishmentScreen({ onClose }: { onClose: () => void }) {
  const { playSound } = useGameAudio();

  React.useEffect(() => {
    playSound('failed');
    if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 500]);
  }, [playSound]);

  return (
    <div className="fixed inset-0 z-[200] bg-red-950 flex flex-col items-center justify-center p-4 animate-glitch overflow-hidden text-center">
      {/* Background Warning Stripes */}
      <div className="absolute inset-0 opacity-20" style={{ background: 'repeating-linear-gradient(45deg, #000, #000 20px, #f00 20px, #f00 40px)' }} />

      <div className="relative z-10 w-full max-w-sm bg-black border-[4px] border-red-600 p-6 shadow-[8px_8px_0_0_#cc2929] transform rotate-2">
        <PixelWarning className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
        
        <h1 className="text-3xl font-black text-white font-mono uppercase tracking-tighter mb-2 glitch-text" data-text="MISSED CHECK-IN">
          MISSED CHECK-IN
        </h1>
        <div className="text-red-500 font-bold font-mono tracking-widest text-sm mb-6 uppercase">
          Violation Detected
        </div>

        <div className="bg-zinc-950 border-[2px] border-red-900 p-4 mb-6 text-left shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
          <p className="text-zinc-300 font-mono text-xs uppercase leading-relaxed">
            &gt; You failed to report before 00:00.<br/>
            &gt; Steak: <span className="text-red-500">RESET TO 0</span>.<br/>
            &gt; Trust: <span className="text-red-500">FRACTURED</span>.<br/>
            &gt; Tears: <span className="text-lime-400">+50 T</span>
          </p>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-red-600 text-white font-black font-mono text-lg uppercase py-4 tracking-widest hover:bg-red-500 transition-colors shadow-[4px_4px_0_0_#990000] active:translate-y-1"
        >
          ACCEPT PUNISHMENT
        </button>
      </div>
    </div>
  );
}
