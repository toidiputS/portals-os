export interface PlatoonNode {
    id: string; // The 1-2 letter ID (e.g. "Z+", "VV", "O")
    name: string; // The Node name (e.g. "ZENITH+", "VERVE", "OMEGA")
    role: string;
    pain: string;
    artifact: string;
    purpose: string;
    mission: string;
    preFlight: {
        deployWhen: string;
        abstainWhen: string;
    };
    inputs: string;
    deliverables: string[];
    oracleInsight: string;
    prevNode: string;
    nextNode: string;
}

export interface PlatoonDomain {
    id: string; // e.g. "domain-vip"
    name: string; // e.g. "Legacy Vault"
    url: string; // e.g. "itsai.vip"
    colorName: string; // e.g. "Indigo"
    colorHex: string; // e.g. "#6366f1"
    description: string;
    nodes: PlatoonNode[];
}

export interface PlatoonSquad {
    id: string; // e.g. "squad-1"
    name: string; // e.g. "LEGACY VAULT PACK"
    description: string;
    nodeIds: string[]; // List of Node IDs included in this package
}

export const ORACLE_NODE = {
    id: "ORC",
    name: "ORACLE",
    domain: "itsyouonline.com",
    pain: "Intent diagnosis & routing",
    artifact: "Routes to correct node",
    colorHex: "#00ffff"
};

