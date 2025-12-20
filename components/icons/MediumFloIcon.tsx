import React from 'react';
import './medium-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const MediumFloIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      className={`holo-icon flo-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main wave flow (3 flowing waves) */}
      <g className="flo-waves">
        <path
          d="M 6 20 Q 14 16 22 20 T 38 20"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1.5"
          opacity="0.6"
          className="flo-wave-1"
        />
        <path
          d="M 6 24 Q 14 20 22 24 T 38 24"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1.5"
          opacity="0.5"
          className="flo-wave-2"
        />
        <path
          d="M 6 28 Q 14 24 22 28 T 38 28"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1.5"
          opacity="0.4"
          className="flo-wave-3"
        />
      </g>

      {/* Content blocks flowing */}
      <g className="flo-content-blocks">
        <rect
          width="4"
          height="4"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1"
          opacity="0.6"
          className="flo-block-1"
        />
        <rect
          width="3"
          height="3"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="0.8"
          opacity="0.5"
          className="flo-block-2"
        />
        <rect
          width="4"
          height="4"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1"
          opacity="0.6"
          className="flo-block-3"
        />
      </g>

      {/* Ripple effect circles (momentum building) */}
      <g className="flo-ripples">
        <circle
          cx="12"
          cy="24"
          r="8"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="0.5"
          opacity="0"
          className="flo-ripple-1"
        />
        <circle
          cx="24"
          cy="24"
          r="8"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="0.5"
          opacity="0"
          className="flo-ripple-2"
        />
        <circle
          cx="36"
          cy="24"
          r="8"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="0.5"
          opacity="0"
          className="flo-ripple-3"
        />
      </g>

      {/* Flow particles (static positions) */}
      <g className="flo-particles">
        <circle cx="16" cy="20" r="0.8" fill="#00f3ff" />
        <circle cx="22" cy="26" r="0.6" fill="#00f3ff" />
        <circle cx="28" cy="22" r="0.8" fill="#00f3ff" />
        <circle cx="34" cy="18" r="0.6" fill="#00f3ff" />
        <circle cx="38" cy="24" r="0.8" fill="#00f3ff" />
      </g>

      {/* Source point */}
      <circle cx="8" cy="24" r="2" fill="#00f3ff" opacity="0.5" />
      <circle cx="8" cy="24" r="1" fill="#00f3ff" opacity="0.8" className="flo-source-pulse" />

      {/* End point (14-day mark) */}
      <circle cx="40" cy="24" r="2" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.5" />
      <circle cx="40" cy="24" r="1" fill="#00f3ff" opacity="0.6" />
    </svg>
  );
};
