import React from 'react';
import './minimal-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const MinimalCalculatorIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      className={`holo-icon calculator-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Calculator frame */}
      <rect
        x="12"
        y="10"
        width="24"
        height="28"
        rx="2"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Display screen */}
      <rect
        x="15"
        y="13"
        width="18"
        height="6"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Button grid */}
      <g opacity="0.5" stroke="#00f3ff" strokeWidth="0.5" fill="none">
        <circle cx="18" cy="24" r="1.5" />
        <circle cx="24" cy="24" r="1.5" />
        <circle cx="30" cy="24" r="1.5" />

        <circle cx="18" cy="29" r="1.5" />
        <circle cx="24" cy="29" r="1.5" />
        <circle cx="30" cy="29" r="1.5" />

        <circle cx="18" cy="34" r="1.5" />
        <circle cx="24" cy="34" r="1.5" />
        <circle cx="30" cy="34" r="1.5" />
      </g>

      {/* Calculation symbols */}
      <text x="17" y="17" fontSize="3" fill="#00f3ff" opacity="0.6" className="calc-number">
        123
      </text>

      {/* Orbiting operators */}
      <g className="calc-operators">
        <text fontSize="4" fill="#00f3ff" opacity="0.7" className="calc-orbit-1">+</text>
        <text fontSize="4" fill="#00f3ff" opacity="0.7" className="calc-orbit-2">×</text>
        <text fontSize="4" fill="#00f3ff" opacity="0.7" className="calc-orbit-3">=</text>
      </g>
    </svg>
  );
};
