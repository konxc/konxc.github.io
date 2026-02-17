# Clean Development Environment Guide

## 📋 **Overview**

Panduan komprehensif untuk memastikan lingkungan pengembangan yang bersih, teratur, dan professional di proyek Koneksi. Dokumentasi ini mencakup standar coding, workflow, dan best practices untuk tim.

---

## 🎯 **Core Principles**

### **1. Consistency First**

```typescript
// ✅ Consistent naming across all files
const {
  postTitle: _postTitle = "",
  showReadingTime: _showReadingTime = true,
  enableFeature: _enableFeature = false,
} = Astro.props;
```

### **2. Preservation Over Deletion**

```typescript
// ✅ Preserve functionality
export interface Props {
  postTitle?: string; // Keep for future use
  showReadingTime?: boolean; // Keep for future use
}

// ❌ Don't break existing API
// export interface Props {
//   // Missing props break existing components
// }
```

### **3. Documentation Driven**

```typescript
// ✅ Self-documenting code
const {
  // TODO: Implement in Phase 2
  postTitle: _postTitle = "",

  // TODO: Remove in v2.0 (deprecated)
  oldFeature: _oldFeature = false,
} = Astro.props;
```

---

## 🔧 **Development Standards**

### **1. Variable Naming**

```typescript
// ✅ Consistent underscore pattern
const {
  // UI Props
  variant: _variant = "default",
  size: _size = "medium",
  theme: _theme = "light",

  // Feature Flags
  enableFeature: _enableFeature = false,
  showAdvanced: _showAdvanced = false,

  // Content Props
  title: _title = "",
  description: _description = "",
} = Astro.props;
```

### **2. Interface Design**

```typescript
// ✅ Comprehensive interface
export interface Props {
  // Required props
  postSlug: string;

  // Optional props with defaults
  variant?: "default" | "minimal" | "card";
  size?: "small" | "medium" | "large";
  theme?: "light" | "dark" | "auto";

  // Feature flags
  enableFeature?: boolean;
  showAdvanced?: boolean;

  // Content props
  title?: string;
  description?: string;

  // Styling
  className?: string;
}
```

### **3. Component Structure**

```typescript
// ✅ Standard component structure
---
// 1. Imports
import Component from "./Component.astro";

// 2. Type declarations
declare const URL: typeof globalThis.URL;

// 3. Interface definition
export interface Props {
  // Props definition
}

// 4. Props destructuring with underscore strategy
const {
  // Used props
  postSlug,
  variant = "default",

  // Unused props (with underscore)
  title: _title = "",
  description: _description = "",
} = Astro.props;

// 5. Logic and data processing
const processedData = processData(Astro.props);
---

<!-- 6. HTML Template -->
<div class={`component ${variant}`}>
  <!-- Component content -->
</div>

<!-- 7. Styles -->
<style>
  /* Component styles */
</style>

<!-- 8. Scripts -->
<script>
  // Component scripts
</script>
```

---

## 🚀 **Workflow Standards**

### **1. Pre-Development Checklist**

- [ ] Read existing component structure
- [ ] Understand interface requirements
- [ ] Plan props usage strategy
- [ ] Document future implementations

### **2. Development Process**

```typescript
// Step 1: Define interface
export interface Props {
  postSlug: string;
  title?: string;
  showFeature?: boolean;
}

// Step 2: Destructure with underscore strategy
const {
  postSlug,
  title: _title = "",
  showFeature: _showFeature = false,
} = Astro.props;

// Step 3: Implement used props
if (postSlug) {
  // Implement logic
}

// Step 4: Document unused props
// TODO: Implement title display in Phase 2
// TODO: Implement showFeature toggle in Phase 3
```

### **3. Post-Development Checklist**

- [ ] All unused variables prefixed with `_`
- [ ] Interface remains intact
- [ ] No ESLint errors
- [ ] Documentation added
- [ ] Component tested

---

## 📚 **File Organization**

### **1. Component Files**

```
src/components/
├── blog/
│   ├── ArticleLikeSection.astro
│   ├── CopyPageMenu.astro
│   └── PerformanceOptimizer.astro
├── ui/
│   ├── Header.astro
│   ├── Footer.astro
│   └── ThemeToggle.astro
└── seo/
    ├── StructuredData.astro
    └── Head.astro
```

### **2. Documentation Structure**

