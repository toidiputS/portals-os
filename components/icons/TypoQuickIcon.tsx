import React from 'react';
import './typo-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const TypoQuickIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => {
  return (
    <svg
      className={`holo-icon quick-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lightning bolt frame */}
      <path
        d="M 34 12 L 24 30 L 30 30 L 26 52 L 40 28 L 34 28 Z"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.4"
        className="quick-bolt-frame"
      />

      {/* Q */}
      <text
        x="22"
        y="24"
        fontSize="8"
        fill="#00f3ff"
        opacity="0.9"
        fontFamily="monospace"
        fontWeight="bold"
        className="quick-letter quick-q"
      >
        Q
      </text>

      {/* U */}
      <text
        x="30"
        y="30"
        fontSize="8"
        fill="#00f3ff"
        opacity="0.85"
        fontFamily="monospace"
        fontWeight="bold"
        className="quick-letter quick-u"
      >
        U
      </text>

      {/* I */}
      <text
        x="26"
        y="38"
        fontSize="8"
        fill="#00f3ff"
        opacity="0.8"
        fontFamily="monospace"
        fontWeight="bold"
        className="quick-letter quick-i"
      >
        I
      </text>

      {/* C */}
      <text
        x="32"
        y="44"
        fontSize="8"
        fill="#00f3ff"
        opacity="0.85"
        fontFamily="monospace"
        fontWeight="bold"
        className="quick-letter quick-c"
      >
        C
      </text>

      {/* K */}
      <text
        x="26"
        y="52"
        fontSize="8"
        fill="#00f3ff"
        opacity="0.9"
        fontFamily="monospace"
        fontWeight="bold"
        className="quick-letter quick-k"
      >
        K
      </text>

      {/* 3-Message sequence indicators */}
      <g className="quick-messages" opacity="0.6">
        <rect x="44" y="20" width="8" height="4" rx="1" fill="none" stroke="#00f3ff" strokeWidth="1" className="quick-msg-1" />
        <rect x="46" y="28" width="8" height="4" rx="1" fill="none" stroke="#00f3ff" strokeWidth="1" className="quick-msg-2" />
        <rect x="44" y="36" width="8" height="4" rx="1" fill="none" stroke="#00f3ff" strokeWidth="1" className="quick-msg-3" />

        {/* Connection lines */}
        <path d="M 48 24 L 50 28" stroke="#00f3ff" strokeWidth="0.5" />
        <path d="M 50 32 L 48 36" stroke="#00f3ff" strokeWidth="0.5" />
      </g>

      {/* Speed lines */}
      <g className="quick-speed-lines">
        <line x1="14" y1="26" x2="20" y2="26" stroke="#00f3ff" strokeWidth="1" opacity="0" className="quick-speed-1" />
        <line x1="12" y1="32" x2="22" y2="32" stroke="#00f3ff" strokeWidth="1.5" opacity="0" className="quick-speed-2" />
        <line x1="14" y1="38" x2="20" y2="38" stroke="#00f3ff" strokeWidth="1" opacity="0" className="quick-speed-3" />
      </g>

      {/* Electric particles */}
      <g className="quick-sparks">
        <circle r="1.2" fill="#00f3ff" className="quick-spark-1" />
        <circle r="1" fill="#00f3ff" className="quick-spark-2" />
        <circle r="1.2" fill="#00f3ff" className="quick-spark-3" />
        <circle r="0.8" fill="#00f3ff" className="quick-spark-4" />
      </g>

      {/* Central energy pulse */}
      <circle cx="30" cy="34" r="3" fill="#00f3ff" opacity="0.3" className="quick-core" />
      <circle cx="30" cy="34" r="1.5" fill="#00f3ff" opacity="0.8" className="quick-core-inner" />

      {/* Electric arcs */}
      <path
        d="M 18 18 L 20 20 L 18 22 L 20 24"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0"
        className="quick-arc-1"
      />
      <path
        d="M 44 44 L 46 46 L 44 48 L 46 50"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0"
        className="quick-arc-2"
      />
    </svg>
  );
};
