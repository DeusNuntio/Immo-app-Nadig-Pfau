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

## E-Mail an Mieter (seit A471)

Der E-Mail-Knopf bei den Bewohnern, die Adresse im Feld „E-Mail“ der Mieterakte und die Adresse des Zusatzkontakts
öffnen den Reiter Posteingang → „Mieter-Mail“. Versendet wird über `info@nadigpfau.de`.

- Bewohner und Akte: Der Mieter ist vorgewählt, die Adresse ist die der angetippten Person, die Anrede kommt aus dem
  Mietvertrag.
- Zusatzkontakt: Die Adresse ist übernommen, aber kein Mieter vorgewählt. Die Anrede bleibt offen.

Mieter, bei denen nur ein Bewohner eine Adresse hat, stehen ebenfalls in der Empfängerliste. Der Hausmeister hat
keinen Posteingang; bei ihm öffnet der Knopf weiter das Mailprogramm des Geräts (`mailto:`).

## Bewerber, Besichtigungen und Archiv (seit A472)

| Bereich | Verhalten |
| --- | --- |
| Archiv des Mieters | Zeigt zusätzlich gesendete E-Mails (auch aus der Bewerbungszeit), Kautionsquittungen/-abrechnungen, den Aushang der Wohnung und die Bewerbung, aus der der Mieter kam. Keine Kopien – angezeigt wird, was in `tenant_mails`, `kautionsquittungen`, `dokumente` und `interessenten` liegt. |
| Verlauf einer Person | Über die E-Mail-Adresse und die Verknüpfungen Selbstauskunft (`quelleId`) → Interessent (`mieterId`) → Mieter. Mails tragen `interessentId`/`saId`. Unterlagen eines Interessenten (`dokumente.interessentId`) wandern bei der Übernahme in die Mieterakte und werden beim Löschen des Interessenten mitgelöscht. |
| Besichtigung | Haken „Besichtigung vereinbart“ (Selbstauskunft) bzw. Knopf beim Interessenten: Termin `typ:'besichtigung'` mit `quelle`/`quelleId` im Kalender. |
| Besichtigungstext | Nennt den jetzigen Mieter nur mit Einwilligung (`mieter.besichtigungKontakt.ok`, Haken in der Karte „Neuvermietung“) und den Hausmeister nur mit `users.telBesichtigung`. |
| Textvorlagen | `settings` `mail_vorlagen` (synchronisiert); Platzhalter {name}, {wohnung}, {objekt}, {we}, {termin}. |
| Posteingang | Drucken, Selbstauskunft-Link, Mail/Anhang in die Akte, ToDo/Termin/Mangel/Wiedervorlage aus der Nachricht; Absage an übrige Bewerber einer Wohnung (je Person eine eigene Mail). |
| Dashboard | Versionsnummer unten. |

## Versorger: Preise mit Verlauf und Lieferstelle (seit A473)

Jeder Versorgervertrag hat eine Lieferstelle: Wohnung (WE), Zählernummer, Marktlokation (MaLo, Prüfziffer wird geprüft)
und Messlokation (MeLo). Arbeits-, Grundpreis, Abschlag und Verbrauch stehen in einem Verlauf mit „gültig ab“ und Quelle.
Angekündigte Preise zählen erst ab ihrem Datum. Über den Claude-Connector (B18) lassen sich Preise aus Belegen vormerken;
die App prüft und übernimmt sie beim Öffnen.

## Bewerber und Formular-Mails (seit A474)

Mails von der eigenen Adresse (z. B. „Neue Vormerkung“ der Website) nimmt die App für Antwort, Selbstauskunft-Link,
To-do/Termin und Akte mit Name und E-Mail aus dem Text. „Anzeigen“ klappt wieder zu. Neuer Knopf „Hat abgesagt“
an Selbstauskünften und Interessenten (ohne Absage-Mail).

## Dateien aus dem Claude-Connector (seit A475)

Mit Backend B19 kann Claude aus dem GMX-Postfach eine Mail als PDF, ihre Anhänge oder die Fotos für einen Mangel in die
App legen. Die App holt sie beim Öffnen (`/api/eingang-datei`, Host-Schlüssel) und legt sie ab:
- Ablage: Akte des Mieters mit der Absenderadresse im genannten Objekt, sonst jetziger Mieter der genannten WE, sonst
  Interessent mit der Adresse, sonst Objektdokumente.
