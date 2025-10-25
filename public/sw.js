// Service Worker for KonXC website
// Provides offline functionality and caching

const CACHE_NAME = 'konxc-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/blog',
  '/css/critical.css',
  '/js/main.js',
  '/favicon.svg',
  '/og-image.jpg'
];

const DYNAMIC_CACHE_NAME = 'konxc-dynamic-v1';

// Install event - cache static resources
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching static resources');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('Service Worker installed');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different types of requests
  if (request.destination === 'document') {
    // Handle page requests
    event.respondWith(handlePageRequest(request));
  } else if (request.destination === 'image') {
    // Handle image requests
    event.respondWith(handleImageRequest(request));
  } else if (request.destination === 'script' || request.destination === 'style') {
    // Handle asset requests
    event.respondWith(handleAssetRequest(request));
  } else {
    // Handle API requests
    event.respondWith(handleApiRequest(request));
  }
});

// Handle page requests
async function handlePageRequest(request) {
  try {
    // Try network first
    const response = await fetch(request);
    
    if (response.ok) {
      // Cache successful responses
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback to offline page
    const offlinePage = await caches.match('/offline.html');
    if (offlinePage) {
      return offlinePage;
    }
    
    // Last resort - return a beautiful offline response
    return new Response(`
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <title>Offline - KonXC</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta charset="UTF-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              background: linear-gradient(135deg, #f5f1e8 0%, #f0ead6 50%, #e8dcc0 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
              color: #5a4a3a;
            }
            
            .offline-container {
              text-align: center;
              max-width: 500px;
              background: rgba(255, 255, 255, 0.7);
              backdrop-filter: blur(10px);
              border-radius: 24px;
              padding: 48px 32px;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            .offline-icon {
              width: 120px;
              height: 120px;
              margin: 0 auto 32px;
              background: linear-gradient(135deg, #d4c4a8, #c4b498);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              animation: float 3s ease-in-out infinite;
            }
            
            .offline-icon::before {
              content: '📡';
              font-size: 48px;
              filter: grayscale(1);
            }
            
            .offline-icon::after {
              content: '❌';
              position: absolute;
              top: 8px;
              right: 8px;
              font-size: 24px;
              background: #ff6b6b;
              border-radius: 50%;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              animation: pulse 2s infinite;
            }
            
            h1 {
              font-size: 2.5rem;
              font-weight: 700;
              margin-bottom: 16px;
              background: linear-gradient(135deg, #8b7355, #6b5b47);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            
            .subtitle {
              font-size: 1.2rem;
              margin-bottom: 8px;
              color: #7a6b5a;
              font-weight: 500;
            }
            
            .description {
              font-size: 1rem;
              line-height: 1.6;
              margin-bottom: 32px;
              color: #6b5b47;
            }
            
            .retry-button {
              background: linear-gradient(135deg, #d4c4a8, #c4b498);
              color: #5a4a3a;
              border: none;
              padding: 16px 32px;
              font-size: 1.1rem;
              font-weight: 600;
              border-radius: 50px;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
              position: relative;
              overflow: hidden;
            }
            
            .retry-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
              background: linear-gradient(135deg, #c4b498, #b4a488);
            }
            
            .retry-button:active {
              transform: translateY(0);
            }
            
            .retry-button::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
              transition: left 0.5s;
            }
            
            .retry-button:hover::before {
              left: 100%;
            }
            
            .tips {
              margin-top: 32px;
              padding: 24px;
              background: rgba(255, 255, 255, 0.5);
              border-radius: 16px;
              border-left: 4px solid #d4c4a8;
            }
            
            .tips h3 {
              font-size: 1.1rem;
              margin-bottom: 12px;
              color: #6b5b47;
            }
            
            .tips ul {
              list-style: none;
              text-align: left;
            }
            
            .tips li {
              margin-bottom: 8px;
              padding-left: 24px;
              position: relative;
              color: #5a4a3a;
            }
            
            .tips li::before {
              content: '💡';
              position: absolute;
              left: 0;
              top: 0;
            }
            
            .connection-status {
              margin-top: 24px;
              padding: 12px 20px;
              background: rgba(255, 107, 107, 0.1);
              border-radius: 12px;
              border: 1px solid rgba(255, 107, 107, 0.2);
              color: #d63031;
              font-size: 0.9rem;
              font-weight: 500;
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.1); opacity: 0.8; }
            }
            
            @media (max-width: 480px) {
              .offline-container {
                padding: 32px 20px;
                margin: 10px;
              }
              
              h1 {
                font-size: 2rem;
              }
              
              .offline-icon {
                width: 100px;
                height: 100px;
              }
              
              .offline-icon::before {
                font-size: 40px;
              }
            }
          </style>
        </head>
        <body>
          <div class="offline-container">
            <div class="offline-icon"></div>
            
            <h1>Oops! Sedang Offline</h1>
            <p class="subtitle">Tidak ada koneksi internet</p>
            <p class="description">
              Sepertinya Anda sedang tidak terhubung ke internet. 
              Jangan khawatir, kami akan membantu Anda kembali online!
            </p>
            
            <button class="retry-button" onclick="window.location.reload()">
              🔄 Coba Lagi
            </button>
            
            <div class="tips">
              <h3>Tips untuk kembali online:</h3>
              <ul>
                <li>Periksa koneksi WiFi atau data seluler Anda</li>
                <li>Pastikan router atau modem berfungsi dengan baik</li>
                <li>Coba refresh halaman setelah koneksi pulih</li>
                <li>Restart perangkat jika diperlukan</li>
              </ul>
            </div>
            
            <div class="connection-status">
              📶 Status: Tidak terhubung ke internet
            </div>
          </div>
          
          <script>
            // Auto-retry when connection is restored
            function checkConnection() {
              if (navigator.onLine) {
                window.location.reload();
              }
            }
            
            // Listen for online event
            window.addEventListener('online', checkConnection);
            
            // Check connection every 5 seconds
            setInterval(checkConnection, 5000);
            
            // Add some interactive feedback
            document.querySelector('.retry-button').addEventListener('click', function() {
              this.innerHTML = '⏳ Memuat...';
              this.disabled = true;
              
              setTimeout(() => {
                this.innerHTML = '🔄 Coba Lagi';
                this.disabled = false;
              }, 2000);
            });
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Handle image requests
async function handleImageRequest(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return placeholder image
    return new Response('', { status: 404 });
  }
}

// Handle asset requests (CSS, JS)
async function handleAssetRequest(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('', { status: 404 });
  }
}

// Handle API requests
async function handleApiRequest(request) {
  try {
    const response = await fetch(request);
    
    // Cache successful GET requests
    if (response.ok && request.method === 'GET') {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // For API requests, try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return error response
    return new Response(JSON.stringify({ 
      error: 'Network error - please try again later' 
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle offline form submissions
  console.log('Performing background sync...');
  
  // This would typically involve:
  // 1. Getting stored form data from IndexedDB
  // 2. Submitting it to the server
  // 3. Clearing the stored data on success
}

// Push notifications (if needed)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      data: data.data
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

console.log('Service Worker loaded');
