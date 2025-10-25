#!/usr/bin/env node

/**
 * Playwright Test Suite for SmartHeader Fix
 * 
 * This script tests the SmartHeader functionality on blog slug pages
 * to ensure the header is visible and working correctly.
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

// Configuration
const CONFIG = {
  baseUrl: 'http://localhost:4321',
  testUrls: [
    '/blog/2024-01-26-path-aliases-astro',
    '/blog/2024-01-27-migrasi-tailwind-css-v3-ke-v4',
    '/blog/2024-01-28-mengatasi-warning-import-css',
    '/blog/2024-01-29-mengatasi-empty-chunk-warning-astro'
  ],
  timeout: 30000,
  screenshotDir: './test-results/smart-header'
};

// Test results
const testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  details: []
};

// Utility functions
function createScreenshotDir() {
  if (!fs.existsSync(CONFIG.screenshotDir)) {
    fs.mkdirSync(CONFIG.screenshotDir, { recursive: true });
    console.log(`✅ Created screenshot directory: ${CONFIG.screenshotDir}`);
  }
}

function logResult(testName, passed, details = '') {
  testResults.total++;
  if (passed) {
    testResults.passed++;
    console.log(`✅ ${testName}: PASSED`);
  } else {
    testResults.failed++;
    console.log(`❌ ${testName}: FAILED - ${details}`);
  }
  
  testResults.details.push({
    test: testName,
    passed,
    details
  });
}

async function takeScreenshot(page, name) {
  const screenshotPath = path.join(CONFIG.screenshotDir, `${name}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`📸 Screenshot saved: ${screenshotPath}`);
}

// Test functions
async function testSmartHeaderVisibility(page, url) {
  const testName = `SmartHeader Visibility - ${url}`;
  
  try {
    console.log(`\n🔍 Testing: ${testName}`);
    
    // Navigate to the page
    await page.goto(`${CONFIG.baseUrl}${url}`, { 
      waitUntil: 'networkidle',
      timeout: CONFIG.timeout 
    });
    
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');
    
    // Check if SmartHeader exists
    const smartHeader = await page.locator('#smart-header');
    const headerExists = await smartHeader.count() > 0;
    
    if (!headerExists) {
      logResult(testName, false, 'SmartHeader element not found');
      await takeScreenshot(page, `smart-header-not-found-${url.replace(/\//g, '-')}`);
      return false;
    }
    
    // Check if header is visible
    const isVisible = await smartHeader.isVisible();
    
    if (!isVisible) {
      logResult(testName, false, 'SmartHeader is not visible');
      await takeScreenshot(page, `smart-header-hidden-${url.replace(/\//g, '-')}`);
      return false;
    }
    
    // Check header styling
    const headerStyles = await smartHeader.evaluate((el) => {
      const computedStyle = window.getComputedStyle(el);
      return {
        position: computedStyle.position,
        top: computedStyle.top,
        zIndex: computedStyle.zIndex,
        transform: computedStyle.transform
      };
    });
    
    // Verify header is fixed positioned
    if (headerStyles.position !== 'fixed') {
      logResult(testName, false, `Header position is ${headerStyles.position}, expected 'fixed'`);
      return false;
    }
    
    // Verify header is at top
    if (headerStyles.top !== '0px') {
      logResult(testName, false, `Header top is ${headerStyles.top}, expected '0px'`);
      return false;
    }
    
    // Verify header is not transformed (hidden)
    if (headerStyles.transform !== 'matrix(1, 0, 0, 1, 0, 0)') {
      logResult(testName, false, `Header transform is ${headerStyles.transform}, expected no transform`);
      return false;
    }
    
    logResult(testName, true);
    await takeScreenshot(page, `smart-header-visible-${url.replace(/\//g, '-')}`);
    return true;
    
  } catch (error) {
    logResult(testName, false, error.message);
    await takeScreenshot(page, `smart-header-error-${url.replace(/\//g, '-')}`);
    return false;
  }
}

async function testSmartHeaderScrollBehavior(page, url) {
  const testName = `SmartHeader Scroll Behavior - ${url}`;
  
  try {
    console.log(`\n🔍 Testing: ${testName}`);
    
    // Navigate to the page
    await page.goto(`${CONFIG.baseUrl}${url}`, { 
      waitUntil: 'networkidle',
      timeout: CONFIG.timeout 
    });
    
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');
    
    const smartHeader = await page.locator('#smart-header');
    
    // Test initial state (should not have 'scrolled' class)
    const initialClasses = await smartHeader.getAttribute('class');
    if (initialClasses && initialClasses.includes('scrolled')) {
      logResult(testName, false, 'Header has scrolled class on initial load');
      return false;
    }
    
    // Scroll down to trigger scrolled state
    await page.evaluate(() => {
      window.scrollTo(0, 100);
    });
    
    // Wait for scroll event to process
    await page.waitForTimeout(500);
    
    // Check if scrolled class is added
    const scrolledClasses = await smartHeader.getAttribute('class');
    if (!scrolledClasses || !scrolledClasses.includes('scrolled')) {
      logResult(testName, false, 'Header does not have scrolled class after scrolling');
      await takeScreenshot(page, `smart-header-scroll-failed-${url.replace(/\//g, '-')}`);
      return false;
    }
    
    // Scroll back to top
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    
    // Wait for scroll event to process
    await page.waitForTimeout(500);
    
    // Check if scrolled class is removed
    const topClasses = await smartHeader.getAttribute('class');
    if (topClasses && topClasses.includes('scrolled')) {
      logResult(testName, false, 'Header still has scrolled class after scrolling to top');
      return false;
    }
    
    logResult(testName, true);
    await takeScreenshot(page, `smart-header-scroll-success-${url.replace(/\//g, '-')}`);
    return true;
    
  } catch (error) {
    logResult(testName, false, error.message);
    await takeScreenshot(page, `smart-header-scroll-error-${url.replace(/\//g, '-')}`);
    return false;
  }
}

async function testSmartHeaderNavigation(page, url) {
  const testName = `SmartHeader Navigation - ${url}`;
  
  try {
    console.log(`\n🔍 Testing: ${testName}`);
    
    // Navigate to the page
    await page.goto(`${CONFIG.baseUrl}${url}`, { 
      waitUntil: 'networkidle',
      timeout: CONFIG.timeout 
    });
    
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');
    
    const smartHeader = await page.locator('#smart-header');
    
    // Check if navigation links are present and clickable
    const navLinks = await smartHeader.locator('a[href]').count();
    
    if (navLinks === 0) {
      logResult(testName, false, 'No navigation links found in header');
      return false;
    }
    
    // Test clicking on a navigation link (Blog link)
    const blogLink = await smartHeader.locator('a[href="/blog"]').first();
    
    if (await blogLink.count() === 0) {
      logResult(testName, false, 'Blog navigation link not found');
      return false;
    }
    
    // Click the blog link
    await blogLink.click();
    
    // Wait for navigation
    await page.waitForLoadState('networkidle');
    
    // Check if we're on the blog page
    const currentUrl = page.url();
    if (!currentUrl.includes('/blog')) {
      logResult(testName, false, `Navigation failed. Current URL: ${currentUrl}`);
      return false;
    }
    
    logResult(testName, true);
    await takeScreenshot(page, `smart-header-nav-success-${url.replace(/\//g, '-')}`);
    return true;
    
  } catch (error) {
    logResult(testName, false, error.message);
    await takeScreenshot(page, `smart-header-nav-error-${url.replace(/\//g, '-')}`);
    return false;
  }
}

async function testSmartHeaderResponsive(page, url) {
  const testName = `SmartHeader Responsive - ${url}`;
  
  try {
    console.log(`\n🔍 Testing: ${testName}`);
    
    // Navigate to the page
    await page.goto(`${CONFIG.baseUrl}${url}`, { 
      waitUntil: 'networkidle',
      timeout: CONFIG.timeout 
    });
    
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');
    
    const smartHeader = await page.locator('#smart-header');
    
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(500);
    
    const desktopVisible = await smartHeader.isVisible();
    if (!desktopVisible) {
      logResult(testName, false, 'Header not visible on desktop');
      return false;
    }
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    
    const tabletVisible = await smartHeader.isVisible();
    if (!tabletVisible) {
      logResult(testName, false, 'Header not visible on tablet');
      return false;
    }
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    const mobileVisible = await smartHeader.isVisible();
    if (!mobileVisible) {
      logResult(testName, false, 'Header not visible on mobile');
      return false;
    }
    
    // Test mobile menu toggle
    const mobileMenuToggle = await smartHeader.locator('.mobile-menu-toggle').first();
    if (await mobileMenuToggle.count() > 0) {
      await mobileMenuToggle.click();
      await page.waitForTimeout(500);
      
      const mobileMenu = await page.locator('.mobile-menu').first();
      const menuVisible = await mobileMenu.isVisible();
      
      if (!menuVisible) {
        logResult(testName, false, 'Mobile menu not opening');
        return false;
      }
    }
    
    logResult(testName, true);
    await takeScreenshot(page, `smart-header-responsive-${url.replace(/\//g, '-')}`);
    return true;
    
  } catch (error) {
    logResult(testName, false, error.message);
    await takeScreenshot(page, `smart-header-responsive-error-${url.replace(/\//g, '-')}`);
    return false;
  }
}

// Main test runner
async function runSmartHeaderTests() {
  console.log('🚀 Starting SmartHeader Playwright Tests');
  console.log('=====================================\n');
  
  createScreenshotDir();
  
  const browser = await chromium.launch({ 
    headless: true, // Set to true for server environments
    slowMo: 0 // No slow motion for headless
  });
  
  const context = await browser.newContext({
    viewport: { width: 1200, height: 800 }
  });
  
  const page = await context.newPage();
  
  try {
    // Test each URL
    for (const url of CONFIG.testUrls) {
      console.log(`\n📄 Testing URL: ${CONFIG.baseUrl}${url}`);
      console.log('─'.repeat(50));
      
      // Run all tests for this URL
      await testSmartHeaderVisibility(page, url);
      await testSmartHeaderScrollBehavior(page, url);
      await testSmartHeaderNavigation(page, url);
      await testSmartHeaderResponsive(page, url);
    }
    
  } catch (error) {
    console.error('❌ Test execution failed:', error);
  } finally {
    await browser.close();
  }
  
  // Generate test report
  generateTestReport();
}

function generateTestReport() {
  console.log('\n📊 Test Results Summary');
  console.log('======================');
  console.log(`Total Tests: ${testResults.total}`);
  console.log(`Passed: ${testResults.passed}`);
  console.log(`Failed: ${testResults.failed}`);
  console.log(`Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`);
  
  if (testResults.failed > 0) {
    console.log('\n❌ Failed Tests:');
    testResults.details
      .filter(test => !test.passed)
      .forEach(test => {
        console.log(`  - ${test.test}: ${test.details}`);
      });
  }
  
  // Save detailed report
  const reportPath = path.join(CONFIG.screenshotDir, 'test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
  console.log(`\n📄 Detailed report saved: ${reportPath}`);
  
  // Exit with appropriate code
  if (testResults.failed > 0) {
    console.log('\n❌ Some tests failed. Check the report for details.');
    process.exit(1);
  } else {
    console.log('\n✅ All tests passed! SmartHeader is working correctly.');
    process.exit(0);
  }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runSmartHeaderTests().catch(console.error);
}
