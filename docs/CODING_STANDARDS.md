# Coding Standards - Koneksi

## 📋 **Overview**

Standar coding yang konsisten dan maintainable untuk tim development Koneksi. Dokumen ini memastikan semua developer mengikuti praktik terbaik yang sama.

## 🎯 **Design System Principles**

### **✅ DO's - Best Practices**

#### **1. Use Design Tokens (ALWAYS)**
```css
/* ✅ GOOD - Using design tokens */
.my-component {
  background: var(--gradient-cream-elegant);
  padding: var(--spacing-section-lg) 0;
  box-shadow: var(--shadow-cream-medium);
}
```

```css
/* ❌ BAD - Hardcoded values */
.my-component {
  background: linear-gradient(135deg, #fdfcfb 0%, #f8f5f1 25%);
  padding: 5rem 0;
  box-shadow: 0 8px 20px rgba(148, 163, 184, 0.06);
}
```

#### **2. Use Semantic Class Names**
```html
<!-- ✅ GOOD - Semantic and descriptive -->
<section class="newsletter-section-default">
<div class="comments-container">
<button class="btn-primary">
```

```html
<!-- ❌ BAD - Generic or unclear -->
<section class="section1">
<div class="container-2">
<button class="button">
```

#### **3. Follow Component Structure**
```astro
---
// ✅ GOOD - Clear interface and props
export interface Props {
  variant?: 'default' | 'compact' | 'sidebar';
  title?: string;
  className?: string;
}

const {
  variant = 'default',
  title = 'Default Title',
  className = ''
} = Astro.props;
---

<section class={`component-base component-${variant} ${className}`}>
  <!-- Content -->
</section>

<style>
  .component-base {
    /* Base styles using design tokens */
    background: var(--gradient-cream-elegant);
    padding: var(--spacing-section-lg) 0;
  }
  
  .component-default {
    /* Variant-specific styles */
  }
</style>
```

#### **4. Use Responsive Design Tokens**
```css
/* ✅ GOOD - Mobile-first with tokens */
.my-section {
  padding: var(--spacing-section-lg-mobile) 0;
}

@media (min-width: 768px) {
  .my-section {
    padding: var(--spacing-section-lg) 0;
  }
}
```

### **❌ DON'Ts - Avoid These**

#### **1. Never Hardcode Values**
```css
/* ❌ NEVER DO THIS */
.bad-component {
  padding: 80px 0;
  background: #fdfcfb;
  box-shadow: 0 8px 20px rgba(148, 163, 184, 0.06);
}
```

#### **2. Don't Use Magic Numbers**
```css
/* ❌ BAD - What does 1.375rem mean? */
.bad-spacing {
  margin-bottom: 1.375rem;
}

/* ✅ GOOD - Clear semantic meaning */
.good-spacing {
  margin-bottom: var(--spacing-content-gap);
}
```

#### **3. Don't Mix Spacing Systems**
```css
/* ❌ BAD - Inconsistent spacing */
.mixed-spacing {
  padding: 2rem 0;      /* Custom value */
  margin: var(--spacing-section-lg) 0;  /* Token */
  gap: 24px;            /* Hardcoded */
}

/* ✅ GOOD - Consistent token usage */
.consistent-spacing {
  padding: var(--spacing-section-md) 0;
  margin: var(--spacing-section-lg) 0;
  gap: var(--spacing-content-gap);
}
```

## 🎨 **Design Token Usage**

### **Color Tokens**
```css
/* Available Color Systems */
--color-cream-50 to --color-cream-900        /* Backgrounds */
--color-elegant-50 to --color-elegant-900    /* Text & UI */
--color-sophisticated-50 to --color-sophisticated-900  /* Accents */

/* Semantic Color Tokens */
--text-primary: var(--color-elegant-700);
--text-secondary: var(--color-elegant-600);
--text-muted: var(--color-elegant-500);
--text-placeholder: var(--color-elegant-400);
```

