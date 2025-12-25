import React from "react";
import "./holographic-icons.css";

interface AgentZIconProps {
  className?: string;
  size?: number;
}

export const AgentZIcon: React.FC<AgentZIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holographic-icon agent-z-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="agentGradientZ" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff00ff" stopOpacity="1" />
          <stop offset="50%" stopColor="#00ffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffff00" stopOpacity="0.6" />
        </linearGradient>

        <filter id="glowZ">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Experimental particles pattern */}
        <pattern
          id="particlePatternZ"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="4" cy="4" r="1" fill="rgba(255, 255, 255, 0.2)" />
        </pattern>

        {/* Alien/warp zone clip */}
        <clipPath id="zoneClipZ">
          <polygon points="32,8 40,20 48,32 40,44 32,56 24,44 16,32 24,20" />
        </clipPath>
      </defs>

      {/* Glassmorphic alien shape background */}
      <polygon
        points="32,8 40,20 48,32 40,44 32,56 24,44 16,32 24,20"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="agent-glass-bg"
      />

      {/* Experimental particles background */}
      <polygon
        points="32,8 40,20 48,32 40,44 32,56 24,44 16,32 24,20"
        fill="url(#particlePatternZ)"
        opacity="0.3"
      />

      {/* Agent letter Z */}
      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill="url(#agentGradientZ)"
        filter="url(#glowZ)"
        className="agent-letter"
      >
        Z
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
        Zone
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

      {/* Alpha indicator */}
      <rect
        x="8"
        y="8"
        width="12"
        height="6"
        rx="1"
        fill="rgba(255, 0, 255, 0.8)"
        className="alpha-tag"
      >
        <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>
      <text
        x="14"
        y="12.5"
        textAnchor="middle"
        fontSize="3"
        fill="#ffffff"
        fontWeight="bold"
        className="alpha-text"
      >
        ALPHA
      </text>

      {/* Experimental energy field */}
      <g clipPath="url(#zoneClipZ)">
        {/* Orbiting energy orbs */}
        <circle
          cx="32"
          cy="32"
          r="3"
          fill="#ff00ff"
          opacity="0.7"
          className="energy-orb orb-1"
        >
          <animateMotion dur="6s" repeatCount="indefinite">
            <path d="M 20 20 A 12 12 0 1 1 44 44 A 12 12 0 1 1 20 20" />
          </animateMotion>
        </circle>
        <circle
          cx="32"
          cy="32"
          r="2"
          fill="#00ffff"
          opacity="0.7"
          className="energy-orb orb-2"
        >
          <animateMotion dur="8s" repeatCount="indefinite">
            <path d="M 44 20 A 12 12 0 1 1 20 44 A 12 12 0 1 1 44 20" />
          </animateMotion>
        </circle>
        <circle
          cx="32"
          cy="32"
          r="2.5"
          fill="#ffff00"
          opacity="0.7"
          className="energy-orb orb-3"
        >
          <animateMotion dur="10s" repeatCount="indefinite">
            <path d="M 24 16 A 16 16 0 1 1 48 48 A 16 16 0 1 1 24 16" />
          </animateMotion>
        </circle>
      </g>

      {/* Quantum fluctuation lines */}
      <path
        d="M 16 32 Q 24 24 32 32 Q 40 40 48 32"
        stroke="rgba(255, 0, 255, 0.6)"
        strokeWidth="1"
        fill="none"
        className="quantum-line"
      >
        <animate
          attributeName="d"
          values="M 16 32 Q 24 24 32 32 Q 40 40 48 32; M 16 32 Q 24 40 32 32 Q 40 24 48 32; M 16 32 Q 24 24 32 32 Q 40 40 48 32"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      {/* Portal ring for experimental travel */}
      <circle
        cx="32"
        cy="32"
        r="22"
        fill="none"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1"
        className="portal-ring"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 32 32; 360 32 32"
          dur="12s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Glitch effects for experimental nature */}
      <g className="glitch-effect">
        <rect x="28" y="26" width="8" height="2" fill="#ff00ff" opacity="0.3">
          <animate
            attributeName="opacity"
            values="0.1;0.5;0.1"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="30" y="30" width="4" height="1" fill="#00ffff" opacity="0.3">
          <animate
            attributeName="opacity"
            values="0.5;0.1;0.5"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="26" y="34" width="12" height="1" fill="#ffff00" opacity="0.3">
          <animate
            attributeName="opacity"
            values="0.1;0.5;0.1"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      {/* Glass reflection */}
      <ellipse
        cx="24"
        cy="20"
        rx="6"
        ry="3"
        fill="rgba(255, 255, 255, 0.3)"
        className="glass-reflection"
      />

      {/* Experimental sparks */}
      <circle
        cx="12"
        cy="12"
        r="0.8"
        fill="#ff00ff"
        opacity="0.8"
        className="experimental-spark"
      >
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="52"
        cy="12"
        r="0.8"
        fill="#00ffff"
        opacity="0.8"
        className="experimental-spark"
      >
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="12"
        cy="52"
        r="0.8"
        fill="#ffff00"
        opacity="0.8"
        className="experimental-spark"
      >
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="52"
        cy="52"
        r="0.8"
        fill="#ff00ff"
        opacity="0.8"
        className="experimental-spark"
      >
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Warp distortion effect */}
      <ellipse
        cx="32"
        cy="32"
        rx="6"
        ry="2"
        fill="none"
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="0.5"
        className="warp-distortion"
      >
        <animate
          attributeName="rx"
          values="6;8;6"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.2;0.6;0.2"
          dur="3s"
          repeatCount="indefinite"
        />
      </ellipse>
    </svg>
  );
};
