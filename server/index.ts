import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import { GoogleGenAI } from "@google/genai";
import { trackErrorStatus, trackRateLimit, trackRequest } from "./securityMonitor";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8787);
const geminiApiKey = process.env.GEMINI_API_KEY;
const aiClient = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

app.disable("x-powered-by");
app.use((req, res, next) => {
  // Security headers for API responses.
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'; base-uri 'none';");
  next();
});
app.use(express.json({ limit: "20kb" }));
app.use(async (req, res, next) => {
  const start = Date.now();
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  await trackRequest(ip, req.path);

  res.on("finish", () => {
    const durationMs = Date.now() - start;
    void trackErrorStatus(res.statusCode, req.path);
    console.info(
      JSON.stringify({
        level: "info",
        type: "api_request",
        method: req.method,
        path: req.path,
        status: res.statusCode,
        durationMs,
        ip,
        at: new Date().toISOString(),
      }),
    );
  });

  next();
});

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
  handler: (req, res) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    void trackRateLimit(ip, req.path);
    res.status(429).json({ error: "Too many requests. Please try again later." });
  },
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/ai/generate", aiLimiter, async (req, res) => {
  try {
    if (!aiClient) {
      return res.status(503).json({ error: "AI service is not configured." });
    }

    const prompt = typeof req.body?.prompt === "string" ? req.body.prompt.trim() : "";
    const model = typeof req.body?.model === "string" ? req.body.model.trim() : "gemini-2.5-flash";

    if (!prompt || prompt.length < 3 || prompt.length > 2000) {
      return res.status(400).json({ error: "Invalid prompt length." });
    }

    if (!/^gemini-[a-z0-9.-]+$/i.test(model)) {
      return res.status(400).json({ error: "Invalid model." });
    }

    const response = await aiClient.models.generateContent({
      model,
      contents: prompt,
    });

    return res.json({
      text: response.text ?? "",
    });
  } catch (error) {
    console.error("AI proxy error:", error);
    return res.status(502).json({ error: "Upstream AI service error." });
  }
});

app.listen(port, () => {
  console.log(`AI proxy server running on http://localhost:${port}`);
});
