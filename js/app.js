// ============================================================
// ONI KALKULATOR – App-Logik
// ============================================================

// ── ZUSTAND ──────────────────────────────────────────────
const state = {
  dupes: 8,
  aktivePacks: new Set(["vanilla"]),
  ausgewaehltePflanzen: {},  // { pflanzeId: anzahl }
};

// ── INIT ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initDLC();
  initDupeControl();
  initTabs();
  renderAlles();
});

// ── DLC INIT ──────────────────────────────────────────────
function initDLC() {
  document.querySelectorAll(".dlc-badge").forEach(badge => {
    const packId = badge.dataset.pack;
    if (state.aktivePacks.has(packId)) badge.classList.add("aktiv");

    badge.addEventListener("click", () => {
      if (packId === "vanilla") return; // Vanilla immer aktiv
      if (state.aktivePacks.has(packId)) {
        state.aktivePacks.delete(packId);
        badge.classList.remove("aktiv");
      } else {
        state.aktivePacks.add(packId);
        badge.classList.add("aktiv");
      }
      renderAlles();
    });
  });
}

// ── DUPE CONTROL ──────────────────────────────────────────
function initDupeControl() {
  const slider   = document.getElementById("dupe-slider");
  const display  = document.getElementById("dupe-anzeige");
  const btnPlus  = document.getElementById("dupe-plus");
  const btnMinus = document.getElementById("dupe-minus");

  function setDupes(n) {
    n = Math.max(1, Math.min(200, n));
    state.dupes = n;
    display.textContent = n;
    slider.value = n;
    renderAlles();
  }

  slider.addEventListener("input",  () => setDupes(+slider.value));
  btnPlus.addEventListener("click",  () => setDupes(state.dupes + 1));
  btnMinus.addEventListener("click", () => setDupes(state.dupes - 1));
}

// ── TABS ──────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const ziel = btn.dataset.tab;
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("aktiv"));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("aktiv"));
      btn.classList.add("aktiv");
      document.getElementById("tab-" + ziel).classList.add("aktiv");
    });
  });
}

// ── ALLES RENDERN ─────────────────────────────────────────
function renderAlles() {
  renderUebersicht();
  renderNahrung();
  renderTiere();
  renderMaterialien();
}

// ══════════════════════════════════════════════════════════
// TAB 1: ÜBERSICHT
// ══════════════════════════════════════════════════════════
function renderUebersicht() {
  const container = document.getElementById("bedarf-karten");
  const d = ONI.duplikantBedarf;
  const n = state.dupes;

  const eintraege = [
    { key: "kalorien",           mult: n    },
    { key: "sauerstoff",         mult: n    },
    { key: "co2Produktion",      mult: n    },
    { key: "wasserToilette",     mult: n    },
    { key: "schmutzwasser",      mult: n    },
    { key: "wasserWaschbecken",  mult: n    },
  ];

  container.innerHTML = eintraege.map(e => {
    const item   = d[e.key];
    const gesamt = item.wert * e.mult;
    const anzeige = gesamt >= 1000 ? (gesamt / 1000).toFixed(1) + " kg" : gesamt.toLocaleString("de-DE") + " g";
    return `
      <div class="bedarf-karte">
        <div class="bedarf-icon">${item.icon}</div>
        <div class="bedarf-name">${item.name}</div>
        <div class="bedarf-wert">${item.einheit === "kcal" ? gesamt.toLocaleString("de-DE") : anzeige}</div>
        <div class="bedarf-einheit">${item.einheit === "kcal" ? "kcal / Zyklus" : "/ Zyklus"}</div>
      </div>`;
  }).join("");

  // Zusammenfassung
  document.getElementById("uebersicht-zusammenfassung").innerHTML = `
    <div class="tipp-box">
      <span class="tipp-icon">💡</span>
      <div>
        <strong>${n} Duplikant${n !== 1 ? "en" : ""}</strong> brauchen pro Zyklus (600s) insgesamt
        <strong>${(n * 2000).toLocaleString("de-DE")} kcal</strong> Nahrung,
        <strong>${((n * 60000) / 1000).toFixed(0)} kg</strong> Sauerstoff und produzieren
        <strong>${((n * 20000) / 1000).toFixed(0)} kg</strong> CO₂.
      </div>
    </div>`;
}

// ══════════════════════════════════════════════════════════
// TAB 2: NAHRUNGSRECHNER
// ══════════════════════════════════════════════════════════
function renderNahrung() {
  renderPflanzListe();
  renderNahrungsTabelle();
}

