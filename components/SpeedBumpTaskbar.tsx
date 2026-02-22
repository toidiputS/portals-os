import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { HolographicStartIcon } from './icons';
import { PLATOON_SQUADS } from '../constants/platoon';

/**
 * SpeedBumpTaskbar - A minimal bottom taskbar with half-exposed circular buttons
 * 
 * Layout:
 * [Start Menu] ---- [Squad 1] [Squad 2] ... [Squad 10]
 *     LEFT                     CENTER ARRAY
 * 
 * All buttons are "speed bumps" - only the top half is visible on screen
 */

const BUTTON_SIZE = 96; // 96px = w-24 h-24
const SQUAD_BUTTON_SIZE = 60; // Slightly smaller for the 10 squads

interface SpeedBumpTaskbarProps {
    onStartMenuClick: () => void;
    isStartMenuOpen: boolean;
    activeSquadId: string | null;
    onSquadClick: (squadId: string) => void;
}

const SpeedBumpTaskbar: React.FC<SpeedBumpTaskbarProps> = ({
    onStartMenuClick,
    isStartMenuOpen,
    activeSquadId,
    onSquadClick
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

            {/* ============ SQUAD MENUS - CENTER SPAN AT PERSON'S FEET ============ */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center gap-4 z-50 pointer-events-none w-full max-w-5xl px-8" style={{ paddingBottom: -30 }}>
                {PLATOON_SQUADS.map((squad) => {
                    const isActive = activeSquadId === squad.id;

                    return (
                        <motion.button
                            key={squad.id}
                            onClick={(e) => {
                                e.stopPropagation();
                                onSquadClick(squad.id);
                            }}
                            className="relative flex flex-col items-center justify-center cursor-pointer outline-none pointer-events-auto group"
                            style={{
                                width: SQUAD_BUTTON_SIZE,
                                height: SQUAD_BUTTON_SIZE,
                                marginBottom: -30, // Only show top half
                            }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.95 }}
                            title={squad.name}
                        >
                            {/* Background circle - dynamically colored base on active state */}
                            <div
                                className="absolute inset-0 rounded-full border-2 shadow-lg transition-colors"
                                style={{
                                    borderColor: isActive ? squad.colorHex : `${squad.colorHex}60`,
                                    background: `linear-gradient(135deg, ${squad.colorHex}40 0%, ${squad.colorHex}20 50%, #0f0f23 100%)`,
                                    boxShadow: isActive ? `0 0 15px ${squad.colorHex}80` : `0 0 10px ${squad.colorHex}40`
                                }}
                            />

                            {/* Icon or Initials */}
                            <AnimatePresence mode="wait">
                                {isActive ? (
                                    <motion.span
                                        key="close"
                                        initial={{ opacity: 0, rotate: -90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={20} className="relative z-10 text-white" />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="open"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="relative z-10 text-white font-mono text-sm font-bold opacity-70"
                                    >
                                        {/* Show squad number for small speedbumps */}
                                        {squad.id.split('-')[1]}
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            {/* Active indicator glow */}
                            {isActive && (
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2"
                                    style={{ borderColor: squad.colorHex }}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1.3, opacity: 0 }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </>
    );
};

export default SpeedBumpTaskbar;
