import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKernel } from "../store/kernel";
import { ExternalLink, ShieldAlert, Target, Lightbulb, Zap, AlertCircle, Info, Star, Rocket } from "lucide-react";
import { NEXUS_SQUADS, NEXUS_AGENTS, CATEGORY_COLORS } from "../constants/platoon";
import { GlowCard } from "./GlowCard";

const Sidebar: React.FC = () => {
  const isSidebarOpen = useKernel((state) => state.isSidebarOpen);
  const selectedPwa = useKernel((state) => state.selectedPwa);
  const closeSidebar = useKernel((state) => state.closeSidebar);
  const openWindow = useKernel((state) => state.openWindow);
  const favoriteNodes = useKernel((state) => state.favoriteNodes);
  const toggleFavoriteNode = useKernel((state) => state.toggleFavoriteNode);

  // Find the squad this agent belongs to
  const parentSquad = selectedPwa
    ? NEXUS_SQUADS.find(s => s.agentIds.includes(selectedPwa.id))
    : null;

  // Find the full agent data from platoon
  const agentData = selectedPwa
    ? NEXUS_AGENTS.find((a: any) => a.id === selectedPwa.id)
    : null;

  const accentColor = agentData
    ? (CATEGORY_COLORS[agentData.category] || parentSquad?.colorHex || '#6366f1')
    : (parentSquad?.colorHex || '#6366f1');

  // Launch the agent's PWA in a windowed iframe
  const handleLaunchAgent = () => {
    if (!agentData || !selectedPwa) return;
    openWindow(selectedPwa.id, { width: 900, height: 650 }, {
      url: agentData.url,
      agentName: agentData.name,
      agentIcon: agentData.icon,
      agentRole: agentData.role,
    });
    closeSidebar();
  };

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0, x: -350 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -350 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-0 left-0 bottom-12 bg-black/90 backdrop-blur-xl border-r border-white/10 shadow-2xl z-[2000] p-6 flex flex-col gap-6 overflow-y-auto font-sans"
          style={{
            boxShadow: selectedPwa ? `inset -4px 0 20px -10px ${accentColor}` : 'none',
            width: typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : '350px',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
            <div>
              <h2 className="text-xl font-bold tracking-widest text-white/90 uppercase">
                {selectedPwa ? "FORENSIC DOSSIER" : "AWAITING INPUT"}
              </h2>
              <p className="text-xs text-white/50 font-mono tracking-widest mt-1">
                STATUS: SECURE CONTEXT
              </p>
            </div>
            <button
              onClick={closeSidebar}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white shrink-0"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 -mr-2 relative">
            {selectedPwa ? (
              <div className="flex flex-col gap-6 font-mono pb-6">
                {/* Visual Node Card */}
                <div className="flex justify-center mb-4">
                  <GlowCard
                    glowColor={parentSquad?.colorName?.toLowerCase() as any || "blue"}
                    customSize={true}
                    width="100%"
                    height="auto"
                    className="p-6 border border-white/10"
                  >
                    <div className="absolute top-0 right-0 p-4 text-5xl font-black text-white/5">{selectedPwa.id}</div>
                    <div className="flex justify-between items-start mb-4 relative z-10 w-full">
                      <div className="flex items-center gap-3">
                        {agentData && (
                          <span className="text-2xl">{agentData.icon.startsWith('/') ? '🔷' : agentData.icon}</span>
                        )}
                        <h3 className="text-2xl font-bold text-white tracking-wider">{selectedPwa.label}</h3>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavoriteNode(selectedPwa.id); }}
                          className="text-white/30 hover:text-yellow-400 transition-colors p-1"
                          data-one={favoriteNodes.includes(selectedPwa.id) ? "Remove from Stars" : "Favorite as Star"}
                        >
                          <Star className={`w-5 h-5 ${favoriteNodes.includes(selectedPwa.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-white/50 tracking-widest uppercase mb-4 relative z-10">ROLE // <span className="text-white/90">{selectedPwa.role || "N/A"}</span></p>

                    {/* Category badge */}
                    {agentData && (
                      <div className="mb-4 relative z-10">
                        <span
                          className="text-[10px] font-mono tracking-wider px-2 py-1 rounded-full border"
                          style={{
                            color: CATEGORY_COLORS[agentData.category] || '#fff',
                            borderColor: `${CATEGORY_COLORS[agentData.category] || '#fff'}40`,
                            background: `${CATEGORY_COLORS[agentData.category] || '#fff'}10`,
                          }}
                        >
                          {agentData.category}
                        </span>
                        {parentSquad && (
                          <span className="text-[10px] font-mono tracking-wider px-2 py-1 rounded-full border ml-2"
                            style={{
                              color: parentSquad.colorHex,
                              borderColor: `${parentSquad.colorHex}40`,
                              background: `${parentSquad.colorHex}10`,
                            }}
                          >
                            {parentSquad.name}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Pain Points */}
                    <div className="bg-red-500/10 border border-red-500/30 p-4 mb-4 rounded relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                        <h4 className="text-[11px] font-bold text-red-400 tracking-widest uppercase">PAIN POINTS ADDRESSED</h4>
                      </div>
                      <p className="text-sm text-red-100/90 leading-relaxed font-sans font-medium">{selectedPwa.pain || "N/A"}</p>
                    </div>

                    {/* Mission & Oracle Insight */}
                    <div className="border-l-2 border-purple-400/50 pl-4 py-2 relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-purple-400 shrink-0" />
                        <h4 className="text-[11px] font-bold text-purple-400 tracking-widest uppercase">MISSION PARAMETERS</h4>
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed mb-3">{selectedPwa.mission || "N/A"}</p>

                      {selectedPwa.oracleInsight && (
                        <div className="bg-white/5 border border-white/10 rounded p-3 italic text-xs text-white/60">
                          "{selectedPwa.oracleInsight}"
                        </div>
                      )}
                    </div>
                  </GlowCard>
                </div>

                {/* Tool Card — how to use this agent */}
                {agentData?.toolCard && (
                  <div className="space-y-3">
                    {/* Purpose */}
                    <div className="bg-white/[0.03] border border-white/10 p-4 rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                        <h4 className="text-[11px] font-bold text-cyan-400 tracking-widest uppercase">PURPOSE</h4>
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed font-sans">{agentData.toolCard.purpose}</p>
                    </div>

                    {/* Use This When */}
                    {agentData.toolCard.useThisWhen?.length > 0 && (
                      <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0" />
                          <h4 className="text-[11px] font-bold text-emerald-400 tracking-widest uppercase">USE THIS WHEN</h4>
                        </div>
                        <ul className="space-y-1">
                          {agentData.toolCard.useThisWhen.map((item: string, idx: number) => (
                            <li key={idx} className="text-sm text-emerald-100/80 font-sans flex items-start gap-2">
                              <span className="text-emerald-500/60 mt-1">▸</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Input Needed */}
                    {agentData.toolCard.inputNeeded && (
                      <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                          <h4 className="text-[11px] font-bold text-amber-400 tracking-widest uppercase">INPUT NEEDED</h4>
                        </div>
                        <p className="text-sm text-amber-100/80 font-sans">{agentData.toolCard.inputNeeded}</p>
                      </div>
                    )}

                    {/* Output Delivered */}
                    {agentData.toolCard.outputDelivered?.length > 0 && (
                      <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <Rocket className="w-4 h-4 text-blue-400 shrink-0" />
                          <h4 className="text-[11px] font-bold text-blue-400 tracking-widest uppercase">OUTPUT DELIVERED</h4>
                        </div>
                        <ul className="space-y-1">
                          {agentData.toolCard.outputDelivered.map((item: string, idx: number) => (
                            <li key={idx} className="text-sm text-blue-100/80 font-sans flex items-start gap-2">
                              <span className="text-blue-500/60 mt-1">▸</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Do Not Use When */}
                    {agentData.toolCard.doNotUseWhen?.length > 0 && (
                      <div className="bg-red-500/5 border border-red-500/20 p-4 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                          <h4 className="text-[11px] font-bold text-red-400 tracking-widest uppercase">DO NOT USE WHEN</h4>
                        </div>
                        <ul className="space-y-1">
                          {agentData.toolCard.doNotUseWhen.map((item: string, idx: number) => (
                            <li key={idx} className="text-sm text-red-100/80 font-sans flex items-start gap-2">
                              <span className="text-red-500/60 mt-1">✕</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* LAUNCH AGENT Button */}
                <div className="mt-4 pt-4 border-t border-white/10 shrink-0">
                  <button
                    onClick={handleLaunchAgent}
                    className="w-full py-4 bg-white text-black font-black tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-2xl hover:bg-gray-200 active:scale-[0.98] shrink-0"
                    data-one={`Launch ${selectedPwa.label}. Opens the ${selectedPwa.role || 'agent'} tool in a new window where you can input your own data.`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    LAUNCH AGENT
                  </button>
                  {agentData?.url && (
                    <p className="text-[9px] text-white/30 font-mono tracking-wider text-center mt-2 truncate">
                      {agentData.url}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-white/40 text-sm font-mono tracking-widest">
                <p>AWAITING INPUT</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
