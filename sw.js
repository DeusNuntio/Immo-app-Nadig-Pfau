/* NadigPfau Hausverwaltung – Service Worker
   ─────────────────────────────────────────────────────────────────────────
   CACHE bei JEDER neuen index.html-Version hochzählen (PWA-Invariante).
   Aktuell: v301.
   Mehrdatei-Deploy (5 Dateien im selben GitHub-Pages-Verzeichnis):
     index.html + manifest.json + icon-192.png + icon-512.png + sw.js
   Strategie:
     • install   – App-Shell precachen (tolerant: ein fehlender Eintrag bricht
                    die Installation NICHT ab), sofort aktiv werden.
     • activate  – ausschliesslich VERALTETE Caches loeschen (Whitelist = CACHE).
                    KEIN pauschaler Reset-/unregister-Block (Invariante).
     • fetch     – Navigation: network-first (neue Version kommt schnell),
                    Offline-Fallback auf die gecachte index.html.
                    Gleiche Herkunft (Assets): stale-while-revalidate.
                    Fremde Herkunft (z. B. CDN): unveraendert durchreichen.
   ───────────────────────────────────────────────────────────────────────── */
'use strict';

const CACHE = 'nadigpfau-v323';

const CORE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Tolerant: einzelne fehlende Dateien (z. B. abweichender Icon-Name)
    // duerfen die Installation nicht scheitern lassen.
    await Promise.allSettled(CORE.map(url => cache.add(url)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const namen = await caches.keys();
    await Promise.all(
      namen.filter(n => n !== CACHE).map(n => caches.delete(n))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;

  // Nur GET behandeln; alles andere (POST an Backend etc.) direkt ans Netz.
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Fremde Herkunft (CDN-Skripte, Microsoft Graph, Azure Functions):
  // nicht abfangen, damit CORS/CSP und Auth unveraendert bleiben.
  if (url.origin !== self.location.origin) return;

  // Navigationsanfragen -> network-first, Offline-Fallback index.html.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const netz = await fetch(req);
        // Nur ERFOLGREICHE Antworten cachen: ein 404/500 des Servers darf die
        // funktionierende Offline-Kopie der index.html nicht ueberschreiben.
        if (netz && netz.ok) {
          const cache = await caches.open(CACHE);
          cache.put('./index.html', netz.clone());
        }
        return netz;
      } catch (_) {
        const cache = await caches.open(CACHE);
        return (await cache.match('./index.html')) ||
               (await cache.match('./')) ||
               Response.error();
      }
    })());
    return;
  }

  // Gleiche Herkunft, Assets -> stale-while-revalidate.
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const treffer = await cache.match(req);
    const netzP = fetch(req).then(res => {
      if (res && res.status === 200 && res.type === 'basic') {
        cache.put(req, res.clone());
      }
      return res;
    }).catch(() => null);
    return treffer || (await netzP) || Response.error();
  })());
});
