const CACHE_NAME = 'qrdly-cache';
const toCache = [
  '/',
];

window.self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME)
    .then((cache) => cache.addAll(toCache))
    .then(window.self.skipWaiting()));
});

window.self.addEventListener('fetch', (event) => {
  console.log(`used to intercept requests so we can check for the file or data in the cache: ${event}`);
});

window.self.addEventListener('activate', (event) => {
  console.log(`this event triggers when the service worker activates: ${event}`);
});
