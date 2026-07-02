// ── Nadig Pfau Hausverwaltung – Service Worker ──────────────────────────
// Zweck: macht die PWA für Chrome installierbar (fetch-Handler erforderlich).
// Strategie: "Netzwerk zuerst" – die App bleibt immer aktuell, Cache nur als
// Offline-Fallback für das HTML-Dokument selbst.

const CACHE = 'nadigpfau-v157';

self.addEventListener('install', () => {
  // Sofort aktivieren, nicht auf alten SW warten
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    // Alte Caches aufräumen
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;

  // Nur GET-Requests behandeln; alles andere (POST an APIs etc.) durchreichen
  if (req.method !== 'GET') return;

  // Navigations-Requests (das HTML-Dokument): Netzwerk zuerst, Cache als Fallback
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (err) {
        const cached = await caches.match(req);
        return cached || caches.match('./index.html');
      }
    })());
    return;
  }

  // Übrige GET-Requests: Netzwerk zuerst, bei Fehler Cache
  e.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});
