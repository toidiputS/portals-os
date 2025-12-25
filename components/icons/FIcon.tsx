import React from "react";
import "./holographic-icons.css";

interface FIconProps {
  className?: string;
  size?: number;
}

export const FIcon: React.FC<FIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holo-f-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradientF" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ced1" stopOpacity="1" />
          <stop offset="100%" stopColor="#00ced1" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowF">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <pattern
          id="flowPatternF"
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 0 3 Q 1.5 1 3 3 Q 4.5 5 6 3"
            stroke="rgba(0, 206, 209, 0.2)"
            strokeWidth="0.5"
            fill="none"
          />
        </pattern>
      </defs>

      <path
        d="M 32 10 Q 42 20 42 32 Q 42 44 32 54 Q 22 44 22 32 Q 22 20 32 10"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="glass-bg"
      />

      <path
        d="M 32 12 Q 40 20 40 32 Q 40 44 32 52 Q 24 44 24 32 Q 24 20 32 12"
        fill="url(#flowPatternF)"
        opacity="0.4"
      />

      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#00ced1"
        filter="url(#glowF)"
        className="agent-letter"
      >
        F
      </text>

      <text
        x="32"
        y="36"
        textAnchor="middle"
        fontSize="8"
        fontWeight="600"
        fill="#ffffff"
        className="agent-name"
      >
        Flow
      </text>

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

      <circle
        cx="28"
        cy="20"
        r="1.5"
        fill="#00ced1"
        opacity="0.8"
        className="flow-particle"
      >
        <animateMotion dur="4s" repeatCount="indefinite">
          <path d="M 0 0 Q 8 8 0 16 Q -8 24 0 32" />
        </animateMotion>
      </circle>
      <circle
        cx="36"
        cy="44"
        r="1.5"
        fill="#00ced1"
        opacity="0.8"
        className="flow-particle"
      >
        <animateMotion dur="4s" repeatCount="indefinite">
          <path d="M 0 0 Q -8 -8 0 -16 Q 8 -24 0 -32" />
        </animateMotion>
      </circle>

      <path
        d="M 20 28 Q 24 26 28 28 Q 32 30 36 28"
        stroke="rgba(0, 206, 209, 0.6)"
        strokeWidth="1"
        fill="none"
        className="content-stream"
      >
        <animate
          attributeName="opacity"
          values="0.3;0.8;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M 24 36 Q 28 34 32 36 Q 36 38 40 36"
        stroke="rgba(0, 206, 209, 0.6)"
        strokeWidth="1"
        fill="none"
        className="content-stream"
      >
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>

      <ellipse
        cx="28"
        cy="24"
        rx="6"
        ry="3"
        fill="rgba(255, 255, 255, 0.3)"
        className="glass-reflection"
      />

      <circle
        cx="22"
        cy="32"
        r="1"
        fill="#00ced1"
        opacity="0.7"
        className="content-dot"
      >
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="42"
        cy="32"
        r="1"
        fill="#00ced1"
        opacity="0.7"
        className="content-dot"
      >
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};
