const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:4321';
const PAGES = [
  { name: 'blog_index', url: '/blog' },
  { name: 'blog_post', url: '/blog/2024-01-15-digitalisasi-umkm' } // Testing with the filename as slug
];

async function runTest() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  const resultsDir = path.join(__dirname, '../artifacts/theme_tests');
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  for (const pageInfo of PAGES) {
    console.log(`Testing ${pageInfo.name}...`);
    
    // Test Light Theme
    await page.goto(`${BASE_URL}${pageInfo.url}`);
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    });
    await page.waitForTimeout(500); // Wait for transitions
    await page.screenshot({ path: path.join(resultsDir, `${pageInfo.name}_light.png`), fullPage: true });

    // Test Dark Theme
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    });
    await page.waitForTimeout(500); // Wait for transitions
    await page.screenshot({ path: path.join(resultsDir, `${pageInfo.name}_dark.png`), fullPage: true });
  }

  await browser.close();
}

runTest().catch(console.error);
