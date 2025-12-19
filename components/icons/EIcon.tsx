import React from 'react';
import './holographic-icons.css';

interface EIconProps {
  className?: string;
  size?: number;
}

export const EIcon: React.FC<EIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon electric-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientE" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowE">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* --- BACKBONE (Capacitor Bank) --- */}
      {/* Thick vertical spine */}
      <rect
        className="e-spine"
        x="12" y="10" width="10" height="44"
        stroke="url(#holoGradientE)"
        strokeWidth="2"
        fill="none"
        filter="url(#glowE)"
      />

      {/* Internal Battery Cells (Animating) */}
      <g className="e-cells">
        <rect x="15" y="13" width="4" height="6" fill="#00f3ff" className="e-cell c1" />
        <rect x="15" y="22" width="4" height="6" fill="#00f3ff" className="e-cell c2" />
        <rect x="15" y="31" width="4" height="6" fill="#00f3ff" className="e-cell c3" />
        <rect x="15" y="40" width="4" height="6" fill="#00f3ff" className="e-cell c4" />
      </g>

      {/* --- THE ARMS (Electrodes) --- */}
      {/* Top Arm */}
      <path
        d="M 22 14 H 50"
        stroke="#00f3ff" strokeWidth="3" fill="none" className="e-arm" filter="url(#glowE)"
      />
      {/* Middle Arm */}
      <path
        d="M 22 32 H 42"
        stroke="#00f3ff" strokeWidth="3" fill="none" className="e-arm" filter="url(#glowE)"
      />
      {/* Bottom Arm */}
      <path
        d="M 22 50 H 50"
        stroke="#00f3ff" strokeWidth="3" fill="none" className="e-arm" filter="url(#glowE)"
      />

      {/* --- ENERGY FLOW (Current moving inside arms) --- */}
      <g className="e-flow-lines" opacity="0.8">
        <path d="M 22 14 H 50" stroke="#fff" strokeWidth="1" strokeDasharray="5 20" />
        <path d="M 22 32 H 42" stroke="#fff" strokeWidth="1" strokeDasharray="5 20" />
        <path d="M 22 50 H 50" stroke="#fff" strokeWidth="1" strokeDasharray="5 20" />
      </g>

      {/* --- SPARKS (Discharge at tips) --- */}
      <polyline
        className="e-spark spark-top"
        points="50,14 54,12 52,16 56,14"
        fill="none" stroke="#fff" strokeWidth="1.5"
      />

      <polyline
        className="e-spark spark-mid"
        points="42,32 46,30 44,34 48,32"
        fill="none" stroke="#fff" strokeWidth="1.5"
      />

      <polyline
        className="e-spark spark-bot"
        points="50,50 54,48 52,52 56,50"
        fill="none" stroke="#fff" strokeWidth="1.5"
      />

      {/* --- TERMINAL NODES --- */}
      <circle cx="22" cy="14" r="2" fill="#fff" className="e-node" />
      <circle cx="22" cy="32" r="2" fill="#fff" className="e-node" />
      <circle cx="22" cy="50" r="2" fill="#fff" className="e-node" />

      {/* --- GLITCH LAYER --- */}
      <path
        className="e-glitch"
        d="M 12 10 V 54 H 22 M 22 14 H 50 M 22 32 H 42 M 22 50 H 50"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
};
