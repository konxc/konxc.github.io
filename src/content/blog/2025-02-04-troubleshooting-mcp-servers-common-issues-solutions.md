---
title: "Troubleshooting MCP Servers: Common Issues & Solutions"
description: "Panduan troubleshooting lengkap untuk masalah umum saat setup dan menggunakan MCP servers (Serena, GitHub, Memory Bank, Figma, Markdownify). Pelajari cara membaca error logs, mengatasi masalah koneksi, dan verifikasi setup."
publishDate: 2025-11-14
author: "Tim Koneksi"
category: "tutorial"
tags:
  [
    "mcp-server",
    "troubleshooting",
    "debugging",
    "setup-guide",
    "error-handling",
    "serena",
    "github",
    "figma",
    "memory-bank",
  ]
featured: false
readingTime: 14
coverImage: "/blog/troubleshooting-mcp-hero.jpg"
interactiveDemos:
  [
    {
      id: "error-solutions",
      type: "code",
      title: "Common Error Solutions",
      description: "Kumpulan solusi untuk error-error umum MCP servers",
      icon: "🔧",
      featured: true,
      metadata: { tags: ["errors", "solutions"], language: "bash" },
    },
    {
      id: "troubleshooting-checklist",
      type: "visual",
      title: "Troubleshooting Checklist",
      description: "Visual checklist untuk debugging MCP server issues",
      icon: "✅",
      featured: true,
      metadata: { tags: ["checklist", "debugging"] },
    },
  ]
---

# Troubleshooting MCP Servers: Common Issues & Solutions

_Panduan troubleshooting lengkap untuk mengatasi masalah umum saat setup dan menggunakan MCP servers. Pelajari cara membaca error logs, mengatasi masalah koneksi Docker, path configuration, dan verifikasi setup._

---

## Checklist Troubleshooting Umum

Sebelum mulai troubleshoot, pastikan:

- ✅ MCP server sudah terkonfigurasi di `mcp.json`
- ✅ File konfigurasi JSON valid (no syntax errors)
- ✅ Application (Cursor/Claude Desktop) sudah di-restart setelah update config
- ✅ Dependencies terinstall (Docker, Node.js, uv, dll)
- ✅ Permissions folder/files sudah benar

---

## Issue 1: Docker Image Tidak Ditemukan

### Gejala

```
Error: Unable to find image 'ghcr.io/oraios/serena:latest' locally
Error: Unable to find image 'ghcr.io/github/github-mcp-server' locally
```

### Penyebab

Docker image belum ter-pull atau ada masalah koneksi ke container registry.

### Solusi

**Opsi 1: Biarkan Docker Auto-Pull (Recommended)**

Docker akan otomatis pull image saat pertama kali digunakan. Tunggu beberapa saat untuk download selesai.

**Opsi 2: Manual Pull**

```bash
# Untuk Serena
docker pull ghcr.io/oraios/serena:latest

# Untuk GitHub MCP
docker pull ghcr.io/github/github-mcp-server

# Verify
docker images | grep serena
docker images | grep github-mcp-server
```

**Opsi 3: Check Docker Service**

```bash
# Check Docker running
docker ps

# Jika error, start Docker service
# Linux
sudo systemctl start docker

# Mac (Docker Desktop)
# Buka Docker Desktop application
```

### Verifikasi

Setelah pull selesai, restart Cursor/Claude Desktop dan coba lagi.

---

## Issue 2: Path Tidak Valid (Memory Bank, Markdownify)

### Gejala

```
Error: No such file or directory: /path/to/memory-bank
Error: ENOENT: no such file or directory
```

### Penyebab

1. Path tidak absolut (menggunakan relative path)
2. Folder tidak ada
3. Path typo atau salah format

### Solusi

**Step 1: Verifikasi Path Absolut**

```bash
# Dari dalam folder yang ingin digunakan
cd /path/to/memory-bank
pwd

# Output: /home/user/.memory-bank (path absolut yang benar)
```

