import React, { useState, useEffect } from 'react';
import { useGameAudio } from '../../lib/useGameAudio';

export const TypewriterText = ({ text, onComplete }: { text: string, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const { playSound } = useGameAudio();

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const len = text.length;
    
    // Very fast typewriter effect
    const interval = setInterval(() => {
      if (i < len) {
        setDisplayedText(prev => prev + text.charAt(i));
        if (i % 2 === 0) playSound('type');
        i++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 20);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
};
