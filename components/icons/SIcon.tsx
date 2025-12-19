import React from 'react';
import './holographic-icons.css';

interface SIconProps {
  className?: string;
  size?: number;
}

export const SIcon: React.FC<SIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon s-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientS" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.8" />
        </linearGradient>

        <filter id="glowS">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip path to keep scanlines inside the S shape */}
        <clipPath id="clipS">
             <path d="M 48 16 H 22 C 18 16 16 18 16 22 V 26 C 16 30 18 32 22 32 H 42 C 46 32 48 34 48 38 V 42 C 48 46 46 48 42 48 H 16" />
        </clipPath>
      </defs>

      {/* --- BACKGROUND GLOW --- */}
      <circle cx="32" cy="32" r="25" fill="url(#holoGradientS)" opacity="0.05">
        <animate attributeName="opacity" values="0.05;0.1;0.05" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* --- MAIN STRUCTURE (The S) --- */}
      {/* Defined as a techy, boxy S with rounded corners */}
      <path
        id="sPath"
        className="holo-s-structure"
        d="M 48 16 H 22 C 18 16 16 18 16 22 V 26 C 16 30 18 32 22 32 H 42 C 46 32 48 34 48 38 V 42 C 48 46 46 48 42 48 H 16"
        stroke="url(#holoGradientS)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glowS)"
      />

      {/* --- INTERIOR SCANLINES (Clipped to S) --- */}
      <g clipPath="url(#clipS)" opacity="0.5">
         <line x1="0" y1="0" x2="64" y2="0" stroke="#fff" strokeWidth="2" className="s-scanline" />
      </g>

      {/* --- ANIMATED DATA PACKET (Travels the path) --- */}
      <circle r="3" fill="#fff" filter="url(#glowS)">
        <animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1">
          <mpath href="#sPath" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* --- DECORATIVE NODES --- */}
      {/* Start Point */}
      <circle cx="48" cy="16" r="2" fill="#00f3ff" className="s-node" />
      {/* End Point */}
      <circle cx="16" cy="48" r="2" fill="#00f3ff" className="s-node" />

      {/* Corner Nodes */}
      <circle cx="16" cy="22" r="1.5" fill="#00f3ff" opacity="0.6" />
      <circle cx="48" cy="42" r="1.5" fill="#00f3ff" opacity="0.6" />

      {/* --- GLITCH / GHOST EFFECT --- */}
      <path
        className="holo-s-glitch"
        d="M 48 16 H 22 C 18 16 16 18 16 22 V 26 C 16 30 18 32 22 32 H 42 C 46 32 48 34 48 38 V 42 C 48 46 46 48 42 48 H 16"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />

      {/* --- ORBITING PARTICLES --- */}
      {/* These rotate around the center */}
      <g className="s-orbit">
         <circle cx="32" cy="10" r="1" fill="#00f3ff" opacity="0.8" />
         <circle cx="32" cy="54" r="1" fill="#00f3ff" opacity="0.8" />
         <circle cx="10" cy="32" r="1" fill="#00f3ff" opacity="0.8" />
         <circle cx="54" cy="32" r="1" fill="#00f3ff" opacity="0.8" />
      </g>

    </svg>
  );
};
