# 🛠️ Development Standards - KonXC Project

## 🎯 **Core Principles**

### **1. Tailwind CSS 4 First**
- ✅ **Utility-first approach** untuk semua styling
- ✅ **@theme directive** untuk custom design tokens
- ✅ **@apply directive** hanya untuk complex component patterns
- ❌ **Avoid hardcoded vanilla CSS** kecuali absolutely necessary

### **2. Astro Best Practices**
- ✅ **Frontmatter JavaScript** untuk logic dan data processing
- ✅ **Component-based architecture** dengan proper props
- ✅ **Static generation** untuk optimal performance
- ❌ **Avoid script tags** kecuali untuk client-side interactivity

### **3. Clean Code Standards**
- ✅ **Semantic HTML** structure
- ✅ **Accessible components** (ARIA, keyboard navigation)
- ✅ **Mobile-first responsive design**
- ✅ **Performance optimization** (lazy loading, image optimization)

## 🎨 **Styling Guidelines**

### **Tailwind CSS 4 Implementation**

#### **✅ DO: Use Tailwind Utilities**
```astro
<!-- Good: Tailwind utilities -->
<div class="bg-primary-50 p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-300">
  <h3 class="text-xl font-semibold text-primary-700 mb-4">Card Title</h3>
  <p class="text-neutral-600 leading-relaxed">Card content...</p>
</div>
```

#### **❌ DON'T: Hardcoded CSS**
```astro
<!-- Bad: Inline styles -->
<div style="background: #f0f4ff; padding: 1.5rem; border-radius: 0.75rem;">
  <h3 style="color: #4338ca; font-size: 1.25rem;">Card Title</h3>
</div>
```

#### **✅ DO: Component Classes with @apply**
```css
/* Good: Component pattern with @apply */
.btn-primary {
  @apply bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold 
         transition-all duration-300 hover:bg-primary-600 hover:-translate-y-1 
         hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-primary-100;
}
```

#### **❌ DON'T: Custom CSS Properties**
```css
/* Bad: Custom CSS instead of Tailwind */
.btn-primary {
  background-color: #6366f1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
}
```

### **Design Token System**

#### **Color Palette**
```css
@theme {
  /* Primary - Soft Blue */
  --color-primary-50: #f0f4ff;
  --color-primary-500: #6366f1;
  --color-primary-600: #4f46e5;
  
  /* Secondary - Soft Teal */
  --color-secondary-50: #f0fdfa;
  --color-secondary-500: #14b8a6;
  
  /* Accent - Soft Purple */
  --color-accent-50: #faf5ff;
  --color-accent-500: #a855f7;
}
```

#### **Typography**
```css
@theme {
  --font-heading: "Inter", system-ui, sans-serif;
  --font-body: "Source Sans Pro", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", Consolas, monospace;
}
```

#### **Spacing & Shadows**
```css
@theme {
  --spacing-section: 5rem;
  --spacing-container: 2rem;
  --shadow-soft: 0 2px 15px -3px rgba(0, 0, 0, 0.07);
  --shadow-soft-lg: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}
```

## 🧩 **Component Architecture**

### **Astro Component Structure**

#### **✅ DO: Frontmatter Logic**
```astro
---
// Component logic in frontmatter
interface Props {
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
}

const { title, description, variant = 'primary' } = Astro.props;

// Data processing
const cardClasses = variant === 'primary' 
  ? 'bg-primary-50 border-primary-200' 
  : 'bg-secondary-50 border-secondary-200';

// API calls or data fetching
const data = await fetch('/api/data').then(r => r.json());
---

<div class={`card ${cardClasses}`}>
  <h3 class="text-xl font-semibold mb-4">{title}</h3>
  {description && <p class="text-neutral-600">{description}</p>}
</div>
```

#### **❌ DON'T: Script Tags for Logic**
```astro
<!-- Bad: Logic in script tags -->
<div id="card" class="card">
  <h3 id="title"></h3>
  <p id="description"></p>
</div>

<script>
  // Don't do this for static content
  document.getElementById('title').textContent = 'Card Title';
  document.getElementById('description').textContent = 'Description';
</script>
```

#### **✅ DO: Client-side Interactivity Only When Needed**
```astro
---
// Static data processing in frontmatter
const items = await getMenuItems();
---

<nav class="navigation">
  {items.map(item => (
    <a href={item.href} class="nav-link">{item.label}</a>
  ))}
</nav>

<!-- Client-side script only for interactivity -->
<script>
  // Only for dynamic behavior that can't be done with CSS
  document.querySelector('.mobile-menu-toggle')?.addEventListener('click', () => {
    document.querySelector('.mobile-menu')?.classList.toggle('open');
  });
</script>
```

