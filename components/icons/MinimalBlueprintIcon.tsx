import React from 'react';
import './minimal-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const MinimalBlueprintIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      className={`holo-icon blueprint-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid structure */}
      <g opacity="0.3">
        <line x1="16" y1="10" x2="16" y2="38" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="24" y1="10" x2="24" y2="38" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="32" y1="10" x2="32" y2="38" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="10" y1="16" x2="38" y2="16" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="10" y1="24" x2="38" y2="24" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="10" y1="32" x2="38" y2="32" stroke="#00f3ff" strokeWidth="0.5" />
      </g>

      {/* Main blueprint frame */}
      <rect
        x="10"
        y="10"
        width="28"
        height="28"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Strategy blocks */}
      <rect x="14" y="14" width="6" height="6" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.5" />
      <rect x="22" y="14" width="6" height="6" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.5" />
      <rect x="30" y="14" width="6" height="6" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.5" />

      {/* Scanning line */}
      <line
        x1="10"
        y1="12"
        x2="38"
        y2="12"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0.8"
        className="blueprint-scan"
      />

      {/* Corner markers */}
      <circle cx="10" cy="10" r="1" fill="#00f3ff" opacity="0.8" />
      <circle cx="38" cy="10" r="1" fill="#00f3ff" opacity="0.8" />
      <circle cx="10" cy="38" r="1" fill="#00f3ff" opacity="0.8" />
      <circle cx="38" cy="38" r="1" fill="#00f3ff" opacity="0.8" />
    </svg>
  );
};
