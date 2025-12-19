import React from 'react';

interface DeltaIconProps {
  className?: string;
  size?: number;
}

export const DeltaIcon: React.FC<DeltaIconProps> = ({
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
        d="M3 21L12 3L21 21H3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 11L12 15L16 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15" r="2" fill="currentColor" />
    </svg>
  );
};
