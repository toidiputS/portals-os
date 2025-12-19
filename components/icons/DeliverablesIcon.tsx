import React from 'react';
import './holographic-icons.css';

interface DeliverablesIconProps {
  className?: string;
  size?: number;
}

export const DeliverablesIcon: React.FC<DeliverablesIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon deliverables-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glowDeliv">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Center the group for scaling */}
      <g transform="translate(32, 40)">

        {/* --- LAYER 1: BOTTOM (Documentation) --- */}
        <g className="deliv-layer layer-bottom">
           <path d="M 0 16 L 20 8 L 0 0 L -20 8 Z" fill="#00f3ff" opacity="0.1" stroke="#00f3ff" strokeWidth="1" />
           {/* Data Lines */}
           <line x1="-10" y1="6" x2="5" y2="0" stroke="#00f3ff" strokeWidth="0.5" opacity="0.5" />
        </g>

        {/* --- LAYER 2: MIDDLE (Integration Plan) --- */}
        <g className="deliv-layer layer-mid">
           <path d="M 0 16 L 20 8 L 0 0 L -20 8 Z" fill="#00f3ff" opacity="0.2" stroke="#00f3ff" strokeWidth="1" />
           {/* Circuit Nodes */}
           <circle cx="0" cy="8" r="1" fill="#fff" />
           <line x1="-10" y1="4" x2="10" y2="12" stroke="#fff" strokeWidth="0.5" />
        </g>

        {/* --- LAYER 3: TOP (Visual Map) --- */}
        <g className="deliv-layer layer-top">
           <path d="M 0 16 L 20 8 L 0 0 L -20 8 Z" fill="rgba(255,255,255,0.1)" stroke="#fff" strokeWidth="1.5" filter="url(#glowDeliv)" />
           {/* Checkmark Symbol */}
           <path d="M -5 6 L 0 10 L 8 2" stroke="#fff" strokeWidth="2" fill="none" />
        </g>

      </g>

      {/* --- UPLOAD ARROW (Delivery) --- */}
      <path
        className="deliv-arrow"
        d="M 52 40 L 52 20 M 48 24 L 52 20 L 56 24"
        stroke="#00f3ff"
        strokeWidth="2"
        fill="none"
        filter="url(#glowDeliv)"
      />
    </svg>
  );
};
