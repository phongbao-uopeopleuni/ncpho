import express, { type ErrorRequestHandler, type Request, type RequestHandler } from "express";
import rateLimit from "express-rate-limit";
import { trackErrorStatus, trackRateLimit, trackRequest } from "./securityMonitor";

export type GenerateTextRequest = {
  model: string;
  prompt: string;
  maxOutputTokens: number;
  signal: AbortSignal;
};

/** The only thing the proxy needs from the AI SDK; tests substitute a fake. */
export type AiTextClient = {
  generateText(request: GenerateTextRequest): Promise<string>;
};

export type AppOptions = {
  aiClient: AiTextClient | null;
  /** Exact model ids a caller may request; the first is the default. */
  allowedModels: readonly string[];
  perIpLimitPerMinute: number;
  /** Caps shared by all callers bound the worst-case bill even when traffic comes from many IPs. */
  globalLimitPerMinute: number;
  globalLimitPerDay: number;
  upstreamTimeoutMs: number;
  maxOutputTokens: number;
  /** Reverse-proxy hops allowed to set X-Forwarded-For; 0 trusts only the socket address. */
  trustProxyHops: number;
  /** Secret values (e.g. the Gemini key) that must never appear in logs. */
  redactValues?: readonly string[];
};

export const DEFAULT_APP_OPTIONS: Omit<AppOptions, "aiClient"> = {
  allowedModels: ["gemini-2.5-flash"],
  perIpLimitPerMinute: 20,
  globalLimitPerMinute: 60,
  globalLimitPerDay: 1000,
  upstreamTimeoutMs: 20_000,
  maxOutputTokens: 1024,
  trustProxyHops: 0,
};

const PROMPT_MIN_LENGTH = 3;
const PROMPT_MAX_LENGTH = 2000;
const MODEL_ID = /^gemini-[a-z0-9.-]{1,60}$/;
const GOOGLE_API_KEY = /AIza[0-9A-Za-z_-]{35}/g;

function intInRange(name: string, raw: string | undefined, fallback: number, min: number, max: number): number {
  if (raw === undefined || raw.trim() === "") return fallback;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new Error(`${name} must be an integer between ${min} and ${max}`);
  }
  return value;
}

/** Deployment-specific limits; invalid values stop startup instead of silently weakening limits. */
export function optionsFromEnv(env: NodeJS.ProcessEnv): Omit<AppOptions, "aiClient"> {
  const models = (env.AI_ALLOWED_MODELS ?? "").split(",").map((model) => model.trim()).filter(Boolean);
  const invalid = models.filter((model) => !MODEL_ID.test(model));
  if (invalid.length) throw new Error(`AI_ALLOWED_MODELS contains invalid model ids: ${invalid.join(", ")}`);

  return {
    ...DEFAULT_APP_OPTIONS,
    allowedModels: models.length ? models : DEFAULT_APP_OPTIONS.allowedModels,
    globalLimitPerMinute: intInRange("AI_GLOBAL_LIMIT_PER_MINUTE", env.AI_GLOBAL_LIMIT_PER_MINUTE, DEFAULT_APP_OPTIONS.globalLimitPerMinute, 1, 10_000),
    globalLimitPerDay: intInRange("AI_DAILY_LIMIT", env.AI_DAILY_LIMIT, DEFAULT_APP_OPTIONS.globalLimitPerDay, 1, 1_000_000),
    trustProxyHops: intInRange("TRUST_PROXY_HOPS", env.TRUST_PROXY_HOPS, DEFAULT_APP_OPTIONS.trustProxyHops, 0, 5),
  };
}

function redact(text: string, secrets: readonly string[]): string {
  let out = text.replace(GOOGLE_API_KEY, "[REDACTED]");
  for (const secret of secrets) {
    if (secret) out = out.split(secret).join("[REDACTED]");
  }
  return out;
}

function describeError(error: unknown, secrets: readonly string[]) {
  if (!(error instanceof Error)) return { name: typeof error };
  const status = (error as { status?: unknown }).status;
  return {
    name: error.name,
    message: redact(error.message, secrets).slice(0, 300),
    ...(typeof status === "number" ? { status } : {}),
  };
}

function clientIp(req: Request): string {
  return req.ip || req.socket.remoteAddress || "unknown";
}

/** Settles as soon as `signal` aborts, even if `work` ignores the signal. */
function untilAborted<T>(work: Promise<T>, signal: AbortSignal): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const onAbort = () => reject(new Error("Upstream request aborted"));
    signal.addEventListener("abort", onAbort, { once: true });
    work.then(resolve, reject).finally(() => signal.removeEventListener("abort", onAbort));
  });
}

