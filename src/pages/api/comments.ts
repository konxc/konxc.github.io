// Comments API endpoint
export const prerender = false;
export async function GET({ url }: { url: URL }) {
  try {
    const postSlug = url.searchParams.get('post');
    
    if (!postSlug) {
      return new Response(JSON.stringify({ error: 'Post slug is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Mock comments data (in production, fetch from database)
    const mockComments = [
      {
        id: '1',
        postSlug: postSlug,
        author: 'Ahmad Rizki',
        email: 'ahmad@example.com',
        content: 'Artikel yang sangat informatif! Terima kasih sudah berbagi insights tentang Tailwind CSS v4.',
        timestamp: new Date('2024-01-26T10:30:00Z').toISOString(),
        likes: 12,
        replies: [
          {
            id: '1-1',
            author: 'Tim KonXC',
            email: 'team@konxc.space',
            content: 'Terima kasih Ahmad! Senang artikel ini bermanfaat untuk Anda.',
            timestamp: new Date('2024-01-26T11:00:00Z').toISOString(),
            likes: 3
          }
        ]
      },
      {
        id: '2',
        postSlug: postSlug,
        author: 'Sarah Putri',
        email: 'sarah@example.com',
        content: 'Saya sudah mencoba implementasi path aliases di project Astro saya. Sangat membantu untuk maintainability!',
        timestamp: new Date('2024-01-26T14:15:00Z').toISOString(),
        likes: 8,
        replies: []
      }
    ];

    return new Response(JSON.stringify(mockComments), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error('Comments GET Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch comments' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST({ request }: { request: Request }) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const { postSlug, author, email, content, parentId } = data;
    
    if (!postSlug || !author || !email || !content) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: postSlug, author, email, content' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid email format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Content length validation
    if (content.length > 500) {
      return new Response(JSON.stringify({ 
        error: 'Comment content too long (max 500 characters)' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create new comment object
    const newComment = {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      postSlug,
      author: author.trim(),
      email: email.trim().toLowerCase(),
      content: content.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: [],
      parentId: parentId || null,
      status: 'pending' // For moderation
    };

    // Log comment submission (in production, save to database)
    console.log('New comment submitted:', {
      id: newComment.id,
      postSlug: newComment.postSlug,
      author: newComment.author,
      timestamp: newComment.timestamp,
      hasParent: !!parentId
    });

    // Here you would typically:
    // 1. Save to database
    // 2. Send notification email to moderators
    // 3. Apply spam filters
    // 4. Send confirmation email to commenter

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Comment submitted successfully',
      comment: newComment
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Comments POST Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to submit comment' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Like comment endpoint
export async function PUT({ request }: { request: Request }) {
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

    // Mock like functionality (in production, update database)
    const mockLikes = Math.floor(Math.random() * 50) + 1;
    
    console.log(`Like ${type} ${id}: ${mockLikes} likes`);

    return new Response(JSON.stringify({ 
      success: true, 
      likes: mockLikes
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
