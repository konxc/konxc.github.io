# 🛠️ Developer Maintenance Guide - KonXC Website

## 📋 **Overview**

Panduan lengkap untuk developer yang akan maintain dan mengembangkan website **konxc.space** berbasis **Astro.js**. Website ini adalah platform utama PT Koneksi Jaringan Indonesia dengan visi menjadi "rumah milik bersama" untuk komunitas teknologi Indonesia.

## 🏗️ **Architecture Overview**

### **Tech Stack**
- **Framework**: Astro.js (Static Site Generator)
- **Styling**: Tailwind CSS 4 dengan custom design system
- **Content**: Markdown dengan Astro Content Collections
- **Deployment**: GitHub Pages (manual deployment)
- **Package Manager**: pnpm
- **TypeScript**: Full type safety

### **Project Structure**
```
konxc.github.io/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # UI components (Button, Card, etc.)
│   │   ├── sections/       # Page sections (Hero, Services, etc.)
│   │   ├── blog/           # Blog-specific components
│   │   ├── contributors/   # Contributors components
│   │   └── forms/          # Form components
│   ├── content/            # Content collections
│   │   ├── blog/          # Blog posts (.md files)
│   │   └── contributors/  # Contributors profiles
│   ├── layouts/           # Page layouts
│   ├── pages/             # Route pages
│   ├── styles/            # Global styles
│   └── utils/             # Utility functions
├── public/                # Static assets
├── docs/                  # Documentation
└── scripts/               # Deployment scripts
```

## 🎯 **Priority Maintenance Areas**

### **1. Content Management (HIGH PRIORITY)**

#### **Blog System**
- **Location**: `src/content/blog/`
- **Format**: Markdown files dengan frontmatter
- **Schema**: Defined in `src/content/config.ts`

**Adding New Blog Post:**
```markdown
---
title: "Judul Article"
description: "Deskripsi singkat artikel"
publishDate: 2024-01-15
author: "Nama Author"
category: "technical" # business, technical, case-study, tutorial, insights
tags: ["javascript", "astro", "web-development"]
featured: false
readingTime: 5
coverImage: "/images/blog/article-cover.jpg"
---

# Content artikel dalam Markdown
```

**Blog Categories:**
- `business`: Artikel bisnis dan strategi
- `technical`: Tutorial dan technical insights
- `case-study`: Studi kasus implementasi
- `tutorial`: Step-by-step tutorials
- `insights`: Industry insights dan trends

#### **Contributors System**
- **Location**: `src/content/contributors/`
- **Purpose**: Profil tim dan kontributor komunitas

**Adding New Contributor:**
```markdown
---
name: "Nama Contributor"
bio: "Bio singkat"
avatar: "/images/contributors/avatar.jpg"
role: "developer" # developer, designer, writer, researcher
expertise: ["JavaScript", "React", "Node.js"]
location: "Jakarta, Indonesia"
github: "username"
linkedin: "profile-url"
joinDate: "2024-01-15"
isActive: true
---

# Profile content dalam Markdown
```

### **2. Design System (HIGH PRIORITY)**

#### **Color Palette**
- **Primary**: Soft Blue (`#6366f1`) - Brand utama
- **Secondary**: Soft Teal (`#14b8a6`) - Accent color
- **Accent**: Soft Purple (`#a855f7`) - Highlight color
- **Neutral**: Refined Grays - Text dan backgrounds

#### **Typography**
- **Heading**: Inter (clean, modern)
- **Body**: Source Sans Pro (readable)
- **Mono**: JetBrains Mono (code blocks)

#### **Component Classes**
```css
/* Buttons */
.btn-primary    # Primary CTA buttons
.btn-secondary  # Secondary actions
.btn-accent     # Special actions (Join Community)
.btn-outline    # Outline buttons

/* Cards */
.card           # Standard cards
.card-featured  # Featured/highlighted cards

/* Forms */
.form-input     # Input fields
.form-textarea  # Textarea fields
.form-label     # Form labels
```

### **3. Performance Optimization (MEDIUM PRIORITY)**

#### **Image Optimization**
```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image 
  src={heroImage} 
  alt="Description"
  width={1200}
  height={600}
  loading="lazy"
  class="w-full h-auto"
/>
```

#### **CSS Optimization**
- **Use Tailwind utilities** first
- **@apply directive** only for complex components
- **Avoid custom CSS** unless absolutely necessary

