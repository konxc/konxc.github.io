# Playwright Testing untuk Table of Contents

## Instalasi

```bash
# Install Playwright
npm install @playwright/test

# Install browser dependencies
npm run test:playwright:install
```

## Menjalankan Test

```bash
# Menjalankan semua test
npm run test:playwright

# Menjalankan test dengan UI
npm run test:playwright:ui

# Menjalankan test dengan browser terlihat
npm run test:playwright:headed

# Debug test
npm run test:playwright:debug
```

## Test yang Dilakukan

### 1. **Struktur Komponen**
- ✅ TOC container ter-render dengan benar
- ✅ Header dan title "Daftar Isi" ada
- ✅ Toggle button berfungsi

### 2. **Generasi TOC**
- ✅ Link TOC dibuat dari heading yang ada
- ✅ Setiap link memiliki href yang benar (#heading-X)
- ✅ Mendukung semua level heading (H2-H6)

### 3. **Visual Hierarchy**
- ✅ H2: font-semibold, text-base, pl-3, border 3px
- ✅ H3: font-medium, text-sm, pl-6, ml-2, dot indicator
- ✅ H4: font-normal, text-xs, pl-9, ml-4, dot indicator
- ✅ H5: font-normal, text-xs, pl-12, ml-6, dot indicator
- ✅ H6: font-normal, text-xs, pl-16, ml-8, dot indicator

### 4. **Interaksi**
- ✅ Toggle button mengubah visibility TOC
- ✅ Scroll mengupdate active link
- ✅ Hover effects bekerja dengan benar

### 5. **Responsive**
- ✅ Mobile viewport styling benar
- ✅ Border dan padding disesuaikan untuk mobile

### 6. **Accessibility**
- ✅ Aria-label pada toggle button
- ✅ Role navigation pada TOC nav

### 7. **Visual Regression**
- ✅ Screenshot comparison untuk desktop
- ✅ Screenshot comparison untuk mobile
- ✅ Screenshot hierarchy dengan berbagai level

## Hasil Test

Test akan menghasilkan:
- HTML report di `playwright-report/`
- Screenshot di `test-results/`
- Video recording untuk test yang gagal
- Trace files untuk debugging

## Perbedaan Playwright vs Puppeteer

| Aspek | Playwright | Puppeteer |
|-------|------------|-----------|
| **Multi-browser** | ✅ Chrome, Firefox, Safari | ❌ Hanya Chrome/Chromium |
| **API Design** | Modern, async/await | Callback-based |
| **Auto-wait** | ✅ Built-in smart waiting | ❌ Manual waiting |
| **Screenshots** | ✅ Built-in visual testing | ❌ Manual implementation |
| **Video Recording** | ✅ Built-in | ❌ Manual setup |
| **Trace Viewer** | ✅ Built-in debugging | ❌ Limited debugging |
| **Parallel Execution** | ✅ Built-in | ❌ Manual setup |
| **Mobile Testing** | ✅ Built-in device emulation | ❌ Manual setup |
| **Performance** | Faster execution | Slower |
| **Maintenance** | Microsoft maintained | Google maintained |
| **Learning Curve** | Easier | Steeper |

## Keunggulan Playwright untuk Testing TOC

1. **Multi-browser Testing**: Test di Chrome, Firefox, Safari sekaligus
2. **Visual Regression**: Screenshot comparison otomatis
3. **Mobile Testing**: Device emulation built-in
4. **Auto-wait**: Tidak perlu manual wait untuk elemen
5. **Better Debugging**: Trace viewer dan video recording
6. **Parallel Execution**: Test berjalan lebih cepat
7. **Modern API**: Lebih mudah digunakan

## Contoh Output Test

```
Running 15 tests using 5 workers

✓ should render TOC with proper structure (2.1s)
✓ should generate TOC links from headings (1.8s)
✓ should have proper visual hierarchy with indentation (2.3s)
✓ should toggle TOC visibility (1.5s)
✓ should highlight active TOC link on scroll (2.0s)
✓ should have proper hover effects (1.7s)
✓ should be responsive on mobile (1.9s)
✓ should have proper scrollbar styling (1.6s)
✓ should handle dynamic content changes (2.2s)
✓ should have proper accessibility (1.4s)
✓ should match TOC visual appearance (1.8s)
✓ should match TOC mobile appearance (1.7s)
✓ should match TOC with different heading levels (2.0s)

15 passed (25.1s)
```

## Troubleshooting

### Test Gagal karena Elemen Tidak Ditemukan
```bash
# Pastikan dev server berjalan
npm run dev

# Jalankan test dengan timeout lebih lama
npx playwright test --timeout=30000
```

### Screenshot Tidak Match
```bash
# Update screenshot baseline
npx playwright test --update-snapshots
```

### Debug Test yang Gagal
```bash
# Debug mode dengan browser terlihat
npx playwright test --debug --headed
```
