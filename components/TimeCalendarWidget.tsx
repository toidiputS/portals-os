import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, ChevronDown } from 'lucide-react';

/**
 * TimeCalendarWidget - A clickable time display at the top-right
 * Drops down to show full date, time, and calendar when clicked
 */

const TimeCalendarWidget: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatShortDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    // Generate calendar days for current month
    const generateCalendar = () => {
        const year = time.getFullYear();
        const month = time.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days: (number | null)[] = [];

        // Add empty cells for days before the 1st
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return days;
    };

    const calendarDays = generateCalendar();
    const currentDay = time.getDate();
    const monthName = time.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <div className="fixed top-0 right-4 z-50">
            {/* Time Display Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-md text-white border-b border-white/20 rounded-b-lg shadow-lg cursor-pointer hover:bg-black/70 transition-colors"
                whileHover={{ y: 2 }}
                whileTap={{ scale: 0.98 }}
            >
                <Clock size={16} className="opacity-70" />
                <span className="text-sm font-medium">{formatTime(time)}</span>
                <span className="text-xs opacity-50">•</span>
                <span className="text-xs opacity-70">{formatShortDate(time)}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={14} className="opacity-50" />
                </motion.div>
            </motion.button>

            {/* Dropdown Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-1 w-80 bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl overflow-hidden"
                    >
                        {/* Header with Full Date & Time */}
                        <div className="p-4 border-b border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock size={20} className="text-purple-400" />
                                <span className="text-2xl font-bold text-white">{formatTime(time)}</span>
                            </div>
                            <div className="text-sm text-white/70">{formatDate(time)}</div>
                        </div>

                        {/* Calendar */}
                        <div className="p-4">
                            {/* Month/Year Header */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-purple-400" />
                                    <span className="text-sm font-semibold text-white">{monthName}</span>
                                </div>
                            </div>

                            {/* Day Headers */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                                    <div
                                        key={day}
                                        className="text-center text-xs font-medium text-white/40 py-1"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Days */}
                            <div className="grid grid-cols-7 gap-1">
                                {calendarDays.map((day, index) => (
                                    <div
                                        key={index}
                                        className={`
                                            aspect-square flex items-center justify-center text-sm rounded
                                            ${day === null ? 'invisible' : ''}
                                            ${day === currentDay
                                                ? 'bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/50'
                                                : 'text-white/70 hover:bg-white/10 transition-colors cursor-pointer'
                                            }
                                        `}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer - Quick Actions */}
                        <div className="p-3 border-t border-white/10 bg-black/40">
                            <div className="text-xs text-white/50 text-center">
                                Click outside to close
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Click outside to close */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[-1]"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default TimeCalendarWidget;
