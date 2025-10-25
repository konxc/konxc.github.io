# 🎨 Design System Documentation

## 📋 Overview

This section contains all design system documentation including visual identity, UI components, design tokens, and styling guidelines for the Koneksi project.

## 📁 Documentation Categories

### **🎨 Visual Identity & Tokens**

Core design system foundations including colors, spacing, and design tokens.

| Document                                             | Purpose                                           | Status    |
| ---------------------------------------------------- | ------------------------------------------------- | --------- |
| [DESIGN_TOKENS_SYSTEM.md](./DESIGN_TOKENS_SYSTEM.md) | CSS custom properties and design tokens           | ✅ Active |
| [COLOR_PALETTE.md](./COLOR_PALETTE.md)               | Brand colors, usage guidelines, and accessibility | ✅ Active |
| [SPACING_STANDARDS.md](./SPACING_STANDARDS.md)       | Spacing system, margins, padding guidelines       | ✅ Active |
| [HSL_VS_OKLCH_GUIDE.md](./HSL_VS_OKLCH_GUIDE.md)     | Complete guide to modern color spaces             | ✅ Active |

### **🧩 UI Components**

Documentation for reusable UI components and their usage guidelines.

| Document                                                                                    | Purpose                           | Status    |
| ------------------------------------------------------------------------------------------- | --------------------------------- | --------- |
| [NEWSLETTER_COMPONENT_DOCUMENTATION.md](./components/NEWSLETTER_COMPONENT_DOCUMENTATION.md) | Newsletter signup component guide | ✅ Active |
| [HEADER_COMPONENTS.md](./components/HEADER_COMPONENTS.md)                                   | Header component documentation    | ✅ Active |
| [FOOTER_COMPONENTS.md](./components/FOOTER_COMPONENTS.md)                                   | Footer component documentation    | ✅ Active |

## 🎯 Quick Start Guide

### **For Designers**

1. **Brand Colors**: Reference [COLOR_PALETTE.md](./COLOR_PALETTE.md)
2. **Spacing System**: Follow [SPACING_STANDARDS.md](./SPACING_STANDARDS.md)
3. **Design Tokens**: Use [DESIGN_TOKENS_SYSTEM.md](./DESIGN_TOKENS_SYSTEM.md)

### **For Developers**

1. **CSS Variables**: Implement [DESIGN_TOKENS_SYSTEM.md](./DESIGN_TOKENS_SYSTEM.md)
2. **Component Usage**: Check [components/](./components/) folder
3. **Styling Standards**: Follow [SPACING_STANDARDS.md](./SPACING_STANDARDS.md)

## 🎨 Design System Overview

### **Color System - OKLCH Color Space**

```css
/* Primary Colors - OKLCH (Perceptually Uniform) */
--color-primary-50: oklch(98.3% 0.007 274); /* Lightest */
--color-primary-500: oklch(67.5% 0.131 274); /* Base */
--color-primary-600: oklch(57.7% 0.145 274); /* Darker */
--color-primary-950: oklch(21.2% 0.055 274); /* Darkest */

/* Secondary Colors - OKLCH */
--color-secondary-500: oklch(68.2% 0.11 142); /* Green-ish */

/* Semantic Colors - OKLCH */
--color-success-500: oklch(72.2% 0.131 142); /* Success Green */
--color-warning-500: oklch(78.5% 0.126 83); /* Warning Orange */
--color-error-500: oklch(62.8% 0.257 29); /* Error Red */
--color-info-500: oklch(67.5% 0.131 274); /* Info Blue */
```

#### **OKLCH Benefits:**

- **Perceptually Uniform** - Equal numeric changes = equal visual changes
- **Wider Color Gamut** - More vibrant colors than RGB/HSL
- **Better Accessibility** - Easier to maintain consistent contrast ratios
- **Future-Proof** - Modern CSS color standard

### **Spacing System**

```css
/* Base spacing unit: 4px */
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-4: 1rem; /* 16px */
--space-8: 2rem; /* 32px */
--space-16: 4rem; /* 64px */
```

### **Typography Scale**

```css
/* Font sizes */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
```

## 🧩 Component Library

### **Core Components**

- **Header**: Navigation, logo, theme toggle, search
- **Footer**: Links, social media, newsletter signup
- **Newsletter**: Email subscription with validation
- **Cards**: Blog cards, contributor cards, project cards
- **Buttons**: Primary, secondary, ghost, icon variants

### **Layout Components**

