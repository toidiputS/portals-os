import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Search, ChevronRight, ChevronLeft, Activity, Globe, Zap, 
  ShieldAlert, Cpu, BarChart3, Clock, LayoutGrid, Shield, Layers, Star,
  ArrowRight, CheckCircle2, Target
} from "lucide-react";
import { NEXUS_AGENTS, NEXUS_SQUADS, CATEGORY_COLORS, NexusAgent } from "../constants/platoon";
import { useKernel } from "../store/kernel";

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
  const [activeGroup, setActiveGroup] = useState<string>("All");
  const [navigationStack, setNavigationStack] = useState<string[]>(["root"]);
  
  // Mobile drawer states
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  const [mobileRightOpen, setMobileRightOpen] = useState(false);

  const windows = useKernel((state) => state.windows);
  const agentStatus = useKernel((state) => state.agentStatus);

  // Stable stats generator
  const getAgentStats = (id: string) => {
    const charSum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      processed: 400 + (charSum % 600),
      accuracy: 94 + (charSum % 6),
    };
  };

  const handleBack = () => {
    if (navigationStack.length > 1) {
      const newStack = [...navigationStack];
      newStack.pop();
      setNavigationStack(newStack);
      
      const last = newStack[newStack.length - 1];
      if (last === "root") setActiveGroup("All");
      else setActiveGroup(last);
    }
  };

  const navigateTo = (path: string) => {
    setNavigationStack([...navigationStack, path]);
    setActiveGroup(path);
    setMobileLeftOpen(false);
  };

  const filteredAgents = useMemo(() => {
    const current = navigationStack[navigationStack.length - 1];
    if (current === "root" || current === "squads" || current === "domains") return [];
    
    const isSquad = NEXUS_SQUADS.some(s => s.id === current || s.name === current);
    if (isSquad) {
      const squad = NEXUS_SQUADS.find(s => s.id === current || s.name === current);
      return NEXUS_AGENTS.filter(a => squad?.agentIds.includes(a.id));
    }
    return NEXUS_AGENTS.filter(a => a.category === current);
  }, [navigationStack]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-1000 flex bg-[#0a0a0f] text-[#e8e8f0] font-sans overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* LEFT SIDEBAR - NAVIGATION */}
          <AnimatePresence>
            {(mobileLeftOpen || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
              <motion.div
                initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { x: -300 } : {}}
                animate={{ x: 0 }}
                exit={typeof window !== 'undefined' && window.innerWidth < 768 ? { x: -300 } : {}}
                className="fixed md:relative top-0 bottom-0 left-0 w-80 bg-black/90 backdrop-blur-2xl border-r border-white/10 z-50 md:z-40 flex flex-col overflow-hidden"
              >
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-linear-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Nexus Fleet</h2>
                  </div>
                  <button onClick={() => setMobileLeftOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors md:hidden">
                    <X className="h-5 w-5 text-white/50" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] px-2 mb-4">Core Navigation</h3>
                    <button
                      onClick={() => { setNavigationStack(["root"]); setMobileLeftOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${navigationStack.length === 1 ? "bg-white/10 text-white shadow-lg" : "text-white/40 hover:bg-white/5 hover:text-white"}`}
                    >
                      <LayoutGrid className="h-5 w-5" />
                      <span className="font-medium">Directory Home</span>
                    </button>
                    <button
                      onClick={() => navigateTo("squads")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${navigationStack.includes("squads") ? "bg-white/10 text-white" : "text-white/40 hover:bg-white/5 hover:text-white"}`}
                    >
                      <Shield className="h-5 w-5" />
                      <span className="font-medium">Squads</span>
                    </button>
                    <button
                      onClick={() => navigateTo("domains")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${navigationStack.includes("domains") ? "bg-white/10 text-white" : "text-white/40 hover:bg-white/5 hover:text-white"}`}
                    >
                      <Layers className="h-5 w-5" />
                      <span className="font-medium">Domains</span>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] px-2 mb-4">Pinned Nodes</h3>
                    <div className="px-4 py-6 rounded-2xl bg-white/2 border border-white/5 flex flex-col items-center justify-center text-center gap-3">
                      <Star className="h-6 w-6 text-yellow-500/30" />
                      <p className="text-[10px] leading-relaxed text-white/30 uppercase tracking-wider font-medium">Star agents to access them rapidly from the directory</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MOBILE TABS */}
          <div className="md:hidden fixed left-0 top-1/2 -translate-y-1/2 z-50">
            <button onClick={() => setMobileLeftOpen(true)} className="bg-indigo-600/80 p-2 rounded-r-xl border border-white/10 shadow-xl">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="md:hidden fixed right-0 top-1/2 -translate-y-1/2 z-50">
            <button onClick={() => setMobileRightOpen(true)} className="bg-purple-600/80 p-2 rounded-l-xl border border-white/10 shadow-xl">
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 flex flex-col min-w-0 bg-linear-to-b from-[#0a0a0f] to-[#050508] relative">
            <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 shrink-0 bg-black/20 backdrop-blur-md">
              <div className="flex items-center gap-4">
                {navigationStack.length > 1 && (
                  <button onClick={handleBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors group">
                    <ChevronLeft className="h-5 w-5 text-white/50 group-hover:text-white transition-colors" />
                  </button>
                )}
                <div>
                  <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                      {navigationStack[navigationStack.length - 1] === "root" ? "Nexus Expertise Registry" : 
                       navigationStack[navigationStack.length - 1] === "squads" ? "Tactical Squads" :
                       navigationStack[navigationStack.length - 1] === "domains" ? "Global Domains" :
                       activeGroup}
                    </h1>
                    {navigationStack[navigationStack.length - 1] === "root" && (
                      <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium mt-1">Independent Expert Node Directory</p>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="h-6 w-6 text-white/30" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <AnimatePresence mode="wait">
                {navigationStack[navigationStack.length - 1] === "root" ? (
                  <motion.div
                    key="root-view"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-10"
                  >
                    <button
                      onClick={() => navigateTo("domains")}
                      className="group relative h-80 rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 bg-white/2"
                    >
                      <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-transparent group-hover:from-blue-500/40 transition-colors" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                        <div className="h-20 w-20 rounded-3xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                          <Layers className="h-10 w-10 text-blue-400" />
                        </div>
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-white mb-2">Global Domains</h3>
                          <p className="text-xs text-white/30 uppercase tracking-[0.2em] font-semibold">Primary Expertise Pillars</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => navigateTo("squads")}
                      className="group relative h-80 rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500 bg-white/2"
                    >
                      <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 to-transparent group-hover:from-purple-500/40 transition-colors" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                        <div className="h-20 w-20 rounded-3xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                          <Shield className="h-10 w-10 text-purple-400" />
                        </div>
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-white mb-2">Tactical Squads</h3>
                          <p className="text-xs text-white/30 uppercase tracking-[0.2em] font-semibold">Common Bleeding Necks</p>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ) : navigationStack[navigationStack.length - 1] === "squads" ? (
                  <motion.div
                    key="squads-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {NEXUS_SQUADS.map((squad) => (
                      <button
                        key={squad.id}
                        onClick={() => navigateTo(squad.id)}
                        className="p-8 rounded-3xl bg-white/3 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300 text-left group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Shield size={64} style={{ color: squad.colorHex }} />
                        </div>
                        <div className="relative z-10">
                          <div className="h-2 w-12 rounded-full mb-6" style={{ backgroundColor: squad.colorHex }} />
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{squad.name}</h3>
                          <p className="text-sm text-white/40 line-clamp-2 mb-4">{squad.description}</p>
                          <div className="flex items-center gap-2 text-xs font-mono text-white/20">
                            <Cpu size={12} />
                            <span>{squad.agentIds.length} ACTIVE NODES</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                ) : navigationStack[navigationStack.length - 1] === "domains" ? (
                  <motion.div
                    key="domains-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {Object.keys(CATEGORY_COLORS).map((category) => {
                      const count = NEXUS_AGENTS.filter(a => a.category === category).length;
                      return (
                        <button
                          key={category}
                          onClick={() => navigateTo(category)}
                          className="p-8 rounded-3xl bg-white/3 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300 text-left group relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Layers size={64} style={{ color: CATEGORY_COLORS[category] }} />
                          </div>
                          <div className="relative z-10">
                            <div className="h-2 w-12 rounded-full mb-6" style={{ backgroundColor: CATEGORY_COLORS[category] }} />
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{category}</h3>
                            <p className="text-sm text-white/40 mb-4">Infrastructure layer for {category} operations.</p>
                            <div className="flex items-center gap-2 text-xs font-mono text-white/20">
                              <Cpu size={12} />
                              <span>{count} ACTIVE NODES</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                ) : (
                  <motion.div
                    key="agents-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {filteredAgents.map((agent) => {
                      const stats = getAgentStats(agent.id);
                      const catColor = CATEGORY_COLORS[agent.category] || "#ffffff";
                      
                      return (
                        <motion.div
                          key={agent.id}
                          layout
                          onClick={() => onAgentClick(agent)}
                          className="group relative bg-white/2 rounded-3xl p-5 border border-white/5 hover:bg-white/8 hover:border-white/20 transition-all cursor-pointer overflow-hidden flex flex-col h-full backdrop-blur-md"
                        >
                          {/* Scanline Effect Overlay */}
                          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-0 bg-size-[100%_2px,3px_100%]" />
                          
                          <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500 shadow-xl border border-white/10 group-hover:border-white/30">
                                {agent.icon.startsWith("/") ? <img src={agent.icon} alt="" className="h-6 w-6 object-contain" /> : agent.icon}
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <div className={`h-1.5 w-1.5 rounded-full ${agentStatus[agent.id] === 'online' ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-white/10'}`} />
                                <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{agent.id}</span>
                              </div>
                            </div>

                            {/* Identity */}
                            <div className="mb-4">
                              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">{agent.name}</h3>
                              <p className="text-[9px] font-bold uppercase tracking-[0.15em] opacity-40" style={{ color: catColor }}>{agent.role}</p>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-white/30 line-clamp-2 mb-6 leading-relaxed group-hover:text-white/50 transition-colors">
                              {agent.description}
                            </p>

                            {/* High-Ticket Technical Details */}
                            <div className="space-y-4 mb-6">
                              {/* Deliverables */}
                              {agent.toolCard?.outputDelivered && (
                                <div className="space-y-1.5">
                                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/20 uppercase tracking-widest">
                                    <CheckCircle2 className="h-3 w-3" />
                                    <span>Deliverables</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {agent.toolCard.outputDelivered.slice(0, 2).map((item, idx) => (
                                      <span key={idx} className="text-[10px] bg-white/5 px-2 py-0.5 rounded-md text-white/40 border border-white/5 whitespace-nowrap">
                                        {item}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Performance Triggers */}
                              {agent.toolCard?.useThisWhen && (
                                <div className="space-y-1.5">
                                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/20 uppercase tracking-widest">
                                    <Target className="h-3 w-3" />
                                    <span>Triggers</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {agent.toolCard.useThisWhen.slice(0, 2).map((item, idx) => (
                                      <span key={idx} className="text-[10px] bg-cyan-500/5 px-2 py-0.5 rounded-md text-cyan-400/40 border border-cyan-500/10 whitespace-nowrap">
                                        {item}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Footer Stats & Action */}
                          <div className="mt-auto relative z-10 pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5 text-white/20 group-hover:text-purple-400/50 transition-colors">
                                <BarChart3 className="h-3 w-3" />
                                <span className="text-[10px] font-mono">{stats.processed}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-white/20 group-hover:text-green-400/50 transition-colors">
                                <Zap className="h-3 w-3" />
                                <span className="text-[10px] font-mono">{stats.accuracy}%</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1 text-[10px] font-bold text-white/0 group-hover:text-white/40 transition-all transform translate-x-2 group-hover:translate-x-0">
                              <span>DOSSIER</span>
                              <ArrowRight className="h-3 w-3" />
                            </div>
                          </div>
                          
                          {/* Active Accent Bar */}
                          <div className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-transparent via-cyan-500 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT SIDEBAR - ACTIVITY PANEL */}
          <AnimatePresence>
            {(mobileRightOpen || (typeof window !== 'undefined' && window.innerWidth >= 1200)) && (
              <motion.div
                initial={typeof window !== 'undefined' && window.innerWidth < 1200 ? { x: 300 } : {}}
                animate={{ x: 0 }}
                exit={typeof window !== 'undefined' && window.innerWidth < 1200 ? { x: 300 } : {}}
                className="fixed lg:relative top-0 bottom-0 right-0 w-80 bg-black/90 backdrop-blur-2xl border-l border-white/10 p-6 overflow-y-auto z-50 lg:z-40 shrink-0"
              >
                <div className="flex justify-between items-center mb-8 lg:hidden">
                  <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Tactical Log</span>
                  <button onClick={() => setMobileRightOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
                    <X className="w-5 h-5 text-white/50" />
                  </button>
                </div>
                
                <h3 className="text-xs font-bold text-white/20 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-500" />
                  Fleet Activity
                </h3>
                
                <div className="space-y-4">
                  {[
                    { agent: "Dynamo", action: "Commit to NotNotes", time: "2s ago", score: "97%" },
                    { agent: "Drive", action: "Commit to NotNotes", time: "15s ago", score: "94%" },
                    { agent: "Bulwark", action: "Commit to NotNotes", time: "32s ago", score: "82%" },
                    { agent: "Arbiter", action: "Commit to NotNotes", time: "1m ago", score: "91%" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/2 rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm text-white/90">{item.agent}</span>
                        <span className="text-[10px] text-white/30 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {item.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/50 mb-3 uppercase tracking-tighter font-semibold opacity-60 italic">{item.action}</p>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md font-bold border border-emerald-500/20">{item.score} Score</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
