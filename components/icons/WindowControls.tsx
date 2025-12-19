import React from 'react';
import './holographic-icons.css';

interface CloseIconProps {
    className?: string;
    size?: number;
    onClick?: () => void;
}

export const CloseIcon: React.FC<CloseIconProps> = ({
    className = '',
    size = 16,
    onClick
}) => {
    return (
        <svg
            className={`holographic-icon close-icon window-control-icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            {/* X formed by two crossing beams */}
            <line
                className="close-line"
                x1="6"
                y1="6"
                x2="18"
                y2="18"
                strokeWidth="2"
            />
            <line
                className="close-line"
                x1="18"
                y1="6"
                x2="6"
                y2="18"
                strokeWidth="2"
            />
        </svg>
    );
};

export const MaximizeIcon: React.FC<CloseIconProps> = ({
    className = '',
    size = 16,
    onClick
}) => {
    return (
        <svg
            className={`holographic-icon maximize-icon window-control-icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            {/* Square outline */}
            <rect
                className="maximize-square"
                x="6"
                y="6"
                width="12"
                height="12"
                strokeWidth="2"
            />
        </svg>
    );
};

export const MinimizeIcon: React.FC<CloseIconProps> = ({
    className = '',
    size = 16,
    onClick
}) => {
    return (
        <svg
            className={`holographic-icon minimize-icon window-control-icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            {/* Horizontal line */}
            <line
                className="minimize-line"
                x1="6"
                y1="12"
                x2="18"
                y2="12"
                strokeWidth="2"
            />
        </svg>
    );
};
