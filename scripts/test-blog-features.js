#!/usr/bin/env node

/**
 * Automated Blog Features Testing Script
 * Tests all blog features programmatically
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class BlogFeaturesTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      toc: { passed: 0, failed: 0, total: 0, tests: [] },
      progress: { passed: 0, failed: 0, total: 0, tests: [] },
      social: { passed: 0, failed: 0, total: 0, tests: [] },
      darkmode: { passed: 0, failed: 0, total: 0, tests: [] }
    };
  }

  async init() {
    console.log('🚀 Starting Blog Features Testing...');
    this.browser = await puppeteer.launch({ 
      headless: false, // Set to true for CI/CD
      devtools: false 
    });
    this.page = await this.browser.newPage();
    
    // Set viewport
    await this.page.setViewport({ width: 1280, height: 720 });
    
    // Enable console logging
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error('Browser Error:', msg.text());
      }
    });
  }

  async testTOC() {
    console.log('📋 Testing Table of Contents...');
    
    const tests = [
      {
        name: 'TOC Container Exists',
        test: async () => {
          const element = await this.page.$('#toc-nav');
          return element !== null;
        }
      },
      {
        name: 'TOC Has Headings',
        test: async () => {
          const headings = await this.page.$$('.prose h2, .prose h3, .prose h4, .blog-content h2, .blog-content h3, .blog-content h4');
          return headings.length > 0;
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
        name: 'TOC Links Have Correct Href',
        test: async () => {
          const links = await this.page.$$('.toc-link');
          for (let link of links) {
            const href = await this.page.evaluate(el => el.href, link);
            if (!href.includes('#heading-')) {
              return false;
            }
          }
          return true;
        }
      },
      {
        name: 'TOC Toggle Button Works',
        test: async () => {
          const toggleBtn = await this.page.$('.toc-toggle-btn');
          if (!toggleBtn) return false;
          
          const initialExpanded = await this.page.$eval('#toc-nav', el => el.classList.contains('expanded'));
          await toggleBtn.click();
          await this.page.waitForTimeout(100);
          const afterClick = await this.page.$eval('#toc-nav', el => el.classList.contains('expanded'));
          await toggleBtn.click(); // Reset
          
          return initialExpanded !== afterClick;
        }
      }
    ];

    for (const test of tests) {
      try {
        const result = await test.test();
        this.results.toc.tests.push({
          name: test.name,
          passed: result,
          error: null
        });
        
        if (result) {
          this.results.toc.passed++;
          console.log(`  ✅ ${test.name}`);
        } else {
          this.results.toc.failed++;
          console.log(`  ❌ ${test.name}`);
        }
      } catch (error) {
        this.results.toc.tests.push({
          name: test.name,
          passed: false,
          error: error.message
        });
        this.results.toc.failed++;
        console.log(`  ❌ ${test.name} - Error: ${error.message}`);
      }
    }
    
    this.results.toc.total = tests.length;
  }

  async testProgress() {
    console.log('📊 Testing Reading Progress Bar...');
    
    const tests = [
      {
        name: 'Progress Bar Element Exists',
        test: async () => {
          const element = await this.page.$('#reading-progress-bar');
          return element !== null;
        }
      },
      {
        name: 'Progress Bar Has Correct Classes',
        test: async () => {
          const element = await this.page.$('#reading-progress-bar');
          if (!element) return false;
          
          const className = await this.page.evaluate(el => el.className, element);
          return className.includes('progress-bar');
        }
      },
      {
        name: 'Progress Bar Initial Width',
        test: async () => {
          const element = await this.page.$('#reading-progress-bar');
          if (!element) return false;
          
          const width = await this.page.evaluate(el => el.style.width, element);
          return width === '0%';
        }
      },
      {
        name: 'Progress Bar Updates on Scroll',
        test: async () => {
          const element = await this.page.$('#reading-progress-bar');
          if (!element) return false;
          
          const initialWidth = await this.page.evaluate(el => el.style.width, element);
          
          // Scroll down
          await this.page.evaluate(() => {
            window.scrollTo(0, 500);
          });
          await this.page.waitForTimeout(500);
          
          const afterScrollWidth = await this.page.evaluate(el => el.style.width, element);
          
          return initialWidth !== afterScrollWidth;
        }
      }
    ];

    for (const test of tests) {
      try {
        const result = await test.test();
        this.results.progress.tests.push({
          name: test.name,
          passed: result,
          error: null
        });
        
        if (result) {
          this.results.progress.passed++;
          console.log(`  ✅ ${test.name}`);
        } else {
          this.results.progress.failed++;
          console.log(`  ❌ ${test.name}`);
        }
      } catch (error) {
        this.results.progress.tests.push({
          name: test.name,
          passed: false,
          error: error.message
        });
        this.results.progress.failed++;
        console.log(`  ❌ ${test.name} - Error: ${error.message}`);
      }
    }
    
    this.results.progress.total = tests.length;
  }

  async testSocial() {
    console.log('📤 Testing Social Sharing...');
    
    const tests = [
      {
        name: 'Social Share Container Exists',
        test: async () => {
          const element = await this.page.$('.social-share');
          return element !== null;
        }
      },
      {
        name: 'Twitter Share Button',
        test: async () => {
          const element = await this.page.$('.social-share-btn.twitter');
          if (!element) return false;
          
          const href = await this.page.evaluate(el => el.href, element);
          return href.includes('twitter.com');
        }
      },
      {
        name: 'LinkedIn Share Button',
        test: async () => {
          const element = await this.page.$('.social-share-btn.linkedin');
          if (!element) return false;
          
          const href = await this.page.evaluate(el => el.href, element);
          return href.includes('linkedin.com');
        }
      },
      {
        name: 'Facebook Share Button',
        test: async () => {
          const element = await this.page.$('.social-share-btn.facebook');
          if (!element) return false;
          
          const href = await this.page.evaluate(el => el.href, element);
          return href.includes('facebook.com');
        }
      },
      {
        name: 'WhatsApp Share Button',
        test: async () => {
          const element = await this.page.$('.social-share-btn.whatsapp');
          if (!element) return false;
          
          const href = await this.page.evaluate(el => el.href, element);
          return href.includes('wa.me');
        }
      },
      {
        name: 'Copy Link Button',
        test: async () => {
          const element = await this.page.$('.social-share-btn.copy-link');
          if (!element) return false;
          
          const onclick = await this.page.evaluate(el => el.onclick, element);
          return onclick !== null;
        }
      }
    ];

    for (const test of tests) {
      try {
        const result = await test.test();
        this.results.social.tests.push({
          name: test.name,
          passed: result,
          error: null
        });
        
        if (result) {
          this.results.social.passed++;
          console.log(`  ✅ ${test.name}`);
        } else {
          this.results.social.failed++;
          console.log(`  ❌ ${test.name}`);
        }
      } catch (error) {
        this.results.social.tests.push({
          name: test.name,
          passed: false,
          error: error.message
        });
        this.results.social.failed++;
        console.log(`  ❌ ${test.name} - Error: ${error.message}`);
      }
    }
    
    this.results.social.total = tests.length;
  }

  async testDarkMode() {
    console.log('🌙 Testing Dark Mode...');
    
    const tests = [
      {
        name: 'Dark Mode Toggle Exists',
        test: async () => {
          const element = await this.page.$('.dark-mode-toggle');
          return element !== null;
        }
      },
      {
        name: 'Toggle Button Has Icons',
        test: async () => {
          const toggle = await this.page.$('.dark-mode-toggle');
          if (!toggle) return false;
          
          const sunIcon = await this.page.$('.sun-icon');
          const moonIcon = await this.page.$('.moon-icon');
          return sunIcon && moonIcon;
        }
      },
      {
        name: 'Toggle Button Clickable',
        test: async () => {
          const toggle = await this.page.$('.dark-mode-toggle');
          if (!toggle) return false;
          
          const onclick = await this.page.evaluate(el => el.onclick, toggle);
          return onclick !== null;
        }
      },
      {
        name: 'Dark Mode Classes Work',
        test: async () => {
          const initialDark = await this.page.$eval('html', el => el.classList.contains('dark'));
          
          // Click toggle
          await this.page.click('.dark-mode-toggle');
          await this.page.waitForTimeout(100);
          
          const afterToggle = await this.page.$eval('html', el => el.classList.contains('dark'));
          
          // Reset
          await this.page.click('.dark-mode-toggle');
          
          return initialDark !== afterToggle;
        }
      }
    ];

    for (const test of tests) {
      try {
        const result = await test.test();
        this.results.darkmode.tests.push({
          name: test.name,
          passed: result,
          error: null
        });
        
        if (result) {
          this.results.darkmode.passed++;
          console.log(`  ✅ ${test.name}`);
        } else {
          this.results.darkmode.failed++;
          console.log(`  ❌ ${test.name}`);
        }
      } catch (error) {
        this.results.darkmode.tests.push({
          name: test.name,
          passed: false,
          error: error.message
        });
        this.results.darkmode.failed++;
        console.log(`  ❌ ${test.name} - Error: ${error.message}`);
      }
    }
    
    this.results.darkmode.total = tests.length;
  }

  async runAllTests() {
    try {
      await this.init();
      
      // Navigate to testing page
      console.log('🌐 Navigating to testing page...');
      await this.page.goto('http://localhost:4321/blog/testing', { 
        waitUntil: 'networkidle0' 
      });
      
      // Wait for page to load
      await this.page.waitForTimeout(2000);
      
      // Run all tests
      await this.testTOC();
      await this.testProgress();
      await this.testSocial();
      await this.testDarkMode();
      
      // Generate report
      this.generateReport();
      
    } catch (error) {
      console.error('❌ Test execution failed:', error);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }

  generateReport() {
    const totalTests = Object.values(this.results).reduce((sum, test) => sum + test.total, 0);
    const totalPassed = Object.values(this.results).reduce((sum, test) => sum + test.passed, 0);
    const totalFailed = Object.values(this.results).reduce((sum, test) => sum + test.failed, 0);
    const successRate = totalTests > 0 ? Math.round((totalPassed / totalTests) * 100) : 0;

    console.log('\n📊 Test Results Summary:');
    console.log('========================');
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${totalPassed}`);
    console.log(`Failed: ${totalFailed}`);
    console.log(`Success Rate: ${successRate}%`);
    
    console.log('\n📋 Detailed Results:');
    console.log('====================');
    
    Object.entries(this.results).forEach(([feature, result]) => {
      console.log(`\n${feature.toUpperCase()}:`);
      result.tests.forEach(test => {
        const status = test.passed ? '✅' : '❌';
        console.log(`  ${status} ${test.name}`);
        if (test.error) {
          console.log(`    Error: ${test.error}`);
        }
      });
    });

    // Save report to file
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests,
        totalPassed,
        totalFailed,
        successRate
      },
      results: this.results
    };

    const reportPath = path.join(process.cwd(), 'test-results.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Report saved to: ${reportPath}`);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new BlogFeaturesTester();
  tester.runAllTests().catch(console.error);
}

module.exports = BlogFeaturesTester;
