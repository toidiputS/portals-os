import React from "react";
import "./holographic-icons.css";

interface DIconProps {
  className?: string;
  size?: number;
}

export const DIcon: React.FC<DIconProps> = ({ className = "", size = 64 }) => {
  return (
    <svg
      className={`holo-d-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradientD" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff8c00" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff8c00" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowD">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <pattern
          id="textPatternD"
          x="0"
          y="0"
          width="6"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="2"
            x2="6"
            y2="2"
            stroke="rgba(255, 140, 0, 0.2)"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="4"
            x2="4"
            y2="4"
            stroke="rgba(255, 140, 0, 0.2)"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="6"
            x2="5"
            y2="6"
            stroke="rgba(255, 140, 0, 0.2)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>

      <rect
        x="14"
        y="14"
        width="36"
        height="36"
        rx="6"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="glass-bg"
      />

      <rect
        x="18"
        y="18"
        width="28"
        height="28"
        rx="4"
        fill="url(#textPatternD)"
        opacity="0.4"
      />

      <text
        x="32"
        y="32"
        textAnchor="middle"
        fontSize="20"
        fontWeight="700"
        fill="#ff8c00"
        filter="url(#glowD)"
        className="agent-letter"
      >
        D
      </text>

      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontSize="8"
        fontWeight="600"
        fill="#ffffff"
        className="agent-name"
      >
        Draft
      </text>

      <text
        x="32"
        y="48"
        textAnchor="middle"
        fontSize="6"
        fontWeight="500"
        fill="rgba(255, 255, 255, 0.8)"
        className="agent-domain"
      >
        .itsai.online
      </text>

      <line
        x1="40"
        y1="24"
        x2="40"
        y2="30"
        stroke="#ff8c00"
        strokeWidth="1"
        className="cursor-line"
      >
        <animate
          attributeName="opacity"
          values="1;0;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </line>

      <path
        d="M 20 26 Q 24 24 28 26 Q 32 28 36 26"
        stroke="rgba(255, 140, 0, 0.6)"
        strokeWidth="1"
        fill="none"
        className="flow-line"
      >
        <animate
          attributeName="d"
          values="M 20 26 Q 24 24 28 26 Q 32 28 36 26; M 20 28 Q 24 26 28 28 Q 32 30 36 28; M 20 26 Q 24 24 28 26 Q 32 28 36 26"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>

      <ellipse
        cx="24"
        cy="22"
        rx="6"
        ry="3"
        fill="rgba(255, 255, 255, 0.3)"
        className="glass-reflection"
      />

      <circle
        cx="22"
        cy="34"
        r="1"
        fill="#ff8c00"
        opacity="0.7"
        className="sparkle"
      >
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="42"
        cy="30"
        r="1"
        fill="#ff8c00"
        opacity="0.7"
        className="sparkle"
      >
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};