function renderPflanzListe() {
  const container = document.getElementById("pflanz-liste");
  container.innerHTML = ONI.pflanzen.map(p => {
    const aktiv = state.aktivePacks.has(p.pack);
    const ausgewaehlt = state.ausgewaehltePflanzen[p.id] !== undefined;
    const menge = state.ausgewaehltePflanzen[p.id] || 0;
    const kpz = (p.kcalProErnte / p.wachstumszyklen).toFixed(0);
    const benoetigt = Math.ceil((state.dupes * 2000) / (p.kcalProErnte / p.wachstumszyklen));

    return `
      <div class="pflanz-item ${ausgewaehlt ? "ausgewaehlt" : ""} ${!aktiv ? "dlc-inaktiv" : ""}"
           data-id="${p.id}" onclick="togglePflanze('${p.id}', event)">
        <span class="pflanz-icon">${wikiImg(p, 36)}</span>
        <div class="pflanz-info">
          <div class="pflanz-name">${p.name}</div>
          <div class="pflanz-kcal">${kpz} kcal/Zyklus · ${p.wachstumszyklen} Zyklen · <em>${p.englisch}</em></div>
          ${!aktiv ? `<span class="tag tag-lila">❄️ ${packName(p.pack)}</span>` : ""}
        </div>
        <div class="pflanz-anzahl-wrap" onclick="event.stopPropagation()">
          <input type="number" class="pflanz-anzahl-input"
                 min="0" max="500"
                 value="${menge}"
                 placeholder="0"
                 data-id="${p.id}"
                 oninput="setPflanzeAnzahl('${p.id}', this.value)"
                 title="Anzahl Pflanzen die du hast">
          <span style="font-size:10px;color:var(--text-dim)" data-tooltip="Empfohlen für ${state.dupes} Dupes">
            / ${benoetigt} 🎯
          </span>
        </div>
      </div>`;
  }).join("");
}

function togglePflanze(id, event) {
  if (event.target.tagName === "INPUT") return;
  if (state.ausgewaehltePflanzen[id] !== undefined) {
    delete state.ausgewaehltePflanzen[id];
  } else {
    state.ausgewaehltePflanzen[id] = 0;
  }
  renderNahrung();
}

function setPflanzeAnzahl(id, wert) {
  const n = Math.max(0, parseInt(wert) || 0);
  state.ausgewaehltePflanzen[id] = n;
  renderNahrungsTabelle();
}

function renderNahrungsTabelle() {
  const container = document.getElementById("nahrung-tabelle");
  const gesamtBedarf = state.dupes * 2000;

  let gesamtProduktion = 0;
  const zeilen = ONI.pflanzen.map(p => {
    const aktiv = state.aktivePacks.has(p.pack);
    if (!aktiv) return null;

    const anzahl  = state.ausgewaehltePflanzen[p.id] || 0;
    const kpz     = p.kcalProErnte / p.wachstumszyklen;
    const produktion = anzahl * kpz;
    const benoetigt  = Math.ceil(gesamtBedarf / kpz);
    const diff       = produktion - gesamtBedarf;

    gesamtProduktion += produktion;

    const statusKlasse = anzahl === 0 ? "" : produktion >= gesamtBedarf ? "status-ok" : "status-warn";

    return `
      <tr>
        <td><span class="pflanz-icon">${wikiImg(p, 24)}</span> ${p.name}</td>
        <td style="color:var(--text-dim)">${anzahl}</td>
        <td style="color:var(--accent)">${anzahl > 0 ? Math.round(produktion).toLocaleString("de-DE") + " kcal" : "–"}</td>
        <td style="color:var(--blue)">${benoetigt} Stück</td>
        <td>
          ${anzahl > 0
            ? `<span class="status-badge ${produktion >= gesamtBedarf ? "badge-ok" : "badge-warn"}">
                ${produktion >= gesamtBedarf ? "✓" : "⚠"} ${Math.abs(Math.round(diff)).toLocaleString("de-DE")} kcal ${diff >= 0 ? "Überschuss" : "fehlen"}
               </span>`
            : "–"}
        </td>
      </tr>`;
  }).filter(Boolean);

  const gesamtStatus = gesamtProduktion >= gesamtBedarf
    ? `<span class="badge-ok status-badge">✓ Genug: +${Math.round(gesamtProduktion - gesamtBedarf).toLocaleString("de-DE")} kcal Überschuss</span>`
    : `<span class="badge-err status-badge">✗ Fehlt: ${Math.round(gesamtBedarf - gesamtProduktion).toLocaleString("de-DE")} kcal</span>`;

  container.innerHTML = `
    <table class="vergleich-table">
      <thead>
        <tr>
          <th>Pflanze</th>
          <th style="color:var(--text-dim)">Ich habe</th>
          <th style="color:var(--green)">Produktion</th>
          <th style="color:var(--blue)">Benötigt (${state.dupes} Dupes)</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${zeilen.join("") || `<tr><td colspan="5" class="leer-zustand">Wähle Pflanzen aus der linken Liste</td></tr>`}
        ${zeilen.length > 0 ? `
        <tr style="background:var(--bg-base)">
          <td colspan="1" style="font-weight:700;color:var(--text-head)">GESAMT</td>
          <td>–</td>
          <td style="font-weight:700;color:var(--green)">${Math.round(gesamtProduktion).toLocaleString("de-DE")} kcal</td>
          <td style="color:var(--blue)">${gesamtBedarf.toLocaleString("de-DE")} kcal</td>
          <td>${gesamtStatus}</td>
        </tr>` : ""}
      </tbody>
    </table>
    ${zeilen.length > 0 ? `
    <div style="margin-top:12px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
        <span style="font-size:12px;color:var(--text-dim)">Kaloriendeckung</span>
        <span style="font-size:12px;font-weight:700;color:${gesamtProduktion >= gesamtBedarf ? "var(--green)" : "var(--red)"}">
          ${gesamtBedarf > 0 ? Math.round((gesamtProduktion / gesamtBedarf) * 100) : 0}%
        </span>
      </div>
      <div class="fortschritt">
        <div class="fortschritt-fill ${gesamtProduktion >= gesamtBedarf ? "fill-ok" : "fill-err"}"
             style="width:${Math.min(100, gesamtBedarf > 0 ? (gesamtProduktion / gesamtBedarf) * 100 : 0)}%"></div>
      </div>
    </div>` : ""}`;
}

