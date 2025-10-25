# RelatedArticles Component Documentation

## 🎯 **COMPONENT OVERVIEW**

A flexible and reusable component for displaying related articles with customizable layout, styling, and functionality.

## 📋 **FEATURES**

### **✅ Core Features**
- **Dynamic article display** with flexible configuration
- **Responsive grid layouts** (1-4 columns)
- **Category badges** with custom styling
- **Reading time indicators**
- **Hover animations** and micro-interactions
- **Analytics tracking** for engagement metrics
- **Accessibility optimized** with keyboard navigation
- **Empty state handling** with graceful fallback

### **✅ Customization Options**
- **Flexible column layouts** (1, 2, 3, or 4 columns)
- **Article limit control** (maxArticles prop)
- **Custom section title**
- **Configurable CTA text**
- **Show/hide category badges**
- **Show/hide reading time**
- **Custom base URL** for article links

## 🔧 **USAGE EXAMPLES**

### **Basic Usage**
```astro
---
import RelatedArticles from '@/components/blog/RelatedArticles.astro';

const articles = [
  {
    id: '1',
    title: 'Digitalisasi UMKM: Panduan Lengkap 2024',
    excerpt: 'Pelajari langkah-langkah praktis untuk mendigitalisasi bisnis UMKM Anda...',
    category: 'Business',
    readTime: '5 min read',
    slug: 'digitalisasi-umkm-panduan-2024'
  },
  {
    id: '2',
    title: 'Best Practices Setup Server untuk Startup',
    excerpt: 'Tips dan trik untuk setup server yang optimal untuk startup...',
    category: 'Technical',
    readTime: '8 min read',
    slug: 'setup-server-startup'
  }
];
---

<RelatedArticles articles={articles} />
```

### **Advanced Configuration**
```astro
<RelatedArticles 
  title="Artikel Pilihan"
  articles={articles}
  columns={3}
  maxArticles={6}
  showCategory={true}
  showReadTime={true}
  ctaText="Selengkapnya →"
  baseUrl="/blog"
  className="my-custom-class"
/>
```

### **Single Column Layout**
```astro
<RelatedArticles 
  articles={articles}
  columns={1}
  maxArticles={3}
  title="Artikel Unggulan"
/>
```

## 📊 **PROPS INTERFACE**

### **Article Interface**
```typescript
interface Article {
  id: string;           // Unique identifier
  title: string;        // Article title
  excerpt: string;      // Article description/excerpt
  category: string;     // Article category
  readTime: string;     // Reading time estimate
  slug: string;         // URL slug for the article
  href?: string;        // Optional custom URL (overrides baseUrl + slug)
}
```

### **Component Props**
```typescript
interface Props {
  // Content configuration
  title?: string;           // Section title (default: 'Artikel Terkait')
  articles: Article[];      // Array of articles to display
  
  // Layout options
  columns?: 1 | 2 | 3 | 4; // Grid columns (default: 2)
  maxArticles?: number;     // Maximum articles to show (default: 4)
  
  // Styling options
  className?: string;       // Additional CSS classes
  showCategory?: boolean;   // Show category badges (default: true)
  showReadTime?: boolean;   // Show reading time (default: true)
  
  // CTA configuration
  ctaText?: string;         // Call-to-action text (default: 'Baca →')
  baseUrl?: string;         // Base URL for articles (default: '/blog')
}
```

## 🎨 **STYLING & DESIGN**

### **✅ Design Features**
- **Premium card design** with subtle shadows and borders
- **Gradient backgrounds** for visual depth
- **Smooth hover animations** with translate and shadow effects
- **Category badges** with branded colors
- **Typography hierarchy** with proper contrast
- **Responsive design** that works on all devices

### **✅ Color Scheme**
```css
/* Primary Colors */
Background: gradient from neutral-50 to neutral-100
Cards: white with neutral-200 borders
Category: primary-600 with primary-50 background
Text: neutral-800 (titles), neutral-600 (content)
CTA: primary-600 with hover effects

/* Interactive States */
Hover: primary-200 borders, shadow-lg, translate-y-1
Focus: primary-600 colors with outline-none
Active: Smooth transitions with transform effects
```

