import React from 'react';
import './holographic-icons.css';

interface RIconProps {
  className?: string;
  size?: number;
}

export const RIcon: React.FC<RIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon router-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientR" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.4" />
        </linearGradient>

        <filter id="glowR">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* --- THE VERTICAL SPINE --- */}
      <path
        className="r-spine"
        d="M 14 10 V 54"
        stroke="url(#holoGradientR)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        filter="url(#glowR)"
      />

      {/* --- THE LOOP (Bowl) --- */}
      {/* Chamfered/Angular style */}
      <path
        id="rLoopPath"
        className="r-loop"
        d="M 14 10 H 36 L 48 20 V 28 L 36 38 H 14"
        stroke="url(#holoGradientR)"
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
        filter="url(#glowR)"
      />

      {/* --- LOOP INTERIOR FILL --- */}
      <path
        d="M 14 10 H 36 L 48 20 V 28 L 36 38 H 14 Z"
        fill="#00f3ff"
        opacity="0.05"
      />

      {/* --- DATA FLOW AROUND THE LOOP --- */}
      <circle r="2.5" fill="#fff" filter="url(#glowR)" className="r-loop-packet">
        <animateMotion
          dur="2.5s"
          repeatCount="indefinite"
          path="M 14 10 H 36 L 48 20 V 28 L 36 38 H 14"
        />
      </circle>

      {/* --- THE KICK LEG (Output Channel) --- */}
      <path
        id="rLegPath"
        className="r-leg"
        d="M 28 38 L 50 58"
        stroke="#00f3ff"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        filter="url(#glowR)"
      />

      {/* --- ESCAPING PARTICLE (Down the leg) --- */}
      <circle r="2" fill="#fff" filter="url(#glowR)" className="r-leg-packet">
        <animateMotion
          dur="2.5s"
          repeatCount="indefinite"
          path="M 28 38 L 50 58"
          keyPoints="0;0;1;1"
          keyTimes="0;0.55;0.9;1"
          calcMode="linear"
        />
        <animate
          attributeName="opacity"
          values="0;0;1;1;0"
          keyTimes="0;0.55;0.6;0.85;1"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </circle>

      {/* --- JUNCTION NODE (Spine & Leg Meet) --- */}
      <circle cx="28" cy="38" r="3" fill="#001a1a" stroke="#00f3ff" strokeWidth="1.5" />
      <circle cx="28" cy="38" r="1.5" fill="#fff" className="r-junction-core" filter="url(#glowR)" />

      {/* --- TERMINAL NODES --- */}
      <rect x="10" y="8" width="8" height="4" fill="#00f3ff" className="r-node top" />
      <rect x="10" y="52" width="8" height="4" fill="#00f3ff" className="r-node bot" />

      {/* Leg output node */}
      <path d="M 48 56 L 54 56 L 54 62 L 48 62 L 42 59 Z" fill="#00f3ff" className="r-node output" />

      {/* --- GLITCH LAYER --- */}
      <path
        className="r-glitch"
        d="M 14 10 V 54 M 14 10 H 36 L 48 20 V 28 L 36 38 H 14 M 28 38 L 50 58"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

    </svg>
  );
};
