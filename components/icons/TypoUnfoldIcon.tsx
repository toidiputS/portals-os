import React from 'react';
import './typo-holo-icons-uvwx.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const TypoUnfoldIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => {
  return (
    <svg
      className={`holo-icon unfold-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Mountain (big goal) at top */}
      <path
        d="M 24 12 L 32 6 L 40 12 L 36 12 L 32 8 L 28 12 Z"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0.5"
        className="unfold-mountain"
      />

      {/* Folder frame unfolding */}
      <path
        d="M 14 18 L 14 52 L 50 52 L 50 22 L 40 22 L 38 18 Z"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.4"
      />

      {/* Folder tab */}
      <path
        d="M 14 18 L 38 18 L 40 22"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* U-N-F-O-L-D cascading down (deconstructing) */}
      <text x="18" y="28" fontSize="6" fill="#00f3ff" opacity="0.9" fontFamily="monospace" fontWeight="bold" className="unfold-letter unfold-u">U</text>
      <text x="26" y="28" fontSize="6" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="unfold-letter unfold-n">N</text>
      <text x="34" y="28" fontSize="6" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="unfold-letter unfold-f">F</text>
      <text x="42" y="28" fontSize="6" fill="#00f3ff" opacity="0.75" fontFamily="monospace" fontWeight="bold" className="unfold-letter unfold-o">O</text>
      <text x="26" y="38" fontSize="6" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="unfold-letter unfold-l">L</text>
      <text x="34" y="38" fontSize="6" fill="#00f3ff" opacity="0.9" fontFamily="monospace" fontWeight="bold" className="unfold-letter unfold-d">D</text>

      {/* Step blocks (tasks broken down) */}
      <g className="unfold-steps">
        <rect x="18" y="44" width="6" height="4" rx="1" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.6" className="unfold-step-1" />
        <rect x="26" y="44" width="6" height="4" rx="1" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.6" className="unfold-step-2" />
        <rect x="34" y="44" width="6" height="4" rx="1" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.6" className="unfold-step-3" />
        <rect x="42" y="44" width="6" height="4" rx="1" fill="none" stroke="#00f3ff" strokeWidth="1" opacity="0.6" className="unfold-step-4" />
      </g>

      {/* 5-min indicators */}
      <g className="unfold-timers" opacity="0.5">
        <text x="19" y="50" fontSize="3" fill="#00f3ff" className="unfold-time-1">5m</text>
        <text x="27" y="50" fontSize="3" fill="#00f3ff" className="unfold-time-2">5m</text>
        <text x="35" y="50" fontSize="3" fill="#00f3ff" className="unfold-time-3">5m</text>
        <text x="43" y="50" fontSize="3" fill="#00f3ff" className="unfold-time-4">5m</text>
      </g>

      {/* Deconstruction lines (mountain to steps) */}
      <g className="unfold-lines" opacity="0.3">
        <path d="M 32 12 L 21 44" stroke="#00f3ff" strokeWidth="0.5" strokeDasharray="2 2" className="unfold-line-1" />
        <path d="M 32 12 L 29 44" stroke="#00f3ff" strokeWidth="0.5" strokeDasharray="2 2" className="unfold-line-2" />
        <path d="M 32 12 L 37 44" stroke="#00f3ff" strokeWidth="0.5" strokeDasharray="2 2" className="unfold-line-3" />
        <path d="M 32 12 L 45 44" stroke="#00f3ff" strokeWidth="0.5" strokeDasharray="2 2" className="unfold-line-4" />
      </g>

      {/* Task particles flowing down */}
      <g className="unfold-particles">
        <circle r="1" fill="#00f3ff" className="unfold-particle-1" />
        <circle r="0.8" fill="#00f3ff" className="unfold-particle-2" />
        <circle r="1" fill="#00f3ff" className="unfold-particle-3" />
        <circle r="0.8" fill="#00f3ff" className="unfold-particle-4" />
      </g>

      {/* Checkmarks appearing */}
      <g className="unfold-checks" opacity="0">
        <path d="M 19 45 L 21 47 L 24 43" stroke="#00f3ff" strokeWidth="1" fill="none" className="unfold-check-1" />
        <path d="M 27 45 L 29 47 L 32 43" stroke="#00f3ff" strokeWidth="1" fill="none" className="unfold-check-2" />
        <path d="M 35 45 L 37 47 L 40 43" stroke="#00f3ff" strokeWidth="1" fill="none" className="unfold-check-3" />
        <path d="M 43 45 L 45 47 L 48 43" stroke="#00f3ff" strokeWidth="1" fill="none" className="unfold-check-4" />
      </g>

      {/* Progress pulse */}
      <circle cx="32" cy="36" r="6" fill="none" stroke="#00f3ff" strokeWidth="0.5" opacity="0" className="unfold-pulse" />
    </svg>
  );
};
