---
title: "Panduan Lengkap: Cara Menggunakan Serena MCP Server untuk Coding Tasks"
description: "Panduan praktis step-by-step menggunakan Serena MCP Server dengan 10 contoh perintah konkret. Pelajari tips dan best practices untuk memaksimalkan produktivitas development dengan semantic code analysis."
publishDate: 2025-02-03
author: "Tim Koneksi"
category: "ai"
tags: ["ai-tutorial", "mcp-server-guide", "coding-automation", "developer-workflow"]
featured: true
readingTime: 16
coverImage: "/images/blog/serena-guide-final.png"
interactiveDemos:
  - id: "command-examples"
    type: "code"
    title: "Serena Command Examples"
    description: "Kumpulan contoh perintah praktis untuk berbagai use cases"
    icon: "💻"
    featured: true
    metadata: { tags: ["commands", "examples"], language: "markdown" }
  - id: "workflow-diagram"
    type: "visual"
    title: "Serena Workflow Diagram"
    description: "Visualisasi workflow menggunakan Serena untuk development tasks"
    content: |
      # Development Workflow with Serena
      - Request: User memberikan instruksi natural language (e.g. 'Refactor dashboard component')
      - Analysis: Serena melakukan semantic search untuk memahami konteks codebase
      - Proposal: Serena memberikan saran perubahan atau dokumentasi
      - Feedback: User mereview dan memberikan instruksi tambahan jika perlu
      - Execution: Serena meneraplan perubahan secara akurat berdasarkan pemahaman struktur kode
    icon: "🔄"
    featured: true
    metadata: { tags: ["workflow", "visualization"] }
---

# Panduan Lengkap: Cara Menggunakan Serena MCP Server untuk Coding Tasks

_Panduan praktis step-by-step untuk menggunakan Serena MCP Server dalam development tasks sehari-hari. Pelajari 10 contoh perintah konkret, tips penggunaan, dan best practices untuk memaksimalkan produktivitas._

---

## Memulai dengan Serena

Setelah Serena MCP server terpasang dan terkonfigurasi (lihat [setup guide](/blog/setup-serena-mcp-docker)), Anda bisa mulai menggunakannya langsung di Cursor atau Claude Desktop.

### Cara Mengakses Serena

**Di Cursor:**
- Type `@serena` di chat untuk mention Serena tools
- Atau langsung describe task - Cursor akan otomatis suggest Serena tools

**Di Claude Desktop:**
- Serena tools akan muncul di tools list
- Mention dalam conversation untuk mengaktifkan

---

## 10 Contoh Perintah Praktis

### 1. Menemukan Semua Penggunaan Component

**Use Case:** Ingin menemukan semua file yang menggunakan `Button` component.

**Perintah:**
```
Tolong cari semua file yang menggunakan Button component dari src/lib/components/ui/Button.svelte
```

**Atau lebih spesifik:**
```
Serena, cari semua referensi ke Button component yang ada di src/lib/components/ui/Button.svelte
```

**Tools yang digunakan:**
- `find_referencing_symbols` → Daftar semua file yang import/menggunakan Button

**Output yang diharapkan:**
- List semua files yang menggunakan Button
- Line numbers di mana Button digunakan
- Context code di sekitar usage

---

### 2. Rename Component dengan Aman

**Use Case:** Mengubah nama `AuthSubmitButton` menjadi `SubmitButton` di seluruh codebase.

**Perintah:**
```
Saya ingin rename component AuthSubmitButton menjadi SubmitButton di semua file yang menggunakannya.
Gunakan Serena untuk melakukan refactoring ini dengan aman.
```

**Tools yang digunakan:**
1. `find_symbol` → Cari `AuthSubmitButton`
2. `find_referencing_symbols` → Temukan semua usage
3. `rename_symbol` → Rename dengan update semua referensi
4. Auto-update imports dan file references

**Hasil:** Semua references ter-update otomatis, tidak ada yang terlewat.

---

### 3. Menambahkan Prop Baru ke Component

**Use Case:** Menambahkan prop `size` ke Button component yang sudah digunakan di banyak tempat.

**Perintah:**
```
Tolong tambahkan prop 'size' dengan type 'sm' | 'md' | 'lg' (default 'md') ke Button component di src/lib/components/ui/Button.svelte.
Prop ini harus diterapkan ke styling button (padding dan font-size).
Pastikan semua file yang menggunakan Button tidak rusak.
```

**Tools yang digunakan:**
1. `read_file` → Baca current Button implementation
2. `find_referencing_symbols` → Cari semua usage
3. `replace_symbol_body` → Update Button dengan prop baru
4. Verify semua call sites masih valid

