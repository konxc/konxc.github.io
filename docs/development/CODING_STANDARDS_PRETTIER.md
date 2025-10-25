# Coding Standards - Prettier Configuration

## 📋 Overview

This project uses **Prettier** with **Astro and Tailwind CSS plugins** to ensure consistent code formatting and automatic class sorting across the entire development ecosystem.

## 🎯 Prettier Configuration

### **Current Settings (`.prettierrc`)**

```json
{
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  "overrides": [
    {
      "files": "*.astro",
      "options": {
        "parser": "astro"
      }
    }
  ]
}
```

### **🚀 Key Features:**

#### **1. Astro-Specific Formatting**
- ✅ **Native .astro parsing** - Proper component structure formatting
- ✅ **Frontmatter formatting** - TypeScript code in `---` blocks
- ✅ **Template formatting** - HTML/JSX with Astro syntax
- ✅ **Style block formatting** - CSS within `<style>` tags

#### **2. Tailwind CSS Class Sorting**
- ✅ **Automatic class ordering** - Layout → Spacing → Colors → Effects
- ✅ **Responsive-first sorting** - `sm:` → `md:` → `lg:` → `xl:`
- ✅ **Consistent class structure** - Reduces git conflicts
- ✅ **Better readability** - Logical class organization

### **📦 Dependencies**

```json
{
  "devDependencies": {
    "prettier": "3.6.2",
    "prettier-plugin-astro": "0.14.1",
    "prettier-plugin-tailwindcss": "0.7.1"
  }
}
```

## 🚀 Usage & Scripts

### **1. Package.json Scripts**

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "format:astro": "prettier --write \"src/**/*.astro\"",
    "format:staged": "prettier --write --staged",
    "pre-commit": "npm run format:staged && npm run format:check",
    "pre-push": "npm run format:check && git pull --rebase origin main"
  }
}
```

### **2. Development Workflow Scripts**

#### **A. Pre-Commit Workflow**
```bash
# Format staged files and check all files
pnpm run pre-commit
```

#### **B. Pre-Push Workflow**
```bash
# Check formatting and sync with remote
pnpm run pre-push
```

#### **C. Manual Formatting**
```bash
# Format all files
pnpm run format

# Check formatting without changes
pnpm run format:check

# Format only Astro files
pnpm run format:astro
```

## 🔄 Git Workflow Integration

### **1. Recommended Workflow**

```bash
# 1. Before starting work
git pull origin main
pnpm run format:check

# 2. During development
# (Auto-format on save in IDE)

# 3. Before commit
pnpm run format:staged
git add .
git commit -m "feat: your changes"

# 4. Before push
pnpm run pre-push
git push origin your-branch
```

### **2. Automated Git Hooks (Optional)**

#### **Install Husky + lint-staged**
```bash
pnpm add -D husky lint-staged
```

#### **Package.json Configuration**
```json
{
  "lint-staged": {
    "*.{js,ts,astro,json,md}": ["prettier --write"],
    "*.astro": ["prettier --write --parser astro"]
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run format:check"
    }
  }
}
```

## 🎨 Code Style Examples

### **✅ Correct Formatting**

#### **Astro Component**
```astro
---
import type { CollectionEntry } from "astro:content";
import Layout from "@layouts/Layout.astro";

export interface Props {
  title: string;
  posts: CollectionEntry<"blog">[];
}

const { title, posts } = Astro.props;
---

<Layout title={title}>
  <main class="container mx-auto px-4 py-8">
    <h1 class="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
      {title}
    </h1>
    
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
          <h2 class="mb-2 text-xl font-semibold">
            <a href={`/blog/${post.slug}`} class="text-blue-600 hover:text-blue-800 dark:text-blue-400">
              {post.data.title}
            </a>
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            {post.data.description}
          </p>
        </article>
      ))}
    </div>
  </main>
</Layout>

<style>
  .container {
    max-width: 1200px;
  }
</style>
```

#### **TypeScript**
```typescript
// Interfaces and types
export interface BlogPost {
  title: string;
  slug: string;
  publishDate: Date;
  tags: string[];
}

// Functions with proper formatting
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

// Arrays and objects
const blogConfig = {
  postsPerPage: 10,
  categories: ["tech", "business", "tutorial"],
  featuredTags: ["astro", "typescript", "tailwind"],
};
```

### **🎯 Tailwind Class Ordering**

#### **Before (Random Order)**
```astro
<div class="text-white bg-blue-500 p-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-lg">
```

#### **After (Auto-Sorted)**
```astro
<div class="rounded-lg bg-blue-500 p-4 text-white shadow-lg transition-colors duration-200 hover:bg-blue-600">
```

## 🔧 IDE Integration

### **VS Code Settings**

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "[astro]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### **Required Extensions**
- Prettier - Code formatter
- Astro (for .astro file support)
- Tailwind CSS IntelliSense

## 🚨 Troubleshooting

### **Common Issues**

#### **1. Prettier not formatting .astro files**
```bash
# Install missing plugin
pnpm add -D prettier-plugin-astro
```

#### **2. Tailwind classes not sorting**
```bash
# Install missing plugin
pnpm add -D prettier-plugin-tailwindcss
```

#### **3. Git conflicts on formatting**
```bash
# Sync formatting before merge
git pull origin main
pnpm run format
git add .
git commit -m "style: sync formatting"
```

## 📊 Benefits

### **For Development**
- ✅ **Zero manual formatting** - Automatic on save
- ✅ **Consistent Tailwind classes** - Always sorted
- ✅ **Proper Astro formatting** - Native component support
- ✅ **Reduced cognitive load** - Focus on logic, not style

### **For Collaboration**
- ✅ **No style debates** - Prettier decides everything
- ✅ **Clean git diffs** - Only meaningful changes
- ✅ **Faster code reviews** - Consistent formatting
- ✅ **Reduced conflicts** - Sorted classes prevent merge issues

### **For Codebase**
- ✅ **Professional appearance** - Consistent, clean code
- ✅ **Better maintainability** - Easier to read and modify
- ✅ **Scalable architecture** - Works with any team size
- ✅ **Future-proof** - Latest plugin versions

---

**With this optimized configuration, the Koneksi development ecosystem maintains professional, consistent, and conflict-free code formatting automatically! 🎉**