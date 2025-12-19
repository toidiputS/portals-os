import React from 'react';
import './holographic-icons.css';

interface MapIconProps {
  className?: string;
  size?: number;
}

export const MapIcon: React.FC<MapIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon map-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glowMap">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* --- BACKGROUND HEX GRID --- */}
      <g stroke="#00f3ff" strokeWidth="0.5" fill="none" opacity="0.2">
         <path d="M 16 10 L 24 14 L 24 24 L 16 28 L 8 24 L 8 14 Z" />
         <path d="M 32 30 L 40 34 L 40 44 L 32 48 L 24 44 L 24 34 Z" />
         <path d="M 48 10 L 56 14 L 56 24 L 48 28 L 40 24 L 40 14 Z" />
      </g>

      {/* --- NODES --- */}
      {/* Start Node */}
      <circle cx="16" cy="19" r="3" fill="#00f3ff" className="map-node start" filter="url(#glowMap)" />

      {/* Middle Node */}
      <circle cx="32" cy="39" r="2" fill="#001a1a" stroke="#00f3ff" className="map-node mid" />

      {/* Target Node (The Payoff) */}
      <g className="map-target">
         <circle cx="56" cy="19" r="4" stroke="#fff" strokeWidth="1" fill="none" />
         <circle cx="56" cy="19" r="2" fill="#fff" filter="url(#glowMap)" />
      </g>

      {/* --- THE OPTIMIZED PATH --- */}
      {/* Visualizes "straightest line to pay" */}
      <path
        className="map-path"
        d="M 16 19 L 32 39 L 56 19"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glowMap)"
      />

      {/* --- DATA PACKET TRAVELING THE PATH --- */}
      <circle r="2" fill="#fff" filter="url(#glowMap)">
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          path="M 16 19 L 32 39 L 56 19"
          keyPoints="0;1"
          keyTimes="0;1"
        />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* --- GLITCH LAYER --- */}
      <path
        className="map-glitch"
        d="M 16 19 L 32 39 L 56 19"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
};
