---
title: "Mengapa Svelte 5 Deprecate $page Store dan Migrasi ke Runes: Penjelasan untuk Developer yang Bingung"
description: "Sebagai developer yang baru migsrasi dari Svelte 4 ke Svelte 5, saya akan menjelaskan kenapa Svelte meninggalkan $page store dan bagaimana Runes reactivity membuat hidup kita lebih rumit (tapi lebih powerful)."
publishDate: 2025-01-28
author: "Sandikodev"
category: "frontend"
tags: ["svelte", "svelte-5", "runes", "reactivity-engine", "frontend-framework"]
featured: true
readingTime: 8
coverImage: "/images/blog/svelte-runes.png"
---

# Mengapa Svelte 5 Deprecate $page Store dan Migrasi ke Runes: Penjelasan untuk Developer yang Bingung

Sebagai developer yang baru mencoba migrasi ke Svelte 5, salah satu perubahan yang paling membuat saya bingung adalah kenapa Svelte meninggalkan `$page` store yang simpel dan beralih ke **Runes reactivity** yang sepertinya lebih rumit.

Mari kita bahas kenapa mereka melakukan ini, dan apakah itu worth it.

## 🤔 Pertanyaan Awal: "Kenapa Ditinggalkan?"

Dari perspektif developer praktis (seperti saya), ini terasa seperti:
- Sebelum: `const isLandingPage = $page.url.pathname === '/';` ✅ **1 baris!**
- Sekarang: Perlu tracking state dengan `$state`, `onMount`, `afterNavigate` ❌ **10+ baris!**

### Apakah Ini Degradation?

**Tidak.** Tapi memang ada trade-off antara **simplicity** dan **power**.

## 🎯 Alasan Teknis (Kenapa Mereka Melakukan Ini)

