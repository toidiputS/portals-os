import React from 'react';
import './holographic-icons.css';

interface DraftIconProps {
  className?: string;
  size?: number;
}

export const DraftIcon: React.FC<DraftIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon draft-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientDraft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.4" />
        </linearGradient>

        {/* Ink/Text gradient (Deep blue) */}
        <linearGradient id="inkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.8" />
        </linearGradient>

        {/* CTA gradient (Orange/Coral) */}
        <linearGradient id="ctaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b35" stopOpacity="1" />
          <stop offset="100%" stopColor="#f7931e" stopOpacity="0.9" />
        </linearGradient>

        {/* Headline gradient (Gold) */}
        <linearGradient id="headlineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffaa00" stopOpacity="0.9" />
        </linearGradient>

        {/* Success/Conversion gradient (Green) */}
        <linearGradient id="conversionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="1" />
          <stop offset="100%" stopColor="#00cc66" stopOpacity="0.8" />
        </linearGradient>

        <filter id="glowDraft">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowOrange">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip for page content */}
        <clipPath id="pageClip">
          <rect x="10" y="6" width="44" height="52" rx="2" />
        </clipPath>
      </defs>

      {/* --- BACKGROUND: DOT MATRIX --- */}
      <g className="draft-grid" opacity="0.1">
        <pattern id="draftPattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.5" fill="#00f3ff" />
        </pattern>
        <rect x="0" y="0" width="64" height="64" fill="url(#draftPattern)" />
      </g>

      {/* --- PAGE/DOCUMENT FRAME --- */}
      <g className="draft-page">
        {/* Page shadow */}
        <rect x="12" y="8" width="44" height="52" rx="2" fill="#000d0d" opacity="0.5" />

        {/* Main page */}
        <rect
          className="draft-page-bg"
          x="10" y="6" width="44" height="52" rx="2"
          fill="#001a1a"
          stroke="url(#holoGradientDraft)"
          strokeWidth="1.5"
          filter="url(#glowDraft)"
        />

        {/* Page fold corner */}
        <path d="M 46 6 L 54 6 L 54 14 L 46 14 Z" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.5" />
        <path d="M 46 6 L 46 14 L 54 14" fill="none" stroke="#00f3ff" strokeWidth="1" />
      </g>

      {/* --- WIREFRAME SKELETON --- */}
      <g className="draft-wireframe" clipPath="url(#pageClip)">

        {/* === HEADER/HERO SECTION === */}
        <g className="draft-hero">
          {/* Hero image placeholder */}
          <rect x="14" y="10" width="36" height="12" rx="1" fill="#00f3ff" opacity="0.1" stroke="#00f3ff" strokeWidth="0.5" strokeDasharray="2 2" />
          <text x="32" y="17" textAnchor="middle" fontSize="3" fill="#00f3ff" opacity="0.5">[HERO IMAGE]</text>
        </g>

        {/* === HEADLINE === */}
        <g className="draft-headline">
          {/* Main headline bar */}
          <rect
            className="draft-headline-bar"
            x="14" y="24" width="32" height="4" rx="1"
            fill="url(#headlineGradient)"
            opacity="0.9"
          />

          {/* Subheadline */}
          <rect x="14" y="30" width="24" height="2" rx="0.5" fill="#00f3ff" opacity="0.5" />

          {/* Typing cursor */}
          <line className="draft-cursor" x1="39" y1="30" x2="39" y2="32" stroke="#fff" strokeWidth="1" />
        </g>

        {/* === BODY COPY BLOCKS === */}
        <g className="draft-body-copy">
          {/* Pain point block */}
          <g className="draft-block block-1" transform="translate(14, 34)">
            <rect x="0" y="0" width="32" height="8" rx="1" fill="#00f3ff" opacity="0.1" stroke="#00f3ff" strokeWidth="0.3" />
            <line x1="2" y1="2" x2="28" y2="2" stroke="#00f3ff" strokeWidth="0.5" opacity="0.7" />
            <line x1="2" y1="4" x2="26" y2="4" stroke="#00f3ff" strokeWidth="0.5" opacity="0.6" />
            <line x1="2" y1="6" x2="20" y2="6" stroke="#00f3ff" strokeWidth="0.5" opacity="0.5" />
            {/* Bullet point */}
            <circle cx="-2" cy="3" r="1" fill="#00f3ff" opacity="0.7" />
          </g>

          {/* Benefits block */}
          <g className="draft-block block-2" transform="translate(14, 44)">
            <rect x="0" y="0" width="32" height="6" rx="1" fill="#00ff88" opacity="0.1" stroke="#00ff88" strokeWidth="0.3" />
            <line x1="2" y1="2" x2="28" y2="2" stroke="#00ff88" strokeWidth="0.5" opacity="0.7" />
            <line x1="2" y1="4" x2="22" y2="4" stroke="#00ff88" strokeWidth="0.5" opacity="0.6" />
            {/* Checkmark */}
            <path d="M -3 2 L -2 3 L 0 1" stroke="#00ff88" strokeWidth="0.8" fill="none" />
          </g>
        </g>

        {/* === CTA BUTTON === */}
        <g className="draft-cta" transform="translate(18, 52)">
          <rect
            className="draft-cta-btn"
            x="0" y="0" width="24" height="6" rx="3"
            fill="url(#ctaGradient)"
            filter="url(#glowOrange)"
          />
          <text x="12" y="4.5" textAnchor="middle" fontSize="3" fill="#fff" fontWeight="bold">GET STARTED</text>

          {/* Click indicator */}
          <circle className="draft-click-ripple" cx="12" cy="3" r="2" fill="none" stroke="#fff" strokeWidth="0.5" />
        </g>
      </g>

      {/* --- PENCIL/PEN TOOL --- */}
      <g className="draft-pencil" transform="translate(50, 20)">
        {/* Pencil body */}
        <rect x="0" y="0" width="4" height="20" rx="0.5" fill="#001a1a" stroke="url(#inkGradient)" strokeWidth="1" transform="rotate(25 2 10)" />

        {/* Pencil tip */}
        <path d="M 6 22 L 8 26 L 4 24 Z" fill="url(#inkGradient)" transform="rotate(25 2 10)" />

        {/* Eraser */}
        <rect x="0" y="-2" width="4" height="3" rx="0.5" fill="#ff6b9d" transform="rotate(25 2 10)" />

        {/* Writing trail */}
        <path className="draft-writing-trail" d="M 2 28 Q 0 30, 2 32 Q 4 34, 2 36" fill="none" stroke="url(#inkGradient)" strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* --- TEXT ASSEMBLY PARTICLES --- */}
      <g className="draft-text-particles">
        {/* Floating letters/characters */}
        <text className="draft-char char-1" x="4" y="16" fontSize="4" fill="#00f3ff" opacity="0.6">A</text>
        <text className="draft-char char-2" x="6" y="28" fontSize="3" fill="#ffd700" opacity="0.5">$</text>
        <text className="draft-char char-3" x="2" y="40" fontSize="4" fill="#00ff88" opacity="0.6">✓</text>
        <text className="draft-char char-4" x="58" y="44" fontSize="3" fill="#ff6b35" opacity="0.5">!</text>
        <text className="draft-char char-5" x="56" y="56" fontSize="4" fill="#00f3ff" opacity="0.6">→</text>
      </g>

      {/* --- SECTION MARKERS --- */}
      <g className="draft-markers">
        {/* Hero marker */}
        <g transform="translate(4, 14)">
          <rect x="0" y="0" width="6" height="3" rx="0.5" fill="#00f3ff" opacity="0.3" />
          <text x="3" y="2.2" textAnchor="middle" fontSize="2" fill="#00f3ff">H1</text>
        </g>

        {/* Body marker */}
        <g transform="translate(4, 38)">
          <rect x="0" y="0" width="6" height="3" rx="0.5" fill="#00ff88" opacity="0.3" />
          <text x="3" y="2.2" textAnchor="middle" fontSize="2" fill="#00ff88">P</text>
        </g>

        {/* CTA marker */}
        <g transform="translate(4, 54)">
          <rect x="0" y="0" width="6" height="3" rx="0.5" fill="#ff6b35" opacity="0.3" />
          <text x="3" y="2.2" textAnchor="middle" fontSize="2" fill="#ff6b35">CTA</text>
        </g>
      </g>

      {/* --- CONVERSION METER --- */}
      <g className="draft-conversion" transform="translate(48, 38)">
        <rect x="0" y="0" width="6" height="18" rx="1" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.5" />

        {/* Meter fill */}
        <rect className="draft-meter-fill" x="1" y="4" width="4" height="13" rx="0.5" fill="url(#conversionGradient)" />

        {/* Percentage */}
        <text x="3" y="-2" textAnchor="middle" fontSize="3" fill="#00ff88" className="draft-percent">87%</text>

        {/* Arrow indicator */}
        <path d="M 7 6 L 9 8 L 7 10" fill="none" stroke="#00ff88" strokeWidth="0.5" />
      </g>

      {/* --- WORD COUNT / STATS --- */}
      <g className="draft-stats" transform="translate(10, 2)">
        <rect x="0" y="0" width="20" height="4" rx="1" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.3" opacity="0.8" />
        <text x="10" y="3" textAnchor="middle" fontSize="2.5" fill="#00f3ff" className="draft-word-count">247 words</text>
      </g>

      {/* --- AI SUGGESTION BUBBLE --- */}
      <g className="draft-ai-suggest" transform="translate(36, 2)">
        <rect x="0" y="0" width="16" height="4" rx="2" fill="#bf00ff" opacity="0.3" stroke="#bf00ff" strokeWidth="0.5" />
        <text x="8" y="3" textAnchor="middle" fontSize="2" fill="#bf00ff">✨ Suggest</text>
      </g>

      {/* --- BUILDING BLOCKS (Assembly Animation) --- */}
      <g className="draft-blocks">
        <rect className="draft-flying-block block-a" x="58" y="12" width="4" height="3" rx="0.5" fill="#00f3ff" opacity="0.6" />
        <rect className="draft-flying-block block-b" x="60" y="24" width="3" height="2" rx="0.3" fill="#ffd700" opacity="0.5" />
        <rect className="draft-flying-block block-c" x="58" y="32" width="4" height="4" rx="0.5" fill="#ff6b35" opacity="0.6" />
      </g>

      {/* --- SCAN LINE --- */}
      <line
        className="draft-scan-line"
        x1="10" y1="10" x2="54" y2="10"
        stroke="#00f3ff"
        strokeWidth="1"
        opacity="0.3"
      />

      {/* --- GLITCH LAYER --- */}
      <g className="draft-glitch">
        <rect x="10" y="6" width="44" height="52" rx="2" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
      </g>

    </svg>
  );
};
