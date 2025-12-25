import React from "react";
import "./holographic-icons.css";

interface AgentUIconProps {
  className?: string;
  size?: number;
}

export const AgentUIcon: React.FC<AgentUIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-u-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientU" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9370db" stopOpacity="1" />
          <stop offset="100%" stopColor="#9370db" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowU">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Unfold pattern */}
        <pattern
          id="unfoldPatternU"
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <path d="M 0 3 L 3 0 L 6 3 L 3 6 Z" fill="rgba(147, 112, 219, 0.1)" />
        </pattern>
      </defs>

      {/* Glassmorphic unfold background */}
      <path
        d="M 32 14 Q 42 24 42 32 Q 42 40 32 50 Q 22 40 22 32 Q 22 24 32 14"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Unfold background */}
      <path
        d="M 32 16 Q 40 24 40 32 Q 40 40 32 48 Q 24 40 24 32 Q 24 24 32 16"
        fill="url(#unfoldPatternU)"
        opacity="0.4"
      />

      {/* Agent letter U */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#9370db"
        filter="url(#glowU)"
        className="agent-letter"
      >
        U
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
        Unfold
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

      {/* Unfold arrows */}
      <path
        d="M 24 32 L 28 28 L 28 36"
        stroke="#9370db"
        strokeWidth="1"
        fill="none"
        className="unfold-arrow"
      >
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
      </path>
      <path
        d="M 40 32 L 36 28 L 36 36"
        stroke="#9370db"
        strokeWidth="1"
        fill="none"
        className="unfold-arrow"
      >
        <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
      </path>

      {/* Deconstruction layers */}
      <circle
        cx="32"
        cy="32"
        r="12"
        fill="none"
        stroke="rgba(147, 112, 219, 0.4)"
        strokeWidth="1"
        className="deconstruct-layer"
      >
        <animate
          attributeName="r"
          values="12;16;12"
          dur="3s"
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