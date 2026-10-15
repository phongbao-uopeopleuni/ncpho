import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import { after, before, mock, test } from "node:test";
import {
  DEFAULT_APP_OPTIONS,
  createApp,
  optionsFromEnv,
  type AiTextClient,
  type AppOptions,
  type GenerateTextRequest,
} from "../../server/app";

const FAKE_KEY = `AIza${"Q".repeat(35)}`;
const OTHER_KEY = `AIza${"Z".repeat(35)}`;

before(() => {
  // Keep request logs and alert lines out of the test output.
  mock.method(console, "info", () => {});
  mock.method(console, "warn", () => {});
});
after(() => mock.restoreAll());

function fakeClient(impl: (req: GenerateTextRequest) => Promise<string> = async () => "ok") {
  const calls: GenerateTextRequest[] = [];
  const client: AiTextClient = {
    generateText: (req) => {
      calls.push(req);
      return impl(req);
    },
  };
  return { client, calls };
}

async function withServer(overrides: Partial<AppOptions>, run: (base: string) => Promise<void>) {
  const app = createApp({ ...DEFAULT_APP_OPTIONS, aiClient: fakeClient().client, ...overrides });
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const { port } = server.address() as AddressInfo;
  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
}

const post = (base: string, body: unknown, headers: Record<string, string> = {}) =>
  fetch(`${base}/api/ai/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

test("API responses carry the security headers CI checks for, plus no-store", async () => {
  await withServer({}, async (base) => {
    const res = await fetch(`${base}/api/health`);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get("x-content-type-options"), "nosniff");
    assert.equal(res.headers.get("x-frame-options"), "DENY");
    assert.equal(res.headers.get("content-security-policy"), "default-src 'none'; frame-ancestors 'none'; base-uri 'none';");
    assert.equal(res.headers.get("cache-control"), "no-store");
    assert.equal(res.headers.get("cross-origin-resource-policy"), "same-origin");
    assert.equal(res.headers.get("x-powered-by"), null);
  });
});

test("returns 503 without touching validation when no AI key is configured", async () => {
  await withServer({ aiClient: null }, async (base) => {
    const res = await post(base, { prompt: "hello" });
    assert.equal(res.status, 503);
  });
});

test("only allowlisted models reach the upstream client", async () => {
  const { client, calls } = fakeClient();
  await withServer({ aiClient: client }, async (base) => {
    for (const model of ["gemini-2.5-pro", "gemini-3-ultra", "gemini-2.5-flash ", "../../etc/passwd", "", 123, null]) {
      const res = await post(base, { prompt: "hello there", model });
      assert.equal(res.status, 400, `model ${JSON.stringify(model)} should be rejected`);
    }
    assert.equal(calls.length, 0);

    const ok = await post(base, { prompt: "hello there" });
    assert.equal(ok.status, 200);
    assert.equal(calls[0].model, "gemini-2.5-flash");
    assert.equal(calls[0].maxOutputTokens, DEFAULT_APP_OPTIONS.maxOutputTokens);
  });
});

test("prompt and body shape are validated server-side", async () => {
  const { client, calls } = fakeClient();
  await withServer({ aiClient: client }, async (base) => {
    for (const prompt of ["hi", "   x   ", "a".repeat(2001), 42, ["a", "b", "c"], { text: "hello" }]) {
      assert.equal((await post(base, { prompt })).status, 400, `prompt ${JSON.stringify(prompt).slice(0, 40)}`);
    }
    assert.equal((await post(base, [])).status, 400);
    assert.equal(calls.length, 0);
  });
});

test("model output is returned as escaped JSON, never as markup", async () => {
  const markup = '<script>window.__t=1</script><img src=x onerror="window.__t=1">';
  await withServer({ aiClient: fakeClient(async () => markup).client }, async (base) => {
    const res = await post(base, { prompt: "say something" });
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type") ?? "", /^application\/json/);
    assert.equal(res.headers.get("x-content-type-options"), "nosniff");
    const raw = await res.text();
    assert.ok(!raw.includes("<"), "raw JSON must not contain a literal '<'");
    assert.deepEqual(JSON.parse(raw), { text: markup });
  });
});

test("malformed or oversized bodies get a generic JSON error without stack traces", async () => {
  await withServer({}, async (base) => {
    const malformed = await post(base, '{"prompt":');
    assert.equal(malformed.status, 400);
    const body = await malformed.text();
    assert.deepEqual(JSON.parse(body), { error: "Malformed JSON body." });
    for (const leak of ["node_modules", "SyntaxError", " at ", "\\\\"]) assert.ok(!body.includes(leak), `leaks ${leak}`);

    const huge = await post(base, { prompt: "a".repeat(25_000) });
    assert.equal(huge.status, 413);
    assert.deepEqual(await huge.json(), { error: "Request body too large." });

    const missing = await fetch(`${base}/api/does-not-exist`);
    assert.equal(missing.status, 404);
    assert.deepEqual(await missing.json(), { error: "Not found." });
  });
});

test("upstream failures return a generic 502 and never log the API key", async (t) => {
  const errors = t.mock.method(console, "error", () => {});
  const failing = fakeClient(async () => {
    throw Object.assign(new Error(`request with key=${FAKE_KEY} and ${OTHER_KEY} was rejected`), { status: 403 });
  });
  await withServer({ aiClient: failing.client, redactValues: [FAKE_KEY] }, async (base) => {
    const res = await post(base, { prompt: "hello there" });
    assert.equal(res.status, 502);
    const body = await res.text();
    assert.deepEqual(JSON.parse(body), { error: "Upstream AI service error." });
    assert.ok(!body.includes(FAKE_KEY));
  });
  const logged = errors.mock.calls.map((call) => call.arguments.map(String).join(" ")).join("\n");
  assert.ok(logged.includes("ai_upstream_error"), "the failure is still logged");
  assert.ok(logged.includes("[REDACTED]"));
  assert.ok(!logged.includes(FAKE_KEY) && !logged.includes(OTHER_KEY), "keys must be redacted from logs");
});

test("a hung upstream call is cut off with 504 and its signal aborted", async (t) => {
  t.mock.method(console, "error", () => {});
  const hung = fakeClient(() => new Promise<string>(() => {}));
  await withServer({ aiClient: hung.client, upstreamTimeoutMs: 50 }, async (base) => {
    const started = Date.now();
    const res = await post(base, { prompt: "hello there" });
    assert.equal(res.status, 504);
    assert.ok(Date.now() - started < 2000);
    assert.equal(hung.calls[0].signal.aborted, true);
  });
});

test("per-IP limit applies and cannot be dodged with a spoofed X-Forwarded-For", async (t) => {
  // express-rate-limit warns (once) that X-Forwarded-For arrived while trust proxy is off — expected here.
  t.mock.method(console, "error", () => {});
  await withServer({ perIpLimitPerMinute: 2 }, async (base) => {
    const first = await post(base, { prompt: "hello there" }, { "X-Forwarded-For": "203.0.113.1" });
    assert.equal(first.status, 200);
    assert.equal(first.headers.get("ratelimit-limit"), "2");
    assert.equal((await post(base, { prompt: "hello there" }, { "X-Forwarded-For": "203.0.113.2" })).status, 200);
    assert.equal((await post(base, { prompt: "hello there" }, { "X-Forwarded-For": "203.0.113.3" })).status, 429);
  });
});

test("global budget caps total upstream calls, and invalid requests do not consume it", async () => {
  const { client, calls } = fakeClient();
  await withServer({ aiClient: client, perIpLimitPerMinute: 100, globalLimitPerMinute: 2 }, async (base) => {
    for (let i = 0; i < 3; i++) assert.equal((await post(base, { prompt: "x" })).status, 400);
    assert.equal((await post(base, { prompt: "hello there" })).status, 200);
    assert.equal((await post(base, { prompt: "hello there" })).status, 200);
    assert.equal((await post(base, { prompt: "hello there" })).status, 429);
    assert.equal(calls.length, 2);
  });
});

test("optionsFromEnv validates deployment config instead of silently weakening it", () => {
  assert.deepEqual(optionsFromEnv({}), DEFAULT_APP_OPTIONS);
  assert.deepEqual(optionsFromEnv({ AI_ALLOWED_MODELS: "gemini-2.5-flash, gemini-2.5-flash-lite" }).allowedModels, ["gemini-2.5-flash", "gemini-2.5-flash-lite"]);
  assert.equal(optionsFromEnv({ TRUST_PROXY_HOPS: "1" }).trustProxyHops, 1);
  assert.throws(() => optionsFromEnv({ AI_ALLOWED_MODELS: "gpt-4o" }), /AI_ALLOWED_MODELS/);
  assert.throws(() => optionsFromEnv({ AI_DAILY_LIMIT: "abc" }), /AI_DAILY_LIMIT/);
  assert.throws(() => optionsFromEnv({ AI_GLOBAL_LIMIT_PER_MINUTE: "0" }), /AI_GLOBAL_LIMIT_PER_MINUTE/);
  assert.throws(() => optionsFromEnv({ TRUST_PROXY_HOPS: "true" }), /TRUST_PROXY_HOPS/);
});