**Step 2: Pastikan Folder Ada**

```bash
# Jika belum ada, buat folder
mkdir -p /home/user/.memory-bank

# Verify
ls -la /home/user/.memory-bank
```

**Step 3: Update Config dengan Path Absolut**

```json
{
  "mcpServers": {
    "allpepper-memory-bank": {
      "env": {
        "MEMORY_BANK_ROOT": "/home/user/.memory-bank" // Pastikan absolut
      }
    }
  }
}
```

**Tips:**

- Jangan gunakan `~/` atau `$HOME`, gunakan path absolut lengkap
- Jangan gunakan trailing slash (`/memory-bank/` → `/memory-bank`)

---

## Issue 3: Permission Denied

### Gejala

```
Error: EACCES: permission denied
Error: Permission denied
```

### Penyebab

Folder atau file tidak memiliki permission yang tepat untuk dibaca/ditulis.

### Solusi

```bash
# Berikan permission yang tepat
chmod -R 755 /path/to/memory-bank

# Atau untuk user-specific
chown -R $USER:$USER /path/to/memory-bank
chmod -R 755 /path/to/memory-bank

# Verify
ls -la /path/to/memory-bank
```

### Prevention

Pastikan folder dibuat dengan permission yang tepat sejak awal:

```bash
mkdir -p ~/.memory-bank
chmod 755 ~/.memory-bank
```

---

## Issue 4: MCP Server Tidak Muncul di Tools List

### Gejala

Setelah restart, MCP server tidak muncul atau tidak bisa digunakan.

### Penyebab

1. JSON syntax error di config
2. Command path salah atau executable tidak ada
3. Environment variables tidak set
4. MCP server belum fully initialized

### Solusi

**Step 1: Validasi JSON Syntax**

```bash
# Check JSON validity
cat ~/.cursor/mcp.json | python3 -m json.tool

# Jika ada error, akan menunjukkan line yang bermasalah
```

**Step 2: Check Command Path**

```bash
# Untuk npx-based servers (auto-install, biasanya OK)
which npx

# Untuk node-based servers
which node
node --version

# Untuk docker-based servers
which docker
docker --version
```

**Step 3: Check Environment Variables**

Pastikan semua env vars di config sudah benar:

```json
{
  "mcpServers": {
    "github": {
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxx" // Pastikan tidak kosong
      }
    },
    "allpepper-memory-bank": {
      "env": {
        "MEMORY_BANK_ROOT": "/path/to/memory-bank" // Pastikan absolut dan ada
      }
    }
  }
}
```

**Step 4: Check MCP Server Logs**

Di Cursor:

- Buka Developer Tools atau MCP logs
- Cari error messages spesifik

**Step 5: Restart Application**

Setelah fix config:

1. Quit application sepenuhnya (tidak hanya close window)
2. Buka kembali
3. Tunggu MCP servers initialize (bisa 10-30 detik)

---

## Issue 5: GitHub MCP - Authentication Error

### Gejala

```
Error: Bad credentials
Error: 401 Unauthorized
```

### Penyebab

1. Token tidak valid atau expired
2. Token tidak memiliki scopes yang cukup
3. Token typo atau salah copy-paste

### Solusi

**Step 1: Verify Token Format**

GitHub PAT format: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxx` (prefix `ghp_` + 36 chars)

**Step 2: Check Token Scopes**

Pastikan token memiliki scopes:

- `repo` (atau minimal `public_repo`)
- `read:user`
- `read:org` (jika perlu)

**Step 3: Generate New Token**

Jika token tidak valid:

1. Buka [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/personal-access-tokens)
2. Revoke token lama (jika perlu)
3. Generate token baru dengan scopes yang tepat
4. Update di `mcp.json`

**Step 4: Test Token**

```bash
# Test token dengan curl
curl -H "Authorization: token ghp_your_token" https://api.github.com/user

