import React from 'react';
import './holographic-icons.css';

interface SettingsIconProps {
  className?: string;
  size?: number;
}

export const SettingsIcon: React.FC<SettingsIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon settings-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientSettings" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff6b35" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff6b35" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowSettings">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Gear/Cog Shape */}
      <g className="settings-gear">
        {/* Outer teeth */}
        <rect x="30" y="8" width="4" height="8" fill="url(#holoGradientSettings)" className="gear-tooth" />
        <rect x="30" y="48" width="4" height="8" fill="url(#holoGradientSettings)" className="gear-tooth" />
        <rect x="8" y="30" width="8" height="4" fill="url(#holoGradientSettings)" className="gear-tooth" />
        <rect x="48" y="30" width="8" height="4" fill="url(#holoGradientSettings)" className="gear-tooth" />
        
        {/* Diagonal teeth */}
        <rect x="20" y="12" width="6" height="6" fill="url(#holoGradientSettings)" transform="rotate(45 23 15)" className="gear-tooth" />
        <rect x="38" y="12" width="6" height="6" fill="url(#holoGradientSettings)" transform="rotate(45 41 15)" className="gear-tooth" />
        <rect x="20" y="46" width="6" height="6" fill="url(#holoGradientSettings)" transform="rotate(45 23 49)" className="gear-tooth" />
        <rect x="38" y="46" width="6" height="6" fill="url(#holoGradientSettings)" transform="rotate(45 41 49)" className="gear-tooth" />

        {/* Main circle */}
        <circle
          cx="32"
          cy="32"
          r="12"
          stroke="url(#holoGradientSettings)"
          strokeWidth="2"
          fill="none"
          filter="url(#glowSettings)"
          className="gear-outer"
        />

        {/* Inner circle */}
        <circle
          cx="32"
          cy="32"
          r="6"
          stroke="url(#holoGradientSettings)"
          strokeWidth="2"
          fill="none"
          className="gear-inner"
        />

        {/* Center dot */}
        <circle cx="32" cy="32" r="2" fill="url(#holoGradientSettings)" className="gear-center" />

        {/* Rotation indicators */}
        <circle cx="32" cy="20" r="1" fill="#ff6b35" opacity="0.8" className="rotation-indicator" />
        <circle cx="44" cy="32" r="1" fill="#ff6b35" opacity="0.6" className="rotation-indicator" />
        <circle cx="32" cy="44" r="1" fill="#ff6b35" opacity="0.4" className="rotation-indicator" />
        <circle cx="20" cy="32" r="1" fill="#ff6b35" opacity="0.2" className="rotation-indicator" />
      </g>

    </svg>
  );
};
