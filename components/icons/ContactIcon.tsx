import React from 'react';
import './holographic-icons.css';

interface ContactIconProps {
    className?: string;
    size?: number;
}

export const ContactIcon: React.FC<ContactIconProps> = ({
    className = '',
    size = 24
}) => {
    return (
        <svg
            className={`holographic-icon contact-icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Origin point */}
            <circle
                className="message-origin"
                cx="16"
                cy="32"
                r="2"
                fill="var(--holographic-cyan)"
            />

            {/* Three curved message paths */}
            <path
                className="message-path path-1"
                d="M 18 28 Q 35 22 52 28"
                strokeWidth="1.5"
            />
            <path
                className="message-path path-2"
                d="M 18 32 Q 35 32 52 32"
                strokeWidth="1.5"
            />
            <path
                className="message-path path-3"
                d="M 18 36 Q 35 42 52 36"
                strokeWidth="1.5"
            />

            {/* Comets (animated on hover) */}
            <circle className="message-comet comet-1" cx="18" cy="28" r="1" fill="var(--holographic-cyan)" opacity="0" />
            <circle className="message-comet comet-2" cx="18" cy="32" r="1" fill="var(--holographic-cyan)" opacity="0" />
            <circle className="message-comet comet-3" cx="18" cy="36" r="1" fill="var(--holographic-cyan)" opacity="0" />
        </svg>
    );
};
