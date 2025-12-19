import React from 'react';
import './holographic-icons.css';

interface FileManagerIconProps {
  className?: string;
  size?: number;
}

export const FileManagerIcon: React.FC<FileManagerIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon file-manager-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientFM" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.4" />
        </linearGradient>

        {/* Folder gradient (Yellow/Gold) */}
        <linearGradient id="folderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="1" />
          <stop offset="100%" stopColor="#cc9900" stopOpacity="0.9" />
        </linearGradient>

        {/* File gradient (White/Cyan) */}
        <linearGradient id="fileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.6" />
        </linearGradient>

        {/* Success gradient (Green) */}
        <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="1" />
          <stop offset="100%" stopColor="#00cc66" stopOpacity="0.8" />
        </linearGradient>

        {/* Active/Selected gradient (Purple) */}
        <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bf00ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#8000ff" stopOpacity="0.7" />
        </linearGradient>

        <filter id="glowFM">
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

        <filter id="glowGreen">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* --- BACKGROUND: FILE GRID --- */}
      <g className="fm-grid" opacity="0.1">
        <line x1="0" y1="12" x2="64" y2="12" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="0" y1="24" x2="64" y2="24" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="0" y1="36" x2="64" y2="36" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="0" y1="48" x2="64" y2="48" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="16" y1="0" x2="16" y2="64" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="32" y1="0" x2="32" y2="64" stroke="#00f3ff" strokeWidth="0.3" />
        <line x1="48" y1="0" x2="48" y2="64" stroke="#00f3ff" strokeWidth="0.3" />
      </g>

      {/* --- MAIN FOLDER (Central/Root) --- */}
      <g className="fm-main-folder">
        {/* Folder Back */}
        <path
          className="fm-folder-back"
          d="M 18 18 L 18 44 L 46 44 L 46 22 L 38 22 L 36 18 Z"
          fill="#001a1a"
          stroke="url(#folderGradient)"
          strokeWidth="2"
          filter="url(#glowGold)"
        />

        {/* Folder Tab */}
        <path
          className="fm-folder-tab"
          d="M 18 18 L 36 18 L 38 22 L 18 22 Z"
          fill="url(#folderGradient)"
          opacity="0.8"
        />

        {/* Folder Front (Slightly open) */}
        <path
          className="fm-folder-front"
          d="M 18 24 L 16 44 L 48 44 L 46 24 Z"
          fill="#001a1a"
          stroke="url(#folderGradient)"
          strokeWidth="1.5"
          opacity="0.9"
        />

        {/* Folder Label */}
        <rect x="22" y="34" width="20" height="6" rx="1" fill="#ffd700" opacity="0.3" />
        <text x="32" y="39" textAnchor="middle" fontSize="4" fill="#ffd700" fontWeight="bold">ROOT</text>
      </g>

      {/* --- SUB FOLDERS (Hierarchical) --- */}
      <g className="fm-sub-folders">
        {/* Sub Folder 1 (Top Left) */}
        <g className="fm-sub-folder folder-1" transform="translate(2, 4)">
          <path
            d="M 0 4 L 0 14 L 12 14 L 12 6 L 8 6 L 7 4 Z"
            fill="#001a1a"
            stroke="url(#holoGradientFM)"
            strokeWidth="1"
          />
          <path d="M 0 4 L 7 4 L 8 6 L 0 6 Z" fill="#00f3ff" opacity="0.4" />
          {/* File count badge */}
          <circle cx="11" cy="5" r="2.5" fill="#00ff88" className="fm-badge" />
          <text x="11" y="6.5" textAnchor="middle" fontSize="3" fill="#001a1a" fontWeight="bold">3</text>
        </g>

        {/* Sub Folder 2 (Top Right) */}
        <g className="fm-sub-folder folder-2" transform="translate(50, 4)">
          <path
            d="M 0 4 L 0 14 L 12 14 L 12 6 L 8 6 L 7 4 Z"
            fill="#001a1a"
            stroke="url(#holoGradientFM)"
            strokeWidth="1"
          />
          <path d="M 0 4 L 7 4 L 8 6 L 0 6 Z" fill="#00f3ff" opacity="0.4" />
          {/* File count badge */}
          <circle cx="11" cy="5" r="2.5" fill="#00ff88" className="fm-badge" />
          <text x="11" y="6.5" textAnchor="middle" fontSize="3" fill="#001a1a" fontWeight="bold">7</text>
        </g>

        {/* Sub Folder 3 (Bottom Left - Active/Selected) */}
        <g className="fm-sub-folder folder-3 active" transform="translate(2, 46)">
          <path
            d="M 0 4 L 0 14 L 12 14 L 12 6 L 8 6 L 7 4 Z"
            fill="#001a1a"
            stroke="url(#activeGradient)"
            strokeWidth="1.5"
          />
          <path d="M 0 4 L 7 4 L 8 6 L 0 6 Z" fill="#bf00ff" opacity="0.5" />
          {/* Selection indicator */}
          <rect x="-2" y="3" width="2" height="12" fill="#bf00ff" className="fm-select-bar" />
        </g>

        {/* Sub Folder 4 (Bottom Right) */}
        <g className="fm-sub-folder folder-4" transform="translate(50, 46)">
          <path
            d="M 0 4 L 0 14 L 12 14 L 12 6 L 8 6 L 7 4 Z"
            fill="#001a1a"
            stroke="url(#holoGradientFM)"
            strokeWidth="1"
          />
          <path d="M 0 4 L 7 4 L 8 6 L 0 6 Z" fill="#00f3ff" opacity="0.4" />
          {/* New folder indicator */}
          <text x="6" y="11" textAnchor="middle" fontSize="6" fill="#00f3ff" opacity="0.6">+</text>
        </g>
      </g>

      {/* --- FILES (Inside/Around Main Folder) --- */}
      <g className="fm-files">
        {/* File 1 - Document */}
        <g className="fm-file file-1">
          <rect x="22" y="26" width="6" height="8" rx="0.5" fill="#001a1a" stroke="url(#fileGradient)" strokeWidth="0.8" />
          <path d="M 26 26 L 28 26 L 28 28 L 26 28" fill="none" stroke="#00f3ff" strokeWidth="0.5" />
          <line x1="23" y1="29" x2="27" y2="29" stroke="#00f3ff" strokeWidth="0.3" opacity="0.6" />
          <line x1="23" y1="30.5" x2="27" y2="30.5" stroke="#00f3ff" strokeWidth="0.3" opacity="0.6" />
          <line x1="23" y1="32" x2="26" y2="32" stroke="#00f3ff" strokeWidth="0.3" opacity="0.6" />
        </g>

        {/* File 2 - Image */}
        <g className="fm-file file-2">
          <rect x="30" y="26" width="6" height="8" rx="0.5" fill="#001a1a" stroke="url(#fileGradient)" strokeWidth="0.8" />
          <rect x="31" y="28" width="4" height="3" fill="#00f3ff" opacity="0.3" />
          <circle cx="32" cy="29" r="0.8" fill="#ffd700" />
          <path d="M 31 31 L 33 29.5 L 35 31" fill="none" stroke="#00ff88" strokeWidth="0.5" />
        </g>

        {/* File 3 - Code/Data */}
        <g className="fm-file file-3">
          <rect x="38" y="26" width="6" height="8" rx="0.5" fill="#001a1a" stroke="url(#fileGradient)" strokeWidth="0.8" />
          <text x="41" y="31" textAnchor="middle" fontSize="4" fill="#00f3ff" opacity="0.8">{`</>`}</text>
        </g>
      </g>

      {/* --- CONNECTION LINES (Hierarchy) --- */}
      <g className="fm-connections" opacity="0.4">
        {/* Lines from main folder to sub folders */}
        <path className="fm-connection conn-1" d="M 18 20 Q 10 20, 10 14" fill="none" stroke="#00f3ff" strokeWidth="0.8" strokeDasharray="2 2" />
        <path className="fm-connection conn-2" d="M 46 20 Q 54 20, 54 14" fill="none" stroke="#00f3ff" strokeWidth="0.8" strokeDasharray="2 2" />
        <path className="fm-connection conn-3" d="M 18 44 Q 10 44, 10 50" fill="none" stroke="#bf00ff" strokeWidth="0.8" strokeDasharray="2 2" />
        <path className="fm-connection conn-4" d="M 46 44 Q 54 44, 54 50" fill="none" stroke="#00f3ff" strokeWidth="0.8" strokeDasharray="2 2" />
      </g>

      {/* --- FILE TRANSFER ANIMATION --- */}
      <g className="fm-transfer">
        {/* File being transferred */}
        <g className="fm-transfer-file">
          <rect x="0" y="0" width="4" height="5" rx="0.5" fill="#00f3ff" opacity="0.8" />
        </g>
      </g>

      {/* --- SEARCH BAR --- */}
      <g className="fm-search" transform="translate(18, 2)">
        <rect x="0" y="0" width="28" height="6" rx="3" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.8" />
        {/* Magnifying glass icon */}
        <circle cx="5" cy="3" r="1.5" fill="none" stroke="#00f3ff" strokeWidth="0.5" />
        <line x1="6" y1="4" x2="7.5" y2="5.5" stroke="#00f3ff" strokeWidth="0.5" />
        {/* Search text */}
        <text x="10" y="4.5" fontSize="3" fill="#00f3ff" opacity="0.6">Search files...</text>
        {/* Cursor */}
        <line className="fm-search-cursor" x1="24" y1="1.5" x2="24" y2="4.5" stroke="#00f3ff" strokeWidth="0.5" />
      </g>

      {/* --- SORTING INDICATORS --- */}
      <g className="fm-sort" transform="translate(48, 2)">
        <rect x="0" y="0" width="6" height="6" rx="1" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.5" />
        {/* Sort arrows */}
        <path d="M 2 2 L 3 1 L 4 2" fill="none" stroke="#00f3ff" strokeWidth="0.5" />
        <path d="M 2 4 L 3 5 L 4 4" fill="none" stroke="#00f3ff" strokeWidth="0.5" />
      </g>

      {/* --- STORAGE INDICATOR --- */}
      <g className="fm-storage" transform="translate(18, 56)">
        <rect x="0" y="0" width="28" height="4" rx="1" fill="#001a1a" stroke="#00f3ff" strokeWidth="0.5" />
        {/* Storage fill */}
        <rect x="0.5" y="0.5" width="18" height="3" rx="0.5" fill="url(#successGradient)" className="fm-storage-fill" />
        {/* Storage sections */}
        <line x1="8" y1="0.5" x2="8" y2="3.5" stroke="#001a1a" strokeWidth="0.3" />
        <line x1="14" y1="0.5" x2="14" y2="3.5" stroke="#001a1a" strokeWidth="0.3" />
        {/* Label */}
        <text x="30" y="3.5" fontSize="3" fill="#00f3ff">64%</text>
      </g>

      {/* --- ACTION BUTTONS --- */}
      <g className="fm-actions">
        {/* Upload button */}
        <g className="fm-action action-upload" transform="translate(4, 22)">
          <circle r="4" fill="#001a1a" stroke="#00ff88" strokeWidth="1" />
          <path d="M 0 2 L 0 -1 M -2 0 L 0 -2 L 2 0" fill="none" stroke="#00ff88" strokeWidth="1" />
        </g>

        {/* Download button */}
        <g className="fm-action action-download" transform="translate(4, 34)">
          <circle r="4" fill="#001a1a" stroke="#00f3ff" strokeWidth="1" />
          <path d="M 0 -2 L 0 1 M -2 0 L 0 2 L 2 0" fill="none" stroke="#00f3ff" strokeWidth="1" />
        </g>

        {/* Delete button */}
        <g className="fm-action action-delete" transform="translate(60, 28)">
          <circle r="4" fill="#001a1a" stroke="#ff4444" strokeWidth="1" />
          <path d="M -1.5 -1.5 L 1.5 1.5 M 1.5 -1.5 L -1.5 1.5" fill="none" stroke="#ff4444" strokeWidth="1" />
        </g>
      </g>

      {/* --- DATA PARTICLES --- */}
      <g className="fm-particles">
        <circle className="fm-particle p-1" cx="16" cy="32" r="1" fill="#00f3ff" />
        <circle className="fm-particle p-2" cx="48" cy="30" r="0.8" fill="#ffd700" />
        <circle className="fm-particle p-3" cx="32" cy="46" r="0.8" fill="#00ff88" />
        <circle className="fm-particle p-4" cx="12" cy="38" r="0.6" fill="#00f3ff" />
        <circle className="fm-particle p-5" cx="52" cy="40" r="0.6" fill="#00f3ff" />
      </g>

      {/* --- SYNC INDICATOR --- */}
      <g className="fm-sync" transform="translate(56, 4)">
        <circle cx="4" cy="4" r="3" fill="none" stroke="#00ff88" strokeWidth="0.8" strokeDasharray="4 2" className="fm-sync-ring" />
        <circle cx="4" cy="4" r="1" fill="#00ff88" />
      </g>

      {/* --- GLITCH LAYER --- */}
      <g className="fm-glitch">
        <path
          d="M 18 18 L 18 44 L 46 44 L 46 22 L 38 22 L 36 18 Z"
          stroke="#fff"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
      </g>

    </svg>
  );
};
