# 🧭 ONI Kalkulator – Komplettplan v2

Stand: 05.07.2026 · Basis: bestehende Website `oni-calkulator` (live auf GitHub Pages)

---

## 0. Geprüfte Fakten (alles am echten System getestet)

| Was | Ergebnis |
|---|---|
| Spiel installiert | `E:\SteamLibrary\steamapps\common\OxygenNotIncluded` (Build 737790) |
| Spielstände | `C:\Users\pahar\OneDrive\Dokumente\Klei\OxygenNotIncluded\cloud_save_files\…` ⚠️ OneDrive-Umleitung! |
| Aktuelle Kolonie | „The Deadly Spacerock", Zyklus 1159, **18 Duplikanten**, 10,6 MB |
| Save-Version | **7.38** · DLCs: Spaced Out!, Frosty, Bionic, Prehistoric, Aquatic |
| Save-Kopf lesbar? | ✅ **JA, getestet** – Name, Zyklus, Dupe-Anzahl, DLCs stehen als Klartext-JSON im Dateikopf |
| Voll-Parser | ⚠️ `oni-save-parser` (npm) kann nur bis 7.17 → gepflegter Fork nötig: `Joker1718/duplicity` (Parser von cLonata) – muss gegen 7.38 getestet werden |
| Deutsches Sprachpaket | Workshop-ID 929139073, lokal als `.bin` auf E:; Quelldatei `strings.po` offen auf GitHub `Ni42/Oxygen_Not_Included_German` |
| Mods des Users | `…\Klei\OxygenNotIncluded\mods\mods.json` vorhanden |
| Auto-Sync per Mod erprobt? | ✅ Tools Not Included betreibt seit Jahren einen automatischen Hintergrund-Upload-Mod |

## 0b. Marktübersicht (Kurzfassung, Recherche Juli 2026)

