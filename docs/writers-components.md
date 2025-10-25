# Writers Components Documentation

## Struktur Komponen Writers

Halaman writers telah dipecah menjadi komponen-komponen modular yang dapat digunakan kembali:

### 1. **WritersHero.astro**
- **Fungsi**: Hero section dengan statistik penulis
- **Props**: `totalWriters`, `totalBlogPosts`, `totalContributions`
- **Penggunaan**: Menampilkan header utama dengan statistik

### 2. **WritersGrid.astro**
- **Fungsi**: Grid layout untuk menampilkan daftar penulis
- **Props**: 
  - `writers`: Array of contributors
  - `variant`: 'default' | 'compact' | 'minimal'
  - `showStats`, `showExpertise`, `showActions`: Boolean flags
- **Penggunaan**: Layout grid untuk kartu penulis

### 3. **WriterCard.astro**
- **Fungsi**: Kartu individual untuk setiap penulis
- **Props**:
  - `writer`: CollectionEntry<'contributors'>
  - `variant`: 'default' | 'compact' | 'minimal'
  - `showStats`, `showExpertise`, `showActions`: Boolean flags
- **Penggunaan**: Komponen kartu yang dapat digunakan di berbagai tempat

### 4. **WritersStats.astro**
- **Fungsi**: Komponen statistik yang dapat digunakan kembali
- **Props**:
  - `totalWriters`, `totalBlogPosts`, `totalContributions`
  - `variant`: 'hero' | 'compact' | 'minimal'
- **Penggunaan**: Statistik dengan berbagai variasi tampilan

### 5. **WritersCTA.astro**
- **Fungsi**: Call-to-action section
- **Props**: Tidak ada props khusus
- **Penggunaan**: Section untuk mengajak bergabung sebagai penulis

### 6. **ContentRecommendations.astro**
- **Fungsi**: Rekomendasi konten yang modular
- **Props**:
  - `context`: 'blog' | 'writers' | 'contributors' | 'general'
  - `algorithm`: 'similarity' | 'popularity' | 'recent' | 'hybrid'
  - `maxRecommendations`: number
  - `title`, `subtitle`: string
  - `variant`: 'default' | 'compact' | 'minimal'
- **Penggunaan**: Rekomendasi artikel dengan konfigurasi fleksibel

### 7. **WritersSection.astro**
- **Fungsi**: Komponen utama yang menggabungkan semua komponen writers
- **Props**:
  - `writers`: Array of contributors
  - `totalWriters`, `totalBlogPosts`, `totalContributions`: numbers
  - `showRecommendations`, `showCTA`: boolean flags
  - `recommendationsConfig`: object untuk konfigurasi rekomendasi
- **Penggunaan**: Komponen lengkap untuk halaman writers

## Cara Penggunaan

### Penggunaan Individual
```astro
<!-- Hero Section -->
<WritersHero 
  totalWriters={10}
  totalBlogPosts={50}
  totalContributions={100}
/>

<!-- Grid dengan WriterCard -->
<WritersGrid 
  writers={writers}
  variant="default"
  showStats={true}
  showExpertise={true}
  showActions={true}
/>

<!-- Content Recommendations -->
<ContentRecommendations 
  context="writers"
  algorithm="hybrid"
  maxRecommendations={6}
  title="Artikel dari Penulis Kami"
/>
```

### Penggunaan Lengkap dengan WritersSection
```astro
<WritersSection 
  writers={sortedWriters}
  totalWriters={totalWriters}
  totalBlogPosts={totalBlogPosts}
  totalContributions={totalContributions}
  showRecommendations={true}
  showCTA={true}
  recommendationsConfig={{
    algorithm: 'hybrid',
    maxRecommendations: 6,
    title: 'Artikel dari Penulis Kami',
    subtitle: 'Temukan karya terbaik dari tim penulis KonXC'
  }}
/>
```

## Keuntungan Struktur Modular

1. **Reusability**: Komponen dapat digunakan di berbagai halaman
2. **Maintainability**: Mudah untuk di-maintain dan di-update
3. **Flexibility**: Dapat dikustomisasi sesuai kebutuhan
4. **Consistency**: Tampilan yang konsisten di seluruh aplikasi
5. **Performance**: Komponen dapat di-optimize secara individual

## Variant Options

### WriterCard Variants
- **default**: Kartu lengkap dengan semua informasi
- **compact**: Kartu ringkas dengan informasi penting
- **minimal**: Kartu minimal dengan informasi dasar

### ContentRecommendations Variants
- **default**: Layout standar dengan 3 kolom
- **compact**: Layout ringkas dengan 2 kolom
- **minimal**: Layout minimal dengan 3 kolom kecil

### Context Options
- **blog**: Untuk halaman blog
- **writers**: Untuk halaman writers
- **contributors**: Untuk halaman contributors
- **general**: Untuk penggunaan umum
