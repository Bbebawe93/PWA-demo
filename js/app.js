// register service worker if supported in browser 
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then((regObject) => console.log('[Service Worker] Registered', regObject))
        .catch((error) => console.log('[Service Worker] Not Registered', error))
}

var vm = new Vue({
    el: "#app",
    data: {
        courses: [{
            "courseName": "vue crash course",
            "location": "hendon",
            "price": "130",
            "images": [
                "./img/courses/vue1.png",
                "./img/courses/vue2.png",
                "./img/courses/vue3.png",
                "./img/courses/vue4.png",
                "./img/courses/vue5.png"
            ]
        }]
    }
});