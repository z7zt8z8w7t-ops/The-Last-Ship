const CACHE='the-last-ship-v25';
const ROOT=self.registration.scope;
const ASSETS=['./','./index.html','./style.css?v=25','./game.js?v=25','./audio.js?v=25','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./alien-planet.webp','./sound-check.html',...['wind-low','crt-startup','crt-transition','popup-snap','ecg-beep','alien-call-1','alien-call-2','alien-call-3','start-screech','marine-male-1','marine-male-2','marine-female-1','marine-female-2','scientist-male','scientist-female'].map(x=>`./audio/${x}.mp3`)];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('the-last-ship-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(ROOT))return;
 const isCode=event.request.mode==='navigate'||/\.(?:html|js|css|webmanifest)$/.test(url.pathname);
 const key=event.request.mode==='navigate'?new Request(new URL('./index.html',ROOT)):event.request;
 if(isCode){event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const response=await fetch(event.request,{cache:'no-cache'});if(response.ok)await cache.put(key,response.clone());return response}catch(e){return await cache.match(key)||Response.error()}})());return}
 event.respondWith((async()=>{const cache=await caches.open(CACHE),cached=await cache.match(event.request);if(cached)return cached;const response=await fetch(event.request);if(response.ok)await cache.put(event.request,response.clone());return response})());
});