# Jika valid, akan return user info
# Jika invalid, akan return error
```

---

## Issue 6: Figma MCP - API Key Error

### Gejala

```
Error: Invalid API key
Error: 401 Unauthorized
```

### Penyebab

1. Figma token tidak valid
2. Token expired atau revoked
3. Token format salah

### Solusi

**Step 1: Verify Token Format**

Figma token format: `figd_xxxxxxxxxxxxxxxxxxxxxxxxxx`

**Step 2: Generate New Token**

1. Login ke [Figma](https://www.figma.com/)
2. Settings → Security → Personal access tokens
3. Generate new token
4. Update di config:

```json
{
  "mcpServers": {
    "Framelink MCP for Figma": {
      "args": [
        "-y",
        "figma-developer-mcp",
        "--figma-api-key=figd_your_new_token_here", // Update di sini
        "--stdio"
      ]
    }
  }
}
```

**Step 3: Verify Token Permissions**

Pastikan token memiliki permission untuk:

- Read file content (minimal untuk MCP server)

---

## Issue 7: Markdownify - UV Path Not Found

### Gejala

```
Error: UV_PATH not found
Error: uv: command not found
```

### Penyebab

`uv` (Python package manager) belum terinstall atau tidak ada di PATH.

### Solusi

**Step 1: Install UV**

```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Verify installation
which uv
# Output: /home/user/.cargo/bin/uv atau /home/user/.local/bin/uv
```

**Step 2: Update Config dengan Path yang Benar**

```json
{
  "mcpServers": {
    "markdownify": {
      "env": {
        "UV_PATH": "/home/user/.cargo/bin/uv" // Path dari 'which uv'
      }
    }
  }
}
```

**Step 3: Alternative - Add to PATH**

Jika ingin gunakan PATH, pastikan `uv` ada di PATH:

```bash
# Add to ~/.bashrc atau ~/.zshrc
export PATH="$HOME/.cargo/bin:$PATH"

# Reload
source ~/.bashrc  # atau source ~/.zshrc
```

---

## Issue 8: Serena - Docker Volume Mount Error

### Gejala

```
Error: Cannot access /path/to/projects: No such file or directory
```

### Penyebab

Path untuk volume mount tidak valid atau tidak ada.

### Solusi

**Step 1: Verify Project Path**

```bash
# Pastikan path project benar
cd /path/to/your/project
pwd

# Output: /home/user/projects/my-project
```

**Step 2: Check Path Format**

Pastikan menggunakan path absolut (bukan relative):

```json
{
  "mcpServers": {
    "serena": {
      "args": [
        "-v",
        "/home/user/projects/my-project:/workspaces/projects" // Absolut path
      ]
    }
  }
}
```

**Step 3: Check Permissions**

```bash
# Pastikan folder bisa diakses
ls -la /path/to/your/project

# Jika perlu, fix permissions
chmod -R 755 /path/to/your/project
```

---

## Issue 9: MCP Server Timeout atau Hang

### Gejala

MCP server tidak merespons atau timeout saat digunakan.

### Penyebab

1. Server sedang loading atau initializing
2. Network issues (untuk remote servers)
3. Resource constraints (memory, CPU)
4. Server crash atau error

### Solusi

**Step 1: Check Server Status**

Lihat logs untuk melihat apakah server masih running atau ada error.

**Step 2: Restart Server**

1. Restart application (Cursor/Claude Desktop)
2. Tunggu MCP servers initialize (bisa 30-60 detik untuk pertama kali)

**Step 3: Check Resource Usage**

```bash
# Check Docker container resource
docker stats

