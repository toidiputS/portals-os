import React, { useMemo } from 'react';
import './holographic-icons.css';

interface KinIconProps {
  className?: string;
  size?: number;               // icon size in px
  animate?: boolean;           // toggle all animations
  id?: string;                 // optional id prefix (unique)
  label?: string;              // accessible label / tooltip
  showLabel?: boolean;         // show small label under icon
  primaryColor?: string;       // main holographic color
  secondaryColor?: string;     // secondary accent color
}

export const KinIcon: React.FC<KinIconProps> = ({
  className = '',
  size = 64,
  animate = true,
  id,
  label = 'Kin — Keep-In-Touch',
  showLabel = false,
  primaryColor = '#00f3ff',
  secondaryColor = '#7C16FF'
}) => {
  const uid = useMemo(() => id ?? `kin-${Math.random().toString(36).slice(2,9)}`, [id]);

  // CSS vars for runtime customization + pause/play
  const inlineVars = {
    ['--holo-primary' as any]: primaryColor,
    ['--holo-secondary' as any]: secondaryColor,
    ['--holo-size' as any]: `${size}px`,
    ['--kin-play' as any]: animate ? 'running' : 'paused'
  } as React.CSSProperties;

  return (
    <div className={`kin-holo-wrap ${className}`} style={inlineVars}>
      <svg
        className="holographic-icon kin-icon"
        width={size}
        height={size}
        viewBox="0 0 64 64"
        role="img"
        aria-labelledby={`${uid}-title`}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title id={`${uid}-title`}>{label}</title>
        <desc>Kin — Keep-In-Touch persona icon</desc>

        <defs>
          <linearGradient id={`${uid}-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--holo-primary)" stopOpacity="1" />
            <stop offset="50%" stopColor="var(--holo-secondary)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--holo-primary)" stopOpacity="0.28" />
          </linearGradient>

          <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
          </linearGradient>

          <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* subtle fractal noise for artistic texture */}
          <filter id={`${uid}-noise`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence baseFrequency="0.9" numOctaves="1" type="fractalNoise" result="noise" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="screen" />
          </filter>

          {/* arm motion paths reused by animateMotion */}
          <path id={`${uid}-path-top`} d="M20 32 L48 12" />
          <path id={`${uid}-path-bottom`} d="M20 32 L48 52" />

          {/* clip used for sheen so it doesn't leave bounds */}
          <clipPath id={`${uid}-clip`}>
            <rect x="6" y="6" width="52" height="52" rx="6" />
          </clipPath>
        </defs>

        {/* background arc (circle of influence) */}
        <path
          d="M48 12 Q62 32 48 52"
          stroke={`url(#${uid}-grad)`}
          strokeWidth="0.6"
          fill="none"
          strokeDasharray="6 4"
          opacity="0.28"
          className="k-connection-arc"
        />

        {/* main K structure (spine + arms) */}
        <g className="k-structure" filter={`url(#${uid}-glow)`}>
          <path
            d="M20 10 V54"
            stroke={`url(#${uid}-grad)`} strokeWidth="4" strokeLinecap="round"
            className="k-spine"
          />
          <path d="M20 32 L48 12" stroke={`url(#${uid}-grad)`} strokeWidth="3" strokeLinecap="round" fill="none" className="k-arm k-arm-top" />
          <path d="M20 32 L48 52" stroke={`url(#${uid}-grad)`} strokeWidth="3" strokeLinecap="round" fill="none" className="k-arm k-arm-bottom" />
        </g>

        {/* timeline ticks on spine */}
        <g className="k-timeline">
          <line x1="16" y1="16" x2="24" y2="16" stroke="#fff" strokeWidth="1" opacity="0.6" />
          <line x1="16" y1="24" x2="24" y2="24" stroke="#fff" strokeWidth="1" opacity="0.6" />
          <line x1="16" y1="40" x2="24" y2="40" stroke="#fff" strokeWidth="1" opacity="0.6" />
          <line x1="16" y1="48" x2="24" y2="48" stroke="#fff" strokeWidth="1" opacity="0.6" />
        </g>

        {/* outbound packet (nurture) — moves along top arm */}
        <circle r="2.6" fill="#fff" className="k-packet k-packet-out" filter={`url(#${uid}-glow)`}>
          <animateMotion dur="2.8s" repeatCount="indefinite">
            <mpath xlinkHref={`#${uid}-path-top`} />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;0" dur="2.8s" repeatCount="indefinite" />
        </circle>

        {/* inbound packet (referral/loyalty) — moves along bottom arm */}
        <circle r="2.6" fill="#fff" className="k-packet k-packet-in" filter={`url(#${uid}-glow)`}>
          <animateMotion dur="2.8s" begin="1.4s" repeatCount="indefinite">
            <mpath xlinkHref={`#${uid}-path-bottom`} />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;0" dur="2.8s" begin="1.4s" repeatCount="indefinite" />
        </circle>

        {/* central core (heart/central node) */}
        <g className="k-core">
          <circle cx="20" cy="32" r="6.2" fill={`url(#${uid}-sheen)`} opacity="0.18" />
          <circle cx="20" cy="32" r="4.2" fill="#001a1a" stroke={`url(#${uid}-grad)`} strokeWidth="1.2" />
          <circle cx="20" cy="32" r="2.2" fill="#fff" className="k-heartbeat" filter={`url(#${uid}-glow)`} />
        </g>

        {/* nodes */}
        <g className="k-nodes">
          <circle cx="20" cy="10" r="2.4" fill="var(--holo-primary)" className="k-node" />
          <circle cx="20" cy="54" r="2.4" fill="var(--holo-primary)" className="k-node" />
          <circle cx="48" cy="12" r="2.4" fill="#fff" className="k-node-tip" />
          <circle cx="48" cy="52" r="2.4" fill="#fff" className="k-node-tip" />
        </g>

        {/* sheen overlay (moves across, clipped) */}
        <g className="k-shimmer" clipPath={`url(#${uid}-clip)`}>
          <rect className="k-sheen" x="-40" y="0" width="120" height="64" fill={`url(#${uid}-sheen)`} />
        </g>

        {/* subtle scanlines */}
        <g className="k-scanlines" opacity="0.06">
          <g className="k-lines" stroke="#fff" strokeWidth="0.6">
            <line x1="0" x2="64" y1="0" y2="0" />
            <line x1="0" x2="64" y1="5" y2="5" />
            <line x1="0" x2="64" y1="10" y2="10" />
            <line x1="0" x2="64" y1="15" y2="15" />
            <line x1="0" x2="64" y1="20" y2="20" />
            <line x1="0" x2="64" y1="25" y2="25" />
            <line x1="0" x2="64" y1="30" y2="30" />
            <line x1="0" x2="64" y1="35" y2="35" />
            <line x1="0" x2="64" y1="40" y2="40" />
            <line x1="0" x2="64" y1="45" y2="45" />
            <line x1="0" x2="64" y1="50" y2="50" />
            <line x1="0" x2="64" y1="55" y2="55" />
          </g>
        </g>

        {/* subtle glitch outline */}
        <path
          className="k-glitch"
          d="M20 10 V54 M20 32 L48 12 M20 32 L48 52"
          stroke="#fff"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />
      </svg>

      {showLabel && <div className="kin-label" title={label}>{label}</div>}
    </div>
  );
};

export default KinIcon;
