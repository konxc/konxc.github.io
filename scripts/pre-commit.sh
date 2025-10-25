#!/bin/bash

# 🚀 Pre-Commit Script for Koneksi Project
# This script ensures code quality and prevents conflicts before committing

set -e  # Exit on any error

echo "🔍 Pre-Commit Checks Starting..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository!"
    exit 1
fi

# 2. Check for staged files
if git diff --cached --quiet; then
    print_warning "No staged files found. Nothing to commit."
    exit 0
fi

print_status "Found staged files, proceeding with checks..."

# 3. Stash unstaged changes to avoid conflicts
STASH_NAME="pre-commit-$(date +%s)"
if ! git diff --quiet; then
    print_status "Stashing unstaged changes..."
    git stash push -u -m "$STASH_NAME" --keep-index
    STASHED=true
else
    STASHED=false
fi

# Function to restore stash on exit
cleanup() {
    if [ "$STASHED" = true ]; then
        print_status "Restoring unstaged changes..."
        git stash pop
    fi
}
trap cleanup EXIT

# 4. Format staged files
print_status "Formatting staged files..."
if ! pnpm prettier --write --staged; then
    print_error "Prettier formatting failed!"
    exit 1
fi

# 5. Add formatted files back to staging
git add -u

# 6. Check if all files are properly formatted
print_status "Checking code formatting..."
if ! pnpm prettier --check .; then
    print_error "Some files are not properly formatted!"
    print_status "Running full format..."
    pnpm prettier --write .
    git add -u
fi

# 7. Run TypeScript checks (if tsconfig exists)
if [ -f "tsconfig.json" ]; then
    print_status "Running TypeScript checks..."
    if ! pnpm astro check; then
        print_error "TypeScript errors found!"
        print_warning "Fix TypeScript errors before committing."
        exit 1
    fi
fi

# 8. Check for common issues
print_status "Checking for common issues..."

# Check for console.log statements (warning only)
if git diff --cached --name-only | xargs grep -l "console\.log" 2>/dev/null; then
    print_warning "Found console.log statements in staged files:"
    git diff --cached --name-only | xargs grep -n "console\.log" 2>/dev/null || true
    echo ""
    print_warning "Consider removing console.log statements before committing."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check for TODO/FIXME comments (warning only)
if git diff --cached --name-only | xargs grep -l -E "(TODO|FIXME|XXX)" 2>/dev/null; then
    print_warning "Found TODO/FIXME comments in staged files:"
    git diff --cached --name-only | xargs grep -n -E "(TODO|FIXME|XXX)" 2>/dev/null || true
    echo ""
fi

# 9. Final success message
print_success "All pre-commit checks passed! ✨"
print_status "Ready to commit."

echo ""
echo "📋 Summary:"
echo "  ✅ Code formatted with Prettier"
echo "  ✅ TypeScript checks passed"
echo "  ✅ No critical issues found"
echo ""
