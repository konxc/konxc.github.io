# InteractiveDemos Tab Switching - Troubleshooting

## 🐛 **Masalah yang Ditemukan:**

### **Root Cause:**
JavaScript mencari elemen dengan class `.tab-button` tetapi HTML menggunakan class `.tab-badge` setelah perubahan desain.

### **Error Details:**
- ✅ **HTML**: Menggunakan class `tab-badge`
- ❌ **JavaScript**: Mencari class `tab-button`
- ❌ **Result**: Event listeners tidak terpasang, tab switching tidak berfungsi

## 🔧 **Perbaikan yang Dilakukan:**

### **1. Update JavaScript Selector:**
```javascript
// Before: Mencari class yang salah
this.tabs = document.querySelectorAll('.tab-button');

// After: Menggunakan class yang benar
this.tabs = document.querySelectorAll('.tab-badge');
```

### **2. Debug Logging:**
```javascript
private initializeTabs(): void {
  this.tabs = document.querySelectorAll('.tab-badge');
  this.panels = document.querySelectorAll('.tab-panel');
  
  console.log('Found tabs:', this.tabs.length);
  console.log('Found panels:', this.panels.length);
  
  if (this.tabs.length > 0) {
    this.activeTab = this.tabs[0].getAttribute('data-tab') || '';
    console.log('Initial active tab:', this.activeTab);
  }
}
```

### **3. Enhanced Switch Tab Method:**
```javascript
private switchTab(tabId: string): void {
  console.log('Switching to tab:', tabId);
  
  // Update active tab button
  this.tabs?.forEach(tab => {
    const isActive = tab.getAttribute('data-tab') === tabId;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive.toString());
    console.log('Tab button updated:', tab.getAttribute('data-tab'), 'active:', isActive);
  });

  // Update active panel
  this.panels?.forEach(panel => {
    const isActive = panel.getAttribute('data-tab') === tabId;
    panel.classList.toggle('active', isActive);
    panel.setAttribute('aria-hidden', (!isActive).toString());
    console.log('Panel updated:', panel.getAttribute('data-tab'), 'active:', isActive);
  });

  this.activeTab = tabId;
  this.trackTabEvent('tab_switch', tabId);
}
```

## 🧪 **Testing Steps:**

### **1. Browser Console Check:**
```javascript
// Buka browser console dan cek:
console.log('Tabs found:', document.querySelectorAll('.tab-badge').length);
console.log('Panels found:', document.querySelectorAll('.tab-panel').length);
```

### **2. Event Listener Test:**
```javascript
// Test manual tab switching
const tabs = document.querySelectorAll('.tab-badge');
tabs.forEach(tab => {
  console.log('Tab:', tab.getAttribute('data-tab'));
});
```

### **3. CSS Class Check:**
```javascript
// Check active states
const activeTab = document.querySelector('.tab-badge.active');
const activePanel = document.querySelector('.tab-panel.active');
console.log('Active tab:', activeTab?.getAttribute('data-tab'));
console.log('Active panel:', activePanel?.getAttribute('data-tab'));
```

## 📊 **Expected Behavior:**

### **Before Fix:**
- ❌ Click tab tidak berpindah view
- ❌ Console: "Found tabs: 0"
- ❌ Event listeners tidak terpasang

### **After Fix:**
- ✅ Click tab berpindah view
- ✅ Console: "Found tabs: 3"
- ✅ Event listeners terpasang dengan benar
- ✅ Tab switching berfungsi normal

## 🔍 **Debug Information:**

### **Console Output yang Diharapkan:**
```
Found tabs: 3
Found panels: 3
Initial active tab: tailwind-config
Switching to tab: path-aliases
Tab button updated: tailwind-config active: false
Tab button updated: path-aliases active: true
Tab button updated: color-palette active: false
Panel updated: tailwind-config active: false
Panel updated: path-aliases active: true
Panel updated: color-palette active: false
```

### **HTML Structure Check:**
```html
<!-- Tab badges -->
<button class="tab-badge active" data-tab="tailwind-config">
  <span class="tab-icon">💻</span>
  <span class="tab-label">Code</span>
</button>

<!-- Tab panels -->
<div class="tab-panel active" data-tab="tailwind-config">
  <!-- Content -->
</div>
```

## 🚀 **Verification:**

### **Manual Testing:**
1. **Buka halaman blog**: `http://localhost:4321/blog/2024-01-15-digitalisasi-umkm`
2. **Scroll ke Interactive Demos section**
3. **Click pada tab badges** - Should switch content
4. **Check browser console** - Should show debug logs
5. **Verify active states** - Active tab dan panel harus match

### **Automated Testing:**
```javascript
// Test script untuk browser console
function testTabSwitching() {
  const tabs = document.querySelectorAll('.tab-badge');
  const panels = document.querySelectorAll('.tab-panel');
  
  console.log('Testing tab switching...');
  
  tabs.forEach((tab, index) => {
    const tabId = tab.getAttribute('data-tab');
    console.log(`Testing tab ${index + 1}: ${tabId}`);
    
    // Simulate click
    tab.click();
    
    // Check if panel is active
    const panel = document.querySelector(`.tab-panel[data-tab="${tabId}"]`);
    const isActive = panel?.classList.contains('active');
    console.log(`Panel active: ${isActive}`);
  });
}

// Run test
testTabSwitching();
```

## 📝 **Summary:**

### **Problem Solved:**
- ✅ **JavaScript selector updated** dari `.tab-button` ke `.tab-badge`
- ✅ **Debug logging added** untuk troubleshooting
- ✅ **Event listeners working** dengan class yang benar
- ✅ **Tab switching functional** seperti yang diharapkan

### **Key Learnings:**
- ✅ **Consistency penting** antara HTML class dan JavaScript selector
- ✅ **Debug logging membantu** untuk troubleshooting
- ✅ **Testing manual** diperlukan untuk verify functionality

**Tab switching sekarang berfungsi dengan benar setelah memperbaiki JavaScript selector!** 🎉
