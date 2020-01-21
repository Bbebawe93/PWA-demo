const appCacheName = 'demo-static-v1';
const dynamicAppCache = 'demo-dynamic-v1';

// files and request to cache 
const appShellFiles = [
    '/',
    '/index.html',
    '/js/app.js',
    '/css/main.css',
    '/img/logo.jpg',
    '/img/icons/icon-36x36.png',
    '/img/icons/icon-48x48.png',
    '/img/icons/icon-72x72.png',
    '/img/icons/icon-180x180.png',
    '/img/icons/icon-192x192.png',
    '/img/icons/icon-310x310.png',
    '/img/icons/icon-512x512.png',
    "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/vue",

];

// installing service worker
self.addEventListener('install', evt => {
    console.log(' [Service Worker] Installed');
    evt.waitUntil(
        caches.open(appCacheName).then((cache) => {
            console.log(' [Service Worker] Cashing App Shell Files');
            cache.addAll(appShellFiles);
        })
    );
});

// add fetch event 
self.addEventListener('fetch', (evt) => {
    console.log('[Fetch Event]', evt.request.url);
    evt.respondWith(
        // try to load request from cache, if not send to server 
        caches.match(evt.request).then((cacheResponse) => {
            return cacheResponse || fetch(evt.request).then(fetchResponse => { // dynamic caching 
                return caches.open(dynamicAppCache).then(cache => {
                    // clone the response and store it in the cache 
                    cache.put(evt.request.url, fetchResponse.clone());
                    return fetchResponse; // return response to the browser 
                })
            });
            // catch network error and serve fallback page 
        })
    );
});