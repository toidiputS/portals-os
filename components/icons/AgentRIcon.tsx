import React from "react";
import "./holographic-icons.css";

interface AgentRIconProps {
  className?: string;
  size?: number;
}

export const AgentRIcon: React.FC<AgentRIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-r-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientR" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2e8b57" stopOpacity="1" />
          <stop offset="100%" stopColor="#2e8b57" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowR">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Research pattern */}
        <pattern
          id="researchPatternR"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="4" cy="4" r="1" fill="rgba(46, 139, 87, 0.1)" />
          <path
            d="M 2 2 L 6 6 M 6 2 L 2 6"
            stroke="rgba(46, 139, 87, 0.2)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>

      {/* Glassmorphic research background */}
      <rect
        x="16"
        y="16"
        width="32"
        height="32"
        rx="8"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Research background */}
      <rect
        x="18"
        y="18"
        width="28"
        height="28"
        rx="6"
        fill="url(#researchPatternR)"
        opacity="0.4"
      />

      {/* Agent letter R */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#2e8b57"
        filter="url(#glowR)"
        className="agent-letter"
      >
        R
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
        Research
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

      {/* Spy indicators */}
      <g className="spy-indicators">
        <circle cx="24" cy="24" r="1" fill="#2e8b57" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="40" cy="24" r="1" fill="#2e8b57" opacity="0.8">
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="32" cy="32" r="1" fill="#2e8b57" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Research beams */}
      <line
        x1="32"
        y1="20"
        x2="32"
        y2="24"
        stroke="rgba(46, 139, 87, 0.6)"
        strokeWidth="1"
        className="research-beam"
      >
        <animate
          attributeName="opacity"
          values="0.3;0.8;0.3"
          dur="2s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="28"
        y1="32"
        x2="24"
        y2="32"
        stroke="rgba(46, 139, 87, 0.6)"
        strokeWidth="1"
        className="research-beam"
      >
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="2s"
          repeatCount="indefinite"
        />
      </line>

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
