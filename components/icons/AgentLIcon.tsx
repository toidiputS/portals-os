import React from "react";
import "./holographic-icons.css";

interface AgentLIconProps {
  className?: string;
  size?: number;
}

export const AgentLIcon: React.FC<AgentLIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-l-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientL" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00fa9a" stopOpacity="1" />
          <stop offset="100%" stopColor="#00fa9a" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowL">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Sound wave pattern */}
        <pattern
          id="soundPatternL"
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 0 3 Q 1.5 1 3 3 Q 4.5 5 6 3"
            stroke="rgba(0, 250, 154, 0.2)"
            strokeWidth="0.5"
            fill="none"
          />
        </pattern>
      </defs>

      {/* Glassmorphic sound wave background */}
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Sound background */}
      <circle cx="32" cy="32" r="18" fill="url(#soundPatternL)" opacity="0.4" />

      {/* Agent letter L */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#00fa9a"
        filter="url(#glowL)"
        className="agent-letter"
      >
        L
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
        Listen
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
        .itsai.chat
      </text>

      {/* Sound waves */}
      <circle
        cx="32"
        cy="32"
        r="8"
        fill="none"
        stroke="rgba(0, 250, 154, 0.6)"
        strokeWidth="1"
        className="sound-wave-1"
      >
        <animate
          attributeName="r"
          values="8;16;8"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.8;0;0.8"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="32"
        cy="32"
        r="12"
        fill="none"
        stroke="rgba(0, 250, 154, 0.4)"
        strokeWidth="1"
        className="sound-wave-2"
      >
        <animate
          attributeName="r"
          values="12;20;12"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.6;0;0.6"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Audio frequency bars */}
      <g className="frequency-bars">
        <rect x="24" y="40" width="2" height="8" fill="#00fa9a" opacity="0.8">
          <animate
            attributeName="height"
            values="4;8;4"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="28" y="38" width="2" height="10" fill="#00fa9a" opacity="0.8">
          <animate
            attributeName="height"
            values="6;10;6"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="32" y="36" width="2" height="12" fill="#00fa9a" opacity="0.8">
          <animate
            attributeName="height"
            values="8;12;8"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="36" y="38" width="2" height="10" fill="#00fa9a" opacity="0.8">
          <animate
            attributeName="height"
            values="6;10;6"
            dur="1.1s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="40" y="40" width="2" height="8" fill="#00fa9a" opacity="0.8">
          <animate
            attributeName="height"
            values="4;8;4"
            dur="0.9s"
            repeatCount="indefinite"
          />
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
