import React from "react";
import "./holographic-icons.css";

interface AgentSIconProps {
  className?: string;
  size?: number;
}

export const AgentSIcon: React.FC<AgentSIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-s-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientS" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4682b4" stopOpacity="1" />
          <stop offset="100%" stopColor="#4682b4" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowS">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Knowledge scroll pattern */}
        <pattern
          id="scrollPatternS"
          x="0"
          y="0"
          width="6"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path d="M 0 2 L 6 2 L 6 4 L 0 4 Z" fill="rgba(70, 130, 180, 0.1)" />
        </pattern>
      </defs>

      {/* Glassmorphic scroll background */}
      <rect
        x="16"
        y="18"
        width="32"
        height="28"
        rx="8"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Scroll background */}
      <rect
        x="18"
        y="20"
        width="28"
        height="24"
        rx="6"
        fill="url(#scrollPatternS)"
        opacity="0.4"
      />

      {/* Agent letter S */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#4682b4"
        filter="url(#glowS)"
        className="agent-letter"
      >
        S
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
        Scroll
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
        .itsai.wiki
      </text>

      {/* Scroll lines */}
      <g className="scroll-lines">
        <line
          x1="22"
          y1="24"
          x2="42"
          y2="24"
          stroke="#4682b4"
          strokeWidth="1"
          opacity="0.6"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.8;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </line>
        <line
          x1="22"
          y1="28"
          x2="40"
          y2="28"
          stroke="#4682b4"
          strokeWidth="1"
          opacity="0.6"
        >
          <animate
            attributeName="opacity"
            values="0.8;0.3;0.8"
            dur="3s"
            repeatCount="indefinite"
          />
        </line>
        <line
          x1="22"
          y1="32"
          x2="42"
          y2="32"
          stroke="#4682b4"
          strokeWidth="1"
          opacity="0.6"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.8;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </line>
        <line
          x1="22"
          y1="36"
          x2="38"
          y2="36"
          stroke="#4682b4"
          strokeWidth="1"
          opacity="0.6"
        >
          <animate
            attributeName="opacity"
            values="0.8;0.3;0.8"
            dur="3s"
            repeatCount="indefinite"
          />
        </line>
      </g>

      {/* Knowledge dots */}
      <circle cx="26" cy="26" r="1" fill="#4682b4" opacity="0.8">
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="38" cy="30" r="1" fill="#4682b4" opacity="0.8">
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="2s"
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
