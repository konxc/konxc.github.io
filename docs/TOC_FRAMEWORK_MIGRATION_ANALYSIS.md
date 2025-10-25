# 🚀 Migrasi TableOfContents ke Framework (Preact/React/Svelte)

## 🎯 **Analisis Masalah Saat Ini**

### **Kompleksitas Kode yang Tinggi:**
```javascript
// ❌ Vanilla JavaScript - Kompleks dan sulit maintain
function generateTOC() {
  const headings = document.querySelectorAll('.blog-content h2, h3, h4, h5, h6');
  const tocNav = document.getElementById('toc-nav');
  
  if (!headings.length || !tocNav) return;
  
  tocNav.innerHTML = '';
  
  headings.forEach((heading, index) => {
    const id = `heading-${index}`;
    heading.id = id;
    
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = heading.textContent;
    link.className = `toc-link toc-${heading.tagName.toLowerCase()}`;
    
    // Complex inline styling logic
    const tagName = heading.tagName.toLowerCase();
    const level = parseInt(tagName.charAt(1));
    
    let marginLeft = 0;
    let fontSize = '0.875rem';
    let fontWeight = '400';
    
    switch(level) {
      case 2: marginLeft = 0; fontSize = '1rem'; fontWeight = '600'; break;
      case 3: marginLeft = 1.5; fontSize = '0.875rem'; fontWeight = '500'; break;
      case 4: marginLeft = 3; fontSize = '0.8125rem'; fontWeight = '400'; break;
      case 5: marginLeft = 4.5; fontSize = '0.75rem'; fontWeight = '400'; break;
      case 6: marginLeft = 6; fontSize = '0.75rem'; fontWeight = '400'; break;
    }
    
    link.style.cssText = `/* 20+ lines of inline CSS */`;
    
    // Event listeners
    link.addEventListener('click', (e) => { /* complex logic */ });
    
    tocNav.appendChild(link);
  });
  
  // More complex logic for scroll detection, active states, etc.
}
```

### **Masalah dengan Vanilla JavaScript:**
- ❌ **Complex DOM Manipulation**: Manual creation dan styling elements
- ❌ **Inline CSS**: Sulit maintain dan tidak reusable
- ❌ **Event Management**: Manual event listener management
- ❌ **State Management**: Manual active state tracking
- ❌ **Race Conditions**: Complex CSS loading detection
- ❌ **No Reusability**: Sulit digunakan di komponen lain

## 🎯 **Solusi dengan Framework**

### **1. Preact (Recommended untuk Astro)**

#### **Keunggulan Preact:**
- ✅ **Minimal Bundle Size**: ~3KB gzipped
- ✅ **React Compatible**: API sama dengan React
- ✅ **Fast**: Lebih cepat dari React
- ✅ **Astro Integration**: Built-in support di Astro
- ✅ **TypeScript Support**: Excellent TypeScript support

#### **Implementation dengan Preact:**
```tsx
// TableOfContents.tsx
import { useState, useEffect, useRef } from 'preact/hooks';

interface Heading {
  id: string;
  text: string;
  level: number;
  element: HTMLElement;
}

interface TableOfContentsProps {
  className?: string;
}

export default function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateHeadings = () => {
      const headingElements = document.querySelectorAll('.blog-content h2, h3, h4, h5, h6');
      const headingsList: Heading[] = [];

      headingElements.forEach((element, index) => {
        const id = `heading-${index}`;
        element.id = id;
        
        headingsList.push({
          id,
          text: element.textContent || '',
          level: parseInt(element.tagName.charAt(1)),
          element: element as HTMLElement
        });
      });

      setHeadings(headingsList);
    };

    generateHeadings();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let currentHeading: Heading | null = null;

      headings.forEach(heading => {
        const rect = heading.element.getBoundingClientRect();
        const headingTop = rect.top + window.scrollY;
        
        if (headingTop <= scrollPosition) {
          currentHeading = heading;
        }
      });

      if (currentHeading) {
        setActiveId(currentHeading.id);
      }
    };

    const debouncedScroll = debounce(handleScroll, 10);
    window.addEventListener('scroll', debouncedScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, [headings]);

  const scrollToHeading = (heading: Heading) => {
    heading.element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setActiveId(heading.id);
  };

  const getIndentation = (level: number) => {
    switch(level) {
      case 2: return 'ml-0';
      case 3: return 'ml-6';
      case 4: return 'ml-12';
      case 5: return 'ml-16';
      case 6: return 'ml-20';
      default: return 'ml-0';
    }
  };

  const getFontSize = (level: number) => {
    switch(level) {
      case 2: return 'text-base font-semibold';
      case 3: return 'text-sm font-medium';
      case 4: return 'text-sm';
      case 5: return 'text-xs';
      case 6: return 'text-xs';
      default: return 'text-sm';
    }
  };

  return (
    <div className={`table-of-contents ${className || ''}`}>
      <div className="toc-header">
        <h3 className="toc-title">Daftar Isi</h3>
        <button 
          className="toc-toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <svg className="toc-icon" viewBox="0 0 24 24" fill="none">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>
      
      <nav className={`toc-nav ${isExpanded ? 'expanded' : ''}`}>
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`
              toc-link ${getIndentation(heading.level)} ${getFontSize(heading.level)}
              ${activeId === heading.id ? 'active' : ''}
            `}
            onClick={(e) => {
              e.preventDefault();
              scrollToHeading(heading);
            }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

#### **CSS dengan Tailwind:**
```css
.table-of-contents {
  @apply bg-white border border-gray-200 rounded-lg p-4 shadow-sm;
}

