import React, { useState, useEffect, useRef } from "react";
import "./Desktop.css";
import { useKernel } from "../store/kernel";
import ContextMenu from "./ContextMenu";
import MatrixRain from "./MatrixRain";
import Taskbar from "./Taskbar";
import SphereImageGrid from "./SphereImageGrid";

import { PortalLayout } from "./PortalLayout";
import SpeedBumpTaskbar from "./SpeedBumpTaskbar";
import { CircleMenu } from "./CircleMenu";
import StartMenuCircle from "./StartMenuCircle";
import SystemTray from "./SystemTray";
import { PORTAL_BACKGROUNDS } from "../constants";
import { getSphereApps } from "../apps.config";

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
  const openPwaSidebar = useKernel((state) => state.openPwaSidebar);

  // Ref for the sphere container (for CometPotato)
  const sphereContainerRef = useRef<HTMLDivElement>(null);

  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
  });

  // CircleMenu state for external control
  const [isCircleMenuOpen, setIsCircleMenuOpen] = useState(false);

  // App Menu state (circular app spawner from Taskbar)
  const [isAppMenuOpen, setIsAppMenuOpen] = useState(false);

  // Oracle Chat state
  const [isOracleChatOpen, setIsOracleChatOpen] = useState(false);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMatrixEffectActive) {
        toggleMatrixEffect(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMatrixEffectActive, toggleMatrixEffect]);

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
    <PortalLayout
      backgroundImage={wallpaper}
      portalImage="/assets/images/you.png"
      showPortal={true}
    >
      <main
        className={`absolute inset-0 h-full w-full ${theme}`}
        onContextMenu={handleContextMenu}
        onClick={handleClick}
      >
        {isMatrixEffectActive && <MatrixRain />}

        <div
          ref={sphereContainerRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: 'translateY(20vh) translateX(-5vw)' }}
        >
          <SphereImageGrid
            apps={getSphereApps(projectFolders)}
            onAppClick={(appId) => openWindow(appId)}
            containerSize={800}
            sphereRadius={420}
          />

        </div>

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

        <Taskbar />

        {/* System Tray - bottom-right */}
        <SystemTray />

        {/* Start Menu Circle - pops from left speed bump */}
        <StartMenuCircle
          isOpen={isAppMenuOpen}
          onClose={() => setIsAppMenuOpen(false)}
          onAppClick={(appId) => openWindow(appId)}
        />

        {/* Speed Bump Taskbar - half-exposed buttons at the feet */}
        <SpeedBumpTaskbar
          onCircleMenuClick={() => setIsCircleMenuOpen(!isCircleMenuOpen)}
          isCircleMenuOpen={isCircleMenuOpen}
          onStartMenuClick={() => setIsAppMenuOpen(!isAppMenuOpen)}
          isStartMenuOpen={isAppMenuOpen}
        />

        {/* CircleMenu - spirals up into the portal when activated */}

        {/* CircleMenu - spirals up into the portal when activated */}
        {(() => {
          const grandchildren = [
            { label: 'Sub 1', icon: <span className="text-[10px]">1</span>, href: '#' },
            { label: 'Sub 2', icon: <span className="text-[10px]">2</span>, href: '#' },
            { label: 'Sub 3', icon: <span className="text-[10px]">3</span>, href: '#' },
            { label: 'Sub 4', icon: <span className="text-[10px]">4</span>, href: '#' },
            { label: 'Sub 5', icon: <span className="text-[10px]">5</span>, href: '#' }
          ];
          const vipChildren = [
            ...grandchildren,
            { label: 'BOO (Wiki)', icon: <span className="text-[10px]">W</span>, href: '#' }
          ];
          return (
            <CircleMenu
              items={[
                { label: 'VIP-AIFred', icon: <span className="text-sm font-bold">VIP</span>, href: '#', children: vipChildren },
                { label: 'Alpha', icon: <span className="text-sm font-bold">A</span>, href: '#', children: grandchildren },
                { label: 'Beta', icon: <span className="text-sm font-bold">B</span>, href: '#', children: grandchildren },
                { label: 'Delta', icon: <span className="text-sm font-bold">D</span>, href: '#', children: grandchildren },
                { label: 'Epsilon', icon: <span className="text-sm font-bold">E</span>, href: '#', children: grandchildren },
                { label: 'Gamma', icon: <span className="text-sm font-bold">G</span>, href: '#', children: grandchildren },
                { label: 'Kappa', icon: <span className="text-sm font-bold">Κ</span>, href: '#', children: grandchildren },
                { label: 'Oracle', icon: <span className="text-sm font-bold">ORC</span>, href: '#' },
                { label: 'Lambda', icon: <span className="text-sm font-bold">L</span>, href: '#', children: grandchildren },
                { label: 'Omni', icon: <span className="text-sm font-bold">O</span>, href: '#', children: grandchildren },
                { label: 'Pi', icon: <span className="text-sm font-bold">P</span>, href: '#', children: grandchildren },
                { label: 'Rho', icon: <span className="text-sm font-bold">R</span>, href: '#', children: grandchildren },
                { label: 'Sigma', icon: <span className="text-sm font-bold">S</span>, href: '#', children: grandchildren },
                { label: 'Tau', icon: <span className="text-sm font-bold">Τ</span>, href: '#', children: grandchildren }
              ]}
              isOpen={isCircleMenuOpen}
              setIsOpen={setIsCircleMenuOpen}
              showTrigger={false}
              onGrandchildClick={(pwa) => openPwaSidebar(pwa)}
            />
          );
        })()}
      </main>
    </PortalLayout>
  );
};

export default Desktop;
