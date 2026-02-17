# 🤖 AI Article Generation Prompt Template

Panduan untuk menggunakan AI Assistant (Cursor/Claude) untuk membuat artikel blog dari session/conversation yang sudah dilakukan, bahkan jika sedang bekerja di codebase yang berbeda.

## 🎯 Tujuan

Template prompt ini dirancang untuk:

- **Merekap pengetahuan** dari session development yang sudah dilakukan
- **Membuat artikel** yang bisa dibaca ulang oleh tim atau publik
- **Menghasilkan konten edukatif** untuk blog Koneksi
- **Mengikuti schema** blog collection yang sudah ditetapkan
- **Bisa digunakan dari codebase manapun** (tidak harus dari konxc.github.io)

## 📋 Prompt Template

Gunakan prompt berikut ini setiap kali ingin membuat artikel dari session/conversation yang sudah dilakukan:

```markdown
Saya ingin membuat artikel blog untuk Koneksi berdasarkan session/conversation yang baru saja kita lakukan.

**Context:**

- [Jelaskan topik atau masalah yang dibahas]
- [Apa yang sudah kita kerjakan/selesaikan]
- [Teknologi atau konsep yang dipelajari]
- [Masalah yang dihadapi dan solusinya]

**Requirements:**

1. Buat artikel dalam format Markdown dengan frontmatter YAML sesuai schema blog collection Koneksi
2. Artikel harus bisa dibaca sebagai bahan belajar oleh tim atau publik
3. Include:
   - Penjelasan konseptual yang mudah dipahami
   - Step-by-step tutorial jika ada proses praktis
   - Code examples jika relevan
   - Best practices dan lessons learned
   - FAQ jika ada pertanyaan penting yang muncul
4. Gunakan bahasa Indonesia
5. Ikuti style dan format dari artikel yang sudah ada di `/home/dev/web/koneksi/konxc.github.io/src/content/blog/`
6. Pastikan frontmatter sesuai dengan schema di `/home/dev/web/koneksi/konxc.github.io/src/content/config.ts`

**Schema Requirements:**

- title: string (required)
- description: string (required)
- publishDate: date (optional, default: new Date())
- author: string (optional, default: "Unknown Author")
- category: enum["business", "technical", "case-study", "tutorial", "insights", "testing"] (optional, default: "technical")
- tags: string[] (optional, default: [])
- featured: boolean (optional, default: false)
- readingTime: number (optional, default: 5)
- coverImage: string (optional)
- image: string (optional)
- views: number (optional, default: 0)
- series: string (optional)
- seriesOrder: number (optional, default: 0)
- interactiveDemos: array (optional, default: [])

**Output Location:**
Simpan artikel di: `/home/dev/web/koneksi/konxc.github.io/src/content/blog/[DATE]-[SLUG].md`

Format nama file: `YYYY-MM-DD-kebab-case-slug.md`

Silakan buatkan artikel yang komprehensif berdasarkan conversation kita!
```

## 📝 Contoh Penggunaan

### Contoh 1: Setelah Selesai Refactoring

```markdown
Saya ingin membuat artikel blog untuk Koneksi berdasarkan session/conversation yang baru saja kita lakukan.

**Context:**

- Kita baru saja memindahkan route `waiting-list` dari group `(public)` ke `(auth)` di SvelteKit
- Menggunakan Git worktree untuk isolasi perubahan
- Menghadapi error "Cannot prerender pages with actions"
- Menyelesaikan merge dari worktree branch ke main

**Requirements:**
[Gunakan template requirements di atas]

Silakan buatkan artikel case study yang menceritakan proses ini dengan detail!
```

### Contoh 2: Setelah Belajar Konsep Baru

```markdown
Saya ingin membuat artikel blog untuk Koneksi berdasarkan session/conversation yang baru saja kita lakukan.

**Context:**

- Kita membahas tentang Git worktree secara mendalam
- Membahas perbedaan dengan git checkout tradisional
- Memahami kapan branch remote masih diperlukan
- Mengetahui alasan worktree harus dihapus manual

**Requirements:**
[Gunakan template requirements di atas]

Silakan buatkan beberapa artikel edukatif yang menjelaskan konsep-konsep ini:

1. Tutorial praktis workflow worktree
2. Penjelasan konseptual tentang branch remote
3. Penjelasan mengapa worktree perlu manual cleanup
```

## 🎨 Tips untuk Hasil Terbaik

### 1. Berikan Context yang Jelas

- Jelaskan apa yang dikerjakan
- Sebutkan teknologi yang digunakan
- Highlight masalah unik yang dihadapi
- Mention solusi atau pembelajaran penting

### 2. Tentukan Kategori yang Tepat