- Mangel: Fotos verkleinert (2000 px) nach OneDrive.
Dateien über 2 MB gehen nie in die Sync-Datei; ohne OneDrive bleibt der Eintrag im Eingangsfach und wird später erneut
versucht. Das Backend löscht seine verschlüsselte Kopie, sobald die App sie abgeholt hat.
Arbeitspreise unter der Plausibilitätsgrenze (Strom 10 ct, Gas/Fernwärme 3 ct, Wasser 50 ct je m³) fragt die App beim
Speichern nach („€ statt ct?“) und markiert sie an der Vertragskarte.

## Anrede in Bewerber-Texten (seit A476)

Fehlt die Anrede (die Website-Selbstauskunft fragt sie nicht ab), leitet die App sie aus einem eindeutigen Vornamen ab:
„Sehr geehrte Frau Muster,“ bzw. „Sehr geehrter Herr Muster,“ – ohne Vornamen (seit A477; A476: „Guten Tag Frau …“).
Bei mehrdeutigen oder unbekannten Vornamen (z. B. Kim, Andrea) bleibt es bei „Guten Tag Vorname Nachname,“. Eine angegebene
Anrede hat Vorrang. Gilt für Besichtigungstext (E-Mail, WhatsApp), Textvorlagen, Absagen und Antworten auf
Website-Nachrichten.

## Absage an eine Selbstauskunft (seit A478)

An jeder Selbstauskunft mit E-Mail-Adresse gibt es den Knopf „Absage“. Er öffnet die Vorlage „Absage an Bewerber“
(änderbar unter Posteingang → Mieter-Mail → Vorlagen) mit Anrede und Wohnung; der Text lässt sich vor dem Senden ändern.
Gesendet wird über die eigene Adresse wie jede Mieter-Mail, mit Signatur und Eintrag im Mailverlauf. Mit dem Haken
„Danach als abgelehnt ablegen“ (Standard) kommt die Selbstauskunft wie bei „Ablehnen“ in die Ablage „Abgelehnte
Bewerbungen“ (mit Vermerk „Absage per E-Mail“); ein daraus übernommener Interessent erhält den Status „Abgesagt“.

## Rechnungen aus GMX über Claude (seit A479)

Mit Backend B21 übernimmt Claude eine Rechnung aus dem GMX-Postfach in die Rechnungserfassung (`gmx_rechnung_erfassen`):
Claude liest den Beleg, zeigt Lieferant, Rechnungsnummer, Datum, Bruttobetrag, Fälligkeit, Objekt und Zuordnung als
Tabelle und merkt die Rechnung erst nach „ja“ vor. Die App legt sie beim Öffnen an (Abholung mit `&rechnung=1`):
- offen (nicht bezahlt), Beleg (PDF, Foto oder XRechnung bis 10 MB) direkt am Datensatz wie beim Datei-Upload;
- Kostenart (bei NK-Umlage) und Mieter (bei direkter Zuordnung, jetziger Mieter der WE) werden zugeordnet, wenn sie
  eindeutig sind – sonst bleiben sie leer und die Notiz sagt „Bitte prüfen: …“;
- gleiche Rechnungsnummer beim selben Lieferanten → nicht übernommen, Ergebnis an Claude; unbekanntes Objekt ebenso;
- eine in der App gelöschte übernommene Rechnung kommt nicht wieder.
Das Backend löscht seine verschlüsselte Kopie des Belegs nach der Abholung; nicht abgeholte verfallen nach 14 Tagen.

## Offene Rechnungen: Fälligkeit und „bezahlt“ über Claude (seit A482)

| Bereich | Verhalten |
| --- | --- |
| Fälligkeit | Offene Rechnungen mit Fälligkeitsdatum zeigen „überfällig seit N Tagen“ (rot) bzw. „heute fällig“ / „fällig in N Tagen“ (gelb, Vorlauf 7 Tage, `RECHN_FAELLIG_VORLAUF_TAGE`). Bezahlte Rechnungen und solche ohne Fälligkeit bekommen keinen Hinweis. |
| Rechnungsseite | Neuer Filter „Fällig/überfällig“; die Summenkarte nennt zusätzlich „N überfällig · Summe“. |
| Dashboard | Karte „Rechnungen … überfällig / bald fällig“ mit Summe und bis zu fünf Einträgen (überfälligste zuerst); „Alle“ öffnet die Rechnungsseite mit dem Filter. Nur für Verwalter, Sichtbarkeit wie auf der Rechnungsseite. |
| Bezahlt | „Als bezahlt markieren“ speichert zusätzlich das Datum (`bezahltAm`); „als offen markieren“ entfernt es. |
| Claude | Mit Backend B24: `rechnungen_anzeigen` (offene Rechnungen, Filter fällig/überfällig/alle) und `rechnung_bezahlt` (nur nach Bestätigung). Die App führt „bezahlt“ beim Öffnen aus (Abholung mit `&bezahlt=1`): setzt bezahlt und `bezahltAm` (Datum aus dem Auftrag, sonst heute) und ergänzt die Notiz „bezahlt gemeldet über Claude“. Gelöschte oder unbekannte Rechnungen werden nicht angefasst, bereits bezahlte bleiben unverändert. |
| Spiegel | Enthält offene Rechnungen ohne private Objekte, ohne Mieternamen und ohne Beleg; Beträge nur im Modus „mit Beträgen“. |