// ==========================================
// THE DOMAINS
// ==========================================
export const PLATOON_DOMAINS: PlatoonDomain[] = [
    {
        id: "domain-vip",
        name: "Chairman & Legacy",
        url: "itsai.vip",
        colorName: "Indigo",
        colorHex: "#6366f1",
        description: "Chairman & Exit Readiness. Transforms founder-run companies into sellable assets.",
        nodes: [
            {
                id: "ZZ", name: "ZENITH+", role: "Legacy", pain: "I don't know how to transition from operator to chairman", artifact: "Legacy blueprint / chairman transition plan",
                purpose: "Architecting the final payout, transition to Chairman, and legacy.",
                mission: "Architecting the final payout, transition to Chairman, and legacy.",
                preFlight: { deployWhen: "Exiting, Legacy building", abstainWhen: "Just starting out" },
                inputs: "Exit goals; Wealth target.", deliverables: ["Legacy Blueprint", "Zenith Document"],
                oracleInsight: "Architecting the final transition from Founder to Sovereign Chairman.",
                prevNode: "O", nextNode: "EXIT"
            },
            {
                id: "O", name: "OMEGA", role: "Exit", pain: "I don't know if my business is actually sellable", artifact: "Exit scorecard / sellability report",
                purpose: "Audits the business for 'Built-to-Sell' scores and exit readiness.",
                mission: "Audits the business for 'Built-to-Sell' scores and exit readiness.",
                preFlight: { deployWhen: "Preparing to sell, Valuation is unclear", abstainWhen: "Business is in infancy" },
                inputs: "3-year P&L; Operational manuals.", deliverables: ["Exit Scorecard", "Sellability Report"],
                oracleInsight: "Calculating the precise coordinates for your final sovereign exit event.",
                prevNode: "YY", nextNode: "ZZ"
            },
            {
                id: "VV", name: "VIEW", role: "Forecasting", pain: "I have no long-term vision document", artifact: "Vision roadmap / long-term forecast",
                purpose: "Predicts future trends and sets long-term sovereign vectors.",
                mission: "Predicts future trends and sets long-term sovereign vectors.",
                preFlight: { deployWhen: "Planning long term, Future proofing", abstainWhen: "Survival mode" },
                inputs: "Industry news; 10-year goal.", deliverables: ["Vision Roadmap", "Forecasting Model"],
                oracleInsight: "Projecting long-range sovereign vectors based on future-state reality.",
                prevNode: "FF", nextNode: "ZZ"
            },
            {
                id: "XX", name: "XENON", role: "Diagnostics", pain: "I don't know the health of my entire system", artifact: "Diagnostic Report/ Repair List",
                purpose: "Performs deep X-ray diagnostics to find hidden fractures in the machine.",
                mission: "Performs deep X-ray diagnostics to find hidden fractures in the machine.",
                preFlight: { deployWhen: "System failing, Health check", abstainWhen: "Ignorance is preferred" },
                inputs: "Full business data; System logs.", deliverables: ["Diagnostic Report", "Repair List"],
                oracleInsight: "Diagnosing deep structural fractures within the system architecture.",
                prevNode: "QQ", nextNode: "UU"
            },
            {
                id: "QQ", name: "QUOTA", role: "Metrics", pain: "I have no real KPI dashboard", artifact: "Metrics dashboard / Quota Report",
                purpose: "Tracks, measures, and visualizes success against hard industrial targets.",
                mission: "Tracks, measures, and visualizes success against hard industrial targets.",
                preFlight: { deployWhen: "Blind to performance, Accountability needed", abstainWhen: "No data streams" },
                inputs: "KPI list; Goal numbers.", deliverables: ["Live Metrics Dashboard", "Quota Report"],
                oracleInsight: "Visualizing the hard industrial targets required for sovereign scale.",
                prevNode: "NN", nextNode: "XX"
            }
        ]
    },
    {
        id: "domain-ops",
        name: "Operations & Automation",
        url: "itsaiagent.solutions",
        colorName: "Teal",
        colorHex: "#0d9488",
        description: "Replaces tribal chaos with a single, coherent operations playbook.",
        nodes: [
            {
                id: "GG", name: "GRID", role: "Systems", pain: "I have no systems map", artifact: "Systems map / infrastructure SOP",
                purpose: "Maps the entire business system to reveal operational leverage points.",
                mission: "Maps the entire business system to reveal operational leverage points.",
                preFlight: { deployWhen: "Scaling operations, Systemizing chaos", abstainWhen: "Product-market fit not established" },
                inputs: "Org chart; Current processes.", deliverables: ["Systems Map", "Infrastructure SOP"],
                oracleInsight: "Mapping the sovereign grid to lock in operational leverage.",
                prevNode: "XX", nextNode: "N"
            },
            {
                id: "N", name: "NET", role: "Process", pain: "Nothing is documented or standardized", artifact: "step-by-step SOPs / operational map",
                purpose: "Standardizes chaotic workflows into rigid, repeatable processes.",
                mission: "Standardizes chaotic workflows into rigid, repeatable processes.",
                preFlight: { deployWhen: "Hiring, Delegating, Quality is dropping", abstainWhen: "Processes change daily" },
                inputs: "Process recordings; Task lists.", deliverables: ["Step-by-step SOPs", "Operational Map"],
                oracleInsight: "Casting the net to capture and standardize operational chaos.",
                prevNode: "GG", nextNode: "I"
            },
            {
                id: "I", name: "INFRA", role: "Tech Stack", pain: "My tech stack is a mess", artifact: "Tech stack map / Technical specs",
                purpose: "Consolidates and architects the technology stack for maximum efficiency.",
                mission: "Consolidates and architects the technology stack for maximum efficiency.",
                preFlight: { deployWhen: "Software costs are high, Integrations break", abstainWhen: "Using single all-in-one tool" },
                inputs: "Current software list; Budget.", deliverables: ["Tech Stack Map", "Technical Specifications"],
                oracleInsight: "Architecting the digital infrastructure for seamless sovereign scaling.",
                prevNode: "N", nextNode: "NN"
            },
            {
                id: "NN", name: "NODE", role: "Automation", pain: "I have no automation workflows", artifact: "Automation diagrams / data flow map",
                purpose: "Replaces manual labor with programmatic automation sequences.",
                mission: "Replaces manual labor with programmatic automation sequences.",
                preFlight: { deployWhen: "Tasks are repetitive, Errors are high", abstainWhen: "Volume is too low to automate" },
                inputs: "Process maps; API docs.", deliverables: ["Automation Diagrams", "Data Flow Map"],
                oracleInsight: "Deploying programmatic nodes to eliminate manual friction.",
                prevNode: "I", nextNode: "QQ"
            },
            {
                id: "SS", name: "SYNC", role: "Culture", pain: "My team isn't aligned on anything", artifact: "Culture manual / alignment SOP",
                purpose: "Aligns the team under a unified sovereign culture code.",
                mission: "Aligns the team under a unified sovereign culture code.",
                preFlight: { deployWhen: "Culture is toxic, Alignment is off", abstainWhen: "Solo founder" },
                inputs: "Core values; Team survey.", deliverables: ["Culture Manual", "Alignment SOP"],
                oracleInsight: "Synchronizing the human element to the sovereign frequency.",
                prevNode: "UU", nextNode: "Z"
            },
            {
                id: "UU", name: "UTIL", role: "Efficiency", pain: "I don't know where time and resources are wasted", artifact: "Efficiency report / utilization plan",
                purpose: "Audits time and resource allocation to eliminate waste.",
                mission: "Audits time and resource allocation to eliminate waste.",
                preFlight: { deployWhen: "Team is overworked, Output is low", abstainWhen: "No tracked metrics" },
                inputs: "Time logs; Resource allocation.", deliverables: ["Efficiency Report", "Utilization Plan"],
                oracleInsight: "Extracting maximum utility from every sovereign asset.",
                prevNode: "XX", nextNode: "SS"
            },
            {
                id: "Z", name: "ZENITH", role: "Discipline", pain: "I set deadlines but never hit them", artifact: "Reality-adjusted timeline / enforced milestones",
                purpose: "Enforces reality-adjusted timelines and punishing execution discipline.",
                mission: "Enforces reality-adjusted timelines and punishing execution discipline.",
                preFlight: { deployWhen: "Missing deadlines, Project bloat", abstainWhen: "No urgent projects" },
                inputs: "Project plans; Historical velocity.", deliverables: ["Reality-Adjusted Timeline", "Enforced Milestones"],
                oracleInsight: "Enforcing absolute execution discipline at the highest zenith.",
                prevNode: "SS", nextNode: "END"
            }
        ]
    },
    {
        id: "domain-risk",
        name: "Capital & Pricing",
        url: "itsai.services",
        colorName: "Crimson",
        colorHex: "#dc2626",
        description: "Pricing & Profit Economics. Lock in your profit floor and unit economics.",
        nodes: [
            {
                id: "C", name: "CENTURION", role: "Pricing", pain: "I don't have a pricing matrix", artifact: "Pricing matrix / profit floor analysis",
                purpose: "Architects the price floor and ceiling for maximum structural profit.",
                mission: "Architects the price floor and ceiling for maximum structural profit.",
                preFlight: { deployWhen: "Margins are eroding, Launching a new tier", abstainWhen: "Costs are unknown" },
                inputs: "Delivery costs; Market comps; Desired margins.", deliverables: ["Pricing Matrix", "Profit Floor Analysis"],
                oracleInsight: "Enforcing a pricing architecture that mandates maximum profit extraction.",
                prevNode: "BB", nextNode: "CC"
            },
            {
                id: "CC", name: "CORE", role: "Finance", pain: "I don't actually know my unit economics", artifact: "Unit economics audit / profit optimization model",
                purpose: "Audits the financial engine to ensure scalability and structural profit.",
                mission: "Audits the financial engine to ensure scalability and structural profit.",
                preFlight: { deployWhen: "Scaling revenue, Profit is low", abstainWhen: "No revenue exists" },
                inputs: "P&L; Unit economics.", deliverables: ["Unit Economic Audit", "Profit Optimization Model"],
                oracleInsight: "Auditing the economic engine for infinite structural scalability.",
                prevNode: "C", nextNode: "YY"
            },
            {
                id: "YY", name: "YIELD+", role: "Assets", pain: "I have untapped assets I'm not monetizing", artifact: "Profit yield map / asset report",
                purpose: "Identifies and monetizes idle assets sitting within the business.",
                mission: "Identifies and monetizes idle assets sitting within the business.",
                preFlight: { deployWhen: "Cash is tight, Traffic is unmonetized", abstainWhen: "Just starting" },
                inputs: "Asset inventory; Traffic logs.", deliverables: ["Profit Yield Map", "Asset Monetization Report"],
                oracleInsight: "Extracting maximum yield from all dormant sovereign assets.",
                prevNode: "CC", nextNode: "O"
            },
            {
                id: "FF", name: "FLUX", role: "Agility", pain: "I don't know when or how to pivot", artifact: "Pivot protocol / agility scorecard",
                purpose: "Designs the pivot protocol for rapid market adaptation.",
                mission: "Designs the pivot protocol for rapid market adaptation.",
                preFlight: { deployWhen: "Market shifts, Product stagnation", abstainWhen: "Current vector is highly profitable" },
                inputs: "Market trends; Current offerings.", deliverables: ["Pivot Protocol", "Agility Scorecard"],
                oracleInsight: "Maintaining structural fluidity to exploit market flux.",
                prevNode: "P", nextNode: "VV"
            },
            {
                id: "U", name: "UPLIFT", role: "Focus", pain: "My workflow is inefficient and I can't focus", artifact: "optimized schedule / focus protocol",
                purpose: "Optimizes the founder's schedule to protect deep work and cognitive capacity.",
                mission: "Optimizes the founder's schedule to protect deep work and cognitive capacity.",
                preFlight: { deployWhen: "Burnout, Constant interruptions", abstainWhen: "Perfectly focused" },
                inputs: "Calendar; Task list.", deliverables: ["Optimized Schedule", "Focus Protocol"],
                oracleInsight: "Uplifting cognitive capacity to focus solely on sovereign leverage.",
                prevNode: "XX", nextNode: "Z"
            }
        ]
    },
    {
        id: "domain-growth",
        name: "Growth & Acquisition",
        url: "itsaiagents.online",
        colorName: "Royal Blue",
        colorHex: "#2563eb",
        description: "Acquisition & Launch Playbook. Your engine for hooks, traction, and scaling.",
        nodes: [
            {
                id: "DD", name: "DRIVE", role: "Growth", pain: "I have no acquisition roadmap", artifact: "Acquisition roadmap / traffic model",
                purpose: "Generates high-intent traffic mechanisms and acquisition logic.",
                mission: "Generates high-intent traffic mechanisms and acquisition logic.",
                preFlight: { deployWhen: "Traffic is flat, Relying on referrals", abstainWhen: "Offer is not validated" },
                inputs: "Current traffic sources; Budget.", deliverables: ["Acquisition Roadmap", "Traffic Model"],
                oracleInsight: "Driving sovereign acquisition vectors to capture maximum market share.",
                prevNode: "BB", nextNode: "EE"
            },
            {
                id: "D", name: "DYNAMO", role: "Hooks", pain: "My content has no hooks", artifact: "10 high-heat hooks / creative direction",
                purpose: "Generates high-velocity, scroll-stopping attention in the first 3 seconds.",
                mission: "Generates high-velocity, scroll-stopping attention in the first 3 seconds.",
                preFlight: { deployWhen: "Ads are ignored, CTR is low", abstainWhen: "The offer core is undefined" },
                inputs: "Offer core; Audience pain points.", deliverables: ["10 High-Heat Hooks", "Creative Direction"],
                oracleInsight: "Igniting high-velocity attention spikes to arrest the scroll instantly.",
                prevNode: "Q", nextNode: "E"
            },
            {
                id: "F", name: "FRONTIER", role: "Outreach", pain: "My cold outreach is ignored", artifact: "outreach scripts / lead response map",
                purpose: "Engineers cold outreach that bypasses defenses and initiates conversation.",
                mission: "Engineers cold outreach that bypasses defenses and initiates conversation.",
                preFlight: { deployWhen: "Cold email fails, DMs are ignored", abstainWhen: "Inbound is overflowing" },
                inputs: "Target persona; Outreach logs.", deliverables: ["Outreach Scripts", "Lead Response Map"],
                oracleInsight: "Pushing the frontier of cold acquisition to capture new territory.",
                prevNode: "DD", nextNode: "J"
            },
            {
                id: "EE", name: "EXPAND", role: "Amplification", pain: "I can't amplify what I've already built", artifact: "Amplification map / reach forecast",
                purpose: "Amplifies existing winners to maximize their reach and ROI.",
                mission: "Amplifies existing winners to maximize their reach and ROI.",
                preFlight: { deployWhen: "Found a winner, Need scale", abstainWhen: "No winning ads/content" },
                inputs: "Winning ad data; Audience size.", deliverables: ["Amplification Map", "Reach Forecast"],
                oracleInsight: "Expanding the blast radius of verified sovereign winners.",
                prevNode: "DD", nextNode: "TT"
            },
            {
                id: "W", name: "WARP", role: "Launch", pain: "I sit on ideas and never launch", artifact: "7-day sprint map / launch assets",
                purpose: "Compresses timelines to force immediate, messy, high-velocity launches.",
                mission: "Compresses timelines to force immediate, messy, high-velocity launches.",
                preFlight: { deployWhen: "Overthinking, Delayed launches", abstainWhen: "Refining a mature product" },
                inputs: "Product idea; Available assets.", deliverables: ["7-Day Sprint Map", "Launch Action Plan"],
                oracleInsight: "Warping reality to force immediate deployment and market contact.",
                prevNode: "TT", nextNode: "WW"
            },
            {
                id: "WW", name: "WARP+", role: "Velocity", pain: "My launch schedule has no velocity", artifact: "WARP schedule / velocity audit",
                purpose: "Sustains the high-velocity WARP state across the entire organization.",
                mission: "Sustains the high-velocity WARP state across the entire organization.",
                preFlight: { deployWhen: "Slow execution, Bureaucracy", abstainWhen: "Team is burning out" },
                inputs: "Current timelines; Team capacity.", deliverables: ["Velocity Audit", "WARP Schedule"],
                oracleInsight: "Sustaining terminal velocity to outpace all market adversaries.",
                prevNode: "W", nextNode: "ZZ"
            },
            {
                id: "TT", name: "TRACTION", role: "Momentum", pain: "Nothing is building momentum", artifact: "Traction roadmap / momentum score",
                purpose: "Converts initial sparks into compounding, unstoppable momentum.",
                mission: "Converts initial sparks into compounding, unstoppable momentum.",
                preFlight: { deployWhen: "Stuck in the mud, Launch failed", abstainWhen: "Already hyper-scaling" },
                inputs: "Recent launch data; User feedback.", deliverables: ["Traction Roadmap", "Momentum Score"],
                oracleInsight: "Engineering the grip required for uncontrollable upward traction.",
                prevNode: "EE", nextNode: "W"
            },
            {
                id: "RR", name: "RIFT", role: "Disruption", pain: "I don't know how to disrupt my market", artifact: "Disruption strategy / rift analysis",
                purpose: "Identifies fractures in the market to drive a wedge and disrupt incumbents.",
                mission: "Identifies fractures in the market to drive a wedge and disrupt incumbents.",
                preFlight: { deployWhen: "Market is saturated, Competitors are giant", abstainWhen: "Blue ocean strategy" },
                inputs: "Competitor weaknesses; Market complaints.", deliverables: ["Disruption Strategy", "Rift Analysis"],
                oracleInsight: "Tearing a rift in the market to drain power from incumbents.",
                prevNode: "T", nextNode: "AA"
            },
            {
                id: "M", name: "MIDAS", role: "Referral", pain: "I have no referral or affiliate system", artifact: "Referral SOP / affiliate link map",
                purpose: "Turns buyers into advocates, creating a golden compounding loop of specific referrals.",
                mission: "Turns buyers into advocates, creating a golden compounding loop of specific referrals.",
                preFlight: { deployWhen: "High NPS, No referral engine", abstainWhen: "Product is bad" },
                inputs: "Customer list; Existing rewards.", deliverables: ["Referral SOP", "Affiliate Link Map"],
                oracleInsight: "Activating the Midas touch to turn every client into golden leverage.",
                prevNode: "B", nextNode: "OO"
            }
        ]
    },
    {
        id: "domain-sales",
        name: "Sales & Conversion",
        url: "itsai.chat",
        colorName: "Cyan",
        colorHex: "#06b6d4",
        description: "Offer, Funnel & DM Conversion. Turn attention and leads into booked calls and cash.",
        nodes: [
            {
                id: "B", name: "BRIDGE", role: "Validation", pain: "I don't know if this offer hits a real problem", artifact: "Validation score / offer refinement",
                purpose: "Validates the connection between the high-level offer and the 'bleeding neck' problem.",
                mission: "Validates the connection between the high-level offer and the 'bleeding neck' problem.",
                preFlight: { deployWhen: "Launching new offers, Sales are inconsistent", abstainWhen: "Strategy (Apex) is undefined" },
                inputs: "Customer interviews; Offer draft.", deliverables: ["Validation Score", "Offer Refinement"],
                oracleInsight: "Calibrating the offer to strike the market's bleeding neck artery.",
                prevNode: "AA", nextNode: "DD"
            },
            {
                id: "J", name: "JUNO", role: "DMs", pain: "I can't book calls from cold messages", artifact: "DM script set / booking confirmation",
                purpose: "Converts cold outreach into booked calls using psychological triggers.",
                mission: "Converts cold outreach into booked calls using psychological triggers.",
                preFlight: { deployWhen: "Low response rates, Ghosting", abstainWhen: "Not doing cold outreach" },
                inputs: "Previous DM logs; Target persona.", deliverables: ["DM Script Set", "Booking Confirmation Flow"],
                oracleInsight: "Engineering DM interactions that bypass the prospect's logic and hook desire.",
                prevNode: "F", nextNode: "JJ"
            },
            {
                id: "JJ", name: "JOLT", role: "Cash Injection", pain: "I need cash NOW from my existing list", artifact: "jolt campaign / cash spike model",
                purpose: "Executes rapid, scarcity-driven campaigns to extract cash from an existing audience.",
                mission: "Executes rapid, scarcity-driven campaigns to extract cash from an existing audience.",
                preFlight: { deployWhen: "Cash crunch, End of quarter", abstainWhen: "Audience is burned out" },
                inputs: "Email list; Irresistible offer.", deliverables: ["Jolt Campaign Sequence", "Cash Spike Projection"],
                oracleInsight: "Administering a high-voltage shock to extract dormant liquid capital.",
                prevNode: "J", nextNode: "LL"
            },
            {
                id: "LL", name: "LINK", role: "Closing", pain: "I can't close — losing at the pitch", artifact: "Closing protocol / conversion audit",
                purpose: "Builds absolute closure certainty, removing the prospect's exit paths.",
                mission: "Builds absolute closure certainty, removing the prospect's exit paths.",
                preFlight: { deployWhen: "High show rate, Low close rate", abstainWhen: "Not taking sales calls" },
                inputs: "Sales call recordings; Objection list.", deliverables: ["Closing Protocol", "Conversion Audit"],
                oracleInsight: "Severing the prospect's exit routes to force the sovereign transaction.",
                prevNode: "JJ", nextNode: "L"
            },
            {
                id: "L", name: "LOCUS", role: "Intent", pain: "I don't know which leads are ready to buy", artifact: "Lead intent score / retargeting map",
                purpose: "Identifies and targets the highest-intent buyers actively seeking a solution.",
                mission: "Identifies and targets the highest-intent buyers actively seeking a solution.",
                preFlight: { deployWhen: "Low closing rate, Bad leads", abstainWhen: "Audience is tiny" },
                inputs: "Lead behavior data; CRM logs.", deliverables: ["Lead Intent Score", "Retargeting Map"],
                oracleInsight: "Targeting the exact locus of burning intent for maximum conversion efficiency.",
                prevNode: "LL", nextNode: "MM"
            },
            {
                id: "MM", name: "MIND", role: "Psychology", pain: "I don't understand what moves my buyer psychologically", artifact: "Psychological profile / influence strategy",
                purpose: "Decodes the buyer's hidden fears and desires to engineer extreme influence.",
                mission: "Decodes the buyer's hidden fears and desires to engineer extreme influence.",
                preFlight: { deployWhen: "Copy falls flat, Offers flop", abstainWhen: "Offer is a commodity" },
                inputs: "Customer interviews; Support tickets.", deliverables: ["Psychological Profile", "Influence Strategy"],
                oracleInsight: "Hacking the buyer's limbic system to bypass logical pricing objections.",
                prevNode: "L", nextNode: "KK"
            },
            {
                id: "KK", name: "KNOT", role: "Scarcity", pain: "I have no scarcity or urgency", artifact: "Scarcity protocol / value gate plan",
                purpose: "Engineers true scarcity and urgency to force the prospect's hand.",
                mission: "Engineers true scarcity and urgency to force the prospect's hand.",
                preFlight: { deployWhen: "Prospects delay, Long sales cycle", abstainWhen: "Selling commodities" },
                inputs: "Current offer structure; Delivery limits.", deliverables: ["Scarcity Protocol", "Value Gate Plan"],
                oracleInsight: "Tying the knot of urgency so tight the prospect cannot breathe.",
                prevNode: "MM", nextNode: "K"
            },
            {
                id: "K", name: "KINETIX", role: "VSL", pain: "I have no VSL", artifact: "VSL Full Script / storyboard",
                purpose: "Creates a kinetic Video Sales Letter that moves prospects from curiosity to conviction.",
                mission: "Creates a kinetic Video Sales Letter that moves prospects from curiosity to conviction.",
                preFlight: { deployWhen: "Funnel needs automated selling, VSL is outdated", abstainWhen: "Not running a funnel" },
                inputs: "Offer details; Target audience.", deliverables: ["VSL Script", "Storyboard"],
                oracleInsight: "Channeling raw kinetic energy to shatter the prospect's disbelief.",
                prevNode: "KK", nextNode: "Q"
            },
            {
                id: "Q", name: "QUARK", role: "Copy", pain: "My copy doesn't convert", artifact: "Optimized copy + logic score",
                purpose: "Strikes at the quantum level of persuasion, rewriting copy for lethal conversion.",
                mission: "Strikes at the quantum level of persuasion, rewriting copy for lethal conversion.",
                preFlight: { deployWhen: "Low CTR, Low conversion", abstainWhen: "No traffic" },
                inputs: "Current copy; Conversion rates.", deliverables: ["Optimized Copy", "Logic Score"],
                oracleInsight: "Rewriting the quantum fabric of your text to render it lethally persuasive.",
                prevNode: "K", nextNode: "X"
            },
            {
                id: "X", name: "X-RAY", role: "Funnel", pain: "My funnel is leaking and I don't know where", artifact: "friction report / optimization list",
                purpose: "Scans the funnel for invisible friction and silent drop-offs.",
                mission: "Scans the funnel for invisible friction and silent drop-offs.",
                preFlight: { deployWhen: "Traffic is high but sales are low", abstainWhen: "No funnel built" },
                inputs: "Funnel analytics; Heatmaps.", deliverables: ["Friction Report", "Optimization List"],
                oracleInsight: "Seeing through the noise to locate the silent bleed in your funnel.",
                prevNode: "Q", nextNode: "Y"
            },
            {
                id: "Y", name: "YIELD", role: "Upsell", pain: "I have no upsell or value ladder", artifact: "Upsell map / value-add copy",
                purpose: "Architects the post-purchase sequence to maximize Average Order Value.",
                mission: "Architects the post-purchase sequence to maximize Average Order Value.",
                preFlight: { deployWhen: "AOV is low, Front-end is unprofitable", abstainWhen: "No front-end product" },
                inputs: "Current product suite; Customer LTV.", deliverables: ["Upsell Map", "Value-Add Copy"],
                oracleInsight: "Extracting the absolute maximum yield from every single transaction.",
                prevNode: "X", nextNode: "P"
            }
        ]
    },
    {
        id: "domain-trust",
        name: "Support & Trust",
        url: "itsai.help",
        colorName: "Emerald",
        colorHex: "#059669",
        description: "Compliance & Retention. Bulletproof your customer trust and legal exposure.",
        nodes: [
            {
                id: "AA", name: "ARBITER", role: "Contracts", pain: "My contracts are a liability", artifact: "redlined document / risk-exposure report",
                purpose: "Shreds legal ambiguity to secure maximum leverage and IP protection.",
                mission: "Shreds legal ambiguity to secure maximum leverage and IP protection.",
                preFlight: { deployWhen: "Drafting new agreements, Reviewing legal exposure, Locking in IP", abstainWhen: "No legal documents exist yet" },
                inputs: "Draft contract; Counter-party history.", deliverables: ["Redlined Document", "Risk-Exposure Report"],
                oracleInsight: "Shredding legal ambiguity to secure absolute sovereign leverage.",
                prevNode: "G", nextNode: "CC"
            },
            {
                id: "BB", name: "BULWARK", role: "Retention", pain: "My customers are leaving and I don't know why", artifact: "Retention strategy / churn risk map",
                purpose: "Guards the customer relationship to prevent churn and ensure continuity.",
                mission: "Guards the customer relationship to prevent churn and ensure continuity.",
                preFlight: { deployWhen: "Churn rates are spiking, Customer sentiment is low", abstainWhen: "You have no active customers" },
                inputs: "Usage data; Churn alerts; Client feedback.", deliverables: ["Retention Strategy", "Churn Risk Map"],
                oracleInsight: "Fortifying the perimeter to render client churn mathematically impossible.",
                prevNode: "LL", nextNode: "M"
            },
            {
                id: "H", name: "HUSH", role: "PR & Crisis", pain: "I have a PR problem and no response plan", artifact: "response script / damage-control plan",
                purpose: "Silences negative noise and architects crisis control narratives.",
                mission: "Silences negative noise and architects crisis control narratives.",
                preFlight: { deployWhen: "Negative press, Viral complaints", abstainWhen: "Smooth sailing" },
                inputs: "Complaint details; Current public sentiment.", deliverables: ["Response Script", "Damage-Control Plan"],
                oracleInsight: "Deploying absolute silence upon adversarial noise.",
                prevNode: "WA", nextNode: "S"
            },
            {
                id: "G", name: "GARRISON", role: "Compliance", pain: "My copy and claims aren't compliant", artifact: "Compliance audit / safe-copy revision",
                purpose: "Fortifies marketing claims to withstand regulatory scrutiny.",
                mission: "Fortifies marketing claims to withstand regulatory scrutiny.",
                preFlight: { deployWhen: "Using aggressive claims, Regulators are watching", abstainWhen: "Selling physical goods with no claims" },
                inputs: "Sales copy; Ad creatives.", deliverables: ["Compliance Audit", "Safe-Copy Revision"],
                oracleInsight: "Garrisoning your claims behind an impenetrable wall of compliance.",
                prevNode: "A", nextNode: "WA"
            },
            {
                id: "WA", name: "WATCH", role: "Reputation", pain: "I have no reputation monitoring", artifact: "Reputation monitoring plan / alert trigger map",
                purpose: "Monitors the digital exhaust for sentiment shifts and brand attacks.",
                mission: "Monitors the digital exhaust for sentiment shifts and brand attacks.",
                preFlight: { deployWhen: "Brand is growing, Trolls appearing", abstainWhen: "Unknown brand" },
                inputs: "Brand keywords; Competitor handles.", deliverables: ["Reputation Monitoring Plan", "Alert Trigger Map"],
                oracleInsight: "Watching the digital horizon to neutralize threats before they form.",
                prevNode: "G", nextNode: "H"
            },
            {
                id: "PR", name: "PROOF", role: "Social Proof", pain: "I have no review collection system", artifact: "Review pipeline / social proof system",
                purpose: "Automates the collection and magnification of overwhelming social proof.",
                mission: "Automates the collection and magnification of overwhelming social proof.",
                preFlight: { deployWhen: "Low conversion, Few reviews", abstainWhen: "No customers yet" },
                inputs: "Customer list; Existing reviews.", deliverables: ["Review Pipeline", "Social Proof System"],
                oracleInsight: "Generating undeniable mathematical proof of your sovereign value.",
                prevNode: "BA", nextNode: "C"
            },
            {
                id: "PP", name: "PRIME", role: "Quality", pain: "My product quality has no roadmap", artifact: "Product audit / quality roadmap",
                purpose: "Enforces product superiority to guarantee retention and LTV.",
                mission: "Enforces product superiority to guarantee retention and LTV.",
                preFlight: { deployWhen: "Refunds increase, Complaints rise", abstainWhen: "Product is flawless" },
                inputs: "Customer feedback; Competitor products.", deliverables: ["Product Audit", "Quality Roadmap"],
                oracleInsight: "Engineering the prime deliverable for absolute market dominance.",
                prevNode: "Y", nextNode: "FF"
            }
        ]
    },
    {
        id: "domain-brand",
        name: "Brand & Content",
        url: "itsai.life",
        colorName: "Magenta",
        colorHex: "#db2777",
        description: "Voice, Content & Tribe. Form your community and build your content flywheel.",
        nodes: [
            {
                id: "S", name: "SCROLL", role: "Brand Voice", pain: "I have no brand voice", artifact: "Brand voice map / persona file",
                purpose: "Codifies the unique resonance and lexicon of the sovereign brand.",
                mission: "Codifies the unique resonance and lexicon of the sovereign brand.",
                preFlight: { deployWhen: "Sounding like everyone else, Writing is hard", abstainWhen: "Voice is perfectly dialed" },
                inputs: "Past writing; Inspirations.", deliverables: ["Brand Voice Map", "Persona File"],
                oracleInsight: "Codifying the lethal syntax required to separate from the herd.",
                prevNode: "H", nextNode: "P"
            },
            {
                id: "P", name: "PULSE", role: "Content Engine", pain: "I have no content asset system", artifact: "asset library / caption set",
                purpose: "Maintains a relentless, un-ignorable heartbeat of content assets.",
                mission: "Maintains a relentless, un-ignorable heartbeat of content assets.",
                preFlight: { deployWhen: "Inconsistent posting, Out of ideas", abstainWhen: "Content machine is perfect" },
                inputs: "Core topics; Available time.", deliverables: ["Asset Library", "Caption Set"],
                oracleInsight: "Maintaining the relentless pulse required to command ongoing attention.",
                prevNode: "S", nextNode: "E"
            },
            {
                id: "E", name: "ECHO", role: "Distribution", pain: "I post but nothing gets distributed", artifact: "Distribution map / engagement protocol",
                purpose: "Engineers the echo chamber effect to magnify a single message infinitely.",
                mission: "Engineers the echo chamber effect to magnify a single message infinitely.",
                preFlight: { deployWhen: "Low reach, Wasted content", abstainWhen: "Platform monopoly" },
                inputs: "Current content; Platform list.", deliverables: ["Distribution Map", "Engagement Protocol"],
                oracleInsight: "Magnifying the original signal until it deafens the competition.",
                prevNode: "D", nextNode: "HH"
            },
            {
                id: "HH", name: "HIVE", role: "Community", pain: "I have no community or tribe strategy", artifact: "Tribal strategy / engagement map",
                purpose: "Architects the tribal structure to convert audiences into cult followings.",
                mission: "Architects the tribal structure to convert audiences into cult followings.",
                preFlight: { deployWhen: "No engagement, Audience feels cold", abstainWhen: "Not building a community" },
                inputs: "Audience demographics; Platform.", deliverables: ["Tribal Strategy", "Engagement Map"],
                oracleInsight: "Architecting the hive mind to build an impenetrable sovereign cult.",
                prevNode: "E", nextNode: "V"
            },
            {
                id: "V", name: "VERVE", role: "Creative", pain: "My creative is stale", artifact: "New angle deck / creative brief",
                purpose: "Injects raw, disruptive energy into tired creative formats.",
                mission: "Injects raw, disruptive energy into tired creative formats.",
                preFlight: { deployWhen: "Ad fatigue, Low engagement", abstainWhen: "Creative is crushing it" },
                inputs: "Current ads; Competitor ads.", deliverables: ["New Angle Deck", "Creative Brief"],
                oracleInsight: "Injecting violent, disruptive verve to shatter market exhaustion.",
                prevNode: "HH", nextNode: "OO"
            },
            {
                id: "OO", name: "ORBIT", role: "LTV", pain: "I have no LTV plan for my audience", artifact: "Orbit strategy / LTV projection",
                purpose: "Designs the gravitational pull to trap users in your product ecosystem.",
                mission: "Designs the gravitational pull to trap users in your product ecosystem.",
                preFlight: { deployWhen: "High churn, Low repeat buyers", abstainWhen: "Single-purchase product" },
                inputs: "Product ecosystem; User journey logs.", deliverables: ["Orbit Strategy", "LTV Projection"],
                oracleInsight: "Locking assets in geostationary orbit for infinite LTV extraction.",
                prevNode: "M", nextNode: "END"
            }
        ]
    },
    {
        id: "domain-intel",
        name: "Market Intelligence",
        url: "itsai.wiki",
        colorName: "Gold",
        colorHex: "#ca8a04",
        description: "Competitive Intelligence & Market Recon. Real-time intel to outmaneuver the competition.",
        nodes: [
            {
                id: "A", name: "APEX", role: "Strategy", pain: "I have no north star", artifact: "North Star doc / dominance roadmap",
                purpose: "Defines the highest-level strategic objectives and market dominance vectors.",
                mission: "Defines the highest-level strategic objectives and market dominance vectors.",
                preFlight: { deployWhen: "Vision is blurry, Entering new markets, Seeking dominance", abstainWhen: "Stuck in tactical fires" },
                inputs: "Market landscape; Resource inventory.", deliverables: ["North Star Objective", "Market Dominance Roadmap"],
                oracleInsight: "Architecting the North Star vector for total market supremacy.",
                prevNode: "RR", nextNode: "BB"
            },
            {
                id: "II", name: "INTEL", role: "Competitor Intel", pain: "I have no competitive intelligence", artifact: "Intel report / competitor edge map",
                purpose: "Extracts and synthesizes competitor strategies to find their structural weaknesses.",
                mission: "Extracts and synthesizes competitor strategies to find their structural weaknesses.",
                preFlight: { deployWhen: "Losing deals to competitors, Blind to the market", abstainWhen: "Absolute monopoly" },
                inputs: "Competitor URLs; Market positioning.", deliverables: ["Intel Report", "Competitor Edge Map"],
                oracleInsight: "Extracting the hidden frequencies of your competitors' strategies.",
                prevNode: "A", nextNode: "CU"
            },
            {
                id: "T", name: "TOME", role: "Forensics", pain: "I don't know what rivals are doing", artifact: "Rival forensics report / exploit map",
                purpose: "Decompiles competitor funnels, offers, and narratives down to the code.",
                mission: "Decompiles competitor funnels, offers, and narratives down to the code.",
                preFlight: { deployWhen: "Competitor is out-scaling you", abstainWhen: "Irrelevant competitors" },
                inputs: "Competitor ads; Competitor funnel pages.", deliverables: ["Rival Forensics Report", "Exploit Map"],
                oracleInsight: "Decompiling the adversarial tome to locate their absolute zero-day.",
                prevNode: "II", nextNode: "RR"
            },
            {
                id: "RE", name: "RECON", role: "Market Reading", pain: "I can't read my market before I move", artifact: "Market read report / pre-move intelligence brief",
                purpose: "Scouts the terrain before deployment to guarantee a dominant strike.",
                mission: "Scouts the terrain before deployment to guarantee a dominant strike.",
                preFlight: { deployWhen: "About to launch, Risk is high", abstainWhen: "Testing is cheap" },
                inputs: "Market data; Launch plan.", deliverables: ["Market Read Report", "Intelligence Brief"],
                oracleInsight: "Scouting the perimeter to ensure maximum devastation upon deployment.",
                prevNode: "T", nextNode: "CU"
            },
            {
                id: "CU", name: "CURRENT", role: "Trends", pain: "I don't know what trends are moving my market", artifact: "Trend analysis / market movement report",
                purpose: "Analyzes real-time market movements to identify rising tides.",
                mission: "Analyzes real-time market movements to identify rising tides.",
                preFlight: { deployWhen: "Market feels stale, Seeking new angles", abstainWhen: "Strategy is fixed" },
                inputs: "Industry vertical; Competitor list.", deliverables: ["Trend analysis", "Market movement report"],
                oracleInsight: "Analyzing real-time market currents to identify rising tides.",
                prevNode: "II", nextNode: "FF"
            },
            {
                id: "SU", name: "SURVEY", role: "Market Size", pain: "I don't know the size and shape of my market", artifact: "Market sizing report / opportunity map",
                purpose: "Calculates the total addressable market to validate the juice is worth the squeeze.",
                mission: "Calculates the total addressable market to validate the juice is worth the squeeze.",
                preFlight: { deployWhen: "Raising capital, Entering new niche", abstainWhen: "Market is obviously massive" },
                inputs: "Niche description; Product price.", deliverables: ["Market Sizing Report", "Opportunity Map"],
                oracleInsight: "Measuring the exact dimensions of the battlefield before the war begins.",
                prevNode: "RE", nextNode: "A"
            }
        ]
    },
    {
        id: "domain-signal",
        name: "SEO & Content",
        url: "itsai.blog",
        colorName: "Olive",
        colorHex: "#84cc16",
        description: "SEO Audit & Keyword Roadmap. Own search intent and traffic.",
        nodes: [
            {
                id: "R", name: "ROOT", role: "SEO Roadmap", pain: "Nobody finds me on Google", artifact: "SEO roadmap / keyword hierarchy",
                purpose: "Architects the foundational SEO strategy to dominate the SERPs.",
                mission: "Architects the foundational SEO strategy to dominate the SERPs.",
                preFlight: { deployWhen: "Traffic is zero, Need organic growth", abstainWhen: "Relying 100% on paid ads" },
                inputs: "Current website; Competitor URLs.", deliverables: ["SEO Roadmap", "Keyword Hierarchy"],
                oracleInsight: "Planting the sovereign root deep into the algorithmic bedrock.",
                prevNode: "SI", nextNode: "CR"
            },
            {
                id: "RA", name: "RANK", role: "Keywords", pain: "I don't know which keywords I can win", artifact: "Winnable keyword shortlist / priority score",
                purpose: "Identifies the exact low-resistance vectors to rank immediately.",
                mission: "Identifies the exact low-resistance vectors to rank immediately.",
                preFlight: { deployWhen: "Writing blind, Not ranking", abstainWhen: "Site has massive Authority already" },
                inputs: "Niche topics; Competitor keywords.", deliverables: ["Winnable Keyword Shortlist", "Priority Score"],
                oracleInsight: "Locating the path of absolute least resistance to the zenith of search.",
                prevNode: "R", nextNode: "AN"
            },
            {
                id: "CR", name: "CRAWL", role: "Tech SEO", pain: "My site has SEO issues I can't see", artifact: "Technical SEO audit / fix list",
                purpose: "Scans the technical infrastructure for invisible friction and errors.",
                mission: "Scans the technical infrastructure for invisible friction and errors.",
                preFlight: { deployWhen: "Rankings dropped, Site speed is slow", abstainWhen: "Site is brand new" },
                inputs: "Site URL; Search Console access.", deliverables: ["Technical SEO audit", "Fix list"],
                oracleInsight: "Scanning technical infrastructure for invisible friction points.",
                prevNode: "R", nextNode: "X"
            },
            {
                id: "AN", name: "ANCHOR", role: "Content", pain: "I write content but it doesn't rank", artifact: "Content brief / on-page optimization spec",
                purpose: "Optimizes on-page content to lock in relevance and authority.",
                mission: "Optimizes on-page content to lock in relevance and authority.",
                preFlight: { deployWhen: "Content is flat, Rankings are stuck", abstainWhen: "Keyword is unreachable" },
                inputs: "Target keyword; Draft content.", deliverables: ["Content brief", "On-page optimization spec"],
                oracleInsight: "Locking in on-page relevance for maximum authority signaling.",
                prevNode: "RA", nextNode: "SI"
            },
            {
                id: "SI", name: "SIGNAL", role: "Backlinks", pain: "I have no backlink strategy", artifact: "Link building target list / outreach angle",
                purpose: "Architects the off-page trust signals required to manipulate the algorithm.",
                mission: "Architects the off-page trust signals required to manipulate the algorithm.",
                preFlight: { deployWhen: "Stuck on page 2, Authority is low", abstainWhen: "No content published yet" },
                inputs: "Competitor backlink profile; Outreach tool.", deliverables: ["Link Building Target List", "Outreach Angle"],
                oracleInsight: "Broadcasting undisputed authority signals across the entire web.",
                prevNode: "AN", nextNode: "R"
            }
        ]
    },
    {
        id: "domain-store",
        name: "Ecommerce",
        url: "itsai.store",
        colorName: "Copper",
        colorHex: "#b45309",
        description: "Cart & Checkout Pack. Turn store traffic into completed sales.",
        nodes: [
            {
                id: "SH", name: "SHELF", role: "Product Page", pain: "My product page doesn't convert", artifact: "Optimized product page copy + structure",
                purpose: "Architects the digital shelf to maximize desire and minimize friction.",
                mission: "Architects the digital shelf to maximize desire and minimize friction.",
                preFlight: { deployWhen: "High traffic, Low Add to Carts", abstainWhen: "No products" },
                inputs: "Current product page; Product features.", deliverables: ["Optimized Product Page Copy", "Structure Wireframe"],
                oracleInsight: "Displaying the sovereign asset with lethal, irresistible clarity.",
                prevNode: "PR", nextNode: "CA"
            },
            {
                id: "CA", name: "CART", role: "Recovery", pain: "People add to cart and disappear", artifact: "Abandoned cart recovery sequence",
                purpose: "Recovers lost revenue from users who abandoned the transaction.",
                mission: "Recovers lost revenue from users who abandoned the transaction.",
                preFlight: { deployWhen: "Cart abandonment is high, Revenue is leaking", abstainWhen: "Checkout is broken" },
                inputs: "Checkout flow; Email provider.", deliverables: ["Abandoned cart recovery sequence", "Friction removal"],
                oracleInsight: "Recovering lost revenue from abandoned transaction events.",
                prevNode: "SH", nextNode: "SE"
            },
            {
                id: "VA", name: "VAULT", role: "AOV", pain: "I have no upsell or order bump", artifact: "Upsell stack + order bump copy",
                purpose: "Locks in additional margin pre-purchase using high-value bumps.",
                mission: "Locks in additional margin pre-purchase using high-value bumps.",
                preFlight: { deployWhen: "AOV is low, Margins are tight", abstainWhen: "No complementary products" },
                inputs: "Product catalog; Margin requirements.", deliverables: ["Upsell Stack", "Order Bump Copy"],
                oracleInsight: "Unlocking the vault to extract maximum capital per transaction.",
                prevNode: "SE", nextNode: "SH"
            },
            {
                id: "SE", name: "SEAL", role: "Checkout", pain: "My checkout flow leaks buyers", artifact: "Checkout friction audit + fix list",
                purpose: "Seals the leaks in the checkout flow to guarantee conversion.",
                mission: "Seals the leaks in the checkout flow to guarantee conversion.",
                preFlight: { deployWhen: "High Add to Cart, Low Purchase", abstainWhen: "SaaS stripe link" },
                inputs: "Checkout analytics; Payment providers.", deliverables: ["Checkout Friction Audit", "Fix List"],
                oracleInsight: "Sealing the perimeter to ensure the capital exchange is absolute.",
                prevNode: "CA", nextNode: "VA"
            },
            {
                id: "BA", name: "BADGE", role: "Trust Signals", pain: "Nobody trusts my store enough to buy", artifact: "Trust signal stack / social proof plan",
                purpose: "Deploys psychological trust signals to eliminate buyer hesitation.",
                mission: "Deploys psychological trust signals to eliminate buyer hesitation.",
                preFlight: { deployWhen: "Conversion is low, Brand is new", abstainWhen: "Product is a scam" },
                inputs: "Certifications; Reviews; Policies.", deliverables: ["Trust signal stack", "Social proof plan"],
                oracleInsight: "Deploying psychological trust signals to eliminate hesitation.",
                prevNode: "SE", nextNode: "PR"
            }
        ]
    }
];

