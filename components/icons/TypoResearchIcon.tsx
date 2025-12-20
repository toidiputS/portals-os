import React from 'react';
import './typo-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const TypoResearchIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => {
  return (
    <svg
      className={`holo-icon research-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Magnifying glass */}
      <circle
        cx="28"
        cy="28"
        r="12"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <line
        x1="37"
        y1="37"
        x2="48"
        y2="48"
        stroke="#00f3ff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* R-E-S-E-A-R-C-H arranged in search pattern */}
      <text x="22" y="24" fontSize="5" fill="#00f3ff" opacity="0.9" fontFamily="monospace" fontWeight="bold" className="research-letter research-r1">R</text>
      <text x="28" y="22" fontSize="5" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="research-letter research-e1">E</text>
      <text x="34" y="26" fontSize="5" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="research-letter research-s">S</text>
      <text x="22" y="32" fontSize="5" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="research-letter research-e2">E</text>
      <text x="28" y="34" fontSize="5" fill="#00f3ff" opacity="0.9" fontFamily="monospace" fontWeight="bold" className="research-letter research-a">A</text>
      <text x="34" y="32" fontSize="5" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="research-letter research-r2">R</text>
      <text x="20" y="38" fontSize="5" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="research-letter research-c">C</text>
      <text x="28" y="40" fontSize="5" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="research-letter research-h">H</text>

      {/* Radar sweep */}
      <path
        d="M 28 28 L 28 16"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0.6"
        className="research-radar"
      />

      {/* Data discovery points */}
      <g className="research-data">
        <circle cx="24" cy="20" r="1" fill="#00f3ff" opacity="0" className="research-point-1" />
        <circle cx="36" cy="24" r="1" fill="#00f3ff" opacity="0" className="research-point-2" />
        <circle cx="20" cy="30" r="1" fill="#00f3ff" opacity="0" className="research-point-3" />
        <circle cx="34" cy="36" r="1" fill="#00f3ff" opacity="0" className="research-point-4" />
      </g>

      {/* Competitor comparison bars */}
      <g className="research-compare" opacity="0.5">
        <rect x="48" y="18" width="2" height="8" fill="none" stroke="#00f3ff" strokeWidth="0.8" />
        <rect x="52" y="14" width="2" height="12" fill="none" stroke="#00f3ff" strokeWidth="0.8" />

        {/* Your advantage */}
        <rect x="48" y="16" width="2" height="10" fill="#00f3ff" opacity="0.4" className="research-you" />
        <rect x="52" y="20" width="2" height="6" fill="#00f3ff" opacity="0.3" className="research-them" />

        {/* Gap indicator */}
        <path d="M 51 18 L 53 16" stroke="#00f3ff" strokeWidth="0.8" className="research-gap" />
      </g>

      {/* Scanning ring */}
      <circle cx="28" cy="28" r="8" fill="none" stroke="#00f3ff" strokeWidth="0.5" opacity="0" className="research-scan-ring" />

      {/* Discovery particles */}
      <circle r="0.8" fill="#00f3ff" className="research-particle-1" />
      <circle r="1" fill="#00f3ff" className="research-particle-2" />
      <circle r="0.8" fill="#00f3ff" className="research-particle-3" />

      {/* Insight flash at handle */}
      <circle cx="48" cy="48" r="2" fill="#00f3ff" opacity="0.4" className="research-insight" />
    </svg>
  );
};
