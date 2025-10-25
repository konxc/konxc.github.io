// Analytics API endpoint
export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    // Check if request has body
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Content-Type must be application/json' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Try to parse JSON with better error handling
    let data;
    try {
      data = await request.json();
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid JSON format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Log analytics data (in production, you'd save to database)
    console.log('Analytics Event:', {
      timestamp: new Date().toISOString(),
      ...data
    });

    // Here you would typically save to database
    // For now, we'll just return success
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Analytics data received' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Analytics API Error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to process analytics data' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// GET endpoint for analytics dashboard (optional)
export async function GET() {
  try {
    // In production, you'd fetch analytics data from database
    const mockAnalytics = {
      totalPageViews: 1250,
      averageReadingTime: 245, // seconds
      averageScrollDepth: 68, // percentage
      popularPosts: [
        { slug: 'evolusi-tailwind-css-v4', views: 450, completionRate: 78 },
        { slug: 'path-aliases-astro', views: 320, completionRate: 82 }
      ],
      readingMilestones: {
        '25%': 1200,
        '50%': 980,
        '75%': 750,
        'completed': 650
      }
    };

    return new Response(JSON.stringify(mockAnalytics), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error('Analytics GET Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch analytics data' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
