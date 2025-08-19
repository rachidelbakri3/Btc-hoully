// Basic cache for offline shell
const CACHE = "updown-pwa-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json"
];

self.addEventListener("install", (e)=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});

self.addEventListener("activate", (e)=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=> k===CACHE?null:caches.delete(k)))));
});

self.addEventListener("fetch", (e)=>{
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
