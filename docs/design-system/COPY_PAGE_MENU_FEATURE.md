# Copy Page Menu Feature

## Overview
Fitur Copy Page Menu memberikan opsi untuk menyalin konten artikel, melihat sebagai Markdown, dan membuka di berbagai AI assistant. Terinspirasi dari dokumentasi Cloudflare dengan UI yang modern dan user-friendly.

## Fitur yang Tersedia

### 1. Copy Page Link
- **Fungsi:** Menyalin URL halaman saat ini ke clipboard
- **Icon:** Chain link
- **Deskripsi:** "Copy the current page URL to clipboard"

### 2. Copy Entire Content
- **Fungsi:** Menyalin seluruh konten artikel ke clipboard
- **Icon:** Document
- **Deskripsi:** "Copy the full article content to clipboard"
- **Format:** Title + Content dalam format teks biasa

### 3. View Page as Markdown
- **Fungsi:** Membuka konten dalam format Markdown di tab baru
- **Icon:** External link
- **Deskripsi:** "Open the Markdown file in a new tab"
- **Implementasi:** Konversi otomatis dari HTML ke Markdown

### 4. Open in Claude
- **Fungsi:** Membuka artikel di Claude AI dengan URL yang sudah di-encode
- **Icon:** Star
- **Deskripsi:** "Ask Claude about this page"
- **URL:** `https://claude.ai/chat?url={encoded_url}`

### 5. Open in ChatGPT
- **Fungsi:** Membuka artikel di ChatGPT dengan URL yang sudah di-encode
- **Icon:** Lightbulb
- **Deskripsi:** "Ask ChatGPT about this page"
- **URL:** `https://chat.openai.com/?url={encoded_url}`

### 6. Ask AI Chat Assistant (Coming Soon)
- **Fungsi:** AI assistant internal (dalam pengembangan)
- **Icon:** Chat bubble
- **Deskripsi:** "Open our AI assistant (coming soon)"
- **Status:** Disabled dengan feedback "coming soon"

## Implementasi Teknis

### Component Structure
```astro
<CopyPageMenu />
```

### Props Interface
```typescript
export interface Props {
  postTitle?: string;
  postContent?: string;
  postUrl?: string;
  className?: string;
}
```

### JavaScript Class
```typescript
class CopyPageMenu {
  private copyBtn: HTMLButtonElement | null = null;
  private menuContent: HTMLDivElement | null = null;
  private isOpen: boolean = false;

  // Methods:
  - initializeElements()
  - bindEvents()
  - toggleMenu()
  - openMenu()
  - closeMenu()
  - handleAction(action: string)
  - copyPageLink()
  - copyEntireContent()
  - extractArticleContent()
  - viewAsMarkdown()
  - convertToMarkdown()
  - openInClaude()
  - openInChatGPT()
  - showComingSoon()
  - showFeedback()
}
```

## UI/UX Features

### Dropdown Menu
- **Position:** Absolute positioning dengan `right-0 top-full`
- **Width:** 320px (responsive: 288px mobile, 256px small mobile)
- **Animation:** Scale + fade in/out dengan duration 200ms
- **Z-index:** 50 untuk memastikan di atas elemen lain

### Button Design
- **Style:** Modern button dengan border dan hover effects
- **Icons:** SVG icons untuk setiap action
- **States:** Active state dengan background dan border color changes
- **Accessibility:** ARIA labels dan keyboard navigation

### Menu Items
- **Layout:** Flex layout dengan icon + text
- **Hover:** Background color change dan icon color change
- **Disabled:** Opacity 50% dan cursor not-allowed
- **Spacing:** Consistent padding dan gap

### Feedback System
- **Position:** Fixed top-right dengan slide-in animation
- **Types:** Success (green), Error (red), Info (blue)
- **Duration:** 3 detik dengan fade out
- **Auto-remove:** DOM element dihapus setelah animasi

## Styling

### Base Styles
```css
.copy-page-menu {
  @apply relative inline-block;
}

.copy-page-btn {
  @apply flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-600 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 hover:text-neutral-800 transition-all duration-200;
}
```

### Menu Content
```css
.copy-page-menu-content {
  @apply absolute right-0 top-full mt-2 w-80 bg-white border border-neutral-200 rounded-lg shadow-xl z-50 opacity-0 invisible transition-all duration-200 transform scale-95;
}
```

