import React from 'react';
import './holographic-icons.css';

interface HolographicApplicationsIconProps {
    className?: string;
    onClick?: () => void;
    size?: number;
}

export const HolographicApplicationsIcon: React.FC<HolographicApplicationsIconProps> = ({
    className = '',
    onClick,
    size = 32
}) => {
    return (
        <div
            className={`holographic-applications-icon inline-block ${className} ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            <div className="apps-glow"></div>
            <div className="apps-icon">
                <div className="apps-ring"></div>
                <div className="apps-grid">
                    <div className="apps-cell"></div>
                    <div className="apps-cell"></div>
                    <div className="apps-cell"></div>
                    <div className="apps-cell">15</div>
                </div>
                <div className="apps-holo-overlay"></div>
            </div>
            <div className="apps-particles">
                <div className="apps-particle"></div>
                <div className="apps-particle"></div>
                <div className="apps-particle"></div>
            </div>
        </div>
    );
};
