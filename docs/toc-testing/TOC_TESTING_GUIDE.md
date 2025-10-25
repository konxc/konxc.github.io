# Table of Contents Testing Suite

## 🎯 **Overview**

Comprehensive testing suite untuk komponen Table of Contents menggunakan Puppeteer. Test ini mencakup functionality, visual appearance, interactions, dan accessibility.

## 🚀 **Quick Start**

### **Install Dependencies**
```bash
npm install puppeteer
```

### **Run Tests**
```bash
# Start dev server first
npm run dev

# In another terminal, run TOC tests
npm run test:toc
```

## 📋 **Test Coverage**

### **1. Component Structure Tests**
- ✅ TOC Container Exists
- ✅ TOC Header Exists  
- ✅ TOC Toggle Button Exists
- ✅ TOC Title Displayed ("Daftar Isi")
- ✅ TOC Expanded by Default
- ✅ TOC Links Generated
- ✅ TOC Links Have Correct Structure
- ✅ TOC Hierarchy (H2, H3, H4)

### **2. Visual & Styling Tests**
- ✅ TOC Visual Hierarchy (indentation)
- ✅ TOC Responsive Design
- ✅ TOC Visual Appearance (screenshots)
- ✅ TOC States (Expanded/Collapsed)

### **3. Functionality Tests**
- ✅ TOC Toggle Functionality
- ✅ TOC Smooth Scroll
- ✅ TOC Active State
- ✅ TOC Performance (Load Time)

### **4. Interaction Tests**
- ✅ Hover Effect
- ✅ Click Navigation
- ✅ Active State Update

### **5. Accessibility Tests**
- ✅ ARIA Labels
- ✅ Keyboard Navigation
- ✅ Screen Reader Support

## 🔧 **Test Configuration**

### **Browser Settings**
```javascript
{
  headless: false, // Set to true for CI/CD
  devtools: false,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
}
```

### **Viewport Testing**
- **Desktop**: 1200x800
- **Mobile**: 375x667

### **Performance Thresholds**
- **Load Time**: < 3 seconds
- **Animation**: 300ms transitions
- **Scroll**: Smooth behavior

## 📊 **Test Results**

### **Sample Output**
```
📋 Testing Table of Contents Component...
✅ TOC Container Exists
✅ TOC Header Exists
✅ TOC Toggle Button Exists
✅ TOC Title Displayed
✅ TOC Expanded by Default
✅ TOC Links Generated
✅ TOC Links Have Correct Structure
✅ TOC Hierarchy (H2, H3, H4)
✅ TOC Visual Hierarchy
✅ TOC Toggle Functionality
✅ TOC Smooth Scroll
✅ TOC Active State
✅ TOC Responsive Design
✅ TOC Accessibility (ARIA)
✅ TOC Performance (Load Time)

🎨 Testing TOC Visual Appearance...
📸 TOC screenshot saved as toc-visual-test.png
✅ TOC Expanded State
✅ TOC Collapsed State

🖱️  Testing TOC Interactions...
✅ Hover Effect
✅ Click Navigation
✅ Active State Update

📊 Generating TOC Test Report...
==================================================
📋 TABLE OF CONTENTS TEST REPORT
==================================================
✅ Passed: 18/18 (100.00%)
❌ Failed: 0/18
==================================================
```

## 🎨 **Visual Testing**

### **Screenshots Generated**
- `toc-visual-test.png` - TOC component screenshot
- Visual state testing (expanded/collapsed)
- Responsive design verification

### **Visual Checks**
- Component positioning
- Styling consistency
- Color scheme compliance
- Typography hierarchy

## ⚡ **Performance Testing**

### **Metrics Tracked**
- **Load Time**: Time to generate TOC
- **Scroll Performance**: Smooth scrolling
- **Animation Performance**: Transition smoothness
- **Memory Usage**: Browser memory consumption

### **Thresholds**
```javascript
const PERFORMANCE_THRESHOLDS = {
  loadTime: 3000, // 3 seconds
  animationDuration: 300, // 300ms
  scrollSmoothness: 'smooth'
};
```

## 🔍 **Debugging**

### **Common Issues**
1. **TOC Not Loading**
   - Check if dev server is running
   - Verify blog post URL exists
   - Check console for JavaScript errors

2. **Links Not Working**
   - Verify heading IDs are generated
   - Check smooth scroll implementation
   - Test click event handlers

3. **Styling Issues**
   - Check CSS classes are applied
   - Verify responsive breakpoints
   - Test different viewport sizes

### **Debug Mode**
```javascript
// Enable debug logging
const tester = new TableOfContentsTester();
tester.debug = true;
await tester.runAllTests();
```

## 📱 **Mobile Testing**

### **Mobile-Specific Tests**
- Touch-friendly interactions
- Responsive layout
- Swipe gestures (if implemented)
- Bottom sheet behavior (if implemented)

### **Viewport Testing**
```javascript
// Test different screen sizes
const viewports = [
  { width: 375, height: 667 },  // iPhone SE
  { width: 414, height: 896 },  // iPhone 11
  { width: 768, height: 1024 }, // iPad
  { width: 1200, height: 800 }  // Desktop
];
```

## 🚀 **CI/CD Integration**

### **GitHub Actions**
```yaml
name: TOC Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run dev &
      - run: npm run test:toc
```

### **Headless Mode**
```javascript
// For CI/CD environments
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
```

## 📈 **Test Analytics**

### **Metrics Collected**
- Test execution time
- Pass/fail rates
- Performance benchmarks
- Visual regression detection

### **Reporting**
- Console output with emojis
- Screenshot generation
- Performance metrics
- Recommendations for improvements

## 🔧 **Customization**

### **Adding New Tests**
```javascript
const customTest = {
  name: 'Custom Test Name',
  test: async () => {
    // Your test logic here
    return true; // or false
  }
};

tests.push(customTest);
```

### **Modifying Test URLs**
```javascript
// Test different blog posts
const testUrls = [
  '/blog/2024-01-29-mengatasi-empty-chunk-warning-astro',
  '/blog/2024-01-27-migrasi-tailwind-css-v3-ke-v4',
  '/blog/2024-01-28-mengatasi-warning-import-css'
];
```

## 🎯 **Best Practices**

### **Test Organization**
1. **Structure Tests** - Basic component existence
2. **Visual Tests** - Appearance and styling
3. **Functionality Tests** - Core features
4. **Interaction Tests** - User interactions
5. **Performance Tests** - Speed and efficiency

### **Test Data**
- Use realistic content
- Test with various heading levels
- Include edge cases (no headings, many headings)
- Test different content lengths

### **Maintenance**
- Update tests when component changes
- Add new tests for new features
- Remove obsolete tests
- Keep performance thresholds current

---

**💡 Pro Tip:** Run tests regularly during development to catch regressions early and ensure TOC component quality!
