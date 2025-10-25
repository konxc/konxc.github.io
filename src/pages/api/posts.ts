// API endpoint untuk posts data
import { getCollection } from 'astro:content';

export async function GET() {
  try {
    const posts = await getCollection('blog');
    
    const searchablePosts = posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      tags: post.data.tags,
      category: post.data.category,
      slug: post.slug,
      publishDate: post.data.publishDate,
      readingTime: post.data.readingTime,
      author: post.data.author,
      featured: post.data.featured
    }));

    return new Response(JSON.stringify(searchablePosts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
