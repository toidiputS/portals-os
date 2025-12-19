import React from 'react';

interface GammaIconProps {
  className?: string;
  size?: number;
}

export const GammaIcon: React.FC<GammaIconProps> = ({
  className = '',
  size = 24
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 3L12 12L21 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12L12 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 7L12 12L17 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
};