Zeitangaben (`erstellt`, `geaendert`, `erledigtAm` …) liegen je nach Alter als deutscher Text oder ISO-Zeit vor. Gelesen
und sortiert werden sie seit A481/A482 nur über `zeitWert()` bzw. `zeitDatum()`; `new Date()` auf diese Felder ist
verboten (deutsche Texte würden am 1.–12. als Monat gelesen). Die statische Prüfung der Regression prüft das.

## Kontaktdaten nur in den Einstellungen (seit A483)

Der Quelltext liegt öffentlich auf GitHub Pages. Deshalb stehen dort seit A483 **keine Telefonnummern und kein
Hausmeister-Kontakt** mehr. Gepflegt werden sie unter **Einstellungen → Briefköpfe** (gespeichert in
`settings['briefkopf_<gruppe>']`, über OneDrive synchronisiert – einmal eintragen genügt):

| Feld | Wo | Verwendung |
| --- | --- | --- |
| Telefon | Briefköpfe Düsseldorf/Monheim, Krefeld, Amboßstr. (wie schon Mönchengladbach) | Briefe, E-Mail-Signatur |
| Hausmeister: Name, Anschrift, Telefon | nur Briefkopf Krefeld | Eigentümerwechsel-Schreiben Krefeld („Ihre Ansprechpartner“) |

Fehlt das Telefon, weist die App einmal je Gerät darauf hin und das Formular zeigt einen Hinweis; fehlt der Hausmeister,
entfällt die Zeile im Schreiben (mit Hinweis). Das Briefkopf-Formular bearbeitet immer den eigenen Briefkopf der Gruppe,
auch wenn für Dokumente eine Umleitung (z. B. Krefeld → Roland B. Nadig) aktiv ist.

**Nebenkostenabrechnung:** Vorgeschlagen wird der zuletzt vollständig abgelaufene Abrechnungszeitraum des Objekts
(z. B. Ruhrtalstr. 41 im November 2026: 01.11.2025–31.10.2026); das Jahr bleibt wählbar.

## Abgleich absichern (seit A484)

| Regel | Bedeutung |
| --- | --- |
| Hochladen nur nach Zusammenführen | Scheitert das Zusammenführen (z. B. Speicher voll), lädt das Gerät nicht hoch; die Meldung steht im Sync-Status. Eine unlesbare Datei auf OneDrive wird nur über „Reparieren“ (mit Bestätigung) überschrieben. |
| Versionsprüfung | Hochgeladen wird mit `If-Match` (eTag der gelesenen Datei). Hat ein anderes Gerät dazwischen hochgeladen, liest die App neu, führt zusammen und versucht es erneut (höchstens 3 Runden). |
| „Keine Änderungen“ | gilt nur, wenn die Datei auf OneDrive schon genau den Stand des Geräts hat. Eine ältere Datei (z. B. zurückkopierte Wochensicherung) wird wieder überschrieben. Ist die Datei seit dem letzten Abgleich unverändert (gleicher eTag), lädt das Gerät sie nicht erneut herunter. |
| Geräteuhr | Beim Hochladen misst die App die Abweichung zur OneDrive-Serverzeit (localStorage `a484Uhr`). Ab 2 Minuten stempelt sie Änderungen mit der korrigierten Zeit, ab 5 Minuten erscheint ein Hinweis. Stempel mehr als 24 h in der Zukunft werden beim Abgleich gekappt. |
| Import „Ersetzen“ | behält die Zeitstempel der Sicherung (bis A483 bekamen Mieter, Benutzer und TG neue Stempel). Neuere Änderungen anderer Geräte kommen beim nächsten Abgleich dazu. |
| Import „Wiederherstellen“ | fragt vorher mit der Zahl der Datensätze dieses Geräts, die neuer sind als die Sicherung. |

