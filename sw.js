const appCacheName = 'demo-v1';
// files and request to cache 
const appShellFiles = [
    // '/',
    // '/index.html',
    //  '/js/app.js',
    //     '/css/style.css',
    //     '/img/logo.jpg',
    //     '/img/icons/icon-36x36.png',
    //     '/img/icons/icon-48x48.png',
    //     '/img/icons/icon-72x72.png',
    //     '/img/icons/icon-180x180.png',
    //     '/img/icons/icon-192x192.png',
    //     '/img/icons/icon-310x310.png',
    //     '/img/icons/icon-512x512.png'
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

// activate service worker 
self.addEventListener('activate', (evt) => {
    console.log(' [Service Worker] Activated');
});


// add fetch event 
self.addEventListener('fetch', (evt) => {
    console.log('[Fetch Event]', evt.request);
    evt.respondWith(
        // try to load request from cache, if not send to server 
        caches.match(evt.request).then((cacheResponse) => {
            return cacheResponse || fetch(evt.request);
        })
    );
});

// list of files to be cashed