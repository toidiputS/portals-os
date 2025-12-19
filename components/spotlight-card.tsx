import React, { useEffect, useRef, ReactNode } from 'react';
import './spotlight-card.css';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean; // When true, ignores size prop and uses width/height or className
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 }
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  customSize = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;

      if (cardRef.current) {
        cardRef.current.style.setProperty('--x', x.toFixed(2));
        cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty('--y', y.toFixed(2));
        cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };

    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      const { base, spread } = glowColorMap[glowColor];
      cardRef.current.style.setProperty('--base', base.toString());
      cardRef.current.style.setProperty('--spread', spread.toString());
      cardRef.current.style.setProperty('--radius', '14');
      cardRef.current.style.setProperty('--border', '3');
      cardRef.current.style.setProperty('--backdrop', 'hsl(0 0% 60% / 0.12)');
      cardRef.current.style.setProperty('--backup-border', 'var(--backdrop)');
      cardRef.current.style.setProperty('--size', '200');
      cardRef.current.style.setProperty('--outer', '1');
      if (width !== undefined) {
        cardRef.current.style.setProperty('--width', typeof width === 'number' ? `${width}px` : width);
      } else {
        cardRef.current.style.setProperty('--width', 'auto');
      }
      if (height !== undefined) {
        cardRef.current.style.setProperty('--height', typeof height === 'number' ? `${height}px` : height);
      } else {
        cardRef.current.style.setProperty('--height', 'auto');
      }
    }
  }, [glowColor, width, height]);

  // Determine sizing
  const getSizeClasses = () => {
    if (customSize) {
      return ''; // Let className handle sizing
    }
    return sizeMap[size];
  };

  return (
    <div
      ref={cardRef}
      data-glow
      className={`
        spotlight-card
        ${getSizeClasses()}
        ${!customSize ? 'aspect-3/4' : ''}
        rounded-2xl
        relative
        grid
        grid-rows-[1fr_auto]
        shadow-[0_1rem_2rem_-1rem_black]
        p-4
        gap-4
        backdrop-blur-[5px]
        ${className}
      `}
    >
      <div ref={innerRef} data-glow></div>
      {children}
    </div>
  );
};

export { GlowCard }
