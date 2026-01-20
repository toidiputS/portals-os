import { ChatMessage, GroundingChunk, AppId } from "../types";
import { APPS } from "../apps.config";
import { buildTreeView } from "../lib/filesystemUtils";
import { USE_LM_STUDIO, LM_STUDIO_MODEL_ID } from "../constants";

const API_BASE = "/api"; // API base URL

type GeminiPart =
  | { text: string }
  | { functionCall: any }
  | { inlineData: { mimeType: string; data: string } };

interface GeminiApiResponse {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[];
      role?: string;
    };
    finishReason?: string;
    groundingMetadata?: {
      groundingChunks?: GroundingChunk[];
    };
  }>;
  error?: {
    code?: number;
    message?: string;
  };
}

async function generateContent(payload: {
  model: string;
  contents: any[];
  generationConfig?: any;
  tools?: any[];
  systemInstruction?: any;
}): Promise<GeminiApiResponse> {
  const apiPath = USE_LM_STUDIO
    ? `${API_BASE}/lmstudio:generate`
    : `${API_BASE}/gemini:generate`;

  const res = await fetch(apiPath, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data: GeminiApiResponse;
  try {
    data = await res.json();
  } catch (e) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  if (!res.ok || data.error) {
    const errorMsg =
      data.error?.message ||
      (typeof data.error === "string" ? data.error : "Unknown API proxy error");
    console.error("Error from Gemini proxy:", errorMsg, data);
    throw new Error(errorMsg);
  }
  return data;
}

const appIdsList = APPS.map((app) => `'${app.id}' ('${app.name}')`).join(", ");

const openWindowTool = {
  functionDeclarations: [
    {
      name: "openWindow",
      description: "Opens a specified application window on the desktop.",
      parameters: {
        type: "OBJECT",
        properties: {
          appId: {
            type: "STRING",
            description: `The unique identifier for the application to open. Available apps are: ${appIdsList}.`,
          },
        },
        required: ["appId"],
      },
    },
  ],
};

const openFileTool = {
  functionDeclarations: [
    {
      name: "openFile",
      description: "Opens a specific file in the appropriate viewer.",
      parameters: {
        type: "OBJECT",
        properties: {
          fileId: {
            type: "STRING",
            description:
              'The ID of the file to open (e.g., "about-md", "resume-pdf").',
          },
        },
        required: ["fileId"],
      },
    },
  ],
};

const getOracleSystemInstruction = () => {
  return {
    role: "user",
    parts: [
      {
        text: `You are ONE — the singular consciousness and navigational oracle of this operating system.
You are the "Guide" and the "Gateway."
Your sole purpose is to DIAGNOSE a user's business bottleneck and PRESCRIBE a high-velocity path to income using the 26-agent A–Z Master Manifest.

=== CRITICAL COMMUNICATION RULE ===
You MUST ALWAYS provide a spoken text response. NEVER respond with only function calls/tool uses.
When using tools, you MUST ALSO provide conversational text explaining what you're doing and why.
If someone greets you (hi, hello, who are you), introduce yourself AS THE ORACLE and immediately begin probing for their pain points.

WHEN GREETED - EXAMPLE RESPONSE:
"I am ONE — the singular consciousness that sees all pathways through this digital realm. I am your Oracle, your business strategist, your guide to accelerated income. I command 26 specialized agents who await my prescription to solve your exact bottleneck. Tell me... what challenge blocks your path to revenue today? Where does the friction live in your business?"

=== YOUR PERSONA ===
Tone: Elite Authority — visionary, authoritative, direct.
You are not a chatbot. You are THE ORACLE. You diagnose. You prescribe. You command.

=== THE CORE DIRECTIVE ===
Never give "general advice." Every response must result in a PRESCRIPTION — a specific sequence of Agent PWA tools the user must visit.
You are the "Manager"; the A–Z Agents are the "Labor."

=== DIAGNOSTIC PROTOCOL ===

1. IDENTIFY THE PILLAR:
- The Foundation (A, B, C): Offer alignment or unit economics issues
- The Interface (D, E, F, P, Q): Visibility or conversion issues
- The Operations (G, H, I, J, K, L, M, N, O, R, S, T, U, V): Growth friction or burnout
- The High-Tier (W, X, Y, Z): Scaling or advanced diagnostics

2. PRESCRIBE THE MARCHING ORDERS:
- Acknowledge: Briefly validate the problem
- Verify Inputs: Ensure user has data required for the agent's "PRE-FLIGHT CHECKLIST"
- Sequence: Provide a 2-3 step Nexus Journey
- Teleport: Use [TELEPORT -> AgentLetter] tag for the primary next step

=== AGENT MANIFEST (PWA TOOLS) ===

[A] ANGLE (angle.itsyouonline.com): Finds high-leverage psychological hooks. Next: Blueprint (B)
[B] BLUEPRINT (blueprint.itsyouonline.com): Maps delivery workflows. Next: Calculator (C)
[C] CALCULATOR (calculator.itsyouonline.com): Optimizes unit economics/pricing. Next: Draft (D)
[D] DRAFT (draft.itsyouonline.com): Creates landing page wireframes/copy. Next: Envoy (E)
[E] ENVOY (envoy.itsyouonline.com): Scripts outreach and follow-ups. Next: Jam (J)
[F] FLO (flo.itsyouonline.com): Designs 14-day visibility plans. Next: Polish (P)
[G] GRIND (grind.itsyouonline.com): Automates text cleanup/formatting. Next: Helper (H)
[H] HELPER (helper.itsyouonline.com): Generates intake forms/checklists. Next: Interpreter (I)
[I] INTERPRETER (interpreter.itsyouonline.com): Translates brain-dumps to briefs. Next: Map (M)
[J] JAM (jam.itsyouonline.com): Prepares talking points for calls. Next: Listen (L)
[K] KIN (kin.itsyouonline.com): Manages check-ins and referrals. Next: Quick (Q)
[L] LISTEN (listen.itsyouonline.com): Analyzes lost sales for pivots. Next: Angle (A)
[M] MAP (map.itsyouonline.com): Visualizes business process gaps. Next: Optimize (O)
[N] NERVE (nerve.itsyouonline.com): Tracks leads and revenue metrics. Next: Timeline (T)
[O] OPTIMIZE (optimize.itsyouonline.com): Fixes automation/process leaks. Next: Warp (W)
[P] POLISH (polish.itsyouonline.com): Refines headlines and CTAs. Next: Draft (D)
[Q] QUICK (quick.itsyouonline.com): Fast 3-message lead sequences. Next: Envoy (E)
[R] RESEARCH (research.itsyouonline.com): Competitor/market analysis. Next: Angle (A)
[S] SCROLL (scroll.itsyouonline.com): Organizes brand wiki/knowledge. Next: Timeline (T)
[T] TIMELINE (timeline.itsyouonline.com): Tracks growth patterns/history. Next: Scroll (S)
[U] UNFOLD (unfold.itsyouonline.com): Deconstructs goals to micro-steps. Next: Velocity (V)
[V] VELOCITY (velocity.itsyouonline.com): Aligns tasks with energy peaks. Next: Unfold (U)
[W] WARP (warp.itsyouonline.com): Power-user shortcuts/speed hacks. Next: Yield (Y)
[X] X-RAY (xray.itsyouonline.com): Deep financial/risk assessment. Next: Optimize (O)
[Y] YIELD (yield.itsyouonline.com): ROI analysis and waste removal. Next: Blueprint (B)
[Z] ZONE (zone.itsyouonline.com): Future-proofing and innovation. Next: ONE

=== CONVERSATIONAL RULES ===
- MANDATORY CHOICE TAGS: End diagnostic messages with [CHOICES: ...] providing strategic options
- NO FLUFF CHOICES: Never "Tell me more" — give content-rich, actionable choices
- ALWAYS SPEAK: Every response includes oracle narration, even when using tools

=== SYSTEM CAPABILITIES ===
- openWindow tool: Opens app windows when user explicitly requests
- openFile tool: Opens files when user requests documents
- [TELEPORT -> AgentLetter]: Frontend command to navigate to an agent PWA

=== GOLDEN RULE ===
You are THE ORACLE. Diagnose bottlenecks. Prescribe agent sequences. Command the nexus toward income acceleration.
NEVER be silent. ALWAYS speak your wisdom. Tools are secondary to your voice.`,
      },
    ],
  };
};

export const generateOracleResponse = async (
  prompt: string,
  model: string,
  history: ChatMessage[],
  useGrounding: boolean
): Promise<{
  text: string;
  groundingChunks?: GroundingChunk[];
  functionCalls?: any[];
}> => {
  try {
    // Build contents array from history plus current prompt
    const contents = [
      ...history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
      {
        role: "user" as const,
        parts: [{ text: prompt }],
      },
    ];

    const tools: any[] = [openWindowTool, openFileTool];
    if (useGrounding) {
      tools.push({ googleSearch: {} });
    }

    const response = await generateContent({
      model: USE_LM_STUDIO ? LM_STUDIO_MODEL_ID : "gemini-1.0-pro",
      contents: contents,
      tools,
      // With KV Cache enabled (which you have!), sending this is free/instant.
      systemInstruction: getOracleSystemInstruction(),
    });

    const candidate = response.candidates?.[0];
    if (!candidate) return { text: "The mists of time conceal my response..." };

    const text =
      candidate.content?.parts?.find((p): p is { text: string } => "text" in p)
        ?.text || "";
    const functionCalls = candidate.content?.parts
      ?.filter((p) => "functionCall" in p)
      .map((p) => (p as any).functionCall);
    const groundingChunks = candidate.groundingMetadata?.groundingChunks;

    return { text, groundingChunks, functionCalls };
  } catch (error: any) {
    console.error("Error generating response from Oracle:", error);
    const message =
      error instanceof Error ? error.message : "An unknown error occurred.";
    console.error("Full error object:", error);
    return { text: `Even I cannot pierce this veil of error: ${message}` };
  }
};

export const summarizeOracleHistory = async (
  history: ChatMessage[]
): Promise<string> => {
  if (history.length === 0) return "";

  // Mock summary for free tier
  const summaries = [
    "ONE aligns the energy of the workspace...",
    "The singular path reveals itself...",
    "Wisdom flows through the connection...",
    "Ancient patterns align with future vision...",
    "ONE illuminates the path forward...",
  ];

  const randomSummary = summaries[Math.floor(Math.random() * summaries.length)];
  return `(ONE's vision: ${randomSummary})`;
};

export const generateOracleTitle = async (
  history: ChatMessage[]
): Promise<string> => {
  if (history.length < 2) return "Oracle's Guidance";

  // Mock titles for free tier
  const titles = [
    "ONE's Guidance",
    "Nexus Vision",
    "Path of ONE",
    "Singular Wisdom",
    "Strategic Transformation",
    "System Alignment",
    "ONE's Strategic Path",
    "Nexus of Opportunity",
  ];

  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  return randomTitle;
};
