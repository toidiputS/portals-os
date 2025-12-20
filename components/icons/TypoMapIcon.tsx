import React from 'react';
import './typo-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const TypoMapIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => {
  return (
    <svg
      className={`holo-icon map-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Puzzle piece frame */}
      <path
        d="M 12 20 L 20 20 Q 22 16 24 20 L 32 20 L 32 28 Q 36 30 32 32 L 32 44 L 24 44 Q 22 48 20 44 L 12 44 Z"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0.3"
      />

      {/* M - positioned as workflow node */}
      <text
        x="14"
        y="26"
        fontSize="8"
        fill="#00f3ff"
        opacity="0.7"
        fontFamily="monospace"
        fontWeight="bold"
        className="map-letter map-m"
      >
        M
      </text>

      {/* A - middle node */}
      <text
        x="20"
        y="34"
        fontSize="8"
        fill="#00f3ff"
        opacity="0.7"
        fontFamily="monospace"
        fontWeight="bold"
        className="map-letter map-a"
      >
        A
      </text>

      {/* P - end node */}
      <text
        x="14"
        y="42"
        fontSize="8"
        fill="#00f3ff"
        opacity="0.7"
        fontFamily="monospace"
        fontWeight="bold"
        className="map-letter map-p"
      >
        P
      </text>

      {/* Workflow connections */}
      <g className="map-connections" opacity="0.5">
        <line x1="18" y1="27" x2="24" y2="31" stroke="#00f3ff" strokeWidth="1" className="map-line-1" />
        <line x1="24" y1="35" x2="18" y2="39" stroke="#00f3ff" strokeWidth="1" className="map-line-2" />
      </g>

      {/* Node points */}
      <circle cx="18" cy="24" r="1.5" fill="#00f3ff" opacity="0.6" className="map-node-1" />
      <circle cx="24" cy="32" r="1.5" fill="#00f3ff" opacity="0.6" className="map-node-2" />
      <circle cx="18" cy="40" r="1.5" fill="#00f3ff" opacity="0.6" className="map-node-3" />

      {/* Flow particles */}
      <circle r="1" fill="#00f3ff" className="map-particle-1" />
      <circle r="0.8" fill="#00f3ff" className="map-particle-2" />

      {/* Right side: pathway visualization */}
      <g opacity="0.4">
        <path d="M 36 22 L 48 22" stroke="#00f3ff" strokeWidth="0.8" strokeDasharray="2 2" />
        <path d="M 36 28 L 52 28" stroke="#00f3ff" strokeWidth="0.8" strokeDasharray="2 2" />
        <path d="M 36 34 L 48 34" stroke="#00f3ff" strokeWidth="0.8" strokeDasharray="2 2" />
        <path d="M 36 40 L 52 40" stroke="#00f3ff" strokeWidth="0.8" strokeDasharray="2 2" />
      </g>

      {/* Scanning line showing workflow */}
      <line
        x1="12"
        y1="20"
        x2="32"
        y2="20"
        stroke="#00f3ff"
        strokeWidth="0.5"
        opacity="0.7"
        className="map-scan"
      />
    </svg>
  );
};
