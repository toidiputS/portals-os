import React from 'react';
import './holographic-icons.css';

interface BIconProps {
  className?: string;
  size?: number;
}

export const BIcon: React.FC<BIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon blueprint-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientBP" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.4" />
        </linearGradient>

        <filter id="glowBP">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip for internal elements */}
        <clipPath id="clipBP">
          <rect x="8" y="8" width="48" height="48" rx="2" />
        </clipPath>
      </defs>

      {/* --- DOCUMENT FRAME --- */}
      <rect
        className="bp-frame"
        x="6" y="6" width="52" height="52" rx="3"
        stroke="url(#holoGradientBP)"
        strokeWidth="2"
        fill="none"
        filter="url(#glowBP)"
      />

      {/* Folded Corner */}
      <path
        d="M 46 6 L 58 6 L 58 18"
        stroke="#00f3ff"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M 46 6 L 46 18 L 58 18"
        stroke="#00f3ff"
        strokeWidth="1.5"
        fill="#001a1a"
      />

      {/* --- GRID PATTERN (Background) --- */}
      <g clipPath="url(#clipBP)" opacity="0.3" className="bp-grid">
        {/* Vertical Lines */}
        <line x1="16" y1="8" x2="16" y2="56" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="24" y1="8" x2="24" y2="56" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="32" y1="8" x2="32" y2="56" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="40" y1="8" x2="40" y2="56" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="48" y1="8" x2="48" y2="56" stroke="#00f3ff" strokeWidth="0.5" />
        {/* Horizontal Lines */}
        <line x1="8" y1="16" x2="56" y2="16" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="8" y1="24" x2="56" y2="24" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="8" y1="32" x2="56" y2="32" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="8" y1="40" x2="56" y2="40" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="8" y1="48" x2="56" y2="48" stroke="#00f3ff" strokeWidth="0.5" />
      </g>

      {/* --- SCHEMATIC: ROTATING GEAR --- */}
      <g className="bp-gear" transform="translate(32, 32)">
        {/* Outer Gear Ring */}
        <circle r="12" stroke="#00f3ff" strokeWidth="1.5" fill="none" />
        {/* Gear Teeth */}
        <g className="bp-gear-teeth">
          <rect x="-2" y="-14" width="4" height="4" fill="#00f3ff" />
          <rect x="-2" y="10" width="4" height="4" fill="#00f3ff" />
          <rect x="-14" y="-2" width="4" height="4" fill="#00f3ff" />
          <rect x="10" y="-2" width="4" height="4" fill="#00f3ff" />
          {/* Diagonal Teeth */}
          <rect x="7" y="-11" width="4" height="4" fill="#00f3ff" transform="rotate(45 9 -9)" />
          <rect x="-11" y="7" width="4" height="4" fill="#00f3ff" transform="rotate(45 -9 9)" />
          <rect x="7" y="7" width="4" height="4" fill="#00f3ff" transform="rotate(45 9 9)" />
          <rect x="-11" y="-11" width="4" height="4" fill="#00f3ff" transform="rotate(45 -9 -9)" />
        </g>
        {/* Inner Circle */}
        <circle r="5" stroke="#00f3ff" strokeWidth="1" fill="none" />
        {/* Center Hole */}
        <circle r="2" fill="#00f3ff" className="bp-gear-center" />
      </g>

      {/* --- DIMENSION LINES --- */}
      {/* Horizontal Dimension (Top) */}
      <g className="bp-dimension dim-h">
        <line x1="12" y1="12" x2="12" y2="10" stroke="#fff" strokeWidth="1" />
        <line x1="52" y1="12" x2="52" y2="10" stroke="#fff" strokeWidth="1" />
        <line x1="12" y1="11" x2="52" y2="11" stroke="#fff" strokeWidth="0.5" strokeDasharray="2 2" />
        <text x="32" y="10" textAnchor="middle" fontSize="4" fill="#fff" opacity="0.8">40</text>
      </g>

      {/* Vertical Dimension (Left) */}
      <g className="bp-dimension dim-v">
        <line x1="10" y1="20" x2="12" y2="20" stroke="#fff" strokeWidth="1" />
        <line x1="10" y1="44" x2="12" y2="44" stroke="#fff" strokeWidth="1" />
        <line x1="11" y1="20" x2="11" y2="44" stroke="#fff" strokeWidth="0.5" strokeDasharray="2 2" />
        <text x="10" y="33" textAnchor="middle" fontSize="4" fill="#fff" opacity="0.8" transform="rotate(-90 10 33)">24</text>
      </g>

      {/* --- SCANNING BEAM --- */}
      <g clipPath="url(#clipBP)">
        <line
          className="bp-scan-beam"
          x1="6" y1="10" x2="58" y2="10"
          stroke="#fff"
          strokeWidth="2"
          filter="url(#glowBP)"
        />
        <rect
          className="bp-scan-trail"
          x="6" y="10" width="52" height="8"
          fill="url(#holoGradientBP)"
          opacity="0.2"
        />
      </g>

      {/* --- ANNOTATION MARKERS --- */}
      {/* Point A */}
      <g className="bp-marker marker-a">
        <circle cx="20" cy="26" r="2" fill="#fff" />
        <text x="20" y="23" textAnchor="middle" fontSize="4" fill="#00f3ff">A</text>
      </g>

      {/* Point B */}
      <g className="bp-marker marker-b">
        <circle cx="44" cy="38" r="2" fill="#fff" />
        <text x="44" y="35" textAnchor="middle" fontSize="4" fill="#00f3ff">B</text>
      </g>

      {/* --- CORNER BRACKETS (Technical Drawing Style) --- */}
      <path d="M 8 12 L 8 8 L 12 8" stroke="#fff" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 52 8 L 56 8 L 56 12" stroke="#fff" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 8 52 L 8 56 L 12 56" stroke="#fff" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M 52 56 L 56 56 L 56 52" stroke="#fff" strokeWidth="1" fill="none" opacity="0.6" />

      {/* --- GLITCH LAYER --- */}
      <rect
        className="bp-glitch"
        x="6" y="6" width="52" height="52" rx="3"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

    </svg>
  );
};
