import React from 'react';
import './typo-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const TypoNerveIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => {
  return (
    <svg
      className={`holo-icon nerve-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Brain outline */}
      <path
        d="M 24 16 Q 16 16 16 24 Q 16 28 18 30 Q 16 32 16 36 Q 16 44 24 44 Q 28 44 30 42 Q 32 44 36 44 Q 44 44 44 36 Q 44 32 42 30 Q 44 28 44 24 Q 44 16 36 16 Q 32 16 30 18 Q 28 16 24 16"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* N */}
      <text
        x="16"
        y="26"
        fontSize="7"
        fill="#00f3ff"
        opacity="0.8"
        fontFamily="monospace"
        fontWeight="bold"
        className="nerve-letter nerve-n"
      >
        N
      </text>

      {/* E */}
      <text
        x="24"
        y="22"
        fontSize="7"
        fill="#00f3ff"
        opacity="0.8"
        fontFamily="monospace"
        fontWeight="bold"
        className="nerve-letter nerve-e1"
      >
        E
      </text>

      {/* R */}
      <text
        x="32"
        y="26"
        fontSize="7"
        fill="#00f3ff"
        opacity="0.8"
        fontFamily="monospace"
        fontWeight="bold"
        className="nerve-letter nerve-r"
      >
        R
      </text>

      {/* V */}
      <text
        x="24"
        y="34"
        fontSize="7"
        fill="#00f3ff"
        opacity="0.8"
        fontFamily="monospace"
        fontWeight="bold"
        className="nerve-letter nerve-v"
      >
        V
      </text>

      {/* E */}
      <text
        x="16"
        y="38"
        fontSize="7"
        fill="#00f3ff"
        opacity="0.8"
        fontFamily="monospace"
        fontWeight="bold"
        className="nerve-letter nerve-e2"
      >
        E
      </text>

      {/* Neural connections between letters */}
      <g className="nerve-synapses" opacity="0.5">
        <line x1="20" y1="24" x2="26" y2="20" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="28" y1="22" x2="34" y2="24" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="34" y1="26" x2="28" y2="32" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="26" y1="34" x2="20" y2="36" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="20" y1="26" x2="18" y2="36" stroke="#00f3ff" strokeWidth="0.5" />
      </g>

      {/* Synapse nodes */}
      <circle cx="20" cy="24" r="1" fill="#00f3ff" opacity="0.6" className="nerve-node-1" />
      <circle cx="28" cy="20" r="1" fill="#00f3ff" opacity="0.6" className="nerve-node-2" />
      <circle cx="36" cy="24" r="1" fill="#00f3ff" opacity="0.6" className="nerve-node-3" />
      <circle cx="28" cy="32" r="1" fill="#00f3ff" opacity="0.6" className="nerve-node-4" />
      <circle cx="20" cy="36" r="1" fill="#00f3ff" opacity="0.6" className="nerve-node-5" />

      {/* Neural signal pulses */}
      <circle r="1.2" fill="#00f3ff" className="nerve-pulse-1" />
      <circle r="1" fill="#00f3ff" className="nerve-pulse-2" />
      <circle r="1.2" fill="#00f3ff" className="nerve-pulse-3" />

      {/* Central processing indicator */}
      <circle cx="28" cy="28" r="8" fill="none" stroke="#00f3ff" strokeWidth="0.5" opacity="0" className="nerve-wave" />
    </svg>
  );
};
