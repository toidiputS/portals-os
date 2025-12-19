import React from 'react';
import './holographic-icons.css';

interface JamIconProps {
  className?: string;
  size?: number;
}

export const JamIcon: React.FC<JamIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon jam-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientJam" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.4" />
        </linearGradient>

        {/* Script/Teleprompter Gradient (Cyan/White) */}
        <linearGradient id="scriptGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="80%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0" />
        </linearGradient>

        {/* Objection/Alert Gradient (Orange/Red) */}
        <linearGradient id="alertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff9500" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff4444" stopOpacity="0.9" />
        </linearGradient>

        {/* Success/Flow Gradient (Green) */}
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="1" />
          <stop offset="100%" stopColor="#00cc66" stopOpacity="0.8" />
        </linearGradient>

        <filter id="glowJam">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowScript">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip for Teleprompter Text */}
        <clipPath id="prompterClip">
          <rect x="16" y="14" width="32" height="24" rx="2" />
        </clipPath>
      </defs>

      {/* --- BACKGROUND: AUDIO WAVES (The "Jam") --- */}
      <g className="jam-waves" opacity="0.2">
        <rect x="4" y="30" width="2" height="4" rx="1" fill="#00f3ff" className="jam-bar bar-1" />
        <rect x="8" y="26" width="2" height="12" rx="1" fill="#00f3ff" className="jam-bar bar-2" />
        <rect x="12" y="22" width="2" height="20" rx="1" fill="#00f3ff" className="jam-bar bar-3" />
        <rect x="50" y="22" width="2" height="20" rx="1" fill="#00f3ff" className="jam-bar bar-4" />
        <rect x="54" y="26" width="2" height="12" rx="1" fill="#00f3ff" className="jam-bar bar-5" />
        <rect x="58" y="30" width="2" height="4" rx="1" fill="#00f3ff" className="jam-bar bar-6" />
      </g>

      {/* --- TELEPROMPTER SCREEN (Central Hub) --- */}
      <g className="jam-prompter">
        {/* Screen Frame */}
        <path
          d="M 12 10 L 52 10 L 52 42 L 42 50 L 22 50 L 12 42 Z"
          fill="#001a1a"
          stroke="url(#holoGradientJam)"
          strokeWidth="2"
          filter="url(#glowJam)"
        />

        {/* Scrolling Script Lines */}
        <g clipPath="url(#prompterClip)">
          <g className="jam-script-content">
            <rect x="18" y="16" width="20" height="2" rx="1" fill="url(#scriptGradient)" opacity="0.6" />
            <rect x="18" y="22" width="28" height="2" rx="1" fill="url(#scriptGradient)" opacity="0.9" />
            <rect x="18" y="28" width="24" height="2" rx="1" fill="url(#scriptGradient)" opacity="0.7" />
            <rect x="18" y="34" width="26" height="2" rx="1" fill="url(#scriptGradient)" opacity="0.5" />

            {/* Duplicate for infinite loop */}
            <rect x="18" y="46" width="20" height="2" rx="1" fill="url(#scriptGradient)" opacity="0.6" />
            <rect x="18" y="52" width="28" height="2" rx="1" fill="url(#scriptGradient)" opacity="0.9" />
            <rect x="18" y="58" width="24" height="2" rx="1" fill="url(#scriptGradient)" opacity="0.7" />
          </g>
        </g>

        {/* Screen Glass Reflection */}
        <path d="M 14 12 L 50 12 L 14 40 Z" fill="#00f3ff" opacity="0.05" />
      </g>

      {/* --- LIVE INDICATOR --- */}
      <g className="jam-live" transform="translate(16, 6)">
        <rect x="0" y="0" width="12" height="4" rx="2" fill="#001a1a" stroke="#ff4444" strokeWidth="0.5" />
        <circle cx="3" cy="2" r="1.5" fill="#ff4444" className="jam-rec-dot" />
        <text x="8" y="3" fontSize="2" fill="#ff4444" fontWeight="bold">LIVE</text>
      </g>

      {/* --- CONVERSATION BUBBLES --- */}
      <g className="jam-bubbles">
        {/* User Bubble (Right - Output) */}
        <g className="jam-bubble bubble-user" transform="translate(40, 46)">
          <path
            d="M 0 0 L 16 0 L 16 10 L 4 10 L 0 14 Z"
            fill="#001a1a"
            stroke="url(#flowGradient)"
            strokeWidth="1"
          />
          <line x1="3" y1="3" x2="13" y2="3" stroke="#00ff88" strokeWidth="0.5" />
          <line x1="3" y1="6" x2="10" y2="6" stroke="#00ff88" strokeWidth="0.5" />
        </g>

        {/* Prospect Bubble (Left - Input) */}
        <g className="jam-bubble bubble-prospect" transform="translate(8, 42)">
          <path
            d="M 0 0 L 16 0 L 16 14 L 12 10 L 0 10 Z"
            fill="#001a1a"
            stroke="#00f3ff"
            strokeWidth="1"
          />
          <line x1="3" y1="3" x2="13" y2="3" stroke="#00f3ff" strokeWidth="0.5" opacity="0.5" />
          <line x1="3" y1="6" x2="9" y2="6" stroke="#00f3ff" strokeWidth="0.5" opacity="0.5" />
        </g>
      </g>

      {/* --- OBJECTION HANDLING SHIELD --- */}
      <g className="jam-shield" transform="translate(48, 16)">
        <path
          d="M 0 0 L 12 0 L 12 6 L 6 10 L 0 6 Z"
          fill="#001a1a"
          stroke="url(#alertGradient)"
          strokeWidth="1"
          opacity="0"
          className="jam-shield-body"
        />
        <text
          x="6" y="6"
          textAnchor="middle"
          fontSize="5"
          fill="#ff9500"
          opacity="0"
          className="jam-shield-icon"
        >!</text>
      </g>

      {/* --- MICROPHONE / INPUT --- */}
      <g className="jam-mic" transform="translate(32, 54)">
        <rect x="-3" y="0" width="6" height="8" rx="3" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" />
        <line x1="-3" y1="3" x2="3" y2="3" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="-3" y1="5" x2="3" y2="5" stroke="#00f3ff" strokeWidth="0.5" />
        <path d="M -5 4 Q -5 9, 0 9 Q 5 9, 5 4" fill="none" stroke="#00f3ff" strokeWidth="1" />
        <line x1="0" y1="9" x2="0" y2="11" stroke="#00f3ff" strokeWidth="1" />
        <line x1="-3" y1="11" x2="3" y2="11" stroke="#00f3ff" strokeWidth="1" />

        {/* Voice Pulse */}
        <circle className="jam-mic-pulse" cx="0" cy="4" r="6" fill="none" stroke="#00f3ff" strokeWidth="0.5" />
      </g>

      {/* --- CHEATSHEET CARD (Floating) --- */}
      <g className="jam-cheatsheet" transform="translate(46, 28)">
        <rect x="0" y="0" width="14" height="18" rx="1" fill="#001a1a" stroke="#00ff88" strokeWidth="0.8" />

        {/* Bullet points */}
        <circle cx="3" cy="4" r="1" fill="#00ff88" />
        <line x1="6" y1="4" x2="11" y2="4" stroke="#00ff88" strokeWidth="0.5" opacity="0.7" />

        <circle cx="3" cy="8" r="1" fill="#00ff88" />
        <line x1="6" y1="8" x2="10" y2="8" stroke="#00ff88" strokeWidth="0.5" opacity="0.7" />

        <circle cx="3" cy="12" r="1" fill="#00ff88" />
        <line x1="6" y1="12" x2="12" y2="12" stroke="#00ff88" strokeWidth="0.5" opacity="0.7" />

        {/* Checkmark overlay (Success) */}
        <path
          className="jam-check"
          d="M 4 14 L 6 16 L 10 12"
          fill="none"
          stroke="#00ff88"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      {/* --- CONNECTING ARROWS (Interaction Flow) --- */}
      <g className="jam-arrows" opacity="0.6">
        <path d="M 26 44 Q 32 40, 38 46" fill="none" stroke="#00f3ff" strokeWidth="0.5" markerEnd="url(#arrowhead)" />
        <path d="M 38 50 Q 32 54, 26 48" fill="none" stroke="#00ff88" strokeWidth="0.5" markerEnd="url(#arrowhead)" />
      </g>

      {/* --- GLITCH LAYER --- */}
      <g className="jam-glitch">
        <path d="M 12 10 L 52 10 L 52 42 L 42 50 L 22 50 L 12 42 Z" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
      </g>

    </svg>
  );
};
