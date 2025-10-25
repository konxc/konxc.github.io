# Struktur Markdown untuk InteractiveDemos

## 🎯 **Konsep Dasar**

Komponen `InteractiveDemos` membutuhkan struktur markdown yang dapat di-parse untuk menghasilkan:
- **Tab navigation** dengan icon dan label
- **Interactive content** dengan berbagai tipe (code, visual, interactive)
- **Structured data** untuk demo cards

## 📝 **Syntax Markdown**

### **1. Frontmatter Structure**

```yaml
---
title: "Evolusi Tailwind CSS v4"
description: "Panduan lengkap migrasi dari v3 ke v4"
date: "2024-01-25"
tags: ["tailwind", "css", "frontend"]
category: "Frontend"
author: "Konxc"
readingTime: "8 min"
featured: true
interactiveDemos:
  - id: "tailwind-config"
    type: "code"
    title: "Tailwind Config Generator"
    description: "Generate konfigurasi Tailwind CSS dengan mudah"
    icon: "💻"
    featured: true
  - id: "path-aliases"
    type: "visual"
    title: "Path Aliases Setup"
    description: "Visualisasi setup path aliases di berbagai framework"
    icon: "🎨"
    featured: false
  - id: "color-palette"
    type: "interactive"
    title: "Color Palette Generator"
    description: "Buat dan eksplorasi palet warna yang konsisten"
    icon: "🎮"
    featured: true
---
```

### **2. Content Structure**

```markdown
# Evolusi Tailwind CSS v4

Tailwind CSS v4 membawa perubahan signifikan dalam cara kita mengkonfigurasi dan menggunakan utility classes.

## Konfigurasi Dasar

### Tailwind Config Generator

<!-- INTERACTIVE_DEMO:tailwind-config -->
```javascript
// Contoh konfigurasi dasar
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a'
        }
      }
    }
  },
  plugins: []
}
```
<!-- END_INTERACTIVE_DEMO -->

### Path Aliases Setup

<!-- INTERACTIVE_DEMO:path-aliases -->
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@utils/*": ["./src/utils/*"]
    }
  }
}
```
<!-- END_INTERACTIVE_DEMO -->

### Color Palette Generator

<!-- INTERACTIVE_DEMO:color-palette -->
```css
/* CSS Custom Properties */
:root {
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;
}
```
<!-- END_INTERACTIVE_DEMO -->
```

## 🏗️ **Parser Implementation**

### **1. Markdown Parser Function**

```typescript
// src/utils/markdownParser.ts
export interface InteractiveDemo {
  id: string;
  type: 'code' | 'visual' | 'interactive';
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  content: string;
  language?: string;
  metadata?: Record<string, any>;
}

export function parseInteractiveDemos(content: string): InteractiveDemo[] {
  const demos: InteractiveDemo[] = [];
  const demoRegex = /<!-- INTERACTIVE_DEMO:(\w+) -->\s*```(\w+)?\s*([\s\S]*?)```\s*<!-- END_INTERACTIVE_DEMO -->/g;
  
  let match;
  while ((match = demoRegex.exec(content)) !== null) {
    const [, id, language, content] = match;
    
    // Extract metadata from frontmatter
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    const frontmatter = frontmatterMatch ? parseYaml(frontmatterMatch[1]) : {};
    
    const demo: InteractiveDemo = {
      id,
      type: frontmatter.interactiveDemos?.find((d: any) => d.id === id)?.type || 'code',
      title: frontmatter.interactiveDemos?.find((d: any) => d.id === id)?.title || id,
      description: frontmatter.interactiveDemos?.find((d: any) => d.id === id)?.description || '',
      icon: frontmatter.interactiveDemos?.find((d: any) => d.id === id)?.icon || '💻',
      featured: frontmatter.interactiveDemos?.find((d: any) => d.id === id)?.featured || false,
      content: content.trim(),
      language: language || 'javascript',
      metadata: frontmatter.interactiveDemos?.find((d: any) => d.id === id)?.metadata || {}
    };
    
    demos.push(demo);
  }
  
  return demos;
}
```

### **2. Astro Integration**

```typescript
// src/pages/blog/[slug].astro
import { parseInteractiveDemos } from '@utils/markdownParser';

