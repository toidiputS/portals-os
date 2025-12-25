import React from 'react';
import './holographic-icons.css';

interface TerminalIconProps {
  className?: string;
  size?: number;
}

export const TerminalIcon: React.FC<TerminalIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon terminal-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientTerminal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00ff41" stopOpacity="1" />
          <stop offset="100%" stopColor="#00ff41" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowTerminal">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Terminal Window */}
      <rect
        x="8" y="12" width="48" height="40"
        stroke="url(#holoGradientTerminal)"
        strokeWidth="2"
        fill="none"
        filter="url(#glowTerminal)"
        className="terminal-window"
      />

      {/* Terminal Header Bar */}
      <rect
        x="8" y="12" width="48" height="6"
        fill="url(#holoGradientTerminal)"
        opacity="0.3"
        className="terminal-header"
      />

      {/* Terminal Controls */}
      <circle cx="14" cy="15" r="1.5" fill="#ff5f56" className="terminal-control close" />
      <circle cx="18" cy="15" r="1.5" fill="#ffbd2e" className="terminal-control minimize" />
      <circle cx="22" cy="15" r="1.5" fill="#27c93f" className="terminal-control maximize" />

      {/* Terminal Cursor */}
      <rect x="14" y="26" width="2" height="12" fill="#00ff41" className="terminal-cursor" />

      {/* Terminal Prompt */}
      <text x="20" y="35" fill="#00ff41" fontSize="8" fontFamily="monospace" className="terminal-prompt">
        $
      </text>

      {/* Terminal Text Lines */}
      <text x="26" y="35" fill="#00ff41" fontSize="6" fontFamily="monospace" opacity="0.8" className="terminal-text">
        oracle-os
      </text>
      <text x="14" y="44" fill="#00ff41" fontSize="6" fontFamily="monospace" opacity="0.6" className="terminal-text">
        ready
      </text>

      {/* Terminal Scan Line Effect */}
      <rect x="8" y="18" width="48" height="1" fill="#00ff41" opacity="0.3" className="terminal-scan" />

    </svg>
  );
};
