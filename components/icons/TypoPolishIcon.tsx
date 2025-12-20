import React from 'react';
import './typo-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const TypoPolishIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => {
  return (
    <svg
      className={`holo-icon polish-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Refinement circle/lens */}
      <circle
        cx="32"
        cy="32"
        r="18"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Letters arranged in arc (getting refined) */}
      <g className="polish-letters">
        <text x="20" y="24" fontSize="7" fill="#00f3ff" opacity="0.7" fontFamily="monospace" fontWeight="bold" className="polish-letter polish-p">P</text>
        <text x="28" y="20" fontSize="7" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="polish-letter polish-o">O</text>
        <text x="36" y="24" fontSize="7" fill="#00f3ff" opacity="0.7" fontFamily="monospace" fontWeight="bold" className="polish-letter polish-l">L</text>
        <text x="22" y="36" fontSize="7" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="polish-letter polish-i">I</text>
        <text x="30" y="40" fontSize="7" fill="#00f3ff" opacity="0.9" fontFamily="monospace" fontWeight="bold" className="polish-letter polish-s">S</text>
        <text x="38" y="36" fontSize="7" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="polish-letter polish-h">H</text>
      </g>

      {/* Sparkle/shine effects */}
      <g className="polish-sparkles">
        {/* Center sparkle */}
        <path d="M 32 28 L 32 24 M 30 26 L 34 26" stroke="#00f3ff" strokeWidth="0.8" opacity="0" className="polish-sparkle-1" />

        {/* Side sparkles */}
        <path d="M 18 18 L 18 15 M 16.5 16.5 L 19.5 16.5" stroke="#00f3ff" strokeWidth="0.6" opacity="0" className="polish-sparkle-2" />
        <path d="M 46 18 L 46 15 M 44.5 16.5 L 47.5 16.5" stroke="#00f3ff" strokeWidth="0.6" opacity="0" className="polish-sparkle-3" />
        <path d="M 18 46 L 18 43 M 16.5 44.5 L 19.5 44.5" stroke="#00f3ff" strokeWidth="0.6" opacity="0" className="polish-sparkle-4" />
        <path d="M 46 46 L 46 43 M 44.5 44.5 L 47.5 44.5" stroke="#00f3ff" strokeWidth="0.6" opacity="0" className="polish-sparkle-5" />
      </g>

      {/* Shine sweep */}
      <line
        x1="20"
        y1="20"
        x2="44"
        y2="44"
        stroke="#00f3ff"
        strokeWidth="2"
        opacity="0"
        className="polish-sweep"
        strokeLinecap="round"
      />

      {/* Refinement particles */}
      <circle r="0.8" fill="#00f3ff" className="polish-particle-1" />
      <circle r="0.6" fill="#00f3ff" className="polish-particle-2" />
      <circle r="0.8" fill="#00f3ff" className="polish-particle-3" />
      <circle r="0.6" fill="#00f3ff" className="polish-particle-4" />

      {/* Before/After indicator */}
      <g opacity="0.4">
        <rect x="48" y="28" width="8" height="2" fill="none" stroke="#00f3ff" strokeWidth="0.5" />
        <rect x="48" y="34" width="8" height="2" fill="#00f3ff" opacity="0.6" className="polish-after" />
      </g>
    </svg>
  );
};
