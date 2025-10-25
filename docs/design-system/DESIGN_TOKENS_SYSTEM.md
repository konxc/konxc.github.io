# Design Tokens System - Koneksi

## 📋 **Overview**

Sistem design tokens yang komprehensif untuk memastikan konsistensi visual, kemudahan maintenance, dan debugging yang lebih efisien di seluruh aplikasi Koneksi.

## 🎨 **Color Tokens**

### **Cream/Latte Palette - Primary Design System**

```css
/* Base Cream Colors */
--color-cream-50: #fefdfb;   /* Lightest cream */
--color-cream-100: #faf9f7;  /* Very light cream */
--color-cream-200: #f5f3f0;  /* Light cream */
--color-cream-300: #f0ede8;  /* Medium light cream */
--color-cream-400: #ebe7e0;  /* Medium cream */
--color-cream-500: #e6e1d8;  /* Base cream */
--color-cream-600: #d4cfc4;  /* Medium dark cream */
--color-cream-700: #c2bdb0;  /* Dark cream */
--color-cream-800: #b0ab9c;  /* Darker cream */
--color-cream-900: #9e9988;  /* Darkest cream */
```

### **Elegant Slate Colors - Text & UI Elements**

```css
/* Elegant Slate Colors */
--color-elegant-50: #f8fafc;   /* Background tints */
--color-elegant-100: #f1f5f9;  /* Light backgrounds */
--color-elegant-200: #e2e8f0;  /* Borders, dividers */
--color-elegant-300: #cbd5e1;  /* Disabled states */
--color-elegant-400: #94a3b8;  /* Placeholders */
--color-elegant-500: #64748b;  /* Muted text */
--color-elegant-600: #475569;  /* Secondary text */
--color-elegant-700: #334155;  /* Primary text */
--color-elegant-800: #1e293b;  /* Headings */
--color-elegant-900: #0f172a;  /* High contrast text */
```

### **Sophisticated Purple-Gray - Accent & Interactive Elements**

```css
/* Sophisticated Purple-Gray */
--color-sophisticated-50: #faf9fb;   /* Light tints */
--color-sophisticated-100: #f4f2f6;  /* Backgrounds */
--color-sophisticated-200: #e9e5ed;  /* Borders */
--color-sophisticated-300: #d1c7d0;  /* Light accents */
--color-sophisticated-400: #b8adb6;  /* Medium accents */
--color-sophisticated-500: #a0969f;  /* Base accents */
--color-sophisticated-600: #8b7d8b;  /* Interactive elements */
--color-sophisticated-700: #6b5b73;  /* Primary buttons */
--color-sophisticated-800: #5a4a62;  /* Hover states */
--color-sophisticated-900: #493951;  /* Active states */
```

## 🎨 **Gradient Tokens**

### **Background Gradients**

```css
/* Elegant container backgrounds */
--gradient-cream-elegant: linear-gradient(135deg, 
  var(--color-cream-50) 0%, 
  var(--color-cream-200) 30%, 
  var(--color-cream-300) 70%, 
  var(--color-cream-400) 100%
);

/* Soft card backgrounds */
--gradient-cream-soft: linear-gradient(135deg, 
  var(--color-cream-100) 0%, 
  var(--color-cream-300) 100%
);
```

### **Interactive Element Gradients**

```css
/* Primary button gradient */
--gradient-sophisticated: linear-gradient(135deg, 
  var(--color-sophisticated-700) 0%, 
  var(--color-sophisticated-500) 50%, 
  var(--color-sophisticated-300) 100%
);

/* Hover state gradient */
--gradient-sophisticated-hover: linear-gradient(135deg, 
  var(--color-sophisticated-800) 0%, 
  var(--color-sophisticated-600) 50%, 
  var(--color-sophisticated-400) 100%
);
```

## 🌟 **Shadow Tokens**

### **Layered Shadow System**

```css
/* Soft shadows for cards and containers */
--shadow-cream-soft: 
  0 4px 12px rgba(148, 163, 184, 0.04), 
  0 2px 6px rgba(148, 163, 184, 0.03), 
  inset 0 1px 0 rgba(255, 255, 255, 0.8);

/* Medium shadows for elevated elements */
--shadow-cream-medium: 
  0 8px 20px rgba(148, 163, 184, 0.06), 
  0 3px 8px rgba(148, 163, 184, 0.04), 
  inset 0 1px 0 rgba(255, 255, 255, 0.9);

/* Focus shadows for interactive elements */
--shadow-cream-focus: 
  0 6px 18px rgba(148, 163, 184, 0.12), 
  0 0 0 3px rgba(107, 114, 128, 0.08), 
  inset 0 1px 0 rgba(255, 255, 255, 0.9);

/* Button shadows */
--shadow-sophisticated: 
  0 4px 16px rgba(107, 91, 115, 0.2), 
  inset 0 1px 0 rgba(255, 255, 255, 0.15), 
  inset 0 -1px 0 rgba(0, 0, 0, 0.08);

/* Button hover shadows */
--shadow-sophisticated-hover: 
  0 6px 22px rgba(107, 91, 115, 0.28), 
  inset 0 1px 0 rgba(255, 255, 255, 0.2), 
  inset 0 -1px 0 rgba(0, 0, 0, 0.12);
```