### **Spacing Tokens**
```css
/* Section Spacing (Desktop) */
--spacing-section-xs: 2rem;    /* 32px - tight sections */
--spacing-section-sm: 3rem;    /* 48px - small sections */
--spacing-section-md: 4rem;    /* 64px - medium sections */
--spacing-section-lg: 5rem;    /* 80px - large sections */
--spacing-section-xl: 6rem;    /* 96px - extra large sections */
--spacing-section-2xl: 8rem;   /* 128px - hero sections */

/* Mobile Spacing (Auto-applied) */
--spacing-section-xs-mobile: 1.5rem;   /* 24px */
--spacing-section-sm-mobile: 2rem;     /* 32px */
--spacing-section-md-mobile: 2.5rem;   /* 40px */
--spacing-section-lg-mobile: 3rem;     /* 48px */
--spacing-section-xl-mobile: 4rem;     /* 64px */
--spacing-section-2xl-mobile: 5rem;    /* 80px */
```

### **Shadow Tokens**
```css
/* Available Shadow Tokens */
--shadow-cream-soft      /* Light shadows for cards */
--shadow-cream-medium    /* Medium shadows for containers */
--shadow-cream-focus     /* Focus shadows for interactions */
--shadow-sophisticated   /* Button shadows */
--shadow-sophisticated-hover  /* Button hover shadows */
```

### **Gradient Tokens**
```css
/* Available Gradient Tokens */
--gradient-cream-elegant     /* Premium container backgrounds */
--gradient-cream-soft        /* Card backgrounds */
--gradient-sophisticated     /* Button gradients */
--gradient-sophisticated-hover  /* Button hover gradients */
```

## 🏗️ **Component Architecture**

### **File Structure Standard**
```
src/components/
├── ui/                 # Basic UI components
│   ├── Button.astro
│   ├── Card.astro
│   └── Footer.astro
├── blog/              # Blog-specific components
│   ├── CommentsSystem.astro
│   ├── RelatedArticles.astro
│   └── NewsletterSection.astro
└── newsletter/        # Newsletter components
    ├── NewsletterSection.astro
    └── NewsletterStates.astro
```

### **Component Template Standard**
```astro
---
// Component: ComponentName.astro
// Purpose: Brief description of what this component does
// Usage: How and where this component should be used

export interface Props {
  // Required props
  title: string;
  
  // Optional props with defaults
  variant?: 'default' | 'compact' | 'sidebar';
  className?: string;
  showFeature?: boolean;
  
  // Advanced props
  customConfig?: Record<string, any>;
}

const {
  title,
  variant = 'default',
  className = '',
  showFeature = true,
  customConfig = {}
} = Astro.props;

// Component logic here
const computedClass = `component-base component-${variant} ${className}`;
---

<!-- HTML Structure -->
<section class={computedClass}>
  <div class="container">
    <h2 class="component-title">{title}</h2>
    
    {showFeature && (
      <div class="component-feature">
        <!-- Feature content -->
      </div>
    )}
  </div>
</section>

<style>
  /* Component Styles - Always use design tokens */
  .component-base {
    /* Base styles */
    background: var(--gradient-cream-elegant);
    padding: var(--spacing-section-lg) 0;
    border-radius: var(--radius-soft-xl);
    box-shadow: var(--shadow-cream-medium);
  }
  
  .component-default {
    /* Default variant styles */
  }
  
  .component-compact {
    /* Compact variant styles */
    padding: var(--spacing-section-md) 0;
  }
  
  .component-title {
    color: var(--text-primary);
    margin-bottom: var(--spacing-content-gap);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .component-base {
      padding: var(--spacing-section-lg-mobile) 0;
    }
    
    .component-compact {
      padding: var(--spacing-section-md-mobile) 0;
    }
  }
</style>
```

## 📱 **Responsive Design Standards**

### **Mobile-First Approach**
```css
/* ✅ GOOD - Mobile-first with design tokens */
.responsive-component {
  /* Mobile styles (default) */
  padding: var(--spacing-section-md-mobile) 0;
  font-size: 1rem;
}

@media (min-width: 768px) {
  .responsive-component {
    /* Desktop styles */
    padding: var(--spacing-section-md) 0;
    font-size: 1.125rem;
  }
}
```

