import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SphereImageGrid, { AppDefinition } from "./SphereImageGrid";
import { NexusAgent, NexusSquad, getAgentsBySquad, CATEGORY_COLORS } from "../constants/platoon";
import { AppId } from "../types";

/**
 * SquadSphere — Overlay that re-uses SphereImageGrid to display
 * squad agents inside a full-screen 3D sphere.
 *
 * Clicking a speed bump opens this overlay. The agents appear inside
 * the same SphereImageGrid component used on the Desktop, but scoped
 * to one squad at a time.
 */

// ==========================================
// Tiny icon component factory — turns an emoji string into a
// React component that SphereImageGrid can render.
// ==========================================
const makeEmojiIcon = (emoji: string, color: string) => {
  const EmojiIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div
      className={`flex items-center justify-center w-full h-full rounded-full ${className || ''}`}
      style={{
        background: `radial-gradient(circle at 30% 30%, ${color}50, ${color}20 70%, transparent)`,
        border: `2px solid ${color}60`,
      }}
    >
      <span className="text-xl select-none">{emoji}</span>
    </div>
  );
  EmojiIcon.displayName = `EmojiIcon(${emoji})`;
  return EmojiIcon;
};

// ==========================================
// COMPONENT
// ==========================================

interface SquadSphereProps {
  squad: NexusSquad;
  isOpen: boolean;
  onClose: () => void;
  onAgentClick: (agent: NexusAgent) => void;
  originX?: number;
  originY?: number;
}

export const SquadSphere: React.FC<SquadSphereProps> = ({
  squad,
  isOpen,
  onClose,
  onAgentClick,
}) => {
  const agents = useMemo(() => getAgentsBySquad(squad.id), [squad.id]);

  // Map NexusAgent[] → AppDefinition[] so SphereImageGrid can render them
  const agentApps: AppDefinition[] = useMemo(() => {
    return agents.map((agent) => {
      const catColor = CATEGORY_COLORS[agent.category] || squad.colorHex;
      const emoji = agent.icon.startsWith("/") ? "🔷" : agent.icon;

      return {
        id: agent.id as AppId,
        name: agent.name,
        title: agent.role,
        icon: makeEmojiIcon(emoji, catColor),
        description: agent.description,
      };
    });
  }, [agents, squad.colorHex]);

  // Look up the original NexusAgent from an AppId click
  const handleAppClick = (appId: AppId) => {
    const agent = agents.find((a) => a.id === appId);
    if (agent) onAgentClick(agent);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[900] flex flex-col items-center justify-end pb-[8vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop — transparent so portal shows through */}
          <motion.div
            className="absolute inset-0"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Header */}
          <motion.div
            className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.15 }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: squad.colorHex, boxShadow: `0 0 12px ${squad.colorHex}` }}
            />
            <h2 className="text-white font-black text-xl tracking-widest uppercase">
              {squad.name}
            </h2>
            <span className="text-white/40 text-xs font-mono">
              {agents.length} AGENTS
            </span>
            <button
              onClick={onClose}
              className="ml-4 p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-white/60" />
            </button>
          </motion.div>

          {/* Re-use SphereImageGrid with agent data */}
          <motion.div
            className="relative z-[5]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.05 }}
          >
            <SphereImageGrid
              apps={agentApps}
              onAppClick={handleAppClick}
              containerSize={600}
              sphereRadius={320}
              autoRotate={true}
              autoRotateSpeed={0.25}
              className="squad-sphere-instance"
            />
          </motion.div>

          {/* Category legend */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-3 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
          >
            {Object.entries(
              agents.reduce<Record<string, number>>((acc, a) => {
                acc[a.category] = (acc[a.category] || 0) + 1;
                return acc;
              }, {})
            )
              .sort((a, b) => b[1] - a[1])
              .map(([cat, count]) => (
                <span
                  key={cat}
                  className="text-[10px] font-mono tracking-wider px-2 py-1 rounded-full border"
                  style={{
                    color: CATEGORY_COLORS[cat] || "#fff",
                    borderColor: `${CATEGORY_COLORS[cat] || "#fff"}40`,
                    background: `${CATEGORY_COLORS[cat] || "#fff"}10`,
                  }}
                >
                  {cat} ({count})
                </span>
              ))}
          </motion.div>
        </motion.div>
      )
      }
    </AnimatePresence >
  );
};

export default SquadSphere;
