/**
 * Single source of truth for the production Content-Security-Policy.
 *
 * Vercel sends the policy as a response header. The build also injects a
 * <meta http-equiv> policy for portable static previews (see `cspMetaPlugin`).
 * `vercel.json` and `public/_headers` carry the same policy as a real header for
 * hosts that honour them; tests/security/csp-policy.test.ts keeps all three in sync.
 *
 * The dev server is deliberately left without this policy (Vite HMR needs inline
 * scripts and websockets); never loosen the production policy to suit dev.
 */
import { createHash } from "node:crypto";
import type { Plugin } from "vite";

type Directives = Record<string, readonly string[]>;

const BASE_DIRECTIVES: Directives = {
  "default-src": ["'none'"],
  "script-src": ["'self'"],
  "script-src-attr": ["'none'"],
  // 'unsafe-inline' stays for styles only: motion's AnimatePresence mode="popLayout"
  // (gallery filter) injects a runtime <style> element. Exfiltration via CSS is
  // limited by img-src/font-src/connect-src below.
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'"],
  "font-src": ["'self'"],
  "connect-src": ["'self'"],
  // Contact map iframe: https://www.google.com/maps?q=...&output=embed
  "frame-src": ["https://www.google.com/maps"],
  "object-src": ["'none'"],
  "base-uri": ["'none'"],
  "form-action": ["'none'"],
  "upgrade-insecure-requests": [],
  // No code in the bundle needs a Trusted Types policy, so DOM XSS sinks
  // (innerHTML, script.src, string timers...) reject every plain string.
  "require-trusted-types-for": ["'script'"],
  "trusted-types": ["'none'"],
};

// Ignored (with a console warning) when delivered via <meta>, so header-only.
const HEADER_ONLY_DIRECTIVES: Directives = {
  "frame-ancestors": ["'none'"],
};

/**
 * Executable inline <script> blocks that are explicitly approved, as CSP hash
 * sources ('sha256-...'). Empty on purpose: the app ships no inline JS. Adding an
 * entry here also requires adding the same source to "script-src".
 */
export const ALLOWED_INLINE_SCRIPT_HASHES: readonly string[] = [];

// The trailing ";" keeps the last directive intact when a proxy or antivirus appends its own
// (seen with Kaspersky appending "child-src ..." and corrupting "trusted-types 'none'").
function serialize(directives: Directives): string {
  const body = Object.entries(directives)
    .map(([name, values]) => [name, ...values].join(" "))
    .join("; ");
  return `${body};`;
}

export const META_CSP = serialize(BASE_DIRECTIVES);
export const HEADER_CSP = serialize({ ...BASE_DIRECTIVES, ...HEADER_ONLY_DIRECTIVES });

export function parseCsp(policy: string): Map<string, string[]> {
  const parsed = new Map<string, string[]>();
  for (const part of policy.split(";")) {
    const [name, ...values] = part.trim().split(/\s+/).filter(Boolean);
    if (name) parsed.set(name.toLowerCase(), values);
  }
  return parsed;
}

const NON_EXECUTABLE_SCRIPT_TYPES = new Set(["application/ld+json"]);

/**
 * Fail-closed lint of the built index.html (a trusted build artifact, not user
 * input): every executable script must be an external same-origin file, and no
 * inline JavaScript may slip in through a template or plugin change unless its
 * hash is approved above. The browser test is the authoritative check; this
 * makes the build fail early instead of shipping a page the policy would break.
 */
export function assertHtmlCompatibleWithCsp(html: string): void {
  const problems: string[] = [];
  const markup = html.replace(/<!--[\s\S]*?-->/g, "");

  for (const match of markup.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    const attrs = match[1];
    const body = match[2];
    const src = /\bsrc\s*=\s*["']?([^"'\s>]+)/i.exec(attrs)?.[1];
    const type = /\btype\s*=\s*["']?([^"'\s>]+)/i.exec(attrs)?.[1]?.toLowerCase();

    if (src) {
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(src)) problems.push(`cross-origin or non-http script src: ${src}`);
      continue;
    }
    if (type && NON_EXECUTABLE_SCRIPT_TYPES.has(type)) {
      try {
        JSON.parse(body);
      } catch {
        problems.push(`${type} block is not valid JSON`);
      }
      continue;
    }
    const hash = `'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`;
    if (!ALLOWED_INLINE_SCRIPT_HASHES.includes(hash)) problems.push(`unapproved inline script ${hash}`);
  }

  for (const match of markup.matchAll(/<[a-z][^>]*\s(on[a-z]+)\s*=/gi)) {
    problems.push(`inline event handler attribute: ${match[1]}`);
  }
  if (/\b(?:href|src|action|formaction)\s*=\s*["']?\s*javascript:/i.test(markup)) {
    problems.push("javascript: URL in markup");
  }
  if (/http-equiv\s*=\s*["']?content-security-policy/i.test(markup)) {
    problems.push("index.html already declares a CSP meta tag; edit security/csp.ts instead");
  }

  if (problems.length) {
    throw new Error(`index.html is not compatible with the production CSP:\n- ${problems.join("\n- ")}`);
  }
}

/**
 * Puts the policy directly after <meta charset> so it precedes every script,
 * stylesheet and image in the document (a meta CSP only governs what follows it)
 * while keeping the charset declaration inside the first 1024 bytes.
 */
export function injectCspMeta(html: string): string {
  const tag = `<meta http-equiv="Content-Security-Policy" content="${META_CSP}">`;
  const charset = /<meta\s+charset\s*=\s*["']?utf-8["']?\s*\/?>/i.exec(html);
  if (!charset) throw new Error('index.html must declare <meta charset="UTF-8"> before the CSP meta tag');
  const at = charset.index + charset[0].length;
  return `${html.slice(0, at)}\n    ${tag}${html.slice(at)}`;
}

/** Build-only: lint the final index.html, then inject the policy. */
export function cspMetaPlugin(): Plugin {
  return {
    name: "ncpho:csp-meta",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        assertHtmlCompatibleWithCsp(html);
        return injectCspMeta(html);
      },
    },
  };
}
