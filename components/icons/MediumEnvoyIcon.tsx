import React from 'react';
import './medium-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const MediumEnvoyIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      className={`holo-icon envoy-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Envelope body */}
      <rect
        x="10"
        y="18"
        width="28"
        height="18"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Envelope flap (closed) */}
      <path
        d="M 10 18 L 24 28 L 38 18"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Top flap edge */}
      <path
        d="M 10 18 L 24 28 L 38 18"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Outgoing message waves (3 layers) */}
      <g className="envoy-waves">
        <path
          d="M 40 20 Q 44 24 40 28"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1"
          opacity="0.6"
          className="envoy-wave-1"
        />
        <path
          d="M 42 18 Q 47 24 42 30"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="0.8"
          opacity="0.4"
          className="envoy-wave-2"
        />
        <path
          d="M 44 16 Q 50 24 44 32"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="0.6"
          opacity="0.3"
          className="envoy-wave-3"
        />
      </g>

      {/* Message particles (controlled orbiting) */}
      <g className="envoy-particles">
        <circle r="1" fill="#00f3ff" className="envoy-particle-1" />
        <circle r="0.8" fill="#00f3ff" className="envoy-particle-2" />
        <circle r="1" fill="#00f3ff" className="envoy-particle-3" />
        <circle r="0.8" fill="#00f3ff" className="envoy-particle-4" />
      </g>

      {/* Seal/send button */}
      <circle
        cx="24"
        cy="28"
        r="3"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0.5"
        className="envoy-seal"
      />
      <circle cx="24" cy="28" r="1.5" fill="#00f3ff" opacity="0.7" className="envoy-seal-pulse" />
    </svg>
  );
};
