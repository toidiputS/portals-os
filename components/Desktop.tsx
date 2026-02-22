import React, { useState, useEffect, useRef } from "react";
import "./Desktop.css";
import { useKernel } from "../store/kernel";
import ContextMenu from "./ContextMenu";
import MatrixRain from "./MatrixRain";
import Taskbar from "./Taskbar";
import SphereImageGrid from "./SphereImageGrid";
import { FlowingLight } from "./FlowingLight";

import { PortalLayout } from "./PortalLayout";
import SpeedBumpTaskbar from "./SpeedBumpTaskbar";
import { CircleMenu } from "./CircleMenu";
import StartMenuCircle from "./StartMenuCircle";
import SystemTray from "./SystemTray";
import { PORTAL_BACKGROUNDS } from "../constants";
import { PLATOON_SQUADS } from "../constants/platoon";
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

  // Active Squad ID for the bottom taskbar
  const [activeSquadId, setActiveSquadId] = useState<string | null>(null);
  const [displayedSquad, setDisplayedSquad] = useState<any>(null);
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

  useEffect(() => {
    if (activeSquadId) {
      if (isCircleMenuOpen && displayedSquad?.id !== activeSquadId) {
        // Close current menu first
        setIsCircleMenuOpen(false);
        // Wait for close animation to finish before swapping items
        setTimeout(() => {
          setDisplayedSquad(PLATOON_SQUADS.find(s => s.id === activeSquadId) || null);
          setIsCircleMenuOpen(true);
        }, 800); // delay allows spiral animation to complete
      } else {
        setDisplayedSquad(PLATOON_SQUADS.find(s => s.id === activeSquadId) || null);
        setIsCircleMenuOpen(true);
      }
    } else {
      setIsCircleMenuOpen(false);
    }
  }, [activeSquadId]);

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

    // Close menus if clicking desktop background
    setIsAppMenuOpen(false);
    setActiveSquadId(null);
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

        <FlowingLight className="absolute inset-0 z-10 pointer-events-none bg-transparent" />

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

        {/* Speed Bump Taskbar - 10 Squads at the feet */}
        <SpeedBumpTaskbar
          onStartMenuClick={() => {
            setIsAppMenuOpen(!isAppMenuOpen);
            setActiveSquadId(null); // Ensure mutually exclusive
          }}
          isStartMenuOpen={isAppMenuOpen}
          activeSquadId={activeSquadId}
          onSquadClick={(squadId) => {
            setActiveSquadId(activeSquadId === squadId ? null : squadId);
            setIsAppMenuOpen(false); // Ensure mutually exclusive
          }}
        />

        {/* CircleMenu - spirals up into the portal when a Squad is activated */}
        {(() => {
          if (!displayedSquad) return null;

          const menuItems = displayedSquad.nodes.map((node: any) => ({
            label: node.name,
            icon: <span className="text-sm font-bold truncate px-1">{node.id}</span>,
            href: '#', // In the future, this could link to the specific node's view
            colorHex: displayedSquad.colorHex,
          }));

          return (
            <CircleMenu
              items={menuItems}
              isOpen={isCircleMenuOpen}
              setIsOpen={(open) => !open && setActiveSquadId(null)}
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
