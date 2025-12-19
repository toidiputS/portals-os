import React from 'react';
import './holographic-icons.css';

interface GrindIconProps {
  className?: string;
  size?: number;
}

export const GIcon: React.FC<GrindIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon grind-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientGrind" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.4" />
        </linearGradient>

        {/* Orange/Industrial gradient for machinery */}
        <linearGradient id="industrialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b00" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff9500" stopOpacity="0.8" />
        </linearGradient>

        {/* Steel/Metal gradient */}
        <linearGradient id="steelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a0a0a0" stopOpacity="1" />
          <stop offset="50%" stopColor="#606060" stopOpacity="1" />
          <stop offset="100%" stopColor="#404040" stopOpacity="1" />
        </linearGradient>

        {/* Clean/Output gradient (green) */}
        <linearGradient id="cleanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="1" />
          <stop offset="100%" stopColor="#00cc66" stopOpacity="0.8" />
        </linearGradient>

        {/* Messy/Input gradient (red/orange) */}
        <linearGradient id="messyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4444" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ff6b00" stopOpacity="0.6" />
        </linearGradient>

        <filter id="glowGrind">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowOrange">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowGreen">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* --- BACKGROUND: INDUSTRIAL GRID --- */}
      <g className="grind-grid" opacity="0.1">
        <pattern id="grindPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="8" height="8" fill="none" stroke="#00f3ff" strokeWidth="0.3" />
          <circle cx="4" cy="4" r="0.5" fill="#00f3ff" opacity="0.5" />
        </pattern>
        <rect x="0" y="0" width="64" height="64" fill="url(#grindPattern)" />
      </g>

      {/* --- MAIN GRINDING MACHINE HOUSING --- */}
      <g className="grind-machine">
        {/* Machine Body */}
        <rect
          className="grind-housing"
          x="14" y="18" width="36" height="28" rx="2"
          fill="#001a1a"
          stroke="url(#holoGradientGrind)"
          strokeWidth="2"
          filter="url(#glowGrind)"
        />

        {/* Top Intake Funnel */}
        <path
          className="grind-funnel"
          d="M 24 18 L 20 8 L 44 8 L 40 18"
          fill="#001a1a"
          stroke="url(#industrialGradient)"
          strokeWidth="1.5"
        />

        {/* Funnel Opening */}
        <rect x="22" y="6" width="20" height="4" rx="1" fill="#001a1a" stroke="#ff6b00" strokeWidth="1" />
      </g>

      {/* --- PRIMARY GRINDING GEARS --- */}
      <g className="grind-gears">
        {/* Left Gear */}
        <g className="grind-gear gear-left" transform="translate(24, 32)">
          <circle r="8" fill="#001a1a" stroke="url(#steelGradient)" strokeWidth="2" />
          {/* Gear Teeth */}
          <g className="gear-teeth">
            <rect x="-1.5" y="-10" width="3" height="4" fill="url(#steelGradient)" />
            <rect x="-1.5" y="6" width="3" height="4" fill="url(#steelGradient)" />
            <rect x="-10" y="-1.5" width="4" height="3" fill="url(#steelGradient)" />
            <rect x="6" y="-1.5" width="4" height="3" fill="url(#steelGradient)" />
            <rect x="4.5" y="-7.5" width="3" height="3" fill="url(#steelGradient)" transform="rotate(45 6 -6)" />
            <rect x="-7.5" y="4.5" width="3" height="3" fill="url(#steelGradient)" transform="rotate(45 -6 6)" />
            <rect x="4.5" y="4.5" width="3" height="3" fill="url(#steelGradient)" transform="rotate(45 6 6)" />
            <rect x="-7.5" y="-7.5" width="3" height="3" fill="url(#steelGradient)" transform="rotate(45 -6 -6)" />
          </g>
          {/* Center Hub */}
          <circle r="3" fill="url(#industrialGradient)" className="gear-hub" />
          <circle r="1" fill="#001a1a" />
        </g>

        {/* Right Gear (Counter-rotating) */}
        <g className="grind-gear gear-right" transform="translate(40, 32)">
          <circle r="8" fill="#001a1a" stroke="url(#steelGradient)" strokeWidth="2" />
          {/* Gear Teeth */}
          <g className="gear-teeth">
            <rect x="-1.5" y="-10" width="3" height="4" fill="url(#steelGradient)" />
            <rect x="-1.5" y="6" width="3" height="4" fill="url(#steelGradient)" />
            <rect x="-10" y="-1.5" width="4" height="3" fill="url(#steelGradient)" />
            <rect x="6" y="-1.5" width="4" height="3" fill="url(#steelGradient)" />
            <rect x="4.5" y="-7.5" width="3" height="3" fill="url(#steelGradient)" transform="rotate(45 6 -6)" />
            <rect x="-7.5" y="4.5" width="3" height="3" fill="url(#steelGradient)" transform="rotate(45 -6 6)" />
            <rect x="4.5" y="4.5" width="3" height="3" fill="url(#steelGradient)" transform="rotate(45 6 6)" />
            <rect x="-7.5" y="-7.5" width="3" height="3" fill="url(#steelGradient)" transform="rotate(45 -6 -6)" />
          </g>
          {/* Center Hub */}
          <circle r="3" fill="url(#industrialGradient)" className="gear-hub" />
          <circle r="1" fill="#001a1a" />
        </g>
      </g>

      {/* --- INPUT: MESSY CONTENT FALLING IN --- */}
      <g className="grind-input">
        {/* Messy Document 1 */}
        <g className="grind-messy-item item-1">
          <rect x="28" y="2" width="6" height="5" fill="url(#messyGradient)" rx="0.5" transform="rotate(15 31 4.5)" />
          <line x1="29" y1="4" x2="33" y2="3.5" stroke="#fff" strokeWidth="0.3" opacity="0.5" />
          <line x1="29" y1="5" x2="32" y2="4.8" stroke="#fff" strokeWidth="0.3" opacity="0.3" />
        </g>

        {/* Messy Document 2 */}
        <g className="grind-messy-item item-2">
          <rect x="32" y="0" width="5" height="4" fill="url(#messyGradient)" rx="0.5" transform="rotate(-10 34.5 2)" />
          <line x1="33" y1="1.5" x2="36" y2="1.3" stroke="#fff" strokeWidth="0.3" opacity="0.5" />
        </g>

        {/* Messy Text Blob */}
        <g className="grind-messy-item item-3">
          <circle cx="30" cy="12" r="2" fill="url(#messyGradient)" opacity="0.7" />
        </g>
      </g>

      {/* --- OUTPUT: CLEAN DOCUMENTS --- */}
      <g className="grind-output">
        {/* Output Chute */}
        <path
          d="M 28 46 L 26 54 L 38 54 L 36 46"
          fill="#001a1a"
          stroke="url(#cleanGradient)"
          strokeWidth="1"
        />

        {/* Clean Document 1 */}
        <g className="grind-clean-item clean-1">
          <rect x="28" y="54" width="8" height="6" rx="0.5" fill="#001a1a" stroke="url(#cleanGradient)" strokeWidth="1" />
          <line x1="30" y1="56" x2="34" y2="56" stroke="#00ff88" strokeWidth="0.5" />
          <line x1="30" y1="57.5" x2="34" y2="57.5" stroke="#00ff88" strokeWidth="0.5" />
          <line x1="30" y1="59" x2="33" y2="59" stroke="#00ff88" strokeWidth="0.5" />
        </g>

        {/* Clean Document 2 */}
        <g className="grind-clean-item clean-2">
          <rect x="20" y="56" width="6" height="5" rx="0.5" fill="#001a1a" stroke="url(#cleanGradient)" strokeWidth="1" />
          <line x1="21.5" y1="58" x2="24.5" y2="58" stroke="#00ff88" strokeWidth="0.5" />
          <line x1="21.5" y1="59.5" x2="24" y2="59.5" stroke="#00ff88" strokeWidth="0.5" />
        </g>

        {/* Clean Document 3 */}
        <g className="grind-clean-item clean-3">
          <rect x="38" y="56" width="6" height="5" rx="0.5" fill="#001a1a" stroke="url(#cleanGradient)" strokeWidth="1" />
          <line x1="39.5" y1="58" x2="42.5" y2="58" stroke="#00ff88" strokeWidth="0.5" />
          <line x1="39.5" y1="59.5" x2="42" y2="59.5" stroke="#00ff88" strokeWidth="0.5" />
        </g>
      </g>

      {/* --- GRINDING PARTICLES (Between Gears) --- */}
      <g className="grind-particles">
        <circle className="grind-particle p-1" cx="32" cy="28" r="1" fill="#ff6b00" />
        <circle className="grind-particle p-2" cx="30" cy="32" r="0.8" fill="#ff9500" />
        <circle className="grind-particle p-3" cx="34" cy="30" r="0.6" fill="#ffcc00" />
        <circle className="grind-particle p-4" cx="32" cy="34" r="0.8" fill="#ff6b00" />
        <circle className="grind-particle p-5" cx="28" cy="36" r="0.5" fill="#00ff88" />
        <circle className="grind-particle p-6" cx="36" cy="36" r="0.5" fill="#00ff88" />
      </g>

      {/* --- CONVEYOR BELT INDICATORS --- */}
      <g className="grind-conveyor">
        {/* Left side - Input conveyor */}
        <g className="conveyor-in">
          <rect x="4" y="28" width="10" height="16" rx="1" fill="#001a1a" stroke="#ff6b00" strokeWidth="0.5" opacity="0.7" />
          <line className="conveyor-line cl-1" x1="4" y1="32" x2="14" y2="32" stroke="#ff6b00" strokeWidth="0.5" strokeDasharray="2 2" />
          <line className="conveyor-line cl-2" x1="4" y1="36" x2="14" y2="36" stroke="#ff6b00" strokeWidth="0.5" strokeDasharray="2 2" />
          <line className="conveyor-line cl-3" x1="4" y1="40" x2="14" y2="40" stroke="#ff6b00" strokeWidth="0.5" strokeDasharray="2 2" />
        </g>

        {/* Right side - Output conveyor */}
        <g className="conveyor-out">
          <rect x="50" y="28" width="10" height="16" rx="1" fill="#001a1a" stroke="#00ff88" strokeWidth="0.5" opacity="0.7" />
          <line className="conveyor-line cl-4" x1="50" y1="32" x2="60" y2="32" stroke="#00ff88" strokeWidth="0.5" strokeDasharray="2 2" />
          <line className="conveyor-line cl-5" x1="50" y1="36" x2="60" y2="36" stroke="#00ff88" strokeWidth="0.5" strokeDasharray="2 2" />
          <line className="conveyor-line cl-6" x1="50" y1="40" x2="60" y2="40" stroke="#00ff88" strokeWidth="0.5" strokeDasharray="2 2" />
        </g>
      </g>

      {/* --- STATUS INDICATORS --- */}
      <g className="grind-status">
        {/* Processing Light */}
        <circle cx="8" cy="12" r="3" fill="#001a1a" stroke="#ff6b00" strokeWidth="1" />
        <circle cx="8" cy="12" r="1.5" fill="#ff6b00" className="grind-status-light" />

        {/* Counter Display */}
        <g transform="translate(50, 8)">
          <rect x="0" y="0" width="12" height="8" rx="1" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.5" />
          <text x="6" y="6" textAnchor="middle" fontSize="5" fill="#00ff88" fontFamily="monospace" className="grind-counter">247</text>
        </g>
      </g>

      {/* --- EXHAUST/STEAM --- */}
      <g className="grind-exhaust">
        <path className="exhaust-puff puff-1" d="M 8 22 Q 4 18, 6 14" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.3" />
        <path className="exhaust-puff puff-2" d="M 10 24 Q 6 20, 4 16" fill="none" stroke="#00f3ff" strokeWidth="0.8" opacity="0.2" />
        <path className="exhaust-puff puff-3" d="M 56 22 Q 60 18, 58 14" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.3" />
      </g>

      {/* --- PROGRESS BAR --- */}
      <g className="grind-progress" transform="translate(4, 58)">
        <rect x="0" y="0" width="56" height="4" rx="1" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.5" />
        <rect x="1" y="1" width="40" height="2" rx="0.5" fill="url(#cleanGradient)" className="grind-progress-fill" />
        <text x="58" y="4" fontSize="3" fill="#00ff88">72%</text>
      </g>

      {/* --- GLITCH LAYER --- */}
      <g className="grind-glitch">
        <rect x="14" y="18" width="36" height="28" rx="2" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
      </g>

    </svg>
  );
};
