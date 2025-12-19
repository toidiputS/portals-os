import React from 'react';
import './holographic-icons.css';

interface CIconProps {
  className?: string;
  size?: number;
}

export const CIcon: React.FC<CIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon calculator-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientCalc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.4" />
        </linearGradient>

        {/* Green gradient for profit/growth */}
        <linearGradient id="profitGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="1" />
        </linearGradient>

        {/* Gold gradient for currency/value */}
        <linearGradient id="currencyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffaa00" stopOpacity="0.8" />
        </linearGradient>

        <filter id="glowCalc">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="glowGreen">
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

        {/* Clip for calculator screen */}
        <clipPath id="screenClip">
          <rect x="10" y="12" width="28" height="12" rx="1" />
        </clipPath>
      </defs>

      {/* --- BACKGROUND GRID (Financial Graph Paper) --- */}
      <g className="calc-grid" opacity="0.15">
        <line x1="0" y1="16" x2="64" y2="16" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="0" y1="32" x2="64" y2="32" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="0" y1="48" x2="64" y2="48" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="16" y1="0" x2="16" y2="64" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="32" y1="0" x2="32" y2="64" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="48" y1="0" x2="48" y2="64" stroke="#00f3ff" strokeWidth="0.5" />
      </g>

      {/* --- CALCULATOR BODY --- */}
      <g className="calc-body">
        {/* Main Housing */}
        <rect
          className="calc-housing"
          x="6" y="8" width="36" height="48" rx="3"
          fill="#001a1a"
          stroke="url(#holoGradientCalc)"
          strokeWidth="2"
          filter="url(#glowCalc)"
        />

        {/* Display Screen */}
        <rect
          className="calc-screen"
          x="10" y="12" width="28" height="12" rx="1"
          fill="#000d0d"
          stroke="#00f3ff"
          strokeWidth="1"
        />

        {/* Screen Content (Numbers) */}
        <g clipPath="url(#screenClip)">
          <text
            className="calc-display-text"
            x="36" y="21"
            textAnchor="end"
            fontSize="8"
            fill="#00ff88"
            fontFamily="monospace"
            fontWeight="bold"
          >
            $24,750
          </text>

          {/* Scanning Line */}
          <line
            className="calc-scan-line"
            x1="10" y1="12"
            x2="38" y2="12"
            stroke="#00f3ff"
            strokeWidth="1"
            opacity="0.5"
          />
        </g>

        {/* Button Grid */}
        <g className="calc-buttons">
          {/* Row 1 */}
          <rect x="10" y="28" width="6" height="5" rx="0.5" fill="#00f3ff" opacity="0.3" className="calc-btn btn-1" />
          <rect x="18" y="28" width="6" height="5" rx="0.5" fill="#00f3ff" opacity="0.3" className="calc-btn btn-2" />
          <rect x="26" y="28" width="6" height="5" rx="0.5" fill="#00f3ff" opacity="0.3" className="calc-btn btn-3" />

          {/* Row 2 */}
          <rect x="10" y="35" width="6" height="5" rx="0.5" fill="#00f3ff" opacity="0.3" className="calc-btn btn-4" />
          <rect x="18" y="35" width="6" height="5" rx="0.5" fill="#00f3ff" opacity="0.3" className="calc-btn btn-5" />
          <rect x="26" y="35" width="6" height="5" rx="0.5" fill="#00f3ff" opacity="0.3" className="calc-btn btn-6" />

          {/* Row 3 */}
          <rect x="10" y="42" width="6" height="5" rx="0.5" fill="#00f3ff" opacity="0.3" className="calc-btn btn-7" />
          <rect x="18" y="42" width="6" height="5" rx="0.5" fill="#00f3ff" opacity="0.3" className="calc-btn btn-8" />
          <rect x="26" y="42" width="6" height="5" rx="0.5" fill="#00f3ff" opacity="0.3" className="calc-btn btn-9" />

          {/* Row 4 - Equals Button */}
          <rect x="10" y="49" width="14" height="5" rx="0.5" fill="#00ff88" opacity="0.5" className="calc-btn btn-equals" />
          <rect x="26" y="49" width="6" height="5" rx="0.5" fill="#ffd700" opacity="0.5" className="calc-btn btn-dollar" />

          {/* Button Labels */}
          <text x="13" y="32" fontSize="3" fill="#fff" opacity="0.8">7</text>
          <text x="21" y="32" fontSize="3" fill="#fff" opacity="0.8">8</text>
          <text x="29" y="32" fontSize="3" fill="#fff" opacity="0.8">9</text>
          <text x="13" y="39" fontSize="3" fill="#fff" opacity="0.8">4</text>
          <text x="21" y="39" fontSize="3" fill="#fff" opacity="0.8">5</text>
          <text x="29" y="39" fontSize="3" fill="#fff" opacity="0.8">6</text>
          <text x="13" y="46" fontSize="3" fill="#fff" opacity="0.8">1</text>
          <text x="21" y="46" fontSize="3" fill="#fff" opacity="0.8">2</text>
          <text x="29" y="46" fontSize="3" fill="#fff" opacity="0.8">3</text>
          <text x="16" y="53" fontSize="4" fill="#001a1a" fontWeight="bold">=</text>
          <text x="28" y="53" fontSize="4" fill="#001a1a" fontWeight="bold">$</text>
        </g>
      </g>

      {/* --- PROFIT CHART (Right Side) --- */}
      <g className="calc-chart" transform="translate(44, 8)">
        {/* Chart Background */}
        <rect x="0" y="0" width="18" height="32" fill="none" stroke="#00f3ff" strokeWidth="0.5" opacity="0.3" />

        {/* Rising Bars */}
        <rect x="2" y="24" width="3" height="8" fill="url(#profitGradient)" className="calc-bar bar-1" />
        <rect x="7" y="18" width="3" height="14" fill="url(#profitGradient)" className="calc-bar bar-2" />
        <rect x="12" y="10" width="3" height="22" fill="url(#profitGradient)" className="calc-bar bar-3" />

        {/* Growth Arrow */}
        <path
          className="calc-growth-arrow"
          d="M 3 26 L 8 18 L 13 8"
          fill="none"
          stroke="#00ff88"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#glowGreen)"
        />
        <polygon
          className="calc-arrow-head"
          points="13,4 16,8 13,8 10,8"
          fill="#00ff88"
          filter="url(#glowGreen)"
        />

        {/* Percentage Label */}
        <text x="9" y="38" textAnchor="middle" fontSize="4" fill="#00ff88" className="calc-percent">+42%</text>
      </g>

      {/* --- CURRENCY FLOW (Floating Coins) --- */}
      <g className="calc-currency">
        <g className="calc-coin coin-1" transform="translate(48, 44)">
          <circle r="4" fill="#001a1a" stroke="url(#currencyGradient)" strokeWidth="1.5" />
          <text x="0" y="2" textAnchor="middle" fontSize="5" fill="#ffd700" fontWeight="bold">$</text>
        </g>

        <g className="calc-coin coin-2" transform="translate(56, 50)">
          <circle r="3" fill="#001a1a" stroke="url(#currencyGradient)" strokeWidth="1" />
          <text x="0" y="1.5" textAnchor="middle" fontSize="4" fill="#ffd700" fontWeight="bold">$</text>
        </g>

        <g className="calc-coin coin-3" transform="translate(52, 56)">
          <circle r="2.5" fill="#001a1a" stroke="url(#currencyGradient)" strokeWidth="1" />
          <text x="0" y="1" textAnchor="middle" fontSize="3" fill="#ffd700" fontWeight="bold">$</text>
        </g>
      </g>

      {/* --- EQUATION ELEMENTS (Floating Math) --- */}
      <g className="calc-equations" opacity="0.6">
        <text className="calc-eq eq-1" x="46" y="6" fontSize="4" fill="#00f3ff">×</text>
        <text className="calc-eq eq-2" x="54" y="10" fontSize="4" fill="#00f3ff">÷</text>
        <text className="calc-eq eq-3" x="58" y="6" fontSize="4" fill="#00f3ff">%</text>
        <text className="calc-eq eq-4" x="50" y="14" fontSize="3" fill="#00f3ff">π</text>
      </g>

      {/* --- SCALE INDICATOR (Bottom) --- */}
      <g className="calc-scale" transform="translate(6, 58)">
        {/* Scale Bar */}
        <rect x="0" y="0" width="36" height="3" rx="1" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.5" />

        {/* Scale Fill (Profit Level) */}
        <rect x="1" y="0.5" width="28" height="2" rx="0.5" fill="url(#profitGradient)" className="calc-scale-fill" />

        {/* Scale Markers */}
        <line x1="12" y1="-1" x2="12" y2="4" stroke="#00f3ff" strokeWidth="0.5" opacity="0.5" />
        <line x1="24" y1="-1" x2="24" y2="4" stroke="#00f3ff" strokeWidth="0.5" opacity="0.5" />

        {/* Labels */}
        <text x="0" y="8" fontSize="3" fill="#00f3ff" opacity="0.7">COST</text>
        <text x="36" y="8" textAnchor="end" fontSize="3" fill="#00ff88" opacity="0.7">PROFIT</text>
      </g>

      {/* --- DATA FLOW PARTICLES --- */}
      <g className="calc-particles">
        <circle className="calc-particle p-1" cx="42" cy="20" r="1" fill="#00f3ff" />
        <circle className="calc-particle p-2" cx="44" cy="28" r="1" fill="#00ff88" />
        <circle className="calc-particle p-3" cx="46" cy="36" r="1" fill="#ffd700" />
      </g>

      {/* --- OPTIMIZATION INDICATOR --- */}
      <g className="calc-optimize" transform="translate(56, 28)">
        <circle r="5" fill="#001a1a" stroke="#00ff88" strokeWidth="1" />
        <path d="M -2 0 L 0 2 L 3 -2" stroke="#00ff88" strokeWidth="1.5" fill="none" className="calc-checkmark" />
      </g>

      {/* --- GLITCH LAYER --- */}
      <g className="calc-glitch">
        <rect
          x="6" y="8" width="36" height="48" rx="3"
          stroke="#fff"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
      </g>

    </svg>
  );
};
