import React from "react";
import "./holographic-icons.css";

interface AgentPIconProps {
  className?: string;
  size?: number;
}

export const AgentPIcon: React.FC<AgentPIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-p-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientP" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#da70d6" stopOpacity="1" />
          <stop offset="100%" stopColor="#da70d6" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowP">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Polish pattern */}
        <pattern
          id="polishPatternP"
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="3" r="1.5" fill="rgba(218, 112, 214, 0.1)" />
          <circle cx="3" cy="3" r="0.5" fill="rgba(218, 112, 214, 0.2)" />
        </pattern>
      </defs>

      {/* Glassmorphic polish background */}
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Polish background */}
      <circle
        cx="32"
        cy="32"
        r="18"
        fill="url(#polishPatternP)"
        opacity="0.4"
      />

      {/* Agent letter P */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#da70d6"
        filter="url(#glowP)"
        className="agent-letter"
      >
        P
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
        Page Polisher
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
        .itsaiagents.online
      </text>

      {/* Polish sparkles */}
      <g className="polish-sparkles">
        <circle cx="24" cy="24" r="1" fill="#da70d6" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="40" cy="24" r="1" fill="#da70d6" opacity="0.8">
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="24" cy="40" r="1" fill="#da70d6" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="40" cy="40" r="1" fill="#da70d6" opacity="0.8">
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Polish lines */}
      <line
        x1="20"
        y1="32"
        x2="44"
        y2="32"
        stroke="rgba(218, 112, 214, 0.6)"
        strokeWidth="1"
        className="polish-line"
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
        y1="20"
        x2="32"
        y2="44"
        stroke="rgba(218, 112, 214, 0.6)"
        strokeWidth="1"
        className="polish-line"
      >
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="3s"
          repeatCount="indefinite"
        />
      </line>

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