### **✅ Responsive Breakpoints**
```css
/* Mobile First Approach */
Mobile (< 768px): Single column, compact padding
Tablet (768px+): 2 columns for md:grid-cols-2
Desktop (1024px+): 3-4 columns for lg:grid-cols-3/4
```

## 🔧 **TECHNICAL FEATURES**

### **✅ Analytics Integration**
```javascript
// Automatic click tracking
gtag('event', 'related_article_click', {
  event_category: 'engagement',
  event_label: articleTitle,
  custom_parameter_1: category,
  custom_parameter_2: 'related_articles'
});
```

### **✅ Accessibility Features**
- **Semantic HTML** with proper article structure
- **Keyboard navigation** support
- **Focus management** with visible indicators
- **Screen reader friendly** with proper headings
- **ARIA labels** where appropriate

### **✅ Performance Optimizations**
- **CSS-only animations** for smooth performance
- **Efficient DOM structure** with minimal nesting
- **Optimized event listeners** with proper cleanup
- **Lazy loading ready** for future image integration

## 📱 **RESPONSIVE BEHAVIOR**

### **Grid Layout Responsiveness**
```css
/* 1 Column */
grid-cols-1 (all screens)

/* 2 Columns */
md:grid-cols-2 (768px+)

/* 3 Columns */
md:grid-cols-2 lg:grid-cols-3 (768px+ and 1024px+)

/* 4 Columns */
md:grid-cols-2 lg:grid-cols-4 (768px+ and 1024px+)
```

### **Mobile Optimizations**
- **Reduced padding** on smaller screens
- **Smaller typography** for better fit
- **Touch-friendly targets** (minimum 44px)
- **Optimized spacing** for mobile viewing

## 🚀 **INTEGRATION EXAMPLES**

### **Blog Post Layout**
```astro
---
// In your blog post layout
import RelatedArticles from '@/components/blog/RelatedArticles.astro';

// Get related articles (from CMS, database, or static data)
const relatedArticles = await getRelatedArticles(currentPost.tags, 4);
---

<article>
  <!-- Blog post content -->
</article>

<!-- Related Articles Section -->
<RelatedArticles 
  articles={relatedArticles}
  title="Artikel Serupa"
  columns={2}
  maxArticles={4}
/>
```

### **Homepage Integration**
```astro
---
import RelatedArticles from '@/components/blog/RelatedArticles.astro';

const featuredArticles = await getFeaturedArticles(6);
---

<RelatedArticles 
  articles={featuredArticles}
  title="Artikel Pilihan"
  columns={3}
  maxArticles={6}
  className="homepage-articles"
/>
```

### **Category Page**
```astro
---
const categoryArticles = await getArticlesByCategory(category, 8);
---

<RelatedArticles 
  articles={categoryArticles}
  title={`Artikel ${category}`}
  columns={4}
  maxArticles={8}
  showCategory={false}
/>
```

## 🎯 **BEST PRACTICES**

### **✅ Content Guidelines**
- **Keep excerpts concise** (2-3 lines maximum)
- **Use descriptive titles** that encourage clicks
- **Provide accurate reading times**
- **Categorize consistently** across articles

### **✅ Performance Tips**
- **Limit maxArticles** to reasonable numbers (4-8)
- **Optimize images** if adding them in the future
- **Use appropriate column counts** for screen size
- **Consider lazy loading** for large article lists

### **✅ Accessibility Best Practices**
- **Provide meaningful alt text** for future images
- **Use proper heading hierarchy**
- **Ensure sufficient color contrast**
- **Test with keyboard navigation**

---

**📦 Component Status**: ✅ **READY FOR PRODUCTION**  
**📅 Created**: January 26, 2024  
**👤 Developer**: AI Assistant  
**🎯 Result**: Flexible, accessible, and performant related articles component  

**🌟 Features**: Responsive design, analytics integration, accessibility optimized, and highly customizable for various use cases.
