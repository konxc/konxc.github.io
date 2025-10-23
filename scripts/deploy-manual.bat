#!/bin/bash

# Script Deploy Manual untuk Windows (Git Bash / WSL)
# Script ini akan membuat branch gh-pages dan deploy ke GitHub Pages secara manual

set -e  # Exit on any error

# Colors for output (Windows compatible)
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SOURCE_BRANCH="main"
DEPLOY_BRANCH="gh-pages"
DIST_DIR="dist"
REMOTE_NAME="origin"

echo -e "${BLUE}🚀 Starting Manual Deploy Process for www.konxc.space${NC}"
echo "=================================================="

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Not in a git repository${NC}"
    exit 1
fi

# Check if we're on the main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo -e "${YELLOW}⚠️  Warning: You're not on the main branch. Current branch: $CURRENT_BRANCH${NC}"
    echo -e "${YELLOW}   Switching to main branch...${NC}"
    git checkout $SOURCE_BRANCH
fi

# Pull latest changes from main
echo -e "${BLUE}📥 Pulling latest changes from main...${NC}"
git pull $REMOTE_NAME $SOURCE_BRANCH

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ Error: pnpm is not installed. Please install pnpm first.${NC}"
    echo "Install with: npm install -g pnpm"
    exit 1
fi

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
pnpm install

# Build the project
echo -e "${BLUE}🔨 Building the project...${NC}"
pnpm run build

# Check if dist directory exists
if [ ! -d "$DIST_DIR" ]; then
    echo -e "${RED}❌ Error: Build failed. dist directory not found.${NC}"
    exit 1
fi

# Save current directory
REPO_DIR=$(pwd)

# Create temporary directory for deployment
TEMP_DIR=$(mktemp -d)
echo -e "${BLUE}📁 Copying build files to temporary directory...${NC}"
cp -r $DIST_DIR/* $TEMP_DIR/
cp -r $DIST_DIR/.* $TEMP_DIR/ 2>/dev/null || true

# Switch to gh-pages branch
echo -e "${BLUE}📋 Switching to gh-pages branch...${NC}"
if git show-ref --verify --quiet refs/heads/$DEPLOY_BRANCH; then
    git checkout $DEPLOY_BRANCH
    # Configure pull strategy for this branch
    git config pull.rebase false
    git pull $REMOTE_NAME $DEPLOY_BRANCH || true
else
    git checkout --orphan $DEPLOY_BRANCH
fi

# Remove all files in gh-pages except .git
echo -e "${BLUE}🧹 Cleaning gh-pages branch...${NC}"
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} +

# Copy files from temp directory
echo -e "${BLUE}📂 Deploying build files...${NC}"
cp -r $TEMP_DIR/* .
cp -r $TEMP_DIR/.* . 2>/dev/null || true

# Clean up temp directory
rm -rf $TEMP_DIR

# Add .nojekyll to bypass Jekyll processing
touch .nojekyll

# Add all files
git add -A

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}⚠️  No changes to deploy. Build is identical to current deployment.${NC}"
else
    # Commit changes
    COMMIT_MSG="Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
    echo -e "${BLUE}💾 Committing changes...${NC}"
    git commit -m "$COMMIT_MSG"
    
    # Push to gh-pages branch
    echo -e "${BLUE}🚀 Pushing to gh-pages branch...${NC}"
    git push -u $REMOTE_NAME $DEPLOY_BRANCH
    
    echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
    echo -e "${GREEN}🌐 Your site should be available at: https://www.konxc.space${NC}"
    echo -e "${YELLOW}⏰ Note: It may take a few minutes for changes to be visible.${NC}"
fi

# Switch back to main branch
echo -e "${BLUE}🔄 Switching back to main branch...${NC}"
git checkout $SOURCE_BRANCH

echo -e "${GREEN}🎉 Manual deploy process completed!${NC}"
echo "=================================================="
