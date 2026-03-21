// ============================================================
// ONI KALKULATOR – Spieldaten (Deutsche Mod Übersetzungen)
// Quellen: ONI Wiki, Deutsche Mod, eigene Messungen
// ============================================================

const ONI = {

  // ── DLC PACKS ─────────────────────────────────────────────
  packs: [
    { id: "vanilla",      name: "Basisspiel",          icon: "🌍" },
    { id: "spacedOut",    name: "Spaced Out!",          icon: "🚀" },
    { id: "frostyPlanet", name: "Frosty Planet Pack",   icon: "❄️" }
  ],

  // ── DUPLIKANT GRUNDBEDARF (pro Zyklus = 600 Sekunden) ─────
  duplikantBedarf: {
    kalorien:          { wert: 2000,  einheit: "kcal",     icon: "🍽️",  name: "Kalorien" },
    sauerstoff:        { wert: 60000, einheit: "g",        icon: "💨",  name: "Sauerstoff (verbraucht)" },
    co2Produktion:     { wert: 20000, einheit: "g",        icon: "☁️",  name: "CO₂ (produziert)" },
    wasserToilette:    { wert: 15000, einheit: "g",        icon: "💧",  name: "Wasser (Toilette)" },
    schmutzwasser:     { wert: 11700, einheit: "g",        icon: "🪣",  name: "Schmutzwasser (produziert)" },
    wasserWaschbecken: { wert: 5000,  einheit: "g",        icon: "🚿",  name: "Wasser (Waschbecken)" }
  },

  // ── NAHRUNGSPFLANZEN ──────────────────────────────────────
  pflanzen: [
    {
      id: "mehlholz",
      name: "Mehlholz",
      englisch: "Mealwood",
      pack: "vanilla",
      icon: "🌿",
      farbe: "#6b8c3a",
      wachstumszyklen: 3,
      kcalProErnte: 800,
      roherName: "Mehlkorn",
      inputs: [
        { name: "Schmutzerde", menge: 20,  einheit: "kg/Zyklus" }
      ],
      temperatur: { min: 10, max: 30 },
      licht: false,
      wasser: false,
      beschreibung: "Einfachste Nahrungspflanze. Kein Licht, kein Wasser nötig.",
      tipp: "Perfekt als Starternahrung. Sehr genügsam.",
      rezepte: [
        { name: "Mehlfladen",       kcal: 1000, zutaten: ["1× Mehlkorn"],                    geraet: "Grill",          pack: "vanilla" },
        { name: "Gebackener Tofu",  kcal: 3600, zutaten: ["1× Mehlkorn", "1× Roher Pilz"],   geraet: "Elektroherd",    pack: "vanilla" }
      ]
    },
    {
      id: "borstenblüte",
      name: "Borstenblüte",
      englisch: "Bristle Blossom",
      pack: "vanilla",
      icon: "🌸",
      farbe: "#c06090",
      wachstumszyklen: 4,
      kcalProErnte: 4800,
      roherName: "Borstenbeere",
      inputs: [
        { name: "Wasser",  menge: 20,  einheit: "kg/Zyklus" },
        { name: "CO₂",    menge: 150, einheit: "g/Zyklus"  }
      ],
      temperatur: { min: 15, max: 30 },
      licht: false,
      wasser: true,
      beschreibung: "Hoher Kalorienertrag. Braucht Wasser und CO₂.",
      tipp: "Sehr effizient für fortgeschrittene Kolonien mit CO₂-Überschuss.",
      rezepte: [
        { name: "Borstenbeeren-Smoothie", kcal: 9600, zutaten: ["2× Borstenbeere", "1× Wasser (Flasche)"], geraet: "Elektroherd", pack: "vanilla" },
        { name: "Gefüllte Beere",         kcal: 6000, zutaten: ["1× Borstenbeere", "1× Pincha-Pfeffer"],  geraet: "Elektroherd", pack: "vanilla" }
      ]
    },
    {
      id: "dämmerungskappe",
      name: "Dämmerungskappe",
      englisch: "Dusk Cap",
      pack: "vanilla",
      icon: "🍄",
      farbe: "#7a5c8a",
      wachstumszyklen: 3,
      kcalProErnte: 1600,
      roherName: "Roher Pilz",
      inputs: [
        { name: "CO₂",          menge: 100, einheit: "g/Zyklus"  },
        { name: "Schmutzwasser", menge: 35,  einheit: "kg/Zyklus" }
      ],
      temperatur: { min: 16, max: 22 },
      licht: false,
      wasser: false,
      dunkelheit: true,
      beschreibung: "Benötigt absolute Dunkelheit und CO₂. Verarbeitet Schmutzwasser.",
      tipp: "Ideal in dunklen Räumen. Produziert wertvolles Schmutzwasser.",
      rezepte: [
        { name: "Pilzwrap",         kcal: 3600, zutaten: ["1× Roher Pilz", "1× Pincha-Pfeffer"], geraet: "Elektroherd", pack: "vanilla" },
        { name: "Gebackener Tofu",  kcal: 3600, zutaten: ["1× Mehlkorn", "1× Roher Pilz"],       geraet: "Elektroherd", pack: "vanilla" }
      ]
    },
    {
      id: "pinchaPfeffer",
      name: "Pincha-Pfeffer",
      englisch: "Pincha Pepperplant",
      pack: "vanilla",
      icon: "🌶️",
      farbe: "#c04030",
      wachstumszyklen: 5,
      kcalProErnte: 2400,
      roherName: "Pincha-Pfeffer",
      inputs: [
        { name: "Schmutzwasser", menge: 35, einheit: "kg/Zyklus" }
      ],
      temperatur: { min: 30, max: 60 },
      licht: false,
      wasser: false,
      beschreibung: "Verarbeitet Schmutzwasser in warmen Umgebungen.",
      tipp: "Gute Kooperation mit Toiletten (Schmutzwasser-Loop).",
      rezepte: [
        { name: "Gefüllte Beere",   kcal: 6000, zutaten: ["1× Borstenbeere", "1× Pincha-Pfeffer"], geraet: "Elektroherd", pack: "vanilla" },
        { name: "Pilzwrap",         kcal: 3600, zutaten: ["1× Roher Pilz", "1× Pincha-Pfeffer"],   geraet: "Elektroherd", pack: "vanilla" },
        { name: "Pfeffer-Tofu",     kcal: 5000, zutaten: ["2× Pincha-Pfeffer"],                    geraet: "Elektroherd", pack: "vanilla" }
      ]
    },
    {
      id: "schleetweizen",
      name: "Schleetweizen",
      englisch: "Sleet Wheat",
      pack: "vanilla",
      icon: "🌾",
      farbe: "#88aacc",
      wachstumszyklen: 6,
      kcalProErnte: 1700,
      roherName: "Schleetweizenmehl (17 Körner × 100 kcal)",
      inputs: [
        { name: "Wasser",      menge: 40, einheit: "kg/Zyklus" },
        { name: "Phosphorit",  menge: 10, einheit: "g/Zyklus"  }
      ],
      temperatur: { min: -20, max: 10 },
      licht: false,
      wasser: true,
      beschreibung: "Wächst nur in sehr kalten Umgebungen (-20 bis 10°C).",
      tipp: "Benötigt aktive Kühlung. Kombination mit Aquatuner empfohlen.",
      rezepte: [
        { name: "Frost-Burger", kcal: 8000, zutaten: ["4× Schleetweizenmehl", "1× Fleisch"], geraet: "Elektroherd", pack: "vanilla" }
      ]
    },
    {
      id: "knubbelsprosse",
      name: "Knubbelsprosse",
      englisch: "Nosh Sprout",
      pack: "spacedOut",
      icon: "🫘",
      farbe: "#5a8a5a",
      wachstumszyklen: 6,
      kcalProErnte: 4000,
      roherName: "Knubbelbohne",
      inputs: [
        { name: "Phosphorit", menge: 5,  einheit: "kg/Zyklus" },
        { name: "CO₂",        menge: 100, einheit: "g/Zyklus" }
      ],
      temperatur: { min: 15, max: 35 },
      licht: false,
      wasser: false,
      beschreibung: "Spaced Out! Pflanze. Braucht Phosphorit statt Wasser.",
      tipp: "Gute Alternative wenn Wasser knapp ist.",
      rezepte: []
    },
    {
      id: "wasserpflanze",
      name: "Wasserpflanze",
      englisch: "Waterweed",
      pack: "spacedOut",
      icon: "🌊",
      farbe: "#2a7a9a",
      wachstumszyklen: 4,
      kcalProErnte: 2400,
      roherName: "Salzpflanze",
      inputs: [
        { name: "Salzwasser",    menge: 70, einheit: "kg/Zyklus" },
        { name: "Chlor",         menge: 10, einheit: "g/Zyklus"  }
      ],
      temperatur: { min: 10, max: 50 },
      licht: false,
      wasser: true,
      beschreibung: "Braucht Salzwasser. Ideal auf Salzwasser-Planetoiden.",
      tipp: "Gut kombinierbar mit Salzwasser-Quellen.",
      rezepte: []
    }
  ],

  // ── TIERE & STÄLLE ────────────────────────────────────────
  tiere: [
    {
      id: "klappe",
      name: "Klappe",
      englisch: "Hatch",
      pack: "vanilla",
      icon: "🦎",
      farbe: "#8a6a3a",
      lebensraum: "Boden",
      maxProStall: 8,
      nahrung: [
        { name: "Schmutzerde", menge: 140, einheit: "kg/Zyklus" },
        { name: "Stein (Kalkstein, Granit…)", menge: 140, einheit: "kg/Zyklus" },
        { name: "Kohle", menge: 140, einheit: "kg/Zyklus" },
        { name: "Metallerz (diverse)", menge: 140, einheit: "kg/Zyklus" }
      ],
      produktion: [
        { name: "Kohle", menge: 140, einheit: "kg/Zyklus", icon: "⚫" }
      ],
      eiinkubation: 3,
      beschreibung: "Frisst fast alles Festes und produziert Kohle. Ideal für Energieversorgung.",
      tipp: "Ranch-Klappe für passiven Kohlenachschub. Mit Kohlegeneratoren kombinieren.",
      varianten: [
        { name: "Glatte Klappe",   sonderNahrung: "Raffiniertes Metall",  sonderProduktion: "Raffiniertes Metall (gleicher Typ, 75% Masse)" },
        { name: "Stachlige Klappe", sonderNahrung: "Schmutzerde",         sonderProduktion: "Kohle (höhere Menge)" }
      ]
    },
    {
      id: "schiebewühlmaus",
      name: "Schiebewühlmaus",
      englisch: "Shove Vole",
      pack: "vanilla",
      icon: "🐀",
      farbe: "#6a5a4a",
      lebensraum: "Boden",
      maxProStall: 8,
      nahrung: [
        { name: "Eruptivgestein (Granit, Basalt…)", menge: 140, einheit: "kg/Zyklus" }
      ],
      produktion: [
        { name: "Schmutzerde", menge: 70, einheit: "kg/Zyklus", icon: "🟫" }
      ],
      eiinkubation: 5,
      beschreibung: "Wandelt Regolith/Gestein in Schmutzerde um.",
      tipp: "Perfekt für Regolith-Verarbeitung auf Asteroiden (Spaced Out).",
      varianten: []
    },
    {
      id: "puffs",
      name: "Quietschpuffs",
      englisch: "Squeaky Puft",
      pack: "vanilla",
      icon: "🐡",
      farbe: "#9a70b0",
      lebensraum: "Gas (Schmutziger Sauerstoff)",
      maxProStall: 8,
      nahrung: [
        { name: "Schmutziger Sauerstoff", menge: 90000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Schleim", menge: 3000, einheit: "g/Zyklus", icon: "🟢" }
      ],
      eiinkubation: 5,
      beschreibung: "Atmet Schmutzigen Sauerstoff ein, produziert Schleim.",
      tipp: "Hilft beim Bereinigen von PO₂-Überschuss. Schleim → Algen.",
      varianten: [
        { name: "Oxylite-Puffs",   sonderNahrung: "Sauerstoff",  sonderProduktion: "Oxylite" },
        { name: "Chlorin-Puffs",   sonderNahrung: "Chlor",       sonderProduktion: "Bleichstein" }
      ]
    },
    {
      id: "pacu",
      name: "Pacu",
      englisch: "Pacu",
      pack: "vanilla",
      icon: "🐟",
      farbe: "#2a6a9a",
      lebensraum: "Wasser (mind. 100kg pro Kachel)",
      maxProStall: 4,
      nahrung: [
        { name: "Algen",      menge: 90000, einheit: "g/Zyklus" },
        { name: "Fischfutter", menge: 90000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Pacu-Filet",  menge: 1, einheit: "alle 20 Zyklen (~4000 kcal)", icon: "🍣" },
        { name: "Pacu-Ei",     menge: 1, einheit: "alle 20 Zyklen",              icon: "🥚" }
      ],
      eiinkubation: 5,
      beschreibung: "Wassertier. Produziert Nahrung und Dünger.",
      tipp: "Für einen Wasser-Loop mit Algen-Destillieranlage kombinieren.",
      varianten: [
        { name: "Tropischer Pacu", sonderNahrung: "Kein Bedarf (isst nichts)", sonderProduktion: "Drecksames Wasser" }
      ]
    },
    {
      id: "erdgasmooskuh",
      name: "Erdgasmooskuh",
      englisch: "Gassy Moo",
      pack: "spacedOut",
      icon: "🐄",
      farbe: "#4a8a5a",
      lebensraum: "Spezielle Gasbiome / Vakuum-Planet",
      maxProStall: 2,
      nahrung: [
        { name: "Gashaltige Gräser (kein manuelle Fütterung)", menge: 0, einheit: "selbstversorgend" }
      ],
      produktion: [
        { name: "Erdgas", menge: 120000, einheit: "g/Zyklus", icon: "🔥" }
      ],
      eiinkubation: 8,
      beschreibung: "Produziert passiv Erdgas. Lebt auf speziellen Planetoiden.",
      tipp: "Früh einen Gassy-Moo-Planetoiden erkunden für passive Energie.",
      varianten: []
    },
    {
      id: "morb",
      name: "Schleimbolzen",
      englisch: "Morb",
      pack: "vanilla",
      icon: "😷",
      farbe: "#5a7a3a",
      lebensraum: "Schmutzige Luft / Überall",
      maxProStall: 8,
      nahrung: [
        { name: "Schmutzerde", menge: 5000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Schmutziger Sauerstoff", menge: 30000, einheit: "g/Zyklus", icon: "💚" }
      ],
      eiinkubation: 3,
      beschreibung: "Wandelt Schmutzerde in Schmutzigen Sauerstoff um.",
      tipp: "Nützlich um PO₂ für Puffs-Ranche zu produzieren.",
      varianten: []
    }
  ],

  // ── GEBÄUDE & STALL-ANFORDERUNGEN ─────────────────────────
  stallInfo: {
    groesse: "12 × 8 Kacheln (96 Kacheln gesamt)",
    benoetigt: [
      "1× Ranching Station (Viehstation)",
      "1× Critter Drop-Off (Viehübergabe)",
      "Viehbetten je nach Tier",
      "Lüftung oder Gasversorgung je nach Tier",
      "Optional: Grooming Station (Pflege-Station)"
    ],
    tipp: "Gepflegte Tiere produzieren 25% mehr und legen häufiger Eier."
  },

  // ── RESSOURCEN & MATERIALIEN ──────────────────────────────
  materialien: [
    {
      kategorie: "Metalle (Roh)",
      eintraege: [
        { name: "Kupfererz",    englisch: "Copper Ore",   icon: "🟠", wärmeleitfähigkeit: 4.5,   schmelzpunkt: 1084,  strom: false, dichte: 1500 },
        { name: "Eisenerz",     englisch: "Iron Ore",     icon: "🟤", wärmeleitfähigkeit: 4.0,   schmelzpunkt: 1538,  strom: false, dichte: 1500 },
        { name: "Goldalmagam",  englisch: "Gold Amalgam", icon: "🟡", wärmeleitfähigkeit: 100.0, schmelzpunkt: 1062,  strom: false, dichte: 2500 },
        { name: "Wolframit",    englisch: "Wolframite",   icon: "⬛", wärmeleitfähigkeit: 60.0,  schmelzpunkt: 3422,  strom: false, dichte: 7500 }
      ]
    },
    {
      kategorie: "Raffinierte Metalle",
      eintraege: [
        { name: "Kupfer",      englisch: "Copper",    icon: "🔶", wärmeleitfähigkeit: 9.2,   schmelzpunkt: 1084, strom: true,  dichte: 1500 },
        { name: "Eisen",       englisch: "Iron",      icon: "⬜", wärmeleitfähigkeit: 14.0,  schmelzpunkt: 1538, strom: true,  dichte: 1500 },
        { name: "Gold",        englisch: "Gold",      icon: "🟨", wärmeleitfähigkeit: 197.0, schmelzpunkt: 1062, strom: true,  dichte: 2500 },
        { name: "Stahl",       englisch: "Steel",     icon: "🔩", wärmeleitfähigkeit: 54.0,  schmelzpunkt: 1535, strom: true,  dichte: 1000 },
        { name: "Thermium",    englisch: "Thermium",  icon: "🔴", wärmeleitfähigkeit: 200.0, schmelzpunkt: 2977, strom: true,  dichte: 1000 },
        { name: "Niobium",     englisch: "Niobium",   icon: "🔵", wärmeleitfähigkeit: 54.0,  schmelzpunkt: 2477, strom: true,  dichte: 1000 }
      ]
    },
    {
      kategorie: "Steine & Gestein",
      eintraege: [
        { name: "Kalkstein",   englisch: "Sedimentary Rock", icon: "⬜", wärmeleitfähigkeit: 2.0,  schmelzpunkt: 1700, strom: false, dichte: 2500 },
        { name: "Granit",      englisch: "Granite",          icon: "🪨", wärmeleitfähigkeit: 3.39, schmelzpunkt: 1200, strom: false, dichte: 2700 },
        { name: "Sandstein",   englisch: "Sandstone",        icon: "🟫", wärmeleitfähigkeit: 3.0,  schmelzpunkt: 1700, strom: false, dichte: 1600 },
        { name: "Obsidian",    englisch: "Obsidian",         icon: "⬛", wärmeleitfähigkeit: 2.0,  schmelzpunkt: 1420, strom: false, dichte: 2650 }
      ]
    },
    {
      kategorie: "Gase",
      eintraege: [
        { name: "Sauerstoff",          englisch: "Oxygen",          icon: "💨", wärmeleitfähigkeit: 0.024,  schmelzpunkt: -183, strom: false, dichte: 1 },
        { name: "Kohlendioxid (CO₂)",  englisch: "Carbon Dioxide",  icon: "☁️", wärmeleitfähigkeit: 0.015,  schmelzpunkt: -78,  strom: false, dichte: 1 },
        { name: "Wasserstoff",         englisch: "Hydrogen",        icon: "🔵", wärmeleitfähigkeit: 0.168,  schmelzpunkt: -259, strom: false, dichte: 1 },
        { name: "Erdgas",              englisch: "Natural Gas",     icon: "🔥", wärmeleitfähigkeit: 0.035,  schmelzpunkt: -182, strom: false, dichte: 1 },
        { name: "Chlor",               englisch: "Chlorine",        icon: "🟢", wärmeleitfähigkeit: 0.0084, schmelzpunkt: -101, strom: false, dichte: 1 }
      ]
    },
    {
      kategorie: "Flüssigkeiten",
      eintraege: [
        { name: "Wasser",         englisch: "Water",          icon: "💧", wärmeleitfähigkeit: 0.609, schmelzpunkt: 0,    strom: false, dichte: 1000 },
        { name: "Schmutzwasser",  englisch: "Polluted Water", icon: "🪣", wärmeleitfähigkeit: 0.580, schmelzpunkt: -20,  strom: false, dichte: 1010 },
        { name: "Erdöl",          englisch: "Crude Oil",      icon: "🛢️", wärmeleitfähigkeit: 0.150, schmelzpunkt: -40,  strom: false, dichte: 850  },
        { name: "Petroleum",      englisch: "Petroleum",      icon: "⛽", wärmeleitfähigkeit: 0.149, schmelzpunkt: -50,  strom: false, dichte: 750  },
        { name: "Salzwasser",     englisch: "Salt Water",     icon: "🌊", wärmeleitfähigkeit: 0.609, schmelzpunkt: -10,  strom: false, dichte: 1030 }
      ]
    }
  ],

  // ── KOCHEN & REZEPTE ÜBERSICHT ────────────────────────────
  geraete: [
    {
      name: "Elektroherd",
      englisch: "Electric Grill",
      strom: 240,
      einheit: "W",
      icon: "🍳"
    },
    {
      name: "Gasherd",
      englisch: "Gas Range",
      strom: 0,
      einheit: "(Erdgas: 100g/s)",
      icon: "🔥"
    },
    {
      name: "Eisen-Grill",
      englisch: "Microbe Musher",
      strom: 240,
      einheit: "W",
      icon: "🥣"
    }
  ]
};

// ── HILFSFUNKTIONEN ───────────────────────────────────────
function getPflanzeById(id) {
  return ONI.pflanzen.find(p => p.id === id);
}
function getTierById(id) {
  return ONI.tiere.find(t => t.id === id);
}
function kcalProZyklus(pflanze) {
  return pflanze.kcalProErnte / pflanze.wachstumszyklen;
}
function pflanzenFuerDupes(pflanze, dupeAnzahl) {
  const bedarf = dupeAnzahl * ONI.duplikantBedarf.kalorien.wert;
  return Math.ceil(bedarf / kcalProZyklus(pflanze));
}
