# Dokumentasi Deploy Manual - www.konxc.space

## 📋 Overview

Dokumentasi ini menjelaskan cara melakukan deploy manual untuk website www.konxc.space menggunakan script yang telah disediakan. Script ini dibuat sebagai alternatif dari GitHub Actions karena masalah billing.

## 🛠️ Prerequisites

Sebelum melakukan deploy, pastikan Anda telah menginstall:

1. **Git** - untuk version control
2. **Node.js** (versi 20 atau lebih baru) - untuk menjalankan Astro
3. **pnpm** - package manager yang digunakan proyek ini
   ```bash
   npm install -g pnpm
   ```

## 🚀 Cara Deploy Manual

### Metode 1: Menggunakan Script (Recommended)

#### Untuk Linux/macOS:
```bash
# Jalankan script deploy
./scripts/deploy-manual.sh
```

#### Untuk Windows (Git Bash/WSL):
```bash
# Jalankan script deploy
./scripts/deploy-manual.bat
```

### Metode 2: Manual Step-by-Step

Jika script tidak berfungsi, Anda bisa melakukan deploy secara manual:

```bash
# 1. Pastikan Anda di branch main
git checkout main
git pull origin main

# 2. Install dependencies
pnpm install

# 3. Build project
pnpm run build

# 4. Switch ke branch gh-pages (atau buat jika belum ada)
git checkout gh-pages
# atau jika branch belum ada:
# git checkout --orphan gh-pages

# 5. Copy semua file dari dist ke root
cp -r dist/* .
cp dist/.* . 2>/dev/null || true

# 6. Commit dan push
git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S') - Manual deployment"
git push origin gh-pages

# 7. Kembali ke branch main
git checkout main
```

## 🔧 Troubleshooting

### Error: "pnpm is not installed"
```bash
npm install -g pnpm
```

### Error: "Not in a git repository"
Pastikan Anda berada di direktori root proyek (yang berisi file package.json).

### Error: "Build failed"
1. Periksa apakah ada error saat menjalankan `pnpm run build`
2. Pastikan semua dependencies terinstall dengan benar
3. Periksa konfigurasi Astro di `astro.config.mjs`

### Error: "Permission denied" pada script
```bash
chmod +x scripts/deploy-manual.sh
```

### Website tidak update setelah deploy
- GitHub Pages membutuhkan waktu beberapa menit untuk update
- Pastikan branch `gh-pages` sudah di-push dengan benar
- Periksa pengaturan GitHub Pages di repository settings

## 📁 Struktur Branch

- **main**: Branch utama untuk development
- **gh-pages**: Branch untuk deployment (otomatis dibuat oleh script)

## 🔄 Workflow Development

1. **Development**: Buat perubahan di branch `main`
2. **Testing**: Test lokal dengan `pnpm dev`
3. **Deploy**: Jalankan script deploy manual
4. **Verification**: Periksa website di https://www.konxc.space

## 📝 Catatan Penting

- Script akan otomatis membuat branch `gh-pages` jika belum ada
- Script akan otomatis kembali ke branch `main` setelah deploy
- Pastikan tidak ada perubahan yang belum di-commit sebelum deploy
- Website akan tersedia di https://www.konxc.space setelah deploy

## 🆘 Support

Jika mengalami masalah:
1. Periksa troubleshooting di atas
2. Pastikan semua prerequisites terinstall
3. Periksa log error yang muncul
4. Hubungi tim development jika masalah berlanjut
