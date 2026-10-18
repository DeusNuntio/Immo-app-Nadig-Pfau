# Nadig Pfau Immobilienverwaltung – App

Progressive Web App für die Verwaltung der eigenen Objekte (Mieter, Aufgaben,
Termine, Protokolle, Abrechnungen, Zeiterfassung). Läuft vollständig im Browser;
Daten liegen in der IndexedDB des Geräts und werden über OneDrive abgeglichen.

## Dateien

| Datei | Zweck |
| --- | --- |
| `index.html` | die gesamte App (HTML, CSS, JavaScript) |
| `sw.js` | Service Worker (Offline-Betrieb, Cache) |
| `manifest.json`, `icon-192.png`, `icon-512.png` | Installation als App |

## Auslieferung

1. `APP_VERSION` in `index.html` und `CACHE` in `sw.js` **immer gemeinsam**
   erhöhen – sonst erreicht die neue Fassung die Geräte nicht.
2. Beide Dateien gemeinsam hochladen. Nach einem Upload kann bei langsamer
   Verbindung einmal noch die vorige Fassung erscheinen; der zweite Start zählt.

## Datenschutz

Diese Dateien sind **öffentlich abrufbar**. In den Quelltext gehören keine
personenbezogenen Daten – keine Namen, Anschriften, Rufnummern, Beträge zu
Personen, auch nicht in Kommentaren oder als Beispiel. Schlüssel und Zugangsdaten
werden nur auf dem Gerät eingegeben und nie gespeichert oder abgeglichen.

## Prüfung

Änderungen entstehen als Patchskript (`patch_AXXX.py`) mit Rauchtest
(`smoke_AXXX.py`, Gegenprobe gegen die Vorversion). Die Prüfwerkzeuge und alle
Rauchtests liegen in der Projektablage, nicht in diesem Repository.
