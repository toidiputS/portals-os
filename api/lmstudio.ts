import fetch from "node-fetch";

// Serverless proxy for LM Studio (local) — accepts same payload shape as the Gemini proxy
export default async function handler(req: any, res: any) {
  // CORS headers for local development
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { model, contents, systemInstruction } = req.body;

    const LM_STUDIO_URL = process.env.LM_STUDIO_URL; // e.g. http://127.0.0.1:8080/api/rest/v1/generate
    const LM_STUDIO_API_KEY = process.env.LM_STUDIO_API_KEY; // optional

    if (!LM_STUDIO_URL) {
      return res
        .status(500)
        .json({ error: "LM_STUDIO_URL not configured on server." });
    }

    // Build a simple text prompt from systemInstruction + history + latest user content
    const buildPrompt = () => {
      let promptParts: string[] = [];
      if (systemInstruction && systemInstruction.parts) {
        for (const p of systemInstruction.parts) {
          if (typeof p.text === "string") promptParts.push(p.text);
        }
      }

      if (Array.isArray(contents)) {
        for (const c of contents) {
          const role = (c.role || "user").toUpperCase();
          if (Array.isArray(c.parts)) {
            for (const part of c.parts) {
              if (typeof part.text === "string") {
                promptParts.push(`[${role}]: ${part.text}`);
              }
            }
          }
        }
      }

      return promptParts.join("\n\n");
    };

    const promptText = buildPrompt();

    const headers: any = { "Content-Type": "application/json" };
    if (LM_STUDIO_API_KEY)
      headers["Authorization"] = `Bearer ${LM_STUDIO_API_KEY}`;

    // Try common LM Studio endpoints/body shapes. First try { inputs }
    const body1 = JSON.stringify({ inputs: promptText });

    let llmResp: any;
    let ok = false;

    try {
      const r = await fetch(LM_STUDIO_URL, {
        method: "POST",
        headers,
        body: body1,
      });
      llmResp = await r.json();
      ok = r.ok;
    } catch (e) {
      // ignore and try next format
      llmResp = null;
      ok = false;
    }

    if (!ok) {
      // try { prompt }
      try {
        const r2 = await fetch(LM_STUDIO_URL, {
          method: "POST",
          headers,
          body: JSON.stringify({ prompt: promptText }),
        });
        llmResp = await r2.json();
        ok = r2.ok;
      } catch (e) {
        llmResp = null;
        ok = false;
      }
    }

    if (!ok) {
      return res
        .status(502)
        .json({
          error: "LM Studio did not accept request or returned an error.",
          raw: llmResp,
        });
    }

    // Normalize output into Gemini-like response structure
    const extractText = (resp: any): string => {
      if (!resp) return "";
      // common LM Studio shapes
      if (typeof resp === "string") return resp;
      if (Array.isArray(resp)) {
        // look for generated_text or text fields
        const first = resp[0];
        return first?.generated_text || first?.text || first?.output_text || "";
      }
      // object
      return (
        resp.generated_text ||
        resp.output_text ||
        resp.text ||
        resp.result ||
        JSON.stringify(resp)
      );
    };

    const text = extractText(llmResp);

    const candidates = [
      {
        content: {
          parts: [{ text }],
        },
        finishReason: "stop",
      },
    ];

    return res.json({ candidates });
  } catch (error: any) {
    console.error("=== LM Studio Proxy Error ===");
    console.error(error);
    return res.status(500).json({ error: error?.message || String(error) });
  }
}
