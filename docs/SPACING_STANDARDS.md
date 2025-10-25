# Spacing Standards - Koneksi

## 📋 **Overview**

Standar spacing yang konsisten menggunakan Tailwind CSS utility classes untuk memastikan maintainability dan consistency across tim development.

## 🎯 **Spacing Philosophy**

### **✅ Use Tailwind Utilities (ALWAYS)**
```html
<!-- ✅ GOOD - Tailwind utilities with responsive design -->
<section class="py-16 md:py-20">
<div class="mb-8 md:mb-12">
<p class="mt-4 md:mt-6">
```

### **❌ Avoid Custom Spacing (NEVER)**
```css
/* ❌ BAD - Custom hardcoded values */
.custom-section {
  padding: 80px 0;
  margin-bottom: 48px;
}
```

## 📐 **Section Spacing Scale**

### **Standard Section Spacing**

| Use Case | Mobile Class | Desktop Class | Mobile (px) | Desktop (px) |
|----------|-------------|---------------|-------------|-------------|
| **Hero Sections** | `py-20` | `md:py-32` | 80px | 128px |
| **Main Content** | `py-16` | `md:py-24` | 64px | 96px |
| **Secondary Sections** | `py-12` | `md:py-20` | 48px | 80px |
| **Supporting Content** | `py-10` | `md:py-16` | 40px | 64px |
| **Compact Sections** | `py-8` | `md:py-12` | 32px | 48px |
| **Minimal Sections** | `py-6` | `md:py-8` | 24px | 32px |

### **Content Spacing Scale**

| Use Case | Class | Mobile (px) | Desktop (px) |
|----------|-------|-------------|-------------|
| **Large Gaps** | `mb-8 md:mb-12` | 32px | 48px |
| **Medium Gaps** | `mb-6 md:mb-8` | 24px | 32px |
| **Small Gaps** | `mb-4 md:mb-6` | 16px | 24px |
| **Tight Gaps** | `mb-3 md:mb-4` | 12px | 16px |

## 🏗️ **Implementation Standards**

### **Section Structure Template**
```html
<!-- Hero Section - Largest spacing for impact -->
<section class="py-20 md:py-32 bg-linear-to-br from-primary-50 to-secondary-50">
  <div class="container">
    <div class="mx-auto max-w-4xl">
      <!-- Hero content -->
    </div>
  </div>
</section>

<!-- Main Content - Large spacing for readability -->
<section class="py-16 md:py-24 bg-white">
  <div class="container">
    <div class="mx-auto max-w-6xl">
      <!-- Main content -->
    </div>
  </div>
</section>

<!-- Secondary Section - Medium spacing -->
<section class="py-12 md:py-20">
  <div class="container">
    <!-- Secondary content -->
  </div>
</section>
```

### **Component Spacing Template**
```astro
---
export interface Props {
  variant?: 'default' | 'compact' | 'hero';
  className?: string;
}

const { variant = 'default', className = '' } = Astro.props;

// Spacing mapping using Tailwind classes
const spacingClasses = {
  hero: 'py-20 md:py-32',
  default: 'py-16 md:py-24', 
  compact: 'py-12 md:py-16'
};
---

<section class={`${spacingClasses[variant]} ${className}`}>
  <div class="container">
    <!-- Component content -->
  </div>
</section>
```

## 🎨 **Design Token Integration**

### **When to Use Design Tokens**
```css
/* ✅ GOOD - Use tokens for custom properties */
.custom-component {
  background: var(--gradient-cream-elegant);
  box-shadow: var(--shadow-cream-medium);
  border-color: var(--border-cream-strong);
}

/* ✅ GOOD - Use Tailwind for spacing */
.custom-component {
  @apply py-16 md:py-20 px-6;
}
```

### **Combined Approach**
```astro
<style>
  .newsletter-section {
    /* Use Tailwind for spacing */
    @apply py-16 md:py-20 relative overflow-hidden;
    
    /* Use tokens for colors and effects */
    background: var(--gradient-cream-elegant);
    box-shadow: var(--shadow-cream-medium);
  }
</style>
```

## 📱 **Responsive Design Patterns**

### **Mobile-First Approach**
```html
<!-- ✅ GOOD - Mobile-first responsive spacing -->
<section class="py-12 md:py-16 lg:py-20">
<div class="mb-6 md:mb-8 lg:mb-10">
<p class="mt-4 md:mt-6">
```

### **Breakpoint Strategy**
```html
<!-- Small sections -->
<section class="py-8 md:py-12">

<!-- Medium sections -->  
<section class="py-12 md:py-16">

<!-- Large sections -->
<section class="py-16 md:py-20">

<!-- Hero sections -->
<section class="py-20 md:py-32">
```

## 🧩 **Component Examples**

