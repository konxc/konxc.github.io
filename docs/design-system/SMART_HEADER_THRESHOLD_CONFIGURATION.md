# 🎯 SmartHeader Threshold Configuration Guide

## 📍 **Lokasi Pengaturan Threshold**

### **File**: `src/components/blog/SmartHeaderFixed.astro`
### **Baris**: 251-258

```javascript
// 🎯 CONFIGURATION: Adjust hide threshold here
// Options:
// - 0.5 = Hide after 50% of blog post header (sensitive)
// - 0.8 = Hide after 80% of blog post header (balanced - default)
// - 0.9 = Hide after 90% of blog post header (conservative)
// - 1.0 = Hide after 100% of blog post header (very conservative)
const hideThresholdPercentage = 0.5; // 🔧 CHANGE THIS VALUE
const hideThreshold = blogPostHeaderHeight * hideThresholdPercentage;
```

## 🔧 **Cara Mengatur Threshold**

### **1. ✅ Mengubah Persentase (Recommended)**

#### **Sensitive (Hide Cepat):**
```javascript
const hideThresholdPercentage = 0.5; // Hide setelah 50%
```
**Kapan**: Header hilang lebih cepat, saat user masih di bagian atas blog post header.

#### **Balanced (Default):**
```javascript
const hideThresholdPercentage = 0.8; // Hide setelah 80%
```
**Kapan**: Header hilang saat user hampir selesai membaca blog post header.

#### **Conservative (Hide Lambat):**
```javascript
const hideThresholdPercentage = 0.9; // Hide setelah 90%
```
**Kapan**: Header hilang saat user sudah hampir selesai dengan blog post header.

#### **Very Conservative:**
```javascript
const hideThresholdPercentage = 1.0; // Hide setelah 100%
```
**Kapan**: Header hilang tepat saat user selesai dengan blog post header.

### **2. ✅ Menggunakan Pixel Fixed**

```javascript
// Hide setelah scroll 300px dari blog post header
const hideThreshold = 300;

// Hide setelah scroll 500px dari blog post header  
const hideThreshold = 500;
```

### **3. ✅ Kombinasi Height + Offset**

```javascript
// Hide setelah 70% blog post header + 100px offset
const hideThreshold = (blogPostHeaderHeight * 0.7) + 100;
```

## 📊 **Threshold Comparison**

| Value | Behavior | Use Case |
|-------|----------|----------|
| **0.5** | Hide cepat (50%) | Mobile users, quick readers |
| **0.6** | Hide agak cepat (60%) | Fast-paced content |
| **0.7** | Hide sedang (70%) | General use |
| **0.8** | Hide balanced (80%) | **Default - Recommended** |
| **0.9** | Hide lambat (90%) | Detailed content |
| **1.0** | Hide sangat lambat (100%) | Critical navigation needs |

## 🎨 **Visual Feedback Configuration**

### **Lokasi**: Baris 281-283
```javascript
// 🎯 CONFIGURATION: Visual feedback threshold
// When to show "approaching threshold" visual feedback
const visualFeedbackThreshold = hideThreshold * 0.9; // 90% of hide threshold
```

### **Mengatur Visual Feedback:**
```javascript
// Visual feedback muncul saat 80% dari hide threshold
const visualFeedbackThreshold = hideThreshold * 0.8;

// Visual feedback muncul saat 95% dari hide threshold
const visualFeedbackThreshold = hideThreshold * 0.95;
```

## 🧪 **Testing Threshold Settings**

### **Console Debug Output:**
```javascript
SmartHeader initialized: {
  header: "found",
  blogPostHeader: "found", 
  blogPostHeaderHeight: 600,
  hideThresholdPercentage: 0.8,
  hideThreshold: 480,
  visualFeedbackThreshold: 432
}
```

### **Manual Testing Steps:**
1. **Open blog post**: `http://localhost:4321/blog/2024-01-26-path-aliases-astro`
2. **Check console**: Lihat threshold values
3. **Scroll slowly**: Test hide behavior
4. **Adjust value**: Ubah `hideThresholdPercentage`
5. **Test again**: Verify new behavior

