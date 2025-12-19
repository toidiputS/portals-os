import React from 'react';
import './holographic-icons.css';

interface XRayIconProps {
  className?: string;
  size?: number;
}

export const XRayIcon: React.FC<XRayIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon xray-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientXR" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.4" />
        </linearGradient>

        {/* X-Ray blue gradient */}
        <linearGradient id="xrayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4dc9ff" stopOpacity="1" />
          <stop offset="50%" stopColor="#00a8e8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0077b6" stopOpacity="0.6" />
        </linearGradient>

        {/* Risk/Warning gradient (Red) */}
        <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4444" stopOpacity="1" />
          <stop offset="100%" stopColor="#cc0000" stopOpacity="0.8" />
        </linearGradient>

        {/* Opportunity gradient (Green) */}
        <linearGradient id="opportunityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="1" />
          <stop offset="100%" stopColor="#00cc66" stopOpacity="0.8" />
        </linearGradient>

        {/* Vital/Health gradient (Yellow) */}
        <linearGradient id="vitalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffaa00" stopOpacity="0.8" />
        </linearGradient>

        <filter id="glowXR">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowXRay">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowRed">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Scan mask */}
        <clipPath id="scanMask">
          <rect x="12" y="12" width="40" height="40" rx="2" />
        </clipPath>
      </defs>

      {/* --- BACKGROUND: SCAN GRID --- */}
      <g className="xr-grid" opacity="0.15">
        <line x1="0" y1="16" x2="64" y2="16" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="0" y1="32" x2="64" y2="32" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="0" y1="48" x2="64" y2="48" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="16" y1="0" x2="16" y2="64" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="32" y1="0" x2="32" y2="64" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="48" y1="0" x2="48" y2="64" stroke="#00f3ff" strokeWidth="0.3" />
      </g>

      {/* --- SCANNER FRAME --- */}
      <rect
        className="xr-frame"
        x="8" y="8" width="48" height="48" rx="4"
        fill="#001a1a"
        stroke="url(#holoGradientXR)"
        strokeWidth="2"
        filter="url(#glowXR)"
      />

      {/* --- THE "X" STRUCTURE (X-Ray Beams) --- */}
      <g className="xr-x-beams" filter="url(#glowXRay)">
        {/* X Beam 1 (Top-left to Bottom-right) */}
        <path
          className="xr-beam beam-1"
          d="M 16 16 L 48 48"
          stroke="url(#xrayGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* X Beam 2 (Top-right to Bottom-left) */}
        <path
          className="xr-beam beam-2"
          d="M 48 16 L 16 48"
          stroke="url(#xrayGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Center intersection glow */}
        <circle cx="32" cy="32" r="6" fill="#001a1a" stroke="url(#xrayGradient)" strokeWidth="2" />
        <circle cx="32" cy="32" r="3" fill="url(#xrayGradient)" className="xr-center-core" />
      </g>

      {/* --- SCANNING RING (Rotating) --- */}
      <g className="xr-scan-ring">
        <circle
          cx="32" cy="32" r="22"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1"
          strokeDasharray="8 4"
          opacity="0.5"
        />
        {/* Scanning highlight arc */}
        <circle
          className="xr-scan-arc"
          cx="32" cy="32" r="22"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeDasharray="20 120"
          strokeLinecap="round"
          filter="url(#glowXR)"
        />
      </g>

      {/* --- HIDDEN ELEMENTS REVEALED --- */}
      <g className="xr-revealed" clipPath="url(#scanMask)">
        {/* Skeleton/Structure (Business bones) */}
        <g className="xr-skeleton" opacity="0.6">
          {/* Spine (Core business) */}
          <line x1="32" y1="18" x2="32" y2="46" stroke="#4dc9ff" strokeWidth="2" strokeDasharray="3 2" />

          {/* Ribs (Revenue streams) */}
          <line x1="24" y1="24" x2="40" y2="24" stroke="#4dc9ff" strokeWidth="1.5" />
          <line x1="22" y1="30" x2="42" y2="30" stroke="#4dc9ff" strokeWidth="1.5" />
          <line x1="24" y1="36" x2="40" y2="36" stroke="#4dc9ff" strokeWidth="1.5" />
          <line x1="26" y1="42" x2="38" y2="42" stroke="#4dc9ff" strokeWidth="1.5" />
        </g>

        {/* Risk Point (Hidden problem) */}
        <g className="xr-risk-point" transform="translate(42, 28)">
          <circle r="4" fill="url(#riskGradient)" opacity="0.8" filter="url(#glowRed)" className="xr-risk-pulse" />
          <text x="0" y="1.5" textAnchor="middle" fontSize="5" fill="#fff" fontWeight="bold">!</text>
        </g>

        {/* Opportunity Point (Hidden gold) */}
        <g className="xr-opportunity-point" transform="translate(22, 38)">
          <circle r="3" fill="url(#opportunityGradient)" opacity="0.8" className="xr-opp-pulse" />
          <text x="0" y="1" textAnchor="middle" fontSize="4" fill="#001a1a" fontWeight="bold">$</text>
        </g>
      </g>

      {/* --- VITAL SIGNS MONITOR (Top Right) --- */}
      <g className="xr-vitals" transform="translate(48, 4)">
        <rect x="0" y="0" width="14" height="20" rx="1" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.5" />

        {/* EKG Line */}
        <path
          className="xr-ekg"
          d="M 2 6 L 4 6 L 5 3 L 6 9 L 7 5 L 8 6 L 10 6 L 12 6"
          fill="none"
          stroke="#00ff88"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Heart rate */}
        <text x="7" y="13" textAnchor="middle" fontSize="4" fill="#00ff88" className="xr-bpm">72</text>
        <text x="7" y="17" textAnchor="middle" fontSize="2" fill="#00f3ff" opacity="0.7">BPM</text>
      </g>

      {/* --- RISK METER (Left Side) --- */}
      <g className="xr-risk-meter" transform="translate(2, 16)">
        <rect x="0" y="0" width="6" height="32" rx="1" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.5" />

        {/* Risk levels */}
        <rect x="1" y="1" width="4" height="6" fill="#00ff88" opacity="0.3" />
        <rect x="1" y="8" width="4" height="8" fill="#ffd700" opacity="0.3" />
        <rect x="1" y="17" width="4" height="8" fill="#ff6b00" opacity="0.3" />
        <rect x="1" y="26" width="4" height="5" fill="#ff4444" opacity="0.3" />

        {/* Current level indicator */}
        <rect x="0.5" y="14" width="5" height="3" rx="0.5" fill="url(#vitalGradient)" className="xr-risk-indicator" />

        {/* Labels */}
        <text x="-1" y="4" fontSize="2" fill="#00ff88" transform="rotate(-90 -1 4)">LOW</text>
        <text x="-1" y="28" fontSize="2" fill="#ff4444" transform="rotate(-90 -1 28)">HIGH</text>
      </g>

      {/* --- DATA READOUTS (Bottom) --- */}
      <g className="xr-readouts" transform="translate(10, 54)">
        {/* Profit indicator */}
        <g className="xr-readout profit">
          <rect x="0" y="0" width="12" height="6" rx="1" fill="#001a1a" stroke="#00ff88" strokeWidth="0.5" />
          <text x="6" y="4.5" textAnchor="middle" fontSize="3" fill="#00ff88" className="xr-value">+12%</text>
        </g>

        {/* Risk indicator */}
        <g className="xr-readout risk" transform="translate(14, 0)">
          <rect x="0" y="0" width="12" height="6" rx="1" fill="#001a1a" stroke="#ff4444" strokeWidth="0.5" />
          <text x="6" y="4.5" textAnchor="middle" fontSize="3" fill="#ff4444" className="xr-value">3 ⚠</text>
        </g>

        {/* Health score */}
        <g className="xr-readout health" transform="translate(28, 0)">
          <rect x="0" y="0" width="16" height="6" rx="1" fill="#001a1a" stroke="#ffd700" strokeWidth="0.5" />
          <text x="8" y="4.5" textAnchor="middle" fontSize="3" fill="#ffd700" className="xr-value">HEALTH: 78</text>
        </g>
      </g>

      {/* --- SCAN BEAM (Moving) --- */}
      <g className="xr-scan-beam" clipPath="url(#scanMask)">
        <line
          className="xr-beam-line"
          x1="8" y1="32" x2="56" y2="32"
          stroke="url(#xrayGradient)"
          strokeWidth="2"
          opacity="0.6"
        />
        <rect
          className="xr-beam-glow"
          x="8" y="30" width="48" height="4"
          fill="url(#xrayGradient)"
          opacity="0.2"
        />
      </g>

      {/* --- CORNER BRACKETS (Scan Target) --- */}
      <g className="xr-brackets" stroke="#00f3ff" strokeWidth="1.5" fill="none">
        {/* Top Left */}
        <path d="M 12 18 L 12 12 L 18 12" />
        {/* Top Right */}
        <path d="M 46 12 L 52 12 L 52 18" />
        {/* Bottom Left */}
        <path d="M 12 46 L 12 52 L 18 52" />
        {/* Bottom Right */}
        <path d="M 46 52 L 52 52 L 52 46" />
      </g>

      {/* --- ANALYSIS PARTICLES --- */}
      <g className="xr-particles">
        <circle className="xr-particle p-1" cx="20" cy="20" r="1" fill="#4dc9ff" />
        <circle className="xr-particle p-2" cx="44" cy="24" r="0.8" fill="#00ff88" />
        <circle className="xr-particle p-3" cx="24" cy="44" r="0.8" fill="#ffd700" />
        <circle className="xr-particle p-4" cx="40" cy="40" r="1" fill="#ff4444" />
        <circle className="xr-particle p-5" cx="32" cy="18" r="0.6" fill="#4dc9ff" />
      </g>

      {/* --- STATUS INDICATORS (Top Left) --- */}
      <g className="xr-status" transform="translate(2, 4)">
        <circle cx="3" cy="3" r="2" fill="#00ff88" className="xr-status-light active" />
        <text x="7" y="4.5" fontSize="3" fill="#00f3ff">SCANNING</text>
      </g>

      {/* --- MARCHING ORDERS (Bottom Right) --- */}
      <g className="xr-orders" transform="translate(48, 48)">
        <rect x="0" y="0" width="14" height="10" rx="1" fill="#001a1a" stroke="url(#opportunityGradient)" strokeWidth="0.5" />
        <line x1="2" y1="3" x2="8" y2="3" stroke="#00ff88" strokeWidth="0.5" />
        <line x1="2" y1="5" x2="10" y2="5" stroke="#00ff88" strokeWidth="0.5" />
        <line x1="2" y1="7" x2="6" y2="7" stroke="#00ff88" strokeWidth="0.5" />
        {/* Checkmarks */}
        <path d="M 10 2.5 L 11 3.5 L 12.5 1.5" stroke="#00ff88" strokeWidth="0.5" fill="none" />
        <circle cx="12" cy="6" r="1" fill="none" stroke="#ffd700" strokeWidth="0.5" />
      </g>

      {/* --- GLITCH LAYER --- */}
      <g className="xr-glitch">
        <path d="M 16 16 L 48 48 M 48 16 L 16 48" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
        <rect x="8" y="8" width="48" height="48" rx="4" stroke="#fff" strokeWidth="1" fill="none" opacity="0.3" />
      </g>

    </svg>
  );
};
