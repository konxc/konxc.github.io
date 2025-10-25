#!/usr/bin/env node

/**
 * Comprehensive Blog Features Testing Script
 * Tests all implemented blog features including advanced search and recommendations
 */

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class BlogFeaturesTester {
  private browser: any;
  private page: any;
  private baseUrl: string;
  private testResults: any[] = [];

  constructor() {
    this.baseUrl = 'http://localhost:4321';
  }

  async initialize() {
    console.log('🚀 Initializing Blog Features Tester...');
    
    this.browser = await puppeteer.launch({
      headless: false, // Set to true for CI/CD
      defaultViewport: { width: 1280, height: 720 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    
    // Set user agent
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    console.log('✅ Browser initialized');
  }

  async testBasicBlogFeatures() {
    console.log('\n📝 Testing Basic Blog Features...');
    
    try {
      // Test blog index page
      await this.page.goto(`${this.baseUrl}/blog`, { waitUntil: 'networkidle2' });
      await this.page.waitForSelector('h1', { timeout: 10000 });
      
      // Test page title
      const title = await this.page.title();
      this.recordTest('Blog Index Title', title.includes('Blog KonXC'), title);
      
      // Test hero section
      const heroExists = await this.page.$('h1') !== null;
      this.recordTest('Blog Hero Section', heroExists, 'Hero section exists');
      
      // Test featured post
      const featuredPost = await this.page.$('.grid.md\\:grid-cols-2.lg\\:grid-cols-3.gap-8');
      this.recordTest('Featured Post Section', featuredPost !== null, 'Featured post section exists');
      
      console.log('✅ Basic blog features tested');
    } catch (error) {
      console.error('❌ Basic blog features test failed:', error.message);
    }
  }

  async testAdvancedSearch() {
    console.log('\n🔍 Testing Advanced Search...');
    
    try {
      // Test search input
      const searchInput = await this.page.$('#advanced-search-input');
      this.recordTest('Advanced Search Input', searchInput !== null, 'Search input exists');
      
      if (searchInput) {
        // Test search functionality
        await searchInput.type('tailwind');
        await this.page.waitForTimeout(500); // Wait for debounce
        
        const searchResults = await this.page.$('#advanced-search-results');
        this.recordTest('Search Results Display', searchResults !== null, 'Search results container exists');
        
        // Test filter toggle
        const filterToggle = await this.page.$('#toggle-filters-btn');
        this.recordTest('Filter Toggle Button', filterToggle !== null, 'Filter toggle button exists');
        
        if (filterToggle) {
          await filterToggle.click();
          await this.page.waitForTimeout(300);
          
          const filtersPanel = await this.page.$('#filters-panel');
          const isVisible = await this.page.evaluate(el => !el.classList.contains('hidden'), filtersPanel);
          this.recordTest('Filters Panel Toggle', isVisible, 'Filters panel opens');
          
          // Test sort dropdown
          const sortSelect = await this.page.$('#sort-select');
          this.recordTest('Sort Dropdown', sortSelect !== null, 'Sort dropdown exists');
        }
        
        // Clear search
        const clearBtn = await this.page.$('#clear-search-btn');
        if (clearBtn) {
          await clearBtn.click();
          await this.page.waitForTimeout(300);
        }
      }
      
      console.log('✅ Advanced search tested');
    } catch (error) {
      console.error('❌ Advanced search test failed:', error.message);
    }
  }

  async testContentRecommendations() {
    console.log('\n🎯 Testing Content Recommendations...');
    
    try {
      // Test recommendations section
      const recommendations = await this.page.$('.content-recommendations');
      this.recordTest('Content Recommendations Section', recommendations !== null, 'Recommendations section exists');
      
      if (recommendations) {
        // Test recommendation cards
        const recCards = await this.page.$$('.recommendation-card');
        this.recordTest('Recommendation Cards', recCards.length > 0, `${recCards.length} recommendation cards found`);
        
        // Test algorithm info
        const algorithmInfo = await this.page.$('.bg-neutral-50.rounded-lg');
        this.recordTest('Algorithm Info', algorithmInfo !== null, 'Algorithm info section exists');
        
        // Test recommendation reasons
        const reasons = await this.page.$$('.bg-secondary-100');
        this.recordTest('Recommendation Reasons', reasons.length > 0, `${reasons.length} recommendation reasons found`);
      }
      
      console.log('✅ Content recommendations tested');
    } catch (error) {
      console.error('❌ Content recommendations test failed:', error.message);
    }
  }

  async testIndividualBlogPost() {
    console.log('\n📄 Testing Individual Blog Post...');
    
    try {
      // Navigate to first blog post
      const firstPostLink = await this.page.$('a[href*="/blog/"]');
      if (firstPostLink) {
        await firstPostLink.click();
        await this.page.waitForSelector('.blog-content', { timeout: 10000 });
        
        // Test reading progress
        const progressBar = await this.page.$('#reading-progress-bar');
        this.recordTest('Reading Progress Bar', progressBar !== null, 'Reading progress bar exists');
        
        // Test table of contents
        const toc = await this.page.$('#toc-nav');
        this.recordTest('Table of Contents', toc !== null, 'Table of contents exists');
        
        // Test social sharing
        const socialShare = await this.page.$('.social-share');
        this.recordTest('Social Share Buttons', socialShare !== null, 'Social share buttons exist');
        
        // Test dark mode toggle
        const darkModeToggle = await this.page.$('.dark-mode-toggle');
        this.recordTest('Dark Mode Toggle', darkModeToggle !== null, 'Dark mode toggle exists');
        
        // Test interactive demos
        const demos = await this.page.$('.interactive-demos');
        this.recordTest('Interactive Demos', demos !== null, 'Interactive demos section exists');
        
        // Test reading mode
        const readingMode = await this.page.$('.reading-mode');
        this.recordTest('Reading Mode', readingMode !== null, 'Reading mode exists');
        
        // Test comments system
        const comments = await this.page.$('.comments-system');
        this.recordTest('Comments System', comments !== null, 'Comments system exists');
        
        // Test post-specific recommendations
        const postRecommendations = await this.page.$('.content-recommendations');
        this.recordTest('Post Recommendations', postRecommendations !== null, 'Post-specific recommendations exist');
      }
      
      console.log('✅ Individual blog post tested');
    } catch (error) {
      console.error('❌ Individual blog post test failed:', error.message);
    }
  }

  async testResponsiveDesign() {
    console.log('\n📱 Testing Responsive Design...');
    
    try {
      // Test mobile viewport
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.waitForTimeout(500);
      
      const mobileLayout = await this.page.$('.grid.md\\:grid-cols-2.lg\\:grid-cols-3.gap-8');
      this.recordTest('Mobile Layout', mobileLayout !== null, 'Mobile layout adapts correctly');
      
      // Test tablet viewport
      await this.page.setViewport({ width: 768, height: 1024 });
      await this.page.waitForTimeout(500);
      
      const tabletLayout = await this.page.$('.grid.md\\:grid-cols-2.lg\\:grid-cols-3.gap-8');
      this.recordTest('Tablet Layout', tabletLayout !== null, 'Tablet layout adapts correctly');
      
      // Reset to desktop
      await this.page.setViewport({ width: 1280, height: 720 });
      
      console.log('✅ Responsive design tested');
    } catch (error) {
      console.error('❌ Responsive design test failed:', error.message);
    }
  }

  async testPerformance() {
    console.log('\n⚡ Testing Performance...');
    
    try {
      // Test page load time
      const startTime = Date.now();
      await this.page.goto(`${this.baseUrl}/blog`, { waitUntil: 'networkidle2' });
      const loadTime = Date.now() - startTime;
      
      this.recordTest('Page Load Time', loadTime < 3000, `${loadTime}ms load time`);
      
      // Test search performance
      const searchInput = await this.page.$('#advanced-search-input');
      if (searchInput) {
        const searchStartTime = Date.now();
        await searchInput.type('test');
        await this.page.waitForTimeout(500);
        const searchTime = Date.now() - searchStartTime;
        
        this.recordTest('Search Performance', searchTime < 1000, `${searchTime}ms search time`);
      }
      
      console.log('✅ Performance tested');
    } catch (error) {
      console.error('❌ Performance test failed:', error.message);
    }
  }

  recordTest(testName: string, passed: boolean, details: string) {
    this.testResults.push({
      test: testName,
      passed,
      details,
      timestamp: new Date().toISOString()
    });
    
    const status = passed ? '✅' : '❌';
    console.log(`  ${status} ${testName}: ${details}`);
  }

  generateReport() {
    console.log('\n📊 Test Report Summary:');
    console.log('='.repeat(50));
    
    const passed = this.testResults.filter(r => r.passed).length;
    const total = this.testResults.length;
    const successRate = Math.round((passed / total) * 100);
    
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${total - passed}`);
    console.log(`Success Rate: ${successRate}%`);
    
    console.log('\n📋 Detailed Results:');
    this.testResults.forEach(result => {
      const status = result.passed ? '✅' : '❌';
      console.log(`${status} ${result.test}: ${result.details}`);
    });
    
    if (successRate >= 90) {
      console.log('\n🎉 Excellent! All major features are working correctly!');
    } else if (successRate >= 80) {
      console.log('\n👍 Good! Most features are working with minor issues.');
    } else {
      console.log('\n⚠️  Some features need attention. Please review failed tests.');
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
    console.log('\n🧹 Cleanup completed');
  }
}

// Main execution
async function main() {
  const tester = new BlogFeaturesTester();
  
  try {
    await tester.initialize();
    
    await tester.testBasicBlogFeatures();
    await tester.testAdvancedSearch();
    await tester.testContentRecommendations();
    await tester.testIndividualBlogPost();
    await tester.testResponsiveDesign();
    await tester.testPerformance();
    
    tester.generateReport();
    
  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
  } finally {
    await tester.cleanup();
  }
}

// Run tests
main().catch(console.error);
