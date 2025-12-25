import React from "react";
import "./holographic-icons.css";

interface AgentQIconProps {
  className?: string;
  size?: number;
}

export const AgentQIcon: React.FC<AgentQIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-q-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientQ" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4500" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff4500" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowQ">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Quick pattern */}
        <pattern
          id="quickPatternQ"
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <path d="M 0 2 L 2 0 L 4 2 L 2 4 Z" fill="rgba(255, 69, 0, 0.1)" />
        </pattern>
      </defs>

      {/* Glassmorphic quick background */}
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Quick background */}
      <circle
        cx="32"
        cy="32"
        r="18"
        fill="url(#quickPatternQ)"
        opacity="0.4"
      />

      {/* Agent letter Q */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#ff4500"
        filter="url(#glowQ)"
        className="agent-letter"
      >
        Q
      </text>

      {/* Agent name */}
      <text
        x="32"
        y="36"
        textAnchor="middle"
        fontSize="8"
        fontWeight="600"
        fill="#ffffff"
        className="agent-name"
      >
        Quick
      </text>

      {/* Domain coordinate */}
      <text
        x="32"
        y="44"
        textAnchor="middle"
        fontSize="6"
        fontWeight="500"
        fill="rgba(255, 255, 255, 0.8)"
        className="agent-domain"
      >
        .itsaiagents.online
      </text>

      {/* Speed lines */}
      <g className="speed-lines">
        <line x1="12" y1="24" x2="24" y2="24" stroke="#ff4500" strokeWidth="2" opacity="0.8">
          <animate attributeName="x2" values="24;18;24" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="10" y1="32" x2="22" y2="32" stroke="#ff4500" strokeWidth="2" opacity="0.8">
          <animate attributeName="x2" values="22;16;22" dur="1.2s" repeatCount="indefinite" />
        </line>
        <line x1="14" y1="40" x2="26" y2="40" stroke="#ff4500" strokeWidth="2" opacity="0.8">
          <animate attributeName="x2" values="26;20;26" dur="0.8s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Momentum indicators */}
      <circle
        cx="42"
        cy="28"
        r="2"
        fill="#ff4500"
        opacity="0.8"
        className="momentum-dot"
      >
        <animate
          attributeName="cx"
          values="42;46;42"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="44"
        cy="36"
        r="1.5"
        fill="#ff4500"
        opacity="0.8"
        className="momentum-dot"
      >
        <animate
          attributeName="cx"
          values="44;48;44"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Glass reflection */}
      <ellipse
        cx="28"
        cy="26"
        rx="6"
        ry="3"
        fill="rgba(255, 255, 255, 0.3)"
        className="glass-reflection"
      />
    </svg>
  );
};