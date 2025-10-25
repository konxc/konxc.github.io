// tests/markdownParser.test.ts
import { describe, it, expect } from 'vitest';
import {
  parseInteractiveDemos,
  extractDemoContent,
  getDemoMetadata,
  validateDemoStructure,
  generateDemoSummary,
  extractHeadings,
  generateTableOfContents,
  parseBlogPostComplete,
  formatDemoContent,
  extractDemoDependencies,
  generateDemoSEOMetadata
} from '../src/utils/markdownParser';

describe('Markdown Parser', () => {
  const sampleContent = `
# Test Article

## Introduction

This is a test article with interactive demos.

### Demo 1

<!-- INTERACTIVE_DEMO:demo1 -->
\`\`\`javascript
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} }
};
\`\`\`
<!-- END_INTERACTIVE_DEMO -->

### Demo 2

<!-- INTERACTIVE_DEMO:demo2 -->
\`\`\`css
:root {
  --color-primary: #3b82f6;
}
\`\`\`
<!-- END_INTERACTIVE_DEMO -->

## Conclusion

This concludes the test article.
  `;

  const sampleFrontmatter = {
    title: 'Test Article',
    description: 'A test article',
    interactiveDemos: [
      {
        id: 'demo1',
        type: 'code',
        title: 'Demo 1',
        description: 'First demo',
        icon: '💻',
        featured: true,
        metadata: { difficulty: 'beginner' }
      },
      {
        id: 'demo2',
        type: 'visual',
        title: 'Demo 2',
        description: 'Second demo',
        icon: '🎨',
        featured: false,
        metadata: { difficulty: 'intermediate' }
      }
    ]
  };

  describe('parseInteractiveDemos', () => {
    it('should parse interactive demos from markdown content', () => {
      const demos = parseInteractiveDemos(sampleContent, sampleFrontmatter);
      
      expect(demos).toHaveLength(2);
      expect(demos[0]).toMatchObject({
        id: 'demo1',
        type: 'code',
        title: 'Demo 1',
        description: 'First demo',
        icon: '💻',
        featured: true,
        language: 'javascript',
        metadata: { difficulty: 'beginner' }
      });
      expect(demos[1]).toMatchObject({
        id: 'demo2',
        type: 'visual',
        title: 'Demo 2',
        description: 'Second demo',
        icon: '🎨',
        featured: false,
        language: 'css',
        metadata: { difficulty: 'intermediate' }
      });
    });

    it('should handle content without demos', () => {
      const content = '# Simple Article\n\nThis is a simple article without demos.';
      const demos = parseInteractiveDemos(content, {});
      
      expect(demos).toHaveLength(0);
    });

    it('should handle malformed demo blocks', () => {
      const content = `
# Article

<!-- INTERACTIVE_DEMO:demo1 -->
\`\`\`javascript
const config = {};
\`\`\`
<!-- END_INTERACTIVE_DEMO -->

<!-- INTERACTIVE_DEMO:demo2 -->
\`\`\`css
:root { --color: #000; }
\`\`\`
<!-- Missing END tag -->
      `;
      
      const demos = parseInteractiveDemos(content, sampleFrontmatter);
      
      // Should only parse the first demo
      expect(demos).toHaveLength(1);
      expect(demos[0].id).toBe('demo1');
    });
  });

  describe('extractDemoContent', () => {
    it('should extract demo content by ID', () => {
      const content = extractDemoContent(sampleContent, 'demo1');
      
      expect(content).toContain('const config = {');
      expect(content).toContain('content: [\'./src/**/*.{js,ts,jsx,tsx}\']');
      expect(content).toContain('theme: { extend: {} }');
    });

    it('should return empty string for non-existent demo', () => {
      const content = extractDemoContent(sampleContent, 'non-existent');
      
      expect(content).toBe('');
    });
  });

  describe('getDemoMetadata', () => {
    it('should get demo metadata from frontmatter', () => {
      const metadata = getDemoMetadata(sampleFrontmatter, 'demo1');
      
      expect(metadata).toMatchObject({
        id: 'demo1',
        type: 'code',
        title: 'Demo 1',
        description: 'First demo',
        icon: '💻',
        featured: true,
        metadata: { difficulty: 'beginner' }
      });
    });

    it('should return null for non-existent demo', () => {
      const metadata = getDemoMetadata(sampleFrontmatter, 'non-existent');
      
      expect(metadata).toBeNull();
    });
  });

  describe('validateDemoStructure', () => {
    it('should validate correct demo structure', () => {
      const demo = {
        id: 'demo1',
        type: 'code',
        title: 'Demo 1',
        description: 'First demo',
        icon: '💻',
        featured: true,
        content: 'const config = {};',
        language: 'javascript',
        metadata: {}
      };
      
      const isValid = validateDemoStructure(demo);
      
      expect(isValid).toBe(true);
    });

    it('should reject demo with missing required fields', () => {
      const demo = {
        id: 'demo1',
        type: 'code',
        // Missing title, description, icon
        featured: true,
        content: 'const config = {};',
        language: 'javascript',
        metadata: {}
      };
      
      const isValid = validateDemoStructure(demo as any);
      
      expect(isValid).toBe(false);
    });
  });

  describe('generateDemoSummary', () => {
    it('should generate demo summary', () => {
      const demos = [
        {
          id: 'demo1',
          type: 'code',
          title: 'Demo 1',
          description: 'First demo',
          icon: '💻',
          featured: true,
          content: 'const config = {};',
          language: 'javascript',
          metadata: {}
        },
        {
          id: 'demo2',
          type: 'visual',
          title: 'Demo 2',
          description: 'Second demo',
          icon: '🎨',
          featured: false,
          content: ':root { --color: #000; }',
          language: 'css',
          metadata: {}
        }
      ];
      
      const summary = generateDemoSummary(demos);
      
      expect(summary).toMatchObject({
        total: 2,
        byType: { code: 1, visual: 1 },
        featured: 1,
        averageContentLength: expect.any(Number)
      });
    });
  });

  describe('extractHeadings', () => {
    it('should extract headings from markdown content', () => {
      const headings = extractHeadings(sampleContent);
      
      expect(headings).toHaveLength(4);
      expect(headings[0]).toMatchObject({
        level: 1,
        text: 'Test Article',
        id: 'test-article'
      });
      expect(headings[1]).toMatchObject({
        level: 2,
        text: 'Introduction',
        id: 'introduction'
      });
    });
  });

  describe('generateTableOfContents', () => {
    it('should generate table of contents from headings', () => {
      const headings = [
        { level: 1, text: 'Test Article', id: 'test-article' },
        { level: 2, text: 'Introduction', id: 'introduction' },
        { level: 3, text: 'Demo 1', id: 'demo-1' },
        { level: 2, text: 'Conclusion', id: 'conclusion' }
      ];
      
      const toc = generateTableOfContents(headings);
      
      expect(toc).toHaveLength(2); // Only h1 and h2 at root level
      expect(toc[0]).toMatchObject({
        level: 1,
        text: 'Test Article',
        id: 'test-article',
        children: []
      });
      expect(toc[1]).toMatchObject({
        level: 2,
        text: 'Introduction',
        id: 'introduction',
        children: expect.any(Array)
      });
    });
  });

  describe('formatDemoContent', () => {
    it('should format demo content with syntax highlighting', () => {
      const content = 'const config = {};';
      const formatted = formatDemoContent(content, 'javascript');
      
      expect(formatted).toContain('```javascript');
      expect(formatted).toContain('const config = {};');
      expect(formatted).toContain('```');
    });

    it('should handle content that already has syntax highlighting', () => {
      const content = '```javascript\nconst config = {};\n```';
      const formatted = formatDemoContent(content, 'javascript');
      
      expect(formatted).toBe(content.trim());
    });
  });

  describe('extractDemoDependencies', () => {
    it('should extract import statements', () => {
      const content = `
import React from 'react';
import { useState } from 'react';
import { Button } from '@components/ui/Button';
      `;
      
      const dependencies = extractDemoDependencies(content);
      
      expect(dependencies).toContain('react');
      expect(dependencies).toContain('@components/ui/Button');
    });

    it('should extract require statements', () => {
      const content = `
const fs = require('fs');
const path = require('path');
      `;
      
      const dependencies = extractDemoDependencies(content);
      
      expect(dependencies).toContain('fs');
      expect(dependencies).toContain('path');
    });

    it('should remove duplicates', () => {
      const content = `
import React from 'react';
import { useState } from 'react';
import React from 'react';
      `;
      
      const dependencies = extractDemoDependencies(content);
      
      expect(dependencies).toHaveLength(2);
      expect(dependencies.filter(dep => dep === 'react')).toHaveLength(1);
    });
  });

  describe('generateDemoSEOMetadata', () => {
    it('should generate SEO metadata for demos', () => {
      const demos = [
        {
          id: 'demo1',
          type: 'code',
          title: 'Demo 1',
          description: 'First demo',
          icon: '💻',
          featured: true,
          content: 'const config = {};',
          language: 'javascript',
          metadata: { tags: ['configuration', 'setup'] }
        }
      ];
      
      const seoMetadata = generateDemoSEOMetadata(demos);
      
      expect(seoMetadata).toMatchObject({
        keywords: expect.any(Array),
        description: expect.any(String),
        structuredData: expect.any(Object)
      });
      
      expect(seoMetadata.keywords).toContain('Demo 1');
      expect(seoMetadata.keywords).toContain('code');
      expect(seoMetadata.keywords).toContain('configuration');
    });
  });
});

