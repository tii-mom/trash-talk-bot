import React from 'react';
import { LimitedAvatar } from './LimitedAvatar';

/**
 * Given the user's avatar sheet is expected to be uploaded to /avatars.jpg
 * The image has 50 grid items: 10 columns by 5 rows.
 * Avatar IDs 51-62 are reserved for custom SVG limited avatars.
 */
export function UserAvatar({ avatarId, className = "w-12 h-12" }: { avatarId?: number, className?: string }) {
  if (!avatarId) {
    return (
      <div className={`${className} bg-lime-400 text-black flex justify-center items-center font-bold text-xl uppercase font-mono border-[3px] border-black shadow-[4px_4px_0_0_#27272a] transform -rotate-2`}>
        ME
      </div>
    );
  }

  if (avatarId > 50 && avatarId <= 62) {
    return (
      <div className={`${className} border-[3px] border-black shadow-[4px_4px_0_0_#27272a] transform -rotate-2 bg-black overflow-hidden`}>
        <LimitedAvatar id={avatarId - 50} />
      </div>
    );
  }

  // Calculate CSS positions
  // ID is 1-50.
  const index = avatarId - 1; 
  const cols = 10;
  // const rows = 5;
  const x = index % cols;
  const y = Math.floor(index / cols);

  // Background position percentages
  const bgPosX = x * (100 / 9); // ranges from 0% to 100% since there are 9 gaps
  const bgPosY = y * (100 / 4);

  return (
    <div 
      className={`${className} border-[3px] border-black shadow-[4px_4px_0_0_#27272a] transform -rotate-2`}
      style={{
        backgroundImage: 'url(/avatars.jpg)',
        backgroundSize: '1000% 500%', // 10 cols, 5 rows => 1000% width, 500% height
        backgroundPosition: `${bgPosX}% ${bgPosY}%`,
      }}
    />
  );
}
