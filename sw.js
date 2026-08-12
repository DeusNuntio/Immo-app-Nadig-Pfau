/* NadigPfau Hausverwaltung – Service Worker
   ─────────────────────────────────────────────────────────────────────────
   CACHE bei JEDER neuen index.html-Version hochzählen (PWA-Invariante).
   Massgeblich ist ausschliesslich die Konstante CACHE weiter unten – hier
   steht bewusst keine Versionsnummer mehr, sie lief zuletzt vier Versionen
   hinterher (stand auf v301, waehrend CACHE bereits v327 war).
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

const CACHE = 'nadigpfau-v353';

/* v329 (R32): Wie lange die Navigation auf das Netz wartet, bevor die
   gecachte Fassung ausgeliefert wird. Siehe Kommentar am fetch-Handler. */
const NAV_WARTEZEIT_MS = 3000;

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

  /* Navigationsanfragen -> Netz bevorzugt, aber MIT Wartegrenze.
     Bis v328 stand hier ein unbegrenztes network-first. Bei Netzausfall griff
     der Fallback sofort, bei ZAEHEM Netz (ein Balken im Keller) aber gar nicht:
     der Start wartete auf den vollstaendigen Download der 857 kB. Jetzt laeuft
     ein Rennen - meldet sich das Netz nicht binnen NAV_WARTEZEIT_MS, startet die
     App aus dem Cache. Der Download laeuft im Hintergrund weiter und legt die
     neue Fassung ab (waitUntil), sie greift dann beim naechsten Start.

     FOLGE FUER DIE AUSLIEFERUNG: Ist die Verbindung langsam, kann direkt nach
     einem Deploy noch die vorige Version erscheinen. Einmal neu starten. Beim
     Pruefen einer frisch ausgelieferten Version also erst den zweiten Start
     bewerten - zusammen mit dem bekannten CDN-Nachlauf von GitHub Pages.

     Ohne gecachte Fassung (Erstinstallation) wird unveraendert gewartet. */
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const netzP = fetch(req).then(res => {
        // Nur ERFOLGREICHE Antworten cachen: ein 404/500 des Servers darf die
        // funktionierende Offline-Kopie der index.html nicht ueberschreiben.
        if (res && res.ok) cache.put('./index.html', res.clone());
        return res;
      });
      event.waitUntil(netzP.catch(() => null));   // Nachlauf ueberlebt die Antwort

      const gecacht = (await cache.match('./index.html')) || (await cache.match('./'));
      if (!gecacht) {
        try { return await netzP; } catch (_) { return Response.error(); }
      }
      const warten = new Promise(r => setTimeout(() => r(null), NAV_WARTEZEIT_MS));
      const zuerst = await Promise.race([netzP.catch(() => null), warten]);
      return zuerst || gecacht;
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
