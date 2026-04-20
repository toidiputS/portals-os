import { readFileSync, writeFileSync } from 'fs';

const agents = JSON.parse(readFileSync("D:\\CSV's\\nexus-agents-2026-04-19.json", 'utf8'));

// Old squad name mappings
const SQUAD_META = {
  'SQUAD1': { name: 'Legacy Vault: Chairman & Exit Readiness', colorHex: '#6366f1', colorName: 'Indigo', description: 'Transforms founder-run companies into sellable, chairman-led assets.' },
  'SQUAD2': { name: 'OPS IRON: Operations Playbook', colorHex: '#0d9488', colorName: 'Teal', description: 'Replaces tribal chaos with a single, coherent operations playbook.' },
  'SQUAD3': { name: 'CAPITAL FLOOR: Pricing & Profit', colorHex: '#dc2626', colorName: 'Crimson', description: 'Gives you a pricing matrix, unit economics model, and yield map.' },
  'SQUAD4': { name: 'GROWTH ENGINE: Acquisition & Launch', colorHex: '#2563eb', colorName: 'Royal Blue', description: 'Acquisition roadmap, hooks, outreach scripts, and launch schedules.' },
  'SQUAD5': { name: 'CASH VELOCITY: Offer & Conversion', colorHex: '#06b6d4', colorName: 'Cyan', description: 'Validated offers, DM scripts, jolt campaigns, and scarcity protocols.' },
  'SQUAD6': { name: 'TRUST SHIELD: Compliance & Retention', colorHex: '#059669', colorName: 'Emerald', description: 'Redlined contracts, churn maps, crisis response, and reputation radar.' },
  'SQUAD7': { name: 'BRAND ALIVE: Voice & Content', colorHex: '#db2777', colorName: 'Magenta', description: 'Brand voice map, content library, distribution, and tribal strategy.' },
  'SQUAD8': { name: 'INTEL CORE: Competitive Recon', colorHex: '#ca8a04', colorName: 'Gold', description: 'North star roadmap, rival intel reports, forensics, and sizing.' },
  'SQUAD9': { name: 'SIGNAL: SEO & Keyword', colorHex: '#84cc16', colorName: 'Olive', description: 'SEO roadmap, winnable keywords, content briefs, and backlinks.' },
  'SQUAD10': { name: 'CONVERT: Cart & Checkout', colorHex: '#b45309', colorName: 'Copper', description: 'Optimized pages, recovery sequences, upsells, and trust signals.' },
};

const CATEGORY_COLORS = {
  'Marketing': '#db2777',
  'Operations': '#0d9488',
  'Sales': '#06b6d4',
  'Finance': '#dc2626',
  'Strategy': '#6366f1',
  'HR': '#059669',
  'Product': '#8b5cf6',
  'Tech': '#84cc16',
  'Legal': '#ca8a04',
};

// Separate COMMAND (Oracle) from the rest
const oracleAgent = agents.find(a => a.squadId === 'COMMAND');
// Strip createdAt/updatedAt — they aren't in the NexusAgent interface
const nonCommandAgents = agents
  .filter(a => a.squadId !== 'COMMAND')
  .map(({ createdAt, updatedAt, ...rest }) => rest);

