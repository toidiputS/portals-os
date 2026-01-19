import React, { ReactNode } from 'react';
import { AsmrBackground } from './AsmrBackground';

interface PortalLayoutProps {
    children?: ReactNode;
    backgroundImage?: string; // Background scene image
    portalImage?: string;     // Portal overlay image
    showPortal?: boolean;     // Toggle portal overlay
    className?: string;       // Additional classes for the container
}

/**
 * PortalLayout Component
 * 
 * Provides the layered portal effect:
 * - Background scene
 * - ASMR particle canvas (middle)
 * - Portal frame overlay (front)
 * - Your custom components (on top)
 */
export const PortalLayout: React.FC<PortalLayoutProps> = ({
    children,
    backgroundImage = '/assets/images/you.png',
    portalImage = '/assets/images/you.png',
    showPortal = true,
    className = ''
}) => {
    return (
        <div
            className={`fixed inset-0 bg-cover bg-center ${className}`}
            style={{
                backgroundImage: `url('${backgroundImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* ============ ASMR BACKGROUND - FULL SCREEN ============ */}
            {/* Animated particle effect covering entire screen */}
            <div
                className="absolute inset-0"
                style={{
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            >
                <AsmrBackground />
            </div>

            {/* ============ PORTAL FRAME OVERLAY - FULL SCREEN ============ */}
            {/* Portal image on top of particles for depth effect */}
            {showPortal && (
                <div
                    className="absolute inset-0"
                    style={{
                        pointerEvents: 'none',
                        zIndex: 10
                    }}
                >
                    <img
                        src={portalImage}
                        alt=""
                        className="w-full h-full object-cover"
                        style={{ mixBlendMode: 'screen' }}
                    />
                </div>
            )}

            {/* ============ YOUR CONTENT GOES HERE ============ */}
            {/* Content appears on top of all layers */}
            <div className="relative w-full h-full" style={{ zIndex: 100 }}>
                {children}
            </div>
        </div>
    );
};

export default PortalLayout;
