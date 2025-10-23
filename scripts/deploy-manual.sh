#!/bin/bash

# Script Deploy Manual untuk www.konxc.space
# Script ini akan membuat branch gh-pages dan deploy ke GitHub Pages secara manual

set -e  # Exit on any error

# Colors for output
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

# Check if gh-pages branch exists
if git show-ref --verify --quiet refs/heads/$DEPLOY_BRANCH; then
    echo -e "${BLUE}📋 Switching to existing gh-pages branch...${NC}"
    git checkout $DEPLOY_BRANCH
    git pull $REMOTE_NAME $DEPLOY_BRANCH
else
    echo -e "${BLUE}📋 Creating new gh-pages branch...${NC}"
    git checkout --orphan $DEPLOY_BRANCH
    git rm -rf . 2>/dev/null || true
fi

# Copy dist contents to root
echo -e "${BLUE}📁 Copying build files...${NC}"
cp -r $DIST_DIR/* .
cp $DIST_DIR/.* . 2>/dev/null || true

# Add all files
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}⚠️  No changes to deploy. Build is identical to current deployment.${NC}"
else
    # Commit changes
    COMMIT_MSG="Deploy: $(date '+%Y-%m-%d %H:%M:%S') - Manual deployment from main"
    echo -e "${BLUE}💾 Committing changes...${NC}"
    git commit -m "$COMMIT_MSG"
    
    # Push to gh-pages branch
    echo -e "${BLUE}🚀 Pushing to gh-pages branch...${NC}"
    git push $REMOTE_NAME $DEPLOY_BRANCH
    
    echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
    echo -e "${GREEN}🌐 Your site should be available at: https://www.konxc.space${NC}"
    echo -e "${YELLOW}⏰ Note: It may take a few minutes for changes to be visible.${NC}"
fi

# Switch back to main branch
echo -e "${BLUE}🔄 Switching back to main branch...${NC}"
git checkout $SOURCE_BRANCH

echo -e "${GREEN}🎉 Manual deploy process completed!${NC}"
echo "=================================================="
