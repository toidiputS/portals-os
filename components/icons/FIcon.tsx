import React from 'react';
import './holographic-icons.css';

interface FIconProps {
  className?: string;
  size?: number;
}

export const FIcon: React.FC<FIconProps> = ({
  className = '',
  size = 24
}) => {
  return (
    <svg
      className={`holographic-icon flow-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* F letter structure */}
      <path
        className="flow-backbone"
        d="M 16 16 L 16 48 M 16 16 L 40 16 M 16 30 L 32 30"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Data flow streams */}
      <path
        className="flow-stream stream-1"
        d="M 12 20 Q 24 18, 36 22 T 52 20"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 2"
      />
      
      <path
        className="flow-stream stream-2"
        d="M 12 26 Q 24 24, 36 28 T 52 26"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 2"
      />
      
      <path
        className="flow-stream stream-3"
        d="M 12 34 Q 24 32, 36 36 T 52 34"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 2"
      />
      
      <path
        className="flow-stream stream-4"
        d="M 12 40 Q 24 38, 36 42 T 52 40"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 2"
      />
      
      {/* Flow particles */}
      <circle className="flow-particle particle-a" r="1.5" />
      <circle className="flow-particle particle-b" r="1.5" />
      <circle className="flow-particle particle-c" r="1.5" />
      <circle className="flow-particle particle-d" r="1.5" />
      <circle className="flow-particle particle-e" r="1.5" />
      
      {/* Connection nodes */}
      <circle cx="16" cy="16" r="2" className="flow-node" />
      <circle cx="16" cy="30" r="2" className="flow-node" />
      <circle cx="16" cy="48" r="2" className="flow-node" />
      <circle cx="40" cy="16" r="2" className="flow-node" />
      <circle cx="32" cy="30" r="2" className="flow-node" />
    </svg>
  );
};
