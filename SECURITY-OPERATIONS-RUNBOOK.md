# Security Operations Runbook (Phase 4)

This runbook defines day-2 operations for abuse detection and incident response on the AI proxy.

## 1) Monitoring signals

- **Traffic spike**: many requests from one IP within a short window.
- **Rate-limit alerts**: repeated 429 responses from same IP/path.
- **Error spike**: sudden increase of 5xx responses.

All API requests are logged as JSON in server stdout with `type: "api_request"`.
Security alerts are emitted as `"[SECURITY_ALERT] ..."` messages.

## 2) Environment configuration

Configure the following environment variables in production:

- `SECURITY_TRAFFIC_WINDOW_MS` (default `60000`)
- `SECURITY_TRAFFIC_THRESHOLD` (default `120`)
- `SECURITY_ERROR_THRESHOLD` (default `25`)
- `SECURITY_ALERT_COOLDOWN_MS` (default `300000`)
- `SECURITY_ALERT_WEBHOOK_URL` (optional webhook endpoint for alert delivery)

## 3) Incident triage workflow

1. Confirm alert type and affected endpoint from logs.
2. Identify top offending IPs and request patterns.
3. If abuse is confirmed:
   - tighten rate-limit thresholds,
   - block IP ranges at edge/WAF,
   - rotate keys if compromise suspected.
4. Track impact:
   - API error rate,
   - traffic normalization,
   - billing/quota anomalies.
5. Document timeline and mitigation outcome.

## 4) Weekly/Monthly routine

- Weekly: run dependency checks (`Dependency Audit` workflow).
- Weekly: review top IP/request volume and 5xx trend.
- Monthly: test alert webhook delivery and incident drill.
- Monthly: review threshold values against normal traffic baseline.

## 5) Quarterly governance routine (Phase 5)

- Run `SECURITY-QUARTERLY-DRILL.md` scenarios end-to-end.
- Verify release gates using `SECURITY-RELEASE-CHECKLIST.md`.
- Re-audit access rights:
  - GitHub repository admin/write access,
  - CI secrets and deployment credentials,
  - hosting platform production roles.
- Confirm all security workflows are active and not skipped.
- Record decisions and follow-up tasks with owners and due dates.
