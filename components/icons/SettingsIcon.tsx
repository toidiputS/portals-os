import React from 'react';
import './holographic-icons.css';

interface SettingsIconProps {
    className?: string;
    size?: number;
}

export const SettingsIcon: React.FC<SettingsIconProps> = ({
    className = '',
    size = 24
}) => {
    return (
        <svg
            className={`holographic-icon settings-icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Central ring */}
            <circle
                className="settings-ring"
                cx="32"
                cy="32"
                r="12"
                strokeWidth="2"
            />

            {/* 8 radiating lines */}
            <line className="settings-ray" x1="32" y1="8" x2="32" y2="16" strokeWidth="1.5" />
            <line className="settings-ray" x1="47.8" y1="16.2" x2="43.3" y2="20.7" strokeWidth="1.5" />
            <line className="settings-ray" x1="56" y1="32" x2="48" y2="32" strokeWidth="1.5" />
            <line className="settings-ray" x1="47.8" y1="47.8" x2="43.3" y2="43.3" strokeWidth="1.5" />
            <line className="settings-ray" x1="32" y1="56" x2="32" y2="48" strokeWidth="1.5" />
            <line className="settings-ray" x1="16.2" y1="47.8" x2="20.7" y2="43.3" strokeWidth="1.5" />
            <line className="settings-ray" x1="8" y1="32" x2="16" y2="32" strokeWidth="1.5" />
            <line className="settings-ray" x1="16.2" y1="16.2" x2="20.7" y2="20.7" strokeWidth="1.5" />
        </svg>
    );
};
