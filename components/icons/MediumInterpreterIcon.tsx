import React from 'react';
import './medium-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const MediumInterpreterIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      className={`holo-icon interpreter-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Funnel/filter shape */}
      <path
        d="M 12 12 L 22 24 L 22 36"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path
        d="M 12 12 L 32 12 L 22 24"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Chaotic input (left side) - static */}
      <g className="interpreter-chaos">
        <circle cx="8" cy="14" r="0.8" fill="#00f3ff" opacity="0.5" />
        <circle cx="10" cy="18" r="0.6" fill="#00f3ff" opacity="0.4" />
        <circle cx="6" cy="20" r="0.7" fill="#00f3ff" opacity="0.5" />
        <circle cx="9" cy="22" r="0.5" fill="#00f3ff" opacity="0.4" />
        <line x1="8" y1="14" x2="10" y2="18" stroke="#00f3ff" strokeWidth="0.3" opacity="0.3" />
        <line x1="6" y1="20" x2="9" y2="22" stroke="#00f3ff" strokeWidth="0.3" opacity="0.3" />
      </g>

      {/* Organized output (right side) */}
      <g className="interpreter-structure" opacity="0.6">
        <line x1="26" y1="28" x2="38" y2="28" stroke="#00f3ff" strokeWidth="1" />
        <line x1="26" y1="32" x2="36" y2="32" stroke="#00f3ff" strokeWidth="1" />
        <line x1="26" y1="36" x2="38" y2="36" stroke="#00f3ff" strokeWidth="1" />

        <circle cx="25" cy="28" r="0.8" fill="#00f3ff" />
        <circle cx="25" cy="32" r="0.8" fill="#00f3ff" />
        <circle cx="25" cy="36" r="0.8" fill="#00f3ff" />
      </g>

      {/* Particles being organized - static positions */}
      <g className="interpreter-particles">
        <circle cx="14" cy="20" r="1" fill="#00f3ff" />
        <circle cx="18" cy="26" r="0.8" fill="#00f3ff" />
        <circle cx="20" cy="30" r="1" fill="#00f3ff" />
        <circle cx="24" cy="34" r="0.8" fill="#00f3ff" />
      </g>

      {/* Processing indicator */}
      <circle cx="22" cy="24" r="3" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.4" />
      <circle cx="22" cy="24" r="1.5" fill="#00f3ff" opacity="0.6" className="interp-pulse" />

      {/* Scanning line */}
      <line
        x1="22"
        y1="14"
        x2="22"
        y2="36"
        stroke="#00f3ff"
        strokeWidth="0.5"
        opacity="0.6"
        className="interp-scan"
      />
    </svg>
  );
};