### **Newsletter Section**
```astro
<!-- Default variant - Large spacing -->
.newsletter-section-default {
  @apply relative overflow-hidden py-16 md:py-24;
  background: var(--gradient-cream-elegant);
}

<!-- Compact variant - Medium spacing -->
.newsletter-section-compact {
  @apply relative overflow-hidden py-12 md:py-16;
  background: var(--gradient-cream-soft);
}
```

### **Blog Layout**
```html
<!-- Hero -->
<section class="py-20 md:py-32 bg-linear-to-br from-primary-50 to-secondary-50">

<!-- Content -->
<section class="py-16 md:py-24 bg-white">

<!-- Related Articles -->
<section class="py-12 md:py-20">

<!-- Comments -->
<section class="py-12 md:py-20">

<!-- Footer -->
<footer class="py-16 md:py-20 bg-neutral-900">
```

### **Card Components**
```html
<!-- Card container -->
<div class="p-6 md:p-8 mb-6 md:mb-8">
  
  <!-- Card header -->
  <div class="mb-4 md:mb-6">
    <h3 class="mb-2 md:mb-3">Title</h3>
    <p class="mb-4 md:mb-6">Description</p>
  </div>
  
  <!-- Card content -->
  <div class="space-y-4 md:space-y-6">
    <!-- Content items -->
  </div>
</div>
```

## 🔧 **Development Workflow**

### **Before Writing CSS**
1. ✅ Check if Tailwind utility exists
2. ✅ Use responsive classes (`md:`, `lg:`)
3. ✅ Follow mobile-first approach
4. ✅ Use design tokens for colors/effects only

### **Code Review Checklist**
- [ ] No hardcoded spacing values
- [ ] Tailwind utilities used for spacing
- [ ] Responsive design implemented
- [ ] Consistent spacing scale followed
- [ ] Design tokens used appropriately

## 📊 **Common Patterns**

### **Section Spacing Patterns**
```css
/* Hero sections */
.hero-section { @apply py-20 md:py-32; }

/* Main content */
.content-section { @apply py-16 md:py-24; }

/* Secondary content */
.secondary-section { @apply py-12 md:py-20; }

/* Footer */
.footer-section { @apply py-16 md:py-20; }
```

### **Content Spacing Patterns**
```css
/* Large content gaps */
.content-large { @apply mb-8 md:mb-12; }

/* Medium content gaps */
.content-medium { @apply mb-6 md:mb-8; }

/* Small content gaps */
.content-small { @apply mb-4 md:mb-6; }
```

## 🚫 **Anti-Patterns to Avoid**

### **❌ Don't Mix Systems**
```css
/* BAD - Mixing custom values with Tailwind */
.mixed-spacing {
  @apply py-16;
  margin-bottom: 48px; /* Should be mb-12 */
}
```

### **❌ Don't Use Magic Numbers**
```css
/* BAD - Unexplained custom values */
.magic-numbers {
  padding: 73px 0; /* Why 73px? */
  margin: 1.375rem; /* What does this represent? */
}
```

### **❌ Don't Ignore Responsive Design**
```css
/* BAD - Fixed spacing for all screens */
.fixed-spacing {
  @apply py-20; /* Too large for mobile */
}

/* GOOD - Responsive spacing */
.responsive-spacing {
  @apply py-12 md:py-20; /* Appropriate for all screens */
}
```

## 🎯 **Quick Reference**

### **Most Common Classes**
```html
<!-- Section spacing -->
py-20 md:py-32  <!-- Hero sections -->
py-16 md:py-24  <!-- Main content -->
py-12 md:py-20  <!-- Secondary sections -->

<!-- Content spacing -->
mb-8 md:mb-12   <!-- Large gaps -->
mb-6 md:mb-8    <!-- Medium gaps -->
mb-4 md:mb-6    <!-- Small gaps -->

<!-- Container spacing -->
px-4 md:px-6    <!-- Horizontal padding -->
mx-auto         <!-- Center alignment -->
max-w-4xl      <!-- Content width limits -->
```

### **Spacing Decision Tree**
```
Is it a section?
├── Hero/Landing → py-20 md:py-32
├── Main Content → py-16 md:py-24
├── Secondary → py-12 md:py-20
└── Footer → py-16 md:py-20

Is it content spacing?
├── Large gap → mb-8 md:mb-12
├── Medium gap → mb-6 md:mb-8
└── Small gap → mb-4 md:mb-6
```

---

**Following these spacing standards ensures consistent, maintainable, and responsive layouts across the entire codebase!** 📐✨

## 🚀 **Benefits of This Approach**

- **✅ Consistency** - Same spacing scale across all components
- **✅ Maintainability** - Easy to update and modify
- **✅ Performance** - Leverages Tailwind's optimized CSS
- **✅ Responsive** - Built-in mobile-first design
- **✅ Team Friendly** - Clear standards everyone can follow