## 🎯 **Recommended Settings by Use Case**

### **📱 Mobile-First Design:**
```javascript
const hideThresholdPercentage = 0.6; // Hide lebih cepat untuk mobile
```

### **🖥️ Desktop-Focused:**
```javascript
const hideThresholdPercentage = 0.9; // Hide lebih lambat untuk desktop
```

### **📖 Content-Heavy Sites:**
```javascript
const hideThresholdPercentage = 0.7; // Hide sedang untuk content panjang
```

### **⚡ Fast-Paced Sites:**
```javascript
const hideThresholdPercentage = 0.5; // Hide cepat untuk site yang cepat
```

## 🔧 **Advanced Configuration**

### **Dynamic Threshold Based on Screen Size:**
```javascript
// Responsive threshold
const isMobile = window.innerWidth < 768;
const hideThresholdPercentage = isMobile ? 0.6 : 0.8;
const hideThreshold = blogPostHeaderHeight * hideThresholdPercentage;
```

### **Threshold Based on Content Type:**
```javascript
// Different thresholds for different content types
const contentType = document.querySelector('[data-content-type]')?.dataset.contentType;
let hideThresholdPercentage = 0.8; // default

switch(contentType) {
  case 'tutorial':
    hideThresholdPercentage = 0.9; // Keep header longer for tutorials
    break;
  case 'news':
    hideThresholdPercentage = 0.6; // Hide faster for news
    break;
  case 'long-form':
    hideThresholdPercentage = 0.7; // Medium for long content
    break;
}

const hideThreshold = blogPostHeaderHeight * hideThresholdPercentage;
```

### **User Preference Threshold:**
```javascript
// Load user preference from localStorage
const userPreference = localStorage.getItem('headerHideThreshold');
const hideThresholdPercentage = userPreference ? parseFloat(userPreference) : 0.8;
const hideThreshold = blogPostHeaderHeight * hideThresholdPercentage;
```

## 📈 **Performance Considerations**

### **✅ Optimal Values:**
- **0.7 - 0.9**: Best balance of UX and performance
- **Avoid**: Values below 0.5 (too sensitive) or above 1.0 (never hides)

### **⚠️ Performance Impact:**
- **Lower values**: More frequent hide/show cycles
- **Higher values**: Less responsive to user scroll
- **Sweet spot**: 0.8 (current default)

## 🎊 **Quick Configuration Examples**

### **🚀 Quick Start (Copy & Paste):**

#### **For Mobile Apps:**
```javascript
const hideThresholdPercentage = 0.6; // Mobile-optimized
```

#### **For Desktop Sites:**
```javascript
const hideThresholdPercentage = 0.9; // Desktop-optimized
```

#### **For News Sites:**
```javascript
const hideThresholdPercentage = 0.5; // Fast-paced content
```

#### **For Tutorial Sites:**
```javascript
const hideThresholdPercentage = 0.95; // Keep navigation accessible
```

## 🔍 **Debugging Threshold Issues**

### **Common Issues:**

#### **1. Header Never Hides:**
```javascript
// Check if threshold is too high
console.log('Hide threshold:', hideThreshold);
console.log('Current scroll:', currentScrollY);
```

#### **2. Header Hides Too Early:**
```javascript
// Increase threshold percentage
const hideThresholdPercentage = 0.9; // From 0.8
```

#### **3. Header Hides Too Late:**
```javascript
// Decrease threshold percentage  
const hideThresholdPercentage = 0.6; // From 0.8
```

### **Debug Console Commands:**
```javascript
// Check current threshold in browser console
console.log('Blog post header height:', document.querySelector('.section.bg-linear-to-br')?.offsetHeight);
console.log('Current scroll position:', window.scrollY);
console.log('Hide threshold:', document.querySelector('.section.bg-linear-to-br')?.offsetHeight * 0.8);
```

---

**🎯 Status**: ✅ **THRESHOLD CONFIGURATION READY**

**📈 Impact**: Easy customization of hide behavior

**🚀 Next Action**: Adjust `hideThresholdPercentage` value sesuai kebutuhan

**🔧 Location**: `src/components/blog/SmartHeaderFixed.astro` line 257
