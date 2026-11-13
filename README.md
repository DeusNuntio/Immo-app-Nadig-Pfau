# Immobilienverwaltung – App

Progressive Web App für die Verwaltung eigener Mietobjekte. Läuft vollständig im Browser;
die Daten liegen auf dem Gerät und werden über das eigene Cloud-Konto abgeglichen.

## Dateien

| Datei | Zweck |
| --- | --- |
| `index.html` | die gesamte App (HTML, CSS, JavaScript) |
| `sw.js` | Service Worker (Offline-Betrieb, Cache) |
| `manifest.json`, `icon-192.png`, `icon-512.png` | Installation als App |
| `auth.html` | leere Rückkehrseite für die Anmeldung |

## Auslieferung

1. `APP_VERSION` in `index.html` und `CACHE` in `sw.js` immer gemeinsam erhöhen –
   sonst erreicht die neue Fassung die Geräte nicht.
2. Alle Dateien gemeinsam hochladen. Bei langsamer Verbindung kann einmal noch die
   vorige Fassung erscheinen; der zweite Start zählt.

## Datenschutz

Diese Dateien sind öffentlich abrufbar. In den Quelltext und in diese Datei gehören keine
personenbezogenen Daten von Mietern oder Dritten und keine Zugangsdaten. Schlüssel werden
nur auf dem Gerät eingegeben.

Die Beschreibung der Funktionen und die Prüfwerkzeuge liegen nicht in diesem Repository.
