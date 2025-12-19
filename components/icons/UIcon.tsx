import React from 'react';
import './holographic-icons.css';

interface UIconProps {
  className?: string;
  size?: number;
}

export const UIcon: React.FC<UIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon uplink-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientU" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowU">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip path for internal containment field */}
        <clipPath id="clipU">
           <path d="M 16 10 V 42 L 26 52 H 38 L 48 42 V 10" />
        </clipPath>
      </defs>

      {/* --- BACKGROUND GUIDES --- */}
      <g opacity="0.2">
        <line x1="16" y1="10" x2="16" y2="60" stroke="#00f3ff" strokeDasharray="2 2" />
        <line x1="48" y1="10" x2="48" y2="60" stroke="#00f3ff" strokeDasharray="2 2" />
      </g>

      {/* --- THE U STRUCTURE (Vessel) --- */}
      <path
        className="u-structure"
        d="M 16 10 V 42 L 26 52 H 38 L 48 42 V 10"
        stroke="url(#holoGradientU)"
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
        filter="url(#glowU)"
      />

      {/* --- INTERNAL FIELD (Clipped) --- */}
      <g clipPath="url(#clipU)">
        {/* Background Haze */}
        <rect x="16" y="10" width="32" height="44" fill="#00f3ff" opacity="0.05" />

        {/* The Liquid/Energy Pool at bottom */}
        <path
          d="M 16 42 L 26 52 H 38 L 48 42 H 16"
          fill="#00f3ff"
          opacity="0.3"
          className="u-liquid-pool"
        />

        {/* Rising Bubbles */}
        <circle cx="24" cy="48" r="2" fill="#fff" className="u-bubble b1" />
        <circle cx="32" cy="50" r="1.5" fill="#fff" className="u-bubble b2" />
        <circle cx="40" cy="46" r="2" fill="#fff" className="u-bubble b3" />

        {/* Horizontal Scanner Beam */}
        <line
          x1="16" y1="20" x2="48" y2="20"
          stroke="#fff"
          strokeWidth="2"
          className="u-scanner-beam"
          filter="url(#glowU)"
        />
        <rect x="16" y="20" width="32" height="10" fill="url(#holoGradientU)" opacity="0.2" className="u-scanner-trail" />
      </g>

      {/* --- TOP TERMINALS --- */}
      <path d="M 12 10 H 20" stroke="#00f3ff" strokeWidth="2" />
      <path d="M 44 10 H 52" stroke="#00f3ff" strokeWidth="2" />

      {/* --- NODES --- */}
      <circle cx="16" cy="10" r="2" fill="#fff" className="u-node" />
      <circle cx="48" cy="10" r="2" fill="#fff" className="u-node" />
      <circle cx="26" cy="52" r="2" fill="#00f3ff" />
      <circle cx="38" cy="52" r="2" fill="#00f3ff" />

      {/* --- GLITCH LAYER --- */}
      <path
        className="u-glitch"
        d="M 16 10 V 42 L 26 52 H 38 L 48 42 V 10"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

    </svg>
  );
};
