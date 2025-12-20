import React from 'react';
import './typo-holo-icons-uvwx.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const TypoVelocityIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => {
  return (
    <svg
      className={`holo-icon velocity-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Speedometer arc frame */}
      <path
        d="M 12 40 A 22 22 0 0 1 52 40"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.4"
      />

      {/* Speed markers */}
      <g className="velocity-markers" opacity="0.4">
        <line x1="14" y1="36" x2="18" y2="38" stroke="#00f3ff" strokeWidth="1" />
        <line x1="20" y1="24" x2="23" y2="27" stroke="#00f3ff" strokeWidth="1" />
        <line x1="32" y1="18" x2="32" y2="22" stroke="#00f3ff" strokeWidth="1" />
        <line x1="44" y1="24" x2="41" y2="27" stroke="#00f3ff" strokeWidth="1" />
        <line x1="50" y1="36" x2="46" y2="38" stroke="#00f3ff" strokeWidth="1" />
      </g>

      {/* V-E-L-O-C-I-T-Y arranged in arc */}
      <text x="12" y="44" fontSize="5" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="velocity-letter velocity-v">V</text>
      <text x="16" y="34" fontSize="5" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="velocity-letter velocity-e">E</text>
      <text x="22" y="26" fontSize="5" fill="#00f3ff" opacity="0.9" fontFamily="monospace" fontWeight="bold" className="velocity-letter velocity-l">L</text>
      <text x="30" y="22" fontSize="5" fill="#00f3ff" opacity="0.95" fontFamily="monospace" fontWeight="bold" className="velocity-letter velocity-o">O</text>
      <text x="38" y="26" fontSize="5" fill="#00f3ff" opacity="0.9" fontFamily="monospace" fontWeight="bold" className="velocity-letter velocity-c">C</text>
      <text x="44" y="34" fontSize="5" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="velocity-letter velocity-i">I</text>
      <text x="48" y="44" fontSize="5" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="velocity-letter velocity-t">T</text>
      <text x="30" y="32" fontSize="5" fill="#00f3ff" opacity="0.9" fontFamily="monospace" fontWeight="bold" className="velocity-letter velocity-y">Y</text>

      {/* Speedometer needle */}
      <g className="velocity-needle">
        <line x1="32" y1="40" x2="24" y2="28" stroke="#00f3ff" strokeWidth="2" strokeLinecap="round" className="velocity-needle-line" />
        <circle cx="32" cy="40" r="3" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" />
        <circle cx="32" cy="40" r="1.5" fill="#00f3ff" opacity="0.8" className="velocity-needle-center" />
      </g>

      {/* Energy level bar (right side) */}
      <g className="velocity-energy" opacity="0.5">
        <rect x="54" y="20" width="4" height="28" fill="none" stroke="#00f3ff" strokeWidth="1" />
        <rect x="55" y="36" width="2" height="11" fill="#00f3ff" opacity="0.4" className="velocity-level-low" />
        <rect x="55" y="28" width="2" height="8" fill="#00f3ff" opacity="0.6" className="velocity-level-mid" />
        <rect x="55" y="21" width="2" height="7" fill="#00f3ff" opacity="0.8" className="velocity-level-high" />
      </g>

      {/* Heartbeat/energy line */}
      <g className="velocity-heartbeat">
        <polyline
          points="8,52 14,52 18,48 22,56 26,52 30,52 34,44 38,52 42,52"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1"
          opacity="0.6"
          className="velocity-pulse-line"
        />
      </g>

      {/* Speed particles */}
      <g className="velocity-speed-particles">
        <circle r="0.8" fill="#00f3ff" className="velocity-particle-1" />
        <circle r="1" fill="#00f3ff" className="velocity-particle-2" />
        <circle r="0.8" fill="#00f3ff" className="velocity-particle-3" />
      </g>

      {/* Motion blur lines */}
      <g className="velocity-blur">
        <line x1="6" y1="30" x2="10" y2="30" stroke="#00f3ff" strokeWidth="1" opacity="0" className="velocity-blur-1" />
        <line x1="4" y1="34" x2="10" y2="34" stroke="#00f3ff" strokeWidth="1.5" opacity="0" className="velocity-blur-2" />
        <line x1="6" y1="38" x2="10" y2="38" stroke="#00f3ff" strokeWidth="1" opacity="0" className="velocity-blur-3" />
      </g>

      {/* Burnout warning pulse */}
      <circle cx="56" cy="44" r="2" fill="#00f3ff" opacity="0" className="velocity-warning" />
    </svg>
  );
};
