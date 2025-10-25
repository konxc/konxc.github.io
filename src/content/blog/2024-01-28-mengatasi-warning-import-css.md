---
title: "Mengatasi Warning @import CSS: Panduan Lengkap dengan Referensi MDN"
description: "Pelajari cara mengatasi warning '@import rules must precede all other statements' dengan mengikuti spesifikasi CSS resmi dari Mozilla Developer Network"
publishDate: 2024-01-28
author: "Sandikodev"
category: "tutorial"
tags: ["css", "import", "warning", "frontend", "web-development", "mdn"]
featured: true
readingTime: 10
image: "/blog/css-import-warning-fix.jpg"
---

# Mengatasi Warning @import CSS: Panduan Lengkap dengan Referensi MDN

*Bagaimana mengatasi warning "@import rules must precede all other statements" dengan mengikuti spesifikasi CSS resmi*

Saat bekerja dengan CSS, terutama dalam proyek modern yang menggunakan bundler seperti Vite, Webpack, atau PostCSS, Anda mungkin pernah menemukan warning yang mengatakan `@import rules must precede all other statements (besides @charset and @layer statements)`. Warning ini sering muncul ketika kita mengimpor font dari Google Fonts atau stylesheet eksternal lainnya.

Dalam artikel ini, kita akan membahas penyebab warning ini, solusi yang benar berdasarkan spesifikasi CSS resmi, dan best practices untuk mengorganisir CSS imports.

## 🚨 Apa Itu Warning @import CSS?

### Warning yang Sering Muncul:

```
Module Warning (from ./node_modules/postcss-loader/src/index.js):
Warning: @import rules must precede all other statements (besides @charset and @layer statements)
```

### Penyebab Umum:

1. **Font import setelah CSS rules**
2. **Stylesheet import di tengah file**
3. **Import setelah @theme atau @media queries**
4. **Import dalam conditional statements**

## 📚 Spesifikasi CSS Resmi dari MDN

Menurut [Mozilla Developer Network (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@import):

> **"An @import rule must be defined at the top of the stylesheet, before any other at-rule (except @charset and @layer) and style declarations, or it will be ignored."**

### Aturan Penting:

- ✅ `@import` **HARUS** berada di bagian atas stylesheet
- ✅ **Sebelum** semua at-rule lainnya (kecuali `@charset` dan `@layer`)
- ✅ **Sebelum** semua style declarations
- ❌ Jika tidak, akan **diabaikan (ignored)**

## 🔍 Contoh Praktis

### ❌ SALAH (akan diabaikan):

```css
/* styles.css */
* {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
}

/* ❌ INVALID - akan diabaikan */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

### ✅ BENAR:

```css
/* styles.css */
/* ✅ BENAR - @import di bagian atas */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
}
```

## 🛠️ Solusi untuk Framework Modern

### 1. **Tailwind CSS v4**

```css
/* src/styles/global.css */
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@theme {
  --font-heading: "Inter", "sans-serif";
  --font-body: "Source Sans Pro", "sans-serif";
}

/* Custom CSS */
:root {
  --primary-color: #6366f1;
}
```

### 2. **Astro Framework**

```css
/* src/styles/global.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import "tailwindcss";

/* Component styles */
.btn-primary {
  @apply bg-blue-500 text-white px-4 py-2 rounded;
}
```

### 3. **Next.js dengan CSS Modules**

```css
/* styles/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

html,
body {
  padding: 0;
  margin: 0;
  font-family: 'Inter', sans-serif;
}
```

## 🎯 Best Practices

### 1. **Urutan Import yang Benar**

```css
/* 1. External fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* 2. Framework CSS */
@import "tailwindcss";

/* 3. Third-party libraries */
@import "~bootstrap/dist/css/bootstrap.css";

/* 4. Custom CSS */
:root {
  --primary-color: #6366f1;
}

