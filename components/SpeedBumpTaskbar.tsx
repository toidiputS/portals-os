import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useKernel } from '../store/kernel';
import { HolographicStartIcon } from './icons';

/**
 * SpeedBumpTaskbar - A minimal bottom taskbar with two half-exposed circular buttons
 * 
 * Layout:
 * [Start Menu] ---- [CircleMenu]
 *     LEFT            CENTER
 * 
 * Oracle has been moved to a half-bubble at the top-right corner (OracleBubble component)
 * All buttons are "speed bumps" - only the top half is visible on screen
 */

const BUTTON_SIZE = 80;
const HALF_EXPOSED = BUTTON_SIZE / 2; // Only show top half

interface SpeedBumpTaskbarProps {
    onCircleMenuClick: () => void;
    isCircleMenuOpen: boolean;
    onStartMenuClick: () => void;
    isStartMenuOpen: boolean;
}

const SpeedBumpTaskbar: React.FC<SpeedBumpTaskbarProps> = ({
    onCircleMenuClick,
    isCircleMenuOpen,
    onStartMenuClick,
    isStartMenuOpen,
}) => {
    return (
        <>
            {/* ============ START MENU - BOTTOM LEFT CORNER ============ */}
            <motion.button
                onClick={onStartMenuClick}
                className="fixed flex items-center justify-center cursor-pointer outline-none z-50"
                style={{
                    width: BUTTON_SIZE,
                    height: BUTTON_SIZE,
                    bottom: -BUTTON_SIZE / 2,
                    left: -BUTTON_SIZE / 2,
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
                    size={20}
                    className={`relative z-10 text-white transition-all duration-200 ${isStartMenuOpen ? 'text-purple-400' : ''
                        }`}
                />

                {/* Active indicator glow */}
                {isStartMenuOpen && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-purple-400/60"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.3, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                )}
            </motion.button>

            {/* ============ CIRCLE MENU - CENTER AT PERSON'S FEET ============ */}
            <motion.button
                onClick={onCircleMenuClick}
                className="fixed bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer outline-none z-50"
                style={{
                    width: 60, // Smaller than other speed bumps
                    height: 60,
                    marginBottom: -30, // Only show top half
                }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                title="Portal Menu"
            >
                {/* Background circle - same orb gradient */}
                <div
                    className="absolute inset-0 rounded-full border-2 border-white/30 shadow-lg hover:border-purple-400/60 transition-colors"
                    style={{
                        background: isCircleMenuOpen
                            ? 'linear-gradient(135deg, #2a2a4e 0%, #26335e 50%, #1f1f43 100%)'
                            : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
                    }}
                />

                {/* Icon */}
                <AnimatePresence mode="wait">
                    {isCircleMenuOpen ? (
                        <motion.span
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={20} className="relative z-10 text-black" />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="open"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Menu size={20} className="relative z-10 text-white" />
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Active indicator glow */}
                {isCircleMenuOpen && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white/60"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.3, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                )}
            </motion.button>
        </>
    );
};

export default SpeedBumpTaskbar;
