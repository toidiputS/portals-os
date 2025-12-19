import React from 'react';
import './holographic-icons.css';

interface OIconProps {
  className?: string;
  size?: number;
}

export const OIcon: React.FC<OIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon orbital-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientO" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="50%" stopColor="#00f3ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="1" />
        </linearGradient>

        <filter id="glowO">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* --- OUTER ORBIT RING (Slow, counter-clockwise) --- */}
      <g className="o-orbit orbit-outer">
        <circle cx="32" cy="32" r="28" fill="none" stroke="#00f3ff" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" />
        <circle cx="32" cy="4" r="2" fill="#00f3ff" opacity="0.7" />
        <circle cx="32" cy="60" r="2" fill="#00f3ff" opacity="0.7" />
      </g>

      {/* --- MAIN "O" RING --- */}
      <circle
        className="o-ring"
        cx="32" cy="32" r="20"
        stroke="url(#holoGradientO)"
        strokeWidth="4"
        fill="none"
        filter="url(#glowO)"
      />

      {/* --- LOADING SEGMENT (Sweeping arc) --- */}
      <circle
        className="o-loading-arc"
        cx="32" cy="32" r="20"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="30 100"
        filter="url(#glowO)"
      />

      {/* --- INNER ORBIT RING (Fast, clockwise) --- */}
      <g className="o-orbit orbit-inner">
        <circle cx="32" cy="32" r="12" fill="none" stroke="#00f3ff" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4" />
        <circle cx="44" cy="32" r="1.5" fill="#fff" />
        <circle cx="20" cy="32" r="1.5" fill="#fff" />
      </g>

      {/* --- REACTOR CORE --- */}
      <circle cx="32" cy="32" r="5" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" className="o-core-shell" />
      <circle cx="32" cy="32" r="2" fill="#fff" className="o-core-center" filter="url(#glowO)" />

      {/* --- CARDINAL NODES (N, S, E, W) --- */}
      <g className="o-nodes">
        <rect x="30" y="10" width="4" height="4" fill="#00f3ff" className="o-node n" />
        <rect x="30" y="50" width="4" height="4" fill="#00f3ff" className="o-node s" />
        <rect x="50" y="30" width="4" height="4" fill="#00f3ff" className="o-node e" />
        <rect x="10" y="30" width="4" height="4" fill="#00f3ff" className="o-node w" />
      </g>

      {/* --- GLITCH LAYER --- */}
      <circle
        className="o-glitch"
        cx="32" cy="32" r="20"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

    </svg>
  );
};
