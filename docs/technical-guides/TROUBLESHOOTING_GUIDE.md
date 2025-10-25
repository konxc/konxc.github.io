# 🔧 Troubleshooting Guide - KonXC Website

## 🚨 **Quick Fix Commands**

### **Emergency Reset**
```bash
# Complete project reset
rm -rf node_modules dist .astro
pnpm install
pnpm build

# If still failing, check Node.js version
node --version  # Should be >= 18.0.0
```

### **Common Build Fixes**
```bash
# Clear all caches
rm -rf node_modules/.cache
rm -rf dist/
rm -rf .astro/

# Reinstall and rebuild
pnpm install --frozen-lockfile
pnpm build
```

## 🐛 **Common Issues & Solutions**

### **1. Build Failures**

#### **Error**: `Cannot resolve module '@astrojs/...'`
**Cause**: Missing or corrupted dependencies
**Solution**:
```bash
# Check package.json dependencies
cat package.json | grep astro

# Reinstall specific package
pnpm add @astrojs/sitemap

# Or reinstall all
rm -rf node_modules
pnpm install
```

#### **Error**: `Tailwind CSS classes not found`
**Cause**: Tailwind not properly configured
**Solution**:
```bash
# Check Tailwind config exists
ls -la tailwind.config.*

# Verify import in global.css
head -5 src/styles/global.css
# Should contain: @import "tailwindcss";

# Rebuild with verbose output
pnpm build --verbose
```

#### **Error**: `Content collection schema error`
**Cause**: Invalid frontmatter in markdown files
**Solution**:
```bash
# Check content schema
cat src/content/config.ts

# Validate specific file
pnpm astro check src/content/blog/problematic-file.md

# Fix frontmatter format
vim src/content/blog/problematic-file.md
```

### **2. Development Server Issues**

#### **Error**: `Port 4321 already in use`
**Solution**:
```bash
# Kill existing process
pkill -f "astro dev"

# Or use different port
pnpm dev --port 3000
```

#### **Error**: `Hot reload not working`
**Solution**:
```bash
# Restart dev server
pkill -f "astro dev"
pnpm dev

# Clear browser cache
# Ctrl+Shift+R (Chrome/Firefox)
```

#### **Error**: `TypeScript errors in IDE`
**Solution**:
```bash
# Generate TypeScript definitions
pnpm astro sync

# Check TypeScript config
cat tsconfig.json

# Restart TypeScript server in IDE
# VS Code: Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

### **3. Deployment Issues**

#### **Error**: `GitHub Pages not updating`
**Cause**: Build artifacts not properly pushed to gh-pages
**Solution**:
```bash
# Check gh-pages branch
git checkout gh-pages
ls -la  # Should contain index.html, assets/, etc.

# If empty, run deployment script again
git checkout main
./scripts/deploy-manual.sh

# Force push if needed
git checkout gh-pages
git push origin gh-pages --force
```

#### **Error**: `404 on deployed site`
**Cause**: Incorrect base path or routing
**Solution**:
```bash
# Check astro.config.mjs
cat astro.config.mjs | grep base

# Should be:
# base: '/konxc.github.io' (if using project pages)
# base: '/' (if using custom domain)

# Check .nojekyll file exists
ls -la public/.nojekyll
```

#### **Error**: `CSS/JS files not loading`
**Cause**: Incorrect asset paths
**Solution**:
```bash
# Check build output
ls -la dist/
ls -la dist/assets/

# Verify paths in HTML
grep -r "assets/" dist/

# Check public folder structure
ls -la public/
```

### **4. Content Issues**

#### **Error**: `Blog post not appearing`
**Cause**: Invalid frontmatter or file location
**Solution**:
```bash
# Check file location
ls -la src/content/blog/

# Validate frontmatter
head -20 src/content/blog/your-post.md

# Required fields:
# title, description, publishDate

# Check content collection config
grep -A 20 "blog.*defineCollection" src/content/config.ts
```

#### **Error**: `Images not loading`
**Cause**: Incorrect image paths or missing files
**Solution**:
```bash
# Check image exists
ls -la public/images/your-image.jpg
ls -la src/assets/your-image.jpg

# For public images: /images/your-image.jpg
# For assets: import and use Image component

# Verify image format
file public/images/your-image.jpg
```

#### **Error**: `Markdown not rendering properly`
**Cause**: Invalid markdown syntax
**Solution**:
```bash
# Test markdown syntax
# Use online markdown validator

# Check for common issues:
# - Missing blank lines around headers
# - Incorrect link syntax
# - Unescaped special characters

# Validate with Astro
pnpm astro check
```

### **5. Performance Issues**

#### **Error**: `Slow build times`
**Cause**: Large images or inefficient processing
**Solution**:
```bash
# Check image sizes
find public/images -name "*.jpg" -exec ls -lh {} \;

# Optimize images
# Use tools like imagemin or squoosh.app

# Check build output size
du -sh dist/

# Profile build
pnpm build --verbose
```

#### **Error**: `Large bundle size`
**Cause**: Unused dependencies or large assets
**Solution**:
```bash
# Analyze bundle
pnpm build
ls -lah dist/assets/

# Check for unused dependencies
pnpm depcheck

# Remove unused packages
pnpm remove unused-package
```

### **6. SEO Issues**

#### **Error**: `Missing meta tags`
**Cause**: Incomplete Head component
**Solution**:
```bash
# Check Head component
cat src/components/Head.astro

