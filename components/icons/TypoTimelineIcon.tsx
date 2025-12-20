import React from 'react';
import './typo-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const TypoTimelineIcon: React.FC<IconProps> = ({ className = '', size = 64 }) => {
  return (
    <svg
      className={`holo-icon timeline-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hourglass frame */}
      <path
        d="M 20 12 L 44 12 L 44 16 L 36 28 L 36 36 L 44 48 L 44 52 L 20 52 L 20 48 L 28 36 L 28 28 L 20 16 Z"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.4"
      />

      {/* Center pinch */}
      <line x1="28" y1="32" x2="36" y2="32" stroke="#00f3ff" strokeWidth="1" opacity="0.5" />

      {/* T-I-M-E arranged in top chamber */}
      <text x="24" y="20" fontSize="5" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="timeline-letter timeline-t">T</text>
      <text x="30" y="18" fontSize="5" fill="#00f3ff" opacity="0.9" fontFamily="monospace" fontWeight="bold" className="timeline-letter timeline-i1">I</text>
      <text x="35" y="20" fontSize="5" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="timeline-letter timeline-m">M</text>
      <text x="30" y="26" fontSize="5" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="timeline-letter timeline-e1">E</text>

      {/* L-I-N-E arranged in bottom chamber */}
      <text x="26" y="42" fontSize="5" fill="#00f3ff" opacity="0.8" fontFamily="monospace" fontWeight="bold" className="timeline-letter timeline-l">L</text>
      <text x="32" y="40" fontSize="5" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="timeline-letter timeline-i2">I</text>
      <text x="26" y="48" fontSize="5" fill="#00f3ff" opacity="0.85" fontFamily="monospace" fontWeight="bold" className="timeline-letter timeline-n">N</text>
      <text x="34" y="48" fontSize="5" fill="#00f3ff" opacity="0.9" fontFamily="monospace" fontWeight="bold" className="timeline-letter timeline-e2">E</text>

      {/* Timeline axis (right side) */}
      <g className="timeline-axis" opacity="0.5">
        <line x1="50" y1="16" x2="50" y2="48" stroke="#00f3ff" strokeWidth="1" />

        {/* Time markers */}
        <line x1="48" y1="18" x2="52" y2="18" stroke="#00f3ff" strokeWidth="1" />
        <line x1="48" y1="26" x2="52" y2="26" stroke="#00f3ff" strokeWidth="1" />
        <line x1="48" y1="34" x2="52" y2="34" stroke="#00f3ff" strokeWidth="1" />
        <line x1="48" y1="42" x2="52" y2="42" stroke="#00f3ff" strokeWidth="1" />

        {/* Current time indicator */}
        <circle cx="50" cy="18" r="1.5" fill="#00f3ff" opacity="0.8" className="timeline-now" />
      </g>

      {/* History data points */}
      <g className="timeline-history">
        <circle cx="52" cy="26" r="1" fill="#00f3ff" opacity="0" className="timeline-event-1" />
        <circle cx="52" cy="34" r="1" fill="#00f3ff" opacity="0" className="timeline-event-2" />
        <circle cx="52" cy="42" r="1" fill="#00f3ff" opacity="0" className="timeline-event-3" />
      </g>

      {/* Sand particles flowing */}
      <g className="timeline-sand">
        <circle r="0.8" fill="#00f3ff" className="timeline-grain-1" />
        <circle r="0.6" fill="#00f3ff" className="timeline-grain-2" />
        <circle r="0.8" fill="#00f3ff" className="timeline-grain-3" />
        <circle r="0.6" fill="#00f3ff" className="timeline-grain-4" />
        <circle r="0.8" fill="#00f3ff" className="timeline-grain-5" />
      </g>

      {/* Accumulated wisdom (bottom pile) */}
      <path
        d="M 24 48 Q 32 44 40 48"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0.4"
        className="timeline-pile"
      />

      {/* Insight connections (learning from past) */}
      <g className="timeline-insights" opacity="0.3">
        <path d="M 52 42 Q 46 38 52 34" fill="none" stroke="#00f3ff" strokeWidth="0.5" strokeDasharray="2 2" className="timeline-learn-1" />
        <path d="M 52 34 Q 46 30 52 26" fill="none" stroke="#00f3ff" strokeWidth="0.5" strokeDasharray="2 2" className="timeline-learn-2" />
      </g>

      {/* Present moment pulse */}
      <circle cx="32" cy="32" r="4" fill="none" stroke="#00f3ff" strokeWidth="0.5" opacity="0" className="timeline-present-pulse" />
    </svg>
  );
};
