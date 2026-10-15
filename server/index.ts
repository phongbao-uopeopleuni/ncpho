import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createApp, optionsFromEnv, type AiTextClient } from "./app";

dotenv.config();

const port = Number(process.env.PORT || 8787);
// Loopback by default so a local key is not exposed to the LAN; containers set HOST=0.0.0.0.
const host = process.env.HOST || "127.0.0.1";
const geminiApiKey = process.env.GEMINI_API_KEY;

function createGeminiTextClient(apiKey: string): AiTextClient {
  const ai = new GoogleGenAI({ apiKey });
  return {
    async generateText({ model, prompt, maxOutputTokens, signal }) {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { maxOutputTokens, abortSignal: signal },
      });
      return response.text ?? "";
    },
  };
}

const app = createApp({
  ...optionsFromEnv(process.env),
  aiClient: geminiApiKey ? createGeminiTextClient(geminiApiKey) : null,
  redactValues: geminiApiKey ? [geminiApiKey] : [],
});

app.listen(port, host, () => {
  console.log(`AI proxy server running on http://${host}:${port}`);
});
