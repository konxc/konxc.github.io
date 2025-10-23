# Deployment Workflow - www.konxc.space

## 📊 Workflow Diagram

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Developer     │    │   Main Branch    │    │  Deploy Script  │
│                 │    │                  │    │                 │
│ 1. Make Changes │───▶│ 2. Commit & Push │───▶│ 3. Run Script   │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                         │
                                                         ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   GitHub Pages  │◀───│   gh-pages       │◀───│ 4. Build &     │
│                 │    │   Branch         │    │    Deploy       │
│ 6. Live Website │    │ 5. Push Files   │    │                 │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🔄 Detailed Process

### 1. Development Phase
- Developer membuat perubahan di branch `main`
- Test lokal menggunakan `pnpm dev`
- Commit dan push perubahan ke repository

### 2. Deployment Phase
- Jalankan script deploy manual: `./scripts/deploy-manual.sh`
- Script akan:
  - Pull latest changes dari main
  - Install dependencies dengan pnpm
  - Build project dengan Astro
  - Switch ke branch gh-pages
  - Copy built files ke root
  - Commit dan push ke gh-pages branch

### 3. GitHub Pages Deployment
- GitHub Pages otomatis detect perubahan di branch gh-pages
- Website di-deploy ke https://www.konxc.space
- Proses ini membutuhkan waktu 2-5 menit

## 🎯 Key Benefits

1. **No Billing Issues**: Tidak menggunakan GitHub Actions
2. **Manual Control**: Developer memiliki kontrol penuh atas deployment
3. **Reliable**: Script yang sederhana dan dapat diandalkan
4. **Cross-Platform**: Support Linux, macOS, dan Windows
5. **Documentation**: Dokumentasi lengkap untuk tim

## ⚠️ Important Notes

- **Branch Separation**: Main untuk development, gh-pages untuk deployment
- **Manual Process**: Deployment harus dilakukan secara manual
- **Script Dependency**: Pastikan pnpm dan Node.js terinstall
- **Timing**: GitHub Pages butuh waktu untuk update

## 🛠️ Maintenance

- Script dapat diupdate sesuai kebutuhan
- Dokumentasi harus selalu up-to-date
- Tim harus familiar dengan proses manual deployment
- Backup penting dilakukan secara teratur
