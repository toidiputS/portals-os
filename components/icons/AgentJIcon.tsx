import React from "react";
import "./holographic-icons.css";

interface AgentJIconProps {
  className?: string;
  size?: number;
}

export const AgentJIcon: React.FC<AgentJIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-j-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientJ" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff1493" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff1493" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowJ">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Conversation bubble pattern */}
        <pattern
          id="bubblePatternJ"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="4" cy="4" r="2" fill="rgba(255, 20, 147, 0.1)" />
        </pattern>
      </defs>

      {/* Glassmorphic conversation background */}
      <ellipse
        cx="32"
        cy="32"
        rx="22"
        ry="18"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Bubble background */}
      <ellipse
        cx="32"
        cy="32"
        rx="20"
        ry="16"
        fill="url(#bubblePatternJ)"
        opacity="0.4"
      />

      {/* Agent letter J */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#ff1493"
        filter="url(#glowJ)"
        className="agent-letter"
      >
        J
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
        Jam
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
        .itsai.chat
      </text>

      {/* Conversation bubbles */}
      <g className="conversation-bubbles">
        <ellipse
          cx="24"
          cy="24"
          rx="6"
          ry="4"
          fill="rgba(255, 20, 147, 0.6)"
          className="chat-bubble"
        >
          <animate
            attributeName="opacity"
            values="0.4;0.8;0.4"
            dur="2s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse
          cx="40"
          cy="28"
          rx="8"
          ry="5"
          fill="rgba(255, 20, 147, 0.6)"
          className="chat-bubble"
        >
          <animate
            attributeName="opacity"
            values="0.8;0.4;0.8"
            dur="2s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse
          cx="28"
          cy="40"
          rx="7"
          ry="4"
          fill="rgba(255, 20, 147, 0.6)"
          className="chat-bubble"
        >
          <animate
            attributeName="opacity"
            values="0.4;0.8;0.4"
            dur="2s"
            repeatCount="indefinite"
          />
        </ellipse>
      </g>

      {/* Message flow lines */}
      <path
        d="M 20 26 Q 24 24 28 26"
        stroke="rgba(255, 20, 147, 0.6)"
        strokeWidth="1"
        fill="none"
        className="message-flow"
      >
        <animate
          attributeName="opacity"
          values="0.3;0.8;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M 36 30 Q 40 28 44 30"
        stroke="rgba(255, 20, 147, 0.6)"
        strokeWidth="1"
        fill="none"
        className="message-flow"
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