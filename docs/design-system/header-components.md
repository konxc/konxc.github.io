# Header Components Documentation

## Overview

KonXC menyediakan tiga komponen header yang dapat digunakan untuk berbagai kebutuhan website:

1. **Header.astro** - Header lengkap dengan semua fitur
2. **SimpleHeader.astro** - Header sederhana dengan fitur dasar
3. **MinimalHeader.astro** - Header minimal untuk halaman sederhana

## Header.astro (Full Header)

### **Features:**

- ✅ Logo dengan link ke homepage
- ✅ Desktop navigation dengan dropdown menu
- ✅ Search functionality dengan dropdown
- ✅ Dark mode toggle
- ✅ CTA button "Hubungi Kami"
- ✅ Mobile menu dengan hamburger animation
- ✅ Responsive design
- ✅ Accessibility support

### **Props:**

```typescript
interface Props {
  className?: string;
  variant?: "default" | "transparent" | "minimal";
  showSearch?: boolean;
  showDarkMode?: boolean;
  showMobileMenu?: boolean;
}
```

### **Usage:**

```astro
---
import Header from "@components/ui/Header.astro";
---

<Header variant="default" showSearch={true} showDarkMode={true} />
```

### **Variants:**

- **default**: Background putih dengan border
- **transparent**: Background transparan untuk overlay
- **minimal**: Background netral untuk halaman sederhana

## SimpleHeader.astro

### **Features:**

- ✅ Logo dengan link ke homepage
- ✅ Desktop navigation sederhana
- ✅ Search button (redirect ke /search)
- ✅ Dark mode toggle
- ✅ CTA button "Hubungi Kami"
- ✅ Mobile menu
- ✅ Responsive design

### **Props:**

```typescript
interface Props {
  className?: string;
  variant?: "default" | "transparent" | "minimal";
  showSearch?: boolean;
  showDarkMode?: boolean;
}
```

### **Usage:**

```astro
---
import SimpleHeader from "@components/ui/SimpleHeader.astro";
---

<SimpleHeader variant="default" showSearch={true} showDarkMode={true} />
```

## MinimalHeader.astro

### **Features:**

- ✅ Logo dengan link ke homepage
- ✅ Desktop navigation minimal
- ✅ Dark mode toggle
- ✅ Mobile menu
- ✅ Responsive design

### **Props:**

```typescript
interface Props {
  className?: string;
  variant?: "default" | "transparent";
  showDarkMode?: boolean;
}
```

### **Usage:**

```astro
---
import MinimalHeader from "@components/ui/MinimalHeader.astro";
---

<MinimalHeader variant="default" showDarkMode={true} />
```

## Navigation Links

### **Default Navigation:**

```javascript
const navigationLinks = [
  { name: "Beranda", href: "/" },
  { name: "Layanan", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Kontributor", href: "/contributors" },
  { name: "Tentang", href: "/about" },
  { name: "Kontak", href: "/contact" },
];
```

### **Service Dropdown (Header.astro only):**

```javascript
const serviceLinks = [
  {
    name: "IT Support",
    href: "/services/it-support",
    description: "Dukungan teknis 24/7",
  },
  {
    name: "Software Development",
    href: "/services/software-development",
    description: "Pengembangan aplikasi custom",
  },
  {
    name: "Digital Branding",
    href: "/services/digital-branding",
    description: "Strategi branding digital",
  },
  {
    name: "Retail Technology",
    href: "/services/retail-tech",
    description: "Solusi teknologi retail",
  },
  {
    name: "Cloud & SaaS",
    href: "/services/cloud-saas",
    description: "Layanan cloud dan SaaS",
  },
];
```

## Layout Integration

### **MainLayout.astro:**

```astro
---
import SimpleHeader from "@components/ui/SimpleHeader.astro";
---

<SimpleHeader variant={headerVariant} />
```

### **Props untuk Layout:**

```typescript
interface Props {
  headerVariant?: "default" | "transparent" | "minimal";
  footerVariant?: "default" | "minimal" | "extended" | "none";
}
```

## Styling

### **CSS Classes:**

```css
.header {
  @apply sticky top-0 z-50 border-b border-neutral-200 bg-white;
}

.header.transparent {
  @apply border-transparent bg-transparent;
}

.header.minimal {
  @apply border-neutral-100 bg-neutral-50;
}
```

### **Dark Mode:**

```css
.dark .header {
  @apply border-neutral-700 bg-neutral-900;
}

.dark .header.transparent {
  @apply border-transparent bg-transparent;
}

.dark .header.minimal {
  @apply border-neutral-700 bg-neutral-800;
}
```

## JavaScript Functionality

