import React from 'react';
import { HoloLiteIcon } from './HoloLiteIcons';

interface LightHelperIconProps {
  className?: string;
  size?: number;
}

export const LightHelperIcon: React.FC<LightHelperIconProps> = ({ className = '', size = 64 }) => {
  return (
    <HoloLiteIcon
      variant="helper"
      size={size}
      className={className}
      label="Helper — Quick Assets"
      animate={true}
    />
  );
};
