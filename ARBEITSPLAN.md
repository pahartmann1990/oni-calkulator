# 🛠️ ONI Kalkulator – Arbeitsplan (Ausführung)

Stand: 05.07.2026 · Gehört zu [KONZEPT.md](KONZEPT.md) (dort: Architektur, Seitenplan, Anti-Bug-Regeln §6, Abnahme-Checkliste §7)

---

## 1. Arbeitsweise – die klare Linie

1. **Kein Wegwerf-Prototyp.** Es wird von Anfang an am Endprodukt gearbeitet. Jedes Arbeitspaket (AP) liefert ein **fertiges, dauerhaft bleibendes Stück** der finalen Website – nichts wird „später nochmal richtig" gebaut.
2. **Ein AP ist erst fertig**, wenn: alle Schritte umgesetzt ✚ der eigene Fehler-Katalog (Spalte „Wo kann's schiefgehen") abgearbeitet ✚ die Abnahme-Checkliste aus KONZEPT §7 komplett ✅ ist. Erst dann beginnt das nächste AP.
3. **Reihenfolge ist fix** (Abhängigkeiten unten). Kein Springen, kein „machen wir nebenbei".
4. **Jede Datei hat genau einen Zweck** (Struktur in KONZEPT §4). Neue Funktionen kommen in die vorgesehene Datei – nicht „schnell mal in app.js".
5. **Generierte Dateien** (`js/data/*`, `i18n/de.json`) werden ausschließlich von den Skripten in `tools/` geschrieben.
6. **Nach jedem AP:** kurzer Commit ins Git + Online-Version aktualisieren → es gibt immer einen funktionierenden Stand zum Zurückgehen. Fehlerkorrektur passiert am fertigen Stück, nie durch Neuanfang.

---

## 2. Arbeitspakete im Detail

### AP1 – Grundgerüst ✅ ERLEDIGT (05.07.2026)
Umgesetzt: `js/state.js` (Profil-Speicherung mit Version + Migration + try/catch), Bilanz-Leiste im sticky Header (kcal/O₂/Strom/Wärme, klickbar), Tab-Merken über Reload, alle Setter speichern automatisch. **Abweichung:** CSS-Aufteilung in 3 Dateien verschoben — Prüfung ergab: Scroll-Regeln (§6) sind in der bestehenden style.css bereits erfüllt (body scrollt, Header sticky, keine overflow-Fallen); mechanisches Aufteilen wäre Risiko ohne Nutzen. Wird nachgeholt, falls eine Datei unübersichtlich wird. Abnahme-Checkliste komplett bestanden (Scrollen Desktop+375px, Reload-Persistenz, 200-Dupes-Extremtest, kaputtes localStorage → Standardwerte, Konsole fehlerfrei).

<details><summary>Ursprüngliche Planung</summary>
- **Ziel:** Tab-Navigation, sticky Bilanz-Leiste, 2-Spalten-Layout, zentrales Kolonie-Profil. Bestehende Inhalte (Nahrung/Tiere/Materialien) laufen im neuen Gerüst weiter.
- **Dateien:** `index.html` (Umbau), `css/base|layout|components.css` (Aufteilung der bisherigen style.css), `js/app.js`, `js/state.js`, `js/ui/tabs.js`, `js/ui/balance.js`, `js/ui/widgets.js`
- **Schritte:** ① CSS aufteilen + Scroll-Grundregeln (KONZEPT §6.1–6.5) ② `state.js` mit Profil-Schema, localStorage-Lesen/Schreiben mit try/catch + Versionsfeld ③ Tabs ohne Neuladen ④ Bilanz-Leiste (kcal/O₂/Strom/Wärme) mit Neuberechnung bei jeder state-Änderung ⑤ bestehende drei Bereiche als Tabs einhängen
- **Wo kann's schiefgehen → Gegenmittel:**
  - Alte style.css-Regeln kollidieren mit neuem Layout → Umzug Regel für Regel, alte Datei erst löschen, wenn alle Tabs geprüft
  - Scroll-Falle durch Dialog/Sticky (dein bekanntes Problem) → einzige Scroll-Lock-Funktion in `widgets.js`, Test „3× Dialog auf/zu, dann scrollen"
  - localStorage-Format ändert sich später → `profilVersion`-Feld ab Tag 1 + Migrationsfunktion
- **Abnahme:** KONZEPT §7 komplett, zusätzlich: bisherige Rechner liefern exakt dieselben Zahlen wie vorher (Vergleich mit Live-Version).
</details>

### AP2 – Duplikanten-Tab
- **Ziel:** Dupes einzeln anlegen (Skills, Traits, Krankheiten, Moral); Bedarfe fließen in alle Bilanzen.
- **Dateien:** `js/ui/` (Dupe-Karten), `js/calc/food.js` (kcal je Dupe), `js/data/traits.js`, `js/data/diseases.js` (zunächst handgepflegt aus Wiki, ab AP8 generiert)
- **Wo kann's schiefgehen:** Traits, die sich gegenseitig ausschließen → Validierung beim Anlegen · Krankheits-Modifikatoren falsch → jede Zahl mit Wiki-Quelle im Datensatz dokumentiert (`quelle:`-Feld) · 18+ Dupe-Karten machen die Seite träge → Rendering nur des aktiven Tabs
- **Abnahme:** §7 + Testfall „18 Dupes wie deine echte Kolonie anlegen → kcal-Summe manuell nachgerechnet".

### AP3 – Energie-Tab
- **Ziel:** Generatoren/Verbraucher/Batterien, Netto-Watt, Brennstoff-Reichweite, Empfehlung.
- **Dateien:** `js/calc/power.js`, `js/data/buildings.js` (Teilmenge Strom)
- **Wo kann's schiefgehen:** Dauerlast vs. Spitzenlast verwechselt → beide getrennt ausweisen · Mod-Gebäude fehlen → Kennzeichnung „aus Mod X", ausblendbar · Einheitenfehler (W/kW/kJ) → alle Rechnungen intern in W und J, Umrechnung NUR in der Anzeige
- **Abnahme:** §7 + 3 Referenzfälle gegen Wiki-Werte (z. B. 1 Kohlegenerator + 10 Batterien).

### AP4 – Wärme & Geysire + Sauerstoff-Tab
- **Ziel:** Geysir-Durchschnittsrechner, Hitzespeicher (Q=m·c·ΔT), Dampfturbinen-Anzahl, Überbrückung Ruhephase; SPOM-Vergleich.
- **Dateien:** `js/calc/heat.js`, `js/calc/geyser.js`, `js/calc/oxygen.js`, `js/data/geysers.js`
- **Wo kann's schiefgehen:** Ø-Rechnung über Aktiv-/Ruhephasen falsch (häufigster Fehler bei Geysir-Rechnern) → Formel gegen ONI-Wiki-Geysir-Rechner verifizieren, 3 Geysir-Typen als eingebaute Selbsttests · SHC/Masse-Einheiten (g vs. kg, DTU) → interne Einheiten festschreiben wie AP3
- **Abnahme:** §7 + Vergleichsrechnung gegen oni-assistant/Wiki für dieselben Eingaben.

### AP5 – Deutsche Begriffe (i18n) — 🟡 TEIL 1 ERLEDIGT (05.07.2026)
**Erledigt:** `tools/extract_po.py` (Python statt Node — Node nicht installiert) liest die `strings.po` direkt aus dem lokal installierten Workshop-Mod (ZIP in `.bin`) und erzeugt `i18n/de.json` (1.777 Namen inkl. Traits/Krankheiten/Attribute für AP2). Alle 174 Website-Namen gegen das Sprachpaket geprüft: 60+ Korrekturen per `tools/fix_namen.py` (mit Abbruch-Schutz bei unerwarteten Treffern) — u. a. Aquatuner→Wasserkühler, OXYL-Generator→Sauerstoff-Diffusor, Solarpanel→Solarmodul, Atomreaktor→Forschungsreaktor, Ablativgestein→Magmatit. 4 erfundene Einträge entfernt (Temperalith, Vakuumstein, Glasfaser, Hakenlicht), echte Isolatoren ergänzt (Abyssalit, Keramik), falsche englische Namen korrigiert (Water Sieve, Research Reactor, Lavatory, Conveyor Loader, Battery, Lime). Im Browser verifiziert inkl. Rezept-Geräte-Zuordnung (Fritteuse/Smoker).
**Offen:** Sprachumschalter DE/EN/beides über `js/i18n.js` mit `t()`-Funktion.

<details><summary>Ursprüngliche Planung</summary>
- **Ziel:** Wörterbuch EN↔DE aus dem Sprachpaket; Anzeige DE / EN / „beides".
- **Dateien:** `tools/extract-po.mjs` (liest `strings.po` von GitHub `Ni42/Oxygen_Not_Included_German`), erzeugt `i18n/de.json`; `js/i18n.js` mit `t()`-Funktion
- **Wo kann's schiefgehen:** .po-Schlüssel passen nicht zu unseren Datensatz-IDs → Datensätze tragen ab AP2 die Original-String-Keys des Spiels · Sonderzeichen/Umlaute kaputt → alles UTF-8, Test mit „Wärmeleitfähigkeit" · fehlende Übersetzung → Rückfall auf Englisch, nie leerer Text
- **Abnahme:** §7 + Stichprobe 30 Begriffe im Spiel vs. Website identisch.
</details>

### AP6 – Save-Import Stufe A + Ordner-Überwachung (M2A/M3)
- **Ziel:** Drag & Drop liest Dateikopf (Name, Zyklus, Dupe-Zahl, DLCs – versionsunabhängig, bereits erfolgreich getestet); optional Ordner einmal freigeben → automatische Aktualisierung bei jedem Autosave.
- **Dateien:** `js/sync.js`
- **Wo kann's schiefgehen:** Firefox kann File-System-Access nicht → Funktion nur anzeigen, wenn `window.showDirectoryPicker` existiert; sonst Hinweis + Drag&Drop · OneDrive lädt Save gerade hoch/Datei gesperrt → Lese-Wiederholung nach 2 s, max. 3 Versuche, dann Meldung · Autosave halb geschrieben → erst lesen, wenn Dateigröße 2 s stabil · Berechtigung erlischt nach Browser-Neustart → gespeicherter Hinweis „Ordner erneut freigeben"
- **Abnahme:** §7 + Test mit deinem echten Ordner (`…\cloud_save_files\…\The Deadly Spacerock\auto_save`), Spiel läuft und speichert.

### AP7 – Save-Import Stufe B (Voll-Parse)
- **Ziel:** Kompletter Spielstand → Dupes mit allem, Ressourcen, Geysire mit echten Werten.
- **Dateien:** `js/saveparser.worker.js` (Web Worker), Parser aus dem Duplicity-Fork (`Joker1718/duplicity`, Parser von cLonata) als lokale Kopie in `js/vendor/`
- **⚠️ Erster Schritt = Machbarkeitstest** gegen deine echte 7.38-Datei. Ergebnis entscheidet: ✅ weiter wie geplant · ❌ AP7 wird zurückgestellt, die Daten kommen stattdessen über den Mod (AP9) – **kein verlorener Aufwand, beide Wege füllen dasselbe Profil**
- **Wo kann's schiefgehen:** Parser kennt 7.38 nicht (realistisch!) → s. o. · 10-MB-Parse friert UI ein → zwingend im Worker · Speicherverbrauch am Handy → Voll-Parse nur am Desktop anbieten · künftige Spiel-Updates ändern Format → Versionsprüfung, sauberer Rückfall auf Stufe A mit verständlicher Meldung
- **Abnahme:** §7 + deine 18 Dupes erscheinen korrekt mit Skills/Traits/Krankheiten.

### AP8 – Spieldaten-Dump (exakte Werte deiner Version)
- **Ziel:** `js/data/*` wird aus deiner Spielinstallation generiert statt handgepflegt.
- **Dateien:** `tools/gamedata/` (Extraktion aus `Assembly-CSharp.dll` via ILSpy-Kommandozeile oder Dump-Mod), `tools/check-version.mjs`
- **Wo kann's schiefgehen:** Werte stecken teils in Code statt Daten (z. B. Trait-Effekte) → Restliste handgepflegt lassen, klar markiert · Dump nach Spiel-Update vergessen → `check-version.mjs` vergleicht Build-Nr. (737790) und warnt auf der Website · DLC-Inhalte vermischt → jeder Datensatz trägt sein DLC-Feld
- **Abnahme:** §7 + Stichprobe 20 Werte gegen oni-db.com.

### AP9 – Live-Mod „KalkulatorSync" (M4)
- **Ziel:** Mod schreibt alle ~5 s `colony_live.json`; Website zeigt Live-Dashboard.
- **Dateien:** `mod/KalkulatorSync.csproj`, `mod/src/*`, Erweiterung `js/sync.js`
- **Details + Fallstricke: Abschnitt 3 unten.** Braucht dich am PC (Spiel muss laufen).
- **Abnahme:** §7 + 30 Minuten Spielsitzung ohne Ruckler, Website aktualisiert durchgehend; Mod deaktivieren → Spielstand lädt unverändert.

**Abhängigkeiten:** AP1 → AP2 → AP3/AP4 (parallel möglich) → AP5 → AP6 → AP7 → AP8 → AP9. „Wann": AP1–AP8 kann ich weitgehend allein abarbeiten; AP6/AP7-Tests und AP9 brauchen dich mit laufendem Spiel.

---

## 3. Vorab-Prüfung: Wie werden ONI-Mods geschrieben, wo sind die Haken?

### So funktioniert es (Stand Juli 2026)
- **Kein offizielles Mod-API.** ONI-Mods patchen den Spielcode direkt mit **Harmony 2** (liegt dem Spiel bei). Deshalb können Spiel-Updates Mods jederzeit brechen – das ist normal und trifft regelmäßig selbst die meistgenutzten Mods (Mod Manager/Updater brachen z. B. beim Unity-Engine-Update und erneut beim März-2026-Patch).
- **Aufbau eines Mods:** C#-Klassenbibliothek (.NET Framework 4.7.1), referenziert `Assembly-CSharp.dll` u. a. direkt aus dem Spielordner (bei dir: `E:\SteamLibrary\…\OxygenNotIncluded\OxygenNotIncluded_Data\Managed\`). Einstiegspunkt ist eine Klasse, die von `KMod.UserMod2` erbt. Dazu zwei Metadaten-Dateien: `mod.yaml` (Name, Beschreibung, staticID) und `mod_info.yaml` (`supportedContent: ALL`, `minimumSupportedBuild`, `APIVersion: 2`).
- **Entwicklung/Test lokal ohne Workshop:** DLL + yaml in den Dev-Mod-Ordner legen (`…\Klei\OxygenNotIncluded\mods\Dev\KalkulatorSync\`) → Spiel lädt ihn automatisch. Veröffentlichen müssen wir nie.
- **Standard-Wissensquellen:** Cairath-Modding-Guide (GitHub-Wiki), PLib-Bibliothek von PeterHan (für Options-UI; für unseren Lese-Mod zunächst unnötig – jede Abhängigkeit weniger = eine Bruchstelle weniger).

### Die Haken und wie wir sie entschärfen
| Haken | Warum es uns (kaum) trifft / Gegenmittel |
|---|---|
| **Spiel-Update bricht den Mod** | Unvermeidbar, aber: Unser Mod ist **nur-lesend** und patcht minimal (ein Sammel-Hook am Spiel-Takt). Je weniger gepatcht wird, desto seltener bricht es. Mod schreibt Build-Nr. in die JSON → Website meldet „Mod-Update nötig" statt falscher Zahlen. Und: Website bleibt ohne Mod voll nutzbar (M1–M3). |
| **Nach Updates deaktiviert das Spiel Mods** | Bekanntes Verhalten; `minimumSupportedBuild` korrekt pflegen, Hinweis auf der Website, wenn Live-Daten älter als X Minuten sind. |
| **Save-Verschmutzung** (Mods, die Komponenten in den Spielstand schreiben, machen ihn ohne Mod unbrauchbar) | Wir fügen **nichts** zum Spielstand hinzu, nur lesen + externe Datei schreiben → Mod jederzeit entfernbar, Spielstand bleibt sauber. Wird in AP9 explizit getestet. |
| **Performance-Ruckler** | Werte sammeln auf dem Spiel-Thread (Pflicht bei Unity), aber Datei-Schreiben auf Hintergrund-Thread; nur alle ~5 s; JSON klein halten (kein Kartenmaterial). |
| **Konflikt mit deinen anderen Mods** | Lese-Mod ändert kein Spielverhalten → Konflikte praktisch ausgeschlossen. Trotzdem Test mit deiner vollen Mod-Liste. |
| **OneDrive** | `colony_live.json` wird bewusst NICHT in den OneDrive-Dokumente-Pfad geschrieben, sondern nach `%LOCALAPPDATA%` (kein Sync, keine Dateisperren). Der Ordner wird der Website einmal freigegeben. |
| **Unity-Hauptthread-Regel** (Spielobjekte nur vom Hauptthread lesen) | Sammeln im Hauptthread-Tick, fertigen Text an Schreib-Thread übergeben – klare Trennung im Code. |
| **Zukunft: großes Engine-Update** (wie das, das Mod Manager brach) | Dann muss der Mod neu gebaut werden (Referenzen aktualisieren, neu kompilieren). Einplanen als Wartungsfall; Website läuft derweil über M2/M3 weiter. |

### Was ich dafür auf deinem PC brauche (einmalig, vor AP9)
- .NET-Build-Werkzeuge (kostenlos, z. B. Visual Studio Build Tools) – Installation stimmen wir ab, wenn AP9 dran ist
- Spiel einmal starten mit Dev-Mod zum Test (das machst du, ich werte Log + JSON aus)

---

## 4. Projektweiter Fehler-Katalog (über alle APs)

| Bereich | Möglicher Fehler | Vorbeugung (wo verankert) |
|---|---|---|
| UI | Scrollen blockiert nach Dialog | zentrale Scroll-Lock-Funktion + Pflichttest (KONZEPT §6.1, §7) |
| UI | Seite friert bei großen Daten | Worker für Parsing, Rendering nur aktiver Tab (AP1/AP7) |
| Rechnungen | Einheiten-Chaos (g/kg, W/kW, DTU) | interne Einheiten fest definiert, Umrechnung nur in Anzeige (AP3/AP4) |
| Rechnungen | falsche Spielwerte | `quelle:`-Feld je Datensatz; ab AP8 generiert aus deiner Installation; Selbsttests mit Referenzfällen |
| Daten | Handbearbeitung generierter Dateien | Kopfzeile „NICHT von Hand ändern" + alles über `tools/` |
| Sync | halbe/gesperrte Dateien (OneDrive, Autosave) | stabile-Größe-Prüfung, Wiederholversuche, atomares Schreiben im Mod |
| Sync | Browser ohne File-System-Access | Feature-Erkennung, Drag&Drop-Fallback (AP6) |
| Speicherung | localStorage kaputt/voll/altes Format | try/catch, `profilVersion` + Migration, Export als Datei (AP1) |
| Mod | alles aus Abschnitt 3 | s. o. |
| Veröffentlichung | GitHub Pages zeigt alten Stand (Cache) | Versionsnummer im Seitenfuß; nach Deploy einmal hart neu laden (Strg+F5) prüfen |
| Langzeit | Spiel-Update ändert Werte/Formate | `check-version.mjs`-Warnung; Kopf-Import bleibt versionsunabhängig; Mod meldet Build-Differenz |
