import React from 'react';
import './medium-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const MediumKinIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      className={`holo-icon kin-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* K structure - Vertical spine */}
      <path
        d="M 18 12 L 18 36"
        stroke="#00f3ff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* K structure - Upper arm */}
      <path
        d="M 18 24 L 32 12"
        stroke="#00f3ff"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* K structure - Lower arm */}
      <path
        d="M 18 24 L 32 36"
        stroke="#00f3ff"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Timeline markers on spine */}
      <g className="kin-timeline" opacity="0.5">
        <line x1="15" y1="16" x2="21" y2="16" stroke="#00f3ff" strokeWidth="0.8" />
        <line x1="15" y1="20" x2="21" y2="20" stroke="#00f3ff" strokeWidth="0.8" />
        <line x1="15" y1="28" x2="21" y2="28" stroke="#00f3ff" strokeWidth="0.8" />
        <line x1="15" y1="32" x2="21" y2="32" stroke="#00f3ff" strokeWidth="0.8" />
      </g>

      {/* Connection nodes */}
      <circle cx="18" cy="12" r="1.5" fill="#00f3ff" opacity="0.6" />
      <circle cx="18" cy="36" r="1.5" fill="#00f3ff" opacity="0.6" />
      <circle cx="32" cy="12" r="1.5" fill="#00f3ff" opacity="0.6" />
      <circle cx="32" cy="36" r="1.5" fill="#00f3ff" opacity="0.6" />

      {/* Heart center (care indicator) */}
      <circle cx="18" cy="24" r="3" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.5" />
      <circle cx="18" cy="24" r="1.5" fill="#00f3ff" opacity="0.7" className="kin-heartbeat" />

      {/* Outbound care signals */}
      <g className="kin-signals-out">
        <circle r="1" fill="#00f3ff" className="kin-signal-out-1" />
        <circle r="0.8" fill="#00f3ff" className="kin-signal-out-2" />
      </g>

      {/* Inbound loyalty signals */}
      <g className="kin-signals-in">
        <circle r="1" fill="#00f3ff" className="kin-signal-in-1" />
        <circle r="0.8" fill="#00f3ff" className="kin-signal-in-2" />
      </g>

      {/* Orbiting relationship particles */}
      <g className="kin-orbit">
        <circle r="0.6" fill="#00f3ff" opacity="0.5" className="kin-orbit-1" />
        <circle r="0.6" fill="#00f3ff" opacity="0.4" className="kin-orbit-2" />
        <circle r="0.6" fill="#00f3ff" opacity="0.5" className="kin-orbit-3" />
      </g>

      {/* Connection pulse ring */}
      <circle
        cx="18"
        cy="24"
        r="8"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="0.5"
        opacity="0"
        className="kin-pulse-ring"
      />
    </svg>
  );
};
