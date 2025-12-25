import React from "react";
import "./holographic-icons.css";

interface AgentMIconProps {
  className?: string;
  size?: number;
}

export const AgentMIcon: React.FC<AgentMIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-m-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientM" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4169e1" stopOpacity="1" />
          <stop offset="100%" stopColor="#4169e1" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowM">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Workflow pattern */}
        <pattern
          id="workflowPatternM"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 0 4 L 4 0 L 8 4 L 4 8 Z"
            stroke="rgba(65, 105, 225, 0.2)"
            strokeWidth="0.5"
            fill="none"
          />
        </pattern>
      </defs>

      {/* Glassmorphic map background */}
      <rect
        x="14"
        y="18"
        width="36"
        height="28"
        rx="8"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Workflow background */}
      <rect
        x="16"
        y="20"
        width="32"
        height="24"
        rx="6"
        fill="url(#workflowPatternM)"
        opacity="0.4"
      />

      {/* Agent letter M */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#4169e1"
        filter="url(#glowM)"
        className="agent-letter"
      >
        M
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
        Map
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
        .itsaiagent.solutions
      </text>

      {/* Workflow nodes */}
      <g className="workflow-nodes">
        <circle cx="22" cy="26" r="2" fill="#4169e1" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="32" cy="22" r="2" fill="#4169e1" opacity="0.8">
          <animate
            attributeName="opacity"
            values="1;0.5;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="42" cy="26" r="2" fill="#4169e1" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="32" cy="32" r="2" fill="#4169e1" opacity="0.8">
          <animate
            attributeName="opacity"
            values="1;0.5;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="22" cy="38" r="2" fill="#4169e1" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="42" cy="38" r="2" fill="#4169e1" opacity="0.8">
          <animate
            attributeName="opacity"
            values="1;0.5;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Workflow connections */}
      <path
        d="M 22 26 L 32 22 L 42 26 L 32 32 L 22 26"
        stroke="rgba(65, 105, 225, 0.6)"
        strokeWidth="1"
        fill="none"
        className="workflow-connection"
      >
        <animate
          attributeName="opacity"
          values="0.3;0.8;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M 22 38 L 32 32 L 42 38"
        stroke="rgba(65, 105, 225, 0.6)"
        strokeWidth="1"
        fill="none"
        className="workflow-connection"
      >
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="3s"
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
