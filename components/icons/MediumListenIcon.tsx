import React from 'react';
import './medium-holo-icons.css';

interface IconProps {
  className?: string;
  size?: number;
}

export const MediumListenIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      className={`holo-icon listen-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ear shape outline */}
      <path
        d="M 28 14 Q 34 14 34 24 Q 34 32 28 34 Q 26 34 26 30 Q 26 26 28 26 Q 30 26 30 24 Q 30 20 28 20"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Inner ear detail */}
      <path
        d="M 28 22 Q 29 22 29 24 Q 29 25 28 25"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Incoming sound waves - static */}
      <g className="listen-waves-in">
        <path
          d="M 20 20 Q 18 20 16 20"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M 20 24 Q 16 24 12 24"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1"
          opacity="0.5"
        />
        <path
          d="M 20 28 Q 18 28 16 28"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M 22 24 Q 18 24 14 24"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="0.8"
          opacity="0.4"
        />
      </g>

      {/* Analysis waveform - static */}
      <g className="listen-waveform" opacity="0.5">
        <polyline
          points="10,38 12,35 14,40 16,34 18,38 20,36 22,39"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="0.8"
        />
      </g>

      {/* Data capture points - static */}
      <g className="listen-datapoints">
        <circle cx="16" cy="20" r="0.8" fill="#00f3ff" />
        <circle cx="14" cy="26" r="0.6" fill="#00f3ff" />
        <circle cx="18" cy="28" r="0.8" fill="#00f3ff" />
        <circle cx="20" cy="24" r="0.6" fill="#00f3ff" />
      </g>

      {/* Scanning frequency bars - static */}
      <g className="listen-scanner">
        <rect x="38" y="18" width="1" height="4" fill="#00f3ff" opacity="0.4" />
        <rect x="40" y="16" width="1" height="6" fill="#00f3ff" opacity="0.5" />
        <rect x="42" y="14" width="1" height="8" fill="#00f3ff" opacity="0.6" />
        <rect x="44" y="17" width="1" height="5" fill="#00f3ff" opacity="0.5" />
      </g>

      {/* Active listening indicator */}
      <circle cx="30" cy="24" r="1.5" fill="#00f3ff" opacity="0.6" className="listen-active" />

      {/* Insight spark */}
      <circle
        cx="30"
        cy="24"
        r="4"
        fill="none"
        stroke="#00f3ff"
        strokeWidth="0.5"
        opacity="0"
        className="listen-insight-ring"
      />
    </svg>
  );
};
