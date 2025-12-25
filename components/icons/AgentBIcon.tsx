import React from "react";
import "./holographic-icons.css";

interface AgentBIconProps {
  className?: string;
  size?: number;
}

export const AgentBIcon: React.FC<AgentBIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-b-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientB" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ecdc4" stopOpacity="1" />
          <stop offset="100%" stopColor="#4ecdc4" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowB">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Architectural grid pattern */}
        <pattern
          id="gridPatternB"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 8 0 L 0 0 0 8"
            fill="none"
            stroke="rgba(78, 205, 196, 0.2)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>

      {/* Glassmorphic background */}
      <rect
        x="12"
        y="12"
        width="40"
        height="40"
        rx="6"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Grid background for architectural feel */}
      <rect
        x="12"
        y="12"
        width="40"
        height="40"
        rx="6"
        fill="url(#gridPatternB)"
        opacity="0.3"
      />

      {/* Agent letter B */}
      <text
        x="32"
        y="26"
        textAnchor="middle"
        fontSize="20"
        fontWeight="700"
        fill="#4ecdc4"
        filter="url(#glowB)"
        className="agent-letter"
      >
        B
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
        Blueprint
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
        .itsai.services
      </text>

      {/* Architectural compass for methodical personality */}
      <circle
        cx="32"
        cy="32"
        r="18"
        fill="none"
        stroke="rgba(78, 205, 196, 0.3)"
        strokeWidth="1"
        className="compass-ring"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 32 32; 360 32 32"
          dur="20s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Compass points */}
      <polygon
        points="32,14 34,18 32,16 30,18"
        fill="#4ecdc4"
        opacity="0.8"
        className="compass-north"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 32 32; 360 32 32"
          dur="20s"
          repeatCount="indefinite"
        />
      </polygon>

      {/* Blueprint lines - methodical structure */}
      <line
        x1="20"
        y1="28"
        x2="44"
        y2="28"
        stroke="rgba(78, 205, 196, 0.6)"
        strokeWidth="1"
        className="blueprint-line"
      >
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="4s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="20"
        y1="32"
        x2="44"
        y2="32"
        stroke="rgba(78, 205, 196, 0.6)"
        strokeWidth="1"
        className="blueprint-line"
      >
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="20"
        y1="36"
        x2="44"
        y2="36"
        stroke="rgba(78, 205, 196, 0.6)"
        strokeWidth="1"
        className="blueprint-line"
      >
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="4s"
          repeatCount="indefinite"
        />
      </line>

      {/* Corner brackets for structural feel */}
      <path
        d="M 16 16 L 20 16 L 20 20"
        stroke="#4ecdc4"
        strokeWidth="1"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M 48 16 L 44 16 L 44 20"
        stroke="#4ecdc4"
        strokeWidth="1"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M 16 48 L 20 48 L 20 44"
        stroke="#4ecdc4"
        strokeWidth="1"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M 48 48 L 44 48 L 44 44"
        stroke="#4ecdc4"
        strokeWidth="1"
        fill="none"
        opacity="0.7"
      />

      {/* Glass reflection */}
      <ellipse
        cx="24"
        cy="24"
        rx="6"
        ry="3"
        fill="rgba(255, 255, 255, 0.3)"
        className="glass-reflection"
      />

      {/* Precision dots */}
      <circle
        cx="24"
        cy="40"
        r="0.8"
        fill="#4ecdc4"
        opacity="0.8"
        className="precision-dot"
      >
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="40"
        cy="40"
        r="0.8"
        fill="#4ecdc4"
        opacity="0.8"
        className="precision-dot"
      >
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};
