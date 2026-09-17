// Service worker de JAAD Telecom.
// Guarda el "esqueleto" de la app y los tiles del mapa que ya viste, para
// que se puedan volver a abrir sin señal. No sustituye tener el servidor
// conectado: cada quien sigue trabajando con lo que tiene guardado en SU
// propio teléfono hasta que haya sincronización real.

const CACHE_NAME = 'jaad-app-v1';
const APP_SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) { return cache.addAll(APP_SHELL); })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  const url = event.request.url;

  // Tiles del mapa (Esri): cache-first, así quedan disponibles offline
  // una vez que los viste con señal.
  if (url.indexOf('arcgisonline.com') !== -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(event.request).then(function (cached) {
          const red = fetch(event.request).then(function (resp) {
            cache.put(event.request, resp.clone());
            return resp;
          }).catch(function () { return cached; });
          return cached || red;
        });
      })
    );
    return;
  }

  // Todo lo demás (el propio HTML, librerías): red primero, y si no hay
  // señal, lo que haya quedado guardado de la última vez.
  event.respondWith(
    fetch(event.request).then(function (resp) {
      const copia = resp.clone();
      caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copia); });
      return resp;
    }).catch(function () { return caches.match(event.request); })
  );
});
