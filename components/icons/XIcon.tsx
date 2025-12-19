import React from 'react';

interface XIconProps {
  className?: string;
  size?: number;
}

export const XIcon: React.FC<XIconProps> = ({
  className = '',
  size = 24
}) => {
  return (
    <div
      className={`flex items-center justify-center bg-gray-800 rounded-full text-white font-bold ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      X
    </div>
  );
};
