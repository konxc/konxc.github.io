// Comments Like API endpoint
export const prerender = false;
export async function POST({ request }: { request: Request }) {
  try {
    const data = await request.json();
    const { id, type } = data;
    
    if (!id || !type) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: id, type' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate type
    if (!['comment', 'reply'].includes(type)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid type. Must be "comment" or "reply"' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Mock like functionality (in production, update database)
    // Here you would typically:
    // 1. Check if user already liked this comment
    // 2. Increment/decrement like count
    // 3. Update database
    // 4. Return new like count
    
    const mockLikes = Math.floor(Math.random() * 50) + 1;
    
    console.log(`Like ${type} ${id}: ${mockLikes} likes`);

    return new Response(JSON.stringify({ 
      success: true, 
      likes: mockLikes,
      liked: true
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Comments LIKE Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to like comment' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
