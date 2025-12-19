import React from 'react';
import './holographic-icons.css';

interface YIconProps {
  className?: string;
  size?: number;
}

export const YIcon: React.FC<YIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon yield-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientY" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="1" />
        </linearGradient>

        <filter id="glowY">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* --- BACKGROUND GUIDES --- */}
      <g opacity="0.15" stroke="#00f3ff" strokeWidth="0.5">
        <line x1="32" y1="0" x2="32" y2="64" />
        <line x1="10" y1="10" x2="32" y2="32" strokeDasharray="2 2" />
        <line x1="54" y1="10" x2="32" y2="32" strokeDasharray="2 2" />
      </g>

      {/* --- THE Y STRUCTURE --- */}
      {/* Left Arm */}
      <path
        id="yLeftArm"
        className="y-arm arm-left"
        d="M 10 10 L 32 34"
        stroke="url(#holoGradientY)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        filter="url(#glowY)"
      />

      {/* Right Arm */}
      <path
        id="yRightArm"
        className="y-arm arm-right"
        d="M 54 10 L 32 34"
        stroke="url(#holoGradientY)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        filter="url(#glowY)"
      />

      {/* Vertical Stem */}
      <path
        id="yStem"
        className="y-stem"
        d="M 32 34 V 56"
        stroke="#00f3ff"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        filter="url(#glowY)"
      />

      {/* --- CENTER JUNCTION (The Splitter) --- */}
      <circle cx="32" cy="34" r="5" fill="#001a1a" stroke="#00f3ff" strokeWidth="1.5" className="y-junction-ring" />
      <circle cx="32" cy="34" r="2" fill="#fff" className="y-junction-core" filter="url(#glowY)" />

      {/* --- DATA PACKET (Descends stem, splits at junction) --- */}
      {/* Incoming Packet (travels up the stem to junction) */}
      <rect x="30" y="0" width="4" height="6" rx="1" fill="#fff" filter="url(#glowY)" className="y-packet-in" />

      {/* Split Packet Left (travels up left arm) */}
      <circle r="2.5" fill="#fff" filter="url(#glowY)" className="y-packet-left">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path="M 32 34 L 10 10"
          keyPoints="0;0;1;1"
          keyTimes="0;0.5;0.85;1"
          calcMode="linear"
        />
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.55;0.8;1" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Split Packet Right (travels up right arm) */}
      <circle r="2.5" fill="#fff" filter="url(#glowY)" className="y-packet-right">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path="M 32 34 L 54 10"
          keyPoints="0;0;1;1"
          keyTimes="0;0.5;0.85;1"
          calcMode="linear"
        />
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.55;0.8;1" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* --- TERMINAL NODES --- */}
      {/* Top Left */}
      <path d="M 6 8 L 10 10 L 6 12" stroke="#00f3ff" strokeWidth="2" fill="none" />
      <circle cx="10" cy="10" r="2" fill="#fff" className="y-node n-left" />

      {/* Top Right */}
      <path d="M 58 8 L 54 10 L 58 12" stroke="#00f3ff" strokeWidth="2" fill="none" />
      <circle cx="54" cy="10" r="2" fill="#fff" className="y-node n-right" />

      {/* Bottom */}
      <rect x="28" y="56" width="8" height="4" fill="#00f3ff" className="y-node n-bottom" />

      {/* --- GLITCH LAYER --- */}
      <path
        className="y-glitch"
        d="M 10 10 L 32 34 L 54 10 M 32 34 V 56"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

    </svg>
  );
};
