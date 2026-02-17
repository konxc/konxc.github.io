---
title: "10 Use Case Praktis Serena MCP Server untuk Project Anda"
description: "10 contoh use case konkret menggunakan Serena MCP Server untuk refactoring, bug fixing, dan development tasks. Pelajari bagaimana semantic code analysis bisa meningkatkan produktivitas Anda dalam project SvelteKit, TypeScript, dan codebase modern."
publishDate: 2025-11-07
author: "Tim Koneksi"
category: "tutorial"
tags:
  [
    "serena",
    "mcp-server",
    "use-cases",
    "refactoring",
    "bug-fixing",
    "productivity",
    "sveltekit",
    "typescript",
    "real-world",
    "case-studies",
  ]
featured: true
readingTime: 20
coverImage: "/blog/serena-use-cases-hero.jpg"
interactiveDemos:
  [
    {
      id: "refactoring-example",
      type: "code",
      title: "Refactoring Component Example",
      description: "Contoh konkret refactoring component dengan Serena",
      icon: "🔧",
      featured: true,
      metadata: { tags: ["refactoring", "example"], language: "typescript" },
    },
    {
      id: "use-case-comparison",
      type: "visual",
      title: "Before vs After: Productivity Comparison",
      description: "Perbandingan waktu yang diperlukan dengan dan tanpa Serena",
      icon: "⏱️",
      featured: true,
      metadata: { tags: ["comparison", "productivity"] },
    },
  ]
---

# 10 Use Case Praktis Serena MCP Server untuk Project Anda

_10 contoh use case konkret yang menunjukkan bagaimana Serena MCP Server bisa meningkatkan produktivitas Anda dalam development tasks sehari-hari, dari refactoring sederhana hingga migrasi pattern yang kompleks._

---

## 1. Refactoring Component Name di Seluruh Codebase

**Skenario:** Anda ingin mengubah nama `CourseCard` menjadi `CoursePreviewCard` di seluruh project yang memiliki 50+ file.

### Tanpa Serena

**Proses manual:**
1. Search "CourseCard" dengan grep/ripgrep
2. Manual review setiap hasil
3. Update file satu per satu
4. Risiko terlewat beberapa file
5. Waktu: ~30-60 menit

### Dengan Serena

**Prompt untuk Serena:**
```
Tolong rename component CourseCard menjadi CoursePreviewCard di semua file yang menggunakannya.
Pastikan semua import, usage, dan references ter-update.
```

**Serena akan:**
1. `find_symbol` → Cari CourseCard component
2. `find_referencing_symbols` → Temukan semua usage (50+ files)
3. `rename_symbol` → Rename dengan update semua referensi
4. Auto-verify semua references valid

**Waktu:** ~2-5 menit  
**Accuracy:** 100% (tidak ada yang terlewat)

---

## 2. Menemukan Semua Penggunaan Utility Function

**Skenario:** Anda ingin update `formatCurrency` function yang digunakan di banyak tempat untuk menambahkan parameter locale.

### Dengan Serena

**Prompt:**
```
Cari semua tempat yang menggunakan formatCurrency function.
Tampilkan overview dari setiap file yang menggunakannya.
```

**Proses:**
1. `find_symbol` → `formatCurrency` di `src/lib/utils/currency.ts`
2. `find_referencing_symbols` → List semua files yang menggunakan
3. `get_symbols_overview` → Overview setiap file untuk konteks usage
4. `replace_symbol_body` → Update function dengan parameter baru
5. Auto-suggest update untuk semua call sites

**Hasil:**
- File: `src/lib/utils/formatCurrency.ts`
- Digunakan di: Payment pages, Course pricing, Subscription pages (15 files)
- Bisa update implementasi dengan confidence semua usage ter-handle

---

## 3. Menambahkan Prop Baru ke Component yang Sudah Banyak Digunakan

**Skenario:** Menambah prop `size` ke `Button` component yang sudah digunakan di 20+ file, dengan default value agar tidak breaking.

### Dengan Serena

**Prompt:**
```
Tambah prop 'size' dengan type 'sm' | 'md' | 'lg' (default 'md') ke Button component.
Prop ini harus diterapkan ke styling button (padding dan font-size).
Pastikan semua file yang menggunakan Button tidak rusak karena ada default value.
```

**Serena akan:**
1. `read_file` → Baca current Button implementation
2. `find_referencing_symbols` → Cari semua usage
3. `replace_symbol_body` → Update Button dengan prop baru
4. Verify: Semua call sites masih valid (dengan default value)

