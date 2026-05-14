import React from 'react';
import { motion } from 'motion/react';
import { BearTraits } from './types';

interface Props {
  mood?: string;
  traits?: BearTraits;
  className?: string;
  isTalking?: boolean;
}

export function BearAvatar({ mood, traits, className = "w-6 h-6", isTalking = false }: Props) {
  // Start with default or provided traits
  let t: BearTraits = traits ? { ...traits } : {
    frameColor: '#e4e4e7',
    screenColor: '#09090b',
    ledColor: '#ccff00', // Acid green
    eyes: 'normal',
    mouth: 'line',
    accent: 'none'
  };

    let animState = 'idle';
  
  if (mood) {
    animState = mood;
    if (mood === 'angry') { t.eyes = 'angry'; t.mouth = 'zigzag'; t.ledColor = '#ff3333'; } // Hot red
    else if (mood === 'proud') { t.eyes = 'happy'; t.mouth = 'smile'; }
    else if (mood === 'sleepy') { t.eyes = 'sleepy'; t.mouth = 'open'; t.accent = 'zzz'; }
    else if (mood === 'hyped') { t.eyes = 'star'; t.mouth = 'open'; t.ledColor = '#ffcc00'; } // Warning yellow
    else if (mood === 'zen') { t.eyes = 'line'; t.mouth = 'tiny'; }
    else if (mood === 'disappointed') { t.eyes = 'deadpan'; t.mouth = 'frown'; }
    else if (mood === 'smug') { t.eyes = 'wince'; t.mouth = 'smile'; t.accent = 'blush'; }
  }

  // Blinking 
  const blinkAnim = {
    scaleY: [1, 1, 0.1, 1, 1],
    transition: { duration: 4, times: [0, 0.9, 0.95, 0.98, 1], repeat: Infinity, ease: 'easeOut' }
  };
  
  let eyeAnim = blinkAnim as any;
  if (animState === 'sleepy') {
     eyeAnim = { scaleY: [0.6, 0.4, 0.6], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } };
  } else if (animState === 'angry') {
     eyeAnim = { scaleY: [0.8, 0.7, 0.8], transition: { duration: 2, repeat: Infinity } };
  } else if (animState === 'disappointed') {
     eyeAnim = { scaleY: [0.7, 0.1, 0.7], transition: { duration: 5, times: [0, 0.1, 1], repeat: Infinity } };
  }

  // Mouth animation
  let mouthAnim = { scaleY: 1 } as any;
  if (isTalking) {
     mouthAnim = { scaleY: [1, 1.5, 0.5, 1.8, 0.8, 1.3, 1], transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' } };
  } else if (animState === 'sleepy') {
     mouthAnim = { scaleY: [0.5, 0.7, 0.5], transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } };
  } else if (animState === 'zen') {
     mouthAnim = { scaleX: [1, 0.8, 1], transition: { duration: 4, repeat: Infinity } };
  }

  const getBodyAnimation = () => {
    switch(animState) {
      case 'angry': return { x: [-0.5, 0.5, -0.5], transition: { duration: 0.1, repeat: Infinity } };
      case 'hyped': return { y: [0, -1.5, 0], scale: [1, 1.02, 1], transition: { duration: 0.3, repeat: Infinity } };
      case 'proud': return { y: [0, -1, 0], transition: { duration: 2, repeat: Infinity } };
      case 'sleepy': return { y: [0, 1, 0], transition: { duration: 4, repeat: Infinity } };
      default: return { y: [0, -0.5, 0], transition: { duration: 3, repeat: Infinity } };
    }
  };

  const renderEyes = () => {
    switch(t.eyes) {
      case 'normal': return <path d="M 30 35 v 10 M 70 35 v 10" strokeWidth="5" />;
      case 'happy': return <path d="M 25 40 q 5 -10 10 0 M 65 40 q 5 -10 10 0" />;
      case 'sad': return <path d="M 25 35 q 5 10 10 0 M 65 35 q 5 10 10 0" />;
      case 'angry': return <path d="M 25 35 l 10 5 M 75 35 l -10 5" strokeWidth="5"/>;
      case 'hearts':
        return (
          <g fill={t.ledColor} stroke="none">
            <path d="M 27 37 a 3 3 0 0 1 6 0 a 3 3 0 0 1 6 0 q 0 4 -6 8 q -6 -4 -6 -8 z" />
            <path d="M 67 37 a 3 3 0 0 1 6 0 a 3 3 0 0 1 6 0 q 0 4 -6 8 q -6 -4 -6 -8 z" />
          </g>
        );
      case 'money': return <path d="M 30 35 v 10 M 27 38 h 6 M 27 42 h 6 M 70 35 v 10 M 67 38 h 6 M 67 42 h 6" strokeWidth="3" />;
      case 'hypno': return <path d="M 30 40 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 30 40 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0 M 70 40 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 70 40 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0" strokeWidth="2" />;
      case 'deadpan': return <path d="M 25 40 h 10 M 65 40 h 10" strokeWidth="4"/>;
      case 'sleepy': return <path d="M 25 42 q 5 -5 10 0 M 65 42 q 5 -5 10 0" strokeWidth="3"/>;
      case 'star': return <path d="M 30 32 l 2 4 l 4 0 l -3 3 l 1 4 l -4 -2 l -4 2 l 1 -4 l -3 -3 l 4 0 Z M 70 32 l 2 4 l 4 0 l -3 3 l 1 4 l -4 -2 l -4 2 l 1 -4 l -3 -3 l 4 0 Z" fill={t.ledColor} strokeWidth="1" />;
      case 'dizzy': return <path d="M 27 37 l 6 6 M 33 37 l -6 6 M 67 37 l 6 6 M 73 37 l -6 6" strokeWidth="4" />;
      case 'wince': return <path d="M 25 35 l 5 5 l -5 5 M 75 35 l -5 5 l 5 5" strokeWidth="4"/>;
      case 'confused': return <path d="M 25 40 h 10 M 70 35 v 10" strokeWidth="4" />;
      case 'shocked': return <path d="M 30 35 v 10 M 70 35 v 10" strokeWidth="8"/>;
      case 'line':
      default: return <path d="M 25 40 h 10 M 65 40 h 10" strokeWidth="4"/>;
    }
  };

  const renderMouth = () => {
    switch(t.mouth) {
       case 'line': return <path d="M 45 60 h 10" strokeWidth="4" />;
       case 'smile': return <path d="M 40 58 q 10 10 20 0" />;
       case 'frown': return <path d="M 40 62 q 10 -10 20 0" />;
       case 'open': return <rect x="45" y="55" width="10" height="10" rx="3" fill={t.ledColor} />;
       case 'zigzag': return <path d="M 40 60 l 5 -3 l 5 3 l 5 -3 l 5 3" strokeWidth="3" strokeLinejoin="miter"/>;
       case 'tiny': return <circle cx="50" cy="60" r="2" fill={t.ledColor} stroke="none" />;
       case 'none':
       default: return null;
    }
  };

  const renderAccents = () => {
    switch(t.accent) {
       case 'blush':
         return (
            <g stroke="none" fill="#ef4444" opacity="0.6">
               <ellipse cx="20" cy="45" rx="6" ry="3" />
               <ellipse cx="80" cy="45" rx="6" ry="3" />
            </g>
         );
       case 'sweat': return <path d="M 80 25 q 5 5 0 10 q -5 -5 0 -10 z" fill="#22d3ee" stroke="none" />;
       case 'tears': return <path d="M 30 48 v 10 M 70 48 v 10" strokeWidth="4" strokeDasharray="4 4" />;
       case 'zzz':
         return (
            <motion.g
               animate={{ y: [-5, -15], opacity: [0, 1, 0], scale: [0.5, 1.2] }}
               transition={{ duration: 2, repeat: Infinity }}
               strokeWidth="2"
            >
               <path d="M 70 20 h 8 l -8 8 h 8" />
               <path d="M 80 10 h 5 l -5 5 h 5" strokeWidth="1.5" />
            </motion.g>
         );
       case 'sparkle':
         return (
             <motion.g
               animate={{ rotate: 180, scale: [0.8, 1.2, 0.8] }}
               transition={{ duration: 3, repeat: Infinity }}
             >
               <path d="M 80 20 q 5 0 5 -5 q 0 5 5 5 q -5 0 -5 5 q 0 -5 -5 -5" fill={t.ledColor} stroke="none" />
             </motion.g>
         );
       case 'none':
       default: return null;
    }
  };

  const bodyAnim = getBodyAnimation();

  return (
    <motion.svg viewBox="0 0 100 100" className={className} animate={bodyAnim as any} transition={(bodyAnim as any)?.transition}>
      {/* Outer Frame */}
      <rect x="10" y="15" width="80" height="70" rx="15" fill={t.frameColor} />
      
      {/* Ears / Antennas */}
      <path d="M 5 40 h 5 v 20 h -5 z" fill="#71717a" />
      <path d="M 90 40 h 5 v 20 h -5 z" fill="#71717a" />
      
      {/* Screen */}
      <rect x="18" y="23" width="64" height="54" rx="8" fill={t.screenColor} />

      {/* Screen Glare */}
      <path d="M 20 25 Q 50 15, 80 25 L 80 35 Q 50 25, 20 35 Z" fill="#ffffff" opacity="0.05" />

      {/* LED Group */}
      <g fill="none" stroke={t.ledColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
         
         {/* Eyes */}
         <motion.g style={{ transformOrigin: '50px 40px' }} animate={eyeAnim} transition={(eyeAnim as any)?.transition}>
            {renderEyes()}
         </motion.g>

         {/* Mouth */}
         <motion.g style={{ transformOrigin: '50px 60px' }} animate={mouthAnim} transition={(mouthAnim as any)?.transition}>
            {renderMouth()}
         </motion.g>

         {/* Accents */}
         {renderAccents()}
      </g>
    </motion.svg>
  );
}
