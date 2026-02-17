# Scripts Auto-Deploy Artikel

Script untuk otomatis commit dan deploy artikel blog berdasarkan tanggal publish.

## 📋 Daftar Script

### 1. `auto-deploy-article.sh`
Script utama untuk auto-deploy artikel. Script ini akan:
- Mencari artikel dengan `publishDate` sesuai hari ini
- Commit artikel ke git
- Push ke remote repository untuk trigger deployment

**Jalankan:** Secara otomatis via cron setiap Rabu dan Jumat jam 09:00 WIB

### 2. `setup-cron.sh`
Script untuk setup cron job. Menambahkan cron job ke crontab user.

**Usage:**
```bash
./scripts/setup-cron.sh
```

### 3. `test-auto-deploy.sh`
Script untuk test dan preview artikel yang akan di-deploy tanpa benar-benar commit.

**Usage:**
```bash
./scripts/test-auto-deploy.sh
```

---

## 🚀 Quick Start

### 1. Test Script (Recommended First)

```bash
cd /home/dev/web/koneksi/konxc.github.io
./scripts/test-auto-deploy.sh
```

Ini akan menunjukkan artikel mana yang akan di-deploy hari ini.

### 2. Setup Cron Job

```bash
./scripts/setup-cron.sh
```

Cron job akan dijalankan setiap **Rabu dan Jumat jam 09:00 WIB** (02:00 UTC).

### 3. Manual Deploy (Optional)

Jika ingin deploy manual tanpa menunggu cron:

```bash
./scripts/auto-deploy-article.sh
```

**⚠️ Warning:** Script ini akan benar-benar commit dan push ke repository!

---

## 📅 Jadwal Publish

Artikel akan otomatis di-deploy berdasarkan `publishDate` di frontmatter:

- **Artikel 1:** 2025-10-31 (Jumat) - Setup MCP Servers
- **Artikel 2:** 2025-11-05 (Rabu) - Serena Pengenalan
- **Artikel 3:** 2025-11-07 (Jumat) - 10 Use Cases
- **Artikel 4:** 2025-11-12 (Rabu) - Panduan Lengkap
- **Artikel 5:** 2025-11-14 (Jumat) - Troubleshooting

Cron job akan check setiap Rabu dan Jumat, dan deploy artikel yang `publishDate`-nya sesuai hari tersebut.

---

## ⚙️ Konfigurasi

### Update Branch

Jika repository menggunakan branch selain `main`, edit script:

```bash
# Di auto-deploy-article.sh
BRANCH="main"  # Ganti dengan "master" atau branch lain
```

### Update Waktu Cron

Untuk mengubah jadwal cron, edit `setup-cron.sh`:

```bash
# Format: minute hour day month weekday
# 0 2 * * 3,5 = Rabu (3) dan Jumat (5) jam 02:00 UTC (09:00 WIB)
CRON_SCHEDULE="0 2 * * 3,5"
```

---

## 📝 Log Files

Logs tersimpan di:
- **Deploy logs:** `logs/auto-deploy.log`
- **Cron logs:** `logs/cron.log`

---

## 🔧 Troubleshooting

### Cron Job Tidak Berjalan

1. Check cron service:
```bash
sudo systemctl status cron  # Ubuntu/Debian
```

2. Check cron job:
```bash
crontab -l
```

3. Check cron logs:
```bash
tail -f logs/cron.log
```

### Git Push Gagal

1. Check git remote:
```bash
git remote -v
```

2. Check credentials (SSH key atau token)

3. Check branch:
```bash
git branch
```

### Artikel Tidak Ter-deploy

1. Test script manual:
```bash
./scripts/test-auto-deploy.sh
```

2. Check `publishDate` di frontmatter artikel

3. Check logs:
```bash
tail -f logs/auto-deploy.log
```

---

## 🛡️ Safety Features

Script memiliki beberapa safety features:

- ✅ Pull latest changes sebelum commit (avoid conflicts)
- ✅ Check branch yang benar
- ✅ Validasi artikel sebelum commit
- ✅ Detailed logging untuk debugging
- ✅ Exit on error untuk prevent partial commits

---

## 📊 Monitoring

Untuk monitor cron job execution:

```bash
# Real-time log monitoring
tail -f logs/cron.log

# Check last deployment
tail -20 logs/auto-deploy.log
```

---

## 🔄 Manual Override

Jika perlu deploy artikel manual di luar jadwal:

1. **Update publishDate** di artikel ke hari ini
2. Jalankan script:
```bash
./scripts/auto-deploy-article.sh
```

Atau untuk test tanpa commit:
```bash
./scripts/test-auto-deploy.sh
```

---

## 📚 Referensi

- [Crontab Guru](https://crontab.guru/) - Helper untuk cron schedule
- [Git Documentation](https://git-scm.com/doc) - Git commands reference

