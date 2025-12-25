import React from "react";
import "./holographic-icons.css";

interface AgentNIconProps {
  className?: string;
  size?: number;
}

export const AgentNIcon: React.FC<AgentNIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-n-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientN" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b008b" stopOpacity="1" />
          <stop offset="100%" stopColor="#8b008b" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowN">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Neural network pattern */}
        <pattern
          id="neuralPatternN"
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="3" r="1" fill="rgba(139, 0, 139, 0.1)" />
          <circle cx="1" cy="1" r="0.5" fill="rgba(139, 0, 139, 0.2)" />
          <circle cx="5" cy="5" r="0.5" fill="rgba(139, 0, 139, 0.2)" />
        </pattern>
      </defs>

      {/* Glassmorphic neural background */}
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Neural background */}
      <circle
        cx="32"
        cy="32"
        r="18"
        fill="url(#neuralPatternN)"
        opacity="0.4"
      />

      {/* Agent letter N */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#8b008b"
        filter="url(#glowN)"
        className="agent-letter"
      >
        N
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
        Nerve Center
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

      {/* Neural network connections */}
      <g className="neural-network">
        <circle cx="24" cy="24" r="2" fill="#8b008b" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="40" cy="24" r="2" fill="#8b008b" opacity="0.8">
          <animate
            attributeName="opacity"
            values="1;0.5;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="32" cy="32" r="2" fill="#8b008b" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="24" cy="40" r="2" fill="#8b008b" opacity="0.8">
          <animate
            attributeName="opacity"
            values="1;0.5;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="40" cy="40" r="2" fill="#8b008b" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Neural connections */}
      <path
        d="M 24 24 L 32 32 L 40 24"
        stroke="rgba(139, 0, 139, 0.6)"
        strokeWidth="1"
        fill="none"
        className="neural-connection"
      >
        <animate
          attributeName="opacity"
          values="0.3;0.8;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M 24 40 L 32 32 L 40 40"
        stroke="rgba(139, 0, 139, 0.6)"
        strokeWidth="1"
        fill="none"
        className="neural-connection"
      >
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M 24 24 L 24 40"
        stroke="rgba(139, 0, 139, 0.4)"
        strokeWidth="0.5"
        fill="none"
        className="neural-connection"
      >
        <animate
          attributeName="opacity"
          values="0.2;0.6;0.2"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M 40 24 L 40 40"
        stroke="rgba(139, 0, 139, 0.4)"
        strokeWidth="0.5"
        fill="none"
        className="neural-connection"
      >
        <animate
          attributeName="opacity"
          values="0.6;0.2;0.6"
          dur="4s"
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
