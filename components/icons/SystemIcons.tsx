import React from 'react';
import './holographic-icons.css';

interface SearchIconProps {
    className?: string;
    size?: number;
}

export const SearchIcon: React.FC<SearchIconProps> = ({
    className = '',
    size = 24
}) => {
    return (
        <svg
            className={`holographic-icon search-icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Scanning reticle circle */}
            <circle
                className="reticle-circle"
                cx="32"
                cy="32"
                r="14"
                strokeWidth="1.5"
            />

            {/* Crosshairs */}
            <line className="crosshair" x1="32" y1="12" x2="32" y2="52" strokeWidth="1.5" />
            <line className="crosshair" x1="12" y1="32" x2="52" y2="32" strokeWidth="1.5" />
        </svg>
    );
};

export const VolumeIcon: React.FC<SearchIconProps> = ({
    className = '',
    size = 24
}) => {
    return (
        <svg
            className={`holographic-icon volume-icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Sound source */}
            <circle
                className="sound-source"
                cx="20"
                cy="32"
                r="2"
                fill="var(--holographic-cyan)"
            />

            {/* Sound arcs */}
            <path className="sound-arc arc-1" d="M 26 28 Q 28 32 26 36" strokeWidth="1.5" />
            <path className="sound-arc arc-2" d="M 32 24 Q 36 32 32 40" strokeWidth="1.5" />
            <path className="sound-arc arc-3" d="M 38 20 Q 44 32 38 44" strokeWidth="1.5" />
        </svg>
    );
};

export const NotificationIcon: React.FC<SearchIconProps> = ({
    className = '',
    size = 24
}) => {
    return (
        <svg
            className={`holographic-icon notification-icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Pulsing central dot */}
            <circle
                className="notification-dot"
                cx="32"
                cy="32"
                r="3"
                fill="var(--holographic-cyan)"
            />

            {/* Outer ring */}
            <circle
                className="notification-ring"
                cx="32"
                cy="32"
                r="12"
                strokeWidth="1"
            />
        </svg>
    );
};

export const ThemeIcon: React.FC<SearchIconProps> = ({
    className = '',
    size = 24
}) => {
    return (
        <svg
            className={`holographic-icon theme-icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Half-filled circle */}
            <path
                className="theme-half theme-filled"
                d="M 32 16 A 16 16 0 0 1 32 48 Z"
                strokeWidth="2"
                fill="var(--holographic-cyan)"
            />
            <path
                className="theme-half theme-outline"
                d="M 32 48 A 16 16 0 0 1 32 16"
                strokeWidth="2"
            />
        </svg>
    );
};

export const PowerIcon: React.FC<SearchIconProps> = ({
    className = '',
    size = 24
}) => {
    return (
        <svg
            className={`holographic-icon power-icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Power symbol - broken circle */}
            <path
                className="power-circle"
                d="M 32 18 A 14 14 0 1 1 32 46 A 14 14 0 1 1 32 18"
                strokeWidth="2"
            />

            {/* Vertical line */}
            <line
                className="power-line"
                x1="32"
                y1="32"
                x2="32"
                y2="18"
                strokeWidth="2"
            />
        </svg>
    );
};
