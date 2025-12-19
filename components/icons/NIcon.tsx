import React from 'react';
import './holographic-icons.css';

interface NIconProps {
  className?: string;
  size?: number;
}

export const NIcon: React.FC<NIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon neural-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientN" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.2" />
        </linearGradient>

        <filter id="glowN">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip path for the vertical towers */}
        <clipPath id="towerClip">
           <rect x="12" y="10" width="10" height="44" />
           <rect x="42" y="10" width="10" height="44" />
        </clipPath>
      </defs>

      {/* --- BACKGROUND NETWORK MESH --- */}
      <path
        d="M 17 10 L 47 54 M 17 30 L 47 30"
        stroke="#00f3ff"
        strokeWidth="0.5"
        opacity="0.1"
        strokeDasharray="2 4"
      />

      {/* --- VERTICAL TOWERS (The Legs) --- */}
      <g filter="url(#glowN)">
        {/* Left Leg */}
        <path
          d="M 12 10 H 22 V 54 H 12 V 10"
          stroke="url(#holoGradientN)" strokeWidth="2" fill="none"
        />
        {/* Right Leg */}
        <path
          d="M 42 10 H 52 V 54 H 42 V 10"
          stroke="url(#holoGradientN)" strokeWidth="2" fill="none"
        />
      </g>

      {/* --- INTERNAL TOWER DATA (Scanners) --- */}
      <g clipPath="url(#towerClip)">
        <rect x="12" y="10" width="10" height="2" fill="#fff" opacity="0.5" className="n-scanner scan-left" />
        <rect x="42" y="10" width="10" height="2" fill="#fff" opacity="0.5" className="n-scanner scan-right" />
      </g>

      {/* --- DIAGONAL SYNAPSE (The Connection) --- */}
      <path
        id="nSynapsePath"
        d="M 17 12 L 47 52"
        stroke="#00f3ff"
        strokeWidth="3"
        fill="none"
        opacity="0.3"
      />

      {/* --- FIRING NEURONS (Particles on Diagonal) --- */}
      {/* Primary Pulse */}
      <circle r="3" fill="#fff" filter="url(#glowN)" className="n-neuron primary">
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          path="M 17 12 L 47 52"
          keyPoints="0;1"
          keyTimes="0;1"
          calcMode="linear"
        />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Secondary Pulse (Echo) */}
      <circle r="1.5" fill="#00f3ff" className="n-neuron secondary">
         <animateMotion
          dur="2s"
          begin="0.5s"
          repeatCount="indefinite"
          path="M 17 12 L 47 52"
          calcMode="linear"
        />
        <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
      </circle>

      {/* --- CONNECTION NODES --- */}
      <rect x="15" y="8" width="4" height="4" fill="#fff" className="n-node top-left" />
      <rect x="45" y="52" width="4" height="4" fill="#fff" className="n-node bot-right" />

      {/* --- GLITCH LAYER --- */}
      <path
        className="n-glitch"
        d="M 12 10 V 54 M 42 10 V 54 M 17 12 L 47 52"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

    </svg>
  );
};
