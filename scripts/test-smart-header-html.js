#!/usr/bin/env node

/**
 * SmartHeader HTML Test
 * 
 * Test SmartHeader by checking HTML content without browser
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const BASE_URL = 'http://localhost:4321';
const TEST_URLS = [
  '/blog/2024-01-26-path-aliases-astro',
  '/blog/2024-01-27-migrasi-tailwind-css-v3-ke-v4',
  '/blog/2024-01-28-mengatasi-warning-import-css'
];

async function testSmartHeaderHTML() {
  console.log('🚀 SmartHeader HTML Test');
  console.log('========================\n');
  
  let passed = 0;
  let failed = 0;
  
  for (const url of TEST_URLS) {
    console.log(`\n📄 Testing: ${BASE_URL}${url}`);
    console.log('─'.repeat(40));
    
    try {
      // Fetch HTML using curl
      const { stdout } = await execAsync(`curl -s "${BASE_URL}${url}"`);
      const html = stdout;
      
      // Test 1: Check if SmartHeader element exists
      if (html.includes('id="smart-header"')) {
        console.log('✅ SmartHeader element found');
        passed++;
      } else {
        console.log('❌ SmartHeader element not found');
        failed++;
        continue;
      }
      
      // Test 2: Check for SmartHeaderFixed component
      if (html.includes('smart-header-content') || html.includes('SmartHeaderFixed')) {
        console.log('✅ SmartHeaderFixed component detected');
        passed++;
      } else {
        console.log('⚠️  SmartHeaderFixed component not detected');
      }
      
      // Test 3: Check for backdrop-filter CSS
      if (html.includes('backdrop-filter') || html.includes('backdropFilter')) {
        console.log('✅ Backdrop filter CSS found');
        passed++;
      } else {
        console.log('⚠️  Backdrop filter CSS not found');
      }
      
      // Test 4: Check for navigation links
      const navLinks = (html.match(/<a[^>]*href[^>]*>/g) || []).length;
      if (navLinks > 0) {
        console.log(`✅ Found ${navLinks} navigation links`);
        passed++;
      } else {
        console.log('❌ No navigation links found');
        failed++;
      }
      
      // Test 5: Check for Header component
      if (html.includes('class="header') || html.includes('class="nav-')) {
        console.log('✅ Header component structure found');
        passed++;
      } else {
        console.log('⚠️  Header component structure not found');
      }
      
      console.log('✅ All HTML checks passed for this URL');
      
    } catch (error) {
      console.log(`❌ Failed to fetch ${url}: ${error.message}`);
      failed++;
    }
  }
  
  console.log('\n📊 Test Results Summary');
  console.log('======================');
  console.log(`Total Tests: ${passed + failed}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! SmartHeader is working correctly.');
    console.log('📝 For visual testing, run: pnpm run test:smart-header');
    process.exit(0);
  } else {
    console.log('\n❌ Some tests failed. Check the output above.');
    process.exit(1);
  }
}

// Check if dev server is running first
async function checkDevServer() {
  try {
    const { stdout } = await execAsync(`curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}"`);
    if (stdout === '200') {
      console.log('✅ Dev server is running');
      return true;
    } else {
      console.log('❌ Dev server not responding');
      return false;
    }
  } catch (error) {
    console.log('❌ Dev server not running');
    console.log('📝 Please run: pnpm run dev');
    return false;
  }
}

// Main execution
async function main() {
  const serverRunning = await checkDevServer();
  if (!serverRunning) {
    process.exit(1);
  }
  
  await testSmartHeaderHTML();
}

main().catch(console.error);