.btn-primary {
  background-color: var(--primary-color);
}
```

### 2. **Menggunakan CSS Custom Properties**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  /* Font families */
  --font-primary: 'Inter', sans-serif;
  --font-secondary: 'Source Sans Pro', sans-serif;
  
  /* Colors */
  --color-primary: #6366f1;
  --color-secondary: #14b8a6;
}

body {
  font-family: var(--font-primary);
}
```

### 3. **Organisasi File CSS**

```
src/styles/
├── fonts.css          # Font imports
├── variables.css      # CSS custom properties
├── components.css     # Component styles
└── globals.css        # Global styles
```

```css
/* fonts.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;500;600;700&display=swap');
```

## 🔧 Troubleshooting

### Error 1: "Cannot resolve @import"

**Penyebab**: Path import tidak valid

**Solusi**:
```css
/* ❌ SALAH */
@import "./fonts.css";

/* ✅ BENAR */
@import url("./fonts.css");
```

### Error 2: "Font not loading"

**Penyebab**: Import diabaikan karena posisi salah

**Solusi**:
```css
/* Pindahkan ke bagian atas */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

### Error 3: "Build warning persists"

**Penyebab**: Masih ada CSS rules sebelum @import

**Solusi**:
```css
/* Pastikan tidak ada CSS rules sebelum @import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Baru kemudian CSS rules lainnya */
* {
  margin: 0;
  padding: 0;
}
```

## 📊 Perbandingan Metode Import

| Metode | Keuntungan | Kerugian | Rekomendasi |
|--------|------------|----------|-------------|
| `@import` di CSS | Mudah, langsung di CSS | Harus di bagian atas | ✅ Untuk font eksternal |
| `<link>` di HTML | Lebih cepat loading | Tidak bisa di CSS | ✅ Untuk font utama |
| Font files lokal | Kontrol penuh | File size besar | ✅ Untuk font khusus |
| CSS-in-JS | Dinamis | Runtime overhead | ❌ Untuk font statis |

## 🚀 Optimasi Performa

### 1. **Preload Fonts**

```html
<!-- Di <head> -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### 2. **Font Display Optimization**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  font-display: swap; /* Fallback font sementara */
}
```

### 3. **Critical CSS**

```css
/* Critical CSS - inline di <head> */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

/* Non-critical CSS - load async */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap');
```

## 🎯 Kesimpulan

Warning `@import rules must precede all other statements` adalah cara CSS untuk memastikan bahwa import statements diproses dengan benar. Dengan mengikuti spesifikasi CSS resmi dari MDN:

### ✅ **Yang Harus Diingat:**

1. **Selalu letakkan `@import` di bagian atas** stylesheet
2. **Sebelum semua CSS rules** lainnya
3. **Gunakan `url()` function** untuk external imports
4. **Organisir imports** dengan urutan yang logis
5. **Test di berbagai browser** untuk memastikan kompatibilitas

### 🚀 **Keuntungan Mengikuti Best Practices:**

- ✅ **Tidak ada warning** saat build
- ✅ **Font loading** yang konsisten
- ✅ **Browser compatibility** yang baik
- ✅ **Maintainable code** yang mudah dipahami
- ✅ **Performance** yang optimal

## 📚 Referensi

- [MDN CSS @import](https://developer.mozilla.org/en-US/docs/Web/CSS/@import) - Spesifikasi resmi CSS
- [CSS Cascading and Inheritance Level 5](https://www.w3.org/TR/css-cascade-5/) - Standar CSS terbaru
- [Google Fonts Best Practices](https://developers.google.com/fonts/docs/getting_started) - Optimasi font loading

## 🤝 Kontribusi

Jika Anda menemukan masalah atau memiliki saran untuk artikel ini, silakan buat issue atau pull request di repository kami.

---

*Artikel ini ditulis berdasarkan pengalaman mengatasi warning @import CSS dalam proyek KonXC dengan referensi spesifikasi CSS resmi dari Mozilla Developer Network.*
