# Security Quarterly Drill Plan (Phase 5)

Run this drill once per quarter to keep response readiness high.

## Scenario A: Key leakage simulation

### Objective
Validate that the team can detect, contain, rotate, and recover from a leaked API key.

### Steps
1. Announce drill start and assign incident commander.
2. Inject simulated alert (do not expose real key) indicating key compromise.
3. Execute incident workflow from `SECURITY-INCIDENT-CHECKLIST.md`.
4. Rotate test key, verify old key is revoked, and confirm service health.
5. Document timeline and lessons learned.

### Success criteria
- Initial acknowledgment < 10 minutes.
- Key rotation + revoke complete < 30 minutes.
- Service recovery complete < 60 minutes.

## Scenario B: Abuse traffic simulation

### Objective
Validate detection and mitigation of request floods/abuse patterns.

### Steps
1. Generate controlled burst traffic to `/api/ai/generate`.
2. Confirm `traffic_spike` and `rate_limit` alerts trigger.
3. Apply temporary tighter controls (thresholds/WAF/IP block simulation).
4. Confirm traffic and error metrics normalize.
5. Record mitigation steps and improvement items.

### Success criteria
- Alert received < 5 minutes from anomaly start.
- Mitigation applied < 15 minutes.
- 5xx error rate returns to baseline after mitigation.

## Drill output template

- Date/time:
- Participants:
- Scenario:
- Detection delay:
- Containment time:
- Recovery time:
- What worked:
- Gaps discovered:
- Action items + owners + due dates:
