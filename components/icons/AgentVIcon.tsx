import React from "react";
import "./holographic-icons.css";

interface AgentVIconProps {
  className?: string;
  size?: number;
}

export const AgentVIcon: React.FC<AgentVIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-v-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientV" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff1493" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff1493" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowV">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Velocity pattern */}
        <pattern
          id="velocityPatternV"
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <path d="M 0 3 L 3 0 L 6 3 L 3 6 Z" fill="rgba(255, 20, 147, 0.1)" />
        </pattern>
      </defs>

      {/* Glassmorphic velocity background */}
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Velocity background */}
      <circle
        cx="32"
        cy="32"
        r="18"
        fill="url(#velocityPatternV)"
        opacity="0.4"
      />

      {/* Agent letter V */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#ff1493"
        filter="url(#glowV)"
        className="agent-letter"
      >
        V
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
        Velocity
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
        .itsai.life
      </text>

      {/* Speed rings */}
      <circle
        cx="32"
        cy="32"
        r="8"
        fill="none"
        stroke="rgba(255, 20, 147, 0.6)"
        strokeWidth="2"
        className="speed-ring-1"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 32 32; 360 32 32"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="32"
        cy="32"
        r="12"
        fill="none"
        stroke="rgba(255, 20, 147, 0.4)"
        strokeWidth="1"
        className="speed-ring-2"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="360 32 32; 0 32 32"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Performance indicators */}
      <g className="performance-indicators">
        <rect x="22" y="40" width="2" height="6" fill="#ff1493" opacity="0.8">
          <animate attributeName="height" values="4;6;4" dur="1s" repeatCount="indefinite" />
        </rect>
        <rect x="26" y="38" width="2" height="8" fill="#ff1493" opacity="0.8">
          <animate attributeName="height" values="6;8;6" dur="1.2s" repeatCount="indefinite" />
        </rect>
        <rect x="30" y="36" width="2" height="10" fill="#ff1493" opacity="0.8">
          <animate attributeName="height" values="8;10;8" dur="0.8s" repeatCount="indefinite" />
        </rect>
        <rect x="34" y="38" width="2" height="8" fill="#ff1493" opacity="0.8">
          <animate attributeName="height" values="6;8;6" dur="1.1s" repeatCount="indefinite" />
        </rect>
        <rect x="38" y="40" width="2" height="6" fill="#ff1493" opacity="0.8">
          <animate attributeName="height" values="4;6;4" dur="0.9s" repeatCount="indefinite" />
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