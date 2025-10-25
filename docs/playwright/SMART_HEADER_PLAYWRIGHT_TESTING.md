# 🧪 SmartHeader Playwright Testing Guide

## 🚀 **Quick Start**

### **Prerequisites:**
1. **Dev server running**: `pnpm run dev`
2. **Playwright installed**: `pnpm run test:smart-header:install`

### **Run Tests:**
```bash
# Install Playwright (if not already installed)
pnpm run test:smart-header:install

# Run SmartHeader tests
pnpm run test:smart-header
```

## 📋 **Test Coverage**

### **Test URLs:**
- `/blog/2024-01-26-path-aliases-astro`
- `/blog/2024-01-27-migrasi-tailwind-css-v3-ke-v4`
- `/blog/2024-01-28-mengatasi-warning-import-css`

### **Test Cases:**

#### **1. ✅ SmartHeader Visibility**
- **Element exists**: `#smart-header` element found
- **Element visible**: Header is visible to user
- **Position correct**: `position: fixed`, `top: 0px`
- **No transform**: `transform: matrix(1, 0, 0, 1, 0, 0)`

#### **2. ✅ Scroll Behavior**
- **Initial state**: No `scrolled` class on page load
- **Scroll down**: `scrolled` class added when scrollY > 50px
- **Scroll up**: `scrolled` class removed when scrollY < 50px

#### **3. ✅ Navigation Links**
- **Links present**: Navigation links found in header
- **Links clickable**: Navigation links are functional

#### **4. ✅ Responsive Design**
- **Desktop**: Header visible at 1200x800
- **Tablet**: Header visible at 768x1024
- **Mobile**: Header visible at 375x667
- **Mobile menu**: Mobile menu toggle works

## 🎯 **Expected Results**

### **✅ All Tests Should Pass:**
```
🚀 Starting SmartHeader Test
============================

📄 Testing: http://localhost:4321/blog/2024-01-26-path-aliases-astro
────────────────────────────────────────
✅ SmartHeader element found
✅ SmartHeader is visible
✅ SmartHeader positioning is correct
🔄 Testing scroll behavior...
✅ Scroll behavior working (scrolled class added)
✅ Scroll behavior working (scrolled class removed)
✅ Found 6 navigation links
📸 Screenshot saved
✅ All tests passed for this URL
```

## 📸 **Screenshots**

### **Screenshot Locations:**
- `test-results/smart-header-test-blog-2024-01-26-path-aliases-astro.png`
- `test-results/smart-header-test-blog-2024-01-27-migrasi-tailwind-css-v3-ke-v4.png`
- `test-results/smart-header-test-blog-2024-01-28-mengatasi-warning-import-css.png`

### **Screenshot Content:**
- **Full page screenshots** showing SmartHeader visibility
- **Scroll states** showing header behavior
- **Navigation elements** showing clickable links

## 🔧 **Troubleshooting**

### **Common Issues:**

#### **❌ "SmartHeader element not found"**
```bash
# Check if BlogSlugLayout is using SmartHeaderFixed
grep -r "SmartHeaderFixed" src/layouts/
```

#### **❌ "SmartHeader is not visible"**
```bash
# Check CSS transform
# Should be: transform: translateY(0)
# Not: transform: translateY(-100%)
```

#### **❌ "Dev server not running"**
```bash
# Start dev server first
pnpm run dev

# Then run tests
pnpm run test:smart-header
```

#### **❌ "Playwright not installed"**
```bash
# Install Playwright
pnpm run test:smart-header:install
```

### **Debug Mode:**
```bash
# Run with visible browser (for debugging)
# Edit scripts/simple-smart-header-test.js
# Change: headless: false
```

## 📊 **Test Results Analysis**

### **Success Criteria:**
1. **Element Found**: `#smart-header` exists in DOM
2. **Element Visible**: Header visible to user
3. **Position Fixed**: `position: fixed` and `top: 0px`
4. **No Transform**: No `translateY(-100%)` transform
5. **Scroll Behavior**: `scrolled` class added/removed correctly
6. **Navigation**: Links present and clickable

### **Performance Metrics:**
- **Page Load Time**: < 3 seconds
- **Header Visibility**: Immediate
- **Scroll Response**: < 500ms
- **Navigation Response**: < 1 second

## 🎨 **Visual Verification**

### **What to Look For:**

#### **✅ Correct Behavior:**
- Header visible at top of page
- Header stays visible when scrolling
- Header has backdrop blur effect
- Navigation links clickable
- Mobile menu works on small screens

#### **❌ Incorrect Behavior:**
- Header hidden by default
- Header disappears when scrolling
- No backdrop blur effect
- Navigation links not clickable
- Mobile menu not working

## 🚀 **Advanced Testing**

### **Manual Testing Steps:**
1. **Open browser** to `http://localhost:4321/blog/2024-01-26-path-aliases-astro`
2. **Check header visibility** - should be visible at top
3. **Scroll down** - header should stay visible with enhanced blur
4. **Scroll up** - header should return to normal state
5. **Click navigation links** - should navigate correctly
6. **Test mobile view** - resize browser to mobile size
7. **Test mobile menu** - click hamburger menu

### **Browser Console Check:**
```javascript
// Check if SmartHeader is initialized
console.log('SmartHeader initialized:', {
  header: document.getElementById('smart-header') ? 'found' : 'not found',
  heroSection: document.querySelector('.section.bg-linear-to-br') ? 'found' : 'not found'
});
```

## 📈 **Continuous Integration**

### **CI/CD Integration:**
```yaml
# GitHub Actions example
- name: Test SmartHeader
  run: |
    pnpm run dev &
    sleep 10
    pnpm run test:smart-header
```

### **Headless Mode:**
```javascript
// For CI/CD, set headless: true
const browser = await chromium.launch({ 
  headless: true, // Set to true for CI
  slowMo: 0 
});
```

## 🎯 **Next Steps**

### **After Tests Pass:**
1. ✅ **Deploy to production**
2. ✅ **Monitor performance**
3. ✅ **Collect user feedback**
4. ✅ **Optimize further**

### **Future Enhancements:**
1. **Add more test cases** (dark mode, keyboard navigation)
2. **Performance testing** (Core Web Vitals)
3. **Accessibility testing** (screen readers)
4. **Cross-browser testing** (Chrome, Firefox, Safari)

---

**🎯 Status**: ✅ **READY FOR TESTING**

**⏰ Time Required**: 5 minutes untuk complete test suite

**📈 Expected Results**: 100% test pass rate

**🚀 Next Action**: Run `pnpm run test:smart-header` untuk verify SmartHeader fix
