# Underscore Strategy Guide - Clean Development Environment

## 📋 **Overview**

Panduan ini menjelaskan strategi penggunaan underscore (`_`) untuk mengelola unused variables dalam proyek Koneksi, memastikan lingkungan kerja yang teratur, bersih, dan maintainable.

---

## 🎯 **Prinsip Dasar**

### **1. Preservation Over Deletion**
```typescript
// ✅ BENAR: Preserve dengan underscore
const {
  postTitle: _postTitle = "",
  showReadingTime: _showReadingTime = true,
} = Astro.props;

// ❌ SALAH: Hapus langsung
// const { postTitle, showReadingTime } = Astro.props; // Unused error
```

### **2. Interface Integrity**
```typescript
// Interface tetap valid dan dapat digunakan
export interface Props {
  postTitle?: string;        // ✅ Tetap bisa diterima
  showReadingTime?: boolean;  // ✅ Tetap bisa diterima
}
```

### **3. Future-Proof Development**
```typescript
// Mudah diubah saat diperlukan
const {
  postTitle: _postTitle = "",  // Future: hapus underscore
  // postTitle = "",           // Future: implement logic
} = Astro.props;
```

---

## 🔧 **Implementasi Strategi**

### **Pattern 1: Props Destructuring**
```typescript
// ✅ Standard Pattern
const {
  // Used variables
  postSlug,
  variant = "default",
  className = "",
  
  // Unused variables (with underscore)
  postTitle: _postTitle = "",
  showReadingTime: _showReadingTime = true,
  enableFeature: _enableFeature = false,
} = Astro.props;
```

### **Pattern 2: Function Parameters**
```typescript
// ✅ Function parameters
function processData(
  data: any,
  _options: ProcessOptions,  // Unused but preserved
  _callback?: Function      // Unused but preserved
) {
  return data;
}
```

### **Pattern 3: Loop Variables**
```typescript
// ✅ Loop iterations
items.forEach((item, _index) => {
  // Only using item, not index
  console.log(item);
});

// ✅ Object destructuring
const { name, _id, _createdAt } = user;
```

---

## 📚 **Kategori Penggunaan**

### **1. Props yang Dipertahankan (High Priority)**
```typescript
// Props yang mungkin digunakan di masa depan
const {
  // UI Configuration
  variant: _variant = "default",
  size: _size = "medium",
  theme: _theme = "light",
  
  // Feature Flags
  enableFeature: _enableFeature = false,
  showAdvanced: _showAdvanced = false,
  
  // Content Props
  postTitle: _postTitle = "",
  description: _description = "",
} = Astro.props;
```

### **2. Props yang Dapat Dihapus (Low Priority)**
```typescript
// Props yang benar-benar tidak diperlukan
const {
  // Deprecated props
  oldProp: _oldProp = "",  // TODO: Remove in v2.0
  
  // Debug props
  debugMode: _debugMode = false,  // TODO: Remove in production
} = Astro.props;
```

### **3. Props yang Harus Diimplementasi (Medium Priority)**
```typescript
// Props yang seharusnya digunakan
const {
  // Implement these in next iteration
  enableOptimization: _enableOptimization = true,  // TODO: Implement
  showAnalytics: _showAnalytics = false,          // TODO: Implement
} = Astro.props;
```

---

## 🚀 **Workflow Development**

### **Phase 1: Development (Current)**
```typescript
// ✅ Quick fix dengan underscore
const {
  postTitle: _postTitle = "",
  showReadingTime: _showReadingTime = true,
} = Astro.props;
```

### **Phase 2: Implementation**
```typescript
// ✅ Implement functionality
const {
  postTitle = "",
  showReadingTime = true,
} = Astro.props;

// Use the variables
if (showReadingTime) {
  // Implement reading time logic
}
```

### **Phase 3: Cleanup**
```typescript
// ✅ Remove truly unused props
export interface Props {
  // Remove unused props from interface
  postSlug: string;
  variant?: string;
  // postTitle?: string;  // Removed
  // showReadingTime?: boolean;  // Removed
}
```

