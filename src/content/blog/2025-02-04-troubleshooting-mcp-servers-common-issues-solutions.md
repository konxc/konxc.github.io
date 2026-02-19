---
title: "Mastering MCP: Panduan Definitif Troubleshooting untuk Developer"
description: "Jangan biarkan error teknis menghambat produktivitas Anda. Temukan solusi mendalam untuk masalah Dockerimage, path configuration, hingga problem autentikasi pada MCP servers dengan pendekatan diagnosa profesional."
publishDate: 2025-02-04
author: "Tim Koneksi"
category: "devops"
tags: ["mcp-troubleshooting", "system-debugging", "ai-infrastructure", "error-recovery"]
featured: false
readingTime: 16
coverImage: "/images/blog/mcp-troubleshooting.png"
interactiveDemos:
  - id: "error-solutions"
    type: "code"
    title: "Diagnostic & Recovery Scripts"
    description: "Kumpulan perintah recovery untuk memulihkan state MCP server yang bermasalah"
    icon: "🛠️"
    featured: true
    content: |
      # 1. Reset Docker State (Jika Image Corrupt)
      docker system prune -f && docker pull ghcr.io/oraios/serena:latest

      # 2. Fix Permission & Path Absolut (Linux/macOS)
      # Ganti path sesuai dengan MEMORY_BANK_ROOT Anda
      MB_PATH="/home/$USER/.memory-bank"
      mkdir -p "$MB_PATH" && chmod -R 755 "$MB_PATH" && chown -R $USER:$USER "$MB_PATH"

      # 3. Validasi JSON Config (Cursor/Claude)
      # Menemukan trailing comma atau syntax error yang sering luput
      python3 -m json.tool ~/.cursor/mcp.json > /dev/null && echo "✅ Config Valid" || echo "❌ Config Invalid"
  - id: "troubleshooting-checklist"
    type: "visual"
    title: "The Zero-Downtime Debug Flow"
    description: "Metodologi eliminasi masalah untuk mengidentifikasi bottleneck secara sistematis"
    content: |
      # Strategi Eliminasi Diagnostik
      - Layer 1: Infrastruktur (Apakah Docker daemon aktif? Apakah Node.js terbaca di PATH?)
      - Layer 2: Konfigurasi (Verifikasi JSON syntax & validasi Path Absolut)
      - Layer 3: Kredensial (Cek expiry date GitHub/Figma PAT & Scopes permission)
      - Layer 4: Environment (Pastikan variabel seperti MEMORY_BANK_ROOT sudah didefinisikan dengan benar)
      - Layer 5: Runtime (Restart aplikasi secara 'Hard Quit', bukan sekadar menutup jendela)
    icon: "🎯"
    featured: true
---

# Mastering MCP: Panduan Definitif Troubleshooting untuk Developer

Sebagai developer, mengadopsi **Model Context Protocol (MCP)** adalah langkah besar menuju efisiensi masa depan. Namun, kita semua tahu bahwa di balik kecanggihan AI coding assistant, terdapat lapisan infrastruktur yang terkadang bisa menjadi penghalang utama jika tidak dikonfigurasi dengan presisi.

Troubleshooting bukan sekadar mencari pesan error di Google; ini adalah seni **eliminasi masalah**. Artikel ini disusun berdasarkan pengalaman tim engineering kami dalam menangani berbagai skenario setup MCP servers (Serena, GitHub, Memory Bank, hingga Figma) untuk memastikan alur kerja Anda tetap tidak terinterupsi.

---

## 🛠️ Filosofi Pertama: Checklist Pra-Diagnosa

Sebelum menyelam ke masalah spesifik, selalu mulai dengan verifikasi fundamental. Seringkali, masalah bukan terletak pada kode server, melainkan pada environment tempat ia berjalan.

1.  **JSON Integrity**: Satu koma yang berlebih (*trailing comma*) di `mcp.json` dapat melumpuhkan seluruh sistem.
2.  **The "Hard Restart" Rule**: Menutup jendela Cursor atau Claude tidak cukup. Pastikan Anda melakukan *Quit* sepenuhnya agar proses background server benar-benar terhenti dan dimuat ulang.
3.  **Absolute Path Over Everything**: AI agent seringkali gagal menginterpretasikan simbol `~/` atau variabel lokal. Gunakan path absolut (seperti `/home/user/...`) untuk semua referensi folder.

---

## 🏗️ Kategori 1: Isu Kontainerisasi (Docker Image)

Bagi pengguna **Serena** atau **GitHub MCP**, Docker adalah fondasi utama. Masalah paling umum biasanya berkaitan dengan ketersediaan image.

### Skenario: "Unable to find image locally"
Pesan ini menandakan Docker tidak dapat menemukan image yang Anda referensikan. 

*   **Penyebab Tersembunyi**: Terkadang container registry (seperti GHCR) sedang mengalami limitasi atau Anda belum melakukan autentikasi ke registry tersebut.
*   **Solusi Professional**: Lakukan manual pull untuk memastikan image benar-benar ada di mesin lokal Anda sebelum dijalankan oleh MCP client.
    ```bash
    docker pull ghcr.io/oraios/serena:latest
    ```
