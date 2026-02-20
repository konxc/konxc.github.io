#!/usr/bin/env node

/**
 * Playwright Ecosystem Verification Suite
 *
 * This script verifies the existence and visual integrity of the newly
 * created ecosystem pages (Services, Projects, Join, Docs, etc.).
 *
 * Usage: node scripts/test-ecosystem-ui.js
 */

import fs from "fs";
import path from "path";
import { chromium } from "playwright";

// Configuration
const CONFIG = {
  baseUrl: "http://localhost:4321",
  timeout: 30000,
  screenshotDir: "./test-results/ecosystem-ui",
  routes: [
    {
      path: "/services",
      label: "Services Hub",
      selectors: [
        "h1:has-text('ELEVATING')",
        "a[href*='/services/it-support']",
      ],
    },
    {
      path: "/projects",
      label: "Projects Portfolio",
      selectors: ["h1:has-text('IMPACT BY CODE')", ".grid > div"],
    },
    {
      path: "/contributors/join",
      label: "Join The Squad",
      selectors: [
        "h1:has-text('WRITE THE NEXT CHAPTER')",
        "h2:has-text('Onboarding Logic')",
        ".rounded-xl:has-text('KX')",
      ],
    },
    {
      path: "/docs",
      label: "Documentation",
      selectors: ["h1:has-text('Knowledge Base')", "input[type='search']"],
    },
    {
      path: "/team",
      label: "Team Profile",
      selectors: ["h1:has-text('SQUAD')", "h3"],
    },
    {
      path: "/open-source",
      label: "Open Source",
      selectors: ["h1:has-text('Code is Freedom')", "a[href*='github.com']"],
    },
  ],
};

const results = {
  passed: 0,
  failed: 0,
  details: [],
};

function setup() {
  if (!fs.existsSync(CONFIG.screenshotDir)) {
    fs.mkdirSync(CONFIG.screenshotDir, { recursive: true });
    console.log(`✅ Created results directory: ${CONFIG.screenshotDir}`);
  }
}

async function verifyRoute(page, route) {
  console.log(`\n🔍 Verifying: ${route.label} (${route.path})`);
  try {
    await page.goto(`${CONFIG.baseUrl}${route.path}`, {
      waitUntil: "networkidle",
      timeout: CONFIG.timeout,
    });

    const screenshotPath = path.join(
      CONFIG.screenshotDir,
      `${route.path.replace(/\//g, "-") || "home"}.png`,
    );

    // Check key selectors
    for (const selector of route.selectors) {
      const element = page.locator(selector);
      const count = await element.count();
      if (count === 0)
        throw new Error(`Required element not found: ${selector}`);
    }

    // Check for text clipping (vague check for overflow but largely visibility check)
    const isHeaderVisible = await page.locator("h1").isVisible();
    if (!isHeaderVisible) throw new Error("Main header is not visible");

    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(
      `✅ ${route.label} passed verification. Screenshot: ${screenshotPath}`,
    );
    results.passed++;
    results.details.push({ route: route.path, status: "PASSED" });
  } catch (error) {
    console.error(`❌ ${route.label} failed: ${error.message}`);
    results.failed++;
    results.details.push({
      route: route.path,
      status: "FAILED",
      error: error.message,
    });
  }
}

async function run() {
  console.log("🚀 Starting Ecosystem UI Verification");
  console.log("=====================================");

  setup();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  try {
    // Check if server is up
    try {
      await page.goto(CONFIG.baseUrl, { timeout: 5000 });
    } catch {
      console.error(
        `\n🔴 Error: Local server not detected at ${CONFIG.baseUrl}`,
      );
      console.log(
        "Please run 'npm run dev' in another terminal before running this script.",
      );
      process.exit(1);
    }

    for (const route of CONFIG.routes) {
      await verifyRoute(page, route);
    }
  } finally {
    await browser.close();
  }

  console.log("\n📊 Final Report");
  console.log("--------------");
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Total Scanned: ${results.passed + results.failed}`);

  if (results.failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
