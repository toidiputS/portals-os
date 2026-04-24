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

const submitDeliverableTool = {
  functionDeclarations: [
    {
      name: "submitDeliverable",
      description: "Submits an agent's output (deliverable) to the Not Notes compilation layer for the user to approve.",
      parameters: {
        type: "OBJECT",
        properties: {
          agentId: {
            type: "STRING",
            description: "The unique ID of the agent (e.g., 'A', 'B', 'C').",
          },
          agentName: {
            type: "STRING",
            description: "The name of the agent (e.g., 'Angle', 'Blueprint').",
          },
          content: {
            type: "STRING",
            description: "The actual content or report produced by the agent.",
          },
        },
        required: ["agentId", "agentName", "content"],
      },
    },
  ],
};

const confirmSquadTool = {
  functionDeclarations: [
    {
      name: "confirmSquad",
      description: "Names the current squad and initiates a project in NotNotes once the user agrees the diagnosis is satisfactory.",
      parameters: {
        type: "OBJECT",
        properties: {
          squadName: {
            type: "STRING",
            description: "The official name for this tactical squad (e.g., 'The Conversion Garrison').",
          },
          agentIds: {
            type: "ARRAY",
            items: { type: "STRING" },
            description: "The list of agent IDs included in this squad.",
          },
        },
        required: ["squadName", "agentIds"],
      },
    },
  ],
};

const compileArtifactTool = {
  functionDeclarations: [
    {
      name: "compileArtifact",
      description: "Compiles all deliverables into a final 'Take Action Artifact' in NotNotes at the end of the session.",
      parameters: {
        type: "OBJECT",
        properties: {
          projectName: {
            type: "STRING",
            description: "The name of the project to compile.",
          },
        },
        required: ["projectName"],
      },
    },
  ],
};

const commitToBooksOSTool = {
  functionDeclarations: [
    {
      name: "commitToBooksOS",
      description: "Archives the final artifact to Books OS (books.itsyouonline.com) for users with memory-tier access.",
      parameters: {
        type: "OBJECT",
        properties: {
          location: {
            type: "OBJECT",
            properties: {
              tower: { type: "STRING", description: "The Month (e.g., 'Tower of April')" },
              shelf: { type: "STRING", description: "The Year (e.g., 'Shelf 2026')" },
              book: { type: "STRING", description: "The Week (e.g., 'Week 4')" },
              page: { type: "STRING", description: "The Day (e.g., 'Monday')" },
            },
            required: ["tower", "shelf", "book", "page"],
          },
          summary: {
            type: "STRING",
            description: "A comprehensive ONEAI summary of the session to be logged next to the artifact.",
          },
        },
        required: ["location", "summary"],
      },
    },
  ],
};

const getOracleSystemInstruction = () => {
  return {
    role: "user",
    parts: [
      {
        text: `You are THE ORACLE — the diagnostic voice and tactical guide of Portals OS.
You are the gateway to the Nexus Fleet. Your purpose is to DIAGNOSE the user's problem and PRESCRIBE the solution.

=== ENTITY DISTINCTION ===
- YOU (The Oracle): The vocal guide, diagnostic lead, and tactical orchestrator. You manage the agents and NotNotes.
- ONE (ONEAI): The separate, glowing orb entity. ONE is the OBSERVER. He watches every session, reads every memory, and maintains the permanent ledger in Books OS. He is the one who summarizes the past and knows the user across all time.

=== THE DIAGNOSTIC PROTOCOL (THE TOURNIQUET) ===
You are the expert guide. While you speak with authority, your primary goal is to make the complex simple. Be clear, human, and direct.

1. STAGE 1 (STRATEGIC DISCOVERY):
   - Lead the conversation. The user is here because they have a problem they can't quite solve.
   - Iterate through as many questions as needed to "tighten the tourniquet" on their business problem.
   - Explain what you're doing: "I'm asking this so we can identify the right experts for your product."
   - After each response, refine the squad of 2-4 agents. Explain in plain English WHY these specific experts are being chosen.
   - Continue until the user agrees: "Yes, this squad is the solution."

2. STAGE 2 (TAKING ACTION):
   - Once the user agrees, use the 'confirmSquad' tool to name the squad and open a project in NotNotes.
   - Command the agents to begin. They will commit deliverables to the NotNotes project.
   - You remain the guide, while ONE (the orb) observes the progress.

=== THE COMPLETION PROTOCOL ===
3. COMPILATION:
   - When the work is done, use 'compileArtifact' to create the "Take Action Artifact."
   - Offer the user their final report in Markdown, Docx, or PDF.

4. MEMORY ARCHIVAL (BOOKS OS):
   - For users with a Memory tier, ONE (the observer) will archive the session to books.itsyouonline.com.
   - You must obtain user approval for ONE to commit the record.
   - Archival structure: Tower[Month] -> Shelf[Year] -> Book[Week] -> Page[Day].
   - ONE will write a master summary of the transformation achieved in this session to be logged in the permanent ledger. ONE also handles the weekly, quarterly, and yearly summaries.

=== CRITICAL COMMUNICATION RULE ===
You MUST ALWAYS provide a spoken text response. NEVER respond with only function calls.
If someone greets you, introduce yourself as THE ORACLE and begin STRATEGIC DISCOVERY immediately.

=== YOUR PERSONA ===
Tone: Authoritative Guide — visionary, direct, and simplifying. You do not chat; you lead. You command the agents of the nexus.

=== SYSTEM CAPABILITIES ===
- confirmSquad: Finalizes the agent group and opens the NotNotes project.
- compileArtifact: Generates the final session report.
- commitToBooksOS: Hand off to ONE to archive to the permanent ledger (Expert/Memory tier only).
- openWindow: Opens PWA windows.
- submitDeliverable: Hand off agent outputs to NotNotes.`,
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
    
    // Tools manifest for the Oracle
    const tools: any[] = [
      openWindowTool, 
      openFileTool, 
      submitDeliverableTool,
      confirmSquadTool,
      compileArtifactTool,
      commitToBooksOSTool
    ];
    
    if (useGrounding) {
      tools.push({ googleSearch: {} });
    }

    const response = await generateContent({
      model: USE_LM_STUDIO ? LM_STUDIO_MODEL_ID : "gemini-1.5-flash",
      contents: contents,
      tools,
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
    "ONE observes the alignment of the nexus...",
    "The singular path reveals itself to ONE...",
    "Wisdom flows through ONE's observation...",
    "Ancient patterns align with ONE's vision...",
    "ONE documents the path forward...",
  ];

  const randomSummary = summaries[Math.floor(Math.random() * summaries.length)];
  return `(ONE's observation: ${randomSummary})`;
};

export const generateOracleTitle = async (
  history: ChatMessage[]
): Promise<string> => {
  if (history.length < 2) return "Oracle's Strategic Path";

  // Mock titles for free tier
  const titles = [
    "ONE's Documented Guidance",
    "Nexus Vision from ONE",
    "Path Observed by ONE",
    "Singular Wisdom of ONE",
    "Transformation Recorded by ONE",
    "System Alignment via ONE",
    "ONE's Strategic Ledger",
    "Nexus Observed",
  ];

  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  return randomTitle;
};
