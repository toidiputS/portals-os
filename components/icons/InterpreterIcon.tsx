import React from 'react';
import './holographic-icons.css';

interface InterpreterIconProps {
  className?: string;
  size?: number;
}

export const InterpreterIcon: React.FC<InterpreterIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon interpreter-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientInt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.4" />
        </linearGradient>

        {/* Chaos/Input gradient (Red/Orange - messy) */}
        <linearGradient id="chaosGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b6b" stopOpacity="1" />
          <stop offset="100%" stopColor="#ff9500" stopOpacity="0.8" />
        </linearGradient>

        {/* Processing gradient (Purple - transformation) */}
        <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bf00ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#8000ff" stopOpacity="0.8" />
        </linearGradient>

        {/* Order/Output gradient (Green - structured) */}
        <linearGradient id="orderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="1" />
          <stop offset="100%" stopColor="#00cc66" stopOpacity="0.8" />
        </linearGradient>

        {/* Document gradient */}
        <linearGradient id="docGradientInt" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.6" />
        </linearGradient>

        <filter id="glowInt">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowPurple">
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

      {/* --- BACKGROUND: TRANSFORMATION GRID --- */}
      <g className="int-grid" opacity="0.1">
        {/* Left side - chaotic */}
        <path d="M 4 10 Q 8 14, 4 18 Q 10 22, 4 26" fill="none" stroke="#ff6b6b" strokeWidth="0.5" />
        <path d="M 8 8 Q 12 16, 6 24" fill="none" stroke="#ff6b6b" strokeWidth="0.3" />

        {/* Right side - ordered */}
        <line x1="52" y1="10" x2="60" y2="10" stroke="#00ff88" strokeWidth="0.3" />
        <line x1="52" y1="16" x2="60" y2="16" stroke="#00ff88" strokeWidth="0.3" />
        <line x1="52" y1="22" x2="60" y2="22" stroke="#00ff88" strokeWidth="0.3" />
      </g>

      {/* --- INPUT ZONE: CHAOS (Left Side) --- */}
      <g className="int-input">
        {/* Messy container */}
        <rect x="2" y="14" width="18" height="36" rx="2" fill="#001a1a" stroke="url(#chaosGradient)" strokeWidth="1" opacity="0.8" />

        {/* Audio waveform (chaotic) */}
        <g className="int-waveform" transform="translate(6, 20)">
          <path
            className="int-wave wave-1"
            d="M 0 8 Q 2 2, 4 8 Q 6 14, 8 6 Q 10 0, 12 10"
            fill="none"
            stroke="url(#chaosGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* Scattered thought bubbles */}
        <g className="int-thoughts">
          <circle className="int-thought t-1" cx="8" cy="34" r="2" fill="url(#chaosGradient)" opacity="0.6" />
          <circle className="int-thought t-2" cx="14" cy="38" r="1.5" fill="url(#chaosGradient)" opacity="0.5" />
          <circle className="int-thought t-3" cx="6" cy="42" r="2.5" fill="url(#chaosGradient)" opacity="0.7" />
          <circle className="int-thought t-4" cx="16" cy="44" r="1.8" fill="url(#chaosGradient)" opacity="0.5" />
        </g>

        {/* Voice note icon */}
        <g className="int-voice" transform="translate(11, 26)">
          <circle r="4" fill="#001a1a" stroke="#ff6b6b" strokeWidth="0.8" />
          <path d="M -1 -2 L -1 2 M 1 -1 L 1 1" stroke="#ff6b6b" strokeWidth="1" strokeLinecap="round" />
          <path d="M -2 1 Q -2 3, 0 3 Q 2 3, 2 1" fill="none" stroke="#ff6b6b" strokeWidth="0.5" />
        </g>

        {/* Label */}
        <text x="11" y="12" textAnchor="middle" fontSize="2.5" fill="#ff6b6b" opacity="0.8">CHAOS</text>
      </g>

      {/* --- CENTRAL PROCESSOR: TRANSLATOR --- */}
      <g className="int-processor">
        {/* Main processing unit */}
        <rect
          className="int-processor-body"
          x="22" y="18" width="20" height="28" rx="3"
          fill="#001a1a"
          stroke="url(#processGradient)"
          strokeWidth="2"
          filter="url(#glowPurple)"
        />

        {/* Brain/Neural icon */}
        <g className="int-brain" transform="translate(32, 28)">
          {/* Brain outline */}
          <path
            className="int-brain-left"
            d="M -2 -4 Q -6 -4, -6 0 Q -7 2, -5 4 Q -4 6, -1 5 Q 0 4, 0 0 Q 0 -3, -2 -4"
            fill="none"
            stroke="#bf00ff"
            strokeWidth="1"
          />
          <path
            className="int-brain-right"
            d="M 2 -4 Q 6 -4, 6 0 Q 7 2, 5 4 Q 4 6, 1 5 Q 0 4, 0 0 Q 0 -3, 2 -4"
            fill="none"
            stroke="#bf00ff"
            strokeWidth="1"
          />

          {/* Neural connections */}
          <line className="int-neural n-1" x1="-3" y1="0" x2="3" y2="0" stroke="#bf00ff" strokeWidth="0.5" />
          <line className="int-neural n-2" x1="-2" y1="-2" x2="2" y2="2" stroke="#bf00ff" strokeWidth="0.5" />
          <line className="int-neural n-3" x1="-2" y1="2" x2="2" y2="-2" stroke="#bf00ff" strokeWidth="0.5" />

          {/* Core */}
          <circle className="int-brain-core" r="2" fill="url(#processGradient)" />
        </g>

        {/* Processing indicators */}
        <g className="int-indicators">
          <rect className="int-led led-1" x="25" y="38" width="2" height="2" rx="0.5" fill="#bf00ff" />
          <rect className="int-led led-2" x="29" y="38" width="2" height="2" rx="0.5" fill="#bf00ff" />
          <rect className="int-led led-3" x="33" y="38" width="2" height="2" rx="0.5" fill="#bf00ff" />
          <rect className="int-led led-4" x="37" y="38" width="2" height="2" rx="0.5" fill="#bf00ff" />
        </g>

        {/* Input/Output arrows on processor */}
        <path className="int-arrow-in" d="M 22 32 L 26 32" stroke="#ff6b6b" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <path className="int-arrow-out" d="M 38 32 L 42 32" stroke="#00ff88" strokeWidth="1.5" />

        {/* Label */}
        <text x="32" y="16" textAnchor="middle" fontSize="2.5" fill="#bf00ff" fontWeight="bold">INTERPRET</text>
      </g>

      {/* --- OUTPUT ZONE: STRUCTURE (Right Side) --- */}
      <g className="int-output">
        {/* Organized container */}
        <rect x="44" y="14" width="18" height="36" rx="2" fill="#001a1a" stroke="url(#orderGradient)" strokeWidth="1" filter="url(#glowGreen)" />

        {/* Executive Summary document */}
        <g className="int-doc doc-summary" transform="translate(46, 16)">
          <rect x="0" y="0" width="14" height="10" rx="1" fill="#001a1a" stroke="#00ff88" strokeWidth="0.5" />
          <line x1="2" y1="2" x2="8" y2="2" stroke="#00ff88" strokeWidth="0.6" opacity="0.8" />
          <line x1="2" y1="4" x2="12" y2="4" stroke="#00ff88" strokeWidth="0.4" opacity="0.6" />
          <line x1="2" y1="6" x2="10" y2="6" stroke="#00ff88" strokeWidth="0.4" opacity="0.5" />
          <line x1="2" y1="8" x2="8" y2="8" stroke="#00ff88" strokeWidth="0.4" opacity="0.4" />
          {/* Summary icon */}
          <text x="12" y="3" fontSize="2" fill="#00ff88">Σ</text>
        </g>

        {/* Project Brief document */}
        <g className="int-doc doc-brief" transform="translate(46, 28)">
          <rect x="0" y="0" width="14" height="10" rx="1" fill="#001a1a" stroke="#00ff88" strokeWidth="0.5" />
          {/* Structured sections */}
          <rect x="2" y="2" width="4" height="3" rx="0.3" fill="#00ff88" opacity="0.2" />
          <rect x="8" y="2" width="4" height="3" rx="0.3" fill="#00ff88" opacity="0.2" />
          <rect x="2" y="6" width="10" height="2" rx="0.3" fill="#00ff88" opacity="0.15" />
          {/* Brief icon */}
          <text x="12" y="3" fontSize="2" fill="#00ff88">📋</text>
        </g>

        {/* Task List */}
        <g className="int-doc doc-tasks" transform="translate(46, 40)">
          <rect x="0" y="0" width="14" height="8" rx="1" fill="#001a1a" stroke="#00ff88" strokeWidth="0.5" />
          {/* Checkboxes */}
          <rect x="2" y="1.5" width="1.5" height="1.5" rx="0.2" fill="none" stroke="#00ff88" strokeWidth="0.4" />
          <path className="int-check check-1" d="M 2.2 2.3 L 2.8 2.8 L 3.5 1.8" fill="none" stroke="#00ff88" strokeWidth="0.4" />
          <line x1="5" y1="2.2" x2="12" y2="2.2" stroke="#00ff88" strokeWidth="0.4" opacity="0.7" />

          <rect x="2" y="4" width="1.5" height="1.5" rx="0.2" fill="none" stroke="#00ff88" strokeWidth="0.4" />
          <path className="int-check check-2" d="M 2.2 4.8 L 2.8 5.3 L 3.5 4.3" fill="none" stroke="#00ff88" strokeWidth="0.4" />
          <line x1="5" y1="4.7" x2="10" y2="4.7" stroke="#00ff88" strokeWidth="0.4" opacity="0.6" />

          <rect x="2" y="6" width="1.5" height="1.5" rx="0.2" fill="none" stroke="#00ff88" strokeWidth="0.4" opacity="0.5" />
          <line x1="5" y1="6.7" x2="8" y2="6.7" stroke="#00ff88" strokeWidth="0.4" opacity="0.4" />
        </g>

        {/* Label */}
        <text x="53" y="12" textAnchor="middle" fontSize="2.5" fill="#00ff88" opacity="0.8">ORDER</text>
      </g>

      {/* --- TRANSFORMATION FLOW --- */}
      <g className="int-flow">
        {/* Chaos particles entering */}
        <circle className="int-particle chaos-p cp-1" cx="20" cy="28" r="1.5" fill="url(#chaosGradient)" />
        <circle className="int-particle chaos-p cp-2" cx="20" cy="32" r="1" fill="url(#chaosGradient)" />
        <circle className="int-particle chaos-p cp-3" cx="20" cy="36" r="1.5" fill="url(#chaosGradient)" />

        {/* Order particles exiting */}
        <rect className="int-particle order-p op-1" x="43" y="27" width="2" height="2" rx="0.3" fill="url(#orderGradient)" />
        <rect className="int-particle order-p op-2" x="43" y="31" width="2" height="2" rx="0.3" fill="url(#orderGradient)" />
        <rect className="int-particle order-p op-3" x="43" y="35" width="2" height="2" rx="0.3" fill="url(#orderGradient)" />
      </g>

      {/* --- TRANSLATION SYMBOLS --- */}
      <g className="int-symbols">
        {/* Input symbols (chaotic characters) */}
        <text className="int-char char-in c-1" x="4" y="58" fontSize="4" fill="#ff6b6b" opacity="0.6">?</text>
        <text className="int-char char-in c-2" x="10" y="56" fontSize="3" fill="#ff6b6b" opacity="0.5">~</text>
        <text className="int-char char-in c-3" x="16" y="59" fontSize="4" fill="#ff6b6b" opacity="0.7">...</text>

        {/* Output symbols (structured) */}
        <text className="int-char char-out c-4" x="48" y="56" fontSize="3" fill="#00ff88" opacity="0.7">✓</text>
        <text className="int-char char-out c-5" x="54" y="58" fontSize="3" fill="#00ff88" opacity="0.6">→</text>
        <text className="int-char char-out c-6" x="58" y="56" fontSize="3" fill="#00ff88" opacity="0.7">1.</text>
      </g>

      {/* --- PROCESSING RING --- */}
      <g className="int-ring">
        <circle
          className="int-process-ring"
          cx="32" cy="32" r="18"
          fill="none"
          stroke="url(#processGradient)"
          strokeWidth="0.5"
          strokeDasharray="8 8"
          opacity="0.3"
        />
      </g>

      {/* --- STATUS INDICATORS --- */}
      <g className="int-status">
        {/* Input status */}
        <g transform="translate(4, 4)">
          <rect x="0" y="0" width="14" height="5" rx="1" fill="#001a1a" stroke="#ff6b6b" strokeWidth="0.5" />
          <circle cx="3" cy="2.5" r="1.5" fill="#ff6b6b" className="int-status-in" />
          <text x="6" y="3.5" fontSize="2" fill="#ff6b6b">INPUT</text>
        </g>

        {/* Output status */}
        <g transform="translate(46, 4)">
          <rect x="0" y="0" width="16" height="5" rx="1" fill="#001a1a" stroke="#00ff88" strokeWidth="0.5" />
          <circle cx="3" cy="2.5" r="1.5" fill="#00ff88" className="int-status-out" />
          <text x="6" y="3.5" fontSize="2" fill="#00ff88">OUTPUT</text>
        </g>
      </g>

      {/* --- CLARITY METER --- */}
      <g className="int-clarity" transform="translate(26, 48)">
        <rect x="0" y="0" width="12" height="4" rx="1" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.3" />

        {/* Meter fill (chaos to order gradient) */}
        <rect className="int-clarity-fill" x="0.5" y="0.5" width="9" height="3" rx="0.5">
          <linearGradient id="clarityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="50%" stopColor="#bf00ff" />
            <stop offset="100%" stopColor="#00ff88" />
          </linearGradient>
        </rect>
        <rect className="int-clarity-fill" x="0.5" y="0.5" width="9" height="3" rx="0.5" fill="url(#clarityGradient)" />

        <text x="6" y="7" textAnchor="middle" fontSize="2" fill="#00f3ff" opacity="0.7">CLARITY</text>
      </g>

      {/* --- GLITCH LAYER --- */}
      <g className="int-glitch">
        <rect x="22" y="18" width="20" height="28" rx="3" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
      </g>

    </svg>
  );
};
