# 🔍 CSS Classes Analysis - TOC Build Investigation

## 🎯 **Masalah yang Ditemukan**

Berdasarkan analisa developer tools, masalahnya adalah CSS classes seperti `toc-nav`, `toc-link`, `toc-h2` dll tidak tergenerate dengan benar dalam build output. Ini menyebabkan TOC tidak terlihat karena styling tidak diterapkan.

## 🔧 **Root Cause Analysis**

### **Kemungkinan Penyebab:**

1. **Tailwind CSS v4 @apply Issues**
   - `@apply` directive mungkin tidak bekerja dengan benar
   - Classes tidak tergenerate dalam build output

2. **Color Mapping Issues**
   - Colors didefinisikan sebagai `--color-neutral-600` di `@theme`
   - Tapi digunakan sebagai `text-neutral-600` di component
   - Mapping tidak bekerja dengan benar

3. **CSS Purging Issues**
   - Classes dianggap unused dan di-purge
   - Dynamic class generation tidak terdeteksi

4. **Build Process Issues**
   - CSS tidak di-compile dengan benar
   - Missing dependencies atau configuration

## 🧪 **Testing Strategy**

### **1. CSS Classes Test Article**
**File**: `2024-01-30-css-classes-test.md`

**Purpose**: Test apakah classes CSS dasar bekerja
**Content**:
- Test TOC classes: `toc-nav`, `toc-link`, `toc-h2`, dll
- Test color classes: `text-neutral-600`, `bg-primary-50`, dll
- Test spacing classes: `ml-0`, `ml-6`, dll

### **2. CSS Analysis Script**
**File**: `scripts/analyze-css-classes.js`

**Features**:
- Run build process
- Analyze all CSS files in dist directory
- Check for TOC-related classes
- Generate detailed report
- Provide recommendations

**Usage**:
```bash
npm run analyze:css
```

## 📊 **Analysis Process**

### **Step 1: Build Analysis**
```bash
npm run analyze:css
```

**What it does**:
1. Runs `npm run build`
2. Scans all CSS files in `dist/` directory
3. Checks for TOC-related classes
4. Generates analysis report

### **Step 2: Class Detection**
**Classes to check**:
```javascript
const tocClasses = [
  'toc-nav', 'toc-link', 'toc-h2', 'toc-h3', 'toc-h4', 'toc-h5', 'toc-h6',
  'text-neutral-600', 'bg-neutral-100', 'text-primary-700', 'bg-primary-50',
  'text-secondary-700', 'bg-secondary-50', 'ml-0', 'ml-6', 'ml-12', 'ml-16', 'ml-20',
  'max-h-0', 'max-h-96', 'overflow-hidden', 'overflow-y-auto'
];
```

### **Step 3: Report Generation**
**Output**: `css-analysis-report.json`
```json
{
  "timestamp": "2024-01-30T...",
  "cssFiles": ["dist/_astro/..."],
  "missingClasses": ["toc-nav", "text-neutral-600"],
  "recommendations": [
    "TOC component classes not generated - check @apply directives",
    "Color classes missing - check color definitions in @theme block"
  ]
}
```

## 🔍 **Expected Findings**

### **Scenario 1: All Classes Found**
```
✅ Found classes: 22/22
❌ Missing classes: 0
✅ All TOC classes are properly generated!
```

### **Scenario 2: TOC Classes Missing**
```
✅ Found classes: 15/22
❌ Missing classes: 7
❌ Missing classes:
  - toc-nav
  - toc-link
  - toc-h2
  - toc-h3
  - toc-h4
  - toc-h5
  - toc-h6
```

**Recommendation**: Check `@apply` directives in TOC component

### **Scenario 3: Color Classes Missing**
```
✅ Found classes: 18/22
❌ Missing classes: 4
❌ Missing classes:
  - text-neutral-600
  - bg-neutral-100
  - text-primary-700
  - bg-primary-50
```

**Recommendation**: Check color definitions in `@theme` block

### **Scenario 4: Spacing Classes Missing**
```
✅ Found classes: 19/22
❌ Missing classes: 3
❌ Missing classes:
  - ml-16
  - ml-20
  - max-h-96
```

**Recommendation**: Check spacing definitions and utility classes

## 🛠️ **Potential Solutions**

### **Solution 1: Fix @apply Directives**
```css
/* Instead of @apply */
.toc-nav {
  @apply max-h-0 overflow-hidden;
}

/* Use explicit CSS */
.toc-nav {
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s;
}
```

### **Solution 2: Fix Color Mapping**
```css
/* In @theme block */
@theme {
  --color-neutral-600: #525252;
  --color-primary-700: #4338ca;
}

/* Ensure proper mapping */
.text-neutral-600 { color: var(--color-neutral-600); }
.text-primary-700 { color: var(--color-primary-700); }
```

### **Solution 3: Add CSS Safelist**
```javascript
// In tailwind.config.js (if using v3 config)
module.exports = {
  safelist: [
    'toc-nav', 'toc-link', 'toc-h2', 'toc-h3', 'toc-h4', 'toc-h5', 'toc-h6'
  ]
}
```

### **Solution 4: Use CSS Custom Properties**
```css
.toc-nav {
  max-height: var(--toc-collapsed-height, 0);
  overflow: hidden;
  transition: all 0.3s;
}

.toc-nav.expanded {
  max-height: var(--toc-expanded-height, 24rem);
  overflow-y: auto;
}
```

## 📈 **Next Steps**

### **Phase 1: Analysis**
1. ✅ Create CSS test article
2. ✅ Create analysis script
3. 🔄 Run analysis to identify missing classes
4. 🔄 Generate detailed report

### **Phase 2: Fix Implementation**
1. 🔄 Fix missing classes based on analysis
2. 🔄 Test with CSS test article
3. 🔄 Validate TOC functionality
4. 🔄 Update documentation

### **Phase 3: Validation**
1. 🔄 Run comprehensive tests
2. 🔄 Validate all TOC features
3. 🔄 Test responsive behavior
4. 🔄 Performance validation

## 🎯 **Success Criteria**

### **Analysis Success**:
- ✅ All TOC classes found in build output
- ✅ Colors properly mapped and generated
- ✅ Spacing classes working correctly
- ✅ No missing critical classes

### **Functional Success**:
- ✅ TOC visible and functional
- ✅ Proper styling applied
- ✅ Smooth animations working
- ✅ Responsive design working

## 📚 **Related Documentation**

- `docs/TOC_VISIBILITY_FIX.md` - Previous visibility fix attempt
- `docs/TOC_ACTIVE_LINK_FIX.md` - Active link detection fixes
- `docs/TOC_INDENTATION_FIX.md` - Indentation fixes
- `scripts/analyze-css-classes.js` - CSS analysis script

## 🎊 **Expected Outcome**

**🎯 Goal**: Identify exactly which CSS classes are missing from build output and fix the root cause of TOC visibility issues.

**💡 Key Insight**: Systematic analysis of build output will reveal whether the issue is with CSS generation, class mapping, or build configuration.

---

**🔍 Investigation Status**: Ready to run CSS classes analysis to identify the exact cause of TOC visibility issues!
