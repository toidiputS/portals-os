import React from 'react';
import './typo-holo-icons-uvwx.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const TypoXRayIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => {
  return (
    <svg
      className={`holo-icon xray-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* X-Ray frame/screen */}
      <rect
        x="10"
        y="10"
        width="44"
        height="44"
        rx="2"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.4"
      />

      {/* Inner screen */}
      <rect
        x="14"
        y="14"
        width="36"
        height="36"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="0.5"
        opacity="0.3"
      />

      {/* X-R-A-Y as scan reveal */}
      <text x="18" y="30" fontSize="10" fill="#00f3ff" opacity="0.9" fontFamily="monospace" fontWeight="bold" className="xray-letter xray-x">X</text>
      <text x="28" y="28" fontSize="8" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="xray-letter xray-hyphen">-</text>
      <text x="32" y="30" fontSize="10" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="xray-letter xray-r">R</text>
      <text x="20" y="42" fontSize="10" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="xray-letter xray-a">A</text>
      <text x="32" y="42" fontSize="10" fill="#00f3ff" opacity="0.9" fontFamily="monospace" fontWeight="bold" className="xray-letter xray-y">Y</text>

      {/* Skeleton wireframe (business structure) */}
      <g className="xray-skeleton" opacity="0.4">
        {/* Spine */}
        <line x1="44" y1="18" x2="44" y2="46" stroke="#00f3ff" strokeWidth="1" />

        {/* Ribs (business layers) */}
        <line x1="40" y1="22" x2="48" y2="22" stroke="#00f3ff" strokeWidth="0.8" />
        <line x1="40" y1="28" x2="48" y2="28" stroke="#00f3ff" strokeWidth="0.8" />
        <line x1="40" y1="34" x2="48" y2="34" stroke="#00f3ff" strokeWidth="0.8" />
        <line x1="40" y1="40" x2="48" y2="40" stroke="#00f3ff" strokeWidth="0.8" />
      </g>

      {/* Scanning line */}
      <line
        x1="14"
        y1="20"
        x2="50"
        y2="20"
        stroke="#00f3ff"
        strokeWidth="2"
        opacity="0.7"
        className="xray-scan-line"
      />

      {/* Scan reveal mask */}
      <rect
        x="14"
        y="14"
        width="36"
        height="0"
        fill="#00f3ff"
        opacity="0.1"
        className="xray-reveal"
      />

      {/* Diagnostic readouts (right side) */}
      <g className="xray-diagnostics" opacity="0.5">
        <text x="50" y="18" fontSize="3" fill="#00f3ff" className="xray-diag-1">100%</text>
        <text x="50" y="26" fontSize="3" fill="#00f3ff" className="xray-diag-2">87%</text>
        <text x="50" y="34" fontSize="3" fill="#00f3ff" className="xray-diag-3">92%</text>
        <text x="50" y="42" fontSize="3" fill="#00f3ff" className="xray-diag-4">78%</text>
      </g>

      {/* Problem indicator (blinking) */}
      <g className="xray-problems">
        <circle cx="48" cy="40" r="2" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0" className="xray-problem-1" />
        <circle cx="42" cy="28" r="1.5" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0" className="xray-problem-2" />
      </g>

      {/* Data particles (analysis) */}
      <g className="xray-particles">
        <circle r="0.8" fill="#00f3ff" className="xray-particle-1" />
        <circle r="1" fill="#00f3ff" className="xray-particle-2" />
        <circle r="0.8" fill="#00f3ff" className="xray-particle-3" />
        <circle r="1" fill="#00f3ff" className="xray-particle-4" />
      </g>

      {/* Grid overlay (analysis grid) */}
      <g className="xray-grid" opacity="0.15">
        <line x1="22" y1="14" x2="22" y2="50" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="30" y1="14" x2="30" y2="50" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="38" y1="14" x2="38" y2="50" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="46" y1="14" x2="46" y2="50" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="14" y1="22" x2="50" y2="22" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="14" y1="30" x2="50" y2="30" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="14" y1="38" x2="50" y2="38" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="14" y1="46" x2="50" y2="46" stroke="#00f3ff" strokeWidth="0.5" />
      </g>

      {/* Deep scan pulse */}
      <circle cx="32" cy="32" r="8" fill="none" stroke="#00f3ff" strokeWidth="0.5" opacity="0" className="xray-deep-pulse" />

      {/* Corner brackets (medical display) */}
      <g className="xray-brackets" opacity="0.6">
        <path d="M 12 16 L 12 12 L 16 12" fill="none" stroke="#00f3ff" strokeWidth="1" />
        <path d="M 52 12 L 52 16" fill="none" stroke="#00f3ff" strokeWidth="1" />
        <path d="M 48 12 L 52 12" fill="none" stroke="#00f3ff" strokeWidth="1" />
        <path d="M 12 48 L 12 52 L 16 52" fill="none" stroke="#00f3ff" strokeWidth="1" />
        <path d="M 48 52 L 52 52 L 52 48" fill="none" stroke="#00f3ff" strokeWidth="1" />
      </g>
    </svg>
  );
};
