import React from "react";
import "./holographic-icons.css";

interface AgentTIconProps {
  className?: string;
  size?: number;
}

export const AgentTIcon: React.FC<AgentTIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-t-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientT" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d2691e" stopOpacity="1" />
          <stop offset="100%" stopColor="#d2691e" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowT">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Timeline pattern */}
        <pattern
          id="timelinePatternT"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="4" cy="4" r="1" fill="rgba(210, 105, 30, 0.1)" />
          <line x1="4" y1="0" x2="4" y2="8" stroke="rgba(210, 105, 30, 0.2)" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Glassmorphic timeline background */}
      <rect
        x="14"
        y="20"
        width="36"
        height="24"
        rx="6"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Timeline background */}
      <rect
        x="16"
        y="22"
        width="32"
        height="20"
        rx="4"
        fill="url(#timelinePatternT)"
        opacity="0.4"
      />

      {/* Agent letter T */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#d2691e"
        filter="url(#glowT)"
        className="agent-letter"
      >
        T
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
        Time
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
        .itsai.wiki
      </text>

      {/* Timeline events */}
      <g className="timeline-events">
        <circle cx="24" cy="30" r="1.5" fill="#d2691e" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="32" cy="26" r="1.5" fill="#d2691e" opacity="0.8">
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="40" cy="30" r="1.5" fill="#d2691e" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Timeline connection */}
      <line
        x1="24"
        y1="30"
        x2="40"
        y2="30"
        stroke="rgba(210, 105, 30, 0.6)"
        strokeWidth="1"
        className="timeline-connection"
      >
        <animate
          attributeName="opacity"
          values="0.3;0.8;0.3"
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