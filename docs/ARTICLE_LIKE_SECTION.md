# Article Like Section Component

## Overview
Komponen `ArticleLikeSection` adalah section khusus untuk halaman blog yang menampilkan like button, statistik artikel, dan social sharing dalam satu section yang terintegrasi.

## Features

### 🎯 **Core Features**
- ✅ **Like Button** - Heart icon dengan animasi dan feedback
- ✅ **Reading Time** - Otomatis menghitung waktu baca artikel
- ✅ **Like Count** - Menampilkan jumlah like
- ✅ **Share Count** - Menampilkan jumlah share
- ✅ **Social Sharing** - Facebook, Twitter, LinkedIn, WhatsApp, Copy Link

### 🎨 **Visual Features**
- ✅ **3 Variants** - Default, Card, Gradient
- ✅ **Responsive Design** - Mobile dan desktop optimized
- ✅ **Dark Mode Support** - Otomatis mengikuti theme
- ✅ **Smooth Animations** - Heart beat, hover effects, transitions

### 🔧 **Functionality**
- ✅ **LocalStorage** - Persist like state
- ✅ **Analytics Tracking** - Google Analytics events
- ✅ **Server API** - Optional server tracking
- ✅ **Copy to Clipboard** - One-click link copying

## Usage

### Basic Usage
```astro
<ArticleLikeSection 
  postSlug="article-slug"
  postTitle="Article Title"
/>
```

### Advanced Usage
```astro
<ArticleLikeSection 
  postSlug="article-slug"
  postTitle="Article Title"
  variant="card"
  showSocialShare={true}
  showReadingTime={true}
  className="custom-class"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `postSlug` | `string` | Required | Slug artikel untuk tracking |
| `postTitle` | `string` | `''` | Judul artikel untuk sharing |
| `variant` | `'default' \| 'minimal' \| 'card' \| 'gradient'` | `'default'` | Style variant |
| `showSocialShare` | `boolean` | `true` | Tampilkan social share buttons |
| `showReadingTime` | `boolean` | `true` | Tampilkan waktu baca |
| `className` | `string` | `''` | Custom CSS classes |

## Variants

### Default
- Background putih dengan border
- Like button dengan shadow
- Social buttons dengan warna brand

### Card
- Background gradient merah muda
- Border merah
- Text warna merah

### Gradient
- Background gradient merah-pink-purple
- Text putih
- Like button putih dengan text merah

### Minimal
- Background transparan
- Border minimal
- Hover effects subtle

## Analytics Events

### Like Event
```javascript
gtag('event', 'like_article_section', {
  'post_slug': 'article-slug',
  'like_count': 5
});
```

### Share Event
```javascript
gtag('event', 'share_article', {
  'post_slug': 'article-slug',
  'platform': 'facebook'
});
```

## API Integration

### Like Tracking
```javascript
POST /api/like
{
  "postSlug": "article-slug",
  "action": "like",
  "position": "article_section"
}
```

## Styling

### CSS Classes
- `.article-like-section` - Main container
- `.article-like-button` - Like button
- `.article-like-stats` - Statistics container
- `.article-like-social` - Social sharing container

### Customization
```css
.article-like-section.custom {
  /* Custom styles */
}
```

## Mobile Responsive

### Breakpoints
- **Desktop**: Full size dengan semua features
- **Tablet**: Adjusted spacing dan button sizes
- **Mobile**: Compact layout dengan smaller buttons

### Mobile Features
- Touch-friendly button sizes
- Optimized spacing
- Swipe-friendly social buttons

## Browser Support

- ✅ **Chrome** 60+
- ✅ **Firefox** 55+
- ✅ **Safari** 12+
- ✅ **Edge** 79+

## Performance

### Optimizations
- ✅ **Lazy Loading** - Scripts load setelah DOM ready
- ✅ **Event Delegation** - Efficient event handling
- ✅ **Minimal DOM** - Lightweight markup
- ✅ **CSS Transitions** - Hardware accelerated animations

### Bundle Size
- **CSS**: ~3KB minified
- **JavaScript**: ~2KB minified
- **Total**: ~5KB

## Testing

### Manual Testing
1. Buka halaman blog: `http://localhost:4321/blog/2024-01-15-digitalisasi-umkm`
2. Scroll ke bawah untuk melihat Article Like Section
3. Test like button functionality
4. Test social sharing buttons
5. Test responsive behavior

### Automated Testing
```javascript
// Playwright test example
test('Article Like Section functionality', async ({ page }) => {
  await page.goto('/blog/2024-01-15-digitalisasi-umkm');
  
  const likeButton = page.locator('.article-like-button');
  await expect(likeButton).toBeVisible();
  
  await likeButton.click();
  await expect(likeButton).toHaveClass(/liked/);
});
```

## Troubleshooting

### Common Issues

#### Like Button Not Working
- Check if `postSlug` prop is provided
- Verify JavaScript is enabled
- Check browser console for errors

#### Social Sharing Not Working
- Check if URL is accessible
- Verify popup blockers are disabled
- Check if `postTitle` prop is provided

#### Styling Issues
- Check if Tailwind CSS is loaded
- Verify custom CSS doesn't conflict
- Check dark mode compatibility

### Debug Mode
```javascript
// Enable debug logging
localStorage.setItem('debug-article-like', 'true');
```

## Future Enhancements

### Planned Features
- [ ] **Like Animation** - More sophisticated animations
- [ ] **Share Preview** - Preview of shared content
- [ ] **Reading Progress** - Integration with reading progress
- [ ] **Comments Integration** - Link to comments section
- [ ] **Newsletter Signup** - Integrated newsletter signup

### API Enhancements
- [ ] **Real-time Updates** - WebSocket for live like counts
- [ ] **User Authentication** - User-specific like tracking
- [ ] **Analytics Dashboard** - Detailed analytics for authors
- [ ] **A/B Testing** - Different variants for testing

## Contributing

### Development Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open: `http://localhost:4321/blog/2024-01-15-digitalisasi-umkm`

### Code Style
- Use TypeScript for type safety
- Follow Astro component patterns
- Use Tailwind CSS for styling
- Write comprehensive tests

### Pull Request Process
1. Create feature branch
2. Make changes
3. Add tests
4. Update documentation
5. Submit PR

## License
MIT License - See LICENSE file for details
