// ── Nadig Pfau Hausverwaltung – Service Worker ──────────────────────────
// Zweck: macht die PWA für Chrome installierbar (fetch-Handler erforderlich).
// Strategie: "Netzwerk zuerst" – die App bleibt immer aktuell, Cache nur als
// Offline-Fallback für das HTML-Dokument selbst.
//
// Review-Fix 02.07.2026 (B5): Bei Offline-Cache-Miss wird nie mehr undefined
// an respondWith übergeben (führte zu TypeError); stattdessen kontrollierte
// 503/504-Antworten.

const CACHE = 'nadigpfau-v215';

// v195 (B4): Kern-Assets beim Install vorab cachen, damit die App auch nach
// einer Browser-Cache-Raeumung offline startet (bisher nur On-the-fly-Cache).
const PRECACHE = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE);
      // v199-Härtung: einzeln cachen statt addAll – ein fehlendes Asset (404)
      // verwirft sonst atomar den GESAMTEN Precache.
      for (const url of PRECACHE) {
        try { await cache.add(url); } catch (err) { /* einzelnes Asset fehlt: Rest trotzdem cachen */ }
      }
    } catch (err) {
      // Precache-Fehler (z. B. offline beim Update) darf die Installation nicht blockieren
    }
    // Sofort aktivieren, nicht auf alten SW warten
    await self.skipWaiting();
  })());
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
        return cached
          || (await caches.match('./index.html'))
          || new Response('<h1>Offline</h1><p>Keine Verbindung und keine zwischengespeicherte Version vorhanden.</p>',
               { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      }
    })());
    return;
  }

  // Übrige GET-Requests: Netzwerk zuerst, bei Fehler Cache – nie undefined liefern
  e.respondWith(
    fetch(req).catch(async () =>
      (await caches.match(req)) || new Response('', { status: 504, statusText: 'offline' })
    )
  );
});
