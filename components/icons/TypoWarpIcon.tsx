import React from 'react';
import './typo-holo-icons-uvwx.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const TypoWarpIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => {
  return (
    <svg
      className={`holo-icon warp-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Warp tunnel rings */}
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="none" stroke="#00f3ff" strokeWidth="0.8" opacity="0.3" className="warp-ring-1" />
      <ellipse cx="32" cy="32" rx="18" ry="14" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.4" className="warp-ring-2" />
      <ellipse cx="32" cy="32" rx="12" ry="9" fill="none" stroke="#00f3ff" strokeWidth="1.2" opacity="0.5" className="warp-ring-3" />
      <ellipse cx="32" cy="32" rx="6" ry="4" fill="none" stroke="#00f3ff" strokeWidth="1.5" opacity="0.6" className="warp-ring-4" />

      {/* W-A-R-P stretched in warp effect */}
      <text x="14" y="34" fontSize="8" fill="#00f3ff" opacity="0.7" fontFamily="monospace" fontWeight="bold" className="warp-letter warp-w">W</text>
      <text x="24" y="34" fontSize="7" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="warp-letter warp-a">A</text>
      <text x="33" y="34" fontSize="6" fill="#00f3ff" opacity="0.9" fontFamily="monospace" fontWeight="bold" className="warp-letter warp-r">R</text>
      <text x="40" y="34" fontSize="5" fill="#00f3ff" opacity="1" fontFamily="monospace" fontWeight="bold" className="warp-letter warp-p">P</text>

      {/* 10X indicator */}
      <g className="warp-multiplier">
        <text x="46" y="22" fontSize="6" fill="#00f3ff" opacity="0.9" fontFamily="monospace" fontWeight="bold" className="warp-10x">10</text>
        <text x="52" y="22" fontSize="8" fill="#00f3ff" opacity="1" fontFamily="monospace" fontWeight="bold" className="warp-x">×</text>
      </g>

      {/* Speed streaks */}
      <g className="warp-streaks">
        <line x1="8" y1="20" x2="20" y2="24" stroke="#00f3ff" strokeWidth="1" opacity="0" className="warp-streak-1" />
        <line x1="6" y1="28" x2="18" y2="30" stroke="#00f3ff" strokeWidth="1.5" opacity="0" className="warp-streak-2" />
        <line x1="8" y1="36" x2="18" y2="34" stroke="#00f3ff" strokeWidth="1" opacity="0" className="warp-streak-3" />
        <line x1="6" y1="44" x2="20" y2="40" stroke="#00f3ff" strokeWidth="1.5" opacity="0" className="warp-streak-4" />

        <line x1="44" y1="24" x2="56" y2="20" stroke="#00f3ff" strokeWidth="1" opacity="0" className="warp-streak-5" />
        <line x1="46" y1="30" x2="58" y2="28" stroke="#00f3ff" strokeWidth="1.5" opacity="0" className="warp-streak-6" />
        <line x1="46" y1="34" x2="58" y2="36" stroke="#00f3ff" strokeWidth="1" opacity="0" className="warp-streak-7" />
        <line x1="44" y1="40" x2="56" y2="44" stroke="#00f3ff" strokeWidth="1.5" opacity="0" className="warp-streak-8" />
      </g>

      {/* Warp particles flying through */}
      <g className="warp-particles">
        <circle r="1.2" fill="#00f3ff" className="warp-particle-1" />
        <circle r="1" fill="#00f3ff" className="warp-particle-2" />
        <circle r="0.8" fill="#00f3ff" className="warp-particle-3" />
        <circle r="1.2" fill="#00f3ff" className="warp-particle-4" />
        <circle r="1" fill="#00f3ff" className="warp-particle-5" />
        <circle r="0.8" fill="#00f3ff" className="warp-particle-6" />
      </g>

      {/* Shortcut symbols */}
      <g className="warp-shortcuts" opacity="0.4">
        <text x="12" y="50" fontSize="4" fill="#00f3ff" className="warp-key-1">⌘</text>
        <text x="20" y="52" fontSize="4" fill="#00f3ff" className="warp-key-2">⇧</text>
        <text x="28" y="50" fontSize="4" fill="#00f3ff" className="warp-key-3">⌥</text>
      </g>

      {/* Central warp core */}
      <circle cx="32" cy="32" r="3" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" opacity="0.6" />
      <circle cx="32" cy="32" r="1.5" fill="#00f3ff" opacity="0.9" className="warp-core" />

      {/* Exit point flash */}
      <circle cx="50" cy="32" r="2" fill="#00f3ff" opacity="0" className="warp-exit-flash" />
    </svg>
  );
};
