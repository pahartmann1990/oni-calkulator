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
    kreise: [
      { nr: 1, name: "Stromkreis 1", eintraege: [] }
    ],
    _naechsteNr: 2
  },
  aktiverTab: "uebersicht"
};

// ── INIT ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  profilAnwenden();          // gespeichertes Profil VOR dem ersten Rendern laden
  initDLC();
  initDupeControl();
  initTabs();
  renderAlles();
  wechsleTab(state.aktiverTab, false);
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

  // Anzeige mit geladenem Profil synchronisieren
  display.textContent = state.dupes;
  slider.value = state.dupes;

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
    btn.addEventListener("click", () => wechsleTab(btn.dataset.tab));
  });
}

// Programmatischer Tab-Wechsel (auch von der Bilanz-Leiste genutzt)
function wechsleTab(ziel, speichern = true) {
  const panel = document.getElementById("tab-" + ziel);
  if (!panel) { ziel = "uebersicht"; }                    // Rückfall, falls Tab nicht (mehr) existiert
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("aktiv", b.dataset.tab === ziel));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.toggle("aktiv", p.id === "tab-" + ziel));
  state.aktiverTab = ziel;
  if (speichern) profilSpeichern();
}

// ── ALLES RENDERN ─────────────────────────────────────────
function renderAlles() {
  renderUebersicht();
  renderNahrung();
  renderPflanzDetailKarten();
  renderTiere();
  renderMaterialien();
  renderStrom();
  renderRezepte();
  stateGeaendert();   // speichert Profil + aktualisiert Bilanz-Leiste
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

  // Zusammenfassung + O2 Rechner
  const o2Bedarf   = n * 60000;  // g/Zyklus
  const co2Prod    = n * 20000;  // g/Zyklus
  const electro    = Math.ceil(o2Bedarf / 53280);
  const oxyfarne   = Math.ceil(o2Bedarf / 18780);
  const wasserElec = (electro * 71.4).toFixed(1);

  document.getElementById("uebersicht-zusammenfassung").innerHTML = `
    <div class="tipp-box" style="margin-bottom:12px">
      <span class="tipp-icon">💡</span>
      <div>
        <strong>${n} Duplikant${n !== 1 ? "en" : ""}</strong> brauchen pro Zyklus (600s) insgesamt
        <strong>${(n * 2000).toLocaleString("de-DE")} kcal</strong> Nahrung,
        <strong>${((o2Bedarf) / 1000).toFixed(0)} kg</strong> Sauerstoff und produzieren
        <strong>${((co2Prod) / 1000).toFixed(0)} kg</strong> CO₂.
      </div>
    </div>
    <div class="grid-3" style="gap:12px;margin-bottom:20px">
      <div class="bedarf-karte" style="border-color:var(--blue)">
        <div class="bedarf-icon">⚗️</div>
        <div class="bedarf-name">Elektrolyseure nötig</div>
        <div class="bedarf-wert" style="color:var(--blue)">${electro}</div>
        <div class="bedarf-einheit">braucht ${wasserElec} kg Wasser/Zyk</div>
      </div>
      <div class="bedarf-karte" style="border-color:var(--green)">
        <div class="bedarf-icon">🌿</div>
        <div class="bedarf-name">Oxyfarne (Heim) nötig</div>
        <div class="bedarf-wert" style="color:var(--green)">${oxyfarne}</div>
        <div class="bedarf-einheit">stromlos – braucht CO₂-Atmo.</div>
      </div>
      <div class="bedarf-karte" style="border-color:var(--red)">
        <div class="bedarf-icon">☁️</div>
        <div class="bedarf-name">CO₂ pro Zyklus</div>
        <div class="bedarf-wert" style="color:var(--red)">${((co2Prod)/1000).toFixed(0)} kg</div>
        <div class="bedarf-einheit">Abscheider oder Dämmerkappe</div>
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
  stateGeaendert();
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
  stateGeaendert();
}

function setTierWollen(id, val) {
  const n = Math.max(0, parseInt(val) || 0);
  if (!state.ausgewaehlteTiere[id]) state.ausgewaehlteTiere[id] = { haben: 0, wollen: 0 };
  state.ausgewaehlteTiere[id].wollen = n;
  renderTierBerechnung(id);
  stateGeaendert();
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
  // Basis + DLC Materialien zusammenführen
  const alleMats = [
    ...ONI.materialien,
    ...(ONI.materialienDLC || [])
  ];
  // Max Wärmeleitfähigkeit für Balken-Skalierung
  const allWL = alleMats.flatMap(k => k.eintraege).map(e => e.wärmeleitfähigkeit);
  const maxWL = Math.max(...allWL);

  container.innerHTML = alleMats
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

// ── STROM: GLOBALE HILFSFUNKTIONEN ────────────────────────
function _alleStromItems() {
  // Flat-Liste aller Generatoren + Verbraucher (nur aktive DLC)
  const gens = ONI.strom.generatoren.filter(g => state.aktivePacks.has(g.pack))
    .map(g => ({ ...g, typ: "gen" }));
  const vbs  = ONI.strom.verbraucher.filter(v => state.aktivePacks.has(v.pack))
    .map(v => ({ ...v, typ: "vb" }));
  return [...gens, ...vbs];
}

function _findStromItem(itemId) {
  return _alleStromItems().find(x => x.id === itemId) || null;
}

function addStromKreis() {
  const nr = state.strom._naechsteNr++;
  state.strom.kreise.push({ nr, name: "Stromkreis " + nr, eintraege: [] });
  renderStrom();
}

function deleteStromKreis(kreisIdx) {
  if (state.strom.kreise.length <= 1) return; // Mind. 1 Kreis
  state.strom.kreise.splice(kreisIdx, 1);
  renderStrom();
}

function addStromEintrag(kreisIdx) {
  const sel    = document.getElementById("strom-add-sel-" + kreisIdx);
  const anzEl  = document.getElementById("strom-add-anz-" + kreisIdx);
  if (!sel || !anzEl) return;
  const itemId = sel.value;
  const anzahl = Math.max(1, parseInt(anzEl.value) || 1);
  if (!itemId) return;
  state.strom.kreise[kreisIdx].eintraege.push({ itemId, anzahl });
  renderStrom();
}

function removeStromEintrag(kreisIdx, eintragIdx) {
  state.strom.kreise[kreisIdx].eintraege.splice(eintragIdx, 1);
  renderStrom();
}

function updateStromAnzahl(kreisIdx, eintragIdx, val) {
  const n = Math.max(0, parseInt(val) || 0);
  if (n === 0) {
    state.strom.kreise[kreisIdx].eintraege.splice(eintragIdx, 1);
  } else {
    state.strom.kreise[kreisIdx].eintraege[eintragIdx].anzahl = n;
  }
  renderStrom();
}

function _stromImg(item) {
  if (!item) return "";
  return `<img src="${item.img}" alt="${item.name}" class="strom-maschinen-img"
               onerror="this.style.display='none';this.nextElementSibling.style.display='inline'">
          <span class="strom-maschinen-fallback" style="display:none">${item.icon || "⚡"}</span>`;
}

function renderStrom() {
  const container = document.getElementById("strom-inhalt");
  if (!container) return;

  const alleItems = _alleStromItems();
  // Dropdown-Optionen nach Kategorie gruppieren
  const kategorien = {};
  alleItems.forEach(x => {
    const kat = x.kat || (x.typ === "gen" ? "⚡ Generatoren" : "🔌 Sonstiges");
    if (!kategorien[kat]) kategorien[kat] = [];
    kategorien[kat].push(x);
  });
  // Generatoren immer zuerst
  const genKat = "⚡ Generatoren";
  if (!kategorien[genKat]) kategorien[genKat] = [];
  ONI.strom.generatoren.filter(g => state.aktivePacks.has(g.pack)).forEach(g => {
    if (!kategorien[genKat].find(x => x.id === g.id))
      kategorien[genKat].push({ ...g, typ: "gen" });
  });

  function dropdownOptions() {
    return `<option value="">— Gerät wählen —</option>` +
      Object.entries(kategorien).map(([kat, items]) =>
        `<optgroup label="${kat}">${items.map(it =>
          `<option value="${it.id}">${it.name} (${it.typ === "gen" ? "+" : it.watt > 0 ? "-" : ""}${it.watt}W)</option>`
        ).join("")}</optgroup>`
      ).join("");
  }

  // ─ Kabelkapazitäts-Schwellen ─
  function kabelInfo(prod) {
    if (prod <= 1000)  return { klasse: "k-normal",    icon: "✅", text: "Normales Kabel (max. 1.000W)" };
    if (prod <= 2000)  return { klasse: "k-leitend",   icon: "⚠️", text: "Leitendes Kabel nötig (max. 2.000W)" };
    if (prod <= 20000) return { klasse: "k-schwer",    icon: "🔴", text: "Schweres Kabel nötig (max. 20.000W)" };
    return { klasse: "k-ueber",  icon: "🔴", text: "Überlastet! Transformator nötig" };
  }

  // ─ Kreise rendern ─
  const kreisHTML = state.strom.kreise.map((kreis, ki) => {
    let prod = 0, vb = 0;

    const eintraegeHTML = kreis.eintraege.map((e, ei) => {
      const item = _findStromItem(e.itemId);
      if (!item) return "";
      const isGen   = item.typ === "gen";
      const wattGes = (item.watt || 0) * e.anzahl;
      if (isGen) prod += wattGes; else vb += wattGes;
      const wattFarbe = isGen ? "var(--green)" : item.watt > 0 ? "var(--red)" : "var(--text-dim)";
      const wattAnz   = isGen ? `+${wattGes}W` : item.watt > 0 ? `-${wattGes}W` : "0W (kein Strom)";
      const dauerBadge = item.dauerverbraucher
        ? `<span class="strom-dauer-badge" title="Läuft dauerhaft (Dauerstrom)">⏱️ Dauer</span>`
        : `<span class="strom-gel-badge"   title="Nur bei Bedarf aktiv">⚡ Bedarf</span>`;
      return `
        <div class="kreis-eintrag">
          <div class="ke-img">${_stromImg(item)}</div>
          <div class="ke-info">
            <div class="ke-name">${item.name} ${dauerBadge}</div>
            <div class="ke-tipp">${item.tipp || ""}</div>
          </div>
          <div class="ke-watt" style="color:${wattFarbe}">${wattAnz}</div>
          <div class="ke-anzahl">
            <button class="anzahl-btn" onclick="updateStromAnzahl(${ki},${ei},${e.anzahl - 1})">−</button>
            <input type="number" class="strom-anzahl-inp" min="1" max="999" value="${e.anzahl}"
                   onchange="updateStromAnzahl(${ki},${ei},this.value)">
            <button class="anzahl-btn" onclick="updateStromAnzahl(${ki},${ei},${e.anzahl + 1})">+</button>
          </div>
          <button class="ke-del" onclick="removeStromEintrag(${ki},${ei})" title="Entfernen">🗑</button>
        </div>`;
    }).join("");

    const saldo     = prod - vb;
    const kb        = kabelInfo(prod);
    const bilanzKl  = saldo > 0 ? "kreis-saldo-plus" : saldo < 0 ? "kreis-saldo-minus" : "kreis-saldo-null";
    const bilanzTxt = saldo > 0 ? `+${saldo}W Überschuss` : saldo < 0 ? `${saldo}W Mangel ⚠️` : "Ausgeglichen";

    return `
      <div class="kreis-karte2 ${saldo < 0 ? "mangel" : ""}">
        <div class="kreis-header">
          <div class="kreis-titel">⚡ ${kreis.name}</div>
          <div class="kreis-bilanz">
            <span class="kreis-prod2">▲ ${prod}W</span>
            <span class="kreis-vb2">▼ ${vb}W</span>
            <span class="${bilanzKl}">${bilanzTxt}</span>
          </div>
          <div class="kreis-kabel ${kb.klasse}" title="${kb.text}">${kb.icon} ${kb.text}</div>
          ${state.strom.kreise.length > 1
            ? `<button class="kreis-del-btn" onclick="deleteStromKreis(${ki})" title="Kreis löschen">🗑 Löschen</button>`
            : ""}
        </div>
        <div class="kreis-eintraege">${eintraegeHTML || '<div class="kreis-leer">Noch keine Geräte – füge unten eins hinzu.</div>'}</div>
        <div class="kreis-add-row">
          <select id="strom-add-sel-${ki}" class="strom-add-sel">${dropdownOptions()}</select>
          <input  id="strom-add-anz-${ki}" type="number" class="strom-add-anz" min="1" max="999" value="1" placeholder="Anz.">
          <button class="btn-primary" onclick="addStromEintrag(${ki})">+ Hinzufügen</button>
        </div>
      </div>`;
  }).join("");

  container.innerHTML = `
    <div id="strom-kreise">${kreisHTML}</div>
    <button class="btn-secondary" style="margin-top:12px" onclick="addStromKreis()">+ Neuen Stromkreis hinzufügen</button>
    <div class="tipp-box" style="margin-top:16px">
      <span class="tipp-icon">💡</span>
      <div>
        <strong>⏱️ Dauerstrom</strong> = läuft immer (Elektrolyseur, Lampen, Kühlschrank …)<br>
        <strong>⚡ Bedarf</strong> = nur wenn aktiv (Aquatuner, Grill, Pumpen …)<br>
        <strong>Kabelgrenze:</strong> Normal 1.000W · Leitend 2.000W · Schwer 20.000W
      </div>
    </div>`;
}

function renderStromTabelle() {
  // Nicht mehr genutzt – renderStrom erzeugt alles direkt
}

// Dummy-Stub für alte Code-Pfade (sicherheitshalber)
function setStromAnzahl() {}
function setStromKreis() {}


// ══════════════════════════════════════════════════════════
// TAB 6: REZEPTE
// ══════════════════════════════════════════════════════════
function renderRezepte() {
  const container = document.getElementById("rezepte-inhalt");
  if (!container) return;

  const qualitaetInfo = {
    "-1": { name: "Erbärmlich",     moral: "-1",  farbe: "var(--red)",    klasse: "badge-err"  },
     "0": { name: "Schrecklich",    moral: "0",   farbe: "var(--text-dim)", klasse: ""          },
     "1": { name: "Schlecht",       moral: "+1",  farbe: "var(--text-dim)", klasse: ""          },
     "2": { name: "Standard",       moral: "+4",  farbe: "var(--blue)",   klasse: "badge-warn" },
     "3": { name: "Gut",            moral: "+8",  farbe: "var(--green)",  klasse: "badge-ok"   },
     "4": { name: "Toll",           moral: "+12", farbe: "var(--accent)", klasse: "badge-ok"   },
     "5": { name: "Hervorragend",   moral: "+16", farbe: "var(--accent)", klasse: "badge-ok"   },
     "6": { name: "Außergewöhnlich",moral: "+20", farbe: "var(--accent)", klasse: "badge-ok"   }
  };

  const geraete = [
    { id: "Mikrobenmatscher", icon: "🧪", tipp: "Kein Strom für einfache Rezepte nötig" },
    { id: "Elektrogrill",     icon: "🔥", tipp: "60W · Basis für viele Zwischen-Rezepte" },
    { id: "Gasherd",          icon: "🍽️", tipp: "Kein Strom · Benötigt Erdgas oder Wasserstoff" },
    { id: "Friteuse",         icon: "🛢️", tipp: "60W · Nur mit Frosty Planet Pack" },
    { id: "Räucherofen",      icon: "💨", tipp: "Kein Strom · Nur mit Prehistoric Planet Pack · Benötigt Holz/Torf" }
  ];

  const aktiveRezepte = ONI.rezepte.filter(r => state.aktivePacks.has(r.pack));

  if (aktiveRezepte.length === 0) {
    container.innerHTML = `<div class="tipp-box"><span class="tipp-icon">💡</span><span>Aktiviere DLC-Packs oben um weitere Rezepte zu sehen.</span></div>`;
    return;
  }

  container.innerHTML = geraete.map(g => {
    const rezepte = aktiveRezepte.filter(r => r.geraet === g.id);
    if (rezepte.length === 0) return "";

    const zeilen = rezepte.map(r => {
      const q = qualitaetInfo[String(r.qualitaet)] || qualitaetInfo["0"];
      return `
        <tr>
          <td>
            <div style="font-weight:700;color:var(--text-head);font-size:13px">${r.name}</div>
            <div style="font-size:10px;color:var(--text-dim)">${r.englisch}</div>
          </td>
          <td>
            ${r.zutaten.map(z => `<div style="font-size:12px;color:var(--text-main)">• ${z}</div>`).join("")}
          </td>
          <td style="font-weight:700;color:var(--accent);white-space:nowrap">
            ${r.kcalAusgang.toLocaleString("de-DE")} kcal
          </td>
          <td>
            <span class="status-badge ${q.klasse}" style="color:${q.farbe};background:none;border:1px solid ${q.farbe}">
              ${q.name}
            </span>
            <div style="font-size:10px;color:var(--text-dim);margin-top:2px">Moral ${q.moral}</div>
          </td>
          <td style="font-size:11px;color:var(--text-dim)">
            ${r.haltbarkeit ? r.haltbarkeit + " Zyklen" : "–"}
          </td>
          <td style="font-size:11px;color:var(--text-dim)">${r.tipp}</td>
        </tr>`;
    }).join("");

    return `
      <div class="material-section">
        <h3>${g.icon} ${g.id}
          <span style="font-weight:400;font-size:11px;color:var(--text-dim);margin-left:8px">${g.tipp}</span>
        </h3>
        <div class="card" style="padding:0;overflow:hidden">
          <table class="material-table">
            <thead>
              <tr>
                <th>Gericht</th>
                <th>Zutaten</th>
                <th style="color:var(--accent)">Kalorien</th>
                <th>Qualität</th>
                <th>Haltbarkeit</th>
                <th>Hinweis</th>
              </tr>
            </thead>
            <tbody>${zeilen}</tbody>
          </table>
        </div>
      </div>`;
  }).join("");

  // Qualitäts-Legende
  const legende = document.getElementById("rezepte-filter");
  if (legende) {
    legende.innerHTML = `
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <span style="font-size:11px;color:var(--text-dim);font-weight:700">QUALITÄTSSTUFEN:</span>
        ${Object.entries(qualitaetInfo).map(([k,v]) =>
          `<span class="tag" style="border:1px solid ${v.farbe};color:${v.farbe};background:none">Q${k} ${v.name} (Moral ${v.moral})</span>`
        ).join("")}
      </div>`;
  }
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

// ══════════════════════════════════════════════════════════
// BILANZ-LEISTE (immer sichtbar im Header, KONZEPT §3.3)
// ══════════════════════════════════════════════════════════
function berechneNahrungsBilanz() {
  const bedarf = state.dupes * 2000;
  let prod = 0, hatEingaben = false;
  ONI.pflanzen
    .filter(p => p.kcalProErnte > 0 && p.wachstumszyklen > 0 && state.aktivePacks.has(p.pack))
    .forEach(p => {
      const anzahl = state.ausgewaehltePflanzen[p.id] || 0;
      if (anzahl > 0) {
        hatEingaben = true;
        prod += anzahl * (p.kcalProErnte / p.wachstumszyklen);
      }
    });
  return { bedarf, prod, hatEingaben };
}

function berechneStromBilanz() {
  let prod = 0, vb = 0, eintraege = 0;
  const mangelKreise = [];
  state.strom.kreise.forEach(kreis => {
    let kProd = 0, kVb = 0;
    kreis.eintraege.forEach(e => {
      const item = _findStromItem(e.itemId);
      if (!item) return;
      eintraege++;
      const watt = (item.watt || 0) * e.anzahl;
      if (item.typ === "gen") kProd += watt; else kVb += watt;
    });
    if (kProd - kVb < 0) mangelKreise.push(kreis.name);
    prod += kProd; vb += kVb;
  });
  return { saldo: prod - vb, eintraege, mangelKreise };
}

function renderBilanz() {
  const leiste = document.getElementById("bilanz-leiste");
  if (!leiste) return;

  // 🍗 Nahrung
  const n = berechneNahrungsBilanz();
  let nahrungKl = "neutral", nahrungTxt = "–", nahrungTitel = "Noch keine Pflanzen eingetragen (Tab Nahrung)";
  if (n.hatEingaben) {
    const pct = Math.round((n.prod / n.bedarf) * 100);
    nahrungKl  = pct >= 100 ? "ok" : pct >= 70 ? "warn" : "err";
    nahrungTxt = pct + " %";
    nahrungTitel = `${Math.round(n.prod).toLocaleString("de-DE")} von ${n.bedarf.toLocaleString("de-DE")} kcal/Zyklus gedeckt`;
  }

  // 💨 Sauerstoff – eigener Rechner folgt (AP4); bis dahin Bedarfs-Info
  const o2Kg = (state.dupes * 60000 / 1000).toFixed(0);

  // ⚡ Strom
  const s = berechneStromBilanz();
  let stromKl = "neutral", stromTxt = "–", stromTitel = "Noch keine Geräte eingetragen (Tab Strom)";
  if (s.eintraege > 0) {
    stromKl  = s.mangelKreise.length > 0 ? "err" : "ok";
    stromTxt = (s.saldo >= 0 ? "+" : "") + s.saldo.toLocaleString("de-DE") + " W";
    stromTitel = s.mangelKreise.length > 0
      ? "Mangel in: " + s.mangelKreise.join(", ")
      : "Alle Stromkreise gedeckt";
  }

  leiste.innerHTML = `
    <span class="bilanz-label">BILANZ</span>
    <button class="bilanz-chip ${nahrungKl}" onclick="wechsleTab('nahrung')" title="${nahrungTitel}">
      🍗 Nahrung <strong>${nahrungTxt}</strong>
    </button>
    <button class="bilanz-chip neutral" onclick="wechsleTab('uebersicht')" title="Sauerstoff-Rechner folgt – Bedarf deiner ${state.dupes} Dupes">
      💨 O₂ <strong>${o2Kg} kg/Zyk</strong>
    </button>
    <button class="bilanz-chip ${stromKl}" onclick="wechsleTab('strom')" title="${stromTitel}">
      ⚡ Strom <strong>${stromTxt}</strong>
    </button>
    <button class="bilanz-chip neutral" onclick="wechsleTab('materialien')" title="Wärme-Rechner folgt">
      🌡️ Wärme <strong>folgt</strong>
    </button>`;
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