```
docs/
├── development/
│   ├── UNDERSCORE_STRATEGY_GUIDE.md
│   ├── CLEAN_DEVELOPMENT_ENVIRONMENT.md
│   ├── CODE_QUALITY_SYSTEM.md
│   └── ESLINT_VS_PRETTIER_GUIDE.md
├── project-management/
│   ├── PROJECT_ROADMAP.md
│   └── DAILY_SCHEDULE_TEMPLATE.md
└── design-system/
    ├── HSL_VS_OKLCH_GUIDE.md
    └── DESIGN_TOKENS.md
```

---

## 🔍 **Quality Assurance**

### **1. ESLint Configuration**

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

### **2. Prettier Configuration**

```json
{
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  "overrides": [
    {
      "files": "*.astro",
      "options": {
        "parser": "astro"
      }
    }
  ]
}
```

### **3. TypeScript Configuration**

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

---

## 🎯 **Team Guidelines**

### **1. Code Review Standards**

- [ ] **Underscore Strategy**: All unused variables prefixed with `_`
- [ ] **Interface Integrity**: Props interface remains intact
- [ ] **Documentation**: Future implementations documented
- [ ] **Consistency**: Naming conventions followed
- [ ] **No Breaking Changes**: Existing API preserved

### **2. Development Practices**

```typescript
// ✅ Good Practice
const {
  // Used props
  postSlug,
  variant = "default",

  // Unused props (documented)
  title: _title = "", // TODO: Implement in Phase 2
  showFeature: _showFeature = false, // TODO: Implement in Phase 3
} = Astro.props;

// ❌ Bad Practice
const {
  postSlug,
  variant = "default",
  title = "", // Unused - causes ESLint error
  showFeature = false, // Unused - causes ESLint error
} = Astro.props;
```

### **3. Communication Standards**

- **Pull Requests**: Include underscore strategy rationale
- **Code Reviews**: Focus on consistency and documentation
- **Documentation**: Update guides when patterns change
- **Training**: Regular team sessions on new standards

---

## 🔄 **Migration Guide**

### **Phase 1: Current State (Development)**

```typescript
// ✅ Apply underscore strategy
const { postTitle: _postTitle = "", showReadingTime: _showReadingTime = true } =
  Astro.props;
```

### **Phase 2: Implementation**

```typescript
// ✅ Implement functionality
const { postTitle = "", showReadingTime = true } = Astro.props;

// Use the variables
if (showReadingTime) {
  // Implement reading time logic
}
```

### **Phase 3: Cleanup**

```typescript
// ✅ Remove truly unused props
export interface Props {
  postSlug: string;
  variant?: string;
  // Remove unused props from interface
}
```

---

## 📊 **Benefits Summary**

### **Development Benefits**

- ✅ **Clean Code**: No ESLint errors
- ✅ **Consistency**: Uniform approach across team
- ✅ **Maintainability**: Easy to refactor and extend
- ✅ **Documentation**: Self-documenting code

### **Team Benefits**

- ✅ **Onboarding**: Clear standards for new developers
- ✅ **Collaboration**: Consistent code review process
- ✅ **Productivity**: Faster development cycles
- ✅ **Quality**: Higher code quality standards

### **Project Benefits**

- ✅ **Stability**: No breaking changes
- ✅ **Scalability**: Easy to add new features
- ✅ **Maintenance**: Clear upgrade path
- ✅ **Professional**: Enterprise-level standards

---

## 🎯 **Implementation Checklist**

### **Immediate Actions**

- [ ] ✅ Apply underscore strategy to all components
- [ ] ✅ Update ESLint configuration
- [ ] ✅ Create team documentation
- [ ] ✅ Train team on new standards

### **Ongoing Actions**

- [ ] 🔄 Regular code reviews
- [ ] 🔄 Documentation updates
- [ ] 🔄 Team training sessions
- [ ] 🔄 Process improvements

### **Future Actions**

- [ ] 🔄 Implement unused props
- [ ] 🔄 Remove deprecated props
- [ ] 🔄 Optimize interfaces
- [ ] 🔄 Regular cleanup reviews

---

## 📚 **Related Documentation**

- [Underscore Strategy Guide](./UNDERSCORE_STRATEGY_GUIDE.md)
- [Code Quality System](./CODE_QUALITY_SYSTEM.md)
- [ESLint vs Prettier Guide](./ESLINT_VS_PRETTIER_GUIDE.md)
- [Team Development Environment Setup](./TEAM_DEVELOPMENT_ENVIRONMENT_SETUP.md)
- [Advanced Development Tools Setup](./ADVANCED_DEVELOPMENT_TOOLS_SETUP.md)

---

**This guide ensures a professional, maintainable, and scalable development environment that supports team collaboration and project growth.**
