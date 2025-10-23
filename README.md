# www.konxc.space - Website Resmi KonXC

Website resmi KonXC yang dibangun menggunakan Astro dan di-deploy ke GitHub Pages.

🌐 **Live Site**: https://www.konxc.space

## 📋 Overview

Repository ini berisi source code untuk website resmi KonXC. Website ini dibangun menggunakan:
- **Astro** - Static site generator
- **Tailwind CSS** - CSS framework
- **pnpm** - Package manager
- **GitHub Pages** - Hosting platform (manual deployment)

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

**Branch gh-pages hanya berisi hasil build**, tidak ada source code!

### Cara Deploy Manual

```bash
# Linux/macOS/Windows (Git Bash)
bash ./scripts/deploy-manual.sh
```

Script akan otomatis:
1. Pull latest changes dari main
2. Build project
3. **Deploy hanya hasil build** ke branch gh-pages
4. Push ke GitHub Pages

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
├── dist/                  # Build output (git ignored)
├── astro.config.mjs       # Astro configuration
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Dependencies
```

### Branch Structure
- **main**: Development branch (source code)
- **gh-pages**: Deployment branch (build files only)

## 🔧 Maintenance Guide

### Untuk Tim Development

1. **Development Workflow**:
   - Buat perubahan di branch `main`
   - Test lokal dengan `pnpm dev`
   - Test build dengan `pnpm build`
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
   - [ ] Verifikasi website di https://www.konxc.space (tunggu 2-5 menit)

### Troubleshooting

- **Build Error**: Periksa syntax Astro dan dependencies
- **Deploy Error**: Pastikan pnpm terinstall dan script executable
- **Website tidak update**: Tunggu 2-5 menit, GitHub Pages butuh waktu
- **Lihat dokumentasi lengkap**: `docs/TROUBLESHOOTING.md`

## 📞 Support

Untuk pertanyaan atau masalah:
- Periksa dokumentasi di folder `docs/`
- Buat issue di repository ini
- Hubungi tim development

## 📄 License

Repository ini adalah milik KonXC. Semua hak cipta dilindungi.