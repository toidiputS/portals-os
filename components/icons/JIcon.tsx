import React from 'react';
import './holographic-icons.css';

interface JIconProps {
  className?: string;
  size?: number;
}

export const JIcon: React.FC<JIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon jet-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientJ" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="1" />
        </linearGradient>

        <filter id="glowJ">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip path for internal flow */}
        <clipPath id="clipJ">
          <path d="M 46 10 V 42 L 38 52 H 22 L 14 44 V 36 H 22 V 42 H 36 L 38 40 V 10 H 46 Z" />
        </clipPath>
      </defs>

      {/* --- BACKGROUND GUIDES --- */}
      <line x1="42" y1="8" x2="42" y2="60" stroke="#00f3ff" strokeWidth="1" opacity="0.2" strokeDasharray="4 4" />

      {/* --- THE J STRUCTURE (Outer Shell) --- */}
      {/* Angular/Chamfered style */}
      <path
        className="j-structure"
        d="M 46 10 V 42 L 38 52 H 22 L 14 44 V 36"
        stroke="url(#holoGradientJ)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="square"
        strokeLinejoin="round"
        filter="url(#glowJ)"
      />

      {/* --- TOP CAP (Serif) --- */}
      <path
        d="M 36 10 H 52"
        stroke="#00f3ff"
        strokeWidth="3"
        className="j-cap"
      />

      {/* --- INTERNAL FLOW (The Conduit) --- */}
      <g clipPath="url(#clipJ)">
         {/* Background fill */}
         <path d="M 46 10 V 42 L 38 52 H 22 L 14 44 V 36 H 46" fill="#00f3ff" opacity="0.1" />

         {/* Rising Bubbles / Data Blocks */}
         <g className="j-flow-particles">
            <rect x="38" y="45" width="6" height="6" fill="#fff" opacity="0.6" className="j-particle p1" />
            <rect x="38" y="30" width="6" height="6" fill="#fff" opacity="0.6" className="j-particle p2" />
            <rect x="38" y="15" width="6" height="6" fill="#fff" opacity="0.6" className="j-particle p3" />
         </g>
      </g>

      {/* --- CORE LINE (The Path) --- */}
      <path
        className="j-core-line"
        d="M 18 36 V 42 L 24 48 H 34 L 42 38 V 10"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        strokeDasharray="4 4"
        opacity="0.5"
      />

      {/* --- BASE NODES --- */}
      <circle cx="14" cy="36" r="2" fill="#fff" className="j-node node-start" />
      <circle cx="38" cy="52" r="2" fill="#fff" className="j-node node-curve" />
      <circle cx="46" cy="10" r="2" fill="#fff" className="j-node node-end" />

      {/* --- GLITCH LAYER --- */}
      <path
        className="j-glitch"
        d="M 46 10 V 42 L 38 52 H 22 L 14 44 V 36"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

    </svg>
  );
};
