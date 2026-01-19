import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKernel } from "../store/kernel";
import { AppWindow, Sparkles } from "lucide-react";

const Sidebar: React.FC = () => {
  const isSidebarOpen = useKernel((state) => state.isSidebarOpen);
  const selectedPwa = useKernel((state) => state.selectedPwa);
  const closeSidebar = useKernel((state) => state.closeSidebar);

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-0 left-0 bottom-12 w-80 bg-[hsl(var(--taskbar-bg-hsl)/0.7)] taskbar-blur border-r border-[hsl(var(--border-hsl))] p-4 shadow-2xl z-10000 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <AppWindow className="w-5 h-5 text-purple-400" />
              PWA's
            </h2>
            <button
              onClick={closeSidebar}
              className="p-1 hover:bg-white/10 rounded transition-colors text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>

          {selectedPwa ? (
            <div className="flex-1 flex flex-col gap-4">
              {/* PWA Feature Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{selectedPwa.label}</h3>
                    <p className="text-sm text-white/60">Agent: {selectedPwa.parentLabel}</p>
                  </div>
                </div>

                <p className="text-sm text-white/80 mb-4">
                  A PWA tool from the {selectedPwa.parentLabel} agent. Click to launch and interact with this tool.
                </p>

                <button
                  className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all"
                  onClick={() => {
                    // Future: Open actual PWA window
                    console.log('Launch PWA:', selectedPwa);
                  }}
                >
                  Launch PWA
                </button>
              </motion.div>

              {/* Additional info */}
              <div className="text-xs text-white/40">
                <p>ID: {selectedPwa.id}</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-white/40 text-sm">
              <p>Select a PWA tool from the Circle Menu</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
