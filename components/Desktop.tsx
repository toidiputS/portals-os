import React, { useState, useEffect, useRef } from "react";
import "./Desktop.css";
import { useKernel } from "../store/kernel";
import SphereImageGrid from "./SphereImageGrid"; // Import SphereImageGrid
import ContextMenu from "./ContextMenu";
import MatrixRain from "./MatrixRain";

import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import { getAllApps } from "../apps.config";
import { PORTAL_BACKGROUNDS } from "../constants";

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
}

const Desktop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wallpaper = useKernel((state) => state.wallpaper);
  const setWallpaper = useKernel((state) => state.setWallpaper);
  const openWindow = useKernel((state) => state.openWindow);
  const closeStartMenu = useKernel((state) => state.closeStartMenu);
  const gemini = useKernel((state) => state.gemini);
  const isMatrixEffectActive = useKernel((state) => state.isMatrixEffectActive);
  const toggleMatrixEffect = useKernel((state) => state.toggleMatrixEffect);
  const closeSidebar = useKernel((state) => state.closeSidebar);
  const theme = useKernel((state) => state.theme);
  const projectFolders = useKernel((state) => state.projectFolders);

  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
  });
  const [sphereKey, setSphereKey] = useState(0); // Force re-render on resize

  // Initialize bgIndex based on current wallpaper in store, or default to 0
  const [bgIndex, setBgIndex] = useState(() => {
    const index = PORTAL_BACKGROUNDS.indexOf(wallpaper);
    return index >= 0 ? index : 0;
  });

  // Update bgIndex when wallpaper changes externally (e.g., from settings)
  useEffect(() => {
    const index = PORTAL_BACKGROUNDS.indexOf(wallpaper);
    if (index >= 0 && index !== bgIndex) {
      setBgIndex(index);
    }
  }, [wallpaper]);
  const wallpaperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wallpaperRef.current) return;

    // Set the new background immediately
    wallpaperRef.current.style.setProperty(
      "--wallpaper-url",
      `url(${PORTAL_BACKGROUNDS[bgIndex]})`
    );

    // Sync with global store
    if (wallpaper !== PORTAL_BACKGROUNDS[bgIndex]) {
      setWallpaper(PORTAL_BACKGROUNDS[bgIndex]);
    }
  }, [bgIndex, setWallpaper, wallpaper]);

  // Auto-cycle background every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % PORTAL_BACKGROUNDS.length);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const nextWallpaper = () => {
    setBgIndex((prev) => (prev + 1) % PORTAL_BACKGROUNDS.length);
  };



  // Disabled parallax effect to keep sphere in fixed position
  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     if (!wallpaperRef.current || isMatrixEffectActive) return;
  //     const { clientX, clientY } = e;
  //     const { innerWidth, innerHeight } = window;
  //     const moveX = (clientX / innerWidth - 0.5) * 30;
  //     const moveY = (clientY / innerHeight - 0.5) * 30;
  //     wallpaperRef.current.style.transform = `translate(${-moveX}px, ${-moveY}px) scale(1.05)`;
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // }, [isMatrixEffectActive]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMatrixEffectActive) {
        toggleMatrixEffect(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMatrixEffectActive, toggleMatrixEffect]);

  // Handle window resize (including zoom) to keep sphere centered
  useEffect(() => {
    const handleResize = () => {
      setSphereKey(prev => prev + 1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
    closeStartMenu();
    closeSidebar();
  };

  const handleClick = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
    closeStartMenu();
    closeSidebar();
  };

  return (
    <main
      className={`absolute inset-0 h-full w-full ${theme}`}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      {isMatrixEffectActive && <MatrixRain />}
      <div
        ref={wallpaperRef}
        className={`wallpaper absolute inset-5 bg-cover bg-center transition-transform duration-300 ease-out ${isMatrixEffectActive ? "matrix-effect" : ""
          }`}
      />

      <SphereImageGrid
        key={sphereKey}
        apps={(() => {
          const allApps = getAllApps(projectFolders);
          // Put Oracle first for center positioning
          const oracleIndex = allApps.findIndex(app => app.id === 'oracle');
          if (oracleIndex > 0) {
            const oracle = allApps.splice(oracleIndex, 1)[0];
            allApps.unshift(oracle);
          }
          return allApps;
        })()}
        onAppClick={openWindow}
        containerSize={Math.min(window.innerWidth, window.innerHeight) * 0.8}
        sphereRadius={Math.min(window.innerWidth, window.innerHeight) * 0.25}
        autoRotate={true}
      />



      {children}

      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu({ ...contextMenu, visible: false })}
          onNextWallpaper={nextWallpaper}
        />
      )}

      {/* AI Presence Indicator */}
      <div
        className={`ai-indicator fixed top-4 right-4 h-6 w-6 rounded-full bg-[hsl(var(--accent-hsl))] transition-all duration-500 ease-in-out z-30 ${gemini.isLoading
          ? "opacity-100 scale-100 loading"
          : "opacity-0 scale-0"
          }`}
      />

      <StartMenu />
      <Taskbar />
    </main>
  );
};

export default Desktop;
