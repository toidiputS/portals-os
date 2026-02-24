import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { HolographicStartIcon } from './icons';
import { PLATOON_DOMAINS } from '../constants/platoon';

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
    activeDomainIds?: string[];
    onDomainClick?: (domainId: string) => void;
}

export const SpeedBumpTaskbar: React.FC<SpeedBumpTaskbarProps> = ({
    onStartMenuClick,
    isStartMenuOpen,
    activeDomainIds = [],
    onDomainClick
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

            {/* ============ DOMAIN MENUS - CENTER SPAN AT PERSON'S FEET ============ */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center gap-4 z-50 pointer-events-none w-full max-w-5xl px-8" style={{ paddingBottom: -30 }}>
                {PLATOON_DOMAINS.map((domain) => {
                    const isActive = activeDomainIds.includes(domain.id);

                    return (
                        <motion.button
                            key={domain.id}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDomainClick?.(domain.id);
                            }}
                            className="relative flex flex-col items-center justify-center cursor-pointer outline-none pointer-events-auto group"
                            style={{
                                width: SQUAD_BUTTON_SIZE,
                                height: SQUAD_BUTTON_SIZE,
                                marginBottom: -30, // Only show top half
                            }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.95 }}
                            title={domain.name}
                        >
                            {/* Background circle - dynamically colored base on active state */}
                            <div
                                className="absolute inset-0 rounded-full border-2 shadow-lg transition-colors"
                                style={{
                                    borderColor: isActive ? domain.colorHex : `${domain.colorHex}60`,
                                    background: `linear-gradient(135deg, ${domain.colorHex}40 0%, ${domain.colorHex}20 50%, #0f0f23 100%)`,
                                    boxShadow: isActive ? `0 0 15px ${domain.colorHex}80` : `0 0 10px ${domain.colorHex}40`
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
                                        className="absolute inset-0 flex items-start pt-[10px] justify-center pointer-events-none"
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
                                        className="absolute inset-0 flex items-start pt-[12px] justify-center z-10 text-white font-mono text-sm font-bold opacity-70 pointer-events-none"
                                    >
                                        <span className="text-[10px] leading-tight text-center px-1">
                                            {domain.name.split(' ').map((word, i) => (
                                                <React.Fragment key={i}>
                                                    {word}
                                                    {i < domain.name.split(' ').length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                        </span>
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            {/* Active indicator glow */}
                            {
                                isActive && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-2"
                                        style={{ borderColor: domain.colorHex }}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1.3, opacity: 0 }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                )
                            }
                        </motion.button>
                    );
                })}
            </div >
        </>
    );
};

export default SpeedBumpTaskbar;
