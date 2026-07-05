// ============================================================
// ONI KALKULATOR – Profil-Speicherung (AP1)
// EINZIGE Datei, die localStorage anfasst (KONZEPT §4).
// Wird VOR app.js geladen; greift auf das globale `state` erst
// zur Laufzeit zu (nach DOMContentLoaded vorhanden).
// ============================================================

const PROFIL_KEY = "oni-kalkulator-profil";
const PROFIL_VERSION = 1;

let _speicherTimer = null;

// ── Speichern (entprellt, damit Slider nicht 50× schreibt) ──
function profilSpeichern() {
  clearTimeout(_speicherTimer);
  _speicherTimer = setTimeout(() => {
    try {
      const daten = {
        version: PROFIL_VERSION,
        dupes: state.dupes,
        aktivePacks: [...state.aktivePacks],
        ausgewaehltePflanzen: state.ausgewaehltePflanzen,
        ausgewaehlteTiere: state.ausgewaehlteTiere,
        strom: state.strom,
        aktiverTab: state.aktiverTab
      };
      localStorage.setItem(PROFIL_KEY, JSON.stringify(daten));
    } catch (e) {
      // Speicher voll oder blockiert (z. B. Privatmodus) – App läuft ohne Speichern weiter
      console.warn("Profil konnte nicht gespeichert werden:", e);
    }
  }, 300);
}

// ── Laden + auf state anwenden ──────────────────────────────
function profilAnwenden() {
  let daten = null;
  try {
    const roh = localStorage.getItem(PROFIL_KEY);
    if (roh) daten = JSON.parse(roh);
  } catch (e) {
    console.warn("Gespeichertes Profil unlesbar – starte mit Standardwerten:", e);
    return;
  }
  if (!daten || typeof daten !== "object") return;

  // Migration künftiger Versionen: hier Fall für Fall umbauen.
  if (daten.version !== PROFIL_VERSION) {
    console.warn("Unbekannte Profilversion", daten.version, "– starte mit Standardwerten");
    return;
  }

  // Feld für Feld defensiv übernehmen (nie blind ersetzen)
  if (Number.isFinite(daten.dupes)) state.dupes = Math.max(1, Math.min(200, daten.dupes));
  if (Array.isArray(daten.aktivePacks)) {
    state.aktivePacks = new Set(daten.aktivePacks);
    state.aktivePacks.add("vanilla"); // Basisspiel immer aktiv
  }
  if (daten.ausgewaehltePflanzen && typeof daten.ausgewaehltePflanzen === "object")
    state.ausgewaehltePflanzen = daten.ausgewaehltePflanzen;
  if (daten.ausgewaehlteTiere && typeof daten.ausgewaehlteTiere === "object")
    state.ausgewaehlteTiere = daten.ausgewaehlteTiere;
  if (daten.strom && Array.isArray(daten.strom.kreise) && daten.strom.kreise.length > 0)
    state.strom = daten.strom;
  if (typeof daten.aktiverTab === "string") state.aktiverTab = daten.aktiverTab;
}

// ── Zentraler Hook: bei jeder Änderung aufrufen ─────────────
function stateGeaendert() {
  profilSpeichern();
  if (typeof renderBilanz === "function") renderBilanz();
}
