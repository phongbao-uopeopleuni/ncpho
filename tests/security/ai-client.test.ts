import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
import { generateTextViaProxy } from "../../src/lib/aiClient";

afterEach(() => mock.restoreAll());

function respondWith(body: unknown, status = 200) {
  return mock.method(globalThis, "fetch", async () =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } }));
}

test("model output leaves the client only as a plain string", async () => {
  const markup = '<img src=x onerror="window.__t=1">';
  const fetchMock = respondWith({ text: markup });
  assert.deepEqual(await generateTextViaProxy({ prompt: "hello" }), { text: markup });

  const [url, init] = fetchMock.mock.calls[0].arguments as [string, RequestInit];
  assert.equal(url, "/api/ai/generate");
  assert.equal(init.method, "POST");
  assert.equal(init.credentials, "same-origin");
  assert.ok(init.signal instanceof AbortSignal, "request has a timeout signal");
});

test("non-string output such as { __html } is rejected", async () => {
  respondWith({ text: { __html: "<b>x</b>" } });
  await assert.rejects(generateTextViaProxy({ prompt: "hello" }), /unexpected response/);
});

test("error responses are surfaced as failures", async () => {
  respondWith({ error: "Upstream AI service error." }, 502);
  await assert.rejects(generateTextViaProxy({ prompt: "hello" }), /502/);
});
