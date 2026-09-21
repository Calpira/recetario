const CACHE_NAME = 'recetario-v1';

const FILES_TO_CACHE = [
    './',
    './index.html',
    './recetas.html',
    './recetas.json',
    './css/style.css',
    './js/app.js',
    './assets/logo.png',
    './assets/icon-192.png',
    './assets/icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
    caches.open(CACHE_NAME)
        .then(cache => cache.addAll(FILES_TO_CACHE))
    );

    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
    caches.keys().then(keys =>
        Promise.all(
        keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
    )
    );

    self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
    caches.match(event.request)
        .then(cachedResponse => {
        return cachedResponse || fetch(event.request);
        })
  );
});
