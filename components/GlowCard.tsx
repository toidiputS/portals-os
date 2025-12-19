import React, { useEffect, useRef, ReactNode } from 'react';
import './GlowCard.css';

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

    // Determine sizing
    const getSizeClasses = () => {
        if (customSize) {
            let sizeClasses = '';
            if (width !== undefined) {
                sizeClasses += ` w-[${typeof width === 'number' ? `${width}px` : width}]`;
            }
            if (height !== undefined) {
                sizeClasses += ` h-[${typeof height === 'number' ? `${height}px` : height}]`;
            }
            return sizeClasses;
        }
        return sizeMap[size];
    };

    return (
        <div
            ref={cardRef}
            data-glow
            className={`
          glow-card
          glow-${glowColor}
          ${getSizeClasses()}
          ${!customSize ? 'aspect-3/4' : ''}
          rounded-2xl
          relative
          shadow-[0_1rem_2rem_-1rem_black]
          backdrop-blur-[5px]
          ${className}
        `}
        >
            <div ref={innerRef} data-glow></div>
            {children}
        </div>
    );
};

export { GlowCard };
