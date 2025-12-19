import React from 'react';
import './holographic-icons.css';

interface HIconProps {
  className?: string;
  size?: number;
}

export const HIcon: React.FC<HIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon helper-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientHelper" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="formGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="checklistGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="1" />
          <stop offset="100%" stopColor="#00cc66" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="templateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bf00ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#8000ff" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff9500" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff6b00" stopOpacity="0.9" />
        </linearGradient>
        <filter id="glowHelper">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowGreen">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowPurple">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className="helper-speed-lines" opacity="0.2">
        <line x1="0" y1="20" x2="12" y2="20" stroke="#ff9500" strokeWidth="1" />
        <line x1="0" y1="32" x2="8" y2="32" stroke="#ff9500" strokeWidth="1" />
        <line x1="0" y1="44" x2="10" y2="44" stroke="#ff9500" strokeWidth="1" />
        <line x1="52" y1="16" x2="64" y2="16" stroke="#ff9500" strokeWidth="1" />
        <line x1="56" y1="28" x2="64" y2="28" stroke="#ff9500" strokeWidth="1" />
        <line x1="54" y1="48" x2="64" y2="48" stroke="#ff9500" strokeWidth="1" />
      </g>
      <g className="helper-hub">
        <circle cx="32" cy="32" r="10" fill="#001a1a" stroke="url(#holoGradientHelper)" strokeWidth="2" filter="url(#glowHelper)" />
        <circle className="helper-inner-ring" cx="32" cy="32" r="7" fill="none" stroke="#00f3ff" strokeWidth="1" strokeDasharray="4 4" />
        <g transform="translate(32, 32)">
          <path d="M -3 -3 L -1 -1 L 1 -3 L 3 -1 L 1 1 L 3 3 L 1 3 L -1 1 L -3 3 L -3 1 L -1 -1 L -3 -3" fill="url(#speedGradient)" className="helper-tool" />
          <circle cx="2" cy="-2" r="1" fill="#fff" className="helper-sparkle" />
        </g>
        <circle className="helper-core-pulse" cx="32" cy="32" r="4" fill="#00f3ff" opacity="0.5" />
      </g>
      <g className="helper-output form-output" transform="translate(24, 2)">
        <rect className="helper-form" x="0" y="0" width="16" height="20" rx="1" fill="#001a1a" stroke="url(#formGradient)" strokeWidth="1" filter="url(#glowHelper)" />
        <rect x="2" y="3" width="12" height="2" rx="0.5" fill="#4facfe" opacity="0.3" />
        <rect x="2" y="7" width="12" height="2" rx="0.5" fill="#4facfe" opacity="0.3" />
        <rect x="2" y="11" width="8" height="2" rx="0.5" fill="#4facfe" opacity="0.3" />
        <text x="2" y="17" fontSize="2.5" fill="#4facfe" fontWeight="bold">FORM</text>
        <line className="helper-form-cursor" x1="6" y1="3.5" x2="6" y2="4.5" stroke="#fff" strokeWidth="0.5" />
        <line x1="8" y1="20" x2="8" y2="22" stroke="#4facfe" strokeWidth="0.5" strokeDasharray="1 1" className="helper-connect" />
      </g>
      <g className="helper-output checklist-output" transform="translate(2, 22)">
        <rect className="helper-checklist" x="0" y="0" width="16" height="20" rx="1" fill="#001a1a" stroke="url(#checklistGradient)" strokeWidth="1" filter="url(#glowGreen)" />
        <g className="helper-check-items">
          <rect x="2" y="3" width="3" height="3" rx="0.5" fill="none" stroke="#00ff88" strokeWidth="0.5" />
          <path className="helper-checkmark check-1" d="M 2.5 4.5 L 3.5 5.5 L 5 3.5" fill="none" stroke="#00ff88" strokeWidth="0.8" />
          <line x1="6" y1="4.5" x2="14" y2="4.5" stroke="#00ff88" strokeWidth="0.5" opacity="0.6" />
          <rect x="2" y="8" width="3" height="3" rx="0.5" fill="none" stroke="#00ff88" strokeWidth="0.5" />
          <path className="helper-checkmark check-2" d="M 2.5 9.5 L 3.5 10.5 L 5 8.5" fill="none" stroke="#00ff88" strokeWidth="0.8" />
          <line x1="6" y1="9.5" x2="12" y2="9.5" stroke="#00ff88" strokeWidth="0.5" opacity="0.6" />
          <rect x="2" y="13" width="3" height="3" rx="0.5" fill="none" stroke="#00ff88" strokeWidth="0.5" />
          <line x1="6" y1="14.5" x2="10" y2="14.5" stroke="#00ff88" strokeWidth="0.5" opacity="0.4" />
        </g>
        <text x="8" y="19" textAnchor="middle" fontSize="2" fill="#00ff88" fontWeight="bold">LIST</text>
        <line x1="16" y1="10" x2="20" y2="10" stroke="#00ff88" strokeWidth="0.5" strokeDasharray="1 1" className="helper-connect" />
      </g>
      <g className="helper-output template-output" transform="translate(46, 22)">
        <rect className="helper-template" x="0" y="0" width="16" height="20" rx="1" fill="#001a1a" stroke="url(#templateGradient)" strokeWidth="1" filter="url(#glowPurple)" />
        <rect x="2" y="3" width="12" height="4" rx="0.5" fill="#bf00ff" opacity="0.2" stroke="#bf00ff" strokeWidth="0.3" />
        <rect x="2" y="9" width="5" height="6" rx="0.5" fill="#bf00ff" opacity="0.2" stroke="#bf00ff" strokeWidth="0.3" />
        <rect x="9" y="9" width="5" height="6" rx="0.5" fill="#bf00ff" opacity="0.2" stroke="#bf00ff" strokeWidth="0.3" />
        <text x="8" y="18" textAnchor="middle" fontSize="2" fill="#bf00ff" fontWeight="bold">TMPL</text>
        <text x="8" y="5.5" textAnchor="middle" fontSize="3" fill="#bf00ff" opacity="0.7">[  ]</text>
        <line x1="0" y1="10" x2="-4" y2="10" stroke="#bf00ff" strokeWidth="0.5" strokeDasharray="1 1" className="helper-connect" />
      </g>
      <g className="helper-output minidoc-output" transform="translate(24, 42)">
        <rect className="helper-minidoc" x="0" y="0" width="16" height="18" rx="1" fill="#001a1a" stroke="url(#holoGradientHelper)" strokeWidth="1" filter="url(#glowHelper)" />
        <line x1="2" y1="4" x2="14" y2="4" stroke="#00f3ff" strokeWidth="0.5" opacity="0.6" />
        <line x1="2" y1="7" x2="12" y2="7" stroke="#00f3ff" strokeWidth="0.5" opacity="0.5" />
        <line x1="2" y1="10" x2="10" y2="10" stroke="#00f3ff" strokeWidth="0.5" opacity="0.4" />
        <line x1="2" y1="13" x2="8" y2="13" stroke="#00f3ff" strokeWidth="0.5" opacity="0.3" />
        <g transform="translate(12, 0)">
          <circle r="3" fill="url(#speedGradient)" className="helper-quick-badge" />
          <text x="0" y="1" textAnchor="middle" fontSize="3" fill="#fff" fontWeight="bold">⚡</text>
        </g>
        <line x1="8" y1="0" x2="8" y2="-4" stroke="#00f3ff" strokeWidth="0.5" strokeDasharray="1 1" className="helper-connect" />
      </g>
      <g className="helper-particles">
        <circle className="helper-particle p-1" cx="32" cy="20" r="1" fill="#4facfe" />
        <circle className="helper-particle p-2" cx="20" cy="32" r="1" fill="#00ff88" />
        <circle className="helper-particle p-3" cx="44" cy="32" r="1" fill="#bf00ff" />
        <circle className="helper-particle p-4" cx="32" cy="44" r="1" fill="#00f3ff" />
        <rect className="helper-speed-particle sp-1" x="14" y="10" width="3" height="1" rx="0.5" fill="#ff9500" />
        <rect className="helper-speed-particle sp-2" x="48" y="40" width="4" height="1" rx="0.5" fill="#ff9500" />
        <rect className="helper-speed-particle sp-3" x="10" y="50" width="3" height="1" rx="0.5" fill="#ff9500" />
      </g>
      <g className="helper-status" transform="translate(2, 2)">
        <rect x="0" y="0" width="18" height="5" rx="1" fill="#001a1a" stroke="#00ff88" strokeWidth="0.5" />
        <circle cx="3" cy="2.5" r="1.5" fill="#00ff88" className="helper-status-light" />
        <text x="6" y="3.5" fontSize="2.5" fill="#00ff88">READY</text>
      </g>
      <g className="helper-counter" transform="translate(46, 2)">
        <rect x="0" y="0" width="16" height="5" rx="1" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.5" />
        <text x="8" y="3.5" textAnchor="middle" fontSize="2.5" fill="#00f3ff" className="helper-count">+24 assets</text>
      </g>
      <g className="helper-actions">
        <g className="helper-action-btn btn-form" transform="translate(4, 56)">
          <rect x="0" y="0" width="14" height="5" rx="2" fill="url(#formGradient)" opacity="0.8" />
          <text x="7" y="3.5" textAnchor="middle" fontSize="2" fill="#fff" fontWeight="bold">+ Form</text>
        </g>
        <g className="helper-action-btn btn-list" transform="translate(20, 56)">
          <rect x="0" y="0" width="12" height="5" rx="2" fill="url(#checklistGradient)" opacity="0.8" />
          <text x="6" y="3.5" textAnchor="middle" fontSize="2" fill="#001a1a" fontWeight="bold">+ List</text>
        </g>
        <g className="helper-action-btn btn-tmpl" transform="translate(34, 56)">
          <rect x="0" y="0" width="12" height="5" rx="2" fill="url(#templateGradient)" opacity="0.8" />
          <text x="6" y="3.5" textAnchor="middle" fontSize="2" fill="#fff" fontWeight="bold">+ Tmpl</text>
        </g>
        <g className="helper-action-btn btn-quick" transform="translate(48, 56)">
          <rect x="0" y="0" width="12" height="5" rx="2" fill="url(#speedGradient)" opacity="0.8" />
          <text x="6" y="3.5" textAnchor="middle" fontSize="2" fill="#fff" fontWeight="bold">⚡ Go</text>
        </g>
      </g>
      <g className="helper-progress" transform="translate(32, 32)">
        <circle className="helper-progress-ring" r="14" fill="none" stroke="#00f3ff" strokeWidth="1" strokeDasharray="88" strokeDashoffset="22" opacity="0.3" />
      </g>
      <g className="helper-glitch">
        <circle cx="32" cy="32" r="10" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
      </g>
    </svg>
  );
};
