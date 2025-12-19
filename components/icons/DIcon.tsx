import React from 'react';
import './holographic-icons.css';

interface DIconProps {
  className?: string;
  size?: number;
}

export const DIcon: React.FC<DIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon data-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientD" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.2" />
        </linearGradient>

        <filter id="glowD">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* The D Shape used for clipping internal animations */}
        <clipPath id="clipD">
          <path d="M 18 10 H 36 L 48 22 V 42 L 36 54 H 18 V 10" />
        </clipPath>
      </defs>

      {/* --- BACKBONE (Spine) --- */}
      {/* The vertical line acts as the data bus */}
      <line
        x1="14" y1="8" x2="14" y2="56"
        stroke="#00f3ff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* --- THE MAIN "D" CHASSIS --- */}
      <path
        className="d-structure"
        d="M 18 10 H 36 L 48 22 V 42 L 36 54 H 18 V 10"
        stroke="url(#holoGradientD)"
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
        filter="url(#glowD)"
      />

      {/* --- INTERNAL DATA STACK (Clipped) --- */}
      <g clipPath="url(#clipD)">
        {/* Horizontal Platter Lines */}
        <g className="d-platters">
            <line x1="18" y1="20" x2="48" y2="20" stroke="#00f3ff" strokeWidth="1" opacity="0.4" />
            <line x1="18" y1="32" x2="48" y2="32" stroke="#00f3ff" strokeWidth="1" opacity="0.4" />
            <line x1="18" y1="44" x2="48" y2="44" stroke="#00f3ff" strokeWidth="1" opacity="0.4" />
        </g>

        {/* The Scanner Bar (Moves Left to Right) */}
        <rect
            className="d-scanner"
            x="18" y="10" width="4" height="44"
            fill="#fff"
            opacity="0.6"
        />
      </g>

      {/* --- CORNER NODES --- */}
      <circle cx="36" cy="10" r="2" className="d-node node-1" />
      <circle cx="48" cy="22" r="2" className="d-node node-2" />
      <circle cx="48" cy="42" r="2" className="d-node node-3" />
      <circle cx="36" cy="54" r="2" className="d-node node-4" />

      {/* --- DATA TRANSFER PARTICLES --- */}
      {/* Moving up/down the spine */}
      <circle cx="14" cy="54" r="1.5" fill="#fff" className="d-particle p-up" />
      <circle cx="14" cy="10" r="1.5" fill="#fff" className="d-particle p-down" />

      {/* --- GLITCH LAYER --- */}
      <path
        className="d-glitch"
        d="M 18 10 H 36 L 48 22 V 42 L 36 54 H 18 V 10"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

    </svg>
  );
};
