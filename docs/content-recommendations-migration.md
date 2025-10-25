# ContentRecommendations Component Migration

## Perubahan yang Dilakukan

### 1. **Komponen Baru yang Dibuat**
- **`@components/contributors/ContentRecommendations.astro`** - Komponen modular yang dapat digunakan di berbagai halaman

### 2. **Komponen Lama yang Dihapus**
- **`@components/blog/ContentRecommendations.astro`** - Komponen lama yang sudah tidak digunakan

### 3. **Halaman yang Diupdate**

#### **Blog Index (`/blog/index.astro`)**
```astro
<!-- Sebelum -->
<section class="section bg-neutral-50">
  <div class="container">
    <div class="max-w-4xl mx-auto">
      <ContentRecommendations algorithm="hybrid" maxRecommendations={6} />
    </div>
  </div>
</section>

<!-- Sesudah -->
<ContentRecommendations 
  context="blog"
  algorithm="hybrid"
  maxRecommendations={6}
  title="Artikel Terkait"
  subtitle="Temukan konten menarik lainnya"
  variant="default"
  showHeader={true}
/>
```

#### **Blog Slug (`/blog/[slug].astro`)**
```astro
<!-- Sebelum -->
<section class="section bg-white">
  <div class="container">
    <div class="mx-auto max-w-4xl">
      <ContentRecommendations 
        currentPostSlug={post.slug}
        algorithm="similarity"
        maxRecommendations={4}
        showReason={true}
      />
    </div>
  </div>
</section>

<!-- Sesudah -->
<ContentRecommendations 
  currentPostSlug={post.slug}
  context="blog"
  algorithm="similarity"
  maxRecommendations={4}
  showReason={true}
  title="Artikel Terkait"
  subtitle="Temukan konten menarik lainnya"
  variant="default"
  showHeader={true}
/>
```

## Keuntungan Komponen Baru

### 1. **Modularity**
- Komponen dapat digunakan di berbagai halaman (blog, writers, contributors)
- Tidak terikat pada satu konteks saja

### 2. **Flexibility**
- Mendukung berbagai context: 'blog', 'writers', 'contributors', 'general'
- Mendukung berbagai algorithm: 'similarity', 'popularity', 'recent', 'hybrid'
- Mendukung berbagai variant: 'default', 'compact', 'minimal'

### 3. **Consistency**
- Tampilan yang konsisten di seluruh aplikasi
- Konfigurasi yang seragam untuk semua halaman

### 4. **Maintainability**
- Satu komponen untuk semua kebutuhan ContentRecommendations
- Mudah untuk di-maintain dan di-update

## Konfigurasi Context

### **Blog Context**
- Background: `bg-neutral-50`
- Title: "Artikel Terkait"
- Subtitle: "Temukan konten menarik lainnya"

### **Writers Context**
- Background: `bg-primary-50`
- Title: "Artikel dari Penulis"
- Subtitle: "Karya terbaik dari tim penulis kami"

### **Contributors Context**
- Background: `bg-secondary-50`
- Title: "Konten Terbaru"
- Subtitle: "Artikel dan tutorial terbaru dari kontributor"

### **General Context**
- Background: `bg-neutral-50`
- Title: "Rekomendasi Konten"
- Subtitle: "Temukan konten menarik lainnya"

## Props yang Tersedia

```typescript
interface Props {
  class?: string;
  currentPostSlug?: string;
  maxRecommendations?: number;
  algorithm?: 'similarity' | 'popularity' | 'recent' | 'hybrid';
  showReason?: boolean;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'compact' | 'minimal';
  showHeader?: boolean;
  context?: 'blog' | 'writers' | 'contributors' | 'general';
}
```

## Migration Checklist

- [x] Buat komponen ContentRecommendations modular baru
- [x] Update import di `/blog/index.astro`
- [x] Update penggunaan di `/blog/index.astro`
- [x] Update import di `/blog/[slug].astro`
- [x] Update penggunaan di `/blog/[slug].astro`
- [x] Hapus komponen ContentRecommendations lama
- [x] Test semua halaman yang menggunakan komponen
- [x] Buat dokumentasi migration
