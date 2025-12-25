import React from "react";
import "./holographic-icons.css";

interface AgentXIconProps {
  className?: string;
  size?: number;
}

export const AgentXIcon: React.FC<AgentXIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-x-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientX" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc143c" stopOpacity="1" />
          <stop offset="100%" stopColor="#dc143c" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowX">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* X-Ray pattern */}
        <pattern
          id="xrayPatternX"
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <path d="M 0 0 L 6 6 M 6 0 L 0 6" stroke="rgba(220, 20, 60, 0.2)" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Glassmorphic X-Ray background */}
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* X-Ray background */}
      <circle
        cx="32"
        cy="32"
        r="18"
        fill="url(#xrayPatternX)"
        opacity="0.4"
      />

      {/* Agent letter X */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#dc143c"
        filter="url(#glowX)"
        className="agent-letter"
      >
        X
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
        X-Ray
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
        .itsai.vip
      </text>

      {/* X-Ray beams */}
      <line
        x1="32"
        y1="20"
        x2="32"
        y2="24"
        stroke="rgba(220, 20, 60, 0.8)"
        strokeWidth="2"
        className="xray-beam"
      >
        <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="1s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="32"
        y1="40"
        x2="32"
        y2="44"
        stroke="rgba(220, 20, 60, 0.8)"
        strokeWidth="2"
        className="xray-beam"
      >
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </line>

      {/* Diagnostic scan lines */}
      <line
        x1="20"
        y1="32"
        x2="44"
        y2="32"
        stroke="rgba(220, 20, 60, 0.6)"
        strokeWidth="1"
        className="scan-line"
      >
        <animate
          attributeName="opacity"
          values="0.3;0.8;0.3"
          dur="2s"
          repeatCount="indefinite"
        />
      </line>

      {/* Specialist indicators */}
      <circle
        cx="26"
        cy="26"
        r="1"
        fill="#dc143c"
        opacity="0.8"
        className="specialist-indicator"
      >
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle
        cx="38"
        cy="26"
        r="1"
        fill="#dc143c"
        opacity="0.8"
        className="specialist-indicator"
      >
        <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle
        cx="26"
        cy="38"
        r="1"
        fill="#dc143c"
        opacity="0.8"
        className="specialist-indicator"
      >
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle
        cx="38"
        cy="38"
        r="1"
        fill="#dc143c"
        opacity="0.8"
        className="specialist-indicator"
      >
        <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
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