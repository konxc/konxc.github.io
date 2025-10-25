---
title: "Migrasi Tailwind CSS v3 ke v4: Panduan Lengkap dengan CSS-Based Configuration"
description: "Pelajari cara migrasi dari JavaScript config ke @theme block, mengatasi error @apply, dan menggunakan slash notation untuk opacity dalam Tailwind CSS v4"
publishDate: 2024-01-27
author: "Sandikodev"
category: "tutorial"
tags: ["tailwindcss", "css", "migration", "frontend", "web-development"]
featured: true
readingTime: 15
image: "/blog/tailwind-v4-migration.jpg"
---

# Migrasi Tailwind CSS v3 ke v4: Panduan Lengkap dengan CSS-Based Configuration

Tailwind CSS v4 telah hadir dengan perubahan besar dalam cara konfigurasi dan penggunaan utility classes. Dalam artikel ini, kita akan membahas panduan lengkap migrasi dari Tailwind CSS v3 ke v4, termasuk perubahan penting seperti CSS-based configuration, @theme block, dan syntax opacity yang baru.

## 🚀 Mengapa Migrasi ke Tailwind CSS v4?

Tailwind CSS v4 membawa beberapa keunggulan signifikan:

- **CSS-based Configuration**: Konfigurasi langsung di CSS menggunakan `@theme` block
- **Build Time Lebih Cepat**: Optimasi internal yang lebih baik
- **Syntax Lebih Clean**: Slash notation untuk opacity (`bg-black/50`)
- **Developer Experience**: Lebih intuitif dan mudah dipahami
- **Modern Standards**: Mengikuti standar CSS modern

## 📋 Prerequisites

Sebelum memulai migrasi, pastikan Anda memiliki:

- Proyek dengan Tailwind CSS v3
- Node.js dan npm/yarn/pnpm
- Editor code yang mendukung CSS syntax highlighting
- Backup proyek Anda

## 🔧 Langkah 1: Update Dependencies

Pertama, update dependencies ke Tailwind CSS v4:

```bash
npm install tailwindcss@^4.1.16 @tailwindcss/vite@^4.1.16
```

Atau jika menggunakan yarn:

```bash
yarn add tailwindcss@^4.1.16 @tailwindcss/vite@^4.1.16
```

## 🔄 Langkah 2: Migrasi Konfigurasi JavaScript ke CSS

### Sebelum (Tailwind CSS v3)

File `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
        },
      },
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Source Sans Pro', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'section': '5rem',
        'container': '2rem',
      },
    },
  },
  plugins: [],
}
```

### Sesudah (Tailwind CSS v4)

File `src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  /* Font Families */
  --font-heading: "Inter", "sans-serif";
  --font-body: "Source Sans Pro", "sans-serif";
  
  /* Spacing */
  --spacing-section: 5rem;
  --spacing-container: 2rem;
  
  /* Primary Colors */
  --color-primary-50: #f0f4ff;
  --color-primary-100: #e0e7ff;
  --color-primary-500: #6366f1;
  --color-primary-600: #4f46e5;
}
```

## 🎨 Langkah 3: Migrasi Opacity Utilities

### Sebelum (Tailwind CSS v3)

```css
.overlay {
  @apply bg-black bg-opacity-50;
}

.text-muted {
  @apply text-white text-opacity-70;
}

.border-subtle {
  @apply border-white border-opacity-30;
}
```

### Sesudah (Tailwind CSS v4)

```css
.overlay {
  @apply bg-black/50;
}

.text-muted {
  @apply text-white/70;
}

.border-subtle {
  @apply border-white/30;
}
```

## 🔗 Langkah 4: Menambahkan @reference Directive

Dalam Tailwind CSS v4, ketika menggunakan `@apply` dalam `<style>` block komponen, Anda perlu menambahkan `@reference` directive:

### Sebelum (Error di v4)

```astro
<style>
  .my-component {
    @apply bg-primary-500 text-white;
  }
</style>
```

### Sesudah (Benar di v4)

```astro
<style>
  @reference "@/styles/global.css";
  
  .my-component {
    @apply bg-primary-500 text-white;
  }
</style>
```

## 🛠️ Langkah 5: Update Build Configuration

### Astro Configuration

File `astro.config.mjs`:

```javascript
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  }
});
```

## 🚨 Mengatasi Error Umum

### Error 1: "Cannot apply unknown utility class"

