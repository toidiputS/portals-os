import React from 'react';
import './holographic-icons.css';

interface PortfolioLogoProps {
    className?: string;
    onClick?: () => void;
    size?: number;
}

export const PortfolioLogo: React.FC<PortfolioLogoProps> = ({
    className = '',
    onClick,
    size = 32
}) => {
    return (
        <svg
            className={`holographic-icon portfolio-logo ${className}`}
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            {/* Outer ring - complete circle */}
            <circle
                className="logo-ring logo-outer-ring"
                cx="32"
                cy="32"
                r="28"
                strokeWidth="2"
            />

            {/* Middle ring - broken at 4 and 10 o'clock */}
            <circle
                className="logo-ring logo-middle-ring"
                cx="32"
                cy="32"
                r="20"
                strokeWidth="2.5"
                strokeDasharray="45 15 45 15"
                strokeDashoffset="22.5"
            />

            {/* Inner ring - broken at 12 and 6 o'clock, brightest */}
            <circle
                className="logo-ring logo-inner-ring"
                cx="32"
                cy="32"
                r="12"
                strokeWidth="3"
                strokeDasharray="35 20 35 20"
                strokeDashoffset="0"
            />
        </svg>
    );
};