# Check system resources
top
# atau
htop
```

**Step 4: Simplify Config**

Jika ada banyak MCP servers, coba disable beberapa untuk isolate masalah:

```json
{
  "mcpServers": {
    "serena": {
      "disabled": false // Test satu per satu
    },
    "github": {
      "disabled": true // Temporary disable
    }
  }
}
```

---

## Issue 10: Tools Tidak Muncul atau Tidak Bisa Dipanggil

### Gejala

MCP server connected tapi tools tidak muncul atau tidak bisa dipanggil.

### Penyebab

1. Tools belum ter-expose di MCP server
2. MCP server version berbeda
3. Compatibility issues

### Solusi

**Step 1: Check MCP Server Logs**

Lihat logs untuk melihat tools yang ter-expose:

```
INFO - Starting MCP server with 28 tools: ['read_file', 'find_symbol', ...]
```

**Step 2: Check Server Version**

Pastikan menggunakan versi terbaru:

```bash
# Untuk Serena (Docker)
docker pull ghcr.io/oraios/serena:latest

# Untuk GitHub MCP
docker pull ghcr.io/github/github-mcp-server
```

**Step 3: Verify Tool Names**

Pastikan menggunakan nama tool yang benar. Cek dokumentasi MCP server untuk daftar tools yang tersedia.

---

## Verifikasi Setup

Setelah fix semua issues, verifikasi setup:

### Checklist Verifikasi

```bash
# 1. Docker running
docker ps

# 2. MCP config valid
cat ~/.cursor/mcp.json | python3 -m json.tool

# 3. Paths valid
ls -la /path/to/memory-bank
ls -la /path/to/markdownify-mcp/dist/index.js

# 4. Tokens valid
# Test GitHub token
curl -H "Authorization: token ghp_xxx" https://api.github.com/user

# 5. Tools accessible
# Test di Cursor/Claude Desktop dengan command sederhana
```

### Test Commands

Setelah setup, test dengan perintah sederhana:

```
# Test GitHub
@github list repositories

# Test Memory Bank
@memory-bank list projects

# Test Serena
@serena list_dir relative_path="."
```

---

## Debugging Tips

### 1. Enable Verbose Logging

Beberapa MCP servers support verbose logging. Check dokumentasi masing-masing server.

### 2. Check Application Logs

- **Cursor:** Developer Tools atau MCP server logs
- **Claude Desktop:** Console atau log files

### 3. Test dengan Simple Commands

Mulai dengan command sederhana untuk isolate masalah:

```
# Simple test
@serena list_dir relative_path="."
```

### 4. Isolate Issues

Jika ada multiple MCP servers, disable semua kecuali satu untuk isolate masalah:

```json
{
  "mcpServers": {
    "serena": {
      "disabled": false
    },
    "github": {
      "disabled": true // Temporary
    }
  }
}
```

### 5. Check Dependencies

Pastikan semua dependencies terinstall:

```bash
# Node.js
node --version

# Docker
docker --version

# uv (untuk Markdownify)
uv --version

# pnpm/npm
pnpm --version
```

---

## Getting Help

Jika masih mengalami masalah:

1. **Check Documentation** - Dokumentasi resmi MCP server
2. **GitHub Issues** - Search atau buat issue di repository MCP server
3. **Community** - MCP community atau Discord/Slack channels
4. **Logs** - Selalu sertakan error logs saat minta bantuan

---

## Kesimpulan

Sebagian besar masalah MCP servers bisa diselesaikan dengan:

1. ✅ Validasi JSON config
2. ✅ Verifikasi paths (harus absolut)
3. ✅ Check permissions
4. ✅ Verify tokens/credentials
5. ✅ Restart application setelah perubahan
6. ✅ Check logs untuk error spesifik

### Next Steps

- [Setup MCP Servers untuk Development](/blog/setup-mcp-servers-untuk-development-panduan-lengkap)
- [Serena MCP Server: Pengenalan dan Manfaat](/blog/serena-mcp-server-pengenalan-dan-manfaat)
- [Panduan Lengkap Cara Menggunakan Serena](/blog/panduan-lengkap-cara-menggunakan-serena-mcp-server)

---

**Ingin belajar lebih lanjut tentang development tools dan troubleshooting?** Bergabunglah dengan program **"Naik Kelas by Koneksi"** untuk pelatihan intensif. [Daftar sekarang →](/waiting-list)