### **Mobile Menu:**

```javascript
// Toggle mobile menu
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

mobileMenuToggle.addEventListener("click", function () {
  const isExpanded = this.getAttribute("aria-expanded") === "true";
  this.setAttribute("aria-expanded", !isExpanded);
  mobileMenu.classList.toggle("active");
});
```

### **Dark Mode:**

```javascript
// Dark mode toggle
const darkModeToggle = document.querySelector(".dark-mode-toggle");

darkModeToggle.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");

  // Save preference
  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);

  // Update icon
  const icon = this.querySelector(".dark-mode-icon");
  icon.className = isDark ? "i-mdi-weather-night" : "i-mdi-weather-sunny";
});
```

### **Dropdown Menus:**

```javascript
// Dropdown functionality
const dropdownTriggers = document.querySelectorAll(".dropdown-trigger");

dropdownTriggers.forEach((trigger) => {
  trigger.addEventListener("click", function (e) {
    e.preventDefault();
    const isExpanded = this.getAttribute("aria-expanded") === "true";

    // Close all other dropdowns
    dropdownTriggers.forEach((otherTrigger) => {
      if (otherTrigger !== this) {
        otherTrigger.setAttribute("aria-expanded", "false");
      }
    });

    // Toggle current dropdown
    this.setAttribute("aria-expanded", !isExpanded);
  });
});
```

## Accessibility

### **ARIA Labels:**

```html
<button
  class="mobile-menu-toggle"
  aria-label="Toggle mobile menu"
  aria-expanded="false"
>
  <button class="dark-mode-toggle" aria-label="Toggle dark mode">
    <button class="search-toggle" aria-label="Search"></button>
  </button>
</button>
```

### **Keyboard Navigation:**

- Tab navigation untuk semua interactive elements
- Enter/Space untuk button activation
- Escape untuk close dropdowns dan mobile menu

### **Screen Reader Support:**

- Semantic HTML structure
- ARIA attributes untuk state management
- Descriptive labels untuk semua controls

## Responsive Design

### **Breakpoints:**

- **Mobile**: < 1024px - Mobile menu, hamburger icon
- **Desktop**: ≥ 1024px - Full navigation, dropdown menus

### **Mobile Menu:**

```css
.mobile-menu {
  @apply invisible fixed inset-0 z-50 opacity-0 transition-all duration-300 lg:hidden;
}

.mobile-menu.active {
  @apply visible opacity-100;
}
```

### **Hamburger Animation:**

```css
.hamburger-line {
  @apply mb-1 block h-0.5 w-5 bg-current transition-all duration-200 last:mb-0;
}

.mobile-menu-toggle[aria-expanded="true"] .hamburger-line:nth-child(1) {
  @apply translate-y-1.5 rotate-45;
}

.mobile-menu-toggle[aria-expanded="true"] .hamburger-line:nth-child(2) {
  @apply opacity-0;
}

.mobile-menu-toggle[aria-expanded="true"] .hamburger-line:nth-child(3) {
  @apply -translate-y-1.5 -rotate-45;
}
```

## Usage Examples

### **Homepage:**

```astro
<Header variant="transparent" />
```

### **Blog Pages:**

```astro
<SimpleHeader variant="default" />
```

### **Landing Pages:**

```astro
<MinimalHeader variant="transparent" />
```

### **Internal Pages:**

```astro
<Header variant="minimal" />
```

## Best Practices

### **1. Variant Selection:**

- **Transparent**: Hero sections, landing pages
- **Default**: Standard pages, blog posts
- **Minimal**: Simple pages, documentation

### **2. Feature Control:**

- Disable search untuk halaman yang tidak memerlukan
- Disable dark mode untuk brand-specific pages
- Customize navigation links sesuai kebutuhan

### **3. Performance:**

- Header components menggunakan CSS-in-JS untuk styling
- JavaScript functionality minimal dan optimized
- Lazy loading untuk mobile menu content

### **4. SEO:**

- Semantic HTML structure
- Proper heading hierarchy
- Internal linking untuk navigation

## Demo Page

Akses `/header-demo` untuk melihat semua variant header components dengan live examples dan code snippets.

## Status

✅ **COMPLETED** - Semua header components siap digunakan
✅ **RESPONSIVE** - Mobile dan desktop support
✅ **ACCESSIBLE** - ARIA labels dan keyboard navigation
✅ **CUSTOMIZABLE** - Props untuk mengontrol fitur
✅ **INTEGRATED** - Terintegrasi dengan MainLayout
✅ **DOCUMENTED** - Dokumentasi lengkap dengan examples

Header components KonXC siap digunakan untuk berbagai kebutuhan website! 🎉
