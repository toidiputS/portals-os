import React from 'react';
import './holographic-icons.css';

interface GeminiIconProps {
  className?: string;
  size?: number;
}

export const GeminiIcon: React.FC<GeminiIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon gemini-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientGemini" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4285f4" stopOpacity="1" />
          <stop offset="50%" stopColor="#ea4335" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4285f4" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowGemini">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Gemini Symbol - Two intertwined spirals */}
      <g className="gemini-spirals">
        {/* First spiral (blue) */}
        <path
          d="M 20 32 Q 20 20, 32 20 T 44 32 Q 44 44, 32 44 T 20 32"
          stroke="#4285f4"
          strokeWidth="3"
          fill="none"
          filter="url(#glowGemini)"
          className="gemini-spiral-1"
        />

        {/* Second spiral (red) */}
        <path
          d="M 44 32 Q 44 20, 32 20 T 20 32 Q 20 44, 32 44 T 44 32"
          stroke="#ea4335"
          strokeWidth="3"
          fill="none"
          filter="url(#glowGemini)"
          className="gemini-spiral-2"
        />

        {/* Central connection points */}
        <circle cx="32" cy="20" r="3" fill="url(#holoGradientGemini)" className="gemini-node top" />
        <circle cx="44" cy="32" r="3" fill="url(#holoGradientGemini)" className="gemini-node right" />
        <circle cx="32" cy="44" r="3" fill="url(#holoGradientGemini)" className="gemini-node bottom" />
        <circle cx="20" cy="32" r="3" fill="url(#holoGradientGemini)" className="gemini-node left" />

        {/* Center core */}
        <circle cx="32" cy="32" r="4" fill="url(#holoGradientGemini)" className="gemini-core" />
        <circle cx="32" cy="32" r="2" fill="#fff" className="gemini-center" />

        {/* Energy particles */}
        <circle cx="28" cy="28" r="1" fill="#4285f4" opacity="0.8" className="energy-particle" />
        <circle cx="36" cy="36" r="1" fill="#ea4335" opacity="0.8" className="energy-particle" />
        <circle cx="36" cy="28" r="1" fill="#4285f4" opacity="0.6" className="energy-particle" />
        <circle cx="28" cy="36" r="1" fill="#ea4335" opacity="0.6" className="energy-particle" />

        {/* Orbital rings */}
        <circle cx="32" cy="32" r="12" stroke="url(#holoGradientGemini)" strokeWidth="1" fill="none" opacity="0.4" className="orbital-ring" />
        <circle cx="32" cy="32" r="18" stroke="url(#holoGradientGemini)" strokeWidth="1" fill="none" opacity="0.2" className="orbital-ring" />
      </g>

    </svg>
  );
};
