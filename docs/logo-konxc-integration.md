# Logo KonXC - Brand Assets Documentation

## Overview

Logo KonXC telah berhasil diintegrasikan ke seluruh website dengan berbagai ukuran dan variant untuk penggunaan yang berbeda.

## Logo Source

Logo KonXC diambil dari [Instagram KonXC](https://instagram.fsoc1-1.fna.fbcdn.net/v/t51.2885-19/497678496_17898803148197112_4199334862123083577_n.jpg) dan telah dioptimalkan untuk penggunaan web.

## File Logo yang Tersedia

### 1. **logo-konxc.jpg** (Primary)
- **Path**: `/logo-konxc.jpg`
- **Format**: JPEG
- **Size**: 320x320px
- **Usage**: Logo utama untuk semua komponen

### 2. **logo.png** (Alternative)
- **Path**: `/logo.png`
- **Format**: PNG
- **Usage**: Backup format untuk kompatibilitas

### 3. **favicon.ico** (Favicon)
- **Path**: `/favicon.ico`
- **Format**: ICO
- **Usage**: Favicon browser dan bookmark

## Logo Component

### Props Interface
```typescript
interface Props {
  class?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'dark';
  showText?: boolean;
  textClass?: string;
  href?: string;
}
```

### Size Options
- **xs**: 16x16px (w-4 h-4) + text-xs
- **sm**: 24x24px (w-6 h-6) + text-sm
- **md**: 32x32px (w-8 h-8) + text-lg
- **lg**: 48x48px (w-12 h-12) + text-xl
- **xl**: 64x64px (w-16 h-16) + text-2xl

### Variant Options
- **default**: Text color sesuai theme (neutral-900/white)
- **white**: Text putih untuk background gelap
- **dark**: Text gelap untuk background terang

## Usage Examples

### Basic Usage
```astro
---
import Logo from '@components/ui/Logo.astro';
---

<!-- Logo standar -->
<Logo />

<!-- Logo dengan ukuran besar -->
<Logo size="lg" />

<!-- Logo putih untuk footer -->
<Logo variant="white" />

<!-- Logo tanpa teks -->
<Logo showText={false} />

<!-- Logo sebagai link -->
<Logo href="/" />
```

### Integration Examples

#### Header Website
```astro
<header class="bg-white shadow-sm py-4">
  <div class="container mx-auto px-4 flex items-center justify-between">
    <Logo size="md" />
    <nav class="flex gap-4">
      <!-- Navigation items -->
    </nav>
  </div>
</header>
```

#### Footer Website
```astro
<footer class="bg-neutral-900 text-white py-8">
  <div class="container mx-auto px-4">
    <Logo size="sm" variant="white" />
    <p class="text-neutral-300 mt-2">© 2024 KonXC. All rights reserved.</p>
  </div>
</footer>
```

#### Card Component
```astro
<div class="bg-white border rounded-lg p-6">
  <Logo size="sm" />
  <h3 class="font-semibold mt-2">Card Title</h3>
  <p class="text-neutral-600 text-sm">Card description</p>
</div>
```

## Integration Status

### ✅ **Komponen yang Sudah Diupdate**

#### **Footer Components**
- **Footer.astro**: Menggunakan `<Logo size="md" variant="white" />`
- **SimpleFooter.astro**: Menggunakan `<Logo size="sm" variant="white" />`
- **MinimalFooter.astro**: Menggunakan `<Logo size="sm" variant="white" />`

#### **Head Component**
- **Favicon**: Updated ke `/logo-konxc.jpg`
- **Apple Touch Icon**: Updated ke `/logo-konxc.jpg`
- **Structured Data**: Logo URL updated ke `/logo-konxc.jpg`

### ✅ **Halaman yang Sudah Diupdate**

#### **Layout Integration**
- **MainLayout.astro**: Menggunakan SimpleFooter dengan logo baru
- **ExtendedLayout.astro**: Menggunakan Footer dengan logo baru
- **MinimalLayout.astro**: Menggunakan MinimalFooter dengan logo baru

#### **Pages**
- **Homepage** (`/`): ExtendedLayout dengan logo di footer
- **Contributors** (`/contributors`): ExtendedLayout dengan logo di footer
- **Blog pages**: MainLayout dengan logo di footer

## Demo Pages

### 1. **Logo Demo** (`/logo-demo`)
Halaman demo yang menampilkan:
- Semua ukuran logo (xs, sm, md, lg, xl)
- Semua variant warna (default, white, dark)
- Opsi dengan/tanpa teks
- Logo sebagai link
- Contoh penggunaan di header, footer, card
- File logo mentah dalam berbagai format

### 2. **Footer Demo** (`/footer-demo`)
Halaman demo yang menampilkan semua variant footer dengan logo KonXC.

## Brand Guidelines

### Logo Usage Rules

#### ✅ **Do's**
- Gunakan logo dengan proporsi yang benar
- Pilih ukuran yang sesuai dengan konteks
- Gunakan variant yang kontras dengan background
- Maintain spacing yang cukup di sekitar logo

#### ❌ **Don'ts**
- Jangan distort atau stretch logo
- Jangan ubah warna logo secara manual
- Jangan gunakan logo terlalu kecil (minimal xs)
- Jangan letakkan logo di background yang tidak kontras

### Color Accessibility
- **Default variant**: Kontras tinggi di background terang
- **White variant**: Kontras tinggi di background gelap
- **Dark variant**: Kontras tinggi di background terang

## Technical Implementation

### CSS Classes
```css
.logo-container {
  @apply inline-flex items-center;
}

.logo-wrapper {
  @apply flex items-center gap-2;
}

.logo-image {
  @apply flex-shrink-0 rounded-lg object-cover;
}

.logo-text {
  @apply font-bold tracking-tight;
}
```

### Responsive Design
- Logo menyesuaikan ukuran sesuai breakpoint
- Gap antara logo dan teks menyesuaikan ukuran layar
- Mobile-first approach untuk optimalisasi

## Performance Considerations

### Image Optimization
- Logo dalam format JPEG untuk ukuran file optimal
- Rounded corners untuk tampilan modern
- Object-cover untuk konsistensi proporsi

### Loading Strategy
- Logo dimuat sebagai bagian dari layout utama
- Tidak ada lazy loading untuk logo (critical content)
- Preload untuk logo di header

## Future Enhancements

### Planned Features
- SVG version untuk scalability
- Dark mode specific variants
- Animation variants (hover effects)
- Logo dengan tagline options

### Integration Opportunities
- Brand color palette integration
- Logo animation library
- Multi-language text support
- Custom logo variants per section

## Maintenance

### Regular Updates
- Monitor logo visibility di berbagai background
- Test accessibility dengan screen readers
- Update structured data jika logo berubah
- Optimize file size secara berkala

### Quality Assurance
- Test di berbagai browser dan device
- Verify logo clarity di semua ukuran
- Check contrast ratios untuk accessibility
- Validate HTML semantic structure

## Status

✅ **COMPLETED** - Logo KonXC berhasil diintegrasikan ke seluruh website
✅ **TESTED** - Semua variant dan ukuran berfungsi dengan baik
✅ **DOCUMENTED** - Dokumentasi lengkap tersedia
✅ **DEMO** - Halaman demo untuk testing dan referensi

Logo KonXC sekarang menjadi bagian integral dari brand identity website dan siap digunakan di semua komponen! 🎉