.toc-header {
  @apply flex items-center justify-between mb-4;
}

.toc-title {
  @apply text-lg font-semibold text-gray-800;
}

.toc-toggle-btn {
  @apply p-2 rounded-md hover:bg-gray-100 transition-colors;
}

.toc-nav {
  @apply max-h-0 overflow-hidden transition-all duration-300;
}

.toc-nav.expanded {
  @apply max-h-96 overflow-y-auto;
}

.toc-link {
  @apply block py-2 px-3 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200;
}

.toc-link.active {
  @apply bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-500 transform translate-x-1;
}
```

### **2. Svelte (Alternative)**

#### **Keunggulan Svelte:**
- ✅ **Compile-time Optimization**: No runtime overhead
- ✅ **Minimal Bundle**: Smaller than Preact
- ✅ **Reactive**: Automatic reactivity
- ✅ **Simple Syntax**: Easier to learn

#### **Implementation dengan Svelte:**
```svelte
<!-- TableOfContents.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  interface Heading {
    id: string;
    text: string;
    level: number;
    element: HTMLElement;
  }
  
  export let className = '';
  
  let headings: Heading[] = [];
  let activeId = '';
  let isExpanded = true;
  let scrollTimeout: NodeJS.Timeout;
  
  onMount(() => {
    generateHeadings();
    setupScrollListener();
  });
  
  onDestroy(() => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
  });
  
  function generateHeadings() {
    const headingElements = document.querySelectorAll('.blog-content h2, h3, h4, h5, h6');
    headings = Array.from(headingElements).map((element, index) => {
      const id = `heading-${index}`;
      element.id = id;
      
      return {
        id,
        text: element.textContent || '',
        level: parseInt(element.tagName.charAt(1)),
        element: element as HTMLElement
      };
    });
  }
  
  function setupScrollListener() {
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActiveHeading, 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }
  
  function updateActiveHeading() {
    const scrollPosition = window.scrollY + 150;
    let currentHeading: Heading | null = null;
    
    headings.forEach(heading => {
      const rect = heading.element.getBoundingClientRect();
      const headingTop = rect.top + window.scrollY;
      
      if (headingTop <= scrollPosition) {
        currentHeading = heading;
      }
    });
    
    if (currentHeading) {
      activeId = currentHeading.id;
    }
  }
  
  function scrollToHeading(heading: Heading) {
    heading.element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    activeId = heading.id;
  }
  
  function getIndentation(level: number): string {
    switch(level) {
      case 2: return 'ml-0';
      case 3: return 'ml-6';
      case 4: return 'ml-12';
      case 5: return 'ml-16';
      case 6: return 'ml-20';
      default: return 'ml-0';
    }
  }
  
  function getFontSize(level: number): string {
    switch(level) {
      case 2: return 'text-base font-semibold';
      case 3: return 'text-sm font-medium';
      case 4: return 'text-sm';
      case 5: return 'text-xs';
      case 6: return 'text-xs';
      default: return 'text-sm';
    }
  }
</script>

