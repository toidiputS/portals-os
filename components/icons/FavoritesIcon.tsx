import React from 'react';
import './holographic-icons.css';

interface FavoritesIconProps {
    className?: string;
    size?: number;
}

export const FavoritesIcon: React.FC<FavoritesIconProps> = ({
    className = '',
    size = 24
}) => {
    return (
        <svg
            className={`holographic-icon favorites-icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Five-pointed star made from intersecting lines */}
            <path
                className="star-line"
                d="M 32 12 L 22 42 L 50 24 L 14 24 L 42 42 Z"
                strokeWidth="1.5"
            />
        </svg>
    );
};
