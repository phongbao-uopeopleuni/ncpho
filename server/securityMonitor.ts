type SecurityEventType = "traffic_spike" | "rate_limit" | "error_spike";

type SecurityEvent = {
  type: SecurityEventType;
  message: string;
  ip?: string;
  path?: string;
  value?: number;
  threshold?: number;
  at: string;
};

type AlertWebhookPayload = {
  service: string;
  environment: string;
  event: SecurityEvent;
};

// A typo such as "12O" must not turn into NaN and silently disable alerting.
function readPositiveNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  const value = Number(raw);
  return raw && Number.isFinite(value) && value > 0 ? value : fallback;
}

const trafficWindowMs = readPositiveNumber("SECURITY_TRAFFIC_WINDOW_MS", 60_000);
const trafficThreshold = readPositiveNumber("SECURITY_TRAFFIC_THRESHOLD", 120);
const errorThreshold = readPositiveNumber("SECURITY_ERROR_THRESHOLD", 25);
const alertCooldownMs = readPositiveNumber("SECURITY_ALERT_COOLDOWN_MS", 5 * 60_000);
const alertWebhookUrl = process.env.SECURITY_ALERT_WEBHOOK_URL;
const WEBHOOK_TIMEOUT_MS = 5_000;

const requestTimestampsByIp = new Map<string, number[]>();
const errorTimestamps: number[] = [];
const recentAlerts = new Map<string, number>();
let lastSweepAt = 0;

// Only "has the threshold been reached?" matters, so each list keeps at most `max` entries.
function pruneTimestamps(list: number[], now: number, max: number): number[] {
  const min = now - trafficWindowMs;
  while (list.length && list[0] < min) {
    list.shift();
  }
  while (list.length > max) {
    list.shift();
  }
  return list;
}

// Drop idle IPs and expired cooldowns once per window so many distinct IPs cannot grow memory forever.
function sweep(now: number): void {
  if (now - lastSweepAt < trafficWindowMs) return;
  lastSweepAt = now;
  for (const [ip, list] of requestTimestampsByIp) {
    if (!list.length || list[list.length - 1] < now - trafficWindowMs) requestTimestampsByIp.delete(ip);
  }
  for (const [key, at] of recentAlerts) {
    if (now - at >= alertCooldownMs) recentAlerts.delete(key);
  }
}

function shouldSendAlert(key: string, now: number): boolean {
  const last = recentAlerts.get(key);
  if (last && now - last < alertCooldownMs) return false;
  recentAlerts.set(key, now);
  return true;
}

async function postAlert(event: SecurityEvent): Promise<void> {
  if (!alertWebhookUrl) return;
  const payload: AlertWebhookPayload = {
    service: "ncpho-ai-proxy",
    environment: process.env.NODE_ENV || "development",
    event,
  };
  try {
    await fetch(alertWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
  } catch (error) {
    // Webhook URLs often embed a secret token, so never log the error object (it can include the URL).
    const code = (error as { cause?: { code?: unknown } })?.cause?.code;
    console.error(`Failed to send security alert webhook: ${error instanceof Error ? error.name : "unknown error"}${typeof code === "string" ? ` (${code})` : ""}`);
  }
}

async function emitAlert(event: SecurityEvent, key: string, now: number): Promise<void> {
  if (!shouldSendAlert(key, now)) return;
  console.warn(`[SECURITY_ALERT] ${event.type}: ${event.message}`);
  await postAlert(event);
}

// The track* functions are called fire-and-forget from request middleware: they never throw
// and never make a request wait for the alert webhook.
export async function trackRequest(ip: string, path: string): Promise<void> {
  try {
    const now = Date.now();
    sweep(now);
    const list = pruneTimestamps(requestTimestampsByIp.get(ip) ?? [], now, trafficThreshold - 1);
    list.push(now);
    requestTimestampsByIp.set(ip, list);

    if (list.length >= trafficThreshold) {
      await emitAlert(
        {
          type: "traffic_spike",
          message: `High request volume detected for IP ${ip} on ${path.slice(0, 200)}`,
          ip,
          path: path.slice(0, 200),
          value: list.length,
          threshold: trafficThreshold,
          at: new Date(now).toISOString(),
        },
        `traffic_spike:${ip}`,
        now,
      );
    }
  } catch (error) {
    console.error("trackRequest failed:", error instanceof Error ? error.name : "unknown error");
  }
}

export async function trackRateLimit(ip: string, path: string): Promise<void> {
  try {
    const now = Date.now();
    await emitAlert(
      {
        type: "rate_limit",
        message: `Rate limit triggered for IP ${ip} on ${path.slice(0, 200)}`,
        ip,
        path: path.slice(0, 200),
        at: new Date(now).toISOString(),
      },
      `rate_limit:${ip}`,
      now,
    );
  } catch (error) {
    console.error("trackRateLimit failed:", error instanceof Error ? error.name : "unknown error");
  }
}

export async function trackErrorStatus(statusCode: number, path: string): Promise<void> {
  if (statusCode < 500) return;
  try {
    const now = Date.now();
    pruneTimestamps(errorTimestamps, now, errorThreshold - 1).push(now);
    if (errorTimestamps.length >= errorThreshold) {
      await emitAlert(
        {
          type: "error_spike",
          message: `Server 5xx spike detected on ${path.slice(0, 200)}`,
          path: path.slice(0, 200),
          value: errorTimestamps.length,
          threshold: errorThreshold,
          at: new Date(now).toISOString(),
        },
        "error_spike",
        now,
      );
    }
  } catch (error) {
    console.error("trackErrorStatus failed:", error instanceof Error ? error.name : "unknown error");
  }
}
