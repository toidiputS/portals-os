import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKernel } from "../store/kernel";
import Icon from "./Icon";
import { getCoreApps } from "../apps.config";
import { GlowCard } from "./GlowCard";

const StartMenu: React.FC = () => {
  const isStartMenuOpen = useKernel((state) => state.isStartMenuOpen);
  const openWindow = useKernel((state) => state.openWindow);
  const projectFolders = useKernel((state) => state.projectFolders);

  const allApps = getCoreApps(projectFolders);

  return (
    <AnimatePresence>
      {isStartMenuOpen && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[500px] h-[600px] z-10000"
        >
          <GlowCard glowColor="purple" customSize={true} className="w-full h-full p-6">
            <div className="h-full overflow-y-auto">
              <div className="grid grid-cols-4 gap-4">
                {allApps.map((app) => {

                  return (
                    <Icon
                      key={app.id}
                      app={app}
                      onDoubleClick={() => openWindow(app.id)}
                    />
                  );
                })}
              </div>
            </div>
          </GlowCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StartMenu;