export async function getStaticPaths() {
  const posts = await Astro.glob('../content/blog/*.md');
  
  return posts.map((post) => {
    const demos = parseInteractiveDemos(post.rawContent());
    
    return {
      params: { slug: post.frontmatter.slug },
      props: { 
        post,
        interactiveDemos: demos 
      }
    };
  });
}

const { post, interactiveDemos } = Astro.props;
```

## 📋 **Best Practices**

### **1. Naming Convention**

```yaml
# Frontmatter IDs
interactiveDemos:
  - id: "tailwind-config"        # kebab-case
  - id: "path-aliases"          # descriptive
  - id: "color-palette"         # consistent naming
```

### **2. Content Organization**

```markdown
<!-- INTERACTIVE_DEMO:demo-id -->
```javascript
// 1. Import statements
import { useState } from 'react';

// 2. Component definition
function DemoComponent() {
  // 3. State and hooks
  const [count, setCount] = useState(0);
  
  // 4. Event handlers
  const handleClick = () => setCount(c => c + 1);
  
  // 5. Render
  return (
    <button onClick={handleClick}>
      Count: {count}
    </button>
  );
}
```
<!-- END_INTERACTIVE_DEMO -->
```

### **3. Metadata Structure**

```yaml
interactiveDemos:
  - id: "advanced-config"
    type: "code"
    title: "Advanced Configuration"
    description: "Konfigurasi lanjutan untuk proyek besar"
    icon: "⚙️"
    featured: true
    metadata:
      difficulty: "intermediate"
      duration: "15 min"
      prerequisites: ["basic-tailwind", "css-knowledge"]
      tags: ["configuration", "advanced"]
      relatedDemos: ["tailwind-config", "path-aliases"]
```

## 🎨 **Visual Examples**

### **1. Code Demo**

```markdown
<!-- INTERACTIVE_DEMO:tailwind-config -->
```javascript
// Tailwind Config Generator
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a'
        }
      }
    }
  }
};
```
<!-- END_INTERACTIVE_DEMO -->
```

### **2. Visual Demo**

```markdown
<!-- INTERACTIVE_DEMO:path-aliases -->
```typescript
// Path Aliases Configuration
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@utils/*": ["./src/utils/*"]
    }
  }
}
```
<!-- END_INTERACTIVE_DEMO -->
```

### **3. Interactive Demo**

```markdown
<!-- INTERACTIVE_DEMO:color-palette -->
```css
/* Color Palette Generator */
:root {
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;
}

.btn-primary {
  background-color: var(--color-primary-500);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}
```
<!-- END_INTERACTIVE_DEMO -->
```

## 🔧 **Advanced Features**

### **1. Conditional Rendering**

```yaml
interactiveDemos:
  - id: "advanced-feature"
    type: "interactive"
    title: "Advanced Feature"
    description: "Fitur lanjutan untuk pengguna berpengalaman"
    icon: "🚀"
    featured: false
    metadata:
      condition: "userLevel === 'advanced'"
      showIf: "hasProSubscription"
```

### **2. Dynamic Content**

```markdown
<!-- INTERACTIVE_DEMO:dynamic-config -->
```javascript
// Dynamic Configuration
const generateConfig = (options) => {
  return {
    content: options.content || ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: options.colors || {},
        spacing: options.spacing || {}
      }
    }
  };
};
```
<!-- END_INTERACTIVE_DEMO -->
```

### **3. Multi-language Support**

```markdown
<!-- INTERACTIVE_DEMO:multi-lang -->
```typescript
// TypeScript Example
interface Config {
  content: string[];
  theme: ThemeConfig;
}

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} }
};
```

