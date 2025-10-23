# Quick Reference - www.konxc.space

## 🚀 Quick Deploy Commands

```bash
# Linux/macOS
./scripts/deploy-manual.sh

# Windows (Git Bash/WSL)
./scripts/deploy-manual.bat

# Manual (if scripts fail)
git checkout main && git pull origin main
pnpm install && pnpm run build
git checkout gh-pages && cp -r dist/* .
git add . && git commit -m "Deploy: $(date)"
git push origin gh-pages && git checkout main
```

## 🔧 Development Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview build locally
pnpm install      # Install dependencies
```

## 📁 Important Files

- `scripts/deploy-manual.sh` - Deploy script (Linux/macOS)
- `scripts/deploy-manual.bat` - Deploy script (Windows)
- `docs/DEPLOY_MANUAL.md` - Detailed deployment guide
- `docs/TROUBLESHOOTING.md` - Common issues and solutions
- `docs/MAINTENANCE_CHECKLIST.md` - Maintenance tasks

## 🌐 URLs

- **Live Site**: https://www.konxc.space
- **Repository**: https://github.com/konxc/konxc.github.io
- **Development**: http://localhost:4321

## ⚡ Emergency Contacts

- Repository Issues: Create GitHub issue
- Website Down: Check GitHub Pages status
- Build Errors: See troubleshooting guide

## 📋 Pre-Deploy Checklist

- [ ] Changes committed to main
- [ ] Local build successful
- [ ] pnpm and Node.js installed
- [ ] Internet connection stable
- [ ] Ready to deploy

## 🎯 Post-Deploy Verification

- [ ] Check https://www.konxc.space
- [ ] Test key functionality
- [ ] Verify all pages load
- [ ] Check mobile responsiveness
- [ ] Wait 5-10 minutes for full deployment