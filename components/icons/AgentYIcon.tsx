import React from "react";
import "./holographic-icons.css";

interface AgentYIconProps {
  className?: string;
  size?: number;
}

export const AgentYIcon: React.FC<AgentYIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-y-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientY" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#32cd32" stopOpacity="1" />
          <stop offset="100%" stopColor="#32cd32" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowY">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Yield pattern */}
        <pattern
          id="yieldPatternY"
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="3" r="1" fill="rgba(50, 205, 50, 0.1)" />
          <path d="M 0 3 L 6 3" stroke="rgba(50, 205, 50, 0.2)" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Glassmorphic yield background */}
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Yield background */}
      <circle
        cx="32"
        cy="32"
        r="18"
        fill="url(#yieldPatternY)"
        opacity="0.4"
      />

      {/* Agent letter Y */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#32cd32"
        filter="url(#glowY)"
        className="agent-letter"
      >
        Y
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
        Yield
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
        .itsai.vip
      </text>

      {/* ROI indicators */}
      <g className="roi-indicators">
        <circle cx="24" cy="24" r="1.5" fill="#32cd32" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="40" cy="24" r="1.5" fill="#32cd32" opacity="0.8">
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="32" cy="32" r="1.5" fill="#32cd32" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="24" cy="40" r="1.5" fill="#32cd32" opacity="0.8">
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="40" cy="40" r="1.5" fill="#32cd32" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Investment lines */}
      <line
        x1="24"
        y1="24"
        x2="40"
        y2="40"
        stroke="rgba(50, 205, 50, 0.6)"
        strokeWidth="1"
        className="investment-line"
      >
        <animate
          attributeName="opacity"
          values="0.3;0.8;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="40"
        y1="24"
        x2="24"
        y2="40"
        stroke="rgba(50, 205, 50, 0.6)"
        strokeWidth="1"
        className="investment-line"
      >
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="3s"
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