# Verify usage in layouts
grep -r "Head" src/layouts/

# Test with SEO tools
# Use tools like SEO analyzer
```

#### **Error**: `Sitemap not generating`
**Cause**: Missing sitemap integration
**Solution**:
```bash
# Check astro.config.mjs
grep -A 5 "sitemap" astro.config.mjs

# Should have:
# integrations: [sitemap()]

# Check build output
ls -la dist/sitemap*
```

## 🔍 **Debugging Tools**

### **Development Debugging**
```bash
# Verbose build output
pnpm build --verbose

# Check TypeScript
pnpm astro check

# Lint code
pnpm lint  # If configured

# Check bundle analyzer
pnpm build && ls -lah dist/
```

### **Browser Debugging**
```javascript
// Add to component for debugging
console.log('Debug info:', data);

// Check network requests
// F12 > Network tab

// Check console errors
// F12 > Console tab

// Performance profiling
// F12 > Performance tab
```

### **Content Debugging**
```bash
# Validate all content
pnpm astro check

# Check specific content type
find src/content/blog -name "*.md" -exec pnpm astro check {} \;

# Test markdown parsing
# Use online markdown parsers
```

## 📊 **Health Check Commands**

### **Daily Health Check**
```bash
#!/bin/bash
# Save as scripts/health-check.sh

echo "🔍 KonXC Health Check"
echo "===================="

# Check Node.js version
echo "Node.js: $(node --version)"

# Check dependencies
echo "Dependencies: $(pnpm list --depth=0 | wc -l) packages"

# Check build
echo "Testing build..."
if pnpm build > /dev/null 2>&1; then
    echo "✅ Build: SUCCESS"
else
    echo "❌ Build: FAILED"
fi

# Check content
echo "Content files: $(find src/content -name "*.md" | wc -l)"

# Check images
echo "Images: $(find public/images -type f | wc -l)"

# Check bundle size
if [ -d "dist" ]; then
    echo "Bundle size: $(du -sh dist/ | cut -f1)"
fi

echo "===================="
echo "Health check complete"
```

### **Weekly Maintenance**
```bash
#!/bin/bash
# Save as scripts/weekly-maintenance.sh

echo "🔧 Weekly Maintenance"
echo "===================="

# Update dependencies
echo "Updating dependencies..."
pnpm update

# Security audit
echo "Security audit..."
pnpm audit

# Clean cache
echo "Cleaning cache..."
rm -rf node_modules/.cache
rm -rf .astro

# Test build
echo "Testing build..."
pnpm build

# Check for outdated packages
echo "Checking for updates..."
pnpm outdated

echo "===================="
echo "Maintenance complete"
```

## 🚨 **Emergency Procedures**

### **Site Completely Down**
1. **Check GitHub Pages Status**
   ```bash
   curl -I https://konxc.space
   # Check response code
   ```

2. **Verify DNS**
   ```bash
   nslookup konxc.space
   dig konxc.space
   ```

3. **Check Recent Deployments**
   ```bash
   git log --oneline -10
   git checkout gh-pages
   git log --oneline -5
   ```

4. **Emergency Rollback**
   ```bash
   git checkout gh-pages
   git reset --hard HEAD~1  # Go back one commit
   git push origin gh-pages --force
   ```

### **Critical Bug in Production**
1. **Create Hotfix Branch**
   ```bash
   git checkout main
   git checkout -b hotfix/critical-bug
   ```

2. **Make Minimal Fix**
   ```bash
   # Edit only necessary files
   vim src/components/problematic-component.astro
   ```

3. **Test Locally**
   ```bash
   pnpm build
   pnpm preview
   # Test the specific bug
   ```

4. **Deploy Hotfix**
   ```bash
   git add .
   git commit -m "hotfix: fix critical bug"
   git checkout main
   git merge hotfix/critical-bug
   ./scripts/deploy-manual.sh
   ```

### **Content Emergency**
1. **Remove Problematic Content**
   ```bash
   # Remove or rename problematic file
   mv src/content/blog/problematic-post.md src/content/blog/problematic-post.md.bak
   ```

2. **Quick Deploy**
   ```bash
   pnpm build
   ./scripts/deploy-manual.sh
   ```

3. **Fix Content Offline**
   ```bash
   # Fix the content file
   vim src/content/blog/problematic-post.md.bak
   # Test locally before re-adding
   ```

## 📞 **When to Ask for Help**

### **Contact Technical Team When:**
- Build fails after trying all solutions
- Security vulnerabilities detected
- Performance degrades significantly
- Database or API integration issues

### **Contact Content Team When:**
- Content strategy questions
- Editorial guidelines needed
- SEO optimization required
- Content calendar planning

### **Contact DevOps Team When:**
- Deployment pipeline issues
- Domain/DNS problems
- CDN configuration needed
- Monitoring/analytics setup

## 📚 **Reference Links**

### **Documentation**
- [Astro Troubleshooting](https://docs.astro.build/en/guides/troubleshooting/)
- [Tailwind CSS Issues](https://tailwindcss.com/docs/installation#troubleshooting)
- [GitHub Pages Troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)

### **Community Support**
- [Astro Discord](https://astro.build/chat)
- [Tailwind Discord](https://discord.gg/7NF8GNe)
- [GitHub Community](https://github.community/)

### **Tools**
- [Astro DevTools](https://github.com/withastro/astro-devtools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

**Remember: When in doubt, check the logs, test locally, and don't hesitate to ask for help! 🚀**
