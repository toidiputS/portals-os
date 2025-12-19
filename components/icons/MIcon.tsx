import React from 'react';
import './holographic-icons.css';

interface MIconProps {
  className?: string;
  size?: number;
}

export const MIcon: React.FC<MIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon workflow-architect-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientWA" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.3" />
        </linearGradient>

        {/* Gold/Green gradient for the "optimal path" */}
        <linearGradient id="optimalPathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="1" />
          <stop offset="100%" stopColor="#00ffcc" stopOpacity="0.8" />
        </linearGradient>

        <filter id="glowWA">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowGreen">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* --- BACKGROUND GRID (Map Texture) --- */}
      <g opacity="0.15" className="wa-grid">
        <line x1="0" y1="16" x2="64" y2="16" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="0" y1="32" x2="64" y2="32" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="0" y1="48" x2="64" y2="48" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="16" y1="0" x2="16" y2="64" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="32" y1="0" x2="32" y2="64" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="48" y1="0" x2="48" y2="64" stroke="#00f3ff" strokeWidth="0.5" />
      </g>

      {/* --- SECONDARY PATHWAYS (Background connections) --- */}
      <g className="wa-secondary-paths" opacity="0.4">
        {/* Top branch */}
        <path d="M 12 12 L 24 20" stroke="#00f3ff" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M 24 20 L 20 32" stroke="#00f3ff" strokeWidth="1" strokeDasharray="2 2" />

        {/* Bottom branch */}
        <path d="M 12 52 L 24 44" stroke="#00f3ff" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M 24 44 L 20 32" stroke="#00f3ff" strokeWidth="1" strokeDasharray="2 2" />

        {/* Right side branches */}
        <path d="M 44 20 L 52 12" stroke="#00f3ff" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M 44 44 L 52 52" stroke="#00f3ff" strokeWidth="1" strokeDasharray="2 2" />
      </g>

      {/* --- THE OPTIMAL PATH (Straightest line to pay) --- */}
      <path
        id="optimalPath"
        className="wa-optimal-path"
        d="M 8 32 L 20 32 L 32 32 L 44 32 L 56 32"
        stroke="url(#optimalPathGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        filter="url(#glowGreen)"
      />

      {/* Optimal Path Aura */}
      <path
        d="M 8 32 L 56 32"
        stroke="#00ff88"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        opacity="0.1"
      />

      {/* --- SIGNAL PULSE (Travels the optimal path) --- */}
      <circle r="4" fill="#00ff88" filter="url(#glowGreen)" className="wa-signal-pulse">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path="M 8 32 L 20 32 L 32 32 L 44 32 L 56 32"
        />
        <animate attributeName="r" values="3;5;3" dur="0.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.6;1" dur="0.5s" repeatCount="indefinite" />
      </circle>

      {/* --- WORKFLOW NODES --- */}
      {/* START Node (Entry Point) */}
      <g className="wa-node node-start">
        <polygon points="8,26 14,32 8,38 2,32" fill="#001a1a" stroke="#00ff88" strokeWidth="2" />
        <circle cx="8" cy="32" r="2" fill="#00ff88" className="wa-node-core" />
      </g>

      {/* Checkpoint 1: Pre-Flight */}
      <g className="wa-node node-checkpoint cp1">
        <rect x="16" y="28" width="8" height="8" rx="1" fill="#001a1a" stroke="#00f3ff" strokeWidth="1.5" />
        <line x1="18" y1="32" x2="22" y2="32" stroke="#00f3ff" strokeWidth="1" />
        <line x1="20" y1="30" x2="20" y2="34" stroke="#00f3ff" strokeWidth="1" />
      </g>

      {/* Checkpoint 2: Central Hub (The Architect) */}
      <g className="wa-node node-hub">
        <circle cx="32" cy="32" r="8" fill="#001a1a" stroke="url(#holoGradientWA)" strokeWidth="2" filter="url(#glowWA)" />
        <circle cx="32" cy="32" r="4" fill="none" stroke="#00f3ff" strokeWidth="1" className="wa-hub-ring" />
        <circle cx="32" cy="32" r="2" fill="#fff" className="wa-hub-core" />
        {/* Radiating lines (Architect symbol) */}
        <line x1="32" y1="24" x2="32" y2="27" stroke="#00f3ff" strokeWidth="1" />
        <line x1="32" y1="37" x2="32" y2="40" stroke="#00f3ff" strokeWidth="1" />
        <line x1="24" y1="32" x2="27" y2="32" stroke="#00f3ff" strokeWidth="1" />
        <line x1="37" y1="32" x2="40" y2="32" stroke="#00f3ff" strokeWidth="1" />
      </g>

      {/* Checkpoint 3: Integration */}
      <g className="wa-node node-checkpoint cp2">
        <rect x="40" y="28" width="8" height="8" rx="1" fill="#001a1a" stroke="#00f3ff" strokeWidth="1.5" />
        <path d="M 42 30 L 46 34 M 46 30 L 42 34" stroke="#00f3ff" strokeWidth="1" />
      </g>

      {/* END Node: Target (Pay) */}
      <g className="wa-node node-target">
        <circle cx="56" cy="32" r="5" fill="#001a1a" stroke="#00ff88" strokeWidth="2" />
        <circle cx="56" cy="32" r="2" fill="#00ff88" className="wa-target-core" />
        {/* Dollar/Target symbol */}
        <line x1="56" y1="28" x2="56" y2="36" stroke="#00ff88" strokeWidth="1" opacity="0.5" />
      </g>

      {/* --- SECONDARY NODES (Branch points) --- */}
      <circle cx="12" cy="12" r="3" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" opacity="0.6" />
      <circle cx="12" cy="52" r="3" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" opacity="0.6" />
      <circle cx="24" cy="20" r="2" fill="#00f3ff" opacity="0.4" />
      <circle cx="24" cy="44" r="2" fill="#00f3ff" opacity="0.4" />
      <circle cx="52" cy="12" r="3" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" opacity="0.6" />
      <circle cx="52" cy="52" r="3" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" opacity="0.6" />

      {/* --- LABELS --- */}
      <text x="8" y="44" fontSize="4" fill="#00ff88" opacity="0.8" className="wa-label">START</text>
      <text x="32" y="46" fontSize="4" fill="#00f3ff" textAnchor="middle" opacity="0.8" className="wa-label">HUB</text>
      <text x="56" y="44" fontSize="4" fill="#00ff88" textAnchor="middle" opacity="0.8" className="wa-label">PAY</text>

      {/* --- CHECKLIST ITEMS (Top Left Corner) --- */}
      <g className="wa-checklist" transform="translate(4, 4)">
        <rect x="0" y="0" width="3" height="3" fill="#00ff88" className="wa-check c1" />
        <rect x="0" y="5" width="3" height="3" fill="#00ff88" className="wa-check c2" />
        <rect x="0" y="10" width="3" height="3" stroke="#00f3ff" strokeWidth="0.5" fill="none" className="wa-check c3" />
      </g>

      {/* --- DOCUMENT STACK (Bottom Right - Deliverables) --- */}
      <g className="wa-deliverables" transform="translate(50, 50)">
        <rect x="0" y="4" width="8" height="6" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.5" opacity="0.5" />
        <rect x="1" y="2" width="8" height="6" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.5" opacity="0.7" />
        <rect x="2" y="0" width="8" height="6" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" />
        <line x1="4" y1="2" x2="8" y2="2" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="4" y1="4" x2="7" y2="4" stroke="#00f3ff" strokeWidth="0.5" />
      </g>

      {/* --- GLITCH LAYER --- */}
      <g className="wa-glitch">
        <path d="M 8 32 L 56 32" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
        <circle cx="32" cy="32" r="8" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
      </g>

    </svg>
  );
};
