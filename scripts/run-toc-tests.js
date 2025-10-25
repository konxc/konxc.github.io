#!/usr/bin/env node

import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

class TOCTestRunner {
  constructor() {
    this.devServer = null;
    this.browser = null;
    this.page = null;
    this.baseUrl = 'http://localhost:4321';
  }

  async startDevServer() {
    console.log('🚀 Starting Astro dev server...');
    
    return new Promise((resolve, reject) => {
      this.devServer = spawn('npm', ['run', 'dev'], {
        stdio: 'pipe',
        shell: true
      });

      let serverReady = false;
      
      this.devServer.stdout.on('data', (data) => {
        const output = data.toString();
        console.log(output);
        
        if (output.includes('Local:') && !serverReady) {
          serverReady = true;
          console.log('✅ Dev server started successfully');
          // Wait a bit more for server to be fully ready
          setTimeout(resolve, 2000);
        }
      });

      this.devServer.stderr.on('data', (data) => {
        console.error('Server Error:', data.toString());
      });

      this.devServer.on('error', (error) => {
        console.error('Failed to start dev server:', error);
        reject(error);
      });

      // Timeout after 30 seconds
      setTimeout(() => {
        if (!serverReady) {
          reject(new Error('Dev server failed to start within 30 seconds'));
        }
      }, 30000);
    });
  }

  async initBrowser() {
    console.log('🌐 Initializing browser...');
    
    this.browser = await puppeteer.launch({
      headless: false, // Set to true for CI/CD
      devtools: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1200, height: 800 });
    
    console.log('✅ Browser initialized');
  }

  async runTOCTests() {
    console.log('\n📋 Running Table of Contents Tests...');
    
    try {
      // Navigate to blog post
      const blogUrl = `${this.baseUrl}/blog/2024-01-29-mengatasi-empty-chunk-warning-astro`;
      console.log(`🔗 Navigating to: ${blogUrl}`);
      
      await this.page.goto(blogUrl, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      
      // Wait for TOC to load
      await this.page.waitForSelector('#toc-nav', { timeout: 10000 });
      
      // Basic structure tests
      const structureTests = [
        {
          name: 'TOC Container Exists',
          selector: '#toc-nav'
        },
        {
          name: 'TOC Header Exists',
          selector: '.toc-header'
        },
        {
          name: 'TOC Toggle Button Exists',
          selector: '#toc-toggle-btn'
        },
        {
          name: 'TOC Title Displayed',
          selector: '.toc-header h4'
        }
      ];

      console.log('\n🔍 Structure Tests:');
      for (const test of structureTests) {
        const element = await this.page.$(test.selector);
        console.log(`${element ? '✅' : '❌'} ${test.name}`);
      }

      // TOC state tests
      console.log('\n🎨 State Tests:');
      const tocNav = await this.page.$('#toc-nav');
      const classes = await this.page.evaluate(el => el?.className, tocNav);
      const isExpanded = classes?.includes('expanded');
      console.log(`${isExpanded ? '✅' : '❌'} TOC Expanded by Default`);

      // TOC links tests
      console.log('\n🔗 Links Tests:');
      const links = await this.page.$$('.toc-link');
      console.log(`${links.length > 0 ? '✅' : '❌'} TOC Links Generated (${links.length} links)`);

      if (links.length > 0) {
        const firstLink = links[0];
        const href = await this.page.evaluate(el => el.getAttribute('href'), firstLink);
        const text = await this.page.evaluate(el => el.textContent, firstLink);
        console.log(`${href?.startsWith('#heading-') ? '✅' : '❌'} Links Have Correct Href Format`);
        console.log(`${text?.length > 0 ? '✅' : '❌'} Links Have Text Content`);
      }

      // Hierarchy tests
      console.log('\n📊 Hierarchy Tests:');
      const h2Links = await this.page.$$('.toc-h2');
      const h3Links = await this.page.$$('.toc-h3');
      const h4Links = await this.page.$$('.toc-h4');
      
      console.log(`📝 H2 Links: ${h2Links.length}`);
      console.log(`📝 H3 Links: ${h3Links.length}`);
      console.log(`📝 H4 Links: ${h4Links.length}`);

      // Visual hierarchy test
      if (h3Links.length > 0) {
        const h3Style = await this.page.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            marginLeft: computed.marginLeft,
            paddingLeft: computed.paddingLeft
          };
        }, h3Links[0]);
        
        const hasIndentation = h3Style.marginLeft !== '0px' || h3Style.paddingLeft !== '0px';
        console.log(`${hasIndentation ? '✅' : '❌'} H3 Has Proper Indentation`);
      }

      // Interaction tests
      console.log('\n🖱️  Interaction Tests:');
      
      // Toggle functionality
      const toggleBtn = await this.page.$('#toc-toggle-btn');
      if (toggleBtn) {
        await toggleBtn.click();
        await this.page.waitForTimeout(300);
        
        const classesAfterClick = await this.page.evaluate(el => el?.className, tocNav);
        const isCollapsed = !classesAfterClick?.includes('expanded');
        console.log(`${isCollapsed ? '✅' : '❌'} Toggle Collapse Works`);
        
        await toggleBtn.click();
        await this.page.waitForTimeout(300);
        
        const classesAfterSecondClick = await this.page.evaluate(el => el?.className, tocNav);
        const isExpandedAgain = classesAfterSecondClick?.includes('expanded');
        console.log(`${isExpandedAgain ? '✅' : '❌'} Toggle Expand Works`);
      }

      // Click navigation test
      if (links.length > 0) {
        const initialScrollY = await this.page.evaluate(() => window.scrollY);
        await links[0].click();
        await this.page.waitForTimeout(500);
        
        const finalScrollY = await this.page.evaluate(() => window.scrollY);
        const scrolled = finalScrollY !== initialScrollY;
        console.log(`${scrolled ? '✅' : '❌'} Click Navigation Works`);
        
        // Check active state
        const firstLinkClasses = await this.page.evaluate(el => el?.className, links[0]);
        const isActive = firstLinkClasses?.includes('active');
        console.log(`${isActive ? '✅' : '❌'} Active State Applied`);
      }

      // Responsive test
      console.log('\n📱 Responsive Tests:');
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.waitForTimeout(500);
      
      const tocContainer = await this.page.$('.table-of-contents');
      const isVisible = await this.page.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
      }, tocContainer);
      
      console.log(`${isVisible ? '✅' : '❌'} TOC Visible on Mobile`);
      
      // Reset viewport
      await this.page.setViewport({ width: 1200, height: 800 });

      // Take screenshot
      console.log('\n📸 Taking Screenshots...');
      if (tocContainer) {
        await tocContainer.screenshot({ 
          path: 'toc-component-test.png',
          type: 'png'
        });
        console.log('✅ TOC screenshot saved as toc-component-test.png');
      }

    } catch (error) {
      console.error('❌ Test Error:', error);
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🧹 Browser closed');
    }
    
    if (this.devServer) {
      this.devServer.kill();
      console.log('🧹 Dev server stopped');
    }
  }

  async run() {
    try {
      await this.startDevServer();
      await this.initBrowser();
      await this.runTOCTests();
      
      console.log('\n🎉 TOC Testing Complete!');
      console.log('📸 Check toc-component-test.png for visual reference');
      
    } catch (error) {
      console.error('❌ Test Suite Error:', error);
    } finally {
      await this.cleanup();
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const runner = new TOCTestRunner();
  runner.run().catch(console.error);
}

export default TOCTestRunner;
