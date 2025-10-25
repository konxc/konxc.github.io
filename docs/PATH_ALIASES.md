# Path Aliases di Astro - KonXC Project

## 📋 **Overview**

Project KonXC sekarang menggunakan path aliases untuk import yang lebih bersih dan mudah dipahami, mirip dengan Next.js.

## 🔧 **Konfigurasi**

Path aliases dikonfigurasi di `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@layouts/*": ["./src/layouts/*"],
      "@pages/*": ["./src/pages/*"],
      "@styles/*": ["./src/styles/*"],
      "@utils/*": ["./src/utils/*"],
      "@assets/*": ["./src/assets/*"],
      "@content/*": ["./src/content/*"],
      "@types/*": ["./src/types/*"]
    }
  }
}
```

## 📁 **Alias yang Tersedia**

| Alias | Path | Deskripsi |
|-------|------|-----------|
| `@/*` | `./src/*` | Root src directory |
| `@components/*` | `./src/components/*` | Komponen UI |
| `@layouts/*` | `./src/layouts/*` | Layout templates |
| `@pages/*` | `./src/pages/*` | Halaman website |
| `@styles/*` | `./src/styles/*` | File CSS/Styling |
| `@utils/*` | `./src/utils/*` | Utility functions |
| `@assets/*` | `./src/assets/*` | Static assets |
| `@content/*` | `./src/content/*` | Content collections |
| `@types/*` | `./src/types/*` | TypeScript type definitions |

## 💡 **Contoh Penggunaan**

### ❌ **Sebelum (Relative Imports):**
```typescript
// Dari src/pages/blog/[slug].astro
import MainLayout from '../../layouts/MainLayout.astro';
import Card from '../../components/ui/Card.astro';
import { getCollection } from 'astro:content';
```

### ✅ **Sesudah (Path Aliases):**
```typescript
// Dari src/pages/blog/[slug].astro
import MainLayout from '@layouts/MainLayout.astro';
import Card from '@components/ui/Card.astro';
import { getCollection } from 'astro:content';
```

## 🎯 **Keuntungan**

### 1. **Cleaner Code**
- Tidak perlu menghitung `../` untuk relative paths
- Import statements lebih pendek dan readable

### 2. **Better Refactoring**
- Jika file dipindah, import tidak perlu diupdate
- IDE bisa refactor dengan lebih akurat

### 3. **Consistent Structure**
- Semua developer menggunakan pattern yang sama
- Mudah untuk onboarding developer baru

### 4. **IntelliSense Support**
- Auto-completion yang lebih baik
- Type checking yang lebih akurat

## 📝 **Best Practices**

### 1. **Gunakan Alias yang Spesifik**
```typescript
// ✅ Good - Specific alias
import Button from '@components/ui/Button.astro';
import MainLayout from '@layouts/MainLayout.astro';

// ❌ Avoid - Generic alias
import Button from '@/components/ui/Button.astro';
```

### 2. **Konsisten dengan Naming**
```typescript
// ✅ Good - Consistent naming
import Hero from '@components/sections/Hero.astro';
import Services from '@components/sections/Services.astro';

// ❌ Avoid - Mixed naming
import Hero from '@components/sections/Hero.astro';
import Services from '@/components/sections/Services.astro';
```

### 3. **Group Related Imports**
```typescript
// ✅ Good - Grouped imports
import { getCollection } from 'astro:content';
import MainLayout from '@layouts/MainLayout.astro';
import Card from '@components/ui/Card.astro';
import Button from '@components/ui/Button.astro';
```

## 🔄 **Migration Guide**

### Langkah-langkah untuk file yang belum diupdate:

1. **Identifikasi relative imports:**
```bash
# Cari semua relative imports
grep -r "from '\.\./" src/
```

2. **Update satu per satu:**
```typescript
// Before
import Component from '../../components/Component.astro';

// After  
import Component from '@components/Component.astro';
```

3. **Test setelah update:**
```bash
pnpm dev
```

## 🛠 **IDE Support**

### VS Code
- Otomatis mendukung path aliases dari `tsconfig.json`
- IntelliSense dan auto-completion bekerja dengan baik
- Go to definition berfungsi normal

### WebStorm/IntelliJ
- Mendukung TypeScript path mapping
- Auto-import menggunakan aliases
- Refactoring tools bekerja dengan aliases

## 📚 **Referensi**

- [Astro Documentation - Import Aliases](https://docs.astro.build/en/guides/imports/#aliases)
- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
- [Next.js Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases)

## 🚀 **Next Steps**

1. **Update semua file** yang masih menggunakan relative imports
2. **Buat utility functions** di `@utils/` untuk shared logic
3. **Organize components** dengan struktur yang lebih baik
4. **Document component APIs** untuk team development

---

*Dokumentasi ini dibuat untuk memastikan konsistensi dalam penggunaan path aliases di project KonXC.*
