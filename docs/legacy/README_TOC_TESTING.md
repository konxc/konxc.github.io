# 🧪 Table of Contents Testing Suite

## 🎯 **Quick Start**

```bash
# Install dependencies
npm install puppeteer

# Run TOC tests (automatically starts dev server)
npm run test:toc:run
```

## 📋 **What Gets Tested**

### **🔍 Structure Tests**

- ✅ TOC Container Exists
- ✅ TOC Header Exists
- ✅ TOC Toggle Button Exists
- ✅ TOC Title Displayed ("Daftar Isi")

### **🎨 Visual Tests**

- ✅ TOC Expanded by Default
- ✅ TOC Visual Hierarchy (H2, H3, H4)
- ✅ Proper Indentation for Sub-headings
- ✅ Responsive Design (Mobile/Desktop)

### **🖱️ Interaction Tests**

- ✅ Toggle Functionality (Expand/Collapse)
- ✅ Click Navigation (Smooth Scroll)
- ✅ Active State Management
- ✅ Hover Effects

### **📱 Responsive Tests**

- ✅ Mobile Viewport (375x667)
- ✅ Desktop Viewport (1200x800)
- ✅ Touch-friendly Interactions

## 📸 **Screenshots Generated**

- `toc-component-test.png` - Visual reference of TOC component

## 🔧 **Test Files**

- `scripts/test-table-of-contents.js` - Comprehensive test suite
- `scripts/run-toc-tests.js` - Standalone test runner
- `docs/TOC_TESTING_GUIDE.md` - Detailed documentation

## 🚀 **Usage Examples**

### **Basic Test Run**

```bash
npm run test:toc:run
```

### **Manual Testing**

```bash
# Start dev server
npm run dev

# In another terminal, run tests
node scripts/test-table-of-contents.js
```

### **CI/CD Integration**

```bash
# Headless mode for CI
HEADLESS=true npm run test:toc:run
```

## 📊 **Sample Output**

```
🚀 Starting Astro dev server...
✅ Dev server started successfully
🌐 Initializing browser...
✅ Browser initialized

📋 Running Table of Contents Tests...
🔗 Navigating to: http://localhost:4321/blog/2024-01-29-mengatasi-empty-chunk-warning-astro

🔍 Structure Tests:
✅ TOC Container Exists
✅ TOC Header Exists
✅ TOC Toggle Button Exists
✅ TOC Title Displayed

🎨 State Tests:
✅ TOC Expanded by Default

🔗 Links Tests:
✅ TOC Links Generated (8 links)
✅ Links Have Correct Href Format
✅ Links Have Text Content

📊 Hierarchy Tests:
📝 H2 Links: 3
📝 H3 Links: 4
📝 H4 Links: 1
✅ H3 Has Proper Indentation

🖱️  Interaction Tests:
✅ Toggle Collapse Works
✅ Toggle Expand Works
✅ Click Navigation Works
✅ Active State Applied

📱 Responsive Tests:
✅ TOC Visible on Mobile

📸 Taking Screenshots...
✅ TOC screenshot saved as toc-component-test.png

🎉 TOC Testing Complete!
📸 Check toc-component-test.png for visual reference
```

## 🎯 **Test Coverage**

| Category    | Tests  | Status |
| ----------- | ------ | ------ |
| Structure   | 4      | ✅     |
| Visual      | 4      | ✅     |
| Interaction | 4      | ✅     |
| Responsive  | 2      | ✅     |
| **Total**   | **14** | **✅** |

## 🔍 **Debugging**

### **Common Issues**

1. **Dev server not starting** - Check port 4321 availability
2. **TOC not loading** - Verify blog post exists
3. **Tests failing** - Check browser console for errors

### **Debug Mode**

```javascript
// Enable verbose logging
const runner = new TOCTestRunner();
runner.debug = true;
await runner.run();
```

## 📈 **Performance Metrics**

- **Load Time**: < 3 seconds
- **Animation**: 300ms transitions
- **Scroll**: Smooth behavior
- **Memory**: Optimized usage

## 🎨 **Visual Testing**

The test suite automatically captures screenshots to verify:

- Component positioning
- Styling consistency
- Color scheme compliance
- Typography hierarchy

## 🚀 **Next Steps**

After running tests, you can:

1. **Analyze Results** - Check test output and screenshots
2. **Identify Issues** - Look for failed tests
3. **Improve Component** - Based on test feedback
4. **Add New Tests** - For new features

---

**💡 Pro Tip:** Run tests regularly during development to catch regressions early!
