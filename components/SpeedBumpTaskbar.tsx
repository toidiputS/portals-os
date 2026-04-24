import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { HolographicStartIcon } from './icons';
import { NEXUS_SQUADS } from '../constants/platoon';

/**
 * SpeedBumpTaskbar - A minimal bottom taskbar with half-exposed circular buttons
 * 
 * Layout:
 * [Start Menu] ---- [Squad 1] [Squad 2] ... [Squad 10]
 *     LEFT                     CENTER ARRAY
 * 
 * All buttons are "speed bumps" - only the top half is visible on screen.
 * Clicking a squad opens the SquadSphere with that squad's agents.
 */

const BUTTON_SIZE = 96; // 96px = w-24 h-24

interface SpeedBumpTaskbarProps {
    onStartMenuClick: () => void;
    isStartMenuOpen: boolean;
    activeSquadId?: string | null;
    onSquadClick?: (squadId: string, buttonRef?: DOMRect) => void;
    onAllAgentsClick?: () => void;
}

export const SpeedBumpTaskbar: React.FC<SpeedBumpTaskbarProps> = ({
    onStartMenuClick,
    isStartMenuOpen,
    activeSquadId = null,
    onSquadClick,
    onAllAgentsClick
}) => {
    return (
        <>
            {/* ============ START MENU - BOTTOM LEFT CORNER ============ */}
            <motion.button
                onClick={(e) => {
                    e.stopPropagation();
                    onStartMenuClick();
                }}
                className="fixed flex items-center justify-center cursor-pointer outline-none z-50 pointer-events-auto"
                style={{
                    width: BUTTON_SIZE,
                    height: BUTTON_SIZE,
                    bottom: -40, // Same as -bottom-10
                    left: -40,   // Same as -left-10
                }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                title="Start Menu"
            >
                {/* Background circle */}
                <div
                    className="absolute inset-0 rounded-full bg-black border-2 border-white/30 shadow-lg"
                    style={{
                        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
                    }}
                />

                {/* Icon */}
                <HolographicStartIcon
                    size={24}
                    className={`relative z-10 text-white transition-all duration-200 ml-4 mb-4 ${isStartMenuOpen ? 'text-purple-400' : ''
                        }`}
                />

                {/* Active indicator glow */}
                {isStartMenuOpen && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-purple-400/60 pointer-events-none"
                        initial={{ scale: 0.8, opacity: 1 }}
                        animate={{ scale: 1.3, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                )}
            </motion.button>

            {/* ============ Single NEXUS bump ============ */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center z-50 pointer-events-none">
                <motion.button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAllAgentsClick?.();
                    }}
                    className="relative flex flex-col items-center justify-center cursor-pointer outline-none pointer-events-auto group"
                    style={{
                        width: 72,
                        height: 72,
                        marginBottom: -32,
                    }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.95 }}
                    title="Nexus Fleet Command"
                >
                    <div
                        className="absolute inset-0 rounded-full border-2 shadow-lg"
                        style={{
                            borderColor: '#a855f780',
                            background: 'linear-gradient(135deg, #a855f740 0%, #6366f130 50%, #0f0f23 100%)',
                            boxShadow: '0 0 20px #a855f740, 0 0 40px #6366f120'
                        }}
                    />
                    <span className="absolute inset-0 flex items-start pt-[14px] justify-center z-10 text-white font-mono text-[10px] font-black opacity-90 pointer-events-none tracking-[0.2em]">
                        NEXUS
                    </span>
                    {/* Breathing ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full border border-purple-400/30 pointer-events-none"
                        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.button>
            </div>
        </>
    );
};

export default SpeedBumpTaskbar;
