import React from 'react';
import './typo-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const TypoOptimizeIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => {
  return (
    <svg
      className={`holo-icon optimize-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Funnel/bottleneck shape */}
      <path
        d="M 16 14 L 44 14 L 36 28 L 36 46 L 28 46 L 28 28 Z"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0.3"
      />

      {/* Letters arranged vertically (optimizing flow) */}
      <text x="24" y="20" fontSize="6" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="opt-letter opt-o">O</text>
      <text x="24" y="26" fontSize="6" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="opt-letter opt-p">P</text>
      <text x="24" y="32" fontSize="6" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="opt-letter opt-t">T</text>
      <text x="24" y="38" fontSize="6" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="opt-letter opt-i">I</text>
      <text x="24" y="44" fontSize="6" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="opt-letter opt-m">M</text>

      {/* "IZE" at bottom (compressed/optimized) */}
      <g className="opt-suffix">
        <text x="22" y="50" fontSize="4" fill="#00f3ff" opacity="0.6" fontFamily="monospace">I</text>
        <text x="26" y="50" fontSize="4" fill="#00f3ff" opacity="0.6" fontFamily="monospace">Z</text>
        <text x="30" y="50" fontSize="4" fill="#00f3ff" opacity="0.6" fontFamily="monospace">E</text>
      </g>

      {/* Chart showing improvement */}
      <g className="opt-chart" opacity="0.5">
        {/* Before bars (low) */}
        <rect x="46" y="38" width="3" height="6" fill="none" stroke="#00f3ff" strokeWidth="0.5" opacity="0.4" />
        <rect x="50" y="36" width="3" height="8" fill="none" stroke="#00f3ff" strokeWidth="0.5" opacity="0.4" />

        {/* After bars (high) */}
        <rect x="46" y="24" width="3" height="20" fill="none" stroke="#00f3ff" strokeWidth="0.8" className="opt-bar-after-1" />
        <rect x="50" y="20" width="3" height="24" fill="none" stroke="#00f3ff" strokeWidth="0.8" className="opt-bar-after-2" />

        {/* Arrow showing improvement */}
        <path d="M 54 36 L 54 26 L 52 28" stroke="#00f3ff" strokeWidth="0.8" opacity="0.6" className="opt-arrow" />
      </g>

      {/* Flow particles getting faster */}
      <circle r="1" fill="#00f3ff" className="opt-particle-1" />
      <circle r="0.8" fill="#00f3ff" className="opt-particle-2" />
      <circle r="1" fill="#00f3ff" className="opt-particle-3" />

      {/* Bottleneck highlight */}
      <line x1="28" y1="28" x2="36" y2="28" stroke="#00f3ff" strokeWidth="1.5" opacity="0.6" className="opt-bottleneck" />
    </svg>
  );
};
