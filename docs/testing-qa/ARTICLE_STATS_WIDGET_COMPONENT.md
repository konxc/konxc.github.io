# 📊 Article Stats Widget Component

## 🎯 **Overview**

Komponen `ArticleStatsWidget` adalah sidebar widget yang menampilkan statistik artikel seperti waktu baca, jumlah kata, tanggal publikasi, dan informasi lainnya. Widget ini dirancang untuk memberikan informasi yang berguna kepada pembaca tentang artikel yang sedang dibaca.

## 🚀 **Features**

### **✅ Statistik yang Ditampilkan:**
- **Waktu Baca**: Estimasi waktu yang dibutuhkan untuk membaca artikel
- **Jumlah Kata**: Total kata dalam artikel
- **Tanggal Publikasi**: Kapan artikel pertama kali diterbitkan
- **Terakhir Diperbarui**: Kapan artikel terakhir kali dimodifikasi (opsional)
- **Kategori**: Kategori artikel
- **Penulis**: Nama penulis artikel
- **Tags**: Daftar tag artikel (opsional)

### **✅ Interactive Features:**
- **Hover Effects**: Smooth transitions dan hover states
- **Responsive Design**: Optimal di desktop dan mobile
- **Dark Mode Support**: Otomatis mengikuti tema dark mode
- **Accessibility**: Proper ARIA labels dan semantic HTML

## 📋 **Props Interface**

```typescript
export interface Props {
  readingTime?: number;        // Waktu baca dalam menit (default: 5)
  wordCount?: number;          // Jumlah kata (default: 1200)
  publishDate?: Date;          // Tanggal publikasi (default: new Date())
  lastModified?: Date;         // Tanggal terakhir diperbarui (opsional)
  category?: string;           // Kategori artikel (default: 'Technical')
  tags?: string[];             // Array tag artikel (default: [])
  author?: string;             // Nama penulis (default: 'Konxc')
  className?: string;          // CSS class tambahan (default: '')
}
```

## 🎨 **Usage Examples**

### **Basic Usage:**
```astro
---
import ArticleStatsWidget from '@components/blog/ArticleStatsWidget.astro';
---

<ArticleStatsWidget />
```

### **Custom Props:**
```astro
---
import ArticleStatsWidget from '@components/blog/ArticleStatsWidget.astro';

const articleData = {
  readingTime: 8,
  wordCount: 2500,
  publishDate: new Date('2024-01-26'),
  lastModified: new Date('2024-01-27'),
  category: 'Tutorial',
  tags: ['Astro', 'TypeScript', 'Web Development'],
  author: 'Sandikodev'
};
---

<ArticleStatsWidget {...articleData} />
```

### **In Blog Layout:**
```astro
---
import ArticleStatsWidget from '@components/blog/ArticleStatsWidget.astro';
import TableOfContents from '@components/blog/TableOfContents.astro';
---

<div class="blog-layout">
  <main class="blog-content">
    <!-- Article content -->
  </main>
  
  <aside class="blog-sidebar">
    <ArticleStatsWidget 
      readingTime={frontmatter.readingTime}
      wordCount={frontmatter.wordCount}
      publishDate={frontmatter.publishDate}
      lastModified={frontmatter.lastModified}
      category={frontmatter.category}
      tags={frontmatter.tags}
      author={frontmatter.author}
    />
    
    <TableOfContents />
  </aside>
</div>
```

## 🎨 **Visual Design**

### **Layout Structure:**
```
┌─────────────────────────┐
│ 📊 Statistik Artikel    │ ← Widget Header
├─────────────────────────┤
│ ⏱️  Waktu Baca          │ ← Stat Item
│ 📄  Jumlah Kata         │ ← Stat Item
│ 📅  Diterbitkan         │ ← Stat Item
│ 🔄  Terakhir Diperbarui │ ← Stat Item
│ 🏷️  Kategori            │ ← Stat Item
│ 👤  Penulis             │ ← Stat Item
├─────────────────────────┤
│ Tags: [Astro] [TypeScript] │ ← Widget Footer
└─────────────────────────┘
```

### **Color Scheme:**
- **Primary**: Blue (`primary-600`, `primary-100`)
- **Text**: Neutral (`neutral-800`, `neutral-600`)
- **Background**: White (`white`) / Dark (`neutral-900`)
- **Borders**: Light Gray (`neutral-200`) / Dark Gray (`neutral-700`)

### **Icons:**
- **Widget Title**: Bar Chart icon
- **Reading Time**: Clock icon
- **Word Count**: Document icon
- **Publish Date**: Calendar icon
- **Last Modified**: Refresh icon
- **Category**: Tag icon
- **Author**: User icon

## 🔧 **Customization**

### **Styling Options:**

#### **1. Custom CSS Classes:**
```astro
<ArticleStatsWidget className="custom-stats-widget" />
```

