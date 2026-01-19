import React, { lazy, Suspense, useEffect, useRef, useCallback, useState } from "react";
import "./index.css";
import { useKernel } from "./store/kernel";
import Desktop from "./components/Desktop";
import Window from "./components/Window";
import WelcomeScreen from "./components/WelcomeScreen";
import Sidebar from "./components/Sidebar";
import VoiceAssistant from "./components/VoiceAssistant";
import VoiceAssistantOverlay from "./components/VoiceAssistantOverlay";

import ErrorBoundary from "./components/ErrorBoundary";
import { getAllApps } from "./apps.config";
import {
  usePerformanceMonitor,
  performanceMonitor,
  PerformanceMetrics,
} from "./lib/performanceUtils";

import { motion, AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

const App: React.FC = () => {
  const windows = useKernel((state) => state.windows);
  const hasWelcomed = useKernel((state) => state.hasWelcomed);
  const setHasWelcomed = useKernel((state) => state.setHasWelcomed);
  const projectFolders = useKernel((state) => state.projectFolders);

  const theme = useKernel((state) => state.theme);
  const lastPerformanceLogTime = useRef(0);

  // Performance monitoring callback - memoized to prevent multiple subscriptions
  const performanceCallback = useCallback((metrics: PerformanceMetrics) => {
    // Throttle logging to reduce console spam
    const now = performance.now();
    if (now - lastPerformanceLogTime.current > 5000) {
      if (metrics.fps < 30) {
        console.warn(`Performance warning: ${metrics.fps}fps`);
      }
      if (metrics.memoryUsage && metrics.memoryUsage > 150) {
        console.warn(`Memory usage high: ${metrics.memoryUsage}MB`);
      }
      lastPerformanceLogTime.current = now;
    }
  }, []);

  usePerformanceMonitor(performanceCallback);



  useEffect(() => {
    // Start performance monitoring
    performanceMonitor.start();

    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Cleanup performance monitoring on unmount
    return () => {
      performanceMonitor.stop();
    };
  }, [theme]);

  return (
    <AnimatePresence mode="sync">
      {!hasWelcomed ? (
        <WelcomeScreen key="welcome" />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="fixed inset-0 overflow-hidden bg-black font-sans"
        >
          <Desktop>
            {windows.map((win) => {
              const allApps = getAllApps(projectFolders);
              const appDef = allApps.find((app) => app.id === win.appId);
              const App = appDef?.component;
              if (!App) return null;
              return (
                <Window key={win.id || `window-${win.appId}-${Math.random()}`} {...win}>
                  <ErrorBoundary>
                    <Suspense
                      fallback={
                        <div className="h-full flex items-center justify-center bg-[hsl(var(--window-bg-hsl))] text-[hsl(var(--foreground-hsl))]">
                          <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4"></div>
                            <p>Loading App...</p>
                          </div>
                        </div>
                      }
                    >
                      <App metadata={win.metadata} />
                    </Suspense>
                  </ErrorBoundary>
                </Window>
              );
            })}
          </Desktop>

          <Sidebar />
          <VoiceAssistant />
          <VoiceAssistantOverlay />


        </motion.div>
      )}
      <Analytics />
    </AnimatePresence>
  );
};

export default App;
