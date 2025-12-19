import React from 'react';
import './holographic-icons.css';

interface LIconProps {
  className?: string;
  size?: number;
}

export const LIcon: React.FC<LIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon laser-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientL" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.9" />
        </linearGradient>

        <filter id="glowL">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip for the vertical housing */}
        <clipPath id="housingClip">
             <path d="M 18 10 H 30 V 40 L 40 50 V 54 H 18 V 10" />
        </clipPath>
      </defs>

      {/* --- VERTICAL HOUSING (The Generator) --- */}
      {/* Chamfered corner shape */}
      <path
        className="l-structure"
        d="M 18 10 H 30 V 40 L 40 50 V 54 H 18 V 10"
        stroke="url(#holoGradientL)"
        strokeWidth="2"
        fill="none"
        filter="url(#glowL)"
      />

      {/* Internal Power Level (Animated Bar) */}
      <rect
        clipPath="url(#housingClip)"
        x="18" y="10" width="12" height="44"
        fill="#00f3ff" opacity="0.3"
        className="l-power-level"
      />

      {/* Internal Grid Lines */}
      <g clipPath="url(#housingClip)" opacity="0.4">
        <line x1="18" y1="20" x2="30" y2="20" stroke="#fff" strokeWidth="1" />
        <line x1="18" y1="30" x2="30" y2="30" stroke="#fff" strokeWidth="1" />
        <line x1="18" y1="40" x2="30" y2="40" stroke="#fff" strokeWidth="1" />
      </g>

      {/* --- THE HORIZONTAL BEAM (The Leg of the L) --- */}
      <line
        className="l-beam"
        x1="38" y1="52" x2="60" y2="52"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#glowL)"
      />

      {/* Beam Aura */}
      <line
        x1="38" y1="52" x2="60" y2="52"
        stroke="#00f3ff"
        strokeWidth="6"
        opacity="0.3"
        filter="url(#glowL)"
        className="l-beam-aura"
      />

      {/* --- CORNER REFLECTOR --- */}
      {/* Where vertical meets horizontal */}
      <path
        d="M 30 40 L 40 50 L 30 50 Z"
        fill="#00f3ff"
        className="l-corner-prism"
      />

      {/* --- TARGET RETICLE (End of beam) --- */}
      <g className="l-target" transform="translate(60, 52)">
        <circle r="4" stroke="#00f3ff" strokeWidth="1" fill="none" opacity="0.6" />
        <line x1="-6" y1="0" x2="-2" y2="0" stroke="#fff" strokeWidth="1" />
        <line x1="2" y1="0" x2="6" y2="0" stroke="#fff" strokeWidth="1" />
        <line x1="0" y1="-6" x2="0" y2="-2" stroke="#fff" strokeWidth="1" />
        <line x1="0" y1="2" x2="0" y2="6" stroke="#fff" strokeWidth="1" />
      </g>

      {/* --- PARTICLES --- */}
      <circle cx="24" cy="15" r="1.5" fill="#fff" className="l-particle-drop" />

      {/* --- NODES --- */}
      <rect x="16" y="8" width="4" height="4" fill="#fff" className="l-node top" />
      <rect x="16" y="52" width="4" height="4" fill="#fff" className="l-node bot" />

      {/* --- GLITCH LAYER --- */}
      <path
        className="l-glitch"
        d="M 18 10 H 30 V 40 L 40 50 V 54 H 18 V 10 M 38 52 H 60"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

    </svg>
  );
};
