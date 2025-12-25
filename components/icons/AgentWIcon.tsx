import React from "react";
import "./holographic-icons.css";

interface AgentWIconProps {
  className?: string;
  size?: number;
}

export const AgentWIcon: React.FC<AgentWIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-w-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientW" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff8c00" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff8c00" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowW">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Warp pattern */}
        <pattern
          id="warpPatternW"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 0 4 Q 2 0 4 4 Q 6 8 8 4"
            stroke="rgba(255, 140, 0, 0.2)"
            strokeWidth="0.5"
            fill="none"
          />
        </pattern>
      </defs>

      {/* Glassmorphic warp background */}
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Warp background */}
      <circle
        cx="32"
        cy="32"
        r="18"
        fill="url(#warpPatternW)"
        opacity="0.4"
      />

      {/* Agent letter W */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="20"
        fontWeight="700"
        fill="#ff8c00"
        filter="url(#glowW)"
        className="agent-letter"
      >
        W
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
        Warp
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

      {/* Warp rings */}
      <circle
        cx="32"
        cy="32"
        r="8"
        fill="none"
        stroke="rgba(255, 140, 0, 0.6)"
        strokeWidth="2"
        className="warp-ring-1"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 32 32; 360 32 32"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="32"
        cy="32"
        r="12"
        fill="none"
        stroke="rgba(255, 140, 0, 0.4)"
        strokeWidth="1"
        className="warp-ring-2"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="360 32 32; 0 32 32"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Power shortcuts */}
      <g className="power-shortcuts">
        <rect x="20" y="24" width="4" height="2" fill="#ff8c00" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
        </rect>
        <rect x="26" y="22" width="4" height="2" fill="#ff8c00" opacity="0.8">
          <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
        </rect>
        <rect x="32" y="20" width="4" height="2" fill="#ff8c00" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
        </rect>
        <rect x="38" y="22" width="4" height="2" fill="#ff8c00" opacity="0.8">
          <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
        </rect>
      </g>

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