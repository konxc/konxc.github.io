#!/usr/bin/env node

/**
 * Quick SmartHeader Test
 * 
 * Simple test to verify SmartHeader is working
 */

const BASE_URL = 'http://localhost:4321';
const TEST_URL = '/blog/2024-01-26-path-aliases-astro';

async function quickTest() {
  console.log('🚀 Quick SmartHeader Test');
  console.log('=========================\n');
  
  try {
    // Check if dev server is running
    const response = await fetch(`${BASE_URL}${TEST_URL}`);
    
    if (!response.ok) {
      console.log('❌ Dev server not running or page not found');
      console.log('📝 Please run: pnpm run dev');
      process.exit(1);
    }
    
    console.log('✅ Dev server is running');
    
    // Get page HTML
    const html = await response.text();
    
    // Check for SmartHeader element
    if (html.includes('id="smart-header"')) {
      console.log('✅ SmartHeader element found in HTML');
    } else {
      console.log('❌ SmartHeader element not found in HTML');
      process.exit(1);
    }
    
    // Check for SmartHeaderFixed import
    if (html.includes('SmartHeaderFixed') || html.includes('smart-header-content')) {
      console.log('✅ SmartHeaderFixed component detected');
    } else {
      console.log('⚠️  SmartHeaderFixed component not detected');
    }
    
    // Check for backdrop-filter CSS
    if (html.includes('backdrop-filter') || html.includes('backdropFilter')) {
      console.log('✅ Backdrop filter CSS found');
    } else {
      console.log('⚠️  Backdrop filter CSS not found');
    }
    
    console.log('\n🎉 Basic checks passed!');
    console.log('📝 For full testing, run: pnpm run test:smart-header');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
quickTest();
