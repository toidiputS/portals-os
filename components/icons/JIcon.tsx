import React from 'react';
import './holographic-icons.css';

interface JIconProps {
  className?: string;
  size?: number;
}

export const JIcon: React.FC<JIconProps> = ({
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

        {/* Your voice gradient (Confident blue) */}
        <linearGradient id="yourVoiceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.9" />
        </linearGradient>

        {/* Their voice gradient (Neutral gray) */}
        <linearGradient id="theirVoiceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a0a0a0" stopOpacity="1" />
          <stop offset="100%" stopColor="#707070" stopOpacity="0.8" />
        </linearGradient>

        {/* Objection gradient (Warning orange) */}
        <linearGradient id="objectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff9500" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff6b35" stopOpacity="0.9" />
        </linearGradient>

        {/* Success/Close gradient (Green) */}
        <linearGradient id="closeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="1" />
          <stop offset="100%" stopColor="#00cc66" stopOpacity="0.9" />
        </linearGradient>

        {/* Confidence gradient (Purple/Gold) */}
        <linearGradient id="confidenceGradient" x1="0%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ff6b6b" stopOpacity="1" />
          <stop offset="50%" stopColor="#ffd700" stopOpacity="1" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="1" />
        </linearGradient>

        <filter id="glowJam">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowBlue">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowGreen">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* --- BACKGROUND: CONVERSATION WAVES --- */}
      <g className="jam-bg-waves" opacity="0.4">
        <path d="M 0 32 Q 16 28, 32 32 Q 48 36, 64 32" fill="none" stroke="#00f3ff" strokeWidth="0.8" />
        <path d="M 0 36 Q 16 32, 32 36 Q 48 40, 64 36" fill="none" stroke="#00f3ff" strokeWidth="0.6" />
        <path d="M 0 28 Q 16 24, 32 28 Q 48 32, 64 28" fill="none" stroke="#00f3ff" strokeWidth="0.7" />
      </g>

      {/* --- CENTRAL MICROPHONE/SPEAKER HUB --- */}
      <g className="jam-hub">
        {/* Hub ring */}
        <circle
          className="jam-hub-ring"
          cx="32" cy="32" r="10"
          fill="#001a1a"
          stroke="url(#holoGradientJam)"
          strokeWidth="2"
          filter="url(#glowJam)"
        />

        {/* Inner pulse ring */}
        <circle
          className="jam-pulse-ring"
          cx="32" cy="32" r="7"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Microphone icon */}
        <g className="jam-mic" transform="translate(32, 32)">
          <rect x="-2" y="-5" width="4" height="7" rx="2" fill="url(#yourVoiceGradient)" />
          <path d="M -4 0 Q -4 4, 0 5 Q 4 4, 4 0" fill="none" stroke="#4facfe" strokeWidth="1" />
          <line x1="0" y1="5" x2="0" y2="7" stroke="#4facfe" strokeWidth="1" />
          <line x1="-2" y1="7" x2="2" y2="7" stroke="#4facfe" strokeWidth="1" />
        </g>

        {/* Sound waves from mic */}
        <g className="jam-sound-waves">
          <path className="jam-wave sw-1" d="M 38 28 Q 42 32, 38 36" fill="none" stroke="#4facfe" strokeWidth="1" />
          <path className="jam-wave sw-2" d="M 41 26 Q 46 32, 41 38" fill="none" stroke="#4facfe" strokeWidth="0.8" />
          <path className="jam-wave sw-3" d="M 26 28 Q 22 32, 26 36" fill="none" stroke="#4facfe" strokeWidth="1" />
        </g>
      </g>

      {/* --- YOUR SPEECH BUBBLE (Right - You speaking) --- */}
      <g className="jam-your-speech" transform="translate(44, 10)">
        <rect
          className="jam-bubble bubble-you"
          x="0" y="0" width="18" height="14" rx="3"
          fill="#001a1a"
          stroke="url(#yourVoiceGradient)"
          strokeWidth="1"
          filter="url(#glowBlue)"
        />
        <polygon points="0,10 -4,14 0,12" fill="url(#yourVoiceGradient)" />

        {/* Talking points */}
        <line x1="3" y1="4" x2="15" y2="4" stroke="#4facfe" strokeWidth="0.6" opacity="0.8" />
        <line x1="3" y1="7" x2="13" y2="7" stroke="#4facfe" strokeWidth="0.5" opacity="0.6" />
        <line x1="3" y1="10" x2="10" y2="10" stroke="#4facfe" strokeWidth="0.5" opacity="0.5" />

        {/* Speaking indicator */}
        <circle className="jam-speaking-dot" cx="16" cy="4" r="1" fill="#4facfe" />
      </g>

      {/* --- THEIR SPEECH BUBBLE (Left - They speaking) --- */}
      <g className="jam-their-speech" transform="translate(2, 10)">
        <rect
          className="jam-bubble bubble-them"
          x="0" y="0" width="16" height="12" rx="3"
          fill="#001a1a"
          stroke="url(#theirVoiceGradient)"
          strokeWidth="1"
        />
        <polygon points="16,8 20,12 16,10" fill="url(#theirVoiceGradient)" />

        {/* Their text */}
        <line x1="3" y1="4" x2="13" y2="4" stroke="#a0a0a0" strokeWidth="0.5" opacity="0.6" />
        <line x1="3" y1="7" x2="10" y2="7" stroke="#a0a0a0" strokeWidth="0.5" opacity="0.5" />
      </g>

      {/* --- TALKING POINTS CARD --- */}
      <g className="jam-talking-points" transform="translate(2, 26)">
        <rect x="0" y="0" width="16" height="20" rx="2" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.8" />

        {/* Header */}
        <rect x="1" y="1" width="14" height="4" rx="1" fill="#00f3ff" opacity="0.2" />
        <text x="8" y="4" textAnchor="middle" fontSize="2.5" fill="#00f3ff" fontWeight="bold">POINTS</text>

        {/* Bullet points */}
        <circle cx="3" cy="8" r="0.8" fill="#4facfe" />
        <line x1="5" y1="8" x2="14" y2="8" stroke="#4facfe" strokeWidth="0.5" opacity="0.7" />

        <circle cx="3" cy="11" r="0.8" fill="#4facfe" />
        <line x1="5" y1="11" x2="12" y2="11" stroke="#4facfe" strokeWidth="0.5" opacity="0.6" />

        <circle cx="3" cy="14" r="0.8" fill="#4facfe" />
        <line x1="5" y1="14" x2="13" y2="14" stroke="#4facfe" strokeWidth="0.5" opacity="0.5" />

        <circle cx="3" cy="17" r="0.8" fill="#4facfe" opacity="0.5" />
        <line x1="5" y1="17" x2="10" y2="17" stroke="#4facfe" strokeWidth="0.5" opacity="0.4" />
      </g>

      {/* --- OBJECTION SHIELD --- */}
      <g className="jam-objection" transform="translate(46, 26)">
        <rect x="0" y="0" width="16" height="16" rx="2" fill="#001a1a" stroke="url(#objectionGradient)" strokeWidth="0.8" />

        {/* Shield icon */}
        <path
          className="jam-shield"
          d="M 8 3 L 3 5 L 3 10 Q 3 14, 8 16 Q 13 14, 13 10 L 13 5 Z"
          fill="url(#objectionGradient)"
          opacity="0.3"
          stroke="url(#objectionGradient)"
          strokeWidth="0.8"
        />

        {/* Checkmark on shield */}
        <path className="jam-shield-check" d="M 5 9 L 7 11 L 11 6" fill="none" stroke="#ff9500" strokeWidth="1.2" strokeLinecap="round" />

        {/* Label */}
        <text x="8" y="20" textAnchor="middle" fontSize="2" fill="#ff9500" opacity="0.8">OBJECTION</text>
      </g>

      {/* --- CLOSING SCRIPT --- */}
      <g className="jam-closing" transform="translate(24, 48)">
        <rect
          className="jam-close-btn"
          x="0" y="0" width="16" height="8" rx="4"
          fill="url(#closeGradient)"
          filter="url(#glowGreen)"
        />
        <text x="8" y="5.5" textAnchor="middle" fontSize="3" fill="#001a1a" fontWeight="bold">CLOSE</text>

        {/* Sparkle */}
        <g className="jam-sparkle">
          <line x1="18" y1="2" x2="20" y2="0" stroke="#00ff88" strokeWidth="0.5" />
          <line x1="18" y1="2" x2="20" y2="4" stroke="#00ff88" strokeWidth="0.5" />
          <line x1="18" y1="2" x2="21" y2="2" stroke="#00ff88" strokeWidth="0.5" />
        </g>
      </g>

      {/* --- CONFIDENCE METER --- */}
      <g className="jam-confidence" transform="translate(2, 50)">
        <rect x="0" y="0" width="20" height="6" rx="2" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.5" />

        {/* Meter fill */}
        <rect className="jam-conf-fill" x="1" y="1" width="14" height="4" rx="1" fill="url(#confidenceGradient)" />

        {/* Marker */}
        <rect className="jam-conf-marker" x="13" y="0" width="2" height="6" rx="0.5" fill="#fff" opacity="0.8" />

        <text x="10" y="10" textAnchor="middle" fontSize="2" fill="#00f3ff" opacity="0.7">CONFIDENCE</text>
      </g>

      {/* --- LIVE INDICATOR --- */}
      <g className="jam-live" transform="translate(2, 2)">
        <rect x="0" y="0" width="14" height="6" rx="2" fill="#ff4444" opacity="0.9" />
        <circle className="jam-live-dot" cx="4" cy="3" r="1.5" fill="#fff" />
        <text x="9" y="4.5" textAnchor="middle" fontSize="3" fill="#fff" fontWeight="bold">LIVE</text>
      </g>

      {/* --- TIMER --- */}
      <g className="jam-timer" transform="translate(48, 2)">
        <rect x="0" y="0" width="14" height="6" rx="2" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.5" />
        <text x="7" y="4.5" textAnchor="middle" fontSize="3" fill="#00f3ff" className="jam-time">12:34</text>
      </g>

      {/* --- CONVERSATION FLOW PARTICLES --- */}
      <g className="jam-particles">
        {/* Your words going out */}
        <circle className="jam-word-particle wp-1" cx="40" cy="24" r="1" fill="url(#yourVoiceGradient)" />
        <circle className="jam-word-particle wp-2" cx="42" cy="26" r="0.8" fill="url(#yourVoiceGradient)" />

        {/* Their words coming in */}
        <circle className="jam-word-particle wp-3" cx="24" cy="20" r="0.8" fill="url(#theirVoiceGradient)" />
        <circle className="jam-word-particle wp-4" cx="22" cy="22" r="1" fill="url(#theirVoiceGradient)" />
      </g>

      {/* --- QUICK RESPONSE HINTS --- */}
      <g className="jam-hints">
        <g className="jam-hint hint-1" transform="translate(20, 42)">
          <rect x="0" y="0" width="10" height="4" rx="1" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.3" opacity="0.7" />
          <text x="5" y="3" textAnchor="middle" fontSize="2" fill="#00f3ff" opacity="0.8">↩ Reply</text>
        </g>

        <g className="jam-hint hint-2" transform="translate(34, 42)">
          <rect x="0" y="0" width="10" height="4" rx="1" fill="#001a1a" stroke="#00ff88" strokeWidth="0.3" opacity="0.7" />
          <text x="5" y="3" textAnchor="middle" fontSize="2" fill="#00ff88" opacity="0.8">✓ Agree</text>
        </g>
      </g>

      {/* --- AUDIO WAVEFORM (Bottom) --- */}
      <g className="jam-waveform" transform="translate(4, 58)">
        <rect className="jam-bar bar-1" x="0" y="0" width="1.5" height="3" fill="#4facfe" opacity="0.6" />
        <rect className="jam-bar bar-2" x="3" y="-1" width="1.5" height="5" fill="#4facfe" opacity="0.7" />
        <rect className="jam-bar bar-3" x="6" y="-2" width="1.5" height="7" fill="#4facfe" opacity="0.8" />
        <rect className="jam-bar bar-4" x="9" y="-1" width="1.5" height="5" fill="#4facfe" opacity="0.7" />
        <rect className="jam-bar bar-5" x="12" y="0" width="1.5" height="3" fill="#4facfe" opacity="0.6" />
      </g>

      {/* --- "DON'T FREEZE" INDICATOR --- */}
      <g className="jam-flow-state" transform="translate(44, 56)">
        <rect x="0" y="0" width="18" height="5" rx="2" fill="#001a1a" stroke="#00ff88" strokeWidth="0.5" />
        <text x="9" y="3.5" textAnchor="middle" fontSize="2" fill="#00ff88">IN THE FLOW ✓</text>
      </g>

      {/* --- GLITCH LAYER --- */}
      <g className="jam-glitch">
        <circle cx="32" cy="32" r="10" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
      </g>

    </svg>
  );
};
