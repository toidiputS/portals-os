import React from 'react';
import './holographic-icons.css';

interface VIconProps {
  className?: string;
  size?: number;
}

export const VIcon: React.FC<VIconProps> = ({
  className = '',
  size = 24
}) => {
  return (
    <svg
      className={`holographic-icon velocity-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* V letter structure */}
      <path
        className="velocity-backbone"
        d="M 16 20 L 32 44 L 48 20"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Speed lines */}
      <line className="speed-line line-1" x1="8" y1="16" x2="20" y2="16" strokeWidth="1" />
      <line className="speed-line line-2" x1="8" y1="24" x2="22" y2="24" strokeWidth="1" />
      <line className="speed-line line-3" x1="8" y1="32" x2="24" y2="32" strokeWidth="1" />
      <line className="speed-line line-4" x1="8" y1="40" x2="22" y2="40" strokeWidth="1" />
      <line className="speed-line line-5" x1="8" y1="48" x2="20" y2="48" strokeWidth="1" />
      
      <line className="speed-line line-6" x1="44" y1="16" x2="56" y2="16" strokeWidth="1" />
      <line className="speed-line line-7" x1="42" y1="24" x2="56" y2="24" strokeWidth="1" />
      <line className="speed-line line-8" x1="40" y1="32" x2="56" y2="32" strokeWidth="1" />
      <line className="speed-line line-9" x1="42" y1="40" x2="56" y2="40" strokeWidth="1" />
      <line className="speed-line line-10" x1="44" y1="48" x2="56" y2="48" strokeWidth="1" />
      
      {/* Motion trails */}
      <path
        className="motion-trail trail-1"
        d="M 12 18 L 28 42"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
      
      <path
        className="motion-trail trail-2"
        d="M 36 42 L 52 18"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
      
      {/* Speed particles */}
      <circle className="speed-particle particle-1" cx="10" cy="16" r="0.8" />
      <circle className="speed-particle particle-2" cx="10" cy="24" r="0.8" />
      <circle className="speed-particle particle-3" cx="10" cy="32" r="0.8" />
      <circle className="speed-particle particle-4" cx="10" cy="40" r="0.8" />
      <circle className="speed-particle particle-5" cx="10" cy="48" r="0.8" />
      
      <circle className="speed-particle particle-6" cx="54" cy="16" r="0.8" />
      <circle className="speed-particle particle-7" cx="54" cy="24" r="0.8" />
      <circle className="speed-particle particle-8" cx="54" cy="32" r="0.8" />
      <circle className="speed-particle particle-9" cx="54" cy="40" r="0.8" />
      <circle className="speed-particle particle-10" cx="54" cy="48" r="0.8" />
      
      {/* Velocity core */}
      <circle cx="32" cy="32" r="3" className="velocity-core" />
      <circle cx="32" cy="32" r="1.5" className="velocity-inner" />
      
      {/* Motion blur effect */}
      <ellipse
        className="motion-blur"
        cx="32"
        cy="32"
        rx="8"
        ry="2"
        fill="none"
        opacity="0.3"
        transform="rotate(-45 32 32)"
      />
    </svg>
  );
};