// ══════════════════════════════════════════════════════════
// TAB 3: TIERE & STÄLLE
// ══════════════════════════════════════════════════════════
function renderTiere() {
  const container = document.getElementById("tier-karten");
  container.innerHTML = ONI.tiere.map(tier => {
    const aktiv = state.aktivePacks.has(tier.pack);
    const stallCount = Math.ceil(state.dupes / tier.maxProStall);

    const nahrungItems = tier.nahrung.map(n =>
      `<div class="io-item">• ${formatMenge(n.menge, n.einheit)} ${n.name}</div>`
    ).join("");

    const produktionItems = tier.produktion.map(p =>
      `<div class="io-item produziert">${p.icon} ${p.menge > 0 ? formatMenge(p.menge, p.einheit) : p.einheit} ${p.name}</div>`
    ).join("");

    const variantenHTML = tier.varianten.length > 0
      ? `<details style="margin-top:8px">
          <summary style="cursor:pointer;font-size:11px;color:var(--text-dim);padding:4px 0">
            ${tier.varianten.length} Variante${tier.varianten.length > 1 ? "n" : ""}
          </summary>
          ${tier.varianten.map(v => `
            <div class="variante-badge">
              <div class="variante-name">🔀 ${v.name}</div>
              <div class="variante-info">Frisst: ${v.sonderNahrung}<br>Produziert: ${v.sonderProduktion}</div>
            </div>`).join("")}
        </details>`
      : "";

    return `
      <div class="tier-karte ${!aktiv ? "dlc-inaktiv" : ""}">
        <div class="tier-header">
          <span class="tier-icon">${wikiImg(tier, 52, "wiki-img-tier")}</span>
          <div>
            <div class="tier-name">${tier.name}</div>
            <div class="tier-englisch">${tier.englisch} · ${packBadge(tier.pack)}</div>
            <div style="font-size:11px;color:var(--text-dim);margin-top:2px">
              🏠 ${tier.lebensraum} · max. ${tier.maxProStall} pro Stall
            </div>
          </div>
        </div>
        <div class="tier-body">
          <div class="io-row">
            <span class="io-label">🍽️ Nahrung:</span>
            <div class="io-items">${nahrungItems}</div>
          </div>
          <div class="io-row">
            <span class="io-label">📦 Output:</span>
            <div class="io-items">${produktionItems}</div>
          </div>
          <div class="io-row">
            <span class="io-label">🥚 Ei:</span>
            <div class="io-items">
              <div class="io-item">${tier.eiinkubation} Zyklen Inkubation</div>
            </div>
          </div>
          ${variantenHTML}
          <div class="stall-rechner">
            <span class="stall-label">🏠 Ställe für ${state.dupes} Dupes</span>
            <span class="stall-wert">${stallCount} Stall${stallCount !== 1 ? "e" : ""}</span>
          </div>
          <div class="tier-beschreibung">💡 ${tier.tipp}</div>
        </div>
      </div>`;
  }).join("");

  // Stallanleitung
  document.getElementById("stall-anleitung").innerHTML = `
    <div class="stall-anleitung">
      <h4>🏗️ Stall Grundanforderungen</h4>
      <div style="font-size:12px;color:var(--text-dim);margin-bottom:10px">
        Standardgröße: ${ONI.stallInfo.groesse}
      </div>
      ${ONI.stallInfo.benoetigt.map((p, i) => `
        <div class="stall-punkt">
          <span class="stall-punkt-nr">${i + 1}</span>
          <span>${p}</span>
        </div>`).join("")}
      <div class="tipp-box" style="margin-top:10px">
        <span class="tipp-icon">⭐</span>
        <span>${ONI.stallInfo.tipp}</span>
      </div>
    </div>`;
}