**Breaking Change A484:** „Ersetzen“ setzt einen Stand nicht mehr auf anderen Geräten durch – dafür ist
„Wiederherstellen“ da. Der Hausmeister-Abgleich (`immo_daten_hm.json`) ist unverändert.

## Interessenten ohne Haus, Mietvertrag an der Wohnung (seit A486)

- **Ohne Haus:** Erkennt „Als Interessent“ das Haus aus der Selbstauskunft nicht, fragt die App nach Haus und (optional)
  Wohnung. Wer bewusst ohne Haus übernommen wird – oder vor A486 so gespeichert wurde –, steht in **jedem** Haus unter
  „Interessenten → Noch keinem Haus zugeordnet“, mit „… zuordnen“.
- **Mietvertrag an der Wohnung:** Die Neuvermietungs-Karte einer leeren oder gekündigten Wohnung hat „Mietvertrag
  erstellen“: Auswahl aus den offenen Interessenten dieser Wohnung, dieses Hauses und ohne Haus (oder leeres Formular).
  Ein Interessent ohne Haus wird dabei dieser Wohnung zugeordnet.
- **Übernommene Selbstauskünfte:** Posteingang → Selbstauskünfte, Block unten (wie die abgelehnten Bewerbungen): Suche,
  Ansehen, Sprung zum Interessenten. Auskünfte ohne Interessent lassen sich dort löschen (Art. 17 DSGVO).

## Rechnungsfelder, Meldungen, nicht zugeordnete Daten (seit A487)

- **Rechnung erfassen:** Guthaben und Erstattungsdatum, CO₂-Kosten und -Menge, MwSt.-Betrag, Lohnanteil, Leistungszeitraum,
  Verbrauch mit Einheit und Zählernummer werden gespeichert. Beim Bearbeiten bleiben alle Angaben erhalten, die das Formular
  nicht zeigt (Herkunft aus Claude, Beleg-Verweise). Bis A486 gingen diese Felder beim Speichern verloren.
- **Meldungen** am unteren Rand brechen um und bleiben je nach Länge bis zu 9 Sekunden stehen.
- **Banner „fällige Aufgaben“** schiebt den Seiteninhalt nach unten, statt die oberste Bedienzeile zu verdecken.
- **Interessenten ohne Haus:** Abgesagte und übernommene stehen eingeklappt unter den offenen. Die Suche findet Interessenten
  ohne Haus und öffnet sie direkt.
- **Posteingang → Selbstauskünfte:** Abgelehnte Bewerbungen und übernommene Selbstauskünfte erscheinen auch ohne Verbindung
  zum Server.
- **Mietvertrag aus Interessent:** Der Mietbeginn wird aus der Selbstauskunft vorbelegt; der Interessent verweist danach auf
  den angelegten Mieter (`mieterId`).
- **Einstellungen → Kontrolle → „Nicht zugeordnete Daten“** (nur Verwalter): Datensätze ohne Haus, mit unbekanntem Haus oder
  mit gelöschtem Mieter bzw. Interessenten. Die Ansicht löscht nichts von selbst; Löschen je Eintrag nach Rückfrage.
  Mögliche Aufbewahrungspflichten vorher prüfen.

## Mieterhöhung mit Vormerkung, Rechte der Eigentümer, Rückfragen bei der NKA (seit A488/A489)

- **⚠ Geändertes Verhalten – Mieterhöhung:** „Speichern & Schreiben drucken“ stellt die Miete nicht mehr sofort um. Die
  Erhöhung wird **vorgemerkt** und steht als gelber Hinweis in der Mieterakte.
  - § 558 BGB (Vergleichsmiete): Die neue Miete gilt erst, wenn in der Mieterakte **„Zustimmung erhalten“** bestätigt wurde,
    und frühestens ab dem Stichtag (§ 558b Abs. 1 BGB).
  - Andere Rechtsgrundlagen (§ 559, Staffel, Index, einvernehmlich): Die neue Miete gilt ab dem Stichtag; liegt er heute
    oder in der Vergangenheit, sofort.
  - Fällige Vormerkungen stellt die App beim Öffnen des Dashboards um und schreibt sie in die Miethistorie.
  - „Verwerfen“ entfernt die Vormerkung; das Schreiben bleibt im Archiv.
- **⚠ Geändertes Verhalten – Rückstände:** Für Monate vor einer Mieterhöhung rechnet der Zahlungsabgleich mit der damaligen
  Miete (aus der Miethistorie). Bisher galt die heutige Miete für alle Monate; Rückstände können dadurch **niedriger** ausfallen.
