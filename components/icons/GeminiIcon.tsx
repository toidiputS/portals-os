import React from 'react';
import './holographic-icons.css';

interface GeminiIconProps {
    className?: string;
    size?: number;
}

export const GeminiIcon: React.FC<GeminiIconProps> = ({
    className = '',
    size = 24
}) => {
    return (
        <svg
            className={`holographic-icon gemini-icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Central node */}
            <circle
                className="central-node"
                cx="32"
                cy="32"
                r="3"
                fill="var(--holographic-cyan)"
            />

            {/* Orbital paths (faint dotted lines) */}
            <ellipse
                className="orbital-path"
                cx="32"
                cy="32"
                rx="16"
                ry="10"
                strokeWidth="0.5"
                strokeDasharray="2 3"
                opacity="0.3"
            />
            <ellipse
                className="orbital-path"
                cx="32"
                cy="32"
                rx="20"
                ry="12"
                strokeWidth="0.5"
                strokeDasharray="2 3"
                opacity="0.3"
            />

            {/* Orbiting nodes */}
            <circle
                className="orbital-node orbital-node-1"
                cx="48"
                cy="32"
                r="1.5"
                fill="var(--holographic-cyan)"
            />
            <circle
                className="orbital-node orbital-node-2"
                cx="12"
                cy="32"
                r="1.5"
                fill="var(--holographic-cyan)"
            />
        </svg>
    );
};