```css
.custom-stats-widget {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.custom-stats-widget .stat-item {
  padding: 12px;
  border-radius: 8px;
}
```

#### **2. Theme Customization:**
```css
/* Custom primary color */
.article-stats-widget .stat-icon {
  background-color: #your-color;
  color: #your-text-color;
}

/* Custom hover effects */
.article-stats-widget:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
```

### **Data Formatting:**

#### **1. Custom Date Format:**
```typescript
// Override formatDate function
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};
```

#### **2. Custom Reading Time:**
```typescript
// Override formatReadingTime function
const formatReadingTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};
```

## 📱 **Responsive Behavior**

### **Desktop (≥768px):**
- Full widget dengan semua statistik
- Icons berukuran 16x16px
- Padding 16px
- Hover effects aktif

### **Mobile (<768px):**
- Compact layout
- Icons berukuran 12x12px
- Padding 12px
- Hover effects dinonaktifkan
- Text lebih kecil untuk menghemat ruang

## 🌙 **Dark Mode Support**

### **Automatic Dark Mode:**
Widget otomatis mengikuti tema dark mode menggunakan CSS classes:
- `.dark .article-stats-widget`
- `.dark .stat-item`
- `.dark .widget-title`

### **Dark Mode Colors:**
- **Background**: `neutral-900`
- **Text**: `neutral-200`
- **Borders**: `neutral-700`
- **Icons**: `primary-400`
- **Tags**: `primary-300` dengan background `primary-900`

## 🧪 **Testing**

### **Manual Testing:**
```bash
# Test di development mode
pnpm run dev

# Buka halaman blog dengan ArticleStatsWidget
# Test responsive behavior
# Test dark mode toggle
# Test hover effects
```

### **Test Cases:**
1. **Basic Rendering**: Widget muncul dengan data default
2. **Custom Props**: Widget menampilkan data custom dengan benar
3. **Empty Tags**: Widget tidak menampilkan section tags jika array kosong
4. **No Last Modified**: Widget tidak menampilkan "Terakhir Diperbarui" jika tidak ada
5. **Responsive**: Widget responsive di berbagai ukuran layar
6. **Dark Mode**: Widget mengikuti tema dark mode
7. **Hover Effects**: Hover effects bekerja dengan smooth

## 📈 **Performance**

### **Optimizations:**
- **CSS-in-JS**: Styles di-inline untuk mengurangi HTTP requests
- **Minimal JavaScript**: Tidak ada JavaScript yang diperlukan
- **Efficient Rendering**: Hanya render statistik yang diperlukan
- **Lazy Loading**: Widget bisa di-lazy load jika diperlukan

### **Bundle Size:**
- **Component**: ~2KB (gzipped)
- **Styles**: ~1.5KB (gzipped)
- **Total**: ~3.5KB (gzipped)

## 🔗 **Integration**

### **With Astro Content Collections:**
```typescript
// src/content/config.ts
export const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    lastModified: z.date().optional(),
    readingTime: z.number().optional(),
    wordCount: z.number().optional(),
    category: z.enum(['technical', 'tutorial', 'insights']),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
  }),
});
```

### **With Frontmatter:**
```markdown
---
title: "Article Stats Widget"
description: "Komponen untuk menampilkan statistik artikel"
publishDate: 2024-01-26
lastModified: 2024-01-27
readingTime: 8
wordCount: 2500
category: technical
tags: [Astro, TypeScript, Widget]
author: Sandikodev
---
```

## 🎊 **Benefits**

### **✅ User Experience:**
- **Quick Overview**: Pembaca bisa melihat informasi artikel dengan cepat
- **Reading Time**: Membantu pembaca mengestimasi waktu yang dibutuhkan
- **Article Metadata**: Informasi lengkap tentang artikel
- **Visual Appeal**: Design yang menarik dan konsisten

### **✅ Developer Experience:**
- **Easy Integration**: Mudah diintegrasikan dengan Astro
- **Flexible Props**: Banyak opsi konfigurasi
- **TypeScript Support**: Full type safety
- **Responsive**: Otomatis responsive tanpa konfigurasi tambahan

### **✅ SEO Benefits:**
- **Structured Data**: Informasi artikel yang terstruktur
- **Rich Snippets**: Bisa digunakan untuk rich snippets
- **User Engagement**: Meningkatkan engagement dengan informasi yang berguna

---

**🎯 Status**: ✅ **ARTICLE STATS WIDGET COMPONENT CREATED**

**📈 Impact**: Reusable component untuk menampilkan statistik artikel

**🚀 Next Action**: Integrate dengan blog layout dan test functionality

**🔍 Features**: 
- **Comprehensive Stats**: Waktu baca, kata, tanggal, kategori, penulis
- **Responsive Design**: Optimal di desktop dan mobile
- **Dark Mode Support**: Otomatis mengikuti tema
- **TypeScript Support**: Full type safety
- **Customizable**: Banyak opsi konfigurasi
