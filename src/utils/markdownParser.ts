// src/utils/markdownParser.ts
import type { CollectionEntry } from "astro:content";

export interface InteractiveDemo {
  id: string;
  type: "code" | "visual" | "interactive";
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  content: string;
  language?: string;
  metadata?: Record<string, unknown>;
}

export interface ParsedBlogPost {
  frontmatter: Record<string, unknown>;
  content: string;
  interactiveDemos: InteractiveDemo[];
  readingTime: number;
  wordCount: number;
}

/**
 * Parse interactive demos from markdown content
 */
export function parseInteractiveDemos(
  content: string,
  frontmatter: Record<string, unknown>,
): InteractiveDemo[] {
  const demos: InteractiveDemo[] = [];

  // Regex untuk mencari demo blocks
  const demoRegex =
    /<!-- INTERACTIVE_DEMO:(\w+) -->\s*```(\w+)?\s*([\s\S]*?)```\s*<!-- END_INTERACTIVE_DEMO -->/g;

  let match;
  while ((match = demoRegex.exec(content)) !== null) {
    const [, id, language, demoContent] = match;

    // Cari metadata dari frontmatter
    const demoMetadata = (
      frontmatter.interactiveDemos as Array<Record<string, unknown>>
    )?.find((d: Record<string, unknown>) => d.id === id);

    if (demoMetadata) {
      const demo: InteractiveDemo = {
        id,
        type:
          (demoMetadata.type as "code" | "visual" | "interactive") || "code",
        title: (demoMetadata.title as string) || id,
        description: (demoMetadata.description as string) || "",
        icon: (demoMetadata.icon as string) || "💻",
        featured: (demoMetadata.featured as boolean) || false,
        content: demoContent.trim(),
        language: language || "javascript",
        metadata: (demoMetadata.metadata as Record<string, unknown>) || {},
      };

      demos.push(demo);
    }
  }

  return demos;
}

/**
 * Parse blog post content dan extract interactive demos
 */
export async function parseBlogPost(
  post: CollectionEntry<"blog">,
): Promise<ParsedBlogPost> {
  try {
    // ✅ Use post.data instead of post.frontmatter
    const frontmatter = post.data;

    if (!frontmatter) {
      throw new Error(`Frontmatter is undefined for post: ${post.slug}`);
    }

    await post.render();

    // Get raw content untuk parsing demos
    const rawContent = post.body;

    if (!rawContent) {
      throw new Error(`Body content is undefined for post: ${post.slug}`);
    }

    // Parse interactive demos
    const interactiveDemos = parseInteractiveDemos(rawContent, frontmatter);

    // Calculate reading time dan word count
    const wordCount = rawContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

    const result = {
      frontmatter,
      content: rawContent,
      interactiveDemos,
      readingTime,
      wordCount,
    };

    return result;
  } catch (error) {
    console.error("Error parsing post:", post.slug, error);
    throw error;
  }
}

/**
 * Extract demo content untuk rendering
 */
export function extractDemoContent(content: string, demoId: string): string {
  const demoRegex = new RegExp(
    `<!-- INTERACTIVE_DEMO:${demoId} -->\\s*\`\`\`(\\w+)?\\s*([\\s\\S]*?)\`\`\`\\s*<!-- END_INTERACTIVE_DEMO -->`,
  );

  const match = content.match(demoRegex);
  return match ? match[2].trim() : "";
}

/**
 * Get demo metadata dari frontmatter
 */
export function getDemoMetadata(
  frontmatter: Record<string, unknown>,
  demoId: string,
): InteractiveDemo | null {
  const demo = (
    frontmatter.interactiveDemos as Array<Record<string, unknown>>
  )?.find((d: Record<string, unknown>) => d.id === demoId);

  if (!demo) return null;

  return {
    id: demoId,
    type: (demo.type as "code" | "visual" | "interactive") || "code",
    title: (demo.title as string) || demoId,
    description: (demo.description as string) || "",
    icon: (demo.icon as string) || "💻",
    featured: (demo.featured as boolean) || false,
    content: "",
    language: "javascript",
    metadata: (demo.metadata as Record<string, unknown>) || {},
  };
}

/**
 * Validate demo structure
 */
export function validateDemoStructure(demo: InteractiveDemo): boolean {
  const requiredFields = ["id", "type", "title", "description", "icon"];

  return requiredFields.every((field) => {
    const value = demo[field as keyof InteractiveDemo];
    return value !== undefined && value !== null && value !== "";
  });
}

