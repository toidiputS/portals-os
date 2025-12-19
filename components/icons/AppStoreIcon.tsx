import React from 'react';
import './holographic-icons.css';

interface AppStoreIconProps {
  className?: string;
  size?: number;
}

export const AppStoreIcon: React.FC<AppStoreIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon app-store-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientStore" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.2" />
        </linearGradient>

        <linearGradient id="installGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fff" stopOpacity="1" />
        </linearGradient>

        <filter id="glowStore">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <clipPath id="screenClipStore">
           <rect x="16" y="18" width="32" height="32" />
        </clipPath>
      </defs>

      {/* --- BACKGROUND GRID --- */}
      <g opacity="0.15">
        <rect x="10" y="10" width="44" height="44" fill="none" stroke="#00f3ff" strokeWidth="0.5" strokeDasharray="2 2" />
      </g>

      {/* --- MAIN FRAME (The "A" Structure) --- */}
      <path
        className="as-frame"
        d="M 32 6 L 12 58 H 20 L 24 48 H 40 L 44 58 H 52 L 32 6 Z"
        stroke="url(#holoGradientStore)"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        filter="url(#glowStore)"
      />

      {/* Horizontal Bar */}
      <line x1="28" y1="36" x2="36" y2="36" stroke="#00f3ff" strokeWidth="1" opacity="0.5" />

      {/* --- APP MODULES GRID --- */}
      <g className="as-grid">
        {/* Top Row */}
        <rect x="18" y="20" width="6" height="6" rx="1" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.5" className="as-app-icon" />
        <rect x="40" y="20" width="6" height="6" rx="1" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.5" className="as-app-icon" />

        {/* Middle Row */}
        <rect x="14" y="32" width="6" height="6" rx="1" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.5" className="as-app-icon" />
        <rect x="44" y="32" width="6" height="6" rx="1" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.5" className="as-app-icon" />

        {/* Bottom Row */}
        <rect x="10" y="44" width="6" height="6" rx="1" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.5" className="as-app-icon" />
        <rect x="48" y="44" width="6" height="6" rx="1" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.5" className="as-app-icon" />
      </g>

      {/* --- ACTIVE INSTALLATION (Center) --- */}
      <g className="as-active-install" transform="translate(26, 22)">
        {/* The Icon Box */}
        <rect x="0" y="0" width="12" height="12" rx="2" fill="#001a1a" stroke="#fff" strokeWidth="1.5" filter="url(#glowStore)" />

        {/* The Download Arrow */}
        <path
          className="as-arrow"
          d="M 6 3 L 6 9 M 3 6 L 6 9 L 9 6"
          stroke="#00f3ff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data Beam */}
        <rect x="4" y="-10" width="4" height="12" fill="url(#holoGradientStore)" opacity="0.3" className="as-beam" />
      </g>

      {/* --- PROGRESS BAR (Loading) --- */}
      <g className="as-progress-container" transform="translate(22, 40)">
        <rect x="0" y="0" width="20" height="4" rx="1" fill="none" stroke="#00f3ff" strokeWidth="0.5" opacity="0.5" />
        <rect className="as-progress-bar" x="1" y="1" width="18" height="2" rx="0.5" fill="url(#installGradient)" />
      </g>

      {/* --- FLOATING PARTICLES (Data transfer) --- */}
      <circle className="as-particle p1" r="1" fill="#fff" />
      <circle className="as-particle p2" r="1" fill="#fff" />
      <circle className="as-particle p3" r="1" fill="#fff" />

      {/* --- NODES --- */}
      <circle cx="32" cy="6" r="2" fill="#fff" className="as-node top" />
      <rect x="12" y="58" width="8" height="2" fill="#00f3ff" opacity="0.6" />
      <rect x="44" y="58" width="8" height="2" fill="#00f3ff" opacity="0.6" />

      {/* --- GLITCH LAYER --- */}
      <path
        className="as-glitch"
        d="M 32 6 L 12 58 H 20 L 24 48 H 40 L 44 58 H 52 L 32 6 Z"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

    </svg>
  );
};
