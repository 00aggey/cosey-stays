const CACHE_NAME = 'bnb-site-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/js/main.js',
  '/images/apartment.jpg',
  '/images/villa.jpg',
  '/images/cottage.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request).then(r => {
      return caches.open(CACHE_NAME).then(cache => { cache.put(event.request, r.clone()); return r; });
    }))
  );
});