// ══════════════════════════════════════════════════════════
// TAB 4: MATERIALIEN
// ══════════════════════════════════════════════════════════
function renderMaterialien() {
  const container = document.getElementById("material-inhalt");
  // Max Wärmeleitfähigkeit für Balken-Skalierung
  const allWL = ONI.materialien.flatMap(k => k.eintraege).map(e => e.wärmeleitfähigkeit);
  const maxWL = Math.max(...allWL);

  container.innerHTML = ONI.materialien
    .filter(kat => !kat.pack || state.aktivePacks.has(kat.pack))
    .map(kat => `
    <div class="material-section">
      <h3>${kat.kategorie} ${kat.pack && kat.pack !== "vanilla" ? packBadge(kat.pack) : ""}</h3>
      <div class="card" style="padding:0;overflow:hidden">
        <table class="material-table">
          <thead>
            <tr>
              <th>Material</th>
              <th>Deutsch</th>
              <th>Wärmeleitfähigkeit (W/m·K)</th>
              <th>Schmelzpunkt (°C)</th>
              <th>Strom</th>
            </tr>
          </thead>
          <tbody>
            ${kat.eintraege.map(e => {
              const balkenBreite = Math.max(4, (e.wärmeleitfähigkeit / maxWL) * 200);
              return `
              <tr>
                <td>${e.icon} <strong>${e.name}</strong></td>
                <td style="color:var(--text-dim);font-size:12px">${e.englisch}</td>
                <td>
                  <div class="wl-bar">
                    <div class="wl-fill" style="width:${balkenBreite}px"></div>
                    <span class="wl-val">${e.wärmeleitfähigkeit}</span>
                  </div>
                </td>
                <td style="color:var(--blue)">${e.schmelzpunkt > 0 ? "+" : ""}${e.schmelzpunkt}°C</td>
                <td>${e.strom
                  ? `<span class="tag tag-gruen">✓ leitend</span>`
                  : `<span class="tag tag-rot">✗ isolierend</span>`}</td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>`).join("");
}

// ── HILFSFUNKTIONEN ───────────────────────────────────────
function packName(packId) {
  const p = ONI.packs.find(x => x.id === packId);
  return p ? p.name : packId;
}

function packBadge(packId) {
  const farben = {
    vanilla:      "tag-gruen",
    spacedOut:    "tag-blau",
    frostyPlanet: "tag-lila"
  };
  const p = ONI.packs.find(x => x.id === packId);
  if (!p) return "";
  return `<span class="tag ${farben[packId] || "tag-orange"}">${p.icon} ${p.name}</span>`;
}

function formatMenge(menge, einheit) {
  if (menge === 0) return "";
  if (menge >= 1000 && einheit.includes("g")) {
    return (menge / 1000).toFixed(1) + " kg";
  }
  return menge.toLocaleString("de-DE") + " " + einheit;
}

// Wiki-Bild mit Emoji-Fallback
function wikiImg(eintrag, groesse = 40, cssClass = "wiki-img") {
  if (!eintrag.img) return `<span style="font-size:${groesse}px">${eintrag.icon}</span>`;
  return `<img src="${eintrag.img}"
               alt="${eintrag.name}"
               class="${cssClass}"
               width="${groesse}" height="${groesse}"
               onerror="this.style.display='none';this.nextElementSibling.style.display='inline'"
               loading="lazy">
          <span style="font-size:${Math.round(groesse*0.8)}px;display:none">${eintrag.icon}</span>`;
}
