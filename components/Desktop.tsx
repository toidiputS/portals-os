import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { ORACLE_NODE, PLATOON_DOMAINS } from "../constants/platoon";
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
  const openSquadSidebar = useKernel((state) => state.openSquadSidebar);
  const favoriteNodes = useKernel((state) => state.favoriteNodes);

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

  const [activeDomainId, setActiveDomainId] = useState<string | null>(null);

  // Derived array of active menu items for the main portal ring
  const menuItems = React.useMemo(() => {
    if (!activeDomainId) return [];

    const domain = PLATOON_DOMAINS.find(d => d.id === activeDomainId);
    if (!domain) return [];

    return domain.nodes
      .filter((node: any) => !favoriteNodes.includes(node.id))
      .map((node: any) => ({
        label: node.name,
        icon: <span className="text-sm font-bold truncate px-1">{node.id}</span>,
        href: '#',
        colorHex: domain.colorHex,
        domainId: domain.id,
        nodeData: node, // Pass full node data
      }))
      .sort((a: any, b: any) => a.nodeData.id.localeCompare(b.nodeData.id));
  }, [activeDomainId, favoriteNodes]);

  const toggleOrbitDomain = useCallback((id: string) => {
    setActiveDomainId(prev => {
      if (prev === id) {
        // Turning OFF
        setIsCircleMenuOpen(false);
        // Wait for exit animation before truly emptying to preserve DOM nodes
        setTimeout(() => {
          setActiveDomainId(null);
        }, 1400);
        return prev;
      } else {
        // Turning ON
        setIsCircleMenuOpen(true);
        return id;
      }
    });
  }, []);

  // Find all favorite nodes across all domains to render as stars
  const favoriteNodeData = React.useMemo(() => {
    return favoriteNodes.map(nodeId => {
      for (const domain of PLATOON_DOMAINS) {
        const found = domain.nodes.find((n: any) => n.id === nodeId);
        if (found) {
          return { ...found, domainColor: domain.colorHex, domainName: domain.name };
        }
      }
      return null;
    }).filter(Boolean);
  }, [favoriteNodes]);

  // Update bgIndex when wallpaper changes externally (e.g., from settings)
  useEffect(() => {
    const index = PORTAL_BACKGROUNDS.indexOf(wallpaper);
    if (index >= 0 && index !== bgIndex) {
      setBgIndex(index);
    }
  }, [wallpaper]);

  // Sync CircleMenu with Domain selection (Removed auto-effect to allow toggleOrbitDomain timeout control)

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

        <FlowingLight
          className="absolute inset-0 z-10 pointer-events-none bg-transparent"
        />

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

        {/* Speed Bump Taskbar - 10 Domains at the feet */}
        <SpeedBumpTaskbar
          onStartMenuClick={() => {
            setIsAppMenuOpen(!isAppMenuOpen);
          }}
          isStartMenuOpen={isAppMenuOpen}
          activeDomainIds={activeDomainId ? [activeDomainId] : []}
          onDomainClick={(domainId) => {
            // Speedbumps now ONLY open the Sidebar Lobby. They do NOT instantly spawn nodes.
            openSquadSidebar(domainId);
            setIsAppMenuOpen(false); // Ensure mutually exclusive
          }}
        />

        {/* Render Favorite Stars */}
        {favoriteNodeData.map((node: any) => {
          if (!node) return null;
          // Deterministic random position based on ID string characters
          const seed = node.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);

          // Distribute stars seamlessly using golden angle approximation
          const angle = (seed * 137.5) * (Math.PI / 180);

          // Radius between 60px and min(windowHeight * 0.3) so they stay inside the inner void
          // Fallback to 200px max if window is undefined initially
          const maxR = typeof window !== 'undefined' ? Math.min(window.innerHeight * 0.3, 300) : 200;
          const r = 40 + ((seed * 43) % maxR);

          const dx = Math.cos(angle) * r;
          const dy = Math.sin(angle) * r;

          return (
            <div
              key={`star-${node.id}`}
              className="absolute top-1/2 left-1/2 z-45 rounded-full cursor-pointer hover:scale-[1.8] transition-all duration-300 group"
              style={{
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px - 32px))`, // -32px is rough vertical center offset from Desktop logic
                width: '12px',
                height: '12px',
                background: node.domainColor ? `radial-gradient(circle at center, #fff 0%, ${node.domainColor} 60%, transparent 100%)` : '#fff',
                boxShadow: `0 0 15px ${node.domainColor || '#fff'}, 0 0 30px ${node.domainColor || '#fff'}`,
              }}
              title={node.name}
              onClick={() => {
                openPwaSidebar({
                  id: node.id,
                  label: node.name,
                  parentLabel: node.domainName,
                  role: node.role,
                  pain: node.pain,
                  artifact: node.artifact,
                  purpose: node.purpose,
                  mission: node.mission,
                  preFlight: node.preFlight,
                  inputs: node.inputs,
                  deliverables: node.deliverables,
                  oracleInsight: node.oracleInsight,
                  prevNode: node.prevNode,
                  nextNode: node.nextNode,
                });
              }}
            >
              <span className="text-[10px] text-white absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-2 py-0.5 rounded-md pointer-events-none">
                {node.id}
              </span>
            </div>
          );
        })}

        {/* CircleMenu - spirals up into the portal when a Domain is activated */}
        {(() => {
          // Keep render alive until both the array is empty AND the exit animation finishes
          const shouldRender = menuItems.length > 0 || isCircleMenuOpen;

          if (!shouldRender) return null;

          return (
            <CircleMenu
              items={menuItems}
              isOpen={isCircleMenuOpen}
              setIsOpen={(open) => {
                if (!open) {
                  // Delay clearing active domains and closing sidebar to allow exit animation to complete
                  const closeTime = 1400; // Match CircleMenu's exit animation duration
                  setTimeout(() => {
                    setActiveDomainId(null);
                    closeSidebar();
                  }, closeTime);
                }
              }}
              showTrigger={false}
              onGrandchildClick={(item: any) => {
                if (item.nodeData) {
                  const itemData = item.nodeData;
                  if (!itemData) return;
                  if (itemData.id === 'O') {
                    // Oracle opens directly to its PWA
                    window.open('https://oracle.itsyouonline.com', '_blank');
                  } else {
                    openPwaSidebar({
                      id: itemData.id,
                      label: itemData.name,
                      parentLabel: itemData.domainName || PLATOON_DOMAINS.find(d => d.id === activeDomainId)?.name,
                      role: itemData.role,
                      pain: itemData.pain,
                      artifact: itemData.artifact,
                      purpose: itemData.purpose,
                      mission: itemData.mission,
                      preFlight: itemData.preFlight,
                      inputs: itemData.inputs,
                      deliverables: itemData.deliverables,
                      oracleInsight: itemData.oracleInsight,
                      prevNode: itemData.prevNode,
                      nextNode: itemData.nextNode,
                    });
                  }
                }
              }}
            />
          );
        })()}
      </main>
    </PortalLayout>
  );
};

export default Desktop;
