import React from 'react';
import './holographic-icons.css';

interface ChecklistIconProps {
  className?: string;
  size?: number;
}

export const ChecklistIcon: React.FC<ChecklistIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon checklist-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glowCheck">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* --- THE SLATE FRAME --- */}
      <path
        d="M 12 8 H 52 L 56 12 V 52 L 52 56 H 12 L 8 52 V 12 Z"
        stroke="#00f3ff"
        strokeWidth="2"
        fill="none"
        filter="url(#glowCheck)"
      />

      {/* --- LIST ITEMS --- */}
      {/* Item 1 */}
      <g className="check-item item-1">
        <rect x="14" y="18" width="6" height="6" stroke="#00f3ff" fill="none" className="check-box" />
        <rect x="16" y="20" width="2" height="2" fill="#fff" className="check-mark" />
        <line x1="24" y1="21" x2="48" y2="21" stroke="#00f3ff" strokeWidth="2" opacity="0.6" />
      </g>

      {/* Item 2 */}
      <g className="check-item item-2">
        <rect x="14" y="29" width="6" height="6" stroke="#00f3ff" fill="none" className="check-box" />
        <rect x="16" y="31" width="2" height="2" fill="#fff" className="check-mark" />
        <line x1="24" y1="32" x2="40" y2="32" stroke="#00f3ff" strokeWidth="2" opacity="0.6" />
      </g>

      {/* Item 3 */}
      <g className="check-item item-3">
        <rect x="14" y="40" width="6" height="6" stroke="#00f3ff" fill="none" className="check-box" />
        <rect x="16" y="42" width="2" height="2" fill="#fff" className="check-mark" />
        <line x1="24" y1="43" x2="50" y2="43" stroke="#00f3ff" strokeWidth="2" opacity="0.6" />
      </g>

      {/* --- SCANNER BAR --- */}
      <line
        x1="8" y1="12" x2="56" y2="12"
        stroke="#fff"
        strokeWidth="1"
        className="check-scanner"
        filter="url(#glowCheck)"
      />

      {/* --- STATUS INDICATORS --- */}
      <rect x="42" y="50" width="8" height="2" fill="#00f3ff" opacity="0.8">
         <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
};
