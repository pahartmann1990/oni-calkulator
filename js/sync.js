// ============================================================
// ONI KALKULATOR – Synchronisation (AP6 / KONZEPT M2+M3+M4)
// M2A: .sav-Dateikopf lesen (versionsunabhängig, Drag & Drop)
// M3:  Ordner-Überwachung per File System Access API (Chrome/Edge)
// M4:  colony_live.json des Mods "KalkulatorSync" einlesen
// ============================================================

// ── M2A: Spielstand-Kopf parsen ─────────────────────────────
// Aufbau (getestet mit Save-Version 7.38):
//   int32 buildVersion · int32 headerSize · int32 headerVersion
//   int32 compressed   · headerSize Bytes UTF-8-JSON
function parseSaveKopf(buffer) {
  const dv = new DataView(buffer);
  if (buffer.byteLength < 16) throw new Error("Datei zu klein für einen ONI-Spielstand");
  const buildVersion = dv.getInt32(0, true);
  const headerSize   = dv.getInt32(4, true);
  if (headerSize <= 0 || headerSize > 100000 || 16 + headerSize > buffer.byteLength) {
    throw new Error("Kein gültiger ONI-Spielstand (Kopfgröße unplausibel)");
  }
  const jsonBytes = new Uint8Array(buffer, 16, headerSize);
  const info = JSON.parse(new TextDecoder("utf-8").decode(jsonBytes));
  return {
    buildVersion,
    name: info.baseName || "Unbenannt",
    zyklus: (info.numberOfCycles || 0) + 1,
    dupes: info.numberOfDuplicants || 0,
    saveVersion: (info.saveMajorVersion || 0) + "." + (info.saveMinorVersion || 0),
    dlcIds: info.dlcIds || [],
    autoSave: !!info.isAutoSave
  };
}

// Kopf-Daten aufs Profil anwenden
function saveKopfAnwenden(kopf, quelle) {
  // Dupe-Anzahl übernehmen (Namen/Traits kommen erst mit Voll-Parse/Mod)
  while (state.dupesListe.length < kopf.dupes) state.dupesListe.push(neuerDupe("Duplikant " + (state.dupesListe.length + 1)));
  if (state.dupesListe.length > kopf.dupes) state.dupesListe.length = kopf.dupes;
  state.dupes = kopf.dupes;
  // DLCs aktivieren, die der Spielstand nutzt
  const dlcMap = { EXPANSION1_ID: "spacedOut", DLC2_ID: "frostyPlanet", DLC3_ID: "bionicBooster", DLC4_ID: "prehistoricPlanet", DLC5_ID: "aquaticPlanet" };
  kopf.dlcIds.forEach(id => { if (dlcMap[id]) state.aktivePacks.add(dlcMap[id]); });
  document.querySelectorAll(".dlc-badge").forEach(b => b.classList.toggle("aktiv", state.aktivePacks.has(b.dataset.pack)));
  const el = document.getElementById("dupe-anzeige");
  if (el) { el.textContent = state.dupes; document.getElementById("dupe-slider").value = state.dupes; }
  state.syncStatus = quelle + ": „" + kopf.name + "“ · Zyklus " + kopf.zyklus + " · " + kopf.dupes + " Dupes · Save v" + kopf.saveVersion;
  renderAlles();
}

async function savDateiVerarbeiten(datei) {
  try {
    const kopf = parseSaveKopf(await datei.arrayBuffer());
    saveKopfAnwenden(kopf, "Spielstand-Import");
    syncMeldung("✅ Importiert: „" + kopf.name + "“ – Zyklus " + kopf.zyklus + ", " + kopf.dupes + " Duplikanten (Save v" + kopf.saveVersion + ")", "ok");
  } catch (e) {
    syncMeldung("❌ Import fehlgeschlagen: " + e.message, "err");
  }
}

// ── M4: colony_live.json des Mods anwenden ──────────────────
// Krankheits-Zuordnung: Mod liefert englische Db-Namen
const LIVE_KRANKHEIT_MAP = {
  "Food Poisoning": "foodsickness", "Slimelung": "slimesickness",
  "Allergic Reaction": "allergies", "Sunburn": "sunburnsickness",
  "Zombie Spores": "zombiesickness", "Radiation Sickness": "radiationsickness"
};
const LIVE_TRAIT_MAP = {
  "Bottomless Stomach": "calorieburner", "Mouth Breather": "mouthbreather",
  "Diver's Lungs": "diverslung", "Gourmet": "gourmet", "Iron Gut": "irongut",
  "Flatulent": "flatulence", "Small Bladder": "smallbladder", "Anemic": "anemic",
  "Narcoleptic": "narcolepsy", "Night Owl": "nightowl", "Early Bird": "earlybird",
  "Loud Sleeper": "snorer", "Green Thumb": "greenthumb",
  "Germ Resistant": "germresistant", "Biohazardous": "biohazardous",
  "Shrivelled Tastebuds": "simpletastes"
};

