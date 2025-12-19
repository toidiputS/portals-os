import React from 'react';

interface OracleIconProps {
  className?: string;
  size?: number;
}

export const OracleIcon: React.FC<OracleIconProps> = ({
  className = '',
  size = 24
}) => {
  return (
    <div
      className={`flex items-center justify-center bg-blue-500 rounded-full text-white font-bold ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      O
    </div>
  );
};
