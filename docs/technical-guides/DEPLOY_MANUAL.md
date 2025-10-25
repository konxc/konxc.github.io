# Dokumentasi Deploy Manual - www.konxc.space

## 📋 Overview

Dokumentasi ini menjelaskan cara melakukan deploy manual untuk website www.konxc.space menggunakan script yang telah disediakan. Script ini dibuat sebagai alternatif dari GitHub Actions karena masalah billing.

**Penting**: Branch `gh-pages` **hanya berisi hasil build** dari folder `dist/`, tidak ada file source code.

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
bash ./scripts/deploy-manual.sh
```

#### Untuk Windows (Git Bash/WSL):
```bash
# Jalankan script deploy
./scripts/deploy-manual.bat
```

### Apa yang Dilakukan Script?

Script akan secara otomatis:
1. ✅ Checkout ke branch `main` dan pull latest changes
2. ✅ Install dependencies dengan `pnpm install`
3. ✅ Build project dengan `pnpm run build`
4. ✅ Copy hasil build ke temporary directory
5. ✅ Checkout ke branch `gh-pages` (atau buat jika belum ada)
6. ✅ **Hapus semua file lama** di gh-pages
7. ✅ **Copy hanya hasil build** dari temporary directory
8. ✅ Tambahkan file `.nojekyll` untuk GitHub Pages
9. ✅ Commit dan push ke branch `gh-pages`
10. ✅ Kembali ke branch `main`

**Hasil**: Branch `gh-pages` hanya berisi file-file hasil build (HTML, CSS, JS, assets) tanpa source code.

### Metode 2: Manual Step-by-Step

Jika script tidak berfungsi, Anda bisa melakukan deploy secara manual:

```bash
# 1. Pastikan Anda di branch main
git checkout main
git pull origin main

# 2. Install dependencies dan build
pnpm install
pnpm run build

# 3. Copy dist ke temporary location
cp -r dist /tmp/konxc-deploy

# 4. Switch ke branch gh-pages
git checkout gh-pages
git config pull.rebase false
git pull origin gh-pages

# 5. Hapus semua file kecuali .git
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} +

# 6. Copy hanya hasil build
cp -r /tmp/konxc-deploy/* .

# 7. Tambahkan .nojekyll
touch .nojekyll

# 8. Commit dan push
git add -A
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git push -u origin gh-pages

# 9. Kembali ke main
git checkout main

# 10. Cleanup
rm -rf /tmp/konxc-deploy
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

### Error: "Your local changes would be overwritten"
```bash
# Commit perubahan di main terlebih dahulu
git add .
git commit -m "Your commit message"
```

### Website tidak update setelah deploy
- GitHub Pages membutuhkan waktu 2-5 menit untuk update
- Pastikan branch `gh-pages` sudah di-push dengan benar
- Clear browser cache (Ctrl+F5 atau Cmd+Shift+R)
- Periksa pengaturan GitHub Pages di repository settings

## 📁 Struktur Branch

- **main**: Branch utama untuk development (berisi source code lengkap)
- **gh-pages**: Branch untuk deployment (hanya berisi hasil build dari `dist/`)

### Contoh isi branch gh-pages:
```
gh-pages/
├── _astro/           # CSS dan assets yang di-bundle
│   └── index.*.css
├── .nojekyll        # File untuk GitHub Pages
├── CNAME            # Custom domain (jika ada)
├── favicon.svg      # Favicon
├── index.html       # HTML pages
└── robots.txt       # Robots.txt
```

**Tidak ada**: `package.json`, `node_modules`, `src/`, `astro.config.mjs`, dll.

## 🔄 Workflow Development

1. **Development**: Buat perubahan di branch `main`
2. **Testing**: Test lokal dengan `pnpm dev`
3. **Build**: Test build dengan `pnpm build`
4. **Deploy**: Jalankan script deploy manual
5. **Verification**: Periksa website di https://www.konxc.space

## 📝 Catatan Penting

- ✅ Script menggunakan temporary directory untuk keamanan
- ✅ Branch gh-pages selalu dibersihkan sebelum deploy baru
- ✅ Hanya hasil build yang di-deploy, tidak ada source code
- ✅ File `.nojekyll` ditambahkan otomatis
- ✅ Script akan kembali ke main setelah deploy
- ⚠️ Pastikan tidak ada perubahan yang belum di-commit sebelum deploy
- ⚠️ Website akan tersedia di https://www.konxc.space setelah 2-5 menit

## 🆘 Support

Jika mengalami masalah:
1. Periksa troubleshooting di atas
2. Pastikan semua prerequisites terinstall
3. Periksa log error yang muncul
4. Lihat `docs/TROUBLESHOOTING.md` untuk masalah umum
5. Hubungi tim development jika masalah berlanjut