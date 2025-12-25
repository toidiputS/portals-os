import React from 'react';
import './holographic-icons.css';

interface OracleIconProps {
  className?: string;
  size?: number;
}

export const OracleIcon: React.FC<OracleIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon oracle-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientOracle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff1744" stopOpacity="1" />
          <stop offset="50%" stopColor="#f50057" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ff1744" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowOracle">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Oracle Eye/Pyramid */}
      <g className="oracle-eye">
        {/* Pyramid base */}
        <path
          d="M 32 12 L 52 44 L 12 44 Z"
          stroke="url(#holoGradientOracle)"
          strokeWidth="2"
          fill="none"
          filter="url(#glowOracle)"
          className="oracle-pyramid"
        />

        {/* Eye in center */}
        <ellipse
          cx="32"
          cy="32"
          rx="8"
          ry="6"
          stroke="url(#holoGradientOracle)"
          strokeWidth="2"
          fill="none"
          filter="url(#glowOracle)"
          className="oracle-eye-outer"
        />

        {/* Eye iris */}
        <circle
          cx="32"
          cy="32"
          r="4"
          fill="url(#holoGradientOracle)"
          className="oracle-iris"
        />

        {/* Eye pupil */}
        <circle
          cx="32"
          cy="32"
          r="2"
          fill="#fff"
          className="oracle-pupil"
        />

        {/* Light rays from eye */}
        <path d="M 32 26 L 32 20" stroke="#ff1744" strokeWidth="1" opacity="0.7" className="light-ray" />
        <path d="M 38 32 L 44 32" stroke="#ff1744" strokeWidth="1" opacity="0.7" className="light-ray" />
        <path d="M 32 38 L 32 44" stroke="#ff1744" strokeWidth="1" opacity="0.7" className="light-ray" />
        <path d="M 26 32 L 20 32" stroke="#ff1744" strokeWidth="1" opacity="0.7" className="light-ray" />

        {/* Diagonal rays */}
        <path d="M 27 27 L 23 23" stroke="#ff1744" strokeWidth="1" opacity="0.5" className="light-ray" />
        <path d="M 37 27 L 41 23" stroke="#ff1744" strokeWidth="1" opacity="0.5" className="light-ray" />
        <path d="M 37 37 L 41 41" stroke="#ff1744" strokeWidth="1" opacity="0.5" className="light-ray" />
        <path d="M 27 37 L 23 41" stroke="#ff1744" strokeWidth="1" opacity="0.5" className="light-ray" />

        {/* Energy particles */}
        <circle cx="32" cy="16" r="1" fill="#ff1744" opacity="0.8" className="energy-particle" />
        <circle cx="48" cy="32" r="1" fill="#ff1744" opacity="0.8" className="energy-particle" />
        <circle cx="32" cy="48" r="1" fill="#ff1744" opacity="0.8" className="energy-particle" />
        <circle cx="16" cy="32" r="1" fill="#ff1744" opacity="0.8" className="energy-particle" />

        {/* Corner pyramids */}
        <path d="M 20 20 L 24 26 L 16 26 Z" stroke="#ff1744" strokeWidth="1" fill="none" opacity="0.4" className="mini-pyramid" />
        <path d="M 44 20 L 48 26 L 40 26 Z" stroke="#ff1744" strokeWidth="1" fill="none" opacity="0.4" className="mini-pyramid" />
        <path d="M 20 44 L 24 50 L 16 50 Z" stroke="#ff1744" strokeWidth="1" fill="none" opacity="0.4" className="mini-pyramid" />
        <path d="M 44 44 L 48 50 L 40 50 Z" stroke="#ff1744" strokeWidth="1" fill="none" opacity="0.4" className="mini-pyramid" />
      </g>

    </svg>
  );
};
