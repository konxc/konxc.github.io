#!/bin/bash

# SmartHeader Playwright Test Runner
# This script sets up and runs Playwright tests for SmartHeader functionality

echo "🚀 SmartHeader Playwright Test Setup"
echo "===================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm not found. Please install pnpm first."
    exit 1
fi

# Install Playwright if not already installed
echo "📦 Checking Playwright installation..."
if ! pnpm list playwright &> /dev/null; then
    echo "📦 Installing Playwright..."
    pnpm install playwright
    echo "📦 Installing Playwright browsers..."
    pnpx playwright install chromium
else
    echo "✅ Playwright already installed"
fi

# Check if dev server is running
echo "🔍 Checking if dev server is running..."
if ! curl -s http://localhost:4321 > /dev/null; then
    echo "⚠️  Dev server not running. Starting dev server..."
    echo "📝 Please run 'pnpm run dev' in another terminal first."
    echo "📝 Then run this script again."
    exit 1
else
    echo "✅ Dev server is running"
fi

# Create test results directory
echo "📁 Creating test results directory..."
mkdir -p test-results/smart-header

# Run the tests
echo "🧪 Running SmartHeader tests..."
echo "================================"

node scripts/test-smart-header-playwright.js

# Check test results
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ All tests passed! SmartHeader is working correctly."
    echo "📸 Screenshots saved in: test-results/smart-header/"
    echo "📄 Test report saved in: test-results/smart-header/test-report.json"
else
    echo ""
    echo "❌ Some tests failed. Check the report for details."
    echo "📸 Screenshots saved in: test-results/smart-header/"
    echo "📄 Test report saved in: test-results/smart-header/test-report.json"
    exit 1
fi
