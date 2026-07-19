# PROJECT_MEMORY – Nadig Pfau Hausverwaltung

> **Wissensbasis (Project Memory).** Diese Datei ist die maßgebliche Referenz für alle künftigen
> Aufgaben an dieser Anwendung. Bei jeder weiteren Arbeit zuerst hier nachschlagen, dann nur
> **ergänzen/aktualisieren**, nicht das Projekt neu analysieren.
>
> **Analysestand:** 06.07.2026, 4. Sitzung (**v180** = vollständiger Code-Review (Frontend 28.873 Zeilen/1170
> Funktionen, 7 Backend-Functions, `sw.js`, Website) + 6 Fixes: **H2 KRITISCH behoben** – `settings`-Store
> (`backendKey`, `saEncKey`) wurde bislang ungefiltert in `syncToOneDrive()` UND `exportBackup()` mitgeführt,
> obwohl die UI „nur lokal gespeichert" versprach; neue Konstante `SETTINGS_GEHEIM` filtert beide Pfade,
> UI-Text korrigiert. **H1:** stiller `sendeMail`-No-op-Fallback (`send-token.js`/`selbstauskunft.js`) wirft
> jetzt wie in `send-mail.js` – maskierte bisher den bereits 4× aufgetretenen fehlenden-`mail.js`-Bug hinter
> `ok:true` ohne Mailversand; zwei stille Mail-catch-Blöcke in `selbstauskunft.js` loggen jetzt per
> `context.error`. **M1:** `odGraph()` erhält 30-s-`fetchMitTimeout` (bislang rohes `fetch`, hängender
> Mobilfunk-Request blockierte Datei-Sync unbegrenzt). **N2:** Invalid-Date-Guard in `saveSitzungNachtrag`.
> QA: `node --check` beide Blöcke + alle Backend-Dateien OK, Funktions-Diff v179→v180 = **0 neu/0 verloren**
> (1170), Logiktests Secret-Filter + Date-Guard grün, DB_VER 31 unverändert. `APP_VERSION='2026-07-06-v180'`,
> `sw.js`-CACHE `nadigpfau-v180`. **v180 LIVE seit 06.07., alle Verifikationen bestätigt** (H2-Secret-
> Freiheit in OneDrive-JSON + Backup, H1 Posteingang + Token-Mail, M2/A1 Leerstand). **K1 aufgelöst:**
> Live-Stand `leerstand.js` vom Nutzer bereitgestellt, mit M2 (Kennung-Whitelist) ergänzt und deployt;
> Projekt-Kopie jetzt aktuell. Lehre bleibt: projektlokale Backend-Dateien vor jedem Deploy gegen den
> Live-Stand in `C:\nadigpfau-backend\src\functions\` prüfen. Details §0af. Vorherige Version: (**v175** = §12-P23 Schritt **23a – Stufe 2b `protokolle`-Fotos**
> (erster Schritt, der Inline-Base64-Duplikate VERMEIDET): Neue Protokollfotos (Raum/Bauteil/Zähler) werden beim
> Erfassen per `protoFotoAuslagern`→`fotoAuslagern` nach OneDrive ausgelagert; bei Erfolg landet die **Referenz**
> sowohl im Protokoll-Record als auch im `fotos`-Store (`ref` statt `data`) → kein doppeltes Base64 mehr = der
> eigentliche 20-MB-Treiber ist für Neuaufnahmen beseitigt. Fallback wie v164: Upload-Fehler ⇒ dataURL doppelt
> inline wie bisher, KEIN Datenverlust. Anzeige/Wiederherstellung dual-format (`fotoThumbQuelle`/`fotoImgTag`,
> `restoreFotosForPD` liest `data` ODER `ref`); Mangel-Übernahme dedupliziert Referenzen via `odId`. Druckpfad
> unverändert über `fotoDruckQuelle` (v166). DSGVO-Gate ERFÜLLT: Microsoft/OneDrive als Auftragsverarbeiter in
> `Verzeichnis_Auftragsverarbeiter_v1_1.docx` dokumentiert (+ TOM v1.1, VVT v1.1). Diff v174→v175 = +1
> (`protoFotoAuslagern`)/0 verloren, `node --check` beide Blöcke OK, DB_VER 31. ⚠️ Gerätetest ausstehend
> (Protokoll mit Foto → Datei in OneDrive `<Gebäude>/WE n/Protokolle`, PDF-Druck rehydriert). Details §0aa).
> Vorherige Version: (**v174** = §12-P23 Schritt **23a – VIERTE VERDRAHTUNG, pdfWebsite-Store
> **`objekt_stamm.fotos` + `grundriss`** (additiv, Fallback-gesichert, KEIN Datenverlust): Wohnungsfotos/Grundriss werden
> beim Speichern (`saveWohnungHeizNk`) per `fotoAuslagern` nach OneDrive ausgelagert (Kategorie „Fotos", Knoten `WE <n>`,
> inkl. v173-Gebäudeebene); Anzeige dual-format (Modal-Galerie + Aushang-Auswahlkacheln via `fotoThumbQuelle`);
> **Aushang/Website:** `aushangErzeugen` rehydriert ausgewählte Fotos + Grundriss via `fotoDruckQuelle` VOR PDF-Einbettung
> und Homepage-Push – **kein neuer Backend-Endpunkt nötig**, `/api/leerstand` nimmt Base64 entgegen und lädt selbst nach
> Azure Blob. Zusatz: Vormerk-Record `homepage_leerstand` speichert KEINE Bild-Payload mehr (nur Anzahl/Flag; verifiziert:
> kein Konsument liest daraus Bilder) → weiterer JSON-Schrumpf. 13/13 Logiktests, `node --check` OK, Diff v173→v174 =
> 0 neu/0 verloren (1110), DB_VER 31. Details §0z). Vorherige Version: (**v173** = Ordnerstruktur Düsseldorf: Standort-Ordner „Düsseldorf" statt „RT Duesseldorf",
> Gebäude-Alias `OD_GEBAEUDE_ALIAS` fasst `mind23`+`mind25` zu EINEM Ordner „Mindener Straße 23 und 25" (WE 1–20 vereint)
> zusammen, `ruhrt41` → „Ruhrtalstraße"; neuer Helper `odGebaeudeListe` (Gebäude je Standort mit WE-Union), genutzt in
> `odBaumAnlegen`/`syncDateibaum`/Browser-Ebene 3; Sync heilt Records nach manueller OneDrive-Umbenennung per `odItemId`
> statt zu duplizieren. **Ventil-Gerätetest v164-Kette BESTÄTIGT (05.07.):** Foto öffnet + liegt in OneDrive → Test-Gate
> der OneDrive-Kette erstmals real durchlaufen. Details §0y). Vorherige Sitzung: 04.07., 2. Sitzung (**v172** = Obermenge v169–v172: Ordner pro Gebäude + Foto-Upload-Robustheit · Dokument-Teilen + Dashboard-Protokoll-Fix · Freitextsuche Aufgaben/Mängel · Code-Aufräumung Filter-Toolkit; Details §0u–§0x). Vorherige Sitzung: (**v168** = §12-P23 Schritt **23a – DRITTE VERDRAHTUNG, Foto-Stores **`maengel.fotos`** + **`aufgaben.fotos`****
> (additiv, Fallback-gesichert, KEIN Datenverlust): Der gemeinsame Foto-Editor `saveEditMangel(id, store)` lagert **neu
> aufgenommene** Fotos (dataURL) beim Speichern nach OneDrive aus (Kategorie „Protokolle", Knoten `WE <n>`); vorhandene
> Referenzen und Alt-Strings bleiben unverändert, bei Upload-Fehler bleibt die dataURL inline (Fallback wie v164). Deckt
> **beide** Stores mit einem Eingriff ab (Parameter `store`). Anzeige dual-format an **drei** Lesestellen: Detail-Foto-Grid,
> Bearbeiten-Grid (`renderEmFotoGrid`) und `mangelTeilen` (löst Referenzen via `fotoQuelle` **vor** dem `fetch` auf – kein
> Canvas, daher kein `fotoDruckQuelle` nötig). **Schließt zugleich eine latente v164-Lücke:** der Ventil-Defekt-Fall
> schreibt bereits eine Referenz in `maengel.fotos`, die die alte String-only-Anzeige als `[object Object]` gebrochen
> hätte (beim v164-Test nicht aufgefallen, weil nur der funktionierende Ventil-Fall getestet wurde). **Verifiziert:**
> `maengel.fotos` hat keinen Canvas-/PDF-Konsum (`compressImg` nur im Protokoll-PDF) → `pdfWebsite:false` korrekt. KEINE
> neue Funktion, keine Store-/DB-Änderung, DB_VER 31. `node --check` OK, Funktions-Diff v167→v168 = 0 verloren/0 neu,
> 11/11 Logiktests grün. Details §0t. **Zuvor: v167** = §12-P23 Schritt **23a – ZWEITE VERDRAHTUNG, isolierter Store **`reparaturen.rechnung`****
> (additiv, Fallback-gesichert, KEIN Datenverlust): Rechnungsbeleg wird beim Speichern (`saveReparatur`) per `fotoAuslagern`
> nach OneDrive ausgelagert (Kategorie „Rechnungen", Knoten `WE <n>`), Referenz statt Base64 im Feld `reparaturen.rechnung`.
> Anzeige dual-format an **beiden** Stellen (Liste `reparaturHTML` + Detail): Alt-String-Zweig **bit-identisch** zum
> Original (inkl. `onerror`), Referenz-Zweig via `fotoThumbQuelle`/`openFoto('odref')`. Dateiname-Endung aus MIME
> abgeleitet (jpg/png/**pdf** – Rechnungen können PDFs sein). **Defensiver Fallback wie v164:** schlägt der Upload
> fehl oder fehlt das Ziel, bleibt die dataURL inline → keine Regression. **Zweites Muster desselben Typs wie der
> bestätigte Ventil-Pilot; kein Test-Gate nötig (kein Entfernen von Bestandsdaten).** KEINE neue Funktion (nur
> bestehende Bausteine verdrahtet), keine Store-/DB-Änderung, DB_VER 31. `node --check` OK, Funktions-Diff v166→v167
> = 0 verloren/0 neu, 13/13 Logiktests grün. Details §0s. **Zuvor: v166** = §12-P23 Schritt **23a – Stufe 2a: Druck-Rehydrierung**
> (additiv, verhaltensgleich): neue Funktion `fotoDruckQuelle(x)` liefert für die PDF-/Canvas-Einbettung
> **immer** eine dataURL – Alt-String unverändert, ausgelagerte Referenz per `odDownloadUrl`→`fetch`→Blob→
> dataURL (vermeidet „tainted canvas" bei cross-origin OneDrive-Links); Fallback Mini-Thumbnail. `printProtHTML`
> nutzt sie statt `fotoQuelle`. Zentraler Helfer `blobZuDataUrl` (Promise) neu (bisher nur inline-FileReader).
> **Notwendiger Enabler vor Stufe 2b** (Schreibpfad/inline-Entfernen). +2 Funktionen (1168→1170), `node --check`
> OK, 7/7 Logiktests grün. **Zuvor: v165** = §12-P23 Schritt **23a – Stufe 1 Protokollfotos: Lesepfad zentralisiert**
> (additiv, verhaltensgleich): Protokoll-PDF `printProtHTML` bezieht die Fotos jetzt über zwei neue Resolver
> `protoFotoWerte`/`protoZaehlerFotoWert` (inline-Arrays bevorzugt → **exakt wie bisher**; Fallback über die
> `*Ids` in den `fotos`-Store, dual-format), Einbettung weiterhin via `fotoQuelle`+`compressImg`. Bereitet
> Stufe 2 (inline-Duplikate entfernen) vor, **ohne** heutiges Verhalten zu ändern. +2 Funktionen (1166→1168),
> `node --check` OK, 8/8 Resolver-Logiktests grün. **Zuvor: v164** = §12-P23 Schritt **23a – ERSTE VERDRAHTUNG, Pilot `ventilpruefung`**:
> Ventilfoto wird beim Speichern per `fotoAuslagern` nach OneDrive ausgelagert (Referenz statt Base64),
> Anzeige dual-format über neuen Helper `fotoImgTag`; Ziel-Auflösung `fotoZielFuer`. **Defensiver Fallback:**
> schlägt der OneDrive-Upload fehl, bleibt die dataURL inline → keine Regression. **Wichtige Analyse-Erkenntnis:**
> `objekt_stamm.fotos`/`grundriss` fließen in Aushang-PDF **und** Website-Leerstand (`homepage_leerstand`) →
> **kein** guter Pilot (braucht synchrone dataURL + Azure Blob für Website); `FOTO_FELDER` um Flag `pdfWebsite`
> erweitert. Pilot daher auf `ventilpruefung` revidiert (maximal isoliert, nur Bildschirm-Anzeige). +2 Funktionen
> (1164→1166). ⚠️ **Gerätetest ausstehend** – erste echte OneDrive-Upload-Verdrahtung. Zuvor: **v163** =
> 23a-Fundament (dual-format-Bausteine, additiv); v162 = 23c Kategorie-Ordner; v161 = 2 Sofort-Fixes;
> v156 = Kautionsquittung, DB_VER 30→31) · Hauptdatei `index-v178.html` · `DB_NAME='immo_v2'` · **DB_VER = 31** ·
> `APP_VERSION = '2026-07-05-v178'` · `sw.js`-CACHE `nadigpfau-v178`
> Syntaxprüfung der Inline-Scripts: `node --check` → **OK**. Funktions-Diff v163→v164 1164→1166 (+2, 0 verloren);
> v162→v163 1157→1164; v161→v162 1156→1157.
>
> **Konsolidierungsvermerk 01.07.2026:** **Einzige** Status-/Wissensdatei des Projekts. Die früher separate
> Sitzungs-Übergabe (`memory.md`) und ihre Dublette (`memory_2.md`) sind **aufgelöst** – ihr Inhalt lebt jetzt
> im Kopfabschnitt „Letzte Sitzung / Schnellüberblick" (unten) plus den Detailabschnitten §0e/§0f. Beide
> `memory*.md`-Dateien können aus dem Projektspeicher **gelöscht** werden. Ältere Dubletten (alte PROJECT_MEMORY-Stände,
> FEHLERBEHEBUNG.md, Zusammenfassung_, doppelte sw.js/User_Update) ebenfalls löschbar (siehe §14).
>
> **Mehrdatei-Deploy (seit v150):** Live-App = 5 Dateien im selben GitHub-Pages-Verzeichnis:
> `index.html` + `manifest.json` + `icon-192.png` + `icon-512.png` + `sw.js`. Bei jeder neuen
> HTML-Version die `CACHE`-Konstante in `sw.js` hochzählen (aktuell `'nadigpfau-v164'`).

---

## ⚡ Letzte Sitzung / Schnellüberblick (Stand 19.07.2026, 23. Sitzung Teil 6)

**★ v250 – Bugfix: OneDrive-Sync-Button schloss das Modal sofort, ohne Ergebnis abzuwarten.**
Nutzerbefund per Screenshot: „Wenn ich auf den Sync-Button klicke, verschwindet das Fenster."

**Root Cause:** In `showSyncInfo()` rief der Button `syncFromOneDrive();closeModal()` auf – zwei
Anweisungen im selben `onclick`, aber `syncFromOneDrive()` ist asynchron und wurde nicht abgewartet.
`closeModal()` feuerte dadurch sofort, unabhängig davon, ob der Sync gelang oder fehlschlug. Das
Modal war also nie „kaputt", sondern schloss sich strukturell zu früh – der Nutzer sah nie, ob
der Sync erfolgreich war.

**Fix:** Neue Funktion `syncButtonModalKlick(btn)` – sperrt den Button, wartet `await syncFromOneDrive()`
ab und baut das Modal danach per `showSyncInfo()` **neu auf** (mit aktualisiertem Status: erfolgreich/
fehlgeschlagen/Fehlermeldung) statt es zu schließen. Der bestehende „Schließen"-Button im Modal bleibt
unverändert für den manuellen Abbruch. Keine Änderung an `syncFromOneDrive()` selbst, keine Store-/
DB-Änderung, DB_VER unverändert.

**QA:** `node --check` beide Inline-Blöcke OK · Funktions-Diff v249→v250 **+1 / 0 verloren** (1358→1359,
nur `syncButtonModalKlick`). `APP_VERSION='2026-07-19-v250'`, `sw.js`-CACHE `nadigpfau-v250`.
**Gerätetest ausstehend:** Sync-Button im OneDrive-Modal antippen → Button zeigt „Synchronisiere …",
Modal bleibt offen, zeigt danach Erfolgs-/Fehlerstatus; „Schließen" weiterhin manuell.

**⚠️ Doku-Lücke v245–v249:** Wie schon bei v237 vermerkt, lag `index-v249.html` als Projektstand vor
(APP_VERSION 2026-07-19-v249, u. a. die v249-Dokumenten-Auslagerung/Sync-Datei-Verkleinerung), ohne
dass die Zwischenschritte v245–v249 hier im Changelog nachgetragen wurden. v250 baut auf v249 auf;
Inhalt von v245–v249 bei nächster Gelegenheit rekonstruieren/nachtragen (siehe §11).

---

## ⚡ Letzte Sitzung / Schnellüberblick (Stand 18.07.2026, 22. Sitzung)

**★ v244 (18.07.) – Technische Schuld R26 (Teil 1) geschlossen: stille Fehler sichtbar gemacht.**
Zweiter Altpunkt aus §11. Rein diagnostisch/UX, **keine Logikänderung**, Funktions-Diff 0/0.

**Befund:** 164 leere `catch`-Blöcke im Frontend. Viele davon sind legitime Idempotenz-Fänger
(`localStorage` im Privatmodus, optionale Felder) – die bleiben bewusst stumm. Kritisch waren die
Blöcke, in denen ein Fehlschlag **echte Arbeit verliert oder eine Aktion nur scheinbar ausführt**.
Alle **22 Stellen dieser Klasse** sind jetzt versorgt; verbleibende kritische Blöcke: **0**
(automatisiert nachgemessen: mehrzeiliger try-Block mit `fetch`/`odGraph`/`idbPut`/`deleteMitTombstone`).

**Mit ehrlicher Nutzerrückmeldung (Toast) versehen** – hier täuschte die Oberfläche bisher Erfolg vor:
- Posteingang **„Erledigt"** (`/api/inbox-mark-read`) und **Selbstauskunft als gelesen**
  (`/api/inbox-sa/mark-read`): Server-Fehler blieb unbemerkt, der Eintrag tauchte beim nächsten
  Aufruf wieder auf – ohne Erklärung.
- **Papierkorb-Aktion** (`/api/inbox-trash`).
- **Selbstauskunft-Import** in `selbstauskuenfte`: Fehlschlag = Datensatz fehlt dauerhaft in der Akte,
  Import meldete trotzdem Erfolg.
- **Import-Batch speichern** (`buchungs_batches`): ohne Batch-Record ist „Import rückgängig" für
  diesen Lauf nicht mehr möglich – das darf man nicht erst beim Aufräumen merken.

**Nur protokolliert (`console.warn`, kein Toast)** – Hintergrund-/Lesepfade:
Papierkorb laden, Zähler Nachrichten/Selbstauskünfte, Foto-Laden fürs Teilen, OneDrive
Backup-Ordner anlegen + Generationen aufräumen/löschen, Sync-Protokoll schreiben/kürzen,
Alt-Verträge aufräumen, PIN-Migration je Benutzer, interne Ausgleichsnotiz am Mieter,
Interessent „übernommen" markieren/verknüpfen, HM-Profil-Mieterreduktion,
Buchung löschen bei „Import rückgängig" (jetzt mit Buchungs-ID im Log).

**QA:** `node --check` OK · Funktions-Diff v243→v244 **0 neu / 0 verloren** (1391) ·
Regressionen grün: 19/19 (v240) + 18/18 (v241) + 11/11 (v242). DB_VER 35 unverändert.
APP_VERSION `2026-07-18-v244`, CACHE `nadigpfau-v244`.

**§11-Status R26:** ✅ kritischer Teil geschlossen. **Rest bewusst offen:** ~148 stumme
Idempotenz-Fänger ohne Netzwerk-/Schreibbezug – ein Blind-Patch dort erzeugt nur Log-Rauschen.
**R11 (CSP `unsafe-inline`)** bleibt als einzige größere technische Schuld: Mehrtage-Refactor
(~900 Inline-Handler auf `registerActions`/`__delegate` oder Nonce), weiterhin zurückgestellt.

**Deploy-Set v244:** `index.html`(v244) + `sw.js`(v244); manifest unverändert seit v240.
⚠️ Enthält weiterhin die **DB_VER-Erhöhung 34→35 aus v242** – alle Geräte gemeinsam aktualisieren.
**Gerätetest v244:** Posteingang „Erledigt" bei ausgeschaltetem Backend/Flugmodus → Toast statt
stiller Annahme; regulärer Betrieb unverändert.

**★ v243 (18.07.) – Technische Schuld R27 geschlossen: `esc()`-Härtung bei Personendaten.**
Erster von drei Altpunkten aus §11 (R27 · R26 · R11). Rein defensiv, **keine Logikänderung**,
Funktions-Diff 0/0.

**19 Stellen abgesichert**, an denen personenbezogene oder freitextliche Felder ungeschützt in
HTML interpoliert wurden:
- **Kernstelle (direktes `innerHTML`):** Wohnungswechsel-Hinweis im Mieter-anlegen-Dialog
  (`cur.mieter`, `cur.flaeche`, `cur.etage`, beide Zweige belegt/Leerstand).
- **Auswahllisten:** Login-Benutzerliste (`u.name` + `rollenLabel`), Mangel-Auswahl im
  Termindialog, Aufgabe zuweisen, Aufgabe weiterleiten — jeweils `value` mit `escAttr`,
  Anzeigetext mit `esc`.
- **Attribut-Kontext (Quote-Injection):** `mEtage`/`mFlaeche`-Formularfelder (`escAttr`),
  Mangel-Fotogalerie `onclick="openFoto(...,'Foto n – ${titel}')"` und Reparatur-Rechnungsbild
  — ein Apostroph im Titel („Bad's Fenster") konnte den JS-String schließen.
- **Listen/Detail:** Etage + Wohnfläche in Mieterliste/-detail, Reparatur-Titel (Liste + Modal),
  Lager-Entnahmen (`v.name`).
- **Druckstücke:** NKA-Kopf und Anschriftenblock (Objektname/Etage/Ort), Briefkopf
  (`getBriefkopfHTML`: Name/Zusatz/Straße/Ort), Tabelle „übernommene Mängel" im
  Einzugsprotokoll (Titel/Beschreibung/Nummer), Mietbescheinigungs-Detailzeile.

**Bewusst NICHT geändert:** `toast()`/`confirm()`-Texte (kein HTML-Kontext) und Stellen, die
bereits `esc()` nutzen. Umlaute/Sonderzeichen bleiben unverändert lesbar (`esc` maskiert nur
`& < > " '`).

**QA:** `node --check` OK · Funktions-Diff v242→v243 **0 neu / 0 verloren** (1391) ·
**13/13 Escaping-Tests** (Script-Payload, Attribut-Ausbruch, onclick-Apostroph, Backtick,
Umlaut-/Ampersand-Erhalt, Leerwerte) · Regressionen grün: 11/11 (v242 Journal) + 18/18 (v241)
+ 19/19 (v240). DB_VER 35 unverändert. APP_VERSION `2026-07-18-v243`, CACHE `nadigpfau-v243`.

**§11-Status R27:** ✅ geschlossen. **Nächste technische Schulden (nicht angefasst):**
- **R26** – 112 leere `catch(_){}`-Blöcke: geplant als gezielte Etappe nur für Netzwerk-/
  Storage-/Sync-Pfade (`console.warn` ergänzen), Idempotenz-Fänger bleiben stumm.
  Einzelfallprüfung, kein Blind-Patch.
- **R11** – CSP `'unsafe-inline'` entfernen: ~900 Inline-Handler auf das v147-Delegationsgerüst
  (`registerActions`/`__delegate`) migrieren oder Nonce-Ansatz. Mehrtage-Refactor, weiterhin
  zurückgestellt. **Hinweis:** v243 verringert die Angriffsfläche, ersetzt die CSP aber nicht. **Etappenplan vorbereitet 19.07. → §R11Plan.**

**Deploy-Set v243:** `index.html`(v243) + `sw.js`(v243); manifest unverändert seit v240.
⚠️ Enthält weiterhin die **DB_VER-Erhöhung 34→35 aus v242** – alle Geräte gemeinsam aktualisieren.

**★ v242 (18.07., gleiche Sitzung, „Weiter") – F4 GoBD-Buchungsjournal umgesetzt.**
Nutzerentscheid aus der 19. Sitzung („Buchungsänderungen für alle Verwalter → GoBD-Journal F4").

- **Neuer Store `buch_journal`** (STORE_DEFS: sync:true, merge:true, Index buchungId/kontoId) ·
  **DB_VER 34 → 35** (onupgradeneeded legt fehlende Stores automatisch aus STORE_DEFS an,
  kein Migrationslauf nötig). NICHT in HM_SYNC (Whitelist enthält ohnehin keine `buchungen`).
- **Zentraler Helfer `buchJournal(aktion, alt, neu, hinweis)`**: Feld-Diff über Whitelist
  `BUCH_JOURNAL_FELDER` (mieterId/-Name, mietmonat, kategorie(n), status, notiz, objektId,
  kostengruppe, LZ-Felder, erstattungFuer, konfidenz, zuordnungVia, _leerstand); Arrays/Objekte
  JSON-verglichen, null/undefined/''-gleichwertig, Werte auf 300 Zeichen gekappt. Eintrag mit
  wer/wann (`CU`, nowIso), Buchungs-Metadaten (Betrag/Datum/Name/Zweck-Auszug) und Hinweis.
  „aenderung" ohne Diff schreibt NICHTS; komplett in try/catch (**Journal blockiert nie eine
  Buchung**). Aktionen: aenderung / loeschung / anlage_manuell. **Append-only** – bewusst
  keine Bearbeiten-/Lösch-UI.
- **15 Hooks an ALLEN manuellen Schreibpfaden**: Split-Dialog, Darlehens-Split, Kategorie
  (einzeln + Massenübernahme), Kostenstelle (einzeln + Masse), Leistungszeitraum, Zuordnen /
  Zuordnung aufheben, Erstattung, Umhängen (v241), Re-Import-Nachtrag in `zaSpeichern`,
  Barzahlung (anlage_manuell) sowie beide Import-Rückgängig-Löschpfade (loeschung, Datensatz
  wird VOR `deleteMitTombstone` gesichert). **Bewusst NICHT journalisiert:** CSV-Import selbst
  (dokumentiert der Batch in `buchungs_batches`) und die idempotenten Migrationen
  `zaObjektMigration`/`zaLeistungMigration` (Massenrauschen ohne Nachvollzieh-Mehrwert).
- **UI:** Toolbar-Button „Journal" (Buch-Icon, neben „Regeln") → `modalBuchJournal()`:
  kontogefiltert, neueste zuerst, max. 200 Einträge, je Eintrag Aktion/Hinweis, Zeit, Nutzer,
  Buchungskopf, Feld-Diffs „alt → neu" mit deutschen Feldlabels. Verwalter-only, nur lesen,
  GoBD-Hinweistext.

**QA:** `node --check` beide Blöcke OK · Funktions-Diff v241→v242 **+3/0 verloren**
(`buchJournal`, `_bjNorm`, `modalBuchJournal`; 16 Vorkommen = 1 Definition + 15 Hooks) ·
**11/11 Journal-Smoke-Tests** (Diff-Whitelist, updatedAt ignoriert, Array-Diff, Löschung,
Anlage, Fehler-Schlucken, null≙leer) · Regressionen erneut grün: 19/19 (v240 zaSollIst) +
18/18 (v241). APP_VERSION `2026-07-18-v242`, sw.js-CACHE `nadigpfau-v242`.
**⚠️ Achtung Deploy: DB_VER-Erhöhung** – nach dem ersten Start läuft das DB-Upgrade; ältere
Geräte (v241-Stand und früher) können die DB v35 nicht mehr öffnen → **alle Geräte zeitnah
gemeinsam aktualisieren** (bekanntes Mischbetriebs-Thema, vgl. v156/DB 31).
**Gerätetest v242:** Kategorie einer Buchung ändern → Journal zeigt Eintrag mit Diff;
Import rückgängig → Löscheinträge; Journal-Modal öffnet auch ohne Einträge.
**GoBD-Einordnung (Hinweis):** Das Journal erfüllt den Nachvollziehbarkeits-/
Unveränderbarkeitsgrundsatz auf App-Ebene; eine zertifizierte GoBD-Konformität der
Gesamtumgebung (Aufbewahrung, Verfahrensdokumentation) ersetzt es nicht – bei Bedarf
Steuerberater einbeziehen.

**F-Roadmap-Stand:** F0 ✓ · F1 ✓ (v225–v228, v233/v234) · F2 ✓ (v235/v236 + manuelle
LZ-Korrektur vorhanden) · **F4 ✓ (v242)** · offen: F9 optional (SEPA-Export).

**★ v241 (18.07., gleiche Sitzung) – drei Nutzerbefunde nach dem v240-Gerätetest.**

1. **ROOT CAUSE „Wienandts → Kindsmüller" endlich gefunden (Altbefund seit v220):**
   `zaMatch` ordnete beim WE-Fallback (`weHint` aus dem Verwendungszweck) den EINZIGEN
   Kandidaten der WE **ohne Prüfung des Mietzeitraums** zu (`if(cand.length===1){pick=cand[0];}`).
   Die Zeitraumprüfung `_mieterAktivImMonat` lief nur, wenn mehrere Kandidaten existierten.
   Fehlte der frühere Mieter (gelöscht/nie angelegt), landeten alle Alt-Zahlungen beim heutigen
   Mieter der Wohnung — mit falschem Rückstand dort und Soll-0-Zeile beim Vormieter. Fix v241:
   Zeitraumprüfung auch bei einem Kandidaten; passt der Monat nicht, bleibt die Zeile **offen**
   (manuelle Zuordnung) statt falsch zu buchen. IBAN-Match bleibt unverändert (starkes Signal).
2. **Neues Werkzeug `zaModalUmhaengen`/`zaUmhaengenAusfuehren`** (Transfer-Icon in jeder
   Mietkonto-Zeile): bereits gespeicherte Eingänge eines Mieters lassen sich als **Block**
   (Monat von–bis) auf einen anderen Mieter umhängen, optional mit Übernahme der IBAN an den
   Zielmieter. Behebt die Altlast, ohne jede Buchung einzeln anzufassen.
3. **Kaution/NK-Nachzahlung erzeugten falsches Guthaben (Befund Schäfer, Max +1.855 €):**
   `zaSollIst` zählte JEDE Eingangsbuchung voll als Erfüllung des Monatssolls — auch wenn sie
   als „Kaution erhalten" kategorisiert war. Fix: Ist eine Buchung kategorisiert/gesplittet,
   zählen nur die Teile **kaltmiete / nk_vorauszahlung / stellplatzmiete** aufs Soll; alles
   andere (Kaution § 551 BGB = durchlaufender Posten, NK-Nachzahlung aus der Abrechnung,
   sonstige Einnahmen) wird als neues Feld `sonst`/`sonstKats` geführt und in der Monatszelle
   kupferfarben ausgewiesen („+ Kaution erhalten 1.855,00"). **Unkategorisierte Buchungen
   verhalten sich bit-identisch zu v240** (Regressionstests).
4. **Import-Verlust bei ID-Kollision (Antwort auf die Frage zu Bild 4):** Der Re-Import
   ergänzt fehlende Buchungen grundsätzlich (Dedup rein ID-basiert, `zaBuchungId`), verwirft
   also nichts Vorhandenes — ABER die ID nutzt nur die ersten 40 Zeichen der ersten
   Zweckzeile. Zwei inhaltlich verschiedene Buchungen mit gleichem Datum/Betrag/IBAN und
   gleichem Zweck-Anfang **aus zwei verschiedenen Dateien** kollidierten und die zweite wurde
   still als „bereits vorhanden" verworfen (`occ` schützt nur innerhalb EINER Datei).
   Fix: neue Helfer `zaIstAndereBuchung` (Vergleich des VOLLEN Zwecks + Buchungstexts) und
   `zaFreierKollisionsIndex`; echte Kollisionen werden mit Suffix `_k2` zusätzlich angelegt
   und im Abschluss-Toast gemeldet. Gilt jetzt auch für **Ausgänge** (die hatten bisher gar
   keine Kollisionsprüfung, nur `exists → continue`).
5. **Alt-Mieter-Dialog (Bankimport) um Kaltmiete + NK-VZ ergänzt** — bisher wurde jeder
   Alt-Mieter mit Soll 0,00 € angelegt, wodurch seine kompletten Zahlungen als „Guthaben"
   erschienen (Bild 2: Wienandts „0,00+855,00"). Mit Hinweistext im Dialog.

**QA:** `node --check` beide Blöcke OK · Funktions-Diff v240→v241 **+4/0 verloren**
(`zaModalUmhaengen`, `zaUmhaengenAusfuehren`, `zaIstAndereBuchung`, `zaFreierKollisionsIndex`)
· **18/18 neue Smoke-Tests** (Kaution/Split/NK-Nachzahlung/SP-Teil/Regression unkategorisiert,
zaMatch-Zeitraum vor Einzug / Vormieter / aktueller Mieter / IBAN unverändert, Kollisionsvergleich)
plus **19/19 v240-Regressionstests** erneut grün. DB_VER 34 unverändert.
APP_VERSION `2026-07-18-v241`, sw.js-CACHE `nadigpfau-v241`, manifest.json unverändert seit v240.

**⚠️ Gerätetest v241:** (a) Schäfer 01/2025: Saldo darf kein Guthaben mehr zeigen, Zelle weist
„+ Kaution erhalten 1.855,00" aus; (b) Wienandts-Zahlungen per Transfer-Icon umhängen und
Mietkonto beider Mieter prüfen; (c) Alt-Mieter neu anlegen → Soll ≠ 0; (d) CSV erneut
importieren → Toast meldet ggf. „… Namensgleichheit getrennt erfasst"; (e) Buchhaltungsliste
auf Vollständigkeit gegen den Kontoauszug prüfen (Filter „Ohne Kategorie" beachten!).

**Offen / zu klären:** Sollen NK-Nachzahlungen im Mietkonto künftig einen *früheren*
Rückstand tilgen (Kontokorrent) statt nur separat ausgewiesen zu werden? Steuerlich unkritisch,
aber Verrechnungsreihenfolge (§ 366 Abs. 2 BGB) mit Steuerberater/Anwalt abstimmen.

---

## Schnellüberblick 22. Sitzung – v240 (gleiche Sitzung, historisch)

**Ausgangspunkt: LIVE-STAND KORRIGIERT.**

Screenshot des Nutzers (18.07.) zeigt die installierte App mit
`App-Version 2026-07-16-v237` → **Live ist v237**, NICHT mehr v152. Der jahrelange
„Deploy-Rückstand v153+“ ist damit weitgehend abgebaut; offen bleibt das Paket **v238–v240**.

**★ v240 (18.07.) – Nutzeranforderungen aus 2 Tablet-Screenshots (Zahlungen/Mietkonto).**
1. **Tablet-Drehung nur für Zahlungen:** `manifest.json` `orientation` **"portrait" → "any"**
   (BREAKING für die Sperr-Logik: ohne dieses Manifest-Update dreht gar nichts bzw. sperrt
   nichts). Neue Fkt. `zaRotationErlaubt()`/`rotationAktualisieren()`: App hält sich per
   `screen.orientation.lock('portrait')` überall im Hochformat und gibt die Drehung per
   `unlock()` NUR unter Einstellungen → Zahlungen frei. Hooks: `nav()` + `switchSettingsTab()`.
   iOS/iPadOS kennt kein Orientation-Lock → dort dreht systembedingt alles (dokumentiert im Code).
2. **KRITISCH – Alt-Mieter „nicht löschbar“ (Root Cause):** `mieterEndgueltigLoeschen` löschte
   per `idbDelete` OHNE Tombstone → der OneDrive-Merge stellte den Datensatz beim nächsten Sync
   wieder her (Wienandts-Duplikate Bild 1). Fix: `deleteMitTombstone('mieter', id)`. Zweite
   Ursache: aus dem Bankimport angelegte Alt-Mieter waren in der UI UNERREICHBAR (WE hat aktiven
   Mieter → keine Leerstand-Zeile, kein `_vormieterId`-Link) → jetzt zwei Zugänge:
   a) **Papierkorb-Button direkt in der Mietkonto-Zeile** (nur `ehem.`-Zeilen, Verwalter,
      Sicherung + Buchungs-Hinweis, `zaMieterLoeschen`),
   b) **Karte „Ehemalige Mieter dieser Wohnung“ in `showMieter`** (alle `_vormieter` derselben
      objektId+weNr, auch unverknüpfte Bankimport-Anlagen; klickbar → dort löschen/reaktivieren).
      Erfüllt zugleich „Alt-Mieter soll bei der Wohnung erscheinen“.
3. **NK-VZ direkt im Mietkonto anpassen:** Stift „NK-VZ“ in der Soll-Zelle →
   `zaModalNkVz`/`zaNkVzSpeichern`: schreibt `vzHistorie` (P7), bei ab-Monat ≤ aktuell auch
   `m.nk` + `m.gesamt` (Gesamt per **NK-Delta**, damit abweichend gepflegtes Gesamt-Soll
   z. B. Garage/Möbel erhalten bleibt). UI-Hinweis § 560 Abs. 4 BGB.
4. **zaSollIst monatsgenau:** je Monat `nkMo = vzZuStichtag(...)`; `sollMo = s.soll + (nkMo−s.nk)`
   (Delta-Ansatz, s. o.), `nkAnteil` und `mietfreiSollMo` nutzen `nkMo`. **Ohne `vzHistorie`
   bit-identisch zu v239** (Regressionstests). Damit zeigt das Mietkonto NK-Erhöhungen ab dem
   richtigen Monat statt rückwirkend.
5. **Zahlungen aufteilen aus dem Mietkonto:** Ist-Zellen mit Betrag sind klickbar →
   `zaModalMonatsZahlungen(mieterId, monat)` listet die Eingänge des Monats mit Buttons
   „Aufteilen“ (`modalBuchungSplit` – Kaltmiete/NK-VZ/**NK-Nachzahlung**/**Kaution** wählbar)
   und „Zuordnung ändern“. Zusätzlich im Split-Dialog (Einnahmen) 4 Schnell-Buttons
   (+ Kaltmiete / + NK-VZ / + NK-Nachzahlung / + Kaution).
6. **Bild-2-Befund (Seite rechts abgeschnitten):** primär über die Drehung gelöst; zusätzlich
   defensives CSS `.settings-card{min-width:0;max-width:100%;overflow-x:hidden;overflow-x:clip}`
   (Karte kann den Viewport nicht mehr sprengen; innere Tabellen scrollen weiter in ihren
   eigenen `overflow-x:auto`-Wrappern).

**QA:** `node --check` beide Blöcke OK · Funktions-Diff v239→v240 **+6/0 verloren**
(`zaRotationErlaubt`, `rotationAktualisieren`, `zaMieterLoeschen`, `zaModalNkVz`,
`zaNkVzSpeichern`, `zaModalMonatsZahlungen`) · **19/19 Node-Smoke-Tests** gegen extrahierten
Originalcode (zaSollIst ± vzHistorie, Delta-Gesamt, Garage-Fall, mietfrei-kalt-Interaktion,
Einzugsgrenzen, vzZuStichtag). DB_VER 34 unverändert (`vzHistorie` existiert seit P7).
APP_VERSION `2026-07-18-v240`, sw.js-CACHE `nadigpfau-v240`, manifest.json geändert (!).

**Deploy-Set v240 (alle 3 geänderten Dateien nötig):** `index.html`(=v240) + `sw.js`(v240) +
**`manifest.json`(orientation any)**. ⚠️ Manifest-Änderungen übernimmt Android teils erst nach
Neuinstallation der PWA bzw. WebAPK-Update (kann 1–3 Tage dauern) – falls die Drehung nach dem
Deploy nicht greift: App einmal deinstallieren und neu „Zum Startbildschirm hinzufügen“.

**⚠️ Gerätetest v240:** (a) Drehung: nur im Zahlungen-Tab quer, sonst Hochformat (Samsung-Tablet);
(b) Wienandts-Duplikate über Papierkorb-Button löschen → nach Sync auf ZWEITEM Gerät prüfen,
dass sie NICHT zurückkommen (Tombstone); (c) NK-VZ-Stift: Erhöhung ab Monat X → Mietkonto zeigt
neues Soll erst ab X; (d) Ist-Zelle antippen → Monats-Zahlungen + Split; (e) `showMieter`
Kindsmüller (WE 7) zeigt Karte „Ehemalige Mieter dieser Wohnung“. Danach Bug „Wienandts
angeklickt, Kindsmüller gebucht“ neu bewerten (vermutlich Folge der Duplikate).

---

## Schnellüberblick 21. Sitzung (historisch) – (Stand 18.07.2026, 21. Sitzung)

**★ v239 (18.07., gleiche Sitzung) – Review-Folgefixes R4 + R5 (Basis v238).**
- **R4 – PIN-Härtung:** Neues Verfahren `pinHashPbkdf2` (PBKDF2-SHA256, 200.000 Iterationen wie
  `_deriveKey`, per Node-crypto-Referenz verifiziert). `pinSetzen` schreibt `pinKdf:'pbkdf2'`;
  `pinPruefen` prüft verfahrensbewusst (Flag → PBKDF2, sonst Alt-SHA-256). **Upgrade-on-Login** in
  `tryLogin`: nach erfolgreicher Prüfung wird der Datensatz auf PBKDF2 angehoben, wenn das Flag fehlt
  ODER der gespeicherte Hash nicht dem korrekten PBKDF2-Wert entspricht. Letzteres deckt den in der
  Analyse gefundenen **Merge-Feld-Mix** ab: `mergeRecord` füllt leere Felder der jüngeren Seite aus der
  älteren auf – ein Altgeräte-Edit nach dem Upgrade könnte `pinKdf:'pbkdf2'` mit einem Alt-Hash
  kombinieren. Gegenmaßnahme doppelt: `pinPruefen` hat für diesen Fall einen Alt-Fallback
  (Selbstheilung, keine Login-Sperre; schwächt nichts, da nur EIN Hash existiert), und `tryLogin`
  repariert den Datensatz beim nächsten Login. `pinMigrationAlleUser` (Klartext-Rettungsanker)
  vergleicht jetzt via `pinPruefen` statt Alt-Hash direkt → migriert Klartext-Altbestände sofort auf
  PBKDF2. Speichern des Upgrades in try/catch – Fehlschlag lässt den bisherigen Hash gültig.
- **R5 – esc()-Lücken Lager-Modul geschlossen:** Entnahmen-Liste (`e.datum/menge/zweck/von`) und
  `a.notiz` (esc VOR der `\n`→`<br>`-Ersetzung) im Lager-Detail escaped – damit sind ALLE bekannten
  innerHTML-Renderpfade der App esc()-sauber.
- **QA:** `node --check` beide Blöcke OK · Funktions-Diff v238→v239 **+1/0 verloren** (1328→1329,
  `pinHashPbkdf2`) · **18/18 Node-Smoke-Tests** gegen extrahierten Originalcode (PBKDF2-Referenz,
  Alt-Login, Upgrade, Klartext-Migration, Feld-Mix-Heilung, Upgrade-Bedingungen, Defensive) ·
  R5 per grep verifiziert (5 esc-Stellen). DB_VER 34 unverändert (pinKdf = additives Feld).
  APP_VERSION `2026-07-18-v239`, sw.js-CACHE `nadigpfau-v239` (inkl. R3-Härtung aus dieser Sitzung).
- **⚠️ Gerätetest v239 (WICHTIG – Login-Kern, analog v204):** Alle Nutzer-Logins müssen unverändert
  funktionieren; nach dem ersten Login je Nutzer trägt der users-Datensatz `pinKdf:'pbkdf2'` und einen
  neuen `pinHash`/`pinSalt`. Lager-Detail (Entnahmen + Notiz) normal lesbar. Deploy-Set:
  `index.html`(=v239) + `sw.js`(CACHE v239). **Hinweis Mischbetrieb:** Geräte zeitnah gemeinsam
  aktualisieren – ein v152-Altgerät kennt pinHash generell nicht (Bestandsthema seit v204, nicht neu).

**★ Vollständiger Code-Review Nr. 2 (Basis v238) – Gesamtprojekt: Frontend (34.624 Zeilen, 1328 Funktionen,
0 Duplikate), 9 Backend-Functions, sw.js, manifest.json, index_website.html. Ergebnis: Architektur solide,
KEIN kritischer Befund; 3 Fixes direkt umgesetzt (nur Backend/SW, KEIN Frontend-Stacking auf die
ungetesteten v225–v238), 7 dokumentierte Befunde für Folgeversionen. Details §0Rev21.**

**Direkt umgesetzt (Outputs, deploy-fertig):**
1. **`inbox-mark-read.js` (HOCH, Doku-Diskrepanz):** Der laut §0au am 11.07. „erledigte" B3-Fix
   (2× `e.message` im 500er-Response-Body) war in der PROJEKTKOPIE NICHT enthalten – die Kopie war der
   alte Stand. Jetzt tatsächlich gefixt (`{ok:false}` + `context.error`). ⚠️ K1: vor Deploy Live-Diff!
2. **`zaehlerOcr.js` (MITTEL):** Ausgabe-Whitelist analog `rechnungOcr.ergebnisSaeubern` – bisher wurde
   das rohe Modell-JSON 1:1 an die App durchgereicht (unbekannte Zusatzfelder, ungekappte Strings).
   Jetzt nur typgehärtete Felder (wert/einheit/zaehlernummer/ableseDatum/confidence/error). Zusätzlich
   `temperature:0` (Konsistenz zu rechnungOcr) und Netzwerkfehler→502 statt pauschal 504.
   11/11 Smoke-Tests grün. Noch nicht deployt (war ohnehin offen).
3. **`sw.js` (MITTEL):** Navigations-Handler cachte JEDE Serverantwort als index.html – ein 404/500
   (z. B. GitHub-Pages-Störung) hätte die funktionierende Offline-Kopie überschrieben. Jetzt nur bei
   `netz.ok` cachen. CACHE bleibt `nadigpfau-v238` (HTML unverändert). Versions-Kommentar v225→v238 korrigiert.

**Dokumentierte Befunde ohne Code-Änderung (Priorisierung siehe §0Rev21):** PIN-Hash = ungesalzenes
Schnell-SHA-256 → PBKDF2 empfohlen (M) · Lager-Modul 2 unescapte Render-Stellen (N, Self-XSS) ·
`cryptoConfig` (Salt+Check) wird gesynct = Offline-Bruteforce-Fläche bei schwachem Master-PW (N,
bewusster Trade-off, dokumentiert) · 156 leere catch-Blöcke (techn. Schuld) · C1 `unsafe-inline`
(Altpunkt, bleibt größter struktureller Sicherheitspunkt wg. Tokens im Client) · v237-Changelog-Lücke
(unverändert offen) · Positiv verifiziert: alle Bankimport-Renderpfade esc()-sauber, `od_auth`
sync:false, SETTINGS_GEHEIM intakt, keine Secrets im Code, v238-mietfrei-Löschung Tombstone-korrekt
(`erfasseLeerungen` + `_istLeer` decken Arrays/undefined ab), Website esc()-konsequent.

**Deploy-Rückstand unverändert:** Live v152; Gesamtpaket = v238 + sw.js (diese Sitzung gehärtet) +
Backend `inbox-mark-read.js` (K1!) + `zaehlerOcr.js` + `rechnungOcr.js`.
**(Korrektur 22. Sitzung: Live ist inzwischen v237 – siehe oben.)**

---

## Schnellüberblick 20. Sitzung (historisch) – (Stand 17.07.2026, 20. Sitzung)

**v238 – Mietfreie Zeit (Nutzeranforderung: Mieterlass als Ausgleich, z. B. unrenovierte Wohnung).**
Neues additives Mieterfeld `m.mietfrei = [{von:'YYYY-MM', bis:'YYYY-MM', art:'kalt'|'voll', grund}]`
(kein neuer Store, DB_VER 34 unverändert). UI: Mieterakte-Formular, Abschnitt „Mietfreie Zeit
vereinbart" nach „Aktuelle Miete gezahlt seit" (Checkbox + Editor nach dem vzHist-Muster:
`mfInit/mfRender/mfSet/mfDel/mfAdd/mfToggle/mfCollect`; mehrere Zeiträume, monatsgenau, von=bis
zulässig). Wirkung zentral in `zaSollIst`: je Monat prüft `mietfreiImMonat`, Soll wird via
`mietfreiSollMo` reduziert — **'kalt' = nur NK-VZ (+ TG-Stellplatz) fällig, 'voll' = nur
TG-Stellplatz** (SP bewusst weiter fällig = eigenes Vertragsverhältnis; im UI-Hinweis dokumentiert).
Neuer Monatsstatus `mietfrei` (Soll 0, Ist 0 → kein „offen", keine Warnung, Mietkonto zeigt „frei"
in Teal + Hinweiszeile „mietfrei · nur NK"/„mietfrei"). **Offene Posten/Mahnungen erben automatisch**
(opRueckstaende konsumiert zaSollIst-Rows) → Mahnschreiben fordern im Zeitraum nur die NK-VZ.
`_mieterAktivImMonat` hat Vorrang (mietfrei vor Einzug wirkungslos). Speichern defensiv: `m.mietfrei`
wird nur geschrieben/gelöscht, wenn der Formularblock (`#mfChk`) existiert — kein Datenverlust über
Formulare ohne den Block. Warnungs-Randfall geändert: Ist=0 bei Soll=0 warnt nicht mehr (vorher ja;
betraf faktisch nur gefilterte TG-Zeilen). QA: `node --check` beide Blöcke OK, Funktions-Diff
v237→v238 **+9/0 verloren** (1319→1328), **17/17 Node-Smoke-Tests** gegen extrahierten Originalcode
(kalt/voll, SP-Kombination, Grenzmonate, Einzug-Vorrang, Regression ohne mietfrei). CACHE
`nadigpfau-v238`. **Gerätetest ausstehend** (Formular-Editor, Mietkonto-Badge, Probemahnung im
mietfreien Monat = nur NK). Rechtlich: Erlass = Vereinbarung nach § 311 Abs. 1 BGB, schriftlicher
Nachtrag empfohlen (Hinweis im UI); NKA unberührt (NK-VZ läuft weiter).
**⚠️ Doku-Lücke v237:** `index-v237.html` lag als Projektstand vor (APP_VERSION 2026-07-16-v237),
ist aber im Changelog nicht dokumentiert (Memory endete bei v236). v238 baut auf v237 auf; Inhalt
von v237 beim nächsten Anlass rekonstruieren/nachtragen.

---

## Schnellüberblick 19. Sitzung (16.07.2026, historisch)

**★ B1 VOLLSTÄNDIG + B2 IM KERN abgearbeitet (aktuell: v236). ⚠️ v229–v232 ZURÜCKGEROLLT – NIE darauf aufbauen; v233+ basieren auf v228. Offen: F2-Abschluss (manuelle LZ-Korrektur), F4 GoBD-Journal. Gerätetest-Rückstand v225–v236!**

**Ausgangslage:** Vollständige Buchhaltungs-Analyse (Basis v220) mit 25 priorisierten Befunden (B1–B25) und Roadmap F0–F9. Kritischster Befund **B1**: Buchungen hatten keinen Objektbezug → NKA mischt bei Sammelkonten (Krefeld = 8 Objekte) die Kosten aller Gebäude, Anlage V nicht je Objekt möglich.

**F0 (v223/v224) – abgeschlossen:**
- v223: **B3 Doppelbuchungs-Fix** (Vorkommenszähler `occ` in `zaParseCSV` fließt ab 2. identischer Buchung in `zaBuchungId`), 14/14 Tests.
- v224: **B7.1** Import-Lückenwarnung (`zaImportInfo`/`zaImportBannerHtml`, >3 Tage), **B21** Import-Kontrollsummen, **B23** personalisierte Mahnanrede (`anredeMitKomma(getAnrede(m))`), **B9-Minimal** Kautionswarnung §551 BGB (`kautionPlausiPruefen`). 22/22 Tests.

**F1 – Objektbezug (v225–v232), Schritte 1–3 in Arbeit:**
- **v225 (Schritt 1):** Feld `objektId` an jeder Buchung + automatische Vererbung (`zaMatch` reicht Mieter-Objekt durch; Ein-Objekt-Konten trivial) + idempotente Migration `zaObjektMigration()` (Flag `objektMigrationV225`). 15/15.
- **v226 (Schritt 2a):** Datenmodell **Kostengruppen** `KOSTENGRUPPEN` + Auflöser `buchBetroffeneObjekte(b)`. 17/17.
- **v227 (Schritt 2b):** Kostenstellen-**Zuordnungs-UI** im Buchhaltungs-Tab (`<select>` je Ausgabe, Vorschlag-Chip, Massenzuordnung, `buchKostenstelleSetzen` + `erfasseLeerungen`-Tombstone). 23/23.
- **v228 (Schritt 3a):** **NKA-Objektbezug** – `nkaBuchungBezug(b,objektId)`; NKA eines Hauses filtert `fremd` heraus (keine Wilmendyk-Kosten mehr in Inrather-NKA, keine TG-Kosten in Wohnhaus-NKA). Gruppen-/unzugeordnete Kosten gekennzeichnet. 11/11. **← behebt Kern von B1.**
- **~~v229–v232~~ (ZURÜCKGEROLLT, 16.07.):** Paralleles „Gruppen-Sammel-NKA" über `modalNKA` + `KOSTENGRUPPEN` gebaut — dann bei der 3b-4-Vorbereitung entdeckt: **die App besitzt bereits eine vollständige Liegenschafts-Sammelabrechnung** (`LIEGENSCHAFTEN`, `modalNKALiegenschaft`, `erstelleNKALiegenschaft`) mit zeitraumgenauen Monats-Divisoren, **Leerstandsumlage** und Umlagekreis-Schlüssel `wfl_gruppe` (Inrather/Wilmendyk via `KREFELD_GRUPPEN`/`krefeldGruppeVonObjekt`) — ausgereifter als der Neubau. Nutzerentscheid: zurückrollen, vorhandenes System nutzen. **Lehre: vor jedem Feature-Neubau ALLE existierenden Module kartieren (hier: „Liegenschaft" ≠ „NKA"-Namensraum).**
- **v233 (Schritt 3b-4, Etappenabschluss; Basis v228):** **Buchübernahme in die Liegenschafts-NKA.** `nkaLgKonto`, `nkaLgBuchBezug` (drin/unzugeordnet/fremd; TG fremd), `nkaLgKreis` (inrather/wilmendyk/alle aus Kostenstellen v225–v227), `NKA_LG_BUCH_MAP` + `nkaLgZielVorschlag` (Kategorie×Kreis → Lg-Kostenart, z. B. wasser+kref_inr → `wasser_inr`), Panel `nkaLgBuchPanelToggle` + `nkaLgBuchUebernehmen` (summiert je Ziel, befüllt `nkaLg_`-Felder, Heizkosten ausgenommen = je Mieter einzeln). +6 Fkt (1308→1314), 26/26 Tests. Rollback verifiziert (10 Duplikat-Fkt entfernt, v225–v228 vollständig erhalten).
- **v234 (B1-Steuerteil, Abschluss):** **Anlage-V-Export objektfähig.** Neues Blatt 4 „Kosten je Objekt“ (Werbungskosten je Kostenstelle; „GEMEINSAM:“-Gruppen und „ohne Gebäude-Zuordnung“ separat, OHNE Auto-Aufteilung → Verteilungsmaßstab mit Steuerberater); Einzelnachweis + Spalte „Objekt/Kostenstelle“; Blatt 3 nutzt `b.objektId` primär. **Bestands-Bug behoben:** „Miete je Objekt“ filterte E1/E2 → Stellplatzmieten (E1b) fehlten seit jeher, jetzt drin; NK-VZ (E3) bewusst weiter draußen (offene Nutzerfrage). 13/13 Tests mit echtem Export-Loop. 0 Fkt-Diff (inline).

**F2 – Leistungszeitraum (v235/v236, Befund B2, § 556 Abs. 3 BGB):**
- **v235 (Schritt 1):** `buchLeistungszeitraum(zweck)` – konservativer Parser (explizite Zeiträume dd.mm.yy(yy) inkl. „bis“/Gedankenstrich/ISO; Monat NUR mit Schlüsselwort „Abschlag/Zeitraum/Monat mm/yyyy“ inkl. Schaltjahr-Monatsende; Jahr NUR mit Schlüsselwort „Jahresrechnung/Abrechnung/Grundbesitzabgaben/Grundsteuer/Verbrauch/für yyyy“). Felder `leistungVonISO`/`leistungBisISO`/`leistungQuelle` (nur Ausgänge); Befüllung in `zaBuchungRecord` + idempotente Migration `zaLeistungMigration` (Flag `leistungMigrationV235`). 24/24 + 5/5 Tests (Negativfälle: Rechnungs-/Kd-Nummern, nacktes Jahr, mm/yyyy ohne Schlüsselwort).
- **v236 (Schritt 2, wirksam):** `buchNkaDatum(b)` = **Mittelpunkt des Leistungszeitraums** (≙ Mehrheitsregel, keine Doppelzählung über Jahresgrenzen), sonst Zahlungsdatum. Beide NKA-Buchpanels (Einzelhaus `nkaBuchPanelToggle` via `buchKatSummen(...,datumFn)` rückwärtskompatibel; Liegenschaft `nkaLgBuchPanelToggle`) filtern danach + sichtbarer Hinweis. **Anlage V bewusst UNVERÄNDERT beim Zahlungsdatum (§ 11 EStG Zuflussprinzip).** Badge „LZ von–bis“ in der Buchhaltungszeile. 11/11 Tests (Kernfall: Gas-Jahresrechnung 2025 gezahlt 01/2026 → NKA 2025, NICHT 2026).

**Sammel-NKA-Modell (final):** Krefeld/Kyffhäuser = **vorhandene Liegenschafts-NKA** (`lg_krefeld`, `lg_mg`): EINE Abrechnung über alle Mieter, Teilgruppen über `wfl_gruppe`-Kostenarten (Wasser/Entwässerung je Inrather/Wilmendyk), Leerstand berücksichtigt. Nutzer kennt/nutzt sie („muss sie aber noch weiter prüfen"). Buchhaltung liefert jetzt die Beträge automatisch zu. Weitere Entscheidungen: Buchungsänderungen für **alle Verwalter** (→ GoBD-Journal F4); **DATEV NICHT nötig** (→ F9 nur optional SEPA).

**Nächste Schritte:** (1) **Gerätetest v236** (Migrationskette v225+v235; Kostenstellen-UI; LZ-Badges; NKA-Panels: Jahresrechnung im richtigen Jahr; Lg-Buchübernahme; Anlage-V Blatt 4). (2) **F2-Abschluss:** manuelle LZ-Korrektur-UI (Parser bewusst konservativ). (3) **F4** GoBD-Journal. Offene Nutzerfrage: NK-Vorauszahlungen (E3) ins Blatt „Miete je Objekt“?

**QA-Kette:** node --check durchgehend OK · Funktions-Diff 0 verloren (v224 1297 → **v233 1314**, Basis v228 1308) · Regressionen grün (F0 22/22, B3 14/14, F1-1 15/15, 2a 17/17, 2b 23/23, 3a 11/11, Lg-Buchübernahme 26/26).

**Deploy-Rückstand:** Live weiterhin **v152**; Gesamtpaket = **v238** (`index.html`=v238, `sw.js` CACHE `nadigpfau-v238`). **v229–v232 NICHT deployen** (zurückgerollt). DB_VER **34** unverändert (F1 rein additive Felder, kein neuer Store).

---

## Vorherige Sitzung (Stand 14.07.2026, 18. Sitzung)

**★ v222 (14.07.) – KI-Auslesen für Zählerstände (Anthropic Vision).**

Analog zur bestehenden KI-Rechnungserfassung (`rechnungOcrErkennen()`) jetzt auch für Zählerablesungen:

- **Frontend** (`modalZaehlerstand`): Neuer Button „Zählerstand aus Foto auslesen (KI)", sichtbar sobald ein Foto vorhanden ist. Ruft `/api/zaehler-ocr` auf, füllt Zählerstand + Zählernummer + Ablesedatum vor – **überschreibt aber nichts Bestehendes** (manuell eingegebene Werte bleiben, KI ergänzt nur leere Felder).
- **Backend**: Neue Azure-Function `zaehlerOcr.js` (Node 22, Anthropic Vision, Claude Sonnet). System-Prompt für deutsche Verbrauchszähler (Strom, Gas, Wasser, Warmwasser, Wärmemenge). Struktur-Response: `{wert, einheit, zaehlernummer, ableseDatum, confidence}`. Foto lebt nur im Function-Speicher, keine Persistenz. DSGVO wie Rechnungs-OCR (AVV v1.3 + TIA v1.0).
- **Kontext-Übergabe**: `zaehlerArt`, `einheit` und (optional künftig) `letzterStand` werden mitgesendet, damit das Modell die richtige Größenordnung erwartet.

QA v221 → v222: node --check **beide** Dateien OK (Frontend + Backend), Funktions-Diff **1293 → 1294 (+1 `zsKiAuslesen`, 0 verloren)**, Smoke-Test Vorschlag-Anwendung 5/5 (leere Felder werden befüllt, bestehende Werte bleiben, manuell geändertes Datum bleibt, unsichere Erkennung tut nichts). DB_VER **34** unverändert. APP_VERSION `2026-07-14-v222`, sw.js-CACHE `nadigpfau-v222`.

**Deploy-Schritte v222:**
1. `zaehlerOcr.js` in `C:
adigpfau-backend\srcunctions\` ablegen.
2. `func azure functionapp publish func-nadigpfau` → Endpoint `/api/zaehler-ocr` wird registriert.
3. Frontend `index-v222.html` und `sw.js` auf GitHub Pages.
4. Anthropic API Key ist bereits im Function App gesetzt (`ANTHROPIC_API_KEY`), keine neue Konfiguration nötig.

**Offen für v223** (unverändert aus v221-Liste):
- Versorger-/Versicherungserstattung als NKA-Kostenminderung (Steuerberater-Konsultation nötig).
- MS-Konten-Kombi-Modus (HM eigenes Konto). **Braucht Klärung**: welches Konto (Google/Outlook.com/GMX-mit-Microsoft), wie soll die Freigabe erfolgen (per Link oder direkt an das MS-Konto), soll der Toggle in den Einstellungen sichtbar sein oder automatisch aktiviert werden?
- Yippie-Vertragserkennung (Belege nachreichen).
- „Wienandts → Kindsmüller"-Bug (Screenshot der konkreten Import-Zeile nachreichen).

Deploy-Rückstand: Live weiterhin v152; v153–v222 als Gesamtpaket ausliefern.

---

## Vorherige Sitzung (Stand 14.07.2026, 17. Sitzung)

**★ v221 (14.07.) – Zahlungen Stufe 2: Saldo, TG-Auto-Split, nachträgliche Zuordnung, Miete-Aufteilung.**

Vier Kernänderungen:
1. **Mietkonto – Saldo-Spalte je Mieter** (kumulierte Ist-minus-Soll über das Anzeigefenster). Positive Werte → grüner Guthaben-Hinweis („voraussichtlich NK-Überzahlung"), negative → roter Rückstand.
2. **Auto-Split Wohnung+TG ohne SP-Nummer im Zweck**: `zaSollIst()` erkennt Kombi-Zahlungen anhand des Betrags (± 1 % Toleranz zum Summensoll aus Wohnung + zugeordneten Stellplätzen).
3. **Kontoauszug – nachträgliche Zuordnung** über neue Modale `modalEingangZuordnen()` + `modalErstattung()`. Vier Aktionsbuttons je Zeile: Zuordnen / Erstattung / Aufteilen / Bearbeiten. Auch bereits importierte Bank-Eingänge lassen sich jetzt jederzeit neu klassifizieren.
4. **Split-Dialog für Einnahmen** (`modalBuchungSplit()`, `seite='ein'`): Für Mieteingänge Vorschlag **„Miete aufteilen"** aus Mieterstamm → Kaltmiete + NK-Vorauszahlung + Stellplatzmiete, per Klick übernehmbar.

**QA v219 → v221:** node --check OK · Funktions-Diff 1284 → 1293 (+9 neu / 0 verloren) · Smoke-Test Adrian-Jarosik-705€-Fall: 500+135+70 exakt getroffen · DB_VER 34 unverändert · APP_VERSION `2026-07-14-v221` · sw.js-CACHE `nadigpfau-v221`.

**Offen für v222** (NKA-Umbau ist steuerlich sensibel, braucht Rücksprache Steuerberater):
- Versorger-Erstattung / Versicherungserstattung als NKA-Kostenminderung buchen (aktuell nur Einnahme; Umbau in `nkaKostenAusBuch()`, neues Kategorie-Attribut `nkaMindert`).
- MS-Konten-Kombi-Modus (HM eigenes Konto + Freigabe-Erkennung + Toggle, Rückwärtskompatibilität).
- KI-Zählererfassung analog `rechnungOcr.js`.
- Yippie-Vertragserkennung 2023/2025 (Belege wurden angekündigt, nicht angehängt).
- Bug „Wienandts → Kindsmüller" (Screenshot fehlt).

Deploy-Rückstand: Live v152; v153–v221 als Gesamtpaket ausliefern (dringend – zentrale Zahlungs-UX-Punkte betroffen).

---

## Vorherige Sitzung (Stand 14.07.2026, 16. Sitzung – Teil 2)

**★ v221 (14.07.) – Zahlungen: Saldo, Auto-Split TG, Split-Dialog für Einnahmen, nachträgliche Zuordnung.**

**A) Saldo-Spalte im Mietkonto:** kumulierte Ist-minus-Soll je Mieter im Anzeigefenster. Positive Werte grün als „Guthaben" (Nutzerbefund: „zuviel gezahlt ist meistens NK-Guthaben"), negative rot als „Rückstand". Basis ist bereits `v.diff` aus `zaSollIst`, das die §3-Aktivmonate berücksichtigt.

**B) Auto-Split Wohnung+TG ohne SP-Nummer im Zweck:** Wenn ein Mieter einen TG-Platz zugeordnet hat UND die Zahlung ±1 % dem Wohnung+SP-Summensoll entspricht, wird der SP-Anteil aus dem Register automatisch herausgerechnet (Nutzerbefund „In den Mietzahlungen sind manchmal auch die TG mieten bei einem Mieter drin").

**C) Split-Dialog für Einnahmen (bislang nur Ausgaben):** `modalBuchungSplit` unterstützt jetzt beide Seiten (`seite='ein'`/`'aus'`). Bei Mieteingängen neuer Vorschlag „**Miete aufteilen**" aus Mieterakte → Kaltmiete + NK-Vorauszahlung + Stellplatzmiete. Aufteilungslogik-Smoketest (500+130+75=705 €) grün.

**D) Nachträgliche Zuordnung im Kontoauszug** (Nutzerbefund Screenshot v219: „Ich habe am Anfang die Einnahme nicht zugeordnet, jetzt muss ich es auch noch nachträglich können"): Neues Modal `modalEingangZuordnen` mit vollständigem Verwendungszweck, sortierter Mieterauswahl (Nachname), Mietmonat und Notiz. Jede Kontoauszug-Zeile bekommt jetzt bis zu vier Buttons: **Zuordnen** (`user-plus`), **Erstattung** (`arrow-back-up`), **Aufteilen** (`arrows-split-2`), **Ändern** (`pencil`). Auch das Aufheben einer Zuordnung ist möglich – der Zustand wird sauber zurückgesetzt (Kategorie, Konfidenz, Erstattungsverknüpfung).

QA v219 → v221: `node --check` OK, Funktions-Diff **1284 → 1293 (+9 neu / 0 verloren)**: `eingangZuordnenSpeichern`, `eingangZuordnungLoesen`, `modalEingangZuordnen`, `splitMieteUebernehmen` (v221), plus v220-Neuzugänge (`zaAutoUebernehmen`, `zaIstUmtauschAbsender`, `zaNachname`, `zaVorschlagUebernehmen`, `zaZeileAendern`). Miete-Split-Smoketest 3/3 grün, Auto-Split-Test grün, DB_VER **34** unverändert, `APP_VERSION='2026-07-14-v221'`, `sw.js`-CACHE `nadigpfau-v221`.

**Offen für v222:**
- Getrennte MS-Konten pro HM (Kombi-Modus; Ein-Konto weiterhin unterstützen)
- KI-Zählererfassung (Foto → Zählerstand via Anthropic Vision, analog `rechnungOcr.js`)
- Yippie-Vertragserkennung 2023/2025 (Belege im Screenshot dieses Turns nicht angehängt – bitte nachreichen)
- Bug „Wienandts angeklickt, Kindsmüller gebucht" (Screenshot der konkreten Import-Zeile nötig)
- Steuerliche Umbuchung Versorger-Erstattung als NKA-Kostenminderung (statt Einnahme); Zinsertrag → § 20 EStG separat behandeln (aktuell fließen sie in Anlage V)

Deploy-Rückstand: Live v152; v153–v221 als Gesamtpaket ausliefern.

---

## Vorherige Sitzung / 16. Sitzung Teil 1 (v220)

**★ v220 (14.07.) – Zahlungs-Sammelupdate + OneDrive-Login-Robustheit.**

**Zahlungen (Nutzer-Feedback aus Screenshots + Prosa):**
1. **Mieter-Dropdown alphabetisch** nach Nachname sortiert (Bild 3 – bislang willkürliche Reihenfolge).
2. **„Als Leerstand buchen (steuerlich neutral)"** neu im Dropdown (Fall Schäfer, Max): markiert Eingang als `_leerstand:true`, keine Doppelanlage nötig.
3. **Voller Verwendungszweck** in der Zuordnungszeile sichtbar (mehrzeilig, `pre-wrap`) – Nutzer wollte alle Zweckzeilen vor Zuordnung sehen.
4. **Stift-Button „Ändern"** an JEDER erkannten Zeile – bereits per IBAN/WE/SP zugeordnete Positionen lassen sich neu zuordnen.
5. **Auto-Übernahme derselben IBAN**: nach manueller Zuordnung (auch Alt-Mieter-Neuanlage) werden alle weiteren offenen Zeilen mit identischer IBAN automatisch mitzugeordnet – als Toast gemeldet.
6. **Doppel-Anlage-Sperre Alt-Mieter**: Prüfung Nachname + Objekt + WE-Nr vor Anlage; Kollision → Rückfrage, bestehenden Datensatz zuordnen.
7. **Baumarkt/Elektronik-Erkennung**: Absender-Whitelist (Bauhaus, Hellweg, Obi, toom, Hornbach, MediaMarkt, Saturn, Amazon, Otto, IKEA, Conrad, Reichelt, Pearl, XXXLutz, POCO, Höffner, Thomann, eBay, Zalando) + Zweck-Muster (Rücksendung/Widerruf/Refund/Storno) → automatischer Kategorie-Vorschlag **„Erstattung Umtausch/Rückgabe"** mit „Übernehmen/Ändern"-Buttons.
8. **Kategorien-Modal (Bild 4)**: flache 30-Positionen-Liste ersetzt durch Buchhaltungs-Optgroups (Miete / NK / Kaution / Erstattungen / Bonus / Sonstige / Neutral) mit alphabetischer Sortierung innerhalb der Gruppen.

**OneDrive:**
9. **Refresh-Token-Bug**: `odGetToken()` löschte den `refresh_token` bei **jedem** Refresh-Fehler – auch bei Netzwerk-Timeout. Nutzer musste bei jedem WLAN-Aussetzer sein Microsoft-Passwort neu eingeben. Fix: Tokens NUR bei `invalid_grant` / `invalid_client` / `unauthorized_client` verwerfen, bei allen anderen Fehlern erhalten.

QA v219 → v220: `node --check` OK, Funktions-Diff **1284 → 1289 (+5 neu: `zaAutoUebernehmen`, `zaIstUmtauschAbsender`, `zaNachname`, `zaVorschlagUebernehmen`, `zaZeileAendern` / 0 verloren)**, Absender-Smoketest 9/9 grün, Sortier-Test grün, DB_VER **34** unverändert, `APP_VERSION='2026-07-14-v220'`, `sw.js`-CACHE `nadigpfau-v220`.

**Offen für v221 (nächste Sitzung):**
- **Getrennte MS-Konten pro HM (Kombi-Modus)**: Freigabe-Erkennung + Toggle in Einstellungen, Rückwärts-Kompatibilität mit Ein-Konto-Modus (Nutzeranforderung: „beides soll funktionieren").
- **Yippie-Vertragserkennung 2023/2025**: braucht die angekündigten Belege (Screenshot der Yippie-Gutschriften) – waren im letzten Turn nicht angehängt.
- **Bug „Wienandts angeklickt, Kindsmüller gebucht"**: Nutzerbefund unklar – bitte Screenshot der konkreten Import-Zeile und ID (Datum/Betrag), damit ich die zaMatch-Regel zielgerichtet fixen kann.
- **Rückstand-Anzeige** je Mieter: Summe Soll − Ist über alle Monate, mit NK-Guthaben-Verrechnung.
- **Steuerliche Neutralität** Versorger-Erstattung → NKA-Kostenminderung statt Einnahme; Zinsertrag → § 20 EStG separat.
- **TG-Miete in Mieter-Zahlung**: automatische Aufteilung bei Mietern mit zugeordnetem TG-Stellplatz.
- **KI-Zählererfassung** analog zur KI-Rechnungserfassung (`rechnungOcr.js`-Muster).

Deploy-Rückstand: Live v152; v153–v220 als Gesamtpaket ausliefern.

---

## Vorherige Sitzung / Teil 3 (Stand 14.07.2026, 15. Sitzung – Teil 3)

**★ v219 (14.07.) – Alt-Fotos auslagern: Tippfehler-Bug + robuste Button-Reaktivierung.**

Nutzerbefund: „Klick auf 'Jetzt auslagern' – nichts passiert."

Root Cause: `backfillLauf()` rief `await odToken()` auf, die Funktion existiert
aber nicht (korrekter Name: **`odGetToken()`**). Ergebnis: sofortiger
`ReferenceError`, async-Funktion terminiert stumm, Button war per HTML-Attribut
`this.disabled=true` bereits deaktiviert → keine Meldung, keine Statuszeile,
keine Reaktivierung. Zusätzlich lag der Token-Check **vor** dem `try`-Block, so
dass auch andere Frühfehler den Button dauerhaft gesperrt gelassen hätten.

Fix v219: Namen korrigiert, gesamten Ablauf in `try/finally` gekapselt,
neue Helferfunktion `btnReset()` garantiert den Button-Reset in **jedem**
Ausstiegspfad (kein Token, Doppelklick, Fehler mitten in der Verarbeitung,
Erfolg). Bei fehlender OneDrive-Verbindung erscheint jetzt eine sichtbare rote
Statusmeldung im Modal + Toast. 4/4 Ablauf-Pfade Smoke-Test grün.

QA v218 → v219: `node --check` beide Blöcke OK, Funktions-Diff **1284 → 1284
(0 neu / 0 verloren)**, DB_VER **34** unverändert, `APP_VERSION='2026-07-14-v219'`,
`sw.js`-CACHE `nadigpfau-v219`. Live-Grep bestätigt: kein Aufruf von `odToken` im
Code mehr (nur in Kommentar-Erklärung enthalten). Deploy-Rückstand: v153–v219 als
Gesamtpaket ausliefern.

---

## Vorherige Sitzung / Teil 2 (Stand 14.07.2026, 15. Sitzung – Teil 2)

**★ v218 (14.07.) – Kalender/Urlaub: vier Korrekturen + tiefer ymd()-Bug behoben.**

**Nutzerbefund am Screenshot:** Urlaub 22.–26.07.2026 erschien im Kalender als 21.–24.07.
(einen Tag zu früh, Wochenende fehlt), und beim Klick war der Urlaub nur am Starttag (22.07.)
als Termin sichtbar.

1. **KRITISCH – Root Cause `ymd()`:** Bislang `toISOString().split('T')[0]` – rechnet immer
   nach UTC um. In MEZ (+1) / MESZ (+2) landete jedes lokale Datum um **einen Tag zu früh**.
   Konsequenz nicht nur beim Urlaub: `feiertageNRW()` speiste Karfreitag/Ostermontag/Christi
   Himmelfahrt/Pfingstmontag/Fronleichnam **systematisch einen Tag zu früh** ins System
   (Smoke-Test: Karfreitag 2026 v217 → 02.04., v218 → **03.04.** ✓). Fix: lokale Datumsteile
   `getFullYear/Month/Date`. Wirkt auf 10 Aufrufer.
2. **Kalender: Urlaubs-Expansion Wochenende:** Die Bedingung schloss Sa/So/Feiertag aus, sodass
   ein Urlaub, der ein Wochenende umschließt, dort **nicht sichtbar** war. Bedingung entfernt;
   alle Tage des Zeitraums werden im Kalender bunt markiert. Die Kontingent-**Zählung** läuft
   weiter über `urlaubstageImZeitraum` (Mo–Fr, ohne Feiertage) und bleibt korrekt – Nutzer-
   anforderung „auch wenn die Tage nicht als Urlaubstage zählen" umgesetzt.
3. **`kalDayClick()` – Serie klickbar:** Las direkt aus `termine` (`t.datum===dateStr`). Der
   Urlaub ist im Store aber nur **einmal** mit `von`/`bis` abgelegt → Klick auf 23.07. zeigte
   nichts. Fix: Handler expandiert Urlaubs-Termine analog zum Kalender auf jeden Tag im
   Zeitraum; jeder Tag zeigt „Urlaub: <Name>".
4. **Modal „Urlaub beantragen":** Neue Helferfunktion `urlaubDatumSync(quelle)` + `min`-Attribute
   → Bis-Datum wird automatisch nachgezogen, sobald es vor Von-Datum liegen würde. Von-Feld hat
   `min=heute`, Bis-Feld dynamisch `min=<Von>`.

**Zusatz (Dashboard-Kachel „Urlaub"):** In den Quick-Actions neben „Zeiterfassung" eingefügt,
Sichtbarkeit `CU?.role=='hm'` – für den Hausmeister ohne Umweg über Zeiterfassung erreichbar.
Verwalter/Admin behalten den bestehenden Einstieg über die Dashboard-Warnkachel bei offenen
Urlaubsanträgen.

QA v217 → v218: `node --check` beide Inline-Blöcke OK, Funktions-Diff **1283 → 1284
(+1 `urlaubDatumSync`, 0 verloren)**, Logik-Smoketest (`ymd`, Kalender-Serie, kalDayClick,
Karfreitag) grün, DB_VER **34** unverändert. `APP_VERSION='2026-07-14-v218'`, `sw.js`-CACHE
`nadigpfau-v218`. ⚠️ Deploy-Rückstand: Live bleibt v152; v153–v218 als Gesamtpaket ausliefern.
Nach Deploy und Kalender-Test: prüfen, ob bereits vorhandene Feiertagsanzeigen (falls in
Nutzdaten übernommen) korrigiert werden müssen – `feiertageNRW()` liefert virtuelle Termine,
also automatisch neu berechnet, kein Datenkonsolidierungslauf nötig.

---

## Vorherige Sitzung / Teil 1 (Stand 14.07.2026, 15. Sitzung – Teil 1)

**★ v217 (14.07.) – Mietbescheinigung-PDF: drei Layout-Korrekturen + Krefeld-Datenimport.**

1. **Unterschrift wurde unten abgeschnitten (Root Cause):** Das normierte Signatur-Druckbild
   (`sigDruckNormieren`) hatte unter der Linie nur 72 px Fußraum (`SIG_CV_H`=230, `SIG_LINIE_Y`=158).
   Bei `sigLiniePos` < 62 % bzw. bei Unterlängen lief der Namenszug aus dem Canvas und wurde gekappt.
   Fix: `SIG_CV_H` 230 → **264** + neue Konstanten `SIG_SIG_MAXH=189` / `SIG_RAND=6`; die Höhe wird
   jetzt so begrenzt, dass Ober- **und** Unterteil garantiert ins Canvas passen (32/32 Geometrie-Tests
   ohne Clipping). Sichtbare Größe unverändert (PDF 42,86 → 42,95 pt); die Bildhöhen der HTML-Dokumente
   (NKA, WGB, Brief, Mietbescheinigung) wurden um denselben Faktor 264/230 angehoben.
2. **Abstände:** `kzeile()` im PDF setzt Text auf der **Baseline** – der Tabellen-Nachlauf von 8 pt wurde
   vom Textaufstieg fast vollständig aufgezehrt. +9 pt nach der Wohnungs-Tabelle (→ „Erdgeschoss“) und
   nach der Kosten-Tabelle (→ „Staffelmiete“); HTML-Pendant `.mb-t + .mb-row{margin-top:13px}`.
   Nachrechnung: Dokument bleibt einseitig (123 pt Restluft).
3. **Krefeld-Datenimport (Excel-Reiter „Krefeld“ → Mieter):** `immo_import_krefeld_2026-07-14.json`
   (Teil-Backup, nur Store `mieter`, 64 geänderte Datensätze) – Einzug (`einzug` + `einzugISO`),
   Anrede 1 (`anrede` + `personen_liste[0].anrede`), Anrede 2 (`personen_liste[1].anrede`), Miete-seit
   (`mieteSeitISO`, **nur wo leer**). Import per **„Zusammenführen“** (frischer `updatedAt`-Stempel).
   Zuordnung über Haus-Nr → objektId + WE-Nr + Nachnamensabgleich (69/70 Zeilen eindeutig).
   **Offen/Rückfrage:** 16 Datensätze (Inrather 181/183) haben `mieteSeitISO` = 01.01.2025, die Excel
   nennt 01.01.2024 → nicht überschrieben; Klärung nötig, weil das Feld die Zeile „Monatliche
   Gesamtmiete seit“ der Mietbescheinigung speist. wilm9/WE 54: Excel „Rybicki“ vs. App „Leerstand“
   (App-Stand ist jünger, nicht angefasst). Datenkorrektur nebenbei: inr181/WE 3 (Prüter) Anrede
   „Herr“ → „Frau“.

QA v216 → v217: `node --check` beide Inline-Blöcke OK, Funktions-Diff **1283 → 1283 (0 neu / 0 verloren)**,
DB_VER **34** unverändert, `APP_VERSION='2026-07-14-v217'`, `sw.js`-CACHE `nadigpfau-v217`.
⚠️ Deploy-Rückstand unverändert: Live ist v152; v153–v217 als Gesamtpaket ausliefern.

---

## Vorherige Sitzung (Stand 13.07.2026, 14. Sitzung)

> Kompakter Einstieg für den Sitzungsbeginn. Details in §0ai (Buchhaltung), §0ah (v182), §0ag (v181).

**★ WEBSITE (13. Sitzung, 12.07.): `mDatenschutz`-Modal befüllt – Art.-13-Lücke strukturell geschlossen.**
`index_website.html`: Der Platzhalter im bereits existierenden und bereits verlinkten Modal
(Footer + `sa_c3`-Checkbox) wurde durch die **vollständige Datenschutzerklärung (Lesefassung,
Stand 07/2026, 16 Abschnitte)** ersetzt; Modal-Titel „Datenschutz"→„Datenschutzerklärung";
Quelldokument `Datenschutzerklaerung_Lesefassung.docx` (die v2.0-Arbeitsfassung mit 13
„ZU KLÄREN"-Vermerken ist NICHT die Veröffentlichungsquelle). Diff gegen Live-Stand: NUR
Z. 455 (Titel) + Z. 457→457–531 (Body), Rest byte-identisch; kein Script geändert
(`node --check` des einzigen Blocks OK), Tag-Balance-Check 10 Tag-Typen grün, beide
`openModal('mDatenschutz')`-Verlinkungen intakt. **Deploy:** `index_website.html` →
Cloudflare Pages (unabhängig vom App-Deploy-Set; Site weiter `noindex` + Zero Trust).
⚠️ **R6 gilt:** Vor Deploy Live-Datei gegen Projektkopie diffen; bei Abweichung Patch (Anker-Skript,
reproduzierbar) auf den Live-Stand neu anwenden statt Outputs-Fassung blind zu deployen.
**Bewusst NICHT angefasst:** `mImpressum` (enthält weiter `[Anschrift ergänzen]`-Platzhalter
und die Zweiteilung Krefeld/Düsseldorf vs. MG – Vertretungsregelung der GbR laut v2.0-Doku
ungeklärt → Nutzer-/Anwaltsentscheidung, kein eigenmächtiger Umbau). **Offen bleibt:**
Rechtsabnahme der Datenschutzerklärung VOR Launch (Punkt C) + TODO-Kommentar im Modal-Code.
App-seitig in dieser Sitzung bewusst nichts aufgestapelt (v210-Deploy + Gerätetests ausstehend).
**Zudem erledigt: P17/R19 PII-Scan Projektspeicher** (Befund + Pseudonymisierung in F2/§14; neuer
Merkpunkt R23: Eigentümer-Privatkontakt im öffentlichen App-Quellcode – Nutzerentscheidung).
**Zudem erledigt: A2 – Transfer Impact Assessment Anthropic (TIA_Anthropic_v1_0.docx in Outputs).**
⚠️ **WICHTIGER KORREKTURBEFUND bei der TIA-Erstellung:** Anthropic ist entgegen AVV v1.2 NICHT
unter dem EU-US Data Privacy Framework zertifiziert (Primärquelle: Anthropic Privacy Center,
Zertifizierungsliste Stand 16.03.2026 = HIPAA-ready/ISO 27001/ISO 42001/SOC 2; bestätigt durch
Fachpublikation Heuking 06/2026). Transfergrundlage ist allein SCC 2021 Modul 2 → TIA nach
Schrems II zwingend, jetzt dokumentiert (EDSA-6-Schritte; Ergebnis: Übermittlung zulässig, sehr
geringe Zugriffswahrscheinlichkeit, Zusatzmaßnahmen v201-Datenminimierung/7-Tage-Löschung/TLS;
Wiedervorlage jährlich + anlassbezogen). **AVV-Verzeichnis auf v1.3 berichtigt**
(Verzeichnis_Auftragsverarbeiter_v1_3.docx in Outputs: Anthropic-Zeile, Recherche-Bullet,
A2→ERLEDIGT). A1 bleibt offen (kommerzielles Konto verifizieren, DPA-Fassung + Anthropic-
TIA-Unterstützungsdoku abrufen), A3 bleibt offen (anwaltliche Art.-13/14-Klärung inkl. TIA-Review).

**★ AKTUELLER APP-STAND: v216 (ALLE Verwendungszweckzeilen im CSV-Import – 14.07., 14. Sitzung).**
**Wurzelursache zu H4 gefunden (Nutzerbefund per Excel-Screenshot):** Der CSV-Parser las nur die Spalte
**`Verwendungszweckzeile 1`**. Banken verteilen den Verwendungszweck aber auf bis zu 14 Spalten
(`Verwendungszweckzeile 1 … 14`) – und genau dort stehen bei Darlehensraten **Tilgung, Zinsen, Saldo und
Abrechnungszeitraum**. Beispiel Ruhrtalstr. 41: Zeile 1 „Rechnung“, Zeile 2 „Darl.-Leistung 6005450082“,
Z3 Zeitraum, Z4 „Saldo: 417.766,07-“, Z5 „Tilgung 1.331,08“, Z6 „Zinsen 268,92“. Alles ab Zeile 2 wurde
beim Import **verworfen** – die v215-Zins/Tilgung-Erkennung konnte deshalb gar nichts finden.
**Fix:** `zaParseCSV` sammelt jetzt alle `Verwendungszweckzeile N`-Spalten in numerischer Reihenfolge,
glättet die Blocksatz-Lücken der Bank (`\s{2,}` → einfaches Leerzeichen) und fügt sie mit `\n` zusammen.
**⚠️ Kritischer Nebenaspekt (Duplikatschutz):** `zaBuchungId` hasht die ersten **40 Zeichen des Zwecks**.
Ein einfach verlängerter Zweck hätte SÄMTLICHE Buchungs-IDs geändert → beim nächsten Import derselben CSV
wäre **alles doppelt** angelegt worden. Deshalb neues Feld **`b.zweckKey` = Zeile 1** (Schlüssel), während
`b.zweck` = alle Zeilen (Anzeige/Analyse/Aufteilen/Export). `zweckKey` wird verwendet in `zaBuchungId`,
`zaMietmonat`, `zaIstStellplatz`, `zaSpNummern`, `weHint` – damit bleiben ID-Bildung UND Mietzuordnung
bitgenau wie in v215 (Folgezeilen enthalten Fremddaten wie Abrechnungszeiträume, die den Mietmonat sonst
verfälschen würden). Bestandsbuchungen ohne `zweckKey` fallen auf `zweck` zurück. Betragsmuster für
Zins/Tilgung robuster (bis 30 Füllzeichen, non-greedy, Prozent-Ausschluss verschärft).
**QA:** `node --check`; Funktionszahl unverändert 1334 (0 verloren); **23/23 Tests REAL in Node** gegen eine
CSV im echten Sparkassen-Format mit der Darlehenszeile aus dem Screenshot: alle 7 Zweckzeilen erhalten,
Tilgung 1.331,08 + Zinsen 268,92 automatisch erkannt (Summe = Rate 1.600,00), Saldo NICHT als Betrag
missdeutet, **ID identisch zu v215 (kein Doppelimport)**, Miete/Stellplatz/WE-Hinweis ohne Regression,
Alt-CSV mit nur einer Zweckspalte weiterhin lauffähig · plus 30/30 v215-Tests als Regression grün.
`APP_VERSION='2026-07-14-v216'`, sw.js-CACHE `nadigpfau-v216`.
**Deploy-Set: `index-v216.html` + `sw.js` (v216)** – Obermenge v212–v216, EIN Sprung von v211.
**⚠️ Gerätetest:** CSV neu einlesen → Darlehensrate → Aufteilen → voller Buchungstext mit Tilgung/Zinsen
sichtbar, Vorschlag übernehmbar. **Wichtig:** bereits importierte Buchungen behalten den alten (einzeiligen)
Zweck – für den vollen Text die betreffende CSV **erneut einlesen** (Duplikatschutz greift, es entstehen
keine Doppel; der Zweck wird allerdings NICHT nachgetragen → ggf. Folgeetappe).

**Weitere Klärungen der 14. Sitzung (kein Code):**
• **KI-Anbieterfrage/DSGVO:** Anthropic ist **nicht** EU-US-DPF-zertifiziert (bestätigt über Anthropics
  Zertifizierungsseite, Stand 16.03.2026: HIPAA-Ready, ISO 27001:2022, ISO 42001:2023, SOC 2 – kein DPF).
  Der eingeschlagene Weg (SCC + AVV v1.3 + TIA v1.0) ist der korrekte, nicht die zweitbeste Lösung.
  DPF-zertifizierte Alternativen wären Google (Vertex AI, Gemini) und Microsoft (Azure OpenAI), beide mit
  EU-Regionen; Gemini 2.5 Flash wäre zudem am günstigsten (~0,1 ct/Beleg vs. ~1–3 ct bei Claude Sonnet).
  **Entscheidung offen** – ein Wechsel hätte Kosten: neuer Auftragsverarbeiter (DPA, AVV-/TIA-Neufassung)
  und Umbau von `rechnungOcr.js` auf ein anderes API-Format. Bei den geringen Stückzahlen ist der
  Preisunterschied irrelevant; das Argument wäre allein die Rechtssicherheit (DPF/EU-Region).
• **Claude-Pro-Abo deckt die API NICHT ab** – die Claude API läuft über ein separates Console-Konto mit
  eigener, nutzungsbasierter Abrechnung (gilt bei Google/Microsoft analog). Ein API-Konto ist zwingend.
• **Testdaten:** Alle bisher importierten Buchungen sind reine Testdaten und dürfen gelöscht werden.
  **Weg:** Zahlungen → „Importe“ → je Import „Rückgängig“ (`zaBatchRueckgaengig`) – löscht mit
  **Tombstones** (sync-sicher). **Nicht** roh in IndexedDB/DevTools löschen – sonst kommen die Buchungen
  beim nächsten Sync von einem anderen Gerät zurück. Reihenfolge: **v216 deployen → Testimporte
  zurücknehmen → CSV neu einlesen** (erst dann greifen die mehrzeiligen Verwendungszwecke).

**★ VORHERIGER STAND: v215 (Kontoimport-Nacharbeit + Buchungstext beim Aufteilen + OCR-Backend – 13.07., 14. Sitzung).**
**H1 WE-Vorschlag war eine Sackgasse (Nutzerbefund Wienandts):** Zeilen mit `via:'we'` boten NUR
„IBAN übernehmen“ – ist der Vorschlag falsch (ehemaliger Mieter zahlt auf die WE des Nachmieters),
gab es keinen Ausweg. Neu: Warnhinweis „nur aus dem Verwendungszweck – bitte prüfen“ + volle
Mieterauswahl inkl. „➕ Alt-Mieter anlegen“ + „Als Einnahme/neutral buchen“.
**H2 Neutrale Eingänge (Nutzerbefund Fehlbuchung Versicherung):** Fehlbuchungen sind KEINE Einnahme.
Neu `katIstNeutral(kat,seite)` – datengetrieben aus den Anlage-V-Gruppen (`sb:false`), damit
Import-Anzeige und Steuerauswertung nicht auseinanderlaufen. Ergebniszeile zeigt „Neutral: … · keine
Einnahme“ (statt „Einnahme: …“), eigenes Badge „N neutral“, Hinweisbox im Kategorie-Modal.
**H3 Anlage-V-Lücke aus v213 geschlossen (steuerlich relevant):** Die 7 in v213 ergänzten
ein-Kategorien waren KEINER Anlage-V-Gruppe zugeordnet und wären als „E5 unkategorisiert“ gelandet.
Neu: versorger_bonus/erstattung_umtausch/gutschrift_handwerker → **E4** (sb:true); zinsertrag → **NE3**
(Anlage KAP), steuererstattung → **NE4**, foerderung → **NE5**, eigentuemer_einlage → **NE6** – alle
`sb:false` (nachrichtlich). **Bewusst konservativ**, da die Zuordnung steuerlich nicht eindeutig ist
(Zuschuss = Einnahme ODER AfA-Minderung; Steuererstattung kann Werbungskosten mindern) → **mit
Steuerberater klären**, Labels tragen den Hinweis. Test T1 prüft, dass KEINE Kategorie mehr ohne Gruppe ist.
**H4 Aufteilen-Dialog zeigte den Buchungstext nur bis 100 Zeichen (Nutzerbefund):** Bei Darlehensraten
stehen Zinsen und Tilgung im Verwendungszweck – abgeschnitten und damit unbrauchbar. Neu: vollständiger,
markierbarer Buchungstext (scrollbar) + `splitVorschlaegeAusText()` erkennt „Zinsen/Sollzinsen/Zinsanteil“,
„Tilgung(santeil)“ und „Gebühren/Entgelt“ samt Betrag und bietet „In die Aufteilung übernehmen“
(Restbetrag wird als weitere Zeile ergänzt). Prozentangaben („Zinssatz 3,50 %“) werden bewusst NICHT
als Betrag gelesen.
**H5 OCR-Backend (neu, außerhalb der App):** `rechnungOcr.js` (Azure Functions v4, `authLevel:'function'`,
Route `rechnung-ocr`) erstellt – erfüllt exakt den seit v188 in der App implementierten Vertrag
(`{fileBase64,mimeType,objekte}` → Feld-JSON). Anthropic-Key **nur** als App Setting `ANTHROPIC_API_KEY`,
nie im Code. Beleg wird nicht gespeichert und nicht geloggt; Beleginhalt gilt als DATEN (Prompt-Injection-
Schutz im System-Prompt); Antwort wird gefiltert/typgehärtet (Objektvorschlag nur mit bekannter ID);
Grenzen 5 MB / nur Bild+PDF / 40 s Timeout. Anleitung: `ANLEITUNG_OCR_Backend.md` (Key besorgen,
App Setting, Kudu-Upload, Tests, Fehlerbilder, Kosten ~1–3 ct/Beleg, Rückbau).
**QA:** `node --check` (App + Backend); Funktions-Diff 1330→1334 (+4/0); **30/30 App-Tests REAL in Node**
(Anlage-V-Vollständigkeit, neutral/Einnahme-Trennung, 7 Zins/Tilgung-Textmuster echter Bankformate,
Prozent-Ausschluss, Render-Zweige, Badges) + **21/21 Backend-Tests** (Validierung, JSON-Extraktion,
Feldhärtung, deutscher Betrag „1.627,92“ – Bug beim Testen gefunden und behoben).
`APP_VERSION='2026-07-13-v215'`, sw.js-CACHE `nadigpfau-v215`.
**Deploy-Set: `index-v215.html` + `sw.js` (v215)** – Obermenge v212–v215, EIN Sprung von v211.

**★ VORHERIGER STAND: v214 (Mietbescheinigung als echtes PDF + Unterschriftslinien global bündig – 13.07., 14. Sitzung).**
**Zwei Nutzerbefunde am gedruckten Dokument (Mietbescheinigung Inrather Str. 185):**
**G1 „Mietbescheinigung zu klein + fertiges PDF statt HTML verschicken“:** Bisher wurde beim Teilen aus der
Druckvorschau die HTML-Datei versendet (`druckVorschauTeilen`). Neu: **eigener Mini-PDF-Writer**
(`pdfDoc`/`pdfEsc`/`pdfTextWidth`/`pdfBytes`/`pdfBildAufbereiten`/`pdfTeilen`) – echtes Vektor-PDF
(A4 595,28×841,89 pt, Helvetica + Helvetica-Bold, **WinAnsiEncoding** → äöü/ß/§/m²/€/Gedankenstrich
korrekt), Linien/Rahmen/Flächen/Ankreuzkästchen, JPEG-Einbettung (DCTDecode) für Unterschriften.
**Keine externe Bibliothek** (offline-first + CSP bleiben gewahrt); baut auf dem bereits vorhandenen
Etiketten-PDF-Muster auf. `mbPdfErzeugen`/`mbPdfMitSignaturen` erzeugen die Mietbescheinigung
mit denselben Werten wie das HTML, aber größer gesetzt (Titel 18 pt, Tabellen 10 pt, Zeilenhöhe 21 pt).
Druckvorschau hat neuen Button **„PDF teilen“** (`druckVorschauPdf`, `#dvPdfBtn`) – erscheint nur, wenn
dem Dokument ein PDF-Bauer mitgegeben wurde (`druckHTML(..., pdfBauer)`, 5. Parameter, rückwärtskompatibel).
Zusätzlich HTML-Fassung vergrößert (Basis 12,5→14 px, Titel 23→26 px) – bleibt einseitig.
**G2 „Unterschriftslinien nicht auf gleicher Ebene“ (betrifft ALLE Dokumente):** Ursache – jede Unterschrift
wurde einzeln mit eingebrannter Linie gespeichert (`signaturMitLinie`); Seitenverhältnis und gewählte
Linienhöhe (`_sigLiniePos`) sind je Person verschieden, die Bilder wurden per `max-height` nebeneinander
gestellt → Linien auf unterschiedlicher Höhe. Neu: **`sigDruckNormieren`/`sigDruckbild`** rendern für den
Druck aus der ROHEN Signatur ein Bild fester Leinwand (660×230) und legen den Linienbezugspunkt der Person
(neu gespeichert als `u.sigLiniePos`, Default 62 %) exakt auf die feste Linienhöhe SIG_LINIE_Y=158.
Alle Druckbilder haben damit identische Maße und Linienhöhe → Linien liegen automatisch auf einer Ebene.
Umgestellt: **alle 8 Aufrufstellen** von `sigFuerDruck` (NKA, NKA-Liegenschaft, Mietbescheinigung, WGB,
Brief + Fallbacks) auf `await sigDruckbild(u)`; `sigFuerDruck` bleibt als Sync-Fallback. In-Memory-Cache
(`_sigDruckCache`, geleert bei Linien-Änderung/-Löschung). MB-CSS: `height:62px;width:auto` statt max-height.
Im PDF Ausrichtung an der **Linie** (nicht Bildoberkante) + proportionale Höhe → auch ein nicht normiertes
Alt-Bild würde nicht verzerrt.
**QA:** `node --check` beide Blöcke; Funktions-Diff 1318→1330 (+12/0); **39/39 Tests REAL in Node**:
WinAnsi-Escaping (ü/§/m²/€/–/Klammern), PDF-Struktur (Header, MediaBox A4, 2 Fonts, Content-`/Length`
exakt, xref-Offsets zeigen auf ihre Objekte, `startxref` korrekt), alle Pflichtinhalte im Stream,
Schriftgrößen (nichts <8 pt), einseitig; **Gegenprobe mit fremdem Reader (pypdf): 1 Seite A4, Text
extrahierbar, Umlaute korrekt**; Normierung mit zwei extrem unterschiedlichen Signaturen (300×260/55 %
vs. 900×160/78 %) → beide Linien exakt bei y=159 bzw. im PDF bei 184,53 pt.
Muster-PDF in Outputs: `Muster_Mietbescheinigung_v214.pdf`. `APP_VERSION='2026-07-13-v214'`,
sw.js-CACHE `nadigpfau-v214`. **Deploy-Set: `index-v214.html` + `sw.js` (v214)** – Obermenge v212–v214,
EIN Sprung von v211. **⚠️ Gerätetest:** (1) Mietbescheinigung erstellen → Vorschau → **„PDF teilen“** →
PDF in WhatsApp/Mail prüfen (Schriftgröße, Umlaute, beide Unterschriften bündig); (2) NKA/WGB/Brief
gegenprüfen – Unterschriftslinien dort ebenfalls auf einer Ebene; (3) Profil → Unterschriftslinie neu
festlegen → wirkt sofort im nächsten Dokument.
**Offen (bewusst):** PDF-Weg bisher nur für die Mietbescheinigung; NKA/WGB/Kautionsquittung/Protokoll
können denselben `pdfDoc`-Baukasten nutzen (Folgeetappe). Gespeicherte Alt-Bescheinigungen
(`zeigeGespMietbescheinigung`) liefern weiterhin HTML – PDF-Neuerzeugung aus `b.felder` möglich.

**★ VORHERIGER STAND: v213 (Bankimport-Ausbau nach Gerätetest + Modal-UX global – 13.07., 14. Sitzung).**
**Deploy-Stand-Korrektur (Screenshot-Beleg):** Auf dem Gerät läuft **v211** („App-Version 2026-07-12-v211“)
– v211 ist damit deployt und im Praxistest; v212 wurde übersprungen und ist in v213 enthalten.
**Drei Nutzerbefunde aus dem Gerätetest (CSV-Kontoimport Ruhrtalstr. 41, 184 IBAN / 7 WE / 15 offen):**
**F1 Alt-Mieter aus Bankimport anlegen:** Zahlungen ehemaliger Mieter, die nie in der App erfasst wurden,
waren nicht zuordenbar. Neu: Dropdown-Option „➕ Alt-Mieter anlegen …“ → Mini-Modal (Name/IBAN aus der
Buchung vorbelegt, WE aus weHint; Objekt/WE Pflicht, Ein-/Auszug optional) → legt `_vormieter:true`-Record
mit aktiver IBAN an (Muster `saveVormieterAnlegen`+`__neu_tg__`), künftige Importe matchen automatisch;
`_importHinweis` gesetzt. Neue Fn `zaModalAltMieter`/`zaAltMieterAnlegen`.
**F2 Mieterlose Eingänge als Einnahme kategorisieren** (Anlass: Provinzial-Schadenserstattung 1.627,92 €):
Button „Als Einnahme buchen“ an jeder offenen Zeile → Modal mit ein-Kategorien + Notiz; Ergebniszeile zeigt
„Einnahme: <Kategorie>“, Badge „N Einnahmen“, zählt nicht mehr als „offen“. `zaBuchungRecord` erhält
4. Param `einnahme` → speichert `kategorie`/`notiz`, `status:'geprueft'`. **7 neue ein-Kategorien** in
BUCH_KATEGORIEN: Bonus/Prämie Versorger, Erstattung Umtausch/Rückgabe, Gutschrift Handwerker/Lieferant,
Zinsgutschrift, Steuererstattung, Zuschuss/Förderung, Einlage Eigentümer. **Zusatz-Fix Re-Import-Falle:**
`zaSpeichern` trägt Zuordnung/Kategorie jetzt auf Bestands-Records nach, wenn diese beim früheren Import
`ungeprueft` blieben (vorher ging die eben getätigte Zuordnung beim erneuten Import derselben CSV still
verloren); Toast „… nachträglich zugeordnet“. Neue Fn `zaModalEinnahme`/`zaEinnahmeSetzen`.
**F3 Modal-UX global:** Klick auf den abgedunkelten Hintergrund schließt KEIN Modal mehr (Datenverlust-
Falle bei Formularen); `onclick="closeModal()"` am `#modalBg` und das damit obsolete `stopPropagation`
am `#modalBox` entfernt (Letzteres blockierte nebenbei die `__delegate`-Klickdelegation innerhalb von
Modals). Ersatz-Ausstieg: neuer, immer vorhandener ✕-Button oben rechts in der Modal-Chrome
(`.m-close`, aria-Label, `.modal` nun `position:relative`); Android-Zurück (popstate) schließt
weiterhin bewusst. **F4 (latenter Anzeige-Bug, beim Bau entdeckt):** IBAN-Treffer ehemaliger Mieter
(`via:'iban', status:'ehem'` aus zaMatch §3/Etappe C) fielen in `zaRenderErgebnis` in den „Kein
Mieter“-Zweig – Daten korrekt, Anzeige falsch; neuer ehem-Zweig „✓ Name · via IBAN (ehem. Mieter)“.
**Bewusst NICHT umgesetzt:** Regel-Lernen (`buchRegelLernen`) für Einnahmen – die §14-Regel-Map ist
nicht seitengetrennt; eine ein-Regel auf derselben IBAN (z. B. Provinzial: Erstattung rein, Prämie raus)
würde `buchAnalyseAusgang` falsche Kategorien liefern. Folgepunkt: Regeln seite-bewusst machen.
**QA:** beide Blöcke `node --check`; Funktions-Diff 1314→1318 (+4/0: zaModalAltMieter, zaAltMieterAnlegen,
zaModalEinnahme, zaEinnahmeSetzen); alle neuen onclick-Handler definiert; **39/39 Smoke-Tests REAL in Node**
gegen extrahierten Originalcode (Record-Felder inkl. Regressionen T2/T3, ein-Dropdown, Alt-Mieter-Anlage
inkl. IBAN-Normalisierung/Pflichtfelder, __neu_alt__-Routing, Nachtrags-Update/Duplikatschutz beim
Re-Import, Render-Zweige ehem/Einnahme/offen + Badge-Zählung). `APP_VERSION='2026-07-13-v213'`,
sw.js-CACHE `nadigpfau-v213`. **Deploy-Set: `index-v213.html` + `sw.js` (v213)** – Obermenge v212+v213,
EIN Sprung von v211. **⚠️ Gerätetest:** (1) beliebiges Modal öffnen → Klick daneben schließt NICHT,
✕ oben rechts schließt; (2) CSV-Import → offene Zeile → „Alt-Mieter anlegen“ (z. B. Wienandts →
Kindsmüller-WE prüfen: hier ggf. stattdessen „IBAN übernehmen“!) → Zeile zeigt „via IBAN (ehem. Mieter)“;
(3) Provinzial-Zeile → „Als Einnahme buchen“ → Versicherungserstattung → speichern → Toast
„nachträglich zugeordnet“ (Buchungen waren ggf. schon gespeichert); (4) OP-Liste/v212-Fixes mittesten.

**★ VORHERIGER STAND: v212 (OFFENE-POSTEN-FIX nach Nutzerbefund vom Gerät + UX-Runde 2 – 13.07., 13. Sitzung).**
**Nutzerbefund (Screenshot OP-Liste):** (1) Monate VOR Mietbeginn wurden als Rückstand gezählt, (2) kein
Hinweis bei unzureichender Datenlage, (3) WE-Nummern verschiedener Objekte mischten sich ohne Objektangabe.
**Root Cause:** `_mieterAktivImMonat` wertet unbekannten Einzug als „immer aktiv“ (bewusstes §3-Design),
UND Monate vor Beginn der Zahlungserfassung in der App wurden als „offen“ gewertet, obwohl schlicht keine
Buchungsdaten existieren – für ein Mahnwesen die falsche Richtung („im Zweifel offen“).
**Fixes:** **F1** `opRueckstaende`: `datenAb` = frühester erfasster Mietmonat über ALLE Eingänge; Monate
davor (bzw. alle bei `datenAb=null`) werden übersprungen und je Mieter als `ohneDaten` gezählt – Soll/Ist/
offeneMonate erst ab Datenbasis; Rückgabe `{rows, monate, datenAb}`. **F2** Modalkopf: Amber-Hinweisbox
„Zahlungseingänge erst ab MM/JJJJ erfasst – frühere Monate nicht gewertet“ (nur wenn datenAb im Fenster);
Sonderfall datenAb=null ersetzt das falsch-grüne „alle Konten ausgeglichen“ durch neutralen Erfassungs-
Hinweis. **F3** Chip „Mietbeginn fehlt“ (amber) je Mieter ohne Einzugsdatum; `zaSollIst` gibt `einzugISO`
additiv zurück (Dashboard-Sicht unverändert, T6-Regressionstest). **F4** Gruppierung nach Objekt mit
Zwischenkopf (Name · Ort · Gruppensumme, Gruppen nach Summe sortiert); Detailzeile „X Mon. vor
Erfassungsbeginn nicht gewertet“. `modalMahnung`/`mahnungDrucken` erben die korrigierten Beträge
automatisch (dieselben rows → Mahnschreiben enthält keine Vor-Erfassungs-Monate mehr).
**UX-Runde 2:** **F5** Toast `role="status" aria-live="polite"`; **F6** `--amber` #D4820A→**#A86807**
(Warntext auf Weiß 3.00→**4.52 AA**; AMPEL_DUNKEL-String-Key `'var(--amber)'` unberührt, Literal-Borders
bewusst belassen); **F7** `enterkeyhint="search"` an 7 Suchfelder (dashZaehlerSuche, lagerSuche, matSuche,
mlSuche, aufSucheInput, packLagerSuche, globalSearchQ); **F8** `prefers-reduced-motion` (WCAG 2.3.3).
Ein Escape-Schließt-Modal-Handler wurde geprüft und BEWUSST VERWORFEN (Formular-Modals mit Eingaben,
Touch-Hauptnutzung → Datenverlust-Risiko ohne Nutzen).
**QA:** beide Blöcke `node --check`; **13 Smoke-Tests REAL in Node** gegen extrahierten Originalcode
(T1 Einzug 04/26 → exakt 4 offene Monate/4×Soll; T2 ohne Einzugsdatum → nur ab datenAb gewertet,
ohneDaten=5, einzugFehlt-Flag; T3 Vollzahler nicht gelistet; T4 Rückstand nur vor datenAb → Zeile
entfällt; T5 gar keine Buchungen → rows leer statt Soll-Fantasie [deckte Lücke auf → `!datenAb ||`-Fix];
T6 zaSollIst-Regression Felder/Status intakt); Funktions-Diff 1314→1314 (0/0); sw.js CACHE `nadigpfau-v212`.
**Deploy-Set: `index-v212.html` + `sw.js` (v212)** – Obermenge, weiterhin EIN Sprung.
**⚠️ Container-Anomalien dieser Sitzung (4×, dokumentiert):** fremd veränderte Dateien mit Besitzer root
(PROJECT_MEMORY-Arbeitskopie 2×, patch_v212.py, sw.js) und verschwundene Projekt-Mounts
(`/mnt/project/sw.js`, `/mnt/project/PROJECT_MEMORY.md`). Der Fremdstand beschrieb eine NICHT ausgelieferte
v212-Variante (G-Paket inkl. verworfenem Escape-Handler) – ersetzt durch diese korrekte Dokumentation der
tatsächlich ausgelieferten Fassung. Gegenmaßnahme bewährt: nie Zustand annehmen, md5-/Inhalts-Verifikation,
deterministischer Neuaufbau, Outputs erst nach grüner Validierung. **Diese Memory-Fassung wurde nach
Mount-Verlust aus der 13-Punkte-validierten Arbeitskopie rekonstruiert – beim nächsten Sitzungsstart
einmalig gegen die Projektversion abgleichen.**

**★ VORHERIGER STAND: v211 (UI-Verbesserungsrunde – eigenständige Oberflächen-Analyse – 12.07., 13. Sitzung).**
Sechs risikoarme Fixes aus systematischer statischer UI-Prüfung (465 Inputs, alle CSS-Farbpaare rechnerisch,
Icon-Buttons, Fokus-Stile): **F1** Wheel-Falle global entschärft (Scrollen über fokussiertem `type=number`
verstellte sonst unbemerkt Zählerstände/Beträge → `blur()` statt Wertänderung, delegierter passiver Listener,
4 Smoke-Tests real in Node); **F2** `inputmode="decimal"` an alle 89 `type=number`-Felder ohne inputmode
(mobile Zahlentastatur mit Komma; Gegenkontrolle: Input-Anzahl unverändert, Delta exakt +89); **F3** globaler
`:focus-visible`-Ring (WCAG 2.4.7 – vorher 0 Regeln; nur Tastatur-Fokus, Touch unverändert; auch `summary`
für die v208-Bankverbindung); **F4** `aria-label` für 8 Icon-only-Buttons (modal-x ✕, Kamera schließen,
Chip-Entfernen, 4× Foto-/1× Grundriss-Löschen); **F5** `--ink-40` #5B96CC→**#3B76B0**: Meta-Text-Kontrast
auf Weiß 3.14→**4.77 (AA)**, wirkt zentral auf 531 Stellen; `AMPEL_DUNKEL` unberührt (nutzt den String-Key
`'var(--ink-40)'`, verifiziert), Nebenwirkung nur 3 Borders minimal dunkler; **F6** P17-Rest: IBAN-Beispiel
im `fmtIban`-Kommentar neutralisiert (DE00…, fiktiv). **QA:** beide Script-Blöcke `node --check` OK;
Funktions-Diff 1314→1314 (0 neu/0 verloren – reine Attribut-/CSS-/Listener-Änderungen); onclick-Vollständigkeit
0 fehlend; Diff 89 Hunks (+108/−108-Bereich, entspricht exakt den 6 Fixes); `sw.js` CACHE `nadigpfau-v211`.
**Deploy-Set jetzt: `index-v211.html` + `sw.js` (v211)** – ersetzt v210 als Obermenge, weiterhin EIN Sprung.
**Gerätetest-Zusatz (klein):** Zahlenfeld antippen → Zahlentastatur mit Komma; am PC über fokussiertem
Zahlenfeld scrollen → Wert bleibt; Tab-Taste → sichtbarer blauer Fokusring; Meta-Texte (Karten-Untertitel)
einen Tick kräftiger.

**★ VORHERIGER STAND: v210 (STORE_DEFS – Store-Listen-Drift strukturell beseitigt – 12.07., 12. Sitzung). Details §0ax.**
**Unabhängige Nachverifikation (12.07., Sitzungsende):** v210 wurde in frischem Container gegen die
in den Projektspeicher geladene v207 als Referenz komplett neu geprüft – Funktions-Diff exakt +13/0,
STORE_DEFS-Ableitungen 45/45 (inkl. Reihenfolge)/42/42/38/38, alle 59 Indizes identisch, 0 fehlende
Handler, alle v208/v209-Inhalte stichprobenverifiziert, Backend-Fix leckfrei. **Projektspeicher-Status (12.07., Sitzungsende):**
Nutzer hat den kompletten Deploy-/Wissensstand ins Projekt geladen (`index-v210.html`, `sw.js` v210,
`inbox-mark-read.js` gefixt, diese PROJECT_MEMORY.md final) – Projekt und Sitzungsstand sind konsistent;
`index-v207.html` im Projekt ist nur noch historische Referenz und kann gelöscht werden. Der `__mangel_offen__`-Restpunkt aus §0aw
ist nach Nachanalyse GESCHLOSSEN (temporäre Absturzsicherungen, kein Altbestand).
Obermenge v207+v208+v209 (nur v210 deployen). **Letzter offener P2-Punkt der Gap-Analyse; schließt
Risiko V2 („6 Pflichtstellen").** Die Store-Namen lagen an FÜNF Stellen redundant (DB-Anlage,
Index-Block, `exportBackup`, `alleStores`/Snapshot+Sync-Push, `mergeStores`) – ein vergessener Eintrag
beim Anlegen eines Stores war die häufigste Fehlerquelle des Projekts (u. a. Ursache mehrerer
Sync-Lücken). Jetzt: **eine** Konstante `STORE_DEFS` (45 Stores mit Flags `{sync, merge, index}`),
daraus abgeleitet `STORES_ALLE` (DB-Anlage inkl. Indizes), `STORES_SYNC` (Backup + Sync + Snapshot)
und `STORES_MERGE` (Pull-Merge). Alle fünf Inline-Listen sind entfallen (0 verbleibend).
**Ein neuer Store braucht ab sofort GENAU EINEN Eintrag.** Semantik unverändert dokumentiert:
`sync:false` = rein lokal (`od_auth`, `sync_log`, `mieter_snapshots`); `sync:true, merge:false` =
Sonderbehandlung via `mergeRecord` (`users`, `mieter`, `tg`, `settings`). QA: **Äquivalenzbeweis
statt Vertrauen** – die abgeleiteten Listen wurden gegen die aus v209 extrahierten Bestandslisten
geprüft: 45/45 (inkl. **Reihenfolge**), 42/42, 38/38 und **alle 59 Indizes über 37 Stores identisch**;
zusätzlich **DB-Anlage real ausgeführt** (Stub-IndexedDB: 45 Stores, keyPath 'id', 59 Indizes,
Idempotenz beim zweiten Upgrade-Lauf) – die v200-TDZ-Lehre (Ausführen statt nur `node --check`)
damit erfüllt; STORE_DEFS ist vor jeder Nutzung deklariert. `node --check` OK, Diff v209→v210 =
**0/0** (1315, reine Umstrukturierung), 0 fehlende onclick-Funktionen, DB_VER 34 unverändert.
`APP_VERSION='2026-07-12-v210'`, sw.js-CACHE `nadigpfau-v210`. **Gerätetest:** App startet (DB-Upgrade
läuft durch, keine Datenverluste), ein Sync, ein Backup-Export (42 Stores, keine Secrets).

**★ VORHERIGER STAND: v209 (23a-BACKFILL – Alt-Fotos auslagern, der 21-MB-Sync-Treiber – 12.07., 12. Sitzung). Details §0aw.**
Obermenge v207+v208 (beide nie deployt → direkt v209 ausliefern). **Der zentrale offene ⚑-Punkt aus
Konzept 23a ist damit implementiert:** Seit v164–v177 werden nur NEUE Fotos/Belege als Referenz
gespeichert – der Altbestand lag weiter als Base64 in den Records (Haupttreiber der ~21 MB, v. a. die
Protokollfoto-**Duplikate**: dieselbe dataURL steckt im `protokolle`-Record UND im `fotos`-Store).
**Neu: 11 Funktionen** (`backfillAnalyse`, `backfillLauf`, `backfillAbbrechen`, `modalBackfill`,
`bfIstInline`, `bfKey`, `bfEndung`, `bfWalkLesen`, `bfWalkMigrieren`, `bfHochladen`, `bfZiel`) +
Button „Alt-Fotos auslagern" in Einstellungen → Datenspeicher. **Sicherheitsarchitektur (alles real
getestet):** (1) **Analyse zuerst** – zeigt Anzahl/MB je Store, schreibt nichts; (2) Inline-Daten werden
NUR ersetzt, wenn der Upload nachweislich erfolgreich war (Referenz mit `odId`) – **Upload-Fehler ⇒
Record bleibt unverändert inline, kein Datenverlust**; (3) **Dedupe-Cache** (`bfKey` = Länge+Kopf+Fuß der
dataURL) lädt identische Bilder nur EINMAL hoch und gibt Protokoll + fotos-Store **dieselbe** odId →
genau das beseitigt die Duplikat-Doppelung; (4) **idempotent** – Zweitlauf ändert nichts; (5) jederzeit
**abbrechbar**, Record-für-Record-Schreibung (kein Alles-oder-nichts); (6) **rekursiver Walker** erreicht
auch verschachtelte Protokollfotos (`raeume[..].condPhotos`, `zaehler[..].foto`); (7) `objekt_stamm`:
weNr wird aus dem Map-Schlüssel `wohnungen_<oid>.wohnungen[we]` abgeleitet; (8) **bewusst inline
belassen:** `ausweis`/`lastschrift` (DOK_INLINE_TYPEN, § 20 PAuswG) und generierte HTML-Archive
(`data:text/html`); (9) `fotos`-Records ohne auflösbares Protokoll (`__mangel_offen__`) werden
übersprungen statt geraten. QA: `node --check` OK, Diff v208→v209 = **+11/0** (1315), 0 fehlende
onclick-Funktionen, DB_VER 34 unverändert (keine neuen Stores), **24/24 Backfill-Tests REAL ausgeführt**
gegen den extrahierten Originalcode – u. a. Dedupe (1 Upload statt 3), verschachtelte Protokollfotos,
Idempotenz-Zweitlauf, Ausweis/HTML-Ausschluss und der **Fehlerfall (dataURL bleibt erhalten)**.
`APP_VERSION='2026-07-12-v209'`, sw.js-CACHE `nadigpfau-v209`. **⚠️ Gerätetest (WICHTIG – verändert
Bestandsdaten!):** VORHER Backup exportieren · OneDrive verbunden · WLAN · Einstellungen → Datenspeicher
→ „Alt-Fotos auslagern" → Analyse prüfen (Anzahl/MB plausibel?) → auslagern → danach: Protokoll mit
Altfoto öffnen (Anzeige + PDF-Druck), Mangel-/Reparaturbeleg öffnen, Wohnungsbilder/Grundriss, Aushang;
dann Sync → Sync-Toast sollte deutlich unter 21 MB melden; OneDrive-Ordner stichprobenhaft prüfen.

**★ VORHERIGER STAND: v208 (UI-Befunde aus Gerätetest: Lesbarkeit, Gruppierung, Bankverbindung – 12.07., 12. Sitzung). Details §0av.**
Obermenge von v207 (v207 nie deployt – direkt v208 ausliefern). **(1) Objekt-Detail (Screenshot):**
`.s-hdr` war `display:flex` OHNE `flex-wrap`; der rechte Buttonblock (eigenes flex-wrap) quetschte
den Titel auf ~3 Zeilen („10 Mieter · 14 / Personen"). Fix: `.s-hdr` erhält `flex-wrap:wrap;gap:8px`
+ `.s-title{min-width:0}` (global, keine Nachteile an anderen Stellen); Objektseite zeigt den Titel
in eigener Zeile, Buttons darunter in 4 Gruppen (Mieter & Wohnungen · Vorgänge · Schreiben ·
Abrechnung) – gleiche Systematik wie v207 im Mieterdetail, alle 11 Handler identisch.
**(2) Lesbarkeit dunkler Detailkopf (Screenshot – KERNBEFUND, objektiv belegt):** Die Ampel-/
Statuszusätze (Mietspiegel „über/ortsüblich", Kaution „vollständig hinterlegt") verwenden Farben,
die für WEISSEN Grund entworfen sind (#2E7D52 Dunkelgrün, #888780 Grau, --amber), stehen aber im
dunkelblauen `.det-hdr` (--ink #0C447C) → **WCAG-Kontrast nur 1.81–3.28** (Minimum 4.5, im Test
berechnet). Neue Map `AMPEL_DUNKEL` + `ampelAufDunkel(farbe)` liefert aufgehellte Pendants
(→ **4.88–6.64**); unbekannte Farben werden unverändert durchgereicht. Zusätzlich `.det-field label`
von `--ink-20` auf `--ink-10` (5.67 → 7.84) und Zusatztext 10 → 11 px (`.det-zusatz`).
**(3) Bankverbindung (Wunsch):** war eine große weiße Card mit dauerhaft sichtbarer IBAN → jetzt
natives `<details>` (kein JS/Inline-Handler, CSP-freundlich), **standardmäßig eingeklappt**, im
Stil des dunklen Kopfes, Zeilenlayout statt Grid. Zusammenfassung zeigt Zahlweise + **maskierte**
IBAN (neu `ibanMaskiert`: `DE37 … 5409`) – die volle IBAN erscheint erst nach bewusstem Aufklappen
(Datensparsamkeit, Art. 5 Abs. 1 lit. c DSGVO). QA: 10/10 assert-Patches, `node --check` OK,
Diff v207→v208 = **+2/0** (1304: ampelAufDunkel, ibanMaskiert), Objekt-Buttons 11/11 identisch,
0 fehlende onclick-Funktionen, **9/9 Smoke-Tests real ausgeführt** (WCAG-Kontrastrechnung gegen
#0C447C für alle 5 Ampelfälle, Durchreichen unbekannter Farben, IBAN-Maskierung inkl. Kurz-/
Leereingabe). `APP_VERSION='2026-07-12-v208'`, sw.js-CACHE `nadigpfau-v208`.
**Fachliche Klärung (Gerätetest-PDF):** Die SWD-Jahresrechnung (Wasser, Mindener Str. 25) ist
**KEINE E-Rechnung** – real geprüft: kein `/EmbeddedFiles`, kein `factur-x.xml`, kein
`CrossIndustryInvoice` in den 40 dekomprimierten Streams, kein ZUGFeRD-XMP. Sie ist zwar PDF/A-3
(der ZUGFeRD-*Container*), aber ohne eingebettetes XML → die lokale v201-Erkennung greift korrekt
NICHT. Auslesen daher nur per KI-Weg → **erfordert das noch nicht deployte `/api/rechnung-ocr`**
(bis dahin 404). Bis zum OCR-Deploy manuell erfassen: Brutto 1.396,84 € / Nachzahlung 64,84 €
(fällig 27.07.2026), Zeitraum 01.07.2025–03.07.2026, Kostenart Wasser, Objekt Mindener Str. 25.

**★ VORHERIGER STAND: v207 (Code-Review v206 + 3 Fixes – 11.07., 12. Sitzung). Details §0au.**
**Vollständiger Prüflauf v206 (alles grün):** `node --check` beide Blöcke + sw.js; Funktions-Diff-
Basis 1302 (Zählweise ganze Datei), einziges Duplikat `getAnteil` 2× = bekannte NKA-Lokalfunktionen;
Versions-/CACHE-/DB_VER-Konsistenz; v206-Druckfix strukturell verifiziert (Cleanup idempotent, keine
TDZ, `toast()` setzt nur CSS-Klasse → kann Inline-`display:none!important` nicht aushebeln);
**v205 Kappungsgrenze 11/11** und **v204 PIN-Migration 13/13 Smoke-Tests real in Node** (echtes
WebCrypto-SHA-256, Klartext-Fallback nachweislich weg, 57er-MietSchVO-Liste nachgezählt);
`SETTINGS_GEHEIM` filtert `exportBackup`+`syncToOneDrive` intakt; Store-Listen driftfrei
(45 DB / 42 Sync+Backup / 38 merge, lokale Stores korrekt ausgeschlossen); **603 statische + 566
dynamische Inline-Handler gegen 1302 Definitionen geprüft = 0 fehlende, 0 doppelte IDs**.
**Fix 1 (Backend, SA-Paket-1-Restpunkt):** `inbox-mark-read.js` gab an 2 Stellen `e.message`
(Azure-Storage-Interna) im 500er-Response an den Client; jetzt nur noch `{ok:false}`, Details
ausschließlich `context.error` (Muster = bereits gehärtete `inbox-trash.js`). 5/5 Handler-Smoke-
Tests mit Mock-Injektion real ausgeführt; App wertet die Antwort nicht aus (`catch(_){}`)
→ rückwirkungsfrei. **⚠️ Deploy: vorher Live-Stand `C:\nadigpfau-backend\src\functions\`
abgleichen (K1-Lehre), nur diese eine Datei ersetzen.** **Fix 2 (Anlage V):** Kopfzeile war auf
`'…Hausverwaltung v198'` hartcodiert (Gerätetest-Screenshot) → jetzt `'…Hausverwaltung
'+APP_VERSION`, kann nie mehr auseinanderlaufen (Zahlen waren korrekt). **Fix 3 (UI-Wunsch,
Gerätetest-Screenshot):** Mieter-Detail-Aktionsbuttons (~20, historisch flach) in 5 thematische
Gruppen mit dezenten Überschriften: Vorgänge · Vertrag & Kaution · Dokumente & Schreiben ·
Wohnung · Verwaltung; leere Gruppen (Rollen-Gates, z. B. HM ohne Vertrag/Kaution) werden samt
Label ausgeblendet. QA: 3/3 assert-Patches, Diff v206→v207 = **0/0** (1302), **Button-für-Button-
Diff: alle 25 onclick-Handler identisch** (nur umsortiert), **16/16 Render-Smoke-Tests real
ausgeführt** (Original-Template-Ausschnitt, Verwalter-/HM-/Vormieter-/Leerstand-Sicht).
**Sync-Größe 21 MB eingeordnet (Nutzerfrage):** erwartet – 23a lagert nur NEUE Fotos aus,
Bestands-Base64 (Protokollfoto-Duplikate) bleibt bis zum Backfill in `immo_daten.json`;
Backfill = eigene Sitzung mit Test-Gate (Bestandsdaten!). `APP_VERSION='2026-07-11-v207'`,
sw.js-CACHE `nadigpfau-v207`. **Gerätetest:** Mieter-Detail → 5 Gruppen; Anlage-V-Export →
Kopfzeile v207; nach Backend-Deploy „Erledigt"-Button im Posteingang unverändert.

**★ VORHERIGER STAND: v206 (HOTFIX Gerätetest: Android-Direktdruck weiße Seite – 11.07., 11. Sitzung).**
**Gerätetest-Befund (Screenshots, Kautionsquittung):** Vorschau ✓, Weg über „Teilen"+Öffnen ✓,
aber „Drucken" direkt aus der Vorschau ⇒ Android-Druckdialog zeigt WEISSE Seite, auf der sogar
der App-Sync-Toast („Hinweis: Datenmenge 21 MB (Fotos)…") mitgedruckt wird. **Ursachenkette
(zwei Defekte in `_druckJetzt`/CSS):** (1) Auf Android kehrt `window.print()` SOFORT zurück und
`onafterprint` feuert unmittelbar; das bisherige Sicherheits-`setTimeout(cleanup, 2000)` bzw. das
sofortige afterprint-Cleanup leerte `#printRoot` und entfernte `printing-active`, WÄHREND der
Druckdialog noch offen war – beim Neurastern (Formatwahl „ISO A4", Scrollen) nutzt der Dialog
das Live-DOM ⇒ leer/weiß. (2) `#toastEl` fehlte in BEIDEN Versteckmechanismen (weder
`body.printing-active`-Selektorliste noch generelles `@media print`), daher der mitgedruckte
Sync-Hinweis. **Fix:** Cleanup-Strategie ersetzt – nach `print()` wird `elapsed` gegen t0
geprüft: >1500 ms (Desktop, Dialog blockierte) ⇒ Cleanup nach 400/800 ms wie gehabt; sonst
(Android, Dialog läuft asynchron) ⇒ `spaetCleanupArmieren()`: Cleanup erst bei nachweislicher
Nutzer-Rückkehr (`pointerdown`/`keydown` im Dokument ODER `visibilitychange` hidden→visible),
Sicherheitsnetz 180 s; `cleanup` räumt alle Listener ab (idempotent via `cleaned`-Flag;
Doppel-Armierung unschädlich, da identische Funktionsreferenzen). CSS: `#toastEl` in die
printing-active-Liste, `.toast` in den generellen `@media print`-Block. QA: `node --check` OK,
Diff v205→v206 = **0/0** (1298), **8/8 Ablauf-Smoke-Tests real ausgeführt** (Mini-DOM/Window-
Stubs: Android-Pfad printRoot bleibt über Dialog-Lebensdauer gefüllt + Cleanup bei Rückkehr/
pointerdown, Desktop-Pfad 800-ms-Cleanup, 180-s-Netz). `APP_VERSION='2026-07-11-v206'`,
sw.js-CACHE `nadigpfau-v206`. **Gerätetest-Wdh.:** Kautionsquittung → „Drucken" → Dialog muss
die Quittung zeigen (auch nach Formatwechsel), „Als PDF speichern" prüfen; danach zurück in
die App: bedienbar (Cleanup lief). **Nebenbefund aus Screenshot:** Sync-Hinweis „21 MB (Fotos)"
bestätigt, dass der 23a-Basis64-Backfill (Altfotos auslagern) weiterhin lohnt (offener Punkt).

**★ VORHERIGER STAND: v205 (B3/V7-Restfälle Kappungsgrenze: Ortsnamen-Normalisierung – 11.07., 11. Sitzung).**
⚑-E-Punkt B3/V7 abgeschlossen. **Analyse-Befund:** Kernlogik (v178) korrekt an `obj.ort` gebunden,
57er-MietSchVO-Liste vollständig (nachgezählt), MG korrekt ausgenommen, einziger verbliebener
Gruppen-Check (NKA-Krefeld-Button) ist legitim. **ABER vier Restfall-Klassen im Test nachgewiesen**,
die fälschlich 20 % statt 15 % lieferten (rechtsriskant: Erhöhungsverlangen über der Kappungsgrenze
wäre insoweit unwirksam): „Krefeld-Uerdingen" (Bindestrich-Stadtteil), „Düsseldorf-Rath",
„Krefeld, Uerdingen" (Komma), „Duesseldorf" (Umlaut-Ersatzschreibweise). **Fix:** neue
`gemeindeNorm(t)` (lowercase, ä/ö/ü/ß→ae/oe/ue/ss, Komma/Bindestrich/Klammern/Slash→Leerzeichen,
Mehrfachspaces reduziert); `objektGemeinde` normalisiert jetzt, `gemeindeInMietSchVO` vergleicht
gegen die einmalig normalisierte Liste (Lazy-Cache `._norm`); Match-Regel unverändert (exakt ODER
Präfix+Leerzeichen – „Kempenich" bleibt korrekt 20 %, kein Fehltreffer auf „kempen"); Gruppen-
Fallback ohne ort-Feld unverändert erhalten. QA: `node --check` OK, Diff v204→v205 = **+1/0**
(1298), **17/17 Logiktests real ausgeführt** (alle 4 Restfälle jetzt 15 %, MG/„Moenchengladbach"
bleiben 20 %, PLZ+Stadtteil kombiniert, Präfix-Negativprobe, Gruppen-Fallback, Fristablauf
28.02.2030 → 20 %). `APP_VERSION='2026-07-11-v205'`, sw.js-CACHE `nadigpfau-v205`.
**Gerätetest:** Mieterhöhungs-Cockpit bei einem Objekt mit Stadtteil-Schreibweise im ort-Feld →
Kappungsgrenze 15 %.

**★ VORHERIGER STAND: v204 (P16 PIN-Migration + Klartext-Fallback entfernt – 11.07., 11. Sitzung).**
⚑-F2-Punkt P16 umgesetzt. **Sicherheitsgewinn:** Klartext-PINs verschwinden vollständig aus Records,
OneDrive-Snapshots und Backups – nicht mehr nur „beim ersten Login des jeweiligen Nutzers" (v195),
sondern proaktiv für ALLE Benutzer. **Neu `pinMigrationAlleUser()`** (idempotent, selbstheilend):
je User mit `pin`-Feld → (a) leerer Alt-PIN ODER Klartext passt zum vorhandenen Hash ⇒ nur Feld
tilgen (Hash bleibt UNVERÄNDERT), (b) sonst (kein Hash ODER abweichender Klartext von einem
Altgerät) ⇒ `pinSetzen` re-hasht mit dem Klartext – der Klartext ist die JÜNGERE Änderung und
gewinnt, konsistent zur Merge-Semantik; Tilgung immer mit `_geleert.pin`-Tombstone (kehrt per
Sync nicht zurück, da users via `mergeRecord` feldsicher gemergt wird – Analyse bestätigt);
bei ≥1 Änderung `syncSoon()`, sonst still. **Drei Einbauorte:** (1) Ende `ensureDefaultUsers`
(deckt beide Boot-Pfade + confirmReset), (2) im Pull nach dem users/mieter/tg-Merge-Block
(frisch gemergte Klartext-Records sofort gehasht), (3) Rettungsanker in `tryLogin` VOR
`pinPruefen` (User-Record ohne Hash aber mit Klartext ⇒ erst migrieren, dann prüfen –
schließt das Race-Fenster, kein Aussperr-Risiko). **`pinPruefen`: Klartext-Fallback ENTFERNT**
(`user.pin===pinEingabe` existiert nicht mehr; Prüfung nur noch gegen pinHash/pinSalt); der
damit tote v195-Nach-Login-Migrationsblock in tryLogin wurde durch den Rettungsanker ersetzt
(`const user`→`let user`). QA: `node --check` OK, Diff v203→v204 = **+1/0** (1297), **10/10
Smoke-Tests mit ECHTEM WebCrypto (SHA-256) real ausgeführt** (4 Ausgangsfälle inkl. beider
Konfliktvarianten, Login gegen migrierten Hash, Idempotenz-Zweitlauf ohne Sync, Fallback
nachweislich weg, Rettungsanker-Ablauf). `APP_VERSION='2026-07-11-v204'`, sw.js-CACHE
`nadigpfau-v204`. **⚠️ Gerätetest (WICHTIG, Login-Kern!):** Auf dem Hauptgerät anmelden (alle
Nutzer-PINs müssen unverändert funktionieren); danach in einem Users-Export/Backup prüfen,
dass KEIN `pin`-Klartextfeld mehr vorkommt, nur `pinHash`/`pinSalt`; HM-Gerät: Login HM-Nutzer.

**★ VORHERIGER STAND: v203 (23f/23h Teilen-Funktion Rechnungsbeleg + zentraler Helfer – 11.07., 11. Sitzung).**
⚑-F2-Punkte 23f + 23h umgesetzt. **Analyse-Befund:** Es existierten bereits FÜNF spezialisierte
Teilen-Funktionen (`shareFoto` Foto-Overlay, `dokTeilen` Dokumente, `vcardTeilen`, `etikettPdfTeilen`,
`druckVorschauTeilen` HTML-Archive) – der EINZIGE Datei-Öffnungsweg ohne Teilen-Option war der
Rechnungsbeleg (`rechnBelegOeffnen` = nur Download). **Neu:** (1) Zentraler generischer Helfer
`dateiTeilen(quelle, dateiname, mime)` – fetch→Blob→File→`navigator.canShare`/`share` (nativer
OS-Dialog inkl. WhatsApp/Messenger = 23h automatisch abgedeckt); Fallback ohne Web-Share-API:
Blob-Download + Hinweis-Toast; `AbortError` (Nutzer bricht Dialog ab) bleibt still; Share-Titel =
Dateiname ohne Endung. Die fünf bestehenden Spezial-Funktionen bleiben BEWUSST unverändert
(kein Risiko-Umbau); ihre Konsolidierung auf den Helfer ist optionaler P3-Folgepunkt.
(2) `rechnBelegTeilen(id)`: Namensbereinigung + Endung (.pdf/.xml je `belegMime`) + MIME, ruft
`dateiTeilen`. (3) Rechnungs-Detailansicht: neben „PDF/XML-Beleg öffnen" jetzt Teilen-Button
(ti-share, flex-Zeile); Foto-Belege hatten Teilen schon via `openFoto`→`shareFoto`. QA:
`node --check` OK, Diff v202→v203 = **+2/0** (1296), **5/5 Smoke-Tests real ausgeführt**
(Share-Pfad mit File-Objekt, Download-Fallback, AbortError still, XML-Endung/MIME-Aufbereitung,
Kein-Beleg-Toast). `APP_VERSION='2026-07-11-v203'`, sw.js-CACHE `nadigpfau-v203`.
**⚠️ Gerätetest:** Rechnung mit PDF-Beleg öffnen → Teilen-Button zeigt nativen Dialog mit
WhatsApp; Abbrechen erzeugt keine Fehlermeldung; auf Desktop ohne Share-API lädt die Datei herunter.

**★ VORHERIGER STAND: v202 (F-Folgeschliffe Kautionsdokumente + Barzahlung – 11.07., 11. Sitzung).**
Beide optionalen ⚑-F-Restpunkte umgesetzt. **(1) Kautionsdokumente-Liste (Mieterakte):** Die Liste im
Store `kautionsquittungen` mischt zwei Dokumenttypen (Quittung v156: id-Präfix `kq_`, OHNE typ-Feld;
Endabrechnung v191: id-Präfix `kea_`, `typ:'endabrechnung'`). Jetzt pro Eintrag Typ-Chip
(„Kautionsabrechnung" kupferfarben vs. „Quittung" grau), Betragszeile typgerecht beschriftet
(„Auszahlungssaldo" vs. „Kaution") und der Stift-Button ruft typabhängig `modalKautionsabrechnung`
statt fälschlich immer `modalKautionsquittung`; Drucktitel in `zeigeGespKautionsquittung` ebenfalls
typabhängig. Ansehen/Versand/Löschen unverändert. **(2) `barzahlungSpeichern`:** `idbPut` in
try/catch – bei Fehlschlag klarer Toast, **Modal bleibt offen** (Eingaben gehen nicht verloren),
kein `closeModal`/`zaRenderVerlauf`; Quota-Fehler erzeugt KEINEN Doppel-Toast (idbPut toastet seit
v195/A2 selbst, Handler prüft `QuotaExceededError`/`/quota/i`). **Methodik-Lektion:** Der Bestandscode
mischt echte UTF-8-Zeichen (€) mit `\u`-Escapes (·) in denselben Zeilen – Patch-Anker daher nicht
nachtippen, sondern Originalblöcke per `s.index()`/Regex EXAKT aus der Datei extrahieren und abgeleitet
ersetzen. QA: `node --check` OK, Funktions-Diff v201→v202 = **0/0** (1294), **10/10 Smoke-Tests real
ausgeführt** (Listen-Template mit beiden Typen via eval des extrahierten forEach-Blocks; Barzahlung
Erfolgs-/Fehler-/Quota-Pfad via `new Function` mit Stubs), CSS geprüft (.chip existiert, Variablen
copper-bg/copper-d/ink-05/ink-60 vorhanden). `APP_VERSION='2026-07-11-v202'`, sw.js-CACHE
`nadigpfau-v202`. **⚠️ Gerätetest:** Mieterakte eines Mieters mit Quittung UND Endabrechnung öffnen →
zwei unterscheidbare Chips, Stift öffnet jeweils den richtigen Dialog.

**★ ZUSATZ 11. Sitzung: DSGVO-Doku v1.2 (Anthropic als Auftragsverarbeiter) FERTIG + Rechtsauskunft E-Rechnungspflicht.**
Drei Dokumente von v1.1 auf **v1.2** fortgeschrieben (Obermenge, gleicher Markdown-Stil – die v1.1-Dateien
sind Klartext mit .docx-Endung, kein echtes OOXML): **(1) Verzeichnis_Auftragsverarbeiter_v1_2:** neue
Anthropic-Zeile (Status VORBEREITET, Endpunkt nicht deployt) + neuer Abschnitt „KI-Belegauswertung" mit
Rechercheergebnis (DPA = Art.-28-AVV automatisch in den Commercial Terms, EU-SCC 2021 Modul 2, zusätzlich
EU-US-DPF-Zertifizierung, kein Training auf API-Daten vertraglich, operative Logs 7 Tage Auto-Löschung
Standard-API, ZDR nur Enterprise = für uns nicht verfügbar; Subprozessoren AWS/GCP) und 3 OFFEN-Punkten
(A1 DPA-Ablage/kommerzielles Konto verifizieren, A2 TIA dokumentieren, A3 Art.-13/14-Info an Lieferanten
anwaltlich klären). **(2) VVT_v1_2:** neue Ziffer 7 (KI-Belegauswertung, Betroffene = Lieferanten/
Handwerker, Rechtsgrundlage Art. 6 I lit. f, Datenminimierungs-Absatz mit v201-Verweis, Status
„vorbereitet"). **(3) TOM_v1_2:** Abschnitt 2a um v196-Stand ergänzt (gefiltertes HM-Sync-Profil =
Datenebenen-Trennung umgesetzt; verbleibende Grenze gemeinsames MS-Konto; **Geräteverschlüsselung für
HM-Geräte jetzt verbindlich dokumentiert** = R22-TOM-Nachtrag aus ⚑ E erledigt) + neuer Abschnitt 2b
(KI-Übermittlungs-Absicherung: Key nur in App Settings, Function-Key-Zugriff, minimierter Payload,
v201-Vorrangweg, Anthropic-DPA-TOMs). ⚑ C-Punkt „Anthropic-AVV/VVT/TOM" damit **erledigt** (Restarbeit =
die 3 OFFEN-Punkte A1–A3, gehören zur Produktivsetzung des OCR-Backends). **Rechtsauskunft E-Rechnung
(Nutzerfrage, recherchiert BMF/Haufe/Haus&Grund):** Empfangspflicht seit 01.01.2025 für alle Unternehmer
inkl. steuerfreier Wohnraumvermieter (App erfüllt das seit v201; 8 Jahre elektronische Aufbewahrung!);
AUSSTELLUNGSpflicht besteht für den Bestand praktisch nicht (Wohnraum § 4 Nr. 12 UStG ausgenommen –
Mietvertrag gilt weiter als Rechnung; B2C generell ausgenommen; Kleinunternehmer per § 34a UStDV dauerhaft
befreit). **Prüfpunkt Steuerberater:** isolierte Stellplatzvermietung ist NICHT nach § 4 Nr. 12 befreit
(Satz 2); Pflicht entstünde aber nur bei Vermietung an Unternehmer für dessen Unternehmen UND ohne
Kleinunternehmerstatus, dann ab 01.01.2028 (< 800 T€ Umsatz). E-Rechnungs-ERSTELLUNGS-Modul = kein
Handlungsbedarf, als P3-Kandidat notiert.

**★ VORHERIGER STAND: v201 (E-Rechnungs-Erkennung ZUGFeRD/XRechnung LOKAL – 11.07., 11. Sitzung).**
P2-Fahrplanpunkt „ZUGFeRD/XRechnung-Parse VOR KI-OCR" umgesetzt – rein Frontend, kein Backend nötig,
kein Drittlandtransfer. **Was neu ist:** (1) Beleg-Upload akzeptiert zusätzlich `.xml` (XRechnung),
Button „PDF" → „PDF/XML". (2) Beim Anhängen eines PDF/XML prüft `eRechnungAutoPruefen` automatisch
auf eine E-Rechnung und befüllt die Felder sofort lokal (Toast „ohne KI"). (3) `rechnungOcrErkennen`
versucht VOR jedem Backend-Call den lokalen Weg (`_rechnBeleg.eRechnung`-Cache: undefined=ungeprüft/
null=keine/Objekt=Treffer); Treffer ⇒ KEIN Netzwerk-Aufruf; funktioniert damit auch OHNE Backend-Key
und obwohl `/api/rechnung-ocr` noch nicht deployt ist. XML ohne E-Rechnungs-Inhalt ⇒ klare Meldung
statt sinnlosem KI-Call. **Technik (5 neue Funktionen):** `pdfXmlExtrahieren` findet das in
ZUGFeRD/Factur-X eingebettete XML ohne PDF-Bibliothek (Stream-Heuristik: alle `stream…endstream`,
FlateDecode via `_pdfInflateText` = `DecompressionStream('deflate')` – PDF-Flate ist zlib; Guards:
64 B–6 MB, max. 400 Streams; **wichtig:** EOL vor `endstream` wird abgeschnitten, sonst „trailing
junk"-Throw strikter Implementierungen – im Logiktest real aufgetreten und gefixt; ohne
`DecompressionStream` (alte Browser) bleibt der KI-Weg). `eRechnungXmlParsen` parst BEIDE
EN-16931-Syntaxen: CII (ZUGFeRD/Factur-X/XRechnung-CII: ExchangedDocument/ID, DateTimeString
Format 102 JJJJMMTT→ISO, SellerTradeParty>direktes Kind Name – nicht PersonName,
MonetarySummation Grand/TaxBasisTotal, DueDate, IBANID, RateApplicablePercent,
BillingSpecifiedPeriod) und UBL (XRechnung-UBL: Dokument-ID = direktes Root-Kind – nicht
Zeilen-IDs, RegistrationName bevorzugt, LegalMonetaryTotal TaxInclusive/Exclusive,
PayeeFinancialAccount, InvoicePeriod); Namespace-agnostisch via `getElementsByTagNameNS('*',…)`,
Beträge `rc()`-centgerundet, Ergebnisstruktur = OCR-Backend-Format → Befüllung über das
BESTEHENDE `rechnungOcrVorschlagAnwenden` (keine zweite Befüll-Logik). `eRechnungAuslesen`
dispatcht XML (UTF-8-Decode) vs. PDF. Anzeige-Folgefixes: XML-Beleg wie PDF behandelt (Vorschau,
Listen-Icon ti-file-type-xml, Detail-Button „XML-Beleg öffnen", Download-Endung hängt kein `.pdf`
mehr an `.xml` an); DSGVO-Hinweistext im Formular ergänzt (E-Rechnung = lokal, nur KI-Button
übermittelt). QA: `node --check` beide Blöcke OK, Funktions-Diff v200→v201 = **+5/0 verloren**
(eRechnungAutoPruefen, eRechnungAuslesen, pdfXmlExtrahieren, _pdfInflateText, eRechnungXmlParsen),
**21/21 Logiktests in Node REAL AUSGEFÜHRT** (Smoke-Test-Pflicht aus v200-Lehre erfüllt: CII- und
UBL-Volldokumente, Format-102-Datum, PersonName-/Zeilen-ID-Verwechslungsproben, rc-Rundung
119,005→119,01, synthetisches PDF mit Stör- + FlateDecode-Stream Ende-zu-Ende via echtem
DecompressionStream, XML-dataURL Ende-zu-Ende, Fremd-XML/kaputtes XML/JPEG → null ohne Throw).
DB_VER 34 unverändert, keine neuen Stores, kein Backend berührt. `APP_VERSION='2026-07-11-v201'`,
sw.js-CACHE `nadigpfau-v201`. **⚠️ Gerätetest ausstehend:** (1) echte ZUGFeRD-PDF (z. B.
Telekom-/Versorger-E-Rechnung) anhängen → Felder füllen sich automatisch, Toast „ohne KI";
(2) „KI-Erkennung" bei derselben Datei ⇒ lokale Meldung, KEIN 404; (3) XRechnung-XML anhängen →
gleiche Kette; (4) normales Foto → KI-Weg unverändert (404-Meldung bis Backend-Deploy).

**★ VORHERIGER STAND: v200 (3 Gerätetest-Fixes v199 – 11.07., 10. Sitzung).**
Alexander hat v199 auf dem Gerät getestet und drei Fehler gemeldet; alle in v200 behoben:
**(F1, KRITISCH – Regression aus dem v198-Neuaufbau):** „Verlauf & Verbrauch“ öffnete nicht – in
`zeigeZaehlerVerlauf` wurde `jahrTagesgenau` (Zeile `jahrRows`) VOR seiner `const`-Deklaration
verwendet → Temporal-Dead-Zone-ReferenceError beim Klick, Modal erschien nie. Fix: Deklaration vor
die erste Verwendung gezogen, Doppel-Deklaration entfernt. **Methodik-Lehre:** `node --check` findet
TDZ-Fehler NICHT (nur Syntaxprüfung, keine Ausführung) – für umgestellte Funktionen künftig zusätzlich
einen Aufruf-Smoke-Test in Node (Funktion mit Stub-Daten ausführen). **(F2):** Zahlungen-Toolbar
(`sichtBtns`, 8 Buttons) war `display:flex` ohne Overflow – auf Mobil waren die hinteren Buttons
(Buchhaltung, Auswertung, Barzahlung, Excel, Importe, Regeln, Offene Posten, Anlage V) unerreichbar,
kein Rechts-Scrollen möglich. Fix: neue CSS-Klasse `.za-toolbar` (overflow-x:auto, touch-scrolling,
`>.btn{flex:0 0 auto;white-space:nowrap}`). **(F3):** Neue Einnahme-Kategorie
`stellplatzmiete` („Stellplatzmiete“, seite:'ein') – nicht zugeordnete Stellplatz-Eingänge (z. B.
externe TG-Mieter wie „Miete Stellplatz 62“) hatten im Erstattungs-Dialog keine passende Art.
Zusätzlich: eigene Anlage-V-Gruppe **E1b „Mieteinnahmen Stellplätze/Garagen“** (Anlage V weist
Garagen-/Stellplatzeinnahmen gesondert aus) und Auto-Vorschlag in `buchAnalyseErstattung`
(Muster stellplatz/garage/tiefgarage/parkplatz + miete/pacht → Vorbelegung des Dropdowns).
QA: `node --check` beide Blöcke OK, Funktions-Diff v199→v200 = **0 neu/0 verloren** (1292),
8/8 Logiktests (TDZ-Reihenfolge, Einzel-Deklaration, CSS+Container, Kategorie, E1b, 6 Erkennungs-
fälle inkl. Negativfälle „Stellplatz Kaution“/„Sonstiges“). DB_VER 34 unverändert, keine neuen Stores.
`APP_VERSION='2026-07-11-v200'`, sw.js-CACHE `nadigpfau-v200`. **⚠️ Gerätetest ausstehend:**
(1) Zähler → „Verlauf & Verbrauch“ öffnet Modal mit Kurve/Jahrestabelle; (2) Zahlungen: Toolbar
lässt sich nach rechts wischen, alle 8 Buttons erreichbar; (3) Eingang „Miete Stellplatz 62“ →
↩-Button → Art ist mit „Stellplatzmiete“ vorbelegt, speichern, Anlage-V-Export zeigt Zeile E1b.

**★ VORHERIGER STAND: v199 (OneDrive-Backup-Generationen – 10.07., 9. Sitzung, Fortsetzung).**
Dritter P2-Punkt (B5). Bislang war `immo_daten.json` der EINZIGE Stand – ein fehlerhafter Merge oder
Nutzerfehler propagierte unumkehrbar auf alle Geräte. Jetzt: `genBackupSichern(token, json)` legt beim
ersten erfolgreichen Voll-Sync jeder ISO-Kalenderwoche eine Kopie unter
`OneDrive → NadigPfau → backup/immo_daten_JJJJ-KWnn.json` ab (Aufruf im Sync-Erfolgspfad direkt nach
`hmDateiSchreiben`, komplett fehlertolerant – blockiert den Sync nie); Wochen-Gate über
`settings/lastGenBackup`; fehlender `backup/`-Ordner wird per Graph-POST (`conflictBehavior:fail`,
409 = ok) angelegt und der PUT einmal wiederholt; Aufräumen behält die **4 neuesten** Generationen
(Namensschema `JJJJ-KWnn` sortiert lexikografisch = chronologisch, Fremddateien wie `immo_daten.json`/
`immo_daten_hm.json` per Regex ausgenommen). `isoWoche()` implementiert ISO 8601 korrekt
(Donnerstag-Regel inkl. ISO-Jahr – 29.12.2025→2026-KW01, 01.01.2027→2026-KW53, per Logiktest belegt).
**Wiederherstellung bewusst manuell** (kein Ein-Klick-Restore, um versehentliches Zurückrollen zu
vermeiden): Generation in OneDrive nach `immo_daten.json` kopieren → App „Vom Server laden
(erzwingen)" (`syncFromOneDriveForce`, existiert); Weg ist in der Datenspeicher-Card dokumentiert.
Restore-UI = P3-Kandidat. QA: `node --check` OK, Funktions-Diff v198→v199 = **+2/0 verloren**
(1292: isoWoche, genBackupSichern), 12/12 Logiktests (KW-Randfälle über 5 Jahreswechsel, Aufräum-
Sortierung über Jahresgrenze, Fremddatei-Schutz). DB_VER 34 unverändert.
`APP_VERSION='2026-07-10-v199'`, sw.js-CACHE `nadigpfau-v199`. **sw.js-Härtung (Nachprüfung):**
Precache einzeln statt `addAll` – ein einzelnes 404 verwarf sonst atomar den GESAMTEN Precache;
Precache-Pfade gegen manifest.json verifiziert (icon-192/512.png, Bindestrich-Namen = Deploy-Set). **⚠️ Gerätetest ausstehend:** nach
einem Sync in OneDrive den Ordner `NadigPfau/backup` prüfen (eine Datei `immo_daten_2026-KW28.json`),
zweiter Sync derselben Woche erzeugt KEINE weitere Datei.

**★ VORHERIGER STAND: v198 (Anlage-V-Jahresexport – 10.07., 9. Sitzung, Fortsetzung).**
Zweiter P2-Punkt aus der Gap-Analyse. **Vorgeschichte:** Ein erster v198-Durchlauf ging durch
Filesystem-Reset verloren und hinterließ eine DEFEKTE Arbeitskopie (Modul fehlte, Button rief
nicht existierende Funktion, uninterpretierte `\u`-Escapes aus raw-String-Patch) → Rollback auf
geprüfte v197 und kontrollierter Neuaufbau. **Methodik-Lehre (wichtig):** In Python-Patch-Skripten
KEINE raw-Strings (r""") mit `\uXXXX`-Escapes kombinieren – Umlaute direkt als UTF-8 schreiben,
Regex-Backslashes im JS-Text doppeln (`\\d`, `\\w`); Ausgabedateien nach Patch IMMER auf
Funktions-Existenz + Escape-Reste gegenprüfen, nicht nur auf Versionsstring.
**Implementierung (schlanker als der verlorene Ansatz, vermeidet dessen Fehler by design):**
Button „Anlage V" in der Buchhaltungs-Sichtleiste (`modalAnlageV`, Verwalter-only), Jahr wählbar
(aus vorhandenen Buchungsjahren des aktiven Kontos). `anlageVExport` filtert Buchungen direkt nach
**Zahlungsjahr** (`datumISO`) = Zuflussprinzip § 11 EStG ohne Umwege (der verlorene zaSollIst/
mietmonat-Ansatz hätte wirtschaftlich statt nach Zufluss zugeordnet und brauchte Korrekturschleifen);
`storniert`/`geloescht` gefiltert. Zuordnung über neue Konstante `ANLAGE_V_GRUPPEN` (21 Gruppen
E1–E5/NE1–NE2/W1–W12/NW1–NW4) + Index `_AV_KAT_IDX` + `avGruppeFuer(seite,kat,b)`:
**Mapping-Vollständigkeit maschinell geprüft** – jede der BUCH_KATEGORIEN-IDs ist zugeordnet;
Fallbacks: Eingang ohne Kategorie mit mietmonat/mieterId → E2 „Miet-Eingänge brutto" (fängt auch
den Randfall mieterId-ohne-mietmonat), sonst E5 „unkategorisiert (prüfen)"; unbekannte Ausgabe-Kats
→ W12. Splitbuchungen via `buchTeile` anteilig (Annuität: Zinsen→W11 abziehbar, Tilgung→NW1
nachrichtlich). Nicht steuerbar sauber getrennt (Kaution durchlaufend, Privatentnahmen, Fehlbuchung).
**Excel (SheetJS):** Blatt 1 Anlage-V-Gliederung mit Summen steuerbare Einnahmen/Werbungskosten,
Überschuss vor AfA, AfA-Leerposition + §-82b-Hinweis, nachrichtlicher Block, Hinweistexte (keine
Steuerberatung); Blatt 2 Einzelnachweis (jede Buchungsposition mit AV-Zuordnung); Blatt 3
Mieteinnahmen je Objekt (via mieterId→objektId). Durchgängig `rc()`-centgenau.
**Beifang-Bestandsbug behoben:** `zaExportBuchungen` las `t.kategorie`, `buchTeile` liefert `{kat}`
– die Kategorie-Spalte im Buchungs-Excel war bei Splitbuchungen seit Einführung leer.
QA: `node --check` beide Blöcke OK, Funktions-Diff v197→v198 = **+3/0 verloren** (1290:
modalAnlageV, anlageVExport, avGruppeFuer), 7/7 Logiktests (E2-Fallback, E5, Split Zins/Tilgung,
Kaution ≠ steuerbar, Absolutbeträge, 100×0,10 € centgenau, unbekannte Kat → W12) + Mapping-
Vollständigkeitsprüfung. DB_VER 34 unverändert, keine neuen Stores. `APP_VERSION='2026-07-10-v198'`,
sw.js-CACHE `nadigpfau-v198`. **⚠️ Gerätetest ausstehend:** Buchhaltung → „Anlage V" → Jahr wählen →
Excel öffnen: Summen gegen Auswertungs-Sicht plausibilisieren; Splitbuchungs-Kategorien im
normalen Buchungs-Export jetzt gefüllt.

**★ VORHERIGER STAND: v197 (Mahnwesen / Offene Posten – 10.07., 9. Sitzung, Fortsetzung).**
Erster P2-Punkt aus der Gap-Analyse umgesetzt (größte Feature-Lücke vs. Wettbewerb). Neue Sicht
„Offene Posten" in der Buchhaltungs-Leiste (Button neben „Regeln", `modalOffenePosten`, Verwalter-only).
**Berechnung** (`opRueckstaende`, setzt vollständig auf `zaSollIst` auf – Soll inkl. Stellplatz-Register
via neuem globalen `spIndexAlle()`, Ist inkl. Barzahlungen und SP-Aufteilung): Kontokorrent-Sicht über
12-Monats-Fenster (`opMonatsfenster`) = max(0, Σ Soll aktiver Monate − Σ Ist); Überzahlungen gleichen
Lücken aus (keine Fehlalarme bei Doppelzahlung); laufender Monat erst ab dem 7. Kalendertag gewertet
(§ 556b Abs. 1 BGB, 3.-Werktag-Fälligkeit konservativ abgebildet); Bagatellschwelle 0,50 €; ehemalige
Mieter bleiben mit Restrückstand sichtbar (Soll nur für aktive Vertragsmonate). **Ampel:** ≥ 2 Monats-
mieten = rot + Badge „§ 543 BGB" (fristlose Kündigung möglich, Tooltip empfiehlt anwaltliche Prüfung),
≥ 1 orange, sonst gelb. **v197-Fix aus Logiktest:** Schwellen prüfen das UNGERUNDETE Verhältnis
(`mmExakt`) – die 1-Nachkommastellen-Rundung hätte 1.299 €/650 € („1,998") als „2,0" markiert =
rechtlich falscher § 543-Badge. **Mahnschreiben** (`modalMahnung`/`mahnungDrucken`): 3 Stufen
(Zahlungserinnerung freundlich · 1. Mahnung mit §§ 556b/286 II Nr. 1/288 BGB · 2./letzte Mahnung mit
§§ 543 II 1 Nr. 3, 569 III BGB + Ankündigung gerichtliches Mahnverfahren, sachlich ohne Drohkulisse);
Stufen-Vorauswahl aus Historie; Frist (Std. 10 Tage), Datum, optionale IBAN (sonst „bekanntes Miet-
konto"); Monatsaufstellung + Summe im Druck; Druckvorlage/Briefkopf-Fuß 1:1 nach Kautionsabrechnungs-
Muster (`druckHTML`). **Historie:** Metadaten-Array `m.mahnungen` [{stufe,datum,betrag,monate,frist,von}]
am Mieter-Record – kein neuer Store, DB_VER 34 unverändert, kein HTML-Archiv (bewusst: das gedruckte
Schreiben ist der Nachweis); Feld steht bewusst NICHT in `HM_SYNC.mieterFelder` (Verwalter-Sache).
Behobener Eigenfund: `_opMieterIdx` (Historie-Anzeige) wurde initial referenziert, aber nicht befüllt.
QA: `node --check` OK, Funktions-Diff v196→v197 = **+7/0 verloren** (1287: opMonatsfenster, spIndexAlle,
opRueckstaende, _opStufeLabel, modalOffenePosten, modalMahnung, mahnungDrucken), 13/13 Logiktests
(Kontokorrent, § 556b-Karenz, Jahreswechsel, Cent-Rest-Schwelle, § 543-Grenzfall 1299/650).
`APP_VERSION='2026-07-10-v197'`, sw.js-CACHE `nadigpfau-v197`. **⚠️ Gerätetest ausstehend:** Buchhaltung
→ „Offene Posten" öffnen (Rückstandsliste plausibel? SP-Mieter korrekt?), Mahnschreiben Stufe 1 drucken,
Historie-Eintrag am Mieter prüfen, zweiter Aufruf schlägt Stufe 2 vor.

**★ VORHERIGER STAND: v196 (Gap-Analyse-Fixes + gefilterter Hausmeister-Sync – 10.07., 9. Sitzung).**
Basis: unabhängige Gesamtanalyse (Bericht `ANALYSE_GAP_v194.md` in Outputs; Markt: objego/immocloud/
hellohousing/Immoware24; größte Feature-Lücken: **Mahnwesen, Anlage V, Mieterportal** = P2-Fahrplan).
**v195 (Prio-1-Fixes, alle risikoarm):** (A1) `navigator.storage.persist()` beim App-Start – IndexedDB
war bislang Best-Effort und durfte vom Browser geräumt werden (größtes Datenverlust-Risiko der
Offline-First-App); Statusanzeige „Belegt/Quota/Persistent“ via `speicherInfoLaden()` in
Einstellungen→Daten. (A2) `QuotaExceededError`-Handling in `idbPut` – Speicher-voll wird jetzt klar
getoastet statt still zu scheitern. (A4) zentrale Cent-Rundung `rc()` – an ~20 Geld-Summen/-Salden
verdrahtet (Kaution: alle 5 Summenfunktionen + Saldo + Endabrechnungs-Abzüge; Buchhaltungs-Monatssummen;
Rechnungen gesamt/offen; Stellplatz-Mietsumme; Reparatur Arbeit/Teile inkl. 2 Doppel-Vorkommen);
12/12 Logiktests (u. a. 100×0,10 € = exakt 10,00 €). (B4) `sw.js` precacht jetzt `index.html`+
`manifest.json`+Icons im install-Event – App startet auch nach Browser-Cache-Räumung offline.
**v196 (A3 Option 1 – gefilterter Sync, GERÄTE-gebundenes Profil):** Neues Setting `syncProfil`
(voll|hm, nur lokal wirksam, in `SYNC_PROFIL` beim Start geladen). **HM-Gerät** synchronisiert
ausschließlich über neue Datei `immo_daten_hm.json` (`OD_FILE_URL_HM`): erhält nur `HM_SYNC.stores`
(Betriebsdaten + Mieter feldreduziert per Whitelist `mieterFuerHM` – ohne IBAN/Miete/Kaution/SA –
+ `users` nur Hausmeister-Rollen via `userFuerHM`, damit Admin-PIN-Hashes das Gerät nie erreichen);
schreibt nur `HM_SYNC.schreibStores` (bewusst OHNE users/mieter/objekt_stamm → keine Rechteausweitung,
kein Rückfluss feldreduzierter Records; mergeRecord-Feldsicherheit als zweites Netz, per Logiktest
belegt). HM-Upload lädt die Remote-Datei vorab und erhält die Verwalter-Anteile (mieter/users) beim
PUT. **Verwalter-Gerät:** `hmRueckwegMergen` holt HM-Änderungen VOR dem Voll-Backup-Aufbau zurück
(landen sofort in `immo_daten.json`; Guard: nur wenn `updatedBy` „(HM)“ enthält und neuer als
`settings/lastSyncHM`), `hmDateiSchreiben` stellt nach dem Voll-PUT den frischen gefilterten Stand
bereit (`hmBackupErzeugen`, Tombstones auf HM-Stores gefiltert). Merge-Kern als kompakte Zweitfassung
`mergeFremdBackup(backup, stores)` – **bewusste Duplizierung**, damit der bewährte
`syncFromOneDrive`-Hauptpfad unangetastet bleibt. **Profil-Umstellung** (Einstellungen→System→
„Geräte-Sync-Profil“, `syncProfilUmstellen`): auf `hm` werden alle Nicht-HM-Stores lokal geleert,
Mieter feldreduziert, Verwalter-User + `mieter_snapshots` entfernt; Rückkehr hm→voll bewusst nur per
Neueinrichtung (Websitedaten löschen), da kein Admin-Login mehr existiert. **Dokumentierte Grenze:**
solange alle Geräte mit demselben Microsoft-Konto syncen, ist die Trennung App-seitig; harte Trennung
= eigenes MS-Konto je Hausmeister mit Freigabe nur auf die HM-Datei (organisatorisch, §11/R22).
QA: `node --check` beide Blöcke OK, Funktions-Diff v194→v196 = **+12/0 verloren** (1280; v195: rc,
speicherInfoLaden; v196: istHmSyncGeraet, mieterFuerHM, userFuerHM, hmBackupErzeugen, mergeFremdBackup,
syncFromOneDriveHM, syncToOneDriveHM, hmRueckwegMergen, hmDateiSchreiben, syncProfilUmstellen),
28/28 Logiktests (12 rc/Kaution + 16 HM-Filter/Merge/Tombstone). DB_VER 34 unverändert, keine neuen
Stores. `APP_VERSION='2026-07-10-v196'`, `sw.js`-CACHE `nadigpfau-v196`. **⚠️ Gerätetests ausstehend:**
(1) v195-Kette: Einstellungen→Daten zeigt Speicher-Status, Persistent=ja nach PWA-Install; (2) v196:
Zweitgerät auf HM-Profil stellen → IndexedDB enthält KEINE buchungen/kautionsquittungen/dokumente,
Mieter ohne IBAN/Miete; Mangel am HM-Gerät anlegen → erscheint nach Verwalter-Sync in der Vollansicht;
`immo_daten_hm.json` in OneDrive prüfen (keine IBAN/Kaution im JSON). Details §0as/§0at.

**★ VORHERIGER STAND: v194 – VOLLSTÄNDIGER CODE-REVIEW BESTANDEN (08.07., 8. Sitzung).** Die aktuelle
Auslieferung ist `index-v194.html` + `sw.js` (Cache `nadigpfau-v194`) + `manifest.json` + `icon192/512.png`.
**Statischer Review-Befund (alles grün):** (1) `node --check` beide Script-Blöcke OK. (2) Funktions-Integrität
kumulativ v185→v194: **0 Funktionen verloren**, +29 neu, 1268 gesamt. (3) Keine neuen Dubletten (nur die
vorbestehende `getAnteil`). (4) DB_VER=34; **beide neuen Stores (`buch_regeln`, `buchungs_batches`) an allen 6
Pflichtstellen** registriert (DB-Create, Index, exportBackup, alleStores, syncPush, mergeStores) – kein
Datenverlust-Risiko. (5) **PWA-Invarianten** alle erfüllt: Manifest extern, Icons 192/512 mit `any`+`maskable`,
`start_url`/`scope`=`./`, `id`=`/Immo-app-Nadig-Pfau/`, kein Reset-Block, `sw.js`-Cache hochgezählt. (6)
**Sicherheit:** keine hardcodierten Credentials/Keys, OCR-Key kommt aus `settings/backendKey` (IndexedDB),
`esc()` maskiert `& < > " '` (value-Attribute XSS-sicher). (7) **Kein toter Code** – alle 29 neuen Funktionen
werden aufgerufen. (8) **Fehlerbehandlung** solide: Löschungen via `deleteMitTombstone`+Sync, kritische
Löschungen mit `confirm`, OCR mit Timeout+404/401-Handling. **Kleine Beobachtungen (kein Bug):**
`barzahlungSpeichern` setzt `idbPut('buchungen')` ohne eigenes try/catch (wie bestehendes `zaSpeichern`-Muster);
`getAnteil`-Dublette vorbestehend; CSP enthält weiterhin `unsafe-inline` (Altpunkt C1). **Wichtig:** Der Review
ist statisch – **Gerätetests (UI + IndexedDB-Migration 33→34 auf echtem Gerät) stehen weiterhin aus.**
Siehe konsolidierte Offene-Punkte-Liste unter ⚑ (nicht mehr §12, seit 10.07. Verweis-Stub). Feature-Details der Sitzung: §0al–§0ar.

---

## ⚑ OFFENE PUNKTE – KONSOLIDIERT (Stand v201, 11.07.2026) – EINZIGE gepflegte Aufgabenliste

> **Ausführungshilfe (12.07., 13. Sitzung):** Alle unten verstreuten Deploy-/Gerätetest-Nutzeraktionen
> sind in `DEPLOY_CHECKLISTE.md` (Outputs) in verbindlicher Reihenfolge konsolidiert
> (Strang A App v210 inkl. Backup-Pflicht vor v209-Backfill · Strang B Website · Strang C Backend/K1).

- **NEU 21. Sitzung (Code-Review Nr. 2, §0Rev21):** (a) Backend-Deploy `inbox-mark-read.js` aus Outputs
  (R1, VORHER K1-Live-Diff) · (b) `zaehlerOcr.js` aus Outputs statt Alt-Projektkopie deployen (R2) ·
  (c) ~~R3 sw.js~~ + ~~R4/R5~~ **erledigt in v239** – Deploy-Set jetzt `index.html`(=v239) +
  `sw.js`(CACHE v239, enthält R3) · (d) **Gerätetest v239 = Login-Kern!** (jeder Nutzer einmal
  anmelden, danach pinKdf:'pbkdf2' im Datensatz; Lager-Detail prüfen) · (e) v237-Changelog-Lücke
  rekonstruieren · (f) Restpunkte Review: R6 dokumentiert, R7 bei nächstem Backend-Anlass.
- **NEU v225–v227 (Deploy + Gerätetest, 19. Sitzung – F1 Objektbezug):** Deploy-Set `index.html`(=v227,
  Obermenge v221–v227) + `sw.js`(CACHE v227). Test: (a) Erststart → v225-Migration ordnet Bestandsbuchungen
  automatisch ihr Objekt zu (Eingänge=Mieter-Objekt, Ruhrtalstr./Amboßstr.=trivial); (b) Buchhaltungs-Tab
  Krefeld/MG/Mindener → Kostenstellen-`<select>` je Ausgabe, Vorschlag-Chip „…gesamt", Massenbutton
  „Alle → Krefeld gesamt"; Wechsel Gruppe↔Einzelhaus bleibt nach Sync auf 2. Gerät korrekt.
- **F1 Schritt 3 (kritisch, nächste Etappe):** NKA-Übernahme (`nkaBuchUebernehmen`/`buchKatSummen`) und
  Anlage-V-Export auf `buchBetroffeneObjekte(b)` umstellen → Kosten je Objekt/Gruppe statt gemischt (Befund B1).
- **F2 (kritisch, danach):** Leistungszeitraum statt Zahlungsdatum bei NKA (Befund B2, §556 BGB) —
  `leistungVonISO`/`leistungBisISO`, Texterkennung, taggenaue Anteilung.
- **ENTSCHIEDEN 16.07. (Nutzer):** (1) Krefeld „gemischt/siehe NKA" → Kostengruppen-Modell (kein Quoten-Split);
  (2) Buchungsänderungen für **alle Verwalter** → GoBD-Journal F4 wer/wann/was; (3) **DATEV NICHT nötig**
  → F9 nur optional SEPA. Weiterhin offen mit **Steuerberater**: USt TG-Stellplätze (B4), Anlage-V-Gruppen
  NE3–NE6; bei der **Bank**: CAMT.053-Verfügbarkeit (entscheidet F7-Priorität).
- **NEU v216 (Deploy + Gerätetest, 14. Sitzung):** Deploy-Set `index.html`(=v216, Obermenge v212–v216)
  + `sw.js`(CACHE v216). Test: CSV erneut einlesen → Darlehensrate aufteilen → Tilgung/Zinsen im
  Buchungstext sichtbar und per Button übernehmbar; Mieteingänge unverändert korrekt zugeordnet.
- **OFFEN (v216-Folge):** Bestandsbuchungen behalten den einzeiligen Zweck. Mögliche Folgeetappe:
  beim Re-Import den Zweck auf vorhandenen Buchungen nachtragen (analog zum v213-Nachtrag von
  Zuordnung/Kategorie), damit alte Darlehensraten rückwirkend Zins/Tilgung zeigen.
- ~~**v215 (Deploy)**~~ in v216 aufgegangen: Deploy-Set `index.html`(=v215, Obermenge v212–v215)
  + `sw.js`(CACHE v215). Tests: WE-Vorschlagszeile bietet Alt-Mieter/Einnahme · Fehlbuchung wird als
  „Neutral – keine Einnahme“ geführt · Darlehensrate aufteilen → voller Buchungstext + Zins/Tilgung-Vorschlag.
- **NEU Backend OCR:** `rechnungOcr.js` + App Setting `ANTHROPIC_API_KEY` – Anleitung
  `ANLEITUNG_OCR_Backend.md`. **Reihenfolge:** erst `inbox-mark-read.js` (K1-Diff), dann OCR.
  **Vor produktiver Nutzung:** DPA/AVV Anthropic + Art.-13-Information klären (AVV v1.3).
- **NEU steuerlich (v215/H3):** Anlage-V-Zuordnung der neuen Einnahmearten ist bewusst konservativ
  (NE3–NE6, nachrichtlich) – **mit Steuerberater abstimmen**, ob Zuschuss/Steuererstattung/Zinsertrag
  anders zu behandeln sind.
- ~~**v214 (Deploy)**~~ in v215 aufgegangen: Deploy-Set `index.html`(=v214, Obermenge v212–v214)
  + `sw.js`(CACHE v214). Tests: Mietbescheinigung → Vorschau → „PDF teilen“ (Größe, Umlaute, Unterschriften
  bündig) · Unterschriftslinien in NKA/WGB/Brief auf einer Ebene · v213-Punkte (Modal/Bankimport) mittesten.
  **PDF-Baukasten `pdfDoc` steht für weitere Dokumente bereit** (NKA, WGB, Kautionsquittung) – Folgeetappe.
- ~~**v213 (Deploy)**~~ in v214 aufgegangen: Deploy-Set `index.html`(=v213, Obermenge v212+v213)
  + `sw.js`(CACHE v213); **v211 ist bereits live** (Screenshot 13.07.), v212 NICHT separat deployen.
  Tests: Modal schließt nicht mehr per Klick daneben (✕ vorhanden) · Bankimport „Alt-Mieter anlegen“ ·
  „Als Einnahme buchen“ (Provinzial → Versicherungserstattung) · Re-Import zeigt „nachträglich zugeordnet“ ·
  v212-OP-Liste (keine Monate vor Erfassungsbeginn, Objekt-Gruppierung) mittesten.
- ~~**v210 (Gerätetest)**~~ **überholt:** v211 ist deployt und läuft (13.07.); Restpunkte in v213-Zeile aufgegangen.
- **NEU v209 (Gerätetest – WICHTIG, verändert Bestandsdaten):** Backup exportieren → OneDrive verbinden
  → WLAN → Einstellungen → Datenspeicher → „Alt-Fotos auslagern": Analyse plausibel? Lauf durchführen.
  Danach Anzeige/Druck von Alt-Protokollfotos, Mangel-/Reparaturbelegen, Wohnungsbildern prüfen; Sync-Toast
  muss deutlich unter 21 MB liegen. Deploy-Set: `index.html`(=v209, Obermenge v207+v208) + `sw.js`(CACHE v209).
- **NEU v208 (Gerätetest):** (1) Objekt-Detail → Titel einzeilig, Buttons in 4 Gruppen;
  (2) Mieterdetail → Ampeltexte (Mietspiegel/Kaution) klar lesbar; (3) Bankverbindung ist
  eingeklappt, Kopfzeile zeigt maskierte IBAN, Aufklappen zeigt alles. Deploy-Set:
  `index.html`(=v208, Obermenge v207) + `sw.js`(CACHE v208). **v207 nicht separat deployen.**
- **NEU v207 (Gerätetest + Backend-Deploy):** (1) Mieter-Detail → 5 Buttongruppen mit Labels,
  beim HM-Nutzer fehlt „Vertrag & Kaution" komplett (kein leeres Label); (2) Anlage-V-Export →
  Kopfzeile zeigt v207; (3) `inbox-mark-read.js` deployen (VORHER Live-Stand abgleichen, K1!),
  danach „Erledigt" im Posteingang testen. Deploy-Set App: `index.html`(=v207) + `sw.js`(CACHE v207).
- **NEU v206 (Gerätetest, HOTFIX-Verifikation):** Kautionsquittung → „Drucken": Android-Dialog
  zeigt die Quittung (nicht weiß), auch nach Papierformat-Wechsel; kein Toast im Ausdruck;
  App nach Rückkehr normal bedienbar. Deploy-Set: `index.html`(=v206) + `sw.js`(CACHE v206).
- **NEU v205 (Gerätetest):** Mieterhöhungs-Cockpit bei Objekt mit Stadtteil-Schreibweise
  („Krefeld-Uerdingen" o. ä.) → 15 %-Kappung. Deploy-Set: `index.html`(=v205) + `sw.js`(CACHE v205).
- **NEU v204 (Gerätetest, WICHTIG – Login-Kern):** Alle Nutzer-Logins müssen unverändert
  funktionieren; danach Backup-JSON prüfen: kein `pin`-Klartext mehr, nur `pinHash`/`pinSalt`.
  Deploy-Set: `index.html`(=v204) + `sw.js`(CACHE v204).
- **NEU v203 (Gerätetest):** Rechnung mit PDF-Beleg → Teilen-Button öffnet nativen Dialog (WhatsApp
  sichtbar), Abbrechen still, Desktop-Fallback = Download. Deploy-Set: `index.html`(=v203) + `sw.js`(CACHE v203).
- **NEU v202 (Gerätetest):** Mieterakte mit Quittung + Endabrechnung → Typ-Chips korrekt, Stift öffnet
  typrichtigen Dialog; Barzahlung normal erfassbar. Deploy-Set: `index.html`(=v202) + `sw.js`(CACHE v202).
- **NEU v201 (Gerätetest):** (1) ZUGFeRD-PDF anhängen → Felder füllen sich lokal (Toast „ohne KI");
  (2) „KI-Erkennung" bei E-Rechnung ⇒ lokal, kein 404; (3) XRechnung-XML-Upload; (4) Foto ⇒ KI-Weg
  unverändert. Deploy-Set: `index.html`(=v201) + `sw.js`(CACHE v201) + manifest + Icons.
- **NEU v200 (Gerätetest):** (1) Zähler → „Verlauf & Verbrauch“ öffnet; (2) Zahlungen-Toolbar
  horizontal wischbar, alle 8 Buttons erreichbar; (3) Stellplatz-Eingang → Art „Stellplatzmiete“
  vorbelegt; Anlage-V-Export zeigt Zeile E1b.

**A – Gerätetests (unmittelbar, durch Nutzer):**
- **NEU v197:** Buchhaltung → „Offene Posten" öffnen (Rückstandsliste plausibel? Stellplatz-Mieter
  korrekt?), Mahnschreiben Stufe 1 drucken, Historie-Eintrag am Mieter prüfen, zweiter Aufruf schlägt
  Stufe 2 vor.
- **NEU v198:** Buchhaltung → „Anlage V" → Jahr wählen → Excel öffnen: Summen gegen Auswertungs-Sicht
  plausibilisieren; Splitbuchungs-Kategorien im normalen Buchungs-Export jetzt gefüllt.
- **NEU v199:** nach einem Sync in OneDrive den Ordner `NadigPfau/backup` prüfen (eine Datei
  `immo_daten_2026-KWxx.json`), zweiter Sync derselben Woche erzeugt KEINE weitere Datei.
- **NEU v195/v196:** Speicher-Status + Persistent-Flag (Einstellungen→Daten); HM-Profil-Kette
  (Umstellung, reduzierte IndexedDB, Mangel-Rückweg HM→Verwalter, `immo_daten_hm.json`-Inhalt).
- v186–v194 auf echtem Gerät testen: UI-Funktion aller neuen Features + **IndexedDB-Migration 32→33→34**
  (zwei Schema-Sprünge dieser Sitzung). Nach Upload einmal öffnen, prüfen: keine Daten verloren, neue Stores
  `buch_regeln` + `buchungs_batches` angelegt. Deploy-Set: `index.html`(=v200) + `manifest.json` + `icon192.png`
  + `icon512.png` + `sw.js`.

**B – Backend-Deploy (blockiert: Nutzer kann derzeit nur GitHub Pages):**
- OCR-Endpunkt `rechnungOcr.js` → Azure `func-nadigpfau` in `src/functions/` (Kudu-Drag&Drop empfohlen, NICHT
  VS-Code-Volldeploy → überschreibt die 10 Live-Funktionen). App Setting `ANTHROPIC_API_KEY` (+optional
  `ANTHROPIC_MODEL`) im Portal, NIE im Code. Bis dahin liefert die KI-Erkennung 404 (Frontend fängt es ab).
- Backend-**Sicherung**: `wwwroot` aus Kudu ziehen → Git-Repo (aktuell KEIN Backup vorhanden).
- ~~Debug-Fehlertext auf `{ok:false}` reduzieren~~ **ERLEDIGT 11.07. (§0au):** letzter Träger war `inbox-mark-read.js` (2× `e.message` im 500er-Body) – gefixt, **Deploy ausstehend** (Live-Stand-Abgleich vor Ersetzen, K1).
- `/api/selbstauskunft`-Endpunkt (Altpunkt – Live-Status gegen Kudu prüfen).
- `mail.js` muss dauerhaft in `src/functions/` liegen (Deploy-Falle: VS-Code-Deploy entfernt sie sonst).

**C – DSGVO / Recht (reine Doku, kein Deploy nötig):**
- ~~Anthropic als Auftragsverarbeiter: DPA/AVV, Subprozessoren, SCC, ZDR → AVV+VVT+TOM ergänzen~~
  **erledigt 11.07. (v1.2-Dokumente in Outputs).** Restpunkte VOR Produktivsetzung des OCR-Backends:
  A1 DPA-Fassung abrufen/ablegen + kommerzielles API-Konto verifizieren + Anthropic-TIA-
  Unterstützungsdokumentation anfordern · ~~A2 kurzes TIA dokumentieren~~ **erledigt 12.07.
  (TIA_Anthropic_v1_0.docx; zugleich DPF-Angabe berichtigt → AVV v1.3, siehe Schnellüberblick)** ·
  A3 Art.-13/14-Information an Lieferanten anwaltlich klären, TIA in die Prüfung einbeziehen
  (Details: AVV-Verzeichnis v1.3, Abschnitt „KI-Belegauswertung").
- ~~`mDatenschutz`-Modal für Website (sa_c3-Checkbox ohne verlinktes Datenschutz-Dokument = Art.-13-DSGVO-Lücke)~~
  **erledigt 12.07. (13. Sitzung):** Modal mit Lesefassung (16 Abschnitte) befüllt; Deploy
  `index_website.html` → Cloudflare Pages ausstehend.
- Rechtsabnahme der Datenschutzerklärung (VOR Launch; TODO-Kommentar im Modal-Code gesetzt).
- Impressum-Platzhalter (`[Anschrift ergänzen]`, Vertretungsregelung GbR) vervollständigen –
  Nutzer-/Anwaltsentscheidung (Widerspruch Zweiteilung Impressum vs. GbR-Angabe in DSE klären).

**D – Website-Launch-Voraussetzungen:**
- ~~`mDatenschutz`-Modal (sa_c3)~~ **erledigt 12.07.** · Website-Fotos, Energiezertifikat-Daten.
- Aushang Etappe 3 (Website-Integration) – **Analysebefund 12.07. (13. Sitzung):** Kern ist in der
  Projektkopie BEREITS umgesetzt (Live-Fetch `/api/leerstand` → `renderAngebote` mit Galerie,
  `energie`-Anzeige, Standort-Anonymisierung, delegierte Handler, Leer-Fallback, SA-Verknüpfung
  per Kennung). Rest-Delta klein: (a) veralteten „Beispiel-Einträge"-Einrichtungshinweis (Z. 226)
  entfernen, (b) `frei_ab` rendern (Backend liefert es bereits). **Blockiert durch R6:** vor
  Umsetzung Live-Datei anfordern.

**E – Technische Altpunkte:**
- CSP: `unsafe-inline` entfernen (C1-Migration) – erfordert Umbau der Inline-Handler; derzeit noch aktiv.
- ~~B3/V7: Kappungsgrenze an Gemeinde/PLZ binden; Restfälle prüfen~~ **erledigt v205** (Kern seit
  v178; v205 schließt Stadtteil-/Umlaut-Schreibweisen via `gemeindeNorm`; 57er-Liste nachgezählt).
- ~~`navigator.storage.persist()` fehlt~~ **erledigt v195**; ~~QuotaExceeded-Handler~~ **erledigt v195**;
  ~~Float-Geldarithmetik ohne Cent-Rundung~~ **erledigt v195 (rc()-Systematik)**;
  ~~Rollentrennung nur UI~~ **erledigt v196 (Geräte-Profil)** – Restpunkt: harte Trennung per eigenem
  MS-Konto je Hausmeister (organisatorisch, R22).
- **R22 (NEU):** OneDrive-Konto-Trennung für HM-Geräte: eigenes Microsoft-Konto je Hausmeister mit
  Freigabe NUR auf `immo_daten_hm.json`/HM-Ordner; erst dann ist die v196-Trennung auch gegen
  böswillige Token-Nutzung hart. Bis dahin: Geräteverschlüsselung Pflicht (~~TOM ergänzen~~ **in TOM v1.2
  Abschnitt 2a dokumentiert, 11.07.** – organisatorische Umsetzung am HM-Gerät bleibt Nutzeraufgabe).

**F2 – Nachgetragen bei Memory-Konsolidierung (10.07., aus §12/Alt-Prosa gerettet):**
- ~~**23f Teilen-Funktion** beim Öffnen jeder Datei über nativen OS-Dialog~~ **erledigt v203**
  (zentraler Helfer `dateiTeilen` + Rechnungsbeleg-Teilen-Button; alle anderen Öffnungswege hatten
  bereits eigene Teilen-Funktionen).
- ~~**23h WhatsApp/Messenger** über denselben nativen Teilen-Dialog~~ **erledigt v203** (im nativen
  OS-Dialog automatisch enthalten).
- ~~**P16 – A2-PIN-Migration:** alle Nutzer auf `pinHash`/`pinSalt` migrieren, Fallback entfernen~~
  **erledigt v204** (`pinMigrationAlleUser` an 3 Einbauorten inkl. Login-Rettungsanker;
  Klartext-Vergleich aus `pinPruefen` entfernt).
- ~~**P17/R19 – PII-Bereinigung Projektspeicher:** personenbezogene Altdaten in Projekt-Uploads
  prüfen/entfernen (DSGVO-Restpunkt aus 06.07.)~~ **erledigt 12.07. (13. Sitzung, systematischer
  Scan aller 28 Text-Projektdateien auf IBAN/E-Mail/Telefon/Geburtsdatum/Secrets):**
  (a) PII-Import-JSONs (`IBAN_Import_*`, `Amboss_Mieter_*`, `Mieterwechsel_[G.]_*`, User-Update,
  Zähler) sind NICHT mehr im Projektspeicher – bereits entfernt, §14 korrigiert; (b) einziger
  Rest-Personenbezug war der Mieter-Nachname 3× in DIESER Datei → pseudonymisiert ([G.]);
  (c) IBAN im `fmtIban`-Codekommentar (index-v210) ist **Mod-97-ungültig** = Fantasie-Beispiel,
  kein PII (optional bei nächster regulärer Version auf `DE00…` neutralisieren, kein eigener
  Deploy); (d) keine echten Secrets/Token in Textdateien (Langstring-Scan negativ; H2/P16-Stand
  bestätigt); (e) `Anschreiben_Eigentuemerwechsel_Krefeld.docx` enthält nur Eigentümer-
  Geschäftsdaten + Platzhalter → unkritisch, bleibt; (f) übrige Treffer = False Positives
  (Platzhalter `max@example.de`/`schaden@versicherer.de`, LDI-NRW-Behördenkontakt, IDs).
- **R23 (NEU, aus P17-Scan):** Private Kontaktdaten des Miteigentümers (gmx-Adresse +
  Mobilnummer, Briefkopf-Konstante `verlach37`-Gruppe in `index-v210.html` Z. ~18929) liegen im
  ÖFFENTLICH abrufbaren GitHub-Pages-Quellcode. Betrieblich gewollt (Vermieter-Briefkopf), aber
  weltweite Abrufbarkeit ≠ Mieterschreiben. Entscheidung Nutzer: belassen ODER auf
  `info@nadigpfau.de`/Geschäftsnummer umstellen; löst sich ggf. mit geplanter Custom Domain /
  privatem Hosting (⚑-Altpunkt).

**G – Fahrplan aus Gap-Analyse (Bericht `ANALYSE_GAP_v194.md`):**
- **P2:** ~~Mahnwesen/Offene-Posten~~ **erledigt v197** · ~~Anlage-V-Jahresexport~~ **erledigt v198** · ~~OneDrive-Backup-Generationen~~ **erledigt v199** ·
  ~~ZUGFeRD/XRechnung-Parse VOR KI-OCR~~ **erledigt v201 (lokal, ohne Drittlandtransfer)** · ~~`STORE_DEFS`-Zentralisierung~~ **erledigt v210 (§0ax)** → **P2 damit vollständig abgeschlossen.**
- **P3:** Mieterportal · C1-Migration via Event-Delegation (Muster `data-action-click` existiert) ·
  HeizkostenV-Tiefe prüfen · Delta-Sync · Fristen-Cockpit · Dark Mode · Konsolidierung der 5 Spezial-Teilen-Funktionen auf `dateiTeilen` – **voranalysiert 12.07.:**
  Stellen: Niimbot-Label (~Z. 4064, hat Blob), `mieterVCard` (~10245, hat File), `mangelAnHandwerker`
  (~10391, mehrere Dateien + Text → bleibt Sonderfall), `dokTeilen` (~12541), `exportExcel` (~19641,
  hat Blob). Voraussetzung: `dateiTeilen(quelle,…)` muss zusätzlich Blob/File direkt akzeptieren
  (heute nur fetch-bare URL/dataURL). Bewusst NICHT in Sitzung 12 umgesetzt (4 ungetestete Versionen
  aufgestapelt, reine Hygiene ohne Funktionsgewinn, Regressionsrisiko an funktionierenden Pfaden) · E-Rechnungs-ERSTELLUNG
  (nur falls künftig B2B-Stellplatz-/Gewerbemieter ohne Kleinunternehmerstatus; Rechtslage siehe
  Schnellüberblick 11.07. – derzeit KEINE Pflicht).

**F – Buchhaltung: optionale Folgeschliffe:**
- ~~Kautionsdokumente-Liste: pro-Eintrag-Typlabel + typ-abhängiger Edit-Button~~ **erledigt v202.**
- ~~Robustheitsschliff `barzahlungSpeichern`: `idbPut` in try/catch~~ **erledigt v202 (Modal bleibt
  bei Fehler offen; Quota ohne Doppel-Toast).**

**Erledigt in dieser Sitzung (8. Sitzung, v186–v194):** §3 hist. Mieter · §6 Einnahmen-Aufschlüsselung ·
§5 Regenwasser (v186) · §1 Versorger-Passwortschutz · §2 Verbrauchsdiagramm (v187) · §13 KI-OCR Frontend
(v188, Backend offen) · §14 Lernregeln (v189) · §4 Barzahlung + §24 Excel-Export (v190) · §10
Kautionsendabrechnung (v191) · Etappe D1 Batch-Import (v192) · §14 Regelverwaltung (v193) · Etappe D2
Batch-Detail + selektives Rückgängig (v194). §9 (Zins/Tilgung) bereits aus früherer Sitzung vorhanden.

---

**★ FRÜHERER STAND: v194 (Etappe D2 – Batch-Detail + selektives Rückgängig – 08.07., 8. Sitzung).** → Details **§0ar**.

**★ FRÜHERER STAND: v193 (§14 Regelverwaltung – 08.07., 8. Sitzung).** Reines Frontend, DB_VER 34** → Details **§0aq**.

**★ FRÜHERER STAND: v193 (§14 Regelverwaltung – 08.07., 8. Sitzung).** Reines Frontend, DB_VER 34** → Details **§0aq**.

**★ FRÜHERER STAND: v192 (Etappe D1 – Batch-Import-Infrastruktur – 08.07., 8. Sitzung).** Reines** → Details **§0ap**.

**★ FRÜHERER STAND: v191 (§10 Kautionsendabrechnung – 07.07., 8. Sitzung).** Reines Frontend, DB_VER 33** → Details **§0ao**.

**★ FRÜHERER STAND: v190 (§4 Barzahlung + Excel-Export – 07.07., 8. Sitzung).** Reines Frontend, kein** → Details **§0an**.

**★ FRÜHERER STAND: v190 (§4 Barzahlung + Excel-Export – 07.07., 8. Sitzung).** Reines Frontend,** → Details **§0an**.

**★ FRÜHERER STAND: v189 (§14 Lernregeln – 07.07., 8. Sitzung).** Reines Frontend/IndexedDB (Backend-** → Details **§0am**.

**★ FRÜHERER STAND: v188 (KI-Rechnungserkennung – Frontend – 07.07., 8. Sitzung).** Integration des** → Details **§0al**.

**★ FRÜHERER STAND: v187 (Sicherheit + Verbrauchsdiagramm – 07.07., 8. Sitzung).** Zwei Nutzer-** → Details **§0ak**.

**★ RECHNUNGS-OCR (Kollege) – geprüft, integrierbar (siehe §12-P33).** ZIP `azure-function-rechnung-ocr`
enthält eine saubere Azure Function `POST /api/rechnung-ocr`: nimmt Beleg (Base64 Bild/PDF) + Objektliste,
ruft serverseitig Claude Vision (Haiku 4.5, `ANTHROPIC_API_KEY` in App Settings – **nicht** hardcodiert),
liefert strukturiertes JSON (Lieferant, RgNr, Datum, Fällig, Beträge/MwSt, Leistungszeitraum, IBAN,
Kategorie-/Notiz-/Objektvorschlag per Adressabgleich). `authLevel:'function'` (x-functions-key), 6-MB-Limit,
30-s-Timeout, Fehlerbehandlung – passt exakt zum bestehenden Backend-Muster. **Offen:** Backend-Deploy nach
`src/functions/` (Deploy-Falle beachten) + App Settings; Frontend-Erfassungs-UI fehlt (`modalRechnungErfassen`
war nur Prototyp); **DSGVO-Flag:** Anthropic als weiterer Auftragsverarbeiter für Belegdaten +
Drittland/Art. 28/44 prüfen. Bindeglied zu §21 (Belegverknüpfung, Etappe D/E) – wertet Buchhaltung stark auf.

**★ FRÜHERER STAND: v186 (Buchhaltungs-Etappe C, Teil 1 – 07.07., 8. Sitzung).** v183–v185 vom Nutzer** → Details **§0aj**.

## §0F1. Etappe F1 – Objektbezug der Buchhaltung (v225–v227) + F0 (v223/v224)

**Anlass:** Buchhaltungs-Analyse (Basis v220): 25 Befunde B1–B25, Roadmap F0–F9. Kritischster Befund **B1** – Buchungsrecords ohne Objektbezug: bei Sammelkonten (Krefeld = 8 Objekte an einem Konto) mischt die NKA die Kosten aller Gebäude, Anlage V ist nicht je Objekt darstellbar.

**F0 – Sofortmaßnahmen (v223/v224, abgeschlossen):**
- **B3 (v223):** `zaParseCSV` zählt identische Buchungen (`occ`), ab dem 2. Vorkommen fließt der Zähler in `zaBuchungId` → echte Wiederholungen (gleicher Tag/Betrag/Zweck) werden nicht mehr fälschlich als Duplikat verworfen.
- **v224:** `zaImportInfo`/`zaImportBannerHtml` (B7.1 Lückenwarnung >3 Tage, B21 Kontrollsummen Anzahl/Summen/Datumsbereich); Mahnanrede personalisiert über `anredeMitKomma(getAnrede(m))` (B23); `kautionPlausiPruefen` warnt bei >3× Nettokaltmiete, §551 Abs.1 BGB (B9-Minimal, Split-Pfad).

**F1 – Objektbezug (v225–v227):**
- **Schritt 1 (v225):** Feld `objektId` am Buchungsrecord. Auto-Vererbung: `zaMatch` reicht `objektId` über alle Trefferwege (IBAN/WE/Stellplatz) durch → Eingänge mit Mieter-Treffer erben das Mieter-Objekt; Ein-Objekt-Konten (Ruhrtalstr., Amboßstr.) trivial über `zaObjektFuerBuchung(kontoId, match)`. Einmalige, idempotente Bestandsmigration `zaObjektMigration()` (setzt nur leere Felder, settings-Flag `objektMigrationV225`, ein `syncSoon()` am Ende).
- **Schritt 2a (v226):** Konstante `KOSTENGRUPPEN` für gebäudeübergreifende Kosten und zentraler Auflöser `buchBetroffeneObjekte(b)` (Vorrang `kostengruppe` > `objektId` > leer), plus `buchKostenstelleName/Wert`. Rein additiv, kein Sync-Risiko.
- **Schritt 2b (v227):** Zuordnungs-UI in `zaRenderBuchhaltung` (nur `konto.objekte.length>1`): `<select>` je Ausgabe (Gruppen + Einzelhäuser), Vorschlag-Chip auf die „…gesamt"-Gruppe (`buchKsAlleGruppe`), Massenzuordnung `buchKostenstelleMasseAlle`, Speicherpfad `buchKostenstelleSetzen` mit `erfasseLeerungen`-Tombstone für sauberen Gruppe↔Objekt-Wechsel über Sync.

**Kostengruppen-Modell (Nutzer-Klärung 16.07.2026):** Krefeld rechnet im Regelfall über alle Wohnhäuser gemeinsam ab; nur wenige Positionen betreffen „nur Inrather" oder „nur Wilmendyk". Die Feinverteilung auf Häuser/Mieter erledigt die NKA über ihre bestehenden Schlüssel (`personen`/`wfl`/`we`). Definierte Gruppen: `kref_alle` (inr181/183/185 + wilm7/9/11/13), `kref_inr`, `kref_wilm`, `mg_alle` (kyff28/30/32). Tiefgarage = eigenes Objekt `tgkref` (separat). Mindener 23/25 je Haus einzeln. Kyffhäuser gemeinsam.

**Weitere Entscheidungen:** Buchungsänderungen für alle mit Verwalterrechten (→ GoBD-Journal F4 muss wer/wann/was protokollieren); DATEV-Export nicht nötig (→ F9 nur optional SEPA).

**Testabdeckung (Node, real):** F0 22/22 + B3 14/14; F1-1 15/15 (Vererbung je Kontotyp, Migration idempotent); 2a 17/17 (Auflöser inkl. TG nicht in kref_alle, Gruppen-Vorrang, null-sicher); 2b 23/23 (Options-Rendering, Vorschlag-Gruppe je Konto, Tombstone-Logik Gruppe↔Objekt, Massenfilter). Funktions-Diff durchgehend 0 verloren.

**F1 Schritt 3 – NKA-Objektbezug + Sammel-NKA (v228, v233; v229–v232 zurückgerollt):**
- **3a (v228):** `nkaBuchungBezug` klassifiziert je Ausgabe (einzel/gruppe/unzugeordnet/fremd); das NKA-Buchpanel eines Einzelhauses blendet `fremd` aus → behebt den offensichtlichsten B1-Fehler. Gruppen-/unzugeordnete Kosten gekennzeichnet.
- **~~v229–v232~~ (ZURÜCKGEROLLT):** Neubau eines Gruppen-Sammel-NKA über `modalNKA` — als Duplikat verworfen, denn die App besitzt bereits die **Liegenschafts-NKA**: `LIEGENSCHAFTEN` (lg_krefeld = 7 Wohnhäuser, lg_mg, lg_minden, lg_ruhrt, lg_monheim), `modalNKALiegenschaft(lgId)` + `erstelleNKALiegenschaft` mit zeitraumgenauen Monats-Divisoren (`flaechenMonate`/`personenMonate`/`weMonate`), **Leerstandsumlage** und Umlagekreis `wfl_gruppe` über `KREFELD_GRUPPEN` (inrather: 181/183/185, wilmendyk: 7/9/11/13) — inkl. eigener Vorlagen `NKA_LG_VORLAGEN` (Wasser/Entwässerung getrennt je Kreis) und UI-Einstieg „NKA Krefeld"/„NKA MG". **Lehre:** vor Feature-Neubau alle vorhandenen Module kartieren; Suchbegriffe über den eigenen Namensraum hinaus prüfen (hier „Liegenschaft"/„Lg" statt nur „nka"/„Gruppe").
- **3b-4 = v233 (Basis v228):** **Buchübernahme in die Liegenschafts-NKA.** Kernfunktionen: `nkaLgKonto(lg)` (Konto dessen `objekte` ⊇ `lg.objektIds`), `nkaLgBuchBezug(b,lg)` → drin/unzugeordnet/fremd (TG `tgkref` = fremd), `nkaLgKreis(b)` → inrather/wilmendyk/alle (aus `buchBetroffeneObjekte` × `krefeldGruppeVonObjekt`), Mapping `NKA_LG_BUCH_MAP` + `nkaLgZielVorschlag(lgId,kat,kreis)` (z. B. wasser×inrather→`wasser_inr`, allgemeinstrom→`beleuchtung` (Krefeld) bzw. `allg_strom` (MG), gartenpflege→`vorgarten` (MG); wasser×alle bei Krefeld bewusst OHNE Auto-Ziel). UI: Button + Panel im Lg-Dialog (`nkaLgBuchPanelToggle`), gruppiert Ausgaben Kategorie×Kreis mit Ziel-Selects, `nkaLgBuchUebernehmen` summiert je Ziel und befüllt `nkaLg_<id>`-Felder (ersetzt mit Meldung; Zeilen ohne Ziel übersprungen; Heizkosten ausgenommen = `einzeln` je Mieter). 26/26 Tests; Rollback verifiziert (10 Fkt entfernt, v225–v228 erhalten).

**Sammel-NKA-Modell (final, Nutzer 16.07.):** EINE Abrechnung über alle Gruppen-Mieter via vorhandener Liegenschafts-NKA; 2–3 Teilgruppen-Positionen über `wfl_gruppe`-Kostenarten. Bisher extern (Excel) → keine Altdaten. TG separat, Mindener je Haus (lg_minden existiert, Nutzung optional), Kyffhäuser gemeinsam. Nutzer will die Lg-NKA „noch weiter prüfen".

**Offen (nächste Schritte):** Gerätetest v233; Anlage-V-Export auf `buchBetroffeneObjekte` (B1-Steuerteil); danach F2 (Leistungszeitraum, B2, §556 BGB); F4 GoBD-Journal (alle Verwalter ändern → wer/wann/was).

---

## §0Rev21. Vollständiger Code-Review Nr. 2 (18.07.2026, 21. Sitzung, Basis v238)

**Umfang:** index-v238.html (1.955.181 Bytes, 34.624 Zeilen, 2 Inline-Script-Blöcke, `node --check` OK,
1328 Funktionen, 0 Duplikate) · 9 Backend-Functions (alle `node --check` OK) · sw.js · manifest.json ·
index_website.html (1 Script-Block, OK). Methode: automatisierte Muster-Scans (XSS/innerHTML 273 Stellen,
Secrets, localStorage, JSON.parse, catch-Blöcke) + manuelle Prüfung der sicherheits- und sync-kritischen
Pfade (Bankimport-Rendering, Token-Persistenz, Krypto, mergeRecord/Tombstones, v238-mietfrei).

### Befunde und Status

| # | Prio | Bereich | Befund | Status |
|---|------|---------|--------|--------|
| R1 | HOCH | inbox-mark-read.js | §0au-Fix (e.message im 500er-Body) fehlte in der Projektkopie – Doku sagte „erledigt". Reales Risiko: alter Stand wird deployt (K1-Muster). | **GEFIXT** (Outputs) |
| R2 | MITTEL | zaehlerOcr.js | Keine Ausgabe-Whitelist (Inkonsistenz zu rechnungOcr): rohes Modell-JSON inkl. Fremdfeldern ging an die App; kein temperature:0; Netzwerkfehler→504. | **GEFIXT** (Outputs, 11/11 Tests) |
| R3 | MITTEL | sw.js | Navigation-Cache ohne `netz.ok`-Prüfung: Serverfehlerseite konnte Offline-index.html überschreiben. | **GEFIXT** (Outputs) |
| R4 | MITTEL | index-v238 Z3176 | `pinHash` = SHA-256(salt+pin) ohne Key-Stretching. 4–6-stellige PINs aus gesyncter immo_daten.json in Sekunden bruteforcebar. | **GEFIXT in v239** (PBKDF2-200k, Upgrade-on-Login, Feld-Mix-Heilung, 18/18 Tests) |
| R5 | NIEDRIG | index-v238 Z8642 | Lager-Detail: `e.zweck` (Entnahmen) und `a.notiz` unescaped in innerHTML (Self-XSS, einzige esc()-Lücken im Bestand). | **GEFIXT in v239** (5 esc-Stellen) |
| R6 | NIEDRIG | index-v238 Z3259 | `cryptoConfig` (salt+check) liegt in `settings` (sync:true) → Prüf-Blob in OneDrive-JSON = Offline-Bruteforce-Fläche fürs Versorger-Master-PW. PBKDF2-200k dämpft; Sync ist für Mehrgeräte-Entsperrung nötig = bewusster Trade-off. Gegenmaßnahme organisatorisch: starkes Master-PW. | DOKUMENTIERT |
| R7 | NIEDRIG | leerstand.js | `base64Zerlegen` nimmt präfixlosen Base64 als image/jpeg an – kein Magic-Bytes-Check. Nur mit Function-Key erreichbar; Härtungsoption bei nächstem Backend-Anlass. | OFFEN |
| R8 | INFO | Gesamt | 156 leere catch-Blöcke (bewusst defensives Muster, aber Diagnose-Verlust) · 6 console.log-Reste (Migrations-Diagnose, unkritisch) · 887 Inline-onclick (= C1-Altpunkt). | techn. Schuld |

### Positiv verifiziert (kein Handlungsbedarf)
- **XSS:** zentrale `esc()`-Funktion konsequent; ALLE Renderpfade fremdbestimmter Daten (Bank-CSV:
  `b.zweck`, `b.name`, IBAN; OCR-Antworten; Website-Leerstand) sind escaped. Einzige Lücken: R5 (intern).
- **Secrets:** keine API-Keys/Passwörter im Frontend-Code; `x-functions-key` nur als Header-Name;
  `SETTINGS_GEHEIM`-Filter (backendKey, saEncKey) an beiden Pfaden (exportBackup Z26264, Sync Z27151) intakt.
- **Token-Persistenz:** MS-Graph-Tokens in IndexedDB `od_auth` mit `sync:false` (STORE_DEFS Z93) –
  nicht in Backup/OneDrive-JSON; localStorage-Altbestand wird migriert und entfernt.
- **STORE_DEFS (v210):** konsistent, alle 41 Stores mit sync/merge/index-Attributen; abgeleitete Listen.
- **v238 mietfrei:** `mietfreiImMonat`/`mfCollect` validieren Formate; Löschpfad Tombstone-korrekt, da
  `erfasseLeerungen` über den Alt-Snapshot iteriert und `_istLeer(undefined)`/`_istLeer([])`=true –
  gelöschtes `m.mietfrei` propagiert als `_geleert`-Tombstone über den Sync.
- **Backend:** OData-Filter überall mit `''`-Escaping; selbstauskunft.js AES-256-GCM korrekt (96-bit IV,
  AuthTag), atomarer Token-Verbrauch per etag; leerstand.js Kennung-Whitelist (M2) vorhanden;
  rechnungOcr.js vorbildlich (Whitelist, Timeout, keine Beleg-Logs).
- **JSON.parse:** alle 18 Stellen in try/catch oder Deep-Clone-Muster.
- **Website:** esc() konsequent, keine Storage-Nutzung, CSP-relevante Muster sauber.

### Architektur-/Sicherheits-/Schulden-Bewertung
- **Architektur: gut (für den Ansatz).** Single-File mit klarer Modul-Gliederung, STORE_DEFS als Single
  Source of Truth, zentrale Helfer (esc, rc, fmtEur, dateiTeilen, fotoQuelle-Familie). Strukturelle
  Grenze bleibt die 1,9-MB-Datei (Parse-Zeit auf Altgeräten, Merge-Konflikte, Review-Aufwand) – bewusste
  Entscheidung, kein Umbau empfohlen.
- **Sicherheit: befriedigend bis gut.** Kein kritischer Befund. Größter struktureller Punkt bleibt C1
  (`unsafe-inline` + Function-Key/Tokens im Client): jede einzelne XSS-Lücke wäre voll ausnutzbar –
  deshalb bleibt konsequentes esc() (R5 schließen!) die wichtigste laufende Disziplin.
- **Technische Schulden: moderat, kontrolliert.** Gerätetest-Rückstand v225–v238 ist aktuell die größte
  Schuld (14 ungetestete Versionen, davon 1 zurückgerollter Strang); dazu R8-Punkte und v237-Doku-Lücke.

### Priorisierte Fix-Roadmap
1. **Sofort (kein Code):** Deploy-Rückstand abbauen – Gerätetest + Gesamtpaket v238 live (DEPLOY_CHECKLISTE).
2. **Backend-Deploys:** inbox-mark-read.js (R1, K1-Diff!) · zaehlerOcr.js (R2) · rechnungOcr.js (offen).
3. **Nächste Frontend-Version (v239):** R5 (esc im Lager-Modul, 2 Zeilen) + R4 (PIN-PBKDF2 + Migration).
4. **Mittelfristig:** C1-Migration via Event-Delegation (Muster existiert) · R7 · leere-catch-Triage.

## §R11Plan. CSP-Migrationsplan – Vorplanung (19.07.2026, 23. Sitzung, Basis v244)

**Status: reine Planung, KEINE Code-Änderung.** Grundlage für die erste Claude-Code-Sitzung
(Umstiegspaket, siehe START_HIER_Claude_Code.md). Zahlen automatisiert aus v244 ermittelt.

**Befund (v244):** 1084 Inline-Handler gesamt – 925 `onclick`, 123 `onchange`, 33 `oninput`,
2 `onerror`, 1 `onkeydown`. 488 distinkte Funktionsnamen. `style-src` enthält ebenfalls
`unsafe-inline` (separates, deutlich risikoärmeres Thema – nicht Teil dieses Plans).

**Bereits vorhanden (v147):** `window.__act` + `registerActions()` + `__delegate()`
(Z. ~1508–1543), global auf click/change/input. Aktuell nur **2 Argumente** (`data-arg`/
`data-arg2`), `this` im Handler = Element (funktioniert bereits für `onchange="fn(this)"`-Muster).

**Argument-Verteilung bei Single-Call-`onclick`:** 0 Arg. 310 · 1 Arg. 385 · 2 Arg. 124 ·
3 Arg. 29 · 4 Arg. 10 · 5 Arg. 2. Mehrzeilige/kombinierte Handler: 72× `event.stopPropagation();fn()`,
5× reine `this.X`-Manipulation ohne Funktionsaufruf, 4× Inline-Arrow/Async-IIFE (harte Einzelfälle),
1× `onkeydown` mit `event.key`-Prüfung, 2× `onerror`. Häufigste Handler: `closeModal` 156×,
`nav` 21×, `objTab` 13×, `openFoto` 12×, `odBrowserOeffnen` 11×, `switchSettingsTab` 7×.

### Etappenplan

**Etappe 0 – Gerüst ertüchtigen (Voraussetzung, geringes Risiko, nur additiv):**
- `data-arg3`/`data-arg4` (oder JSON in einem `data-args`) für die 41 Fälle mit 3+ Argumenten.
- `data-stop`-Attribut: `__delegate` ruft vor `fn` automatisch `ev.stopPropagation()` auf
  (deckt die 72 Kombi-Fälle ab, ohne jeden einzeln umzuschreiben).
- Kleine Wrapper-Funktionen für die 5 reinen `this.X`-Fälle (z. B. `function selectSelf(){this.select();}`).
- Die 4 Arrow-/Async-IIFE-Fälle einzeln von Hand in benannte Funktionen umschreiben (kein Muster,
  kein Automatisierungskandidat).
- Eigene Tests NUR für das Gerüst selbst (data-arg3, data-stop, Kontext), bevor ein einziger
  Bestandshandler angefasst wird.

**Etappe 1 – Pilot-Batch (Tooling verproben, hoher sichtbarer Nutzen):**
`closeModal` (156×) + Kernnavigation `nav`/`objTab`/`switchSettingsTab`/`openFoto` (~53×) =
~209 Handler, praktisch alle 0–1-Argument, über die ganze App verstreut. Jeder Modal-Dialog
ist danach ein Testfall – Fehler fallen sofort auf, nicht erst bei einem Rand-Feature.

**Etappe 2–5 – automatisierte Massenmigration (Python-Skript, Muster wie bestehende Patch-Skripte):**
Regex erkennt `onclick="fn(...)"` → ersetzt durch `data-action-click="fn" data-arg="…" data-arg2="…"`,
ergänzt am Ende automatisch `registerActions({...})` für alle neuen Namen (dedupliziert).
Reihenfolge nach Risiko/Aufwand: 0 Argumente (310) → 1 Argument (385) → 2 Argumente (124) →
`onchange` (123, überwiegend 0–1 Arg.) → `oninput` (33, überwiegend 0–1 Arg.).
Nach jedem Batch zwingend: Funktionsdiff **muss 0/0 zeigen** (keine Funktion verschwindet, nur
der Aufrufweg ändert sich) + Zähler „verbleibende `onclick=`" als Fortschrittsmaß.

**Etappe 6 – Handarbeit (~125 schwierige Fälle, kein Blind-Patch):**
3+ Argumente (41) · `stopPropagation`-Kombis (72, sofern nicht schon durch `data-stop` in
Etappe 0 erledigt) · reine `this.X` (5) · Arrow/Async-IIFE (4) · `onkeydown`/`onerror` (3).
Einzeln prüfen – hier steckt tatsächlich Ablauflogik (Event-Objekt, mehrere Schritte), kein
mechanisches Suchen-Ersetzen.

**Etappe 7 – CSP schärfen (letzter Schritt, erst wenn Zähler = 0):**
`grep -c 'onclick="\|onchange="\|oninput="'` muss 0 sein, dann `'unsafe-inline'` aus
`script-src` entfernen. **Alle Zwischenstände (Etappe 0–6) bleiben mit `unsafe-inline` voll
funktionsfähig und normal deploybar** – das Schärfen selbst ist ein einzeiliger, aber
risikoreicher letzter Schritt (Browser blockiert jetzt erstmals statt nur additiv zu sein),
deshalb danach Vollregression + kompletter Gerätetest aller Module Pflicht, kein Teil-Deploy.

**Aufwandsschätzung:** Etappe 0+1 ~0,5 Tag · Etappe 2–5 (automatisiert, je Batch getestet) ~1 Tag ·
Etappe 6 (Handarbeit) ~1 Tag · Etappe 7 (CSP + Vollregression) ~0,5 Tag. Realistisch 2,5–3,5
Arbeitstage – deckt sich mit der bisherigen Einschätzung „Mehrtage-Refactor" (§11/R11).

**Optional, separat, nicht Teil dieses Plans:** `style-src 'unsafe-inline'` (geringeres Risiko,
eigener kleiner Punkt, bei Gelegenheit).

## 0. Versions-Changelog (vollständig, jüngste Stände)

| Version | Datum | DB_VER | Inhalt |
|---------|-------|--------|--------|
| **v238** | **17.07.2026** | **34** | **★ AKTUELL · Mietfreie Zeit (Basis v237).** Mieterfeld `m.mietfrei` (Zeiträume von/bis-Monat, art kalt/voll, Grund) + Formular-Editor (mf*-Funktionen, vzHist-Muster). `zaSollIst`: Soll im Zeitraum via `mietfreiImMonat`/`mietfreiSollMo` reduziert (kalt = NK-VZ+SP, voll = nur SP), Status `mietfrei`, keine Warnung; Offene Posten/Mahnung erben. Save nur bei vorhandenem Formularblock (kein Datenverlust). +9 Fkt (1319→1328), 17/17 Tests. CACHE `nadigpfau-v238`. |
| **v237** | 16.07.2026 | 34 | ⚠️ **Doku-Lücke** – Datei lag als Projektstand vor, Sitzungsinhalt nicht im Memory dokumentiert; nachzutragen. |
| **v236** | **16.07.2026** | **34** | **F2 Schritt 2 – Leistungszeitraum wirksam (B2-Kern).** `buchNkaDatum` (Zeitraum-Mittelpunkt = Mehrheitsregel), beide NKA-Buchpanels filtern danach (+Hinweis), `buchKatSummen` +optionaler `datumFn` (kompatibel), LZ-Badge in Buchhaltungszeile; Anlage V bewusst bei § 11 EStG Zufluss. +1 Fkt (1316→1317), 11/11; 9 Regressionssuiten grün. CACHE `nadigpfau-v236`. |
| **v235** | **16.07.2026** | **34** | **F2 Schritt 1 – Leistungszeitraum-Erkennung.** Parser `buchLeistungszeitraum` (konservativ, nur eindeutige Muster), Felder an Ausgängen via `zaBuchungRecord`, idempotente Migration `zaLeistungMigration` (Flag `leistungMigrationV235`). +2 Fkt (1314→1316), 24/24 + 5/5. CACHE `nadigpfau-v235`. |
| **v234** | **16.07.2026** | **34** | **Anlage-V-Export objektfähig (B1-Steuerteil).** Blatt 4 „Kosten je Objekt“ (je Kostenstelle, GEMEINSAM/ohne Zuordnung separat, keine Auto-Aufteilung), Einzelnachweis-Spalte „Objekt/Kostenstelle“, Blatt 3 via `b.objektId`; Bestands-Bug E1b (Stellplatzmieten fehlten in „Miete je Objekt“) behoben. Inline, 0 Fkt-Diff, 13/13. CACHE `nadigpfau-v234`. |
| **v233** | **16.07.2026** | **34** | **F1-Abschluss – Buchübernahme in Liegenschafts-NKA (Basis v228!).** Rollback v229–v232 (Duplikat der vorhandenen `modalNKALiegenschaft`). Neu: `nkaLgKonto`/`nkaLgBuchBezug`/`nkaLgKreis`/`NKA_LG_BUCH_MAP`/`nkaLgZielVorschlag`/`nkaLgBuchPanelToggle`/`nkaLgBuchUebernehmen` — Panel im Lg-Dialog befüllt `nkaLg_`-Kostenfelder aus kategorisierten Buchungen (Kreis-Vorschläge via Kostenstellen; TG/fremde raus; Heizkosten ausgenommen). +6 Fkt (1308→1314), 26/26. CACHE `nadigpfau-v233`. |
| **v232** | **16.07.2026** | **34** | **⚠️ ZURÜCKGEROLLT (nicht deployen, nicht darauf aufbauen).** ~~F1 Schritt 3b-3a – Buchübernahme in Gruppen-NKA.~~ `nkaBuchungBezugGruppe(b,ctx)` → ganze_gruppe/teilgruppe/unzugeordnet/fremd; `nkaBuchPanelToggle` verzweigt (Gruppen-Konto, nur „ganze Gruppe" übernehmbar), Teilgruppen-Hinweis, Buchpanel-Button reaktiviert. +1 Fkt (1313→1314), 9/9. CACHE `nadigpfau-v232`. |
| **v231** | **16.07.2026** | **34** | **⚠️ ZURÜCKGEROLLT (nicht deployen, nicht darauf aufbauen).** ~~F1 Schritt 3b-2b – `modalNKA` Gruppen-fähig.~~ Kopf verzweigt via `nkaZielKontext` (Mieter aller Häuser, Divisoren über Gruppe); Einstieg „Sammel-NKA"-Button (`nkaSammelGruppeFuerObjekt`); Buchpanel im Gruppenmodus vorerst Hinweis. Einzelhaus-Pfad unverändert. +1 Fkt (1312→1313), 7/7 + Struktur-Checks. CACHE `nadigpfau-v231`. |
| **v230** | **16.07.2026** | **34** | **⚠️ ZURÜCKGEROLLT (nicht deployen, nicht darauf aufbauen).** ~~F1 Schritt 3b-2 – NKA-Ziel-Auflösung.~~ `getNKAVorlage` erkennt Gruppen-IDs (Default-Vorlagen `_krefeld_default`/`_mg_default`); `nkaZielKontext(ziel)` kapselt Objekt ODER Gruppe. +1 Fkt (1311→1312), 10/10. CACHE `nadigpfau-v230`. |
| **v229** | **16.07.2026** | **34** | **⚠️ ZURÜCKGEROLLT (nicht deployen, nicht darauf aufbauen).** ~~F1 Schritt 3b-1 – Fundament Gruppen-Sammel-NKA.~~ `nkaGruppeObjekte`, `nkaGruppeMieter` (alle Mieter der Gruppe, Zukünftige raus, Vormieter bleiben), `nkaGruppeDivisoren` (Umlagekreis-fähig, identisch zu `_nkaDivisoren`). +3 Fkt (1308→1311), 15/15. CACHE `nadigpfau-v229`. |
| **v228** | **16.07.2026** | **34** | **F1 Schritt 3a – NKA-Objektbezug (Kern von B1).** `nkaBuchungBezug(b,objektId)`; NKA eines Hauses filtert `fremd` heraus (keine fremden Gebäude mehr); Gruppen-/unzugeordnete Kosten gekennzeichnet. +1 Fkt (1307→1308), 11/11. CACHE `nadigpfau-v228`. |
| **v227** | **16.07.2026** | **34** | **F1 Schritt 2b – Kostenstellen-Zuordnung im Buchhaltungs-Tab.** `<select>` je Ausgabe (nur Mehr-Objekt-Konten kref/mg/mind) mit Gruppen + Einzelhäusern; Auto-Vorschlag-Chip „gesamt"-Gruppe; Massenzuordnung `buchKostenstelleMasseAlle`; Speicherpfad `buchKostenstelleSetzen` mit `erfasseLeerungen`-Tombstone (sauberer Gruppe↔Objekt-Wechsel im Sync). +5 Fkt (1302→1307), 23/23 Logiktests, Regressionen grün. CACHE `nadigpfau-v227`. Details §0F1. |
| **v226** | **16.07.2026** | **34** | **F1 Schritt 2a – Kostengruppen-Fundament.** Konstante `KOSTENGRUPPEN` (kref_alle/kref_inr/kref_wilm/mg_alle) + zentraler Auflöser `buchBetroffeneObjekte(b)` (Vorrang Gruppe>Objekt>leer) + `buchKostenstelleName/Wert`. Rein additiv, +3 Fkt (1299→1302), 17/17 Tests. CACHE `nadigpfau-v226`. Details §0F1. |
| **v225** | **16.07.2026** | **34** | **F1 Schritt 1 – Objektbezug (Befund B1).** Feld `objektId` an Buchung + Auto-Vererbung (`zaMatch` reicht Mieter-Objekt durch; Ein-Objekt-Konten trivial) + idempotente Migration `zaObjektMigration()` (Flag `objektMigrationV225`). +2 Fkt (1297→1299), 15/15 Tests. CACHE `nadigpfau-v225`. Details §0F1. |
| **v224** | **15.07.2026** | **34** | **F0-Sofortmaßnahmen (Buchhaltung).** B7.1 Import-Lückenwarnung (`zaImportInfo`/`zaImportBannerHtml`), B21 Import-Kontrollsummen, B23 personalisierte Mahnanrede, B9-Minimal Kautionswarnung §551 BGB (`kautionPlausiPruefen`). +3 Fkt, 22/22 Tests, B3-Regression 14/14. CACHE `nadigpfau-v224`. |
| **v223** | **15.07.2026** | **34** | **B3 Doppelbuchungs-Fix.** Vorkommenszähler `occ` in `zaParseCSV` fließt ab 2. identischer Zeile in `zaBuchungId` → echte Wiederholungen (gleicher Tag/Betrag/Zweck) werden nicht mehr als Duplikat verworfen. 14/14 Tests. CACHE `nadigpfau-v223`. |
| **v222** | **14.07.2026** | **34** | **KI-Auslesen Zählerstände (Anthropic Vision).** Button „Zählerstand aus Foto auslesen" (`zsKiAuslesen`) → `/api/zaehler-ocr` (neue Function `zaehlerOcr.js`), füllt nur leere Felder. +1 Fkt (1293→1294). CACHE `nadigpfau-v222`. Details Schnellüberblick 18. Sitzung. |
| **v221** | **14.07.2026** | **34** | **Einnahmen-Split (Befund B6).** Eingänge auf mehrere Kategorien aufteilbar mit Miete-Vorschlag KM+NK+SP (`splitMieteUebernehmen`); Grundlage für spätere Kautions-/Mehrmonats-Zerlegung. CACHE `nadigpfau-v221`. |
| v217–v220 | 14.07.2026 | 34 | Zwischenstände 16. Sitzung; **Changelog-Detailnachtrag ausstehend** (Inhalte in den Sitzungsabschnitten oben). v220 = Analysebasis Buchhaltung (33.705 Z., 1.338 Fkt). |
| **v216** | **14.07.2026** | **34** | **CSV-Parser Root-Cause.** Nur Verwendungszweck-Zeile 1 gelesen; weitere (Zinsen/Tilgung/Saldo) verworfen. Fix: `zweckKey` (nur Zeile 1, ID-Stabilität) + `zweck` (alle Zeilen). Testbuchungen via „Importe→Rückgängig" neu einlesen. CACHE `nadigpfau-v216`. |
| **v215** | **14.07.2026** | **34** | WE-Vorschlagszeilen-Sackgasse behoben; neutrale Buchungen (Fehlbuchung) von echtem Einkommen getrennt (Anlage-V-Gruppen); voller Transaktionstext im Split-Dialog; Anlage-V-Lücke der 7 neuen Kategorien geschlossen. CACHE `nadigpfau-v215`. |
| **v214** | **14.07.2026** | **34** | Vollständiger Vektor-PDF-Writer (WinAnsi, Helvetica, JPEG-Einbettung) für Mietbescheinigung; Signaturbilder auf feste Canvasgröße normiert. `pdfDoc`-Baukasten bereit. CACHE `nadigpfau-v214`. |
| **v213** | **14.07.2026** | **34** | Alt-Mieter direkt aus Bankimport-Zeilen anlegen; 7 neue Einkommenskategorien; globaler Backdropklick-Fix (✕ statt Backdrop); IBAN-Anzeigebug Vormieter behoben. CACHE `nadigpfau-v213`. |
| **v212** | **13.07.2026** | **34** | **Offene-Posten-Fix (Nutzerbefund):** Rückstände erst ab Beginn der Zahlungserfassung (`datenAb`) und ab Mietbeginn gewertet; Datenlage-Hinweisbox + Sonderfall ohne Eingänge; Chip „Mietbeginn fehlt“; Gruppierung nach Objekt. UX: Toast aria-live, `--amber`→#A86807 (AA), enterkeyhint (7 Suchfelder), prefers-reduced-motion. 13 Node-Smoke-Tests, Funktions-Diff 0/0 (1314). Details Schnellüberblick. |
| **v211** | **12.07.2026** | **34** | **UI-Verbesserungsrunde (eigenständige Analyse):** Wheel-Falle bei `type=number` global entschärft (blur statt Wertänderung); `inputmode="decimal"` an 89 Zahlenfelder; globaler `:focus-visible`-Ring (WCAG 2.4.7); `aria-label` für 8 Icon-Buttons; `--ink-40`→#3B76B0 (Meta-Text-Kontrast 3.14→4.77 AA, 531 Stellen zentral, AMPEL_DUNKEL-Key unberührt); IBAN-Kommentar neutralisiert (P17-Rest). Funktions-Diff 0/0 (1314), keine Logikänderung. Details Schnellüberblick 13. Sitzung. |
| **v210** | **12.07.2026** | **34** | **STORE_DEFS – Store-Listen-Drift strukturell beseitigt (Risiko V2, letzter P2-Punkt).** Eine Konstante `STORE_DEFS` (45 Stores, Flags `{sync,merge,index}`) ersetzt die fünf redundanten Inline-Listen (DB-Anlage, Index-Block, `exportBackup`, `alleStores`, `mergeStores`) → Ableitungen `STORES_ALLE`/`STORES_SYNC`/`STORES_MERGE`. Neuer Store = **ein** Eintrag. **Äquivalenzbeweis:** 45/45 (inkl. Reihenfolge), 42/42, 38/38, alle 59 Indizes identisch; DB-Anlage real ausgeführt. Diff 0/0 (1315), DB_VER 34. Details §0ax. |
| **v209** | **12.07.2026** | **34** | **23a-BACKFILL: Alt-Fotos auslagern (Obermenge v207+v208).** 11 neue Funktionen + Button „Alt-Fotos auslagern" (Einstellungen → Datenspeicher): Analyse (liest nur) → Lauf mit **Dedupe** (Protokoll/fotos-Duplikat = 1 Upload, dieselbe odId), rekursivem Walker (verschachtelte Protokollfotos), Idempotenz, Abbruch, **Fallback bei Upload-Fehler = Record bleibt inline (kein Datenverlust)**; `ausweis`/`lastschrift` + HTML-Archive bewusst ausgeschlossen. Beseitigt den 21-MB-Sync-Treiber. Diff +11/0 (1315), **24/24 Tests real**. DB_VER 34. Details §0aw. |
| **v208** | **12.07.2026** | **34** | **UI-Befunde Gerätetest (Obermenge v207):** (1) `.s-hdr` flex-wrap-Fix + Objekt-Buttons in 4 Gruppen; (2) **Kontrast-Fix dunkler Detailkopf** – Ampel-/Statusfarben waren bei WCAG 1.81–3.28 (Min. 4.5) → neue Map `AMPEL_DUNKEL`/`ampelAufDunkel` → 4.88–6.64, Label `--ink-20`→`--ink-10`, Zusatztext 11 px; (3) Bankverbindung als eingeklapptes `<details>` mit maskierter IBAN (neu `ibanMaskiert`, Datensparsamkeit). Diff +2/0 (1304), 9/9 Smoke-Tests real. Details §0av. |
| **v207** | **11.07.2026** | **34** | **Code-Review v206 (alles grün) + 3 Fixes:** (1) Backend `inbox-mark-read.js`: `e.message`-Leck im 500er-Response entfernt → nur `{ok:false}` (SA-Paket-1-Restpunkt, Deploy ausstehend, K1-Abgleich!); (2) Anlage-V-Kopfzeile aus `APP_VERSION` statt hartcodiert „v198"; (3) Mieter-Detail-Buttons in 5 thematische Gruppen (identische 25 Handler, leere Gruppen ausgeblendet). Diff 0/0 (1302), 16/16 Render- + 5/5 Handler-Smoke-Tests real. Details §0au. |
| v142 | 28.06.2026 | 29 | Energieausweis §80/§87 GEG (`objekt_stamm`), Mieter-Mail (`tenant_mails`), Mail-Papierkorb (App-Seite). |
| v143 | – | 30 | Sicherheits-Patches A1/A3/A4/C1: **CSP-Meta-Tag eingeführt** (Zeile 6), `escAttr`/`telHref`, `buchungen`+`fotos` in Sync; OAuth-Refresh-Token von localStorage → IDB-Store `od_auth` (aus Sync ausgeschlossen, Einmal-Migration). |
| v144 | 29.06.2026 | 30 | Sicherheits-Patch A2 (od_auth-Konsolidierung). Funktionszahl 1059. |
| v147 | 30.06.2026 | 30 | (1) CSP-Fix „Failed to fetch" beim Erststart: `connect-src` um `cdn.jsdelivr.net`, `*.microsoftpersonalcontent.com`, `*.sharepoint.com`, `*.up.1drv.com` ergänzt. (2) Einstieg Event-Delegation: `registerActions` + `__delegate` + globale click/change/input-Listener (Z. ~1178–1210); 4 Handler migriert. Funktionszahl 1106. |
| v148 | 30.06.2026 | 30 | Echte Service-Worker-Registrierung statt `unregister()`-Reset-Block (INVARIANTE: Reset-Block nie zurück); bottom-nav-Fix (`min-height`+`content-box`). |
| v150 | 30.06.2026 | 30 | **Wechsel auf Mehrdatei-Deploy.** Externes `manifest.json`, echte PNG-Icons (`purpose:"any"`+maskable), apple-touch-icon auf PNG. PWA am Gerät installierbar bestätigt. Funktionszahl 1061. Details §0b. |
| **v151** | **30.06.2026** | **30** | **UI-Korrekturen** (keine neuen Stores): Neuer-Mieter-Dialog (Anrede je Person, Personen-Auto-Zähler, Bewohner-Aktionsbuttons), Mietbescheinigung §23 WoGG zeigt alle Vertragspartner-Vollnamen, Wohnungsinfos-Vorbefüllung Fläche/Lage, „Ändern"-Button bei gespeicherten Bescheinigungen. Funktionszahl 1066. Details §0a. |
| **v152** | **30.06.2026** | **30** | **Sicherheits-Patch (gespeicherter XSS).** 21 ungeprüfte `innerHTML`-Interpolationen nutzereingegebenen Freitexts über `esc()`/`escAttr()` abgesichert (Kommentare, Notizen, Dokument-/Artikel-/Kategorie-/Personen-/Zähler-/Benutzernamen, Mieter-Kontakt + 3 Attribut-Felder). Backend `leerstand.js`: MIME-Whitelist (nur JPEG/PNG/WebP) + 8-MB-Limit. `sw.js`-CACHE → `nadigpfau-v152`. Keine neuen Stores, keine Funktionsänderung. Details §0a. |
| **Backend-Deploy** | **30.06.2026** | – | **4 Azure Functions live + getestet:** `leerstand` (GET/POST/DELETE, v152-Härtung verifiziert), `send-mail`, `inbox-trash`, `inbox-mark-read`. 3 Bugfixes (Container, `mail.js`-Pfad, Tabellenname `inbox_trash`→`inboxtrash`). R1+R2 geklärt. Details §0c. |
| **SA-Paket-1** | **01.07.2026** | – | **`send-token`+`token-check` deployt, vollständig E2E-getestet (PowerShell + Browser).** Vierter `mail.js`-Bug behoben (Datei fehlte erneut in `src/functions/`, war nur in `src/` vorhanden – nach Redeploy + Neustart der Function App behoben). Alle 4 Tests grün: `send-token`→`ok:true`+Mail kam an, `token/check`→`ok:true`+korrekte Vormerkung, Browser-Workflow fehlerfrei, Selbstauskunft erscheint im App-Posteingang. **R3 damit vollständig erledigt.** Neuer offener Punkt: Checkbox `sa_c3` in `index_website.html` verlinkt kein Datenschutz-Dokument (siehe §11 R14). Details §0c. |
| v153 | 01.07.2026 | 30 | Mietbescheinigung: (1) Etage/Lage automatisch aus `m.etage` (`mbEtageZahl`/`mbEtageGrundlage`/`mbEtageOrdinal`/`mbLage2AusText`/`mbLageZusatz`), neue Dialogfelder + Wohnungsstamm-Felder `etageZahl`/`lageZusatz`; (2) Unterschriftslinie verlängert (`signaturLinieEinbrennen`, Canvas +35 % je Seite, gilt für alle „mit Linie"-Dokumente, **einmalig neu festlegen nötig**); (3) Layout 11→12,5 px + Umbruchsicherung `body>*{page-break-inside:avoid}`, bleibt 1 A4-Seite; (4) Versand WhatsApp/E-Mail-Text (`mbVersandDialog`/`mbBegleittext`/`mbVersandOeffne`/`mbVersandKopiere`), § 23 WoGG-Begleittext, kein PDF-Anhang möglich (wa.me/mailto-Limit). +9 Funktionen. |
| v154 | 01.07.2026 | 30 | (1) Mietbescheinigung: Brennstoff aus `objekt_stamm.heizung` (`mbBrennstoffAusHeizung`) + Warmwasser aus Heizungsvariante A/B/C (`mbWarmwasserAusVariante`) vorbelegt, greift nur solange kein Wohnungsstamm-Wert existiert; (2) Mieter-Detailansicht: obere Buttons Anrufen/WhatsApp/Kontakt-teilen entfernt (unten je Person vorhanden), E-Mail-Button zunächst behalten. +2 Funktionen. |
| **v155** | **01.07.2026** | **30** | **Aktueller Live-Stand.** Mieter-Detailansicht: auch oberen E-Mail-Button entfernt; Kopf-Button-Block komplett weg, E-Mail bleibt als `mailto`-Link im Info-Grid sichtbar. Keine neuen Stores, keine Funktionsänderung. `APP_VERSION='2026-07-01-v155'`, `sw.js`-CACHE → `nadigpfau-v155`. Details §0e. |
| **v156** | **01.07.2026** | **31** | **Neu: Kautionsquittung (§ 368 BGB).** Eigenständiges Modul (vor `druckeWohnungsgeberBescheinigung`): `modalKautionsquittung`, `erstelleKautionsquittung`, Betrag-in-Worte (`kautionBetragInWorte` + `_kqUnter1000`/`_kqGanzInWorte`/`_kqAttributiv`), `_kqVermieterName` (aus `getEigentuemerFuerObjekt`, Fallback Briefkopf, amtl. ausgeschrieben), Archiv (`zeigeGespKautionsquittung`/`loescheGespKautionsquittung`), Versand WhatsApp/E-Mail (`kqVersandDialog`/`kqVersandOeffne`/`kqVersandKopiere`/`kqBegleittext`, PDF manuell). UI: Button „Kautionsquittung" (`ti-receipt`) im Mieter-Detail nach „Mietbescheinigung" (nur Verwalter), Archiv-Karte. **Neuer Store `kautionsquittungen` an allen 6 Pflichtstellen → DB_VER 30→31.** Weiß-Blatt-vermeidendes Druckmuster (gesplittetes `<scr`+`ipt>`, Auto-Print). Geprüft: `node --check` OK, Funktions-Diff v155→v156 = 0 verloren/13 neu, Betrag-in-Worte-Tests OK, visuell gerendert (1 Seite, = Vorlage). `APP_VERSION='2026-07-01-v156'`, `sw.js`-CACHE → `nadigpfau-v156`. **Deploy durch Nutzer ausstehend.** Details §0g. |
| **v157** | **02.07.2026** | **31** | **Sync-Tombstones + QR-ZIP-Export + MV-Schrift Georgia.** (1) `_geleert`-Map: Feld-Löschungen synchronisieren jetzt (mergeRecord/mergeTombstones/erfasseLeerungen); behebt Grbavac-Sync (WE 2 Mindener 23). (2) Druckcenter „QR-PDFs je Standort als ZIP": pro DASH_GRUPPE 1 ZIP, je WE 1 A4-PDF, QR + Klartext ohne sichtbare URL; eigener Store-ZIP-Writer (`zipStore`/`_crc32`), `alleWeVonObjekt`. (3) MV-STYLE-body auf Georgia (l/I-Eindeutigkeit). Backend gehärtet: `inbox-mark-read.js`/`inbox-trash.js` upsert+garantiertes Löschen (Mail-„Erledigt"-Wiederkehr), Fallback-Tabelle `inboxtrash`. KEINE neuen Stores, DB_VER 31. `node --check` OK, Diff 0 verloren/+8, Merge-Tests 6/6. `APP_VERSION='2026-07-01-v157'`, CACHE `nadigpfau-v157`. Details §0h. |
| **v180** | **06.07.2026** | **31** | **LIVE + alle Verifikationen bestätigt. Vollständiger Code-Review + 6 Fixes.**ND `exportBackup()` mitgeführt trotz UI-Versprechen „nur lokal"; neue Konstante `SETTINGS_GEHEIM` filtert beide Pfade – **verifiziert:** Textsuche in OneDrive-JSO … *Details §0af.* |
| **v179** | **06.07.2026** | **31** | **LIVE + Gerätetest bestätigt. Datei-Sync-Fixes nach v177-Gerätetest.** (P1) `DOK_OD_KATEGORIE` += `wgb`→Mietbescheinigungen, `mieterhoehung`→Briefe (fehlten → Uploads landeten in `Sonstiges`). … *Details §0ae.* |
| **v178** | **05.07.2026** | **31** | **B3/V7 – Kappungsgrenze an GEMEINDE gebunden (Risiko R12 geschlossen; Rechtslage verifiziert: MHKBD NRW/kommunen.nrw).**-Liste), `MIETSCHVO_KAPPUNG_BIS='2030-02-28'`, `MIETSCHVO_MPB_BIS='2029-12-31'` (Mietpreisbremse vom Bund/NRW bis Ende … *Details §0ad.* |
| **v177** | **05.07.2026** | **31** | **§12-P23 Schritt 23a – FÜNFTE VERDRAHTUNG `dokumente.data` (heterogener Store, Typ-Filter, additiv, Fallback-gesichert).** Nur DATEI-Uploads werden ausgelagert: `saveDok` + Grundriss-/Wohnungsbild-Upload; `ausweis`/`lastschrift` (`DOK_INLINE_TYPEN`) und generierte HTML-Archive bleiben BEWUSST inline. Neuer Helper `dokAuslagernRef` (Typ-Gate, weNr via Record ODER Mieter, `fotoZielFuer` knoten `auto`, Typ→Kategorie-Map `DOK_OD_KATEGORIE` nur auf WE-Knoten, MIME-Endung, Namensbereinigung; Fallback: null ⇒ data inline). Zentraler Lese-Resolver `dokQuelle(d)` = data ODER `odDownloadUrl(ref.odId)` mit Thumb-Fallback → `openFoto`-'dok', `downloadDok`, `dokTeilen` (inkl. Fallbacks) dual-format; Galerie-Thumbs via `fotoThumbQuelle(x.data\|\|x.ref)`. 11/11 Logiktests, `node --check` OK, Diff v176→v177 = **+2/0 verloren**, DB_VER 31. `APP_VERSION='2026-07-05-v177'`, `sw.js`-CACHE `nadigpfau-v177`. Obermenge v176…v173. **Deploy ausstehend; Gerätetest empfohlen.** Details §0ac. |
| **v176** | **05.07.2026** | **31** | **Ausweis-Löschworkflow Stufe 1 (§12-P24, DSGVO Art. 17 / § 20 PAuswG).**er) → `modalAusweisLoeschen` (Einzel-/Sammel-Löschung via `deleteMitTombstone`, geräteübergreifend, mit `confirm`; kein Auto-Löschen), `mvErzeugen`-Toast-Hinweis auf l … *Details §0ab.* |
| **v175** | **05.07.2026** | **31** | **§12-P23 Schritt 23a – Stufe 2b `protokolle`-Fotos (erster Schritt ohne Inline-Duplikat bei Erfolg).** Neue Protokollfotos werden beim Erfassen per neuer Funktion `protoFotoAuslagern(data,slotName)` (Ziel `fotoZielFuer(PD.objektId,PD.weNr,'protokolle')`, Name `protokoll_<slot>_<uid>.jpg`) nach OneDrive ausgelagert; bei Erfolg **Referenz statt Base64** an allen 3 Aufnahme-Stellen (Raum/Bauteil/Zähler): im Protokoll-Record (`wert = odRef \|\| data`) UND im `fotos`-Store (`{…, ref: odRef}` statt `{…, data}`) → beseitigt die Inline-**Doppelung** (20-MB-Haupttreiber, §0q) für Neuaufnahmen. **Fallback wie v164:** `null` ⇒ dataURL doppelt inline wie bisher, KEIN Datenverlust. Lesepfade dual-format: `restoreFotosForPD` (`fo.data \|\| fo.ref`), Thumbnails via `fotoThumbQuelle`, Übersicht via `fotoImgTag`, Mangel-Übernahme dedupliziert via `odId` (`_enthaelt`). Druck/PDF unverändert über `fotoDruckQuelle` (v166). **DSGVO-Gate erfüllt** (AVV v1.1 dokumentiert Microsoft/OneDrive; TOM v1.1, VVT v1.1). `node --check` OK, Diff v174→v175 = **+1 (`protoFotoAuslagern`)/0 verloren**, DB_VER 31. `APP_VERSION='2026-07-05-v175'`, `sw.js`-CACHE `nadigpfau-v175`. Obermenge v174/v173. **Deploy ausstehend; ⚠️ Gerätetest-Pflicht nach Deploy.** Details §0aa. |
| **v174** | **05.07.2026** | **31** | **§12-P23 Schritt 23a – VIERTE VERDRAHTUNG `objekt_stamm.fotos`+`grundriss` (erster pdfWebsite-Store, additiv, Fallback-gesichert).** `saveWohnungHeizNk` lagert neue dataURLs (max. … *Details §0z.* |
| **v173** | **05.07.2026** | **31** | **Ordnerstruktur Düsseldorf (Nutzerwunsch).**Objekte (Mindener WE 1–20 vereint), genutzt in `odBaumAnlegen` (keine doppelten Ordner-Calls mehr), `syncDateibaum` (Zweige dedupliziert) und Browser-Ebene 3 (WE-Liste; `gebOid`-Einzelobjekt entf … *Details §0y.* |
| **v172** | **04.07.2026** | **31** | **Ordner pro Gebäude + Foto-Upload-Robustheit.** Baum `Objekte/<Standort>/<Gebäude>/<Allgemein bzw. … *Details §0x.* |
| **v171** | **04.07.2026** | **31** | **Dashboard-Protokoll-Sortierung + universeller Dokument-Teilen-Button.** „Letzte Protokolle“ sortiert nach `datum` (Fallback `erstellt`) – Befund: neuestes Protokoll (Datum 03. … *Details §0w.* |
| **v170** | **04.07.2026** | **31** | **Freitextsuche Aufgaben/Mängel** (live auf `_aufFilter`, kein Rückgriff auf den in v169 entfernten Strang): Suchfeld `#aufSucheInput` in `renderAufgaben`; `aufSuche(q)` schreibt `_aufFilter. … *Details §0v.* |
| **v169** | **04.07.2026** | **31** | **Code-Aufräumung: abgelöstes Filter-/Such-Toolkit ersatzlos entfernt**elList`, `renderReparaturList`, `setAufgabenFilter`, `setAufgabenObjFilter`, `filterTodos`, `setMangelFilter`, `setMangelObjFilter`, `filterMaengel`, `setReparaturFilter … *Details §0u.* |
| **v168** | **04.07.2026** | **31** | **§12-P23 Schritt 23a – DRITTE VERDRAHTUNG, Foto-Stores `maengel.fotos` + `aufgaben.fotos` (additiv, Fallback-gesichert, KEIN Datenverlust).**)` lagert **neu aufgenommene** Fotos (dataURL) beim Speichern per `fotoAuslagern` nach OneDrive au … *Details §0t.* |
| **v167** | **04.07.2026** | **31** | **§12-P23 Schritt 23a – ZWEITE VERDRAHTUNG, isolierter Store `reparaturen.rechnung` (additiv, Fallback-gesichert, KEIN Datenverlust).**wird beim Speichern (`saveReparatur`/`saveEntry`) per `fotoAuslagern` nach OneDrive ausgelagert (Kategori … *Details §0s.* |
| **v166** | **04.07.2026** | **31** | **§12-P23 Schritt 23a – Stufe 2a: Druck-Rehydrierung (additiv, verhaltensgleich, Enabler für Stufe 2b).**fotoDruckQuelle(x)` liefert für die PDF-/Canvas-Einbettung **immer** eine dataURL: Alt-String unverändert; ausgelagerte Referenz `{ref … *Details §0r.* |
| **v165** | **04.07.2026** | **31** | **§12-P23 Schritt 23a – Stufe 1: Protokollfoto-Lesepfad zentralisiert (additiv, verhaltensgleich).** Protokoll-PDF `printProtHTML` bezieht `condPhotos`/`photos`/`zaehler. … *Details §0q.* |
| **v164** | **04.07.2026** | **31** | **§12-P23 Schritt 23a – ERSTE VERDRAHTUNG (Pilot `ventilpruefung`).** Ventilfoto wird beim Speichern per `fotoAuslagern` nach OneDrive ausgelagert (Referenz statt Base64), Ziel via neuem `fotoZielFuer(objektId,weNr,store)`; Anzeige dual-for … *Details §0p.* |
| **v163** | **04.07.2026** | **31** | **§12-P23 Schritt 23a – FUNDAMENT (dual-format Foto-Auslagerung, additiv, noch nicht verdrahtet).** Architektur-Entscheidung Nutzer 04. … *Details §0o.* |
| **v162** | **03.07.2026** | **31** | **§12-P23 Schritt 23c: Kategorie-Unterordner im OneDrive-Dateibaum.** Aufbauend auf dem bereits vorhandenen bidirektionalen Datei-Sync (`od_dateien`/`syncDateibaum`). … *Details §0n.* |
| **v161** | **03.07.2026** | **31** | **2 Sofort-Fixes (Handy-Blocker, aus Nutzer-Screenshots diagnostiziert).** (1) **Einstellungen-Tabs:** `. … *Details §0m.* |
| **v160** | **02.07.2026** | **31** | **Einzugsprotokoll-Button erweitert + 2 Krefeld-Datenkorrekturen.** (1) Button „Einzugsprotokoll erstellen" (bzw. … *Details §0l.* |
| **v159** | **02.07.2026** | **31** | **Neues Feld `krMaxEuro` (Jahres-Euro-Deckel Kleinreparaturen) + `vertragsmodell`.** Anlass: Krefeld-Datenimport. … *Details §0j.* |
| **v158** | **02.07.2026** | **31** | **LIVE. Code-Review-v157-Abarbeitung (Frontend + Website + Backend + SW).** Frontend: A2 PIN-Hashing (`pinHash`/`pinPruefen`/`pinSetzen`, SHA-256+Salt, Login-Migration + Tombstone `pin`), B4 `fetchMitTimeout` (22 Netzwerk-fetches), B6 users-Map (4 Signatur-Schleifen), B7 `jsonSicher` (2 Import-Stellen), B8 `stoppeHintergrundTimer` bei Logout. Website: A3 `esc()`+`'`, SA-Button data-idx+Delegation; A4 `noindex`. Backend (5 Dateien, deployt): A1 Foto-Verlust `leerstand.js` (nur verwaiste Blobs) + v152-Härtung reintegriert; B1 Payload-Limits `selbstauskunft.js` + C1 PartitionKey-Filter; B2 `istEmail` `send-token` + atomarer Token-Verbrauch (etag); B3 Fehlerdetails aus Responses; B5 `sw.js` Offline-Fallback. +6 Funktionen, 0 verloren. Neue `tests/backend.test.mjs` (21 grün). `node --check` App+Website OK. `APP_VERSION='2026-07-02-v158'`, CACHE `nadigpfau-v158`. Details §0i. |

> ⚠️ **Regel:** Jede neu eingebundene externe Quelle (CDN/API/Font/MS-Dienst) MUSS in der passenden CSP-Direktive in Zeile 6 ergänzt werden (`connect-src` fetch/XHR, `script-src` JS, `style-src` CSS, `font-src` Fonts, `img-src` Bilder), sonst stille Browser-Blockade – auf Bestandsgeräten unsichtbar, bricht aber den sauberen Erststart (Lehre aus dem v143→v147 „Failed to fetch"-Vorfall).

---

## 0a. Versionshistorie v147 → v151 (jüngste Änderungen)

- **v147:** CSP-Fix `connect-src` (cdn.jsdelivr.net, *.microsoftpersonalcontent.com,
  *.sharepoint.com, *.up.1drv.com); Beginn Event-Delegation-Gerüst (`registerActions`/`__delegate`).
- **v148:** Echte Service-Worker-Registrierung statt `unregister()`-Reset-Block
  (INVARIANTE: Reset-Block nie zurück); bottom-nav-Fix (`min-height`+`content-box`).
- **v150 (PWA installierbar, am Gerät bestätigt):** Wechsel auf **Mehrdatei-Deploy**.
  Manifest extern (`manifest.json`, `start_url:"./"`, `scope:"./"`, `id:/Immo-app-Nadig-Pfau/`),
  echte PNG-Icons (`icon-192.png`/`icon-512.png`, `purpose:"any"`+maskable),
  apple-touch-icon auf PNG. **PWA-Invarianten:** Manifest immer extern (nie data:-URI),
  immer ein PNG-any-Icon ≥192px, kein `unregister()`-Reset, `sw.js`-CACHE je Version hochzählen.
- **v151 (30.06., keine neuen Stores, DB_VER 30, 1066 Funktionen):**
  1. **Neuer-Mieter-Dialog** (`modalAddMieter`): obere Anrede entfernt (Anrede je Person);
     „Personen (Anzahl)" = **readonly Auto-Zähler** (Stichtag heute, `ab≤heute`, `bis` leer/`≥heute`)
     via neuer Helfer `personenAnzahlStichtag()`; `mPersonenAuto()` stichtagsbasiert, respektiert
     weiter `data-manuell` der Bearbeiten-Maske; `pAb`/`pBis` triggern den Zähler. Doppelte
     Telefon/E-Mail-Zeile unten entfernt. **BEWOHNER-Karte** (`personenBlockHTML`): Tel/E-Mail nur
     noch Anzeige (nicht klickbar); je Bewohner Aktionsbuttons Anrufen/WhatsApp/E-Mail/Kontakt-teilen
     (neue Helfer `personAktionsButtons`, `personVCard`, `personKontaktTeilen`, `personNameTeile`);
     gelbes Warndreieck bei aktivem Bewohner ohne „Dabei ab".
  2. **Mietbescheinigung (§ 23 WoGG):** „Für Frau/Herrn" + Dialog-Untertitel zeigen alle
     Vertragspartner-Vollnamen (`hauptmieterNameVoll`) statt nur Nachname.
  3. **Wohnungsinfos** (`modalWohnungHeizNk`): Fläche/Lage werden aus den Mieter-Stammdaten der WE
     vorbefüllt, wenn im Wohnungs-Stamm leer.
  4. **Gespeicherte Mietbescheinigungen:** zusätzlicher „Ändern"-Button (öffnet Dialog erneut);
     Ansehen/PDF/Verschicken über vorhandenen Druck-Dialog. **PDF-Mailversand weiterhin offen.**
- **v152 (30.06., Sicherheits-Patch, DB_VER 30, 1066 Funktionen):** Gespeicherter XSS
  geschlossen. An 21 Stellen wurde nutzereingegebener Freitext, der ungeprüft per
  Template-Literal in `innerHTML` geschrieben wurde, über `esc()`/`escAttr()` abgesichert:
  Kommentare (Text/Autor/Datum), Notiz-Felder (Zeiterfassung/Dokumente/Bestellliste/
  Termine ×2), Dokumentname, Bestell-Artikel/-Referenz, Kategorienamen (×2), Termin-
  Personenfelder (Mieter/Zugewiesen/Ersteller), Zähler-/Benutzername, Mieter-Kontakt
  (Tel/E-Mail) + drei Attribut-Felder via `escAttr` (Artikel-, Objekt-, Benutzer-Eingabe).
  Backend `leerstand.js` (noch nicht deployt): MIME-Whitelist (`ERLAUBTE_BILDTYPEN` =
  JPEG/PNG/WebP, SVG abgewiesen) + `MAX_BILD_BYTES` 8 MB. `sw.js`-CACHE → `nadigpfau-v152`.
  Geprüft: `node --check` OK, Funktionsdiff v151→v152 = 0. **Wichtig:** Akute XSS-Lücke ist
  damit geschlossen, der CSP-Schutz (R11) bleibt davon unabhängig weiter offen.

---

## 0e. Versionshistorie v153 → v155 (Mietbescheinigung + Mieteransicht, 01.07.2026)

Ausgangsbasis `index-v152.html`. Drei aufeinander aufbauende Versionen; **für Deploy ist
nur v155 relevant** (kumulativ). Keine neuen IndexedDB-Stores → DB_VER bleibt 30.

- **v153 – Mietbescheinigung (vier Verbesserungen):**
  1. **Etage/Lage automatisch aus `m.etage`.** Neue Helfer `mbEtageZahl`, `mbEtageGrundlage`,
     `mbEtageOrdinal`, `mbLage2AusText`, `mbLageZusatz`. Freitext „2.OG rechts" → Ankreuzung
     „Obergeschoss" + Beschriftung „2. Obergeschoss"; vorne/hinten → amtliches Zusatzkästchen,
     links/rechts/mitte → Klartext-Zusatz (amtlich nicht ankreuzbar, WoGG-Formular kennt nur
     Vorne/Hinten/Flügel/Anbau). Neue Dialogfelder `mbEtageZahl`/`mbLageZusatz`, dauerhaft im
     Wohnungsstamm (`etageZahl`, `lageZusatz`). Vorbelegung nur bei leerem `w.lage`/`w.lage2`.
  2. **Unterschriftslinie verlängert.** `signaturLinieEinbrennen()` verbreitert die Canvas-Fläche
     seitlich um je 35 %. Gilt für **alle** „mit Linie"-Dokumente (`signaturMitLinie`):
     Mietbescheinigung, WGB, Brief, Mietvertrag, Protokolle. **Offener manueller Schritt:** Linie
     je Admin **einmalig neu festlegen** (Einstellungen → Meine Unterschrift → „Linie festlegen"),
     sonst bleibt in bereits gespeicherten Grafiken die alte kurze Linie.
  3. **Layout größer, garantiert 1 A4-Seite:** Basisschrift 11 → 12,5 px, proportional skaliert,
     Umbruchsicherung `body>*{page-break-inside:avoid}`.
  4. **Versand WhatsApp/E-Mail:** neuer Button (`ti-send`) je gespeicherter Bescheinigung.
     Helfer `mbVersandDialog`, `mbBegleittext`, `mbVersandOeffne`, `mbVersandKopiere`; § 23 WoGG-
     konformer, editierbarer Begleittext; wa.me/mailto nutzen Mieter-Telefon/-E-Mail; „Text
     kopieren". **Technische Grenze:** wa.me/mailto können keine Datei anhängen → PDF hängt der
     Nutzer selbst an; kein PDF-Anschreiben (ausdrücklicher Nutzerwunsch). +9 Funktionen.
- **v154 – Mietbescheinigung + Mieteransicht:**
  1. **Vorbelegung Brennstoff & Warmwasser aus Objektdaten.** `mbBrennstoffAusHeizung` liest
     `objekt_stamm.heizung` (Gas-ZH→Gas, Öl→Öl, Fernwärme→Fernwärme, Wärmepumpe/Nachtspeicher→Strom,
     Kohle→Kohle, Pellet/Holz/Sonstige→kein Kreuz); `mbWarmwasserAusVariante` aus effektiver
     Heizungsvariante (`mvHeizVarianteFuer`): A→zentral, B/C→Durchlauferhitzer. Greift nur solange
     kein eigener Wohnungsstamm-Wert existiert.
  2. **Mieter-Detailansicht:** obere Schnell-Buttons Anrufen/WhatsApp/Kontakt-teilen entfernt
     (unten je Person in der Bewohner-Sektion vorhanden), E-Mail-Button zunächst behalten.
     `mieterKontaktTeilen` bleibt für die Bewohner-Sektion. +2 Funktionen.
- **v155 – Mieteransicht:** auch oberen E-Mail-Button entfernt; Kopf-Button-Block komplett weg.
  E-Mail-Adresse bleibt als klickbarer `mailto`-Link im Info-Grid des Kopfbereichs. Keine
  Funktionsänderung. `APP_VERSION='2026-07-01-v155'`, `sw.js`-CACHE → `nadigpfau-v155`.

> **Deploy v155 (erledigt 01.07.2026, Nutzer bestätigt):** Alle 5 Dateien nach GitHub Pages
> deployt (`index.html` = v155-Inhalt, `sw.js` CACHE `nadigpfau-v155`; Manifest + 2 PNG-Icons unverändert).
> Rest-TODO je Admin: **Unterschriftslinie neu festlegen** (siehe v153 Punkt 2).

---

## 0f. Backend/Website-Änderungen 01.07.2026 (nach v155-Deploy)

Kein App-Versionssprung – die App bleibt v155. Betroffen sind nur zwei Backend-/Website-Dateien
plus ein neuer Anwaltsentwurf. Deploy durch Nutzer noch ausstehend.

- **`selbstauskunft.js` (Backend, deploybereit) – SA-Paket-1-Restpunkt erledigt:**
  Im `inbox-sa`-Handler wurden die zwei Stellen, die interne Details im Response-Body preisgaben,
  auf `{ ok: false }` reduziert:
  1. `catch`-Block (vormals `{ ok:false, fehler:e.message, code:e.code }` – Debug),
  2. `!VERBINDUNG`-Fall (vormals Klartext „STORAGE_CONNECTION (App Setting) fehlt oder heißt anders").
  Fehlerursachen werden weiterhin serverseitig via `context.error` ins Azure Log Stream geschrieben
  (Diagnose bleibt möglich, entspricht Regel „sensible Daten nicht nach außen"). Die generischen
  `{ ok:false, grund:'serverfehler' }` (Schreib-/Verschlüsselungsfehler) blieben unverändert –
  kein internes Detail. Geprüft: `node --check` OK; Funktions-Diff gegen Upload = 0; Routen
  `selbstauskunft`/`inbox-sa`/`inbox-sa-mark-read` unverändert; Gesamt-Diff = ausschließlich die
  beiden gewollten Änderungen. **Deploy:** Datei nach `C:\nadigpfau-backend\src\functions\`, via
  VS Code deployen. Danach ist SA-Paket-1 vollständig abgeschlossen.
- **`index_website.html` (Website, deploybereit) – R14 (a) erledigt:** Die `sa_c3`-Beschriftung
  „Hinweise zur Datenverarbeitung" ist jetzt ein Link auf das **bereits vorhandene** `mDatenschutz`-
  Modal (`onclick="event.stopPropagation();openModal('mDatenschutz');return false;"`). `stopPropagation`
  verhindert, dass ein Klick auf den Link die Checkbox umschaltet. Inline-JS `node --check` OK,
  Diff = nur die `sa_c3`-Zeile. **Deploy:** als `index.html` per ZIP (`zip -j`) auf Cloudflare Pages.
- **`Datenschutzerklaerung_Website_ENTWURF.docx` (neu) – R14 (b), für Anwalt:** Datenschutz­erklärung
  für die Website-Selbstauskunft, abgeleitet aus dem mietvertraglichen App-Datenschutzhinweis und für
  den Bewerber-/Website-Kontext angepasst. Enthält gelb markierte Klärungspunkte: (1) fester
  Verantwortlicher für die Website – **objektbezogener Briefkopf-Wechsel gilt hier NICHT**, muss mit
  Impressum §5 DDG übereinstimmen; (2) AVV nach Art. 28 DSGVO für Azure, Cloudflare, IONOS bestätigen;
  (3) konkrete Löschfrist bei Absage (Vorschlag 6 Monate); (4) Drittlandtransfer je Anbieter
  (DPF/SVK) bewerten. Enthält Verschlüsselungshinweis (TLS + AES-256-GCM), Betroffenenrechte
  (Art. 15–21, Widerruf Art. 7 Abs. 3), Beschwerderecht (LDI NRW, Art. 77). **Nicht** veröffentlichen
  vor anwaltlicher Freigabe; danach Inhalt ins Modal übernehmen, Platzhalter-Absatz entfernen.

> **Befund App-DSGVO:** `Datenschutzhinweis_DSGVO.pdf` im Projekt ist **kein PDF**, sondern ein
> ZIP-Archiv mit `1.jpeg`/`1.txt`/`manifest.json` (Text vollständig extrahierbar: Art.-13-Hinweis
> „Anlage zum Mietvertrag", Verantwortlicher „Venloer Str. 20, 40477 Düsseldorf"). Inhaltlich sauber,
> aber auf laufendes Mietverhältnis zugeschnitten → nicht 1:1 für die Website verwendbar.

---

## 0g. v156 – Kautionsquittung (§ 368 BGB), 01.07.2026

Neues, eigenständiges Modul (platziert vor `druckeWohnungsgeberBescheinigung`), 1:1 nach Papiervorlage
`Kaution__Schäfer.doc`. **Deploy durch Nutzer ausstehend.**

**Funktionen (13 neu, 0 verloren):**
- `modalKautionsquittung(mieterId)` – Formular: Betrag (vorbelegt aus Kaution), Vertreter-Auswahl aus
  Benutzern, optionales Datum; Live-Vorschau „in Worten".
- `erstelleKautionsquittung(mieterId)` – erzeugt HTML-Dokument, speichert in Store `kautionsquittungen`,
  druckt über `druckHTML()` (Vorschau + PDF).
- `kautionBetragInWorte()` + Helfer `_kqUnter1000`, `_kqGanzInWorte`, `_kqAttributiv` – Betrag in deutschen
  Worten inkl. Cent (1.125,50 → „Eintausendeinhundertfünfundzwanzig EURO und fünfzig Cent"; attributiv
  „Ein EURO"/„ein Cent"). Abgedeckt bis 999.999,99; ≥ 1 Mio offen (für Kautionen unkritisch).
- `_kqVermieterName(m)` – Vermieter-Name aus Eigentümer des Objekts (`getEigentuemerFuerObjekt`), Fallback
  Briefkopf; amtlich ausgeschrieben („Roland B." → „Roland Bernd").
- `zeigeGespKautionsquittung`, `loescheGespKautionsquittung` – Archiv anzeigen/löschen.
- `kqVersandDialog`, `kqVersandOeffne`, `kqVersandKopiere`, `kqBegleittext` – Versand per WhatsApp/E-Mail
  (analog Mietbescheinigung; Datei manuell anhängen, da wa.me/mailto keinen Anhang zulassen).

**UI:** Button „Kautionsquittung" (Icon `ti-receipt`) im Mieter-Detail direkt nach „Mietbescheinigung",
immer sichtbar (nur Verwalter). Archiv-Karte „Kautionsquittungen (n)" mit Ansehen/Versenden/Neu/Löschen.

**Dokument-Inhalt (nach Vorlage):** Titel „Quittung über den Erhalt der Mietkaution"; Objektzeile
„<Anschrift>, <Ort>, WE <Nr>"; Vorname(n)/Nachname aus Hauptmieter aufgeteilt; Bestätigungssatz „Der
Vermieter <Eigentümer> vertreten durch <Benutzer> bestätigt hiermit, dass die im Mietvertrag vereinbarte
Kaution in Höhe von <Betrag> EUR (<Betrag in Worten>), anteilig ____ EUR am ____ …"; „Bereits gezahlt: ____"
(handschriftlich vor Ort); „Ort, Datum"; Unterschriftszeilen Vermieter/Mieter; Fußzeile aus Briefkopf
(`getBriefkopf(m.objektId)`: Name, Straße · Ort, Tel, E-Mail).

**Store `kautionsquittungen`** an allen 6 Pflichtstellen registriert (DB-Create, Index-Block mieterId+objektId,
Backup-Export, Backup-Import/`alleStores`, Sync-Push, Sync-Pull/`mergeStores`) → **DB_VER 30 → 31**.
⚠️ Alle Geräte müssen vor dem nächsten Sync auf v156 aktualisiert sein.

**Weiß-Blatt-Fehler vermieden:** Dokument-HTML mit gesplittetem `<scr`+`ipt>`, Auto-Print via
`setTimeout(...,500)` + `window.focus()` + `window.print()`, vollständiges `<!DOCTYPE html>` (bewährtes
Mietbescheinigungs-Muster).

**Rechtlich:** Empfangsbestätigung nach § 368 BGB (Empfänger, Betrag, Grund „Mietkaution", Unterschrift
Vermieter/Vertreter). „Vertreten durch" setzt Vollmacht voraus. Betrag in Worten als Manipulationsschutz.

**QS:** `node --check` OK; Funktions-Diff v155→v156 = 0 verloren/13 neu, keine Doppelungen;
Betrag-in-Worte-Einzeltests (1, 21, 201, 1.101, 999.999,01) OK; visuell gerendert (Playwright: Layout =
Vorlage, kein weißes Blatt, 1 Seite).

**Offene Punkte v156:** Deploy (GitHub Pages, 5 Dateien, CACHE `nadigpfau-v156`); Praxistest mit echten
Mieterdaten (Namensaufteilung Vorname/Nachname bei ungewöhnlichen Namen prüfen); optional Betrag-in-Worte
≥ 1 Mio.

---

## 0h. v157 – Sync-Tombstones, QR-ZIP-Export, MV-Schrift, Mail-Papierkorb-Fix (02.07.2026)

**Anlass:** (1) Grbavac-Korrektur (falsches Auszugsdatum am PC entfernt) synchronisierte nicht aufs Tablet →
WE 2 Mindener 23 erschien dort weiter als Leerstand. (2) Mail-Tab: „Erledigt" ließ Nachrichten wiederkehren.
(3) QR-Export-Umbau, (4) Mietvertrag-Schriftprüfung l/I.

### 1) Sync-Tombstones (`_geleert`) – Feld-Löschungen synchronisieren jetzt
- **Ursache:** `mergeRecord`-Regel „gefülltes Feld nie durch leeres überschreiben" holte JEDES geleerte
  Feld von der Gegenseite zurück – bewusste Löschungen konnten per Design nie propagieren.
- **Design:** `_geleert`-Map am Datensatz (`{feld: isoStamp}`); KEIN neuer Store, DB_VER 31 unverändert.
  Geleertes Feld wird NICHT zurückgeholt, wenn Leerungs-Stempel ≥ Gegenseite; spätere Neubefüllung schlägt
  Tombstone. `mergeTombstones()` vereinigt beide Seiten (jüngster Stempel je Feld). Ohne Tombstone gilt das
  ALTE Schutzverhalten (kein Datenverlust bei versehentlich leeren Feldern).
- **Erfassung:** `erfasseLeerungen(altSnapshot, obj)` in `saveEditMieter`; explizite Tombstones in
  `mieterReaktivierenAusfuehren` (`auszug`/`auszugISO`/`_vormieter`). IGNORE: `_geleert`,`updatedAt`,
  `geaendert`,`erstellt`,`_konflikte`,`id`.
- **Tests:** 6 Szenarien grün (Grbavac beide Richtungen, Kein-Datenverlust, Neubefüllung, Tombstone-Merge).

### 2) QR-ZIP-Export je Standort (Druckcenter)
- Button „QR-PDFs je Standort als ZIP" → `modalWohnungsQrZipExport()` (Standort = `DASH_GRUPPEN`) →
  `wohnungsQrStandortZip(gruppenId)`. Pro Standort 1 ZIP; je WE 1 A4-PDF (`qrSeitePdfBytes`) mit 1 QR
  (110 mm) + Klartext „WE n"/Objektname, **KEINE sichtbare URL** (Portal-URL nur IM QR).
- `alleWeVonObjekt()` = Mieter-`weNr` ∪ `objekt_stamm.wohneinheiten` (inkl. Leerstand). ZIP ohne
  externe Bibliothek: `zipStore()`/`_crc32`, per `unzip -t` verifiziert.

### 3) Mietvertrag-Schrift → Georgia
- MV-`STYLE`-body auf `Georgia,'Times New Roman',serif` (kleines l vs. großes I in Segoe/Arial identisch,
  kritisch bei „Alexander"; Georgia eindeutig + passt zum Briefkopf).

### 4) Backend: Mail-Papierkorb-Fix
- `inbox-trash.js` `nachTrash` nutzt `upsertEntity(...,'Merge')` (idempotent); `inbox-mark-read.js`
  Kopieren/Löschen getrennt abgesichert, Löschung läuft immer, 404 beim Löschen = Erfolg. Fallback-Tabelle
  `inbox_trash`→`inboxtrash`.

### 5) Anschreiben Eigentümerwechsel Krefeld (Dokument)
- `Anschreiben_Eigentuemerwechsel_Krefeld.docx` (Georgia, Briefkopf), § 566/566a BGB-Fortgeltung,
  Datenblatt mit Art.-13-Einwilligung. Platzhalter: Objektadresse, WE, IBAN, Datum. § 566e-Mitteilung nur
  durch Alt-Vermieter → idealerweise gemeinsam versenden.

**Geprüft (v157):** `node --check` OK; Diff v156→v157 0 verloren/+8 (`_crc32`,`alleWeVonObjekt`,
`erfasseLeerungen`,`mergeTombstones`,`modalWohnungsQrZipExport`,`qrSeitePdfBytes`,`wohnungsQrStandortZip`,
`zipStore`); ZIP `unzip -t` OK; Merge 6/6. `APP_VERSION='2026-07-01-v157'`, CACHE `nadigpfau-v157`.

---

## 0i. v158 – Code-Review-v157-Abarbeitung (02.07.2026, LIVE)

Grundlage: `CODE_REVIEW_v157_2026-07-02.md`, Prio-Reihenfolge §F. Arbeitskopien aus Uploads
(`index-v157.html`, `index_website.html`); Backend aus Projektspeicher. **Alle Dateien deployt + App läuft
(Nutzer bestätigt).**

**Frontend (`index-v158.html`):**
- **A2 PIN-Hashing.** `pinHash(pin,saltB64)` (SHA-256 über `salt|pin`, Base64), `pinPruefen(user,pin)`
  (Hash bevorzugt, Klartext als Übergang), `pinSetzen(userObj,pin)` (setzt `pinSalt`+`pinHash`, entfernt
  `pin`, Tombstone `_geleert.pin`). `tryLogin` prüft per `pinPruefen`, migriert Alt-PIN beim ersten Login.
  `saveNewUser`/`saveEditUser` speichern nur Hash. `mergeRecord`/Backup behandeln `users` generisch →
  `pinHash`/`pinSalt` syncen mit, Tombstone entfernt Klartext geräteübergreifend. ⚠️ Hash schützt vor
  Klartext-Funden, ersetzt keine starke Auth (4–6-stellig offline brute-force-bar).
- **B4 fetchMitTimeout.** AbortController (15 s); 22 Aufrufe auf `BACKEND_*`/`OD_*`/`graph.microsoft.com`.
  Blob-/data-Reads (Fotos, `d.data`, `src`) bewusst unverändert.
- **B6 users-Map.** Vier Signatur-Sammelschleifen laden `users` einmal in `_uMap` (Schleifen ≤2 IDs,
  Gewinn moderat; primär Konsistenz).
- **B7 jsonSicher.** Helfer `jsonSicher(s,fallback)`; zwei ungeschützte Excel-Import-Parses (`mieterStr`/
  `tgStr`) mit Fallback `[]`. Übrige `JSON.parse` = Deep-Clone / statische `KAUTION_ZINSREIHE` / bereits try.
- **B8 Timer-Hygiene.** `_faelligTimer`-Handle; `stoppeHintergrundTimer()` beendet Mail-Poller +
  Fälligkeitstimer + Stempeltimer; Aufruf in `doLogout()`.

**Website (`index_website.html`):**
- **A3.** `esc()` maskiert zusätzlich `'`→`&#39;`. SA-Button `class="btn sa-btn" data-idx` + delegierter
  Listener; `openSelbstauskunft(a.id, a.titel+' · '+ortText(a))` mit Rohwerten (Ziel `.value`, kein
  HTML-Kontext). Früherer R14(a)-Link `sa_c3`→`mDatenschutz` bleibt enthalten.
- **A4.** `<meta name="robots" content="noindex, nofollow">` im `<head>` (vor Launch entfernen).

**Backend (5 Dateien, deployt):**
- **`leerstand.js` – A1 + v152-Reintegration.** POST: `verwaisteBlobsLoeschen(kennung, behaltNamen)` statt
  pauschalem Löschen; `blobNameAusUrl`; `fotoUrls` startet immer mit `behaltUrls`. Grundriss behalten/neu.
  `bildPruefen` (Whitelist JPEG/PNG/WebP + 8-MB-Limit, exakter Fehlertext) vor jeder Lösch-/Upload-Aktion;
  SVG still übersprungen, zu groß → 400. B3: nur `{ok:false}`. ⚠️ Projektkopie war Vor-v152-Stand –
  Härtung bewusst reintegriert.
- **`selbstauskunft.js` – B1/B2/C1.** Payload-Limit 40 kB + E-Mail-/Namenslängen-Prüfung vor Verschlüsselung.
  `tokenVerbrauchen` per `updateEntity(...,'Merge',{etag})`; Token wird VOR dem Speichern atomar verbraucht
  (412 → 409). `inbox-sa`-Filter `PartitionKey eq 'sa' and status eq 'neu'`.
- **`send-token.js` – B2/B3.** `istEmail`; kein `e.message` im Body.
- **`inbox-trash.js` – B3.** GET-Fehler nur `{ok:false}` (v157-upsert-Idempotenz beibehalten).
- **`sw.js` – B5.** Navigations- und GET-Fallback liefern nie `undefined`, sondern 503/504.

**QS:** `node --check` (App 2 Blöcke, Website 1) OK; Diff v157→v158 0 verloren/+6 (`fetchMitTimeout`,
`jsonSicher`,`pinHash`,`pinPruefen`,`pinSetzen`,`stoppeHintergrundTimer`); `tests/backend.test.mjs` 21/21;
PIN-Hash-Logik 8/8; Backend-Dateien einzeln `node --check` OK.

**Testdatei `tests/backend.test.mjs`:** optionales QS-Werkzeug (kein Function-Deploy). Nach
`C:\nadigpfau-backend\tests\` legen, `node tests/backend.test.mjs` → erwartet „21 Tests OK". Prüft
A1-Foto-Logik, `bildPruefen`-Grenzen, `entityZuAngebot`, `istEmail`. Fängt Regressionen bei künftigen
Backend-Änderungen.

**Nicht umgesetzt (bewusst):** R11 CSP `unsafe-inline` (Multi-Tages-Refactor); R12 Kappungsgrenze
(rechtlich); R19 PII-Dateien = Nutzer-Aktion.

---

## 0b. PWA-Installierbarkeit & Deploy – Detailanalyse (v148–v150, gelöst 30.06.2026, am Gerät bestätigt)

**Ausgangslage:** Auf einem Samsung-Android-Gerät war die App (a) nicht mehr installierbar
(kein „App installieren", nur „Zum Startbildschirm hinzufügen", Icon „G" statt App-Symbol) und
(b) die untere Navigationsleiste (Start/ToDo/Kalender/Mail/Config) war unsichtbar abgeschnitten.
Drei Ursachen, nacheinander gefunden und behoben:

**Ursache 1 – `unregister()`-Reset-Block (Installierbarkeit kaputt).** Zwischen v132 und v146 war
ein Block im Code, der bei JEDEM Start den Service Worker `unregister()`te und alle Caches löschte
(ursprünglich als einmalige Aufräumung gedacht, blieb dauerhaft). Ohne aktiven SW keine
Installierbarkeit. → In v148 ersetzt durch echte Registrierung `navigator.serviceWorker.register('./sw.js')`.
**INVARIANTE: Dieser Reset-/Deregistrierungs-Block darf NIE wieder in die App.**

**Ursache 2 – bottom-nav von Safe-Area abgeschnitten (v148-Fix).** `.bottom-nav` hatte feste
`height:64px`; das `padding-bottom:env(safe-area-inset-bottom)` für die Android-Gestenleiste fraß
die Icons von innen weg. → `min-height` statt `height` + `box-sizing:content-box`, sodass die
Safe-Area ZUSÄTZLICH reserviert wird. (Buttons waren vorher da & klickbar, nur unsichtbar.)

**Ursache 3 – nur SVG-Icons + eingebettetes `data:`-Manifest (der eigentliche Installations-Blocker).**
Chrome/Android verlangt für Installierbarkeit zwingend **mindestens ein PNG-Icon ≥192px mit
`purpose:"any"`**. Das Manifest hatte nur SVG-Icons (`image/svg+xml`) → Installation abgelehnt,
egal wie oft der Cache geleert wurde. Zusätzlich war das Manifest als `data:`-URI ins HTML
eingebettet, wodurch Chrome `start_url`/`scope`/`id` nicht stabil auflösen konnte und das Manifest
hartnäckig cachte.
→ **Lösung in v150 (funktioniert):** Manifest als **externe `manifest.json`** ausgelagert, Icons als
**echte PNG-Dateien** (`icon-192.png`, `icon-512.png`, aus dem NP-Monogramm-SVG via cairosvg gerendert),
mit explizitem `start_url:"./"`, `scope:"./"`, `id:"/Immo-app-Nadig-Pfau/"`. PNG-Icons mit
`purpose:"any"` (Pflicht) + `maskable`-Varianten. `apple-touch-icon` auf PNG (alter SVG-Verweis entfernt).

**INVARIANTEN PWA (nie wieder brechen):**
- Manifest IMMER als externe `manifest.json` (nie zurück zum `data:`-URI im HTML).
- IMMER mindestens ein **PNG-Icon ≥192px mit `purpose:"any"`** (reines SVG ist NICHT installierbar).
- `start_url`/`scope` relativ `"./"`, `id` = `/Immo-app-Nadig-Pfau/` (GitHub-Pages-Unterverzeichnis).
- Kein `unregister()`/`caches.delete()`-Reset-Block im App-Code.

**Deploy ab v150 (5 Dateien, exakte Namen, alle ins gleiche Verzeichnis):**
`index.html` · `manifest.json` · `icon-192.png` · `icon-512.png` · `sw.js`.
Bei jeder neuen HTML-Version die `CACHE`-Konstante in `sw.js` hochzählen (zuletzt `'nadigpfau-v151'`),
damit alte Caches verworfen werden. DB_VER bleibt 30 (kein neuer Store in v148–v151).

**Geräte-Reset bei hartnäckigem Chrome-Cache (wirkt, wenn „Browserdaten löschen" nicht reicht):**
Chrome → ⋮ → Einstellungen → Website-Einstellungen → `deusnuntio.github.io` → **„Löschen und zurücksetzen"**
→ Chrome komplett schließen → URL neu laden → ⋮ → „App installieren".

**Bewusst NICHT zurückportiert:** Die 7 Funktionen des OneDrive-Dokument-Auslagerungs-Subsystems
(`migriereDokumente`, `dokDatenHolen`, `odLadeDatei`, `speicherAnalyse`, `setupCheck`, `_dataUrlZuBytes`,
`_mimeZuExt`) waren in v146 vorhanden, sind aber in v144/v147–v150 NICHT enthalten – v147 baut bewusst
auf v144 auf, weil dieses „Speicher-verkleinern"-Subsystem mit dem bekannten Fehler verbunden war.
Falls Dokument-Auslagerung künftig gewünscht: neu und sauber implementieren, nicht aus v146 kopieren.
---

## 0c. Backend-Deploy-Protokoll (30.06.2026 – 4 Endpunkte live, PowerShell-E2E bestätigt)

**Erfolgreich deployt + produktiv getestet** (Azure `func-nadigpfau`, PowerShell mit Function-Key):
- **`leerstand`** (GET anonymous / POST+DELETE function): inkl. v152-Härtung **verifiziert** –
  9-MB-Bild → `{ok:false,fehler:'Bild zu groß (9.0 MB, Limit 8 MB)'}`; SVG (`image/svg+xml`)
  → `ok:true` mit **leerem** `fotos`. Upload gültiger PNG/JPEG → Blob-URL zurück.
- **`send-mail`** (POST function): `ok:true`, Testmail von `info@nadigpfau.de` versendet.
- **`inbox-trash`** (GET/POST function): GET → `[]` (leerer Papierkorb), Tabelle `inboxtrash` autoangelegt.
- **`inbox-mark-read`** (POST function): Fallback-Tabellenname mitgefixt.

**Drei echte Bugs behoben (keine Bedienfehler):**
1. **`leerstand` – Blob-Container fehlte.** `containerMitCreate()` schluckte den Fehler im leeren
   `try/catch`; eigentliche Ursache: Account `stnadigpfau` hatte **anonymen Blob-Zugriff deaktiviert**,
   daher schlug `createIfNotExists({access:'blob'})` fehl. → Account-Einstellung *Anonymen Blobzugriff
   zulassen* aktiviert, Container **`leerstand-fotos`** mit Zugriffsebene **Blob** angelegt.
2. **`send-mail` – `mail.js` am falschen Ort.** `require('./mail')` sucht in `src/functions/`,
   die Datei lag aber in `src/mail.js`. → nach `src/functions/mail.js` kopiert. **GILT AUCH FÜR
   `send-token.js`** (nutzt dasselbe Modul) – beim SA-Deploy wäre derselbe 500er gekommen, jetzt vorab erledigt.
   `mail.js` selbst ist korrekt: zieht `SMTP_*` aus App Settings, `secure:(PORT===465)` passt zu Port 465 (IONOS).
3. **`inbox-trash`/`inbox-mark-read` – ungültiger Tabellenname.** `inbox_trash` mit Unterstrich →
   Azure `InvalidResourceName` (Tabellennamen nur alphanumerisch, Start mit Buchstabe, 3–63 Zeichen).
   → in BEIDEN Dateien `inbox_trash` → **`inboxtrash`** (inbox-trash.js 6×, inbox-mark-read.js 3×, Fallback hartkodiert).

**Offene Risiken geklärt:**
- **R1 erledigt:** Token-Tabelle heißt **`tokens`** (Plural) – per Storage-Browser bestätigt.
- **R2 erledigt:** Realer **PartitionKey der Kontaktanfragen = `request`** (Singular, alle 9 Einträge der
  `requests`-Tabelle). In `inbox-trash.js` `PK_NACHRICHT='request'` fest verdrahtet + falscher Restore-
  Fallback `'nachricht'`→`'request'` korrigiert. (Diese Final-Version 30.06. abends deployt.)

**App Settings bestätigt vorhanden:** `SMTP_HOST=smtp.ionos.de`, `SMTP_PORT=465`, `SMTP_USER`, `SMTP_PASS`,
`MAIL_ABSENDER`/`MAIL_ANTWORT=info@nadigpfau.de`, `STORAGE_CONNECTION`, `SA_ENC_KEY`, `GRAPH_*`.
**Existierende Table-Storage-Tabellen:** `requests`, `tokens`, `selbstauskuenfte`, `leerstaende`, `inboxtrash`.
**Blob-Container:** `leerstand-fotos` (Zugriff: Blob/öffentlich-lesbar), `uploads`, `$logs`, `azure-webjobs-*`.

---

## 0d. SA-Paket-1 – Abschlussprotokoll (01.07.2026, vollständig live + E2E bestätigt)

**Deployt:** `send-token.js` (ersetzt Vorversion, Route `send-token`) + `token-check.js` (neu, Route
`token/check`, anonymous GET). App-Seite (`_saTokGewaehlt`/`saTokenSenden`) und Website-Seite
(`saPersonHtml`/`SA_VORBELEGT`/`sa_personen`) waren bereits vorher in v152 bzw. `index_website.html`
enthalten — musste nur noch das Backend nachgezogen werden.

**Vierter `mail.js`-Bug (Wiederholung des 30.06.-Problems):** Trotz des am 30.06. dokumentierten Fixes
fehlte `mail.js` nach dem heutigen VS-Code-Vollordner-Deploy erneut in `site/wwwroot/src/functions/` —
vermutlich weil der 30.06.-Fix nur direkt über Kudu in Azure vorgenommen wurde, nicht lokal in
`C:\nadigpfau-backend\src\functions\`. Ein voller Ordner-Deploy überschreibt/entfernt dann Dateien,
die lokal fehlen. **Symptom war irreführend:** `send-token` meldete `ok:true` (vermutlich warme
Azure-Instanz mit altem Node-`require`-Cache), während `send-mail` sofort `{ok:false,fehler:'Mailversand
fehlgeschlagen'}` zurückgab (kalte Instanz, `mail.js` real fehlend).
**→ Endgültige Lehre:** `mail.js` MUSS dauerhaft lokal in `src/functions/mail.js` liegen (nicht nur
einmalig über Kudu nachgezogen werden), sonst wird sie beim nächsten Vollordner-Deploy erneut entfernt.
Inhalt von `mail.js` selbst unverändert seit 22.06. (SMTP/IONOS-Version, `secure:PORT===465`, korrekt).

**E2E-Testergebnisse (PowerShell + Browser, Test-Mail `alexandernadig@gmx.de`):**
1. `POST /api/send-token` → `{ok:true}`, Mail kam an (Betreff „Ihre Selbstauskunft – Hausverwaltung
   Nadig / Pfau", Link `https://nadigpfau.de/?sa=<TOKEN>`).
2. `GET /api/token/check?token=<TOKEN>` → `{ok:true, objektName:"Testobjekt",
   vormerkung:{vorname:"Max", nachname:"Mustermann", telefon:"0123456789", email:"alexandernadig@gmx.de"}}`.
3. Browser-Workflow: Selbstauskunft-Seite lädt fehlerfrei über den Token-Link.
4. Eingereichte Selbstauskunft erscheint korrekt im App-Mail-Tab-Posteingang.

**Damit R3 vollständig erledigt** (Route `token/check` bestätigt aktiv, kein `token-check` nötig).

**Neuer offener Punkt (R14, aus diesem Test entdeckt):** Checkbox `sa_c3` in `index_website.html`
("Ich/Wir habe/n die Hinweise zur Datenverarbeitung gelesen und willige/n ein…") verlinkt auf **kein**
Dokument/Modal — DSGVO-Informationspflicht (Art. 13) ist damit für dieses Formular nicht sauber erfüllt.
Geplante Lösung: eigenes `mDatenschutz`-Modal analog zum bestehenden `mImpressum`-Modal, verlinkt aus
der `sa_c3`-Beschriftung, Inhalt: Verarbeitungszwecke (Bewerbungsprüfung), Rechtsgrundlage,
Speicherdauer/Löschung bei Nichtzustandekommen, Verschlüsselungshinweis, Empfänger, Betroffenenrechte
Art. 15–21 DSGVO, Beschwerderecht bei der Aufsichtsbehörde — anschließend an vorhandenen `dsgvo-box`-Text.
Zurückgestellt für eigenen Chat, gehört zum Fahrplanpunkt „Website-Launch" (⚑ Abschnitt D).

**Nächster Schritt (letzter Restpunkt aus SA-Paket-1):** `inbox-sa`-Debug-Fehlertext auf `{ok:false}`
reduzieren (aktuell vermutlich noch ausführlicherer Fehlertext im Response-Body).

---

## §0j. v159 – Feld `krMaxEuro` + `vertragsmodell` (Krefeld-Datenimport)

**Anlass:** Import der Krefeld-Mieterliste (70 Wohnungen). Die Liste enthielt Kleinreparatur-Angaben mit
einer **Jahresobergrenze**, die teils als Prozentsatz (8 % Jahresmiete), teils als fester Euro-Betrag
(400 € / 255,65 € bei Allianz-Verträgen) angegeben war. Das bestehende Feld `krProzent` konnte nur den
Prozentsatz abbilden (Anzeige starr „…% p.a."). Zur sauberen Abbildung des Euro-Deckels neues Feld.

**Codeänderungen (index.html, 7 Stellen, keine Funktion verloren/neu):**
1. `APP_VERSION` → `2026-07-02-v159`.
2. **Anzeige KR-Klausel** (Mieter-Detail, nur Verwalter): jetzt „<fmtEur(krHoehe)> je Fall · <krProzent>%
   (max. <fmtEur(krMaxEuro)>/Jahr)". Bildet die **BGH-Doppelgrenze** (Einzelbetrag + Jahresobergrenze,
   BGH VIII ZR 91/88 u. a.) explizit ab.
3. **Export-Mapping**: neue Spalten `KR-Max (€/Jahr)` (=`krMaxEuro`) und `Vertragsmodell` (=`vertragsmodell`).
4. **Import-Mapping**: `setIf('krMaxEuro', …)` + `setIf('vertragsmodell', …)`.
5. **Eingabefeld** `mVertragsmodell` im Bearbeitungsformular (nach TG-Stellplatz).
6. **Speicherlogik**: `m.vertragsmodell` beim Save.
7. **Detail-Anzeige** Vertragsmodell (nur Verwalter, mit `esc()`).

**Feld-Semantik (neu/erweitert):**
- `krMaxEuro` (Zahl, €): Jahres-Höchstbetrag der Kleinreparaturen. Bei %-Klauseln aus Kaltmiete×12×Prozent
  errechnet; bei festen Euro-Deckeln direkt der Betrag.
- `vertragsmodell` (Text): Vertragswerk des Mietvertrags. Bei Bestandsübernahme = Voreigentümer
  (Patrizia, Allianz, MEAG, DKV, DKB) bzw. eigene Verträge (Nadig Alt/Neu). **Nicht** mit `mvStatus`
  (MV-Generator-Status) oder `mvHeizVariante` verwechseln – bewusst getrennt gehalten.

**Import-Datei:** `immo_import_krefeld_2026-07-02.json` (Backup-Format `version:2`, nur die 70 geänderten
Krefeld-Mieter, frischer `updatedAt`). Import über „Backup importieren" → **Zusammenführen** (feldweise
jüngerer Stempel gewinnt, gefüllte Felder überschreiben nie leere; andere Objekte unberührt).

**Feld-Mapping xlsx → App (bestätigt durch Nutzer):**
| xlsx-Spalte | App-Feld | Regel |
|---|---|---|
| §MV / Höhe / Max befüllt | `krKlausel='Ja'` | sobald eine der drei Spalten Wert hat |
| Höhe (W) | `krHoehe` | exakt, keine Rundung (auch krumme DM-Umrechnungswerte 51,13/76,69) |
| Max (X), <1 | `krProzent` | ×100 (0,08→8) |
| Max (X), <1 | `krMaxEuro` | Kaltmiete×12×Prozent |
| Max (X), ≥1 | `krMaxEuro` | fester Euro-Deckel (Allianz 400/255,65) |
| Max (X), ≥1 | `krProzent` | aus Kaltmiete rückgerechnet |
| Renoviert (Y) | `uebergabe` | ja→„Renoviert übergeben", nein→„Unrenoviert übergeben", ?→„Übergabezustand unklar" |
| Vertrag (Z) | `vertragsmodell` | 1:1 |
| letzte Erhöhung (P) | `mieteSeitISO` | nur valide ISO-Daten (meist 2025-01-01) |

**Datenqualität (gemeldet, nicht automatisch geändert):**
- Miete/NK/Fläche stimmten bei 69/70 bereits exakt; nur WE54 (Wilmendyk 9, Leerstand) auf Angebotsmiete
  565/160 angeglichen (Nutzerfreigabe).
- Vormieter-Zeile Niedzicki (WE 51 Wilmendyk 9) ist Historie, NICHT importiert (aktuell: Urselmann).
- DKV/DKV-alt-Fälle (Giebing, Kozik, Greuel, Severino): §MV gesetzt, aber teils kein Einzelbetrag →
  `krKlausel=Ja` ohne `krHoehe`. Krumme Beträge 51,13 €/76,69 € = vermutlich DM-Umrechnung (100/150 DM);
  bei Altverträgen rechtlich gesondert zu betrachten.
- Einzelne JSON-Altfehler beim Sichten aufgefallen (nicht Teil dieser Aufgabe): Prüter (WE3 181) `anrede`
  „Herr" statt „Frau"; Ferfers `kontoinhaber` „Fefers Michael" (Tippfehler).

**Verifikation:** `node --check` OK; Funktions-Diff v158→v159 = 1156 unverändert (0 verloren/neu, nur
Feld-Erweiterungen); Logiktest `test_krmax.mjs` 194/194 grün (krMaxEuro-Berechnung, Feldkonsistenz,
Wertebereiche). `sw.js`-CACHE → `nadigpfau-v159`. Deploy durch Nutzer ausstehend.

---

## §0k. DSGVO-Dokumentenpaket (Prüfung 02.07.2026)

Sieben Dokumente im Projektspeicher geprüft und gegen `index_website.html` abgeglichen:
Datenschutzerklärung Lesefassung (Website) + Version 2.0 (interne Nachweisfassung), VVT (Art. 30),
TOM (Art. 32), Lösch-/Aufbewahrungskonzept, Verzeichnis Auftragsverarbeiter, Prüfprotokoll.

**Bewertung:** Fachlich sauber, in sich konsistent, Art.-13-Pflichtangaben in der Lesefassung vollständig
(Mieterportal, Drittlandtransfer Cloudflare/USA, Erforderlichkeit der Bereitstellung – die früheren
ChatGPT-Lücken sind behoben). Version 2.0 trennt korrekt anbieterseitig zugesichert vs. eigene offene
Maßnahmen und markiert Ungeklärtes als „ZU KLÄREN".

**Verifizierte offene Punkte (→ §11 R20/R21):**
- **R20:** Verantwortlicher dreifach uneinheitlich (GbR Hilden / natürliche Personen im Impressum /
  Venloer Str. in App+Objektstamm). Gesellschafts-/datenschutzrechtlich vor Launch zu klären.
- **R21 (Website-Widersprüche): CODE ERLEDIGT 02.07.** (Website→Outputs `index.html`, Deploy ausstehend):
  SMS-Option aus `p_kanal` entfernt (nur E-Mail, Hinweistext + `codeAnfordern()` bereinigt);
  Einwilligungs-Checkbox `k_dsgvo` durch Art.-13-Datenschutzhinweis mit Link auf `mDatenschutz` ersetzt,
  `sendeKontakt()` ohne Einwilligungs-Blockade/`datenschutz`-Feld. Rechtsgrundlage bleibt Art. 6 (1) b/f
  (DS-Lesefassung §4). `node --check` OK, keine Rest-Referenzen `sms`/`k_dsgvo`.
- DSFA-Erforderlichkeit erst nach vollständigem unternehmensweitem VVT beurteilbar (bisher nur
  Website-Ausschnitt vorhanden).

**Empfehlung:** Nach Klärung R20 (rechtlich) anwaltliche Endprüfung des Gesamtpakets. R21 ist im Code
bereinigt; Deploy der Website durch den Nutzer. Die Dokumente selbst sind Rechts-/Nachweisartefakte,
nicht Teil des App-Codes – keine Änderung im Repo nötig.

### Ergänzende Detailstände (Snapshot `DSGVO_memory.md`, eingearbeitet 05.07.2026)
Aus einem separaten Website-DSGVO-Arbeitschat übernommen. Betrifft die **Website** (Cloudflare/Azure/IONOS),
nicht die OneDrive-Foto-Auslagerung (dort gilt der gesonderte Befund: OneDrive **Personal** = Consumer, kein
DPA → Microsoft-365-Business-Frage, s. AVV v1.1). Die Quelldatei ist damit aufgelöst und als Dublette einzustufen
(kein zweites Gedächtnis-File, s. Aufräum-Empfehlung §14).
- **AVV-Vertragsstände (konkret, für Nachweis/Anwalt):** Cloudflare **DPA Version 6.4** (03.04.2026;
  Drittland: EU-US Data Privacy Framework, ersatzweise EU-SCC Modul 2/3 lt. DPA Ziff. 6.4). Microsoft **Azure**
  DPA automatisch Bestandteil der Produktbedingungen; EU-Datengrenze aktiv (Function App Region Westeuropa).
  IONOS SE **AVV Version 1.3** (Stand 03/2026, abgeschlossen 02.07.2026, AGB-Bestandteil seit 19.07.2022; kein
  Drittlandtransfer für Mail Basic/Business). IONOS-Subunternehmer für den Mail-Dienst: **1&1 Mail & Media GmbH**
  und **Open-Xchange GmbH** (beide Anhang 2 zum IONOS-AVV, Version 4.5, 04/2026, EU/Deutschland). Die
  vollständige IONOS-Subunternehmerliste umfasst 27 Einträge; nur diese zwei sind für den genutzten Dienst
  relevant. SMS-Versanddienstleister: **nicht im Einsatz** (entfällt; SMS-Option im Code bereits entfernt, R21).
- **Datenschutzbeauftragter:** nicht bestellt (keine Pflicht nach § 38 BDSG angenommen; **verbindliche
  anwaltliche Bestätigung steht noch aus**).
- **Eigene TOM der Hausverwaltung – Lücken konkret benannt:** Zugriffsregelungen auf Azure-Portal / IONOS-Konto /
  Cloudflare-Dashboard, Passwortrichtlinie, Vertraulichkeitsverpflichtung der Mitarbeiter – bislang keine Angaben.
  Präzisiert das „eigene TOM offen" im TOM-Dokument (Art. 32 DSGVO).
- **Löschfristen (Begründung):** Kontaktanfragen **12 Monate**; Mietbewerbung ohne Vertragsschluss **6 Monate**
  (§ 15 Abs. 4 AGG, 2-Monats-Klagefrist zzgl. Sicherheitsspanne); Vertragsunterlagen nach § 257 HGB / § 147 AO.
  Beschwerdestelle: **LDI NRW**, Postfach 20 04 44, 40102 Düsseldorf, Tel. 0211 38424-0,
  poststelle@ldi.nrw.de (Recherchestand 2026); zusätzlich Behörde des gewöhnlichen Aufenthaltsorts (Art. 77 DSGVO).
- **Datenminimierung Selbstauskunft (offen, Art. 5 Abs. 1 lit. c DSGVO):** Umfang der abgefragten Daten (insb.
  Einkommen/Beschäftigung) und **zulässiger Zeitpunkt der Einkommensabfrage** (vor/nach Besichtigung) mit
  Orientierungshilfen der Aufsichtsbehörden und dem Anwalt abgleichen. Kein Datei-Upload/keine Ausweiskopie/kein
  Gehaltsnachweis über das Formular (technisch bestätigt).
- **Datensicherheits-Formulierung:** bewusst auf „verschlüsselt nach dem Stand der Technik" vereinheitlicht
  (statt Algorithmus-Nennung wie AES-256-GCM), um das Risiko einer unrichtigen Angabe zu vermeiden.

---

## §0l. v160 – Einzugsprotokoll-Button-Erweiterung + Krefeld-Datenkorrekturen (02.07.2026)

**Anlass:** Autonome Weiterbearbeitung offener Aufgaben ohne Nutzermitwirkung + zwei bestätigte
Datenkorrekturen aus dem Krefeld-Abgleich.

**Code-Änderung (App, `index-v160.html`):** Der Button zum Anlegen/Vorbelegen eines
**Einzugs**protokolls aus einem vorhandenen Protokoll war bisher nur an **Auszugs**protokollen sichtbar.
Die Sichtbarkeitsbedingung wurde auf **alle Nicht-Einzugsprotokolle** erweitert (Zwischen-, Abnahme-,
sonstige), sodass ein Einzugsprotokoll aus jedem vorhandenen Protokolltyp derselben WE vorbelegt werden
kann. Reine Bedingungs-/Sichtbarkeitserweiterung – **keine neue Funktion, kein neuer Store, DB_VER 31**.
v160 enthält v159 vollständig (`krMaxEuro`, `vertragsmodell`).

**Validierung:** `node --check` OK; Funktions-Diff v159→v160 = **1156 unverändert** (0 verloren/neu);
194/194-Logiktest grün. `APP_VERSION='2026-07-02-v160'`, `sw.js`-CACHE `nadigpfau-v160`.
**v159-HTML entfällt** (v160 ist Obermenge).

**Datenkorrekturen (separates Merge-Import-JSON `immo_korrektur_krefeld_2026-07-02.json`):**
- **Prüter WE3:** Anrede „Herr" → „Frau" korrigiert; zur Konsistenz mit der App-Spiegel-Logik auch
  `personen_liste` angepasst (bestätigt).
- **Ferfers WE1:** Kontoinhaber-Tippfehler korrigiert (bestätigt).
- **Bewusst UNVERÄNDERT:** abweichender Kontoinhaber „Prüfer Roland" bei Prüter – mögliche reale
  SEPA-Konstellation (Dritt-Kontoinhaber), keine stille Änderung ohne Nutzerauftrag.

**Import-Reihenfolge (Nutzer):** erst `immo_import_krefeld_2026-07-02.json` (70 Mieter, „Zusammenführen"),
dann `immo_korrektur_krefeld_2026-07-02.json` („Zusammenführen").

**Deploy durch Nutzer ausstehend.**

---

## 1. Projektübersicht

### Zweck
Single-File-Progressive-Web-App (PWA) zur vollständigen Verwaltung eines privaten Immobilienbestands
der **Nadig Pfau Hausverwaltung** (Eigentümer/Admin: Alexander; Co-Admin: Anna-Alexandra Pfau;
Admin/Eigentümer MG: Roland Bernd Nadig; Hausmeister Krefeld: Dirk Nicolay). Die App deckt
Mieterverwaltung, Buchhaltung, Übergabe-/Einzugsprotokolle, Mängel-/Reparatur-/Wartungsverwaltung,
Zählerstände, Dokumentenverwaltung, amtliche Schreiben (Mietbescheinigung, WGB, Kündigung,
Mieterhöhung), Zeiterfassung, Selbstauskunft-Workflow, Leerstand-/Aushang-Erstellung sowie
Mieter-Mail-Versand ab.

### Bestand (ca. 116 Wohneinheiten, 17 Gebäude, Stand `OBJEKTE`-Konstante)

| ID | Gebäude | Ort | `gruppe` (Briefkopf) | `nr` |
|----|---------|-----|----------------------|------|
| ruhrt41 | Ruhrtalstr. 41 | 40239 Düsseldorf | duesseldorf | 1 |
| mind23 / mind25 | Mindener Str. 23 / 25 | 40227 Düsseldorf | duesseldorf | 2 |
| kyff28 / kyff30 / kyff32 | Kyffhäuser 28 / 30 / 32 | 41063 Mönchengladbach | mg | 3 |
| inr181 / inr183 / inr185 | Inrather Str. 181 / 183 / 185 | 47803 Krefeld | krefeld | 4 |
| wilm7 / wilm9 / wilm11 / wilm13 | Wilmendyk 7 / 9 / 11 / 13 | 47803 Krefeld | krefeld | 4 |
| marien22 | Marienburger Str. 22 | 40789 Monheim am Rhein | monheim | 5 |
| verlach37 | Zur Verlach 37 | **40723 Hilden** | **mg** | 6 |
| amboss10 | Amboßstr. 10 | 40547 Düsseldorf (Niederkassel) | **pfau** | 7 |

> ⚠️ **Achtung Sonderzuordnungen:** `verlach37` liegt in **Hilden**, ist aber `gruppe:'mg'` (Briefkopf
> Mönchengladbach). `amboss10` hat die eigene `gruppe:'pfau'`. Das Feld **`gruppe` steuert
> ausschließlich Briefköpfe**, NICHT das Dashboard – siehe `DASH_GRUPPEN` (eigene Konstante).

### Sprache
**Immer Deutsch** – UI, Antworten, Code-Kommentare, Variablennamen (gemischt deutsch/englisch).

---

## 2. Architekturübersicht

### Topologie
```
┌─────────────────────────────────────────────────────────────────┐
│  PWA  index-vNN.html  (Single-File, GitHub Pages)               │
│  deusnuntio.github.io/Immo-app-Nadig-Pfau                       │
│  · IndexedDB 'immo_v2' (DB_VER 30, 44 Stores)                   │
│  · OneDrive-Sync via Microsoft Graph (OAuth2 PKCE)              │
│  · SheetJS (CDN), Tabler Icons 3.7.0, DM Sans/DM Mono           │
└───────────┬─────────────────────────────────┬───────────────────┘
            │ Graph (Sync, Dateien)           │ HTTPS (Function-Key / anonymous)
            ▼                                  ▼
   ┌──────────────────┐         ┌──────────────────────────────────┐
   │ OneDrive         │         │ Azure Functions v4 (Node 22)     │
   │ (zentraler Sync- │         │ func-nadigpfau · westeurope      │
   │  Speicher,       │         │ rg-nadigpfau-prod (Windows, Y1)  │
   │  Dateiordnerbaum)│         │ C:\nadigpfau-backend\src\functions│
   └──────────────────┘         └───────────┬──────────────────────┘
                                            │
                          ┌─────────────────┼──────────────────┐
                          ▼                 ▼                  ▼
              Azure Table Storage   Azure Blob Storage   SMTP/nodemailer
              (stnadigpfau)         (leerstand-fotos)    IONOS info@nadigpfau.de
              requests, tokens,                          (SMTP_HOST=smtp.ionos.de:465)
              selbstauskuenfte,
              inbox_trash, leerstaende

   ┌──────────────────────────────────────────────────────────────┐
   │  Öffentliche Website  index_website.html                      │
   │  nadigpfau.de (Cloudflare Pages, ZIP-Direktupload)            │
   │  · Kontaktformular → /api/interest                            │
   │  · Leerstände → GET /api/leerstand → renderAngebote()         │
   │  · Selbstauskunft → ?sa=TOKEN → /api/token/check + /api/selbstauskunft │
   │  · aktuell noindex (Pre-Launch)                               │
   └──────────────────────────────────────────────────────────────┘
```

### Liefer-/Deploy-Wege
- **App:** Claude erzeugt `index-vNN.html` in Outputs → User benennt manuell um → Upload auf GitHub Pages.
- **Backend:** `.js`-Dateien nach `C:\nadigpfau-backend\src\functions\` → Deploy via VS Code.
- **Website:** Datei `index_website.html` → in `index.html` umbenennen → **ZIP mit `index.html` im Root**
  (`zip -j`) → Cloudflare Pages.

### Backend-URL-Konstanten (in der App)
| Konstante | Wert | Verwendung |
|-----------|------|------------|
| `BACKEND_BASIS` | `https://api.nadigpfau.de` | **Nur** alter Wohnungsexport (`/api/admin/wohnungen-import`). **Custom Domain existiert NICHT** – SSL-Pending-Bug auf Consumption-Plan Y1. |
| `BACKEND_AZURE` | `https://func-nadigpfau-g7fghseafmftemeq.westeurope-01.azurewebsites.net` | Alle SA-, Inbox-, Mail-, Token-Aufrufe. |

> Bei künftiger Custom-Domain-Reparatur: `BACKEND_BASIS` umbiegen → neue App-Version nötig.

---

## 3. Datenbankstruktur (IndexedDB `immo_v2`, DB_VER 31)

`keyPath:'id'` bei allen Stores. **45 Stores** in der `onupgradeneeded`-Erstellungsliste:

```
users, mieter, tg, protokolle, aufgaben, maengel, reparaturen, settings, dokumente,
nka_archiv, einkaufsliste, termine, fotos, wartung, zaehler, zaehlerstaende, versorger,
versorger_archiv, versicherungen, lager, lager_anforderung, taetigkeit_kat, arbeitszeit,
abwesenheit, rechnungen, packliste, objekt_stamm, ventile, ventilpruefung, taetigkeit_log,
sync_log, mieter_snapshots, branchenbuch, interessenten, od_dateien, buchungen,
mietbescheinigungen, mv_entwuerfe, selbstauskuenfte, tenant_mails, od_auth, kautionsquittungen
```
*(Plus implizit `mieter_snapshots`, `od_auth`, `sync_log` – siehe unten.)*

### Wichtige Indizes (Auszug)
- `mieter`: `objektId`, `weNr`
- `buchungen`: `mieterId`, `kontoId`, `mietmonat`
- `dokumente`: `objektId`, `mieterId`
- `zaehlerstaende`: `objektId`, `zaehlerId`
- `tenant_mails`: `mieterId`, `objektId` (DB_VER 28→29 hinzugekommen)
- `selbstauskuenfte`: `objektId`, `status`
- `mv_entwuerfe`, `mietbescheinigungen`: `mieterId`, `objektId`
- `kautionsquittungen`: `mieterId`, `objektId` (DB_VER 30→31 hinzugekommen)

### Stamm-Daten als Code-Konstanten (NICHT in IndexedDB)
- `OBJEKTE` – die 17 Gebäude (siehe §1).
- `objekt_stamm`-Store hält **gebäudebezogene Stammdaten** inkl. `energieausweis`-Objekt
  (kein eigener Store für Energieausweis!) und Wohnungs-Stammdaten (`flaeche`, `zimmer`, `lage`, `fotos`, `grundriss`).

### Datensatz-Zeitstempel & Sync-Stempel
- `idbPut` setzt `updatedAt` automatisch (ISO).
- `_STAMP_STORES = ['mieter','users','tg']` → bei **jeder** Bearbeitung frischer Stempel
  (damit Änderungen im Merge „gewinnen"). Andere Stores: nur falls leer.
- `idbPut(store,obj,{keepStamp:true})` → vorhandenen Stempel beibehalten (für Sync/Restore).

---

## 4. Sync-Architektur (kritisch – Datenverlustrisiko)

### Mechanik
- **Auto-Sync:** nach jeder Änderung 3 s gebündelt → `syncToOneDrive()` (`window._syncTimer`).
- **BroadcastChannel** `immo_sync` für Geräte im selben Browser/Netz.
- **`mergeRecord(local, remote)`** (Z. ~23294): Konfliktauflösung per Zeitstempel
  (`recStamp`). Neuerer gewinnt; bei Gleichstand **remote**. **Gefüllte Felder werden nie durch
  leere überschrieben** (`_istLeer`-Rückholung). Stempel wird auf den jüngeren gesetzt.
- **Soft-Delete mit Tombstone** (`_papierkorb:true`) für Protokolle – Hard-Delete lässt sich
  nicht sicher syncen.

### Die drei Store-Listen (müssen konsistent gepflegt werden)
1. **Anlage/Index** (`onupgradeneeded`) – 44 Stores (inkl. lokal-only).
2. **`alleStores`** (Snapshot/Push/Pull/Backup, Z. ~23358 & ~23740-Region) – **39 Stores**.
3. **`mergeStores`** (Merge-Logik beim Pull, Z. ~23740) – **38 Stores** (ohne `users`/`settings`/`tg`).

### Bewusst NICHT synchronisierte Stores (lokal-only)
`mieter_snapshots` · `od_auth` · `sync_log` — diese fehlen **absichtlich** in `alleStores`/`mergeStores`.
(`sync_log` = lokales Protokoll, `od_auth` = OneDrive-Tokens, `mieter_snapshots` = lokale Rücksetzpunkte.)

> 🔴 **REGEL „6 Pflichtstellen" bei jedem neuen Store** (sonst Datenverlust):
> (1) `forEach`-Erstellungsliste in `onupgradeneeded`, (2) Index-Block, (3) `alleStores`-Array,
> (4) `mergeStores`-Array, (5) Sync-Pull-Merge-Logik, (6) `DB_VER` inkrementieren.
> Vorkommen vor jedem Assert exakt mit `grep -n` zählen.

### Backup-Import (3 Modi, `importBackupAusfuehren`)
- **Wiederherstellen** – frischer Stempel, gewinnt überall beim nächsten Sync.
- **Zusammenführen** – `mergeRecord` pro Datensatz.
- **Vollständig ersetzen** – lokale Daten komplett überschreiben.
Vor jedem Import automatisch `erstelleMieterSnapshot('vor Import (...)')`.

---

## 5. API-Endpunkte (Azure Functions v4)

Alle unter `https://func-nadigpfau-...azurewebsites.net/api/…`. Auth: `function` (Function-Key
via Header `x-functions-key`) oder `anonymous` (öffentlich für Website).

| Endpunkt | Methode | Auth | Tabelle/Ziel | Zweck | Status |
|----------|---------|------|--------------|-------|--------|
| `send-token` | POST | function | `tokens` + `requests` | SA-Token erzeugen + Mail mit `?sa=TOKEN`. Speichert Vormerk-Daten am Token (Paket 1). | aktiv |
| `token/check` | GET | anonymous | `tokens` (PK `'token'`) | Token-Validierung beim Laden der SA-Seite; gibt `vormerkung` zurück. **Route = `token/check`** (Frontend ruft `/api/token/check`). | aktiv |
| `inbox` / `inbox-sa` | GET | function | `requests` / `selbstauskuenfte` | Posteingänge (Nachrichten / Selbstauskünfte). | aktiv |
| `inbox-mark-read` | POST | function | `requests`→`inbox_trash` | „Erledigt" verschiebt Nachricht in Papierkorb (PK-Auto-Erkennung per RowKey). | aktiv |
| `inbox-sa/mark-read` | POST | function | `selbstauskuenfte` | SA als gelesen markieren. | aktiv |
| `inbox-trash` | GET/POST | function | `inbox_trash` | GET=Liste; POST `{id,aktion:'restore'\|'delete'}`; 30-Tage-Retention. | **Code vorhanden** |
| `send-mail` | POST | function | SMTP (kein Storage) | Freie Mieter-Mail `{to,subject,text}` über info@nadigpfau.de. | **Code vorhanden** |
| `send-token` (Mail) | – | – | `mail.js`-Modul | nodemailer-Wrapper, von send-token + send-mail genutzt. | aktiv |
| `interest` | POST | anonymous | `requests` | Kontaktformular der Website. | aktiv |
| `selbstauskunft` | POST | anonymous(token) | `selbstauskuenfte` | Vollständige SA von Website (tokengeschützt). | Backend offen |
| `leerstand` | GET/POST/DELETE | GET anonymous, POST/DELETE function | `leerstaende` + Blob `leerstand-fotos` | Website-Leerstände (Upsert/List/Delete, Base64→Blob). | **Code vorhanden** |
| `upload` | POST | function | Blob (geplant) | Foto-Upload. | **nicht angebunden** |
| `file` / `health` | – | – | – | Hilfsendpunkte. | aktiv |

### Azure Table Storage `stnadigpfau`
Tabellen: **`requests`**, **`tokens`**, **`selbstauskuenfte`**, **`inbox_trash`** (PK `'trash'`), **`leerstaende`** (PK `'leerstand'`, RowKey=Kennung).
App Settings: `STORAGE_CONNECTION`, `SMTP_HOST=smtp.ionos.de`, `SMTP_PORT=465`, `SMTP_USER/MAIL_ABSENDER/MAIL_ANTWORT=info@nadigpfau.de`, `SMTP_PASS`.

---

## 6. Geschäftslogik – rechtsrelevante Kernfunktionen

> Alle rechtlichen Konstanten sind im Code abgebildet. **Bei Rechtsänderung: Code UND diese Wissensbasis aktualisieren.**

### Kappungsgrenze (`kappungsgrenze`, `kappungsBasis`, `kappungsObergrenze`, Z. ~17088)
- **15 %** für `gruppe ∈ {krefeld, duesseldorf, monheim, pfau}` solange NRW-MietSchVO gilt (**bis 28.02.2030**).
- **20 %** für `mg` (Mönchengladbach) und alles nach 2030.
- Basis = Nettokaltmiete vor 3 Jahren (`miete_history`, **§559-Erhöhungen zählen nicht**); fehlt Historie → aktuelle Miete.
- `sperrfristInfo` prüft 12-/15-Monats-Fristen (§558 BGB).

### Kündigung & Auszug (`berechneAuszugNachKuendigung`, `_dritterWerktag`, Z. ~18992)
- **§ 573c Abs. 1 BGB:** Mieter-Kündigungsfrist stets **3 Monate** zum Monatsende.
- **3-Werktage-Karenz** (BGH VIII ZR 206/04): Eingang ≤ 3. Werktag → Ablauf +2 Monate, sonst +3.
- **Samstag zählt als Werktag.** NRW-Feiertage berücksichtigt (`FEIERTAGE NRW` + 24./31.12.).
- UI-Hinweis bei Monatsanfangs-Kündigung; Vorschlag überschreibbar (Nachmieter prüfen).

### Vermieter-Kündigung (Textbaustein, Z. ~14053)
§ 568 BGB Schriftform; Frist verlängert sich nach 5/8 Jahren auf 6/9 Monate; Begründungspflicht.

### Leerstand-Doppelkonzept (`istWohnungFaktischLeer`, Z. ~9064)
- **Echter Leerstand** = WE ohne aktiven Mieter-Datensatz → gestrichelte Zeile, `modalLeerstandWE`.
- **`m.leerstand`-Flag** am aktiven Mieter ODER Auszugsdatum ≤ heute → faktisch leer.
- `istWohnungFaktischLeer(m)` vereinheitlicht beide Fälle.

### Energieausweis (§ 80 / § 87 GEG, Z. ~8309–8460)
- Gespeichert pro Gebäude in `objekt_stamm.energieausweis` (KEIN eigener Store).
- Konstanten: `ENERGIE_AUSWEISTYP` (Verbrauchs-/Bedarfsausweis), `ENERGIE_TRAEGER`, `ENERGIE_KLASSEN` (A+…H).
- `energieausweisWarnung(e)` – rot bei abgelaufen / < 90 Tage (10-Jahre-Gültigkeit).
- `energieausweisText(e)` – baut § 87-Pflichttext für Aushang (`ausEnergie`-Feld).

### Amtlicher Name (`amtlicherName`, Z. ~13499)
„Roland Bernd Nadig" **nur** auf Mietbescheinigung (§ 23 WoGG) + WGB (§ 19 BMG); sonst „Roland B. Nadig".

### Übergabe→Einzugsprotokoll-Verkettung (v136–v140)
Raumstruktur/Zustände/Komponentenfotos/Zählerstände/Schlüsselzählungen werden vom Abnahme- ins
Einzugsprotokoll **vererbt**; Mängel werden **referenziert, nicht dupliziert**; gelöste Mängel
automatisch entfernt. 4 Signaturfelder (`sigMieter`, `sigMieter2`/`mieter2Name`, …). Soft-Delete/Papierkorb für Drafts.

---

## 7. Sicherheitskonzept

- **Content-Security-Policy** (Meta-Tag): `default-src 'self'`; `connect-src` auf Azure-Function-URL,
  api.nadigpfau.de, graph.microsoft.com, login.microsoftonline.com beschränkt; `script-src` erlaubt
  `'unsafe-inline'` + jsdelivr/sheetjs CDN.
- **Auth in der App:** PIN-Login pro Benutzer, seit v158 als SHA-256+Salt gespeichert (`pinHash`/`pinSalt`; kein Klartext-`pin` mehr, Alt-PINs werden beim ersten Login migriert). Reine Komfortsperre – 4–6-stelliger PIN bleibt offline brute-force-bar, schützt aber vor Klartext-Funden in Backup/OneDrive/Azure. Erststart erfordert
  OneDrive-Verbindung zum Laden der Benutzer.
- **Rollen** (`istVerwalter`, `istEigentuemer`, `istSystemAdmin`, Z. ~1721): `role ∈ {admin, eigentuemer, hausmeister}`.
  `istVerwalter` = admin **oder** eigentuemer. Schreibaktionen/Backups admin-geschützt.
- **OneDrive:** OAuth2 **PKCE** (`code_verifier`), Tokens in `od_auth` (lokal-only, nicht gesynct).
- **Backend:** Function-Key (Header `x-functions-key`) für App-Aufrufe; `anonymous` nur für
  öffentliche Website-Endpunkte. SMTP-Passwort in App Settings.
- **Datenschutz:** SA-Daten verschlüsselt in Table Storage geplant; Token 7 Tage gültig (`TAGE_GUELTIG`).
- **XSS-Härtung (seit v152):** Nutzereingegebener Freitext wird bei der Ausgabe konsequent
  über `esc()` (Textinhalt) bzw. `escAttr()` (Attribute) maskiert. Bei jeder neuen `innerHTML`-
  Ausgabe von Nutzerdaten zwingend `esc()`/`escAttr()` verwenden (siehe v152-Fix). Solange
  `script-src 'unsafe-inline'` aktiv ist (R11), ist diese Ausgabemaskierung die **einzige**
  Verteidigungslinie gegen gespeicherten XSS – Regel daher nicht aufweichen.

> ⚠️ **CORS-Falle:** Browser-Aufrufe scheitern trotz PowerShell-Erfolg, wenn in der Azure Function
> App unter API → CORS nicht `nadigpfau.de`, `www.nadigpfau.de`, `deusnuntio.github.io` (kein `*`,
> Credentials AUS) eingetragen sind.

---

## 8. Coding-Standards & Patch-Methodik (VERBINDLICH)

### Namenskonventionen
- Funktionen: gemischt deutsch/englisch, camelCase (`berechneAuszugNachKuendigung`, `idbGetAll`, `renderObjMieter`).
- Modal-Funktionen: Präfix `modal…` (`modalAushangErstellen`, `modalLeerstandWE`).
- Render-Funktionen: Präfix `render…`. Mail-Tab: Präfix `mail…`.
- Konstanten: UPPER_SNAKE (`DOK_TYPEN`, `HEIZUNG_ARTEN`, `ALLGEMEIN_ID`, `DASH_GRUPPEN`).
- IDs via `uid()`. Datumsfelder doppelt: `…ISO` (Vergleich) + deutsches `TT.MM.JJJJ` (Anzeige).
- IndexedDB-Helfer: `idbGet/idbGetAll/idbPut/idbDelete/idbClear`.

### Patch-Methodik (NICHT abweichen)
1. Arbeitskopie `/home/claude/work.html` aus **Outputs-Vorversion** (NIE aus `/mnt/project/`
   = veraltet, NIE aus Uploads ohne Versionsabgleich).
2. Änderungen via **assert-geschützte Python-`str_replace`-Skripte**: `assert s.count(old)==N` vor jeder Ersetzung.
3. Nach jedem Schritt `node --check` via `extract_check.py` (Inline-`<script>` ohne `src` → `/tmp/check.js`).
4. Funktionsdiff: `grep -oE '^(async )?function [A-Za-z0-9_]+' | sort` → `comm -23/-13` → **0 Funktionen verloren**.
5. Finale Ausgabe nach `/mnt/user-data/outputs/index-vNN.html` mit **inkrementierter** Versionsnummer + passender `APP_VERSION`-Konstante.

### Bekannte Fallstricke
- **Backend: geteilte Module neben die Functions legen.** `require('./mail')` in `send-mail.js`/
  `send-token.js` sucht im Function-Ordner – `mail.js` MUSS in `src/functions/` liegen (nicht nur `src/`),
  sonst stiller 500 „Mailversand fehlgeschlagen" (echte Ursache nur im Log: „mail-Modul nicht verfügbar").
- **Azure-Table-Storage-Namensregeln.** Tabellennamen NUR alphanumerisch (kein `_`/`-`), Start mit
  Buchstabe, 3–63 Zeichen; sonst `InvalidResourceName`-500. (War der `inbox_trash`-Bug, jetzt `inboxtrash`.)
  Blob-Container brauchen für öffentliche Auslieferung *anonymen Blobzugriff* auf Account-Ebene PLUS
  Zugriffsebene „Blob" am Container.
- **Stiller `try/catch` verschleiert Deploy-Fehler.** `containerMitCreate()` schluckte den
  Container-Anlegefehler → irreführende Folgemeldung „container does not exist". Bei Setup-kritischen
  Operationen (createTable/createContainer) den Fehler werfen statt schlucken (Diagnose-Fix zurückgestellt, dokumentiert).
- **Überlappende `str_replace` an eng gepackten Stellen** (Druckfunktionen `druckHTML`/`_druckJetzt`,
  MV-Generator) verursachen kaskadierenden Schaden trotz „Successfully replaced". → Block komplett
  aus sauberer Vorversion per `sed`-Zeilenbereich holen, alle Änderungen in EINEM getesteten Skript.
- **Store-Listen-Vorkommen exakt zählen** vor Assert (`meine_packliste`-Entfernung: 5 statt 4 Vorkommen).
- **Kameraaufnahme:** Nie `capture="environment"` auf File-Inputs (PWA-Reload auf Samsung Android)
  → immer `getUserMedia`-Overlay.

---

## 9. Wichtige Funktionen & Module (Schnellindex, Zeilen ca.)

| Funktion | Zeile | Aufgabe |
|----------|-------|---------|
| `openDB` / `onupgradeneeded` | 895 | DB-Schema, 44 Stores |
| `idbGet/idbGetAll/idbPut/idbDelete` | 957+ | IndexedDB-CRUD |
| `OBJEKTE` / `DASH_GRUPPEN` | 1028 / 1062 | Gebäude / Dashboard-Gruppierung |
| `istVerwalter/istEigentuemer` | 1721 | Rollenprüfung |
| `mailNachrichtErledigt` | 4034 | „Erledigt"→inbox-mark-read |
| `tenantMailSenden` | 4200 | Mieter-Mail→send-mail |
| `energieausweisText/Warnung` | 8435/8448 | § 87 GEG |
| `istWohnungFaktischLeer` | 9064 | Leerstand-Vereinheitlichung |
| `DOK_TYPEN` / `PORTAL_DOK_TYPEN` | 10778/10809 | Dokumenttypen |
| `amtlicherName` | 13499 | amtl. Namensform |
| `hauptmieterNameVoll` | 15889 | Mieter-Anzeigename (auch WoGG-Bescheinigung, v151) |
| `personenAnzahlStichtag` | ~9590 | Auto-Personenzähler (Stichtag, v151) |
| `personAktionsButtons`/`personVCard`/`personKontaktTeilen` | ~9580 | Bewohner-Kontaktbuttons + Einzel-vCard (v151) |
| `kappungsgrenze`/`kappungsObergrenze` | 17088 | Mieterhöhungsrecht |
| `berechneAuszugNachKuendigung` | 18992 | § 573c BGB |
| `erstelleMieterSnapshot` | 23169 | lokaler Rücksetzpunkt |
| `mergeRecord` | 23294 | Sync-Konfliktauflösung |
| `importBackup/-Ausfuehren` | 23316 | 3-Modi-Backup |
| `syncToOneDrive` | 23613 | OneDrive-Push |
| `druckHTML`/`_druckJetzt`/`druckVorschauDrucken` | 25010/25068 | Druck (mehrstufiger Fallback) |

---

## 10. Druck-/PDF-Mechanik (v140-Lösung – funktioniert, am Gerät bestätigt)

Mehrstufig wegen Samsung-PWA-Eigenheiten:
1. `druckHTML` zeigt **Vorschau** im iframe `#dvFrame` (`srcdoc`), entfernt Auto-`window.print()`,
   erzwingt weißen Hintergrund.
2. `druckVorschauDrucken` → bei eigenständigen Dokumenten (Protokoll) `oeffneDruckDokument` (Blob-Tab),
   sonst In-Page-Druck.
3. `_druckJetzt` (**Kern**, zuverlässigster Weg): extrahiert `<style>`+Body in `#printRoot`,
   lenkt alle `body`-Selektoren auf `#printRoot` um, löst `@page`/`@media print` heraus (Samsung-WebView
   wertet verschachtelte Regeln unzuverlässig aus → sonst leere Seite), blendet App per `printing-active`
   + Inline-`display:none!important` aus, druckt das Fenster.

> Die 3 kritischen v137-Bugs sind laut Memory am Gerät (28.06.) **erledigt**: PDF-Druck OK,
> Mail-„Erledigt" OK, Multi-Mieter-Namen (getrennte Mieter1/Mieter2-Felder + 4. Signaturfeld) bestätigt.

---

## 11. Bekannte Probleme / offene Risiken

| # | Thema | Detail / Risiko |
|---|-------|-----------------|
| ~~R1~~ | ~~Token-Tabellenname~~ | **ERLEDIGT 30.06.:** Tabelle heißt **`tokens`** (Plural), per Storage-Browser bestätigt. |
| ~~R2~~ | ~~PartitionKey Kontaktanfragen~~ | **ERLEDIGT 30.06.:** Realer PK = **`request`** (Singular). `inbox-trash.js` `PK_NACHRICHT='request'` fixiert. (Route-Vereinheitlichung `inbox-sa/mark-read` vs `inbox-mark-read` ggf. später, funktional unkritisch.) |
| ~~R3~~ | ~~SA-Paket-1~~ | **ERLEDIGT 01.07.:** `send-token`+`token-check` deployt, vollständig E2E-getestet (PowerShell + Browser). Route `token/check` bestätigt aktiv. Details §0d. |
| R14 | **Datenschutz-Hinweis Selbstauskunft** | **Teilweise erledigt 01.07.2026:** Das `mDatenschutz`-Modal existiert bereits (Z. ~451) samt Footer-Link (Z. ~299). **(a) technisch – ERLEDIGT:** `sa_c3`-Beschriftung „Hinweise zur Datenverarbeitung" ist jetzt Link auf `mDatenschutz` (§0f); Website deploybereit, Deploy durch Nutzer ausstehend. **(b) rechtlich – OFFEN:** Modal-Inhalt ist noch Platzhalter. Anwaltsentwurf `Datenschutzerklaerung_Website_ENTWURF.docx` erstellt (§0f) mit Klärungspunkten (Verantwortlicher/Impressum, AVV Azure+Cloudflare+IONOS, Löschfrist, Drittlandtransfer). Nach anwaltlicher Freigabe: Volltext ins Modal, Platzhalter entfernen. Gehört zu ⚑ Abschnitt D (Website-Launch). |
| R4 | **Custom Domain** | `api.nadigpfau.de` existiert nicht (Azure-SSL-Pending-Bug Consumption Y1). `BACKEND_BASIS` zeigt darauf → nur Alt-Export betroffen. |
| R5 | **CORS** | Browser-Aufrufe scheitern ohne korrekte CORS-Liste (siehe §7). |
| R6 | **Website-Stände** | `/mnt/project/index_website.html` ist evtl. NICHT die Live-Version. Vor Etappe-3-Arbeiten **echte Live-Datei** anfordern. |
| R7 | **Projekt-Übergabedatei veraltet** | `/mnt/project/uebergabe_neuer_chat.txt` = v83/DB_VER 21 → nur historische Referenz, NICHT als Stand verwenden. |
| R8 | **`upload`-Endpunkt** | `/api/upload` existiert, aber Foto-Upload in App **nicht angebunden**. **Entschärft 03.07.:** Grundsatzentscheidung § 12-P23 = interne Dateien laufen über **OneDrive** (`od_dateien`/`syncDateibaum`), nicht über Blob → `/api/upload` ist für die App-Fotoauslagerung (23a) **nicht erforderlich** und bleibt nur relevant, falls später doch ein Blob-Weg gewünscht wird. |
| R9 | **Versionshistorie** | Stand jetzt **v151/DB_VER 30** (§ 0a gepflegt). Frühere Lücke (v143–v146) bleibt undokumentiert; v147–v151 sind in § 0a erfasst. |
| R10 | **PNG-Icons im Repo** | `icon-192.png`/`icon-512.png` sind echte Dateien im GitHub-Pages-Verzeichnis (nicht im HTML eingebettet). Bei Repo-Operationen mit ausliefern, sonst PWA nicht mehr installierbar. |
| R11 | **C1/V4 CSP `unsafe-inline`** | `'unsafe-inline'` noch in `script-src`. Entfernen erfordert Migration von 1084 Inline-Handlern (Stand v244) auf das v147-Delegation-Gerüst (`registerActions`/`__delegate`) oder Nonce-Ansatz. Multi-Tages-Refactor, zurückgestellt. Akuter XSS in v152 durch konsequentes `esc()`/`escAttr()` geschlossen; CSP bliebe zusätzliche Verteidigungslinie. **Etappenplan → §R11Plan (19.07.).** |
| R12 | ~~**B3/V7 Kappungsgrenze-Bindung**~~ **GESCHLOSSEN v178 (§0ad).** Bindung jetzt an Gemeinde aus `obj.ort` (57er-MietSchVO-Liste + getrennte Laufzeiten Kappung/MPB). Die Alt-Annahme „für Bestand korrekt" war FALSCH: Hilden rechnete 20 % statt 15 %, Amboßstr. galt als unreguliert. |
| R13 | ~~PWA nicht installierbar / Nav abgeschnitten~~ | **ERLEDIGT v148–v150 (30.06., am Gerät bestätigt).** Ursachen & Invarianten in §0b. Kurz: externes `manifest.json` + PNG-`any`-Icons (statt SVG-only + `data:`-Manifest), SW-Registrierung statt `unregister()`-Reset, bottom-nav Safe-Area-Fix. |
| ~~R15~~ | ~~Foto-Verlust `leerstand.js` POST~~ | **ERLEDIGT v158 (deployt):** POST löscht nur noch verwaiste Blobs (`verwaisteBlobsLoeschen`), Bestand bleibt; v152-Härtung reintegriert. Regressionstest in `tests/backend.test.mjs`. Live-Verifikation (3-Foto-Test) noch durchzuführen. |
| ~~R16~~ | ~~PINs im Klartext~~ | **ERLEDIGT v158 (deployt):** SHA-256+Salt (`pinHash`/`pinSetzen`), Login-Migration + Tombstone `pin`. Restpunkt optional: PIN-Länge 6 freigeben. Migration greift, sobald sich jedes Gerät einmal einloggt. |
| ~~R17~~ | ~~Website Attribut-Injection + noindex~~ | **ERLEDIGT v158 (deployt):** A3 Event-Delegation + `esc()`+`'`; A4 `noindex`. Vorbehalt R6 (Live-Stand) bleibt: Basis war die Projekt-/Upload-Datei. |
| ~~R18~~ | ~~fetch ohne Timeout / sw.js-Fallback~~ | **ERLEDIGT v158 (deployt):** `fetchMitTimeout` in 22 Netzwerkpfaden; `sw.js` kontrollierte Offline-Antwort (503/504). |
| R19 | **PII-Dateien im Projektspeicher** | **OFFEN – Nutzer-Aktion.** `IBAN_Import_*.json`, `Amboss_Mieter_*.json`, `Mieterwechsel_[G.]_*.json` + Backup nach erfolgtem Import aus dem Projektspeicher entfernen (Art. 5 Abs. 1 lit. c/e DSGVO). |
| R20 | **DSGVO-Doku: Verantwortlicher uneinheitlich** | **OFFEN – rechtlich/gesellschaftsrechtlich.** Drei divergierende Angaben zum Verantwortlichen: (a) neue Datenschutz-Doku → „Hausverwaltung Nadig / Pfau GbR, Zur Verlach 37, 40723 Hilden"; (b) Website-Impressum (`index_website.html` Z. ~446) → zwei natürliche Personen (Alexander Nadig/Anna Pfau; Roland Nadig für MG) mit Platzhalter `[Anschrift ergänzen]`; (c) App-Datenschutzhinweis + Objektstamm → „Venloer Str. 20, 40477 Düsseldorf". Vor Website-Launch **eine** rechtlich zutreffende Stelle festlegen (Art. 4 Nr. 7 DSGVO ↔ § 5 DDG). Voraussetzung für Konsistenzprüfung Impressum ↔ Datenschutzerklärung. Gehört zu ⚑ Abschnitt D. **Zusatz 05.07.:** Vertretungsberechtigte der GbR noch offen – nach Auskunft beide Gesellschafter gemeinsam vertretungsberechtigt, formal aber nicht aufgesetzt (nicht im Gesellschaftsvertrag verankert), Namen noch nicht benannt; relevant v. a. fürs Impressum (§ 5 DDG). Ferner: Datenschutzbeauftragter nicht bestellt (§ 38 BDSG angenommen, anwaltliche Bestätigung ausstehend). Details §0k. |
| ~~R21~~ | ~~Website-Widersprüche vs. Datenschutz-Lesefassung~~ | **ERLEDIGT im Code 02.07.2026 (Deploy durch Nutzer ausstehend), Website→Outputs `index.html`.** (a) SMS-Option entfernt: `p_kanal`-Dropdown nur noch E-Mail, Hinweistext angepasst, `kanal==='sms'`-Zweig in `codeAnfordern()` bereinigt. (b) Einwilligungs-Checkbox `k_dsgvo` durch Art.-13-Datenschutzhinweis mit Link auf `mDatenschutz` ersetzt; `sendeKontakt()` ohne Einwilligungs-Blockade/`datenschutz`-Feld. Rechtsgrundlage bleibt Art. 6 (1) b/f (DS-Lesefassung §4). `node --check` OK. |
| R22 | **Voll-Sync `syncDateibaum` – Request-Volumen** | **OFFEN (technische Schuld, v179-Befund §0ae).** Der Voll-Walk erzeugt >1000 Graph-Requests je Lauf (odBaumAnlegen-Vollprobe + Legacy-Standort-Zweige → 404-Flut, Throttling-/Abbruchrisiko). Für das Mieter-Archiv-⟳ durch `odSyncWeDateien` entschärft (v179), für Uploads durch `odPendingFlush` (v172). Saubere Lösung für den Remote-Ingest: **Graph-Delta-Query** (`/delta`) statt Blatt-für-Blatt-Listing; dabei odBaumAnlegen aus dem Sync-Pfad lösen (nur bei Strukturänderung). Eigene Sitzung (verwandt mit §12-P23d). |
| ~~R23~~ | ~~**Secrets in Sync/Backup**~~ | **ERLEDIGT + VERIFIZIERT v180 (§0af, KRITISCH).** `settings`-Store (`backendKey`, `saEncKey`) wurde ungefiltert in `syncToOneDrive()` UND `exportBackup()` mitgeführt, obwohl die UI „nur lokal gespeichert" versprach. Neue Konstante `SETTINGS_GEHEIM` filtert beide Pfade. **Verifiziert 06.07.:** Textsuche in OneDrive-JSON + frischem Backup = 0 Treffer. Function-Key-Rotation vom Nutzer bewusst abgelehnt. **Restpunkt:** alte Klartext-Versionen im OneDrive-Versionsverlauf → §12-P31. |
| ~~R24~~ | ~~**`odGraph()` ohne Timeout**~~ | **ERLEDIGT v180 (§0af).** Zentraler Graph-Wrapper (8 Aufrufer) nutzte rohes `fetch`; hängender Mobilfunk-Request blockierte Datei-Sync unbegrenzt. Jetzt `fetchMitTimeout` (30 s), analog zu allen anderen Netzwerkpfaden seit v158. |
| ~~R25~~ | ~~**Projekt-Kopie `leerstand.js` veraltet (Prä-v158)**~~ | **ERLEDIGT 06.07. (§0af).** Nutzer stellte Live-Stand bereit (verifiziert: `verwaisteBlobsLoeschen` ✓, B3 ✓, v152-Härtung ✓); darauf **M2** (Kennung-Whitelist `^[A-Za-z0-9_-]{1,64}$` in POST+DELETE) ergänzt, **deployt** und am Gerät bestätigt (Bestands-Kennung passiert, Fotos erhalten). Projekt-Kopie jetzt = Live-Stand + M2. **Lehre bleibt (Deployment-Invariante §7):** Projektlokale Backend-Dateien vor jedem Deploy gegen den Live-Stand prüfen. |
| R26 | **Leere `catch`-Blöcke (Frontend)** | **TEIL 1 ERLEDIGT v244 (18.07.2026):** alle 22 kritischen Blöcke (Netzwerk-/Schreib-/Löschpfade) mit `console.warn` versehen, 5 davon zusätzlich mit ehrlichem Toast; kritischer Restbestand automatisiert nachgemessen = 0. **Rest offen (bewusst):** ~148 stumme Idempotenz-Fänger. Ursprünglicher Befund: **OFFEN (v180-Befund M3, §0af).** v179 (§0ae) bewies bereits, dass `catch(_){}` echte Fehler unsichtbar verschluckt. Viele Fälle sind legitime Idempotenz-Fänger, aber Netzwerk-/Storage-Pfade sollten mindestens `console.warn` enthalten. Eigene Aufräum-Session, kein Blind-Patch (Einzelfallprüfung nötig). |
| ~~R27~~ | ~~**`innerHTML` ohne `esc()` bei Personennamen**~~ | **ERLEDIGT v243 (18.07.2026, §Schnellüberblick).** 19 Stellen abgesichert (Wohnungswechsel-Hinweis via direktem `innerHTML`, Login-/Zuweisen-Auswahllisten, Attribut- und `onclick`-Kontexte mit `escAttr`, Listen/Detail, Druckstücke NKA/Briefkopf/Protokoll). Funktions-Diff 0/0, 13/13 Escaping-Tests. Ursprünglicher Befund: **OFFEN (v180-Befund M4, §0af).** ~15 Stellen (`u.name`, `cur.mieter`, `cur.etage`, `cur.flaeche`, u. a. Z. ~657/18601/18802/19168) interpolieren personenbezogene Felder ungeschützt in `innerHTML`. Nur durch angemeldete Rollen befüllbar (kein akutes externes Risiko), aber ohne CSP-Rückhalt (R11). Mit dem C1-CSP-Refactor bündeln. |

---

## §0m. v161 – Sofort-Fixes: Einstellungen-Tabs + OneDrive-Sync-Timeout (03.07.2026)

**Anlass:** Nutzer meldete, ein auf dem Tablet neu angelegtes Einzugsprotokoll (Mendolia, Vincenza · WE 30 ·
Inrather Str. 185, Krefeld) erscheine auf dem Handy nicht. Screenshot-Diagnose zeigte zwei unabhängige Probleme.

**Problem 1 – Sync zieht auf dem Handy nicht.** Tablet-Dashboard 25 Mängel/8 Aufgaben, Handy 24/7 → Geräte auf
unterschiedlichem Stand trotz gleichem MS-Konto und „✓ Synchronisiert“ auf dem Tablet. Handy meldete beim Sync
„20 MB“. Ursache: `immo_daten.json` enthält eingebettete Protokollfotos (Base64) und ist auf ~20 MB gewachsen.
Der zentrale Helfer `fetchMitTimeout(url,opts,ms=15000)` (Zeile 6492) bricht **jeden** Request nach 15 s ab; bei
20 MB über Mobilfunk läuft sowohl der Download (`syncFromOneDrive`, 24785) als auch der Upload-Merge-Vorablauf
(24723) und der Upload-PUT (24753) in den Abbruch → `catch` → `setSyncStatus('offline')`. Tablet (WLAN) schaffte
es, Handy (Mobilfunk) nicht. **Fix:** Konstante `OD_SYNC_TIMEOUT=90000` direkt nach `OD_FILE_URL` (24518),
an den drei Sync-`fetchMitTimeout`-Aufrufen als 3. Argument übergeben. Generischer 15-s-Default für alle übrigen
~22 Netzwerk-fetches unverändert. **Reiner Symptomfix**; die Fotos gehören dauerhaft nicht in die JSON (§12-P23).

**Problem 2 – Einstellungen-Tab „Zahlungen“ unerreichbar (Handy).** `.settings-tabs` (Zeile 122) war
`display:flex` ohne `flex-wrap` und ohne horizontales Scrollen; `.st-tab` mit `flex:1`. Bei 6 Tabs (Allgemein,
Objekte, Daten, Druckcenter, System, Zahlungen) auf schmalem Display wurde die Leiste zusammengequetscht, der
letzte Tab war nicht antippbar. **Fix:** `.settings-tabs` → `flex-wrap:wrap`; `.st-tab` → `flex:1 1 92px;min-width:92px`,
damit umgebrochene Tabs gleichmäßig und lesbar bleiben. Entspricht der vom Nutzer bevorzugten „Umbruch“-Variante;
alle Tabs vollständig erreichbar, kein verstecktes Scroll-Verhalten.

**Validierung:** `node --check` OK; Funktions-Diff v160→v161 = 1156 (0 verloren/neu); Patch-Verifikation
(flex-wrap 1×, min-width 1×, `OD_SYNC_TIMEOUT` definiert 1× + 3× verwendet, CACHE `nadigpfau-v161`).

---

## §0n. v162 – §12-P23 Schritt 23c: Kategorie-Unterordner im OneDrive-Dateibaum (03.07.2026)

**Anlass / Kontext:** Erster Bauschritt des Großprojekts Datei-/Dokumentenverwaltung (§12 P23). Vor der
Umsetzung Ist-Stand-Abgleich der P23-Notiz gegen den realen Code: die App besitzt bereits einen
**funktionierenden bidirektionalen OneDrive-Datei-Sync** (siehe Schnellüberblick). Damit ist
Grundsatzfrage (i) „Speicherort" faktisch entschieden – **OneDrive als alleinige interne Datei-Quelle**
(Blob nur für öffentliche Website-Leerstandsfotos). Vom Nutzer am 03.07. bestätigt, ebenso der Wunsch nach
**Kategorie-Unterordnern**.

**Umgesetzte Änderungen (alle in der Dateibaum-Sektion, keine anderen Module berührt):**
1. **Konstanten** nach `OD_GRAPH`: `OD_KATEGORIEN_WE = [Fotos, Protokolle, Mietvertrag, Briefe,
   Mietbescheinigungen, Rechnungen, Sonstiges]`, `OD_KATEGORIEN_ALLG = [Versicherungen, Energieausweis,
   Plaene, Sonstiges]`, `OD_KAT_ICON`-Map, Helper `odKategorienFuer(knoten)`.
2. **`odBaumAnlegen`:** legt unter `Allgemein` die ALLG-Kategorien und unter jedem `WE n` die
   WE-Kategorien idempotent an (`odEnsureFolder`, `conflictBehavior:replace` → bestehende Ordner bleiben).
3. **`syncDateibaum`:** je Knoten wird nun über eine Blattliste iteriert = Knoten-**Wurzel** (Rückwärts-
   kompatibilität für evtl. bereits direkt abgelegte Dateien) **plus** alle Kategorie-Unterordner. Neue
   Records tragen additiv `unterkategorie` (leer = Wurzel). Konflikt-/Upload-/eTag-Logik unverändert.
4. **UI-Browser `odBrowserOeffnen(gruppe, knoten, kategorie)`** um eine Ebene erweitert:
   Ebene 1 Standort → Ebene 2 Knoten → **Ebene 3 Kategorie** (Buttons je Kategorie mit Dateizähler-Badge;
   „Ohne Kategorie" nur, wenn Wurzel-Dateien existieren) → **Ebene 4 Dateiliste**. Upload wird nur in
   echten Kategorien angeboten, nicht in die Wurzel (verhindert neue kategorielose Ablagen).
5. **`odDateiHochladen(gruppe, knoten, kategorie, file)`** – Zielpfad = Knotenpfad + Kategorie;
   `unterkategorie` im Record. `_odBrowserState`/`odBrowserUpload` führen `kategorie` mit.

**Bewusst NICHT in v162 (Abgrenzung):** keine Auslagerung der Bestands-Base64-Fotos (= 23a, der eigentliche
Kern-Hebel gegen die 20-MB-JSON), keine Datei→Mehrfachzuordnung (23e), keine Backend-Anhänge (23g). 23c
liefert nur die **Zielstruktur**, in die 23a später schreibt.

**Rückwärtskompatibilität / Datensicherheit:** additives Feld `unterkategorie` (kein Index, kein neuer
Store, kein DB_VER-Bump). Bereits vorhandene `od_dateien`-Records ohne Kategorie bleiben über die
Wurzel-Iteration erhalten und in der UI unter „Ohne Kategorie" erreichbar – **kein Datenverlust**.

**Validierung:** `node --check` der Inline-Scripts OK; Funktions-Diff v161→v162 = 1156→1157 (+1 neu
`odKategorienFuer`, 0 verloren); 14 Patch-Ersetzungen je mit `assert count==1`; Klammerbilanz der
`syncDateibaum`-Blattschleife visuell + via `node --check` bestätigt. `sw.js`-CACHE `nadigpfau-v162`.

**Verifikation nach Deploy (Nutzer, am Gerät):** Datei-Browser öffnen → Standort → WE → es erscheinen die
7 WE-Kategorien; unter „Allgemein" die 4 Objektdokument-Kategorien. Auf OneDrive prüfen, dass die
Unterordner unter `NadigPfau/Objekte/<Standort>/…` angelegt wurden. Eine Testdatei am PC in z. B.
`…/WE 3/Mietvertrag/` ablegen → in der App „Synchronisieren" → Datei erscheint in Kategorie „Mietvertrag".

---

## §0o. v163 – §12-P23 Schritt 23a FUNDAMENT: dual-format Foto-Auslagerung (04.07.2026)

**Anlass:** Kernursache der 20-MB-Sync-JSON = Fotos als Base64 inline. Umsetzung nach `Konzept_23a_Fotoauslagerung.md`.
**Architektur-Entscheidung Nutzer 04.07.:** **Variante A, feldgesteuert** (explizite Referenz-Objekte statt
transparenter Sync-Schicht; zentrale Konfiguration `FOTO_FELDER`).

**Warum nur Fundament (Abgrenzung):** Analyse zeigte `openFoto`/`compressFoto` stark verzweigt – 10
Base64-Schreibstellen (`protokolle.fotos` Haupttreiber, `maengel`, `aufgaben`, `objekt_stamm`, `dokumente`,
`reparaturen`, `rechnungen`, `ventilpruefung`) und gemischte Anzeige-Signaturen. Ein Vollumbau in einem
Schritt würde „bestehende Funktionen nicht verschlechtern" verletzen. Daher v163 = **rein additive
Bausteine, keine Verdrahtung** (kein Aufrufer nutzt sie bereits → kein Regressionsrisiko), Verdrahtung
danach store-für-store mit Gerätetest.

**Neue Bausteine (alle additiv, direkt nach `compressFoto` platziert):**
1. **`FOTO_FELDER`** – zentrale Tabelle: je Store die Foto-Felder + Ziel-`kategorie` + Knoten-Regel
   (`we` = WE&nbsp;<weNr>, `allg` = Allgemein, `auto` = mieterId?WE:Allgemein). Einzige Quelle für
   Verdrahtung **und** Backfill (vermeidet Drift; entspricht Konzept §7-Empfehlung „A feldgesteuert").
2. **`istFotoRef(x)`** – unterscheidet Referenz-Objekt `{ref:true,odId,…}` von Alt-dataURL-String.
3. **`dataUrlZuFile(dataUrl,name)`** – Base64→`File` für den Upload.
4. **`fotoThumb(dataUrl,px=96,q=0.5)`** – kleines Inline-Thumbnail (wenige KB) für Offline-Vorschau.
5. **`fotoAuslagern(quelle,ziel)`** – dataURL/File → OneDrive via `odDateiHochladen` → Referenz
   `{ref,odId,name,mime,thumb}`. **Fehler/kein Ziel → `null`**; Aufrufer behält dann die dataURL inline
   (Datenverlust-Prävention). `ziel = {gruppe,knoten,kategorie,name?}`.
6. **`odDownloadUrl(recId)`** – liefert kurzlebigen Graph-Download-Link (oder `null`).
7. **`fotoQuelle(x)`** (async, Vollbild) / **`fotoThumbQuelle(x)`** (sync, Listen) – dual-format-Anzeige:
   Alt-String direkt, Referenz → Graph-Link bzw. Thumbnail.

**Geänderte Bestandsfunktionen (verhaltensgleich/additiv):**
- `odDateiHochladen` → ergänzt `return rec;` (Rückgabe war vorher `undefined`; kein Aufrufer betroffen).
- `odDateiOeffnen` → verhaltensgleich auf `odDownloadUrl` refaktoriert (DRY, kein Duplikat).
- `openFoto` → additiver Zweig `caption==='odref'` (bislang ungenutzter Wert) lädt Referenz-Foto per
  `odDownloadUrl`.

**Validierung:** `node --check` OK; Funktions-Diff v162→v163 = 1157→**1164** (+7 neu, 0 verloren); 5
Patch-Ersetzungen je `assert count==1`; keine Store-/DB_VER-Änderung; `sw.js`-CACHE `nadigpfau-v163`.

**Nächste Schritte (v164+):** Verdrahtung store-für-store – Pilot mit dem am besten isolierten Pfad
(`objekt_stamm`/Wohnungsbilder **oder** `protokolle`), Schreibpfad `compressFoto`→`fotoAuslagern`,
Anzeige über `fotoQuelle`/`fotoThumbQuelle`, `openFoto(recId,'odref')`. Dazu Helper `fotoZielFuer(store,rec)`
(objektId→gruppe/knoten via `odStandorte`). Danach Backfill der Bestands-Base64 (idempotent,
wiederaufsetzbar). **DSGVO (Grundsatzfrage iv) vor Verdrahtungs-Live klären.**

---

## §0p. v164 – §12-P23 Schritt 23a: erste Verdrahtung (Pilot ventilpruefung) (04.07.2026)

**Ziel:** Das dual-format-Fundament (v163) erstmals an einem realen Foto-Pfad verdrahten – als risikoärmster
Integrationstest der gesamten OneDrive-Kette (v162-Kategorien + v163-Fundament + OneDrive-Auth).

**Warum `ventilpruefung` (Pilot-Revision):** Die zuvor empfohlene `objekt_stamm` wurde bei der Analyse
verworfen – ihre Fotos/Grundrisse fließen über `modalAushangErstellen`/`aushangErzeugen` in die **Aushang-PDF**
und den **Website-Leerstand** (`homepage_leerstand`). Solche Fotos brauchen die dataURL **synchron** zum
Erzeugungszeitpunkt (PDF-Einbettung) und für die Website **Azure Blob** (öffentlich; OneDrive ist nicht
öffentlich abrufbar). `ventilpruefung.foto` dagegen wird ausschließlich am Bildschirm gezeigt (`openFoto`),
nicht in PDF/Website/Merge – maximal isoliert.

**Umgesetzt:**
1. **`fotoZielFuer(objektId,weNr,store)`** – leitet `{gruppe,knoten,kategorie}` aus `FOTO_FELDER` +
   `odStandorte` ab (Standort über `objektIds.includes`). `knoten`-Regel: `we`/`auto`/sonst `Allgemein`.
2. **`fotoImgTag(wert,caption,style)`** – erzeugt ein dual-format `<img>` (Alt-dataURL **oder** Referenz):
   Vorschau aus `fotoThumbQuelle` (sync), Klick öffnet Vollbild (`openFoto(odId,'odref')` bzw. dataURL).
   Wiederverwendbar für alle weiteren Stores (DRY).
3. **`FOTO_FELDER`** um Flag **`pdfWebsite`** erweitert (protokolle/objekt_stamm = true) – markiert Stores,
   die vor PDF/Website-Ausgabe rehydriert bzw. über Blob veröffentlicht werden müssen.
4. **Ventil-Speicherpfad** (`ventilPruefungSpeichern`): `_ventilFoto` (neue dataURL) → `fotoAuslagern` →
   Referenz `_vFoto`; wird in `pruef.foto` und `mangel.fotos` geschrieben. **Defensiver Fallback:** bei
   `null` (kein OneDrive/Fehler/kein Standort) bleibt `_vFoto` = dataURL → Verhalten wie bisher.
5. **Ventil-Anzeige** (Historie): `<img …>`-Zeile durch `fotoImgTag(p.foto,…)` ersetzt.

**Nicht verändert:** Modal-Vorschau von `_ventilFoto` (dataURL bis zum Speichern), alle anderen `maengel`-
Schreibstellen (nur die Ventil-Erzeugung nutzt `_vFoto`).

**Validierung:** `node --check` OK; Funktions-Diff v163→v164 = 1164→**1166** (+`fotoZielFuer`,`fotoImgTag`;
0 verloren); 7 Patch-Ersetzungen je `assert count==1`; keine Store-/DB_VER-Änderung; `sw.js`-CACHE `nadigpfau-v164`.

**⚠️ Gerätetest (Freigabe-Gate, durch Nutzer):** OneDrive anmelden → Ventilprüfung mit Foto speichern →
Datei erscheint in `…/<Standort>/Allgemein/Sonstiges` (OneDrive prüfen) → Ventil-Historie zeigt Vorschau,
Klick öffnet Vollbild → auf Zweitgerät syncen. Erst nach Erfolg die nächsten Stores verdrahten.

**Nächste Verdrahtung (revidierte Reihenfolge, isoliert zuerst):** `reparaturen.rechnung` → `dokumente.data`
→ `maengel/aufgaben.fotos`; **danach** pdfWebsite-Stores `protokolle` (PDF-Rehydrierung via `fotoQuelle` vor
Einbettung) und `objekt_stamm` (Website-Blob-Weg). Anschließend Backfill der Bestands-Base64.

---

## §0q. v165 – §12-P23 Schritt 23a Stufe 1: Protokollfoto-Lesepfad zentralisiert (04.07.2026)

**Auftrag (Nutzer 04.07.):** v164 getestet & OK → mit Protokollfotos weiterarbeiten. Entscheidung: gestaffelt
über den `fotos`-Store, Start mit **Stufe 1** (risikolos, additiv, verhaltensgleich).

**Analyse-Kernbefund (neu, wichtig – korrigiert die generische FOTO_FELDER-Annahme):**
- Protokollfotos liegen **doppelt**: (1) *inline* als dataURL im Protokoll-Record – verschachtelt in
  `PD.raeume[*].photos`, `PD.raeume[*].condPhotos[cond]`, `PD.zaehler[*].foto` – **und** (2) zusätzlich im
  separaten Store `fotos` (`{id, protId, slot, data}`, `protId`-Index). Der `fotos`-Store steht in **allen
  drei** Sync-Listen (onupgradeneeded Z.1014, `alleStores` Z.24467, `mergeStores` Z.24854) → beide Kopien
  landen in `immo_daten.json` = doppelte Base64-Last, der eigentliche Protokoll-Treiber der 20-MB-Datei.
- Es gibt **kein** flaches `protokolle.fotos`-Feld. `FOTO_FELDER.protokolle = { felder:['fotos'] }` ist damit
  inhaltlich falsch; der generische Feld-Loop (wie beim Ventil-Pilot) würde bei Protokollen **nichts** treffen.
- Der `fotos`-Store ist der **natürliche Anker** (Record trägt bereits `photoIds`/`condPhotoIds`/`fotoId`).
- Protokoll-PDF: Druck läuft über `printProt(id)` → `printProtHTML(p)` (bereits **async**, je Foto
  `await compressImg(...)`) → idealer Rehydrierungspunkt (synchrone dataURL zum Druckzeitpunkt nötig).

**Umbau v165 (nur Lesepfad, additiv):**
- **2 neue Resolver** (nach `fotoImgTag`): `async protoFotoWerte(inlineArr, idArr)` – gibt inline-Array
  zurück, falls gefüllt (Stufe 1 = wie bisher); sonst je `*Id` den `fotos`-Store-Record → `rec.ref`
  (ausgelagert) **oder** `rec.data` (Alt). `async protoZaehlerFotoWert(z)` – `z.foto` bevorzugt, sonst über
  `z.fotoId`. Beide liefern „Foto-Werte" (dataURL-String **oder** Referenz), dual-format.
- **`printProtHTML` umgestellt:** die drei Foto-Schleifen (`condPhotos`, `photos`, `zaehler.foto`) beziehen
  ihre Werte jetzt über die Resolver und betten je Wert via `await fotoQuelle(wert)` → `compressImg` ein.
  Da `fotoQuelle(string)===string`, ist die Ausgabe bei vorhandener inline-dataURL **bit-genau wie bisher**.
- **Bildschirm-Anzeige** (viewProtokoll/renderProtRaeume/Zähler-Editor) bewusst **unangetastet** (synchron,
  unkritisch) – wird in Stufe 2 zusammen mit dem Schreibpfad auf dual-format gehoben.

**Warum so:** Nach Stufe 1 muss Stufe 2 (inline-Duplikate entfernen + neue Fotos nach OneDrive auslagern) nur
noch den Resolver + den Schreibpfad ändern, nicht die Druck-/Anzeige-Templates → deutlich geringeres
Regressionsrisiko beim eigentlichen JSON-Schrumpfen.

**Merkposten für Stufe 2/3:**
- `compressImg` lädt die Quelle in ein `<img>`+Canvas. Bei einer OneDrive-**Download-URL** (Referenz-Fall)
  droht Canvas-CORS („tainted canvas"). → In Stufe 2 muss `fotoQuelle` beim Referenz-Fall für den Druck eine
  **dataURL** liefern (Fetch→Blob→dataURL), nicht nur eine Graph-URL. Vor dem Entfernen der inline-Kopien testen.
- **DSGVO-Grundsatzfrage (iv)** bleibt *Live*-Gate: Protokollfotos zeigen Wohnungszustände (mieterbezogen) →
  Microsoft als Auftragsverarbeiter im AVV-Verzeichnis führen, Hausmeister-Rollenzugriff auf Dateiebene prüfen.
  Fürs Bauen/Testen kein Blocker.

**Tests:** `node --check` (App-Inline + sw.js) OK; Funktions-Diff v164→v165 = 1166→1168 (+`protoFotoWerte`,
+`protoZaehlerFotoWert`, 0 verloren, keine Dubletten); 8/8 Resolver-Logiktests grün (Stufe-1-Invariante
„inline bevorzugt" + Fallback data/ref + Zähler-Fälle). `APP_VERSION='2026-07-04-v165'`, CACHE `nadigpfau-v165`.

**Nächster Schritt – Stufe 2 (v166):** Schreibpfad der Protokoll-Foto-Aufnahme (`fotos`-Store) nach OneDrive
auslagern (`fotoAuslagern`, defensiver Fallback `data`), inline-Kopien im Protokoll-Record entfallen; Anzeige
auf dual-format heben; `fotoQuelle` für Druck auf dataURL-Rehydrierung erweitern (CORS-Merkposten). Danach
**Stufe 3 (v167):** idempotenter Backfill der Bestands-inline-dataURLs → `fotos`/OneDrive, dann inline droppen.

---

## §0r. v166 – §12-P23 Schritt 23a Stufe 2a: Druck-Rehydrierung (04.07.2026)

**Zweck:** Notwendiger, risikofreier Enabler **vor** Stufe 2b. Damit Stufe 2b (neue Protokollfotos nach
OneDrive auslagern + inline-Kopien aus dem Record entfernen) den Protokoll-PDF nicht bricht, muss der Druck
eine ausgelagerte Referenz zuverlässig zu einer **einbettbaren dataURL** auflösen können.

**Problem (v165-Merkposten):** `compressImg(src)` zeichnet `src` in ein Canvas und ruft `toDataURL()`. Eine
cross-origin-Quelle (OneDrive-Download-Link auf `*.sharepoint.com`/`*.up.1drv.com`) „taintet" das Canvas →
`toDataURL()` wirft `SecurityError`. `fotoQuelle` liefert bei Referenzen genau so eine URL – für die
Bildschirmanzeige ok, für den Druck **nicht**.

**Umbau v166 (additiv):**
- **`async fotoDruckQuelle(x)`**: Alt-String → unverändert; Referenz `{ref,odId,thumb}` → `odDownloadUrl(odId)`
  holen, per `fetch` → `blob()` → `blobZuDataUrl` in eine dataURL wandeln. Fehler/kein Link/kein `resp.ok`
  → Fallback `x.thumb` bzw. `''` (Aufrufer überspringt leere `src`).
- **`blobZuDataUrl(blob)`** (Promise): zentraler Helfer, da bisher nur verstreute inline-`FileReader`
  existierten. Ersetzt keine Bestandsstelle (rein additiv).
- **`printProtHTML`**: die drei Foto-Schleifen (`condPhotos`/`photos`/`zaehler.foto`) nutzen jetzt
  `await fotoDruckQuelle(...)` statt `await fotoQuelle(...)`. Bei reinen Strings (heutiger Bestand) **identisch**.

**CSP:** `connect-src` deckt die Download-Domains bereits ab (`*.sharepoint.com`, `*.up.1drv.com`,
`*.microsoftpersonalcontent.com`) – kein CSP-Eingriff nötig.

**Tests:** `node --check` (App-Inline + sw.js) OK; Funktions-Diff v165→v166 = 1168→1170 (+`fotoDruckQuelle`,
+`blobZuDataUrl`, 0 verloren, keine Dubletten); 7/7 Logiktests grün: String-Durchreichung (verhaltensgleich),
Referenz→dataURL-Rehydrierung, und 4 Fallback-Fälle (fetch wirft / `!ok` / kein Link / kein thumb).
`APP_VERSION='2026-07-04-v166'`, CACHE `nadigpfau-v166`.

**Live-Wirkung heute:** keine – Protokolle enthalten noch keine Referenzen, `fotoDruckQuelle` reicht Strings
1:1 durch. Der Referenz-Pfad wird erst mit Stufe 2b scharf und ist dann am Gerät zu testen (echter
OneDrive-`fetch`).

**Nächster Schritt – Stufe 2b (v167, RISIKO + Gerätetest-Gate):** Foto-Aufnahme-Handler
(`condPhotos`/`photos`/`zaehler.foto`) schreiben das Foto in den `fotos`-Store und lagern dessen Inhalt per
`fotoAuslagern` nach OneDrive aus (Record trägt `ref` statt `data`); die **inline-dataURL im Protokoll-Record
entfällt** (nur noch `*Ids`). Defensiver Fallback: schlägt der Upload fehl → inline bleibt (kein Datenverlust).
Anzeige (viewProtokoll/renderProtRaeume/Zähler) auf dual-format heben. **Gerätetest:** Protokollfoto aufnehmen
→ Datei in `…/<Standort>/WE n/Protokolle` auf OneDrive → Protokoll-PDF zeigt Foto (Rehydrierung greift) →
Sync auf Zweitgerät. Danach **Stufe 3 (v168):** idempotenter Backfill der Bestands-inline-dataURLs, dann droppen.

---

## §0s. v167 – §12-P23 Schritt 23a: zweite Verdrahtung `reparaturen.rechnung` (04.07.2026)

**Anlass/Entscheidung.** Nutzer konnte v164–166 noch nicht am Gerät testen, wollte aber Fortschritt. Statt in den
datenverlustkritischen Schritt (`protokolle` Stufe 2b = inline-Kopien entfernen) zu gehen, wurde der **nächste
isolierte, testunabhängige Schreibpfad** vorgezogen: `reparaturen.rechnung`. Begründung: Dieser Store folgt exakt
dem bereits bestätigten **v164-Ventil-Muster** (Auslagern beim Speichern mit defensivem Fallback) und entfernt
**keine** Bestandsdaten → **kein Test-Gate erforderlich**.

**Änderungen (3 Stellen, rein additiv, keine neue Funktion):**
1. **Schreibpfad** `saveReparatur` → `saveEntry(rechnData)`: Ist `rechnData` eine dataURL, wird sie über
   `fotoZielFuer(objektId, weNr, 'reparaturen')` + `fotoAuslagern(...)` nach OneDrive ausgelagert (Kategorie
   „Rechnungen“, Knoten `WE <n>`). Erfolg → Referenz `{ref,odId,…}` in `reparaturen.rechnung`; sonst dataURL
   inline (`if(ref) rechnAusgelagert = ref`). Dateiname-Endung aus MIME abgeleitet: `application/pdf`→`pdf`,
   `png`→`png`, sonst `jpg` (Belege können PDF statt Bild sein – Verbesserung ggü. v164, das hart `.jpg` nahm).
2. **Listen-Anzeige** `reparaturHTML` (Button): `onclick` dual-format – Referenz → `openFoto(odId,'odref')`,
   String → alter Aufruf `openFoto(rechnung,'Rechnung')` (unverändert).
3. **Detail-Anzeige** (`<img>`-Karte): dual-format – Referenz → `<img src="${fotoThumbQuelle(ref)}" … onclick=
   "openFoto(odId,'odref')">`, String-Zweig **bit-identisch** zum Original inkl. `onerror="this.style.display=
   'none'"`. Vorschau einer ausgelagerten Rechnung nutzt das Inline-Thumbnail; Klick lädt die scharfe Datei
   (openFoto-odref). Bestandsrechnungen (Alt-dataURL) zeigen unverändert volle Auflösung.

**Randfall PDF.** `fotoThumb()` scheitert bei PDF (kein Image) → Referenz ohne `thumb`; Vorschau leer – aber schon
im Alt-Verhalten rendert ein `<img src="pdf-dataURL">` nicht (→ `onerror` versteckt). Also **keine Regression**;
Öffnen weiterhin über `openFoto`.

**Validierung.** `node --check` OK. Funktions-Diff v166→v167 = **0 verloren/0 neu** (nur Verdrahtung). 13/13
isolierte Logiktests grün (`istFotoRef`, MIME→Endung jpg/png/pdf/Fallback, `fotoThumbQuelle` String vs. Referenz,
dual-format-`onclick` Liste). Keine Store-/DB-Änderung, DB_VER 31.

**Test am Gerät (unkritisch, empfohlen bei Gelegenheit).** OneDrive angemeldet → Reparatur mit externem
Rechnungsbeleg (Bild) speichern → Datei erscheint unter `…/<Standort>/WE <n>/Rechnungen` → `immo_daten.json`
wächst nicht um die Belegröße (Referenz statt Base64) → Liste + Detail zeigen den Beleg, Klick öffnet Vollbild →
Sync auf Zweitgerät. Bei OneDrive-Fehler bleibt der Beleg inline (Fallback).

**Nächster Schritt.** Reihenfolge weiter isoliert: `dokumente.data` → `maengel/aufgaben.fotos`. Der
datenverlustkritische `protokolle`-Schritt (Stufe 2b, §0r) **erst nach** erfolgreichem v164-Ventil-Gerätetest
**und** einer verifizierten `reparaturen`-Auslagerung. Danach `objekt_stamm` (Website-Blob) + Backfill.

---

## §0t. v168 – §12-P23 Schritt 23a: dritte Verdrahtung `maengel.fotos` + `aufgaben.fotos` (04.07.2026)

**Entscheidung.** Nutzer wählte (nach Analyse) `maengel.fotos` als nächsten sauberen Foto-Store statt `dokumente`
(heterogen: HTML-Archiv/Aushang/Upload/Plan → eigener Typ-Filter nötig, zurückgestellt). `maengel`/`aufgaben` sind
homogene Arrays echter Fotos und teilen sich **einen** Editor.

**Zentraler Befund.** Der Foto-Editor `saveEditMangel(id, store)` bedient **beide** Stores (Parameter `store`), damit
deckt ein Eingriff `maengel` **und** `aufgaben` ab. `m.fotos` fließt **nicht** in Canvas/PDF (die `compressImg`-Aufrufe
liegen ausschließlich im Protokoll-PDF `printProtHTML`, dort bereits über `fotoDruckQuelle`/v166 abgesichert) → für
`maengel`/`aufgaben` genügt **dual-format** (keine Druck-Rehydrierung), `FOTO_FELDER…pdfWebsite:false` ist korrekt.

**Änderungen (4 Stellen, rein additiv, keine neue Funktion):**
1. **Schreibpfad** `saveEditMangel` (ersetzt `m.fotos = window._emFotos || …`): iteriert die gesammelten Fotos;
   **neu aufgenommene** dataURLs (`compressFoto` aus Kamera/Galerie) werden via `fotoZielFuer(m.objektId, m.weNr, store)`
   + `fotoAuslagern` nach OneDrive ausgelagert (Erfolg → Referenz, sonst dataURL: `ausgelagert.push(ref || f)`).
   **Vorhandene Referenzen und Alt-Strings bleiben unverändert.** Kein Ziel/Fehler ⇒ alles inline (kein Datenverlust).
2. **Detail-Foto-Grid** (Mangel-Detailansicht): dual-format – Referenz → `openFoto(odId,'odref')` + `<img src=
   fotoThumbQuelle>`; String-Zweig **bit-identisch** zum Original.
3. **Bearbeiten-Grid** `renderEmFotoGrid`: `<img src>` dual-format (`istFotoRef(f)?fotoThumbQuelle(f):f`); Löschen per
   Index (`delEmFoto`) unverändert.
4. **`mangelTeilen`** (WhatsApp/Share): vor dem `fetch` `fotoQuelle(f)` – String → direkt, Referenz → OneDrive-URL.
   Kein Canvas-Tainting, da `fetch`→Blob→`File`→`navigator.share`.

**Latente v164-Lücke geschlossen.** v164 legt beim Ventil-**Defekt** einen Mangel mit **Referenz**-Foto in
`maengel.fotos` an. Die bisherige String-only-Anzeige (`openFoto('${f}')`, `<img src="${f}">`) hätte das als
`[object Object]` gerendert. Beim v164-Gerätetest fiel das nicht auf, weil nur der **funktionierende** Ventil-Fall
(kein Mangel) geprüft wurde. Jetzt an allen drei Stellen dual-format → behoben.

**Validierung.** `node --check` OK. Funktions-Diff v167→v168 = **0 verloren/0 neu**. 11/11 Logiktests grün
(Auslagerungs-Schleife inkl. Fallback & unveränderter Referenzen/Alt-Strings, dual-format-`onclick`/`src`,
`fotoQuelle`-Auflösung im Teilen-Pfad). Keine Store-/DB-Änderung, DB_VER 31.

**Test am Gerät (unkritisch, bei Gelegenheit).** OneDrive angemeldet → Mangel/Aufgabe bearbeiten → Foto aufnehmen →
Speichern → Datei erscheint unter `…/<Standort>/WE <n>/Protokolle` → Detailansicht + Bearbeiten-Grid zeigen das Foto,
Klick öffnet Vollbild, „Teilen" hängt es an → Sync auf Zweitgerät. Bei OneDrive-Fehler bleibt das Foto inline.

**Nicht ausgelagert (bewusst, Alt-Strings bleiben).** Weitere Schreibpfade in `maengel.fotos` (Protokoll→Mangel-
Übernahme `22357–22366`, Direktanlagen `5490/7078/21380`) erzeugen weiterhin Alt-dataURLs – von den nun dual-format-
festen Anzeigen korrekt dargestellt. Deren Auslagerung + Backfill der Bestands-Base64 folgt später (TODO).

**Stand Verdrahtung §12-P23.** ✅ `ventilpruefung` (v164, getestet) · ✅ `reparaturen.rechnung` (v167) ·
✅ `maengel.fotos`/`aufgaben.fotos` (v168). Offen: `dokumente.data` (Typ-Filter, mittleres Risiko) → dann die
pdfWebsite-Stores `protokolle` (Stufe 2b, Datenverlust-Gate, §0r) + `objekt_stamm` (Website-Blob) → Backfill.

---

## §0u. v169 – Code-Aufräumung Filter-/Such-Toolkit (04.07.2026)

**Vorgehen:** Statische Referenzzählung über die GANZE Datei (Python, Wortgrenzen; `onclick`/`data-action-click`/`__act`-Dispatch mitgezählt) → 35 Kandidaten mit genau 1 Vorkommen; danach Einzelabgleich gegen Roadmap/TODOs. **Entfernt** wurde nur der 15-teilige Filter-/Such-Parallelstrang (schrieb in nicht existente Container, `filterState` wurde von keiner Live-Seite gelesen – Live-Pfad ist `renderAufgaben`+`_aufFilter`+`taskHTML`/`mangelHTML`). **Nicht entfernt** (Begründung im Changelog): Rechtsbaustein, pausierte Features, TODO-Anker. Lehre bestätigt: „Tot laut Zählung“ ≠ „löschbar“ – erst Roadmap-Abgleich, dann Löschen.

## §0v. v170 – Freitextsuche Aufgaben/Mängel (04.07.2026)

Suchfeld (bestehende `.search-bar`/`.search-wrap`-Styles) unter der Filterleiste von `renderAufgaben`. `aufSuche(q)` → `_aufFilter.q`; `aufSucheAnwenden()` filtert per `display` auf den bereits gerenderten `.task-item` des aktiven Tabs (`#auf-todos`/`#auf-maengel`) – bewusst KEIN Re-Render, damit der Eingabefokus beim Tippen erhalten bleibt. Trefferlos-Hinweis wird dynamisch erzeugt/entfernt. Wiederanwendung am Ende von `renderAufgaben` und in `aufgabenTab`. QA: 10/10 jsdom-Tests (leer/Treffer/case/kein Treffer/Hinweis-Zyklus/Tab-Wechsel/undefined-State).

## §0w. v171 – Dashboard-Sortierung + Dokument-Teilen (04.07.2026)

(1) Dashboard „Letzte Protokolle“: Sortierung `datum`-zuerst (Fallback `erstellt`) – Archiv und Dashboard zeigen damit dieselbe Reihenfolge. (2) Teilen an der architektonisch einzigen Stelle, durch die ALLE Druckdokumente laufen (zentrale Druckvorschau `druckHTML`): `druckVorschauTeilen()` teilt das Vorschau-HTML als Datei (`navigator.canShare`-Prüfung, `AbortError` still), Fallback Download + Toast. **Bewusste Grenze:** geteilt wird HTML (selbst-enthaltend, da Fotos/Logos dataURLs sind), kein PDF – ein HTML→PDF-Renderer im Client widerspräche CSP/No-Lib-Architektur; für PDF bleibt Druck→„Als PDF speichern“ (etabliertes Kautionsquittungs-Muster).

## §0x. v172 – Ordner pro Gebäude + Foto-Upload-Robustheit (04.07.2026)

**Befunde (Nutzer + DevTools):** Ventil-Foto „kann nicht geladen werden“ + fehlt in OneDrive (Graph-GET 404); RT-Ordner nur ~20 WEs, Häuser vermischt. **Ursachen:** (a) `odDateiHochladen` speichert nur lokal (`pendingUpload`+`_blobB64`) und verlässt sich auf den nachgelagerten Vollwalk `syncDateibaum` – bricht der ab (21-MB-Hauptsync, Mobilfunk, App-Wechsel), bleibt die Datei dauerhaft pending, die Referenz zeigt ins Leere; `odDownloadUrl` kannte keinen lokalen Rückgriff. (b) WE-Ordner wurden standortweit gebildet → WE-Nummern verschiedener Häuser kollidieren; Leerstands-WEs fehlten (nur Mieter-abgeleitet).

**Umsetzung:** Pfadschema `NadigPfau/Objekte/<Standort>/<Gebäude>/<Allgemein|WE n>/<Kategorie>`; `odKnotenPfad(st,kn,gebaeude)` additiv, `odGebaeudeName(objektId)`; `odBaumAnlegen` legt je Objekt Gebäude→Allgemein/WEs→Kategorien an (WEs = Mieter ∪ `objekt_stamm.wohneinheiten`); `syncDateibaum` scannt Gebäude-Zweige (neu) PLUS Standort-Ebene (Legacy, lesend) – Alt-Dateien bleiben sichtbar, wandern nicht automatisch; Remote-Records +`gebaeude`. Browser: Ebene „Gebäude wählen“ (+ „Standort-Ebene (Alt-Dateien)“ mit Zähler, nur wenn vorhanden), Upload in `(alt)` gesperrt. `odPendingFlush()` (gezielter Upload, idempotent, Fehler je Datei) ersetzt den Vollwalk in `odDateiHochladen`; `odDownloadUrl` liefert bei pending `data:`-URL aus `_blobB64` und stößt Flush an → Selbstheilung bestehender pending-Fotos beim nächsten Öffnen **auf dem Aufnahme-Gerät** (nur dort liegt das Blob; `_blobB64` läuft nicht über den JSON-Sync, Feld liegt nur in IndexedDB des Geräts).

**QA:** `node --check` beide Blöcke OK; Diff v168→v172 = 1169→1160 (−14/+5, 0 ungewollt); Pfadtests 3/3 (Gebäude/Legacy/Sonderzeichen `/`→`_`). **Nach Deploy prüfen:** Ventil-Foto am Handy öffnen (Anzeige + Nach-Upload), Datei-Browser „Synchronisieren“ (legt Gebäude-Baum an), neues Mangel-Foto landet je Gebäude. **TODO:** Migration Alt-Dateien → Gebäude-Ordner; Graph-Call-Volumen beobachten; ggf. `odPendingFlush` zusätzlich beim App-Start anstoßen (bewusst noch nicht – erst Gerätetest).



## §0ad. v178 – B3/V7: Kappungsgrenze an Gemeinde gebunden (05.07.2026, 3. Sitzung)

**Anlass (Risiko R12, §11):** `kappungsgrenze()` und `mvObjektReguliert()` prüften hartcodierte GRUPPEN-Listen
(inkl. Letterhead-Gruppe `'pfau'`). Zwei reale Fehler im Bestand: (a) `verlach37` liegt in **Hilden** (57er-Liste!),
trug aber `gruppe:'mg'` → Kappung fälschlich 20 % statt 15 % (rechtsrelevant: überhöhtes Erhöhungsverlangen wäre
teilunwirksam); (b) `amboss10` (Düsseldorf, `gruppe:'pfau'`) fehlte in der `mvObjektReguliert`-Liste → MV-Generator
zeigte den §-15-Mietpreisbremse-Block nicht an, obwohl Düsseldorf reguliert ist.

**Rechtslage (verifiziert 05.07.2026, Quellen: mhkbd.nrw, land.nrw, kommunen.nrw, hausundgrundddf.de, haufe.de):**
- MietSchVO NRW seit 01.03.2025, **57 Kommunen** (statt 18). Portfolio: Düsseldorf ✓, Krefeld ✓, Monheim am
  Rhein ✓, Hilden ✓ auf der Liste; **Mönchengladbach ✗** (Regelfall 20 %).
- **Kappungsgrenze 15 %** (§ 558 Abs. 3 BGB): gilt bis **28.02.2030**.
- **Mietpreisbremse** (§ 556d BGB): eigener Zeitraum – ursprünglich bis 31.12.2025 befristet, vom Bund Juli 2025
  bis Ende 2029 verlängert; NRW hat § 3 Abs. 2 S. 1 MietSchVO auf **31.12.2029** nachgezogen.
- Hinweis für die Zukunft: Koalitionsvertrag Bund erwägt Absenkung der Kappungsgrenze auf 11 % – bei Gesetzes-
  änderung Konstanten prüfen. Unseriöse Sekundärquelle (mietergenie.de: „57 erst seit Nov. 2025, Essen/Bochum
  dabei") wurde gegen amtliche Quellen verworfen.

**Implementierung:**
- `MIETSCHVO_NRW_GEMEINDEN` – vollständige 57er-Liste (normalisiert, klein) → künftige Objekte in JEDER
  NRW-Kommune werden automatisch korrekt eingestuft.
- `MIETSCHVO_KAPPUNG_BIS = '2030-02-28'`, `MIETSCHVO_MPB_BIS = '2029-12-31'` (getrennte Laufzeiten!).
- `objektGemeinde(obj)`: Ortsname aus `obj.ort` („40723 Hilden" → „hilden"), PLZ-tolerant.
- `gemeindeInMietSchVO(obj)`: exakter Treffer ODER Listeneintrag als Wortpräfix („monheim am rhein" ⊃ „monheim");
  **Fallback** ohne `ort`-Feld: bisherige Gruppenliste (Bestandsschutz, konservativ).
- `kappungsgrenze(obj, stichtagISO)`: 15 % wenn Gemeinde gelistet UND Stichtag ≤ 28.02.2030, sonst 20 %.
- `mvObjektReguliert(objektId)`: Gemeinde-Prüfung + `heute ≤ MIETSCHVO_MPB_BIS` (steuert §-15-Block/Auskunft
  § 556g BGB im MV-Generator sowie den Staffelmiete-Kappungshinweis).
- Kommentarblock v59b aktualisiert (inkl. Verweis auf beide Bugfixes).

**QA:** 16/16 Logiktests (`test_v178.mjs`): beide Bugfix-Fälle, alle 5 Portfolio-Standorte, Laufzeitgrenzen
28.02.2030/01.03.2030, „Monheim am Rhein"-Präfix, Gruppen-Fallback mit/ohne Absenkung, ungelistete Gemeinde
(Essen). `node --check` beide Blöcke OK; Diff v177→v178 = **+2 (`objektGemeinde`, `gemeindeInMietSchVO`) / 0
verloren**. Keine Store-/DB-Änderung, **DB_VER 31**.

**Rechtlicher Hinweis:** Die Einstufung ersetzt keine Einzelfallprüfung; bei konkreten Mieterhöhungen bleibt die
ortsübliche Vergleichsmiete (§ 558a BGB, Begründungsmittel) maßgeblich – abschließende Bewertung im Streitfall
durch den Fachanwalt für Miet- und WEG-Recht.

## §0ae. v179 – OneDrive-Datei-Sync-Fixes nach v177-Gerätetest (06.07.2026, LIVE + bestätigt)

**Anlass:** PC-Gerätetest v177 (Kauven, Mindener Straße 23 und 25, WE 8) mit offenen DevTools. Zwei
Befunde des Nutzers, ein dritter aus der Code-Analyse:

1. **Remote→App defekt:** Manuell in OneDrive `…/WE 8/Mietvertrag/` abgelegter Mietvertrag erschien nach ⟳
   nicht in der App. Konsole: >1000 Fehler, massenhaft `graph.microsoft.com …$top=200` → 404. **Ursache:**
   `odArchivAktualisieren` rief den Voll-Sync `syncDateibaum(true)` in `try{…}catch(_){}` auf. Der Voll-Walk
   erzeugt pro Lauf weit über 1000 Graph-Requests: `odBaumAnlegen`-Probe über den GESAMTEN Baum + die
   Legacy-Standort-Zweige (Rückwärtskompatibilität; nicht existente Blätter = die 404-Flut). Abbrüche
   (z. B. Throttling) wurden lautlos verschluckt → WE-Liste blieb leer, obwohl die Datei korrekt lag.
2. **App→Remote falsche Kategorie:** Upload Typ `wgb` (Wohnungsgeberbescheinigung) landete in
   `WE 8/Sonstiges` statt `Mietbescheinigungen`. **Ursache:** `DOK_OD_KATEGORIE` (v177) kannte `wgb` und
   `mieterhoehung` nicht → Default `Sonstiges` aus `FOTO_FELDER.dokumente`.
3. **Latenter Datenverlust (Analysefund):** Upload-Zweig (b) in `syncDateibaum` prüfte das PUT-Ergebnis
   NICHT auf `__notfound`/`id` (odGraph liefert bei 404 `{__notfound:true}` statt zu werfen). Folge eines
   fehlgeschlagenen PUT: Record `pendingUpload:false` + `_blobB64:undefined` → Datei weder in OneDrive
   noch lokal rekonstruierbar. `odPendingFlush` (v172) hatte den Guard bereits.

**Fixes (3 chirurgische Patches + Version):**
- **P1:** `DOK_OD_KATEGORIE` += `wgb:'Mietbescheinigungen'`, `mieterhoehung:'Briefe'`.
- **P2:** Guard im Upload-Zweig (b): bei `!up || up.__notfound || !up.id` → `console.warn` + `continue`
  (Record bleibt wartend, Blob erhalten; identische Semantik wie `odPendingFlush`).
- **P3:** Neue Funktion `odSyncWeDateien(gruppe, weNr)` – gezielter Sync EINER Wohnung: Blattordner
  (Wurzel + `odKategorienFuer`) je Gebäude des Standorts, dessen WE-Union die WE enthält
  (`odGebaeudeListe`), plus Legacy-Knoten ohne Gebäude; Remote-Ingest identisch zur (a)-Logik des
  Voll-Syncs (inkl. `odItemId`-Heilung), danach `odPendingFlush()`. ~16 Requests statt >1000.
  `odArchivAktualisieren` nutzt sie; Fehler erscheinen als Toast (`OneDrive-Abgleich fehlgeschlagen: …`).

**QA:** Assert-Patches (jeder `old`-String exakt 1×), `node --check` beide Script-Blöcke OK,
Funktions-Diff v178→v179 = **+1 (`odSyncWeDateien`)/0 verloren** (1169→1170), DB_VER 31 unverändert.
`APP_VERSION='2026-07-06-v179'`, `sw.js`-CACHE `nadigpfau-v179`.

**Gerätetest 06.07. (Nutzer, PC) – BESTÄTIGT:** (a) MV aus `WE 8/Mietvertrag` erscheint nach ⟳ in der
App; (b) neuer `wgb`-Upload landet in OneDrive unter `WE 8/Mietbescheinigungen`. Damit ist der
v177-Schreibpfad (`saveDok`→`dokAuslagernRef`→`fotoAuslagern`→`odDateiHochladen`→`odPendingFlush`) real
device-verifiziert. **Offen:** v177-Lese-Stichprobe (Öffnen/Teilen einer ausgelagerten Datei), Verbleib
der ersten Test-WGB in `Sonstiges` (manuell verschieben, `odItemId`-Heilung greift), technische Schuld
Voll-Sync → R22.

---

## §0ax – v210: STORE_DEFS – eine Quelle der Wahrheit für alle Stores (12.07.2026, 12. Sitzung)

**Problem (Risiko V2, §13):** Die Store-Namen lagen an fünf Stellen redundant: (1) DB-Anlage-Liste in
`onupgradeneeded`, (2) Index-Block (37 `if(s==='…')`-Zeilen), (3) `exportBackup`, (4) `alleStores`
(Snapshot + Sync-Push), (5) `mergeStores`. Beim Anlegen eines neuen Stores mussten alle Stellen
angefasst werden („6 Pflichtorte") – die häufigste Fehlerquelle des Projekts. Die Listen waren zudem
in unterschiedlicher Reihenfolge gepflegt, was Diffs erschwerte.

**Lösung:** Eine Konstante **`STORE_DEFS`** (45 Stores) mit Flags je Store:
- `sync` – wird nach OneDrive synchronisiert und ins Backup exportiert. `false` bei den drei rein
  lokalen Stores `od_auth` (OAuth-Refresh-Token, darf NIE in die Cloud), `sync_log`, `mieter_snapshots`.
- `merge` – wird beim Pull über `mergeStores`/Tombstones zusammengeführt. `false` bei `users`, `mieter`,
  `tg`, `settings` (Sonderbehandlung via `mergeRecord` – feldweise Konfliktauflösung).
- `index` – Sekundärindizes für `createObjectStore`.

Daraus abgeleitet (und **nie** separat gepflegt): `STORES_ALLE` (Object.keys → DB-Anlage),
`STORES_SYNC` (filter sync) und `STORES_MERGE` (filter merge). Alle fünf Inline-Listen sind entfallen
(Kontrolle: 0 große Storelisten im Code verblieben). Der Index-Block schrumpft von 37 `if`-Zeilen auf
`(STORE_DEFS[s].index||[]).forEach(i=>store.createIndex(i,i))`.

**Methodik – Äquivalenzbeweis statt Vertrauen:** Die fünf Bestandslisten wurden zuerst aus v209
maschinell extrahiert und als Referenz gesichert. Beim Patchen prüfte jeder Ersetzungsschritt per
`assert` die **Mengengleichheit** der zu ersetzenden Liste gegen die Referenz (ein Tippfehler in
STORE_DEFS hätte den Patch abgebrochen). Danach 10/10 Äquivalenztests real ausgeführt:
`STORES_ALLE` == DB-Liste inkl. **Reihenfolge**, `STORES_SYNC` == 42er-Liste, `STORES_MERGE` == 38er-Liste,
**alle 59 Indizes über 37 Stores identisch**, lokale Stores nicht im Sync, jeder merge-Store ist
sync-Store, und die Zweckprobe „neuer Store landet automatisch in allen drei Listen".
Zusätzlich (v200-TDZ-Lehre: `node --check` erkennt keine Laufzeitfehler) die **DB-Anlage real
ausgeführt** gegen eine Stub-IndexedDB: 45 Stores angelegt, keyPath 'id', 59 Indizes, Idempotenz beim
zweiten Upgrade-Lauf. Deklarationsreihenfolge geprüft (STORE_DEFS steht vor jeder Nutzung → keine TDZ).
**Nebenbefund:** Eine Testerwartung („65 Indizes") war falsch geraten – der Code war korrekt (59).
Erwartungswerte künftig aus dem Bestand ableiten, nicht schätzen.

**Wirkung:** Der bisherige Merksatz „6 Pflichtorte für neue IndexedDB-Stores" ist **überholt**.
Neuer Store = **ein** Eintrag in `STORE_DEFS`. (Falls der Store ein neues Schema erfordert, weiterhin
`DB_VER` hochzählen.)

## §0aw – v209: 23a-Backfill – Altbestand nach OneDrive auslagern (12.07.2026, 12. Sitzung)

**Anlass/Problem:** Der Sync meldet seit Langem „Datenmenge 21 MB (Fotos)". Ursache ist NICHT ein Bug,
sondern der Umsetzungsstand von Konzept 23a: v164–v177 haben die **Schreibpfade** auf Referenzen
umgestellt (neue Fotos gehen nach OneDrive), der **Altbestand** blieb aber als Base64 in den Records.
Verschärfend: Protokollfotos lagen **doppelt** inline (im `protokolle`-Record UND im `fotos`-Store) –
der eigentliche 20-MB-Treiber (§0q).

**Lösung – neues Backfill-Modul (11 Funktionen, additiv, DB_VER unverändert):**
- `backfillAnalyse()` – zählt Inline-Bestände je Store (Anzahl + Bytes), **schreibt nichts**. Grundlage
  für die Modal-Vorschau, damit der Nutzer vor dem Start sieht, was passiert.
- `backfillLauf()` – migriert Store für Store in der Reihenfolge `fotos → protokolle → maengel →
  aufgaben → objekt_stamm → reparaturen → ventilpruefung → dokumente`. **Reihenfolge ist bewusst:**
  `fotos` zuerst füllt den Dedupe-Cache, sodass das Protokoll-Duplikat danach ohne zweiten Upload
  dieselbe Referenz erhält.
- `bfHochladen()` + `bfKey()` – **Dedupe** über einen Cache-Schlüssel aus Länge + erste/letzte 64 Zeichen
  der dataURL (kein Hashing nötig, praktisch kollisionsfrei). Nachweis im Test: dieselbe dataURL in
  Protokoll + fotos-Store + Grundriss ⇒ **1 Upload**, drei Records mit identischer `odId`.
- `bfWalkLesen()`/`bfWalkMigrieren()` – rekursive Walker (Tiefe ≤ 8) statt fester Feldpfade. Nötig, weil
  Protokollfotos verschachtelt liegen (`raeume[<Raum>].condPhotos[<Bauteil>]`, `zaehler[i].foto`,
  `photos[]`). `_geleert` (Tombstone-Map) wird übersprungen.
- `bfZiel()` – Ziel-Auflösung: `fotos` über `protId` → Protokoll → objektId/weNr; `objekt_stamm` über den
  **Map-Schlüssel** (`wohnungen_<oid>.wohnungen[<we>]`, sonst wäre die WE nicht rekonstruierbar);
  `dokumente` über die bestehende `dokAuslagernRef` (behält Typ-Gate + Kategorie-Map).
- `modalBackfill()` – UI in Einstellungen → Datenspeicher: Analyse-Tabelle, Warnhinweis (Backup zuerst,
  WLAN), Live-Fortschritt, Abbrechen-Button.

**Sicherheitsprinzipien (jedes einzeln im Test belegt):**
1. **Kein Datenverlust:** Inline-Daten werden ausschließlich ersetzt, wenn der Upload eine Referenz mit
   `odId` zurückgibt. Upload-Fehler ⇒ Record bleibt unverändert (Test: Teil-Ausfall migriert Foto A,
   lässt Foto B inline).
2. **Idempotent:** Referenzen werden übersprungen; Zweitlauf = 0 Änderungen, 0 Uploads, kein `syncSoon`.
3. **Abbrechbar:** `_bfAbbruch`-Flag wird in beiden Walkern und der Store-Schleife geprüft; bereits
   geschriebene Records bleiben gültig (Record-für-Record-`idbPut`, kein Alles-oder-nichts).
4. **Bewusste Ausschlüsse:** `ausweis`/`lastschrift` (DOK_INLINE_TYPEN – § 20 PAuswG, dürfen NICHT in die
   Cloud) und generierte HTML-Archive (`data:text/html`, klein + kein Größentreiber, vgl. v177).
   `fotos`-Records ohne auflösbares Protokoll (`__mangel_offen__`) werden übersprungen statt geraten.
5. **Lesepfade brauchen keine Anpassung:** alle Konsumenten sind seit v164–v177 dual-format
   (`fotoQuelle`/`fotoThumbQuelle`/`fotoDruckQuelle`/`dokQuelle`, `restoreFotosForPD` liest `data || ref`).
   Der Backfill schreibt exakt dasselbe Format, das die Schreibpfade heute schon erzeugen – deshalb ist
   er sicher und erfordert keinen Umbau der Anzeige.

**QA:** `node --check` beide Blöcke + sw.js; Funktions-Diff v208→v209 = **+11/0 verloren** (1315);
0 fehlende onclick-Funktionen; DB_VER 34, keine neuen Stores; **24/24 Tests REAL in Node ausgeführt**
gegen den extrahierten Originalcode mit gestubbtem IndexedDB/OneDrive: Analyse-Nichtveränderung, Dedupe
(1 statt 3 Uploads, identische odId), verschachtelte Protokoll-/Zählerfotos, `fotos`-Feldwechsel
data→ref, Skip bei fehlendem Protokoll, Skip bereits migrierter Referenzen, gemischte Arrays
(String + Referenz), PDF-Endung bei Rechnungsbelegen, `objekt_stamm`-weNr aus Map-Key, Ausweis- und
HTML-Ausschluss, `syncSoon` genau 1×, Idempotenz-Zweitlauf, **Fehlerfall ohne Datenverlust**.

**⚠️ Gerätetest ist Pflicht (erste Änderung an BESTANDSDATEN dieser Reihe):** Backup exportieren →
OneDrive verbinden → WLAN → Analyse prüfen → Lauf → danach Alt-Protokollfoto (Anzeige + PDF-Druck),
Mangel-/Reparaturbeleg, Wohnungsbilder/Grundriss, Aushang prüfen; anschließend Sync: die Toast-Meldung
muss deutlich unter 21 MB liegen. **Restpunkt GESCHLOSSEN (12.07., Nachanalyse):** `__mangel_offen__`-Fotos sind KEINE Altbestände,
sondern kurzlebige Absturzsicherungen der laufenden Mangel-Erfassung – `saveMangel()`/`cancelMangel()`
löschen sie, `restoreMangelFotos()` übernimmt sie beim nächsten Modal-Öffnen. Der Backfill-Skip ist
fachlich endgültig korrekt; es gibt nichts aufzulösen. (Sie erhöhen im Lauf lediglich den
„übersprungen"-Zähler – kosmetisch, kein Handlungsbedarf.)

## §0av – v208: UI-Befunde aus dem Gerätetest (12.07.2026, 12. Sitzung)

**Anlass:** Vier Screenshots + eine PDF vom Gerät; Nutzerfragen: Objektseite auch sortieren?
Lesbarkeit? Bankverbindung kleiner/eingeklappt? Ist die PDF eine E-Rechnung?

**Befund 1 – `.s-hdr`-Layoutbug (Objektseite):** `.s-hdr{display:flex;justify-content:space-between}`
ohne `flex-wrap`; der rechte Buttoncontainer hat ein eigenes `flex-wrap:wrap` und darf dadurch beliebig
breit werden → der Titel-Flexitem wird auf Minimalbreite zusammengedrückt und bricht auf 3 Zeilen um
(„10 Mieter · 14 / Personen", Screenshot). Fix global: `flex-wrap:wrap;gap:8px` am `.s-hdr`,
`.s-title{min-width:0}`. Auf der Objektseite zusätzlich Titel in eigener Zeile + Buttons in 4 Gruppen
(Mieter & Wohnungen · Vorgänge · Schreiben · Abrechnung) über den lokalen Helper `_oGrp`
(neue CSS-Klassen `.akt-grp`/`.akt-row`, auch von v207 im Mieterdetail nutzbar).

**Befund 2 – Kontrast im dunklen Detailkopf (der eigentliche Lesbarkeitsfehler):** `.det-hdr` hat
`background:var(--ink)` (#0C447C). Die Zusatztexte darin verwenden jedoch Ampelfarben aus
`mietspiegelAmpel` (#C0392B / #2E7D52 / #888780) und `KAUTION_STATUS` (`var(--green)`, `var(--amber)`,
`var(--copper)`, `var(--ink-40)`) – allesamt für WEISSEN Grund entworfen. Im Test berechnete
WCAG-Kontraste gegen #0C447C: **1.81 / 1.96 / 2.73 / 3.28** – deutlich unter dem AA-Minimum 4.5,
daher der „verwaschene" Eindruck der Screenshots. Fix: Map `AMPEL_DUNKEL` + `ampelAufDunkel(farbe)`
(Fallback: unbekannte Farbe unverändert) → **4.88–6.64**. Ergänzend `.det-field label` von `--ink-20`
(#A8C8E8, 5.67) auf `--ink-10` (#D6E8F5, 7.84) und Zusatztexte 10 → 11 px (neue Klasse `.det-zusatz`).
**Wichtig für künftige Arbeiten:** Farbkonstanten der App sind für hellen Grund kalibriert – vor
Verwendung im dunklen Kopf immer durch `ampelAufDunkel` schleusen.

**Befund 3 – Bankverbindung (Nutzerwunsch):** War eine große weiße Card mitten im dunklen Kopf mit
dauerhaft sichtbarer voller IBAN. Jetzt natives `<details>`/`<summary>` (aufklappbar OHNE JavaScript
und ohne Inline-Handler → hilft der C1/CSP-Migration), standardmäßig **zu**, im Stil des dunklen
Kopfes, Zeilenlayout (`.bank-zeile`) statt 2-Spalten-Grid. Die Kopfzeile zeigt Zahlweise +
**maskierte** IBAN (neu `ibanMaskiert` → `DE37 … 5409`); die vollständige IBAN erscheint erst nach
bewusstem Aufklappen (Datensparsamkeit, Art. 5 Abs. 1 lit. c DSGVO – relevant, weil Screenshots/
Blicke über die Schulter im Objektalltag vorkommen). Chevron über `::after` mit Tabler-Glyph.

**Befund 4 – ist die SWD-Jahresrechnung eine E-Rechnung? NEIN (real geprüft):** Die hochgeladene
PDF (Wasser-Jahresrechnung Stadtwerke Düsseldorf, Lieferanschrift Mindener Str. 25, VK 20101580196)
enthält **kein** `/EmbeddedFiles`, **kein** `/Filespec`, keine Datei `factur-x.xml`/
`ZUGFeRD-invoice.xml`, keinen `CrossIndustryInvoice`-Knoten (alle 40 Streams dekomprimiert und
durchsucht = derselbe Algorithmus wie `pdfXmlExtrahieren`) und keinen ZUGFeRD-XMP-Namespace. Sie ist
**PDF/A-3** – also im richtigen *Containerformat*, aber ohne eingebettetes XML; das ist ein reines
Anzeige-PDF. Die v201-Lokalerkennung greift daher korrekt NICHT (kein Bug). **Konsequenz:** Auslesen
nur über den KI-Weg → `/api/rechnung-ocr` muss deployt werden (bis dahin 404, vom Frontend abgefangen).
Bis dahin manuell: Brutto 1.396,84 €, Nachzahlung 64,84 € (fällig 27.07.2026, SEPA-Einzug),
Zeitraum 01.07.2025–03.07.2026, 557 m³, neuer Abschlag 120,00 €/Monat, Kostenart Wasser.
**Rechtlich:** Wasser ist nach § 2 Nr. 2 BetrKV umlagefähig; der Grundpreis-Sprung (120 → 140 €/Jahr
ab 01.01.2026) und der Arbeitspreis-Sprung (1,9833 → 2,2331 €/m³) sind in der NKA periodengerecht
abzubilden – die Rechnung liefert die Teilzeiträume bereits getrennt.

**QA gesamt:** 10/10 assert-Patches, `node --check` beide Blöcke + sw.js, Diff v207→v208 = **+2/0**
(1304: `ampelAufDunkel`, `ibanMaskiert`), Objekt-Buttons 11/11 identisch (reine Umsortierung),
0 fehlende onclick-Funktionen (v198-Fehlertyp ausgeschlossen; `ibanMaskiert` wurde beim Scan als
fehlend erkannt und daraufhin angelegt – der Scan hat sich also bewährt), **9/9 Smoke-Tests real
ausgeführt** (WCAG-Kontrastrechnung mit dem extrahierten Original-`mietspiegelAmpel`).

## §0au – v207: Code-Review v206 + 3 Fixes (11.07.2026, 12. Sitzung)

**Anlass:** Nutzerauftrag „Code prüfen, detailliert" + zwei Gerätetest-Screenshots (Anlage-V-Excel
zeigt „v198"; Mieter-Detail-Buttons unsortiert; Frage zur 21-MB-Sync-Größe).

**Prüflauf v206 – Ergebnis fehlerfrei (10 Prüffelder):** Syntax (`node --check` 2 Blöcke + sw.js);
Versionskonsistenz APP_VERSION=CACHE=v206, DB_VER 34; Duplikate nur `getAnteil` 2× (bekannt, §0y);
v206-Druckfix strukturell wasserdicht – Zusatznachweis: `toast()` arbeitet nur über CSS-Klasse
`.show` und kann das Inline-`display:none!important` aus `_druckJetzt` nicht aushebeln, ein während
des offenen Android-Dialogs eintreffender Sync-Toast bleibt also unsichtbar; v205-Kappungsgrenze
11/11 real (alle 4 Restfallklassen 15 %, MG 20 %, Kempenich-Negativprobe, 57er-Liste nachgezählt);
v204-PIN-Migration 13/13 real mit echtem WebCrypto (Idempotenz, Konfliktfälle, Fallback weg, 3
Einbauorte Z. 600/696/26330); `SETTINGS_GEHEIM` in `exportBackup`+`syncToOneDrive` intakt, keine
Secrets/sensiblen Logs, CSP-Meta vorhanden; Store-Listen driftfrei (45 DB-Create / 3× identische
42er Backup-Snapshot-Sync, lokale `od_auth`/`sync_log`/`mieter_snapshots` korrekt ausgeschlossen /
38er merge – users/mieter/tg/settings separat via `mergeRecord`); Handler-Integrität: 603 statische
+ 566 dynamisch generierte onclick gegen 1302 Definitionen = **0 fehlende, 0 doppelte IDs**
(v198-Fehlertyp ausgeschlossen); sw.js v199-Einzelfetch-Härtung aktiv, kein Reset-Block.

**Fix 1 – Backend `inbox-mark-read.js` (SA-Paket-1-Restpunkt, B3-Typ):** 2× `e.message` im
500er-`jsonBody` (Suchen + Verschieben) gab Azure-Storage-Interna an den Client; jetzt
`{ok:false}`, Details nur `context.error` – Muster identisch zur bereits gehärteten
`inbox-trash.js`. Doku-Kopf angepasst. Nebenbefund positiv: OData-Injection per `''`-Escaping
abgesichert. QA: 3/3 assert-Patches, `node --check`, 5/5 Handler-Smoke-Tests real (Mock-Injektion
beweist: kein Fehlerdetail im Body, 400er-Pfade unverändert). App-seitig rückwirkungsfrei
(`mailNachrichtErledigt` wertet die Antwort nicht aus). **Deploy ausstehend – K1: Live-Stand in
`C:\nadigpfau-backend\src\functions\` vor dem Ersetzen abgleichen, nur diese Datei.**

**Fix 2 – Anlage-V-Kopfzeile:** Z. ~28963 hartcodiert `'NadigPfau Hausverwaltung v198'`
(v198-Neuaufbau-Überbleibsel, Gerätetest-Screenshot) → `'NadigPfau Hausverwaltung '+APP_VERSION`.
Zahlen waren korrekt, nur Beschriftung falsch.

**Fix 3 – Mieter-Detail-Buttons gruppiert (Nutzerwunsch):** Die flache flex-wrap-Liste (~20
Buttons, historisch gewachsen) wird per IIFE im Template in 5 Gruppen gerendert: **Vorgänge**
(Protokoll/ToDo/Mangel/Reparatur) · **Vertrag & Kaution** (Mietvertrag bzw. MV-Entwurf/
Mieterhöhung/Kaution/Kautionsquittung/Kautionsabrechnung) · **Dokumente & Schreiben** (Archiv/
Mietbescheinigung/WGB/Brief) · **Wohnung** (Wohnungsinfos/Grundriss/Bilder/Schlüssel/Aushang) ·
**Verwaltung** (Bearbeiten/Vormieter/Neue Anschrift/Reaktivieren/Löschen). Gruppen-Helper `grp`
(lokal in der IIFE, keine neue Top-Level-Funktion) blendet leere Gruppen samt Label aus – beim
HM fehlt „Vertrag & Kaution" komplett. Label-Stil 10.5px uppercase `--ink-40`. QA: Diff v206→v207
= 0/0 (1302), **Button-für-Button-Diff: alle 25 onclick-Handler identisch** (reine Umsortierung),
16/16 Render-Smoke-Tests real (Original-Template-Ausschnitt unverändert in Node eingebettet;
Verwalter-, HM-, Vormieter-, Leerstand-Sicht; Methodik-Lehre bestätigt: Testcode NIE per
repr/eval-String-Escaping erzeugen, sondern Original-Ausschnitt binär einbetten).

**Sync-Größe 21 MB (Nutzerfrage, kein Fehler):** 23a lagert seit v164 nur NEU aufgenommene
Fotos/Belege aus; Bestands-Base64 (v. a. Protokollfoto-Duplikate, §0q) bleibt bis zum Backfill in
`immo_daten.json`. Backfill = offener ⚑-Punkt, eigene Sitzung mit Test-Gate (verändert
Bestandsdaten).

**Hinweis Doku-Struktur:** §0as/§0at werden im Schnellüberblick referenziert, existieren aber
(noch) nicht als Abschnitte – Details der Sitzungen 9–11 liegen vollständig in den ★-Blöcken;
§0au deshalb als nächste sichere Nummer gewählt.

## §0ar – v194: Etappe D2 – Batch-Detail + selektives Rückgängig (08.07., 8. Sitzung)

**Ziel:** Nachvollziehbarkeit je Import bis auf Buchungsebene + Fehlimport-Korrektur ohne Verlust bereits
geleisteter Kategorisierungsarbeit. Reines Frontend, kein DB_VER-Sprung.

**Marker-Kriterium** `_batchBearbeitet(b)`: eine Buchung gilt als bearbeitet, wenn `status==='geprueft'` oder
`kategorie` bzw. nicht-leeres `kategorien` gesetzt ist. Hintergrund (aus `zaBuchungRecord`): frisch importierte
Buchungen haben `status` 'geprueft' nur bei manuellem Match, sonst 'erkannt' (Auto-Match) oder 'ungeprueft';
`buchKategorieSetzen` setzt 'geprueft' + `kategorie`. Damit sind nur bewusst nachbearbeitete Buchungen geschützt.

**`modalBatchDetail(batchId)`:** lädt Batch + Buchungen (`buchungIds`→`idbGet`), zeigt je Zeile Name/Zweck,
Datum, Typ, Kategorie, Betrag und Status-Label (grün „bearbeitet“ / grau „unverändert“). Aktionen: „Zurück“
(→ `modalImportVerlauf`), „Nur unveränderte (n)“ (disabled wenn n=0) und „Kompletter Import“. Im Import-Verlauf
(`modalImportVerlauf`) wurde je Batch ein Details-Button ergänzt (quote-freier Anker `${storniert?''`).

**`zaBatchRueckgaengigSelektiv(batchId)`:** partitioniert die Buchungen in bearbeitet/unverändert,
`confirm`-Abfrage, löscht nur die unveränderten via `deleteMitTombstone`, setzt `batch.buchungIds` auf die
verbliebenen; leer → `status:'storniert'` (+`storniertAm/Von`), sonst `teilRueckgaengigAm`. Danach Sync +
`zaRenderVerlauf` + Re-Öffnen der Detailansicht.

**QA:** `node --check` OK, Diff v193→v194 = **+3/0** (`_batchBearbeitet`, `modalBatchDetail`,
`zaBatchRueckgaengigSelektiv`), 13/13 Logiktests (Marker-Erkennung inkl. 'erkannt'/'ungeprueft'=unverändert,
nur unveränderte gelöscht, bearbeitete geschützt, Teilstorno hält Batch aktiv, Vollstorno bei nur
unveränderten, nichts-zu-löschen bei nur bearbeiteten, Tombstones). Cache `nadigpfau-v194`. **Gerätetest
ausstehend.** Etappe D (D1+D2) funktional abgeschlossen.

## §0aq – v193: §14 Regelverwaltung (08.07., 8. Sitzung)

**Ziel:** Den bei v189 (§14 Lernregeln) offen gebliebenen Verwaltungs-Teil nachliefern – gelernte Regeln
sichtbar und löschbar machen. Reines Frontend, vorhandener Store `buch_regeln`, **kein DB_VER-Sprung**.

**`modalRegeln`:** lädt alle `buch_regeln`, sortiert nach `trefferzahl` (desc), cached die Liste in
`window._regelListe` (Index-Referenz für das Löschen – vermeidet Escaping-Probleme bei Namen mit
Sonderzeichen im onclick). Pro Regel: Bezeichnung (Name oder Schlüssel ohne `iban:`/`name:`-Präfix),
IBAN-Badge, Zielkategorie (`buchKatLabel`), Trefferzahl, letztes `updatedAt`; Lösch-Button `buchRegelLoeschen(i)`.
Empty-State erklärt das Lernen. Button „Regeln“ in der Sicht-Leiste von `zaRenderVerlauf` (neben „Importe“).

**`buchRegelLoeschen(i)`:** `window._regelListe[i]` → `deleteMitTombstone('buch_regeln', r.id)` (Tombstone für
Sync-Delete-Propagation) → Entfernen aus `window._buchStamm.regeln` (Analyse-Cache sofort aktuell) → Sync +
`modalRegeln()` Re-Render.

**QA:** `node --check` OK, Diff v192→v193 = **+2/0** (`modalRegeln`, `buchRegelLoeschen`), 8/8 Logiktests
(Sortierung nach Trefferzahl, Löschen per Index, Tombstone gesetzt, Analyse-Cache aktualisiert, andere Regeln
unberührt, ungültiger Index ändert nichts). Cache `nadigpfau-v193`. **Gerätetest ausstehend.**
**Hinweis:** v193 wurde in einem früheren (durch Turn-Abbruch nicht sichtbaren) Lauf erzeugt und hier
vollständig gegen v192 verifiziert; Funktionsname `modalRegeln` (nicht `modalLernregeln`).
*(Zusammengeführt aus Duplikat-Block, 10.07.:)*
**Ziel:** Transparenz & Korrektur für die in v189 gelernten Kategorie-Regeln (bis dahin ohne UI – der Nutzer
konnte fehlgelernte Regeln nur durch Umkategorisieren überschreiben, nicht einsehen/löschen).
**`modalRegeln`:** lädt `buch_regeln`, sortiert nach `trefferzahl` (häufigste zuerst), zeigt je Regel
Bezeichnung (`name`, sonst Schlüssel ohne `iban:`/`name:`-Präfix), IBAN-Badge, Ziel-Kategorie (`buchKatLabel`),
Trefferzahl, `updatedAt`. Cache `window._regelListe` für index-basierten Zugriff. **`buchRegelLoeschen(i)`:**
nimmt den **Listenindex** (nicht die ID direkt – vermeidet Quote-Injection bei Namen mit Sonderzeichen),
`deleteMitTombstone('buch_regeln', r.id)`, entfernt `r.schluessel` aus `window._buchStamm.regeln`, Sync,
**QA:** `node --check` OK, Diff v192→v193 = **+2/0** (`modalRegeln`, `buchRegelLoeschen`), 10/10 Logiktests
(Sortierung nach Häufigkeit, IBAN-Erkennung, Name-Bevorzugung, Index-Löschen, Tombstone + Cache-Bereinigung,
verbleibende Regeln unberührt). Cache `nadigpfau-v193`. **Gerätetest ausstehend.**

## §0ap – v192: Etappe D1 – Batch-Import-Infrastruktur (08.07., 8. Sitzung)

**Ziel:** GoBD-taugliche Nachvollziehbarkeit von CSV-Importen + Fehlimport-Korrektur. Rein Frontend.

**Store `buchungs_batches`** (DB_VER 33→34, zweiter Schema-Sprung der Sitzung nach v189). An allen sechs
Pflichtstellen registriert (DB-Create, Index `kontoId`, exportBackup, alleStores, syncPush, mergeStores) –
per grep verifiziert (Hinweis: der alleStores-Teilstring überlappt beim Zählen mit mergeStores, beide Anker
aber mit Treffer=1 gepatcht).

**`zaSpeichern`:** `batchId='batch_'+uid()` + `batchIds[]`-Sammlung; jede NEU angelegte Buchung (Eingang wie
Ausgang) bekommt `rec.batchId` und wird in `batchIds` erfasst; übersprungene Duplikate behalten ihren alten
Batch. Am Ende Batch-Record mit Zählern + `status:'aktiv'` (nur wenn ≥1 neu).

**`modalImportVerlauf`:** Liste der Batches des Kontos (neueste zuerst), Datum/Anzahl/Bearbeiter, „Rückgängig“-
Button je aktivem Batch; stornierte ausgegraut. **`zaBatchRueckgaengig`:** `confirm`-Sicherheitsabfrage (nennt
Anzahl + Warnung, dass auch kategorisierte Buchungen entfernt werden) → `deleteMitTombstone('buchungen',id)`
pro Buchung (damit der Sync das Löschen propagiert) → Batch `status:'storniert'` + `storniertAm/Von` (nicht
gelöscht – GoBD). Danach OneDrive-Sync + `zaRenderVerlauf`.

**QA:** `node --check` OK, Diff v191→v192 = **+2/0** (`modalImportVerlauf`, `zaBatchRueckgaengig`), 13/13
Logiktests (Batch-Protokoll, batchId-Zuordnung, Duplikat behält alten Batch, Rückgängig löscht nur den eigenen
Batch, Tombstone gesetzt, Storno-Status). Cache `nadigpfau-v192`. **Gerätetest ausstehend.**
**Offen D2 (optional):** Batch-Detailansicht, selektives Rückgängig nur unveränderter Buchungen.

## §0ao – v191: §10 Kautionsendabrechnung (07.07., 8. Sitzung)

**Befund:** Die Kautions-*Logik* war bereits vollständig (`kautionSaldo`/`kautionZinsSumme`/
`kautionAbgangSumme`/`kautionRatenSumme`, Bewegungen Zins/Verrechnung/Auszahlung, `modalKaution`, Zinsberechnung
mit kapitalmindernden Abzügen, `erstelleKautionsquittung`). Es fehlte nur das formelle **Endabrechnungs-Schreiben**
bei Auszug – also additiv ergänzt, ohne Bestehendes zu ändern.

**Neu:** `modalKautionsabrechnung(mieterId)` (Abzugsliste `kaAbzugAdd/Del/Collect/Render` +
`kaAuszahlungAktualisieren` mit Live-Summe), `erstelleKautionsEndabrechnung(mieterId)` (druckbares Schreiben,
analog Quittungsmuster: Briefkopf/`getBriefkopf`, `druckHTML`, Archiv-HTML ohne Auto-Print-Script). Rechnung:
Auszahlung = `kautionSaldo(kd)` − ΣAbzüge; negativ → Nachforderung. Store: vorhandener `kautionsquittungen`
mit `typ:'endabrechnung'`, `auszahlung`, `abzuege`, `iban` – **kein neuer Store, kein DB_VER-Sprung**
(bewusst, um in derselben Sitzung nicht zwei Schema-Sprünge zu machen).

**Recht:** Dokument nennt § 551 BGB, weist Einbehalt für noch offene BK-Abrechnung als gesondert auszuweisend
aus und hält die Einzelfallprüfung vor. **Kein** konkreter Fristautomatismus vorgegeben (Frist frei einstellbar,
Default 14 Tage) – die angemessene Abrechnungsfrist ist einzelfallabhängig; ggf. anwaltliche Prüfung.

**Patch-Falle (dokumentiert):** Die Ziel-Template-Literals in der Mieter-Detail-/Quittungslisten-Ansicht nutzen
**escaped** Quotes (`\"`). Lösung: **quote-freie Suchanker** + Einfügungen mit normalen Quotes (im
Template-Literal äquivalent). Der `>Erstellt am ${d}`-Anker kam **2×** vor (Quittungs- UND andere Liste) →
pro-Eintrag-Typlabel weggelassen, stattdessen Card-Header „Kautionsdokumente“. **QA:** `node --check` OK, Diff
v190→v191 = **+7/0**, 10/10 Logiktests (Saldo, Auszahlung, Nachforderung bei Überabzug, Raten-Kaution, Rundung).
Cache `nadigpfau-v191`. **Gerätetest ausstehend.**
*(Zusammengeführt aus Duplikat-Block, 10.07.:)*
Bestehende Kautionsverwaltung (`modalKaution`/`saveKaution`, Modell `m.kautionDetail={betrag,art,status,raten,
bewegungen[]}`, `kautionSaldo=grund+zins−abgänge`) blieb unangetastet; ergänzt nur die Endabrechnung.
`modalKautionEndabrechnung`→dynamische Abzugszeilen (`kautionAbzugZeile[Html]`, `kautionAbzuegeCollect`),
Live-Ergebnis (`kautionEndabrechnungRender`). `kautionEndabrechnungSpeichern`: pro Abzug eine `verrechnung`-
Bewegung, bei Rest>0 eine `auszahlung`-Bewegung; Status `einbehalten` (Abzüge) bzw. `zurueckgezahlt`;
`kd.endabrechnung={datum,saldoVor,abzuege,summeAbzuege,rueckzahlung,nachforderung,iban}`. Nach voller
Abrechnung ist `kautionSaldo`=0 (Konsistenz getestet). `druckeKautionEndabrechnung` öffnet ein Druckdokument
(§ 551 BGB-Verzinsungshinweis, NK-Nachforderungsvorbehalt). Button in Mieter-Detailansicht neben „Kaution“.
QA: `node --check` OK, +7/0, 12/12 Tests. Cache `nadigpfau-v191`. Gerätetest ausstehend.
**Buchhaltungs-Etappen C/E-Frontend damit weitgehend abgeschlossen** (§3/§5/§6 v186, §9 v185, §14 v189,
§4/§24 v190, §10 v191). Offen: Etappe D (Import-Batches, Store `buchungs_batches`, Status-Workflow,
Änderungsverlauf) – größerer Frontend-Block; Rechnungs-OCR-Backend-Deploy (P33); DSGVO-Doku (Anthropic AV);
kleine §14-Regelverwaltung. Gerätetest v186–v191 ausstehend.

## §0an – v190: §4 Barzahlung + §24 Excel-Export (07.07., 8. Sitzung)

**§4 Barzahlung:** Eine Barzahlung ist technisch nur eine Eingangsbuchung mit `mieterId`+`mietmonat` – sie
fließt daher **ohne `zaSollIst`-Umbau** automatisch in die Ist-Aggregation ein (die Schleife summiert alle
`typ==='eingang'`-Buchungen mit `mieterId`). `modalBarzahlung` (Button in der Sicht-Leiste von `zaRenderVerlauf`)
listet die Mieter des Kontos, `barzahlungSpeichern` legt `{id:'bar_'+uid, kontoId, typ:'eingang', bar:true,
mieterId, mieterName, betrag, datumISO, mietmonat, zweck, quelle:'bar', status:'geprueft'}` an. Rechtlich als
Variante (a) umgesetzt (Nutzerentscheidung 8. Sitzung): steuerpflichtige Einnahme, sichtbar gekennzeichnet –
**nicht** aus der Buchführung herausgehalten. UI-Hinweis im Dialog + „bar“-Badge im Kontoauszug
(`zaRenderAuszug`).

**§24 Excel-Export:** `zaExportBuchungen` – SheetJS (`XLSX`, schon via CDN geladen) → `aoa_to_sheet` mit Kopf
Datum/Art/Betrag/**Bar**/Mieter/Monat/Kategorie/Zweck/IBAN/Status; Ausgaben negativ, Barzahlungen Spalte „Bar“=Ja,
Split-Buchungen mit verketteten Kategorielabels; Dateiname `Buchungen_<Konto>_<Datum>.xlsx`.

**Patch-Hinweis:** Die Ziel-Template-Literals in `zaRenderVerlauf`/`zaRenderAuszug` nutzen **escaped** Quotes
(`\"`) – Anker mussten quote-frei gewählt bzw. Backslashes berücksichtigt werden (andere Blocks nutzen normale
Quotes; im Zweifel `cat -A` prüfen). **QA:** `node --check` OK, Diff v189→v190 = **+3/0**, 13/13 Logiktests
(Komma-Betrag, Validierung, Monatsableitung, Export-Vorzeichen, Bar-Kennzeichnung, Split-Kategorien). Cache
`nadigpfau-v190`. **Gerätetest ausstehend.**
*(Zusammengeführt aus Duplikat-Block, 10.07.:)*
Barzahlung = reguläre Einnahme mit `bar:true` (Variante a der Nutzerentscheidung: steuerlich sichtbar, **nicht**
off-books). `modalBarzahlung`/`barzahlungSpeichern` (Buttons in `zaRenderVerlauf`-Sichtleiste). Record:
`{id:'bar_'+uid(), kontoId, typ:'eingang', bar:true, mieterId, mieterName, betrag, datumISO, mietmonat,
zweck, notiz, status:'geprueft', quelle:'bar'}` – fließt ohne `zaSollIst`-Änderung in die Ist-Aggregation (die
zählt jeden `typ==='eingang'` mit `mieterId`). Kontoauszug zeigt „bar"-Chip. `zaExportBuchungen`: SheetJS-Export
aller Kontobuchungen, Spalten Datum/Art/Betrag/**Bar**/Empfänger/Monat/Kategorie/Zweck/IBAN/Status; Ausgaben
negativ. QA: `node --check` OK, +3/0 (`modalBarzahlung`,`barzahlungSpeichern`,`zaExportBuchungen`), 7/7 Tests.
Cache `nadigpfau-v190`. Gerätetest ausstehend.

## §0am – v189: §14 Lernregeln (Kategorie aus Buchungstext lernen, 07.07., 8. Sitzung)

**Kontext:** Backend-Deploy temporär nicht möglich (nur GitHub Pages) – also reines Frontend-Feature aus der
Roadmap vorgezogen. §14 war Nutzerwunsch (Punkt 6 der 8. Sitzung, „Kategorie direkt aus dem Buchungstext“).

**Neuer Store `buch_regeln`** (DB_VER 32→33, erster Schema-Sprung der Sitzung). Registrierung an allen sechs
Pflichtstellen – einzeln per grep verifiziert: (1) DB-Create-Liste, (2) Index-Block
(`schluessel`, `kontoId`), (3) `exportBackup`, (4) `alleStores` (Snapshot), (5) `syncToOneDrive`-Push,
(6) `mergeStores`. Datensatz: `{id=schluessel, schluessel, kategorie, seite, name, trefferzahl, erstelltAm,
updatedAt}`; `id`=Schlüssel ist über Geräte deterministisch → dieselbe Gegenpartei = dieselbe Regel-id (sauberer
Merge, neuerer `updatedAt` gewinnt).

**Lernen:** `buchRegelSchluessel(b)` = `iban:<normIban>` bevorzugt, sonst `name:<lower/trim/collapse>`. `buchRegelLernen(rec,kat)` legt an oder frischt auf (Kategorie überschreiben, `trefferzahl++`). Eingehängt in
`buchKategorieSetzen` direkt nach dem Speichern der Buchung (nur wenn `kat` gesetzt). Aktualisiert zusätzlich
`window._buchStamm.regeln`, damit die Regel ohne Reload sofort greift.

**Anwenden:** `buchStammLaden` liefert jetzt zusätzlich `regeln` (Schlüssel→Kategorie-Map). `buchAnalyseAusgang`
prüft diese Map **ganz am Anfang** (vor Zähler/Vertrag/Anbieter) und liefert bei Treffer
`{kat, konfidenz:'sicher', quelle:'Gelernte Regel'}`. Der Vorschlag erscheint als Chip (`buchVorschlagChip`) –
**nie** automatisch gesetzt, der Nutzer bestätigt per Klick. Damit keine stille Fehlkategorisierung.

**QA:** `node --check` OK; Diff v188→v189 = **+2/0** (`buchRegelSchluessel`, `buchRegelLernen`); 11/11 Logiktests
(IBAN-Bevorzugung/Normalisierung, Name-Fallback, Lernen, Auffrischen bei Umkategorisierung, sichere Anwendung,
kein Treffer für Unbekannte, kein Lernen ohne kat/Schlüssel). Cache `nadigpfau-v189`. **Gerätetest ausstehend.**
**Folgeschritt:** kleine Verwaltungs-UI für gelernte Regeln (Liste/Löschen); Korrektur bislang via
Umkategorisieren.

## §0al – v188: KI-Rechnungserkennung (Frontend-Integration, 07.07., 8. Sitzung)

**Ansatz:** Der Kollegen-Endpunkt liefert strukturierte Rechnungsdaten; statt eines neuen Erfassungsmoduls
wird das **vorhandene** `modalRechnungErfassen` (Store `rechnungen`, Beleg via `_rechnBeleg`, Speicherung via
`rechnungSpeichern`) nur um eine KI-Vorbefüllung ergänzt. Minimal-invasiv, kein Dublett, GoBD-neutral (Nutzer
prüft/korrigiert vor dem Speichern).

**Neu:** Button `#rOcrBtn` „KI-Erkennung“ in der Beleg-Buttonleiste + DSGVO-Hinweiszeile. `rechnungOcrErkennen()`
nimmt den bereits angehängten `_rechnBeleg` (Foto/PDF), zerlegt die Data-URL in Base64+mimeType, lädt
`backendKey` aus `settings`, ruft `POST {BACKEND_AZURE}/api/rechnung-ocr` mit Header `x-functions-key` und
`{fileBase64, mimeType, objekte:[{id,name,adresse}]}` (aus `getMyObjekte`), Timeout 45 s. Ladezustand am
Button. Fehlerpfade: 404→„Endpunkt noch nicht eingerichtet“, 401/403→Key abgelehnt, AbortError→Timeout,
sonst Netzwerkfehler; alles über `toast`, ohne das Formular zu zerstören. `rechnungOcrVorschlagAnwenden(v)`
setzt nur nicht-leere Werte, validiert Datum per Regex `^\d{4}-\d{2}-\d{2}$`, wählt das Objekt nur bei
Konfidenz hoch/mittel und wenn die `objektId` als `<option>` existiert (sonst nichts), und hängt Kategorie-/
Netto-/MwSt-/Zeitraum-/IBAN-/Notizvorschlag als Klartextzeile an die Notiz (keine Erzwingung in Auswahlfelder).

**QA:** `node --check` OK; Diff v187→v188 = **+2/0** (`rechnungOcrErkennen`, `rechnungOcrVorschlagAnwenden`);
12/12 Logiktests inkl. Konfidenz-Gate, unbekanntes Objekt, ungültiges Datum, null-Schutz. Cache
`nadigpfau-v188`. **Backend-Deploy ausstehend** (Nutzer, Anleitung erteilt); bis dahin 404 = erwartetes
Verhalten. **DSGVO-Doku** (Anthropic als weiterer Auftragsverarbeiter) als nächster Schritt offen.

## §0ak – v187: Versorger-Passwortschutz + Verbrauchsdiagramm (07.07., 8. Sitzung)

**Auslöser:** Zwei Nutzerpunkte außerhalb der Buchhaltung. Additiv, kein Store, DB_VER 32.

**(1) Versorger-Zugangsdaten – Passwort nie automatisch:** Bisher wurde das entschlüsselte Passwort, sobald
die Krypto-Sitzung einmal entsperrt war (`cryptoIstEntsperrt()`), beim Öffnen eines Versorgers automatisch im
Klartext gezeigt (Detail + Formularfeld `type=text` + Archiv). Neu: In allen drei Ansichten ist das Passwort
maskiert (••••••) und wird erst auf ausdrücklichen „Anzeigen“-Klick entschlüsselt und in’s DOM geschrieben
(`versorgerPwToggle`, `vFormPwToggle`, `versorgerArchivPwToggle`); ist die Sitzung gesperrt, führt der Klick
über `modalCryptoUnlock`. Angezeigter Klartext wird nach 20 s automatisch wieder verborgen. Das Formularfeld
wird **nicht** mehr vorbefüllt – leeres Feld = Passwort unverändert (die vorhandene `saveVersorgerFortsetzen`-
Logik behält bei leerem `pwKlartext` das gespeicherte `passwortEnc`), Klartext gelangt also nur bei
bewusster Änderung ins DOM. **Auto-Sperre:** `cryptoAktivitaet()` startet/erneuert einen 5-Minuten-Timer
(`CRYPTO_AUTOLOCK_MS`), der `_cryptoKey` nullt; aufgerufen bei jedem Entsperren und jedem Anzeigen. Nutzer-
Entscheidung: bewusster Klick genügt (kein erneutes Master-PW je Blick) + Inaktivitäts-Sperre.

**(2) Verbrauchsdiagramm Einzelzähler (`zeigeZaehlerVerlauf`):** Die Verlaufskurve nutzte `zaehlerVerbrauchs­
Punkte(...,'diff')` = Rohverbrauch je Ablesung – bei ungleichen Ableseabständen irreführend. Umgestellt auf
`'proTag'` (Ø Verbrauch/Tag). **Zusätzlich** Jahresbalken: `jahresVerbrauchTagesgenau(staendeAsc)` verteilt
den Verbrauch zwischen je zwei Ablesungen **tagesgenau** auf die überlappenden Kalenderjahre (behebt die alte
`perJahr`-Ungenauigkeit, die jahresübergreifende Intervalle komplett dem Jahr der neueren Ablesung zuschlug);
Rand-/laufendes Jahr wird als „unvollständig“ markiert (grauer Balken, Tabellen-Hinweis). Neues SVG-Balken­
diagramm `balkenChartSVG`. Empfehlung bestätigt: Ø/Tag-Kurve (unterjähriger Trend) + Jahresbalken
(wirtschaftlicher Jahresvergleich, NKA-Plausibilisierung, Wasser-Leckindikator).

**QA:** `node --check` beide Blöcke OK; Diff v186→v187 = **+6 / 0 verloren** (1241→1247; `cryptoAktivitaet`,
`versorgerPwToggle`, `vFormPwToggle`, `versorgerArchivPwToggle`, `jahresVerbrauchTagesgenau`, `balkenChartSVG`);
8/8 Logiktests (tagesgenaue Umlage, Summenerhalt, Zählerwechsel ignoriert, Unvollständig-Kennzeichnung).
Vorbestehende Dublette `getAnteil` unverändert. `sw.js`-CACHE `nadigpfau-v187`. **Gerätetest ausstehend.**

## §0aj – Buchhaltungs-Etappe C, Teil 1: v186 (07.07., 8. Sitzung)

**Ausgangslage:** v183–v185 am Gerät bestätigt. C wird in vier verifizierbaren Inkrementen geliefert
(v186–v189), da der Umfang (Matching, `zaSollIst`, neuer Store, Barzahlung, Kaution, Export) sonst nicht
test-gate-konform wäre. v186 = die schemaneutrale, aber regressionskritische Basis um den Zahlungsabgleich.

**§3 Historische Mieter (Import + Anzeige):** Der Import-Pool (`zaVerarbeiten`) schloss Vormieter bisher
komplett aus (`!m._vormieter && m.aktiv!==false`) → Bankzahlungen ausgezogener Mieter (Nachzahlungen,
Kautionsrückzahlung) waren nicht zuordenbar. Neu: Pool = `m.mieter && !m._zukuenftig && darfObjekt` (nur
Zukünftige raus). `zaMatch`: IBAN-Treffer auf einen Vormieter wird zugeordnet und mit `ehem:true`,
`status:'ehem'`, `score:70` markiert; WE-Match mit mehreren Kandidaten (aktuell + früher derselben WE)
entscheidet über `_mieterAktivImMonat(zaMietmonat(b))`, sonst Vorrang aktueller Mieter. `zaMieterDropdown`:
eigene optgroup „Ehemalige Mieter“. `zaRenderVerlauf`: aktive Mieter + **relevante** Vormieter (Mietzeitraum
∩ Monatsfenster ≠ ∅ ODER Buchung vorhanden), damit die Ansicht nicht mit historischen Zeilen überläuft.

**§6 Einnahmen-Aufschlüsselung + Mietzeitraum (`zaSollIst`):** `sollIdx` trägt zusätzlich `ehem`,
`einzugISO`, `auszugISO`. Je Monat: Soll nur ansetzen, wenn `_mieterAktivImMonat` → sonst `sollMo=0` und
Status `inaktiv` (kein Ist) bzw. `fremd` (Ist trotz Inaktivität, gelb „?“) – **keine** Warnung. Ist-Miete
(ohne SP-Anteil) wird in NK-Vorauszahlung + Kaltmiete zerlegt (`nkAnteil=min(iMiete,s.nk)`, Rest KM); rein
darstellend, `diff` unverändert. Mietkonto zeigt unter dem Ist „KM x · NK y“ (nur wenn beide belegt) und
markiert Vormieter mit Chip „ehem.“. **Regressionsschutz per Logiktest:** durchgängig aktiver Mieter →
`sollMo==soll`, Status/diff exakt wie v185.

**§5 Regenwasser:** In den NK-Kostenarten existierte „Regenwasser“ (Schlüssel Wohnfläche) bereits, in den
**Bank-Import-Kategorien** `BUCH_KATEGORIEN` und `BUCH_SPARTE_KAT` fehlte es. Neu: Kategorie `regenwasser`
(„Regenwasser/Niederschlag“, `seite:'aus'`, `umlage:'voll'`, `nka:true`; § 2 Nr. 3 BetrKV), Sparte-Mapping
`regenwasser:'regenwasser'`, Erkennungsmuster in `buchAnalyseAusgang` (Niederschlags-/Regen-/Oberflächen-
wasser/versiegel) **vor** dem Grundsteuer-Muster (da oft über dieselbe Stadtkasse eingezogen).

**QA:** `node --check` beide Script-Blöcke OK; Funktions-Diff v185→v186 = **+2 / 0 verloren** (1239→1241;
neu `_einzugISOvon`, `_mieterAktivImMonat`); 18/18 Logiktests (Mietzeitraum inkl. dt. Datumsformat,
KM/NK-Split NK-zuerst, Status inkl. inaktiv/fremd, Regression). Vorbestehende Dublette `getAnteil` (2× schon
in v185, nicht durch v186) als bekannter Punkt notiert. `APP_VERSION='2026-07-07-v186'`, `sw.js`-CACHE
`nadigpfau-v186`, **DB_VER 32**. Ausgeliefert: `index-v186.html` + `sw.js`. **Gerätetest ausstehend.**

## §0ai – Buchhaltungs-Ausbau v183–v185 (07.07., 7. Sitzung)

**Ausgangslage:** v181/v182 hatten bereits eine Bankimport-/Buchhaltungspipeline auf dem Store
`buchungen` (Konten je Objektgruppe `ZA_KONTEN`, CSV-Import → Vorschau → Speichern mit Dedup über
`zaBuchungId`, Mieter-Matching, 19 Ausgabe-Kategorien `BUCH_KATEGORIEN` mit `nka`-Flag, Splits
`buchTeile`/`modalBuchungSplit`, NKA-Übernahme `nkaBuchPanelToggle`, 4 Sichten). **Nichts davon
wurde entfernt**; die Etappen erweitern rein additiv.

**Etappe A – v183 (Kategorien-Fundament):** `BUCH_KATEGORIEN` zum Obermengen-Modell erweitert – jede
Kategorie trägt jetzt `seite:'aus'|'ein'` und (Ausgaben) `umlage:'voll'|'teil'|'nein'|'eig'`; das
`nka`-Flag bleibt unverändert erhalten (NKA-Panel läuft weiter). Alle 19 Alt-IDs erhalten (nur
`wasser`-Label → „Wasser", da `abwasser` neu). Neue Ausgaben: abwasser, heizkosten, allgemeinstrom,
zinsen, tilgung, bankgebuehren, bankkosten, eigentuemer_auszahlung, kaution_auszahlung, fehlbuchung.
Neue Einnahmen: kaltmiete, nk_vorauszahlung/-nachzahlung/-guthaben, kaution_erhalten,
erstattung_kosten, versicherungserstattung, versorger_erstattung, sonstige_einnahmen,
fehlbuchung_rueck. `buchKatOptionen(gewaehlt, seite)` filtert seite (rückwärtskompatibel);
Ausgänge-/Split-Dropdown auf `'aus'` gestellt. Neue Helfer `buchKatUmlage`/`buchUmlageBadge`
(§20-Badge) und `buchKonfidenzBadge`. `zaBuchungRecord` bekommt additiv `konfidenz` (iban/sp=sicher,
we/name=wahrscheinlich, manuell=sicher) und `status` (erkannt/geprueft/ungeprueft); manuelle
Zuordnungen tragen `manuell:true`. Diff v182→v183 +3/0 (buchKatUmlage, buchUmlageBadge,
buchKonfidenzBadge), 57 Logiktests grün.

**Etappe B1 – v184 (automatische Analyse §4/§5/§9-Erkennung/§11-Engine):** `buchAnalyseAusgang(b,
versorger, zaehler)` gleicht Zweck+Buchungstext+Name gegen die **echten** Stammdaten ab:
Zählernummer (`zaehler.zaehlernummer` → `art` → Kategorie, „sicher"), Vertragsnummer
(`versorger.vertragsnummer` → `sparte` → Kategorie, „sicher"), Anbietername (`versorger.anbieter`,
„wahrscheinlich"), plus Muster für Bankentgelt, Versicherung, Grundsteuer und Darlehen/Kredit.
Mappings `BUCH_SPARTE_KAT` (strom/gas/wasser/heizung/muell/internet/sonstige) und `BUCH_ZART_KAT`
(warmwasser/heizung→heizkosten). `buchStammLaden(konto)` lädt Versorger/Zähler aller Konto-Objekte
nach `window._buchStamm`; `zaRenderVerlauf` ruft es. `buchVorschlagChip(b)` zeigt in der
Buchhaltungssicht bei unkategorisierten Ausgängen einen gestrichelten Vorschlag (grün=sicher/
gelb=wahrscheinlich); Übernahme via bestehendem `buchKategorieSetzen` (keine Doppellogik).
`buchAnalyseErstattung(b)` als Engine für §11. Diff v183→v184 +6/0, 15 Logiktests grün.

**Etappe B2 – v185 (§9 Darlehen aus Buchungstext + §11 Erstattung/Verknüpfung):** `buchDarlehenSplit(b)`
liest Zins-/Tilgungsbeträge per Regex aus dem Buchungstext (Formen „Zinsen … Tilgung …",
„Zinsanteil/Tilgungsanteil", Tausenderpunkt); nur gültig, wenn Zins+Tilgung ±0,02 € zum Ratenbetrag
passen. `buchDarlehenUebernehmen(id)` schreibt Split `[{zinsen},{tilgung}]`. `modalErstattung(id)`/
`saveErstattung()`: Erstattungs-Eingang bekommt Einnahme-Kategorie + optional `erstattungFuer`
(ID der Ursprungs-Ausgabe, Dropdown ähnlicher Ausgänge). `zaRenderBuchhaltung` bildet `erstIdx`
und zeigt bei verknüpften Ausgängen „abzgl. X = Netto"; `zaRenderAuszug` bietet für nicht
zugeordnete Eingänge den Erstattungs-Button; `zaSollIst` überspringt Eingänge mit `erstattungFuer`
(zählen nicht als Miete). Diff v184→v185 +4/0 (buchDarlehenSplit, buchDarlehenUebernehmen,
modalErstattung, saveErstattung), 11 Logiktests grün.

**QA gesamt:** `node --check` beide Script-Blöcke je Version OK; Funktions-Diff v182→v185 = **+13 / 0
verloren** (1227→1240); keine Dublette (`buchKatOptionen` genau 1×). `APP_VERSION='2026-07-07-v185'`,
`sw.js`-CACHE `nadigpfau-v185`, **DB_VER 32**. Ausgeliefert: `index-v185.html` + `sw.js`.

**Offen (Buchhaltung):** Gerätetest v183–v185; Etappen **C** (§6 Einnahmen-Aufschlüsselung
Kaltmiete/NK/Kaution + §3 historische Mieter nach Mietzeitraum + §10 Kautionsverwaltung), **D**
(§2/§13/§16/§18/§23/§25 Import-Batches, erweiterte Vorschau, Änderungsverlauf, Status-Workflow,
Sicherheitsabfragen – neue Stores → DB_VER 32→33), **E** (§14 Lernregeln, §21 Belegverknüpfung
23a-konform, §22 Filter, §24 Excel/CSV-Export, §19 Leistungszeitraum/Wirtschaftsjahr). Details §12-P32.

## §0ah – v182: Tiefgarage Krefeld (07.07., 6. Sitzung)

**Datenmodell:** Objekt `tgkref` in `OBJEKTE` (`gruppe:'krefeld'`, `tiefgarage:true`,
`adresse:'Inrather Str. 181–185 / Wilmendyk 7–13'`), in `OBJ_MAP`, `DASH_GRUPPEN` (KR) und
`ZA_KONTEN` (kref) ergänzt. Neuer Store **`stellplaetze`** (keyPath `id`, Index `objektId`) in allen
6 Pflicht-Registrierungsorten; **DB_VER 31→32**. Record-Schema: `{id, objektId, nr, status, miete,
mieterId, mieterName, mietBeginn, sperrGrund, naechsteMiete:{ab,betrag,grund}, historie:[…], spSeeded}`.
TG-Mieter = regulärer `mieter`-Record mit `objektId=tgkref` + `_tgMieter:true` (Miete steht am
Stellplatz, nicht am Mieter).

**Stellplatzverwaltung** (`renderObjStellplaetze` + Modals): `ensureStellplaetze` legt bei Erstöffnung
65 Plätze an (SP 14 = 55 € laut Altvertrag, sonst 45 €), danach `tgSeedAnwenden`. Funktionen:
`modalSpZuordnen`/`saveSpZuordnung` (Wohnungsmieter Krefeld oder TG-Mieter), `modalNeuerTgMieter`/
`saveNeuerTgMieter`, `spFreigeben`, `modalSpSperren`/`saveSpSperre`/`spEntsperren` (gesperrt ≠
vermietbar), `modalSpMiete`/`saveSpMiete`, `modalSpHistorie`, `modalNeuerStellplatz`. Jede Änderung →
`spHistEintrag` (vollständige Nachvollziehbarkeit).

**Bankimport:** `zaSpNummern(zweck)` extrahiert SP-Nummern (Listen `,`/`+`/`/`/`und`; Leerzeichen
trennt bewusst NICHT, „- WE" beendet); 15 reale CSV-Muster als Test grün. `zaBuchungRecord` speichert
`spNummern`. `zaMatch(…, spIdx)` ordnet reine SP-Zahlungen über das SP-Register zu (`via:'sp'`).
`zaSollIst(…, spIdx)` rechnet bei Kombizahlungen den SP-Anteil heraus (gedeckelt auf Zahlbetrag) und
addiert SP-Soll aus dem Register. Import-Dropdown: „➕ Neuen TG-Mieter anlegen" → `zaZuordnenManuell`
Sonderzweig (legt `_tgMieter` an, hinterlegt SP am Platz).

**Erst-Belegung:** `TG_SP_SEED` (47 Plätze, aus Kontoauszug KRefeld 07/2026). `tgSeedAnwenden` matcht
Wohnungsmieter per WE-Nr. (Nachname als Tiebreak), legt echte Externe als TG-Mieter an (mit
`_importHinweis`), idempotent via `spSeeded`-Flag. Cezary Jarosik (WE 19 + SP 14/59) korrekt intern.

**Dokumente:** `tgMietvertragDrucken` (Dialog `modalTgMietvertrag`, Kaution/Schlüssel wählbar) – neuer
rechtssicherer Vertrag (§§ 535 ff., § 580a Abs. 1 Nr. 3 Kündigung, § 550 Schriftform, Trennung vom
Wohnraummietvertrag, E-Ladung, Umwelt/Sorgfalt, Haftungsbegrenzung, DSGVO Art. 13, Salvatorik).
`modalSpMieterhoehung`/`saveSpMieterhoehung` – Schreiben + Vormerkung `naechsteMiete`;
`spErhoehungenAnwenden` übernimmt fällige Erhöhungen bei Render UND beim App-Start. Beide Dokumente
landen im Mieter-Archiv (ohne Auto-Print-Script) und werden per `druckHTML(…, blobDruck=true)` gedruckt.

**Integration:** Dashboard-Objektkarte zeigt für TG Stellplatz-Belegung statt Mieterzahl
(`window._dashSpInfo`), TG-Mieter aus Mieterzählung ausgenommen (`!m._tgMieter`); TG-Objekt eigene
Tab-Struktur (kein Mieter/Protokoll/NKA/Zähler-Tab). `spIndexFuerGruppe` als gemeinsame Basis für
Matching und Soll-Ist. Backup/Export/Sync automatisch abgedeckt (Store in allen Listen). Bearbeiten
der TG-Mieter (Anschrift/IBAN) über Button in der Stellplatz-Zeile (`modalEditMieter`, generisch).

**QA:** `node --check` beide Script-Blöcke OK; Funktions-Diff v181→v182 = +25/0 (1201→1226); 14
TG-Logiktests (Soll-Ist-Aufteilung, Deckelung, Seed-Konsistenz) + 15 Parser-Tests grün; TG-Mietvertrag
als PDF gerendert und sichtgeprüft. **Offen:** Gerätetest; Stammdaten der 14 externen TG-Mieter;
optional TG-Fläche/Zähler falls später benötigt.

## §0ag – v181: 10 Feature-Punkte (5. Sitzung, Status beim Nutzer verifizieren)

OneDrive-Lösch-Erkennung (404-Check) + App-Löschbutton + Dubletten-Dedupe (`odDateienDedupe`,
`odDateiLoeschen`); Mängel-Namen einheitlich über `hauptmieterNachnamen`; pauschale 30-Min-Tagespause
(`ladePausePauschal`/`summeMinutenPauschal`, Einstellung `zeit_pause_pauschal`); Dashboard-Zählersuche
(`zaehlerSucheAusfuehren`/`zaehlerTrefferOeffnen`); Sicherheitsabfragen bei allen Löschfunktionen;
vollständige Namen „Alexander-Roland Nadig"/„Anna-Alexandra Pfau" + Startmigration
(`migriereBenutzernamenVoll`); „Administrator"→„Admin" (71 Stellen); Zähler-Diagramme (SVG,
`linienChartSVG`/`modalZaehlerKategorieChart`); Buchhaltung/Kontoimport (Ausgänge speichern,
Kategorien `BUCH_KATEGORIEN`, Split, Auswertung, Verlauf-Persistenz, NKA-Übernahme
`nkaBuchPanelToggle`). `APP_VERSION='2026-07-06-v181'`, Cache `nadigpfau-v181`, DB_VER 31. Diff
v180→v181 = +29/0. **Hinweis:** Diese Doku basiert auf der v181-Bausitzung; realer Deploy-/Testzustand
beim Nutzer bitte bestätigen.

**v180 – Code-Review + 6 Fixes (06.07., 4. Sitzung):** **H2 KRITISCH (behoben):** `settings`-Store
(enthält `backendKey`, `saEncKey`) wurde vollständig – ungefiltert – in `syncToOneDrive()` und
`exportBackup()` mitgeführt; UI versprach „nur lokal gespeichert". Neue Konstante `SETTINGS_GEHEIM`
filtert beide Pfade. **H1 (behoben):** `sendeMail`-Fallback in `send-token.js`/`selbstauskunft.js` war
stiller No-op – maskierte den bereits 4× aufgetretenen fehlenden-`mail.js`-Bug hinter `ok:true` ohne
Mailversand; wirft jetzt, zwei Mail-catch-Blöcke loggen zusätzlich. **M1 (behoben):** `odGraph()` ohne
Timeout → jetzt `fetchMitTimeout` (30 s). **N2 (behoben):** Invalid-Date-Guard `saveSitzungNachtrag`.
**K1 (NICHT gepatcht, bewusst):** Projekt-Kopie `leerstand.js` ist Prä-v158-Stand (fehlender
`verwaisteBlobsLoeschen`-Fix) – vor Deploy immer den Live-Stand verwenden. QA: `node --check` + ESLint
(0 Fehlerregeln verletzt) auf allen Dateien, Funktions-Diff v179→v180 = **0/0**, DB_VER 31 unverändert.
`APP_VERSION='2026-07-06-v180'`, CACHE `nadigpfau-v180`. Details §0af.

**v179 – Datei-Sync-Fixes nach v177-Gerätetest (06.07., DEPLOYT + GERÄTETEST BESTÄTIGT, Vorsitzung):**
v178 wurde 05.07. deployt (Obermenge v177…v173) und statisch vollverifiziert; v179 behebt drei am
PC-Gerätetest (v177) gefundene OneDrive-Datei-Sync-Defekte.

**v179 – Datei-Sync-Fixes nach v177-Gerätetest (06.07., DEPLOYT + GERÄTETEST BESTÄTIGT):** PC-Test
(Kauven, Mindener WE 8) fand: (a) manuell in `WE 8/Mietvertrag` abgelegter MV erschien nicht in der App –
Ursache: ⟳ im Mieter-Archiv rief den VOLL-Sync `syncDateibaum(true)` mit `catch(_){}` auf; der Voll-Walk
feuert >1000 Graph-Requests (odBaumAnlegen-Probe + Legacy-Standort-Zweige = die beobachtete 404-Flut) und
bricht abschnittsweise ab, Fehler wurden lautlos verschluckt; (b) App-Upload „Wohnungsgeberbescheinigung"
landete in `Sonstiges` – Typen `wgb` und `mieterhoehung` fehlten in `DOK_OD_KATEGORIE`; (c) dabei entdeckter
LATENTER DATENVERLUST-Bug: Upload-Zweig (b) in `syncDateibaum` prüfte den PUT nicht auf `__notfound`/`id`
(anders als `odPendingFlush`) → fehlgeschlagener Upload markierte den Record als hochgeladen UND löschte
`_blobB64`. **Fixes:** (P1) Map ergänzt (`wgb`→Mietbescheinigungen, `mieterhoehung`→Briefe); (P2) Guard im
Upload-Zweig (Record bleibt wartend, Blob erhalten); (P3) neue Funktion `odSyncWeDateien(gruppe,weNr)` –
gezielter Sync NUR der Blattordner einer WE (je Gebäude + Legacy, ~16 Requests), ⟳ nutzt sie und meldet
Fehler per Toast statt silent. QA: `node --check` beide Blöcke OK, Diff v178→v179 = **+1
(`odSyncWeDateien`)/0 verloren** (1170 Funktionen), DB_VER 31, `APP_VERSION='2026-07-06-v179'`, CACHE
`nadigpfau-v179`. **Gerätetest 06.07. grün:** MV aus `WE 8/Mietvertrag` erscheint nach ⟳; neuer
WGB-Upload landet in `WE 8/Mietbescheinigungen` → damit ist auch der v177-Upload-Pfad (`saveDok`→
`dokAuslagernRef`) real device-verifiziert (Öffnen/Teilen-Stichprobe noch offen). Details §0ae.

**v178-Verifikation (06.07., statisch + Rechtslage):** Alle 18 Objekte gegen die 57er-Liste geprüft –
Düsseldorf/Krefeld/Hilden 15 %, Monheim am Rhein 15 % (Präfix-Match), **Mönchengladbach 20 % KORREKT**
(MG ist laut Mieterbund NRW bewusst NICHT in der MietSchVO-Kulisse; Web-Recherche 06.07. bestätigt 57
Kommunen ab 01.03.2025, Kappung 15 % bis 28.02.2030, MPB bis 31.12.2029). Keine Umlaut-Falle: Liste und
`objektGemeinde` führen konsistent die Umlaut-Form (`düsseldorf`, `köln`, `rösrath` …).

**v178 – B3/V7 Kappungsgrenze an Gemeinde gebunden (05.07., 3. Sitzung, Risiko R12 GESCHLOSSEN):** Rechtslage
per Web-Recherche verifiziert (MHKBD NRW, kommunen.nrw, Haus & Grund): MietSchVO NRW seit 01.03.2025, 57 Kommunen;
**Kappungsgrenze 15 % bis 28.02.2030**; **Mietpreisbremse separat bis 31.12.2029 verlängert** (Bund Juli 2025,
NRW §3 Abs.2 S.1 MietSchVO nachgezogen). Neue Konstanten `MIETSCHVO_NRW_GEMEINDEN` (vollständige 57er-Liste,
normalisiert), `MIETSCHVO_KAPPUNG_BIS`, `MIETSCHVO_MPB_BIS`; neue Funktionen `objektGemeinde(obj)` (Ortsname aus
`obj.ort`) und `gemeindeInMietSchVO(obj)` (exakt ODER Wortpräfix, z. B. „Monheim am Rhein"→„monheim"; Fallback
ohne `ort`-Feld: alte Gruppenliste, Bestandsschutz). `kappungsgrenze()` und `mvObjektReguliert()` (steuert den
§-15-Mietpreisbremse-Block im MV-Generator, jetzt mit MPB-Laufzeitprüfung) nutzen die Gemeinde-Logik. **Zwei
behobene Live-Fehler:** (a) `verlach37` (Hilden, `gruppe:'mg'`) rechnete 20 % statt 15 % – Hilden steht auf der
57er-Liste; (b) `amboss10` (Düsseldorf, `gruppe:'pfau'`) fiel bei `mvObjektReguliert` durch → kein §-15-Hinweis
trotz Regulierung. QA: 16/16 Logiktests (Bugfix-Fälle, Laufzeitgrenzen 28.02./01.03.2030, Präfix-Match,
Fallbacks, Nicht-Listen-Gemeinde), `node --check` OK, Diff v177→v178 = **+2 (`objektGemeinde`,
`gemeindeInMietSchVO`)/0 verloren**, DB_VER 31, `APP_VERSION='2026-07-05-v178'`, CACHE `nadigpfau-v178`.
Details §0ad.
v175 ist deployt und der Stufe-2b-Gerätetest BESTÄTIGT (s. u.).

**Nutzer-Entscheidungen 05.07. (3. Sitzung):** (a) Ausweis-Erinnerungsfrist **60 Tage bestätigt**; (b) alter
OneDrive-Ordner `RT Duesseldorf` existiert noch – Migration der Alt-Dateien optional/später (Referenzen bleiben
öffenbar, Sync heilt Pfade); (c) Microsoft-365-Business: fachlich beraten (kein technischer Zwang, Art.-28-AVV-
Frage, empfohlen VOR Backfill; Umstellung = neuer Tenant + Datenumzug) – **Entscheidung offen beim Nutzer/Anwalt**.

**v177 – 23a-Verdrahtung `dokumente.data` (05.07., 3. Sitzung):** FÜNFTE Verdrahtung, heterogener Store mit
Typ-Filter. **Nur Datei-Uploads** werden ausgelagert (die 10-MB-Größentreiber): `saveDok` (alle Typen), Grundriss-
(`onWohnungGrundrissFile`, typ `plan`) und Wohnungsbild-Upload (`onWohnungsbildFile`). **Dauerhaft inline:**
`ausweis`/`lastschrift` (`DOK_INLINE_TYPEN`, Architektur-Entscheidung + v176-Löschworkflow) sowie generierte
HTML-Archivdokumente (`archiviereMieterDokument`/`-Aushang`: klein, Basis für späteren Portal-Push). Neuer Helper
`dokAuslagernRef(dok, dataUrl, weNr?)`: Typ-Gate, weNr-Auflösung über `dok.weNr` ODER Mieter-Record, Ziel via
`fotoZielFuer(…,'dokumente')` (knoten `auto`), Typ→Kategorie-Map `DOK_OD_KATEGORIE` (vertrag→Mietvertrag,
brief→Briefe, foto/wohnungsbild→Fotos, protokoll→Protokolle, abrechnung/nka→Rechnungen; NUR auf WE-Knoten,
Allgemein bleibt `Sonstiges`), MIME-Endung, bereinigter Dateiname; Fallback wie v164 (null ⇒ data inline).
Lesepfade dual-format über neuen zentralen Resolver `dokQuelle(d)` (data ODER `odDownloadUrl(ref.odId)`,
Thumb-Fallback): `openFoto`-'dok'-Zweig, `downloadDok`, `dokTeilen` (inkl. beider Download-Fallbacks);
Galerie-Thumbs (Grundriss/Plan/Wohnungsbild) via `fotoThumbQuelle(x.data||x.ref)`. `saveWohnungsbildBeschr`
kompatibel (schreibt Record mit ref unverändert zurück). QA: 11/11 Logiktests (Typ-Gates, weNr-Auflösung,
Kategorie-Map-WE-Bindung, PDF-Namensbau, dokQuelle-Fallbackkette), `node --check` OK, Diff v176→v177 = **+2
(`dokAuslagernRef`, `dokQuelle`)/0 verloren**, DB_VER 31, `APP_VERSION='2026-07-05-v177'`, CACHE `nadigpfau-v177`.
⚠️ Gerätetest empfohlen: Dokument-Upload → Datei in OneDrive, Anzeige/Download/Teilen OK. Details §0ac.

**v176 – Ausweis-Löschworkflow Stufe 1 (05.07., 3. Sitzung, §12-P24):** DSGVO-Löscherinnerung für Ausweiskopien
(Dokumenttyp `ausweis`; Art. 17 Abs. 1 lit. a DSGVO, § 20 PAuswG). Kandidaten-Kriterien in `ausweisLoeschKandidaten`:
(a) beim Mieter ist ein Mietvertrag archiviert (`typ==='vertrag'` → Identitätsprüfungs-Zweck erfüllt) ODER
(b) Upload älter als `AUSWEIS_ERINNERUNG_TAGE = 60`. **SEPA-Mandate (`lastschrift`) bewusst AUSGENOMMEN**
(Nachweispflicht während Mandatslaufzeit). UI: Dashboard-Warnkarte (nur `istVerwalter`, Muster Backup-Warnung)
→ `modalAusweisLoeschen` mit Einzel-/Sammel-Löschung über `deleteMitTombstone` (geräteübergreifend, kein stilles
Auto-Löschen = Stufe 1); `mvErzeugen`-Abschluss-Toast weist auf löschbare Ausweiskopien des neuen Mieters hin.
Neuer toleranter Zeitparser `parseErstelltMs` (dokumente.erstellt liegt historisch als de-DE-Locale-String vor);
**Testbefund behoben:** de-DE-Muster muss VOR `Date.parse` greifen, sonst US-Deutung „5.3." = 3. Mai. Doku:
`Loesch_und_Aufbewahrungskonzept_v1_1.docx` um App-Zeilen Ausweiskopien + SEPA-Mandate ergänzt. QA: 9/9 Logiktests,
`node --check` OK, Diff v175→v176 = **+5** (`parseErstelltMs`, `ausweisLoeschKandidaten`, `modalAusweisLoeschen`,
`ausweisLoeschen`, `ausweisAlleLoeschen`)/0 verloren, DB_VER 31, `APP_VERSION='2026-07-05-v176'`, CACHE
`nadigpfau-v176`. Details §0ab.

**v175-Vorstand:** v175 fertig (Obermenge v174/v173 – ein Deploy genügt).
v172 ist deployt; Ventil-Gerätetest BESTÄTIGT → die gesamte OneDrive-Kette ist real verifiziert (v164-Gate erfüllt).

**v175 – protokolle Stufe 2b (05.07., 3. Sitzung):** Neue Protokollfotos (Raum/Bauteil/Zähler in `savePhoto`-Pfaden)
werden beim Erfassen per `protoFotoAuslagern` (Ziel via `fotoZielFuer(PD.objektId, PD.weNr, 'protokolle')`, Datei
`protokoll_<slot>_<uid>.jpg`) nach OneDrive ausgelagert. Bei Erfolg: Referenz `{ref,odId,…}` im Protokoll-Record
(`PD.raeume[*].photos` / `condPhotos` / `zaehler[*].foto`) UND im `fotos`-Store (`ref` statt `data`) → **kein
doppeltes Inline-Base64 mehr für Neuaufnahmen** (der 20-MB-Haupttreiber, §0q-Befund). Fallback: `null` ⇒ dataURL
doppelt inline exakt wie bisher, kein Datenverlust. Anzeige dual-format (`fotoThumbQuelle` Zähler-Thumb + Grids,
`fotoImgTag` Übersicht), `restoreFotosForPD` stellt `data` ODER `ref` wieder her, Mangel-Übernahme dedupliziert
via `odId` (`_enthaelt`). Druck/PDF unverändert über `fotoDruckQuelle` (v166-Rehydrierung). **DSGVO-Gate erfüllt:**
`Verzeichnis_Auftragsverarbeiter_v1_1.docx` dokumentiert Microsoft (OneDrive/Graph) als Auftragsverarbeiter inkl.
Hinweis OneDrive Personal (Consumer, kein DPA) vs. Microsoft-365-Business-Empfehlung VOR Backfill; dazu TOM v1.1 +
VVT v1.1. QA (nachgeholt 3. Sitzung): `node --check` beide Blöcke OK, Diff v174→v175 = **+1 (`protoFotoAuslagern`)/
0 verloren**, Stufe-2b-Kernpunkte codegeprüft (3× `wert = odRef || data`, 3× ref/data-idbPut, dual-format-Restore,
odId-Dedup). DB_VER 31, `APP_VERSION='2026-07-05-v175'`, CACHE `nadigpfau-v175`. **Gerätetest BESTÄTIGT (05.07., 16:46 Uhr,
Nutzer-Screenshot):** 3 Raumfotos + 1 Zählerfoto liegen in OneDrive unter `Mindener Straße 23 und 25/WE 1/Protokolle`
– v173-Gebäudestruktur + Stufe-2b-Schreibpfad real verifiziert. Details §0aa.

**v174 – objekt_stamm-Verdrahtung (05.07., 2. Sitzung):** Vierte 23a-Verdrahtung, erster **pdfWebsite-Store**.
Schreibpfad `saveWohnungHeizNk`: neue dataURLs (Wohnungsfotos, max. 8, + Grundriss) → `fotoAuslagern` (Kategorie
„Fotos", `WE <n>`, Gebäudeebene aus v173); Referenzen/Alt-Strings unverändert, Upload-Fehler → dataURL bleibt inline
(Fallback wie v164). Anzeige dual-format: Modal-Galerie (`renderWhFotoGalerie`) + Aushang-Auswahlkacheln
(`modalAushangErstellen`) via `fotoThumbQuelle`. **Aushang/Homepage:** `aushangErzeugen` rehydriert die gewählten
Bilder via `fotoDruckQuelle` (immer echte dataURL, Fallback Thumbnail) VOR Galerie-HTML **und** `leerstandPushen` –
**Analyse-Korrektur:** der geplante „Blob-Push-Endpunkt" ist NICHT nötig, `/api/leerstand` (leerstand.js) akzeptiert
Base64 und lädt selbst nach Azure Blob (`bildHochladen`), Blob-URLs bleiben öffentlich. Zusatz-Verschlankung:
`homepage_leerstand`-Vormerkung speichert statt Base64 nur `fotos:<Anzahl>` + `grundriss:<bool>` (verifiziert: nur
Schalter-Vorbelegung + Entfernen-Logik lesen den Record, nie die Bilder). 13/13 Logiktests, `node --check` beide
Blöcke OK, Diff 0/0 (1110 Funktionen), DB_VER 31, `APP_VERSION='2026-07-05-v174'`, CACHE `nadigpfau-v174`. Details §0z.

**v173 – Ordnerstruktur Düsseldorf (Nutzerwunsch 05.07.):** Standort-Ordner heißt „Düsseldorf" (LABEL geändert);
`OD_GEBAEUDE_ALIAS` legt `mind23`+`mind25` in EINEN Gebäudeordner „Mindener Straße 23 und 25" (WE 1–20, durchgängige
Nummerierung) und benennt `ruhrt41` → „Ruhrtalstraße". Neuer Helper `odGebaeudeListe(st,mieterAlle)` liefert je Standort
die Gebäude mit VEREINTEN WEs (Alias = mehrere Objekte je Ordner) und wird in `odBaumAnlegen`, `syncDateibaum` (Zweige
dadurch dedupliziert) und Browser-Ebene 3 (WE-Liste, ersetzt `gebOid`-Einzelobjekt) genutzt. Zusatz-Robustheit:
`syncDateibaum` matcht Remote-Dateien zusätzlich über `odItemId` (`bekanntById`) → nach manueller Umbenennung/
Verschiebung auf OneDrive werden Records GEHEILT (pfad aktualisiert) statt dupliziert. 14/14 Logiktests, `node --check`
OK, Diff v172→v173 = +1 (`odGebaeudeListe`)/0 verloren, DB_VER 31. Details §0y.

**⚠️ Manueller OneDrive-Schritt nach v173-Deploy (empfohlen, VOR dem nächsten Datei-Sync):** In OneDrive
`Objekte/RT Duesseldorf` → `Düsseldorf` umbenennen; darin `Ruhrtalstr. 41` → `Ruhrtalstraße`; `Mindener Str. 23` →
`Mindener Straße 23 und 25` umbenennen und den Inhalt von `Mindener Str. 25` hineinverschieben (leeren Ordner löschen).
Graph-Item-IDs überleben Umbenennen/Verschieben → alle bestehenden Referenzen (u. a. Ventil-Foto) funktionieren weiter;
der nächste Sync aktualisiert die Record-Pfade dank `odItemId`-Heilung. Alternativ ohne manuellen Schritt: App legt den
neuen Baum parallel an, Alt-Dateien bleiben per Referenz (odItemId) öffenbar, erscheinen aber nicht mehr im Browser.

**Architektur-Entscheidungen dieser Sitzung (für §12, noch NICHT umgesetzt):**
- **Mieterportal-Dokumente (ex „Fallstrick 1"):** Auslieferung ans Portal erfolgt künftig per **Push-Prinzip** – bei
  Freigabe rehydriert das Admin-Gerät das Dokument (inline-dataURL ODER OneDrive-Referenz via `odDownloadUrl`) zu Bytes
  und pusht es an einen Backend-Endpunkt → privater **Azure-Blob-Container** + Metadaten in Table; das Portal liefert
  per tokengeprüfter Function (Stream oder kurzlebige SAS-URL). Damit muss das Portal NIE OneDrive-Referenzen auflösen
  → `dokumente.data` darf gefahrlos ausgelagert werden. Gleiches Muster deckt `objekt_stamm`-Website-Fotos ab.
- **Ausweis-/SEPA-Dokumente (DSGVO):** Typen `ausweis`/`lastschrift` werden von der OneDrive-Auslagerung DAUERHAFT
  ausgeschlossen (bleiben inline; selten + kurzlebig). Stufe 1: Auto-Lösch-Workflow (Löschangebot bei MV-Erstellung +
  tägliche Alters-Prüfung mit Erinnerung, Eintrag ins Löschkonzept). Stufe 2 (optional): AES-256-GCM at rest mit
  PIN-gebundenem Schlüssel-Wrapping je Admin (WebCrypto). Anwaltliche Prüfung des Gesamtkonzepts empfohlen.

## §0-Archiv: Konservierte Einzelbefunde (aus Alt-Schnellüberblick 06.07., migriert 10.07.)

Zeilen, die sonst nirgends in dieser Datei stehen – unsortierter Alt-Sitzungsverlauf,
nur zum Nachschlagen (aktuelle Wahrheit: Schnellüberblick + ⚑ + §-Abschnitte oben):

**Unmittelbare nächste Schritte (Stand 06.07.):** (0) v176-Gerätetest offen (Dashboard-Warnkarte
Ausweis-Löschung, `modalAusweisLoeschen`); v177-Öffnen/Teilen-Stichprobe offen; Website-Deploy-Status
(R21-Code vom 02.07.) unbestätigt. Danach: OneDrive-Alt-Ordner `RT Duesseldorf` aufräumen (optional,
PC-Minutenaufgabe), PII-Bereinigung Projektspeicher (§12-P17/R19), A2-PIN-Migration je Gerät (§12-P16),
Microsoft-365-Entscheidung VOR 23a-Backfill. Historie: (1) ~~Deploy v175~~ + ~~Gerätetest v175~~ **ERLEDIGT/BESTÄTIGT 05.07.**
(Screenshot: Fotos in `Mindener Straße 23 und 25/WE 1/Protokolle`); manueller OneDrive-Schritt Düsseldorf nur noch
optional (Alt-Dateien aus `RT Duesseldorf` in neue Gebäudeordner verschieben, leere Alt-Ordner löschen, dann App-Sync);
(2) ~~Ausweis-Löschworkflow Stufe 1~~ **ERLEDIGT v176** (§0ab);
(3) ~~`dokumente.data`-Verdrahtung~~ **ERLEDIGT v177** (§0ac; nur Datei-Uploads, ausweis/lastschrift + HTML-Archive
bleiben inline; Portal-Auslieferung existiert backend-seitig noch nicht → gefahrlos, später Push-Prinzip);
(4) Backfill Bestands-Base64 – **davor** Microsoft-365-Business-Frage klären (OneDrive Personal ohne DPA, s. AVV v1.1);
(5) ~~inbox-sa-Fehlertext~~ **WAR BEREITS ERLEDIGT** (Fix 01.07. §0f, Backend-Deploy 02.07. bestätigt – SA-Paket-1
damit VOLLSTÄNDIG abgeschlossen; Schnellüberblick war veraltet).
**Doku-Einarbeitung 05.07.:** Snapshot `DSGVO_memory.md` (Website-DSGVO-Arbeitschat) gegen den Bestand geprüft.
Fünf echte Neu-Punkte in **§0k** übernommen (konkrete AVV-Stände Cloudflare 6.4 / IONOS 1.3 + Subunternehmer;
DSB nicht bestellt; eigene TOM-Lücken; Löschfristen-Begründung + LDI NRW; Datenminimierung Selbstauskunft),
GbR-Vertretung/DSB in **R20** ergänzt. Rest war redundant oder veraltet (SMS = R21 erledigt). `DSGVO_memory.md`
gilt als aufgelöste Dublette (§14) – kein zweites Gedächtnis-File.
**Stand Vorsitzung (04.07., 2. Sitzung):** **v172 (Obermenge v169–v172).**
Anlass der Sitzung: Live-Befunde am deployten v168 (DevTools-Screenshot). Vier Schritte am 04.07.:
**v169 – Code-Aufräumung:** abgelöstes Filter-/Such-Toolkit (isolierter toter Parallelstrang: `filterState`, `searchBar`, `filterChips`, `highlightQ`, `updateMieterFilter`, `renderTodoList/-MangelList/-ReparaturList`, 7× `set*Filter`/`filter*`) ersatzlos entfernt – Render-Ziele `#todos-list`/`#mangel-list`/`#rep-list` existierten im Markup nicht, Live-Filterung läuft über `_aufFilter`. −130 Zeilen, −14 Funktionen, 0 Rest-Referenzen. Bewusst erhalten: `kappungsObergrenze` (§ 558 Abs. 3 BGB), QR-Druck-Cluster (pausiertes Feature), `deleteSignaturLinie`/`onPortalTypToggle`/`parseMieterNamen` (offene TODOs). Details §0u.
**v170 – Freitextsuche Aufgaben/Mängel:** Suchfeld in `renderAufgaben`, `aufSuche`/`aufSucheAnwenden` blenden gerenderte Karten des aktiven Tabs ein/aus (kein Re-Render → kein Fokusverlust), Query in `_aufFilter.q`, Trefferlos-Hinweis. 10/10 jsdom-Tests. Details §0v.
**v171 – Dashboard-Fix + Dokumente teilen:** „Letzte Protokolle“ sortiert nach Protokoll-`datum` (Fallback `erstellt`; Befund: Mendolia 03.07. fehlte). Teilen-Button in der zentralen Druckvorschau (`druckVorschauTeilen`) – deckt ALLE Druckdokumente ab (Protokoll, MV, Mietbescheinigung, WGB, Brief, Kautionsquittung): teilt selbst-enthaltendes HTML via `navigator.share` (WhatsApp/Mail), Fallback Download. Grenze: HTML, kein PDF (kein HTML→PDF-Renderer im Client; Druck→PDF bleibt der PDF-Weg). Details §0w.
**v172 – Ordner pro Gebäude + Foto-Robustheit:** Baum neu `Objekte/<Standort>/<Gebäude>/<Allgemein|WE n>/<Kategorie>` – behebt standortweite WE-Kollision (Befund: „nur 20 WEs im RT-Ordner, Mindener fehlt“); WEs je Gebäude inkl. Leerstand via `alleWeVonObjekt`. Alt-Standort-Ebene bleibt lesbar (Legacy-Zweige im Sync, Browser-Eintrag „Standort-Ebene (Alt-Dateien)“, dort kein Upload). **Foto-Fix (Ventil-Befund, Ursache belegt):** Upload war nur „pending“ (Vollwalk `syncDateibaum` brach ab, bevor der Upload dran war) → neu `odPendingFlush()` lädt gezielt nur wartende Dateien (`odEnsureFolder`+PUT, idempotent), `odDateiHochladen` ruft Flush statt Vollwalk; `odDownloadUrl` zeigt pending-Dateien aus lokalem `_blobB64` und stößt den Flush an (**Selbstheilung des Ventil-Fotos beim nächsten Öffnen auf dem Aufnahme-Gerät**). Details §0x.
**QA gesamt:** `node --check` beide Script-Blöcke OK; Funktions-Diff v168→v172 ganze Datei **1169→1160** (−14 gezielt / +5 geplant: `aufSuche`, `aufSucheAnwenden`, `druckVorschauTeilen`, `odGebaeudeName`, `odPendingFlush`; 0 ungewollt); Pfad-Logiktests 3/3. Keine Store-/DB-Änderung (DB_VER 31). `APP_VERSION='2026-07-04-v172'`, `sw.js`-CACHE `nadigpfau-v172`. **Ein Deploy genügt.**
**Nach Deploy:** (1) Ventil-Foto am Handy öffnen → Anzeige sofort, Upload läuft nach. (2) Datei-Browser einmal „Synchronisieren“ → Gebäude-Baum wird angelegt. (3) Neues Mangel-Foto → landet unter `<Gebäude>/WE n/…`. **TODO:** Alt-Dateien-Migration in Gebäude-Ordner (manuell/später); Graph-Call-Volumen des Vollwalks bei ~16 Gebäuden beobachten.
**Stand Vorsitzung:** **v168 fertig, Deploy durch Nutzer ausstehend.** §12-P23 Schritt **23a – dritte
Verdrahtung, Foto-Stores `maengel.fotos` + `aufgaben.fotos`** (additiv, Fallback-gesichert, **kein Datenverlust**).
Gemeinsamer Editor `saveEditMangel(id, store)` lagert neue Fotos aus (beide Stores in einem Eingriff); drei
Anzeige-Stellen dual-format; **latente v164-Lücke geschlossen** (Referenz aus Ventil-Defekt in `maengel.fotos` hätte
die String-only-Anzeige gebrochen). Zuvor v167 = `reparaturen.rechnung` (additiv, Fallback-gesichert, kein Datenverlust).
Nutzer konnte v164–166 noch nicht am Gerät testen; deshalb wurde der **nächste isolierte, testunabhängige
Schreibpfad** vorgezogen (zweites v164-Muster: Auslagern beim Speichern, dataURL bleibt bei Fehler inline).
Verdrahtete Stelle: Reparatur-Rechnungsbeleg → OneDrive „Rechnungen", Referenz statt Base64; Anzeige (Liste +
Detail) dual-format, Alt-Zweig bit-identisch. **Offen bleibt das Test-Gate für den datenverlustkritischen Schritt
`protokolle` Stufe 2b** (inline-Kopien entfernen) – erst **nach** erfolgreichem v164-Ventil-Gerätetest + einer
verifizierten `reparaturen`-Rechnungs-Auslagerung. Reihenfolge weiter: `dokumente.data` → `maengel/aufgaben.fotos`
→ (mit Gate) `protokolle` → `objekt_stamm` (Website-Blob), dann Backfill Bestands-Base64.
**v166-Umbau (Stufe 2a):** Neue Funktion `fotoDruckQuelle(x)` löst eine Foto-Referenz für die Canvas-/PDF-
Einbettung **immer zu einer echten dataURL** auf (`odDownloadUrl`→`fetch`→Blob→`blobZuDataUrl`), statt einer
cross-origin OneDrive-URL, die `compressImg`/Canvas „tainten" (→ `toDataURL` wirft `SecurityError`) würde.
`printProtHTML` nutzt jetzt `fotoDruckQuelle` statt `fotoQuelle` an den drei Foto-Schleifen; bei reinen
Strings (heutiger Fall) identisch. Zusätzlich zentraler Helfer `blobZuDataUrl(blob)` (Promise; bisher gab es
nur verstreute inline-FileReader). CSP `connect-src` deckt die OneDrive-Download-Domains bereits ab
(`*.sharepoint.com`/`*.up.1drv.com`/`*.microsoftpersonalcontent.com`). +2 Funktionen (1168→1170), `node --check`
OK, 7/7 Logiktests grün. Detailabschnitt §0r.
**v165-Umbau (Stufe 1):** Die Protokoll-PDF-Erzeugung `printProtHTML` liest Fotos nicht mehr direkt aus den
inline-Arrays, sondern über zwei neue Resolver `protoFotoWerte(inlineArr,idArr)` und `protoZaehlerFotoWert(z)`.
Diese bevorzugen die vorhandenen inline-dataURLs (**heute immer gefüllt → Ausgabe bit-genau wie bisher**) und
fallen sonst über die `photoIds`/`condPhotoIds`/`fotoId` in den `fotos`-Store zurück (Alt-`data` **oder**
ausgelagerte `ref`, dual-format). Damit muss in **Stufe 2** (inline-Duplikate entfernen + Schreibpfad
auslagern) nur noch der Resolver + der Schreibpfad geändert werden, nicht die Druck-/Anzeige-Templates.
Analyse-Kernbefund: Protokollfotos liegen **doppelt** (inline im Protokoll-Record **und** im synchronisierten
`fotos`-Store) → das ist der eigentliche 20-MB-Treiber; `FOTO_FELDER.protokolle=['fotos']` ist inhaltlich
falsch (Fotos sind verschachtelt: `raeume[*].photos`/`condPhotos[cond]`/`zaehler[*].foto`) und wird in Stufe 2
durch den store-spezifischen Pfad ersetzt. +2 Funktionen (1166→1168), `node --check` OK, 8/8 Logiktests grün.
`APP_VERSION='2026-07-04-v165'`, `sw.js`-CACHE `nadigpfau-v165`. Obermenge v164/v163/v162/v161. Detailabschnitt §0q.
**v164-Umbau:** Ventilfoto wird beim Speichern (`ventilPruefungSpeichern`) per `fotoAuslagern` nach OneDrive
ausgelagert; die Referenz landet in `ventilpruefung.foto` **und** (bei Defekt) `maengel.fotos` – dieselbe Datei,
zwei Zuordnungen. Anzeige dual-format über neuen Helper `fotoImgTag` (Alt-dataURL **und** Referenz). Ziel-
Auflösung `fotoZielFuer(objektId,weNr,store)` aus `FOTO_FELDER`+`odStandorte`. **Defensiver Fallback:** liefert
`fotoAuslagern` `null` (kein OneDrive/Fehler/kein Ziel), bleibt die dataURL inline → Speichern & Anzeige wie
bisher, **keine Regression, kein Datenverlust**. +2 Funktionen (1164→1166), `node --check` OK.
`APP_VERSION='2026-07-04-v164'`, `sw.js`-CACHE `nadigpfau-v164`. Detailabschnitt §0p.
> ⚠️ **Analyse-Erkenntnis dieser Sitzung (korrigiert frühere Pilot-Empfehlung):** `objekt_stamm.fotos`/
> `grundriss` sind **nicht** isoliert – sie fließen in `modalAushangErstellen`/`aushangErzeugen`, also in die
> **Aushang-PDF und den Website-Leerstand** (`homepage_leerstand`). Dieser Pfad braucht die dataURL **synchron**
> (PDF-Einbettung) und für die Website **Azure Blob** (öffentlich, kein OneDrive). `objekt_stamm` deshalb als
> Pilot verworfen; `FOTO_FELDER` um Flag **`pdfWebsite`** ergänzt (protokolle/objekt_stamm = true → erst nach
> Rehydrierungs-/Blob-Lösung verdrahten). Pilot auf **`ventilpruefung`** revidiert (maximal isoliert, nur
> Bildschirm-Anzeige) – idealer erster Integrationstest der OneDrive-Kette.
> ⚠️ **Gerätetest ist das Freigabe-Gate für v164:** OneDrive anmelden → Ventilprüfung mit Foto speichern →
> Datei erscheint in `NadigPfau/Objekte/<Standort>/Allgemein/Sonstiges` → Ventil-Historie zeigt Vorschau,
> Klick öffnet Vollbild → Sync auf Zweitgerät. Bei Problemen greift der Fallback (dataURL bleibt). Erst nach
> erfolgreichem Test die nächsten Stores verdrahten.
> **Nächste Verdrahtungsreihenfolge (revidiert, isoliert zuerst):** `reparaturen.rechnung` → `dokumente.data`
> → `maengel/aufgaben.fotos`; **dann** die pdfWebsite-Stores `protokolle` (mit PDF-Rehydrierung) und
> `objekt_stamm` (mit Website-Blob). Danach Backfill der Bestands-Base64. Details `Konzept_23a` §8.
**Vorherige Schritte (ebenfalls Deploy-ausstehend, in v164 enthalten):** v163 = 23a-Fundament (§0o);
v162 = 23c Kategorie-Ordner (§0n); v161 = 2 Sofort-Fixes (§0m).
> **Deploy-Hinweis:** v164 ist Obermenge von v163/v162/v161 – **ein** Deploy (v164) genügt. App 5 Dateien:
> `index-v164.html`→`index.html`, `sw.js`-CACHE `nadigpfau-v164`, `manifest.json`+Icons unverändert.
> ⚠️ v164 löst erstmals **echte OneDrive-Uploads** aus – nach Deploy den Ventil-Foto-Test durchführen.
**Zusatz v160 – 2 Krefeld-Datenkorrekturen** (separates Merge-Import-JSON `immo_korrektur_krefeld_2026-07-02.json`):
Prüter WE3 Anrede „Herr"→„Frau" (inkl. `personen_liste` für Spiegel-Logik), Ferfers WE1 Kontoinhaber-Tippfehler.
Abweichender Kontoinhaber „Prüfer Roland" bei Prüter bewusst UNVERÄNDERT (mögliche reale SEPA-Konstellation).
**Krefeld-Datenimport (02.07., 4. Sitzung):** 70 Krefeld-Mieter (Inrather Str. 181/183/185, Wilmendyk 7/9/11/13)
aus Mieterliste ergänzt: Kleinreparatur (`krKlausel`/`krHoehe`/`krProzent`/`krMaxEuro`), Renoviert-Status
(`uebergabe`), Vertragsmodell, letzte Mieterhöhung (`mieteSeitISO`). Import-JSON `immo_import_krefeld_2026-07-02.json`
(Backup-Format, nur geänderte Mieter) → Import-Modus **„Zusammenführen"**. Miete/NK/Fläche stimmten bereits
(nur WE54-Leerstand auf Angebotsmiete 565/160 angeglichen, Nutzerfreigabe). Kleinreparatur-Doppelgrenze
(Einzelbetrag + Jahresdeckel) entspricht BGH-Wirksamkeitsanforderung.
**Zuletzt erledigt (02.07., 5. Sitzung – DSGVO-Website-Code-Umsetzung, autonom):**
Die im DSGVO-Prüfprotokoll als „Erledigt" dokumentierten, im Website-Code aber noch **nicht vollzogenen**
Korrekturen umgesetzt (`index_website.html` → Outputs `index.html`, deploybereit Cloudflare):
- **SMS-Kanal deaktiviert** (Prüfprotokoll: „kein Einsatz, Option sollte deaktiviert werden"): SMS-Option
  aus `p_kanal`-Dropdown entfernt, Hinweistext auf reinen E-Mail-Versand reduziert, tote `kanal==='sms'`-
  Verzweigung in `codeAnfordern()` bereinigt.
- **Kontaktformular-Einwilligung korrigiert** (Prüfprotokoll: „doppelte Rechtsgrundlage korrigiert"):
  Einwilligungs-Checkbox `k_dsgvo` durch sachlichen Art.-13-Datenschutzhinweis mit Link auf `mDatenschutz`
  ersetzt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b/f DSGVO (lt. Datenschutzerklärung §4) – **keine**
  Einwilligung; die Scheineinwilligung neben tragfähiger Rechtsgrundlage ist damit beseitigt. `sendeKontakt()`:
  `!ok`-Blockade + `datenschutz:true`-Payloadfeld + Checkbox-Reset entfernt.
- Geprüft: `node --check` OK, keine Rest-Referenzen auf `k_dsgvo`/`sms`, `mDatenschutz`-Modal + `noindex`
  vorhanden. **Deploy durch Nutzer ausstehend** (Website-`index.html`).
- ⚠️ Nicht autonom entscheidbar (Alexander/Anwalt): **R20** Verantwortlicher-Identität (dreifach uneinheitlich),
  **R19** PII-Import-JSONs löschen, **R14(b)** anwaltlicher Datenschutz-Volltext. Siehe §11.
**Zuletzt erledigt (02.07., 6. Sitzung – Doku-Konsolidierung, kein Code):**
Dokumentationsabgleich nachgezogen, nachdem die R21-Website-Korrekturen (5. Sitzung) erledigt, in der
Doku aber noch als „offen" geführt waren: **§12 Punkt 21** auf „Code erledigt, anwaltliche Endprüfung
offen" gesetzt; **§0k** um präzisen R21-Umsetzungsvermerk ergänzt (Codestellen, Rechtsgrundlagebezug);
**§11 R21** auf erledigt (`~~R21~~`, Deploy ausstehend). Kein zweiter §0k angelegt (bestehenden erweitert).
Strukturvalidierung OK (Codefences ausgeglichen, keine Doppelüberschrift, keine defekten Tabellenzeilen).
Klarstellung „Index-Nr.": aktuelle Hauptdatei = `index-v159.html`, `APP_VERSION='2026-07-02-v159'`,
`sw.js`-CACHE `nadigpfau-v159`, DB_VER 31; IndexedDB-Store-Indizes vollständig/sauber (keine fehlende Nr.).
**► Unmittelbare nächste Schritte (für neuen Chat):**
1. **Deploy v161** (Nutzer): App 5 Dateien (`index-v161.html`→`index.html`, `sw.js`-CACHE `nadigpfau-v161`,
   Manifest+Icons unverändert). Danach Krefeld-Import `immo_import_krefeld_2026-07-02.json` → „Zusammenführen",
   anschließend Korrektur-JSON `immo_korrektur_krefeld_2026-07-02.json` → „Zusammenführen".
2. **Deploy Website** (Nutzer): Outputs `index.html` (R21-bereinigt) → Cloudflare Pages (`zip -j`).
3. **R20 Verantwortlicher klären** (Nutzer/Anwalt) – Launch-Blocker, dreifach uneinheitlich.
4. **R19 PII-Datenminimierung** (Nutzer): Import-JSONs + Backup nach Import aus Projektspeicher entfernen.
5. **R14(b) Datenschutz-Volltext** (Anwalt) ins `mDatenschutz`-Modal (aktuell Kurzhinweis).
6. Autonom als eigene Sitzung möglich (Quelldateien vorhanden): **inbox-sa Fehlertext** → `{ok:false}`
   reduzieren (letzter SA-Paket-1-Restpunkt).
**Zuletzt erledigt (02.07., 3. Sitzung – Code-Review-Abarbeitung, alle deployt):**
- **A1 (`leerstand.js`, HOCH):** Foto-Verlust behoben – POST löscht nur noch **verwaiste** Blobs;
  behaltene Foto-URLs + behaltener Grundriss bleiben immer erhalten. **v152-Härtung reintegriert**
  (Projektkopie war Vor-v152-Stand): MIME-Whitelist JPEG/PNG/WebP + 8-MB-Limit, exakter Fehlertext.
- **A2 (PINs, HOCH):** Login-PINs nicht mehr im Klartext. `pinHash`/`pinPruefen`/`pinSetzen`
  (SHA-256+Salt, WebCrypto). `tryLogin` migriert Alt-PINs beim ersten Login (löscht Klartext `pin` +
  Tombstone `_geleert.pin`). ⚠️ Jedes aktive Gerät muss sich einmal einloggen, damit der Klartext-PIN
  geräteübergreifend verschwindet. PIN bleibt für den Nutzer unverändert.
- **A3 (Website, HOCH):** `esc()`+`'` (`&#39;`); SA-Button `data-idx` + delegierter Listener statt
  Inline-`onclick`-Interpolation.
- **A4 (Website, HOCH):** `noindex, nofollow` im `<head>` (Pre-Launch; vor Launch entfernen).
- **B1/C1 (`selbstauskunft.js`):** Payload-Limit 40 kB + E-Mail-/Namenslängen-Prüfung; `inbox-sa`-Filter
- **B2:** `istEmail` in `send-token`; atomarer Token-Verbrauch (etag) → paralleler Zweit-Submit 409.
- **B3:** Keine internen Fehlerdetails mehr in Backend-Responses (`{ok:false}`).
- **B4:** `fetchMitTimeout` (AbortController 15 s) in 22 Netzwerk-fetches.
- **B5 (`sw.js`):** Offline-Cache-Miss → kontrollierte 503/504 statt `undefined`.
- **B6:** users-Map in 4 Signatur-Schleifen. **B7:** `jsonSicher` (2 Import-Stellen).
- **B8:** `stoppeHintergrundTimer()` bei Logout (Mail-Poller + 4-h-Fälligkeitstimer + Stempeltimer).
- **Tests:** `tests/backend.test.mjs` (21 grün); PIN-Hash-Logik 8/8.
**Unmittelbar offen (nächste Schritte):**
1. **A2-Migration je Gerät:** Jedes aktive Gerät einmal einloggen → Klartext-`pin` wird durch Hash
   ersetzt und der Tombstone propagiert. Danach im Backup prüfen, dass kein `pin`-Klartext mehr auftaucht.
2. **A1-Verifikation am Live-System:** Leerstand mit 2 Fotos → 3. Foto ergänzen → GET liefert **3** URLs,
   die ersten beiden weiter per HTTP 200 abrufbar (bestätigt den Foto-Verlust-Fix).
3. **Token-Doppel-Submit-Test:** zweimal dieselbe Selbstauskunft absenden → zweiter Versuch 409.
4. **R19 (Nutzer-Aktion):** PII-Import-JSONs (`IBAN_Import_*`, `Amboss_Mieter_*`, `Mieterwechsel_[G.]_*`)
   + Backup nach erfolgtem Import aus dem Projektspeicher entfernen (Datenminimierung, Art. 5 DSGVO).
5. Grbavac-Tombstone-Workflow (v157); Unterschriftslinie je Admin neu festlegen (v153); Praxistest
   Kautionsquittung (v156); Anschreiben Krefeld Platzhalter füllen (v157/§0h).
6. **Optional (R16-Rest):** PIN-Länge 6 freigeben (Feld erlaubt bereits 6) – reine Komfortsperre.
**Weiter im Fahrplan offen:** Aushang Etappe 3, `/api/upload` Foto-Upload, Mietbescheinigung-PDF-Versand
(Backend-Weg), R11 CSP `unsafe-inline`, R12 Kappungsgrenze, Custom Domain, Website-Launch. ⚑ / §11.
**Wichtige Entscheidungen dieser Sitzung:** PIN als SHA-256+Salt (Komfortsperre, keine starke Auth –
4–6-stellig bleibt brute-force-bar, schützt aber vor Klartext-Funden in Backup/OneDrive/Azure);
Website-Handler auf Event-Delegation (kein Inline-onclick mit String-Interpolation); v152-Härtung in
`leerstand.js` bewusst reintegriert, da Projektkopie veralteter Vor-v152-Stand war.
**Befund App-DSGVO:** `Datenschutzhinweis_DSGVO.pdf` ist real ein ZIP (Bild+Text), inhaltlich sauber, aber auf
laufendes Mietverhältnis zugeschnitten → nicht 1:1 für die Website nutzbar (§0f).

## §0af. v180 – Vollständiger Code-Review + 6 Fixes (06.07.2026, 4. Sitzung)

**Anlass:** Nutzerauftrag „vollständiger, professioneller Code-Review" nach festem Prozess
(Projektanalyse → Fehler/Sicherheit/Codequalität/Performance → konkrete Fixes mit Priorität →
Umsetzung statt nur Analyse → priorisierte Abschluss-Roadmap).

**Prüfumfang:** `index-v179.html` (28.873 Zeilen, 2 Script-Blöcke, 1170 Funktionen), 7 Azure-Function-
Dateien, `sw.js`, `manifest.json`, `index_website.html`. Werkzeuge: `node --check` (alle Dateien),
ESLint 8 (Fehlerregeln `no-dupe-keys`/`no-unreachable`/`no-fallthrough`/`use-isnan`/`valid-typeof`/
`no-cond-assign` etc. – **0 Verstöße**), Python-Musteranalysen (Duplikate, `innerHTML`-Interpolationen,
Store-Listen-Drift, `catch`-Hygiene, Secret-Muster).

**Befunde (nach Priorität):**

- **K1 – KRITISCH, NICHT gepatcht:** Projekt-Kopie `leerstand.js` ist Prä-v158-Stand – enthält
  `verwaisteBlobsLoeschen` nicht (R15-Fix fehlt), löscht beim POST alle Blobs der Kennung VOR dem
  Hochladen neuer Bilder (Foto-Verlust bei fehlgeschlagenem Upload), und gibt `e.message` nach außen
  (Detail-Leak, in anderen Endpunkten längst behoben). Ein Patch auf falschem Basisstand wäre riskanter
  als Nichtstun. **Aktion (Nutzer):** Live-Datei aus `C:\nadigpfau-backend\src\functions\` ins Projekt
  übernehmen; Projekt-Kopie bis dahin nie deployen.
- **H1 – HOCH, behoben:** Stiller `sendeMail`-No-op-Fallback (`() => {}` bzw. `/* no-op */`) in
  `send-token.js`/`selbstauskunft.js` lieferte bei fehlendem `mail.js` `ok:true`, obwohl keine Mail
  versendet wurde – exakt der Bug, der laut Changelog bereits 4× auftrat und jedes Mal erst durch
  ausbleibende Mails auffiel. Fix: Fallback wirft `Error('mail-Modul nicht verfuegbar …')` wie in
  `send-mail.js`. Zusätzlich: die zwei bewusst schluckenden Mail-`catch`-Blöcke in `selbstauskunft.js`
  (Benachrichtigung Verwaltung / Eingangsbestätigung Bewerber) loggen jetzt per `context.error`, bevor
  sie den Bewerber-Flow unblockiert weiterlaufen lassen (Semantik unverändert, nur Sichtbarkeit).
- **H2 – HOCH, behoben (sicherheitskritischster Fund):** Der `settings`-Store enthält u. a.
  `backendKey` (Azure-Function-Key) und `saEncKey` (AES-256-Schlüssel aller Selbstauskünfte). Sowohl
  `syncToOneDrive()` (→ `immo_daten.json` auf OneDrive) als auch `exportBackup()` (→ lokale
  Backup-JSON-Datei) führten den kompletten `settings`-Store ungefiltert mit, während die UI
  („Wird nur lokal auf diesem Gerät gespeichert") das Gegenteil versprach. Fix: neue Konstante
  `SETTINGS_GEHEIM = ['backendKey','saEncKey']`, Filterung an beiden Stellen (`.filter(r =>
  !SETTINGS_GEHEIM.includes(r?.id))`), UI-Text korrigiert („… und ist von Sync und Backup-Export
  ausgenommen."). Kein Funktionsverlust: `settings` wird beim Sync-Pull nie zurückgelesen (siehe
  `mergeStores`/`syncFromOneDrive`, die `settings` bewusst auslassen), betrifft also nur den Push.
- **M1 – MITTEL, behoben:** `odGraph()` (zentraler Graph-API-Wrapper, 8 Aufrufer inkl.
  `odSyncWeDateien`, `odPendingFlush`, Datei-Browser) nutzte rohes `fetch` ohne Timeout – ein hängender
  Request (Mobilfunk) blockierte den Datei-Sync unbegrenzt, während alle anderen Netzwerkpfade seit
  v158/B4 bereits `fetchMitTimeout` nutzen. Fix: 30-s-Timeout über `fetchMitTimeout`.
- **M2 – MITTEL, offen (TODO):** `leerstand.js`-`kennung` wird ungeprüft als Table-RowKey und
  Blob-Namens-Prefix verwendet; Slashes erzeugen Prefix-Kollisionen beim Löschen, Sonderzeichen
  potenziell 500er. Empfehlung: Whitelist `^[A-Za-z0-9_-]{1,64}$`. Gehört zusammen mit K1 in eine
  Session, die die Live-Backend-Datei bearbeitet.
- **M3 – MITTEL, offen (TODO):** 112 leere `catch`-Blöcke im Frontend; v179 (§0ae) bewies, dass genau
  dieses Muster (`catch(_){}`) echte Fehler unsichtbar verschluckt. Viele sind legitime
  Idempotenz-Fänger (z. B. `idbDelete(...).catch(()=>{})`), aber Netzwerk-/Storage-Pfade sollten
  mindestens `console.warn` enthalten. Eigene Aufräum-Session, kein Blind-Patch (Fehlklassifikation
  „harmlos" vs. „relevant" braucht Einzelfallprüfung).
- **M4 – MITTEL, offen (TODO):** ~15 Interpolationen personenbezogener Felder (`u.name`, `cur.mieter`,
  `cur.etage`, `cur.flaeche`) landen ohne `esc()`/`escAttr()` in `innerHTML` (u. a. Zeilen ~657, ~18601,
  ~18802, ~19168). Nur durch angemeldete Rollen befüllbar (kein akutes externes Risiko), aber wegen
  `unsafe-inline` in der CSP (R11) fehlt die zweite Verteidigungslinie. Mit dem C1-CSP-Refactor bündeln.
- **N1–N5 – NIEDRIG:** N1 `istEmail`/`tabelle`/`tabelleMitCreate` in mehreren Backend-Dateien dupliziert
  (deckt sich mit bekanntem V3, gemeinsames `_shared.js` empfohlen). N2 Invalid-Date-Guard
  `saveSitzungNachtrag` – **behoben** (`isNaN(_ende)`-Prüfung vor `toISOString()`, verhindert
  unbehandelten `RangeError` bei kaputten Datums-/Zeit-Eingaben, z. B. Safari/Firefox-Edge-Cases). N3
  `sw.js` cacht Navigations-Antworten ohne `fresh.ok`-Prüfung (eine 404 könnte zum Offline-Fallback
  werden) – offen, geringes Risiko. N4 vier `console.log`-Reste (harmlose Migrationslogs) – offen. N5
  Website ohne CSP (`index_website.html`) – bei Cloudflare Pages besser über `_headers`-Datei lösbar,
  gehört zur Website-Launch-Vorbereitung (⚑ Abschnitt D).

**Store-Listen-Konsistenz (V2) gegengeprüft:** Schema (`onupgradeneeded`, 42 Stores) vs. `alleStores`
(39, Export/Import) vs. `mergeStores` (35, Sync-Merge) vs. `syncToOneDrive`-Push-Liste (39) vs.
`exportBackup`-Liste (39) vs. `importBackupAusfuehren`-Liste (39): **alle vier Anwenderlisten
deckungsgleich (39/39)**, die Differenz zum Schema (`mieter_snapshots`, `od_auth`, `sync_log`) ist
bewusst – geräteinterne Stores, die nie synchronisiert/exportiert werden sollen. Kein Handlungsbedarf,
V2 bleibt als strukturelle Empfehlung (`STORE_DEFS`-Zentralisierung) für ein künftiges Refactoring
bestehen.

**Duplikat-Funktionsprüfung:** Ein Name (`getAnteil`) kommt 2× vor, aber in getrennten
Closures/Scopes (`erstelleNKA` bzw. `erstelleNKALiegenschaft`, unterschiedliche Kostenschlüssel-Logik
Einzelobjekt vs. Liegenschaftsgruppe) – kein echtes Duplikat, keine Aktion nötig.

**QA / Umsetzung:** Alle 4 Fixes (H1, H2, M1, N2) als Assert-Patches umgesetzt (`s.count(alt)==1` vor
jeder Ersetzung), `node --check` auf beiden extrahierten Script-Blöcken + allen Backend-Dateien grün,
Funktions-Diff v179→v180 = **0 neu/0 verloren** (1170 Funktionen identisch), gezielte Logiktests für
`SETTINGS_GEHEIM`-Filter (Secrets raus, Rest inkl. `null`-Einträge erhalten) und Invalid-Date-Guard
grün. `sw.js`-CACHE + `APP_VERSION` auf `v180` hochgezogen (PWA-Invariante). Manifest/Icons unverändert.

**Deploy + Verifikationsprotokoll 06.07. (Nutzer) – ALLE GRÜN:**
- **Deployt:** `index-v180.html` + `sw.js` (App), `send-token.js` + `selbstauskunft.js` (Backend, H1),
  `leerstand.js` mit M2 (Backend, siehe unten).
- **K1 aufgelöst:** Nutzer stellte den Live-Stand `leerstand.js` bereit; Verifikation gegen die
  dokumentierten Fixes: `verwaisteBlobsLoeschen` vorhanden (Definition + Aufruf), B3 (kein
  `e.message` in Responses, nur `context.error`), v152-Härtung (MIME-Whitelist + 8-MB-Limit) intakt.
  Darauf **M2** ergänzt: `KENNUNG_RE = /^[A-Za-z0-9_-]{1,64}$/` validiert `id` in POST und DELETE
  (400 `id (Kennung) ungueltig`); verhindert Blob-Präfix-Kollisionen (Slashes) und RowKey-500er.
  App-Kennungsformat gegengeprüft: `wohnungsKennung()` = `id_<ts>_<rand>-WE<Nr>` → whitelist-konform.
  Logiktest: 4 gültige akzeptiert, 9 ungültige (Slash, Leerzeichen, `#`, Umlaut, `..`, >64, leer,
  `?`, `\`) abgelehnt. Projekt-Kopie im Projektspeicher jetzt = Live-Stand + M2.
- **H2 verifiziert:** Textsuche `backendKey` und `saEncKey` in der OneDrive-`immo_daten.json` (nach
  Sync) UND in einem frischen Backup-Export = **jeweils 0 Treffer**.
- **H1 verifiziert:** Posteingang-Abruf funktioniert (lokaler `saEncKey` unangetastet),
  Selbstauskunft-Einladung (Token-Mail) kommt an.
- **M2/A1 verifiziert:** Leerstand-Übertragung über den Aushang-Dialog (Checkbox „Diese Wohnung auf
  der Homepage veröffentlichen" → „Aushang erzeugen" → `leerstandPushen`) erfolgreich; Bestands-Kennung
  passiert die Whitelist, Bestandsfotos bleiben erhalten (A1-Semantik bestätigt).
- **Bewusste Nutzer-Entscheidung:** Function-Key-Rotation **abgelehnt** (Restrisiko akzeptiert: alter
  Key stand zeitweise in Sync-Datei + Backups; H2-Filter verhindert Neuexposition).
- **Rest-TODO (§12-P31):** OneDrive-**Versionsverlauf** der `immo_daten.json` enthält in alten
  Versionen noch die Klartext-Secrets; Einzellöschung laut Nutzer unpraktikabel (zu viele Versionen).
  Empfohlener Weg dokumentiert und app-seitig abgesichert: Datei in OneDrive löschen + Papierkorb
  leeren → nächster Sync legt sie frisch an (`syncFromOneDrive`: `if (r.status === 404) { await
  syncToOneDrive(); return; }`). Voraussetzung: vorher alle Geräte auf v180 (sonst pusht ein
  v179-Gerät die Secrets erneut); zwischen Löschen und erstem Push kein Fremd-Sync.

---

## §0ac. v177 – §12-P23 Schritt 23a: fünfte Verdrahtung `dokumente.data` (05.07.2026, 3. Sitzung)

**Scope-Entscheidung (heterogener Store → Typ-Filter statt Pauschal-Auslagerung):**
- **Ausgelagert:** die drei Datei-Upload-Pfade – `saveDok` (bis 10 MB, alle Typen), `onWohnungGrundrissFile`
  (typ `plan`, deterministische Slot-ID), `onWohnungsbildFile` (typ `wohnungsbild`). Das sind die realen
  Größentreiber des Stores.
- **Dauerhaft inline:** (a) `DOK_INLINE_TYPEN = ['ausweis','lastschrift']` – Architektur-Entscheidung §12
  (besonders sensibel, kurzlebig; v176-Löschworkflow adressiert Ausweise); (b) generierte HTML-Archivdokumente
  aus `archiviereMieterDokument`/`archiviereAushangDokument` – kleine Text-dataURLs, kein Größentreiber, und
  die künftige Mieterportal-Auslieferung (Push-Prinzip) rehydriert ohnehin vom Admin-Gerät.
- **Analyse-Bestätigung:** Backend hat KEINEN `dokumente`-Konsumenten (Portal-Abruf existiert nur als
  Plan-Kommentar bei den PORTAL_DOK-Konstanten) → Verdrahtung gefahrlos.

**Schreibpfad:** `dokAuslagernRef(dok, dataUrl, weNr?)` – Reihenfolge: Typ-Gate → weNr (`dok.weNr` ODER
`mieter.weNr` via `dok.mieterId`) → `fotoZielFuer(objektId, we, 'dokumente')` (knoten `auto` = `WE n` bei weNr,
sonst `Allgemein`) → Kategorie-Verfeinerung `DOK_OD_KATEGORIE` (vertrag→Mietvertrag, brief→Briefe,
foto/wohnungsbild→Fotos, protokoll→Protokolle, abrechnung/nka→Rechnungen) **nur wenn Knoten mit `WE ` beginnt**
(die Allgemein-Kategorieliste kennt diese Ordner nicht) → Dateiname `<bereinigt(name)>_<uid()><.pdf|.png|.jpg>`
aus MIME → `fotoAuslagern(dataUrl, ziel)` (liefert Referenz inkl. Mini-Thumb; bei PDF kein Thumb, unkritisch).
Aufrufer-Muster identisch an allen drei Stellen: `if(odRef){ dok.ref=odRef; delete dok.data; }` – Fallback wie
v164 (Fehler ⇒ data bleibt inline, kein Datenverlust).

**Lesepfade dual-format:**
- Neuer zentraler Resolver `dokQuelle(d)`: `d.data` ODER `odDownloadUrl(d.ref.odId)` mit `ref.thumb`-Fallback.
- `openFoto(src,'dok')`: nutzt `dokQuelle`; bei leerem Ergebnis Toast statt kaputtem Overlay.
- `downloadDok` + `dokTeilen`: Quelle vor Verwendung auflösen; in `dokTeilen` speisen ALLE drei Zweige
  (fetch/Share, Download-Fallback, catch-Fallback) dieselbe aufgelöste `_quelle`.
- Galerie-Thumbnails (Grundriss-Übersicht, Wohnungsplan-Kachel, Wohnungsbilder): `fotoThumbQuelle(x.data||x.ref)`;
  Vollbild-Klick läuft unverändert über `openFoto(id,'dok')` → zentraler Resolver.
- `saveWohnungsbildBeschr` schreibt den Record (inkl. `ref`) unverändert zurück – kompatibel.

**Bekannte, akzeptierte Nebenwirkung:** Grundriss-Slots haben deterministische IDs; ein erneuter Upload ersetzt
den Record, die vorige OneDrive-Datei bleibt verwaist (kein Remote-Löschen implementiert – gilt für alle bisherigen
23a-Stores gleichermaßen; Aufräumen ggf. mit dem Backfill-Werkzeug).

**QA:** 11/11 Logiktests (`test_v177.mjs`: beide Typ-Gates, weNr-Auflösung über Mieter, Kategorie-Map nur auf
WE-Knoten, PDF-Endung/Namensbereinigung, kein Standort ⇒ null, `dokQuelle`-Kette data→Link→Thumb→'');
`node --check` beide Blöcke OK; Diff v176→v177 = **+2 (`dokAuslagernRef`, `dokQuelle`) / 0 verloren**.
Keine Store-/DB-Änderung, **DB_VER 31**. `APP_VERSION='2026-07-05-v177'`, CACHE `nadigpfau-v177`.

**Gerätetest (empfohlen, kein hartes Gate – kein Bestandsdaten-Entfernen):** Dokument-Upload (PDF + Bild, je
einmal mit Mieterbezug und ohne) → Dateien in OneDrive unter korrektem Knoten/Kategorie; Anzeige (Auge),
Download, Teilen funktionieren; Ausweis-Upload bleibt inline (keine OneDrive-Datei).

**23a-Reststand:** Backfill Bestands-Base64 (davor Microsoft-365-Business-Entscheidung, s. Schnellüberblick).

## §0ab. v176 – Ausweis-Löschworkflow Stufe 1 (§12-P24) (05.07.2026, 3. Sitzung)

**Rechtsrahmen:** Ausweiskopien dienen der Identitätsprüfung vor Vertragsschluss; nach Zweckerreichung sind sie
zu löschen (Art. 17 Abs. 1 lit. a DSGVO). § 20 PAuswG gebietet ohnehin restriktiven Umgang mit Ausweiskopien.
SEPA-Lastschriftmandate (`lastschrift`) unterliegen dagegen einer Nachweispflicht während der Mandatslaufzeit
(+ Erstattungs-/Verjährungsfristen) und sind deshalb BEWUSST von der Erinnerung ausgenommen.

**Implementierung (alle Funktionen vor `saveDok`):**
- `AUSWEIS_ERINNERUNG_TAGE = 60` (Konstante, anpassbar).
- `parseErstelltMs(v)`: toleranter Zeitparser für `dokumente.erstellt` (historisch de-DE-Locale-String aus `now()`,
  künftig ggf. ISO). **Bugfix aus Logiktest:** das de-DE-Muster `TT.MM.JJJJ` muss VOR `Date.parse` geprüft werden –
  `Date.parse('5.3.2026')` deutet implementierungsabhängig US-artig als 3. Mai (Monat/Tag vertauscht).
- `ausweisLoeschKandidaten()`: liefert `[{dok, grund}]` aller `typ==='ausweis'`-Dokumente mit (a) Mieter besitzt
  archiviertes `typ==='vertrag'`-Dokument (Zweck erfüllt – deckt „Löschangebot bei MV-Erstellung" dauerhaft ab)
  ODER (b) Alter > 60 Tage. Unparsbares `erstellt` ⇒ kein Kandidat (konservativ, kein Fehllöschen).
- Dashboard-Warnkarte in `renderDash` (nach Backup-Warnung, nur `istVerwalter()`): Anzahl + Klick →
  `modalAusweisLoeschen()`.
- `modalAusweisLoeschen()`: Liste (Name, Mieter, Objekt, Datum, Grund) mit Einzel-Löschen (`ausweisLoeschen`,
  `confirm`) und „Alle löschen" (`ausweisAlleLoeschen`, `confirm`). Löschung via **`deleteMitTombstone('dokumente',
  id)`** → kehrt beim Merge-Sync NICHT zurück; anschließend Sync-Timer wie üblich (3 s).
- `mvErzeugen`: Abschluss-Toast erhält Hinweis, wenn für den (neu angelegten) Mieter Ausweiskopien existieren –
  bewusst KEIN blockierender Dialog (kollidierte mit der zentralen Druckvorschau); die Dashboard-Karte greift ab
  sofort über Kriterium (a).
- **Kein Auto-Löschen** (Stufe-1-Prinzip: Erinnerung + manuelle Bestätigung). Tägliche Wirkung über den
  Dashboard-Aufruf bei jedem App-Start/`refreshCurrentPage`.

**Doku:** `Loesch_und_Aufbewahrungskonzept_v1_1.docx` (Outputs) ergänzt zwei App-Zeilen (Ausweiskopien:
halbautomatisiert ab v176; SEPA-Mandate: manuell, ausgenommen) und erweitert den Geltungsbereich um die App.

**QA:** 9/9 Logiktests (`test_v176.mjs`: 4× Parser inkl. de-DE/US-Falle, 5× Kandidaten-Kriterien inkl.
SEPA-Ausschluss + Unparsbar-Schutz); `node --check` beide Script-Blöcke OK; Funktions-Diff v175→v176 = **+5
(`parseErstelltMs`, `ausweisLoeschKandidaten`, `modalAusweisLoeschen`, `ausweisLoeschen`, `ausweisAlleLoeschen`)
/ 0 verloren**. Keine Store-/DB-Änderung, **DB_VER 31**. `APP_VERSION='2026-07-05-v176'`, CACHE `nadigpfau-v176`.

**TODO (Stufe 2, optional, §12):** AES-256-GCM at rest für verbleibende Ausweis-/SEPA-Inlinedaten mit
PIN-gebundenem Schlüssel-Wrapping je Admin (WebCrypto); anwaltliche Prüfung des Gesamtkonzepts empfohlen.

## §0aa. v175 – §12-P23 Schritt 23a: Stufe 2b `protokolle`-Fotos (05.07.2026, 3. Sitzung)

**Ziel:** Der §0q-Kernbefund (Protokollfotos liegen DOPPELT: inline im Protokoll-Record UND im `fotos`-Store =
eigentlicher 20-MB-Treiber der `immo_daten.json`) wird für **Neuaufnahmen** beseitigt. Voraussetzungen erfüllt:
Ventil-Gerätetest bestätigt (v164-Gate, §0y) + DSGVO-Gate dokumentiert (s. u.).

**Schreibpfad (3 Aufnahme-Stellen im Protokoll-Editor – Bauteil `cond`, Raum `room`, Zähler):**
- Neue Funktion `protoFotoAuslagern(data, slotName)`: Guard `PD?.objektId`, Ziel `fotoZielFuer(PD.objektId,
  PD.weNr, 'protokolle')`, Upload via `fotoAuslagern` mit Name `protokoll_<slot>_<uid>.jpg`; liefert Referenz
  `{ref,odId,…}` oder `null` (kein PD/Ziel/OneDrive/Fehler).
- An allen 3 Stellen: `const odRef = await protoFotoAuslagern(data, '<slot>'); const wert = odRef || data;`
  → `wert` in den Protokoll-Record (`PD.raeume[room].photos` / `rd.condPhotos[cond]` / `PD.zaehler[idx].foto`),
  `fotos`-Store erhält `{id, protId, slot, ref: odRef}` (Erfolg) bzw. `{…, data}` (Fallback = exakt Alt-Verhalten).
- **Kein Entfernen von Bestandsdaten:** bestehende inline-dataURLs bleiben unangetastet (Backfill = separater Schritt).

**Lesepfade dual-format:**
- `restoreFotosForPD`: `const foWert = fo.data || (istFotoRef(fo.ref) ? fo.ref : null)` – stellt Referenz ODER
  dataURL in den Protokoll-Record zurück.
- Editor-Thumbnails (Zähler-Kachel, `ph-grid` Bauteil + Raum) via `fotoThumbQuelle(p)`.
- Protokoll-Übersicht (Bauteil-/Raum-/Zähler-Fotos) via `fotoImgTag` (ersetzt direkte `<img src>`-Interpolation).
- Mangel-Übernahme aus Protokoll: Dedup nicht mehr über `includes` (versagt bei Objekten), sondern Helper
  `_enthaelt(arr,v)` mit `odId`-Vergleich für Referenzen; `fotos`-Store-Nachladung ebenfalls dual-format.
- Druck/PDF: unverändert `fotoDruckQuelle` (v166) – Referenzen werden vor Canvas-Einbettung zu dataURLs rehydriert.

**DSGVO-Gate (erfüllt, Doku-Dateien im Projekt):** `Verzeichnis_Auftragsverarbeiter_v1_1.docx` nimmt Microsoft
(OneDrive/Microsoft Graph) als Datei-Speicherdienst der Verwaltungs-App auf (Konzept 23a), inkl. Bewertung:
OneDrive **Personal** (Consumer) bietet KEIN DPA (Microsoft-Servicevertrag, teils eigenständige Verantwortlichkeit)
→ Empfehlung **Microsoft-365-Business-Tarif** (DPA automatisch, EU-SCC + EU-Datengrenze) **vor dem Backfill** der
Bestands-Fotos. Ergänzend `TOM_…_v1_1.docx` und `Verzeichnis_Verarbeitungstaetigkeiten_v1_1.docx`.

**QA (nachgeholt in der 3. Sitzung – v175 war zuvor undokumentiert):** `node --check` beide Script-Blöcke OK;
Funktions-Diff v174→v175 = **+1 (`protoFotoAuslagern`) / 0 verloren**; Codeprüfung der Kernpunkte: 3× Fallback
`wert = odRef || data`, 3× duale `idbPut('fotos', …)`-Zweige, dual-format-Restore, `odId`-Dedup, `fotoThumbQuelle`
an den Editor-Thumbs, `fotoDruckQuelle` im Druckpfad unverändert. Keine Store-/DB-Änderung, **DB_VER 31**.
`APP_VERSION='2026-07-05-v175'`; `sw.js`-CACHE auf `nadigpfau-v175` nachgezogen (Outputs, 3. Sitzung – Projektkopie
stand noch auf v174).

**Gerätetest BESTÄTIGT 05.07.2026 (Nutzer-Screenshot, 16:46/16:47 Uhr):** 3× `protokoll_raum_*.jpg`
(193–196 KB) + 1× `protokoll_zaehler_*.jpg` (62 KB) in OneDrive `…/Mindener Straße 23 und 25/WE 1/Protokolle`
– Schreibpfad, Zielauflösung (v173-Gebäudeebene) und Dateibenennung real verifiziert. Ursprüngliche Testanweisung:
Protokoll mit je einem Raum-, Bauteil- und Zähler-Foto erfassen → (1) Dateien erscheinen in OneDrive unter
`Objekte/<Standort>/<Gebäude>/WE <n>/Protokolle`; (2) Editor + Übersicht zeigen Thumbnails, Klick öffnet Vollbild;
(3) Protokoll-PDF druckt alle Fotos (Rehydrierung `fotoDruckQuelle`); (4) Sync auf Zweitgerät → Fotos sichtbar;
(5) `immo_daten.json`-Größe wächst nur um Referenz-Bytes. Schlägt der Upload fehl, greift sichtbar der Fallback
(Verhalten wie vor v175).

## §0z. v174 – §12-P23 Schritt 23a: vierte Verdrahtung `objekt_stamm` (pdfWebsite) (05.07.2026, 2. Sitzung)

**Auftrag (Nutzer):** „objekt_stamm-Verdrahtung machen."

**Analyse-Korrektur (wichtig):** Die Schnellüberblick-Annahme „braucht Blob-Push-Endpunkt (Backend-Arbeit)" war
zu vorsichtig. Der bestehende Endpunkt **`/api/leerstand`** (`leerstand.js`) akzeptiert im `fotos`-Array **Base64**
(`bildPruefen`→`bildHochladen`→Azure Blob, Rückgabe Blob-URL) und behält vorhandene Blob-URLs (`istBlobUrl`,
A1-Fix). D. h.: Die App muss OneDrive-Referenzen lediglich **clientseitig zu dataURLs rehydrieren**, bevor sie
pusht – der Website-Weg funktioniert dann unverändert. Der in der Vorsitzung beschlossene neue Blob-Push-Endpunkt
bleibt nur für die **Mieterportal-Dokumente** relevant (`dokumente.data`-Verdrahtung).

**Betroffene Codepfade (vollständig, per grep verifiziert):** `objekt_stamm.fotos`/`grundriss` werden NUR gelesen in
(a) Wohnungsinfo-Modal (`renderWhFotoGalerie`, Arbeitsspeicher `_whFotos`/`_whGrundriss`), (b) Aushang-Modal-
Auswahlkacheln (`modalAushangErstellen`), (c) `aushangErzeugen` (Druck-HTML + Homepage-Push). `modalWohnungsbilder`
gehört NICHT dazu (das ist der `dokumente`-Store, typ `wohnungsbild`).

**Umgesetzt (7 Patch-Ersetzungen, je `assert count==1`):**
1. **Schreibpfad** `saveWohnungHeizNk`: je Foto in `_whFotos` mit `data:`-Präfix → `fotoAuslagern` mit Ziel aus
   `fotoZielFuer(objektId, weNr, 'objekt_stamm')` (Kategorie „Fotos", Knoten `WE <n>`, `gebaeude` aus v173);
   Dateiname `wohnungsfoto_we<N>_<uid>.jpg` bzw. `grundriss_we<N>_<uid>.jpg` (immer JPEG – beide Eingabepfade
   laufen über `compressFoto`). **Fallback:** `null` → dataURL bleibt inline. Referenzen/Alt-Strings unangetastet.
2. **Anzeige dual-format:** `renderWhFotoGalerie` (Grundriss + Fotos) und Aushang-Kacheln rendern via
   `fotoThumbQuelle` (Alt-String direkt, Referenz → Inline-Thumbnail; Kachelgröße 78–84 px passt zum 96-px-Thumb).
3. **Rehydrierung** in `aushangErzeugen`: `gewaehltRoh`/`grundrissRoh` → `fotoDruckQuelle` je Bild (echte dataURL
   via Graph-fetch→Blob→dataURL; Fallback Thumbnail; leere Auflösung wird übersprungen, kein kaputtes `<img>`).
   Die rehydrierten Werte speisen **beides**: Galerie-HTML der Aushang-PDF und `datensatz.fotos` für
   `leerstandPushen` (Backend erhält Base64 wie bisher).
4. **Verschlankung Vormerk-Record:** `settings/homepage_leerstand.value[kennung]` enthielt bisher die kompletten
   Base64-Bilder (Sync-JSON-Treiber!), obwohl nur Schalter-Vorbelegung (Z. ~20141) und Entfernen-Zweig darauf
   zugreifen – nie auf die Bilder. Jetzt: `fotos:<Anzahl>` (number) + `grundriss:<bool>`. Verhaltensgleich für
   beide Konsumenten (truthiness), spart je veröffentlichter Wohnung mehrere hundert KB in der Sync-JSON.

**Validierung:** `node --check` beide Script-Blöcke OK; 13/13 Logiktests (Schreibpfad-Fallbacks, Rehydrierung,
Backend-Kompatibilität `istBlobUrl`/`base64Zerlegen`, Record-Verschlankung, Kachel-dual-format); Funktions-Diff
v173→v174 = 1110→1110 (0 neu/0 verloren – nur bestehende Bausteine verdrahtet); keine Store-/DB-Änderung, DB_VER 31.
`APP_VERSION='2026-07-05-v174'`, `sw.js`-CACHE `nadigpfau-v174`. **Obermenge v173 – ein Deploy genügt.**

**Gerätetest nach Deploy (empfohlen, kein hartes Gate – Muster des bestätigten Ventil-Piloten):**
(1) Wohnungsinfo → Fotos + Grundriss hinzufügen → Speichern → Dateien erscheinen in OneDrive unter
`Objekte/<Standort>/<Gebäude>/WE <n>/Fotos`; (2) Galerie zeigt Thumbnails; (3) Aushang erzeugen → Druckvorschau
zeigt die Bilder in voller Qualität; (4) mit Homepage-Schalter → Website-Leerstand zeigt Blob-Fotos.
**Offline-Grenze (bewusst):** Aushang-Erzeugung mit ausgelagerten Fotos braucht Netz (Graph-Download); offline
greift das Thumbnail-Fallback (niedrige Auflösung). Alt-Bestand (inline) bleibt offline voll funktionsfähig.

**23a-Reststand (aktualisiert 05.07., 3. Sitzung):** ~~`protokolle` Stufe 2b~~ **ERLEDIGT v175** (§0aa,
Gerätetest bestätigt) → ~~`dokumente.data`~~ **ERLEDIGT v177** (§0ac) → **nur noch Backfill Bestands-Base64**
(davor Microsoft-365-Business-Entscheidung, s. AVV v1.1).

## §0y. v173 – Ordnerstruktur Düsseldorf + Sync-Heilung per odItemId (05.07.2026)

**Anlass:** v172 deployt; **Ventil-Gerätetest bestätigt** (Foto öffnet, Datei in OneDrive – v164-Test-Gate erfüllt).
Nutzerwunsch zur Ordnerstruktur: Oberordner „Düsseldorf"; darunter „Mindener Straße 23 und 25" (Gebäude `mind23`+`mind25`
zusammengelegt, WE 1–20 durchgängig) und „Ruhrtalstraße" (WE 1–10).

**Umsetzung:**
1. `LABEL.duesseldorf` = „Düsseldorf" (Umlaut ist Graph-/`encodeURI`-sicher; `odSafeName` entfernt nur `\/:*?"<>|`).
2. `OD_GEBAEUDE_ALIAS` (objektId → gemeinsamer Ordnername); `odGebaeudeName` prüft Alias zuerst, sonst `getObj(id).name`
   wie bisher (Krefeld/MG/Monheim unverändert).
3. `odGebaeudeListe(st, mieterAlle)` (neu, async): Map Gebäudename → {oids, wes:Set}; WEs = Union `alleWeVonObjekt` über
   alle Objekte des Gebäudes, numerisch sortiert. Einzige Quelle für Baum-Anlage, Sync-Zweige und Browser-WE-Liste (DRY).
4. `odBaumAnlegen`: iteriert Gebäudeliste statt Objekte → Alias-Ordner nur 1× angelegt, WE-Ordner 1–20 unter Mindener.
5. `syncDateibaum`: Gebäude-Zweige aus `odGebaeudeListe` (dedupliziert); Legacy-Standort-Zweige unverändert. **Heilung:**
   `bekanntById[odItemId]` als Zweit-Match – Remote-Datei mit bekanntem Item aber neuem Pfad aktualisiert den bestehenden
   Record (id bleibt, pfad/ordner/gebaeude neu) statt einen Duplikat-Record anzulegen. Grundlage: `odDownloadUrl` löst
   primär über `odItemId` auf, Graph-Item-IDs überleben Umbenennen/Verschieben.
6. Browser Ebene 3: WE-Liste des gewählten Gebäudes aus `odGebaeudeListe` (Union) statt `gebOid`-Einzelobjekt (das beim
   Alias nur das ERSTE Objekt getroffen hätte → Mindener hätte nur WE 1–10 gezeigt). `gebOid` entfernt (0 Rest-Referenzen).

**Migration Alt-Dateien (manuell, empfohlen vor nächstem Sync):** RT Duesseldorf→Düsseldorf umbenennen; Ruhrtalstr. 41→
Ruhrtalstraße; Mindener Str. 23→„Mindener Straße 23 und 25" + Inhalt von Mindener Str. 25 hineinverschieben. Danach
Datei-Browser „Synchronisieren" → Records werden per odItemId geheilt. Ohne manuellen Schritt: neuer Baum entsteht
parallel; Alt-Dateien bleiben über Referenzen (odItemId) öffenbar, sind im Browser aber unsichtbar (bekanntes TODO
„Alt-Dateien-Migration" aus §0x).

**QA:** `node --check` beide Script-Blöcke OK; Funktions-Diff v172→v173 = 1157→1158 (+`odGebaeudeListe`, 0 verloren;
Zählweise ganze Datei inkl. verschachtelter Funktionen weicht von der §0x-Angabe ab – dort wurde anders gezählt, beide
konsistent in sich); 14/14 Logiktests (Alias-Mapping ×5, Gebäudeliste/WE-Union/Sortierung ×7, Pfadbildung ×2) gegen den
EXTRAHIERTEN Original-Quelltext (kein Duplikat-Code im Test). Review-Scan: keine Referenzen auf v169-entfernte
Funktionen, keine sensiblen `console.log`, `getAnteil` 2× = verschachtelte Lokalfunktionen zweier NKA-Kontexte (kein Bug).

**Architektur-Entscheidungen (Konzept, noch nicht umgesetzt – siehe Schnellüberblick):** (a) Portal-Dokumente per
Push-Rehydrierung Admin-Gerät → Azure Blob (privat) + tokengeprüfte Auslieferung → `dokumente.data`-Auslagerung wird
portal-sicher; (b) `ausweis`/`lastschrift` NIE nach OneDrive, Auto-Lösch-Workflow Stufe 1, optional PIN-gebundene
AES-GCM-Verschlüsselung Stufe 2.

## 12. Offene Aufgaben

**Seit 10.07.2026 zusammengeführt:** Die einzige gepflegte Aufgabenliste ist der Abschnitt
„⚑ OFFENE PUNKTE" oben (dorthin wurden alle noch offenen §12-Punkte inkl. P-Nummern übernommen;
erledigte Historie steht im Changelog §0 und in den §0xx-Detailabschnitten).

## 13. Stärken & Schwächen

### Stärken
- **Rechtlich fundiert:** §573c BGB, §558/Kappungsgrenze (NRW-MietSchVO), §87 GEG, §23 WoGG/§19 BMG
  korrekt und stichtagsabhängig implementiert; Werktagsberechnung inkl. NRW-Feiertage + BGH-Karenz.
- **Robuste Sync-Konfliktauflösung** (Stempel + Feld-Rückholung + Soft-Delete-Tombstones).
- **Defensive Druck-Mechanik** mit gerätespezifischen Fallbacks (Samsung-PWA).
- **Disziplinierte Patch-/Test-Methodik** (Assert-Skripte, `node --check`, Funktionsdiff).
- Single-File-Prinzip → einfache Auslieferung, offline-fähig.

### Schwächen / Verbesserungsvorschläge
- **V1 – Wartbarkeit:** 27.000 Zeilen / 1059 Funktionen in EINER Datei. Empfehlung: Logische Module
  (Recht, Sync, Druck, Mail) als kommentierte Sektionsmarker mit eindeutigen `// ═══ MODUL …`-Bannern
  versehen, um Patch-Treffsicherheit zu erhöhen (Build-Tooling widerspricht dem Single-File-Wunsch).
- **V2 – Store-Listen-Drift: ✅ ERLEDIGT v210** (`STORE_DEFS`, §0ax). *(Historisch:)* Drei separate Store-Listen (Anlage/`alleStores`/`mergeStores`) waren eine
  Fehlerquelle. Empfehlung: **eine zentrale `STORE_DEFS`-Konstante** mit Flags `{sync:true, merge:true,
  index:[…]}`, aus der alle drei Listen abgeleitet werden → eliminiert „6 Pflichtstellen"-Risiko.
- **V3 – Backend-Konventionsdrift:** Tabellennamen (`tokens` vs `token`) und Routen
  (`inbox-mark-read` vs `inbox-sa/mark-read`) uneinheitlich → in einer `const TABLES`/`ROUTES`-Konvention
  zentralisieren und einmalig dokumentieren.
- **V4 – CSP:** `'unsafe-inline'` im `script-src` ist sicherheitstechnisch suboptimal (durch Inline-App
  bedingt). Bei Refactoring Nonce-basierte CSP erwägen. (Akuter XSS seit v152 durch Ausgabemaskierung
  geschlossen; CSP wäre die zusätzliche, zweite Verteidigungslinie – siehe §7/R11.)
- **V5 – Test-Automatisierung:** Playwright wird ad hoc genutzt; ein kleines festes Smoke-Test-Set
  (Login, Mieter anlegen, Protokoll drucken, Sync-Merge) würde Regressionen früher fangen.
- **V6 – Memory/Code-Sync:** v143/v144 sind im Projektgedächtnis nicht beschrieben (R9). Künftig
  Versions-Changelog **im Code-Kopf** pflegen (ist teilweise vorhanden, aber bei v143/v144 lückenhaft).

---

## 14. Referenzdokumente im Projekt
- `Konzept_23a_Fotoauslagerung.md` – **NEU 03.07.:** Umsetzungskonzept §12-P23 Schritt 23a (Foto-/Datei-Auslagerung nach OneDrive). Enthält offene Architektur-Entscheidung Variante A/B.
- `Paket1_ANLEITUNG.md` – SA-Paket-1 Backend-/App-/Website-Schritte.
- `Uebergabe_App_v125_9Features.md` – P1–P9-Features (v125–v128).
- `Azure_Anleitung_Website_App.docx` – Infrastruktur-Setup.
- `Datenschutzhinweis_DSGVO.pdf`, `Hausordnung.pdf`, `Merkblatt_Heizen_Lueften.pdf` – Mieter-Dokumente.
- ~~Import-JSONs (2026-06-20): Mieterwechsel [G.], IBAN-Import, User-Update Pfau, Amboß-Mieter, Zähler~~
  **aus dem Projektspeicher entfernt (verifiziert 12.07., 13. Sitzung – P17-Scan: nicht mehr vorhanden).**
- **Veraltet/nur historisch:** `uebergabe_neuer_chat.txt` (v83), `Zusammenfassung_`.

**Aufräum-Empfehlung Projektspeicher (aktualisiert 01.07.2026):** Im Projekt liegen Dubletten. **Behalten:**
diese konsolidierte `PROJECT_MEMORY.md` als **einzige** Status-/Wissensdatei. **Löschbar:** `memory.md`
**und** `memory_2.md` (beide aufgelöst – Inhalt in Kopfabschnitt „Letzte Sitzung" + §0e/§0f übernommen);
`DSGVO_memory.md` (aufgelöst 05.07. – echter Mehrwert in §0k/R20 übernommen; Rest redundant oder veraltet, z. B.
„SMS deaktivieren" = R21 längst erledigt. Kein zweites Gedächtnis-File führen);
ältere `PROJECT_MEMORY`-Stände (v147/v150/v151), `FEHLERBEHEBUNG.md` (Inhalt in §0/§7), `Zusammenfassung_` (v85),
`Uebergabe_App_v125_9Features.md`, `uebergabe_neuer_chat.txt` (v83), sowie die doppelten `sw.js` und
`User_Update_Pfau_*.json` (jeweils eine, nach Identitäts-Check).

---

*Ende PROJECT_MEMORY. Bei künftigen Aufgaben: zuerst hier prüfen, dann gezielt ergänzen. Rechts-,
Sync- und Store-relevante Änderungen explizit markieren und diese Datei mitpflegen.*
