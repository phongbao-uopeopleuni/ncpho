# Security Release Checklist (Phase 5)

Use this checklist before every production release.

## 1) Secrets and configuration

- [ ] No secret in frontend bundle paths (`VITE_*`, `define`, hardcoded tokens).
- [ ] Production runtime secrets are loaded from server-side secret storage.
- [ ] `GEMINI_API_KEY` rotation date is recorded and still valid.
- [ ] `.env.local` and local secret files remain untracked.

## 2) Pipeline gates

- [ ] `Security Checks` workflow passed (secret scan + API header checks).
- [ ] `Dependency Audit` workflow passed (no unresolved critical vulnerabilities).
- [ ] Typecheck/build passed for current release branch.

## 3) Runtime protection

- [ ] Rate-limit thresholds are set for current traffic baseline.
- [ ] Alert webhook is configured and receiving test alert payloads.
- [ ] API logs are visible and include request status/duration/ip.
- [ ] Security headers remain present on `/api/health`.

## 4) Approval and traceability

- [ ] Release owner approves checklist completion.
- [ ] Security reviewer signs off high-risk changes.
- [ ] Rollback plan is documented for this release.
