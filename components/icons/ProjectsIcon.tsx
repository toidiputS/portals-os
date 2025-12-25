import React from 'react';
import './holographic-icons.css';

interface ProjectsIconProps {
  className?: string;
  size?: number;
}

export const ProjectsIcon: React.FC<ProjectsIconProps> = ({
  className = '',
  size = 64
}) => {
  return (
    <svg
      className={`holographic-icon projects-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="holoGradientProjects" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9b59b6" stopOpacity="1" />
          <stop offset="100%" stopColor="#9b59b6" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glowProjects">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Folder Stack */}
      <g className="projects-folders">
        {/* Back folder */}
        <rect
          x="12" y="20" width="40" height="28"
          stroke="url(#holoGradientProjects)"
          strokeWidth="2"
          fill="none"
          filter="url(#glowProjects)"
          className="folder-back"
        />
        
        {/* Back folder tab */}
        <rect
          x="12" y="20" width="12" height="4"
          fill="url(#holoGradientProjects)"
          className="folder-back-tab"
        />
        
        {/* Middle folder */}
        <rect
          x="16" y="24" width="40" height="28"
          stroke="url(#holoGradientProjects)"
          strokeWidth="2"
          fill="none"
          filter="url(#glowProjects)"
          className="folder-middle"
        />
        
        {/* Middle folder tab */}
        <rect
          x="16" y="24" width="12" height="4"
          fill="url(#holoGradientProjects)"
          className="folder-middle-tab"
        />
        
        {/* Front folder */}
        <rect
          x="20" y="28" width="40" height="28"
          stroke="url(#holoGradientProjects)"
          strokeWidth="2"
          fill="none"
          filter="url(#glowProjects)"
          className="folder-front"
        />
        
        {/* Front folder tab */}
        <rect
          x="20" y="28" width="12" height="4"
          fill="url(#holoGradientProjects)"
          className="folder-front-tab"
        />

        {/* Project dots on front folder */}
        <circle cx="28" cy="36" r="1.5" fill="#9b59b6" className="project-dot" />
        <circle cx="34" cy="36" r="1.5" fill="#9b59b6" className="project-dot" />
        <circle cx="40" cy="36" r="1.5" fill="#9b59b6" className="project-dot" />
        
        {/* Project lines on front folder */}
        <rect x="28" y="42" width="24" height="2" fill="#9b59b6" opacity="0.7" className="project-line" />
        <rect x="28" y="46" width="18" height="2" fill="#9b59b6" opacity="0.5" className="project-line" />
        <rect x="28" y="50" width="20" height="2" fill="#9b59b6" opacity="0.3" className="project-line" />
      </g>

    </svg>
  );
};
