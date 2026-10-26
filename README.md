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
| `auth.html` | leere Rückkehrseite für die unsichtbare OneDrive-Erneuerung (seit A463) |

## Auslieferung

1. `APP_VERSION` in `index.html` und `CACHE` in `sw.js` **immer gemeinsam**
   erhöhen – sonst erreicht die neue Fassung die Geräte nicht.
2. Alle Dateien gemeinsam hochladen. Nach einem Upload kann bei langsamer
   Verbindung einmal noch die vorige Fassung erscheinen; der zweite Start zählt.

## Kontenlisten aus Excel (seit A466)

Für die Konten Ruhrtalstr. (RT), Mindener Str. (MIN), Mönchengladbach (MG) und
Krefeld (KR) ist die Excel-Liste des Standorts führend. Eingetragen wird in Excel
(Claude in Excel); die App liest die Datei nur und schreibt nie hinein.

| Einstellung | Ort | Bedeutung |
| --- | --- | --- |
| OneDrive-Ordner | Einstellungen → Fibu → „Kontenlisten aus Excel“ | Ordner mit den Listen. Je Kürzel (RT, MIN, MG, KR im Dateinamen) wird die neueste `.xlsx`/`.xlsm` gelesen. Wird auf alle Geräte übertragen. |
| Zuordnung | dieselbe Karte → „Zuordnung“ | Kennung aus Spalte B (z. B. „Miete/NK WE 3“) → Wohnung. Wird auf alle Geräte übertragen. |

Gelesen wird nur das Hauptblatt (`Konto`, `Konto Gesamt`, `konto`) bis zur Zeile
„Für Claude: …“. Passt die Kopfzeile nicht zum hinterlegten Aufbau oder fehlen
Formelergebnisse, wird nichts übernommen. Der gelesene Stand liegt nur auf dem
jeweiligen Gerät (Speicher `excel_cache`). Für diese Konten sind CSV-Import und
Prüfliste abgeschaltet; früher importierte Buchungen bleiben lesbar.

**Breaking Change A466:** Datenbankversion 38 → 39 (neuer Speicher `excel_cache`).
Die Umstellung läuft beim ersten Start automatisch; ältere App-Fassungen in
anderen geöffneten Tabs bitte schließen.

## Übergabeprotokoll (seit A468)

| Regel | Bedeutung |
| --- | --- |
| Zustandswerte | Je Prüfpunkt: Nicht geprüft, Einwandfrei, Leichte Gebrauchsspuren, Renovierungsbedarf, Beschädigt, Nicht vorhanden, Entfällt. Neue Protokolle starten mit „Nicht geprüft“. Protokolle von vor A468 (ohne Feld `zustandsmodell`) zeigen und drucken leere Werte weiter als „Einwandfrei“. |
| Pflichtprüfung | Vor dem Abschluss: Mieter, Datum, Unterschriften, bei Ein-/Auszug Zählerstand und Schlüsselanzahl, keine ungeprüften Punkte. Fehlt etwas, geht der Abschluss nur mit Begründung; sie wird gedruckt. |
| Korrektur | Abgeschlossene Protokolle ändert nur der Verwalter. Gespeichert wird erst bei „Korrektur übernehmen“; jede Änderung steht rot im Druck. „Korrektur verwerfen“ lässt das Archiv unverändert. |
| Löschen | Verwalter wie bisher. Hausmeister: eigene Entwürfe ohne Mieterunterschrift, selbst angelegte Einträge (seit A469 in allen Bereichen: Aufgaben, Termine, Mängel, Reparaturen, Wartung, Lager, Einkauf, Branchenbuch, Zähler, Ventile, Anforderungen, Tätigkeiten). Endgültig löschen nur der Verwalter. Eigentümer nur in den eigenen Objekten (A469). |

## Datensicherung (seit A468)

„Backup exportieren“ fragt nach einem Kennwort (mindestens 10 Zeichen) und schreibt
die Datei verschlüsselt (AES-GCM 256, Schlüssel über PBKDF2 mit 310 000 Runden).
Das Kennwort wird nirgends gespeichert – ohne Kennwort ist die Datei nicht
wiederherstellbar. Unverschlüsselt nur nach ausdrücklicher Bestätigung (z. B. für
Auswertungen). Beim Einlesen werden verschlüsselte und ältere unverschlüsselte
Sicherungen erkannt.

**Breaking Change A468:** Sicherungen aus A468 heißen `immo_backup_<Datum>_verschluesselt.json`
und lassen sich nur mit A468 oder neuer einlesen.

## Abgleich und Hausmeister-Datei (seit A469)

