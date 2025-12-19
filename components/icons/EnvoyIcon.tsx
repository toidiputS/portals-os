import React from 'react';
import './holographic-icons.css';

interface EnvoyIconProps {
  className?: string;
  size?: number;
}

export const EnvoyIcon: React.FC<EnvoyIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon envoy-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientEnvoy" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.3" />
        </linearGradient>

        {/* Message/Script Gradient (Gold/Warm for persuasion) */}
        <linearGradient id="scriptGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffaa00" stopOpacity="0.8" />
        </linearGradient>

        {/* Lead/Target Gradient (Green for success) */}
        <linearGradient id="leadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="1" />
          <stop offset="100%" stopColor="#00cc66" stopOpacity="0.8" />
        </linearGradient>

        {/* Platform Gradient (Purple/Social) */}
        <linearGradient id="platformGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bf00ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#8000ff" stopOpacity="0.6" />
        </linearGradient>

        <filter id="glowEnvoy">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowGold">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip for script typing area */}
        <clipPath id="scriptClip">
          <rect x="12" y="10" width="8" height="44" />
        </clipPath>
      </defs>

      {/* --- BACKGROUND: RADAR RIPPLES --- */}
      <g className="envoy-radar">
        <circle cx="14" cy="32" r="16" fill="none" stroke="#00f3ff" strokeWidth="0.5" opacity="0.1" />
        <circle cx="14" cy="32" r="32" fill="none" stroke="#00f3ff" strokeWidth="0.5" opacity="0.1" />
        <path d="M 14 32 L 60 10" stroke="#00f3ff" strokeWidth="0.5" opacity="0.1" strokeDasharray="2 2" />
        <path d="M 14 32 L 60 32" stroke="#00f3ff" strokeWidth="0.5" opacity="0.1" strokeDasharray="2 2" />
        <path d="M 14 32 L 60 54" stroke="#00f3ff" strokeWidth="0.5" opacity="0.1" strokeDasharray="2 2" />
      </g>

      {/* --- THE "E" TRANSMITTER (Main Structure) --- */}
      <g className="envoy-structure">
        {/* Main Spine (Server/Generator) */}
        <path
          d="M 10 8 L 22 8 L 22 16 L 18 16 L 18 28 L 20 28 L 20 36 L 18 36 L 18 48 L 22 48 L 22 56 L 10 56 Z"
          fill="#001a1a"
          stroke="url(#holoGradientEnvoy)"
          strokeWidth="2"
          filter="url(#glowEnvoy)"
        />

        {/* Top Arm (Emitter 1) */}
        <rect x="22" y="10" width="12" height="4" fill="url(#holoGradientEnvoy)" opacity="0.8" />
        <circle cx="34" cy="12" r="3" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" />
        <circle cx="34" cy="12" r="1.5" fill="#fff" className="envoy-emitter e1" />

        {/* Middle Arm (Emitter 2) */}
        <rect x="20" y="30" width="10" height="4" fill="url(#holoGradientEnvoy)" opacity="0.8" />
        <circle cx="30" cy="32" r="3" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" />
        <circle cx="30" cy="32" r="1.5" fill="#fff" className="envoy-emitter e2" />

        {/* Bottom Arm (Emitter 3) */}
        <rect x="22" y="50" width="12" height="4" fill="url(#holoGradientEnvoy)" opacity="0.8" />
        <circle cx="34" cy="52" r="3" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" />
        <circle cx="34" cy="52" r="1.5" fill="#fff" className="envoy-emitter e3" />
      </g>

      {/* --- INTERNAL SCRIPT PROCESSING (Typing Effect) --- */}
      <g clipPath="url(#scriptClip)" opacity="0.6">
        <rect x="12" y="12" width="6" height="1" fill="#fff" className="envoy-code-line l1" />
        <rect x="12" y="15" width="4" height="1" fill="#fff" className="envoy-code-line l2" />
        <rect x="12" y="18" width="5" height="1" fill="#fff" className="envoy-code-line l3" />
        <rect x="12" y="32" width="6" height="1" fill="#fff" className="envoy-code-line l4" />
        <rect x="12" y="35" width="4" height="1" fill="#fff" className="envoy-code-line l5" />
        <rect x="12" y="52" width="6" height="1" fill="#fff" className="envoy-code-line l6" />
      </g>

      {/* --- TRANSMISSION SIGNALS (Outgoing) --- */}
      <g className="envoy-signals">
        {/* Signal 1 (Top) */}
        <path
          className="envoy-wave wave-1"
          d="M 38 12 Q 44 12, 50 12"
          stroke="url(#scriptGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Signal 2 (Middle) */}
        <path
          className="envoy-wave wave-2"
          d="M 34 32 Q 42 32, 50 32"
          stroke="url(#scriptGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Signal 3 (Bottom) */}
        <path
          className="envoy-wave wave-3"
          d="M 38 52 Q 44 52, 50 52"
          stroke="url(#scriptGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* --- MESSAGE PACKETS (Flying Envelopes) --- */}
      <g className="envoy-packets">
        <rect className="envoy-packet pkt-1" x="40" y="10" width="6" height="4" rx="1" fill="#ffd700" filter="url(#glowGold)" />
        <rect className="envoy-packet pkt-2" x="36" y="30" width="6" height="4" rx="1" fill="#ffd700" filter="url(#glowGold)" />
        <rect className="envoy-packet pkt-3" x="40" y="50" width="6" height="4" rx="1" fill="#ffd700" filter="url(#glowGold)" />
      </g>

      {/* --- TARGET PLATFORM NODES (Right Side) --- */}
      <g className="envoy-targets">
        {/* Node 1 (X/Twitter) */}
        <g className="envoy-node node-1" transform="translate(54, 12)">
          <circle r="4" fill="#001a1a" stroke="url(#platformGradient)" strokeWidth="1.5" />
          <path d="M -2 -2 L 2 2 M 2 -2 L -2 2" stroke="#bf00ff" strokeWidth="1" />
        </g>

        {/* Node 2 (LinkedIn) */}
        <g className="envoy-node node-2" transform="translate(54, 32)">
          <circle r="4" fill="#001a1a" stroke="url(#platformGradient)" strokeWidth="1.5" />
          <rect x="-1.5" y="-1.5" width="3" height="3" fill="#bf00ff" />
        </g>

        {/* Node 3 (IG) */}
        <g className="envoy-node node-3" transform="translate(54, 52)">
          <circle r="4" fill="#001a1a" stroke="url(#platformGradient)" strokeWidth="1.5" />
          <circle r="2" stroke="#bf00ff" strokeWidth="1" fill="none" />
          <circle cx="1" cy="-1" r="0.5" fill="#bf00ff" />
        </g>
      </g>

      {/* --- FOLLOW-UP LOGIC (Looping Arrow) --- */}
      <path
        className="envoy-loop"
        d="M 54 36 C 54 42, 46 42, 46 38"
        fill="none"
        stroke="#00ff88"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.6"
      />
      <polygon className="envoy-loop-arrow" points="46,38 44,40 48,40" fill="#00ff88" opacity="0.6" />

      {/* --- INCOMING LEADS (Success Response) --- */}
      <circle className="envoy-lead lead-1" cx="54" cy="12" r="6" fill="none" stroke="#00ff88" strokeWidth="1" />
      <circle className="envoy-lead lead-2" cx="54" cy="32" r="6" fill="none" stroke="#00ff88" strokeWidth="1" />
      <circle className="envoy-lead lead-3" cx="54" cy="52" r="6" fill="none" stroke="#00ff88" strokeWidth="1" />

      {/* --- GLITCH LAYER --- */}
      <g className="envoy-glitch">
        <path
          d="M 10 8 H 22 M 22 10 H 34 M 20 30 H 30 M 22 50 H 34"
          stroke="#fff"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
      </g>

    </svg>
  );
};
