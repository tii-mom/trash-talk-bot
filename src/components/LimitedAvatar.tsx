import React from 'react';

export function LimitedAvatar({ id, className = "w-full h-full" }: { id: number, className?: string }) {
  // 1 to 12
  const normalizedId = ((id - 1) % 12) + 1;

  switch (normalizedId) {
    case 1:
      // Cyber Demon (Neon Pink/Cyan)
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#09090b" stroke="#ec4899" strokeWidth="8" />
          <path d="M 20 50 Q 50 80 80 50" fill="none" stroke="#22d3ee" strokeWidth="6" strokeLinecap="round" />
          <path d="M 30 30 L 45 45 M 70 30 L 55 45" stroke="#ec4899" strokeWidth="6" strokeLinecap="round" />
          <circle cx="45" cy="45" r="4" fill="#fff" />
          <circle cx="55" cy="45" r="4" fill="#fff" />
          <path d="M 10 10 L 30 30 M 90 10 L 70 30" stroke="#ec4899" strokeWidth="6" />
        </svg>
      );
    case 2:
      // Toxic Slime (Lime Green/Purple)
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#18181b" stroke="#84cc16" strokeWidth="8" />
          <path d="M 20 80 Q 50 20 80 80 Z" fill="#84cc16" />
          <circle cx="40" cy="65" r="8" fill="#581c87" />
          <circle cx="60" cy="55" r="12" fill="#581c87" />
          <path d="M 45 85 Q 50 75 55 85 Z" fill="#18181b" />
          <circle cx="40" cy="65" r="3" fill="#fff" />
          <circle cx="60" cy="55" r="4" fill="#fff" />
        </svg>
      );
    case 3:
      // Void Watcher (Deep Purple/Neon Yellow)
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#2e1065" stroke="#eab308" strokeWidth="8" />
          <circle cx="50" cy="50" r="30" fill="#000" stroke="#eab308" strokeWidth="4" />
          <ellipse cx="50" cy="50" rx="20" ry="10" fill="#eab308" />
          <circle cx="50" cy="50" r="5" fill="#000" />
          <path d="M 50 10 L 50 20 M 50 80 L 50 90 M 10 50 L 20 50 M 80 50 L 90 50" stroke="#eab308" strokeWidth="4" />
        </svg>
      );
    case 4:
      // Glitch Ghost (Cyan/Magenta)
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#000" stroke="#06b6d4" strokeWidth="8" />
          <path d="M 30 80 L 30 40 Q 50 10 70 40 L 70 80 L 60 70 L 50 80 L 40 70 Z" fill="#fdf4ff" stroke="#d946ef" strokeWidth="4" />
          <rect x="40" y="45" width="8" height="8" fill="#06b6d4" />
          <rect x="55" y="45" width="8" height="8" fill="#d946ef" />
          <path d="M 45 65 L 55 65" stroke="#000" strokeWidth="4" />
          <rect x="25" y="55" width="10" height="4" fill="#06b6d4" />
          <rect x="75" y="35" width="10" height="4" fill="#d946ef" />
        </svg>
      );
    case 5:
      // Spark Mecha (Orange/Yellow)
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#431407" stroke="#f97316" strokeWidth="8" />
          <polygon points="50,20 80,50 50,80 20,50" fill="#ea580c" stroke="#fef08a" strokeWidth="4" />
          <path d="M 40 45 L 60 45 L 50 60 Z" fill="#fef08a" />
          <line x1="30" y1="50" x2="45" y2="45" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          <line x1="70" y1="50" x2="55" y2="45" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="30" r="5" fill="#fef08a" />
        </svg>
      );
    case 6:
      // Acid Skull (Neon Green/Black)
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#052e16" stroke="#4ade80" strokeWidth="8" />
          <path d="M 30 30 Q 50 10 70 30 L 70 60 L 60 70 L 40 70 L 30 60 Z" fill="#22c55e" stroke="#166534" strokeWidth="4" />
          <polygon points="35,45 45,45 40,35" fill="#000" />
          <polygon points="55,45 65,45 60,35" fill="#000" />
          <path d="M 45 55 L 50 50 L 55 55" fill="none" stroke="#000" strokeWidth="3" />
          <line x1="40" y1="65" x2="60" y2="65" stroke="#000" strokeWidth="5" strokeDasharray="5 5" />
        </svg>
      );
    case 7:
      // Synth Cat (Magenta/Indigo)
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#1e1b4b" stroke="#db2777" strokeWidth="8" />
          <polygon points="20,50 30,20 40,40 60,40 70,20 80,50 50,80" fill="#be185d" />
          <circle cx="40" cy="55" r="6" fill="#fbcfe8" />
          <circle cx="60" cy="55" r="6" fill="#fbcfe8" />
          <path d="M 45 65 Q 50 70 55 65" fill="none" stroke="#fbcfe8" strokeWidth="3" />
          <line x1="10" y1="55" x2="25" y2="60" stroke="#fbcfe8" strokeWidth="2" />
          <line x1="90" y1="55" x2="75" y2="60" stroke="#fbcfe8" strokeWidth="2" />
        </svg>
      );
    case 8:
      // Laser Orb (Red/Yellow)
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#7f1d1d" stroke="#ef4444" strokeWidth="8" />
          <circle cx="50" cy="50" r="35" fill="#b91c1c" />
          <circle cx="50" cy="50" r="25" fill="#dc2626" />
          <rect x="25" y="45" width="50" height="10" fill="#fef08a" />
          <circle cx="50" cy="50" r="15" fill="#000" />
          <circle cx="50" cy="50" r="6" fill="#ef4444" />
          <path d="M 50 10 L 50 20 M 50 80 L 50 90 M 10 50 L 20 50 M 80 50 L 90 50" stroke="#fef08a" strokeWidth="4" />
        </svg>
      );
    case 9:
      // Frost Golem (Ice Blue/White)
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#082f49" stroke="#38bdf8" strokeWidth="8" />
          <polygon points="50,15 80,40 65,85 35,85 20,40" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="4" />
          <polygon points="40,50 45,40 50,55" fill="#082f49" />
          <polygon points="60,50 55,40 50,55" fill="#082f49" />
          <path d="M 35 70 L 65 70" stroke="#082f49" strokeWidth="6" strokeLinecap="square" strokeDasharray="10 5" />
        </svg>
      );
    case 10:
      // Byte Beast (Neon Teal/Pink)
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#111827" stroke="#14b8a6" strokeWidth="8" />
          <rect x="25" y="30" width="50" height="40" rx="8" fill="#1f2937" stroke="#f472b6" strokeWidth="4" />
          <rect x="35" y="40" width="10" height="10" fill="#14b8a6" />
          <rect x="55" y="40" width="10" height="10" fill="#14b8a6" />
          <rect x="40" y="55" width="20" height="5" fill="#f472b6" />
          <rect x="45" y="60" width="10" height="5" fill="#f472b6" />
          <line x1="25" y1="20" x2="35" y2="30" stroke="#14b8a6" strokeWidth="4" />
          <line x1="75" y1="20" x2="65" y2="30" stroke="#14b8a6" strokeWidth="4" />
        </svg>
      );
    case 11:
      // Star DJ (Yellow/Magenta/Cyan)
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#0f172a" stroke="#fde047" strokeWidth="8" />
          <path d="M 20 60 Q 50 10 80 60 L 50 90 Z" fill="#0ea5e9" stroke="#db2777" strokeWidth="4" />
          <path d="M 30 50 L 70 50" stroke="#fde047" strokeWidth="8" strokeLinecap="round" />
          <circle cx="40" cy="50" r="5" fill="#0f172a" />
          <circle cx="60" cy="50" r="5" fill="#0f172a" />
          <path d="M 45 75 Q 50 85 55 75" fill="none" stroke="#fde047" strokeWidth="4" />
        </svg>
      );
    case 12:
      // Mad Scientist (Toxic Green/White)
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#171717" stroke="#10b981" strokeWidth="8" />
          <path d="M 20 50 L 20 90 L 80 90 L 80 50 Q 50 30 20 50" fill="#f3f4f6" />
          <circle cx="35" cy="65" r="12" fill="#000" stroke="#10b981" strokeWidth="4" />
          <circle cx="65" cy="65" r="12" fill="#000" stroke="#10b981" strokeWidth="4" />
          <circle cx="35" cy="65" r="4" fill="#10b981" />
          <circle cx="65" cy="65" r="4" fill="#10b981" />
          <path d="M 45 80 L 55 80" stroke="#000" strokeWidth="4" />
          <path d="M 10 20 Q 20 50 30 20 M 90 20 Q 80 50 70 20 M 50 10 L 50 30" stroke="#10b981" strokeWidth="4" fill="none" />
        </svg>
      );
    default:
      return null;
  }
}
