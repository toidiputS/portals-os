import React from 'react';
import './holographic-icons.css';

interface FileViewerIconProps {
  className?: string;
  size?: number;
}

export const FileViewerIcon: React.FC<FileViewerIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon file-viewer-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientViewer" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient id="beamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0" />
          <stop offset="50%" stopColor="#00f3ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.5" />
        </linearGradient>

        <filter id="glowViewer">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <clipPath id="screenClip">
          <rect x="10" y="8" width="44" height="32" />
        </clipPath>
      </defs>

      {/* --- BACKGROUND GRID --- */}
      <g opacity="0.1">
        <rect x="8" y="6" width="48" height="36" fill="none" stroke="#00f3ff" strokeDasharray="4 4" />
      </g>

      {/* --- BASE FILE ( The Source ) --- */}
      <g className="fv-base" transform="translate(0, 4)">
        <path
          d="M 22 46 H 42 L 46 50 V 58 H 18 V 50 L 22 46"
          stroke="url(#holoGradientViewer)"
          strokeWidth="2"
          fill="#001a1a"
          filter="url(#glowViewer)"
        />
        {/* Eye Icon on Base */}
        <g transform="translate(32, 53)">
          <path d="M -6 0 Q 0 -5 6 0 Q 0 5 -6 0" stroke="#00f3ff" strokeWidth="1" fill="none" />
          <circle r="1.5" fill="#fff" className="fv-eye-pupil" />
        </g>
      </g>

      {/* --- PROJECTION BEAM --- */}
      <path
        className="fv-beam"
        d="M 18 46 L 8 40 L 56 40 L 46 46 Z"
        fill="url(#beamGradient)"
      />

      <path
        className="fv-beam-lines"
        d="M 18 46 L 8 40 M 46 46 L 56 40 M 32 46 L 32 40"
        stroke="#00f3ff"
        strokeWidth="0.5"
        opacity="0.4"
      />

      {/* --- MAIN VIEWER SCREEN (Floating) --- */}
      <g className="fv-screen">
        {/* Screen Frame */}
        <rect
          x="8" y="6" width="48" height="34" rx="2"
          stroke="url(#holoGradientViewer)"
          strokeWidth="1.5"
          fill="#001a1a"
          fillOpacity="0.8"
          filter="url(#glowViewer)"
        />

        {/* Screen Content */}
        <g clipPath="url(#screenClip)">
          {/* Header Bar */}
          <rect x="12" y="10" width="40" height="4" rx="1" fill="#00f3ff" opacity="0.2" />
          <rect x="12" y="10" width="10" height="4" rx="1" fill="#00f3ff" opacity="0.4" />

          {/* Image Placeholder */}
          <rect x="12" y="18" width="16" height="16" rx="1" stroke="#00f3ff" strokeWidth="1" fill="none" opacity="0.5" />
          <line x1="12" y1="18" x2="28" y2="34" stroke="#00f3ff" strokeWidth="0.5" opacity="0.3" />
          <line x1="28" y1="18" x2="12" y2="34" stroke="#00f3ff" strokeWidth="0.5" opacity="0.3" />

          {/* Text Lines (Loading) */}
          <rect x="32" y="18" width="20" height="2" fill="#fff" className="fv-line l1" />
          <rect x="32" y="23" width="16" height="2" fill="#00f3ff" className="fv-line l2" opacity="0.7" />
          <rect x="32" y="28" width="18" height="2" fill="#00f3ff" className="fv-line l3" opacity="0.7" />
          <rect x="32" y="33" width="12" height="2" fill="#00f3ff" className="fv-line l4" opacity="0.7" />
        </g>

        {/* Corner Brackets */}
        <path d="M 6 10 L 4 10 L 4 4 L 10 4 L 10 6" fill="none" stroke="#fff" strokeWidth="1" opacity="0.6" />
        <path d="M 58 10 L 60 10 L 60 4 L 54 4 L 54 6" fill="none" stroke="#fff" strokeWidth="1" opacity="0.6" />
        <path d="M 6 36 L 4 36 L 4 42 L 10 42 L 10 40" fill="none" stroke="#fff" strokeWidth="1" opacity="0.6" />
        <path d="M 58 36 L 60 36 L 60 42 L 54 42 L 54 40" fill="none" stroke="#fff" strokeWidth="1" opacity="0.6" />
      </g>

      {/* --- SCANNING LINE (On Screen) --- */}
      <line
        className="fv-scan-line"
        x1="8" y1="6" x2="56" y2="6"
        stroke="#fff"
        strokeWidth="1"
        opacity="0.8"
        filter="url(#glowViewer)"
      />

      {/* --- STATUS NODES --- */}
      <circle cx="32" cy="6" r="2" fill="#fff" className="fv-node top" />
      <circle cx="8" cy="22" r="1.5" fill="#00f3ff" className="fv-node side" />
      <circle cx="56" cy="22" r="1.5" fill="#00f3ff" className="fv-node side" />

      {/* --- GLITCH LAYER --- */}
      <path
        className="fv-glitch"
        d="M 8 6 H 56 V 40 H 8 V 6 M 22 46 H 42"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

    </svg>
  );
};