*   **Pro Tip**: Jika Anda menggunakan Linux, pastikan Docker daemon dapat berjalan tanpa `sudo`. Gunakan perintah `sudo usermod -aG docker $USER` untuk kenyamanan development jangka panjang.

---

## 📁 Kategori 2: Path & Direktori (Memory Bank & Markdownify)

Memory Bank adalah tool krusial untuk menjaga konteks artikel, namun ia sangat sensitif terhadap lokasi penyimpanan.

### Problem: ENOENT atau "No such file or directory"
Masalah ini sering muncul pada tool seperti **Markdownify** atau server yang memerlukan akses file lokal.

*   **Solusi Diagnostik**:
    AI tidak bisa menebak di mana folder Anda berada. JIka Anda mengatur `MEMORY_BANK_ROOT`, pastikan folder tersebut sudah ada secara fisik.
    ```bash
    # Langkah Validasi Cepat
    [ -d "/path/to/your/folder" ] && echo "Folder exists" || mkdir -p "/path/to/your/folder"
    ```
*   **Catatan Penting untuk Windows Subsystem for Linux (WSL)**: Jika menjalankan Cursor di Windows namun MCP di WSL, pastikan path yang digunakan adalah path mount point `/mnt/c/...` yang konsisten.

---

## 🔐 Kategori 3: Kredensial & Autentikasi (GitHub & Figma)

Kesalahan pada layer autentikasi biasanya paling sulit dideteksi karena seringkali "Silent Error"—server terlihat tersambung tapi tool tidak berfungsi.

### Skenario: 401 Unauthorized / Bad Credentials
Ini adalah musuh utama bagi pengguna integrasi GitHub.

*   **Scope Permission**: Saat membuat *Personal Access Token (PAT)*, pastikan minimal memiliki scope `repo` untuk akses repository privat dan `read:user`. Menggunakan token tanpa scope yang tepat akan membuat server gagal memuat daftar file.
*   **Token Expiry**: Token GitHub default biasanya expire dalam 30 hari. Jika tiba-tiba MCP berhenti bekerja tanpa perubahan config, periksa tanggal pembuatan token Anda di dashboard GitHub.

---

## 🚀 Optimasi Performa: Mengatasi Lag & Timeout

Terkadang MCP server berhasil terhubung, namun responsnya memakan waktu lebih dari 30 detik sehingga AI membatalkan proses.

### Mengapa Hal Ini Terjadi?
1.  **Cold Start Docker**: Container yang tidak aktif memerlukan waktu untuk boot.
2.  **Resource Throttling**: Jika Anda menjalankan banyak container sekaligus, RAM mesin Anda mungkin menjadi bottleneck.

### Strategi Perbaikan:
*   **Isolation Test**: Nonaktifkan (*disable*) satu per satu server di konfigurasi JSON Anda untuk melihat server mana yang menyebabkan lag masif.
*   **Docker Stats**: Selalu pantau konsumsi resource dengan perintah `docker stats`. Jika Serena atau server lain memakan memori di atas 500MB tanpa aktivitas, pertimbangkan untuk me-restart Docker service.

---

## 🔍 Debugging Tingkat Lanjut (Verbose Logging)

Jika semua langkah di atas gagal, saatnya melihat apa yang terjadi di "bawah kap."

*   **Akses Developer Tools**: Di dalam Cursor, Anda dapat menekan `Shift + Cmd + P` lalu cari "Toggle Developer Tools". Lihat di tab Console untuk melihat pesan error yang dikirimkan oleh process MCP.
*   **Stdio Tracking**: Karena MCP berkomunikasi lewat Standard I/O, pastikan tidak ada kode di dalam server Anda yang melakukan `console.log` sembarangan, karena ini bisa merusak komunikasi JSON-RPC antara client dan server.

---

## 💡 Kesimpulan: Mentalitas "Battle-Tested"

Troubleshooting MCP servers adalah bagian dari perjalanan menjadi developer yang lebih andal. Kuncinya adalah **presisi pada detail**. Jangan pernah meremehkan satu spasi di path atau satu karakter di token API.

Dengan mengikuti panduan ini, Anda tidak hanya memperbaiki error, tetapi juga membangun sistem yang lebih tangguh dan siap untuk menangani beban tugas development yang lebih berat.

### Langkah Selanjutnya:
*   [Setup MCP Servers untuk Development: Panduan Lengkap](/blog/2025-01-31-setup-mcp-servers-untuk-development-panduan-lengkap)
*   [Serena MCP Server: Pengenalan dan Manfaat](/blog/2025-02-01-serena-mcp-server-pengenalan-dan-manfaat)
*   [Panduan Lengkap Cara Menggunakan Serena](/blog/2025-02-03-panduan-lengkap-cara-menggunakan-serena-mcp-server)

---

**Ingin meningkatkan skill development tools Anda ke level expert?** Bergabunglah dengan komunitas eksklusif kami dan dapatkan wawasan terbaru langsung di inbox Anda. [Dapatkan Update Eksklusif →](/blog)
