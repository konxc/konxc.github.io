#!/usr/bin/env node

/**
 * TOC Testing Script for New Articles
 * Tests Table of Contents functionality on newly created testing articles
 */

import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

class TOCArticleTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.devServer = null;
    this.baseUrl = 'http://localhost:4321';
    this.testArticles = [
      '/blog/2024-01-30-testing-table-of-contents-comprehensive-guide',
      '/blog/2024-01-30-deep-hierarchy-testing-toc-indentation',
      '/blog/2024-01-30-simple-toc-testing-basic-functionality'
    ];
  }

  async startDevServer() {
    console.log('🚀 Starting Astro dev server...');
    
    return new Promise((resolve, reject) => {
      this.devServer = spawn('npm', ['run', 'dev'], {
        stdio: 'pipe',
        cwd: process.cwd()
      });

      this.devServer.stdout.on('data', (data) => {
        const output = data.toString();
        if (output.includes('Local:') || output.includes('localhost:4321')) {
          console.log('✅ Dev server started successfully');
          resolve();
        }
      });

      this.devServer.stderr.on('data', (data) => {
        console.error('Dev server error:', data.toString());
      });

      this.devServer.on('error', (error) => {
        console.error('Failed to start dev server:', error);
        reject(error);
      });

      // Timeout after 30 seconds
      setTimeout(() => {
        reject(new Error('Dev server startup timeout'));
      }, 30000);
    });
  }

  async initBrowser() {
    console.log('🌐 Launching browser...');
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    
    // Set viewport
    await this.page.setViewport({ width: 1280, height: 720 });
    
    console.log('✅ Browser launched successfully');
  }

  async testArticle(articlePath) {
    const url = `${this.baseUrl}${articlePath}`;
    console.log(`\n📄 Testing article: ${articlePath}`);
    
    try {
      // Navigate to article
      await this.page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait for TOC to load
      await this.page.waitForSelector('.toc-container', { timeout: 10000 });
      
      // Test results
      const results = {
        url,
        timestamp: new Date().toISOString(),
        tests: {}
      };

      // Test 1: TOC Container Exists
      const tocExists = await this.page.$('.toc-container') !== null;
      results.tests.tocContainerExists = tocExists;
      console.log(`  ✅ TOC Container: ${tocExists ? 'Found' : 'Not Found'}`);

      // Test 2: TOC Links Generated
      const tocLinks = await this.page.$$('.toc-link');
      results.tests.tocLinksGenerated = tocLinks.length > 0;
      results.tests.tocLinksCount = tocLinks.length;
      console.log(`  ✅ TOC Links: ${tocLinks.length} links generated`);

      // Test 3: Heading Levels Detection
      const headingLevels = await this.page.evaluate(() => {
        const links = document.querySelectorAll('.toc-link');
        const levels = {};
        links.forEach(link => {
          const className = link.className;
          if (className.includes('toc-h2')) levels.h2 = (levels.h2 || 0) + 1;
          if (className.includes('toc-h3')) levels.h3 = (levels.h3 || 0) + 1;
          if (className.includes('toc-h4')) levels.h4 = (levels.h4 || 0) + 1;
          if (className.includes('toc-h5')) levels.h5 = (levels.h5 || 0) + 1;
          if (className.includes('toc-h6')) levels.h6 = (levels.h6 || 0) + 1;
        });
        return levels;
      });
      results.tests.headingLevels = headingLevels;
      console.log(`  ✅ Heading Levels:`, headingLevels);

      // Test 4: Indentation Testing
      const indentationTest = await this.page.evaluate(() => {
        const links = document.querySelectorAll('.toc-link');
        const indentation = {};
        links.forEach(link => {
          const className = link.className;
          const computedStyle = window.getComputedStyle(link);
          const marginLeft = computedStyle.marginLeft;
          
          if (className.includes('toc-h2')) indentation.h2 = marginLeft;
          if (className.includes('toc-h3')) indentation.h3 = marginLeft;
          if (className.includes('toc-h4')) indentation.h4 = marginLeft;
          if (className.includes('toc-h5')) indentation.h5 = marginLeft;
          if (className.includes('toc-h6')) indentation.h6 = marginLeft;
        });
        return indentation;
      });
      results.tests.indentation = indentationTest;
      console.log(`  ✅ Indentation:`, indentationTest);

      // Test 5: Active State Functionality
      const activeStateTest = await this.page.evaluate(() => {
        // Scroll to first heading
        const firstHeading = document.querySelector('h2, h3, h4, h5, h6');
        if (firstHeading) {
          firstHeading.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      });
      
      if (activeStateTest) {
        // Wait for scroll to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const activeLink = await this.page.$('.toc-link.active');
        results.tests.activeStateWorking = activeLink !== null;
        console.log(`  ✅ Active State: ${activeLink ? 'Working' : 'Not Working'}`);
      }

      // Test 6: Smooth Scrolling
      const smoothScrollTest = await this.page.evaluate(() => {
        const tocLinks = document.querySelectorAll('.toc-link');
        if (tocLinks.length > 0) {
          const firstLink = tocLinks[0];
          const href = firstLink.getAttribute('href');
          if (href && href.startsWith('#')) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
              return true;
            }
          }
        }
        return false;
      });
      
      results.tests.smoothScrolling = smoothScrollTest;
      console.log(`  ✅ Smooth Scrolling: ${smoothScrollTest ? 'Working' : 'Not Working'}`);

      // Test 7: Responsive Design
      await this.page.setViewport({ width: 375, height: 667 }); // Mobile size
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mobileTocVisible = await this.page.$('.toc-container') !== null;
      results.tests.mobileResponsive = mobileTocVisible;
      console.log(`  ✅ Mobile Responsive: ${mobileTocVisible ? 'Working' : 'Not Working'}`);
      
      // Reset viewport
      await this.page.setViewport({ width: 1280, height: 720 });

      // Test 8: CSS Classes Validation
      const cssValidation = await this.page.evaluate(() => {
        const links = document.querySelectorAll('.toc-link');
        const validation = {
          validClasses: 0,
          invalidClasses: 0,
          totalLinks: links.length
        };
        
        links.forEach(link => {
          const className = link.className;
          // Check for valid Tailwind classes
          const hasValidMargin = className.includes('ml-0') || 
                               className.includes('ml-6') || 
                               className.includes('ml-12') || 
                               className.includes('ml-16') || 
                               className.includes('ml-20');
          
          if (hasValidMargin) {
            validation.validClasses++;
          } else {
            validation.invalidClasses++;
          }
        });
        
        return validation;
      });
      results.tests.cssValidation = cssValidation;
      console.log(`  ✅ CSS Validation: ${cssValidation.validClasses}/${cssValidation.totalLinks} valid classes`);

      return results;

    } catch (error) {
      console.error(`❌ Error testing ${articlePath}:`, error.message);
      return {
        url,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async runAllTests() {
    console.log('🧪 Starting TOC Article Testing Suite...\n');
    
    const allResults = [];
    
    for (const article of this.testArticles) {
      const result = await this.testArticle(article);
      allResults.push(result);
    }
    
    return allResults;
  }

  async generateReport(results) {
    console.log('\n📊 TESTING REPORT');
    console.log('==================');
    
    let totalTests = 0;
    let passedTests = 0;
    
    results.forEach((result, index) => {
      console.log(`\n📄 Article ${index + 1}: ${result.url}`);
      
      if (result.error) {
        console.log(`  ❌ Error: ${result.error}`);
        return;
      }
      
      Object.entries(result.tests).forEach(([testName, testResult]) => {
        totalTests++;
        if (testResult === true || (typeof testResult === 'object' && testResult !== null)) {
          passedTests++;
          console.log(`  ✅ ${testName}: PASS`);
        } else {
          console.log(`  ❌ ${testName}: FAIL`);
        }
      });
    });
    
    const successRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0;
    console.log(`\n📈 Overall Success Rate: ${successRate}% (${passedTests}/${totalTests})`);
    
    if (successRate >= 90) {
      console.log('🎉 Excellent! TOC is working perfectly!');
    } else if (successRate >= 70) {
      console.log('👍 Good! TOC is mostly working with minor issues.');
    } else {
      console.log('⚠️  Needs attention! TOC has significant issues.');
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔒 Browser closed');
    }
    
    if (this.devServer) {
      this.devServer.kill();
      console.log('🛑 Dev server stopped');
    }
  }

  async run() {
    try {
      await this.startDevServer();
      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for server to be ready
      
      await this.initBrowser();
      
      const results = await this.runAllTests();
      await this.generateReport(results);
      
    } catch (error) {
      console.error('❌ Testing failed:', error.message);
    } finally {
      await this.cleanup();
    }
  }
}

// Run the test
const tester = new TOCArticleTester();
tester.run().catch(console.error);
