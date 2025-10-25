#!/usr/bin/env node

/**
 * Performance comparison script between npm and pnpm for Playwright testing
 */

import { execSync } from 'child_process';
import { performance } from 'perf_hooks';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  log(`\n${colors.bold}${description}${colors.reset}`);
  const start = performance.now();
  
  try {
    execSync(command, { stdio: 'pipe' });
    const end = performance.now();
    const duration = ((end - start) / 1000).toFixed(2);
    log(`✅ Completed in ${duration}s`, 'green');
    return duration;
  } catch (error) {
    log(`❌ Failed: ${error.message}`, 'red');
    return null;
  }
}

function getDiskUsage(path) {
  try {
    const result = execSync(`du -sh ${path} 2>/dev/null || echo "0B"`, { encoding: 'utf8' });
    return result.trim().split('\t')[0];
  } catch {
    return '0B';
  }
}

async function comparePackageManagers() {
  log('🚀 Playwright Testing Performance Comparison', 'blue');
  log('=' .repeat(50), 'blue');

  const results = {
    npm: {},
    pnpm: {}
  };

  // Test npm
  log('\n📦 Testing npm performance...', 'yellow');
  
  // Clean up first
  runCommand('rm -rf node_modules package-lock.json', 'Cleaning up npm artifacts');
  
  // Install dependencies
  results.npm.install = runCommand('npm install', 'npm: Installing dependencies');
  
  // Install Playwright
  results.npm.playwright = runCommand('npm exec playwright install', 'npm: Installing Playwright browsers');
  
  // Run tests
  results.npm.tests = runCommand('npm exec playwright test --reporter=list', 'npm: Running tests');
  
  // Get disk usage
  results.npm.diskUsage = getDiskUsage('node_modules');

  // Test pnpm
  log('\n📦 Testing pnpm performance...', 'yellow');
  
  // Clean up first
  runCommand('rm -rf node_modules pnpm-lock.yaml', 'Cleaning up pnpm artifacts');
  
  // Install dependencies
  results.pnpm.install = runCommand('pnpm install', 'pnpm: Installing dependencies');
  
  // Install Playwright
  results.pnpm.playwright = runCommand('pnpm exec playwright install', 'pnpm: Installing Playwright browsers');
  
  // Run tests
  results.pnpm.tests = runCommand('pnpm exec playwright test --reporter=list', 'pnpm: Running tests');
  
  // Get disk usage
  results.pnpm.diskUsage = getDiskUsage('node_modules');

  // Display results
  log('\n📊 Performance Comparison Results', 'blue');
  log('=' .repeat(50), 'blue');

  const tasks = [
    { name: 'Install Dependencies', npm: results.npm.install, pnpm: results.pnpm.install },
    { name: 'Install Playwright', npm: results.npm.playwright, pnpm: results.pnpm.playwright },
    { name: 'Run Tests', npm: results.npm.tests, pnpm: results.pnpm.tests }
  ];

  tasks.forEach(task => {
    if (task.npm && task.pnpm) {
      const improvement = ((task.npm - task.pnpm) / task.npm * 100).toFixed(1);
      const faster = task.pnpm < task.npm ? 'pnpm' : 'npm';
      
      log(`\n${task.name}:`, 'bold');
      log(`  npm:  ${task.npm}s`, 'red');
      log(`  pnpm: ${task.pnpm}s`, 'green');
      log(`  ${faster} is ${Math.abs(improvement)}% faster`, improvement > 0 ? 'green' : 'red');
    }
  });

  log(`\n💾 Disk Usage:`, 'bold');
  log(`  npm:  ${results.npm.diskUsage}`, 'red');
  log(`  pnpm: ${results.pnpm.diskUsage}`, 'green');

  // Recommendations
  log('\n💡 Recommendations:', 'blue');
  
  const avgNpmTime = (parseFloat(results.npm.install) + parseFloat(results.npm.playwright) + parseFloat(results.npm.tests)) / 3;
  const avgPnpmTime = (parseFloat(results.pnpm.install) + parseFloat(results.pnpm.playwright) + parseFloat(results.pnpm.tests)) / 3;
  
  if (avgPnpmTime < avgNpmTime) {
    log('✅ Use pnpm for better performance', 'green');
    log('   - Faster installation', 'green');
    log('   - Less disk usage', 'green');
    log('   - Better caching', 'green');
  } else {
    log('✅ npm performance is acceptable', 'yellow');
    log('   - Stick with npm if already using it', 'yellow');
    log('   - Consider pnpm for CI/CD environments', 'yellow');
  }

  log('\n🎯 For Playwright Testing:', 'blue');
  log('   - pnpm: Better for CI/CD and large projects', 'green');
  log('   - npm: Simpler setup, good for small projects', 'yellow');
}

// Run comparison
comparePackageManagers().catch(console.error);