**Hasil:**
```svelte
// Button.svelte - AFTER
<script lang="ts">
  const {
    variant = 'primary',
    size = 'md',  // NEW PROP dengan default
    type = 'button',
    disabled = false,
    children
  } = $props<{
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';  // NEW TYPE
    // ... rest
  }>();
</script>
```

Semua 20+ files tetap bekerja karena default value.

---

## 4. Refactoring Database Schema Change

**Skenario:** Mengubah nama field `course.description` menjadi `course.content` di Drizzle schema, perlu update semua usage.

### Dengan Serena

**Prompt:**
```
Saya mengubah field 'description' menjadi 'content' di course schema.
Tolong:
1. Find semua symbol yang akses field description
2. Update semua database queries
3. Update TypeScript types
4. Pastikan tidak ada yang terlewat
```

**Serena akan:**
1. `find_symbol` → "description" dalam type definitions
2. `find_referencing_symbols` → Semua file yang akses field tersebut
3. `rename_symbol` → Rename dengan aman di TypeScript types
4. `replace_regex` → Update database queries yang masih pakai nama lama

**File yang di-update:**
- Schema: `src/lib/server/db/schema.ts`
- All course-related pages
- API routes
- Components yang display course description
- Type definitions

---

## 5. Implementasi Feature Baru yang Terkoneksi ke Multiple Files

**Skenario:** Menambah fitur "Save Course to Wishlist", perlu:
- Update CourseCard component
- Tambah API endpoint
- Update user schema
- Tambah route handler

### Dengan Serena

**Prompt:**
```
Saya ingin implement fitur 'Save Course to Wishlist'.
Tolong:
1. Analisis struktur project untuk memahami di mana setiap bagian harus ditambahkan
2. Find CourseCard component dan semua usage-nya
3. Buat wishlist API endpoint
4. Update user schema untuk wishlist
5. Integrate semuanya dengan proper error handling
```

**Serena akan:**
1. `onboarding` → Analisis project structure
2. `find_symbol` → Find CourseCard component
3. `find_symbol` → Find user-related API routes
4. `find_referencing_symbols` → Update semua CourseCard usage
5. `create_text_file` → Buat wishlist API endpoint
6. `insert_after_symbol` → Tambah wishlist field ke schema
7. Update semua file terkait dengan semantic understanding

---

## 6. Migrasi Pattern ke Framework Versi Baru

**Skenario:** Migrasi component dari Svelte 4 reactive statements ke Svelte 5 `$state`/`$derived`.

### Tanpa Serena

- Manual update setiap file
- Risiko error karena pattern berbeda
- Tidak konsisten
- Waktu: 2-3 jam untuk 30 components

### Dengan Serena

**Prompt:**
```
Migrasikan semua component dari Svelte 4 reactive pattern ke Svelte 5 runes.
Cari semua pattern:
- $: computed = ...
- let reactive = ...
Dan replace dengan:
- let computed = $derived(...)
- let reactive = $state(...)
```

**Serena akan:**
1. `search_for_pattern` → Find semua reactive patterns
2. `find_symbol` → Components yang perlu diupdate
3. `replace_symbol_body` → Replace dengan $state/$derived syntax
4. Auto-update semua dependencies

**Waktu:** ~15-30 menit  
**Consistency:** 100% konsisten

---

## 7. Bug Fixing dengan Context Lengkap

**Skenario:** Bug di payment flow - course tidak unlock setelah payment sukses.

### Dengan Serena

**Prompt:**
```
Ada bug: setelah payment sukses, course tidak unlock.
Tolong:
1. Cari semua function yang handle payment completion
2. Cari function unlockCourse atau activateCourse
3. Identifikasi di mana connection-nya terputus
4. Fix dengan menambahkan call ke unlockCourse setelah payment success
```

**Serena akan:**
1. `find_symbol` → "payment" related functions
2. `find_referencing_symbols` → Semua flow payment
3. `read_file` → Read payment handler files
4. `find_symbol` → "unlockCourse" function
5. `think_about_collected_information` → Analyze root cause
6. `replace_symbol_body` atau `insert_after_symbol` → Fix implementation

**Hasil:** Root cause ditemukan dan fixed dalam satu session.

---

## 8. Extract Function dari Code Duplication

**Skenario:** Ada beberapa tempat di codebase yang memformat currency dengan cara manual. Perlu diekstrak menjadi utility function.

### Dengan Serena

**Prompt:**
```
Saya melihat ada beberapa tempat yang format currency dengan cara manual.
Tolong:
1. Cari semua pattern formatting currency (Rp, IDR, atau rupiah)
2. Buat utility function formatCurrency di src/lib/utils/currency.ts
3. Replace semua usage manual dengan function baru ini
```

