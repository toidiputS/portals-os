import React from 'react';
import './medium-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const MediumJamIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      className={`holo-icon jam-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Microphone stand */}
      <path
        d="M 24 28 L 24 36"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path
        d="M 20 36 L 28 36"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      />

      {/* Microphone body */}
      <rect
        x="20"
        y="14"
        width="8"
        height="12"
        rx="4"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Mic grill lines */}
      <g opacity="0.4">
        <line x1="21" y1="18" x2="27" y2="18" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="21" y1="20" x2="27" y2="20" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="21" y1="22" x2="27" y2="22" stroke="#00f3ff" strokeWidth="0.5" />
      </g>

      {/* Sound waves (left side) - static */}
      <g className="jam-waves-left">
        <path
          d="M 16 20 Q 14 20 12 20"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M 16 24 Q 13 24 10 24"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1"
          opacity="0.5"
        />
        <path
          d="M 16 20 Q 12 20 8 20"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="0.8"
          opacity="0.4"
        />
      </g>

      {/* Sound waves (right side) - static */}
      <g className="jam-waves-right">
        <path
          d="M 32 20 Q 34 20 36 20"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M 32 24 Q 35 24 38 24"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1"
          opacity="0.5"
        />
        <path
          d="M 32 20 Q 36 20 40 20"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="0.8"
          opacity="0.4"
        />
      </g>

      {/* Audio level bars - static */}
      <g className="jam-levels">
        <rect x="10" y="30" width="1.5" height="4" fill="#00f3ff" opacity="0.5" />
        <rect x="13" y="28" width="1.5" height="6" fill="#00f3ff" opacity="0.6" />
        <rect x="16" y="26" width="1.5" height="8" fill="#00f3ff" opacity="0.7" />

        <rect x="30.5" y="30" width="1.5" height="4" fill="#00f3ff" opacity="0.5" />
        <rect x="33.5" y="28" width="1.5" height="6" fill="#00f3ff" opacity="0.6" />
        <rect x="36.5" y="26" width="1.5" height="8" fill="#00f3ff" opacity="0.7" />
      </g>

      {/* Speaking particles - static */}
      <g className="jam-particles">
        <circle cx="12" cy="18" r="0.8" fill="#00f3ff" />
        <circle cx="36" cy="18" r="0.6" fill="#00f3ff" />
        <circle cx="14" cy="26" r="0.8" fill="#00f3ff" />
      </g>

      {/* Active indicator */}
      <circle cx="24" cy="20" r="1" fill="#00f3ff" opacity="0.8" className="jam-active" />
    </svg>
  );
};
