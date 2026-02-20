import { getCollection, type CollectionEntry } from "astro:content";

/**
 * Get related articles based on category and tags
 */
export async function getRelatedArticles(
  currentPost: CollectionEntry<"blog">,
  maxArticles = 4,
) {
  const allPosts = await getCollection("blog");
  const currentTags = currentPost.data.tags || [];
  const currentCategory = currentPost.data.category;

  return allPosts
    .filter((p) => p.slug !== currentPost.slug)
    .map((p) => {
      let score = 0;
      if (p.data.category === currentCategory) score += 10;

      const sharedTags = (p.data.tags || []).filter((tag: string) =>
        currentTags.includes(tag),
      );
      score += sharedTags.length * 5;

      if (p.data.featured) score += 2;

      const daysDiff =
        Math.abs(new Date().getTime() - p.data.publishDate.getTime()) /
        (1000 * 60 * 60 * 24);
      if (daysDiff < 30) score += 1;

      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxArticles)
    .map(({ post: p }) => ({
      id: p.slug,
      title: p.data.title,
      excerpt: p.data.description,
      category: p.data.category,
      image: p.data.coverImage,
      readTime: `${p.data.readingTime || Math.ceil((p.body?.length || 1000) / 750)} Menit`,
      slug: p.slug,
    }));
}
