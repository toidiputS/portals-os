import React from 'react';
import './holographic-icons.css';

interface QIconProps {
  className?: string;
  size?: number;
}

export const QIcon: React.FC<QIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon quantum-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientQ" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.4" />
        </linearGradient>

        <filter id="glowQ">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* --- PROBABILITY FIELD (Background Haze) --- */}
      <circle cx="28" cy="28" r="22" fill="#00f3ff" opacity="0.05" className="q-probability-field">
        <animate attributeName="opacity" values="0.03;0.08;0.03" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* --- MAIN "O" RING (The Core) --- */}
      <circle
        className="q-ring"
        cx="28" cy="28" r="18"
        stroke="url(#holoGradientQ)"
        strokeWidth="3"
        fill="none"
        filter="url(#glowQ)"
      />

      {/* --- THE TAIL (Diagonal Escape Vent) --- */}
      <path
        className="q-tail"
        d="M 40 40 L 56 56"
        stroke="#00f3ff"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#glowQ)"
      />

      {/* Tail Arrow / Energy Point */}
      <path
        d="M 52 58 L 58 58 L 58 52"
        stroke="#00f3ff"
        strokeWidth="2"
        fill="none"
        className="q-tail-arrow"
      />

      {/* --- ESCAPING PARTICLE (Follows the tail) --- */}
      <circle r="2.5" fill="#fff" filter="url(#glowQ)" className="q-escaping-particle">
        <animateMotion
          path="M 40 40 L 56 56"
          dur="2s"
          repeatCount="indefinite"
          keyPoints="0;1;1"
          keyTimes="0;0.7;1"
          calcMode="linear"
        />
        <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.6;1" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* --- INTERNAL QUANTUM PARTICLES (Superposition) --- */}
      {/* These phase in and out of visibility */}
      <g className="q-superposition">
        <circle cx="22" cy="22" r="2" fill="#fff" className="q-particle p1" />
        <circle cx="34" cy="22" r="2" fill="#fff" className="q-particle p2" />
        <circle cx="22" cy="34" r="2" fill="#fff" className="q-particle p3" />
        <circle cx="34" cy="34" r="2" fill="#fff" className="q-particle p4" />
      </g>

      {/* --- ENTANGLEMENT LINK (Connects particles) --- */}
      <line x1="22" y1="22" x2="34" y2="34" stroke="#fff" strokeWidth="0.5" opacity="0.3" className="q-link link1" />
      <line x1="34" y1="22" x2="22" y2="34" stroke="#fff" strokeWidth="0.5" opacity="0.3" className="q-link link2" />

      {/* --- CORE NUCLEUS --- */}
      <circle cx="28" cy="28" r="4" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" />
      <circle cx="28" cy="28" r="1.5" fill="#fff" className="q-nucleus" filter="url(#glowQ)" />

      {/* --- ROTATING SCAN ARC --- */}
      <circle
        className="q-scan-arc"
        cx="28" cy="28" r="18"
        stroke="#fff"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="15 100"
        strokeLinecap="round"
        filter="url(#glowQ)"
      />

      {/* --- GLITCH LAYER --- */}
      <g className="q-glitch">
        <circle cx="28" cy="28" r="18" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M 40 40 L 56 56" stroke="#fff" strokeWidth="1" opacity="0.4" />
      </g>

    </svg>
  );
};