- **ONI Assistant** – Geysir/Raketen/Nahrung + DB · **onicalc.com** – Netto-Bilanz pro Ressource · **onicalculator.com** – Raketen/Nahrung · **oni-db.com** – beste Datenbank · **Tools Not Included** – Seed-Browser + Auto-Upload-Mod · **Duplicity** – Save-Editor
- **Unsere Nische:** deutsch, Kolonie-Profil (Dupes+Traits+Krankheiten+Mods), Save-Import/Live-Sync, Empfehlungen („was ist für MEINE Kolonie am effizientesten")

---

## 1. Leitprinzipien (gegen die typischen „irgendwas geht immer nicht"-Probleme)

1. **So wenig Technik wie möglich:** eine statische Website, pures HTML/CSS/JS, **kein Framework, kein Build-Schritt**. Jede zusätzliche Technologie ist eine zusätzliche Fehlerquelle.
2. **Funktioniert immer dreifach:** online (GitHub Pages), lokal per Doppelklick auf `index.html`, und mit Live-Daten. Kein Modus darf einen anderen kaputtmachen.
3. **Ein Zustand, eine Wahrheit:** Alle Seiten rechnen mit demselben Kolonie-Profil. Egal ob es per Hand, per Save-Import oder per Mod gefüllt wurde.
4. **Jedes Arbeitspaket hat eine Abnahme-Checkliste** (Abschnitt 7) – erst wenn alles ✅ ist, gilt es als fertig. Scrollen steht ganz oben auf der Liste.
5. **Generierte Daten anfassen verboten:** Spielwerte und Übersetzungen werden per Skript erzeugt, nie von Hand editiert → keine Tippfehler-Bugs.

---

## 2. Architektur: Wie kommen die Daten in die Webseite?

Vier Wege, aufsteigend komfortabel. Alle füllen dasselbe Kolonie-Profil:

### M1 – Manuell (funktioniert überall, sofort)
Dupes, Geysire, Ressourcen anklicken/eintragen. Fallback für jeden Browser, auch am Handy.

### M2 – Spielstand-Import per Drag & Drop (kein Extra-Programm)
.sav-Datei auf die Seite ziehen.
- **Stufe A (sicher, sofort machbar):** Dateikopf lesen → Kolonie-Name, Zyklus, Dupe-Anzahl, DLCs. Funktioniert **unabhängig von der Save-Version** (selbst getestet mit 7.38).
- **Stufe B (mächtig, mit Versionsrisiko):** Voll-Parse mit dem Duplicity-Fork-Parser → alle Dupes mit Skills/Traits/Krankheiten/Kalorien, Ressourcen, Geysire mit echten Ausbruchswerten. Läuft in einem **Web Worker** (10-MB-Datei blockiert sonst die Oberfläche = eingefrorene Seite). Bei unbekannter Save-Version: saubere Meldung + automatischer Rückfall auf Stufe A. **Nie weiße Seite.**

### M3 – Auto-Sync OHNE Mod und OHNE Extra-Software (der Clou)
Chrome/Edge können mit der **File System Access API** nach einmaliger Freigabe einen lokalen Ordner dauerhaft lesen. Die Website (auch die GitHub-Pages-Version!) bekommt einmal den Save-Ordner gezeigt und prüft dann alle paar Sekunden: neues Autosave da? → automatisch neu importieren.
→ Quasi-live bei jedem Autosave, **läuft komplett im Browser**, genau wie du es wolltest. Firefox kann das nicht → dort erscheint der Hinweis „bitte Chrome/Edge nutzen oder Drag & Drop (M2)".

### M4 – Live-Mod (echtes Live-Dashboard, Sekunden-Takt)
**Bewusste Design-Entscheidung: Datei statt Server.** Der C#-Mod (Harmony, wie alle ONI-Mods) schreibt alle ~5 Sekunden eine kleine `colony_live.json` (wenige KB) in `…\Klei\OxygenNotIncluded\kalkulator\`. Die Website liest sie über denselben M3-Mechanismus.

Warum kein HTTP-/WebSocket-Server im Mod und keine Cloud-API?
- localhost-Server aus einer HTTPS-Seite ansprechen = CORS-/Mixed-Content-Fallen in jedem Browser anders → genau die Sorte Bug, die du kennst
- Eine Cloud-API bräuchte trotzdem ein Programm auf dem PC, das die Daten hochlädt – gewonnen wäre nichts, aber es kämen Server, Kosten und Datenschutz dazu
- Eine Datei kann nicht „offline" sein, hat keine Ports, keine Firewall-Nachfragen, und beide Seiten kann man einzeln testen
- **Atomares Schreiben** (erst `*.tmp`, dann umbenennen) → die Website liest nie eine halbe Datei

Inhalt der `colony_live.json`: Zyklus + Uhrzeit im Zyklus · je Dupe: Name, Attribute, Skills, Traits, Kalorien, Gesundheit, Stress, **Krankheiten** · Lagerbestände je Material · Stromnetz (Erzeugung/Verbrauch/Batteriestand) · Nahrungsvorrat kcal · Geysir-Status (aktiv/ruhend, Restzeit).

*Optionale Ausbaustufe M5 (später, nur bei Bedarf): Mod lädt die JSON zusätzlich zu einem Mini-Cloud-Endpunkt hoch → Kolonie vom Handy aus einsehbar, auch unterwegs.*

---

## 3. Seitenplan – welcher Tab enthält was

Layout jedes Fach-Tabs: **links BEDARF, rechts BESTAND/PRODUKTION, unten Empfehlungszeile.** Immer sichtbar: Bilanz-Leiste (kcal / O₂ / Strom / Wärme als Ampeln, klickbar).

| Tab | Links (Bedarf) | Rechts (Bestand/Produktion) | Rechnet / empfiehlt |
|---|---|---|---|
| **📊 Übersicht** | — Dashboard: alle 4 Bilanzen groß, Probleme sortiert nach Dringlichkeit, „Zyklus 1159 · 18 Dupes" | | Klick auf Problem springt in den Tab |
| **🧑‍🚀 Duplikanten** | Gesamt: kcal, O₂, Wasser, Klo, Moral-Erwartung | Dupe-Karten: Name, Skills, Traits, Krankheit (verändert Bedarf!), Interessen | „Wen auf was skillen"; Moral-Check je Dupe |
| **🍗 Nahrung** | kcal/Zyklus nach Dupes+Traits+Krankheit; Qualitäts-Anspruch | Meine Pflanzen/Felder, Vorrat, Rezepte + Kochgeräte | Fehlmenge → „X Pflanzen mehr / Rezept Y ist effizienter (kcal pro Wasser/Dünger)" |
| **🐾 Tiere** | gewünschte Produkte (Eier, Fleisch, Kohle …) | Ställe, Tierarten, Futterverbrauch | Stall-Rechner: Ställe & Futter für Ziel X; Zucht-Hinweise |
| **💨 Sauerstoff** | g/s O₂ nach Dupes (Mouth Breather!) + Gebäude | Elektrolyseure/OXYL/Farne + Wasser-/Stromquellen | SPOM-Varianten-Vergleich: O₂ pro Watt pro Wasser, Ranking |
| **⚡ Energie** | Verbraucherliste (aus Gebäuden) W + Spitzenlast | Generatoren, Brennstoff-Reichweite, Batterien | Netto-W, Laufzeit, „günstigster Ausbau mit DEINEN Ressourcen", Abwärme je Option |
| **🌡️ Wärme & Geysire** | Wärmelast der Basis (Gebäude + Dupes), Kühlziel °C | Meine Geysire/Vulkane mit Ausbruchswerten; Kühler (AT, Wheezewort, Eis) | Ø-Ausstoß g/s über volle Periode; **Hitzespeicher: Q=m·c·ΔT** → nötige Masse/Material; Dampfturbinen-Anzahl; Überbrückung der Ruhephase |
| **🧱 Materialien** | — Nachschlagen + Vergleich | | „bester Isolator / Leiter, den du HAST"; Sortierung nach Leitfähigkeit, SHC, Schmelzpunkt |
| **📚 Datenbank** | — das „Wikipedia mit Kontext": alles durchsuchbar (DE+EN), Querverweise wie oni-db | | Jede Karte hat „→ in meine Kolonie übernehmen" |
| **⚙️ Einstellungen** | Sprache DE/EN/beides · DLC-Filter · Mod-Liste (Import aus `mods.json`) · Datenquelle M1–M4 mit Status „zuletzt synchron: Zyklus …" · Kalorien-Schwierigkeit · Profile (mehrere Kolonien) · Export/Import als Datei | | |

---

## 4. Ordner- und Dateistruktur (wer schreibt was wohin)

```
oni-calkulator/
├── index.html            # EINZIGE HTML-Datei; Tabs schaltet JS um (kein Neuladen)
├── css/
│   ├── base.css          # Farben, Schrift, Reset – und die Scroll-Grundregeln (Abschn. 6!)
│   ├── layout.css        # Kopfzeile, Bilanz-Leiste (sticky), Tabs, 2-Spalten-Raster (mobil: gestapelt)
│   └── components.css    # Karten, Tabellen, Ampeln, Eingaben, Dialoge
├── js/
│   ├── app.js            # Start, Tab-Umschaltung, ruft render() der Module
│   ├── state.js          # ⭐ Kolonie-Profil. EINZIGE Datei, die localStorage anfasst.
│   ├── i18n.js           # lädt i18n/de.json, Funktion t('Mealwood') → „Mahlzeitpflanze"
│   ├── sync.js           # M2 Drag&Drop, M3/M4 Ordner-Überwachung, Save-Kopf-Parser
│   ├── saveparser.worker.js  # M2 Stufe B: Voll-Parse im Web Worker (blockiert nie die UI)
│   ├── calc/             # reine Rechenfunktionen, KEIN DOM-Zugriff → einzeln testbar
│   │   ├── food.js · oxygen.js · power.js · heat.js · geyser.js
│   ├── ui/
│   │   ├── tabs.js · balance.js · twocol.js · widgets.js (Ampel, Zahlenfeld m. Validierung, Dialog m. Scroll-Aufräumen)
│   └── data/             # 🤖 GENERIERT – Kopfzeile „NICHT von Hand ändern"
│       ├── plants.js · critters.js · buildings.js · geysers.js
│       ├── materials.js · diseases.js · traits.js · recipes.js
├── i18n/
│   └── de.json           # 🤖 generiert aus strings.po des Sprachpakets
├── tools/                # Node-Skripte, NUR für Entwicklung, nicht auf der Website
│   ├── extract-po.mjs    # strings.po (GitHub Ni42/…) → i18n/de.json
│   ├── gamedata/         # Daten-Dump aus der Spielinstallation → js/data/*.js
│   └── check-version.mjs # warnt, wenn Spiel-Build ≠ Daten-Dump-Build
├── mod/                  # Stufe M4: C#-Mod „KalkulatorSync" (eigenes Teilprojekt)
│   ├── KalkulatorSync.csproj
│   └── src/              # Harmony-Patch: Sammler + atomarer JSON-Schreiber (5-s-Takt)
├── KONZEPT.md · README.md · LICENSE
```

**Datenflüsse (eine Richtung, keine Zirkel):**
`tools/` → schreibt → `js/data/` + `i18n/` (nur bei Entwicklung)
`mod/` → schreibt → `…\Klei\…\kalkulator\colony_live.json` (im Spiel)
`sync.js` → liest Save/JSON → füllt → `state.js` → alle Tabs lesen NUR aus `state.js`

---

## 5. Der Live-Mod im Detail (M4)

- **Technik:** C# + Harmony (Standard bei ONI), abgelegt als lokaler Mod in `…\Klei\OxygenNotIncluded\mods\local\KalkulatorSync\`
- **Was er tut:** Hängt sich an den Spiel-Takt (alle ~5 s bzw. je Zyklusabschnitt), sammelt die Werte aus Abschnitt 2/M4 und schreibt sie **atomar** (`.tmp` → umbenennen) als JSON
- **Was er bewusst NICHT tut:** keinen Server öffnen, nichts ins Spiel zurückschreiben, nichts ins Internet senden → kann nichts kaputtmachen, VAC-/Multiplayer-unbedenklich
- **Update-Sicherheit:** Der Mod schreibt seine Spiel-Build-Nummer in die JSON; die Website vergleicht und meldet freundlich „Mod-Update nötig" statt falsch zu rechnen
- **Verträglichkeit mit deinen anderen Mods:** reiner Lese-Mod ohne Spielverhalten-Änderung → keine Konflikte zu erwarten; deine `mods.json` wird mit ausgelesen, damit die Website weiß, welche Mod-Inhalte gelten

## 6. Anti-Bug-Regeln (Pflicht bei jeder Umsetzung)

**Scrollen (dein Hauptärgernis – daher Regel Nr. 1):**
1. Die Seite selbst (`body`) ist die einzige vertikale Scrollfläche. **Niemals** `overflow: hidden` auf `html`/`body` – einzige Ausnahme: offener Dialog, und der MUSS es beim Schließen wieder entfernen (häufigster „Scrollen geht nicht mehr"-Bug!). Dafür gibt es EINE zentrale Funktion in `widgets.js`, nirgendwo sonst.
2. Kopf- und Bilanz-Leiste sind `position: sticky` (scrollt natürlich mit), nicht `fixed` (verdeckt Inhalt, verursacht Sprünge).
3. **Keine festen Höhen** (`height: 100vh` o. Ä.) auf Inhaltscontainern – nur `min-height`. Feste Höhen + viel Inhalt = abgeschnittener, unscrollbarer Bereich.
4. Breite Tabellen scrollen nur horizontal **im eigenen Wrapper** (`overflow-x: auto`), niemals die ganze Seite.
5. Test grundsätzlich auch bei 375 px Breite (Handy) und mit 200 Dupes Inhalt.

**JavaScript:**
6. ES-Module, kein Framework, kein Build → was im Editor steht, läuft im Browser.
7. `state.js` ist die einzige Wahrheit; jedes `render()` ist wiederholbar ohne Nebenwirkungen.
8. Jede Zahleneingabe hat min/max und NaN-Schutz (zentrales Eingabe-Widget, nicht 30 Einzellösungen).
9. `try/catch` um localStorage, Datei- und JSON-Zugriffe → verständliche Meldung im UI, **nie weiße Seite**. Kaputtes localStorage ⇒ Start mit Standardwerten + Hinweis.
10. Browser-Fähigkeiten werden erkannt: kein File-System-Access (Firefox) ⇒ Funktion ausgeblendet + Drag&Drop angeboten. Kein Web Worker ⇒ nur Kopf-Import.
11. Schweres Parsen (10-MB-Save) läuft im Web Worker – die Oberfläche friert nie ein.

## 7. Abnahme-Checkliste (gilt für JEDES Arbeitspaket)

- [ ] Vertikal scrollen: Desktop + 375 px, mit vollem Inhalt (18+ Dupes) und nach 3× Dialog öffnen/schließen
- [ ] Alle Tabs erreichbar; Eingaben überleben Tab-Wechsel UND Seiten-Reload
- [ ] Extremfälle: 0 Dupes, 200 Dupes, leeres Profil – keine Fehler, sinnvolle Anzeige
- [ ] Kaputtes/gelöschtes localStorage → App startet sauber
- [ ] Offline-Doppelklick auf index.html funktioniert (keine Online-Abhängigkeit im Kern)
- [ ] Browser-Konsole ohne Fehler (F12)
- [ ] Bilanz-Leiste reagiert sofort auf die neue Funktion

## 8. Roadmap (konkrete Arbeitspakete)

| AP | Inhalt | Ergebnis, das du siehst |
|---|---|---|
| **1** | Umbau Grundgerüst: Tabs, sticky Bilanz-Leiste, 2-Spalten-Layout, `state.js`, Profile | neue Oberfläche, bestehende Inhalte (Nahrung/Tiere/Materialien) laufen darin weiter |
| **2** | Duplikanten-Tab: Dupes einzeln mit Skills/Traits/Krankheiten; Bedarfe fließen in alle Bilanzen | „18 Dupes angelegt → kcal/O₂-Bilanz stimmt live" |
| **3** | Energie-Tab (Generatoren, Verbraucher, Netto-W, Empfehlung) | Strom-Ampel wird echt |
| **4** | Wärme & Geysire (Ø-Ausstoß, Hitzespeicher-Mathe, Turbinen) + Sauerstoff-Tab | Vulkan-Rechner |
| **5** | i18n: `extract-po.mjs` + Umstellung auf Wörterbuch (DE/EN/beides) | echte Spielbegriffe überall |
| **6** | Save-Import Stufe A (Kopf) + M3-Ordnerüberwachung | Seite zeigt automatisch „Zyklus 1159, 18 Dupes" nach jedem Autosave |
| **7** | Save-Import Stufe B (Voll-Parse im Worker, Fork-Parser testen gegen 7.38) | Dupes/Geysire/Ressourcen erscheinen ohne Tippen |
| **8** | Daten-Dump aus Spielinstallation → `js/data/` v2 | exakte Werte deiner Version/DLCs |
| **9** | C#-Mod KalkulatorSync (M4) | echtes Live-Dashboard im Sekundentakt |

Jedes AP ist einzeln nutzbar → nach jedem Schritt hast du etwas Funktionierendes.

## 9. Risiken & Gegenmittel

| Risiko | Gegenmittel |
|---|---|
| Save-Format ändert sich (Spiel-Update) | Kopf-Import (Stufe A) ist versionsunabhängig; Voll-Parser mit Versionsprüfung + sauberem Rückfall |
| Parser-Fork kann 7.38 nicht | AP7 beginnt mit einem Testlauf gegen deine echte Datei; falls nein: Werte kommen ersatzweise über den Mod (AP9) |
| Mod bricht bei Spiel-Update | Build-Nummer-Vergleich + Meldung; Mod ist nur-lesend, Spiel bleibt heil |
| OneDrive synct Save gerade beim Lesen | Lese-Wiederholung mit Verzögerung; Autosave-Dateien werden erst nach Schreibende angefasst |
| Klei-Urheberrecht (Bilder) | öffentliche Seite: eigene Icons/SVG; Original-Sprites nur lokal privat |
| Mods verändern Spielwerte | Mod-Liste im Profil; Rechner kennzeichnen Mod-abhängige Werte |
