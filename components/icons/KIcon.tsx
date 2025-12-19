import React from 'react';
import './holographic-icons.css';

interface KinIconProps {
  className?: string;
  size?: number;
}

export const KIcon: React.FC<KinIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon kin-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientK" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.2" />
        </linearGradient>

        <filter id="glowK">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip for the Spine Timeline */}
        <clipPath id="clipKSpine">
           <rect x="16" y="10" width="8" height="44" />
        </clipPath>
      </defs>

      {/* --- CONNECTION FIELD (Background Arc) --- */}
      {/* Represents the "Circle of Influence" or Community */}
      <path
        d="M 48 12 Q 62 32 48 52"
        stroke="#00f3ff"
        strokeWidth="0.5"
        fill="none"
        strokeDasharray="4 4"
        opacity="0.3"
        className="k-connection-arc"
      />

      {/* --- THE STRUCTURE (K Shape) --- */}
      <g filter="url(#glowK)">
        {/* Vertical Spine (History Timeline) */}
        <path
          d="M 20 10 V 54"
          stroke="url(#holoGradientK)" strokeWidth="4" strokeLinecap="round"
        />

        {/* Top Arm (Outbound/Nurture) */}
        <path
          d="M 20 32 L 48 12"
          stroke="url(#holoGradientK)" strokeWidth="3" strokeLinecap="round"
        />

        {/* Bottom Arm (Inbound/Referral) */}
        <path
          d="M 20 32 L 48 52"
          stroke="url(#holoGradientK)" strokeWidth="3" strokeLinecap="round"
        />
      </g>

      {/* --- THE TIMELINE (Client History) --- */}
      {/* Small ticks on the spine representing touchpoints */}
      <g className="k-timeline">
         <line x1="16" y1="16" x2="24" y2="16" stroke="#fff" strokeWidth="1" opacity="0.5" />
         <line x1="16" y1="24" x2="24" y2="24" stroke="#fff" strokeWidth="1" opacity="0.5" />
         <line x1="16" y1="40" x2="24" y2="40" stroke="#fff" strokeWidth="1" opacity="0.5" />
         <line x1="16" y1="48" x2="24" y2="48" stroke="#fff" strokeWidth="1" opacity="0.5" />
      </g>

      {/* --- ANIMATED PACKETS (The Sequence) --- */}

      {/* Outbound Packet (Sending Nurture) */}
      <circle r="2" fill="#fff" className="k-packet-out" filter="url(#glowK)">
        <animateMotion
           path="M 20 32 L 48 12"
           dur="3s"
           repeatCount="indefinite"
           keyPoints="0;1"
           keyTimes="0;1"
        />
        <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Inbound Packet (Receiving Referral/Loyalty) */}
      <circle r="2" fill="#fff" className="k-packet-in" filter="url(#glowK)">
        <animateMotion
           path="M 48 52 L 20 32"
           dur="3s"
           repeatCount="indefinite"
           begin="1.5s"
        />
        <animate attributeName="opacity" values="0;1;1" dur="3s" repeatCount="indefinite" begin="1.5s" />
      </circle>

      {/* --- THE HEART (Central Node) --- */}
      <circle cx="20" cy="32" r="4" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" />
      <circle cx="20" cy="32" r="2" fill="#fff" className="k-heartbeat" filter="url(#glowK)" />

      {/* --- NODES (End points) --- */}
      <circle cx="20" cy="10" r="2" fill="#00f3ff" className="k-node" />
      <circle cx="20" cy="54" r="2" fill="#00f3ff" className="k-node" />
      <circle cx="48" cy="12" r="2" fill="#fff" className="k-node-tip" />
      <circle cx="48" cy="52" r="2" fill="#fff" className="k-node-tip" />

      {/* --- GLITCH LAYER --- */}
      <path
        className="k-glitch"
        d="M 20 10 V 54 M 20 32 L 48 12 M 20 32 L 48 52"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
};
