import { test, expect } from '@playwright/test';

test.describe('Table of Contents Component', () => {
  test.beforeEach(async ({ page }) => {
      // Navigate to the testing page
    await page.goto('/blog/testing');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });

  test('should render TOC with proper structure', async ({ page }) => {
    // Check if TOC container exists
    const tocContainer = page.locator('.table-of-contents');
    await expect(tocContainer).toBeVisible();

    // Check if TOC header exists
    const tocHeader = page.locator('.toc-header');
    await expect(tocHeader).toBeVisible();

    // Check if TOC title exists
    const tocTitle = page.locator('.toc-header h4');
    await expect(tocTitle).toHaveText('Daftar Isi');

    // Check if toggle button exists
    const toggleButton = page.locator('.toc-toggle-btn');
    await expect(toggleButton).toBeVisible();
  });

  test('should generate TOC links from headings', async ({ page }) => {
    // Wait for TOC to be generated
    await page.waitForSelector('.toc-nav .toc-link', { timeout: 5000 });

    // Check if TOC links are generated
    const tocLinks = page.locator('.toc-nav .toc-link');
    const linkCount = await tocLinks.count();
    
    expect(linkCount).toBeGreaterThan(0);
    console.log(`Found ${linkCount} TOC links`);

    // Check if each link has proper href
    for (let i = 0; i < linkCount; i++) {
      const link = tocLinks.nth(i);
      const href = await link.getAttribute('href');
      expect(href).toMatch(/^#heading-\d+$/);
    }
  });

  test('should have proper visual hierarchy with indentation', async ({ page }) => {
    await page.waitForSelector('.toc-nav .toc-link', { timeout: 5000 });

    // Test H2 styling (Level 1)
    const h2Links = page.locator('.toc-h2');
    const h2Count = await h2Links.count();
    
    if (h2Count > 0) {
      const firstH2 = h2Links.first();
      
      // Check font weight
      await expect(firstH2).toHaveClass(/font-semibold/);
      
      // Check text size
      await expect(firstH2).toHaveClass(/text-base/);
      
      // Check padding
      await expect(firstH2).toHaveClass(/pl-3/);
      
      // Check border styling
      const h2Styles = await firstH2.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          borderLeftWidth: styles.borderLeftWidth,
          borderLeftStyle: styles.borderLeftStyle
        };
      });
      
      expect(h2Styles.borderLeftWidth).toBe('3px');
      expect(h2Styles.borderLeftStyle).toBe('solid');
    }

    // Test H3 styling (Level 2)
    const h3Links = page.locator('.toc-h3');
    const h3Count = await h3Links.count();
    
    if (h3Count > 0) {
      const firstH3 = h3Links.first();
      
      // Check font weight
      await expect(firstH3).toHaveClass(/font-medium/);
      
      // Check text size
      await expect(firstH3).toHaveClass(/text-sm/);
      
      // Check padding
      await expect(firstH3).toHaveClass(/pl-6/);
      
      // Check margin
      await expect(firstH3).toHaveClass(/ml-2/);
      
      // Check if dot indicator exists
      const dotExists = await firstH3.evaluate((el) => {
        const pseudoElement = window.getComputedStyle(el, '::before');
        return pseudoElement.content !== 'none';
      });
      
      expect(dotExists).toBe(true);
    }

    // Test H4 styling (Level 3)
    const h4Links = page.locator('.toc-h4');
    const h4Count = await h4Links.count();
    
    if (h4Count > 0) {
      const firstH4 = h4Links.first();
      
      // Check font weight
      await expect(firstH4).toHaveClass(/font-normal/);
      
      // Check text size
      await expect(firstH4).toHaveClass(/text-xs/);
      
      // Check padding
      await expect(firstH4).toHaveClass(/pl-9/);
      
      // Check margin
      await expect(firstH4).toHaveClass(/ml-4/);
    }
  });

  test('should toggle TOC visibility', async ({ page }) => {
    const toggleButton = page.locator('.toc-toggle-btn');
    const tocNav = page.locator('.toc-nav');

    // Initially TOC should be expanded
    await expect(tocNav).toHaveClass(/expanded/);

    // Click toggle button
    await toggleButton.click();

    // TOC should be collapsed
    await expect(tocNav).not.toHaveClass(/expanded/);

    // Click again to expand
    await toggleButton.click();

    // TOC should be expanded again
    await expect(tocNav).toHaveClass(/expanded/);
  });

  test('should highlight active TOC link on scroll', async ({ page }) => {
    await page.waitForSelector('.toc-nav .toc-link', { timeout: 5000 });

    const tocLinks = page.locator('.toc-nav .toc-link');
    const linkCount = await tocLinks.count();
    
    if (linkCount > 0) {
      // Get first link
      const firstLink = tocLinks.first();
      const href = await firstLink.getAttribute('href');
      const targetId = href?.replace('#', '');
      
      if (targetId) {
        // Scroll to the target heading
        await page.evaluate((id) => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView();
          }
        }, targetId);

        // Wait a bit for scroll to complete
        await page.waitForTimeout(500);

        // Check if the link is now active
        await expect(firstLink).toHaveClass(/active/);
      }
    }
  });

  test('should have proper hover effects', async ({ page }) => {
    await page.waitForSelector('.toc-nav .toc-link', { timeout: 5000 });

    const tocLinks = page.locator('.toc-nav .toc-link');
    const linkCount = await tocLinks.count();
    
    if (linkCount > 0) {
      const firstLink = tocLinks.first();
      
      // Hover over the link
      await firstLink.hover();
      
      // Check if hover classes are applied
      await expect(firstLink).toHaveClass(/hover:text-primary-600/);
      await expect(firstLink).toHaveClass(/hover:bg-primary-50/);
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.waitForSelector('.table-of-contents', { timeout: 5000 });

    const tocContainer = page.locator('.table-of-contents');
    
    // Check if mobile styles are applied
    await expect(tocContainer).toHaveClass(/sticky/);
    await expect(tocContainer).toHaveClass(/rounded-none/);
    await expect(tocContainer).toHaveClass(/border-l-0/);
    await expect(tocContainer).toHaveClass(/border-r-0/);
  });

  test('should have proper scrollbar styling', async ({ page }) => {
    await page.waitForSelector('.toc-nav', { timeout: 5000 });

    const tocNav = page.locator('.toc-nav');
    
    // Check if scrollbar styling is applied
    const scrollbarStyles = await tocNav.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        overflowY: styles.overflowY,
        maxHeight: styles.maxHeight
      };
    });

    // When expanded, should have scrollable content
    expect(scrollbarStyles.overflowY).toBe('auto');
  });

  test('should handle dynamic content changes', async ({ page }) => {
    await page.waitForSelector('.toc-nav .toc-link', { timeout: 5000 });

    const initialLinkCount = await page.locator('.toc-nav .toc-link').count();

    // Simulate adding new content (this would normally be done by the app)
    await page.evaluate(() => {
      const blogContent = document.querySelector('.blog-content');
      if (blogContent) {
        const newHeading = document.createElement('h3');
        newHeading.textContent = 'Dynamic Test Heading';
        newHeading.id = 'dynamic-heading';
        blogContent.appendChild(newHeading);
      }
    });

    // Wait for TOC to update
    await page.waitForTimeout(1000);

    const newLinkCount = await page.locator('.toc-nav .toc-link').count();
    
    // Should have one more link
    expect(newLinkCount).toBe(initialLinkCount + 1);
  });

  test('should have proper accessibility', async ({ page }) => {
    const toggleButton = page.locator('.toc-toggle-btn');
    
    // Check aria-label
    await expect(toggleButton).toHaveAttribute('aria-label', 'Toggle table of contents');
    
    // Check if TOC nav has proper role
    const tocNav = page.locator('.toc-nav');
    await expect(tocNav).toHaveAttribute('role', 'navigation');
  });
});

test.describe('TOC Visual Regression Tests', () => {
  test('should match TOC visual appearance', async ({ page }) => {
    await page.goto('/blog/testing');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.table-of-contents', { timeout: 5000 });

    // Take screenshot of TOC
    const tocElement = page.locator('.table-of-contents');
    await expect(tocElement).toHaveScreenshot('table-of-contents.png');
  });

  test('should match TOC mobile appearance', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/blog/testing');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.table-of-contents', { timeout: 5000 });

    // Take screenshot of TOC on mobile
    const tocElement = page.locator('.table-of-contents');
    await expect(tocElement).toHaveScreenshot('table-of-contents-mobile.png');
  });

  test('should match TOC with different heading levels', async ({ page }) => {
    // This test uses the testing page with various heading levels
    await page.goto('/blog/testing');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.toc-nav .toc-link', { timeout: 5000 });

    // Take screenshot showing hierarchy
    const tocNav = page.locator('.toc-nav');
    await expect(tocNav).toHaveScreenshot('toc-hierarchy.png');
  });
});
