import React from "react";
import "./holographic-icons.css";

interface AgentAIconProps {
  className?: string;
  size?: number;
}

export const AgentAIcon: React.FC<AgentAIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-a-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientA" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b6b" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff6b6b" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowA">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Agent domain clip path */}
        <clipPath id="domainClipA">
          <circle cx="32" cy="32" r="20" />
        </clipPath>
      </defs>

      {/* Glassmorphic background circle */}
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Agent letter A */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="24"
        fontWeight="700"
        fill="#ff6b6b"
        filter="url(#glowA)"
        className="agent-letter"
      >
        A
      </text>

      {/* Agent name */}
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontSize="8"
        fontWeight="600"
        fill="#ffffff"
        className="agent-name"
      >
        Angle
      </text>

      {/* Domain coordinate */}
      <text
        x="32"
        y="46"
        textAnchor="middle"
        fontSize="6"
        fontWeight="500"
        fill="rgba(255, 255, 255, 0.8)"
        className="agent-domain"
      >
        .itsai.services
      </text>

      {/* Personality indicator - Sharp/cynical focus */}
      <polygon
        points="32,8 36,16 32,14 28,16"
        fill="#ff6b6b"
        opacity="0.8"
        className="personality-indicator"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 32 12; 360 32 12"
          dur="8s"
          repeatCount="indefinite"
        />
      </polygon>

      {/* Glass reflection effect */}
      <ellipse
        cx="24"
        cy="24"
        rx="8"
        ry="4"
        fill="rgba(255, 255, 255, 0.3)"
        className="glass-reflection"
      />

      {/* Scanning lines for analytical personality */}
      <g clipPath="url(#domainClipA)">
        <line
          x1="0"
          y1="20"
          x2="64"
          y2="20"
          stroke="rgba(255, 107, 107, 0.3)"
          strokeWidth="0.5"
          className="scan-line-1"
        >
          <animate
            attributeName="x1"
            values="0;64;0"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="x2"
            values="64;128;64"
            dur="3s"
            repeatCount="indefinite"
          />
        </line>
        <line
          x1="0"
          y1="44"
          x2="64"
          y2="44"
          stroke="rgba(255, 107, 107, 0.3)"
          strokeWidth="0.5"
          className="scan-line-2"
        >
          <animate
            attributeName="x1"
            values="64;0;64"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="x2"
            values="128;64;128"
            dur="3s"
            repeatCount="indefinite"
          />
        </line>
      </g>

      {/* Animated target dots for laser focus */}
      <circle
        cx="16"
        cy="16"
        r="1"
        fill="#ff6b6b"
        opacity="0.6"
        className="target-dot"
      >
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="48"
        cy="16"
        r="1"
        fill="#ff6b6b"
        opacity="0.6"
        className="target-dot"
      >
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="16"
        cy="48"
        r="1"
        fill="#ff6b6b"
        opacity="0.6"
        className="target-dot"
      >
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="48"
        cy="48"
        r="1"
        fill="#ff6b6b"
        opacity="0.6"
        className="target-dot"
      >
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Glitch effect for cynical edge */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="24"
        fontWeight="700"
        fill="#ffffff"
        opacity="0.4"
        className="glitch-text"
      >
        A
      </text>
    </svg>
  );
};
