import React from "react";
import "./holographic-icons.css";

interface GIconProps {
  className?: string;
  size?: number;
}

export const GIcon: React.FC<GIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holo-g-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradientG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff69b4" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff69b4" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowG">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <pattern
          id="gearPatternG"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="4" cy="4" r="2" fill="rgba(255, 105, 180, 0.1)" />
          <circle cx="4" cy="4" r="1" fill="rgba(255, 105, 180, 0.2)" />
        </pattern>
      </defs>

      <circle
        cx="32"
        cy="32"
        r="20"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        className="glass-bg"
      />

      <circle cx="32" cy="32" r="18" fill="url(#gearPatternG)" opacity="0.4" />

      <text
        x="32"
        y="28"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#ff69b4"
        filter="url(#glowG)"
        className="agent-letter"
      >
        G
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
        Grind
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
        .itsai.help
      </text>

      <circle
        cx="32"
        cy="32"
        r="16"
        fill="none"
        stroke="rgba(255, 105, 180, 0.6)"
        strokeWidth="2"
        className="gear-ring"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 32 32; 360 32 32"
          dur="8s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="32"
        cy="32"
        r="12"
        fill="none"
        stroke="rgba(255, 105, 180, 0.4)"
        strokeWidth="1"
        className="gear-ring"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="360 32 32; 0 32 32"
          dur="6s"
          repeatCount="indefinite"
        />
      </circle>

      <polygon
        points="32,14 34,18 32,16 30,18"
        fill="#ff69b4"
        opacity="0.8"
        className="gear-tooth"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 32 32; 360 32 32"
          dur="8s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon
        points="32,46 34,42 32,44 30,42"
        fill="#ff69b4"
        opacity="0.8"
        className="gear-tooth"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 32 32; 360 32 32"
          dur="8s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon
        points="14,32 18,34 16,32 18,30"
        fill="#ff69b4"
        opacity="0.8"
        className="gear-tooth"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 32 32; 360 32 32"
          dur="8s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon
        points="46,32 42,34 44,32 42,30"
        fill="#ff69b4"
        opacity="0.8"
        className="gear-tooth"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 32 32; 360 32 32"
          dur="8s"
          repeatCount="indefinite"
        />
      </polygon>

      <circle
        cx="32"
        cy="24"
        r="1"
        fill="#ff69b4"
        opacity="0.8"
        className="process-indicator"
      >
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="40"
        cy="32"
        r="1"
        fill="#ff69b4"
        opacity="0.8"
        className="process-indicator"
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
        fill="#ff69b4"
        opacity="0.8"
        className="process-indicator"
      >
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="24"
        cy="32"
        r="1"
        fill="#ff69b4"
        opacity="0.8"
        className="process-indicator"
      >
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

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