Berdasarkan dokumentasi resmi Svelte 5 ([svelte.dev/blog/runes](https://svelte.dev/blog/runes)), ada 4 alasan utama:

### 1. **Universal Reactivity**

Runes bisa dipakai **di luar** `.svelte` files! Ini game-changer.

```javascript
// ❌ Sebelum: Hanya bisa di .svelte files
<script>
  import { page } from '$app/stores';
  const isLandingPage = $page.url.pathname === '/';
</script>

// ✅ Sekarang: Bisa di .js/.ts files!
// navigation-utils.ts
export function useLandingPageDetection() {
  let currentPath = $state('/');
  
  if (typeof window !== 'undefined') {
    currentPath = window.location.pathname;
  }
  
  return {
    get isLandingPage() {
      return currentPath === '/';
    }
  };
}

// Bisa dipakai dimana saja!
```

### 2. **Fine-Grained Reactivity**

Svelte 5 menggunakan **signals** di belakang layar. Ini berarti perubahan hanya trigger update di bagian yang **benar-benar perlu**, bukan seluruh component tree.

```javascript
// ✅ Svelte 5: Hanya bagian yang berubah yang di-update
const items = $state([...]);
// Kalau salah satu item di array berubah, hanya bagian itu yang re-render
// Bukan seluruh array re-render!
```

### 3. **Runtime Dependency Tracking**

`$:` di Svelte 3/4 bergantung pada **compile-time analysis**. Kalau kita refactor code:

```javascript
// ❌ Masalah dengan $:
const multiplyByHeight = (width) => width * height;

$: area = multiplyByHeight(width); 
// Compiler tidak tahu area juga depends on height!
// Kalau height berubah, area tidak update!
```

Dengan `$derived`, dependencies ditrack di **runtime**:

```javascript
// ✅ $derived: Dependencies ditrack di runtime
const area = $derived(width * height);
// Svelte 5 tahu area depends on width DAN height
// Jadi kalau salah satu berubah, area update otomatis!
```

### 4. **Simpler Concept, More Powerful**

Menurut dokumentasi resmi, Runes menggantikan:
- ❌ `let` di top level vs di dalam function (inconsistent)
- ❌ `export let` (props declaration)
- ❌ `$:` (reactive statements dengan quirks)
- ❌ `$$props` dan `$$restProps`
- ❌ Lifecycle functions (bisa pakai `$effect`)

Sekarang semua itu menjadi **satu konsep**: **Runes**.

## 🔄 Contoh Migrasi: Landing Page Detection

Mari kita lihat contoh nyata dari project Digital Workspace Ecosystem yang sedang saya develop.

### Sebelum (Svelte 4):

```svelte
<script lang="ts">
  import { page } from '$app/stores';
  
  const isLandingPage = $page.url.pathname === '/';
</script>

{#if isLandingPage}
  <nav class="glassmorphism">...</nav>
{:else}
  <nav class="standard">...</nav>
{/if}
```

**Pros:**
- ✅ Simpel! 3 baris saja
- ✅ Readable
- ✅ Works everywhere

**Cons:**
- ❌ Hanya bisa di `.svelte` files
- ❌ Sulit di-extract ke utility functions
- ❌ Store overhead (meskipun kecil)

### Sesudah (Svelte 5):

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  
  const isLandingPage = $state(false);
  
  onMount(() => {
    isLandingPage = window.location.pathname === '/';
  });
  
  afterNavigate(({ to }) => {
    if (to) isLandingPage = to.url.pathname === '/';
  });
</script>

{#if isLandingPage}
  <nav class="glassmorphism">...</nav>
{:else}
  <nav class="standard">...</nav>
{/if}
```

**Pros:**
- ✅ Bisa di-extract ke utility function
- ✅ More explicit about lifecycle
- ✅ Better performance (signals)

**Cons:**
- ❌ Lebih verbose (10 lines vs 3 lines)
- ❌ Ada learning curve
- ❌ Perlu memahami lifecycle hooks

## 📊 Perbandingan: Apa Trade-Off Sebenarnya?

| Aspek | `$page.url.pathname` (Old) | Runes (New) |
|-------|---------------------------|-------------|
| **Simplicity** | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐⭐ (3/5) |
| **Readability** | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐⭐⭐ (4/5) |
| **Learnability** | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐⭐ (3/5) |
| **Reusability** | ⭐⭐ (2/5) | ⭐⭐⭐⭐⭐ (5/5) |
| **Performance** | ⭐⭐⭐⭐ (4/5) | ⭐⭐⭐⭐⭐ (5/5) |
| **Maintainability** | ⭐⭐⭐ (3/5) | ⭐⭐⭐⭐⭐ (5/5) |

## 💡 Solusi Sederhana yang Saya Gunakan

Kalau Anda merasa overwhelmed seperti saya, gunakan solusi **paling sederhana yang mungkin**:

```svelte
<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  
  const isLandingPage = $state(false);
  
  // Single initialization
  if (typeof window !== 'undefined') {
    isLandingPage = window.location.pathname === '/';
  }
  
  // Update on navigation
  afterNavigate(({ to }) => {
    if (to) isLandingPage = to.url.pathname === '/';
  });
</script>
```

**Kenapa ini lebih baik?**
- Pakai `afterNavigate` (part of SvelteKit) - bukan deprecated
- Tidak perlu `onMount` kalau sudah ada guards
- Minimal ceremony
- Tetap dapat benefit dari signals

## 🤷 Kesimpulan: Worth It Atau Tidak?

### Worth It Jika:
- ✅ Anda build aplikasi kompleks (500+ LOC)
- ✅ Perlu extract logic ke utility files
- ✅ Perlu fine-grained control
- ✅ Peduli dengan performance optimization
- ✅ Ingin consistency di seluruh codebase

### Not Worth It Jika:
- ❌ Project kecil (< 5 components)
- ❌ Simple landing pages
- ❌ Hanya butuh reactive state sederhana
- ❌ Team masih belajar Svelte dasar

## 🎓 Learning Path: Dari Confused ke Confident

Saya sendiri masih dalam proses belajar. Berikut yang membantu:

1. **Baca dokumentasi resmi**: [svelte.dev/blog/runes](https://svelte.dev/blog/runes) - Sangat jelas!
2. **Practice dengan code snippets**: Coba di playground
3. **Don't rewrite everything**: Migrate gradual, old code masih works
4. **Ask community**: Discord, Reddit r/sveltejs

## 📝 Next Steps

Kalau Anda masih bingung, coba ikuti pattern ini:

```typescript
// utility.ts
export function usePathDetection() {
  let currentPath = $state('/');
  
  if (typeof window !== 'undefined') {
    currentPath = window.location.pathname;
    
    // Listen to navigation
    afterNavigate(({ to }) => {
      if (to) currentPath = to.url.pathname;
    });
  }
  
  return {
    get currentPath() { return currentPath; },
    get isLandingPage() { return currentPath === '/'; }
  };
}

// layout.svelte
<script lang="ts">
  import { usePathDetection } from './utils';
  
  const { isLandingPage } = usePathDetection();
</script>
```

## 🌟 Final Thoughts

**Apakah ini keputusan yang bagus dari Svelte team?**

**Ya!** Tapi saya setuju kalau migrasi terasa lebih complex. Ini adalah trade-off yang classic dalam software engineering:

> **Simple → Powerful**
> 
> Pilih salah satu. Svelte team memilih **Powerful**, dan memberikan tools untuk membuatnya simple lagi (melalui patterns seperti di atas).

Untuk project kecil, ini mungkin overkill. Tapi untuk software complex yang akan bertahan lama, ini investasi yang worth it.

---

**P.S.**: Kalau Anda masih stuck, jangan ragu untuk ask di:
- [Svelte Discord](https://svelte.dev/chat)
- [r/sveltejs](https://reddit.com/r/sveltejs)

Kita semua masih belajar! 😊

---

_Artikel ini ditulis berdasarkan pengalaman practical migrasi dari Svelte 4 ke Svelte 5 di project [Digital Workspace Ecosystem](https://github.com/KonXC/digital-workspace-ecosystem). Untuk diskusi lebih lanjut tentang Svelte 5 atau open source collaboration, hubungi saya di sandikodev@konxc.space._
