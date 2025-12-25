import React, { lazy, Suspense, useEffect, useRef } from "react";
import "./index.css";
import { useKernel } from "./store/kernel";
import Desktop from "./components/Desktop";
import Taskbar from "./components/Taskbar";
import Window from "./components/Window";
import WelcomeScreen from "./components/WelcomeScreen";
import Sidebar from "./components/Sidebar";
import VoiceAssistant from "./components/VoiceAssistant";
import VoiceAssistantOverlay from "./components/VoiceAssistantOverlay";
import OracleChatWidget from "./components/OracleChatWidget";
import ErrorBoundary from "./components/ErrorBoundary";
import { getAllApps } from "./apps.config";
import { usePerformanceMonitor, performanceMonitor } from "./lib/performanceUtils";

import { motion, AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
// Conditionally import 21st extension only if VSCode integration is needed
// import { TwentyFirstToolbar } from "@21st-extension/toolbar-react";
// import { ReactPlugin } from "@21st-extension/react";

const App: React.FC = () => {
  const windows = useKernel((state) => state.windows);
  const hasWelcomed = useKernel((state) => state.hasWelcomed);
  const setHasWelcomed = useKernel((state) => state.setHasWelcomed);
  const projectFolders = useKernel((state) => state.projectFolders);

  const theme = useKernel((state) => state.theme);

  // Performance monitoring
  usePerformanceMonitor((metrics) => {
    if (metrics.fps < 30) {
      console.warn(`Performance warning: ${metrics.fps}fps`);
    }
    if (metrics.memoryUsage && metrics.memoryUsage > 150) {
      console.warn(`Memory usage high: ${metrics.memoryUsage}MB`);
    }
  });

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
          className="h-screen w-screen overflow-hidden bg-black font-sans"
        >
          <Desktop>
            {windows.map((win) => {
              const allApps = getAllApps(projectFolders);
              const appDef = allApps.find(app => app.id === win.appId);
              const App = appDef?.component;
              if (!App) return null;
              return (
                <Window key={win.id} {...win}>
                  <Suspense
                    fallback={<div className="p-4">Loading App...</div>}
                  >
                    <App metadata={win.metadata} />
                  </Suspense>
                </Window>
              );
            })}
          </Desktop>

          <Sidebar />
          <Taskbar />
          <VoiceAssistant />
          <VoiceAssistantOverlay />
          {/* TwentyFirstToolbar disabled to prevent WebSocket reconnection lag */}
          {/* <TwentyFirstToolbar config={{ plugins: [ReactPlugin] }} /> */}
        </motion.div>
      )}
      <Analytics />
    </AnimatePresence>
  );
};

export default App;