**Hasil:**
```svelte
// Button.svelte - AFTER
<script lang="ts">
  const {
    variant = 'primary',
    size = 'md',  // NEW PROP
    type = 'button',
    // ...
  } = $props<{
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';  // NEW TYPE
    // ...
  }>();
</script>
```

---

### 4. Extract Function dari Code Duplication

**Use Case:** Mengekstrak logic format currency yang tersebar menjadi utility function.

**Perintah:**
```
Saya melihat ada beberapa tempat di codebase yang memformat currency dengan cara manual.
Tolong:
1. Cari semua tempat yang format currency (pakai pattern seperti "Rp", "IDR", atau rupiah)
2. Buat utility function formatCurrency di src/lib/utils/currency.ts
3. Replace semua usage manual dengan function baru ini
```

**Tools yang digunakan:**
1. `search_for_pattern` → Cari pattern currency formatting
2. `find_symbol` → Identifikasi locations
3. `create_text_file` → Buat utility function
4. `replace_regex` → Update semua usage

---

### 5. Update Styling - Menyamakan Design System

**Use Case:** Menyamakan styling `AuthSubmitButton` dengan `Button` component.

**Perintah:**
```
AuthSubmitButton masih pakai styling custom. Tolong refactor agar menggunakan Button component yang sudah ada di src/lib/components/ui/Button.svelte.
AuthSubmitButton harus menjadi wrapper yang memakai Button dengan props yang sesuai.
```

**Tools yang digunakan:**
1. `read_file` → Baca kedua components
2. `find_referencing_symbols` → Cari semua usage AuthSubmitButton
3. `replace_symbol_body` → Refactor jadi wrapper

---

### 6. Onboarding - Memahami Struktur Project

**Use Case:** Pertama kali menggunakan Serena di project.

**Perintah:**
```
Tolong lakukan onboarding untuk memahami struktur project ini. Identifikasi:
- Tech stack yang digunakan
- Pola komponen yang dipakai
- Struktur routes
- Database schema patterns
```

**Tools yang digunakan:**
- `onboarding` → Analysis struktur project, patterns, dan rekomendasi

**Output:** Comprehensive analysis tentang project structure dan patterns.

---

### 7. Bug Fixing - Mencari Root Cause

**Use Case:** Payment flow tidak unlock course setelah sukses.

**Perintah:**
```
Ada bug: setelah payment sukses, course tidak unlock.
Tolong:
1. Cari semua function yang handle payment completion
2. Cari function unlockCourse atau activateCourse
3. Identifikasi di mana connection-nya terputus
4. Fix dengan menambahkan call ke unlockCourse setelah payment success
```

**Tools yang digunakan:**
1. `find_symbol` → Cari payment-related functions
2. `find_symbol` → Cari unlockCourse function
3. `find_referencing_symbols` → Lihat flow connection
4. `read_file` → Baca relevant files
5. `think_about_collected_information` → Analyze
6. `insert_after_symbol` atau `replace_symbol_body` → Fix

---

### 8. Melihat Overview Symbols di File

**Use Case:** Ingin melihat struktur file tanpa membaca seluruh konten.

**Perintah:**
```
Berikan overview semua symbols (functions, components, types) yang ada di src/app.css
```

**Tools yang digunakan:**
- `get_symbols_overview` → Menampilkan struktur file tanpa membaca seluruh konten

**Output:** List semua top-level symbols dengan informasi struktur.

---

### 9. Mencari Component/Function Berdasarkan Nama

**Use Case:** Mencari semua component atau function yang mengandung kata "Button".

**Perintah:**
```
Cari semua component atau function yang mengandung kata "Button" di project ini
```

**Tools yang digunakan:**
- `find_symbol` → Dengan substring matching untuk menemukan semua Button-related symbols

---

### 10. Mencari Pattern/Kode Tertentu

**Use Case:** Mencari semua import Button component.

**Perintah:**
```
Cari semua tempat di codebase yang menggunakan pattern "import.*from.*Button" atau menggunakan Button component
```

**Tools yang digunakan:**
- `search_for_pattern` → Mencari pattern regex di semua file

---

## Tips Penggunaan yang Efektif

### 1. Gunakan Bahasa Natural

**✅ Baik:**
```
Tolong cari semua penggunaan CourseCard component
```

**❌ Kurang baik:**
```
find_referencing_symbols CourseCard
```

Serena memahami bahasa natural, jadi gunakan deskripsi yang jelas.

### 2. Berikan Context yang Cukup

**✅ Baik:**
```
Saya ingin refactor AuthSubmitButton agar pakai Button component yang baru
```

**❌ Kurang baik:**
```
Refactor AuthSubmitButton
```

