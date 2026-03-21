// ============================================================
// ONI KALKULATOR – Spieldaten (Offizielle Deutsche Übersetzung)
// Quelle: ONI Wiki (oxygennotincluded.wiki.gg), Klei Entertainment
// Bilder: © Klei Entertainment – verlinkt vom ONI Wiki (CC-BY-NC-SA)
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
    kalorien:          { wert: 2000,  einheit: "kcal", icon: "🍽️",  name: "Kalorien" },
    sauerstoff:        { wert: 60000, einheit: "g",    icon: "💨",  name: "Sauerstoff (verbraucht)" },
    co2Produktion:     { wert: 20000, einheit: "g",    icon: "☁️",  name: "CO₂ (produziert)" },
    wasserToilette:    { wert: 15000, einheit: "g",    icon: "💧",  name: "Wasser (Toilette)" },
    schmutzwasser:     { wert: 11700, einheit: "g",    icon: "🪣",  name: "Schmutzwasser (produziert)" },
    wasserWaschbecken: { wert: 5000,  einheit: "g",    icon: "🚿",  name: "Wasser (Waschbecken)" }
  },

  // ── NAHRUNGSPFLANZEN ──────────────────────────────────────
  pflanzen: [
    {
      id: "mehlholz",
      name: "Mehlholz",
      englisch: "Mealwood",
      pack: "vanilla",
      icon: "🌿",
      img: "https://oxygennotincluded.wiki.gg/images/Mealwood.png",
      farbe: "#6b8c3a",
      wachstumszyklen: 3,
      kcalProErnte: 800,
      roherName: "Mehlkorn",
      inputs: [
        { name: "Schmutzerde", menge: 20, einheit: "kg/Zyklus" }
      ],
      temperatur: { min: 10, max: 30 },
      licht: false,
      wasser: false,
      beschreibung: "Einfachste Nahrungspflanze. Kein Licht, kein Wasser nötig.",
      tipp: "Perfekt als Starternahrung. Sehr genügsam.",
      rezepte: [
        { name: "Mehlfladen",      kcal: 1000, zutaten: ["1× Mehlkorn"],                    geraet: "Einfacher Grill", pack: "vanilla" },
        { name: "Gebackener Tofu", kcal: 3600, zutaten: ["1× Mehlkorn", "1× Roher Pilz"],   geraet: "Elektroherd",     pack: "vanilla" }
      ]
    },
    {
      id: "borstenblüte",
      name: "Borstenblüte",
      englisch: "Bristle Blossom",
      pack: "vanilla",
      icon: "🌸",
      img: "https://oxygennotincluded.wiki.gg/images/Bristle_Blossom.png",
      farbe: "#c06090",
      wachstumszyklen: 4,
      kcalProErnte: 4800,
      roherName: "Borstenbeere",
      inputs: [
        { name: "Wasser", menge: 20,  einheit: "kg/Zyklus" },
        { name: "CO₂",   menge: 150, einheit: "g/Zyklus"  }
      ],
      temperatur: { min: 15, max: 30 },
      licht: false,
      wasser: true,
      beschreibung: "Hoher Kalorienertrag. Braucht Wasser und CO₂.",
      tipp: "Sehr effizient für fortgeschrittene Kolonien mit CO₂-Überschuss.",
      rezepte: [
        { name: "Borstenbeeren-Smoothie", kcal: 9600, zutaten: ["2× Borstenbeere", "1× Wasser (Flasche)"], geraet: "Elektroherd", pack: "vanilla" },
        { name: "Gefüllte Beere",         kcal: 6000, zutaten: ["1× Borstenbeere", "1× Pincha-Pfeffer"],   geraet: "Elektroherd", pack: "vanilla" }
      ]
    },
    {
      id: "dämmerkappe",
      name: "Dämmerkappe",
      englisch: "Dusk Cap",
      pack: "vanilla",
      icon: "🍄",
      img: "https://oxygennotincluded.wiki.gg/images/Dusk_Cap.png",
      farbe: "#7a5c8a",
      wachstumszyklen: 3,
      kcalProErnte: 1600,
      roherName: "Roher Pilz",
      inputs: [
        { name: "CO₂",           menge: 100, einheit: "g/Zyklus"  },
        { name: "Schmutzwasser", menge: 35,  einheit: "kg/Zyklus" }
      ],
      temperatur: { min: 16, max: 22 },
      licht: false,
      wasser: false,
      dunkelheit: true,
      beschreibung: "Benötigt absolute Dunkelheit und CO₂. Verarbeitet Schmutzwasser.",
      tipp: "Ideal in dunklen Räumen. Produziert wertvolles Schmutzwasser.",
      rezepte: [
        { name: "Pilzwrap",        kcal: 3600, zutaten: ["1× Roher Pilz", "1× Pincha-Pfeffer"], geraet: "Elektroherd", pack: "vanilla" },
        { name: "Gebackener Tofu", kcal: 3600, zutaten: ["1× Mehlkorn", "1× Roher Pilz"],       geraet: "Elektroherd", pack: "vanilla" }
      ]
    },
    {
      id: "pinchaPfefferpflanze",
      name: "Pincha-Pfefferpflanze",
      englisch: "Pincha Pepperplant",
      pack: "vanilla",
      icon: "🌶️",
      img: "https://oxygennotincluded.wiki.gg/images/Pincha_Pepperplant.png",
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
        { name: "Gefüllte Beere", kcal: 6000, zutaten: ["1× Borstenbeere", "1× Pincha-Pfeffer"], geraet: "Elektroherd", pack: "vanilla" },
        { name: "Pilzwrap",       kcal: 3600, zutaten: ["1× Roher Pilz", "1× Pincha-Pfeffer"],   geraet: "Elektroherd", pack: "vanilla" },
        { name: "Pfeffer-Tofu",   kcal: 5000, zutaten: ["2× Pincha-Pfeffer"],                    geraet: "Elektroherd", pack: "vanilla" }
      ]
    },
    {
      id: "schneeweizen",
      name: "Schneeweizen",
      englisch: "Sleet Wheat",
      pack: "vanilla",
      icon: "🌾",
      img: "https://oxygennotincluded.wiki.gg/images/Sleet_Wheat.png",
      farbe: "#88aacc",
      wachstumszyklen: 6,
      kcalProErnte: 1700,
      roherName: "Schneeweizenkörner (17 × 100 kcal)",
      inputs: [
        { name: "Wasser",     menge: 40, einheit: "kg/Zyklus" },
        { name: "Phosphorit", menge: 10, einheit: "g/Zyklus"  }
      ],
      temperatur: { min: -20, max: 10 },
      licht: false,
      wasser: true,
      beschreibung: "Wächst nur in sehr kalten Umgebungen (-20 bis 10°C).",
      tipp: "Benötigt aktive Kühlung. Kombination mit Aquatuner empfohlen.",
      rezepte: [
        { name: "Frost-Burger", kcal: 8000, zutaten: ["4× Schneeweizenkörner", "1× Fleisch"], geraet: "Elektroherd", pack: "vanilla" }
      ]
    },
    {
      id: "naschjunges",
      name: "Naschjunges",
      englisch: "Nosh Sprout",
      pack: "spacedOut",
      icon: "🫘",
      img: "https://oxygennotincluded.wiki.gg/images/Nosh_Sprout.png",
      farbe: "#5a8a5a",
      wachstumszyklen: 6,
      kcalProErnte: 4000,
      roherName: "Naschbohne",
      inputs: [
        { name: "Phosphorit", menge: 5,   einheit: "kg/Zyklus" },
        { name: "CO₂",        menge: 100, einheit: "g/Zyklus"  }
      ],
      temperatur: { min: 15, max: 35 },
      licht: false,
      wasser: false,
      beschreibung: "Spaced Out! Pflanze. Braucht Phosphorit statt Wasser.",
      tipp: "Gute Alternative wenn Wasser knapp ist.",
      rezepte: []
    },
    {
      id: "wasserunkraut",
      name: "Wasserunkraut",
      englisch: "Waterweed",
      pack: "spacedOut",
      icon: "🌊",
      img: "https://oxygennotincluded.wiki.gg/images/Waterweed.png",
      farbe: "#2a7a9a",
      wachstumszyklen: 4,
      kcalProErnte: 2400,
      roherName: "Salzpflanze",
      inputs: [
        { name: "Salzwasser", menge: 70, einheit: "kg/Zyklus" },
        { name: "Chlor",      menge: 10, einheit: "g/Zyklus"  }
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
      id: "hatch",
      name: "Hatch",
      englisch: "Hatch",
      pack: "vanilla",
      icon: "🦎",
      img: "https://oxygennotincluded.wiki.gg/images/Hatch.png",
      farbe: "#8a6a3a",
      lebensraum: "Boden",
      maxProStall: 8,
      nahrung: [
        { name: "Schmutzerde",            menge: 140, einheit: "kg/Zyklus" },
        { name: "Stein (Kalkstein, Granit…)", menge: 140, einheit: "kg/Zyklus" },
        { name: "Kohle",                  menge: 140, einheit: "kg/Zyklus" },
        { name: "Metallerz (diverse)",    menge: 140, einheit: "kg/Zyklus" }
      ],
      produktion: [
        { name: "Kohle", menge: 140, einheit: "kg/Zyklus", icon: "⚫" }
      ],
      eiinkubation: 3,
      beschreibung: "Frisst fast alles Festes und produziert Kohle. Ideal für Energieversorgung.",
      tipp: "Ranch-Hatch für passiven Kohlenachschub. Mit Kohlegeneratoren kombinieren.",
      varianten: [
        { name: "Glatter Hatch",   sonderNahrung: "Raffiniertes Metall",  sonderProduktion: "Raffiniertes Metall (gleicher Typ, 75% Masse)" },
        { name: "Stachliger Hatch", sonderNahrung: "Schmutzerde",         sonderProduktion: "Kohle (höhere Menge)" }
      ]
    },
    {
      id: "schiebwühlmaus",
      name: "Schiebwühlmaus",
      englisch: "Shove Vole",
      pack: "vanilla",
      icon: "🐀",
      img: "https://oxygennotincluded.wiki.gg/images/Shove_Vole.png",
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
      tipp: "Perfekt für Regolith-Verarbeitung auf Asteroiden (Spaced Out!).",
      varianten: []
    },
    {
      id: "quiekenderPuft",
      name: "Quiekender Puft",
      englisch: "Squeaky Puft",
      pack: "vanilla",
      icon: "🐡",
      img: "https://oxygennotincluded.wiki.gg/images/Squeaky_Puft.png",
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
        { name: "Oxylite-Puft",  sonderNahrung: "Sauerstoff", sonderProduktion: "Oxylite" },
        { name: "Chlorin-Puft",  sonderNahrung: "Chlor",      sonderProduktion: "Bleichstein" }
      ]
    },
    {
      id: "pacu",
      name: "Pacu",
      englisch: "Pacu",
      pack: "vanilla",
      icon: "🐟",
      img: "https://oxygennotincluded.wiki.gg/images/Pacu.png",
      farbe: "#2a6a9a",
      lebensraum: "Wasser (mind. 100 kg pro Kachel)",
      maxProStall: 4,
      nahrung: [
        { name: "Algen",       menge: 90000, einheit: "g/Zyklus" },
        { name: "Fischfutter", menge: 90000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Pacu-Filet", menge: 1, einheit: "alle 20 Zyklen (~4000 kcal)", icon: "🍣" },
        { name: "Pacu-Ei",    menge: 1, einheit: "alle 20 Zyklen",              icon: "🥚" }
      ],
      eiinkubation: 5,
      beschreibung: "Wassertier. Produziert Nahrung und Dünger.",
      tipp: "Für einen Wasser-Loop mit Algen-Destillieranlage kombinieren.",
      varianten: [
        { name: "Tropischer Pacu", sonderNahrung: "Kein Bedarf (isst nichts)", sonderProduktion: "Dreckiges Wasser" }
      ]
    },
    {
      id: "gasigesMuh",
      name: "Gasige Muh",
      englisch: "Gassy Moo",
      pack: "spacedOut",
      icon: "🐄",
      img: "https://oxygennotincluded.wiki.gg/images/Gassy_Moo.png",
      farbe: "#4a8a5a",
      lebensraum: "Spezielle Gasbiome / Vakuum-Planet",
      maxProStall: 2,
      nahrung: [
        { name: "Gasige Gräser (selbstversorgend)", menge: 0, einheit: "–" }
      ],
      produktion: [
        { name: "Erdgas", menge: 120000, einheit: "g/Zyklus", icon: "🔥" }
      ],
      eiinkubation: 8,
      beschreibung: "Produziert passiv Erdgas. Lebt auf speziellen Planetoiden.",
      tipp: "Früh einen Gasige-Muh-Planetoiden erkunden für passive Energie.",
      varianten: []
    },
    {
      id: "morb",
      name: "Morb",
      englisch: "Morb",
      pack: "vanilla",
      icon: "😷",
      img: "https://oxygennotincluded.wiki.gg/images/Morb.png",
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
      tipp: "Nützlich um PO₂ für Quiekender-Puft-Ranches zu produzieren.",
      varianten: []
    },
    {
      id: "drecko",
      name: "Drecko",
      englisch: "Drecko",
      pack: "vanilla",
      icon: "🦕",
      img: "https://oxygennotincluded.wiki.gg/images/Drecko.png",
      farbe: "#7a9a3a",
      lebensraum: "Wasserstoff oder Chlor",
      maxProStall: 8,
      nahrung: [
        { name: "Borstenblüte (Blätter)", menge: 200, einheit: "kg/Zyklus" }
      ],
      produktion: [
        { name: "Phosphorit", menge: 34, einheit: "kg/Zyklus", icon: "🟡" },
        { name: "Glattfaser (in H₂)", menge: 1, einheit: "alle 3 Zyklen", icon: "🧵" }
      ],
      eiinkubation: 5,
      beschreibung: "Produziert Phosphorit und in Wasserstoff-Umgebung Glattfaser.",
      tipp: "Drecko-Ranch in Wasserstoff für Glattfaser-Produktion (für Anzüge).",
      varianten: [
        { name: "Schuppiger Drecko", sonderNahrung: "Borstenblüte", sonderProduktion: "Glattfaser (mehr)" }
      ]
    },
    {
      id: "pip",
      name: "Pip",
      englisch: "Pip",
      pack: "vanilla",
      icon: "🐿️",
      img: "https://oxygennotincluded.wiki.gg/images/Pip.png",
      farbe: "#9a7a5a",
      lebensraum: "Naturboden / Farmboden",
      maxProStall: 8,
      nahrung: [
        { name: "Samen (diverse)", menge: 140, einheit: "kg/Zyklus" }
      ],
      produktion: [
        { name: "Pflanzt Samen in natürliche Kacheln", menge: 0, einheit: "(passiv)", icon: "🌱" }
      ],
      eiinkubation: 3,
      beschreibung: "Pflanzt Samen automatisch in geeignete Bodenkacheln.",
      tipp: "Nützlich für automatische Pflanzfarmen ohne Dupe-Arbeit.",
      varianten: []
    }
  ],

  // ── GEBÄUDE & STALL-ANFORDERUNGEN ─────────────────────────
  stallInfo: {
    groesse: "12 × 8 Kacheln (96 Kacheln gesamt)",
    benoetigt: [
      "1× Viehstation (Ranching Station)",
      "1× Viehübergabe (Critter Drop-Off)",
      "Viehbetten je nach Tier",
      "Lüftung oder Gasversorgung je nach Tier",
      "Optional: Pflegestation (Grooming Station)"
    ],
    tipp: "Gepflegte Tiere produzieren 25% mehr und legen häufiger Eier."
  },

  // ── RESSOURCEN & MATERIALIEN ──────────────────────────────
  // Alle Werte direkt aus den Spieldaten (Klei Entertainment)
  materialien: [
    {
      kategorie: "Rohmetalle (Erze)",
      eintraege: [
        { name: "Kupfererz",   englisch: "Copper Ore",   icon: "🟠", wärmeleitfähigkeit: 4.5,   schmelzpunkt: 1985, strom: false, dichte: 1500 },
        { name: "Eisenerz",    englisch: "Iron Ore",     icon: "🟤", wärmeleitfähigkeit: 4.0,   schmelzpunkt: 1538, strom: false, dichte: 1500 },
        { name: "Goldalmagam", englisch: "Gold Amalgam", icon: "🟡", wärmeleitfähigkeit: 100.0, schmelzpunkt: 801,  strom: false, dichte: 2500 },
        { name: "Wolframit",   englisch: "Wolframite",   icon: "⬛", wärmeleitfähigkeit: 60.0,  schmelzpunkt: 3422, strom: false, dichte: 7500 }
      ]
    },
    {
      kategorie: "Raffinierte Metalle",
      eintraege: [
        { name: "Kupfer",   englisch: "Copper",   icon: "🔶", wärmeleitfähigkeit: 9.2,   schmelzpunkt: 1985, strom: true,  dichte: 1500 },
        { name: "Eisen",    englisch: "Iron",     icon: "⬜", wärmeleitfähigkeit: 14.0,  schmelzpunkt: 1538, strom: true,  dichte: 1500 },
        { name: "Gold",     englisch: "Gold",     icon: "🟨", wärmeleitfähigkeit: 197.0, schmelzpunkt: 1063, strom: true,  dichte: 2500 },
        { name: "Stahl",    englisch: "Steel",    icon: "🔩", wärmeleitfähigkeit: 54.0,  schmelzpunkt: 2427, strom: true,  dichte: 7800 },
        { name: "Thermium", englisch: "Thermium", icon: "🔴", wärmeleitfähigkeit: 200.0, schmelzpunkt: 2977, strom: true,  dichte: 5000 },
        { name: "Niobium",  englisch: "Niobium",  icon: "🔵", wärmeleitfähigkeit: 54.0,  schmelzpunkt: 2477, strom: true,  dichte: 6000 }
      ]
    },
    {
      kategorie: "Steine & Gestein",
      eintraege: [
        { name: "Sedimentgestein", englisch: "Sedimentary Rock", icon: "⬜", wärmeleitfähigkeit: 2.0,  schmelzpunkt: 1530, strom: false, dichte: 2500 },
        { name: "Granit",          englisch: "Granite",          icon: "🪨", wärmeleitfähigkeit: 3.39, schmelzpunkt: 1198, strom: false, dichte: 2700 },
        { name: "Sandstein",       englisch: "Sandstone",        icon: "🟫", wärmeleitfähigkeit: 3.0,  schmelzpunkt: 1603, strom: false, dichte: 1600 },
        { name: "Obsidian",        englisch: "Obsidian",         icon: "⬛", wärmeleitfähigkeit: 2.0,  schmelzpunkt: 1420, strom: false, dichte: 2650 },
        { name: "Ablativgestein",  englisch: "Igneous Rock",     icon: "🔺", wärmeleitfähigkeit: 2.0,  schmelzpunkt: 1410, strom: false, dichte: 2400 }
      ]
    },
    {
      kategorie: "Gase",
      eintraege: [
        { name: "Sauerstoff",         englisch: "Oxygen",         icon: "💨", wärmeleitfähigkeit: 0.024,  schmelzpunkt: -183, strom: false, dichte: 1 },
        { name: "CO₂",                englisch: "Carbon Dioxide", icon: "☁️", wärmeleitfähigkeit: 0.015,  schmelzpunkt: -78,  strom: false, dichte: 1 },
        { name: "Wasserstoff",        englisch: "Hydrogen",       icon: "🔵", wärmeleitfähigkeit: 0.168,  schmelzpunkt: -259, strom: false, dichte: 1 },
        { name: "Erdgas",             englisch: "Natural Gas",    icon: "🔥", wärmeleitfähigkeit: 0.035,  schmelzpunkt: -182, strom: false, dichte: 1 },
        { name: "Chlor",              englisch: "Chlorine",       icon: "🟢", wärmeleitfähigkeit: 0.0084, schmelzpunkt: -101, strom: false, dichte: 1 },
        { name: "Schmutziger Sauerstoff", englisch: "Polluted Oxygen", icon: "💚", wärmeleitfähigkeit: 0.024, schmelzpunkt: -183, strom: false, dichte: 1 }
      ]
    },
    {
      kategorie: "Flüssigkeiten",
      eintraege: [
        { name: "Wasser",        englisch: "Water",          icon: "💧", wärmeleitfähigkeit: 0.609, schmelzpunkt: 0,   strom: false, dichte: 1000 },
        { name: "Schmutzwasser", englisch: "Polluted Water", icon: "🪣", wärmeleitfähigkeit: 0.580, schmelzpunkt: -20, strom: false, dichte: 1010 },
        { name: "Erdöl",         englisch: "Crude Oil",      icon: "🛢️", wärmeleitfähigkeit: 0.150, schmelzpunkt: -40, strom: false, dichte: 850  },
        { name: "Petroleum",     englisch: "Petroleum",      icon: "⛽", wärmeleitfähigkeit: 0.149, schmelzpunkt: -50, strom: false, dichte: 750  },
        { name: "Salzwasser",    englisch: "Salt Water",     icon: "🌊", wärmeleitfähigkeit: 0.609, schmelzpunkt: -10, strom: false, dichte: 1030 },
        { name: "Flüssiges O₂",  englisch: "Liquid Oxygen",  icon: "🧊", wärmeleitfähigkeit: 1.010, schmelzpunkt: -183,strom: false, dichte: 1141 }
      ]
    },
    {
      kategorie: "Sonstige Baustoffe",
      eintraege: [
        { name: "Kunststoff",   englisch: "Plastic",   icon: "🟦", wärmeleitfähigkeit: 0.170, schmelzpunkt: 160,  strom: false, dichte: 900  },
        { name: "Glas",         englisch: "Glass",     icon: "🔷", wärmeleitfähigkeit: 1.0,   schmelzpunkt: 1600, strom: false, dichte: 2500 },
        { name: "Keramik",      englisch: "Ceramic",   icon: "⬜", wärmeleitfähigkeit: 1.57,  schmelzpunkt: 1650, strom: false, dichte: 2000 },
        { name: "Diamant",      englisch: "Diamond",   icon: "💎", wärmeleitfähigkeit: 700.0, schmelzpunkt: 3600, strom: false, dichte: 3510 }
      ]
    }
  ],

  // ── KOCHGERÄTE ────────────────────────────────────────────
  geraete: [
    { name: "Einfacher Grill",  englisch: "Microbe Musher",  strom: 240, einheit: "W",              icon: "🥣" },
    { name: "Elektroherd",      englisch: "Electric Grill",  strom: 240, einheit: "W",              icon: "🍳" },
    { name: "Gasherd",          englisch: "Gas Range",       strom: 0,   einheit: "(Erdgas: 100g/s)", icon: "🔥" }
  ]
};

// ── HILFSFUNKTIONEN ───────────────────────────────────────
function getPflanzeById(id)  { return ONI.pflanzen.find(p => p.id === id); }
function getTierById(id)     { return ONI.tiere.find(t => t.id === id); }
function kcalProZyklus(p)    { return p.kcalProErnte / p.wachstumszyklen; }
function pflanzenFuerDupes(p, n) {
  return Math.ceil((n * ONI.duplikantBedarf.kalorien.wert) / kcalProZyklus(p));
}
