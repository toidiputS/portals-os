import React from "react";
import "./holographic-icons.css";

interface AgentOIconProps {
  className?: string;
  size?: number;
}

export const AgentOIcon: React.FC<AgentOIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-o-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientO" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6347" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff6347" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowO">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Optimization pattern */}
        <pattern
          id="optimizePatternO"
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 0 3 L 3 0 L 6 3 L 3 6 Z"
            stroke="rgba(255, 99, 71, 0.2)"
            strokeWidth="0.5"
            fill="none"
          />
        </pattern>
      </defs>

      {/* Glassmorphic optimization background */}
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Optimization background */}
      <circle
        cx="32"
        cy="32"
        r="18"
        fill="url(#optimizePatternO)"
        opacity="0.4"
      />

      {/* Agent letter O */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#ff6347"
        filter="url(#glowO)"
        className="agent-letter"
      >
        O
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
        Optimize
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
        .itsaiagent.solutions
      </text>

      {/* Performance bars */}
      <g className="performance-bars">
        <rect x="20" y="40" width="3" height="8" fill="#ff6347" opacity="0.8">
          <animate
            attributeName="height"
            values="6;8;6"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="25" y="38" width="3" height="10" fill="#ff6347" opacity="0.8">
          <animate
            attributeName="height"
            values="8;10;8"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="30" y="36" width="3" height="12" fill="#ff6347" opacity="0.8">
          <animate
            attributeName="height"
            values="10;12;10"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="35" y="38" width="3" height="10" fill="#ff6347" opacity="0.8">
          <animate
            attributeName="height"
            values="8;10;8"
            dur="1.1s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="40" y="40" width="3" height="8" fill="#ff6347" opacity="0.8">
          <animate
            attributeName="height"
            values="6;8;6"
            dur="0.9s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      {/* Bottleneck indicators */}
      <circle
        cx="26"
        cy="34"
        r="1"
        fill="#ff6347"
        opacity="0.8"
        className="bottleneck-indicator"
      >
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="38"
        cy="34"
        r="1"
        fill="#ff6347"
        opacity="0.8"
        className="bottleneck-indicator"
      >
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Optimization arrows */}
      <path
        d="M 22 26 L 26 24 L 26 28"
        stroke="#ff6347"
        strokeWidth="1"
        fill="none"
        className="optimize-arrow"
      >
        <animate
          attributeName="opacity"
          values="0.6;1;0.6"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M 42 26 L 38 24 L 38 28"
        stroke="#ff6347"
        strokeWidth="1"
        fill="none"
        className="optimize-arrow"
      >
        <animate
          attributeName="opacity"
          values="1;0.6;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

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
