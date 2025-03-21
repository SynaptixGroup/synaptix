const CACHE_NAME = 'synaptix-v6';
const urlsToCache = [
    '/',
    '/index.html',
    '/courses.html',
    '/grade.html',
    '/pdf-viewer.html',
    '/quizzes.html',
    '/library.html',
    '/ai-helper.html',
    '/about.html',
    '/styles.css',
    '/script.js',
    '/courses.js',
    '/grade.js',
    '/pdf-viewer.js',
    'quizzes.js',
    '/placeholder.svg',
    '/offline.html'
];

// Install event: Cache files safely
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.all(
                urlsToCache.map((url) => 
                    cache.add(url).catch((error) => console.warn(`Failed to cache ${url}:`, error))
                )
            );
        })
    );
});

// Activate event: Remove old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event: Serve cached files or fetch and cache new ones
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Ignore external requests (like fonts, APIs)
    if (!request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(request).then((response) => {
            return response || fetch(request)
                .then((fetchResponse) => cacheResponse(request, fetchResponse))
                .catch(() => {
                    if (request.mode === 'navigate') {
                        return caches.match('/offline.html'); // Offline fallback
                    }
                });
        })
    );
});

// Cache helper function
async function cacheResponse(request, response) {
    if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
    }
    const responseToCache = response.clone();
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, responseToCache);
    return response;
}