- **Container**: Max-width wrapper with responsive padding
- **Grid**: Responsive grid system
- **Stack**: Vertical spacing utility
- **Cluster**: Horizontal spacing utility

### **Utility Components**

- **Theme Toggle**: Dark/light mode switcher
- **Skip Links**: Accessibility navigation
- **Focus Manager**: Keyboard navigation enhancement

## 🎯 Design Principles

### **1. Consistency**

- **Colors**: Use design tokens consistently
- **Spacing**: Follow 4px base unit system
- **Typography**: Maintain scale hierarchy
- **Components**: Reuse existing patterns

### **2. Accessibility**

- **Color Contrast**: WCAG AA compliance minimum
- **Focus States**: Clear keyboard navigation
- **Semantic HTML**: Proper element usage
- **Screen Readers**: ARIA labels and descriptions

### **3. Responsiveness**

- **Mobile First**: Design for smallest screens first
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layouts**: Use CSS Grid and Flexbox
- **Scalable Typography**: Responsive font sizes

### **4. Performance**

- **CSS Custom Properties**: Efficient theming
- **Minimal CSS**: Avoid unnecessary styles
- **Optimized Assets**: Compressed images and fonts
- **Critical CSS**: Above-the-fold optimization

## 🌙 Dark Mode Implementation

### **Design Tokens for Dark Mode**

```css
/* Light mode (default) */
:root {
  --bg-primary: #ffffff;
  --text-primary: #111827;
  --border-primary: #e5e7eb;
}

/* Dark mode */
.dark {
  --bg-primary: #111827;
  --text-primary: #f9fafb;
  --border-primary: #374151;
}
```

### **Component Dark Mode Support**

- **Automatic**: All components use design tokens
- **Theme Toggle**: Universal dark mode switcher
- **System Preference**: Respects user's OS setting
- **Persistence**: Remembers user choice

## 📱 Responsive Design

### **Breakpoint System**

```css
/* Mobile First Approach */
.component {
  /* Mobile styles (default) */
  padding: var(--space-4);
}

@media (min-width: 640px) {
  .component {
    /* Tablet styles */
    padding: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .component {
    /* Desktop styles */
    padding: var(--space-8);
  }
}
```

### **Container Sizes**

- **Mobile**: Full width with padding
- **Tablet**: Max 768px with margin auto
- **Desktop**: Max 1200px with margin auto
- **Wide**: Max 1400px for special layouts

## 🔧 Implementation Guidelines

### **CSS Architecture**

```css
/* 1. Design tokens */
:root {
  /* custom properties */
}

/* 2. Base styles */
html,
body {
  /* reset and base */
}

/* 3. Layout utilities */
.container,
.grid {
  /* layout */
}

/* 4. Component styles */
.header,
.footer {
  /* components */
}

/* 5. Utility classes */
.sr-only,
.focus-visible {
  /* utilities */
}
```

### **Component Structure**

```astro
---
// Component logic and props
export interface Props {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}
---

<div class="component" data-variant={variant} data-size={size}>
  <slot />
</div>

<style>
  .component {
    /* Use design tokens */
    background: var(--bg-primary);
    color: var(--text-primary);
    padding: var(--space-4);
  }
</style>
```

## 📊 Design System Metrics

### **Consistency KPIs**

- **Color Usage**: 95%+ using design tokens
- **Spacing Compliance**: 90%+ following spacing system
- **Component Reuse**: 80%+ using existing components
- **Accessibility**: 100% WCAG AA compliance

### **Performance Metrics**

- **CSS Bundle Size**: < 50KB compressed
- **Critical CSS**: < 10KB above-the-fold
- **Font Loading**: < 2 seconds FOUT
- **Theme Switch**: < 100ms transition

## 🔍 Related Documentation

### **Development**

- [Coding Standards](../development/CODING_STANDARDS_PRETTIER.md) - CSS formatting standards
- [Development Standards](../development/DEVELOPMENT_STANDARDS.md) - General development guidelines

### **Technical Implementation**

- [Troubleshooting Guide](../technical-guides/TROUBLESHOOTING_GUIDE.md) - CSS and styling issues
- [Image Optimization](../technical-guides/IMAGE_OPTIMIZATION_GUIDE.md) - Asset optimization

### **Content Management**

- [Content Guide](../content-management/CONTENT_MANAGEMENT_GUIDE.md) - Content styling guidelines
- [Blog Features](../content-management/BLOG_FEATURES_EVALUATION.md) - Blog component usage

---

**🎨 This design system documentation ensures consistent, accessible, and maintainable visual design across the entire Koneksi project!**
