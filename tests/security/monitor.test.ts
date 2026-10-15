import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const monitorUrl = pathToFileURL(`${root}server/securityMonitor.ts`).href;

// The monitor reads its thresholds at import time, so every case runs in a fresh process,
// with a timeout: a hang shows up as a killed process instead of a stuck test run.
function runMonitor(env: Record<string, string>, script: string) {
  return spawnSync(
    process.execPath,
    ["--import", "tsx", "--input-type=module", "-e", `const m = await import(${JSON.stringify(monitorUrl)}); ${script}`],
    {
      cwd: root,
      env: { ...process.env, SECURITY_ALERT_WEBHOOK_URL: "", ...env },
      encoding: "utf8",
      timeout: 15_000,
    },
  );
}

test("fractional or invalid thresholds fall back to the defaults instead of hanging the server", () => {
  for (const value of ["0.5", "0", "-3", "2.5", "abc"]) {
    const result = runMonitor(
      { SECURITY_TRAFFIC_THRESHOLD: value, SECURITY_ERROR_THRESHOLD: value },
      `await m.trackRequest("203.0.113.9", "/api/health"); await m.trackErrorStatus(500, "/api/x"); console.log("done");`,
    );
    assert.equal(result.signal, null, `threshold ${value} hung the process (killed by timeout)`);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /done/);
    assert.doesNotMatch(result.stderr, /SECURITY_ALERT/, `threshold ${value} must fall back to the default, not alert on one request`);
  }
});

test("a valid integer threshold still raises an alert once it is reached", () => {
  const result = runMonitor(
    { SECURITY_TRAFFIC_THRESHOLD: "2" },
    `await m.trackRequest("203.0.113.9", "/api/health"); await m.trackRequest("203.0.113.9", "/api/health");`,
  );
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /\[SECURITY_ALERT\] traffic_spike/);
});
