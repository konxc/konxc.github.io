#!/usr/bin/env node

/**
 * Image Optimization Script for KonXC Website
 * 
 * This script optimizes images for production by:
 * 1. Converting images to WebP format
 * 2. Creating multiple sizes for responsive images
 * 3. Compressing images for optimal file size
 * 4. Generating fallback PNG versions
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, '../public'),
  outputDir: path.join(__dirname, '../public/optimized'),
  logoInput: 'logo-konxc.jpg',
  sizes: {
    xs: { width: 16, height: 16, quality: 90 },
    sm: { width: 24, height: 24, quality: 90 },
    md: { width: 32, height: 32, quality: 90 },
    lg: { width: 48, height: 48, quality: 90 },
    xl: { width: 64, height: 64, quality: 90 }
  }
};

// Check if Sharp is available
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (error) {
  console.error('❌ Sharp not found. Please install it first:');
  console.error('npm install sharp');
  process.exit(1);
}

// Utility functions
function createOutputDir() {
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    console.log(`✅ Created output directory: ${CONFIG.outputDir}`);
  }
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return (stats.size / 1024).toFixed(2); // KB
  } catch (error) {
    return '0';
  }
}

async function optimizeImage(inputPath, outputPath, options) {
  try {
    const startTime = Date.now();
    
    await sharp(inputPath)
      .resize(options.width, options.height, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .webp({ 
        quality: options.quality,
        effort: 6 // Maximum compression effort
      })
      .toFile(outputPath);
    
    const endTime = Date.now();
    const originalSize = getFileSize(inputPath);
    const optimizedSize = getFileSize(outputPath);
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ Optimized: ${path.basename(outputPath)}`);
    console.log(`   Size: ${originalSize}KB → ${optimizedSize}KB (${reduction}% reduction)`);
    console.log(`   Time: ${endTime - startTime}ms`);
    
    return {
      success: true,
      originalSize: parseFloat(originalSize),
      optimizedSize: parseFloat(optimizedSize),
      reduction: parseFloat(reduction)
    };
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function createPNGFallback(webpPath, pngPath) {
  try {
    await sharp(webpPath)
      .png({ 
        quality: 90,
        compressionLevel: 9
      })
      .toFile(pngPath);
    
    console.log(`✅ Created PNG fallback: ${path.basename(pngPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating PNG fallback:`, error.message);
    return false;
  }
}

async function optimizeLogo() {
  console.log('🚀 Starting logo optimization...\n');
  
  const inputPath = path.join(CONFIG.inputDir, CONFIG.logoInput);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Logo file not found: ${inputPath}`);
    console.error('Please ensure logo-konxc.jpg exists in the public directory');
    return;
  }
  
  createOutputDir();
  
  const results = [];
  
  // Optimize for each size
  for (const [sizeName, options] of Object.entries(CONFIG.sizes)) {
    console.log(`📐 Processing ${sizeName} size (${options.width}x${options.height})...`);
    
    const webpPath = path.join(CONFIG.outputDir, `logo-konxc-${sizeName}.webp`);
    const pngPath = path.join(CONFIG.outputDir, `logo-konxc-${sizeName}.png`);
    
    // Create WebP version
    const webpResult = await optimizeImage(inputPath, webpPath, options);
    if (webpResult.success) {
      results.push(webpResult);
      
      // Create PNG fallback
      await createPNGFallback(webpPath, pngPath);
    }
    
    console.log(''); // Empty line for readability
  }
  
  // Create main optimized versions
  console.log('📐 Creating main optimized versions...');
  
  const mainWebpPath = path.join(CONFIG.outputDir, 'logo-konxc.webp');
  const mainPngPath = path.join(CONFIG.outputDir, 'logo-konxc.png');
  
  await optimizeImage(inputPath, mainWebpPath, { width: 64, height: 64, quality: 90 });
  await createPNGFallback(mainWebpPath, mainPngPath);
  
  // Summary
  console.log('\n📊 Optimization Summary:');
  console.log('========================');
  
  const totalOriginalSize = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalOptimizedSize = results.reduce((sum, r) => sum + r.optimizedSize, 0);
  const totalReduction = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
  
  console.log(`Total original size: ${totalOriginalSize.toFixed(2)}KB`);
  console.log(`Total optimized size: ${totalOptimizedSize.toFixed(2)}KB`);
  console.log(`Total reduction: ${totalReduction}%`);
  console.log(`Files created: ${results.length * 2} (WebP + PNG for each size)`);
  
  console.log('\n🎉 Logo optimization complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Copy optimized files from public/optimized/ to public/');
  console.log('2. Update Logo component to use optimized images');
  console.log('3. Test performance with PageSpeed Insights');
}

async function createImageOptimizationScript() {
  const scriptContent = `#!/bin/bash

# Image Optimization Script
# Run this script to optimize images for production

echo "🚀 Starting image optimization..."

# Check if Sharp is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

# Install Sharp if not already installed
if ! npm list sharp &> /dev/null; then
    echo "📦 Installing Sharp..."
    npm install sharp
fi

# Run optimization
echo "🖼️ Optimizing images..."
node scripts/optimize-images.js

# Copy optimized files to public directory
echo "📁 Copying optimized files..."
cp -r public/optimized/* public/

echo "✅ Image optimization complete!"
echo "🎯 Test your site performance at: https://pagespeed.web.dev/"
`;

  const scriptPath = path.join(__dirname, '../scripts/optimize-images.sh');
  fs.writeFileSync(scriptPath, scriptContent);
  fs.chmodSync(scriptPath, '755');
  
  console.log(`✅ Created optimization script: ${scriptPath}`);
}

// Main execution
async function main() {
  console.log('🎯 KonXC Image Optimization Tool');
  console.log('================================\n');
  
  try {
    await optimizeLogo();
    await createImageOptimizationScript();
  } catch (error) {
    console.error('❌ Optimization failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
