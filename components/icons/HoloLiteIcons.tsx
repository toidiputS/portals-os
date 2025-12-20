import React, { useMemo } from 'react';
import './holo-lite.css';

type Variant =
  | 'envoy'
  | 'flo'
  | 'grind'
  | 'helper'
  | 'interpreter'
  | 'jam'
  | 'kin'
  | 'listen';

interface HoloLiteIconProps {
  variant: Variant;
  size?: number;
  letter?: string;
  animate?: boolean;
  accent?: string;
  muted?: string;
  className?: string;
  label?: string;
}

export const HoloLiteIcon: React.FC<HoloLiteIconProps> = ({
  variant,
  size = 64,
  letter,
  animate = true,
  accent = '#9aa6ad',
  muted = 'rgba(255,255,255,0.06)',
  className = '',
  label
}) => {
  const defaultLetter = letter ?? variant.charAt(0).toUpperCase();
  const defaultWeight = ['envoy', 'grind', 'interpreter', 'kin'].includes(variant) ? 'mid' : 'light';

  const uid = useMemo(() => `hlico-${Math.random().toString(36).slice(2, 9)}`, []);

  const renderVariant = () => {
    switch (variant) {
      /* ----------------- envoy (E) ----------------- */
      case 'envoy': {
        return (
          <>
            <g className="orbit orbit-1 envoy-orbit">
              <g transform="translate(16 0)">
                <rect x={-8} y={-6} width={16} height={10} rx={1.2} fill="none" stroke="var(--holo-accent)" strokeWidth={1} />
                <path d="M -8 -6 L 0 0 L 8 -6" fill="none" stroke="var(--holo-accent)" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </g>

            <g className="envoy-pulses" transform="translate(44 32)">
              <path className="envoy-line line1" d="M0 -3 q6 0 12 0" fill="none" stroke="var(--holo-accent)" strokeWidth={0.9} strokeLinecap="round" />
              <path className="envoy-line line2" d="M0 0 q8 0 16 0" fill="none" stroke="var(--holo-accent)" strokeWidth={0.9} strokeLinecap="round" />
              <path className="envoy-line line3" d="M0 3 q10 0 20 0" fill="none" stroke="var(--holo-accent)" strokeWidth={0.9} strokeLinecap="round" />
            </g>

            <g className="orbit orbit-2">
              <g transform="translate(0 -18)">
                <circle r={1.6} fill="var(--holo-accent)" />
              </g>
            </g>
          </>
        );
      }

      /* ----------------- flo (F) ----------------- */
      case 'flo': {
        return (
          <>
            <g className="wave-group" transform="translate(0 -2)">
              <path className="wave wave-1" d="M6 36 C 14 28 22 44 30 36 C 38 28 46 44 58 36" stroke="var(--holo-accent)" strokeWidth={1.1} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
              <path className="wave wave-2" d="M8 40 C 16 32 24 48 32 40 C 40 32 48 48 56 40" stroke="var(--holo-accent)" strokeWidth={0.9} fill="none" strokeLinecap="round" opacity="0.75" />
            </g>

            <g className="orbit orbit-1">
              <g transform="translate(0 -18)">
                <circle r={1.6} fill="var(--holo-accent)" />
              </g>
            </g>
          </>
        );
      }

      /* ----------------- grind (G) ----------------- */
      case 'grind': {
        const teeth = Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={-0.9} y={-10.4} width={1.8} height={4.4} rx={0.3} transform={`rotate(${i * 60} 0 0)`} fill="var(--holo-accent)" />
        ));

        return (
          <>
            <g className="orbit orbit-1">
              <g transform="translate(16 0)" className="gear-wrap">
                {teeth}
                <circle cx={0} cy={0} r={6.4} fill="none" stroke="var(--holo-accent)" strokeWidth={1} />
                <circle cx={0} cy={0} r={2.6} fill="var(--holo-accent)" opacity={0.95} />
              </g>
            </g>

            <g className="orbit orbit-2">
              <g transform="translate(-16 0)" className="box-wrap">
                <rect x={-3.2} y={-3.6} width={6.4} height={4.2} rx={0.6} fill="none" stroke="var(--holo-accent)" strokeWidth={0.9} />
                <rect x={-2.6} y={1.2} width={5.2} height={2.6} rx={0.4} fill="var(--holo-accent)" opacity={0.14} />
              </g>
            </g>
          </>
        );
      }

      /* ----------------- helper (H) ----------------- */
      case 'helper': {
        return (
          <>
            <g className="doc-group" transform="translate(-12 0)">
              <rect x={-6} y={-8} width={12} height={14} rx={1.2} fill="none" stroke="var(--holo-accent)" strokeWidth={1} />
              <path d="M -4 -3 h6" stroke="var(--holo-accent)" strokeWidth={0.9} strokeLinecap="round" />
              <path d="M -4 0 h6" stroke="var(--holo-accent)" strokeWidth={0.9} strokeLinecap="round" />
            </g>

            <g className="helper-badge" transform="translate(14 -12)">
              <circle r={3.2} fill="var(--holo-accent)" opacity={0.95} />
              <path d="M -1 0 L -0.2 1 L 1.6 -1" fill="none" stroke="#001a1a" strokeWidth={0.9} strokeLinecap="round" strokeLinejoin="round" />
            </g>

            <g className="orbit orbit-2">
              <g transform="translate(0 -18)">
                <circle r={1.6} fill="var(--holo-accent)" />
              </g>
            </g>
          </>
        );
      }

      /* ----------------- interpreter (I) — medium ----------------- */
      case 'interpreter': {
        return (
          <>
            <g className="interpreter-structure" transform="translate(32 26)">
              <g transform="translate(0 -5)">
                <rect x={-10} y={-1.6} width={3} height={3} rx={0.4} fill="var(--holo-accent)" />
                <rect x={-6} y={-1} width={14} height={1.6} fill="none" stroke="var(--holo-accent)" strokeWidth={0.9} strokeLinecap="round" />
              </g>
              <g transform="translate(0 5)">
                <rect x={-10} y={-1.6} width={3} height={3} rx={0.4} fill="var(--holo-accent)" />
                <rect x={-6} y={-1} width={14} height={1.6} fill="none" stroke="var(--holo-accent)" strokeWidth={0.9} strokeLinecap="round" />
              </g>
            </g>

            <g className="orbit orbit-1">
              <g transform="translate(0 -18)">
                <circle r={1.6} fill="var(--holo-accent)" />
              </g>
            </g>

            <g className="orbit orbit-2">
              <g transform="translate(12 -6)">
                <circle r={1.2} fill="var(--holo-accent)" />
              </g>
            </g>
          </>
        );
      }

      /* ----------------- jam (J) — light ----------------- */
      case 'jam': {
        return (
          <>
            <g className="jam-mic" transform="translate(32 26)">
              <rect x={-4} y={-9} width={8} height={12} rx={2} stroke="var(--holo-accent)" strokeWidth={0.9} fill="none" />
              <line x1={0} y1={4} x2={0} y2={8} stroke="var(--holo-accent)" strokeWidth={1} strokeLinecap="round" />
            </g>

            <g className="mic-bars" transform="translate(44 30)">
              <rect className="bar bar1" x={-7} y={-6} width={3} height={6} rx={1} fill="var(--holo-accent)" />
              <rect className="bar bar2" x={-3} y={-6} width={3} height={6} rx={1} fill="var(--holo-accent)" />
              <rect className="bar bar3" x={1} y={-6} width={3} height={6} rx={1} fill="var(--holo-accent)" />
            </g>

            <g className="orbit orbit-1">
              <g transform="translate(0 -18)">
                <circle r={1.2} fill="var(--holo-accent)" />
              </g>
            </g>
          </>
        );
      }

      /* ----------------- kin (K) — medium ----------------- */
      case 'kin': {
        return (
          <>
            <g className="kin-core">
              <circle cx={32} cy={32} r={5.6} fill="none" stroke="var(--holo-accent)" strokeWidth={1.2} />
              <circle cx={32} cy={32} r={2.6} fill="var(--holo-accent)" className="kin-heart" />
            </g>

            <g className="orbit orbit-1 kin-orbit-1">
              <g transform="translate(0 -18)">
                <circle r={1.8} fill="var(--holo-accent)" />
              </g>
            </g>

            <g className="orbit orbit-2 kin-orbit-2">
              <g transform="translate(0 18)">
                <circle r={1.8} fill="var(--holo-accent)" />
              </g>
            </g>
          </>
        );
      }

      /* ----------------- listen (L) — light ----------------- */
      case 'listen': {
        return (
          <>
            <g className="listen-magnifier" transform="translate(-8 0)">
              <g transform="translate(24 28)">
                <circle cx={0} cy={0} r={6} fill="none" stroke="var(--holo-accent)" strokeWidth={1} />
                <line x1={4.5} y1={4.5} x2={9.5} y2={9.5} stroke="var(--holo-accent)" strokeWidth={0.9} strokeLinecap="round" />
              </g>
            </g>

            <g className="listen-scan" transform="translate(0 0)">
              <circle className="scan-ring" cx={32} cy={32} r={14} fill="none" stroke="var(--holo-accent)" strokeWidth={1} strokeLinecap="round" strokeDasharray="36 60" />
            </g>

            <g className="orbit orbit-2">
              <g transform="translate(0 -18)">
                <circle r={1.2} fill="var(--holo-accent)" />
              </g>
            </g>
          </>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className={`holo-lite-wrap variant-${variant} weight-${defaultWeight} ${className}`}>
      <svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-label={label ?? `${defaultLetter} — ${variant}`}>
        {/* base ring */}
        <circle className="ring" cx="32" cy="32" r="26" stroke="var(--holo-muted)" strokeWidth={1.2} fill="none" />

        {/* soft orbital guide */}
        <ellipse className="orbit-guide" cx="32" cy="32" rx="20.5" ry="20.5" fill="none" stroke="var(--holo-muted)" strokeWidth={0.8} opacity="0.06" />

        {renderVariant()}

        {/* central letter */}
        <text className="letter" x="32" y="38" textAnchor="middle" aria-hidden="true">{defaultLetter}</text>
      </svg>
    </div>
  );
};

export default HoloLiteIcon;
