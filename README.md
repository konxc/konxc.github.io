# www.konxc.space - Website Resmi KonXC

Website resmi KonXC yang dibangun menggunakan Astro dan di-deploy ke GitHub Pages.

🌐 **Live Site**: https://www.konxc.space

## 📋 Overview

Repository ini berisi source code untuk website resmi KonXC. Website ini dibangun menggunakan:
- **Astro** - Static site generator
- **Tailwind CSS** - CSS framework
- **pnpm** - Package manager
- **GitHub Pages** - Hosting platform

## 🚀 Quick Start

### Prerequisites
- Node.js (versi 20 atau lebih baru)
- pnpm: `npm install -g pnpm`
- Git

### Development
```bash
# Clone repository
git clone https://github.com/konxc/konxc.github.io.git
cd konxc.github.io

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Website akan tersedia di `http://localhost:4321`

## 🧞 Available Commands

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 🚀 Deployment

### ⚠️ Important: Manual Deployment Required

Karena masalah billing dengan GitHub Actions, deployment dilakukan secara manual menggunakan script yang telah disediakan.

### Cara Deploy Manual

#### Menggunakan Script (Recommended)
```bash
# Linux/macOS
./scripts/deploy-manual.sh

# Windows (Git Bash/WSL)
./scripts/deploy-manual.bat
```

#### Manual Step-by-Step
```bash
# 1. Pastikan di branch main dan pull latest changes
git checkout main
git pull origin main

# 2. Install dependencies dan build
pnpm install
pnpm run build

# 3. Deploy ke branch gh-pages
git checkout gh-pages
cp -r dist/* .
git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S') - Manual deployment"
git push origin gh-pages

# 4. Kembali ke main
git checkout main
```

### 📚 Dokumentasi Lengkap
Lihat [docs/DEPLOY_MANUAL.md](./docs/DEPLOY_MANUAL.md) untuk dokumentasi deploy yang lebih detail.

## 🏗️ Project Structure

```
/
├── public/                 # Static assets
├── src/
│   ├── pages/             # Astro pages
│   └── components/        # Reusable components
├── scripts/               # Deployment scripts
├── docs/                  # Documentation
├── astro.config.mjs       # Astro configuration
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Dependencies
```

## 🔧 Maintenance Guide

### Untuk Tim Development

1. **Development Workflow**:
   - Buat perubahan di branch `main`
   - Test lokal dengan `pnpm dev`
   - Deploy menggunakan script manual

2. **Update Content**:
   - Edit file di `src/pages/` untuk halaman baru
   - Edit file di `src/components/` untuk komponen
   - Asset static (gambar, dll) taruh di `public/`

3. **Styling**:
   - Gunakan Tailwind CSS classes
   - Custom CSS bisa ditambahkan di komponen Astro

4. **Deployment Checklist**:
   - [ ] Pastikan perubahan sudah di-commit di branch main
   - [ ] Test build lokal dengan `pnpm build`
   - [ ] Jalankan script deploy manual
   - [ ] Verifikasi website di https://www.konxc.space

### Troubleshooting

- **Build Error**: Periksa syntax Astro dan dependencies
- **Deploy Error**: Pastikan pnpm terinstall dan script executable
- **Website tidak update**: Tunggu beberapa menit, GitHub Pages butuh waktu

## 📞 Support

Untuk pertanyaan atau masalah:
- Periksa dokumentasi di folder `docs/`
- Buat issue di repository ini
- Hubungi tim development

## 📄 License

Repository ini adalah milik KonXC. Semua hak cipta dilindungi.