### **Breakpoint Standards**
```css
/* Standard Breakpoints */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

## 🧪 **Testing Standards**

### **Component Testing Checklist**
- [ ] All variants render correctly
- [ ] Responsive behavior works on all breakpoints
- [ ] Design tokens are used consistently
- [ ] Accessibility requirements met
- [ ] Props validation works
- [ ] Error states handled gracefully

### **Visual Testing**
```bash
# Test component in different variants
npm run test:visual -- --component=ComponentName

# Test responsive behavior
npm run test:responsive -- --component=ComponentName
```

## 📚 **Documentation Standards**

### **Component Documentation**
Each component must have:
1. **Purpose** - What does it do?
2. **Usage** - How to use it?
3. **Props** - What props does it accept?
4. **Examples** - Code examples
5. **Variants** - Different styles available
6. **Accessibility** - A11y considerations

### **Example Documentation**
```markdown
# ComponentName

## Purpose
Brief description of what this component does and why it exists.

## Usage
```astro
<ComponentName 
  title="Example Title"
  variant="default"
  showFeature={true}
/>
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | required | The main title |
| variant | string | 'default' | Style variant |
| showFeature | boolean | true | Show feature section |

## Variants
- `default` - Standard appearance
- `compact` - Smaller, condensed version
- `sidebar` - Optimized for sidebar usage
```

## 🔧 **TypeScript Standards**

### **✅ Always Use Proper Types**

#### **Astro Content Collections**
```astro
---
// ✅ GOOD - Import types and use them
import { getCollection, type CollectionEntry } from 'astro:content';

const posts = await getCollection('blog');
const sortedPosts = posts.sort((a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) => 
  b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
);
const featuredPost = sortedPosts.find((post: CollectionEntry<'blog'>) => post.data.featured);
---
```

```astro
---
// ❌ BAD - Implicit any types
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
const sortedPosts = posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
const featuredPost = sortedPosts.find(post => post.data.featured);
---
```

#### **Component Props**
```astro
---
// ✅ GOOD - Explicit interface
export interface Props {
  title: string;
  posts: CollectionEntry<'blog'>[];
  variant?: 'default' | 'compact';
  showFeatured?: boolean;
}

const { title, posts, variant = 'default', showFeatured = true }: Props = Astro.props;
---
```

#### **Event Handlers**
```typescript
// ✅ GOOD - Typed event handlers
const handleSubmit = (event: Event) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
};

const handleClick = (event: MouseEvent) => {
  const button = event.target as HTMLButtonElement;
  button.disabled = true;
};
```

#### **DOM Elements**
```typescript
// ✅ GOOD - Type casting for DOM elements
const emailInput = document.getElementById('email') as HTMLInputElement;
const submitButton = document.querySelector('.submit-btn') as HTMLButtonElement;
const form = document.querySelector('form') as HTMLFormElement;
```

### **❌ TypeScript Anti-Patterns**

#### **Don't Use `any`**
```typescript
// ❌ BAD - Using any defeats the purpose of TypeScript
const data: any = await fetch('/api/data');
const result: any = processData(data);
```

#### **Don't Ignore Type Errors**
```typescript
// ❌ BAD - Suppressing errors without fixing
// @ts-ignore
const result = someFunction(wrongTypeData);
```

#### **Don't Skip Type Imports**
```astro
---
// ❌ BAD - Missing type imports
import { getCollection } from 'astro:content';

// This will cause TypeScript errors
const posts = await getCollection('blog');
---
```

## 🔧 **Development Workflow**

### **Before Starting Development**
1. Check existing design tokens
2. Review component architecture
3. Plan responsive behavior
4. Consider accessibility needs
5. **Set up proper TypeScript types**

### **During Development**
1. Use design tokens exclusively
2. Follow naming conventions
3. Write semantic HTML
4. Test on multiple breakpoints
5. Document as you go

### **Before Committing**
1. Run linter and fix all errors
2. Test component in isolation
3. Test responsive behavior
4. Update documentation
5. Add/update tests

