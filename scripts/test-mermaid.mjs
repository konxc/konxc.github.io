#!/usr/bin/env node
/**
 * test-mermaid.mjs — Mermaid Diagram Syntax Tester
 *
 * Tests the EXACT same pipeline as PostContent.tsx:
 *   1. Simulate marked HTML-encoding content
 *   2. Decode HTML entities (PostContent renderer.code step)
 *   3. base64 encode → decode round-trip
 *   4. mermaid.parse() for syntax validation
 *
 * Usage:
 *   node scripts/test-mermaid.mjs
 *   bun  scripts/test-mermaid.mjs
 */

import process from "node:process";
import { JSDOM } from "jsdom";

// ─────────────────────────────────────────────────────────────────────────────
// Setup JSDOM — dompurify (used by mermaid) requires a real DOM window.
// Must be done BEFORE importing mermaid.
// ─────────────────────────────────────────────────────────────────────────────
const jsdom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost",
});

const define = (key, value) => {
  try {
    Object.defineProperty(globalThis, key, { value, writable: true, configurable: true });
  } catch {
    try { globalThis[key] = value; } catch {}
  }
};

define("window",          jsdom.window);
define("document",        jsdom.window.document);
define("navigator",       jsdom.window.navigator);
define("location",        jsdom.window.location);
define("HTMLElement",     jsdom.window.HTMLElement);
define("SVGElement",      jsdom.window.SVGElement ?? class SVGElement {});
define("Element",         jsdom.window.Element);
define("Event",           jsdom.window.Event);
define("CustomEvent",     jsdom.window.CustomEvent);
define("MutationObserver",jsdom.window.MutationObserver);
define("requestAnimationFrame",  (cb) => setTimeout(cb, 0));
define("cancelAnimationFrame",   clearTimeout);
define("getComputedStyle",       jsdom.window.getComputedStyle?.bind(jsdom.window) ?? (() => ({})));

// ─────────────────────────────────────────────────────────────────────────────
// Colors
// ─────────────────────────────────────────────────────────────────────────────
const c = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  dim:    "\x1b[2m",
  green:  "\x1b[32m",
  red:    "\x1b[31m",
  yellow: "\x1b[33m",
  cyan:   "\x1b[36m",
  gray:   "\x1b[90m",
};