- **tutorial**: Untuk step-by-step guides
- **technical**: Untuk penjelasan konsep teknikal
- **case-study**: Untuk cerita implementasi nyata
- **insights**: Untuk pembelajaran dan best practices
- **testing**: Untuk materi tentang testing

### 3. Tentukan Target Audience

- **Tim internal**: Focus pada workflow dan best practices tim
- **Publik**: Focus pada edukasi dan value proposition

### 4. Include Interactive Elements (Opsional)

Jika ada code examples atau demos yang relevan:

```yaml
interactiveDemos: [
    {
      id: "demo-id",
      type: "code", # atau "visual", "interactive"
      title: "Demo Title",
      description: "Description",
      icon: "💻",
      featured: true,
      metadata: { tags: ["example"], language: "bash" },
    },
  ]
```

## 📂 Output Format

Artikel akan dibuat dengan struktur:

```markdown
---
title: "Judul Artikel"
description: "Deskripsi singkat artikel"
publishDate: 2025-01-30
author: "Nama Author"
category: "tutorial" # atau technical, case-study, dll
tags: ["tag1", "tag2"]
featured: false
readingTime: 10
---

# Judul Artikel

Introduction...

## Section 1

Content...

## Section 2

Content...

## Kesimpulan

Conclusion...
```

## 🔄 Workflow Penggunaan

1. **Selesaikan session/conversation** dengan AI Assistant
2. **Review conversation** untuk mengidentifikasi poin-poin penting
3. **Copy prompt template** di atas
4. **Fill in context** dengan detail dari session
5. **Paste ke Cursor/Claude** dalam mode chat
6. **Review artikel** yang dihasilkan
7. **Edit jika perlu** untuk penyesuaian style atau konten
8. **Commit dan push** ke repository

## 📚 Referensi

- **Blog Schema**: `/home/dev/web/koneksi/konxc.github.io/src/content/config.ts`
- **Existing Articles**: `/home/dev/web/koneksi/konxc.github.io/src/content/blog/`
- **Content Guide**: `docs/content-management/CONTENT_MANAGEMENT_GUIDE.md`

## ⚠️ Catatan Penting

1. **Tidak perlu berada di codebase konxc.github.io** - prompt ini bisa digunakan dari codebase manapun
2. **Gunakan absolute paths** untuk referensi file schema dan existing articles
3. **Review hasil artikel** sebelum commit - AI bisa membuat kesalahan atau miss nuance
4. **Cek schema compliance** - pastikan frontmatter sesuai dengan schema definition
5. **Adjust reading time** - biasanya ~200 words per minute, calculate berdasarkan word count

## 🎯 Variasi Prompt untuk Use Case Berbeda

### Untuk Multiple Articles dari Satu Session

```markdown
Berdasarkan session kita, buatkan [N] artikel yang mencakup:

1. [Topik artikel 1]
2. [Topik artikel 2]
3. [Topik artikel 3]

[Gunakan requirements template yang sama]

Masing-masing artikel harus standalone tapi bisa saling reference jika relevan.
```

### Untuk Series Articles

```markdown
Buatkan artikel sebagai bagian dari series "[Series Name]":

[Artikel spesifik ini]

Include:

- series: "[Series Name]"
- seriesOrder: [angka urutan]

Pastikan artikel ini bisa dibaca standalone tapi juga mengacu ke artikel lain dalam series jika ada.
```

### Untuk Quick Reference/Cheat Sheet

```markdown
Buatkan artikel quick reference/cheat sheet yang fokus pada:

- Commands yang sering digunakan
- Common patterns
- Quick troubleshooting

Format: Lebih concise, lebih banyak code examples, less narrative.
```

---

**Last Updated:** 2025-01-30  
**Maintained by:** Tim Koneksi  
**Location:** `/home/dev/web/koneksi/konxc.github.io/docs/content-management/AI_ARTICLE_GENERATION_PROMPT.md`

## buatkan saya prompt yang dapat saya gunakan berulang untuk meminta anda merekap apa saja yang telah kita kerjakan dalam bentuk artikel yang dapat dibaca ulang oleh tim ataupun publik sebagai konten bahan belajar di blog koneksi dengan alamat dan schema collection koneksi yang kita miliki meskipun kita prompting dari codebase yang berbeda, simpan prompt tersebut di dokumentasi codebase halaman web koneksi

---

informasi ini benar-benar mindblowing bagi saya, buatkan menjadi beberapa artikel untuk koneksi yang dapat saya baca-baca ulang yang bisa menjelaskan apa saja yang sudah kita lakukan dan butuh lakukan jika ingin "apply" worktree tersebut ke checkout atau branch utama atau tertentu, dan buatkan juga artikel yang menjawab pertanyaan saya, tidak terpaku hanya 2 artikel ya, silahkan berapapun artikel boleh, baca config.ts untuk melihat schema collecton blog nya
