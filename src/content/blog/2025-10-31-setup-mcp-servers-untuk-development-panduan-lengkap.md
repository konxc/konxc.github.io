---
title: "Setup MCP Servers untuk Development: Panduan Lengkap Cursor & Claude Desktop"
description: "Panduan step-by-step setup MCP servers (GitHub, Memory Bank, Markdownify, Figma) di Cursor dan Claude Desktop. Pelajari konfigurasi, troubleshooting, dan best practices untuk meningkatkan produktivitas development dengan AI coding assistant."
publishDate: 2025-10-31
author: "Tim Koneksi"
category: "tutorial"
tags:
  [
    "mcp-server",
    "cursor",
    "claude",
    "development-tools",
    "ai-assistant",
    "productivity",
    "setup-guide",
    "github",
    "figma",
    "markdownify",
  ]
featured: true
readingTime: 15
coverImage: "/blog/mcp-servers-setup-hero.jpg"
interactiveDemos:
  [
    {
      id: "mcp-config-example",
      type: "code",
      title: "MCP Configuration Example",
      description: "Contoh konfigurasi lengkap untuk berbagai MCP servers",
      icon: "⚙️",
      featured: true,
      metadata: { tags: ["configuration", "example"], language: "json" },
    },
    {
      id: "setup-checklist",
      type: "visual",
      title: "Setup Checklist",
      description: "Visual checklist untuk memastikan semua MCP servers terpasang dengan benar",
      icon: "✅",
      featured: true,
      metadata: { tags: ["checklist", "verification"] },
    },
  ]
---

# Setup MCP Servers untuk Development: Panduan Lengkap Cursor & Claude Desktop

_Panduan komprehensif untuk setup MCP (Model Context Protocol) servers di Cursor dan Claude Desktop. Tingkatkan produktivitas development Anda dengan mengintegrasikan GitHub, Memory Bank, Markdownify, dan Figma tools ke dalam workflow coding Anda._

---

## Apa Itu MCP Server?

MCP (Model Context Protocol) Server adalah sistem yang memungkinkan AI coding assistant seperti Claude di Cursor atau Claude Desktop untuk berinteraksi dengan tools dan services eksternal secara lebih terintegrasi dan powerful.

### Keuntungan Menggunakan MCP Servers

1. **Akses ke Tools Eksternal** - GitHub, Figma, File System, dan lainnya
2. **Persistent Memory** - Memory Bank untuk menyimpan context project
3. **Enhanced Capabilities** - Kemampuan AI assistant menjadi lebih luas
4. **Better Integration** - Terintegrasi langsung dengan workflow development

---

## Prerequisites

Sebelum mulai setup, pastikan Anda memiliki:

- ✅ **Cursor IDE** atau **Claude Desktop** terinstall
- ✅ **GitHub Account** (untuk GitHub MCP server)
- ✅ **Figma Account** (untuk Figma MCP server, opsional)
- ✅ **Docker** terinstall (untuk beberapa MCP servers yang menggunakan container)
- ✅ **Node.js** terinstall (untuk MCP servers berbasis Node.js)

---

## Lokasi File Konfigurasi

MCP servers dikonfigurasi melalui file JSON:

### Cursor
```bash
# Linux/Mac
~/.cursor/mcp.json

# Windows
%APPDATA%\Cursor\mcp.json
```

### Claude Desktop
```bash
# Mac
~/Library/Application Support/Claude/claude_desktop_config.json

# Windows
%APPDATA%\Claude\claude_desktop_config.json
```

---

## Setup 1: GitHub MCP Server

GitHub MCP server memungkinkan AI assistant untuk berinteraksi dengan GitHub repository, membuat issues, PR, dan melakukan operasi Git lainnya.

### Langkah 1: Buat Personal Access Token (PAT)

1. Buka [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/personal-access-tokens/new)
2. Klik **"Generate new token (classic)"**
3. Beri nama: `Cursor MCP GitHub` atau `Claude MCP GitHub`
4. Pilih expiration: Sesuai kebutuhan (90 days atau No expiration)
5. **Pilih scopes:**
   - ✅ `repo` (akses repository, termasuk private repos)
   - ✅ `read:org` (membaca data organisasi)
   - ✅ `read:user` (membaca informasi profil user)
