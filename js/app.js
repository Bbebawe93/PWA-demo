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
            "courseName": "Vue Crash Course",
            "location": "Hendon",
            "price": "99",
            "images": [
                "./img/courses/vue1.png"
            ]
        },
        {
            "courseName": "HTML Basics",
            "location": "Ealing",
            "price": "89",
            "images": [
                "./img/courses/vue2.png"
            ]
        },
        {
            "courseName": "Advanced JavaScript",
            "location": "Barnes",
            "price": "119",
            "images": [
                "./img/courses/vue3.png"
            ]
        },
        {
            "courseName": "Learning PHP",
            "location": "Manchester",
            "price": "59",
            "images": [
                "./img/courses/vue4.png"
            ]
        },
        {
            "courseName": "CSS in Practice",
            "location": "Leicester",
            "price": "74.99",
            "images": [
                "./img/courses/vue5.png"
            ]
        }
    ]
    }
});