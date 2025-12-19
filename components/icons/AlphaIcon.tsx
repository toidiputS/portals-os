import React from 'react';

interface AlphaIconProps {
  className?: string;
  size?: number;
}

export const AlphaIcon: React.FC<AlphaIconProps> = ({
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
        d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 2V22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M2 8.5L12 12L22 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
};
