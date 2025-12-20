import React, { useMemo } from 'react';
import './holo-medium.css';

type Variant =
  | 'map'
  | 'nerve'
  | 'optimize'
  | 'polish'
  | 'quick'
  | 'research'
  | 'scroll'
  | 'timeline';

interface HoloMediumIconProps {
  variant: Variant;
  size?: number;             // visual size of the SVG (px)
  animate?: boolean;         // toggle animations on/off
  accent?: string;           // muted accent color
  muted?: string;            // muted guide stroke
  pad?: number;              // extra "safe" padding around the svg (px)
  orbitScale?: number;       // scale factor for any orbit offsets (0.6 - 1.0)
  title?: string;            // override title text
  subtitle?: string;         // override subtitle text
  className?: string;
}

const VARIANT_INFO: Record<Variant, { emoji: string; title: string; subtitle: string }> = {
  map: { emoji: '🧩', title: 'Map', subtitle: 'Workflow Architect' },
  nerve: { emoji: '🧠', title: 'Nerve', subtitle: 'Nerve Center' },
  optimize: { emoji: '📈', title: 'Optimize', subtitle: 'Bottleneck Logic' },
  polish: { emoji: '✨', title: 'Polish', subtitle: 'Refinement Interface' },
  quick: { emoji: '⚡', title: 'Quick', subtitle: 'Momentum Interface' },
  research: { emoji: '🔍', title: 'Research', subtitle: 'Market Spy' },
  scroll: { emoji: '📜', title: 'Scroll', subtitle: 'Knowledge Base' },
  timeline: { emoji: '⌛', title: 'Timeline', subtitle: 'History Logic' },
};

