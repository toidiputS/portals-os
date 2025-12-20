import React from 'react';
import './typo-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const TypoScrollIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => {
  return (
    <svg
      className={`holo-icon scroll-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Scroll shape */}
      <path
        d="M 18 14 Q 14 14 14 18 L 14 46 Q 14 50 18 50 L 42 50 Q 46 50 46 46 L 46 22 Q 46 18 50 18 Q 50 14 46 14 Z"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.4"
      />

      {/* Top curl */}
      <path
        d="M 46 14 Q 50 14 50 18"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.5"
      />

      {/* Bottom curl suggestion */}
      <path
        d="M 14 46 Q 10 46 10 50 Q 10 54 14 54"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0.3"
      />

      {/* S-C-R-O-L-L arranged as content */}
      <text x="18" y="24" fontSize="7" fill="#00f3ff" opacity="0.9" fontFamily="monospace" fontWeight="bold" className="scroll-letter scroll-s">S</text>
      <text x="26" y="24" fontSize="7" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="scroll-letter scroll-c">C</text>
      <text x="34" y="24" fontSize="7" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="scroll-letter scroll-r">R</text>
      <text x="22" y="34" fontSize="7" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="scroll-letter scroll-o">O</text>
      <text x="30" y="34" fontSize="7" fill="#00f3ff" opacity="0.9" fontFamily="monospace" fontWeight="bold" className="scroll-letter scroll-l1">L</text>
      <text x="38" y="34" fontSize="7" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="scroll-letter scroll-l2">L</text>

      {/* Knowledge lines (content) */}
      <g className="scroll-content" opacity="0.4">
        <line x1="18" y1="40" x2="40" y2="40" stroke="#00f3ff" strokeWidth="0.8" />
        <line x1="18" y1="44" x2="36" y2="44" stroke="#00f3ff" strokeWidth="0.8" />
        <line x1="18" y1="48" x2="38" y2="48" stroke="#00f3ff" strokeWidth="0.8" />
      </g>

      {/* Search indicator */}
      <g className="scroll-search">
        <circle cx="50" cy="32" r="4" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.5" className="scroll-search-lens" />
        <line x1="53" y1="35" x2="56" y2="38" stroke="#00f3ff" strokeWidth="1" opacity="0.5" />

        {/* Search pulse */}
        <circle cx="50" cy="32" r="4" fill="none" stroke="#00f3ff" strokeWidth="0.5" opacity="0" className="scroll-search-pulse" />
      </g>

      {/* Knowledge connection web */}
      <g className="scroll-connections" opacity="0.4">
        <line x1="24" y1="22" x2="30" y2="22" stroke="#00f3ff" strokeWidth="0.5" className="scroll-connect-1" />
        <line x1="30" y1="24" x2="26" y2="32" stroke="#00f3ff" strokeWidth="0.5" className="scroll-connect-2" />
        <line x1="34" y1="32" x2="38" y2="32" stroke="#00f3ff" strokeWidth="0.5" className="scroll-connect-3" />
      </g>

      {/* Archive particles (information flowing in) */}
      <circle r="1" fill="#00f3ff" className="scroll-particle-1" />
      <circle r="0.8" fill="#00f3ff" className="scroll-particle-2" />
      <circle r="1" fill="#00f3ff" className="scroll-particle-3" />

      {/* Retrieval particles (information coming out) */}
      <circle r="0.8" fill="#00f3ff" className="scroll-retrieve-1" />
      <circle r="0.8" fill="#00f3ff" className="scroll-retrieve-2" />

      {/* "Second Brain" pulse */}
      <circle cx="30" cy="30" r="8" fill="none" stroke="#00f3ff" strokeWidth="0.5" opacity="0" className="scroll-brain-pulse" />
    </svg>
  );
};
