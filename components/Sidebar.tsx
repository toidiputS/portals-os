import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKernel } from "../store/kernel";
import { AppWindow, Sparkles, ShieldAlert, Target, Package, CornerDownRight, Orbit, Download, Copy, CheckCircle2, Star } from "lucide-react";
import { PLATOON_DOMAINS, PLATOON_SQUADS } from "../constants/platoon";
import { PaywallOverlay } from "./PaywallOverlay";
import { GlowCard } from "./GlowCard";

const Sidebar: React.FC = () => {
  const isSidebarOpen = useKernel((state) => state.isSidebarOpen);
  const selectedPwa = useKernel((state) => state.selectedPwa);
  const closeSidebar = useKernel((state) => state.closeSidebar);
  const selectedDomainId = useKernel((state) => state.selectedDomainId);
  const consumeFreeNodeSlot = useKernel((state) => state.consumeFreeNodeSlot);

  const [extractionState, setExtractionState] = React.useState<'idle' | 'extracting' | 'extracted' | 'denied'>('idle');

  // Access Control State
  const unlockedNodes = useKernel((state) => state.unlockedNodes);
  const unlockedSquads = useKernel((state) => state.unlockedSquads);
  const subscriptionTier = useKernel((state) => state.subscriptionTier);
  const freeNodesUsed = useKernel((state) => state.freeNodesUsed);
  const favoriteNodes = useKernel((state) => state.favoriteNodes);
  const toggleFavoriteNode = useKernel((state) => state.toggleFavoriteNode);

  const domainData = selectedDomainId ? PLATOON_DOMAINS.find(d => d.id === selectedDomainId) : null;

  // Determine if user has access to current view
  // First, find all squads this node belongs to packages of
  const parentSquadOfNode = selectedPwa
    ? PLATOON_SQUADS.find(s => s.nodeIds.includes(selectedPwa.id))
    : null;

  const overridesAccess = selectedPwa
    ? (unlockedNodes.includes(selectedPwa.id) ||
      (parentSquadOfNode && unlockedSquads.includes(parentSquadOfNode.id)) ||
      subscriptionTier === 'platoon' ||
      subscriptionTier === 'squad+')
    : false;

  const hasAccessToNode = overridesAccess || (selectedPwa && freeNodesUsed.includes(selectedPwa.id));

  // Reset extraction state when changing nodes
  React.useEffect(() => {
    setExtractionState('idle');
  }, [selectedPwa?.id]);

  const handleExtraction = () => {
    if (overridesAccess) {
      // Paid users always succeed instantly
      setExtractionState('extracting');
      setTimeout(() => setExtractionState('extracted'), 800);
      return;
    }

    // Free users
    const allowed = consumeFreeNodeSlot(selectedPwa!.id);
    if (allowed) {
      setExtractionState('extracting');
      setTimeout(() => setExtractionState('extracted'), 800);
    } else {
      setExtractionState('denied');
    }
  };

  // No more domain-level generic view paywall - domains are free to view, nodes inside are gated or free-tier
  const hasAccessToDomain = true;

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0, x: -350 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -350 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-0 left-0 bottom-12 w-[350px] bg-black/90 backdrop-blur-xl border-r border-white/10 shadow-2xl z-1000 p-6 flex flex-col gap-6 overflow-y-auto font-sans"
          style={{
            boxShadow: domainData ? `inset -4px 0 20px -10px ${domainData.colorHex}` : selectedPwa ? 'inset -4px 0 20px -10px rgba(255,255,255,0.2)' : 'none'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
            <div>
              <h2 className="text-xl font-bold tracking-widest text-white/90 uppercase">
                {selectedPwa ? "FORENSIC DOSSIER" : "DOMAIN OVERVIEW"}
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
              <div className="flex flex-col gap-6 font-mono pb-6 h-full relative">
                {extractionState === 'denied' && (
                  <PaywallOverlay
                    nodeId={selectedPwa.id}
                    message={`You have exhausted your 4 free node extractions for this period. Upgrade to a license to continuously extract deliverables from ${selectedPwa.label}.`}
                  />
                )}
                {!hasAccessToNode && extractionState !== 'denied' && (
                  <PaywallOverlay
                    nodeId={selectedPwa.id}
                    message={`This node requires a direct license or ownership of one of its holding Squads.`}
                  />
                )}
                <div className={`flex flex-col gap-6 font-mono ${(!hasAccessToNode && extractionState !== 'denied') || extractionState === 'denied' ? 'select-none pointer-events-none blur-[2px]' : ''}`}>
                  {/* Visual Node Card */}
                  <div className="flex justify-center mb-4">
                    <GlowCard
                      glowColor={domainData?.colorName?.toLowerCase() as any || "blue"}
                      customSize={true}
                      width="100%"
                      height="auto"
                      className="p-6 border border-white/10"
                    >
                      <div className="absolute top-0 right-0 p-4 text-5xl font-black text-white/5">{selectedPwa.id}</div>
                      <div className="flex justify-between items-start mb-4 relative z-10 w-full">
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-bold text-white tracking-wider">{selectedPwa.label}</h3>
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFavoriteNode(selectedPwa.id); }}
                            className="text-white/30 hover:text-yellow-400 transition-colors p-1"
                            title={favoriteNodes.includes(selectedPwa.id) ? "Remove from Stars" : "Favorite as Star"}
                          >
                            <Star className={`w-5 h-5 ${favoriteNodes.includes(selectedPwa.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          </button>
                        </div>
                        <span className="px-2 py-1 bg-white/10 text-[10px] tracking-wider text-white/80 border border-white/20 whitespace-nowrap ml-4 rounded">NODE // {selectedPwa.id}</span>
                      </div>
                      <p className="text-[11px] text-white/50 tracking-widest uppercase mb-6 relative z-10">ROLE // <span className="text-white/90">{selectedPwa.role || "N/A"}</span></p>

                      {/* Pain Points (Most Prominent inside card) */}
                      <div className="bg-red-500/10 border border-red-500/30 p-4 mb-4 rounded relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                          <h4 className="text-[11px] font-bold text-red-400 tracking-widest uppercase">PAIN POINTS ADDRESSED</h4>
                        </div>
                        <p className="text-sm text-red-100/90 leading-relaxed font-sans font-medium">{selectedPwa.pain || "N/A"}</p>
                      </div>

                      {/* Mission & Oracle Insight inside card */}
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

                  {/* Deliverables */}
                  <div className="bg-blue-500/10 border border-blue-500/30 p-4 shrink-0">
                    <div className="flex items-center gap-2 mb-4">
                      <Package className="w-4 h-4 text-blue-400" />
                      <h4 className="text-[11px] font-bold text-blue-400 tracking-widest uppercase">NODE DELIVERABLES</h4>
                    </div>
                    {selectedPwa.deliverables && selectedPwa.deliverables.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedPwa.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-blue-100/90 font-sans">
                            <CornerDownRight className="w-4 h-4 text-blue-500/60 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-blue-200/50">{selectedPwa.artifact || "N/A"}</p>
                    )}
                  </div>

                  {/* Action Base */}
                  <div className="mt-4 pt-4 border-t border-white/10 shrink-0">
                    {extractionState === 'extracted' ? (
                      <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 shrink-0 flex flex-col items-center justify-center gap-3 text-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="text-emerald-400 font-bold tracking-widest text-sm uppercase">Deliverable Extracted</h4>
                          <p className="text-xs text-emerald-100/70 mt-1 font-sans">
                            {subscriptionTier !== 'free'
                              ? "Automatically committed to your NotNotes secure workspace."
                              : "Ready for download. Unlock a Node for automatic NotNotes sync."}
                          </p>
                        </div>
                        <div className="flex gap-2 w-full mt-2">
                          <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded flex items-center justify-center gap-2 text-xs font-bold text-white tracking-widest uppercase">
                            <Download className="w-3 h-3" /> PDF
                          </button>
                          <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded flex items-center justify-center gap-2 text-xs font-bold text-white tracking-widest uppercase">
                            <Copy className="w-3 h-3" /> COPY
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={handleExtraction}
                        disabled={extractionState === 'extracting'}
                        className={`w-full py-4 font-black tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-2xl relative overflow-hidden group shrink-0 ${extractionState === 'extracting'
                          ? 'bg-blue-600 cursor-wait text-white/50'
                          : 'bg-white text-black hover:bg-gray-200'
                          }`}
                      >
                        {extractionState === 'extracting' ? (
                          <>
                            <Orbit className="w-4 h-4 animate-spin" />
                            EXTRACTING...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            EXTRACT DELIVERABLE
                            {!overridesAccess && (
                              <span className="absolute top-1 right-2 text-[8px] bg-black/10 px-1.5 py-0.5 rounded text-black/60 font-mono">
                                {4 - freeNodesUsed.length} LEFT
                              </span>
                            )}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : domainData ? (
              <div className="flex flex-col gap-6 font-mono pb-6 h-full relative">
                <div className={`flex flex-col gap-6 font-mono`}>
                  <div
                    className="border p-6 shadow-2xl relative overflow-hidden shrink-0"
                    style={{
                      borderColor: `${domainData.colorHex}40`,
                      background: `linear-gradient(135deg, ${domainData.colorHex}20 0%, transparent 100%)`
                    }}
                  >
                    <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: domainData.colorHex }}>DOMAIN OVERVIEW</p>
                    <h3 className="text-3xl font-black text-white tracking-widest mb-2 z-10 relative">{domainData.name}</h3>
                    <p className="text-xs text-white/60 z-10 relative">ID // {domainData.id}</p>
                    <div className="absolute -bottom-10 -right-10 opacity-20 transform rotate-12" style={{ color: domainData.colorHex }}>
                      <ShieldAlert className="w-40 h-40" />
                    </div>
                  </div>

                  <div className="border border-white/10 bg-black/50 p-4 shrink-0">
                    <h4 className="text-[11px] font-bold text-white/60 tracking-widest uppercase mb-3 border-b border-white/10 pb-2">DOMAIN MANIFEST</h4>
                    <p className="text-sm text-white/80 leading-relaxed font-sans mb-4">
                      {domainData.description}
                      Select individual nodes from the Circle Menu for forensic dossiers.
                    </p>

                    <div className="space-y-2">
                      <h5 className="text-[10px] text-white/40 tracking-widest">ACTIVE NODES:</h5>
                      {domainData.nodes.map(n => (
                        <div key={n.id} className="flex items-center gap-3 text-xs border border-white/5 p-2 bg-white/5 hover:bg-white/10 transition-colors cursor-default">
                          <span className="w-6 font-bold" style={{ color: domainData.colorHex }}>{n.id}</span>
                          <span className="text-white/80">{n.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
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
