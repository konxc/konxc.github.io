import puppeteer from 'puppeteer';
import path from 'path';

class TableOfContentsTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.baseUrl = 'http://localhost:4321';
    this.testResults = [];
  }

  async init() {
    console.log('🚀 Initializing Table of Contents Tester...');
    
    this.browser = await puppeteer.launch({
      headless: false, // Set to true for CI/CD
      devtools: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    
    // Set viewport untuk testing
    await this.page.setViewport({ width: 1200, height: 800 });
    
    // Enable console logging
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('❌ Browser Error:', msg.text());
      }
    });
    
    console.log('✅ Browser initialized successfully');
  }

  async testTOCComponent() {
    console.log('\n📋 Testing Table of Contents Component...');
    
    try {
      // Navigate to a blog post with TOC
      const blogUrl = `${this.baseUrl}/blog/2024-01-29-mengatasi-empty-chunk-warning-astro`;
      console.log(`🔗 Navigating to: ${blogUrl}`);
      
      await this.page.goto(blogUrl, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      
      // Wait for TOC to load
      await this.page.waitForSelector('#toc-nav', { timeout: 10000 });
      
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
          name: 'TOC Visual Hierarchy',
          test: async () => {
            const h2Links = await this.page.$$('.toc-h2');
            const h3Links = await this.page.$$('.toc-h3');
            
            if (h2Links.length === 0 || h3Links.length === 0) return true;
            
            // Check if H3 has proper indentation
            const h3Style = await this.page.evaluate(el => {
              const computed = window.getComputedStyle(el);
              return {
                marginLeft: computed.marginLeft,
                paddingLeft: computed.paddingLeft
              };
            }, h3Links[0]);
            
            return h3Style.marginLeft !== '0px' || h3Style.paddingLeft !== '0px';
          }
        },
        {
          name: 'TOC Toggle Functionality',
          test: async () => {
            const toggleBtn = await this.page.$('#toc-toggle-btn');
            const tocNav = await this.page.$('#toc-nav');
            
            // Click toggle button
            await toggleBtn.click();
            await this.page.waitForTimeout(300); // Wait for animation
            
            // Check if collapsed
            const classesAfterClick = await this.page.evaluate(el => el?.className, tocNav);
            const isCollapsed = !classesAfterClick?.includes('expanded');
            
            // Click again to expand
            await toggleBtn.click();
            await this.page.waitForTimeout(300);
            
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
            await this.page.waitForTimeout(500);
            
            // Check if page scrolled
            const scrollY = await this.page.evaluate(() => window.scrollY);
            return scrollY > 0;
          }
        },
        {
          name: 'TOC Active State',
          test: async () => {
            const links = await this.page.$$('.toc-link');
            if (links.length === 0) return false;
            
            // Click first link
            await links[0].click();
            await this.page.waitForTimeout(300);
            
            // Check if first link has active class
            const firstLinkClasses = await this.page.evaluate(el => el?.className, links[0]);
            return firstLinkClasses?.includes('active');
          }
        },
        {
          name: 'TOC Responsive Design',
          test: async () => {
            // Test mobile viewport
            await this.page.setViewport({ width: 375, height: 667 });
            await this.page.waitForTimeout(500);
            
            const tocContainer = await this.page.$('.table-of-contents');
            const isVisible = await this.page.evaluate(el => {
              const style = window.getComputedStyle(el);
              return style.display !== 'none' && style.visibility !== 'hidden';
            }, tocContainer);
            
            // Reset viewport
            await this.page.setViewport({ width: 1200, height: 800 });
            
            return isVisible;
          }
        },
        {
          name: 'TOC Accessibility (ARIA)',
          test: async () => {
            const toggleBtn = await this.page.$('#toc-toggle-btn');
            const ariaLabel = await this.page.evaluate(el => el?.getAttribute('aria-label'), toggleBtn);
            return ariaLabel === 'Toggle table of contents';
          }
        },
        {
          name: 'TOC Performance (Load Time)',
          test: async () => {
            const startTime = Date.now();
            
            // Navigate to page
            await this.page.goto(`${this.baseUrl}/blog/2024-01-29-mengatasi-empty-chunk-warning-astro`, {
              waitUntil: 'networkidle0'
            });
            
            // Wait for TOC to be ready
            await this.page.waitForSelector('.toc-link', { timeout: 5000 });
            
            const loadTime = Date.now() - startTime;
            console.log(`⏱️  TOC Load Time: ${loadTime}ms`);
            
            return loadTime < 3000; // Should load within 3 seconds
          }
        }
      ];

      // Run all tests
      for (const test of tests) {
        try {
          const result = await test.test();
          this.testResults.push({
            name: test.name,
            passed: result,
            timestamp: new Date().toISOString()
          });
          
          console.log(`${result ? '✅' : '❌'} ${test.name}`);
        } catch (error) {
          console.log(`❌ ${test.name} - Error: ${error.message}`);
          this.testResults.push({
            name: test.name,
            passed: false,
            error: error.message,
            timestamp: new Date().toISOString()
          });
        }
      }

    } catch (error) {
      console.error('❌ TOC Testing Error:', error);
    }
  }

  async testTOCVisualAppearance() {
    console.log('\n🎨 Testing TOC Visual Appearance...');
    
    try {
      // Take screenshot of TOC
      const tocElement = await this.page.$('.table-of-contents');
      if (tocElement) {
        await tocElement.screenshot({ 
          path: 'toc-visual-test.png',
          type: 'png'
        });
        console.log('📸 TOC screenshot saved as toc-visual-test.png');
      }
      
      // Test different states
      const states = [
        { name: 'Expanded', action: async () => {
          const tocNav = await this.page.$('#toc-nav');
          const classes = await this.page.evaluate(el => el?.className, tocNav);
          return classes?.includes('expanded');
        }},
        { name: 'Collapsed', action: async () => {
          const toggleBtn = await this.page.$('#toc-toggle-btn');
          await toggleBtn.click();
          await this.page.waitForTimeout(300);
          const tocNav = await this.page.$('#toc-nav');
          const classes = await this.page.evaluate(el => el?.className, tocNav);
          return !classes?.includes('expanded');
        }}
      ];
      
      for (const state of states) {
        const result = await state.action();
        console.log(`${result ? '✅' : '❌'} TOC ${state.name} State`);
      }
      
    } catch (error) {
      console.error('❌ Visual Testing Error:', error);
    }
  }

  async testTOCInteractions() {
    console.log('\n🖱️  Testing TOC Interactions...');
    
    try {
      const interactions = [
        {
          name: 'Hover Effect',
          test: async () => {
            const link = await this.page.$('.toc-link');
            if (!link) return false;
            
            await link.hover();
            await this.page.waitForTimeout(200);
            
            const hoverStyle = await this.page.evaluate(el => {
              const computed = window.getComputedStyle(el);
              return {
                backgroundColor: computed.backgroundColor,
                color: computed.color
              };
            }, link);
            
            return hoverStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' || 
                   hoverStyle.color !== 'rgb(107, 114, 128)';
          }
        },
        {
          name: 'Click Navigation',
          test: async () => {
            const links = await this.page.$$('.toc-link');
            if (links.length === 0) return false;
            
            const initialScrollY = await this.page.evaluate(() => window.scrollY);
            
            await links[0].click();
            await this.page.waitForTimeout(500);
            
            const finalScrollY = await this.page.evaluate(() => window.scrollY);
            
            return finalScrollY !== initialScrollY;
          }
        },
        {
          name: 'Active State Update',
          test: async () => {
            const links = await this.page.$$('.toc-link');
            if (links.length < 2) return false;
            
            // Click first link
            await links[0].click();
            await this.page.waitForTimeout(300);
            
            const firstLinkActive = await this.page.evaluate(el => 
              el?.className.includes('active'), links[0]);
            
            // Click second link
            await links[1].click();
            await this.page.waitForTimeout(300);
            
            const secondLinkActive = await this.page.evaluate(el => 
              el?.className.includes('active'), links[1]);
            
            const firstLinkInactive = await this.page.evaluate(el => 
              !el?.className.includes('active'), links[0]);
            
            return firstLinkActive && secondLinkActive && firstLinkInactive;
          }
        }
      ];
      
      for (const interaction of interactions) {
        try {
          const result = await interaction.test();
          console.log(`${result ? '✅' : '❌'} ${interaction.name}`);
        } catch (error) {
          console.log(`❌ ${interaction.name} - Error: ${error.message}`);
        }
      }
      
    } catch (error) {
      console.error('❌ Interaction Testing Error:', error);
    }
  }

  async generateReport() {
    console.log('\n📊 Generating TOC Test Report...');
    
    const passedTests = this.testResults.filter(test => test.passed).length;
    const totalTests = this.testResults.length;
    const passRate = ((passedTests / totalTests) * 100).toFixed(2);
    
    console.log('\n' + '='.repeat(50));
    console.log('📋 TABLE OF CONTENTS TEST REPORT');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${passedTests}/${totalTests} (${passRate}%)`);
    console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
    console.log('='.repeat(50));
    
    // Detailed results
    console.log('\n📝 Detailed Results:');
    this.testResults.forEach((test, index) => {
      const status = test.passed ? '✅ PASS' : '❌ FAIL';
      console.log(`${index + 1}. ${status} - ${test.name}`);
      if (test.error) {
        console.log(`   Error: ${test.error}`);
      }
    });
    
    // Recommendations
    console.log('\n💡 Recommendations:');
    const failedTests = this.testResults.filter(test => !test.passed);
    
    if (failedTests.length === 0) {
      console.log('🎉 All tests passed! TOC component is working perfectly.');
    } else {
      console.log('🔧 Areas for improvement:');
      failedTests.forEach(test => {
        console.log(`   - ${test.name}`);
      });
    }
    
    console.log('\n' + '='.repeat(50));
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🧹 Browser closed');
    }
  }

  async runAllTests() {
    try {
      await this.init();
      await this.testTOCComponent();
      await this.testTOCVisualAppearance();
      await this.testTOCInteractions();
      await this.generateReport();
    } catch (error) {
      console.error('❌ Test Suite Error:', error);
    } finally {
      await this.cleanup();
    }
  }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new TableOfContentsTester();
  tester.runAllTests().catch(console.error);
}

export default TableOfContentsTester;
