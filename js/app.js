// ============================================================
// ONI KALKULATOR – App-Logik
// ============================================================

// ── ZUSTAND ──────────────────────────────────────────────
const state = {
  dupes: 8,
  aktivePacks: new Set(["vanilla"]),
  ausgewaehltePflanzen: {},  // { pflanzeId: anzahl }
  ausgewaehlteTiere: {},     // { tierId: { haben: 0, wollen: 0 } }
  strom: {
    generatoren: {},  // { id: { anzahl: 0, kreis: 1 } }
    verbraucher: {}   // { id: { anzahl: 0, kreis: 1 } }
  }
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
  renderPflanzDetailKarten();
  renderTiere();
  renderMaterialien();
  renderStrom();
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

function renderPflanzItem(p) {
  const aktiv = state.aktivePacks.has(p.pack);
  const ausgewaehlt = state.ausgewaehltePflanzen[p.id] !== undefined;
  const menge = state.ausgewaehltePflanzen[p.id] || 0;

  const istNahrung = p.kcalProErnte > 0 && p.wachstumszyklen > 0;
  const kpz = istNahrung ? (p.kcalProErnte / p.wachstumszyklen).toFixed(0) : "–";
  const benoetigt = istNahrung
    ? Math.ceil((state.dupes * 2000) / (p.kcalProErnte / p.wachstumszyklen))
    : "–";

  const wildInfo = p.wachstumszyklenwild > 0
    ? `<span style="color:var(--text-dim);font-size:10px">🌲 Wild: ${p.wachstumszyklenwild}Z</span>`
    : "";

  const kcalAnzeige = istNahrung
    ? `${kpz} kcal/Zyk · 🏠${p.wachstumszyklen}Z ${p.wachstumszyklenwild > 0 ? "· 🌲"+p.wachstumszyklenwild+"Z" : ""} · <em>${p.englisch}</em>`
    : `<span style="color:var(--text-dim)">${p.typ === "wild-einmalig" ? "🌿 Einmalig (Wildnis)" : p.typ === "ressource" ? "📦 Ressource" : "📦 Ressource"}</span> · <em>${p.englisch}</em>`;

  return `
    <div class="pflanz-item ${ausgewaehlt ? "ausgewaehlt" : ""} ${!aktiv ? "dlc-inaktiv" : ""}"
         data-id="${p.id}" onclick="togglePflanze('${p.id}', event)">
      <span class="pflanz-icon">${wikiImg(p, 36)}</span>
      <div class="pflanz-info">
        <div class="pflanz-name">${p.name}</div>
        <div class="pflanz-kcal">${kcalAnzeige}</div>
        ${!aktiv ? `<span class="tag tag-lila">${packName(p.pack)}</span>` : ""}
      </div>
      <div class="pflanz-anzahl-wrap" onclick="event.stopPropagation()">
        <input type="number" class="pflanz-anzahl-input"
               min="0" max="500"
               value="${menge}"
               placeholder="0"
               data-id="${p.id}"
               oninput="setPflanzeAnzahl('${p.id}', this.value)"
               title="Anzahl Pflanzen die du hast">
        <span style="font-size:10px;color:var(--text-dim)">
          / ${benoetigt} 🎯
        </span>
      </div>
    </div>`;
}

function renderPflanzListe() {
  const container = document.getElementById("pflanz-liste");

  const nahrungsPflanzen  = ONI.pflanzen.filter(p => p.typ === "nahrung");
  const ressourcePflanzen = ONI.pflanzen.filter(p => p.typ === "ressource");
  const wildPflanzen      = ONI.pflanzen.filter(p => p.typ === "wild-einmalig");

  const sektionHtml = (titel, icon, pflanzen) => {
    if (pflanzen.length === 0) return "";
    return `
      <div class="pflanz-kategorie-header">${icon} ${titel}</div>
      ${pflanzen.map(renderPflanzItem).join("")}`;
  };

  container.innerHTML =
    sektionHtml("Nahrungspflanzen",   "🍎", nahrungsPflanzen) +
    sektionHtml("Ressourcenpflanzen", "📦", ressourcePflanzen) +
    sektionHtml("Natürlich wachsend", "🌲", wildPflanzen);
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
  // Bugfix: Pflanzen ohne kcalProErnte > 0 NICHT in der Nahrungstabelle anzeigen
  const zeilen = ONI.pflanzen
    .filter(p => p.kcalProErnte > 0 && p.wachstumszyklen > 0)
    .map(p => {
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
        ${zeilen.join("") || `<tr><td colspan="5" class="leer-zustand">Wähle Nahrungspflanzen aus der linken Liste</td></tr>`}
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

function setTierHaben(id, val) {
  const n = Math.max(0, parseInt(val) || 0);
  if (!state.ausgewaehlteTiere[id]) state.ausgewaehlteTiere[id] = { haben: 0, wollen: 0 };
  state.ausgewaehlteTiere[id].haben = n;
  renderTierBerechnung(id);
}

function setTierWollen(id, val) {
  const n = Math.max(0, parseInt(val) || 0);
  if (!state.ausgewaehlteTiere[id]) state.ausgewaehlteTiere[id] = { haben: 0, wollen: 0 };
  state.ausgewaehlteTiere[id].wollen = n;
  renderTierBerechnung(id);
}

function renderTierBerechnung(id) {
  const tier = getTierById(id);
  if (!tier) return;
  const tierState = state.ausgewaehlteTiere[id] || { haben: 0, wollen: 0 };
  const wollen = tierState.wollen;

  // Ställe
  const staelle = wollen > 0 ? Math.ceil(wollen / tier.maxProStall) : 0;

  // Ressourcenbedarf
  const nahrungItems = tier.nahrung.map(n => {
    if (n.menge === 0) return `<div style="font-size:11px;color:var(--text-dim)">• ${n.name}</div>`;
    const gesamt = n.menge * wollen;
    return `<div style="font-size:11px;color:var(--text-main)">• ${formatMenge(gesamt, n.einheit)} ${n.name}</div>`;
  }).join("");

  // Produktion
  const prodItems = tier.produktion.map(p => {
    if (p.menge === 0) return `<div style="font-size:11px;color:var(--green)">${p.icon} ${p.einheit} ${p.name}</div>`;
    const gesamt = p.menge * wollen;
    return `<div style="font-size:11px;color:var(--green)">${p.icon} ${formatMenge(gesamt, p.einheit)} ${p.name}</div>`;
  }).join("");

  const bereich = document.getElementById(`tier-rechner-${id}`);
  if (!bereich) return;

  if (wollen === 0) {
    bereich.innerHTML = `<div style="font-size:11px;color:var(--text-dim);padding:6px 0">Gib eine Anzahl ein um den Bedarf zu berechnen.</div>`;
    return;
  }

  bereich.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:8px">
      <div style="background:var(--bg-base);border-radius:6px;padding:8px 10px">
        <div style="font-size:10px;color:var(--text-dim);margin-bottom:4px">🏠 STÄLLE</div>
        <div style="font-size:18px;font-weight:700;color:var(--accent)">${staelle}</div>
        <div style="font-size:10px;color:var(--text-dim)">max. ${tier.maxProStall}/Stall</div>
      </div>
      <div style="background:var(--bg-base);border-radius:6px;padding:8px 10px">
        <div style="font-size:10px;color:var(--text-dim);margin-bottom:4px">🍽️ NAHRUNGSBEDARF</div>
        ${nahrungItems || '<div style="font-size:11px;color:var(--text-dim)">–</div>'}
      </div>
      <div style="background:var(--bg-base);border-radius:6px;padding:8px 10px">
        <div style="font-size:10px;color:var(--text-dim);margin-bottom:4px">📦 PRODUKTION</div>
        ${prodItems || '<div style="font-size:11px;color:var(--text-dim)">–</div>'}
      </div>
    </div>`;
}

function renderTiere() {
  const container = document.getElementById("tier-karten");
  container.innerHTML = ONI.tiere.map(tier => {
    const aktiv = state.aktivePacks.has(tier.pack);
    const tierState = state.ausgewaehlteTiere[tier.id] || { haben: 0, wollen: 0 };

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

          <!-- Interaktive Tierauswahl -->
          <div class="tier-interaktiv">
            <div class="tier-inputs">
              <div class="tier-input-wrap">
                <label class="tier-input-label">Ich habe:</label>
                <input type="number" class="tier-anzahl-input" min="0" max="1000"
                       value="${tierState.haben}"
                       oninput="setTierHaben('${tier.id}', this.value)"
                       onclick="event.stopPropagation()">
              </div>
              <div class="tier-input-wrap">
                <label class="tier-input-label">Ich möchte:</label>
                <input type="number" class="tier-anzahl-input" min="0" max="1000"
                       value="${tierState.wollen}"
                       oninput="setTierWollen('${tier.id}', this.value)"
                       onclick="event.stopPropagation()">
              </div>
            </div>
            <div id="tier-rechner-${tier.id}">
              <div style="font-size:11px;color:var(--text-dim);padding:6px 0">Gib eine Anzahl ein um den Bedarf zu berechnen.</div>
            </div>
          </div>

          <div class="tier-beschreibung">💡 ${tier.tipp}</div>
        </div>
      </div>`;
  }).join("");

  // Nach dem Rendern berechnungen für alle Tiere mit Werten aktualisieren
  Object.keys(state.ausgewaehlteTiere).forEach(id => {
    if (state.ausgewaehlteTiere[id].wollen > 0) renderTierBerechnung(id);
  });

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
              const matImg = e.img
                ? `<img src="${e.img}" alt="${e.name}" width="24" height="24" style="object-fit:contain;image-rendering:crisp-edges;vertical-align:middle;margin-right:4px" onerror="this.style.display='none'">`
                : `<span style="font-size:18px;vertical-align:middle;margin-right:4px">${e.icon}</span>`;
              return `
              <tr>
                <td>${matImg}<strong>${e.name}</strong></td>
                <td style="color:var(--text-dim);font-size:12px">${e.englisch}</td>
                <td>
                  <div class="wl-bar">
                    <div class="wl-fill" style="width:${balkenBreite}px"></div>
                    <span class="wl-val">${e.wärmeleitfähigkeit} W/m·K</span>
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

// ══════════════════════════════════════════════════════════
// TAB 5: STROM
// ══════════════════════════════════════════════════════════

function setStromAnzahl(typ, id, val) {
  const n = Math.max(0, parseInt(val) || 0);
  if (!state.strom[typ][id]) state.strom[typ][id] = { anzahl: 0, kreis: 1 };
  state.strom[typ][id].anzahl = n;
  renderStromTabelle();
}

function setStromKreis(typ, id, val) {
  const k = Math.max(1, Math.min(10, parseInt(val) || 1));
  if (!state.strom[typ][id]) state.strom[typ][id] = { anzahl: 0, kreis: 1 };
  state.strom[typ][id].kreis = k;
  renderStromTabelle();
}

function renderStrom() {
  const container = document.getElementById("strom-inhalt");
  if (!container) return;

  // ─ Generatoren-Liste ─
  const genHTML = `
    <div class="card-title" style="margin-bottom:12px">⚡ Generatoren</div>
    ${ONI.strom.generatoren
      .filter(g => state.aktivePacks.has(g.pack))
      .map(g => {
        const s = state.strom.generatoren[g.id] || { anzahl: 0, kreis: 1 };
        return `
          <div class="strom-item">
            <div class="strom-name">${g.name}
              <div style="font-size:10px;color:var(--text-dim)">${g.brennstoff}</div>
            </div>
            <div class="strom-watt">+${g.watt}W</div>
            <input type="number" class="strom-anzahl" min="0" max="100" value="${s.anzahl}"
                   oninput="setStromAnzahl('generatoren','${g.id}',this.value)" placeholder="0">
            <select class="strom-kreis-sel" onchange="setStromKreis('generatoren','${g.id}',this.value)">
              ${Array.from({length:10},(_,i)=>i+1).map(k => `<option value="${k}" ${s.kreis===k?"selected":""}>K${k}</option>`).join("")}
            </select>
          </div>`;
      }).join("")}`;

  // ─ Verbraucher-Liste nach Kategorie ─
  const kategorien = [...new Set(ONI.strom.verbraucher.map(v => v.kategorie))];
  const vbHTML = `
    <div class="card-title" style="margin-bottom:8px">🔌 Verbraucher</div>
    <div style="font-size:11px;color:var(--text-dim);margin-bottom:10px;display:flex;gap:12px">
      <span>⏱️ = Dauerhafter Verbraucher (läuft konstant)</span>
      <span>⚡ = Gelegenheitsverbraucher (nur bei Bedarf)</span>
    </div>
    ${kategorien.map(kat => {
      const items = ONI.strom.verbraucher.filter(v => v.kategorie === kat && state.aktivePacks.has(v.pack));
      if (items.length === 0) return "";
      return `
        <div style="font-size:11px;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.5px;margin:10px 0 4px">${kat}</div>
        ${items.map(v => {
          const s = state.strom.verbraucher[v.id] || { anzahl: 0, kreis: 1 };
          const dauerHinweis = v.dauerverbraucher
            ? `<span class="strom-typ-dauer" title="Läuft dauerhaft">⏱️</span>`
            : `<span class="strom-typ-gelegenheit" title="Läuft nur bei Bedarf">⚡</span>`;
          return `
            <div class="strom-item">
              <div class="strom-name">${v.name} ${dauerHinweis}</div>
              <div class="strom-watt" style="color:${v.watt===0?"var(--text-dim)":"var(--red)"}">
                ${v.watt > 0 ? "-"+v.watt+"W" : "0W"}
              </div>
              <input type="number" class="strom-anzahl" min="0" max="100" value="${s.anzahl}"
                     oninput="setStromAnzahl('verbraucher','${v.id}',this.value)" placeholder="0">
              <select class="strom-kreis-sel" onchange="setStromKreis('verbraucher','${v.id}',this.value)">
                ${Array.from({length:10},(_,i)=>i+1).map(k => `<option value="${k}" ${s.kreis===k?"selected":""}>K${k}</option>`).join("")}
              </select>
            </div>`;
        }).join("")}`;
    }).join("")}`;

  container.innerHTML = `
    <div class="strom-layout">
      <div id="gen-liste">${genHTML}</div>
      <div id="vb-liste">${vbHTML}</div>
    </div>
    <div id="strom-tabelle"></div>`;

  renderStromTabelle();
}

function renderStromTabelle() {
  const container = document.getElementById("strom-tabelle");
  if (!container) return;

  // Pro Kreis: Produktion und Verbrauch sammeln
  const kreise = {};
  for (let k = 1; k <= 10; k++) kreise[k] = { produktion: 0, verbrauch: 0, maxEinzelGen: 0 };

  ONI.strom.generatoren.forEach(g => {
    const s = state.strom.generatoren[g.id];
    if (!s || s.anzahl === 0) return;
    const k = s.kreis;
    const watt = g.watt * s.anzahl;
    kreise[k].produktion += watt;
    if (g.watt > kreise[k].maxEinzelGen) kreise[k].maxEinzelGen = g.watt;
  });

  ONI.strom.verbraucher.forEach(v => {
    const s = state.strom.verbraucher[v.id];
    if (!s || s.anzahl === 0) return;
    const k = s.kreis;
    kreise[k].verbrauch += v.watt * s.anzahl;
  });

  // Nur Kreise mit Aktivität anzeigen
  const aktiveKreise = Object.entries(kreise).filter(([, k]) => k.produktion > 0 || k.verbrauch > 0);

  if (aktiveKreise.length === 0) {
    container.innerHTML = `
      <div class="strom-zusammenfassung">
        <div class="tipp-box">
          <span class="tipp-icon">💡</span>
          <span>Gib Anzahl bei Generatoren und Verbrauchern ein um die Stromkreis-Bilanz zu berechnen.</span>
        </div>
      </div>`;
    return;
  }

  const kreisKarten = aktiveKreise.map(([nr, k]) => {
    const saldo = k.produktion - k.verbrauch;
    let klasse = "ueberschuss";
    let saldoFarbe = "var(--green)";
    let saldoPrefix = "+";
    if (saldo < 0) { klasse = "mangel"; saldoFarbe = "var(--red)"; saldoPrefix = ""; }
    else if (saldo < 200) { klasse = "knapp"; saldoFarbe = "var(--accent)"; }

    // Kabelwarnung
    let kabelWarn = "";
    if (k.produktion > 2000) {
      kabelWarn = `<div class="kabel-warnung">⚠️ ${k.produktion.toLocaleString("de-DE")}W überschreiten Schweres Kabel (2.000W)! Transformator verwenden.</div>`;
    } else if (k.produktion > 1000) {
      kabelWarn = `<div class="kabel-warnung" style="border-color:var(--accent);color:var(--accent);background:rgba(232,160,32,0.08)">⚡ ${k.produktion.toLocaleString("de-DE")}W – Schweres Kabel erforderlich (max. 2.000W)</div>`;
    }

    return `
      <div class="kreis-karte ${klasse}">
        <div>
          <div class="kreis-label">Stromkreis ${nr}</div>
          <div style="font-size:12px;color:var(--text-dim);margin-top:2px">
            <span class="kreis-prod">⚡ ${k.produktion.toLocaleString("de-DE")}W</span>
            <span style="color:var(--text-dim)"> / </span>
            <span class="kreis-vb">🔌 ${k.verbrauch.toLocaleString("de-DE")}W</span>
          </div>
        </div>
        <div>
          <div class="kreis-saldo" style="color:${saldoFarbe}">${saldoPrefix}${saldo.toLocaleString("de-DE")} W</div>
          <div style="font-size:10px;color:var(--text-dim);text-align:right">${saldo >= 0 ? "Überschuss" : "Mangel"}</div>
        </div>
      </div>
      ${kabelWarn}`;
  }).join("");

  // Gesamtbilanz
  const gesamtProd = aktiveKreise.reduce((s, [, k]) => s + k.produktion, 0);
  const gesamtVb   = aktiveKreise.reduce((s, [, k]) => s + k.verbrauch, 0);
  const gesamtSaldo = gesamtProd - gesamtVb;

  container.innerHTML = `
    <div class="strom-zusammenfassung">
      <div class="card-title" style="margin-bottom:12px">📊 Stromkreis-Übersicht</div>
      ${kreisKarten}
      <div class="kreis-karte" style="border-color:var(--border-light);margin-top:16px;background:var(--bg-base)">
        <div>
          <div class="kreis-label" style="color:var(--text-head)">GESAMTBILANZ</div>
          <div style="font-size:12px;color:var(--text-dim);margin-top:2px">
            <span class="kreis-prod">⚡ ${gesamtProd.toLocaleString("de-DE")}W</span>
            <span style="color:var(--text-dim)"> / </span>
            <span class="kreis-vb">🔌 ${gesamtVb.toLocaleString("de-DE")}W</span>
          </div>
        </div>
        <div>
          <div class="kreis-saldo" style="color:${gesamtSaldo >= 0 ? "var(--green)" : "var(--red)"}">
            ${gesamtSaldo >= 0 ? "+" : ""}${gesamtSaldo.toLocaleString("de-DE")} W
          </div>
          <div style="font-size:10px;color:var(--text-dim);text-align:right">${gesamtSaldo >= 0 ? "Überschuss" : "Mangel"}</div>
        </div>
      </div>
      <div class="tipp-box" style="margin-top:12px">
        <span class="tipp-icon">⚡</span>
        <div>
          <strong>Kabelkapazitäten:</strong>
          Einfaches Kabel max. <strong style="color:var(--green)">1.000W</strong> ·
          Schweres Kabel max. <strong style="color:var(--accent)">2.000W</strong> ·
          Bei mehr als 2.000W: <strong style="color:var(--red)">Transformator</strong> verwenden!
        </div>
      </div>
    </div>`;
}

// ── PFLANZENKARTEN DETAIL (Tab 2 – rechte Seite unten) ────
function renderPflanzDetailKarten() {
  const container = document.getElementById("pflanz-detail-karten");
  if (!container) return;

  // Nur Pflanzen aktiver Packs anzeigen
  const sichtbar = ONI.pflanzen.filter(p => state.aktivePacks.has(p.pack));

  container.innerHTML = sichtbar.map(p => {
    const istNahrung = p.kcalProErnte > 0 && p.wachstumszyklen > 0;
    const kpz = istNahrung ? (p.kcalProErnte / p.wachstumszyklen).toFixed(0) : "–";

    const typLabel = {
      "nahrung":      "🍎 Nahrungspflanze",
      "ressource":    "📦 Ressourcenpflanze",
      "wild-einmalig":"🌿 Einmalig (Wildnis)",
      "dekor":        "🌺 Dekoration"
    }[p.typ] || p.typ;

    const wachstumsInfo = istNahrung
      ? `<div class="detail-item">
           <div class="detail-key">🏠 Heimanbau</div>
           <div class="detail-val" style="color:var(--accent)">${p.wachstumszyklen} Zyklen → ${(p.kcalProErnte / p.wachstumszyklen).toFixed(0)} kcal/Zyk</div>
         </div>
         <div class="detail-item">
           <div class="detail-key">🌲 Wildwuchs</div>
           <div class="detail-val" style="color:var(--green)">${p.wachstumszyklenwild > 0 ? p.wachstumszyklenwild + " Zyklen (4× langsamer)" : "–"}</div>
         </div>`
      : `<div class="detail-item">
           <div class="detail-key">⏱️ Wachstum (Heim)</div>
           <div class="detail-val">${p.wachstumszyklen > 0 ? p.wachstumszyklen + " Zyklen" : p.typ === "wild-einmalig" ? "Einmalig" : "Passiv"}</div>
         </div>
         <div class="detail-item">
           <div class="detail-key">🌲 Wildwuchs</div>
           <div class="detail-val">${p.wachstumszyklenwild > 0 ? p.wachstumszyklenwild + " Zyklen" : "–"}</div>
         </div>`;

    const inputsHtml = p.inputs.length > 0
      ? p.inputs.map(i => `<div style="color:var(--text-main)">• ${i.menge > 0 ? i.menge + " " + i.einheit + " " : ""}${i.name}</div>`).join("")
      : `<div style="color:var(--text-dim)">Kein Dünger/Bewässerung</div>`;

    return `
      <div class="card" style="padding:16px">
        <div class="pflanze-detail-header">
          <span class="pflanze-detail-icon">${wikiImg(p, 48)}</span>
          <div>
            <div style="font-size:15px;font-weight:700;color:var(--text-head)">${p.name}</div>
            <div style="font-size:11px;color:var(--text-dim)">${p.englisch}</div>
            <div style="margin-top:3px">${packBadge(p.pack)} <span style="font-size:10px;color:var(--text-dim)">${typLabel}</span></div>
          </div>
        </div>
        <div class="detail-grid">
          ${wachstumsInfo}
          <div class="detail-item">
            <div class="detail-key">🍎 Ernte</div>
            <div class="detail-val">${p.ernteMenge || (istNahrung ? p.kcalProErnte.toLocaleString("de-DE") + " kcal" : "Kein Nahrungsmittel")}</div>
          </div>
          <div class="detail-item">
            <div class="detail-key">🌡️ Temperatur</div>
            <div class="detail-val">${p.temperatur.min}°C – ${p.temperatur.max}°C</div>
          </div>
        </div>
        <div style="font-size:12px;margin-bottom:8px">
          <div style="color:var(--text-dim);margin-bottom:4px">📥 Benötigt:</div>
          ${inputsHtml}
          ${p.licht ? `<div style="color:var(--accent)">• ☀️ Mind. 200 Lux Licht</div>` : ""}
          ${p.dunkelheit ? `<div style="color:var(--purple)">• 🌑 Absolute Dunkelheit!</div>` : ""}
          ${p.atmosphaere ? `<div style="color:var(--text-dim);font-size:11px;margin-top:3px">Atmosphäre: ${p.atmosphaere}</div>` : ""}
        </div>
        <div style="font-size:11px;color:var(--text-dim);font-style:italic;margin-bottom:8px">${p.beschreibung}</div>
        <div class="tipp-box" style="padding:8px 10px">
          <span class="tipp-icon" style="font-size:12px">💡</span>
          <span style="font-size:11px">${p.tipp}</span>
        </div>
        ${p.rezepte && p.rezepte.length > 0 ? `
        <div style="margin-top:10px">
          <div style="font-size:11px;font-weight:700;color:var(--text-dim);margin-bottom:6px">🍳 REZEPTE:</div>
          ${p.rezepte.map(r => `
            <div class="rezept-karte" style="margin-bottom:6px;padding:8px 10px">
              <div class="rezept-name" style="font-size:12px">${r.name}</div>
              <div class="rezept-kcal">${r.kcal.toLocaleString("de-DE")} kcal · ${r.geraet}</div>
              <div class="rezept-zutaten">${r.zutaten.map(z => "• " + z).join(" | ")}</div>
            </div>`).join("")}
        </div>` : ""}
      </div>`;
  }).join("");
}

// ── HILFSFUNKTIONEN ───────────────────────────────────────
function getTierById(id) {
  return ONI.tiere.find(t => t.id === id) || null;
}

function packName(packId) {
  const p = ONI.packs.find(x => x.id === packId);
  return p ? p.name : packId;
}

function packBadge(packId) {
  const farben = {
    vanilla:           "tag-gruen",
    spacedOut:         "tag-blau",
    frostyPlanet:      "tag-lila",
    prehistoricPlanet: "tag-orange"
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
