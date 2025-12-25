import React from "react";
import "./holographic-icons.css";

interface AgentEIconProps {
  className?: string;
  size?: number;
}

export const AgentEIcon: React.FC<AgentEIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-e-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientE" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9370db" stopOpacity="1" />
          <stop offset="100%" stopColor="#9370db" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowE">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Communication wave pattern */}
        <pattern
          id="wavePatternE"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 0 4 Q 2 2 4 4 Q 6 6 8 4"
            stroke="rgba(147, 112, 219, 0.2)"
            strokeWidth="0.5"
            fill="none"
          />
        </pattern>
      </defs>

      {/* Glassmorphic communication bubble */}
      <circle
        cx="32"
        cy="32"
        r="22"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Wave background */}
      <circle cx="32" cy="32" r="20" fill="url(#wavePatternE)" opacity="0.3" />

      {/* Agent letter E */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#9370db"
        filter="url(#glowE)"
        className="agent-letter"
      >
        E
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
        Email & DM
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
        .itsai.online
      </text>

      {/* Communication waves */}
      <circle
        cx="32"
        cy="32"
        r="8"
        fill="none"
        stroke="rgba(147, 112, 219, 0.6)"
        strokeWidth="1"
        className="comm-wave-1"
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
        stroke="rgba(147, 112, 219, 0.4)"
        strokeWidth="1"
        className="comm-wave-2"
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

      {/* Connection nodes */}
      <circle
        cx="32"
        cy="16"
        r="2"
        fill="#9370db"
        opacity="0.8"
        className="connection-node"
      >
        <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="32"
        cy="48"
        r="2"
        fill="#9370db"
        opacity="0.8"
        className="connection-node"
      >
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="16"
        cy="32"
        r="2"
        fill="#9370db"
        opacity="0.8"
        className="connection-node"
      >
        <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="48"
        cy="32"
        r="2"
        fill="#9370db"
        opacity="0.8"
        className="connection-node"
      >
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Glass reflection */}
      <ellipse
        cx="26"
        cy="26"
        rx="8"
        ry="4"
        fill="rgba(255, 255, 255, 0.3)"
        className="glass-reflection"
      />

      {/* Message bubbles */}
      <circle
        cx="20"
        cy="22"
        r="2"
        fill="rgba(147, 112, 219, 0.7)"
        className="message-bubble"
      >
        <animate
          attributeName="cy"
          values="22;20;22"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="44"
        cy="22"
        r="2"
        fill="rgba(147, 112, 219, 0.7)"
        className="message-bubble"
      >
        <animate
          attributeName="cy"
          values="22;24;22"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};