## 🎯 **Border Tokens**

```css
/* Light borders for subtle separation */
--border-cream-light: rgba(148, 163, 184, 0.1);

/* Medium borders for cards and containers */
--border-cream-medium: rgba(148, 163, 184, 0.15);

/* Strong borders for form elements */
--border-cream-strong: rgba(148, 163, 184, 0.2);

/* Focus borders for interactive elements */
--border-focus: rgba(107, 114, 128, 0.35);
```

## 📝 **Typography Tokens**

```css
/* Semantic text colors */
--text-primary: var(--color-elegant-700);     /* Main content text */
--text-secondary: var(--color-elegant-600);   /* Secondary text */
--text-muted: var(--color-elegant-500);       /* Muted text, metadata */
--text-placeholder: var(--color-elegant-400); /* Form placeholders */
```

## ⚡ **Animation Tokens**

```css
/* Smooth transitions for most interactions */
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Fast transitions for micro-interactions */
--transition-fast: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

/* Slow transitions for major state changes */
--transition-slow: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

## 📏 **Spacing Tokens**

```css
/* Form-specific spacing */
--spacing-form-gap: 0.5rem;           /* 8px - tight form spacing */
--spacing-form-gap-mobile: 0.75rem;   /* 12px - mobile form spacing */

/* Component spacing */
--spacing-component-padding: 1.5rem;  /* 24px - standard padding */
--spacing-component-margin: 2rem;     /* 32px - standard margin */
```

## 🛠️ **Usage Examples**

### **Basic Container**

```css
.my-container {
  @apply p-6 rounded-2xl border-2;
  background: var(--gradient-cream-elegant);
  border-color: var(--border-cream-medium);
  box-shadow: var(--shadow-cream-medium);
}
```

### **Form Input**

```css
.my-input {
  @apply w-full px-4 py-3 border-2 rounded-lg font-medium;
  color: var(--text-primary);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, var(--color-cream-200) 100%);
  border-color: var(--border-cream-strong);
  box-shadow: var(--shadow-cream-soft);
  transition: var(--transition-smooth);
}

.my-input::placeholder {
  color: var(--text-placeholder);
}

.my-input:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: var(--shadow-cream-focus);
}
```

### **Primary Button**

```css
.my-button {
  @apply flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white;
  background: var(--gradient-sophisticated);
  box-shadow: var(--shadow-sophisticated);
  transition: var(--transition-smooth);
  transform: scale(1);
}

.my-button:hover {
  background: var(--gradient-sophisticated-hover);
  box-shadow: var(--shadow-sophisticated-hover);
  transform: scale(1.02);
}

.my-button:active {
  transform: scale(0.98);
}
```

## 🎯 **Benefits**

### **✅ Consistency**
- Unified color palette across all components
- Consistent spacing and typography
- Standardized shadows and borders

### **✅ Maintainability**
- Single source of truth for design values
- Easy global changes via token updates
- Reduced code duplication

### **✅ Debugging**
- Clear naming conventions
- Semantic token names
- Easy to trace styling issues

### **✅ Scalability**
- Modular token system
- Easy to extend with new tokens
- Component-agnostic approach

### **✅ Developer Experience**
- Autocomplete support in IDEs
- Clear documentation
- Consistent API across components

## 📊 **Implementation Status**

- ✅ **Design Tokens Created** - Complete color, shadow, border, and animation tokens
- ✅ **CSS Variables Implemented** - All tokens available as CSS custom properties
- ✅ **CommentsSystem Tokenized** - Fully migrated to use design tokens
- 🔄 **NewsletterSection** - Pending tokenization
- 🔄 **Footer Components** - Pending tokenization
- 🔄 **Global Components** - Pending audit and migration

## 🚀 **Next Steps**

1. **Migrate NewsletterSection** to use design tokens
2. **Update Footer components** with tokenized styling
3. **Audit existing components** for hardcoded values
4. **Create component-specific tokens** as needed
5. **Document component usage patterns**

---

**Design tokens system sekarang memberikan foundation yang solid untuk styling yang konsisten dan mudah di-maintain!** 🎨✨
