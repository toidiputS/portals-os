import React from 'react';
import './holographic-icons.css';

interface AngleIconProps {
  className?: string;
  size?: number;
}

export const AngleIcon: React.FC<AngleIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon angle-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientAngle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.4" />
        </linearGradient>

        {/* Prism gradient (Rainbow refraction) */}
        <linearGradient id="prismGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#bf00ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ff00aa" stopOpacity="0.4" />
        </linearGradient>

        {/* Angle 1 - Velocity Red/Orange */}
        <linearGradient id="angle1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b35" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff9500" stopOpacity="0.9" />
        </linearGradient>

        {/* Angle 2 - Electric Blue */}
        <linearGradient id="angle2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.9" />
        </linearGradient>

        {/* Angle 3 - Magnetic Purple */}
        <linearGradient id="angle3Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bf00ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#8000ff" stopOpacity="0.9" />
        </linearGradient>

        {/* Flagship Gold */}
        <linearGradient id="flagshipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffaa00" stopOpacity="0.9" />
        </linearGradient>

        {/* Target/Bullseye gradient */}
        <linearGradient id="targetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="1" />
          <stop offset="100%" stopColor="#00cc66" stopOpacity="0.9" />
        </linearGradient>

        <filter id="glowAngle">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowGold">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowIntense">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* --- BACKGROUND: RADIAL GRID --- */}
      <g className="angle-grid" opacity="0.15">
        {/* Concentric circles */}
        <circle cx="32" cy="32" r="28" fill="none" stroke="#00f3ff" strokeWidth="0.3" />
        <circle cx="32" cy="32" r="20" fill="none" stroke="#00f3ff" strokeWidth="0.3" />
        <circle cx="32" cy="32" r="12" fill="none" stroke="#00f3ff" strokeWidth="0.3" />

        {/* Radial lines */}
        <line x1="32" y1="4" x2="32" y2="60" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="4" y1="32" x2="60" y2="32" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="10" y1="10" x2="54" y2="54" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="54" y1="10" x2="10" y2="54" stroke="#00f3ff" strokeWidth="0.3" />
      </g>

      {/* --- INPUT BEAM (Raw Offer) --- */}
      <g className="angle-input">
        <line
          className="angle-input-beam"
          x1="4" y1="32" x2="20" y2="32"
          stroke="url(#holoGradientAngle)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glowAngle)"
        />

        {/* Input label */}
        <text x="4" y="28" fontSize="3" fill="#00f3ff" opacity="0.7">OFFER</text>

        {/* Pulse on beam */}
        <circle className="angle-input-pulse" cx="12" cy="32" r="2" fill="#00f3ff" />
      </g>

      {/* --- CENTRAL PRISM --- */}
      <g className="angle-prism">
        {/* Prism triangle */}
        <path
          className="angle-prism-shape"
          d="M 20 32 L 32 16 L 44 32 L 32 48 Z"
          fill="#001a1a"
          stroke="url(#prismGradient)"
          strokeWidth="2"
          filter="url(#glowAngle)"
        />

        {/* Inner prism glow */}
        <path
          className="angle-prism-inner"
          d="M 24 32 L 32 22 L 40 32 L 32 42 Z"
          fill="url(#prismGradient)"
          opacity="0.3"
        />

        {/* Prism core */}
        <circle cx="32" cy="32" r="4" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" />
        <circle className="angle-prism-core" cx="32" cy="32" r="2" fill="#fff" />

        {/* Refraction lines inside prism */}
        <line x1="24" y1="32" x2="40" y2="28" stroke="#fff" strokeWidth="0.5" opacity="0.4" />
        <line x1="24" y1="32" x2="40" y2="32" stroke="#fff" strokeWidth="0.5" opacity="0.4" />
        <line x1="24" y1="32" x2="40" y2="36" stroke="#fff" strokeWidth="0.5" opacity="0.4" />
      </g>

      {/* --- OUTPUT ANGLES (3 Refracted Beams) --- */}
      <g className="angle-outputs">

        {/* Angle 1 (Top - Velocity) */}
        <g className="angle-output angle-1">
          <line
            className="angle-beam beam-1"
            x1="40" y1="28" x2="58" y2="12"
            stroke="url(#angle1Gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#glowAngle)"
          />
          {/* Angle endpoint */}
          <circle cx="58" cy="12" r="3" fill="#001a1a" stroke="url(#angle1Gradient)" strokeWidth="1.5" />
          <text x="58" y="13" textAnchor="middle" fontSize="3" fill="#ff6b35" fontWeight="bold">1</text>

          {/* Angle label */}
          <text x="52" y="8" fontSize="2.5" fill="#ff6b35" opacity="0.8">VELOCITY</text>
        </g>

        {/* Angle 2 (Middle - Primary) - FLAGSHIP */}
        <g className="angle-output angle-2 flagship">
          <line
            className="angle-beam beam-2 flagship-beam"
            x1="44" y1="32" x2="62" y2="32"
            stroke="url(#flagshipGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#glowGold)"
          />

          {/* Flagship indicator */}
          <g className="angle-flagship-marker">
            {/* Star burst */}
            <polygon
              className="angle-star"
              points="58,32 59.5,34 62,34 60,36 61,39 58,37 55,39 56,36 54,34 56.5,34"
              fill="url(#flagshipGradient)"
              filter="url(#glowGold)"
            />

            {/* Crown/badge */}
            <path d="M 54 28 L 56 30 L 58 27 L 60 30 L 62 28" fill="none" stroke="#ffd700" strokeWidth="1" className="angle-crown" />
          </g>

          {/* Flagship label */}
          <text x="58" y="42" textAnchor="middle" fontSize="2.5" fill="#ffd700" fontWeight="bold">★ FLAGSHIP</text>
        </g>

        {/* Angle 3 (Bottom - Magnetic) */}
        <g className="angle-output angle-3">
          <line
            className="angle-beam beam-3"
            x1="40" y1="36" x2="58" y2="52"
            stroke="url(#angle3Gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#glowAngle)"
          />
          {/* Angle endpoint */}
          <circle cx="58" cy="52" r="3" fill="#001a1a" stroke="url(#angle3Gradient)" strokeWidth="1.5" />
          <text x="58" y="53" textAnchor="middle" fontSize="3" fill="#bf00ff" fontWeight="bold">3</text>

          {/* Angle label */}
          <text x="52" y="58" fontSize="2.5" fill="#bf00ff" opacity="0.8">MAGNETIC</text>
        </g>
      </g>

      {/* --- PSYCHOLOGICAL TRIGGERS --- */}
      <g className="angle-triggers">
        {/* Trigger icons near each angle */}

        {/* Trigger 1 - Urgency (clock) */}
        <g className="angle-trigger trigger-1" transform="translate(50, 16)">
          <circle r="3" fill="#001a1a" stroke="#ff6b35" strokeWidth="0.5" />
          <text x="0" y="1" textAnchor="middle" fontSize="3" fill="#ff6b35">⏱</text>
        </g>

        {/* Trigger 2 - Value (diamond) */}
        <g className="angle-trigger trigger-2" transform="translate(56, 24)">
          <circle r="3" fill="#001a1a" stroke="#ffd700" strokeWidth="0.5" />
          <text x="0" y="1.5" textAnchor="middle" fontSize="3" fill="#ffd700">◆</text>
        </g>

        {/* Trigger 3 - Exclusivity (lock) */}
        <g className="angle-trigger trigger-3" transform="translate(50, 46)">
          <circle r="3" fill="#001a1a" stroke="#bf00ff" strokeWidth="0.5" />
          <text x="0" y="1" textAnchor="middle" fontSize="3" fill="#bf00ff">🔒</text>
        </g>
      </g>

      {/* --- CUT-THROUGH INDICATOR --- */}
      <g className="angle-cutthrough" transform="translate(4, 48)">
        <rect x="0" y="0" width="16" height="12" rx="1" fill="#001a1a" stroke="#00ff88" strokeWidth="0.5" />

        {/* Noise bars (competitors) */}
        <rect x="2" y="3" width="2" height="4" fill="#ff4444" opacity="0.4" />
        <rect x="5" y="2" width="2" height="5" fill="#ff4444" opacity="0.4" />
        <rect x="8" y="4" width="2" height="3" fill="#ff4444" opacity="0.4" />

        {/* Cutting through (your angle) */}
        <line className="angle-cut-line" x1="1" y1="5" x2="15" y2="5" stroke="url(#flagshipGradient)" strokeWidth="2" />

        <text x="8" y="11" textAnchor="middle" fontSize="2" fill="#00ff88">CUT-THROUGH</text>
      </g>

      {/* --- MARKET DIFFERENTIATION METER --- */}
      <g className="angle-diff-meter" transform="translate(4, 4)">
        <rect x="0" y="0" width="14" height="6" rx="1" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.5" />

        {/* Meter fill */}
        <rect className="angle-diff-fill" x="1" y="1" width="10" height="4" rx="0.5" fill="url(#targetGradient)" />

        <text x="7" y="10" textAnchor="middle" fontSize="2" fill="#00f3ff" opacity="0.8">UNIQUE</text>
      </g>

      {/* --- ANGLE MEASUREMENT ARCS --- */}
      <g className="angle-measurements" opacity="0.4">
        {/* Arc showing angle spread */}
        <path
          className="angle-arc arc-1"
          d="M 44 28 Q 50 32 44 36"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="0.5"
          strokeDasharray="2 1"
        />

        {/* Degree markers */}
        <text x="46" y="22" fontSize="2" fill="#ff6b35">15°</text>
        <text x="48" y="32" fontSize="2" fill="#ffd700">0°</text>
        <text x="46" y="42" fontSize="2" fill="#bf00ff">-15°</text>
      </g>

      {/* --- IRRESISTIBLE PULSE --- */}
      <g className="angle-irresistible">
        <circle className="angle-pulse pulse-1" cx="58" cy="32" r="4" fill="none" stroke="#ffd700" strokeWidth="1" />
        <circle className="angle-pulse pulse-2" cx="58" cy="32" r="4" fill="none" stroke="#ffd700" strokeWidth="1" />
        <circle className="angle-pulse pulse-3" cx="58" cy="32" r="4" fill="none" stroke="#ffd700" strokeWidth="1" />
      </g>

      {/* --- PARTICLES --- */}
      <g className="angle-particles">
        <circle className="angle-particle p-1" cx="36" cy="24" r="1" fill="#ff6b35" />
        <circle className="angle-particle p-2" cx="48" cy="32" r="1" fill="#ffd700" />
        <circle className="angle-particle p-3" cx="36" cy="40" r="1" fill="#bf00ff" />
        <rect className="angle-particle p-4" x="28" y="18" width="2" height="2" fill="#00f3ff" opacity="0.6" />
      </g>

      {/* --- STATUS --- */}
      <g className="angle-status" transform="translate(46, 4)">
        <rect x="0" y="0" width="16" height="5" rx="1" fill="#001a1a" stroke="#ffd700" strokeWidth="0.5" />
        <circle cx="3" cy="2.5" r="1.5" fill="#ffd700" className="angle-status-light" />
        <text x="6" y="3.5" fontSize="2.5" fill="#ffd700">LOCKED</text>
      </g>

      {/* --- GLITCH LAYER --- */}
      <g className="angle-glitch">
        <path d="M 20 32 L 32 16 L 44 32 L 32 48 Z" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
      </g>

    </svg>
  );
};
