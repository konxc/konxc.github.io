# Troubleshooting Guide - www.konxc.space

## 🚨 Common Issues dan Solusinya

### 1. Script Deploy Tidak Bisa Dijalankan

**Error**: `Permission denied` atau `command not found`

**Solusi**:
```bash
# Linux/macOS
chmod +x scripts/deploy-manual.sh
./scripts/deploy-manual.sh

# Windows - Gunakan Git Bash atau WSL
# Pastikan script dalam format Unix (LF, bukan CRLF)
```

### 2. Build Error

**Error**: `Build failed` atau error saat `pnpm run build`

**Solusi**:
```bash
# Clear cache dan reinstall
rm -rf node_modules
rm -rf dist
pnpm install
pnpm run build

# Check Node.js version (harus 20+)
node --version

# Check pnpm version
pnpm --version
```

### 3. Website Tidak Update Setelah Deploy

**Gejala**: Website masih menampilkan konten lama

**Solusi**:
1. Tunggu 5-10 menit (GitHub Pages butuh waktu)
2. Clear browser cache (Ctrl+F5 atau Cmd+Shift+R)
3. Check branch gh-pages di GitHub
4. Verify commit terbaru sudah di-push

### 4. Git Error Saat Deploy

**Error**: `fatal: not a git repository` atau branch errors

**Solusi**:
```bash
# Pastikan di direktori yang benar
pwd
ls -la package.json

# Check git status
git status
git branch -a

# Reset jika perlu
git checkout main
git pull origin main
```

### 5. Dependencies Error

**Error**: Package tidak ditemukan atau version conflict

**Solusi**:
```bash
# Update pnpm
npm install -g pnpm@latest

# Clear lock file dan reinstall
rm pnpm-lock.yaml
pnpm install

# Check package.json untuk syntax error
```

### 6. Astro Configuration Error

**Error**: Astro build error atau config issues

**Solusi**:
1. Check `astro.config.mjs` untuk syntax error
2. Verify site URL di config
3. Check Tailwind config di `tailwind.config.js`

### 7. GitHub Pages Tidak Deploy

**Gejala**: Website tidak accessible atau 404

**Solusi**:
1. Check GitHub Pages settings di repository
2. Verify branch `gh-pages` exists dan updated
3. Check jika ada custom domain di `public/CNAME`
4. Verify GitHub Pages enabled di repository settings

### 8. Local Development Issues

**Error**: `pnpm dev` tidak berjalan

**Solusi**:
```bash
# Check port availability
lsof -i :4321

# Kill process jika port digunakan
kill -9 $(lsof -t -i:4321)

# Restart dev server
pnpm dev
```

## 🔍 Debugging Steps

### 1. Check Environment
```bash
# Check versions
node --version
pnpm --version
git --version

# Check environment
echo $PATH
which pnpm
which git
```

### 2. Check Repository Status
```bash
# Git status
git status
git branch -a
git log --oneline -5

# Check remote
git remote -v
```

### 3. Check Build Process
```bash
# Clean build
rm -rf dist
pnpm run build

# Check dist contents
ls -la dist/
```

### 4. Check Deployment
```bash
# Check gh-pages branch
git checkout gh-pages
git log --oneline -3
git checkout main
```

## 📞 Getting Help

Jika masalah masih berlanjut:

1. **Check Logs**: Periksa output error dengan detail
2. **Documentation**: Lihat `docs/DEPLOY_MANUAL.md`
3. **GitHub Issues**: Buat issue di repository
4. **Team Support**: Hubungi tim development

## 🛠️ Useful Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build project
pnpm preview                # Preview build

# Git
git status                  # Check status
git log --oneline          # Recent commits
git branch -a              # All branches

# System
node --version             # Node version
pnpm --version             # pnpm version
which pnpm                 # pnpm location
```

## 📋 Pre-Flight Checklist

Sebelum melakukan deploy, pastikan:

- [ ] Node.js versi 20+ terinstall
- [ ] pnpm terinstall dan updated
- [ ] Git repository dalam kondisi clean
- [ ] Di branch main
- [ ] Semua perubahan sudah di-commit
- [ ] Local build berhasil
- [ ] Internet connection stabil