/**
 * Generate demo summary untuk analytics
 */
export function generateDemoSummary(demos: InteractiveDemo[]): {
  total: number;
  byType: Record<string, number>;
  featured: number;
  averageContentLength: number;
} {
  const byType = demos.reduce(
    (acc, demo) => {
      acc[demo.type] = (acc[demo.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const featured = demos.filter((demo) => demo.featured).length;
  const averageContentLength =
    demos.reduce((sum, demo) => sum + demo.content.length, 0) / demos.length;

  return {
    total: demos.length,
    byType,
    featured,
    averageContentLength: Math.round(averageContentLength),
  };
}

/**
 * Parse markdown untuk extract headings
 */
export function extractHeadings(content: string): Array<{
  level: number;
  text: string;
  id: string;
}> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ level: number; text: string; id: string }> = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const [, hashes, text] = match;
    const level = hashes.length;
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();

    headings.push({ level, text, id });
  }

  return headings;
}

/**
 * Generate table of contents dari headings
 */
export function generateTableOfContents(
  headings: Array<{ level: number; text: string; id: string }>,
): Array<{
  level: number;
  text: string;
  id: string;
  children: Array<Record<string, unknown>>;
}> {
  const toc: Array<{
    level: number;
    text: string;
    id: string;
    children: Array<Record<string, unknown>>;
  }> = [];
  const stack: Array<Record<string, unknown>> = [];

  headings.forEach((heading) => {
    const tocItem = { ...heading, children: [] };

    // Pop stack sampai level yang sesuai
    while (
      stack.length > 0 &&
      (stack[stack.length - 1].level as number) >= heading.level
    ) {
      stack.pop();
    }

    // Add ke parent yang sesuai
    if (stack.length > 0) {
      (stack[stack.length - 1].children as Array<Record<string, unknown>>).push(
        tocItem,
      );
    } else {
      toc.push(tocItem);
    }

    stack.push(tocItem);
  });

  return toc;
}

/**
 * Parse blog post dengan semua fitur
 */
export async function parseBlogPostComplete(
  post: CollectionEntry<"blog">,
): Promise<
  ParsedBlogPost & {
    headings: Array<{ level: number; text: string; id: string }>;
    tableOfContents: Array<{
      level: number;
      text: string;
      id: string;
      children: Array<Record<string, unknown>>;
    }>;
    demoSummary: {
      total: number;
      byType: Record<string, number>;
      featured: number;
      averageContentLength: number;
    };
  }
> {
  const parsed = await parseBlogPost(post);
  const headings = extractHeadings(parsed.content);
  const tableOfContents = generateTableOfContents(headings);
  const demoSummary = generateDemoSummary(parsed.interactiveDemos);

  return {
    ...parsed,
    headings,
    tableOfContents,
    demoSummary,
  };
}

/**
 * Utility untuk format demo content
 */
export function formatDemoContent(
  content: string,
  language = "javascript",
): string {
  // Remove extra whitespace
  const trimmed = content.trim();

  // Add syntax highlighting markers jika diperlukan
  if (language && !trimmed.includes("```")) {
    return `\`\`\`${language}\n${trimmed}\n\`\`\``;
  }

  return trimmed;
}

/**
 * Extract demo dependencies
 */
export function extractDemoDependencies(content: string): string[] {
  const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
  const requireRegex = /require\(['"]([^'"]+)['"]\)/g;
  const dependencies: string[] = [];

  let match;
  while ((match = importRegex.exec(content)) !== null) {
    dependencies.push(match[1]);
  }

  while ((match = requireRegex.exec(content)) !== null) {
    dependencies.push(match[1]);
  }

  return [...new Set(dependencies)]; // Remove duplicates
}

/**
 * Generate demo metadata untuk SEO
 */
export function generateDemoSEOMetadata(demos: InteractiveDemo[]): {
  keywords: string[];
  description: string;
  structuredData: Record<string, unknown>;
} {
  const keywords = demos.flatMap((demo) => [
    demo.title,
    demo.type,
    ...((demo.metadata?.tags as string[]) || []),
  ]);

  const description = demos
    .filter((demo) => demo.featured)
    .map((demo) => demo.description)
    .join(". ");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    interactiveElements: demos.map((demo) => ({
      "@type": "WebPageElement",
      name: demo.title,
      description: demo.description,
      interactionType: demo.type,
    })),
  };

  return {
    keywords: [...new Set(keywords)],
    description,
    structuredData,
  };
}