### Menu Items
```css
.menu-item {
  @apply flex items-start gap-3 p-4 hover:bg-neutral-50 cursor-pointer transition-colors duration-150;
}
```

### Dark Mode Support
```css
.dark .copy-page-btn {
  @apply bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700 hover:text-neutral-100;
}

.dark .copy-page-menu-content {
  @apply bg-neutral-800 border-neutral-700;
}
```

## Event Handling

### Click Events
- **Button click:** Toggle menu open/close
- **Outside click:** Close menu
- **Menu item click:** Execute action dan close menu
- **Escape key:** Close menu

### Clipboard API
- **Modern API:** `navigator.clipboard.writeText()`
- **Error handling:** Fallback untuk browser yang tidak support
- **Async/await:** Modern JavaScript pattern

### External Links
- **Target:** `_blank` untuk membuka di tab baru
- **URL encoding:** `encodeURIComponent()` untuk URL yang aman
- **Error handling:** Try-catch untuk network errors

## Content Extraction

### Article Content
```typescript
private extractArticleContent(): string {
  const title = document.querySelector('h1')?.textContent || '';
  const content = document.querySelector('.blog-content') || document.querySelector('.prose');
  
  if (!content) {
    throw new Error('Article content not found');
  }

  const textContent = content.textContent || '';
  const formattedContent = `${title}\n\n${textContent.trim()}`;
  
  return formattedContent;
}
```

### Markdown Conversion
```typescript
private convertToMarkdown(content: string): string {
  const lines = content.split('\n');
  const markdownLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    
    // Convert headings (basic detection)
    if (trimmed.length < 50 && !trimmed.includes('.')) {
      return `## ${trimmed}`;
    }
    
    return trimmed;
  });
  
  return markdownLines.join('\n');
}
```

## Responsive Design

### Breakpoints
- **Desktop:** 320px width
- **Tablet (640px):** 288px width
- **Mobile (480px):** 256px width dengan padding yang lebih kecil

### Mobile Optimizations
- **Touch targets:** Minimum 44px untuk accessibility
- **Spacing:** Reduced padding pada mobile
- **Typography:** Smaller font sizes untuk fit content

## Accessibility

### ARIA Support
- **Button:** `aria-label="Copy page options"`
- **Menu:** Proper focus management
- **Keyboard:** Escape key support

### Keyboard Navigation
- **Tab:** Navigate through menu items
- **Enter/Space:** Activate menu items
- **Escape:** Close menu

### Screen Reader Support
- **Descriptive text:** Clear descriptions untuk setiap action
- **State changes:** Announcements untuk feedback

## Browser Compatibility

### Modern Browsers
- **Chrome/Edge:** Full support
- **Firefox:** Full support
- **Safari:** Full support

### Legacy Support
- **IE11:** Basic functionality dengan polyfills
- **Older mobile:** Graceful degradation

## Performance Considerations

### Lazy Loading
- **Script:** Load hanya ketika diperlukan
- **DOM:** Minimal DOM manipulation

### Memory Management
- **Event listeners:** Proper cleanup
- **Blob URLs:** Revoke setelah digunakan
- **Feedback elements:** Auto-remove dari DOM

## Testing

### Manual Testing
- ✅ Copy page link functionality
- ✅ Copy entire content functionality
- ✅ View as Markdown functionality
- ✅ Open in Claude functionality
- ✅ Open in ChatGPT functionality
- ✅ Coming soon feedback
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Keyboard navigation
- ✅ Error handling

### Edge Cases
- ✅ No content found
- ✅ Clipboard API not supported
- ✅ Network errors
- ✅ Invalid URLs

## Future Enhancements

### Planned Features
1. **AI Chat Assistant:** Internal AI assistant integration
2. **Export Options:** PDF, EPUB, Word document export
3. **Social Sharing:** Direct sharing ke social media
4. **Print Preview:** Print-optimized view
5. **Offline Support:** Service worker integration

### API Integrations
1. **Claude API:** Direct API integration
2. **ChatGPT API:** Direct API integration
3. **Custom AI:** Internal AI service
4. **Analytics:** Usage tracking

## Conclusion

Copy Page Menu memberikan user experience yang modern dan comprehensive untuk mengakses dan berbagi konten artikel. Dengan desain yang clean, functionality yang lengkap, dan support untuk berbagai platform AI, fitur ini meningkatkan nilai blog KonXC secara signifikan.
