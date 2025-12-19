import React from 'react';
import './holographic-icons.css';

interface ZIconProps {
  className?: string;
  size?: number;
}

export const ZIcon: React.FC<ZIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon experimental-zone-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientEZ" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="1" />
        </linearGradient>

        {/* Purple/Magenta gradient for experimental/alpha elements */}
        <linearGradient id="alphaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bf00ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#8000ff" stopOpacity="0.6" />
        </linearGradient>

        {/* Yellow/Gold gradient for ideas/innovation */}
        <linearGradient id="ideaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffcc00" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff9900" stopOpacity="0.8" />
        </linearGradient>

        <filter id="glowEZ">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowPurple">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowYellow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip for flask contents */}
        <clipPath id="flaskClip">
          <path d="M 24 20 L 24 36 L 16 52 L 48 52 L 40 36 L 40 20" />
        </clipPath>
      </defs>

      {/* --- BACKGROUND: HEX GRID (Lab Environment) --- */}
      <g opacity="0.1" className="ez-hex-grid">
        <polygon points="10,8 16,4 22,8 22,16 16,20 10,16" fill="none" stroke="#00f3ff" strokeWidth="0.5" />
        <polygon points="22,8 28,4 34,8 34,16 28,20 22,16" fill="none" stroke="#00f3ff" strokeWidth="0.5" />
        <polygon points="34,8 40,4 46,8 46,16 40,20 34,16" fill="none" stroke="#00f3ff" strokeWidth="0.5" />
        <polygon points="46,8 52,4 58,8 58,16 52,20 46,16" fill="none" stroke="#00f3ff" strokeWidth="0.5" />
      </g>

      {/* --- EXPERIMENTAL FLASK (Central Element) --- */}
      <g className="ez-flask">
        {/* Flask Neck */}
        <rect x="28" y="10" width="8" height="10" fill="#001a1a" stroke="url(#holoGradientEZ)" strokeWidth="1.5" />

        {/* Flask Body */}
        <path
          className="ez-flask-body"
          d="M 24 20 L 24 36 L 16 52 L 48 52 L 40 36 L 40 20"
          fill="#001a1a"
          stroke="url(#holoGradientEZ)"
          strokeWidth="2"
          strokeLinejoin="round"
          filter="url(#glowEZ)"
        />

        {/* Flask Contents (Bubbling Liquid) */}
        <g clipPath="url(#flaskClip)">
          {/* Liquid Level */}
          <path
            className="ez-liquid"
            d="M 16 52 L 48 52 L 40 40 Q 32 38 24 40 L 16 52"
            fill="url(#alphaGradient)"
            opacity="0.4"
          />

          {/* Bubbles */}
          <circle cx="24" cy="48" r="2" fill="#bf00ff" className="ez-bubble b1" />
          <circle cx="32" cy="46" r="1.5" fill="#bf00ff" className="ez-bubble b2" />
          <circle cx="38" cy="50" r="2" fill="#bf00ff" className="ez-bubble b3" />
          <circle cx="28" cy="44" r="1" fill="#fff" className="ez-bubble b4" />
          <circle cx="36" cy="42" r="1" fill="#fff" className="ez-bubble b5" />
        </g>

        {/* Flask Cork/Cap */}
        <rect x="29" y="6" width="6" height="5" rx="1" fill="#00f3ff" className="ez-cap" />
      </g>

      {/* --- ORBITING PROTOTYPES --- */}
      <g className="ez-orbit-ring">
        <ellipse cx="32" cy="32" rx="28" ry="12" fill="none" stroke="#00f3ff" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
      </g>

      {/* Prototype Particles (Orbiting) */}
      <g className="ez-prototypes">
        {/* Prototype 1: Cube (Beta) */}
        <g className="ez-proto proto-1">
          <rect x="2" y="28" width="6" height="6" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" transform="rotate(45 5 31)" />
        </g>

        {/* Prototype 2: Triangle (Alpha) */}
        <g className="ez-proto proto-2">
          <polygon points="59,31 62,37 56,37" fill="#001a1a" stroke="url(#alphaGradient)" strokeWidth="1" />
        </g>

        {/* Prototype 3: Circle (Next Level) */}
        <g className="ez-proto proto-3">
          <circle cx="32" cy="58" r="3" fill="#001a1a" stroke="#ffcc00" strokeWidth="1" />
          <circle cx="32" cy="58" r="1" fill="#ffcc00" />
        </g>
      </g>

      {/* --- DNA HELIX (Evolution/Future) --- */}
      <g className="ez-dna" transform="translate(52, 20)">
        <path
          className="ez-dna-strand strand-1"
          d="M 0 0 Q 4 4 0 8 Q -4 12 0 16 Q 4 20 0 24"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1.5"
        />
        <path
          className="ez-dna-strand strand-2"
          d="M 0 0 Q -4 4 0 8 Q 4 12 0 16 Q -4 20 0 24"
          fill="none"
          stroke="url(#alphaGradient)"
          strokeWidth="1.5"
        />
        {/* DNA Rungs */}
        <line x1="-2" y1="4" x2="2" y2="4" stroke="#00f3ff" strokeWidth="1" opacity="0.6" />
        <line x1="-2" y1="12" x2="2" y2="12" stroke="#bf00ff" strokeWidth="1" opacity="0.6" />
        <line x1="-2" y1="20" x2="2" y2="20" stroke="#00f3ff" strokeWidth="1" opacity="0.6" />
      </g>

      {/* --- "WHAT IF" IDEA BUBBLES --- */}
      <g className="ez-ideas">
        {/* Idea 1 */}
        <g className="ez-idea idea-1">
          <circle cx="10" cy="24" r="5" fill="#001a1a" stroke="url(#ideaGradient)" strokeWidth="1" />
          <text x="10" y="26" textAnchor="middle" fontSize="6" fill="#ffcc00">?</text>
        </g>

        {/* Idea 2 */}
        <g className="ez-idea idea-2">
          <circle cx="54" cy="48" r="4" fill="#001a1a" stroke="url(#ideaGradient)" strokeWidth="1" />
          <text x="54" y="50" textAnchor="middle" fontSize="5" fill="#ffcc00">!</text>
        </g>

        {/* Idea 3 (Lightbulb) */}
        <g className="ez-idea idea-3">
          <circle cx="8" cy="44" r="3" fill="#001a1a" stroke="#ffcc00" strokeWidth="1" />
          <path d="M 7 42 L 8 40 L 9 42" stroke="#ffcc00" strokeWidth="0.5" fill="none" />
        </g>
      </g>

      {/* --- ALPHA/BETA INDICATORS --- */}
      <g className="ez-version-tags">
        {/* Alpha Tag */}
        <g className="ez-tag tag-alpha">
          <rect x="2" y="2" width="14" height="6" rx="1" fill="#bf00ff" opacity="0.8" />
          <text x="9" y="6.5" textAnchor="middle" fontSize="4" fill="#fff" fontWeight="bold">ALPHA</text>
        </g>

        {/* Beta Tag */}
        <g className="ez-tag tag-beta">
          <rect x="48" y="2" width="12" height="6" rx="1" fill="#00f3ff" opacity="0.8" />
          <text x="54" y="6.5" textAnchor="middle" fontSize="4" fill="#001a1a" fontWeight="bold">BETA</text>
        </g>
      </g>

      {/* --- FUTURE ARROW (Pointing Up) --- */}
      <g className="ez-future-arrow">
        <path
          d="M 32 2 L 36 8 L 34 8 L 34 14 L 30 14 L 30 8 L 28 8 Z"
          fill="url(#ideaGradient)"
          opacity="0.8"
          filter="url(#glowYellow)"
        />
      </g>

      {/* --- CONNECTING CIRCUIT LINES --- */}
      <g className="ez-circuits" opacity="0.4">
        <path d="M 16 52 L 8 56 L 8 60" stroke="#00f3ff" strokeWidth="1" fill="none" />
        <path d="M 48 52 L 56 56 L 56 60" stroke="#00f3ff" strokeWidth="1" fill="none" />
        <circle cx="8" cy="60" r="2" fill="#00f3ff" />
        <circle cx="56" cy="60" r="2" fill="#00f3ff" />
      </g>

      {/* --- SCANNING BEAM (Lab Scanner) --- */}
      <line
        className="ez-scanner"
        x1="0" y1="32"
        x2="64" y2="32"
        stroke="#bf00ff"
        strokeWidth="1"
        strokeDasharray="4 8"
        opacity="0.5"
      />

      {/* --- GLITCH LAYER --- */}
      <g className="ez-glitch">
        <path
          d="M 24 20 L 24 36 L 16 52 L 48 52 L 40 36 L 40 20"
          stroke="#fff"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
      </g>

    </svg>
  );
};
