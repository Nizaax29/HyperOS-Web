const CACHE_NAME = 'hyperos-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  'https://unpkg.com/lucide@latest',
  'https://raw.githubusercontent.com/Nizaax29/iko/refs/heads/main/Xiaomi_HyperOS_%2528December_2023%2529.webp',
  'https://raw.githubusercontent.com/Nizaax29/iko/refs/heads/main/system_dialer.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
