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
        {/* HOLOGRAPHIC RAINBOW GRADIENT */}
        <linearGradient id="holoRainbow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff">
            <animate attributeName="stop-color"
              values="#00f3ff; #ff00ff; #ffff00; #00f3ff"
              dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#ff00ff">
            <animate attributeName="stop-color"
              values="#ff00ff; #ffff00; #00f3ff; #ff00ff"
              dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#ffff00">
            <animate attributeName="stop-color"
              values="#ffff00; #00f3ff; #ff00ff; #ffff00"
              dur="4s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        {/* IRIDESCENT SHIMMER */}
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0">
            <animate attributeName="offset"
              values="-0.5; 1.5" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8">
            <animate attributeName="offset"
              values="-0.25; 1.75" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#ff00ff" stopOpacity="0">
            <animate attributeName="offset"
              values="0; 2" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        {/* RADIAL ENERGY FIELD */}
        <radialGradient id="energyField">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffff00" stopOpacity="0" />
        </radialGradient>

        {/* ADVANCED GLOW FILTER */}
        <filter id="holoGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feColorMatrix type="saturate" values="2" result="saturated" />
          <feMerge>
            <feMergeNode in="saturated" />
            <feMergeNode in="saturated" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* CHROMATIC ABERRATION */}
        <filter id="chromatic">
          <feOffset in="SourceGraphic" dx="0.5" dy="0" result="red"/>
          <feOffset in="SourceGraphic" dx="-0.5" dy="0" result="blue"/>
          <feBlend mode="screen" in="red" in2="SourceGraphic" result="redBlend"/>
          <feBlend mode="screen" in="blue" in2="redBlend"/>
        </filter>

        {/* PULSE GLOW */}
        <filter id="pulse">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* PARTICLE MASK */}
        <mask id="particleMask">
          <rect width="64" height="64" fill="white" />
        </mask>
      </defs>

      {/* === LAYER 1: BACKGROUND ENERGY FIELD === */}
      <circle cx="32" cy="32" r="28" fill="url(#energyField)" className="k-energy-field">
        <animate attributeName="r" values="28; 32; 28" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3; 0.6; 0.3" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* === LAYER 2: ORBITAL RINGS (Relationship Cycles) === */}
      <g className="k-orbits">
        <circle cx="32" cy="32" r="24" fill="none"
          stroke="url(#holoRainbow)" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 8">
          <animateTransform attributeName="transform" type="rotate"
            from="0 32 32" to="360 32 32" dur="20s" repeatCount="indefinite" />
        </circle>
        <circle cx="32" cy="32" r="20" fill="none"
          stroke="url(#holoRainbow)" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 6">
          <animateTransform attributeName="transform" type="rotate"
            from="360 32 32" to="0 32 32" dur="15s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* === LAYER 3: CONNECTION CONSTELLATION === */}
      <g className="k-constellation" opacity="0.4">
        {/* Background network nodes */}
        <circle cx="12" cy="20" r="0.5" fill="#00f3ff" className="k-star" />
        <circle cx="52" cy="44" r="0.5" fill="#ff00ff" className="k-star" />
        <circle cx="40" cy="58" r="0.5" fill="#ffff00" className="k-star" />
        <circle cx="8" cy="48" r="0.5" fill="#00f3ff" className="k-star" />

        {/* Connecting lines */}
        <line x1="12" y1="20" x2="20" y2="10" stroke="#00f3ff" strokeWidth="0.3" opacity="0.3" />
        <line x1="52" y1="44" x2="48" y2="52" stroke="#ff00ff" strokeWidth="0.3" opacity="0.3" />
      </g>

      {/* === LAYER 4: SCAN LINES (Hologram Effect) === */}
      <g className="k-scanlines">
        <rect x="0" y="0" width="64" height="1" fill="#00f3ff" opacity="0.1">
          <animate attributeName="y" values="-2; 66" dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="0" y="0" width="64" height="2" fill="url(#shimmer)" opacity="0.3">
          <animate attributeName="y" values="-4; 68" dur="2.5s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* === LAYER 5: MAIN K STRUCTURE === */}
      <g filter="url(#holoGlow)">
        {/* Timeline Spine with Gradient */}
        <path
          d="M 20 10 V 54"
          stroke="url(#holoRainbow)"
          strokeWidth="4"
          strokeLinecap="round"
          className="k-spine"
        />

        {/* Top Arm (Outbound Nurture) - Thicker, more prominent */}
        <path
          d="M 20 32 L 48 12"
          stroke="url(#holoRainbow)"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="k-arm-top"
        />

        {/* Bottom Arm (Inbound Loyalty) */}
        <path
          d="M 20 32 L 48 52"
          stroke="url(#holoRainbow)"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="k-arm-bottom"
        />
      </g>

      {/* === LAYER 6: CHROMATIC K (Ghost Layer) === */}
      <g filter="url(#chromatic)" opacity="0.3">
        <path d="M 20 10 V 54 M 20 32 L 48 12 M 20 32 L 48 52"
          stroke="#ffffff" strokeWidth="1.5" fill="none" className="k-ghost" />
      </g>

      {/* === LAYER 7: TIMELINE MARKERS (Touchpoints) === */}
      <g className="k-timeline">
        {[16, 24, 32, 40, 48].map((y, i) => (
          <g key={i}>
            <line x1="16" y1={y} x2="24" y2={y}
              stroke="url(#holoRainbow)" strokeWidth="1.5" opacity="0.6" />
            <circle cx="15" cy={y} r="1" fill="#00f3ff" className="k-marker">
              <animate attributeName="opacity"
                values="0.3; 1; 0.3"
                dur="2s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </g>

      {/* === LAYER 8: DATA STREAMS (Multi-directional) === */}
      <g className="k-data-streams">
        {/* Outbound Stream 1 */}
        <circle r="1.5" fill="#00f3ff" filter="url(#holoGlow)">
          <animateMotion path="M 20 32 L 48 12" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0; 1; 0.8; 0" dur="2.5s" repeatCount="indefinite" />
        </circle>

        {/* Outbound Stream 2 (delayed) */}
        <circle r="1.5" fill="#ff00ff" filter="url(#holoGlow)">
          <animateMotion path="M 20 32 L 48 12" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0; 1; 0.8; 0" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
        </circle>

        {/* Inbound Stream 1 */}
        <circle r="1.5" fill="#ffff00" filter="url(#holoGlow)">
          <animateMotion path="M 48 52 L 20 32" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0; 1; 0.8; 0" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
        </circle>

        {/* Inbound Stream 2 */}
        <circle r="1.5" fill="#00f3ff" filter="url(#holoGlow)">
          <animateMotion path="M 48 52 L 20 32" dur="2.5s" begin="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0; 1; 0.8; 0" dur="2.5s" begin="2s" repeatCount="indefinite" />
        </circle>

        {/* Timeline Flow (upward memory) */}
        <circle r="1" fill="#ffffff" opacity="0.6">
          <animateMotion path="M 20 54 L 20 10" dur="4s" repeatCount="indefinite" />
          <animate attributeName="r" values="1; 0.5; 1" dur="4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* === LAYER 9: PARTICLE SYSTEM === */}
      <g className="k-particles" mask="url(#particleMask)">
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = 20 + Math.cos(angle) * 12;
          const y = 32 + Math.sin(angle) * 12;
          return (
            <circle key={i} r="0.5" fill="#ffffff" opacity="0.4">
              <animateMotion
                path={`M ${x} ${y} L ${20 + Math.cos(angle) * 18} ${32 + Math.sin(angle) * 18}`}
                dur="3s"
                begin={`${i * 0.375}s`}
                repeatCount="indefinite"
              />
              <animate attributeName="opacity"
                values="0; 0.8; 0"
                dur="3s"
                begin={`${i * 0.375}s`}
                repeatCount="indefinite" />
            </circle>
          );
        })}
      </g>

      {/* === LAYER 10: CENTRAL HEART (Pulse Core) === */}
      <g className="k-heart" filter="url(#pulse)">
        <circle cx="20" cy="32" r="5" fill="#001a1a"
          stroke="url(#holoRainbow)" strokeWidth="1.5" opacity="0.8" />
        <circle cx="20" cy="32" r="3" fill="url(#holoRainbow)">
          <animate attributeName="r" values="3; 4.5; 3" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1; 0.6; 1" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="20" cy="32" r="1.5" fill="#ffffff" />
      </g>

      {/* === LAYER 11: END NODES (Connection Points) === */}
      <g className="k-nodes">
        {/* Spine endpoints */}
        <circle cx="20" cy="10" r="2.5" fill="#001a1a" stroke="url(#holoRainbow)" strokeWidth="1.5" />
        <circle cx="20" cy="10" r="1.5" fill="#00f3ff" className="k-node-glow" />

        <circle cx="20" cy="54" r="2.5" fill="#001a1a" stroke="url(#holoRainbow)" strokeWidth="1.5" />
        <circle cx="20" cy="54" r="1.5" fill="#00f3ff" className="k-node-glow" />

        {/* Arm endpoints (Contact Points) */}
        <circle cx="48" cy="12" r="3" fill="#001a1a" stroke="url(#holoRainbow)" strokeWidth="1.5" />
        <circle cx="48" cy="12" r="2" fill="#ffffff" className="k-tip-pulse">
          <animate attributeName="r" values="2; 3; 2" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1; 0.4; 1" dur="2s" repeatCount="indefinite" />
        </circle>

        <circle cx="48" cy="52" r="3" fill="#001a1a" stroke="url(#holoRainbow)" strokeWidth="1.5" />
        <circle cx="48" cy="52" r="2" fill="#ffffff" className="k-tip-pulse">
          <animate attributeName="r" values="2; 3; 2" dur="2s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1; 0.4; 1" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* === LAYER 12: SHIMMER OVERLAY === */}
      <path
        d="M 20 10 V 54 M 20 32 L 48 12 M 20 32 L 48 52"
        stroke="url(#shimmer)"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
        className="k-shimmer"
      />

      {/* === LAYER 13: GLITCH LAYER (Occasional flicker) === */}
      <g className="k-glitch">
        <path d="M 20 10 V 54 M 20 32 L 48 12 M 20 32 L 48 52"
          stroke="#ffffff" strokeWidth="1" fill="none" opacity="0" />
      </g>
    </svg>
  );
};