6. Klik **"Generate token"**
7. **Simpan token dengan aman** (hanya ditampilkan sekali!)

### Langkah 2: Konfigurasi di mcp.json

Tambahkan konfigurasi berikut:

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

**Atau menggunakan Docker langsung:**

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### Verifikasi

Setelah restart Cursor/Claude Desktop, coba prompt:
```
@github tolong list semua repository di akun GitHub saya
```

---

## Setup 2: Memory Bank MCP Server

Memory Bank memungkinkan AI assistant untuk menyimpan dan mengakses context project secara persistent.

### Langkah 1: Install Package

Memory Bank menggunakan package npm:
```bash
# Tidak perlu install manual, akan auto-install via npx
```

### Langkah 2: Tentukan Path Memory Bank

Buat folder untuk menyimpan memory bank:

```bash
# Opsi 1: Global memory bank (untuk semua project)
mkdir -p ~/.memory-bank

# Opsi 2: Per-project memory bank
mkdir -p /path/to/your/project/.memory-bank
```

### Langkah 3: Konfigurasi

```json
{
  "mcpServers": {
    "allpepper-memory-bank": {
      "command": "npx",
      "args": ["-y", "@allpepper/memory-bank-mcp"],
      "env": {
        "MEMORY_BANK_ROOT": "/home/user/.memory-bank"
      },
      "disabled": false,
      "autoApprove": [
        "memory_bank_read",
        "memory_bank_write",
        "memory_bank_update",
        "list_projects",
        "list_project_files"
      ]
    }
  }
}
```

**Catatan:** Ganti `/home/user/.memory-bank` dengan path absolut ke folder memory bank Anda.

### Verifikasi Path

Untuk memastikan path benar, gunakan:

```bash
# Dari dalam folder memory-bank
cd /path/to/memory-bank
pwd

# Output akan menampilkan path absolut yang benar
```

---

## Setup 3: Markdownify MCP Server

Markdownify MCP server dapat mengkonversi berbagai format file dan konten web ke Markdown.

### Langkah 1: Clone & Install

```bash
cd ~/tools  # atau lokasi lain yang Anda prefer
git clone https://github.com/zcaceres/markdownify-mcp.git
cd markdownify-mcp
pnpm install
pnpm run build
```

### Langkah 2: Install UV (Python Package Manager)

Markdownify menggunakan `uv` untuk Python dependencies:

```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Verifikasi installation
which uv
# Output: /home/user/.cargo/bin/uv atau /home/user/.local/bin/uv
```

### Langkah 3: Konfigurasi

```json
{
  "mcpServers": {
    "markdownify": {
      "command": "node",
      "args": [
        "/home/user/tools/markdownify-mcp/dist/index.js"
      ],
      "env": {
        "UV_PATH": "/home/user/.cargo/bin/uv"
      }
    }
  }
}
```

**Catatan:** Ganti path dengan lokasi install Anda:
- Path ke `dist/index.js`: Dari folder markdownify-mcp yang sudah di-build
- Path ke `uv`: Hasil dari `which uv`

---

## Setup 4: Figma MCP Server

Figma MCP server memungkinkan AI assistant untuk membaca dan memanipulasi design files dari Figma.

### Langkah 1: Dapatkan Figma Personal Access Token

