import React from 'react';

export function GridIcon({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M4 4h4v4H4zM10 4h4v4h-4zM16 4h4v4h-4zM4 10h4v4H4zM10 10h4v4h-4zM16 10h4v4h-4zM4 16h4v4H4zM10 16h4v4h-4zM16 16h4v4h-4z" />
    </svg>
  );
}

export function PixelSkull({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M7 2h10v2h2v4h2v8h-2v4h-2v2H7v-2H5v-4H3v-8h2V4h2V2zm2 8h2v2H9v-2zm4 0h2v2h-2v-2zm-6 6h2v2h2v-2h2v2h2v-2h2v-2H7v2z" />
    </svg>
  );
}

export function PixelFlame({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M11 2h2v4h2v2h2v4h2v6H5v-6h2V8h2V6h2V2zm-4 14h10v4H7v-4zm6-8h-2v4h-2v2h6v-2h-2v-4z" />
    </svg>
  );
}

export function PixelTrophy({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M7 2h10v6h4v4h-2v2h-2v2h-2v4h4v2H5v-2h4v-4H7v-2H5v-2H3v-4h4V2zm10 2H7v6h10V4zm2 4h-2v2h2V8zM5 8h2v2H5V8zm6 8h2v4h-2v-4z" />
    </svg>
  );
}

export function PixelCrown({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M3 6h2v6h2v-4h2v-2h2v-2h2v2h2v2h2v4h2V6h2v12H3V6zm4 8H5v2h2v-2zm4 0H9v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
    </svg>
  );
}

export function PixelZap({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M15 2h-6v6H5v4h6v10h2v-6h4v-6h-4V4h2V2z" />
    </svg>
  );
}

export function PixelCross({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M7 5H5v2h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h-2v-2h-2v-2h-2v-2h-2v2h-2V5z" />
      <path d="M17 5h2v2h-2v2h-2v2h-2v2h-2v2H9v2H7v-2H5v-2h2v-2h2v-2h2v-2h2v-2h2V5z" />
    </svg>
  );
}

export function PixelCheck({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M21 5h-2v2h-2v2h-2v2h-2v2h-2v2h-2v2H7v-2H5v-2H3v-2h2v2h2v2h2v-2h2v-2h2v-2h2V9h2V7h2V5z" />
    </svg>
  );
}

export function PixelHeart({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M5 6h4v2h2v2h2v-2h2V6h4v4h2v4h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3v-4h2V6z" />
    </svg>
  );
}

export function PixelWarning({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M11 2h2v2h-2V2zm-2 4h4v2H9V6zm-2 4h8v2H7v-2zm-2 4h12v2H5v-2zm-2 4h16v2H3v-2zm0-4h2v4H3v-4zm16 0h2v4h-2v-4zM11 12h2v4h-2v-4zm0 6h2v2h-2v-2z" />
    </svg>
  );
}

export function PixelSword({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M17 2h2v2h2v2h2v4h-2v2h-2v2h-4v4h-2v4H9v2H5v2H3v-2h2v-4h4v-2h4v-4h2v-2h2v-2h2v-2h-2V4h-2V2zM7 16H5v4h4v-2H7v-2z" />
    </svg>
  );
}

export function PixelMessage({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M5 4h14v2H5V4zm14 2h2v10h-2V6zM5 6v10H3V6h2zm0 10h10v2h2v2h2v2h-2v-2h-2v-2H5v-2z" />
    </svg>
  );
}

export function PixelHome({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M11 2h2v2h2v2h2v2h2v2h2v2h-2v2h-2v8h-6v-6h-2v6H5v-8H3v-2h2V8h2V6h2V4h2V2zm4 10H9v8h2v-4h2v4h2v-8z" />
    </svg>
  );
}

export function PixelStats({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M3 20h18v2H3v-2zm2-4h4v4H5v-4zm6-8h4v12h-4V8zm6-4h4v16h-4V4z" />
    </svg>
  );
}

export function PixelImage({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zm-4-4l-4-4-4 4h8zm-6-6h2v2H9V9z" />
    </svg>
  );
}

export function PixelUsers({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M7 4h4v6H7V4zm10 4h4v6h-4V8zm-2 8H3v4h12v-4zm8 0h-6v4h6v-4zM9 10H5v2h4v-2zm8 0h-4v2h4v-2z" />
    </svg>
  );
}

export function PixelGift({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M5 8h14v14H5V8zm2 2v10h4v-10H7zm6 0v10h4v-10h-4zM9 4h2v4H9V4zm4 0h2v4h-2V4z" />
    </svg>
  );
}

export function PixelArrowRight({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M11 5h2v2h2v2h2v2h2v2h-2v2h-2v2h-2v2h-2v-2h2v-2h2v-2H5v-2h12v-2h-2V7h-2V5z" />
    </svg>
  );
}

export function PixelShare({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M15 4h8v8h-2V7.41l-8 8-2-2 8-8H15V4zM3 9v12h12v-6h-2v4H5v-8h4V9H3zM15 15h2v6H3V9h6v2H5v8h10v-4z" />
    </svg>
  );
}

export function PixelCamera({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M5 6h4v-2h6v2h4v14H5V6zm2 12h10V8H7v10zm3-8h4v6h-4v-6z" />
    </svg>
  );
}

export function PixelSend({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M3 3h2v2h2v2h2v2h2v2h2v2h-2v2h-2v2H7v2H5v2H3V3zm14 8h2v2h-2v-2zm-2 -2h2v2h-2v-2zm0 6h2v-2h-2v2z" />
      <path d="M5 11h14v2H5z" />
    </svg>
  );
}

export function PixelDownload({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M11 2h2v10h2v2h-2v2h-2v-2H9v-2h2V2zm-4 8H5v2h2v-2zm10 0h2v2h-2v-2zM5 18h14v2H5v-2z" />
    </svg>
  );
}

export function PixelTarget({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M11 2h2v4h-2V2zm0 16h2v4h-2v-4zM2 11h4v2H2v-2zm16 0h4v2h-4v-2zM9 9h6v6H9V9H9z" />
    </svg>
  );
}

export function PixelTerminal({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M2 4h20v16H2V4zm2 2v12h16V6H4zm2 2h2v2h2v2h-2v2H6v-2h2V8H6zm6 6h6v2h-6v-2z" />
    </svg>
  );
}

export function PixelCopy({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M4 2h12v4H6v12H4V2zm4 6h12v14H8V8zm2 2v10h8V10h-8z" />
    </svg>
  );
}

export function PixelRefresh({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M12 4h4v2h2v4h-2V6h-4v2H8V6H6v8H4V6h4V4h4zm-4 16h4v-2h-2v-4h2v6h4v-8h-4v8h-4v-2zm12-8V6h2v6h-2zM2 18v-6h2v6H2z" />
    </svg>
  );
}

export function PixelFingerprint({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M9 2h6v2h2v2h2v4h-2V6h-2V4H9v2H7v4H5V6h2V4h2V2zm-4 8h2v6H5v-6zm12 0h-2v8h-2v-4H9v8H7v-8h2v-2h6v2h2v-4zm0 8h2v-4h-2v4z" />
    </svg>
  );
}
