import React from 'react';
import './minimal-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const MinimalDraftIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      className={`holo-icon draft-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Document outline */}
      <path
        d="M 14 10 L 14 38 L 34 38 L 34 16 L 28 10 Z"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Folded corner */}
      <path
        d="M 28 10 L 28 16 L 34 16"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Text lines */}
      <g opacity="0.5">
        <line x1="18" y1="20" x2="30" y2="20" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="18" y1="23" x2="28" y2="23" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="18" y1="26" x2="30" y2="26" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="18" y1="29" x2="26" y2="29" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="18" y1="32" x2="30" y2="32" stroke="#00f3ff" strokeWidth="0.5" />
      </g>

      {/* Writing cursor */}
      <line
        x1="31"
        y1="32"
        x2="31"
        y2="34"
        stroke="#00f3ff"
        strokeWidth="1"
        className="draft-cursor"
      />

      {/* Floating words/ideas */}
      <circle r="0.5" fill="#00f3ff" opacity="0.6" className="draft-particle-1" />
      <circle r="0.5" fill="#00f3ff" opacity="0.4" className="draft-particle-2" />
      <circle r="0.5" fill="#00f3ff" opacity="0.5" className="draft-particle-3" />
    </svg>
  );
};
