// register service worker if supported in browser 
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then((regObject) => console.log('[Service Worker] Registered', regObject))
        .catch((error) => console.log('[Service Worker] Not Registered', error))
}