Dengan context lebih jelas, Serena bisa memberikan hasil yang lebih akurat.

### 3. Spesifik dengan Path

**✅ Baik:**
```
Update Button di src/lib/components/ui/Button.svelte
```

**❌ Kurang baik:**
```
Update Button
```

Path yang spesifik membantu Serena menemukan symbol yang tepat.

### 4. Request Verification

**✅ Baik:**
```
Setelah refactor, tolong pastikan tidak ada file yang broken
```

Meminta verifikasi membantu memastikan semua perubahan aman.

### 5. Break Down Complex Tasks

**✅ Baik:**
```
Tolong:
1. Cari semua referensi ke CourseCard
2. Tampilkan overview dari setiap file
3. Identifikasi apakah ada breaking changes
```

Memecah tugas kompleks menjadi step-by-step membantu Serena memberikan hasil yang lebih baik.

---

## Best Practices

### 1. Kombinasikan Tools

Jangan hanya gunakan satu tool. Kombinasikan untuk hasil maksimal:

```
1. find_referencing_symbols → Find semua usage
2. get_symbols_overview → Understand context  
3. replace_symbol_body → Safe replacement
4. think_about_collected_information → Verify
```

### 2. Gunakan Memory untuk Context Persistence

Simpan informasi penting untuk akses cepat:

```
write_memory project-structure "Tech stack: SvelteKit 5, TypeScript, Turso..."
```

### 3. Verify dengan find_referencing_symbols

Setelah perubahan besar, selalu verify:

```
Setelah rename, tolong verify semua references masih valid dengan find_referencing_symbols
```

### 4. Start dengan Onboarding untuk Project Baru

Jika bekerja dengan codebase baru:

```
Tolong lakukan onboarding untuk memahami struktur project ini
```

### 5. Gunakan Semantic Tools, Bukan Text Search

**✅ Prefer:**
- `find_symbol` untuk mencari symbols
- `find_referencing_symbols` untuk dependencies

**❌ Avoid:**
- Text search untuk symbol operations
- Manual grep untuk refactoring

---

## Common Mistakes & Solutions

### Mistake 1: Tidak Spesifik dengan Symbol Path

**Problem:** `find_symbol Button` bisa match banyak symbols.

**Solution:** 
```
find_symbol dengan path lengkap: src/lib/components/ui/Button.svelte
```

### Mistake 2: Langsung Replace Tanpa Verifikasi

**Problem:** Replace tanpa cek impact bisa breaking.

**Solution:**
```
1. find_referencing_symbols dulu
2. Review impact
3. Baru replace
```

### Mistake 3: Tidak Memanfaatkan Onboarding

**Problem:** Langsung mulai tanpa memahami struktur.

**Solution:**
```
Selalu mulai dengan onboarding untuk project baru
```

---

## Advanced Workflows

### Workflow 1: Large Refactoring

```
1. onboarding → Understand structure
2. find_symbol → Find target symbol
3. find_referencing_symbols → Find all usages
4. get_symbols_overview → Understand context
5. replace_symbol_body → Safe replacement
6. verify → Check all references
```

### Workflow 2: Feature Implementation

```
1. onboarding → Understand architecture
2. find_symbol → Find related components
3. create_text_file → Create new files
4. insert_after_symbol → Add to existing files
5. verify → Test integration
```

### Workflow 3: Bug Investigation

```
1. search_for_pattern → Find error patterns
2. find_symbol → Find related functions
3. find_referencing_symbols → Understand flow
4. read_file → Read relevant code
5. think_about_collected_information → Analyze
6. replace_symbol_body → Fix
```

---

## Kesimpulan

Dengan memahami cara menggunakan Serena secara efektif, Anda bisa meningkatkan produktivitas development secara signifikan. Kunci suksesnya adalah:

1. **Gunakan bahasa natural** - Serena memahami deskripsi tugas
2. **Berikan context** - Semakin jelas, semakin baik hasilnya
3. **Kombinasikan tools** - Jangan hanya gunakan satu tool
4. **Verify changes** - Selalu verifikasi setelah perubahan besar
5. **Start dengan onboarding** - Untuk project baru

### Next Steps

- [10 Use Case Praktis Serena MCP Server](/blog/10-use-case-praktis-serena-mcp-server)
- [Troubleshooting MCP Servers](/blog/troubleshooting-mcp-servers)
- [Setup MCP Servers untuk Development](/blog/setup-mcp-servers-untuk-development-panduan-lengkap)

---

**Ingin meningkatkan produktivitas coding Anda?** Pelajari development tools modern dan best practices di program **"Naik Kelas by Koneksi"**. [Daftar sekarang →](/waiting-list)

