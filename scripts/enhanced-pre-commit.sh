#!/bin/bash

# Enhanced Pre-Commit Hook
# This script runs comprehensive checks before each commit

echo "🔍 Running pre-commit checks..."

# 1. TypeScript type checking
echo "📝 Checking TypeScript types..."
if ! pnpm run astro check; then
    echo "❌ TypeScript type checking failed"
    exit 1
fi

# 2. ESLint code quality check
echo "🔧 Running ESLint..."
if ! pnpm run lint; then
    echo "❌ ESLint found issues. Run 'pnpm run lint:fix' to fix them"
    exit 1
fi

# 3. Prettier formatting check
echo "🎨 Checking code formatting..."
if ! pnpm run format:check; then
    echo "❌ Code formatting issues found. Run 'pnpm run format' to fix them"
    exit 1
fi

# 4. Build check
echo "🏗️  Testing build process..."
if ! pnpm run build; then
    echo "❌ Build failed"
    exit 1
fi

# 5. Check for console.log statements
echo "🚫 Checking for console.log statements..."
if grep -r "console\.log" src/ --include="*.ts" --include="*.tsx" --include="*.astro"; then
    echo "❌ Found console.log statements. Please remove them before committing."
    exit 1
fi

# 6. Check for TODO/FIXME comments
echo "📋 Checking for TODO/FIXME comments..."
if grep -r "TODO\|FIXME" src/ --include="*.ts" --include="*.tsx" --include="*.astro"; then
    echo "⚠️  Found TODO/FIXME comments. Consider addressing them."
    echo "   Continuing with commit..."
fi

echo "✅ All pre-commit checks passed!"
echo "🚀 Ready to commit!"
