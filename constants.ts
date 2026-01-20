export const PORTAL_BACKGROUNDS = [
  "/assets/images/Portals-1.png",
  "/assets/images/portals-2.png",
  "/assets/images/portals-3.png",
  "/assets/images/portals-4.png",
  "/assets/images/portals-5.png",
  "/assets/images/portals-6.png",
  "/assets/images/portals-7.png",
];

// Set to `true` to route Oracle generation requests to the local LM Studio proxy
// (requires `LM_STUDIO_URL` environment variable configured for the dev server).
export const USE_LM_STUDIO = false;  // Switched to Gemini - local 3B models can't handle Oracle complexity
export const LM_STUDIO_MODEL_ID = "Llama-3.2-3B-Instruct-uncensored-GGUF";