// ─────────────────────────────────────────────────────────────────────────────
// Test cases — same diagrams as Feed.tsx demo posts + extra types
// ─────────────────────────────────────────────────────────────────────────────
const DIAGRAMS = [
  {
    name: "Flowchart: Customer Onboarding Web3",
    type: "flowchart",
    source: `flowchart LR
    A[Customer Beli] --> B{Punya Wallet}
    B -->|Ya| C[Tambah Poin]
    B -->|Tidak| D[Buat Wallet]
    D --> C
    C --> E[Redeem Reward]`,
  },
  {
    name: "Pie Chart: Alokasi Aset UMKM",
    type: "pie",
    source: `pie showData title Alokasi Aset UMKM
    "Deposito" : 40
    "Reksa Dana" : 35
    "Saham" : 20
    "Kripto" : 5`,
  },
  {
    name: "Flowchart: Decision loop",
    type: "flowchart",
    source: `flowchart TD
    A[Start] --> B[Process]
    B --> C{Decision}
    C -->|Yes| D[End]
    C -->|No| B`,
  },
  {
    name: "Sequence Diagram: API Call",
    type: "sequence",
    source: `sequenceDiagram
    participant Client
    participant API
    participant DB
    Client->>API: POST /login
    API->>DB: Check credentials
    DB-->>API: User found
    API-->>Client: 200 OK + token`,
  },
  {
    name: "Class Diagram: Post Model",
    type: "class",
    source: `classDiagram
    class Post {
      +String id
      +String author
      +String content
      +Date createdAt
      +like() void
      +comment(text) void
    }
    class User {
      +String id
      +String name
    }
    User "1" --> "*" Post`,
  },
  {
    name: "Git Graph: Feature branch workflow",
    type: "git",
    source: `gitGraph
    commit
    branch feature
    checkout feature
    commit
    commit
    checkout main
    merge feature`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Pipeline helpers — mirrors PostContent.tsx exactly
// ─────────────────────────────────────────────────────────────────────────────

/** Simulate what marked v17 does to code block text */
function simulateMarkedEncoding(raw) {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** PostContent.tsx: renderer.code() entity decode step */
function decodeEntities(encoded) {
  return encoded
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/** PostContent.tsx: btoa(unescape(encodeURIComponent(raw))) */
function base64Encode(text) {
  return Buffer.from(text, "utf-8").toString("base64");
}

/** PostContent.tsx: decodeURIComponent(escape(atob(raw))) */
function base64Decode(b64) {
  return Buffer.from(b64, "base64").toString("utf-8");
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n${c.bold}${c.cyan}╔═══════════════════════════════════════════╗${c.reset}`);
  console.log(`${c.bold}${c.cyan}║       Mermaid Diagram Syntax Tester       ║${c.reset}`);
  console.log(`${c.bold}${c.cyan}╚═══════════════════════════════════════════╝${c.reset}\n`);

  // Load mermaid after globals are set
  console.log(`${c.dim}Loading mermaid...${c.reset}`);
  let mermaid;
  try {
    const mod = await import("mermaid");
    mermaid = mod.default;
    mermaid.initialize({
      startOnLoad: false,
      suppressErrorRendering: true,
    });
    console.log(`${c.green}✓ mermaid loaded (v11.12.3)${c.reset}\n`);
  } catch (err) {
    console.error(`${c.red}✗ Failed to load mermaid:${c.reset}`, err.message);
    process.exit(1);
  }

  let passed = 0;
  let failed = 0;

  for (const { name, type, source } of DIAGRAMS) {
    console.log(`${c.bold}▶ ${name}${c.reset}`);
    console.log(`  ${c.gray}Type: ${type}${c.reset}`);

    // ── Step 1: Simulate marked encoding ──────────────────────────────────
    const markedEncoded = simulateMarkedEncoding(source);
    const hasEntities = markedEncoded !== source;
    console.log(
      `  ${c.dim}marked encoding:  ${hasEntities
        ? c.yellow + "entities added (-->  becomes --&gt;)"
        : c.green  + "no changes"
      }${c.reset}`
    );

    // ── Step 2: Entity decode (our renderer.code() fix) ──────────────────
    const decoded = decodeEntities(markedEncoded);
    const roundtripOk = decoded === source;
    console.log(
      `  ${c.dim}entity decode:    ${roundtripOk
        ? c.green + "✓ round-trip OK"
        : c.red   + "✗ mismatch!\n    got: " + JSON.stringify(decoded.slice(0, 60))
      }${c.reset}`
    );

    // ── Step 3: Base64 pipeline ───────────────────────────────────────────
    const b64 = base64Encode(decoded);
    const b64decoded = base64Decode(b64);
    const b64ok = b64decoded === source;
    console.log(
      `  ${c.dim}base64 pipeline:  ${b64ok
        ? c.green + "✓ round-trip OK"
        : c.red   + "✗ mismatch!"
      }${c.reset}`
    );

    // ── Step 4: mermaid.parse() ───────────────────────────────────────────
    process.stdout.write(`  ${c.dim}mermaid.parse():  ${c.reset}`);
    try {
      const result = await mermaid.parse(b64decoded);
      console.log(`${c.green}${c.bold}✓ VALID${c.reset}`);
      if (result && typeof result === "object" && result.type) {
        console.log(`  ${c.dim}  → parsed type: ${c.cyan}${result.type}${c.reset}`);
      }
      passed++;
    } catch (err) {
      const msg = err?.message || String(err);
      console.log(`${c.red}${c.bold}✗ SYNTAX ERROR${c.reset}`);
      const firstLine = msg.split("\n")[0].slice(0, 120);
      console.log(`  ${c.red}  ${firstLine}${c.reset}`);
      failed++;
    }

    console.log();
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  const total = passed + failed;
  console.log(`${c.bold}═══════════════════════════════════════════${c.reset}`);
  console.log(
    `${c.bold}Results: ${c.green}${passed} passed${c.reset}` +
    `${c.bold}, ${failed > 0 ? c.red : c.gray}${failed} failed${c.reset}` +
    `${c.bold} / ${total} total${c.reset}`
  );

  if (failed === 0) {
    console.log(`\n${c.green}${c.bold}All diagrams valid! ✓${c.reset}\n`);
  } else {
    console.log(`\n${c.red}${c.bold}${failed} diagram(s) have syntax errors ✗${c.reset}\n`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`\n${c.red}Unexpected error:${c.reset}`, err);
  process.exit(1);
});