**Serena akan:**
1. `search_for_pattern` → Cari pattern currency formatting
2. `find_symbol` → Identifikasi locations
3. `create_text_file` → Buat utility function
4. `replace_regex` atau `replace_symbol_body` → Update semua usage

**Hasil:** Code lebih DRY, maintainable, dan konsisten.

---

## 9. Update Styling untuk Menyamakan Design System

**Skenario:** `AuthSubmitButton` masih pakai styling custom. Perlu refactor agar menggunakan `Button` component yang sudah ada.

### Dengan Serena

**Prompt:**
```
AuthSubmitButton masih pakai styling custom.
Tolong refactor agar menggunakan Button component yang sudah ada di src/lib/components/ui/Button.svelte.
AuthSubmitButton harus menjadi wrapper yang memakai Button dengan props yang sesuai.
```

**Serena akan:**
1. `read_file` → Baca kedua components
2. `find_referencing_symbols` → Cari semua usage AuthSubmitButton
3. `replace_symbol_body` → Refactor jadi wrapper
4. Update styling agar konsisten dengan design system

**Hasil:**
```svelte
// AuthSubmitButton.svelte - AFTER
<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  
  interface Props {
    text: string;
    disabled?: boolean;
    loading?: boolean;
    type?: 'submit' | 'button';
  }
  
  let { text, disabled = false, loading = false, type = 'submit' }: Props = $props();
</script>

<Button variant="primary" type={type} {disabled}>
  {#if loading}
    Loading...
  {:else}
    {text}
  {/if}
</Button>
```

---

## 10. Onboarding ke Codebase Baru

**Skenario:** Developer baru atau AI assistant perlu memahami struktur project yang kompleks.

### Dengan Serena

**Prompt:**
```
Tolong lakukan onboarding untuk memahami struktur project ini.
Identifikasi:
- Tech stack yang digunakan
- Pola komponen yang dipakai
- Struktur routes
- Database schema patterns
- Key architectural decisions
```

**Serena akan:**
- `onboarding` → Analisis struktur project
- `list_dir` → Explore folder structure
- `get_symbols_overview` → Understand key files
- Generate comprehensive analysis

**Hasil:** Developer/AI mendapat pemahaman lengkap tentang codebase dalam hitungan menit.

---

## Perbandingan: Dengan vs Tanpa Serena

| Task | Tanpa Serena | Dengan Serena | Time Saved |
|------|-------------|---------------|------------|
| Rename component (20 files) | 30-60 menit | 2-5 menit | **85-90%** |
| Add prop to component | 15-30 menit | 3-5 menit | **80%** |
| Pattern migration (30 files) | 2-3 jam | 15-30 menit | **75%** |
| Bug fixing (complex) | 1-2 jam | 10-20 menit | **70-80%** |
| Codebase onboarding | 2-4 jam | 5-10 menit | **95%** |

---

## Tips untuk Maksimalkan Use Cases

### 1. Kombinasikan Multiple Tools

Jangan hanya gunakan satu tool, kombinasikan untuk hasil maksimal:

```
1. find_referencing_symbols → Find semua usage
2. get_symbols_overview → Understand context
3. replace_symbol_body → Safe replacement
4. think_about_collected_information → Verify completeness
```

### 2. Gunakan Onboarding untuk Project Baru

Jika bekerja dengan codebase baru, selalu mulai dengan `onboarding` untuk memahami struktur.

### 3. Verify dengan find_referencing_symbols

Setelah perubahan besar, selalu verify dengan `find_referencing_symbols` untuk memastikan semua references valid.

### 4. Gunakan Memory untuk Context

Simpan informasi penting ke memory untuk akses cepat di masa depan:

```
write_memory project-structure "Key architectural decisions..."
```

---

## Kesimpulan

10 use case di atas menunjukkan bagaimana Serena bisa meningkatkan produktivitas development secara signifikan. Dengan semantic understanding, refactoring dan code analysis menjadi lebih aman, cepat, dan akurat.

### Next Steps

- [Panduan Lengkap Cara Menggunakan Serena](/blog/panduan-lengkap-serena)
- [Setup Serena MCP Server dengan Docker](/blog/setup-serena-mcp-docker)
- [Troubleshooting MCP Servers](/blog/troubleshooting-mcp-servers)

---

**Ingin belajar lebih banyak tentang development tools dan best practices?** Bergabunglah dengan program **"Naik Kelas by Koneksi"** untuk pelatihan intensif menjadi developer yang lebih produktif. [Daftar sekarang →](/waiting-list)

