#!/bin/bash

# 🚀 Pre-Push Script for Koneksi Project
# This script ensures synchronization with remote and prevents conflicts

set -e  # Exit on any error

echo "🔄 Pre-Push Checks Starting..."

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

# 2. Get current branch
CURRENT_BRANCH=$(git branch --show-current)
print_status "Current branch: $CURRENT_BRANCH"

# 3. Check if there are uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
    print_error "You have uncommitted changes!"
    print_status "Please commit or stash your changes before pushing."
    git status --short
    exit 1
fi

# 4. Fetch latest changes from remote
print_status "Fetching latest changes from remote..."
if ! git fetch origin; then
    print_error "Failed to fetch from remote!"
    exit 1
fi

# 5. Check if remote branch exists
REMOTE_BRANCH="origin/$CURRENT_BRANCH"
if git show-ref --verify --quiet "refs/remotes/$REMOTE_BRANCH"; then
    # Remote branch exists, check for conflicts
    print_status "Checking for conflicts with remote branch..."
    
    # Get commit counts
    AHEAD=$(git rev-list --count "$REMOTE_BRANCH..$CURRENT_BRANCH" 2>/dev/null || echo "0")
    BEHIND=$(git rev-list --count "$CURRENT_BRANCH..$REMOTE_BRANCH" 2>/dev/null || echo "0")
    
    print_status "Local branch is $AHEAD commits ahead, $BEHIND commits behind remote"
    
    if [ "$BEHIND" -gt 0 ]; then
        print_warning "Your branch is behind the remote branch!"
        print_status "Attempting to rebase..."
        
        # Try to rebase
        if git rebase "$REMOTE_BRANCH"; then
            print_success "Successfully rebased with remote changes"
        else
            print_error "Rebase failed due to conflicts!"
            print_status "Please resolve conflicts manually:"
            echo "  1. Fix conflicts in the affected files"
            echo "  2. Run: git add <resolved-files>"
            echo "  3. Run: git rebase --continue"
            echo "  4. Try pushing again"
            exit 1
        fi
    fi
else
    print_status "Remote branch doesn't exist, will create new branch on push"
fi

# 6. Check code formatting
print_status "Checking code formatting..."
if ! pnpm prettier --check .; then
    print_error "Code is not properly formatted!"
    print_status "Running formatter..."
    pnpm prettier --write .
    
    # Check if formatting created changes
    if ! git diff --quiet; then
        print_error "Formatting created changes that need to be committed!"
        print_status "Please commit the formatting changes:"
        echo "  git add ."
        echo "  git commit -m \"style: fix code formatting\""
        echo "  git push"
        exit 1
    fi
fi

# 7. Run TypeScript checks
if [ -f "tsconfig.json" ]; then
    print_status "Running TypeScript checks..."
    if ! pnpm astro check; then
        print_error "TypeScript errors found!"
        print_status "Please fix TypeScript errors before pushing."
        exit 1
    fi
fi

# 8. Check build (optional, can be slow)
if [ "$1" = "--with-build" ]; then
    print_status "Running build check..."
    if ! pnpm build; then
        print_error "Build failed!"
        print_status "Please fix build errors before pushing."
        exit 1
    fi
    print_success "Build successful"
fi

# 9. Final checks and summary
print_status "Running final checks..."

# Check for large files (>10MB)
LARGE_FILES=$(git ls-files | xargs ls -la 2>/dev/null | awk '$5 > 10485760 {print $9, $5}' || true)
if [ -n "$LARGE_FILES" ]; then
    print_warning "Found large files (>10MB):"
    echo "$LARGE_FILES"
    echo ""
    read -p "Continue pushing with large files? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 10. Success message
print_success "All pre-push checks passed! 🚀"

echo ""
echo "📋 Summary:"
echo "  ✅ No uncommitted changes"
echo "  ✅ Synced with remote branch"
echo "  ✅ Code properly formatted"
echo "  ✅ TypeScript checks passed"
if [ "$1" = "--with-build" ]; then
    echo "  ✅ Build successful"
fi
echo ""
print_status "Ready to push to remote!"

# Optional: Ask for confirmation
if [ "$2" = "--confirm" ]; then
    read -p "Push to $REMOTE_BRANCH? (Y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Nn]$ ]]; then
        print_status "Push cancelled by user"
        exit 0
    fi
    
    # Actually push
    print_status "Pushing to remote..."
    git push origin "$CURRENT_BRANCH"
    print_success "Successfully pushed to remote! 🎉"
fi
