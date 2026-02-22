export interface PlatoonNode {
    id: string; // The 1-2 letter ID (e.g. "Z+", "VV", "O")
    name: string; // The Node name (e.g. "ZENITH+", "VERVE", "OMEGA")
    pain: string;
    artifact: string;
}

export interface PlatoonSquad {
    id: string; // e.g. "squad-1"
    name: string; // e.g. "LEGACY VAULT"
    domain: string; // e.g. "itsai.vip"
    colorName: string; // e.g. "Indigo"
    colorHex: string; // e.g. "#6366f1"
    nodes: PlatoonNode[];
}

export const ORACLE_NODE = {
    id: "ORC",
    name: "ORACLE",
    domain: "itsyouonline.com",
    pain: "Intent diagnosis & routing",
    artifact: "Routes to correct node",
    colorHex: "#00ffff" // Let's give Oracle a mystical cyan color
};

export const PLATOON_SQUADS: PlatoonSquad[] = [
    {
        id: "squad-1",
        name: "LEGACY VAULT",
        domain: "itsai.vip",
        colorName: "Indigo",
        colorHex: "#6366f1",
        nodes: [
            { id: "Z+", name: "ZENITH+", pain: "I don't know how to transition from operator to chairman", artifact: "Legacy blueprint / chairman transition plan" },
            { id: "O", name: "OMEGA", pain: "I don't know if my business is actually sellable", artifact: "Exit scorecard / sellability report" },
            { id: "V", name: "VIEW", pain: "I have no long-term vision document", artifact: "Vision roadmap / long-term forecast" },
            { id: "X", name: "XENON", pain: "I don't know the health of my entire system", artifact: "System diagnostics / full health scan" },
            { id: "Q", name: "QUOTA", pain: "I have no real KPI dashboard", artifact: "Metrics dashboard / KPI spec" },
        ]
    },
    {
        id: "squad-2",
        name: "OPS IRON",
        domain: "itsaiagent.solutions",
        colorName: "Teal",
        colorHex: "#0d9488",
        nodes: [
            { id: "G", name: "GRID", pain: "I have no systems map", artifact: "Systems map / infrastructure SOP" },
            { id: "N", name: "NET", pain: "Nothing is documented or standardized", artifact: "SOPs / operational standardization doc" },
            { id: "I", name: "INFRA", pain: "My tech stack is a mess", artifact: "Tech stack map / integrations diagram" },
            { id: "NN", name: "NODE", pain: "I have no automation workflows", artifact: "Automation diagrams / workflow specs" },
            { id: "S", name: "SYNC", pain: "My team isn't aligned on anything", artifact: "Culture manual / alignment SOP" },
            { id: "U", name: "UTIL", pain: "I don't know where time and resources are wasted", artifact: "Efficiency report / utilization plan" },
            { id: "Z", name: "ZENITH", pain: "I set deadlines but never hit them", artifact: "Reality-adjusted timeline / enforced milestones" },
        ]
    },
    {
        id: "squad-3",
        name: "CAPITAL FLOOR",
        domain: "itsai.services",
        colorName: "Crimson",
        colorHex: "#dc2626",
        nodes: [
            { id: "C", name: "CENTURION", pain: "I don't have a pricing matrix", artifact: "Pricing matrix / profit floor analysis" },
            { id: "CC", name: "CORE", pain: "I don't actually know my unit economics", artifact: "Unit economics audit / financial model" },
            { id: "Y+", name: "YIELD+", pain: "I have untapped assets I'm not monetizing", artifact: "Profit yield map / untapped asset report" },
            { id: "F", name: "FLUX", pain: "I don't know when or how to pivot", artifact: "Pivot protocol / agility scorecard" },
            { id: "P", name: "PRIME", pain: "My product quality has no roadmap", artifact: "Product audit / quality roadmap" },
            { id: "UU", name: "UPLIFT", pain: "My workflow is inefficient and I can't focus", artifact: "Workflow optimization / focus protocol" },
        ]
    },
    {
        id: "squad-4",
        name: "GROWTH ENGINE",
        domain: "itsaiagents.online",
        colorName: "Royal Blue",
        colorHex: "#2563eb",
        nodes: [
            { id: "D", name: "DRIVE", pain: "I have no acquisition roadmap", artifact: "Acquisition roadmap / traffic model" },
            { id: "DD", name: "DYNAMO", pain: "My content has no hooks", artifact: "10 hooks / creative directions" },
            { id: "FF", name: "FRONTIER", pain: "My cold outreach is ignored", artifact: "Cold outreach scripts / lead response sequences" },
            { id: "E", name: "EXPAND", pain: "I can't amplify what I've already built", artifact: "Amplification map / reach forecast" },
            { id: "W", name: "WARP", pain: "I sit on ideas and never launch", artifact: "7-day sprint map / daily task breakdown" },
            { id: "W+", name: "WARP+", pain: "My launch schedule has no velocity", artifact: "WARP schedule / velocity audit" },
            { id: "T", name: "TRACTION", pain: "Nothing is building momentum", artifact: "Traction roadmap / momentum score" },
            { id: "R", name: "RIFT", pain: "I don't know how to disrupt my market", artifact: "Disruption strategy / market rift analysis" },
            { id: "M", name: "MIDAS", pain: "I have no referral or affiliate system", artifact: "Referral SOP / affiliate link map" },
        ]
    },
    {
        id: "squad-5",
        name: "CASH VELOCITY",
        domain: "itsai.chat",
        colorName: "Cyan",
        colorHex: "#06b6d4",
        nodes: [
            { id: "B", name: "BRIDGE", pain: "I don't know if this offer hits a real problem", artifact: "Validation score / offer-pain match report" },
            { id: "J", name: "JUNO", pain: "I can't book calls from cold messages", artifact: "DM script set / booking confirmation flow" },
            { id: "JJ", name: "JOLT", pain: "I need cash NOW from my existing list", artifact: "7-day reactivation campaign / cash spike model" },
            { id: "L", name: "LINK", pain: "I can't close — losing at the pitch", artifact: "Closing protocol / conversion audit" },
            { id: "LL", name: "LOCUS", pain: "I don't know which leads are ready to buy", artifact: "Lead intent score / retargeting map" },
            { id: "MM", name: "MIND", pain: "I don't understand what moves my buyer psychologically", artifact: "Psychological profile / influence strategy" },
            { id: "K", name: "KNOT", pain: "I have no scarcity or urgency", artifact: "Scarcity protocol / gate plan" },
            { id: "KK", name: "KINETIX", pain: "I have no VSL", artifact: "VSL script + storyboard" },
            { id: "QQ", name: "QUARK", pain: "My copy doesn't convert", artifact: "Optimized copy + logic score" },
            { id: "XX", name: "X-RAY", pain: "My funnel is leaking and I don't know where", artifact: "Funnel friction report / optimization list" },
            { id: "YY", name: "YIELD", pain: "I have no upsell or value ladder", artifact: "Upsell map / value-add copy" },
        ]
    },
    {
        id: "squad-6",
        name: "TRUST SHIELD",
        domain: "itsai.help",
        colorName: "Emerald",
        colorHex: "#059669",
        nodes: [
            { id: "AA", name: "ARBITER", pain: "My contracts are a liability", artifact: "Contract redline / risk report" },
            { id: "BB", name: "BULWARK", pain: "My customers are leaving and I don't know why", artifact: "Retention strategy / churn risk map" },
            { id: "H", name: "HUSH", pain: "I have a PR problem and no response plan", artifact: "PR response script / damage-control plan" },
            { id: "GG", name: "GARRISON", pain: "My copy and claims aren't compliant", artifact: "Compliance audit / safe-copy revision" },
            { id: "WA", name: "WATCH", pain: "I have no reputation monitoring", artifact: "Reputation monitoring plan / alert trigger map" },
            { id: "PR", name: "PROOF", pain: "I have no review collection system", artifact: "Review pipeline / social proof system" },
        ]
    },
    {
        id: "squad-7",
        name: "BRAND ALIVE",
        domain: "itsai.life",
        colorName: "Magenta",
        colorHex: "#db2777",
        nodes: [
            { id: "SS", name: "SCROLL", pain: "I have no brand voice", artifact: "Brand voice map / persona file" },
            { id: "PP", name: "PULSE", pain: "I have no content asset system", artifact: "Clip asset library / caption templates" },
            { id: "EE", name: "ECHO", pain: "I post but nothing gets distributed", artifact: "Distribution map / engagement protocol" },
            { id: "HH", name: "HIVE", pain: "I have no community or tribe strategy", artifact: "Tribal strategy / community engagement map" },
            { id: "VV", name: "VERVE", pain: "My creative is stale", artifact: "New angle deck / creative brief" },
            { id: "OO", name: "ORBIT", pain: "I have no LTV plan for my audience", artifact: "Orbit strategy / LTV projection" },
        ]
    },
    {
        id: "squad-8",
        name: "INTEL CORE",
        domain: "itsai.wiki",
        colorName: "Gold",
        colorHex: "#ca8a04",
        nodes: [
            { id: "A", name: "APEX", pain: "I have no north star", artifact: "North Star doc / dominance roadmap" },
            { id: "II", name: "INTEL", pain: "I have no competitive intelligence", artifact: "Intel report / competitor edge map" },
            { id: "TT", name: "TOME", pain: "I don't know what rivals are doing", artifact: "Rival forensics report / exploit map" },
            { id: "RR", name: "RECON", pain: "I can't read my market before I move", artifact: "Market read report / pre-move intelligence brief" },
            { id: "CU", name: "CURRENT", pain: "I don't know what trends are moving my market", artifact: "Trend analysis / market movement report" },
            { id: "SU", name: "SURVEY", pain: "I don't know the size and shape of my market", artifact: "Market sizing report / opportunity map" },
        ]
    },
    {
        id: "squad-9",
        name: "SIGNAL",
        domain: "itsai.blog",
        colorName: "Olive",
        colorHex: "#84cc16",
        nodes: [
            { id: "RT", name: "ROOT", pain: "Nobody finds me on Google", artifact: "SEO roadmap / keyword hierarchy" },
            { id: "RK", name: "RANK", pain: "I don't know which keywords I can win", artifact: "Winnable keyword shortlist / priority score" },
            { id: "CW", name: "CRAWL", pain: "My site has SEO issues I can't see", artifact: "Technical SEO audit / fix list" },
            { id: "AN", name: "ANCHOR", pain: "I write content but it doesn't rank", artifact: "Content brief / on-page optimization spec" },
            { id: "SG", name: "SIGNAL", pain: "I have no backlink strategy", artifact: "Link building target list / outreach angle" },
        ]
    },
    {
        id: "squad-10",
        name: "CONVERT",
        domain: "itsai.store",
        colorName: "Copper",
        colorHex: "#b45309",
        nodes: [
            { id: "SH", name: "SHELF", pain: "My product page doesn't convert", artifact: "Optimized product page copy + structure" },
            { id: "CT", name: "CART", pain: "People add to cart and disappear", artifact: "Abandoned cart recovery sequence" },
            { id: "VT", name: "VAULT", pain: "I have no upsell or order bump", artifact: "Upsell stack + order bump copy" },
            { id: "SL", name: "SEAL", pain: "My checkout flow leaks buyers", artifact: "Checkout friction audit + fix list" },
            { id: "BG", name: "BADGE", pain: "Nobody trusts my store enough to buy", artifact: "Trust signal stack / social proof plan" },
        ]
    }
];