### **Component Props & TypeScript**

#### **✅ DO: Proper TypeScript Interfaces**
```astro
---
interface Props {
  title: string;
  description?: string;
  tags?: string[];
  publishDate?: Date;
  author?: {
    name: string;
    avatar?: string;
  };
  variant?: 'default' | 'featured' | 'minimal';
}

const { 
  title, 
  description, 
  tags = [], 
  publishDate,
  author,
  variant = 'default' 
} = Astro.props;
---
```

#### **❌ DON'T: Untyped Props**
```astro
---
// Bad: No type safety
const { title, description, tags, date, author, type } = Astro.props;
---
```

## 📱 **Responsive Design**

### **Mobile-First Approach**

#### **✅ DO: Mobile-First Classes**
```astro
<div class="
  grid grid-cols-1 gap-4
  md:grid-cols-2 md:gap-6
  lg:grid-cols-3 lg:gap-8
  xl:grid-cols-4
">
  <!-- Content -->
</div>
```

#### **✅ DO: Responsive Typography**
```astro
<h1 class="
  text-2xl font-bold
  md:text-3xl
  lg:text-4xl
  xl:text-5xl
">
  Responsive Heading
</h1>
```

## 🚀 **Performance Optimization**

### **Image Optimization**
```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<!-- Optimized images -->
<Image 
  src={heroImage} 
  alt="Hero image"
  width={1200}
  height={600}
  class="w-full h-auto rounded-xl"
  loading="lazy"
/>
```

### **CSS Optimization**
```astro
---
// Conditional CSS loading
const isHomePage = Astro.url.pathname === '/';
---

<!-- Load specific styles only when needed -->
{isHomePage && <link rel="stylesheet" href="/styles/home.css">}
```

## 🧪 **Testing Standards**

### **Component Testing**
```astro
---
// Test data in frontmatter
const testProps = {
  title: 'Test Title',
  description: 'Test description',
  variant: 'primary' as const
};

// Conditional rendering for tests
const isTest = import.meta.env.NODE_ENV === 'test';
---

<div class="component" data-testid={isTest ? 'test-component' : undefined}>
  <!-- Component content -->
</div>
```

## 📝 **Code Organization**

### **File Structure**
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── sections/     # Page sections
│   ├── blog/         # Blog-specific components
│   └── forms/        # Form components
├── layouts/          # Page layouts
├── pages/            # Route pages
├── styles/           # Global styles
└── utils/            # Utility functions
```

### **Component Naming**
- **PascalCase** for component files: `BlogCard.astro`
- **kebab-case** for CSS classes: `blog-card`
- **camelCase** for JavaScript variables: `blogPost`

## 🔧 **Development Tools**

### **Recommended VS Code Extensions**
- Astro
- Tailwind CSS IntelliSense
- TypeScript Importer
- Prettier
- ESLint

### **Build Commands**
```bash
# Development
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm astro check

# Linting
pnpm lint
```

## 🎯 **Quality Checklist**

### **Before Committing**
- [ ] ✅ **Tailwind utilities** used instead of custom CSS
- [ ] ✅ **Frontmatter logic** instead of script tags
- [ ] ✅ **TypeScript interfaces** for component props
- [ ] ✅ **Responsive design** tested on mobile/desktop
- [ ] ✅ **Accessibility** (ARIA labels, keyboard navigation)
- [ ] ✅ **Performance** (image optimization, lazy loading)
- [ ] ✅ **SEO** (meta tags, semantic HTML)

### **Code Review Standards**
- [ ] ✅ **Clean, readable code** with proper comments
- [ ] ✅ **Consistent naming** conventions
- [ ] ✅ **No hardcoded values** (use design tokens)
- [ ] ✅ **Error handling** for API calls and data processing
- [ ] ✅ **Loading states** for dynamic content

## 🌟 **Best Practices Summary**

### **DO's**
1. **Use Tailwind CSS 4** with @theme and @apply
2. **Frontmatter JavaScript** for component logic
3. **TypeScript interfaces** for type safety
4. **Mobile-first responsive** design
5. **Component-based architecture** with proper props
6. **Performance optimization** (images, CSS, JS)
7. **Accessibility standards** (ARIA, semantic HTML)

### **DON'Ts**
1. **Hardcoded vanilla CSS** instead of Tailwind
2. **Script tags for static logic** (use frontmatter)
3. **Untyped component props**
4. **Desktop-first responsive** design
5. **Inline styles** instead of utility classes
6. **Large bundle sizes** (optimize imports)
7. **Poor accessibility** (missing ARIA, keyboard nav)

---

**Remember: Clean, maintainable, and performant code is the foundation of a successful project! 🚀**
