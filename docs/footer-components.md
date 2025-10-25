# Footer Components Documentation

## Overview

Sistem footer yang komprehensif untuk website KonXC dengan berbagai variant dan konfigurasi yang fleksibel.

## Komponen yang Tersedia

### 1. **Footer.astro** (Extended)
Footer lengkap dengan semua fitur:
- Newsletter subscription
- Company information
- Quick links (4 kategori)
- Social media links
- Contact information
- Legal links

### 2. **SimpleFooter.astro** (Standard)
Footer standar dengan fitur utama:
- Newsletter subscription
- Brand information
- Essential links
- Social media links
- Copyright

### 3. **MinimalFooter.astro** (Minimal)
Footer minimal untuk halaman tertentu:
- Brand information
- Essential links only
- Social media links
- Copyright

## Props Interface

### Footer.astro
```typescript
interface Props {
  class?: string;
  variant?: 'default' | 'minimal' | 'extended';
  showNewsletter?: boolean;
  showSocialLinks?: boolean;
  showQuickLinks?: boolean;
  showCompanyInfo?: boolean;
}
```

### SimpleFooter.astro
```typescript
interface Props {
  class?: string;
  showNewsletter?: boolean;
  showSocialLinks?: boolean;
}
```

### MinimalFooter.astro
```typescript
interface Props {
  class?: string;
  showSocialLinks?: boolean;
}
```

## Variant Options

### Extended Footer
```astro
<Footer variant="extended" />
```
- Newsletter section dengan gradient background
- Company information lengkap
- 4 kategori quick links
- Contact information
- Social media links
- Legal links

### Default Footer
```astro
<Footer />
```
- Newsletter section
- Company information
- Quick links
- Social media links
- Copyright

### Minimal Footer
```astro
<Footer variant="minimal" />
```
- Company information basic
- Essential links only
- Social media links
- Copyright

## Customization Options

### Newsletter Section
```astro
<!-- Dengan newsletter -->
<Footer showNewsletter={true} />

<!-- Tanpa newsletter -->
<Footer showNewsletter={false} />
```

### Social Media Links
```astro
<!-- Dengan social links -->
<Footer showSocialLinks={true} />

<!-- Tanpa social links -->
<Footer showSocialLinks={false} />
```

### Quick Links
```astro
<!-- Dengan quick links -->
<Footer showQuickLinks={true} />

<!-- Tanpa quick links -->
<Footer showQuickLinks={false} />
```

### Company Information
```astro
<!-- Dengan company info -->
<Footer showCompanyInfo={true} />

<!-- Tanpa company info -->
<Footer showCompanyInfo={false} />
```

## Data Configuration

### Quick Links Structure
```typescript
const quickLinks = {
  company: [
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Tim', href: '/team' },
    { name: 'Karir', href: '/careers' },
    { name: 'Kontak', href: '/contact' }
  ],
  services: [
    { name: 'Web Development', href: '/services/web-development' },
    { name: 'Mobile Apps', href: '/services/mobile-apps' },
    { name: 'Cloud Solutions', href: '/services/cloud-solutions' },
    { name: 'Digital Marketing', href: '/services/digital-marketing' }
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Dokumentasi', href: '/docs' },
    { name: 'Tutorial', href: '/tutorials' },
    { name: 'FAQ', href: '/faq' }
  ],
  community: [
    { name: 'Kontributor', href: '/contributors' },
    { name: 'Writers', href: '/contributors/writers' },
    { name: 'Open Source', href: '/open-source' },
    { name: 'Events', href: '/events' }
  ]
};
```

### Social Media Links
```typescript
const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/konxc', icon: 'i-mdi-github' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/konxc', icon: 'i-mdi-linkedin' },
  { name: 'Twitter', href: 'https://twitter.com/konxc', icon: 'i-mdi-twitter' },
  { name: 'Instagram', href: 'https://instagram.com/konxc', icon: 'i-mdi-instagram' },
  { name: 'YouTube', href: 'https://youtube.com/@konxc', icon: 'i-mdi-youtube' }
];
```

### Contact Information
```typescript
const contactInfo = {
  email: 'hello@konxc.space',
  phone: '+62 882 00795 2010',
  address: 'Jakarta, Indonesia',
  website: 'https://konxc.space'
};
```

## Styling

### CSS Classes
- `.footer` - Main footer container
- `.newsletter-section` - Newsletter subscription section
- `.footer-main` - Main footer content
- `.footer-brand` - Brand/logo section
- `.footer-links` - Quick links section
- `.footer-bottom` - Bottom section with copyright
- `.social-links` - Social media links
- `.legal-links` - Legal/privacy links

### Responsive Design
- Mobile-first approach
- Grid layouts yang responsive
- Flexible newsletter form
- Adaptive social links

## JavaScript Functionality

### Newsletter Form
```javascript
// Automatic form handling
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Handle subscription
    });
  }
});
```

### Features
- Form validation
- Success feedback
- Auto-reset after submission
- Email validation

## Usage Examples

### Basic Usage
```astro
---
import Footer from '@components/ui/Footer.astro';
---

<Footer />
```

### Custom Configuration
```astro
---
import Footer from '@components/ui/Footer.astro';
---

<Footer 
  variant="extended"
  showNewsletter={true}
  showSocialLinks={true}
  showQuickLinks={true}
  showCompanyInfo={true}
  class="custom-footer"
/>
```

### Different Variants
```astro
---
import Footer from '@components/ui/Footer.astro';
import SimpleFooter from '@components/ui/SimpleFooter.astro';
import MinimalFooter from '@components/ui/MinimalFooter.astro';
---

<!-- Extended footer untuk homepage -->
<Footer variant="extended" />

<!-- Simple footer untuk blog -->
<SimpleFooter />

<!-- Minimal footer untuk landing page -->
<MinimalFooter />
```

## Best Practices

### 1. **Pilih Variant yang Sesuai**
- **Extended**: Homepage, about page
- **Default**: Blog, documentation
- **Simple**: Product pages
- **Minimal**: Landing pages, forms

### 2. **Newsletter Integration**
- Gunakan service seperti Mailchimp, ConvertKit
- Implementasi proper validation
- GDPR compliance untuk EU users

### 3. **Social Media**
- Update links sesuai dengan platform yang aktif
- Gunakan icon yang konsisten
- Test semua links secara berkala

### 4. **SEO Considerations**
- Gunakan proper heading hierarchy
- Include relevant internal links
- Optimize untuk local SEO (alamat, kontak)

### 5. **Accessibility**
- Proper ARIA labels untuk social icons
- Keyboard navigation support
- Screen reader friendly

## Testing

### Demo Page
Akses `/footer-demo` untuk melihat semua variant footer dalam action.

### Manual Testing
1. Test newsletter form submission
2. Verify semua links berfungsi
3. Test responsive design
4. Check accessibility dengan screen reader

## Maintenance

### Regular Updates
- Update social media links
- Review dan update quick links
- Check newsletter integration
- Update copyright year (otomatis)

### Performance
- Optimize images (logo)
- Minimize CSS
- Lazy load social icons jika diperlukan

## Future Enhancements

### Planned Features
- Multi-language support
- Dark mode toggle
- Cookie consent integration
- Analytics tracking untuk newsletter
- A/B testing untuk newsletter copy

### Integration Opportunities
- CRM integration
- Email marketing platform
- Social media API
- Analytics dashboard