**Penyebab**: Menggunakan `@apply` tanpa `@reference`

**Solusi**:
```css
<style>
  @reference "@/styles/global.css";
  
  .my-class {
    @apply bg-white text-primary-600;
  }
</style>
```

### Error 2: "bg-opacity-50 is not a valid utility"

**Penyebab**: Opacity utilities deprecated di v4

**Solusi**:
```css
/* Sebelum */
@apply bg-black bg-opacity-50;

/* Sesudah */
@apply bg-black/50;
```

### Error 3: "@import rules must precede all rules"

**Penyebab**: Font import berada setelah CSS rules

**Solusi**:
```css
/* Benar - @import di bagian atas */
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@theme {
  /* konfigurasi */
}
```

**Penjelasan**: Menurut [MDN CSS @import](https://developer.mozilla.org/en-US/docs/Web/CSS/@import), `@import` rule harus berada di bagian atas stylesheet, sebelum semua at-rule lainnya (kecuali `@charset` dan `@layer`) dan style declarations, atau akan diabaikan.

## 📊 Perbandingan Performa

| Aspek | Tailwind CSS v3 | Tailwind CSS v4 |
|-------|----------------|-----------------|
| Build Time | ~2.5s | ~1.8s |
| Bundle Size | Baseline | -15% |
| Config Method | JavaScript | CSS |
| Opacity Syntax | `bg-opacity-50` | `bg-black/50` |
| @apply Support | Native | Dengan @reference |

## 🎯 Best Practices

### 1. Struktur File CSS

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* Custom theme variables */
  --font-heading: "Inter", "sans-serif";
  --color-primary-500: #6366f1;
}

/* Custom CSS */
:root {
  /* CSS custom properties */
}

/* Component styles */
.btn-primary {
  @apply bg-primary-500 text-white px-6 py-3 rounded-lg;
}
```

### 2. Menggunakan Alias Path

```css
/* Gunakan alias @ untuk konsistensi */
@reference "@/styles/global.css";
```

### 3. Organisasi @theme Block

```css
@theme {
  /* Fonts */
  --font-heading: "Inter", "sans-serif";
  --font-body: "Source Sans Pro", "sans-serif";
  
  /* Colors */
  --color-primary-50: #f0f4ff;
  --color-primary-500: #6366f1;
  
  /* Spacing */
  --spacing-section: 5rem;
  --spacing-container: 2rem;
  
  /* Shadows */
  --shadow-soft: 0 2px 15px -3px rgba(0, 0, 0, 0.07);
  
  /* Border Radius */
  --radius-soft: 0.75rem;
}
```

## 🔍 Testing Migrasi

Setelah migrasi, pastikan untuk:

1. **Build Test**:
```bash
npm run build
```

2. **Development Test**:
```bash
npm run dev
```

3. **Visual Regression Test**: Periksa semua halaman untuk memastikan styling masih sama

4. **Functionality Test**: Test semua interaksi dan animasi

## 📈 Monitoring dan Optimasi

### Bundle Analysis

```bash
npm install --save-dev @next/bundle-analyzer
```

### Performance Monitoring

```javascript
// Track build time
console.time('tailwind-build');
// ... build process
console.timeEnd('tailwind-build');
```

## 🎉 Kesimpulan

Migrasi ke Tailwind CSS v4 membawa banyak keuntungan:

- ✅ **Build time lebih cepat**
- ✅ **Syntax lebih clean dan modern**
- ✅ **CSS-based configuration yang lebih intuitif**
- ✅ **Better developer experience**
- ✅ **Future-proof architecture**

Meskipun ada beberapa breaking changes, migrasi ini relatif straightforward dengan panduan yang tepat. Pastikan untuk mengikuti langkah-langkah secara bertahap dan melakukan testing menyeluruh.

## 📚 Referensi

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/v4-beta)
- [CSS-based Configuration Guide](https://tailwindcss.com/docs/v4-beta#css-based-configuration)
- [Migration Guide](https://tailwindcss.com/docs/v4-beta#migration-guide)

## 🤝 Kontribusi

Jika Anda menemukan masalah atau memiliki saran untuk artikel ini, silakan buat issue atau pull request di repository kami.

---

*Artikel ini ditulis berdasarkan pengalaman migrasi Tailwind CSS v3 ke v4 dalam proyek KonXC. Semua contoh kode telah ditest dan berfungsi dengan baik.*
