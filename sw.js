const CACHE = 'the-last-ship-v24';
const ASSETS = ['./', './index.html', './style.css', './game.js', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png', './alien-planet.webp', './wind-ambient.mp3', './wind-gust.mp3'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => { const copy=response.clone(); caches.open(CACHE).then(c=>c.put('./index.html',copy)); return response; }).catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request, {ignoreSearch:true}).then(cached => cached || fetch(event.request).then(response => { if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));} return response; })));
});
