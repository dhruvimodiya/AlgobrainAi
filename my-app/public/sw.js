console.log("Service Worker from public");

let cacheData = "appV1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      return cache.addAll([
        "/static/js/bundle.js",
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/index.html",
        "/",
        "/users",
        "/about",
        "/home"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log("🚀 ~ caches.match ~ cachedResponse:", cachedResponse);
        return cachedResponse;
      }
      let requestUrl = event.request.clone();
      console.log("🚀 ~ caches.match ~ requestUrl:", requestUrl)
      return fetch(requestUrl); // Fallback to network if no cache is available
    })
  );
});
