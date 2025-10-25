# RelatedArticles Component Usage Examples

## 🚀 **QUICK START GUIDE**

### **1. Basic Implementation**
```astro
---
// pages/blog/[slug].astro
import RelatedArticles from '@/components/blog/RelatedArticles.astro';

// Sample articles data
const sampleArticles = [
  {
    id: '1',
    title: 'Digitalisasi UMKM: Panduan Lengkap 2024',
    excerpt: 'Pelajari langkah-langkah praktis untuk mendigitalisasi bisnis UMKM Anda dengan teknologi terkini dan strategi yang terbukti efektif.',
    category: 'Business',
    readTime: '5 min read',
    slug: 'digitalisasi-umkm-panduan-2024'
  },
  {
    id: '2',
    title: 'Best Practices Setup Server untuk Startup',
    excerpt: 'Tips dan trik untuk setup server yang optimal untuk startup, mulai dari pemilihan hosting hingga konfigurasi keamanan.',
    category: 'Technical',
    readTime: '8 min read',
    slug: 'setup-server-startup'
  },
  {
    id: '3',
    title: 'Strategi Marketing Digital untuk UMKM',
    excerpt: 'Panduan lengkap strategi marketing digital yang efektif dan terjangkau untuk usaha mikro, kecil, dan menengah.',
    category: 'Marketing',
    readTime: '6 min read',
    slug: 'marketing-digital-umkm'
  },
  {
    id: '4',
    title: 'Membangun Tim Remote yang Produktif',
    excerpt: 'Cara membangun dan mengelola tim remote yang produktif dengan tools dan metodologi yang tepat.',
    category: 'Management',
    readTime: '7 min read',
    slug: 'tim-remote-produktif'
  }
];
---

<!-- Your blog post content -->
<article>
  <h1>Blog Post Title</h1>
  <p>Blog post content...</p>
</article>

<!-- Related Articles Section -->
<RelatedArticles articles={sampleArticles} />
```

### **2. Advanced Configuration**
```astro
---
import RelatedArticles from '@/components/blog/RelatedArticles.astro';

// Get articles from your CMS or API
const relatedArticles = await getRelatedArticles(currentPost.id, 6);
---

<RelatedArticles 
  title="Artikel yang Mungkin Anda Suka"
  articles={relatedArticles}
  columns={3}
  maxArticles={6}
  showCategory={true}
  showReadTime={true}
  ctaText="Baca Selengkapnya →"
  baseUrl="/blog"
  className="bg-neutral-50 py-16"
/>
```

### **3. Homepage Featured Articles**
```astro
---
import RelatedArticles from '@/components/blog/RelatedArticles.astro';

const featuredArticles = [
  // Your featured articles data
];
---

<RelatedArticles 
  title="Artikel Pilihan"
  articles={featuredArticles}
  columns={4}
  maxArticles={8}
  ctaText="Lihat Detail →"
/>
```

## 📋 **INTEGRATION SCENARIOS**

### **Scenario 1: Blog Post Footer**
```astro
---
// layouts/BlogPostLayout.astro
import RelatedArticles from '@/components/blog/RelatedArticles.astro';

export interface Props {
  frontmatter: {
    title: string;
    category: string;
    tags: string[];
  };
}

const { frontmatter } = Astro.props;

// Get related articles based on tags or category
const relatedArticles = await getRelatedByTags(frontmatter.tags, 4);
---

<html>
<body>
  <main>
    <article>
      <slot />
    </article>
    
    <!-- Related Articles -->
    <RelatedArticles 
      articles={relatedArticles}
      title="Artikel Serupa"
      columns={2}
      maxArticles={4}
    />
  </main>
</body>
</html>
```

### **Scenario 2: Category Landing Page**
```astro
---
// pages/category/[category].astro
import RelatedArticles from '@/components/blog/RelatedArticles.astro';

const { category } = Astro.params;
const categoryArticles = await getArticlesByCategory(category);
---

<div class="category-page">
  <header>
    <h1>Kategori: {category}</h1>
  </header>
  
  <RelatedArticles 
    articles={categoryArticles}
    title={`Semua Artikel ${category}`}
    columns={3}
    maxArticles={12}
    showCategory={false}
    className="category-articles"
  />
</div>
```

### **Scenario 3: Author Profile Page**
```astro
---
// pages/author/[author].astro
import RelatedArticles from '@/components/blog/RelatedArticles.astro';

const { author } = Astro.params;
const authorArticles = await getArticlesByAuthor(author);
---

<div class="author-page">
  <section class="author-bio">
    <!-- Author information -->
  </section>
  
  <RelatedArticles 
    articles={authorArticles}
    title={`Artikel oleh ${author}`}
    columns={2}
    maxArticles={8}
    ctaText="Baca →"
  />
</div>
```

## 🎨 **STYLING CUSTOMIZATION**