export const HoloMediumIcon: React.FC<HoloMediumIconProps> = ({
  variant,
  size = 72,
  animate = true,
  accent = '#8fa3a8',
  muted = 'rgba(255,255,255,0.08)',
  pad = 8,
  orbitScale = 1,
  title,
  subtitle,
  className = '',
}) => {
  const info = VARIANT_INFO[variant];
  const displayTitle = title ?? info.title;
  const displaySubtitle = subtitle ?? info.subtitle;
  const uid = useMemo(() => `holoM-${Math.random().toString(36).slice(2, 9)}`, []);

  // helpful offsets (multiply transforms by orbitScale when we want satellites/orbits scaled down)
  const o16 = 16 * orbitScale;
  const o18 = 18 * orbitScale;
  const o12 = 12 * orbitScale;
  const o20 = 20 * orbitScale;
  const gearX = 46 * orbitScale;
  const gearY = 20 * orbitScale;

  const wrapperStyle: React.CSSProperties = {
    ['--holo-accent' as any]: accent,
    ['--holo-muted' as any]: muted,
    ['--holo-size' as any]: `${size}px`,
    ['--holo-play' as any]: animate ? 'running' : 'paused',
  } as React.CSSProperties;

  const svgWrapStyle: React.CSSProperties = {
    padding: `${pad}px`,
    boxSizing: 'content-box'
  };

  const renderVariant = () => {
    switch (variant) {
      /* MAP */
      case 'map':
        return (
          <g className="icon-map">
            <rect x="16" y="16" width="32" height="32" rx="5" fill="none" stroke="var(--holo-accent)" strokeWidth="1.2" />
            <circle cx="32" cy="12.5" r="3.4" fill="none" stroke="var(--holo-accent)" strokeWidth="1.1" />
            <circle cx="49.5" cy="32" r="3.4" fill="none" stroke="var(--holo-accent)" strokeWidth="1.1" />

            <g className="map-rotor" transform="translate(32 32)">
              <rect x={-6} y={-6} width={12} height={12} rx={1} fill="none" stroke="var(--holo-accent)" strokeWidth="1" />
              <path d="M -8 0 h16 M 0 -8 v16" stroke="var(--holo-accent)" strokeWidth="0.9" strokeLinecap="round" />
            </g>

            <rect className="sheen" x="-40" y="0" width="120" height="64" fill="#ffffff" opacity="0.05" />
          </g>
        );

      /* NERVE */
      case 'nerve':
        return (
          <g className="icon-nerve">
            <path d="M16 36 C20 18 44 18 48 36 C44 50 20 50 16 36 Z" fill="none" stroke="var(--holo-accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path className="nerve-line" d="M22 34 C28 28 36 26 42 30" fill="none" stroke="var(--holo-accent)" strokeWidth="0.95" strokeLinecap="round" />
            <path className="nerve-line" d="M20 38 C26 36 34 34 40 38" fill="none" stroke="var(--holo-accent)" strokeWidth="0.85" strokeLinecap="round" />
            <circle className="nerve-pulse" cx="26" cy="32" r="1.9" fill="var(--holo-accent)" />
            <circle className="nerve-pulse" cx="36" cy="34" r="1.6" fill="var(--holo-accent)" />
          </g>
        );

      /* OPTIMIZE */
      case 'optimize':
        return (
          <g className="icon-optimize">
            <rect className="opt-bar b1" x="18" y="36" width="6" height="16" rx="1" fill="var(--holo-accent)" />
            <rect className="opt-bar b2" x="28" y="30" width="6" height="22" rx="1" fill="var(--holo-accent)" />
            <rect className="opt-bar b3" x="38" y="24" width="6" height="28" rx="1" fill="var(--holo-accent)" />

            <polyline className="opt-trend" points="21,36 31,30 41,24" fill="none" stroke="var(--holo-accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

            <circle className="opt-marker m1" cx="31" cy="30" r="1.7" fill="var(--holo-accent)" />
            <circle className="opt-marker m2" cx="41" cy="24" r="1.7" fill="var(--holo-accent)" />
          </g>
        );

      /* POLISH */
      case 'polish':
        return (
          <g className="icon-polish">
            <polygon className="diamond" points="32,20 42,32 32,44 22,32" fill="none" stroke="var(--holo-accent)" strokeWidth="1.2" strokeLinejoin="round" />
            <g className="polish-rays" transform="translate(32 32)">
              <line x1="0" y1="-14" x2="0" y2="-9" stroke="var(--holo-accent)" strokeWidth="0.95" strokeLinecap="round" />
              <line x1="12" y1="-8" x2="8" y2="-4" stroke="var(--holo-accent)" strokeWidth="0.9" strokeLinecap="round" transform="rotate(36)" />
              <line x1="-12" y1="-8" x2="-8" y2="-4" stroke="var(--holo-accent)" strokeWidth="0.9" strokeLinecap="round" transform="rotate(-36)" />
            </g>

            <circle className="polish-dot" cx="36" cy="28" r="1.7" fill="var(--holo-accent)" />
            <circle className="polish-dot" cx="28" cy="36" r="1.2" fill="var(--holo-accent)" opacity="0.95" />
            <rect className="sheen" x="-40" y="0" width="120" height="64" fill="#ffffff" opacity="0.04" />
          </g>
        );

      /* QUICK (Q) — a bit more "ball/gear" motion, fast streaks inside the box */
      case 'quick':
        return (
          <g className="icon-quick">
            <path className="quick-bolt" d="M36 18 L28 36 L34 36 L30 50 L42 32 L36 32 Z" fill="none" stroke="var(--holo-accent)" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />

            <g className="quick-streaks">
              <rect className="streak s1" x="18" y="24" width="14" height="1.8" rx="0.9" fill="var(--holo-accent)" />
              <rect className="streak s2" x="18" y="30" width="12" height="1.8" rx="0.9" fill="var(--holo-accent)" />
              <rect className="streak s3" x="18" y="36" width="10" height="1.8" rx="0.9" fill="var(--holo-accent)" />
            </g>

            <g className="quick-gear" transform={`translate(${gearX} ${gearY})`}>
              {Array.from({ length: 6 }).map((_, i) => (
                <rect key={i} x={-0.7} y={-3.6} width={1.4} height={2.8} rx={0.22} transform={`rotate(${i * 60} 0 0)`} fill="var(--holo-accent)" opacity={0.95} />
              ))}
              <circle r={2.2} fill="var(--holo-accent)" />
            </g>
          </g>
        );

      /* RESEARCH (R) — magnifier + scanning ring + insight pulse */
      case 'research':
        return (
          <g className="icon-research">
            <g transform="translate(24 28)">
              <circle className="magnify" cx="0" cy="0" r="10" fill="none" stroke="var(--holo-accent)" strokeWidth="1.2" />
              <rect x="9" y="9" width="9.2" height="1.6" transform="rotate(45)" fill="var(--holo-accent)" opacity="0.95" />
            </g>

            <circle className="research-pulse" cx="32" cy="28" r="1.8" fill="var(--holo-accent)" />
            <circle className="research-ring" cx="32" cy="28" r="14" fill="none" stroke="var(--holo-accent)" strokeWidth="0.9" strokeDasharray="40 80" opacity="0.65" />
          </g>
        );

      /* SCROLL (S) — document/scroll with subtle vertical motion in the lines */
      case 'scroll':
        return (
          <g className="icon-scroll">
            <rect x="18" y="16" width="28" height="32" rx="2" fill="none" stroke="var(--holo-accent)" strokeWidth="1.1" />
            <path className="scroll-roll" d="M18 18 q8 -4 28 0" fill="none" stroke="var(--holo-accent)" strokeWidth="0.9" />

            <g className="scroll-lines">
              <path d="M22 26 h20" stroke="var(--holo-accent)" strokeWidth="0.9" strokeLinecap="round" />
              <path d="M22 30 h16" stroke="var(--holo-accent)" strokeWidth="0.9" />
              <path d="M22 34 h18" stroke="var(--holo-accent)" strokeWidth="0.9" />
            </g>

            <circle className="scroll-dot" cx="48" cy="22" r="1.6" fill="var(--holo-accent)" />
          </g>
        );

      /* TIMELINE (T) — timeline spine + sliding pulse along the spine */
      case 'timeline':
        return (
          <g className="icon-timeline">
            <line x1="20" y1="12" x2="20" y2="52" stroke="var(--holo-accent)" strokeWidth="1.4" strokeLinecap="round" />
            <g className="timeline-ticks">
              <circle cx="20" cy="18" r="1.6" fill="var(--holo-accent)" />
              <circle cx="20" cy="28" r="1.6" fill="var(--holo-accent)" />
              <circle cx="20" cy="38" r="1.6" fill="var(--holo-accent)" />
              <circle cx="20" cy="48" r="1.6" fill="var(--holo-accent)" />
            </g>

            <circle className="timeline-pulse" cx="20" cy="12" r="2.1" fill="#fff" stroke="var(--holo-accent)" strokeWidth="0.8" />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`holo-medium ${className}`} style={wrapperStyle}>
      <div className="svg-wrap" style={svgWrapStyle}>
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          role="img"
          aria-labelledby={`${uid}-title ${uid}-desc`}
          style={{ overflow: 'visible' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id={`${uid}-title`}>{displayTitle}</title>
          <desc id={`${uid}-desc`}>{displaySubtitle}</desc>

          <circle cx="32" cy="32" r="26" fill="none" stroke="var(--holo-muted)" strokeWidth="1" opacity="0.06" />

          {renderVariant()}
        </svg>
      </div>

      <div className="holo-label" aria-hidden>
        <div className="holo-emoji">{info.emoji}</div>
        <div className="holo-text">
          <div className="holo-title">{displayTitle}</div>
          <div className="holo-sub">{displaySubtitle}</div>
        </div>
      </div>
    </div>
  );
};

export default HoloMediumIcon;
