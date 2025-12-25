import React from 'react';
import './holographic-icons.css';

interface HolographicStartIconProps {
    className?: string;
    onClick?: () => void;
    size?: number;
}

export const HolographicStartIcon: React.FC<HolographicStartIconProps> = ({
    className = '',
    onClick,
    size = 32
}) => {
    return (
        <div
            className={`inline-block holographic-start-icon ${className}${onClick ? ' cursor-pointer' : ''}`}
            onClick={onClick}
        >
            <div className="holo-glow"></div>
            <div className="holo-icon">
                <div className="holo-square"></div>
                <div className="holo-square"></div>
                <div className="holo-square"></div>
                <div className="holo-square"></div>
                <div className="scan-lines"></div>
            </div>
            <div className="particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>
        </div>
    );
};
