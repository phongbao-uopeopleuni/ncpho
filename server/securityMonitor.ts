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

const trafficWindowMs = Number(process.env.SECURITY_TRAFFIC_WINDOW_MS || 60_000);
const trafficThreshold = Number(process.env.SECURITY_TRAFFIC_THRESHOLD || 120);
const errorThreshold = Number(process.env.SECURITY_ERROR_THRESHOLD || 25);
const alertCooldownMs = Number(process.env.SECURITY_ALERT_COOLDOWN_MS || 5 * 60_000);
const alertWebhookUrl = process.env.SECURITY_ALERT_WEBHOOK_URL;

const requestTimestampsByIp = new Map<string, number[]>();
const errorTimestamps: number[] = [];
const recentAlerts = new Map<string, number>();

function pruneOldTimestamps(list: number[], now: number): number[] {
  const min = now - trafficWindowMs;
  while (list.length && list[0] < min) {
    list.shift();
  }
  return list;
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
    });
  } catch (error) {
    console.error("Failed to send security alert webhook:", error);
  }
}

async function emitAlert(event: SecurityEvent, key: string, now: number): Promise<void> {
  if (!shouldSendAlert(key, now)) return;
  console.warn(`[SECURITY_ALERT] ${event.type}: ${event.message}`);
  await postAlert(event);
}

export async function trackRequest(ip: string, path: string): Promise<void> {
  const now = Date.now();
  const list = pruneOldTimestamps(requestTimestampsByIp.get(ip) ?? [], now);
  list.push(now);
  requestTimestampsByIp.set(ip, list);

  if (list.length >= trafficThreshold) {
    await emitAlert(
      {
        type: "traffic_spike",
        message: `High request volume detected for IP ${ip} on ${path}`,
        ip,
        path,
        value: list.length,
        threshold: trafficThreshold,
        at: new Date(now).toISOString(),
      },
      `traffic_spike:${ip}`,
      now,
    );
  }
}

export async function trackRateLimit(ip: string, path: string): Promise<void> {
  const now = Date.now();
  await emitAlert(
    {
      type: "rate_limit",
      message: `Rate limit triggered for IP ${ip} on ${path}`,
      ip,
      path,
      at: new Date(now).toISOString(),
    },
    `rate_limit:${ip}`,
    now,
  );
}

export async function trackErrorStatus(statusCode: number, path: string): Promise<void> {
  if (statusCode < 500) return;
  const now = Date.now();
  pruneOldTimestamps(errorTimestamps, now).push(now);
  if (errorTimestamps.length >= errorThreshold) {
    await emitAlert(
      {
        type: "error_spike",
        message: `Server 5xx spike detected on ${path}`,
        path,
        value: errorTimestamps.length,
        threshold: errorThreshold,
        at: new Date(now).toISOString(),
      },
      "error_spike",
      now,
    );
  }
}
