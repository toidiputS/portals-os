import React from 'react';
import './holographic-icons.css';

interface TerminalIconProps {
    className?: string;
    size?: number;
}

export const TerminalIcon: React.FC<TerminalIconProps> = ({
    className = '',
    size = 24
}) => {
    return (
        <svg
            className={`holographic-icon terminal-icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Chevron > */}
            <polyline
                className="terminal-chevron"
                points="12,20 28,32 12,44"
                strokeWidth="4"
            />

            {/* Pulsing cursor _ */}
            <line
                className="terminal-cursor"
                x1="36"
                y1="44"
                x2="52"
                y2="44"
                strokeWidth="5"
            />
        </svg>
    );
};
