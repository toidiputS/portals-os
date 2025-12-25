import React from "react";
import "./holographic-icons.css";

interface AgentHIconProps {
  className?: string;
  size?: number;
}

export const AgentHIcon: React.FC<AgentHIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-h-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientH" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4500" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff4500" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowH">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Asset grid pattern */}
        <pattern
          id="assetPatternH"
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <rect x="1" y="1" width="4" height="4" fill="rgba(255, 69, 0, 0.1)" />
          <rect x="2" y="2" width="2" height="2" fill="rgba(255, 69, 0, 0.2)" />
        </pattern>
      </defs>

      {/* Glassmorphic asset box background */}
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

      {/* Asset grid background */}
      <rect
        x="18"
        y="18"
        width="28"
        height="28"
        rx="6"
        fill="url(#assetPatternH)"
        opacity="0.4"
      />

      {/* Agent letter H */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#ff4500"
        filter="url(#glowH)"
        className="agent-letter"
      >
        H
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
        Helper
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
        .itsai.help
      </text>

      {/* Asset management grid */}
      <g className="asset-grid">
        <rect
          x="20"
          y="22"
          width="4"
          height="4"
          rx="1"
          fill="rgba(255, 69, 0, 0.6)"
          className="asset-box"
        >
          <animate
            attributeName="opacity"
            values="0.4;0.8;0.4"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="26"
          y="22"
          width="4"
          height="4"
          rx="1"
          fill="rgba(255, 69, 0, 0.6)"
          className="asset-box"
        >
          <animate
            attributeName="opacity"
            values="0.8;0.4;0.8"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="32"
          y="22"
          width="4"
          height="4"
          rx="1"
          fill="rgba(255, 69, 0, 0.6)"
          className="asset-box"
        >
          <animate
            attributeName="opacity"
            values="0.4;0.8;0.4"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="38"
          y="22"
          width="4"
          height="4"
          rx="1"
          fill="rgba(255, 69, 0, 0.8)"
          className="asset-box"
        >
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      {/* Resource indicators */}
      <circle
        cx="24"
        cy="30"
        r="1"
        fill="#ff4500"
        opacity="0.8"
        className="resource-indicator"
      >
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="32"
        cy="30"
        r="1"
        fill="#ff4500"
        opacity="0.8"
        className="resource-indicator"
      >
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="40"
        cy="30"
        r="1"
        fill="#ff4500"
        opacity="0.8"
        className="resource-indicator"
      >
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Asset flow arrows */}
      <path
        d="M 22 38 L 26 36 L 26 40"
        stroke="#ff4500"
        strokeWidth="1"
        fill="none"
        className="asset-arrow"
      >
        <animate
          attributeName="opacity"
          values="0.6;1;0.6"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M 38 38 L 34 36 L 34 40"
        stroke="#ff4500"
        strokeWidth="1"
        fill="none"
        className="asset-arrow"
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
        cx="26"
        cy="26"
        rx="6"
        ry="3"
        fill="rgba(255, 255, 255, 0.3)"
        className="glass-reflection"
      />
    </svg>
  );
};