---

## 📋 **ESLint Configuration**

### **Current Configuration**
```javascript
// eslint.config.js
"@typescript-eslint/no-unused-vars": [
  "warn",
  { 
    argsIgnorePattern: "^_", 
    varsIgnorePattern: "^_" 
  }
]
```

### **Benefits**
- ✅ No errors for `_` prefixed variables
- ✅ Warnings for truly unused variables
- ✅ Clean code without breaking functionality

---

## 🎯 **Team Guidelines**

### **1. Naming Conventions**
```typescript
// ✅ Consistent naming
const {
  // Single word props
  title: _title = "",
  
  // Multi-word props
  showReadingTime: _showReadingTime = true,
  enableFeature: _enableFeature = false,
  
  // Boolean props
  isActive: _isActive = false,
  hasPermission: _hasPermission = false,
} = Astro.props;
```

### **2. Documentation Standards**
```typescript
// ✅ Document unused props
const {
  // TODO: Implement in Phase 2
  postTitle: _postTitle = "",
  
  // TODO: Remove in v2.0 (deprecated)
  oldFeature: _oldFeature = false,
  
  // Future: Analytics integration
  trackEvents: _trackEvents = false,
} = Astro.props;
```

### **3. Code Review Checklist**
- [ ] Unused variables prefixed with `_`
- [ ] Props interface remains intact
- [ ] Documentation added for future implementation
- [ ] No breaking changes to component API

---

## 🔄 **Migration Strategy**

### **From Unused to Underscore**
```typescript
// Before (ESLint Error)
const {
  postTitle = "",
  showReadingTime = true,
} = Astro.props;

// After (ESLint Clean)
const {
  postTitle: _postTitle = "",
  showReadingTime: _showReadingTime = true,
} = Astro.props;
```

### **From Underscore to Implementation**
```typescript
// Before (Underscore)
const {
  postTitle: _postTitle = "",
  showReadingTime: _showReadingTime = true,
} = Astro.props;

// After (Implemented)
const {
  postTitle = "",
  showReadingTime = true,
} = Astro.props;

// Use the variables
if (showReadingTime) {
  // Implement reading time logic
}
```

---

## 📊 **Benefits Summary**

### **Development Benefits**
- ✅ **No ESLint Errors**: Clean code without breaking functionality
- ✅ **Backward Compatibility**: Existing components continue to work
- ✅ **Future-Proof**: Easy to implement features later
- ✅ **Team Consistency**: Uniform approach across all developers

### **Maintenance Benefits**
- ✅ **Easy Refactoring**: Simple to remove underscore when needed
- ✅ **Clear Intent**: Underscore shows "intentionally unused"
- ✅ **Documentation**: Self-documenting code
- ✅ **Risk Mitigation**: No accidental breaking changes

### **Performance Benefits**
- ✅ **No Runtime Impact**: Underscore is compile-time only
- ✅ **Bundle Size**: No impact on final bundle
- ✅ **Memory Usage**: No impact on memory consumption

---

## 🎯 **Next Steps**

### **Immediate Actions**
1. ✅ Apply underscore strategy to all unused variables
2. ✅ Update ESLint configuration
3. ✅ Document in team guidelines
4. ✅ Train team on new standards

### **Future Actions**
1. 🔄 Implement unused props in Phase 2
2. 🔄 Remove deprecated props in v2.0
3. 🔄 Optimize component interfaces
4. 🔄 Regular cleanup reviews

---

## 📚 **Related Documentation**

- [Code Quality System](./CODE_QUALITY_SYSTEM.md)
- [ESLint vs Prettier Guide](./ESLINT_VS_PRETTIER_GUIDE.md)
- [Team Development Environment Setup](./TEAM_DEVELOPMENT_ENVIRONMENT_SETUP.md)
- [Advanced Development Tools Setup](./ADVANCED_DEVELOPMENT_TOOLS_SETUP.md)

---

**This strategy ensures a clean, maintainable, and professional development environment while preserving functionality and enabling future growth.**
