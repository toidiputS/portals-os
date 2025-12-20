import React from 'react';
import './minimal-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const MinimalAngleIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      className={`holo-icon angle-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Corner angle structure */}
      <path
        d="M 12 36 L 12 12 L 36 12"
        stroke="#00f3ff"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />

      {/* Measurement arc */}
      <path
        d="M 20 12 A 8 8 0 0 0 12 20"
        stroke="#00f3ff"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
        className="angle-arc"
      />

      {/* Rotating finder line */}
      <line
        x1="12"
        y1="12"
        x2="30"
        y2="30"
        stroke="#00f3ff"
        strokeWidth="0.5"
        opacity="0.8"
        className="angle-finder"
      />

      {/* Corner point */}
      <circle cx="12" cy="12" r="1.5" fill="#00f3ff" opacity="0.8" />

      {/* Orbiting opportunity dots */}
      <circle r="1" fill="#00f3ff" opacity="0.6" className="angle-orbit-1" />
      <circle r="1" fill="#00f3ff" opacity="0.4" className="angle-orbit-2" />
    </svg>
  );
};