### **Custom CSS Classes**
```astro
<RelatedArticles 
  articles={articles}
  className="custom-related-articles"
/>

<style>
  :global(.custom-related-articles) {
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    padding: 4rem 0;
  }
  
  :global(.custom-related-articles .related-article-card) {
    border: 2px solid #e2e8f0;
    border-radius: 16px;
  }
  
  :global(.custom-related-articles .article-category) {
    background: #3b82f6;
    color: white;
  }
</style>
```

### **Theme Variants**
```astro
<!-- Dark Theme -->
<RelatedArticles 
  articles={articles}
  className="dark-theme"
/>

<style>
  :global(.dark-theme) {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  }
  
  :global(.dark-theme .related-article-card) {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }
  
  :global(.dark-theme .article-link) {
    color: #f9fafb;
  }
  
  :global(.dark-theme .article-link:hover) {
    color: #60a5fa;
  }
</style>
```

## 📊 **DATA INTEGRATION**

### **Static Data (Markdown/MDX)**
```astro
---
import { getCollection } from 'astro:content';
import RelatedArticles from '@/components/blog/RelatedArticles.astro';

// Get all blog posts
const allPosts = await getCollection('blog');

// Transform to RelatedArticles format
const articles = allPosts.map(post => ({
  id: post.id,
  title: post.data.title,
  excerpt: post.data.description,
  category: post.data.category,
  readTime: `${Math.ceil(post.body.length / 200)} min read`,
  slug: post.slug
}));
---

<RelatedArticles articles={articles} />
```

### **CMS Integration (Strapi/Contentful)**
```astro
---
import RelatedArticles from '@/components/blog/RelatedArticles.astro';

// Fetch from CMS
const response = await fetch('https://api.your-cms.com/articles');
const cmsArticles = await response.json();

// Transform CMS data
const articles = cmsArticles.map(article => ({
  id: article.id.toString(),
  title: article.attributes.title,
  excerpt: article.attributes.excerpt,
  category: article.attributes.category.data.attributes.name,
  readTime: article.attributes.readTime,
  slug: article.attributes.slug,
  href: `/blog/${article.attributes.slug}`
}));
---

<RelatedArticles articles={articles} />
```

### **Database Integration**
```astro
---
import { db } from '@/lib/database';
import RelatedArticles from '@/components/blog/RelatedArticles.astro';

// Query database
const dbArticles = await db.articles.findMany({
  where: { published: true },
  orderBy: { createdAt: 'desc' },
  take: 6
});

// Transform database data
const articles = dbArticles.map(article => ({
  id: article.id,
  title: article.title,
  excerpt: article.excerpt,
  category: article.category,
  readTime: article.readTime,
  slug: article.slug
}));
---

<RelatedArticles articles={articles} />
```

## 🔧 **ADVANCED FEATURES**

### **Analytics Integration**
```astro
<RelatedArticles articles={articles} />

<script>
  // Custom analytics tracking
  document.addEventListener('DOMContentLoaded', () => {
    // Track section view
    if (typeof gtag !== 'undefined') {
      gtag('event', 'related_articles_view', {
        event_category: 'engagement',
        event_label: 'related_articles_section'
      });
    }
  });
</script>
```

### **Performance Optimization**
```astro
---
// Lazy load articles for better performance
const articles = await getArticles();
const priorityArticles = articles.slice(0, 4); // Load first 4 immediately
const lazyArticles = articles.slice(4); // Load rest on demand
---

<RelatedArticles articles={priorityArticles} />

<!-- Lazy load additional articles -->
<div id="lazy-articles" style="display: none;">
  <RelatedArticles 
    articles={lazyArticles}
    title="Artikel Lainnya"
  />
</div>

<script>
  // Intersection Observer for lazy loading
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazySection = document.getElementById('lazy-articles');
        if (lazySection) {
          lazySection.style.display = 'block';
          observer.disconnect();
        }
      }
    });
  });
  
  const trigger = document.querySelector('.related-articles');
  if (trigger) observer.observe(trigger);
</script>
```

## 🎯 **BEST PRACTICES**

### **✅ Content Strategy**
- **Relevant articles**: Ensure articles are truly related to current content
- **Fresh content**: Regularly update article pools
- **Quality excerpts**: Write compelling 2-3 line descriptions
- **Accurate timing**: Provide realistic reading time estimates

### **✅ Performance Tips**
- **Limit articles**: Keep maxArticles reasonable (4-8 for most cases)
- **Optimize images**: If adding images, use proper optimization
- **Cache data**: Cache article queries for better performance
- **Progressive loading**: Consider lazy loading for large lists

### **✅ SEO Optimization**
- **Internal linking**: Great for SEO and user engagement
- **Semantic HTML**: Uses proper article structure
- **Schema markup**: Consider adding structured data
- **Link juice**: Distributes page authority across content

---

**📖 Usage Guide**: ✅ **COMPREHENSIVE**  
**📅 Updated**: January 26, 2024  
**👤 Author**: AI Assistant  
**🎯 Result**: Complete implementation guide with real-world examples  

**🌟 Ready to Use**: Copy any example above and customize for your specific needs!