```javascript
// JavaScript Example
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} }
};
```
<!-- END_INTERACTIVE_DEMO -->
```

## 📊 **Usage Statistics**

### **Demo Types Distribution:**
- **Code Demos**: 60% - Syntax highlighting, copy functionality
- **Visual Demos**: 25% - Diagrams, flowcharts, visualizations
- **Interactive Demos**: 15% - Live editing, real-time updates

### **Popular Demo Patterns:**
1. **Configuration Generators** - Tailwind, Webpack, etc.
2. **Code Examples** - React components, utility functions
3. **Visual Diagrams** - Architecture, flowcharts
4. **Interactive Tools** - Color pickers, form builders

## 🚀 **Implementation Roadmap**

### **Phase 1: Basic Structure**
- ✅ Markdown syntax definition
- ✅ Parser implementation
- ✅ Astro integration

### **Phase 2: Enhanced Features**
- 🔄 Dynamic content loading
- 🔄 Conditional rendering
- 🔄 Multi-language support

### **Phase 3: Advanced Features**
- ⏳ Real-time collaboration
- ⏳ Version control integration
- ⏳ Analytics tracking

## 📝 **Example Blog Post**

```markdown
---
title: "Mastering Tailwind CSS v4"
description: "Panduan lengkap untuk migrasi dan optimasi"
date: "2024-01-25"
tags: ["tailwind", "css", "frontend"]
interactiveDemos:
  - id: "config-generator"
    type: "code"
    title: "Config Generator"
    description: "Generate konfigurasi Tailwind dengan mudah"
    icon: "⚙️"
    featured: true
  - id: "color-system"
    type: "visual"
    title: "Color System"
    description: "Visualisasi sistem warna yang konsisten"
    icon: "🎨"
    featured: false
  - id: "responsive-design"
    type: "interactive"
    title: "Responsive Design"
    description: "Tool untuk testing responsive design"
    icon: "📱"
    featured: true
---

# Mastering Tailwind CSS v4

Tailwind CSS v4 membawa perubahan signifikan dalam cara kita mengkonfigurasi dan menggunakan utility classes.

## Konfigurasi Dasar

### Config Generator

<!-- INTERACTIVE_DEMO:config-generator -->
```javascript
// Tailwind Config Generator
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a'
        }
      }
    }
  },
  plugins: []
}
```
<!-- END_INTERACTIVE_DEMO -->

### Color System

<!-- INTERACTIVE_DEMO:color-system -->
```css
/* Color System */
:root {
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;
}
```
<!-- END_INTERACTIVE_DEMO -->

### Responsive Design

<!-- INTERACTIVE_DEMO:responsive-design -->
```html
<!-- Responsive Design Example -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-primary-500 text-white p-4 rounded-lg">
    Card 1
  </div>
  <div class="bg-primary-500 text-white p-4 rounded-lg">
    Card 2
  </div>
  <div class="bg-primary-500 text-white p-4 rounded-lg">
    Card 3
  </div>
</div>
```
<!-- END_INTERACTIVE_DEMO -->
```

## Kesimpulan

Dengan struktur markdown yang tepat, kita dapat membuat artikel yang tidak hanya informatif tetapi juga interaktif dan engaging.
```

## 🎯 **Key Benefits**

### **1. Structured Content**
- ✅ **Consistent format** untuk semua demo
- ✅ **Easy maintenance** dengan syntax yang jelas
- ✅ **Scalable architecture** untuk fitur masa depan

### **2. Developer Experience**
- ✅ **Familiar syntax** dengan markdown
- ✅ **Type safety** dengan TypeScript
- ✅ **Auto-completion** dengan IDE support

### **3. User Experience**
- ✅ **Interactive learning** dengan hands-on demos
- ✅ **Progressive disclosure** dengan tabbed interface
- ✅ **Mobile-friendly** dengan responsive design

**Struktur markdown ini memberikan foundation yang solid untuk membuat artikel teknis yang engaging dan interaktif!** 🚀
