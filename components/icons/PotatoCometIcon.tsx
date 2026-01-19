import React from 'react';
import './PotatoCometIcon.css';

interface PotatoCometIconProps {
    className?: string;
    size?: number;
}

export const PotatoCometIcon: React.FC<PotatoCometIconProps> = ({
    className = '',
    size
}) => {
    return (
        <div
            className={`potato-comet-icon ${className}`}
            style={{
                // If size is provided use it, otherwise fill parent
                width: size ? size : '100%',
                height: size ? size : '100%',
                '--size': size ? `${size}px` : '100%'
            } as React.CSSProperties}
        >
            {/* Fire trail */}
            <div className="potato-trail">
                <div className="trail-segment trail-1" />
                <div className="trail-segment trail-2" />
                <div className="trail-segment trail-3" />
                <div className="trail-segment trail-4" />
            </div>

            {/* Glow */}
            <div className="potato-glow" />

            {/* The potato */}
            <div className="potato-body">
                <div className="potato-highlight" />
            </div>

            {/* Sparks */}
            <div className="potato-sparks">
                <div className="spark spark-1" />
                <div className="spark spark-2" />
                <div className="spark spark-3" />
            </div>
        </div>
    );
};

export default PotatoCometIcon;
