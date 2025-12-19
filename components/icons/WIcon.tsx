import React from 'react';
import './holographic-icons.css';

interface WIconProps {
  className?: string;
  size?: number;
}

export const WIcon: React.FC<WIconProps> = ({
  className = '',
  size = 24
}) => {
  return (
    <svg
      className={`holographic-icon warp-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer vortex ring */}
      <circle
        className="vortex-ring vortex-outer"
        cx="32"
        cy="32"
        r="28"
        strokeWidth="1.5"
        strokeDasharray="8 4"
        fill="none"
      />
      
      {/* Middle vortex ring - counter-rotation */}
      <circle
        className="vortex-ring vortex-middle"
        cx="32"
        cy="32"
        r="20"
        strokeWidth="2"
        strokeDasharray="6 6"
        fill="none"
      />
      
      {/* Inner vortex ring - fastest */}
      <circle
        className="vortex-ring vortex-inner"
        cx="32"
        cy="32"
        r="12"
        strokeWidth="2.5"
        strokeDasharray="4 2"
        fill="none"
      />
      
      {/* W letter in center */}
      <text
        x="32"
        y="38"
        textAnchor="middle"
        className="warp-letter"
        fontSize="16"
        fontWeight="bold"
        fill="var(--holographic-cyan)"
      >
        W
      </text>
      
      {/* Portal energy particles */}
      <circle className="portal-particle particle-1" cx="32" cy="8" r="1" />
      <circle className="portal-particle particle-2" cx="56" cy="32" r="1" />
      <circle className="portal-particle particle-3" cx="32" cy="56" r="1" />
      <circle className="portal-particle particle-4" cx="8" cy="32" r="1" />
    </svg>
  );
};
