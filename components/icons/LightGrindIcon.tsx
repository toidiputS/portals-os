import React from 'react';
import { HoloLiteIcon } from './HoloLiteIcons';

interface LightGrindIconProps {
  className?: string;
  size?: number;
}

export const LightGrindIcon: React.FC<LightGrindIconProps> = ({ className = '', size = 64 }) => {
  return (
    <HoloLiteIcon
      variant="grind"
      size={size}
      className={className}
      label="Grind — Operations Logic"
      animate={true}
    />
  );
};
