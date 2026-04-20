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
import { SquadSphere } from "./SquadSphere";
import { AllAgentsPanel } from "./AllAgentsPanel";
import StartMenuCircle from "./StartMenuCircle";
import SystemTray from "./SystemTray";
import { PORTAL_BACKGROUNDS } from "../constants";
import { ORACLE_NODE, NEXUS_SQUADS, NEXUS_AGENTS, getSquadById, NexusAgent, CATEGORY_COLORS } from "../constants/platoon";
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
  const favoriteNodes = useKernel((state) => state.favoriteNodes);

  // Ref for the sphere container
  const sphereContainerRef = useRef<HTMLDivElement>(null);

  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
  });

  // Active Squad ID for the SquadSphere
  const [activeSquadId, setActiveSquadId] = useState<string | null>(null);
  const [squadOrigin, setSquadOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // App Menu state (circular app spawner from Taskbar)
  const [isAppMenuOpen, setIsAppMenuOpen] = useState(false);

  // Oracle Chat state
  const [isOracleChatOpen, setIsOracleChatOpen] = useState(false);

  // All Agents Directory
  const [isAllAgentsOpen, setIsAllAgentsOpen] = useState(false);

  // Initialize bgIndex based on current wallpaper in store, or default to 0
  const [bgIndex, setBgIndex] = useState(() => {
    const index = PORTAL_BACKGROUNDS.indexOf(wallpaper);
    return index >= 0 ? index : 0;
  });

  // Find all favorite nodes across all agents to render as stars
  const favoriteNodeData = React.useMemo(() => {
    return favoriteNodes.map(nodeId => {
      const agent = NEXUS_AGENTS.find(a => a.id === nodeId);
      if (!agent) return null;
      const squad = NEXUS_SQUADS.find(s => s.agentIds.includes(nodeId));
      return { ...agent, domainColor: squad?.colorHex || CATEGORY_COLORS[agent.category] || '#fff', squadName: squad?.name || agent.category };
    }).filter(Boolean);
  }, [favoriteNodes]);

  // Active squad data for SquadSphere
  const activeSquad = activeSquadId ? getSquadById(activeSquadId) : null;

  // Handle squad click from speed bumps
  const handleSquadClick = useCallback((squadId: string, buttonRect?: DOMRect) => {
    if (activeSquadId === squadId) {
      setActiveSquadId(null);
    } else {
      if (buttonRect) {
        setSquadOrigin({
          x: buttonRect.left + buttonRect.width / 2,
          y: buttonRect.top + buttonRect.height / 2,
        });
      }
      setActiveSquadId(squadId);
      setIsAppMenuOpen(false);
      closeSidebar();
    }
  }, [activeSquadId, closeSidebar]);

  // Handle agent click from SquadSphere → open sidebar
  const handleAgentClick = useCallback((agent: NexusAgent) => {
    const squad = NEXUS_SQUADS.find(s => s.agentIds.includes(agent.id));
    openPwaSidebar({
      id: agent.id,
      label: agent.name,
      parentLabel: squad?.name || agent.category,
      role: agent.role,
      pain: agent.toolCard?.useThisWhen?.join('; ') || '',
      artifact: agent.toolCard?.outputDelivered?.join(', ') || '',
      purpose: agent.toolCard?.purpose || agent.description,
      mission: agent.description,
      preFlight: {
        deployWhen: agent.toolCard?.useThisWhen?.join(', ') || '',
        abstainWhen: agent.toolCard?.doNotUseWhen?.join(', ') || '',
      },
      inputs: agent.toolCard?.inputNeeded || '',
      deliverables: agent.toolCard?.outputDelivered || [],
      oracleInsight: agent.oracleInsight,
      prevNode: agent.suggestedPreviousNode || '',
      nextNode: agent.suggestedNextNode || '',
    });
  }, [openPwaSidebar]);

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
      if (e.key === "Escape" && activeSquadId) {
        setActiveSquadId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMatrixEffectActive, toggleMatrixEffect, activeSquadId]);

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

        {/* Speed Bump Taskbar - 10 Squads at the feet */}
        <SpeedBumpTaskbar
          onStartMenuClick={() => {
            setIsAppMenuOpen(!isAppMenuOpen);
          }}
          isStartMenuOpen={isAppMenuOpen}
          activeSquadId={activeSquadId}
          onSquadClick={handleSquadClick}
          onAllAgentsClick={() => {
            setIsAllAgentsOpen(true);
            setActiveSquadId(null);
            setIsAppMenuOpen(false);
          }}
        />

        {/* Render Favorite Stars (Linked to the Central Portal) */}
        {favoriteNodeData.map((node: any) => {
          if (!node) return null;
          // Deterministic random position based on ID string characters
          const seed = node.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);

          // Distribute stars seamlessly using golden angle approximation
          const angle = (seed * 137.5) * (Math.PI / 180);

          // Radius between 60px and 250px to keep them clustered inside the portal ring
          const maxR = typeof window !== 'undefined' ? Math.min(window.innerHeight * 0.25, 250) : 200;
          const r = 60 + ((seed * 43) % maxR);

          const dx = Math.cos(angle) * r;
          const dy = Math.sin(angle) * r;

          return (
            <motion.div
              key={`star-${node.id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: 1
              }}
              transition={{ 
                scale: { 
                  duration: 2 + (seed % 3), 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                },
                opacity: { duration: 0.5 }
              }}
              className="absolute top-1/2 left-1/2 z-50 cursor-pointer group"
              style={{
                transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px - 32px))`,
                width: '14px',
                height: '14px',
              }}
              // Larger invisible hover area for ONE orb interaction
              data-one={`${node.name} — ${node.role}. ${node.description}. Click to open forensic dossier.`}
              onClick={(e) => {
                e.stopPropagation();
                handleAgentClick(node as NexusAgent);
              }}
            >
              <div 
                className="w-full h-full rounded-full transition-all duration-300 group-hover:scale-150"
                style={{
                  background: node.domainColor ? `radial-gradient(circle at center, #fff 0%, ${node.domainColor} 60%, transparent 100%)` : '#fff',
                  boxShadow: `0 0 15px ${node.domainColor || '#fff'}, 0 0 30px ${node.domainColor || '#fff'}`,
                }}
              />
              
              {/* Pulsing outer ring */}
              <div 
                className="absolute inset-0 rounded-full animate-ping opacity-20"
                style={{ backgroundColor: node.domainColor || '#fff' }}
              />

              <span className="text-[10px] text-white absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md px-2 py-1 rounded border border-white/10 pointer-events-none z-50">
                {node.name}
              </span>
            </motion.div>
          );
        })}

        {/* SquadSphere — opens when a squad speed bump is clicked */}
        {activeSquad && (
          <SquadSphere
            squad={activeSquad}
            isOpen={!!activeSquadId}
            onClose={() => setActiveSquadId(null)}
            onAgentClick={handleAgentClick}
            originX={squadOrigin.x}
            originY={squadOrigin.y}
          />
        )}

        {/* All Agents Directory */}
        <AllAgentsPanel
          isOpen={isAllAgentsOpen}
          onClose={() => setIsAllAgentsOpen(false)}
          onAgentClick={(agent) => {
            setIsAllAgentsOpen(false);
            handleAgentClick(agent);
          }}
        />
      </main>
    </PortalLayout>
  );
};

export default Desktop;