let output = `// ============================================================
// NEXUS AGENT SYSTEM — Auto-generated from nexus-agents-2026-04-19.json
// Total: ${agents.length} agents, ${Object.keys(SQUAD_META).length} squads + 1 Oracle
// ============================================================

export interface NexusAgent {
  id: string;
  name: string;
  role: string;
  category: string;
  squadId: string;
  description: string;
  oracleInsight: string;
  color: string;
  icon: string;
  url: string;
  status: string;
  suggestedNextNode: string;
  suggestedPreviousNode: string;
  toolCard: {
    purpose: string;
    useThisWhen: string[];
    inputNeeded: string;
    outputDelivered: string[];
    doNotUseWhen: string[];
    useCases: string[];
    bestNextStep: string;
  };
}

export interface NexusSquad {
  id: string;
  name: string;
  colorHex: string;
  colorName: string;
  description: string;
  agentIds: string[];
}

// ==========================================
// THE ORACLE (COMMAND SQUAD)
// ==========================================
export const ORACLE_NODE = {
  id: "${oracleAgent.id}",
  name: "${oracleAgent.name}",
  role: "${oracleAgent.role}",
  domain: "itsyouonline.com",
  description: ${JSON.stringify(oracleAgent.description)},
  oracleInsight: ${JSON.stringify(oracleAgent.oracleInsight)},
  icon: "${oracleAgent.icon}",
  colorHex: "#00ffff",
};

// ==========================================
// CATEGORY COLORS (for category-based views)
// ==========================================
export const CATEGORY_COLORS: Record<string, string> = ${JSON.stringify(CATEGORY_COLORS, null, 2)};

// ==========================================
// ALL 166 DIAGNOSTIC AGENTS (excludes Oracle)
// ==========================================
export const NEXUS_AGENTS: NexusAgent[] = ${JSON.stringify(nonCommandAgents, null, 2)};

// ==========================================
// THE SQUADS (PROMOTIONAL PACKAGES)
// ==========================================
export const NEXUS_SQUADS: NexusSquad[] = [
`;

// Build squad data
for (const squadId of Object.keys(SQUAD_META).sort()) {
  const meta = SQUAD_META[squadId];
  const squadAgentIds = nonCommandAgents.filter(a => a.squadId === squadId).map(a => a.id);
  output += `  {
    id: "${squadId}",
    name: ${JSON.stringify(meta.name)},
    colorHex: "${meta.colorHex}",
    colorName: "${meta.colorName}",
    description: ${JSON.stringify(meta.description)},
    agentIds: ${JSON.stringify(squadAgentIds)},
  },
`;
}

output += `];

// ==========================================
// HELPERS
// ==========================================
export const getAgentById = (agentId: string): NexusAgent | undefined =>
  NEXUS_AGENTS.find(a => a.id === agentId);

export const getSquadById = (squadId: string): NexusSquad | undefined =>
  NEXUS_SQUADS.find(s => s.id === squadId);

export const getAgentsByCategory = (category: string): NexusAgent[] =>
  NEXUS_AGENTS.filter(a => a.category === category);

export const getAgentsBySquad = (squadId: string): NexusAgent[] =>
  NEXUS_AGENTS.filter(a => a.squadId === squadId);

export const ALL_CATEGORIES = [...new Set(NEXUS_AGENTS.map(a => a.category))].sort();

// ==========================================
// LEGACY COMPATIBILITY (for gradual migration)
// ==========================================
export interface PlatoonNode {
  id: string;
  name: string;
  role: string;
  pain: string;
  artifact: string;
  purpose: string;
  mission: string;
  preFlight: { deployWhen: string; abstainWhen: string; };
  inputs: string;
  deliverables: string[];
  oracleInsight: string;
  prevNode: string;
  nextNode: string;
}

export interface PlatoonDomain {
  id: string;
  name: string;
  url: string;
  colorName: string;
  colorHex: string;
  description: string;
  nodes: PlatoonNode[];
}

export interface PlatoonSquad {
  id: string;
  name: string;
  description: string;
  nodeIds: string[];
}

// Legacy empty arrays (all data now in NEXUS_AGENTS/NEXUS_SQUADS)
export const PLATOON_DOMAINS: PlatoonDomain[] = [];
export const PLATOON_SQUADS: PlatoonSquad[] = NEXUS_SQUADS.map(s => ({
  id: s.id,
  name: s.name,
  description: s.description,
  nodeIds: s.agentIds,
}));

export const getNodeById = (nodeId: string): PlatoonNode | undefined => undefined;
`;

writeFileSync('d:\\\\Portals OS\\\\portals-os\\\\constants\\\\platoon.ts', output, 'utf8');
console.log(`Generated platoon.ts with ${nonCommandAgents.length} agents and ${Object.keys(SQUAD_META).length} squads`);
