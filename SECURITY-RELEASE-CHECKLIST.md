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
- [ ] `Security regression tests` job passed (`npm run test:security` and the headless browser CSP test).

## 2b) Content Security Policy

- [ ] Production is GitHub Pages, which sends no custom headers: the only CSP is the `<meta>` tag that `security/csp.ts` injects at build time. Confirm `dist/index.html` contains it.
- [ ] Policy changes are made in `security/csp.ts`; `vercel.json` and `public/_headers` are updated to match (enforced by `tests/security/csp-policy.test.ts`).
- [ ] No new script origin, no `'unsafe-inline'` / `'unsafe-eval'` in `script-src`, and no Trusted Types policy without a security review.

## 3) Runtime protection

- [ ] Rate-limit thresholds are set for current traffic baseline.
- [ ] Alert webhook is configured and receiving test alert payloads.
- [ ] API logs are visible and include request status/duration/ip.
- [ ] Security headers remain present on `/api/health`.

## 4) Approval and traceability

- [ ] Release owner approves checklist completion.
- [ ] Security reviewer signs off high-risk changes.
- [ ] Rollback plan is documented for this release.
