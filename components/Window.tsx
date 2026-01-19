import React, { useMemo, useRef, useEffect, useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { X, Square, Minus, Copy } from "lucide-react";
import { useKernel } from "../store/kernel";
import { WindowInstance } from "../types";
import { APPS } from "../apps.config";
import { GlowCard } from "./GlowCard";

const windowVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  minimized: { opacity: 0, scale: 0.8, y: 300, transition: { duration: 0.2 } },
};

const Window: React.FC<WindowInstance & { children: React.ReactNode }> = ({
  id,
  appId,
  title,
  position,
  size,
  zIndex,
  minimized,
  snapState,
  preSnapSize,
  children,
}) => {
  const focusWindow = useKernel((state) => state.focusWindow);
  const closeWindow = useKernel((state) => state.closeWindow);
  const minimizeWindow = useKernel((state) => state.minimizeWindow);
  const snapWindow = useKernel((state) => state.snapWindow);
  const updateWindowPosition = useKernel((state) => state.updateWindowPosition);
  const updateWindowSize = useKernel((state) => state.updateWindowSize);
  const isMatrixEffectActive = useKernel((state) => state.isMatrixEffectActive);

  const app = useMemo(() => APPS.find((a) => a.id === appId), [appId]);

  // Local state for position and size during drag/resize
  const [localPos, setLocalPos] = useState({ x: position.x, y: position.y });
  const [localSize, setLocalSize] = useState({ width: size.width, height: size.height });

  // Sync local state when props change (e.g. from store updates or snapping)
  useEffect(() => {
    console.log(`[WINDOW] Position update for ${title}: x=${position.x}, y=${position.y}`);
    setLocalPos({ x: position.x, y: position.y });
  }, [position.x, position.y, title]);

  useEffect(() => {
    setLocalSize({ width: size.width, height: size.height });
  }, [size.width, size.height]);

  // Keyboard shortcut to restore maximized window
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && snapState === "maximized") {
        handleMaximizeToggle();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [snapState]);

  const isSnapped = snapState !== "none";

  const handleDragStart = (e: MouseEvent | TouchEvent | PointerEvent) => {
    focusWindow(id);
    if (isSnapped && preSnapSize) {
      const pointerX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;

      // Restore size immediately for visual feedback
      setLocalSize(preSnapSize);

      // Calculate new X to keep mouse relative position proportional
      const currentWidth = size.width;
      const relativeX = pointerX - localPos.x;
      const ratio = relativeX / currentWidth;
      const newX = pointerX - (ratio * preSnapSize.width);

      setLocalPos({ x: newX, y: localPos.y });
    }
  };

  const handleDrag = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setLocalPos(prev => ({
      x: prev.x + info.delta.x,
      y: prev.y + info.delta.y
    }));
  };

  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Check for snap zones
    const pointerX = "touches" in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
    const pointerY = "touches" in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;

    // Maximise (Top edge)
    if (pointerY < 10) return snapWindow(id, "maximized");

    // Side snap
    if (pointerX < 10) return snapWindow(id, "left");
    if (pointerX > screenWidth - 10) return snapWindow(id, "right");

    // Corner snap
    const cornerSnapZone = 20;
    const isTopCorner = pointerY < cornerSnapZone;
    const isBottomCorner = pointerY > screenHeight - 48 - cornerSnapZone;

    if (pointerX < cornerSnapZone && isTopCorner) return snapWindow(id, "topLeft");
    if (pointerX > screenWidth - cornerSnapZone && isTopCorner) return snapWindow(id, "topRight");
    if (pointerX < cornerSnapZone && isBottomCorner) return snapWindow(id, "bottomLeft");
    if (pointerX > screenWidth - cornerSnapZone && isBottomCorner) return snapWindow(id, "bottomRight");

    // If we get here, we are NOT snapping to a zone.
    if (isSnapped) {
      snapWindow(id, "none");
    }

    // Always update position in store
    updateWindowPosition(id, localPos);
  };

  const handleMaximizeToggle = () => {
    snapWindow(id, snapState === "maximized" ? "none" : "maximized");
  };

  const handleResize = (info: PanInfo, direction: string) => {
    let newWidth = localSize.width;
    let newHeight = localSize.height;
    let newX = localPos.x;
    let newY = localPos.y;

    const minWidth = 300;
    const minHeight = 200;

    if (direction.includes("right")) {
      newWidth = Math.max(minWidth, localSize.width + info.delta.x);
    }
    if (direction.includes("bottom")) {
      newHeight = Math.max(minHeight, localSize.height + info.delta.y);
    }
    if (direction.includes("left")) {
      const updatedWidth = localSize.width - info.delta.x;
      if (updatedWidth >= minWidth) {
        newWidth = updatedWidth;
        newX = localPos.x + info.delta.x;
      }
    }
    if (direction.includes("top")) {
      const updatedHeight = localSize.height - info.delta.y;
      if (updatedHeight >= minHeight) {
        newHeight = updatedHeight;
        newY = localPos.y + info.delta.y;
      }
    }

    setLocalSize({ width: newWidth, height: newHeight });
    setLocalPos({ x: newX, y: newY });
  };

  const handleResizeEnd = () => {
    updateWindowSize(id, localSize);
    updateWindowPosition(id, localPos);
  };

  const Icon = app?.icon;

  return (
    <motion.div
      layout={false}
      variants={windowVariants}
      initial="hidden"
      animate={minimized ? "minimized" : "visible"}
      exit="hidden"
      transition={{ type: "spring", stiffness: 700, damping: 40 }}
      className="absolute flex flex-col"
      style={{
        zIndex,
        filter: isMatrixEffectActive ? "blur(8px)" : "none",
        width: localSize.width,
        height: localSize.height,
        left: localPos.x,
        top: localPos.y,
      }}
      onMouseDownCapture={() => focusWindow(id)}
    >
      <GlowCard
        glowColor="purple"
        customSize={true}
        className="w-full h-full flex flex-col p-0 overflow-hidden"
      >
        <motion.header
          onPanStart={handleDragStart}
          onPan={handleDrag}
          onPanEnd={handleDragEnd}
          onDoubleClick={handleMaximizeToggle}
          className={`h-8 flex items-center justify-between pl-2 select-none shrink-0 border-b ${snapState === "maximized"
            ? "border-white/20"
            : "border-white/10"
            }`}
          style={{
            cursor: "grab",
            touchAction: "none",
            backgroundColor: "hsl(var(--window-header-hsl))",
            color: "hsl(var(--window-header-foreground-hsl))"
          }}
        >
          <div className="flex items-center gap-2 pointer-events-none text-[hsl(var(--window-header-foreground-hsl))]">
            {Icon && <Icon className="w-4 h-4" />}
            <span className="text-sm font-medium">{title}</span>
          </div>
          <div className="flex items-center h-full text-[hsl(var(--foreground-hsl))] pointer-events-auto">
            <button
              type="button"
              onClick={() => minimizeWindow(id)}
              className="px-3 h-full hover:bg-[hsl(var(--secondary-hsl))] transition-colors"
              aria-label="Minimize window"
            >
              <Minus size={16} />
            </button>
            <button
              type="button"
              onClick={handleMaximizeToggle}
              className="px-3 h-full hover:bg-[hsl(var(--secondary-hsl))] transition-colors"
              aria-label={
                snapState === "maximized" ? "Restore window" : "Maximize window"
              }
            >
              {snapState === "maximized" ? (
                <Copy size={14} />
              ) : (
                <Square size={14} />
              )}
            </button>
            <button
              type="button"
              onClick={() => closeWindow(id)}
              className="px-3 h-full hover:bg-[hsl(var(--destructive-hsl))] hover:text-[hsl(var(--destructive-foreground-hsl))] transition-colors"
              aria-label="Close window"
            >
              <X size={16} />
            </button>
          </div>
        </motion.header>
        <main className="flex-1 overflow-auto bg-transparent text-[hsl(var(--foreground-hsl))] relative">
          {children}
        </main>
      </GlowCard>

      {!isSnapped && (
        <>
          {/* Resize Handles */}
          <motion.div
            onPan={(e, info) => handleResize(info, "left")}
            onPanEnd={handleResizeEnd}
            onPointerDown={(e) => e.preventDefault()}
            className="absolute -left-1 top-0 bottom-0 w-3 cursor-ew-resize z-20 select-none"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          />
          <motion.div
            onPan={(e, info) => handleResize(info, "right")}
            onPanEnd={handleResizeEnd}
            onPointerDown={(e) => e.preventDefault()}
            className="absolute -right-1 top-0 bottom-0 w-3 cursor-ew-resize z-20 select-none"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          />
          <motion.div
            onPan={(e, info) => handleResize(info, "top")}
            onPanEnd={handleResizeEnd}
            onPointerDown={(e) => e.preventDefault()}
            className="absolute -top-1 left-0 right-0 h-3 cursor-ns-resize z-20 select-none"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          />
          <motion.div
            onPan={(e, info) => handleResize(info, "bottom")}
            onPanEnd={handleResizeEnd}
            onPointerDown={(e) => e.preventDefault()}
            className="absolute -bottom-1 left-0 right-0 h-3 cursor-ns-resize z-20 select-none"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          />
          <motion.div
            onPan={(e, info) => handleResize(info, "topLeft")}
            onPanEnd={handleResizeEnd}
            onPointerDown={(e) => e.preventDefault()}
            className="absolute -top-1 -left-1 w-4 h-4 cursor-nwse-resize z-30 select-none"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          />
          <motion.div
            onPan={(e, info) => handleResize(info, "topRight")}
            onPanEnd={handleResizeEnd}
            onPointerDown={(e) => e.preventDefault()}
            className="absolute -top-1 -right-1 w-4 h-4 cursor-nesw-resize z-30 select-none"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          />
          <motion.div
            onPan={(e, info) => handleResize(info, "bottomLeft")}
            onPanEnd={handleResizeEnd}
            onPointerDown={(e) => e.preventDefault()}
            className="absolute -bottom-1 -left-1 w-4 h-4 cursor-nesw-resize z-30 select-none"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          />
          <motion.div
            onPan={(e, info) => handleResize(info, "bottomRight")}
            onPanEnd={handleResizeEnd}
            onPointerDown={(e) => e.preventDefault()}
            className="absolute -bottom-1 -right-1 w-4 h-4 cursor-nwse-resize z-30 select-none"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          />
        </>
      )}
    </motion.div>
  );
};

export default Window;
