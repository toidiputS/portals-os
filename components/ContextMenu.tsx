import React from "react";
import { motion } from "framer-motion";
import { Image, Settings, Sun, Moon } from "lucide-react";
import { nanoid } from "nanoid";
import { useKernel } from "../store/kernel";
import { GlowCard } from "./GlowCard";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onNextWallpaper?: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onNextWallpaper }) => {
  const setWallpaper = useKernel((state) => state.setWallpaper);
  const openWindow = useKernel((state) => state.openWindow);
  const theme = useKernel((state) => state.theme);
  const toggleTheme = useKernel((state) => state.toggleTheme);

  const changeWallpaper = () => {
    if (onNextWallpaper) {
      onNextWallpaper();
    }
    onClose();
  };

  const openSettings = () => {
    openWindow("settings");
    onClose();
  };

  const handleToggleTheme = () => {
    toggleTheme();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.1 }}
      className="absolute w-52 z-9999"
      style={{ top: y, left: x }}
    >
      <GlowCard glowColor="blue" customSize={true} className="w-full p-1">
        <button
          onClick={changeWallpaper}
          className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-[hsl(var(--popover-foreground-hsl))] rounded hover:bg-[hsl(var(--accent-strong-hsl))] hover:text-[hsl(var(--accent-foreground-hsl))]"
        >
          <Image size={16} />
          <span>Next Desktop Background</span>
        </button>
        <button
          onClick={handleToggleTheme}
          className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-[hsl(var(--popover-foreground-hsl))] rounded hover:bg-[hsl(var(--accent-strong-hsl))] hover:text-[hsl(var(--accent-foreground-hsl))]"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <div className="h-px bg-[hsl(var(--border-hsl))] my-1" />
        <button
          onClick={openSettings}
          className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-[hsl(var(--popover-foreground-hsl))] rounded hover:bg-[hsl(var(--accent-strong-hsl))] hover:text-[hsl(var(--accent-foreground-hsl))]"
        >
          <Settings size={16} />
          <span>Personalize</span>
        </button>
      </GlowCard>
    </motion.div>
  );
};

export default ContextMenu;
