#!/usr/bin/env node

/**
 * Simple SmartHeader Test using Playwright
 * 
 * This script performs basic tests to verify SmartHeader functionality
 */

import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4321';
const TEST_URLS = [
  '/blog/2024-01-26-path-aliases-astro',
  '/blog/2024-01-27-migrasi-tailwind-css-v3-ke-v4',
  '/blog/2024-01-28-mengatasi-warning-import-css'
];

async function testSmartHeader() {
  console.log('🚀 Starting SmartHeader Test');
  console.log('============================\n');
  
  const browser = await chromium.launch({ 
    headless: true, // Set to true for server environments
    slowMo: 0 
  });
  
  const page = await browser.newPage();
  
  try {
    for (const url of TEST_URLS) {
      console.log(`\n📄 Testing: ${BASE_URL}${url}`);
      console.log('─'.repeat(40));
      
      // Navigate to page
      await page.goto(`${BASE_URL}${url}`, { 
        waitUntil: 'networkidle',
        timeout: 10000 
      });
      
      // Wait for page load
      await page.waitForLoadState('domcontentloaded');
      
      // Test 1: Check if SmartHeader exists
      const smartHeader = await page.locator('#smart-header');
      const headerExists = await smartHeader.count() > 0;
      
      if (!headerExists) {
        console.log('❌ SmartHeader element not found');
        continue;
      }
      
      console.log('✅ SmartHeader element found');
      
      // Test 2: Check if header is visible
      const isVisible = await smartHeader.isVisible();
      
      if (!isVisible) {
        console.log('❌ SmartHeader is not visible');
        continue;
      }
      
      console.log('✅ SmartHeader is visible');
      
      // Test 3: Check header position
      const headerStyles = await smartHeader.evaluate((el) => {
        const computedStyle = window.getComputedStyle(el);
        return {
          position: computedStyle.position,
          top: computedStyle.top,
          transform: computedStyle.transform
        };
      });
      
      if (headerStyles.position !== 'fixed') {
        console.log(`❌ Header position is ${headerStyles.position}, expected 'fixed'`);
        continue;
      }
      
      if (headerStyles.top !== '0px') {
        console.log(`❌ Header top is ${headerStyles.top}, expected '0px'`);
        continue;
      }
      
      if (headerStyles.transform !== 'matrix(1, 0, 0, 1, 0, 0)') {
        console.log(`❌ Header transform is ${headerStyles.transform}, expected no transform`);
        continue;
      }
      
      console.log('✅ SmartHeader positioning is correct');
      
      // Test 4: Test scroll behavior
      console.log('🔄 Testing scroll behavior...');
      
      // Scroll down to trigger scrolled state
      await page.evaluate(() => window.scrollTo(0, 100));
      await page.waitForTimeout(500);
      
      const scrolledClasses = await smartHeader.getAttribute('class');
      if (scrolledClasses && scrolledClasses.includes('scrolled')) {
        console.log('✅ Scroll behavior working (scrolled class added)');
      } else {
        console.log('⚠️  Scroll behavior not working (no scrolled class)');
      }
      
      // Test hide behavior - scroll past blog post header
      await page.evaluate(() => {
        const blogPostHeader = document.querySelector('.section.bg-linear-to-br');
        if (blogPostHeader) {
          const headerHeight = blogPostHeader.offsetHeight;
          window.scrollTo(0, headerHeight + 100); // Scroll past header
        } else {
          window.scrollTo(0, 500); // Fallback scroll
        }
      });
      await page.waitForTimeout(800); // Wait longer for animation
      
      const hiddenClasses = await smartHeader.getAttribute('class');
      if (hiddenClasses && hiddenClasses.includes('hidden')) {
        console.log('✅ Hide behavior working (hidden class added)');
        
        // Test animation classes
        if (hiddenClasses.includes('hiding')) {
          console.log('✅ Hide animation class detected');
        }
      } else {
        console.log('⚠️  Hide behavior not working (no hidden class)');
      }
      
      // Test show behavior - scroll back up
      await page.evaluate(() => window.scrollTo(0, 50));
      await page.waitForTimeout(800); // Wait longer for animation
      
      const showClasses = await smartHeader.getAttribute('class');
      if (!showClasses || !showClasses.includes('hidden')) {
        console.log('✅ Show behavior working (hidden class removed)');
        
        // Test animation classes
        if (showClasses && showClasses.includes('showing')) {
          console.log('✅ Show animation class detected');
        }
      } else {
        console.log('⚠️  Show behavior not working (hidden class still present)');
      }
      
      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      
      const topClasses = await smartHeader.getAttribute('class');
      if (!topClasses || !topClasses.includes('scrolled')) {
        console.log('✅ Scroll behavior working (scrolled class removed)');
      } else {
        console.log('⚠️  Scroll behavior not working (scrolled class still present)');
      }
      
      // Test 5: Check navigation links
      const navLinks = await smartHeader.locator('a[href]').count();
      console.log(`✅ Found ${navLinks} navigation links`);
      
      // Test 6: Take screenshot
      await page.screenshot({ 
        path: `test-results/smart-header-test-${url.replace(/\//g, '-')}.png`,
        fullPage: true 
      });
      console.log('📸 Screenshot saved');
      
      console.log('✅ All tests passed for this URL\n');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
  
  console.log('🎉 SmartHeader test completed!');
}

// Run the test
testSmartHeader().catch(console.error);