| Regel | Bedeutung |
| --- | --- |
| Änderungsstempel | Jede echte Änderung eines Datensatzes bekommt einen neuen `updatedAt`, in allen Bereichen mit Zusammenführung (bis A468 nur Mieter, Benutzer, TG). Unverändertes Neuschreiben behält den Stempel. Abgleich, Import und Wiederherstellung schreiben weiter mit `keepStamp`. |
| Neuer Stand | Der Abgleich lädt herunter, wenn sich der Stempel der Datei geändert hat, unabhängig von der Uhr des Geräts. |
| Löschmarken | Laufen nur über `backup.tombstones` (geräteeigene Einstellung). Vergleich über Zeitwerte, auch mit deutschem `geaendert`. Marken aus der Zukunft werden gekappt bzw. aus der Hausmeister-Datei abgewiesen. Das Buchungsjournal wird nie über Marken gelöscht. |
| Konflikte | Ändern zwei Geräte denselben Datensatz, gilt weiter der jüngere Stand. Was dabei überschrieben wurde, steht im Sync-Protokoll. |
| Mängelnummern | Doppelte Nummern nach dem Abgleich: Der älteste Mangel behält sie, die anderen bekommen eine neue (alte Nummer im Feld `nummerAlt`). |
| Kennungen | Kennungen mit `" ' < > & \` `` ` `` oder Steuerzeichen werden beim Abgleich, aus der Hausmeister-Datei und aus Sicherungen nicht übernommen. |
| Hausmeister-Datei | Enthält nur Objekte, die mindestens ein Hausmeister sehen darf, die Dateiliste nur ihrer Standorte und Zeiten/Urlaube nur von Hausmeistern. Alle Hausmeister teilen eine Datei. Kennt das Verwalter-Gerät keinen Hausmeister, bleibt die Datei wie bisher. |
| Rückweg | Aus der Hausmeister-Datei übernimmt das Verwalter-Gerät nur, was ein Hausmeister selbst ändern oder löschen darf. Abgeschlossene Protokolle, fremde Zeiten und Urlaubsfreigaben bleiben unverändert. Abgewiesenes steht im Sync-Protokoll. |

**Breaking Change A469:** Hausmeister-Geräte entfernen nach dem ersten Abgleich lokal, was nicht mehr in der
Hausmeister-Datei steht und keinem Hausmeister zusteht (ohne Löschmarke, auf den Verwalter-Geräten bleibt alles).
Funktionen zum Löschen, Freigeben und Ändern von Benutzern prüfen die Rolle jetzt selbst. Die Datenbankversion
bleibt 39.

## Lager (seit A470)

| Regel | Bedeutung |
| --- | --- |
| Kiste | Ein Lagerort der App mit Nummer je Standort (`DUS-L-0001`, `KR-L-0003` …), angelegt unter Lager → Lagerorte. Ein Artikel kann in mehreren Kisten liegen. |
| Felder | Bezeichnung, Hersteller, Herstellernummer, Barcode/EAN, Kategorie (8 feste), Unterkategorie, Verwendungszweck, Bestand mit Einheit (Stück, Packung, Meter, Rolle, Liter, Kilogramm, Satz, Paar), Neupreis je Einheit mit Quelle und Stand. |
| Suche | Über alle Felder und die Kisten (Nummer, Bezeichnung, Pfad). Jedes Wort muss vorkommen. Nummern werden auch ohne Punkte, Striche und Leerzeichen gefunden, Umlaute auch als ae/oe/ue. |
| Claude | Über den Connector (Backend B14): Kisten anzeigen, Artikel suchen, anlegen, ändern. Die App übernimmt Einträge beim Öffnen (`/api/eingang?…&lager=1`). Sie prüft dabei erneut: Die Kiste muss vorhanden sein, die Menge größer als 0, und dieselbe Herstellernummer/EAN darf nicht schon in der Kiste liegen. Der Spiegel für Claude enthält Kisten und Lagerartikel, aber keine Fotos, Kaufpreise oder Verantwortlichen. |
| Rechte | Sehen und ändern wie bisher. Löschen von Artikeln und Lagerorten nur, was man selbst angelegt hat (Regel R74), Verwalter alles. |

## Datenschutz

Diese Dateien sind **öffentlich abrufbar**. In den Quelltext gehören keine
personenbezogenen Daten – keine Namen, Anschriften, Rufnummern, Beträge zu
Personen, auch nicht in Kommentaren oder als Beispiel. Schlüssel und Zugangsdaten
werden nur auf dem Gerät eingegeben und nie gespeichert oder abgeglichen.

## Prüfung

Änderungen entstehen als Patchskript (`patch_AXXX.py`) mit Rauchtest
(`smoke_AXXX.py`, Gegenprobe gegen die Vorversion). Die Prüfwerkzeuge und alle
Rauchtests liegen in der Projektablage, nicht in diesem Repository.
