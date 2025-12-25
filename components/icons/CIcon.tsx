import React from "react";
import "./holographic-icons.css";

interface CIconProps {
  className?: string;
  size?: number;
}

export const CIcon: React.FC<CIconProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <svg
      className={`holo-c-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradientC" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#32cd32" stopOpacity="1" />
          <stop offset="100%" stopColor="#32cd32" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowC">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="shadowC">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.4"/>
        </filter>

        <pattern
          id="screenPatternC"
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect x="0" y="0" width="2" height="2" fill="rgba(50, 205, 50, 0.1)" />
        </pattern>
      </defs>

      {/* Calculator Body - 3D Effect */}
      <rect
        x="14"
        y="14"
        width="36"
        height="36"
        rx="6"
        fill="rgba(255, 255, 255, 0.9)"
        stroke="rgba(200, 200, 200, 0.8)"
        strokeWidth="1"
        className="calc-body"
        filter="url(#shadowC)"
      />
      
      {/* Calculator Screen - 3D Effect */}
      <rect
        x="18"
        y="18"
        width="28"
        height="12"
        rx="3"
        fill="rgba(0, 0, 0, 0.8)"
        stroke="rgba(50, 205, 50, 0.6)"
        strokeWidth="1"
        className="calc-screen"
      />

      {/* Screen Content */}
      <rect
        x="20"
        y="20"
        width="24"
        height="8"
        rx="2"
        fill="url(#screenPatternC)"
        stroke="rgba(50, 205, 50, 0.3)"
        strokeWidth="0.5"
        className="calc-display"
      />

      {/* Main Display Text */}
      <text
        x="32"
        y="26"
        textAnchor="middle"
        fontSize="8"
        fontWeight="700"
        fill="#32cd32"
        filter="url(#glowC)"
        className="calc-text"
      >
        123.45
      </text>

      {/* Letter C */}
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill="#32cd32"
        filter="url(#glowC)"
        className="agent-letter"
      >
        C
      </text>

      {/* Agent Name */}
      <text
        x="32"
        y="44"
        textAnchor="middle"
        fontSize="6"
        fontWeight="600"
        fill="#ffffff"
        className="agent-name"
      >
        Calculator
      </text>

      {/* Domain */}
      <text
        x="32"
        y="50"
        textAnchor="middle"
        fontSize="4"
        fontWeight="500"
        fill="rgba(255, 255, 255, 0.8)"
        className="agent-domain"
      >
        .itsai.services
      </text>

      {/* 3D Button Grid */}
      <g className="button-grid">
        {/* Button 1 */}
        <rect
          x="20"
          y="32"
          width="6"
          height="4"
          rx="1"
          fill="rgba(255, 255, 255, 0.9)"
          stroke="rgba(200, 200, 200, 0.8)"
          strokeWidth="0.5"
          className="calc-button"
          filter="url(#shadowC)"
        >
          <animate
            attributeName="opacity"
            values="0.7;0.9;0.7"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
        
        {/* Button 2 */}
        <rect
          x="28"
          y="32"
          width="6"
          height="4"
          rx="1"
          fill="rgba(255, 255, 255, 0.9)"
          stroke="rgba(200, 200, 200, 0.8)"
          strokeWidth="0.5"
          className="calc-button"
          filter="url(#shadowC)"
        >
          <animate
            attributeName="opacity"
            values="0.9;0.7;0.9"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
        
        {/* Button 3 */}
        <rect
          x="36"
          y="32"
          width="6"
          height="4"
          rx="1"
          fill="rgba(255, 255, 255, 0.9)"
          stroke="rgba(200, 200, 200, 0.8)"
          strokeWidth="0.5"
          className="calc-button"
          filter="url(#shadowC)"
        >
          <animate
            attributeName="opacity"
            values="0.7;0.9;0.7"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
        
        {/* Button 4 - Function Button */}
        <rect
          x="44"
          y="32"
          width="4"
          height="4"
          rx="1"
          fill="rgba(50, 205, 50, 0.8)"
          stroke="rgba(50, 205, 50, 0.6)"
          strokeWidth="0.5"
          className="calc-button"
          filter="url(#shadowC)"
        >
          <animate
            attributeName="opacity"
            values="0.8;1;0.8"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      {/* Button Symbols */}
      <text
        x="23"
        y="35"
        textAnchor="middle"
        fontSize="3"
        fill="#333333"
        className="calc-symbol"
        fontWeight="600"
      >
        7
      </text>
      <text
        x="31"
        y="35"
        textAnchor="middle"
        fontSize="3"
        fill="#333333"
        className="calc-symbol"
        fontWeight="600"
      >
        8
      </text>
      <text
        x="39"
        y="35"
        textAnchor="middle"
        fontSize="3"
        fill="#333333"
        className="calc-symbol"
        fontWeight="600"
      >
        9
      </text>
      <text
        x="46"
        y="35"
        textAnchor="middle"
        fontSize="3"
        fill="#32cd32"
        className="calc-symbol"
        fontWeight="700"
      >
        +
      </text>

      {/* 3D Glass Reflection */}
      <ellipse
        cx="20"
        cy="20"
        rx="12"
        ry="4"
        fill="rgba(255, 255, 255, 0.4)"
        className="glass-reflection"
      />

      {/* Holographic Data Streams */}
      <line
        x1="16"
        y1="28"
        x2="48"
        y2="28"
        stroke="rgba(50, 205, 50, 0.4)"
        strokeWidth="0.5"
        className="data-stream"
      >
        <animate
          attributeName="x1"
          values="16;48;16"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="x2"
          values="48;80;48"
          dur="4s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="16"
        y1="32"
        x2="48"
        y2="32"
        stroke="rgba(50, 205, 50, 0.4)"
        strokeWidth="0.5"
        className="data-stream"
      >
        <animate
          attributeName="x1"
          values="48;16;48"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="x2"
          values="80;48;80"
          dur="4s"
          repeatCount="indefinite"
        />
      </line>

      {/* Floating Effect */}
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0; 0,-2; 0,0"
        dur="3s"
        repeatCount="indefinite"
      />
    </svg>
  );
};
