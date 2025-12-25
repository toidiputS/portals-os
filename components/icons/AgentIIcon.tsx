import React from "react";
import "./holographic-icons.css";

interface AgentIIconProps {
  className?: string;
  size?: number;
}

export const AgentIIcon: React.FC<AgentIIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-i-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientI" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8a2be2" stopOpacity="1" />
          <stop offset="100%" stopColor="#8a2be2" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowI">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Structure pattern */}
        <pattern
          id="structurePatternI"
          x="0"
          y="0"
          width="4"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="2"
            y1="0"
            x2="2"
            y2="8"
            stroke="rgba(138, 43, 226, 0.2)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>

      {/* Glassmorphic structure background */}
      <rect
        x="20"
        y="14"
        width="24"
        height="36"
        rx="12"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Structure background */}
      <rect
        x="22"
        y="16"
        width="20"
        height="32"
        rx="10"
        fill="url(#structurePatternI)"
        opacity="0.4"
      />

      {/* Agent letter I */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#8a2be2"
        filter="url(#glowI)"
        className="agent-letter"
      >
        I
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
        Interpreter
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

      {/* Data interpretation lines */}
      <line
        x1="24"
        y1="24"
        x2="40"
        y2="24"
        stroke="rgba(138, 43, 226, 0.6)"
        strokeWidth="1"
        className="interpret-line"
      >
        <animate
          attributeName="opacity"
          values="0.3;0.8;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="24"
        y1="32"
        x2="40"
        y2="32"
        stroke="rgba(138, 43, 226, 0.6)"
        strokeWidth="1"
        className="interpret-line"
      >
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="3s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="24"
        y1="40"
        x2="36"
        y2="40"
        stroke="rgba(138, 43, 226, 0.6)"
        strokeWidth="1"
        className="interpret-line"
      >
        <animate
          attributeName="opacity"
          values="0.3;0.8;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </line>

      {/* Analysis nodes */}
      <circle
        cx="28"
        cy="24"
        r="1"
        fill="#8a2be2"
        opacity="0.8"
        className="analysis-node"
      >
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="36"
        cy="32"
        r="1"
        fill="#8a2be2"
        opacity="0.8"
        className="analysis-node"
      >
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="32"
        cy="40"
        r="1"
        fill="#8a2be2"
        opacity="0.8"
        className="analysis-node"
      >
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Glass reflection */}
      <ellipse
        cx="28"
        cy="24"
        rx="6"
        ry="3"
        fill="rgba(255, 255, 255, 0.3)"
        className="glass-reflection"
      />
    </svg>
  );
};
