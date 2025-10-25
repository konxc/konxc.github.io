#!/usr/bin/env node

import puppeteer from 'puppeteer';

class SimpleTOCTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.baseUrl = 'http://localhost:4321';
  }

  async init() {
    console.log('🌐 Initializing browser...');
    
    this.browser = await puppeteer.launch({
      headless: true, // Headless mode for server environments
      devtools: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
    });
    
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1200, height: 800 });
    
    console.log('✅ Browser initialized');
  }

  async testTOC() {
    console.log('\n📋 Testing Table of Contents...');
    
    try {
      // Navigate to blog post
      const blogUrl = `${this.baseUrl}/blog/2024-01-29-mengatasi-empty-chunk-warning-astro`;
      console.log(`🔗 Navigating to: ${blogUrl}`);
      
      await this.page.goto(blogUrl, { 
        waitUntil: 'networkidle0',
        timeout: 60000 
      });
      
      console.log('✅ Page loaded successfully');
      
      // Wait for TOC to load
      console.log('⏳ Waiting for TOC to load...');
      await this.page.waitForSelector('#toc-nav', { timeout: 15000 });
      console.log('✅ TOC container found');
      
      // Basic tests
      const tests = [
        {
          name: 'TOC Container Exists',
          test: async () => {
            const element = await this.page.$('#toc-nav');
            return element !== null;
          }
        },
        {
          name: 'TOC Header Exists',
          test: async () => {
            const header = await this.page.$('.toc-header');
            return header !== null;
          }
        },
        {
          name: 'TOC Toggle Button Exists',
          test: async () => {
            const toggleBtn = await this.page.$('#toc-toggle-btn');
            return toggleBtn !== null;
          }
        },
        {
          name: 'TOC Title Displayed',
          test: async () => {
            const title = await this.page.$('.toc-header h4');
            const text = await this.page.evaluate(el => el?.textContent, title);
            return text === 'Daftar Isi';
          }
        },
        {
          name: 'TOC Expanded by Default',
          test: async () => {
            const tocNav = await this.page.$('#toc-nav');
            const classes = await this.page.evaluate(el => el?.className, tocNav);
            return classes?.includes('expanded');
          }
        },
        {
          name: 'TOC Links Generated',
          test: async () => {
            const links = await this.page.$$('.toc-link');
            return links.length > 0;
          }
        },
        {
          name: 'TOC Links Have Correct Structure',
          test: async () => {
            const links = await this.page.$$('.toc-link');
            if (links.length === 0) return false;
            
            const firstLink = links[0];
            const href = await this.page.evaluate(el => el.getAttribute('href'), firstLink);
            const text = await this.page.evaluate(el => el.textContent, firstLink);
            
            return href?.startsWith('#heading-') && text?.length > 0;
          }
        },
        {
          name: 'TOC Hierarchy (H2, H3, H4)',
          test: async () => {
            const h2Links = await this.page.$$('.toc-h2');
            const h3Links = await this.page.$$('.toc-h3');
            const h4Links = await this.page.$$('.toc-h4');
            
            return h2Links.length > 0 || h3Links.length > 0 || h4Links.length > 0;
          }
        },
        {
          name: 'TOC Toggle Functionality',
          test: async () => {
            const toggleBtn = await this.page.$('#toc-toggle-btn');
            const tocNav = await this.page.$('#toc-nav');
            
            if (!toggleBtn || !tocNav) return false;
            
            // Click toggle button
            await toggleBtn.click();
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Check if collapsed
            const classesAfterClick = await this.page.evaluate(el => el?.className, tocNav);
            const isCollapsed = !classesAfterClick?.includes('expanded');
            
            // Click again to expand
            await toggleBtn.click();
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Check if expanded again
            const classesAfterSecondClick = await this.page.evaluate(el => el?.className, tocNav);
            const isExpandedAgain = classesAfterSecondClick?.includes('expanded');
            
            return isCollapsed && isExpandedAgain;
          }
        },
        {
          name: 'TOC Smooth Scroll',
          test: async () => {
            const links = await this.page.$$('.toc-link');
            if (links.length === 0) return false;
            
            // Click first link
            await links[0].click();
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Check if page scrolled
            const scrollY = await this.page.evaluate(() => window.scrollY);
            return scrollY > 0;
          }
        }
      ];

      // Run tests
      let passed = 0;
      let total = tests.length;
      
      for (const test of tests) {
        try {
          const result = await test.test();
          console.log(`${result ? '✅' : '❌'} ${test.name}`);
          if (result) passed++;
        } catch (error) {
          console.log(`❌ ${test.name} - Error: ${error.message}`);
        }
      }

      // Summary
      console.log('\n' + '='.repeat(50));
      console.log('📊 TOC Test Summary');
      console.log('='.repeat(50));
      console.log(`✅ Passed: ${passed}/${total} (${((passed/total)*100).toFixed(1)}%)`);
      console.log(`❌ Failed: ${total - passed}/${total}`);
      console.log('='.repeat(50));

      // Take screenshot
      const tocElement = await this.page.$('.table-of-contents');
      if (tocElement) {
        await tocElement.screenshot({ 
          path: 'toc-test-result.png',
          type: 'png'
        });
        console.log('📸 Screenshot saved as toc-test-result.png');
      }

    } catch (error) {
      console.error('❌ Test Error:', error.message);
      
      // Try to take screenshot of error state
      try {
        await this.page.screenshot({ 
          path: 'toc-error-screenshot.png',
          type: 'png',
          fullPage: true
        });
        console.log('📸 Error screenshot saved as toc-error-screenshot.png');
      } catch (screenshotError) {
        console.log('❌ Could not take error screenshot');
      }
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🧹 Browser closed');
    }
  }

  async run() {
    try {
      await this.init();
      await this.testTOC();
    } catch (error) {
      console.error('❌ Test Suite Error:', error);
    } finally {
      await this.cleanup();
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new SimpleTOCTester();
  tester.run().catch(console.error);
}

export default SimpleTOCTester;