// ==========================================
// THE SQUADS (PROMOTIONAL PACKAGES)
// ==========================================
export const PLATOON_SQUADS: PlatoonSquad[] = [
    {
        id: "squad-1",
        name: "Legacy Vault: Chairman & Exit Readiness",
        description: "Transforms founder-run companies into sellable, chairman-led assets.",
        nodeIds: ["ZZ", "O", "VV", "XX", "QQ"]
    },
    {
        id: "squad-2",
        name: "OPS IRON: Operations Playbook",
        description: "Replaces tribal chaos with a single, coherent operations playbook.",
        nodeIds: ["GG", "N", "I", "NN", "SS", "UU", "Z"]
    },
    {
        id: "squad-3",
        name: "CAPITAL FLOOR: Pricing & Profit",
        description: "Gives you a pricing matrix, unit economics model, and yield map.",
        nodeIds: ["C", "CC", "YY", "FF", "P", "U"]
    },
    {
        id: "squad-4",
        name: "GROWTH ENGINE: Acquisition & Launch",
        description: "Acquisition roadmap, hooks, outreach scripts, and launch schedules.",
        nodeIds: ["DD", "D", "F", "EE", "W", "WW", "TT", "RR", "M"]
    },
    {
        id: "squad-5",
        name: "CASH VELOCITY: Offer & Conversion",
        description: "Validated offers, DM scripts, jolt campaigns, and scarcity protocols.",
        nodeIds: ["B", "J", "JJ", "LL", "L", "MM", "KK", "K", "Q", "X", "Y"]
    },
    {
        id: "squad-6",
        name: "TRUST SHIELD: Compliance & Retention",
        description: "Redlined contracts, churn maps, crisis response, and reputation radar.",
        nodeIds: ["A", "B", "H", "G", "WA", "PR"]
    },
    {
        id: "squad-7",
        name: "BRAND ALIVE: Voice & Content",
        description: "Brand voice map, content library, distribution, and tribal strategy.",
        nodeIds: ["S", "P", "E", "HH", "V", "OO"]
    },
    {
        id: "squad-8",
        name: "INTEL CORE: Competitive Recon",
        description: "North star roadmap, rival intel reports, forensics, and sizing.",
        nodeIds: ["A", "II", "T", "RE", "CU", "SU"]
    },
    {
        id: "squad-9",
        name: "SIGNAL: SEO Audit & Keyword",
        description: "SEO roadmap, winnable keywords, content briefs, and backlinks.",
        nodeIds: ["R", "RA", "CR", "AN", "SI"]
    },
    {
        id: "squad-10",
        name: "CONVERT: Cart & Checkout",
        description: "Optimized pages, recovery sequences, upsells, and trust signals.",
        nodeIds: ["SH", "CA", "VA", "SE", "BA"]
    }
];

// Helper to find a node by ID across all domains
export const getNodeById = (nodeId: string): PlatoonNode | undefined => {
    for (const domain of PLATOON_DOMAINS) {
        const found = domain.nodes.find(n => n.id === nodeId);
        if (found) return found;
    }
    return undefined;
};