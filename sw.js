const CACHE_NAME = 'synaptix-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/courses.js',
    '/courses.html',
    '/library.html',
    '/ai-helper.html',
    '/quizzes.html',
    '/about.html',
    '/lesson.html',
    '/lesson.js',
    '/parents-portal.html',
    '/grade-kg1.html',
    '/grade-kg2.html',
    '/grade-1.html',
    '/grade-2.html',
    '/grade-3.html',
    '/grade-4.html',
    '/grade-5.html',
    '/grade-6.html',
    '/subject-kg1-math.html',
    '/subject-kg1-science.html',
    '/subject-kg1-religious-studies.html',
    // Add all other subject pages here
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    '/presentations/',
    '/placeholder.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then((response) => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    });
            })
    );
});

