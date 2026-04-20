import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ChevronDown, ChevronRight } from "lucide-react";
import { NEXUS_AGENTS, NEXUS_SQUADS, ALL_CATEGORIES, CATEGORY_COLORS, NexusAgent } from "../constants/platoon";

/**
 * AllAgentsPanel — Full directory of all 166 diagnostic agents.
 *
 * Organized by category with expandable sections, search, and click-to-inspect.
 * Triggered from the Start Menu or a dedicated button.
 */

interface AllAgentsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAgentClick: (agent: NexusAgent) => void;
}

export const AllAgentsPanel: React.FC<AllAgentsPanelProps> = ({
  isOpen,
  onClose,
  onAgentClick,
}) => {
  const [search, setSearch] = useState("");
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(ALL_CATEGORIES));

  const toggleCategory = (cat: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  // Filter agents by search
  const filtered = useMemo(() => {
    if (!search.trim()) return NEXUS_AGENTS;
    const q = search.toLowerCase();
    return NEXUS_AGENTS.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
    );
  }, [search]);

  // Group by category
  const grouped = useMemo(() => {
    const map: Record<string, NexusAgent[]> = {};
    for (const agent of filtered) {
      if (!map[agent.category]) map[agent.category] = [];
      map[agent.category].push(agent);
    }
    return Object.entries(map).sort((a, b) => b[1].length - a[1].length);
  }, [filtered]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[950] flex items-stretch"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full max-w-3xl mx-auto my-8 bg-[#0a0a14]/95 border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
              <div>
                <h2 className="text-lg font-black text-white tracking-widest uppercase">
                  AGENT DIRECTORY
                </h2>
                <p className="text-xs text-white/40 font-mono mt-0.5">
                  {NEXUS_AGENTS.length} AGENTS · {ALL_CATEGORIES.length} CATEGORIES
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>

            {/* Search */}
            <div className="px-6 py-3 border-b border-white/5 shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search agents by name, role, or category…"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-white/20 transition-colors font-mono"
                />
              </div>
            </div>

            {/* Scrollable Agent List by Category */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {grouped.length === 0 ? (
                <div className="text-center text-white/30 text-sm py-16 font-mono">
                  No agents match "{search}"
                </div>
              ) : (
                grouped.map(([category, agents]) => {
                  const catColor = CATEGORY_COLORS[category] || "#6366f1";
                  const isExpanded = expandedCats.has(category);

                  return (
                    <div key={category} className="rounded-xl border border-white/5 overflow-hidden">
                      {/* Category Header */}
                      <button
                        onClick={() => toggleCategory(category)}
                        className="w-full flex items-center gap-3 px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] transition-colors text-left"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-white/40 shrink-0" />
                        )}
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ background: catColor, boxShadow: `0 0 8px ${catColor}60` }}
                        />
                        <span className="text-sm font-bold text-white/90 tracking-wider uppercase flex-1">
                          {category}
                        </span>
                        <span className="text-[10px] font-mono text-white/30 tracking-widest">
                          {agents.length} AGENTS
                        </span>
                      </button>

                      {/* Agent Grid */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3">
                              {agents.map((agent) => {
                                const emoji = agent.icon.startsWith("/") ? "🔷" : agent.icon;
                                const squad = NEXUS_SQUADS.find(s => s.agentIds.includes(agent.id));

                                return (
                                  <motion.button
                                    key={agent.id}
                                    onClick={(e) => { e.stopPropagation(); onAgentClick(agent); }}
                                    data-one={`${agent.name} — ${agent.role}. Category: ${agent.category}.${squad ? ` Squad: ${squad.name}.` : ''} ${agent.description}`}
                                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all text-left group"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    {/* Icon */}
                                    <div
                                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border"
                                      style={{
                                        borderColor: `${catColor}50`,
                                        background: `radial-gradient(circle, ${catColor}25, transparent)`,
                                      }}
                                    >
                                      <span className="text-base">{emoji}</span>
                                    </div>

                                    {/* Text */}
                                    <div className="min-w-0 flex-1">
                                      <p className="text-xs font-bold text-white/90 truncate leading-tight">
                                        {agent.name}
                                      </p>
                                      <p className="text-[10px] text-white/40 truncate leading-tight mt-0.5">
                                        {agent.role}
                                      </p>
                                      {squad && (
                                        <p className="text-[9px] font-mono tracking-wider mt-1 truncate"
                                          style={{ color: `${squad.colorHex}90` }}
                                        >
                                          {squad.name.split(':')[0]}
                                        </p>
                                      )}
                                    </div>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-white/5 shrink-0 flex justify-between items-center">
              <span className="text-[10px] text-white/20 font-mono tracking-widest">
                NEXUS AGENT SYSTEM v2.0
              </span>
              <span className="text-[10px] text-white/20 font-mono">
                {filtered.length} / {NEXUS_AGENTS.length} VISIBLE
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AllAgentsPanel;
