# Path Aliases Best Practices - KonXC Project

## 📚 **Referensi Dokumentasi Resmi:**

- [Astro TypeScript Guide - Import Aliases](https://docs.astro.build/en/guides/typescript/#import-aliases)
- [Astro TypeScript Guide - Extending Global Types](https://docs.astro.build/en/guides/typescript/#extending-global-types)
- [TypeScript Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)

## ✅ **Best Practice Implementation:**

### **1. Konfigurasi di `tsconfig.json` (Recommended)**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
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

### **2. Custom Types di `src/env.d.ts`**

```typescript
/// <reference path="../.astro/types.d.ts" />

// Custom types declarations for KonXC project
declare namespace App {
  interface Locals {
    // Add any custom locals types here
  }
}

// Extend global types if needed
declare global {
  // Add global type declarations here
}

export {};
```

### **3. Minimal `.astro/types.d.ts`**

```typescript
/// <reference types="astro/client" />
/// <reference path="content.d.ts" />
```

## ❌ **Anti-Patterns (Yang Harus Dihindari):**

### **1. Manual Module Declarations dengan `any`**

```typescript
// ❌ DON'T DO THIS
declare module '@components/*' {
  const component: any;
  export default component;
}
```

**Masalah:**
- Menggunakan `any` type menghilangkan type safety
- Bypassing TypeScript's built-in module resolution
- Tidak mengikuti Astro's recommended approach

### **2. Overriding Astro's Built-in Types**

```typescript
// ❌ DON'T DO THIS
declare module 'astro:content' {
  // Custom implementations
}
```

## ✅ **Correct Approach:**

### **1. Let TypeScript Handle Module Resolution**

TypeScript akan otomatis mengenali path aliases dari `tsconfig.json` tanpa perlu manual declarations.

### **2. Use Proper Type Definitions**

```typescript
// ✅ DO THIS - Proper component props typing
export interface Props {
  title: string;
  description?: string;
}

// ✅ DO THIS - Proper import with type safety
import type { CollectionEntry } from 'astro:content';
import MainLayout from '@layouts/MainLayout.astro';
```

### **3. Leverage Astro's Built-in Types**

```typescript
// ✅ DO THIS - Use Astro's built-in types
import type { HTMLAttributes } from 'astro/types';

interface Props extends HTMLAttributes<'div'> {
  customProp?: string;
}
```

## 🔧 **Troubleshooting Path Aliases:**

### **1. IDE Not Recognizing Aliases**

**Solution:**
```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P -> "TypeScript: Restart TS Server"

# Or restart development server
pnpm dev
```

### **2. Build Errors with Aliases**

**Solution:**
```bash
# Clear cache and rebuild
rm -rf .astro dist
pnpm build
```

### **3. Type Checking Issues**

**Solution:**
```bash
# Run type checking
pnpm astro check
```

## 📋 **File Structure Best Practices:**

```
src/
├── env.d.ts              # Custom type declarations
├── components/
│   ├── ui/               # Basic UI components
│   ├── sections/         # Page sections
│   └── blog/             # Blog-specific components
├── layouts/              # Layout templates
├── pages/                # Route pages
├── styles/               # CSS files
├── utils/                # Utility functions
├── types/                # TypeScript type definitions
└── content/              # Content collections
```

## 🎯 **Benefits of Correct Implementation:**

### **1. Type Safety**
- Full TypeScript support tanpa `any` types
- IntelliSense dan auto-completion yang akurat
- Compile-time error checking

### **2. Maintainability**
- Mengikuti Astro's recommended patterns
- Mudah di-maintain dan di-update
- Konsisten dengan ecosystem Astro

### **3. Performance**
- Tidak ada overhead dari manual type declarations
- Leveraging TypeScript's built-in optimizations
- Better tree-shaking dan bundling

## 📚 **Additional Resources:**

- [Astro TypeScript Guide](https://docs.astro.build/en/guides/typescript/)
- [TypeScript Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
- [Astro VS Code Extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)

---

*Dokumentasi ini dibuat berdasarkan Astro's official documentation dan TypeScript best practices untuk memastikan implementasi yang benar dan maintainable.*
