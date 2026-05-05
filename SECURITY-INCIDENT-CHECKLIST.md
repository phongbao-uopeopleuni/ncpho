# Security Incident Checklist (Phase 1)

Use this checklist when you suspect a key/token leak or abnormal API usage.

## 1) Immediate containment (0-30 minutes)

- Disable or revoke the suspected compromised key.
- Rotate to a new key and store it in server-side secret manager only.
- Confirm no key is injected into frontend build variables (`VITE_*`, `define`, hardcoded constants).
- Freeze risky deployments until containment is complete.

## 2) Scope and impact assessment (30-90 minutes)

- Check provider usage logs for abnormal spikes and unknown IPs.
- Identify first suspicious timestamp and affected services.
- Estimate financial impact (quota consumption, billing anomalies).
- Record impacted environments (dev/staging/prod).

## 3) Eradication and recovery (same day)

- Remove exposed key paths in code and configuration.
- Re-deploy with safe configuration and verify no secret appears in built assets.
- Add temporary tighter limits (rate limit/quota caps) to reduce repeat abuse.
- Verify normal traffic and expected API error rates after rollout.

## 4) Communication and follow-up (within 24h)

- Notify project owners about incident timeline and mitigation steps.
- Open a remediation task list with owners and deadlines.
- Add CI secret scanning and release security checks if missing.
- Schedule post-incident review and update this checklist with lessons learned.
