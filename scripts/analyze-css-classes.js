#!/usr/bin/env node

/**
 * CSS Classes Analysis Script
 * Analyzes build output to check if CSS classes are generated correctly
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

class CSSClassesAnalyzer {
  constructor() {
    this.buildOutput = null;
    this.cssFiles = [];
    this.missingClasses = [];
  }

  async runBuild() {
    console.log('🔨 Running build to analyze CSS classes...');
    
    return new Promise((resolve, reject) => {
      const buildProcess = spawn('npm', ['run', 'build'], {
        stdio: 'pipe',
        cwd: process.cwd()
      });

      let output = '';
      let errorOutput = '';

      buildProcess.stdout.on('data', (data) => {
        output += data.toString();
        console.log(data.toString());
      });

      buildProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
        console.error(data.toString());
      });

      buildProcess.on('close', (code) => {
        if (code === 0) {
          console.log('✅ Build completed successfully');
          resolve(output);
        } else {
          console.error('❌ Build failed');
          reject(new Error(`Build failed with code ${code}: ${errorOutput}`));
        }
      });
    });
  }

  async analyzeCSSFiles() {
    console.log('\n📁 Analyzing CSS files in dist directory...');
    
    const distDir = path.join(process.cwd(), 'dist');
    
    if (!fs.existsSync(distDir)) {
      throw new Error('Dist directory not found. Please run build first.');
    }

    // Find all CSS files
    const findCSSFiles = (dir) => {
      const files = [];
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          files.push(...findCSSFiles(fullPath));
        } else if (item.endsWith('.css')) {
          files.push(fullPath);
        }
      }
      
      return files;
    };

    this.cssFiles = findCSSFiles(distDir);
    console.log(`Found ${this.cssFiles.length} CSS files:`);
    this.cssFiles.forEach(file => console.log(`  - ${path.relative(distDir, file)}`));
  }

  async checkTOCClasses() {
    console.log('\n🔍 Checking TOC-related CSS classes...');
    
    const tocClasses = [
      'toc-nav',
      'toc-link',
      'toc-h2',
      'toc-h3',
      'toc-h4',
      'toc-h5',
      'toc-h6',
      'text-neutral-600',
      'bg-neutral-100',
      'text-primary-700',
      'bg-primary-50',
      'text-secondary-700',
      'bg-secondary-50',
      'ml-0',
      'ml-6',
      'ml-12',
      'ml-16',
      'ml-20',
      'max-h-0',
      'max-h-96',
      'overflow-hidden',
      'overflow-y-auto'
    ];

    const foundClasses = new Set();
    const missingClasses = [];

    // Read all CSS files and check for classes
    for (const cssFile of this.cssFiles) {
      try {
        const content = fs.readFileSync(cssFile, 'utf8');
        
        for (const className of tocClasses) {
          if (content.includes(className)) {
            foundClasses.add(className);
          }
        }
      } catch (error) {
        console.error(`Error reading ${cssFile}:`, error.message);
      }
    }

    // Check which classes are missing
    for (const className of tocClasses) {
      if (!foundClasses.has(className)) {
        missingClasses.push(className);
      }
    }

    console.log(`\n📊 Analysis Results:`);
    console.log(`✅ Found classes: ${foundClasses.size}/${tocClasses.length}`);
    console.log(`❌ Missing classes: ${missingClasses.length}`);

    if (foundClasses.size > 0) {
      console.log(`\n✅ Found classes:`);
      Array.from(foundClasses).sort().forEach(cls => console.log(`  - ${cls}`));
    }

    if (missingClasses.length > 0) {
      console.log(`\n❌ Missing classes:`);
      missingClasses.forEach(cls => console.log(`  - ${cls}`));
    }

    this.missingClasses = missingClasses;
    return { found: Array.from(foundClasses), missing: missingClasses };
  }

  async generateReport() {
    console.log('\n📋 Generating analysis report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      cssFiles: this.cssFiles.map(file => path.relative(process.cwd(), file)),
      missingClasses: this.missingClasses,
      recommendations: []
    };

    // Generate recommendations
    if (this.missingClasses.length > 0) {
      report.recommendations.push('Some TOC classes are missing from build output');
      
      if (this.missingClasses.some(cls => cls.startsWith('toc-'))) {
        report.recommendations.push('TOC component classes not generated - check @apply directives');
      }
      
      if (this.missingClasses.some(cls => cls.includes('neutral') || cls.includes('primary'))) {
        report.recommendations.push('Color classes missing - check color definitions in @theme block');
      }
      
      if (this.missingClasses.some(cls => cls.startsWith('ml-'))) {
        report.recommendations.push('Spacing classes missing - check spacing definitions');
      }
    }

    // Save report
    const reportPath = path.join(process.cwd(), 'css-analysis-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n📄 Report saved to: ${reportPath}`);
    
    return report;
  }

  async run() {
    try {
      await this.runBuild();
      await this.analyzeCSSFiles();
      const analysis = await this.checkTOCClasses();
      const report = await this.generateReport();
      
      console.log('\n🎯 Summary:');
      if (this.missingClasses.length === 0) {
        console.log('✅ All TOC classes are properly generated!');
      } else {
        console.log(`❌ ${this.missingClasses.length} classes are missing from build output`);
        console.log('💡 Check the recommendations in the report for next steps');
      }
      
    } catch (error) {
      console.error('❌ Analysis failed:', error.message);
      process.exit(1);
    }
  }
}

// Run the analyzer
const analyzer = new CSSClassesAnalyzer();
analyzer.run().catch(console.error);