#### **JavaScript Optimization**
- **Frontmatter logic** for static processing
- **Client scripts** only for interactivity
- **Lazy loading** for non-critical components

### **4. SEO & Accessibility (MEDIUM PRIORITY)**

#### **SEO Checklist**
- [ ] Meta titles dan descriptions
- [ ] Open Graph tags
- [ ] Structured data (JSON-LD)
- [ ] Sitemap generation
- [ ] Robots.txt
- [ ] Canonical URLs

#### **Accessibility Checklist**
- [ ] Semantic HTML structure
- [ ] ARIA labels dan roles
- [ ] Keyboard navigation
- [ ] Color contrast compliance
- [ ] Alt text untuk images
- [ ] Focus indicators

## 🔧 **Development Workflow**

### **Daily Maintenance Tasks**

#### **1. Content Updates**
```bash
# Add new blog post
touch src/content/blog/2024-01-15-new-article.md

# Update contributor profile
vim src/content/contributors/john-doe.md

# Check content schema
pnpm astro check
```

#### **2. Component Updates**
```bash
# Create new component
touch src/components/ui/NewComponent.astro

# Update existing component
vim src/components/sections/Hero.astro

# Test component
pnpm dev
```

#### **3. Style Updates**
```bash
# Update global styles
vim src/styles/global.css

# Add new Tailwind utilities
# (Use existing classes first!)

# Build and test
pnpm build
```

### **Weekly Maintenance Tasks**

#### **1. Dependencies Update**
```bash
# Check outdated packages
pnpm outdated

# Update dependencies
pnpm update

# Test after updates
pnpm build && pnpm preview
```

#### **2. Performance Audit**
```bash
# Build production
pnpm build

# Check bundle size
ls -la dist/

# Lighthouse audit
# (Use browser dev tools)
```

#### **3. Content Review**
- Review new blog posts for quality
- Update contributor profiles
- Check for broken links
- Verify image optimization

### **Monthly Maintenance Tasks**

#### **1. SEO Review**
- Google Search Console check
- Update sitemap if needed
- Review meta descriptions
- Check structured data

#### **2. Security Updates**
```bash
# Security audit
pnpm audit

# Fix vulnerabilities
pnpm audit fix

# Update Node.js if needed
```

#### **3. Backup & Documentation**
- Update documentation
- Review deployment scripts
- Backup content and configurations

## 🚀 **Deployment Process**

### **Manual Deployment (Current)**

#### **Linux/macOS:**
```bash
./scripts/deploy-manual.sh
```

#### **Windows:**
```cmd
scripts\deploy-manual.bat
```

#### **Deployment Steps:**
1. Build production version (`pnpm build`)
2. Switch to `gh-pages` branch
3. Clean previous build
4. Copy new build files
5. Commit and push to GitHub
6. GitHub Pages auto-deploys

### **Deployment Checklist**
- [ ] Test build locally (`pnpm build && pnpm preview`)
- [ ] Check for console errors
- [ ] Verify responsive design
- [ ] Test form functionality
- [ ] Check loading performance
- [ ] Validate HTML/CSS
- [ ] Run deployment script
- [ ] Verify live site

## 🐛 **Common Issues & Solutions**

### **Build Issues**

#### **Problem**: `pnpm build` fails
**Solution:**
```bash
# Clear cache
rm -rf node_modules/.cache
rm -rf dist/

# Reinstall dependencies
rm -rf node_modules
pnpm install

# Try build again
pnpm build
```

#### **Problem**: Tailwind classes not working
**Solution:**
```bash
# Check Tailwind config
cat tailwind.config.js

# Verify @import in global.css
head -5 src/styles/global.css

# Rebuild
pnpm build
```

### **Content Issues**

#### **Problem**: Blog post not showing
**Solution:**
1. Check frontmatter format
2. Verify file location (`src/content/blog/`)
3. Check content schema in `src/content/config.ts`
4. Restart dev server

#### **Problem**: Images not loading
**Solution:**
1. Check file path (relative to `public/` or `src/assets/`)
2. Verify image format (jpg, png, webp)
3. Check file permissions
4. Use Astro Image component for optimization

### **Deployment Issues**

