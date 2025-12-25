import React from 'react';
import './holographic-icons.css';

interface ContactIconProps {
  className?: string;
  size?: number;
}

export const ContactIcon: React.FC<ContactIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon contact-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientContact" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3498db" stopOpacity="1" />
          <stop offset="100%" stopColor="#3498db" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowContact">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Contact/User Icon */}
      <g className="contact-user">
        {/* Head circle */}
        <circle
          cx="32"
          cy="24"
          r="8"
          stroke="url(#holoGradientContact)"
          strokeWidth="2"
          fill="none"
          filter="url(#glowContact)"
          className="contact-head"
        />

        {/* Body/shoulders */}
        <path
          d="M 16 48 Q 16 40, 24 36 L 40 36 Q 48 40, 48 48"
          stroke="url(#holoGradientContact)"
          strokeWidth="2"
          fill="none"
          filter="url(#glowContact)"
          className="contact-body"
        />

        {/* Inner head fill */}
        <circle cx="32" cy="24" r="4" fill="url(#holoGradientContact)" opacity="0.5" className="contact-head-fill" />

        {/* Connection nodes around head */}
        <circle cx="32" cy="12" r="1" fill="#3498db" className="connection-node" />
        <circle cx="44" cy="24" r="1" fill="#3498db" className="connection-node" />
        <circle cx="32" cy="36" r="1" fill="#3498db" className="connection-node" />
        <circle cx="20" cy="24" r="1" fill="#3498db" className="connection-node" />

        {/* Communication waves */}
        <path d="M 20 16 Q 32 8, 44 16" stroke="#3498db" strokeWidth="1" fill="none" opacity="0.4" className="comm-wave" />
        <path d="M 16 24 Q 32 16, 48 24" stroke="#3498db" strokeWidth="1" fill="none" opacity="0.3" className="comm-wave" />

        {/* Signal dots */}
        <circle cx="48" cy="16" r="1" fill="#3498db" opacity="0.6" className="signal-dot" />
        <circle cx="52" cy="20" r="0.5" fill="#3498db" opacity="0.4" className="signal-dot" />
        <circle cx="16" cy="16" r="1" fill="#3498db" opacity="0.6" className="signal-dot" />
        <circle cx="12" cy="20" r="0.5" fill="#3498db" opacity="0.4" className="signal-dot" />

        {/* Base platform */}
        <rect x="20" y="50" width="24" height="2" fill="url(#holoGradientContact)" className="contact-platform" />
      </g>

    </svg>
  );
};
