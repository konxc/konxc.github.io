#!/bin/bash

# Enhanced Pre-Push Hook
# This script runs comprehensive checks before pushing to remote

echo "🚀 Running pre-push checks..."

# 1. Run all pre-commit checks
echo "🔍 Running pre-commit checks..."
if ! ./scripts/enhanced-pre-commit.sh; then
    echo "❌ Pre-commit checks failed"
    exit 1
fi

# 2. Performance audit (quick check)
echo "⚡ Running quick performance check..."
if ! pnpm run audit:performance:json > /dev/null 2>&1; then
    echo "⚠️  Performance audit failed. Check your local server."
    echo "   Make sure to run 'pnpm run dev' in another terminal"
    echo "   Continuing with push..."
fi

# 3. Bundle analysis
echo "📊 Running bundle analysis..."
if ! pnpm run analyze > /dev/null 2>&1; then
    echo "❌ Bundle analysis failed"
    exit 1
fi

# 4. Check for large files
echo "📁 Checking for large files..."
if find . -name "*.js" -o -name "*.ts" -o -name "*.astro" | xargs ls -lh | awk '$5 > 100000 {print $5, $9}' | grep -q .; then
    echo "⚠️  Found large files (>100KB). Consider optimization."
    find . -name "*.js" -o -name "*.ts" -o -name "*.astro" | xargs ls -lh | awk '$5 > 100000 {print $5, $9}'
fi

# 5. Check for sensitive information
echo "🔒 Checking for sensitive information..."
if grep -r "password\|secret\|key\|token" src/ --include="*.ts" --include="*.tsx" --include="*.astro" | grep -v "//.*password\|//.*secret\|//.*key\|//.*token"; then
    echo "❌ Found potential sensitive information. Please remove before pushing."
    exit 1
fi

# 6. Check git status
echo "📋 Checking git status..."
if ! git status --porcelain | grep -q "^[^?]"; then
    echo "✅ Working directory is clean"
else
    echo "⚠️  Working directory has uncommitted changes"
    git status --short
fi

# 7. Check if we're pushing to main branch
current_branch=$(git branch --show-current)
if [ "$current_branch" = "main" ]; then
    echo "⚠️  You're pushing to main branch. Make sure this is intentional."
    echo "   Consider using a feature branch for development."
fi

echo "✅ All pre-push checks completed!"
echo "🚀 Ready to push to remote!"
