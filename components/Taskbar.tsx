import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useKernel } from "../store/kernel";
import { APPS } from "../apps.config";

/**
 * Taskbar - Shows open applications as speed bumps along the bottom
 * Each open app appears as a half-exposed orb at the bottom of the screen
 * Clicking toggles minimize/focus
 */

const BUMP_SIZE = 50;
const BUMP_SPACING = 60; // Space between each bump

const Taskbar: React.FC = () => {
  const windows = useKernel((state) => state.windows);
  const activeWindowId = useKernel((state) => state.activeWindowId);
  const focusWindow = useKernel((state) => state.focusWindow);
  const minimizeWindow = useKernel((state) => state.minimizeWindow);

  const openApps = useMemo(() => {
    return windows
      .map((win) => ({
        win,
        app: APPS.find((app) => app.id === win.appId),
      }))
      .filter((item) => item.app);
  }, [windows]);

  // Don't render if no apps are open
  if (openApps.length === 0) {
    return null;
  }

  // Calculate starting position - after the start menu and circle menu buttons
  // Start menu is at left corner, circle menu is at center
  // Position open app bumps between them, starting from left side
  const startX = 100; // Start after the corner speed bump

  return (
    <>
      {openApps.map(({ win, app }, index) => {
        if (!app) return null;
        const Icon = app.icon;
        const isActive = win.id === activeWindowId && !win.minimized;
        const xPosition = startX + (index * BUMP_SPACING);

        return (
          <motion.button
            key={win.id}
            onClick={() => {
              // Toggle: if active/visible, minimize; if minimized, restore
              if (win.id === activeWindowId && !win.minimized) {
                minimizeWindow(win.id);
              } else {
                focusWindow(win.id);
              }
            }}
            className="fixed bottom-0 flex items-center justify-center cursor-pointer outline-none z-40"
            style={{
              width: BUMP_SIZE,
              height: BUMP_SIZE,
              left: xPosition,
              marginBottom: -BUMP_SIZE / 2, // Only show top half
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            title={app.name}
          >
            {/* Background orb */}
            <div
              className={`absolute inset-0 rounded-full border-2 shadow-lg transition-colors ${isActive
                ? "border-purple-400/80"
                : "border-white/30 hover:border-purple-400/60"
                }`}
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, #2a1a4e 0%, #3e1666 50%, #1f0f43 100%)'
                  : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
              }}
            />

            {/* Icon */}
            <Icon
              className={`relative z-10 w-5 h-5 transition-all ${isActive ? "text-purple-300 scale-110" : "text-white/70"
                }`}
            />

            {/* Active indicator glow */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
                }}
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.button>
        );
      })}
    </>
  );
};

export default Taskbar;
