import React from 'react';
import './holographic-icons.css';

interface ResumeIconProps {
    className?: string;
    size?: number;
}

export const ResumeIcon: React.FC<ResumeIconProps> = ({
    className = '',
    size = 24
}) => {
    return (
        <svg
            className={`holographic-icon resume-icon ${className}`}
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Head and shoulders silhouette */}
            <path
                className="resume-silhouette"
                d="M 32 18 Q 28 18 28 22 Q 28 26 32 26 Q 36 26 36 22 Q 36 18 32 18 M 26 28 Q 24 32 24 36 L 28 36 L 28 28 L 36 28 L 36 36 L 40 36 Q 40 32 38 28 Z"
                strokeWidth="1.5"
            />

            {/* Data trails flowing from temple */}
            <path
                className="data-trail trail-1"
                d="M 36 20 Q 40 18 44 20 Q 48 22 50 26"
                strokeWidth="1"
            />
            <path
                className="data-trail trail-2"
                d="M 37 22 Q 42 21 46 24 Q 50 27 52 32"
                strokeWidth="1"
            />
            <path
                className="data-trail trail-3"
                d="M 37 24 Q 43 24 48 28 Q 52 32 54 38"
                strokeWidth="1"
            />
        </svg>
    );
};
