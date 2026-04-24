import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ChevronRight, ChevronLeft, Activity, Globe, Zap, ShieldAlert, Cpu, BarChart3, Clock } from "lucide-react";
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
  const [search, setSearch] = useState("");
  const [groupBy, setGroupBy] = useState<"domain" | "squad">("squad");
  const [activeGroup, setActiveGroup] = useState<string>("All");
  
  // Mobile drawer states
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  const [mobileRightOpen, setMobileRightOpen] = useState(false);

  const windows = useKernel((state) => state.windows);
  const agentStatus = useKernel((state) => state.agentStatus);

  const isAgentActive = (agentId: string) => windows.some(win => win.appId === agentId);
  const getAgentConnectivity = (agentId: string) => agentStatus[agentId] || "offline";

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

  const groups = useMemo(() => {
    const map: Record<string, NexusAgent[]> = { "All": filtered };
    for (const agent of filtered) {
      if (groupBy === "domain") {
        if (!map[agent.category]) map[agent.category] = [];
        map[agent.category].push(agent);
      } else {
        const squad = NEXUS_SQUADS.find(s => s.agentIds.includes(agent.id));
        const groupName = squad ? squad.name : "UNASSIGNED";
        if (!map[groupName]) map[groupName] = [];
        map[groupName].push(agent);
      }
    }
    // Sort groups by size, but keep "All" at top
    const entries = Object.entries(map).filter(([k]) => k !== "All");
    entries.sort((a, b) => b[1].length - a[1].length);
    return [["All", map["All"]], ...entries] as [string, NexusAgent[]][];
  }, [filtered, groupBy]);

  // Reset active group if it disappears (e.g. search)
  useEffect(() => {
    if (!groups.find(g => g[0] === activeGroup)) {
      setActiveGroup("All");
    }
  }, [groups, activeGroup]);

  // Handle mobile drawer clicks
  const selectGroup = (group: string) => {
    setActiveGroup(group);
    setMobileLeftOpen(false); // Close drawer on selection
  };

  const activeAgents = useMemo(() => {
    const group = groups.find(g => g[0] === activeGroup);
    return group ? group[1] : [];
  }, [groups, activeGroup]);

  // Calculate stats for the current view
  const activeCount = activeAgents.filter(a => isAgentActive(a.id)).length;
  const connectedCount = activeAgents.filter(a => getAgentConnectivity(a.id) === "online").length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] flex flex-col bg-[#0a0a0f] text-[#e8e8f0] font-sans overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {/* Dashboard Header */}
          <header className="bg-[#0a0a0f]/95 border-b border-indigo-500/30 p-4 flex justify-between items-center shrink-0 z-30 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-xl shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                ⚡
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 tracking-wide">
                Nexus Dashboard
              </span>
            </div>
            
            <div className="hidden md:flex gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-400">{NEXUS_AGENTS.length}</div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest">Total Nodes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-400">{NEXUS_SQUADS.length}</div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest">Squads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{windows.length}</div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest">Active</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6 text-white/70" />
              </button>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden relative">
            {/* LEFT SIDEBAR (Squads/Domains) */}
            <div className="static top-0 bottom-0 left-0 w-[260px] bg-black/20 border-r border-indigo-500/20 p-4 overflow-y-auto z-40 backdrop-blur-xl shrink-0">
              <div className="mb-6 flex bg-white/5 rounded-lg p-1 border border-white/10">
                <button
                  onClick={() => setGroupBy("squad")}
                  className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${groupBy === "squad" ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" : "text-white/40 hover:text-white/80"}`}
                >
                  Squads
                </button>
                <button
                  onClick={() => setGroupBy("domain")}
                  className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${groupBy === "domain" ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" : "text-white/40 hover:text-white/80"}`}
                >
                  Domains
                </button>
              </div>

              <div className="text-xs uppercase tracking-widest text-white/40 mb-3 font-semibold px-2">
                {groupBy === "squad" ? "All Squads" : "All Domains"}
              </div>
              
              <div className="space-y-1">
                {groups.map(([name, agents]) => {
                  const isActive = activeGroup === name;
                  const groupColor = groupBy === "domain" 
                    ? CATEGORY_COLORS[name] || "#6366f1"
                    : NEXUS_SQUADS.find(s => s.name === name)?.colorHex || "#6366f1";
                    
                  return (
                    <button
                      key={name}
                      onClick={() => selectGroup(name)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all border-l-2 ${
                        isActive 
                          ? "bg-indigo-500/10 border-indigo-500 text-white shadow-[inset_0_0_20px_rgba(99,102,241,0.05)]" 
                          : "border-transparent text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                      style={isActive ? { borderLeftColor: groupColor, backgroundColor: `${groupColor}15` } : {}}
                    >
                      <div className="flex items-center gap-3 truncate">
                        {name !== "All" && (
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: groupColor, boxShadow: `0 0 8px ${groupColor}` }} />
                        )}
                        <span className="font-medium text-sm truncate">{name}</span>
                      </div>
                      <span className="text-xs font-mono opacity-60 bg-black/30 px-1.5 py-0.5 rounded">{agents.length}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer tabs removed per user request */}

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#0a0a0f] to-[#050508] relative z-0 flex flex-col">
              <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                    {activeGroup === "All" ? "Fleet Overview" : `${activeGroup} ${groupBy === "squad" ? "Squad" : "Domain"}`}
                    <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-md border border-indigo-500/30 font-mono tracking-widest uppercase">
                      {activeAgents.length} Nodes
                    </span>
                  </h1>
                </div>

                {/* Dashboard Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:border-indigo-500/30 transition-colors">
                    <div className="text-indigo-400 font-bold text-3xl">{activeAgents.length}</div>
                    <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Nodes in View</div>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-500/30 transition-colors">
                    <div className="text-emerald-400 font-bold text-3xl">{connectedCount}</div>
                    <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Systems Online</div>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/30 transition-colors">
                    <div className="text-purple-400 font-bold text-3xl">{activeCount}</div>
                    <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Active Windows</div>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/30 transition-colors">
                    <div className="text-amber-400 font-bold text-3xl">{Math.floor(Math.random() * 15 + 85)}%</div>
                    <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Avg Success Rate</div>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search agents, capabilities, roles..."
                    className="w-full bg-[#14141e]/80 border border-indigo-500/20 rounded-xl pl-12 pr-4 py-4 text-base text-white placeholder-white/30 outline-none focus:border-indigo-500/60 focus:bg-[#1a1a24] transition-all shadow-inner"
                  />
                </div>

                {/* Agent Grid */}
                {activeAgents.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center">
                    <ShieldAlert className="w-12 h-12 text-white/10 mb-4" />
                    <p className="text-white/40 font-mono tracking-widest uppercase">No agents match your query</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {activeAgents.map((agent) => {
                      const isActive = isAgentActive(agent.id);
                      const connectivity = getAgentConnectivity(agent.id);
                      const emoji = agent.icon.startsWith("/") ? "🔷" : agent.icon;
                      const squad = NEXUS_SQUADS.find(s => s.agentIds.includes(agent.id));
                      const subdomain = agent.url.replace('https://', '').replace('.itsyouonline.com', '');

                      return (
                        <motion.div
                          key={agent.id}
                          layoutId={agent.id}
                          onClick={() => onAgentClick(agent)}
                          className={`group cursor-pointer bg-[#14141e]/60 border border-indigo-500/10 rounded-xl p-4 hover:border-indigo-500/50 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(99,102,241,0.15)] transition-all flex flex-col relative overflow-hidden ${isActive ? 'ring-1 ring-emerald-500/30' : ''}`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="text-3xl drop-shadow-md bg-black/20 w-12 h-12 flex items-center justify-center rounded-lg border border-white/5">{emoji}</div>
                            <div className={`w-2.5 h-2.5 rounded-full ${
                              connectivity === 'online' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 
                              connectivity === 'error' ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 
                              'bg-white/20'
                            }`} />
                          </div>
                          <h3 className="font-bold text-lg text-white mb-1 truncate">{agent.name}</h3>
                          <p className="text-xs text-indigo-400 font-mono uppercase tracking-widest truncate mb-3">{agent.role}</p>
                          
                          <div className="flex items-center gap-2 mb-3 text-xs text-white/40 font-mono">
                            <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded border border-white/5 truncate">
                              <Globe className="w-3 h-3 shrink-0" />
                              <span className="truncate">{subdomain}</span>
                            </div>
                          </div>

                          {/* Problem / Description */}
                          {agent.description && (
                            <div className="mb-3">
                              <p className="text-xs text-white/70 line-clamp-2 leading-relaxed" title={agent.description}>
                                {agent.description}
                              </p>
                            </div>
                          )}

                          {/* Oracle Insight */}
                          {agent.oracleInsight && (
                            <div className="mb-3 bg-purple-500/10 border-l-2 border-purple-500 p-2 rounded-r">
                              <p className="text-[10px] text-purple-200/80 italic line-clamp-2" title={agent.oracleInsight}>
                                "{agent.oracleInsight}"
                              </p>
                            </div>
                          )}

                          {/* Deliverables */}
                          {agent.toolCard?.outputDelivered && agent.toolCard.outputDelivered.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-1">
                              {agent.toolCard.outputDelivered.slice(0, 3).map((item: string, idx: number) => (
                                <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 truncate max-w-full" title={item}>
                                  {item}
                                </span>
                              ))}
                              {agent.toolCard.outputDelivered.length > 3 && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">
                                  +{agent.toolCard.outputDelivered.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="mt-auto flex justify-between items-center text-xs text-white/30 border-t border-white/5 pt-3">
                            <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> {Math.floor(Math.random() * 1000 + 100)}</span>
                            <span className="flex items-center gap-1 text-emerald-500/70"><Zap className="w-3 h-3" /> {Math.floor(Math.random() * 10 + 90)}%</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDEBAR (Activity Panel) */}
            <div className="static top-0 bottom-0 right-0 w-[280px] bg-black/20 border-l border-indigo-500/20 p-6 overflow-y-auto z-40 backdrop-blur-xl shrink-0">
              <h3 className="text-lg font-bold tracking-wide mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-400" />
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                {/* Mock Activity Items */}
                <div className="bg-[#14141e]/80 rounded-lg p-4 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-white/90">Draft Node</span>
                    <span className="text-[10px] text-white/40 font-mono"><Clock className="w-3 h-3 inline mr-1" />2s ago</span>
                  </div>
                  <p className="text-xs text-white/60 mb-2">Landing page wireframe generated</p>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full font-bold">97% Score</span>
                </div>

                <div className="bg-[#14141e]/80 rounded-lg p-4 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-white/90">Validate Node</span>
                    <span className="text-[10px] text-white/40 font-mono"><Clock className="w-3 h-3 inline mr-1" />15s ago</span>
                  </div>
                  <p className="text-xs text-white/60 mb-2">Market entry strategy validated</p>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full font-bold">94% Score</span>
                </div>

                <div className="bg-[#14141e]/80 rounded-lg p-4 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-white/90">Risk Node</span>
                    <span className="text-[10px] text-white/40 font-mono"><Clock className="w-3 h-3 inline mr-1" />32s ago</span>
                  </div>
                  <p className="text-xs text-white/60 mb-2">Investment risk assessment rendered</p>
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full font-bold">82% Score</span>
                </div>

                <div className="bg-[#14141e]/80 rounded-lg p-4 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-white/90">Legal Node</span>
                    <span className="text-[10px] text-white/40 font-mono"><Clock className="w-3 h-3 inline mr-1" />1m ago</span>
                  </div>
                  <p className="text-xs text-white/60 mb-2">Contract review completed</p>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full font-bold">91% Score</span>
                </div>
              </div>
            </div>

            {/* Drawer tabs removed */}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AllAgentsPanel;