function liveDatenAnwenden(daten) {
  if (!daten || !Array.isArray(daten.duplikanten)) throw new Error("Unerwartetes JSON-Format");
  state.dupesListe = daten.duplikanten.map((ld, i) => {
    const d = neuerDupe(ld.name || ("Duplikant " + (i + 1)));
    d.traits = (ld.traits || []).map(t => LIVE_TRAIT_MAP[t]).filter(Boolean);
    const krank = (ld.krankheiten || []).map(k => LIVE_KRANKHEIT_MAP[k]).filter(Boolean);
    d.krankheit = krank[0] || "gesund";
    d.liveKalorien = typeof ld.kalorien === "number" ? Math.round(ld.kalorien) : null;
    d.liveStress = typeof ld.stress === "number" ? Math.round(ld.stress) : null;
    return d;
  });
  state.dupes = state.dupesListe.length;
  const el = document.getElementById("dupe-anzeige");
  if (el) { el.textContent = state.dupes; document.getElementById("dupe-slider").value = state.dupes; }
  state.syncStatus = "Live-Mod: Zyklus " + (daten.zyklus || "?") + " (" + (daten.zyklusProzent || 0) + " %) · " + state.dupes + " Dupes";
  renderAlles();
}

// ── M3: Ordner-Überwachung (Chrome/Edge) ────────────────────
let _syncOrdner = null;
let _syncTimer = null;
let _letzterStand = "";

function ordnerSyncVerfuegbar() { return typeof window.showDirectoryPicker === "function"; }

async function ordnerSyncStarten() {
  try {
    _syncOrdner = await window.showDirectoryPicker({ mode: "read" });
    syncMeldung("👀 Überwache Ordner „" + _syncOrdner.name + "“ – alle 5 s …", "ok");
    clearInterval(_syncTimer);
    _syncTimer = setInterval(ordnerPruefen, 5000);
    ordnerPruefen();
  } catch (e) {
    if (e.name !== "AbortError") syncMeldung("❌ Ordner-Freigabe fehlgeschlagen: " + e.message, "err");
  }
}

function ordnerSyncStoppen() {
  clearInterval(_syncTimer); _syncTimer = null; _syncOrdner = null;
  syncMeldung("Ordner-Überwachung beendet.", "");
  renderEinstellungen();
}

async function ordnerPruefen() {
  if (!_syncOrdner) return;
  try {
    // 1. Bevorzugt: colony_live.json (Live-Mod)
    let bester = null, besteZeit = 0, istLive = false;
    for await (const eintrag of _syncOrdner.values()) {
      if (eintrag.kind !== "file") continue;
      const istJson = eintrag.name === "colony_live.json";
      const istSav = eintrag.name.toLowerCase().endsWith(".sav");
      if (!istJson && !istSav) continue;
      const f = await eintrag.getFile();
      if (istJson || (!istLive && f.lastModified > besteZeit)) {
        bester = f; besteZeit = f.lastModified;
        if (istJson) istLive = true;
      }
    }
    if (!bester) { syncMeldung("⚠️ Keine .sav / colony_live.json im Ordner gefunden.", "err"); return; }
    const marke = bester.name + "|" + bester.lastModified;
    if (marke === _letzterStand) return;   // nichts Neues
    _letzterStand = marke;
    if (istLive) {
      liveDatenAnwenden(JSON.parse(await bester.text()));
      syncMeldung("🔴 LIVE: " + state.syncStatus + " · Stand " + new Date(bester.lastModified).toLocaleTimeString("de-DE"), "ok");
    } else {
      const kopf = parseSaveKopf(await bester.arrayBuffer());
      saveKopfAnwenden(kopf, "Auto-Sync");
      syncMeldung("🔄 Auto-Sync: „" + kopf.name + "“ Zyklus " + kopf.zyklus + " · " + new Date(bester.lastModified).toLocaleTimeString("de-DE"), "ok");
    }
  } catch (e) {
    syncMeldung("⚠️ Sync-Fehler (nächster Versuch in 5 s): " + e.message, "err");
  }
}

// ── UI-Helfer ───────────────────────────────────────────────
function syncMeldung(text, art) {
  state.syncMeldung = { text, art };
  const el = document.getElementById("sync-meldung");
  if (el) {
    el.textContent = text;
    el.style.color = art === "err" ? "var(--red)" : art === "ok" ? "var(--green)" : "var(--text-dim)";
  }
}

// Drag & Drop auf die ganze Seite
document.addEventListener("dragover", e => { e.preventDefault(); });
document.addEventListener("drop", e => {
  e.preventDefault();
  const datei = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
  if (datei && datei.name.toLowerCase().endsWith(".sav")) {
    savDateiVerarbeiten(datei);
    wechsleTab("einstellungen");
  }
});