## 🎨 **CSS & Tailwind Standards**

### **✅ Tailwind CSS Best Practices**

#### **Using @apply Directive**
```css
/* ✅ GOOD - Use @apply for component styles */
.btn-primary {
  @apply px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold;
  @apply hover:bg-primary-600 focus:ring-4 focus:ring-primary-100;
  @apply transition-all duration-300;
}
```

#### **Using @theme Directive (Tailwind v4)**
```css
/* ✅ GOOD - Define custom properties in @theme */
@theme {
  --color-brand-primary: #3b82f6;
  --spacing-section-lg: 5rem;
  --shadow-elegant: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

#### **CSS Linter Warnings - NORMAL & EXPECTED**
```css
/* These warnings are NORMAL for Tailwind CSS: */
/* Warning: Unknown at rule @theme */
/* Warning: Unknown at rule @apply */

/* ✅ These are expected and can be ignored */
/* CSS linters don't recognize Tailwind directives */
```

### **🔧 IDE Configuration**

#### **VSCode Settings (Team Standard)**
```json
// .vscode/settings.json
{
  "css.validate": false,
  "css.lint.unknownAtRules": "ignore",
  "tailwindCSS.includeLanguages": {
    "astro": "html"
  }
}
```

#### **Suppressing CSS Warnings**
- ✅ **Expected warnings**: `@theme`, `@apply`, `@layer`
- ✅ **Safe to ignore**: Tailwind-specific directives
- ❌ **Don't ignore**: Actual CSS syntax errors

### **📐 Spacing with Tailwind**
```css
/* ✅ GOOD - Use Tailwind utilities */
.section {
  @apply py-16 md:py-20;
}

/* ✅ GOOD - Combine with design tokens */
.component {
  @apply py-16 md:py-20 relative overflow-hidden;
  background: var(--gradient-cream-elegant);
}
```

## 🚀 **Performance Standards**

### **CSS Performance**
- Use CSS custom properties for dynamic values
- Minimize CSS bundle size with Tailwind purging
- Avoid deep nesting (max 3 levels)
- Use efficient selectors
- Leverage Tailwind's optimized utilities

### **Component Performance**
- Lazy load non-critical components
- Optimize images and assets
- Minimize JavaScript usage
- Use semantic HTML for better performance

## 📊 **Code Review Checklist**

### **For Reviewers**
- [ ] Design tokens used consistently
- [ ] No hardcoded values
- [ ] Responsive design implemented
- [ ] Accessibility considerations met
- [ ] Component follows architecture standards
- [ ] **Proper TypeScript types used**
- [ ] **No `any` types or type suppressions**
- [ ] **All imports include necessary types**
- [ ] **Tailwind utilities used for spacing**
- [ ] **CSS linter warnings are expected (Tailwind)**
- [ ] **@apply and @theme used correctly**
- [ ] Documentation is complete
- [ ] Tests are included
- [ ] Performance optimized

### **For Authors**
- [ ] Self-review completed
- [ ] All standards followed
- [ ] **TypeScript errors resolved**
- [ ] **Proper type annotations added**
- [ ] Documentation updated
- [ ] Tests passing
- [ ] No linter errors
- [ ] Responsive tested
- [ ] Accessibility tested

---

## 🎯 **Quick Reference**

### **Most Common Patterns**
```css
/* Section Spacing */
padding: var(--spacing-section-lg) 0;

/* Content Spacing */
margin-bottom: var(--spacing-content-gap);

/* Colors */
color: var(--text-primary);
background: var(--gradient-cream-elegant);

/* Shadows */
box-shadow: var(--shadow-cream-medium);

/* Responsive */
@media (max-width: 768px) {
  padding: var(--spacing-section-lg-mobile) 0;
}
```

### **Emergency Contacts**
- **Design System Questions**: @design-team
- **Technical Issues**: @dev-team
- **Documentation Updates**: @docs-team

---

**Following these standards ensures consistent, maintainable, and scalable code for the entire team!** 🚀✨
