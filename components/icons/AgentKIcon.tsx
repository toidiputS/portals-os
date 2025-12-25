import React from "react";
import "./holographic-icons.css";

interface AgentKIconProps {
  className?: string;
  size?: number;
}

export const AgentKIcon: React.FC<AgentKIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-k-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientK" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffd700" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowK">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Heart pattern for loyal, caring personality */}
        <pattern
          id="heartPatternK"
          x="0"
          y="0"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 8 12 C 8 10, 6 10, 6 12 C 6 14, 8 16, 8 16 C 8 16, 10 14, 10 12 C 10 10, 8 10, 8 12 Z"
            fill="rgba(255, 215, 0, 0.1)"
          />
        </pattern>
      </defs>

      {/* Glassmorphic rounded background */}
      <rect
        x="10"
        y="10"
        width="44"
        height="44"
        rx="12"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Heart pattern background */}
      <rect
        x="10"
        y="10"
        width="44"
        height="44"
        rx="12"
        fill="url(#heartPatternK)"
        opacity="0.4"
      />

      {/* Agent letter K */}
      <text
        x="32"
        y="24"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#ffd700"
        filter="url(#glowK)"
        className="agent-letter"
      >
        K
      </text>

      {/* Agent name */}
      <text
        x="32"
        y="34"
        textAnchor="middle"
        fontSize="8"
        fontWeight="600"
        fill="#ffffff"
        className="agent-name"
      >
        Keep‑In‑Touch
      </text>

      {/* Domain coordinate */}
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontSize="6"
        fontWeight="500"
        fill="rgba(255, 255, 255, 0.8)"
        className="agent-domain"
      >
        .itsai.chat
      </text>

      {/* Connection network - warm follow-up energy */}
      <g className="connection-network">
        {/* Central node */}
        <circle
          cx="32"
          cy="32"
          r="2"
          fill="#ffd700"
          opacity="0.8"
          className="central-node"
        >
          <animate
            attributeName="r"
            values="2;3;2"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Connection lines */}
        <line
          x1="32"
          y1="32"
          x2="32"
          y2="20"
          stroke="rgba(255, 215, 0, 0.6)"
          strokeWidth="1"
          className="connection-line"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.8;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </line>
        <line
          x1="32"
          y1="32"
          x2="32"
          y2="44"
          stroke="rgba(255, 215, 0, 0.6)"
          strokeWidth="1"
          className="connection-line"
        >
          <animate
            attributeName="opacity"
            values="0.8;0.3;0.8"
            dur="3s"
            repeatCount="indefinite"
          />
        </line>
        <line
          x1="32"
          y1="32"
          x2="20"
          y2="32"
          stroke="rgba(255, 215, 0, 0.6)"
          strokeWidth="1"
          className="connection-line"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.8;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </line>
        <line
          x1="32"
          y1="32"
          x2="44"
          y2="32"
          stroke="rgba(255, 215, 0, 0.6)"
          strokeWidth="1"
          className="connection-line"
        >
          <animate
            attributeName="opacity"
            values="0.8;0.3;0.8"
            dur="3s"
            repeatCount="indefinite"
          />
        </line>

        {/* Outer nodes */}
        <circle
          cx="32"
          cy="20"
          r="1.5"
          fill="#ffd700"
          opacity="0.7"
          className="outer-node"
        >
          <animate
            attributeName="opacity"
            values="0.4;0.9;0.4"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="32"
          cy="44"
          r="1.5"
          fill="#ffd700"
          opacity="0.7"
          className="outer-node"
        >
          <animate
            attributeName="opacity"
            values="0.9;0.4;0.9"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="20"
          cy="32"
          r="1.5"
          fill="#ffd700"
          opacity="0.7"
          className="outer-node"
        >
          <animate
            attributeName="opacity"
            values="0.4;0.9;0.4"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="44"
          cy="32"
          r="1.5"
          fill="#ffd700"
          opacity="0.7"
          className="outer-node"
        >
          <animate
            attributeName="opacity"
            values="0.9;0.4;0.9"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Follow-up pulse rings */}
      <circle
        cx="32"
        cy="32"
        r="8"
        fill="none"
        stroke="rgba(255, 215, 0, 0.4)"
        strokeWidth="1"
        className="pulse-ring"
      >
        <animate
          attributeName="r"
          values="8;16;8"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.6;0;0.6"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="32"
        cy="32"
        r="12"
        fill="none"
        stroke="rgba(255, 215, 0, 0.2)"
        strokeWidth="1"
        className="pulse-ring"
      >
        <animate
          attributeName="r"
          values="12;20;12"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.4;0;0.4"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Glass reflection */}
      <ellipse
        cx="22"
        cy="22"
        rx="8"
        ry="4"
        fill="rgba(255, 255, 255, 0.3)"
        className="glass-reflection"
      />

      {/* Warmth indicators - small hearts */}
      <path
        d="M 18 18 C 18 17, 17 17, 17 18 C 17 19, 18 20, 18 20 C 18 20, 19 19, 19 18 C 19 17, 18 17, 18 18 Z"
        fill="rgba(255, 215, 0, 0.6)"
        className="warmth-heart"
      >
        <animate
          attributeName="opacity"
          values="0.3;0.8;0.3"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M 46 18 C 46 17, 45 17, 45 18 C 45 19, 46 20, 46 20 C 46 20, 47 19, 47 18 C 47 17, 46 17, 46 18 Z"
        fill="rgba(255, 215, 0, 0.6)"
        className="warmth-heart"
      >
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};
