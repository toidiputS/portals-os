import React from 'react';
import './holographic-icons.css';

interface PIconProps {
  className?: string;
  size?: number;
}

export const PIcon: React.FC<PIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon polish-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientPolish" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.4" />
        </linearGradient>

        {/* Diamond/Sparkle gradient for polish effect */}
        <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="50%" stopColor="#00f3ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
        </linearGradient>

        {/* Gold gradient for premium/conversion */}
        <linearGradient id="conversionGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ff9500" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffd700" stopOpacity="1" />
        </linearGradient>

        {/* Purple gradient for creativity/variants */}
        <linearGradient id="variantGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bf00ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#8000ff" stopOpacity="0.7" />
        </linearGradient>

        <filter id="glowPolish">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowWhite">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
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

        {/* Clip for magnifying glass lens */}
        <clipPath id="lensClip">
          <circle cx="26" cy="26" r="14" />
        </clipPath>
      </defs>

      {/* --- BACKGROUND: FINE GRID (Precision) --- */}
      <g className="polish-grid" opacity="0.1">
        {/* Fine measurement grid */}
        <line x1="0" y1="8" x2="64" y2="8" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="0" y1="16" x2="64" y2="16" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="0" y1="24" x2="64" y2="24" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="0" y1="32" x2="64" y2="32" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="0" y1="40" x2="64" y2="40" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="0" y1="48" x2="64" y2="48" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="0" y1="56" x2="64" y2="56" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="8" y1="0" x2="8" y2="64" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="16" y1="0" x2="16" y2="64" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="24" y1="0" x2="24" y2="64" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="32" y1="0" x2="32" y2="64" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="40" y1="0" x2="40" y2="64" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="48" y1="0" x2="48" y2="64" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="56" y1="0" x2="56" y2="64" stroke="#00f3ff" strokeWidth="0.3" />
      </g>

      {/* --- MAGNIFYING GLASS (Central Element) --- */}
      <g className="polish-magnifier">
        {/* Glass Handle */}
        <path
          className="polish-handle"
          d="M 36 36 L 48 48 L 52 44 L 40 32"
          fill="#001a1a"
          stroke="url(#holoGradientPolish)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Handle Grip Detail */}
        <line x1="42" y1="42" x2="48" y2="48" stroke="#00f3ff" strokeWidth="1" opacity="0.5" />
        <line x1="44" y1="40" x2="50" y2="46" stroke="#00f3ff" strokeWidth="1" opacity="0.3" />

        {/* Glass Lens Outer Ring */}
        <circle
          className="polish-lens-outer"
          cx="26" cy="26" r="16"
          fill="none"
          stroke="url(#holoGradientPolish)"
          strokeWidth="3"
          filter="url(#glowPolish)"
        />

        {/* Glass Lens Inner */}
        <circle
          className="polish-lens-inner"
          cx="26" cy="26" r="14"
          fill="#000d0d"
          stroke="#00f3ff"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* Lens Content (What's being polished) */}
        <g clipPath="url(#lensClip)">
          {/* Magnified CTA Button */}
          <rect
            className="polish-cta-btn"
            x="16" y="22" width="20" height="8" rx="2"
            fill="url(#conversionGradient)"
            stroke="#ffd700"
            strokeWidth="1"
          />
          <text x="26" y="28" textAnchor="middle" fontSize="4" fill="#001a1a" fontWeight="bold">CLICK</text>

          {/* Scanning highlight */}
          <rect
            className="polish-lens-scan"
            x="12" y="18" width="28" height="2"
            fill="#fff"
            opacity="0.3"
          />
        </g>

        {/* Lens Shine */}
        <ellipse
          className="polish-lens-shine"
          cx="20" cy="20" rx="4" ry="2"
          fill="#fff"
          opacity="0.3"
          transform="rotate(-30 20 20)"
        />
      </g>

      {/* --- SPARKLE/POLISH PARTICLES --- */}
      <g className="polish-sparkles">
        {/* Sparkle 1 - Diamond shape */}
        <g className="polish-sparkle sparkle-1" transform="translate(8, 12)">
          <path d="M 0 -3 L 2 0 L 0 3 L -2 0 Z" fill="#fff" filter="url(#glowWhite)" />
        </g>

        {/* Sparkle 2 */}
        <g className="polish-sparkle sparkle-2" transform="translate(42, 8)">
          <path d="M 0 -2 L 1.5 0 L 0 2 L -1.5 0 Z" fill="#fff" filter="url(#glowWhite)" />
        </g>

        {/* Sparkle 3 */}
        <g className="polish-sparkle sparkle-3" transform="translate(14, 42)">
          <path d="M 0 -2.5 L 1.5 0 L 0 2.5 L -1.5 0 Z" fill="#00f3ff" filter="url(#glowPolish)" />
        </g>

        {/* Sparkle 4 - Star burst */}
        <g className="polish-sparkle sparkle-4" transform="translate(38, 18)">
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#fff" strokeWidth="1" />
          <line x1="-3" y1="0" x2="3" y2="0" stroke="#fff" strokeWidth="1" />
          <line x1="-2" y1="-2" x2="2" y2="2" stroke="#fff" strokeWidth="0.5" />
          <line x1="-2" y1="2" x2="2" y2="-2" stroke="#fff" strokeWidth="0.5" />
        </g>
      </g>

      {/* --- A/B VARIANT CARDS --- */}
      <g className="polish-variants">
        {/* Variant A */}
        <g className="polish-variant variant-a" transform="translate(46, 4)">
          <rect x="0" y="0" width="14" height="18" rx="1" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" />
          <text x="7" y="6" textAnchor="middle" fontSize="4" fill="#00f3ff" fontWeight="bold">A</text>
          {/* Mini headline */}
          <rect x="2" y="8" width="10" height="2" rx="0.5" fill="#00f3ff" opacity="0.5" />
          <rect x="2" y="11" width="8" height="1.5" rx="0.5" fill="#00f3ff" opacity="0.3" />
          {/* Mini CTA */}
          <rect x="3" y="14" width="8" height="3" rx="0.5" fill="url(#conversionGradient)" opacity="0.7" />
        </g>

        {/* Variant B (Optimized - Highlighted) */}
        <g className="polish-variant variant-b" transform="translate(46, 24)">
          <rect x="0" y="0" width="14" height="18" rx="1" fill="#001a1a" stroke="url(#variantGradient)" strokeWidth="1.5" />
          <text x="7" y="6" textAnchor="middle" fontSize="4" fill="#bf00ff" fontWeight="bold">B</text>
          {/* Mini headline */}
          <rect x="2" y="8" width="10" height="2" rx="0.5" fill="#bf00ff" opacity="0.6" />
          <rect x="2" y="11" width="8" height="1.5" rx="0.5" fill="#bf00ff" opacity="0.4" />
          {/* Mini CTA */}
          <rect x="3" y="14" width="8" height="3" rx="0.5" fill="url(#conversionGradient)" />
          {/* Winner indicator */}
          <circle cx="14" cy="0" r="3" fill="#00ff88" className="polish-winner-badge" />
          <path d="M 12.5 0 L 13.5 1 L 15.5 -1" stroke="#001a1a" strokeWidth="1" fill="none" />
        </g>
      </g>

      {/* --- CONVERSION METER --- */}
      <g className="polish-meter" transform="translate(4, 50)">
        {/* Meter Background */}
        <rect x="0" y="0" width="36" height="6" rx="2" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.5" />

        {/* Meter Fill (95% - the last 5%!) */}
        <rect x="1" y="1" width="32" height="4" rx="1" fill="url(#conversionGradient)" className="polish-meter-fill" />

        {/* The Last 5% indicator */}
        <rect x="33" y="1" width="2" height="4" rx="0.5" fill="#ff3366" className="polish-last-5" />

        {/* Labels */}
        <text x="18" y="12" textAnchor="middle" fontSize="3" fill="#00f3ff" opacity="0.8">CONVERSION</text>
        <text x="34" y="12" textAnchor="middle" fontSize="3" fill="#ff3366" fontWeight="bold">5%</text>
      </g>

      {/* --- HEADLINE TEXT BEING REFINED --- */}
      <g className="polish-headline" transform="translate(4, 4)">
        <rect x="0" y="0" width="28" height="4" rx="0.5" fill="#00f3ff" opacity="0.2" />
        {/* Text cursor */}
        <line className="polish-cursor" x1="26" y1="0.5" x2="26" y2="3.5" stroke="#fff" strokeWidth="1" />
      </g>

      {/* --- POLISH BRUSH STROKES --- */}
      <g className="polish-strokes" opacity="0.3">
        <path
          className="polish-stroke stroke-1"
          d="M 6 32 Q 10 30, 14 32"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          className="polish-stroke stroke-2"
          d="M 8 36 Q 12 34, 16 36"
          fill="none"
          stroke="#00f3ff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      {/* --- PERCENTAGE INDICATORS --- */}
      <g className="polish-percentages">
        <text className="polish-pct pct-before" x="48" y="48" fontSize="4" fill="#ff6b6b" opacity="0.7">2.1%</text>
        <path d="M 52 50 L 54 52" stroke="#00f3ff" strokeWidth="0.5" />
        <text className="polish-pct pct-after" x="54" y="56" fontSize="5" fill="#00ff88" fontWeight="bold">4.8%</text>
      </g>

      {/* --- DETAIL INDICATORS (Showing refinement points) --- */}
      <g className="polish-details">
        <circle className="polish-detail detail-1" cx="18" cy="24" r="1.5" fill="none" stroke="#ffd700" strokeWidth="1" strokeDasharray="2 1" />
        <circle className="polish-detail detail-2" cx="34" cy="28" r="1.5" fill="none" stroke="#ffd700" strokeWidth="1" strokeDasharray="2 1" />
        <circle className="polish-detail detail-3" cx="26" cy="32" r="1.5" fill="none" stroke="#ffd700" strokeWidth="1" strokeDasharray="2 1" />
      </g>

      {/* --- GLITCH LAYER --- */}
      <g className="polish-glitch">
        <circle cx="26" cy="26" r="16" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
      </g>

    </svg>
  );
};
