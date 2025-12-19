import React from 'react';
import './holographic-icons.css';

interface IIconProps {
  className?: string;
  size?: number;
}

export const IIcon: React.FC<IIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon i-hologram ${className}`}
      width={size}
      height={size}
      viewBox="0 0 100 150"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientI" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.15" />
        </linearGradient>

        <filter id="glowI">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* --- Background Glow --- */}
      <rect x="37.5" y="0" width="25" height="150" fill="url(#holoGradientI)" opacity="0.1">
        <animate attributeName="opacity" values="0.05;0.15;0.05" dur="3s" repeatCount="indefinite" />
      </rect>

      {/* --- The Letter 'I' Construction --- */}
      {/* The Vertical Stem */}
      <rect
        x="37.5" y="25" width="25" height="100"
        fill="rgba(0, 243, 255, 0.15)"
        stroke="rgba(0, 243, 255, 0.6)"
        strokeWidth="2"
        filter="url(#glowI)"
        className="i-stem"
      />

      {/* The Top and Bottom Bars (Serifs) - Makes it look like an I */}
      <rect
        x="20" y="23" width="60" height="4"
        fill="rgba(0, 243, 255, 0.15)"
        stroke="rgba(0, 243, 255, 0.6)"
        strokeWidth="2"
        filter="url(#glowI)"
        className="i-serif"
      />

      <rect
        x="20" y="123" width="60" height="4"
        fill="rgba(0, 243, 255, 0.15)"
        stroke="rgba(0, 243, 255, 0.6)"
        strokeWidth="2"
        filter="url(#glowI)"
        className="i-serif"
      />

      {/* --- Scanline Effect (The moving lines) --- */}
      <rect
        x="15" y="15" width="70" height="4"
        fill="rgba(0, 243, 255, 0.5)"
        opacity="0.3"
        className="i-scanlines"
      />

      {/* --- The Projection Base (Optional light source) --- */}
      <ellipse cx="50" cy="140" rx="20" ry="5" fill="#000" stroke="#333" strokeWidth="1" />

      {/* --- The Light Beam --- */}
      <polygon
        points="40,140 60,140 55,10 45,10"
        fill="rgba(0, 243, 255, 0.1)"
        filter="url(#glowI)"
        className="i-beam"
      />

    </svg>
  );
};