<div class="table-of-contents {className}">
  <div class="toc-header">
    <h3 class="toc-title">Daftar Isi</h3>
    <button 
      class="toc-toggle-btn"
      on:click={() => isExpanded = !isExpanded}
    >
      <svg class="toc-icon" viewBox="0 0 24 24" fill="none">
        <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2"/>
      </svg>
    </button>
  </div>
  
  <nav class="toc-nav" class:expanded={isExpanded}>
    {#each headings as heading (heading.id)}
      <a
        href="#{heading.id}"
        class="toc-link {getIndentation(heading.level)} {getFontSize(heading.level)}"
        class:active={activeId === heading.id}
        on:click|preventDefault={() => scrollToHeading(heading)}
      >
        {heading.text}
      </a>
    {/each}
  </nav>
</div>

<style>
  .table-of-contents {
    @apply bg-white border border-gray-200 rounded-lg p-4 shadow-sm;
  }
  
  .toc-header {
    @apply flex items-center justify-between mb-4;
  }
  
  .toc-title {
    @apply text-lg font-semibold text-gray-800;
  }
  
  .toc-toggle-btn {
    @apply p-2 rounded-md hover:bg-gray-100 transition-colors;
  }
  
  .toc-nav {
    @apply max-h-0 overflow-hidden transition-all duration-300;
  }
  
  .toc-nav.expanded {
    @apply max-h-96 overflow-y-auto;
  }
  
  .toc-link {
    @apply block py-2 px-3 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200;
  }
  
  .toc-link.active {
    @apply bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-500 transform translate-x-1;
  }
</style>
```

## 📊 **Perbandingan Framework**

### **Bundle Size Comparison:**
```
Vanilla JS:     ~0KB (tapi kompleks)
Preact:        ~3KB gzipped
Svelte:        ~2KB gzipped  
React:          ~45KB gzipped
```

### **Performance Comparison:**
```
Svelte:        ⭐⭐⭐⭐⭐ (Compile-time optimization)
Preact:        ⭐⭐⭐⭐ (Fast runtime)
React:         ⭐⭐⭐ (Standard performance)
Vanilla JS:    ⭐⭐ (Complex DOM manipulation)
```

### **Developer Experience:**
```
Svelte:        ⭐⭐⭐⭐⭐ (Simple, reactive)
Preact:        ⭐⭐⭐⭐ (React-like, familiar)
React:         ⭐⭐⭐⭐ (Mature ecosystem)
Vanilla JS:    ⭐⭐ (Complex, error-prone)
```

## 🚀 **Rekomendasi Implementasi**

### **Untuk Astro Project - Preact (Recommended):**

#### **1. Install Preact:**
```bash
npm install preact @preact/signals
```

#### **2. Update astro.config.mjs:**
```javascript
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [preact()],
  // ... other config
});
```

#### **3. Create TableOfContents Component:**
```tsx
// src/components/TableOfContents.tsx
import { useState, useEffect } from 'preact/hooks';

export default function TableOfContents() {
  // Clean, maintainable code
  // TypeScript support
  // Reactive state management
  // Easy to test
}
```

#### **4. Use in Astro:**
```astro
---
import TableOfContents from '@components/TableOfContents';
---

<TableOfContents client:load />
```

## 🎯 **Benefits of Migration**

### **Code Quality:**
- ✅ **Maintainable**: Clean, organized code structure
- ✅ **Reusable**: Easy to use in other components
- ✅ **Testable**: Unit tests dengan framework testing
- ✅ **Type Safe**: Full TypeScript support

### **Performance:**
- ✅ **Optimized**: Framework optimizations
- ✅ **Small Bundle**: Minimal runtime overhead
- ✅ **Fast Rendering**: Efficient DOM updates
- ✅ **Memory Efficient**: Proper cleanup

### **Developer Experience:**
- ✅ **Hot Reload**: Instant development feedback
- ✅ **Debugging**: Better debugging tools
- ✅ **IDE Support**: Better IntelliSense
- ✅ **Documentation**: Rich ecosystem docs

## 🎊 **Kesimpulan**

**Migrasi ke Preact/Svelte akan memberikan:**

1. **Code yang Lebih Bersih**: Declarative vs imperative
2. **Maintainability**: Easier to maintain dan extend
3. **Performance**: Better optimization
4. **Developer Experience**: Better tooling dan debugging
5. **Reusability**: Easy to reuse di komponen lain

**Rekomendasi**: Gunakan **Preact** untuk Astro project karena:
- ✅ Built-in Astro integration
- ✅ React-compatible API
- ✅ Minimal bundle size
- ✅ Excellent TypeScript support
- ✅ Mature ecosystem

**Next Steps**: 
1. Install Preact integration
2. Create TableOfContents component
3. Migrate logic dari vanilla JS
4. Test dan optimize

---

**💡 Key Learning**: Untuk komponen interaktif yang kompleks, framework memberikan developer experience dan maintainability yang jauh lebih baik daripada vanilla JavaScript!
