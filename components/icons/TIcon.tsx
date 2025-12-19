import React from 'react';
import './holographic-icons.css';

interface TIconProps {
  className?: string;
  size?: number;
}

export const TIcon: React.FC<TIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon terminal-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientT" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowT">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip for stem interior */}
        <clipPath id="stemClip">
          <rect x="26" y="16" width="12" height="42" />
        </clipPath>
      </defs>

      {/* --- BROADCAST WAVES (Emanating from top bar) --- */}
      <g className="t-waves" opacity="0.5">
        <path d="M 10 8 Q 32 -4 54 8" fill="none" stroke="#00f3ff" strokeWidth="1" className="t-wave w1" />
        <path d="M 14 4 Q 32 -6 50 4" fill="none" stroke="#00f3ff" strokeWidth="1" className="t-wave w2" />
        <path d="M 18 0 Q 32 -8 46 0" fill="none" stroke="#00f3ff" strokeWidth="1" className="t-wave w3" />
      </g>

      {/* --- THE TOP BAR (Emitter) --- */}
      <rect
        x="8" y="10" width="48" height="8"
        stroke="url(#holoGradientT)"
        strokeWidth="2"
        fill="none"
        filter="url(#glowT)"
        className="t-top-bar"
      />

      {/* Emitter Nodes on the bar */}
      <circle cx="14" cy="14" r="2" fill="#00f3ff" className="t-emitter-node en1" />
      <circle cx="32" cy="14" r="2" fill="#00f3ff" className="t-emitter-node en2" />
      <circle cx="50" cy="14" r="2" fill="#00f3ff" className="t-emitter-node en3" />

      {/* --- THE STEM (Mast/Tower) --- */}
      <rect
        x="26" y="16" width="12" height="42"
        stroke="url(#holoGradientT)"
        strokeWidth="2"
        fill="none"
        filter="url(#glowT)"
        className="t-stem"
      />

      {/* Internal Data Flow (Rising blocks inside stem) */}
      <g clipPath="url(#stemClip)" className="t-data-flow">
        <rect x="28" y="50" width="8" height="6" fill="#fff" opacity="0.7" className="t-data-block db1" />
        <rect x="28" y="38" width="8" height="6" fill="#fff" opacity="0.7" className="t-data-block db2" />
        <rect x="28" y="26" width="8" height="6" fill="#fff" opacity="0.7" className="t-data-block db3" />
      </g>

      {/* --- BASE ANCHOR --- */}
      <rect x="22" y="56" width="20" height="4" fill="#00f3ff" className="t-base" />

      {/* --- CONNECTION NODES --- */}
      <circle cx="26" cy="18" r="2" fill="#fff" className="t-node n1" />
      <circle cx="38" cy="18" r="2" fill="#fff" className="t-node n2" />

      {/* --- GLITCH LAYER --- */}
      <g className="t-glitch">
        <rect x="8" y="10" width="48" height="8" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
        <rect x="26" y="16" width="12" height="42" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
      </g>

    </svg>
  );
};
