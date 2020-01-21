const appCacheName = 'demo-v1';
const dynamicAppCache = 'demo-v1-dynamic';

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
    '/img/icons/icon-512x512.png'
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
                    // remove items from cache if passed max size 
                    limitCacheSize(dynamicAppCache, 20);
                    return fetchResponse; // return response to the browser 
                })
            });
            // catch network error and serve fallback page 
        }).catch(() => {
            // send fallback only when request is made to html pages 
            if (evt.request.url.indexOf('.html') > -1) {
                return caches.match('fallback.html')
            }
        })
    );
});

// activate service worker 
self.addEventListener('activate', (evt) => {
    console.log(' [Service Worker] Activated');
});

