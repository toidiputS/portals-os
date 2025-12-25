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
import {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
  W,
  X,
  Y,
  Z,
} from "./icons";

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

  // Auto-cycle background every 60 seconds (reduced frequency for performance)
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % PORTAL_BACKGROUNDS.length);
    }, 60000);

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
      setSphereKey((prev) => prev + 1);
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
        className={`wallpaper absolute inset-5 bg-cover bg-center transition-transform duration-300 ease-out ${
          isMatrixEffectActive ? "matrix-effect" : ""
        }`}
      />

      <SphereImageGrid
        key={sphereKey}
        apps={(() => {
          const allApps = getAllApps(projectFolders);
          // Filter out all alphabet apps (a-z) except "c" (calculator) - they will be replaced with agent icons
          const coreApps = allApps.filter((app) => !["a", "b", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].includes(app.id));

          // Add all agent apps with glassmorphic icons (keeping Calculator C as original)
          const agentApps = [
            {
              id: "a" as const,
              name: "Angle",
              icon: A,
              description: "Audience Analysis Agent",
            },
            {
              id: "b" as const,
              name: "Blueprint",
              icon: B,
              description: "Blueprint Design Agent",
            },
            {
              id: "d" as const,
              name: "Draft",
              icon: D,
              description: "Content Drafting Agent",
            },
            {
              id: "e" as const,
              name: "Envoy",
              icon: E,
              description: "Outreach Communication Agent",
            },
            {
              id: "f" as const,
              name: "Flo",
              icon: F,
              description: "Content Flow Agent",
            },
            {
              id: "g" as const,
              name: "Grind",
              icon: G,
              description: "Operations Grind Agent",
            },
            {
              id: "h" as const,
              name: "Halo",
              icon: H,
              description: "Digital Halo Agent",
            },
            {
              id: "i" as const,
              name: "Insight",
              icon: I,
              description: "Analytics Insight Agent",
            },
            {
              id: "j" as const,
              name: "Judge",
              icon: J,
              description: "Legal Judge Agent",
            },
            {
              id: "k" as const,
              name: "Kite",
              icon: K,
              description: "Cloud Kite Agent",
            },
            {
              id: "l" as const,
              name: "Lumen",
              icon: L,
              description: "Life Lumen Agent",
            },
            {
              id: "m" as const,
              name: "Matrix",
              icon: M,
              description: "Markets Matrix Agent",
            },
            {
              id: "n" as const,
              name: "Nexus",
              icon: N,
              description: "Networks Nexus Agent",
            },
            {
              id: "o" as const,
              name: "Oracle",
              icon: O,
              description: "Oracle Agent",
            },
            {
              id: "p" as const,
              name: "Pixel",
              icon: P,
              description: "Photo Pixel Agent",
            },
            {
              id: "q" as const,
              name: "Quest",
              icon: Q,
              description: "Quest Agent",
            },
            {
              id: "r" as const,
              name: "Rise",
              icon: R,
              description: "Robots Rise Agent",
            },
            {
              id: "s" as const,
              name: "Spark",
              icon: S,
              description: "Systems Spark Agent",
            },
            {
              id: "t" as const,
              name: "Thread",
              icon: T,
              description: "Threads Agent",
            },
            {
              id: "u" as const,
              name: "Unity",
              icon: U,
              description: "Unified Unity Agent",
            },
            {
              id: "v" as const,
              name: "Vector",
              icon: V,
              description: "Video Vector Agent",
            },
            {
              id: "w" as const,
              name: "Wave",
              icon: W,
              description: "Worlds Wave Agent",
            },
            {
              id: "x" as const,
              name: "Xenon",
              icon: X,
              description: "Experiments Xenon Agent",
            },
            {
              id: "y" as const,
              name: "Yonder",
              icon: Y,
              description: "Your Yonder Agent",
            },
            {
              id: "z" as const,
              name: "Zenith",
              icon: Z,
              description: "Zone Zenith Agent",
            },
          ];

          // Combine core apps with agent apps
          const combinedApps = [...coreApps, ...agentApps];

          // Put Oracle first for center positioning
          const oracleIndex = combinedApps.findIndex(
            (app) => app.id === "oracle"
          );
          if (oracleIndex > 0) {
            const oracle = combinedApps.splice(oracleIndex, 1)[0];
            combinedApps.unshift(oracle);
          }

          return combinedApps;
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
        className={`ai-indicator fixed top-4 right-4 h-6 w-6 rounded-full bg-[hsl(var(--accent-hsl))] transition-all duration-500 ease-in-out z-30 ${
          gemini.isLoading
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