1. Login ke [Figma](https://www.figma.com/)
2. Klik **avatar** di kanan atas → **Settings**
3. Pilih tab **Security**
4. Scroll ke **"Personal access tokens"**
5. Klik **"Generate new token"**
6. Beri nama: `MCP Server` atau `Cursor MCP`
7. Pilih scopes (minimal `File content` untuk read access)
8. Klik **"Generate token"**
9. **Simpan token** (format: `figd_xxxxxxxxxxxxxxxxxxxxxxxxxx`)

### Langkah 2: Konfigurasi

```json
{
  "mcpServers": {
    "Framelink MCP for Figma": {
      "command": "npx",
      "args": [
        "-y",
        "figma-developer-mcp",
        "--figma-api-key=figd_your_token_here",
        "--stdio"
      ]
    }
  }
}
```

**Catatan:** Ganti `figd_your_token_here` dengan token Figma yang Anda dapatkan.

---

## Setup 5: Verifikasi & Testing

Setelah setup semua MCP servers:

### 1. Restart Application

**Cursor:**
- Tutup aplikasi sepenuhnya
- Buka kembali Cursor

**Claude Desktop:**
- Quit aplikasi (Cmd+Q atau File → Quit)
- Buka kembali Claude Desktop

### 2. Check MCP Server Status

Di Cursor, buka MCP server logs atau console untuk melihat apakah semua servers terhubung dengan baik.

### 3. Test MCP Servers

Coba perintah berikut untuk test setiap server:

```bash
# Test GitHub
@github list repositories

# Test Memory Bank
@memory-bank list projects

# Test Markdownify (jika sudah di-setup)
# Test Figma
@figma get file information
```

---

## Troubleshooting Umum

### Issue 1: Docker Image Tidak Ditemukan

**Gejala:** Error `Unable to find image` untuk GitHub MCP server

**Solusi:**
- Docker akan auto-pull image saat pertama kali digunakan
- Jika masih error, coba manual pull:
```bash
docker pull ghcr.io/github/github-mcp-server
```

### Issue 2: Path Tidak Valid

**Gejala:** Error `No such file or directory` untuk Memory Bank atau Markdownify

**Solusi:**
1. Pastikan menggunakan **path absolut** (bukan relative)
2. Verifikasi path dengan `pwd` atau `readlink -f`
3. Pastikan folder benar-benar ada

### Issue 3: Permission Denied

**Gejala:** Error permission saat akses file atau folder

**Solusi:**
```bash
# Pastikan folder memiliki permission yang tepat
chmod -R 755 /path/to/memory-bank
```

### Issue 4: MCP Server Tidak Muncul

**Gejala:** MCP server tidak muncul di tools list setelah restart

**Solusi:**
1. Check syntax JSON (pastikan valid)
2. Check path command (pastikan executable ada di PATH)
3. Check environment variables
4. Lihat error logs di console

---

## Best Practices

### 1. Organisasi Path

Gunakan struktur yang konsisten:
```
~/
├── .memory-bank/          # Global memory bank
├── tools/
│   ├── markdownify-mcp/
│   └── other-tools/
└── projects/
    └── project-name/
        └── .memory-bank/  # Per-project memory
```

### 2. Security

- **Jangan commit** tokens ke repository
- Gunakan environment variables jika memungkinkan
- Rotate tokens secara berkala
- Gunakan scopes minimum yang diperlukan

### 3. Performance

- **Memory Bank**: Gunakan per-project untuk project besar, global untuk project kecil
- **GitHub MCP**: Cache hasil query jika memungkinkan
- **Figma MCP**: Limit query untuk menghindari rate limit

### 4. Maintenance

- Update MCP servers secara berkala
- Monitor usage dan performance
- Clean up memory bank yang tidak digunakan
- Review dan optimize konfigurasi

---

## Kesimpulan

Setup MCP servers akan meningkatkan kemampuan AI coding assistant Anda secara signifikan. Dengan akses ke GitHub, persistent memory, dan tools lainnya, Anda bisa bekerja lebih efisien dan produktif.

### Next Steps

Setelah setup dasar selesai, explore:
- [Serena MCP Server: Pengenalan dan Manfaat](/blog/serena-mcp-server-pengenalan-manfaat)
- [10 Use Case Praktis MCP Servers](/blog/10-use-case-mcp-servers)
- [Advanced MCP Configuration](/blog/advanced-mcp-configuration)

---

## Referensi

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [GitHub MCP Server](https://github.com/github/github-mcp-server)
- [Memory Bank MCP](https://github.com/allpepper/memory-bank-mcp)
- [Markdownify MCP](https://github.com/zcaceres/markdownify-mcp)
- [Figma Developer API](https://www.figma.com/developers/api)

---

**Ingin belajar lebih lanjut tentang development tools dan produktivitas?** Ikuti program **"Naik Kelas by Koneksi"** - pelatihan intensif untuk menjadi developer yang lebih produktif dan professional. [Daftar sekarang →](/waiting-list)