export function createApp(options: AppOptions) {
  const { aiClient } = options;
  const secrets = options.redactValues ?? [];
  const logError = (type: string, error: unknown) =>
    console.error(JSON.stringify({ level: "error", type, error: describeError(error, secrets), at: new Date().toISOString() }));

  const app = express();
  app.disable("x-powered-by");
  // Emit <, > and & as < etc. so JSON (including model output) can never be sniffed as HTML.
  app.set("json escape", true);
  // Never `true`: that would let any client spoof its IP and dodge per-IP limits.
  app.set("trust proxy", options.trustProxyHops > 0 ? options.trustProxyHops : false);

  app.use((_req, res, next) => {
    // Security headers for API responses.
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    res.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'; base-uri 'none';");
    res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
    res.setHeader("Cache-Control", "no-store");
    next();
  });

  // Registered before the body parser so malformed/oversized requests are logged too.
  app.use((req, res, next) => {
    const start = Date.now();
    const ip = clientIp(req);
    void trackRequest(ip, req.path);

    res.on("finish", () => {
      void trackErrorStatus(res.statusCode, req.path);
      console.info(
        JSON.stringify({
          level: "info",
          type: "api_request",
          method: req.method,
          path: req.path.slice(0, 200),
          status: res.statusCode,
          durationMs: Date.now() - start,
          ip,
          at: new Date().toISOString(),
        }),
      );
    });

    next();
  });

  app.use(express.json({ limit: "20kb" }));

  const onLimit: RequestHandler = (req, res) => {
    void trackRateLimit(clientIp(req), req.path);
    res.status(429).json({ error: "Too many requests. Please try again later." });
  };
  const perIpLimiter = rateLimit({
    windowMs: 60_000,
    limit: options.perIpLimitPerMinute,
    standardHeaders: true,
    legacyHeaders: false,
    handler: onLimit,
  });
  // Shared budget; no RateLimit headers so callers cannot read the global quota.
  const globalLimiter = (windowMs: number, limit: number) =>
    rateLimit({ windowMs, limit, standardHeaders: false, legacyHeaders: false, keyGenerator: () => "global", handler: onLimit });
  const globalPerMinute = globalLimiter(60_000, options.globalLimitPerMinute);
  const globalPerDay = globalLimiter(24 * 60 * 60_000, options.globalLimitPerDay);

  const requireConfigured: RequestHandler = (_req, res, next) => {
    if (!aiClient) {
      res.status(503).json({ error: "AI service is not configured." });
      return;
    }
    next();
  };

  const validateBody: RequestHandler = (req, res, next) => {
    const body: unknown = req.body;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      res.status(400).json({ error: "Invalid request body." });
      return;
    }
    const { prompt, model = options.allowedModels[0] } = body as { prompt?: unknown; model?: unknown };
    const text = typeof prompt === "string" ? prompt.trim() : "";
    if (text.length < PROMPT_MIN_LENGTH || text.length > PROMPT_MAX_LENGTH) {
      res.status(400).json({ error: "Invalid prompt length." });
      return;
    }
    if (typeof model !== "string" || !options.allowedModels.includes(model)) {
      res.status(400).json({ error: "Invalid model." });
      return;
    }
    res.locals.prompt = text;
    res.locals.model = model;
    next();
  };

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  // Invalid requests are rejected before they can spend the shared global budget.
  app.post("/api/ai/generate", requireConfigured, perIpLimiter, validateBody, globalPerMinute, globalPerDay, async (_req, res) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), options.upstreamTimeoutMs);
    try {
      const text = await untilAborted(
        aiClient!.generateText({
          model: res.locals.model,
          prompt: res.locals.prompt,
          maxOutputTokens: options.maxOutputTokens,
          signal: controller.signal,
        }),
        controller.signal,
      );
      // Model output is untrusted data: always returned as a JSON string, never as markup.
      res.json({ text: typeof text === "string" ? text : "" });
    } catch (error) {
      const timedOut = controller.signal.aborted;
      logError(timedOut ? "ai_upstream_timeout" : "ai_upstream_error", error);
      res.status(timedOut ? 504 : 502).json({ error: timedOut ? "Upstream AI service timed out." : "Upstream AI service error." });
    } finally {
      clearTimeout(timer);
    }
  });

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found." });
  });

  // Replaces Express's default handler, which echoes stack traces and file paths outside production.
  const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    const status = typeof error?.status === "number" && error.status >= 400 && error.status < 500 ? error.status : 500;
    if (status === 500) logError("unhandled_error", error);
    const message =
      error?.type === "entity.parse.failed" ? "Malformed JSON body."
      : error?.type === "entity.too.large" ? "Request body too large."
      : status === 500 ? "Internal server error."
      : "Bad request.";
    res.status(status).json({ error: message });
  };
  app.use(errorHandler);

  return app;
}