#### **Problem**: GitHub Pages not updating
**Solution:**
1. Check `gh-pages` branch has new commits
2. Verify GitHub Pages settings
3. Check for build errors in Actions tab
4. Clear browser cache

#### **Problem**: 404 errors on deployed site
**Solution:**
1. Check `base` config in `astro.config.mjs`
2. Verify route paths
3. Check `.nojekyll` file exists
4. Review GitHub Pages configuration

## 📊 **Monitoring & Analytics**

### **Performance Monitoring**
- **Google PageSpeed Insights**: Monthly check
- **Lighthouse**: Weekly audit
- **Bundle size**: Monitor after major updates

### **Content Analytics**
- **Google Analytics**: Track page views, user behavior
- **Search Console**: Monitor search performance
- **Social media**: Track article shares

### **Error Monitoring**
- **Browser Console**: Check for JavaScript errors
- **404 Errors**: Monitor broken links
- **Form Submissions**: Verify contact forms work

## 🔒 **Security Considerations**

### **Content Security**
- Sanitize user-generated content
- Validate form inputs
- Use HTTPS everywhere
- Regular dependency updates

### **Access Control**
- Secure GitHub repository access
- Use environment variables for secrets
- Regular password updates
- Two-factor authentication

## 📚 **Resources & Documentation**

### **Internal Documentation**
- `docs/DEVELOPMENT_STANDARDS.md` - Coding standards
- `docs/ECOSYSTEM_STRATEGY.md` - Business strategy
- `docs/ROADMAP_DEVELOPMENT.md` - Development roadmap
- `docs/DEPLOY_MANUAL.md` - Deployment guide

### **External Resources**
- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

### **Community Support**
- **Astro Discord**: Community support
- **Tailwind Discord**: CSS framework help
- **GitHub Issues**: Bug reports and features

## 🎯 **Quality Assurance**

### **Pre-Deployment Checklist**
- [ ] **Build Success**: `pnpm build` completes without errors
- [ ] **Type Check**: `pnpm astro check` passes
- [ ] **Responsive**: Test on mobile, tablet, desktop
- [ ] **Performance**: Lighthouse score > 90
- [ ] **Accessibility**: WCAG compliance
- [ ] **SEO**: Meta tags, structured data
- [ ] **Content**: Spelling, grammar, formatting
- [ ] **Links**: All internal/external links work

### **Post-Deployment Verification**
- [ ] **Live Site**: Homepage loads correctly
- [ ] **Navigation**: All menu items work
- [ ] **Blog**: Latest posts display
- [ ] **Forms**: Contact form submits
- [ ] **Mobile**: Responsive design works
- [ ] **Speed**: Page load time < 3 seconds

## 🚨 **Emergency Procedures**

### **Site Down**
1. Check GitHub Pages status
2. Verify DNS settings
3. Check recent deployments
4. Rollback if necessary
5. Contact hosting support

### **Critical Bug**
1. Identify affected pages/features
2. Create hotfix branch
3. Implement minimal fix
4. Test thoroughly
5. Deploy immediately
6. Monitor for issues

### **Content Issues**
1. Backup current content
2. Identify problematic content
3. Remove or fix content
4. Redeploy site
5. Verify fix live

## 📞 **Support Contacts**

### **Technical Issues**
- **GitHub Support**: For repository/Pages issues
- **Domain Provider**: For DNS issues
- **CDN Provider**: For performance issues

### **Content Issues**
- **Content Team**: For editorial questions
- **Design Team**: For UI/UX issues
- **Marketing Team**: For SEO/analytics

---

## 🎯 **Key Takeaways**

### **Priority Order:**
1. **Content Management** - Keep blog and contributors updated
2. **Design System** - Maintain consistent UI/UX
3. **Performance** - Optimize for speed and accessibility
4. **SEO** - Ensure discoverability
5. **Security** - Keep dependencies updated

### **Best Practices:**
- **Test locally** before deploying
- **Use Tailwind utilities** over custom CSS
- **Optimize images** for web
- **Write semantic HTML**
- **Document changes** in commit messages
- **Monitor performance** regularly

### **Remember:**
- **Quality over quantity** - Better to have fewer, high-quality posts
- **User experience first** - Always consider end-user impact
- **Performance matters** - Fast sites rank better and convert more
- **Accessibility is essential** - Make content available to everyone
- **Documentation is key** - Keep guides updated for future developers

**Happy coding! 🚀**