describe('Integration Tests', () => {
  it('should parse complete blog post', () => {
    // Mock blog post entry
    const mockPost = {
      frontmatter: {
        title: 'Test Article',
        description: 'A test article',
        slug: 'test-article',
        date: '2024-01-25',
        author: 'Test Author',
        tags: ['test'],
        category: 'Test',
        interactiveDemos: [
          {
            id: 'demo1',
            type: 'code',
            title: 'Demo 1',
            description: 'First demo',
            icon: '💻',
            featured: true
          }
        ]
      },
      body: 'This is the article body.',
      compiledContent: () => sampleContent,
      rawContent: () => sampleContent
    } as any;
    
    const parsed = parseBlogPostComplete(mockPost);
    
    expect(parsed).toMatchObject({
      frontmatter: expect.any(Object),
      content: expect.any(String),
      interactiveDemos: expect.any(Array),
      readingTime: expect.any(Number),
      wordCount: expect.any(Number),
      headings: expect.any(Array),
      tableOfContents: expect.any(Array),
      demoSummary: expect.any(Object)
    });
    
    expect(parsed.interactiveDemos).toHaveLength(2);
    expect(parsed.readingTime).toBeGreaterThan(0);
    expect(parsed.wordCount).toBeGreaterThan(0);
  });
});
