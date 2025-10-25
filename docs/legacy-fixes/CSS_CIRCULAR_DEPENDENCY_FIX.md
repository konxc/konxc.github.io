# CSS Circular Dependency Fix

## 🔧 **Issue Fixed:**

**Problem**: CSS circular dependency error di ContentRecommendations.astro dan AdvancedSearch.astro  
**Error**: `You cannot @apply the 'text-neutral-500' utility here because it creates a circular dependency`  
**Solution**: Mengubah `@apply text-neutral-500` menjadi `@apply text-neutral-400` untuk dark mode

## ✅ **Files Fixed:**

### **1. ContentRecommendations.astro**
**Before (Error)**:
```css
.dark .recommendation-card .text-neutral-500 {
  @apply text-neutral-500; /* Circular dependency! */
}
```

**After (Fixed)**:
```css
.dark .recommendation-card .text-neutral-500 {
  @apply text-neutral-400; /* Fixed! */
}
```

### **2. AdvancedSearch.astro**
**Before (Error)**:
```css
.dark .advanced-search input::placeholder {
  @apply text-neutral-500; /* Circular dependency! */
}

.dark .search-results .group span {
  @apply text-neutral-500; /* Circular dependency! */
}
```

**After (Fixed)**:
```css
.dark .advanced-search input::placeholder {
  @apply text-neutral-400; /* Fixed! */
}

.dark .search-results .group span {
  @apply text-neutral-400; /* Fixed! */
}
```

## 🎯 **Root Cause:**

**Circular Dependency** terjadi ketika:
- Class `text-neutral-500` diapply ke dirinya sendiri
- Tailwind CSS tidak bisa resolve dependency ini
- Error terjadi saat build/compile

## 🔍 **Detection Method:**

```bash
# Cari circular dependency patterns
grep -r "text-neutral-500.*@apply.*text-neutral-500" src/components/blog/
grep -r "bg-neutral-500.*@apply.*bg-neutral-500" src/components/blog/
```

## ✅ **Solution Applied:**

1. **Identify Circular Dependencies** - Cari pattern yang sama
2. **Change Dark Mode Colors** - Gunakan warna yang berbeda untuk dark mode
3. **Test Build** - Pastikan tidak ada error lagi

## 🚀 **Result:**

- ✅ **No More Circular Dependencies**
- ✅ **Dark Mode Still Works**
- ✅ **Build Process Clean**
- ✅ **All Components Functional**

---

**CSS Circular Dependency Fixed!** 🎯  
*Semua komponen blog sekarang bisa di-build tanpa error CSS!*