- **Eigentümer** sehen im Archiv „Übernommene Selbstauskünfte“ Auskünfte zu ihren Häusern und solche ohne Haus, keine
  fremder Häuser. Interessenten **ohne Haus** sehen alle Verwalter und Eigentümer (A489). „Nicht zugeordnete Daten“ ist nur
  für Admins.
- **Nebenkostenabrechnung:** Rückfrage, wenn keine Kosten eingetragen sind. Die **Deckungsprüfung** (Flächen der Mieter gegen
  die Wohnfläche des Hauses) und die **Prüfhinweise** zu den Stammdaten der Mieter (A489) fragen vor dem Druck nach und
  stehen nicht mehr als Kasten im Brief an den Mieter.
- Anrede und Objektname in Druckvorlagen (Einzelabrechnung, Mieterhöhung, Stellplatz-Schreiben) werden maskiert.

## Rückfragen und Prüfungen bei der Eingabe, Suche (seit A490)

- **Mietvertrag-Generator:** Rückfrage, wenn keine Kaltmiete eingetragen ist oder für das Haus keine Bankverbindung
  hinterlegt ist (Objekt → Gebäudedaten). Der Hinweis auf die fehlende Bankverbindung steht nicht mehr im Vertrag.
- **Mieter bearbeiten:** Ein Auszugsdatum vor dem Einzug wird abgelehnt.
- **Zählerstand:** Ein Ablesedatum in der Zukunft wird abgelehnt.
- **Suche:** findet auch Zähler (öffnet das Objekt, dort Reiter „Zähler“) und Lagerartikel.
- **Mieterakte:** öffnet nur für Benutzer mit Recht am Objekt.
- **Brief:** Der Ort vor dem Datum kommt aus dem Briefkopf (ohne Postleitzahl); ohne Angabe bleibt „Hilden“.
- **Kautionsabrechnung:** persönliche Anrede aus den Mieterdaten.
- Weitere Druckvorlagen maskieren Namen und Freitexte: Wohnungsgeberbescheinigung, Zahlungserinnerung,
  Begründung der Mieterhöhung, Aushang.

## Zahlungserinnerung und Kautionsabrechnung mit Briefkopf (seit A491)

- Zahlungserinnerung/Mahnung und Kautionsabrechnung tragen den Briefkopf mit Logo, Rücksendezeile und **Anschriftfeld für
  den Fensterumschlag**, wie Brief und Mieterhöhung.
- Im Anschriftfeld stehen die Vertragspartner und die Wohnung. Ist am Mieter eine **neue Adresse** hinterlegt (nach
  Auszug), wird diese verwendet.
- Die Anrede richtet sich nur an die Vertragspartner.
- Die Kautionsquittung bleibt eine Quittung ohne Anschriftfeld.

## Wohnung auf der Website als „Reserviert“ markieren (seit A492)

- Unter **Einstellungen → Daten → Website – freie Wohnungen → Übersicht öffnen** hat jede Wohnung den Schalter **„Als reserviert markieren“**
  bzw. **„Reservierung aufheben“** (mit Rückfrage). Reservierte Wohnungen zeigen in der Liste „online · reserviert“.
- Die App sendet `status: 'reserviert'` an `/api/leerstand`. Das Backend reicht das Feld unverändert weiter,
  **keine Backend-Änderung nötig** (B25 bleibt).
- Ab **Website W10** steht dann „Reserviert“ an der Wohnung. Die Wohnung bleibt sichtbar; Bewerbungen sind weiter
  möglich und kommen als **Nachrücker** an (Wohnungsangabe endet auf „– Nachrücker“).
- Ein erneuter Aushang mit Homepage-Häkchen behält die Reservierung bei, statt sie auf „frei“ zurückzusetzen.

## Datenschutz

Diese Dateien sind **öffentlich abrufbar**. In den Quelltext gehören keine
personenbezogenen Daten – keine Namen, Anschriften, Rufnummern, Beträge zu
Personen, auch nicht in Kommentaren oder als Beispiel. Schlüssel und Zugangsdaten
werden nur auf dem Gerät eingegeben und nie gespeichert oder abgeglichen.

## Prüfung

Änderungen entstehen als Patchskript (`patch_AXXX.py`) mit Rauchtest
(`smoke_AXXX.py`, Gegenprobe gegen die Vorversion). Die Prüfwerkzeuge und alle
Rauchtests liegen in der Projektablage, nicht in diesem Repository.
