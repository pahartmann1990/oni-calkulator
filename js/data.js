// ============================================================
// ONI KALKULATOR – Spieldaten
// Quelle: Ni42/Oxygen_Not_Included_German (offizielle Community-Übersetzung)
//         ONI Wiki (oxygennotincluded.wiki.gg), Klei Entertainment
// Bilder: © Klei Entertainment – verlinkt vom ONI Wiki
// ============================================================

const ONI = {

  // ── DLC PACKS ─────────────────────────────────────────────
  packs: [
    { id: "vanilla",           name: "Basisspiel",              icon: "🌍" },
    { id: "spacedOut",         name: "Spaced Out!",             icon: "🚀" },
    { id: "frostyPlanet",      name: "Frosty Planet Pack",      icon: "❄️" },
    { id: "prehistoricPlanet", name: "Prehistoric Planet Pack", icon: "🦕" }
  ],

  // ── DUPLIKANT GRUNDBEDARF (pro Zyklus = 600 Sekunden) ─────
  duplikantBedarf: {
    kalorien:          { wert: 2000,  einheit: "kcal", icon: "🍽️", name: "Kalorien" },
    sauerstoff:        { wert: 60000, einheit: "g",    icon: "💨", name: "Sauerstoff (verbraucht)" },
    co2Produktion:     { wert: 20000, einheit: "g",    icon: "☁️", name: "CO₂ (produziert)" },
    wasserToilette:    { wert: 15000, einheit: "g",    icon: "💧", name: "Wasser (Toilette)" },
    schmutzwasser:     { wert: 11700, einheit: "g",    icon: "🪣", name: "Schmutzwasser (produziert)" },
    wasserWaschbecken: { wert: 5000,  einheit: "g",    icon: "🚿", name: "Wasser (Waschbecken)" }
  },

  // ── NAHRUNGSPFLANZEN ──────────────────────────────────────
  pflanzen: [
    // ── BASISSPIEL ──
    {
      id: "mehlholz",
      name: "Mehlholz",
      englisch: "Mealwood",
      typ: "nahrung",
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
      licht: false, wasser: false,
      beschreibung: "Einfachste Nahrungspflanze. Kein Licht, kein Wasser nötig.",
      tipp: "Perfekt als Starternahrung. Sehr genügsam.",
      rezepte: [
        { name: "Mehlfladen",      kcal: 1000, zutaten: ["1× Mehlkorn"],                    geraet: "Einfacher Grill" },
        { name: "Gebackener Tofu", kcal: 3600, zutaten: ["1× Mehlkorn", "1× Roher Pilz"],   geraet: "Elektroherd"    }
      ]
    },
    {
      id: "dornenbluete",
      name: "Dornenblüte",
      englisch: "Bristle Blossom",
      typ: "nahrung",
      pack: "vanilla",
      icon: "🌸",
      img: "https://oxygennotincluded.wiki.gg/images/Bristle_Blossom.png",
      farbe: "#c06090",
      wachstumszyklen: 4,
      kcalProErnte: 4800,
      roherName: "Dornenbeere",
      inputs: [
        { name: "Wasser", menge: 20,  einheit: "kg/Zyklus" },
        { name: "CO₂",   menge: 150, einheit: "g/Zyklus"  }
      ],
      temperatur: { min: 15, max: 30 },
      licht: false, wasser: true,
      beschreibung: "Hoher Kalorienertrag. Braucht Wasser und CO₂.",
      tipp: "Sehr effizient für fortgeschrittene Kolonien mit CO₂-Überschuss.",
      rezepte: [
        { name: "Dornbeeren-Smoothie", kcal: 9600, zutaten: ["2× Dornenbeere", "1× Wasser (Flasche)"], geraet: "Elektroherd" },
        { name: "Gefüllte Beere",      kcal: 6000, zutaten: ["1× Dornenbeere", "1× Pinchapfeffer"],   geraet: "Elektroherd" }
      ]
    },
    {
      id: "daemmerkappe",
      name: "Dämmerkappe",
      englisch: "Dusk Cap",
      typ: "nahrung",
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
      licht: false, wasser: false, dunkelheit: true,
      beschreibung: "Benötigt absolute Dunkelheit und CO₂. Verarbeitet Schmutzwasser.",
      tipp: "Ideal in dunklen Räumen. CO₂ aus Duplikanten nutzen.",
      rezepte: [
        { name: "Pilzwrap",        kcal: 3600, zutaten: ["1× Roher Pilz", "1× Pinchapfeffer"], geraet: "Elektroherd" },
        { name: "Gebackener Tofu", kcal: 3600, zutaten: ["1× Mehlkorn",   "1× Roher Pilz"],   geraet: "Elektroherd" }
      ]
    },
    {
      id: "pinchapfefferpflanze",
      name: "Pinchapfeffer-Pflanze",
      englisch: "Pincha Pepperplant",
      typ: "nahrung",
      pack: "vanilla",
      icon: "🌶️",
      img: "https://oxygennotincluded.wiki.gg/images/Pincha_Pepperplant.png",
      farbe: "#c04030",
      wachstumszyklen: 5,
      kcalProErnte: 2400,
      roherName: "Pinchapfeffer",
      inputs: [
        { name: "Schmutzwasser", menge: 35, einheit: "kg/Zyklus" }
      ],
      temperatur: { min: 30, max: 60 },
      licht: false, wasser: false,
      beschreibung: "Verarbeitet Schmutzwasser. Braucht warme Umgebungen.",
      tipp: "Gut kombiniert mit Toiletten (Schmutzwasser-Kreislauf).",
      rezepte: [
        { name: "Gefüllte Beere", kcal: 6000, zutaten: ["1× Dornenbeere",  "1× Pinchapfeffer"], geraet: "Elektroherd" },
        { name: "Pilzwrap",       kcal: 3600, zutaten: ["1× Roher Pilz", "1× Pinchapfeffer"], geraet: "Elektroherd" },
        { name: "Pfeffer-Tofu",   kcal: 5000, zutaten: ["2× Pinchapfeffer"],                  geraet: "Elektroherd" }
      ]
    },
    {
      id: "graupelweizen",
      name: "Graupelweizen",
      englisch: "Sleet Wheat",
      typ: "nahrung",
      pack: "vanilla",
      icon: "🌾",
      img: "https://oxygennotincluded.wiki.gg/images/Sleet_Wheat.png",
      farbe: "#88aacc",
      wachstumszyklen: 6,
      kcalProErnte: 1700,
      roherName: "Graupelweizenmehl (17 Körner × 100 kcal)",
      inputs: [
        { name: "Wasser",     menge: 40, einheit: "kg/Zyklus" },
        { name: "Phosphorit", menge: 10, einheit: "g/Zyklus"  }
      ],
      temperatur: { min: -20, max: 10 },
      licht: false, wasser: true,
      beschreibung: "Wächst nur in sehr kalten Umgebungen (-20 bis 10°C).",
      tipp: "Aktive Kühlung erforderlich – Aquatuner empfohlen.",
      rezepte: [
        { name: "Frost-Burger", kcal: 8000, zutaten: ["4× Graupelweizenmehl", "1× Fleisch"], geraet: "Elektroherd" }
      ]
    },
    {
      id: "fingerhutschilf",
      name: "Fingerhutschilf",
      englisch: "Thimble Reed",
      typ: "ressource",
      pack: "vanilla",
      icon: "🪴",
      img: "https://oxygennotincluded.wiki.gg/images/Thimble_Reed.png",
      farbe: "#4a7a5a",
      wachstumszyklen: 4,
      kcalProErnte: 0,
      roherName: "Schilffaser (kein Nahrungsmittel)",
      inputs: [
        { name: "Schmutzwasser", menge: 35,  einheit: "kg/Zyklus" },
        { name: "CO₂",           menge: 100, einheit: "g/Zyklus"  }
      ],
      temperatur: { min: 5, max: 30 },
      licht: false, wasser: false,
      beschreibung: "Produziert Schilffaser – wird für Anzüge (Schnittiger Anzug) benötigt.",
      tipp: "Nicht zum Essen, aber unverzichtbar für Schutzanzüge.",
      rezepte: []
    },
    {
      id: "balsamlilie",
      name: "Balsamlilie",
      englisch: "Balm Lily",
      typ: "ressource",
      pack: "vanilla",
      icon: "🌺",
      img: "https://oxygennotincluded.wiki.gg/images/Balm_Lily.png",
      farbe: "#9a4a7a",
      wachstumszyklen: 5,
      kcalProErnte: 0,
      roherName: "Balsamlilienblüte (Heilmittel-Zutat)",
      inputs: [
        { name: "Wasser", menge: 70, einheit: "kg/Zyklus" }
      ],
      temperatur: { min: 22, max: 42 },
      licht: false, wasser: true,
      beschreibung: "Produziert Blüten für medizinische Rezepte (Heilmittel-Tabletten).",
      tipp: "Für medizinische Versorgung der Kolonie – keine Nahrung.",
      rezepte: []
    },
    {
      id: "keuchwurz",
      name: "Keuchwurz",
      englisch: "Wheezewort",
      typ: "wild",
      pack: "vanilla",
      icon: "🌀",
      img: "https://oxygennotincluded.wiki.gg/images/Wheezewort.png",
      farbe: "#3a7a9a",
      wachstumszyklen: 0,
      kcalProErnte: 0,
      roherName: "Kein Erntegut – kühlt Umgebung",
      inputs: [
        { name: "CO₂", menge: 100, einheit: "g/Zyklus (absorbiert)" }
      ],
      temperatur: { min: -20, max: 20 },
      licht: false, wasser: false,
      beschreibung: "Keine Nahrungspflanze! Kühlt aktiv die Umgebung, gibt O₂ ab.",
      tipp: "Unverzichtbar für passive Kühlung (z.B. Graupelweizen-Feld).",
      rezepte: []
    },

    // ── SPACED OUT! ──
    {
      id: "happspross",
      name: "Happspross",
      englisch: "Nosh Sprout",
      typ: "nahrung",
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
      licht: false, wasser: false,
      beschreibung: "Spaced Out! Pflanze – braucht Phosphorit statt Wasser.",
      tipp: "Gut wenn Wasser knapp ist. Phosphorit aus Drecko-Ranch nutzen.",
      rezepte: []
    },
    {
      id: "wasserkraut",
      name: "Wasserkraut",
      englisch: "Waterweed",
      typ: "nahrung",
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
      licht: false, wasser: true,
      beschreibung: "Spaced Out! – braucht Salzwasser. Ideal auf Salzwasser-Planetoiden.",
      tipp: "Kombiniere mit Salzwasser-Quellen auf dem Salzwasserplaneten.",
      rezepte: []
    },
    {
      id: "wuehlfruchtpflanze",
      name: "Spindeldürre Wühlfruchtpflanze",
      englisch: "Spindly Grubfruit Plant",
      typ: "nahrung",
      pack: "spacedOut",
      icon: "🌱",
      img: "https://oxygennotincluded.wiki.gg/images/Spindly_Grubfruit_Plant.png",
      farbe: "#7a5a3a",
      wachstumszyklen: 6,
      kcalProErnte: 1800,
      roherName: "Wühlfrucht",
      inputs: [
        { name: "CO₂",        menge: 50, einheit: "g/Zyklus"  },
        { name: "Schmutzerde", menge: 10, einheit: "kg/Zyklus" }
      ],
      temperatur: { min: 10, max: 35 },
      licht: false, wasser: false,
      beschreibung: "Spaced Out! – Wühlfrucht kann zu Mahlzeiten verarbeitet werden.",
      tipp: "Wächst gut in Kombination mit Sweetle/Grubgrub-Farmen.",
      rezepte: [
        { name: "Gebratene Wühlfrucht", kcal: 3600, zutaten: ["1× Wühlfrucht"], geraet: "Elektroherd" }
      ]
    },
    {
      id: "hexalent",
      name: "Hexalent",
      englisch: "Hexalent",
      typ: "ressource",
      pack: "spacedOut",
      icon: "🌿",
      img: "https://oxygennotincluded.wiki.gg/images/Hexalent.png",
      farbe: "#3a6a3a",
      wachstumszyklen: 8,
      kcalProErnte: 0,
      roherName: "Holz (kein Nahrungsmittel direkt)",
      inputs: [
        { name: "CO₂", menge: 50, einheit: "g/Zyklus" }
      ],
      temperatur: { min: 10, max: 40 },
      licht: false, wasser: false,
      beschreibung: "Produziert Holz – Rohstoff für Sperrholz (Baustoff).",
      tipp: "Holz → Sperrholz: wichtiger Baustoff in Spaced Out!",
      rezepte: []
    },

    // ── NATÜRLICH WACHSENDE PFLANZEN (wild, nicht in Farmkacheln) ──
    {
      id: "arborbaum",
      name: "Arborbaum",
      englisch: "Arbor Tree",
      typ: "wild",
      pack: "vanilla",
      icon: "🌳",
      img: "https://oxygennotincluded.wiki.gg/images/Arbor_Tree.png",
      farbe: "#5a8a3a",
      wachstumszyklen: 18,
      kcalProErnte: 0,
      roherName: "Holz (Baumaterial)",
      inputs: [
        { name: "Wasser",     menge: 70, einheit: "kg/Zyklus" },
        { name: "Schmutzerde", menge: 10, einheit: "kg/Zyklus" }
      ],
      temperatur: { min: 15, max: 35 },
      licht: false, wasser: true,
      beschreibung: "Wächst natürlich in gemäßigten Biomen. Produziert Holz als Baustoff. Kann nur von Pips gepflanzt werden.",
      tipp: "Pip-Ranch + Arborbäume = passiver Holz-Nachschub ohne Duplikanten-Arbeit.",
      rezepte: []
    },
    {
      id: "bonbonrohrbluete",
      name: "Bonbonrohrblüte",
      englisch: "Sweetleaf",
      typ: "wild",
      pack: "vanilla",
      icon: "🍬",
      img: "https://oxygennotincluded.wiki.gg/images/Sweetleaf.png",
      farbe: "#d48a9a",
      wachstumszyklen: 0,
      kcalProErnte: 0,
      roherName: "Kein Erntegut – produziert O₂ passiv",
      inputs: [
        { name: "CO₂", menge: 100, einheit: "g/Zyklus (absorbiert)" }
      ],
      temperatur: { min: 10, max: 35 },
      licht: false, wasser: false,
      beschreibung: "Natürlich wachsende Dekorpflanze. Produziert Sauerstoff und verbessert Dekoration.",
      tipp: "Gut für Dekoration in Schlafbereichen und passive O₂-Produktion.",
      rezepte: []
    },
    {
      id: "sauerstoffkraut",
      name: "Oxyfarn",
      englisch: "Oxyfern",
      typ: "wild",
      pack: "vanilla",
      icon: "🌿",
      img: "https://oxygennotincluded.wiki.gg/images/Oxyfern.png",
      farbe: "#3a9a4a",
      wachstumszyklen: 0,
      kcalProErnte: 0,
      roherName: "Kein Erntegut – O₂-Produktion",
      inputs: [
        { name: "CO₂",   menge: 100, einheit: "g/Zyklus" },
        { name: "Wasser", menge: 30,  einheit: "kg/Zyklus" }
      ],
      temperatur: { min: -5, max: 35 },
      licht: false, wasser: true,
      beschreibung: "Natürlich wachsend. Wandelt CO₂ und Wasser in Sauerstoff um.",
      tipp: "Passive O₂-Produktion – ideal als Ergänzung zu Elektrolyseur.",
      rezepte: []
    }
  ],

  // ── TIERE & STÄLLE ────────────────────────────────────────
  tiere: [
    // ════════════════════════════════════════════════════════
    // BASISSPIEL
    // ════════════════════════════════════════════════════════
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
        { name: "Schmutzerde, Steine, Kohle, Metallerz", menge: 140, einheit: "kg/Zyklus" }
      ],
      produktion: [
        { name: "Kohle", menge: 140, einheit: "kg/Zyklus", icon: "⚫" }
      ],
      eiinkubation: 3,
      beschreibung: "Frisst fast alles Feste und produziert Kohle.",
      tipp: "Passiver Kohlenachschub – mit Kohlegeneratoren kombinieren.",
      varianten: [
        { name: "Metall-Hatch",  sonderNahrung: "Raffiniertes Metall",  sonderProduktion: "Raffiniertes Metall (75% der Eingangsmasse)" },
        { name: "Stein-Hatch",   sonderNahrung: "Gestein (Granit, Sedimentgestein…)", sonderProduktion: "Kohle" },
        { name: "Salbei-Hatch",  sonderNahrung: "Pflanzenmaterial",     sonderProduktion: "Kohle" }
      ]
    },
    {
      id: "schubwuehlmaus",
      name: "Schubwühlmaus",
      englisch: "Shove Vole",
      pack: "vanilla",
      icon: "🐀",
      img: "https://oxygennotincluded.wiki.gg/images/Shove_Vole.png",
      farbe: "#6a5a4a",
      lebensraum: "Boden",
      maxProStall: 8,
      nahrung: [
        { name: "Eruptivgestein (Granit, Basalt, Regolith…)", menge: 140, einheit: "kg/Zyklus" }
      ],
      produktion: [
        { name: "Schmutzerde", menge: 70, einheit: "kg/Zyklus", icon: "🟫" }
      ],
      eiinkubation: 5,
      beschreibung: "Wandelt Regolith und Gestein in Schmutzerde um.",
      tipp: "Perfekt für Regolith-Verarbeitung auf Asteroiden (Spaced Out!).",
      varianten: [
        { name: "Leckermaus", sonderNahrung: "Spezialfutter", sonderProduktion: "Schmutzerde (mehr)" }
      ]
    },
    {
      id: "blitzblankPuft",
      name: "Blitzblank-Puft",
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
      beschreibung: "Atmet Schmutzigen Sauerstoff, produziert Schleim → Algen.",
      tipp: "Hilft bei PO₂-Überschuss. Schleim → Algendestillieranlage → Sauerstoff.",
      varianten: [
        { name: "Kompakt-Puft",  sonderNahrung: "Sauerstoff",   sonderProduktion: "Oxylite" },
        { name: "Puft-Prinz",    sonderNahrung: "Schmutziger Sauerstoff", sonderProduktion: "Schleim (mehr)" }
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
        { name: "Algen / Fischfutter", menge: 90000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Pacu-Filet", menge: 1, einheit: "alle 20 Zyklen (~4.000 kcal)", icon: "🍣" },
        { name: "Pacu-Ei",    menge: 1, einheit: "alle 20 Zyklen",                icon: "🥚" }
      ],
      eiinkubation: 5,
      beschreibung: "Wassertier – produziert Nahrung (Filet) und Eier.",
      tipp: "Wasser-Loop: Algen-Destillieranlage → Algen → Pacu → Filet.",
      varianten: [
        { name: "Tropischer Pacu", sonderNahrung: "Frisst nichts (selbstversorgend)", sonderProduktion: "Dreckiges Wasser" },
        { name: "Schluckfisch",    sonderNahrung: "Dreckwasser/Algen",                sonderProduktion: "Gereinigtes Wasser" }
      ]
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
      tipp: "Nützlich um PO₂ für Blitzblank-Puft-Ranches zu produzieren.",
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
      lebensraum: "Wasserstoff- oder Chlorgasatmosphäre",
      maxProStall: 8,
      nahrung: [
        { name: "Dornenblüte (Blätter)", menge: 200, einheit: "kg/Zyklus" }
      ],
      produktion: [
        { name: "Phosphorit",       menge: 34, einheit: "kg/Zyklus",        icon: "🟡" },
        { name: "Schilffaser (in H₂)", menge: 1,  einheit: "alle 3 Zyklen", icon: "🧵" }
      ],
      eiinkubation: 5,
      beschreibung: "Produziert Phosphorit. In Wasserstoff auch Schilffaser für Anzüge.",
      tipp: "Drecko in H₂-Atmosphäre = Schilffaser → Schnittiger Anzug.",
      varianten: [
        { name: "Glanz-Drecko", sonderNahrung: "Dornenblüte (Blätter)", sonderProduktion: "Kunststoff-Schilffaser (Kunststoff-Herstellung)" }
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
        { name: "Pflanzt Samen in natürliche Kacheln", menge: 0, einheit: "(automatisch)", icon: "🌱" }
      ],
      eiinkubation: 3,
      beschreibung: "Pflanzt Samen automatisch in geeignete Bodenkacheln.",
      tipp: "Nützlich für automatische Baumfarmen ohne Duplikanten-Arbeit.",
      varianten: [
        { name: "Knuddelpip", sonderNahrung: "Samen", sonderProduktion: "Pflanzt Bäume (Arborbaum)" }
      ]
    },
    {
      id: "leuchtkaefer",
      name: "Leuchtkäfer",
      englisch: "Shine Bug",
      pack: "vanilla",
      icon: "✨",
      img: "https://oxygennotincluded.wiki.gg/images/Shine_Bug.png",
      farbe: "#c8a820",
      lebensraum: "Überall (braucht Licht)",
      maxProStall: 8,
      nahrung: [
        { name: "Phosphorit", menge: 20, einheit: "kg/Zyklus" }
      ],
      produktion: [
        { name: "Licht (Dekor + Photosynthese)", menge: 0, einheit: "passiv", icon: "💡" }
      ],
      eiinkubation: 5,
      beschreibung: "Produziert kein Material – beleuchtet Räume und fördert Dekoration.",
      tipp: "Nützlich für Pflanzenwachstum (z.B. Dornenblüte braucht kein künstliches Licht mehr).",
      varianten: [
        { name: "Azurkäfer",    sonderNahrung: "Phosphorit", sonderProduktion: "Blaues Licht" },
        { name: "Sonnenkäfer",  sonderNahrung: "Phosphorit", sonderProduktion: "Helles Licht (mehr Lux)" }
      ]
    },

    {
      id: "slickster",
      name: "Slickster",
      englisch: "Slickster",
      pack: "vanilla",
      icon: "🫧",
      img: "https://oxygennotincluded.wiki.gg/images/Slickster.png",
      farbe: "#4a6a4a",
      lebensraum: "CO₂-reiche Atmosphäre",
      maxProStall: 8,
      nahrung: [
        { name: "Kohlendioxid (CO₂)", menge: 90000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Rohöl", menge: 33750, einheit: "g/Zyklus", icon: "🛢️" }
      ],
      eiinkubation: 5,
      beschreibung: "Frisst CO₂ und produziert Rohöl – wichtig für Petroleum-Produktion.",
      tipp: "Slickster-Ranch in CO₂-Schicht = passiver Rohöl-Nachschub.",
      varianten: [
        { name: "Öl-Slickster",      sonderNahrung: "CO₂",       sonderProduktion: "Rohöl" },
        { name: "Petroleum-Slickster",sonderNahrung: "Sauerstoff", sonderProduktion: "Petroleum" }
      ]
    },

    // ════════════════════════════════════════════════════════
    // SPACED OUT!
    // ════════════════════════════════════════════════════════
    {
      id: "muh",
      name: "Muh",
      englisch: "Gassy Moo",
      pack: "spacedOut",
      icon: "🐄",
      img: "https://oxygennotincluded.wiki.gg/images/Gassy_Moo.png",
      farbe: "#4a8a5a",
      lebensraum: "Spezielle Gasbiome (eigener Planetoid)",
      maxProStall: 2,
      nahrung: [
        { name: "Gasige Gräser (selbstversorgend auf Planetoid)", menge: 0, einheit: "–" }
      ],
      produktion: [
        { name: "Erdgas", menge: 120000, einheit: "g/Zyklus", icon: "🔥" }
      ],
      eiinkubation: 8,
      beschreibung: "Produziert passiv Erdgas auf speziellen Planetoiden.",
      tipp: "Muh-Planetoid früh erkunden – passive Energie ohne Aufwand.",
      varianten: []
    },
    {
      id: "beeta",
      name: "Beeta",
      englisch: "Beeta",
      pack: "spacedOut",
      icon: "🐝",
      img: "https://oxygennotincluded.wiki.gg/images/Beeta.png",
      farbe: "#c8a020",
      lebensraum: "Radioaktive Biome / Uranerz-Vorkommen",
      maxProStall: 8,
      nahrung: [
        { name: "Uranerz", menge: 140, einheit: "kg/Zyklus" }
      ],
      produktion: [
        { name: "Angereichertes Uran", menge: 70,  einheit: "kg/Zyklus", icon: "☢️" },
        { name: "Atommüll",            menge: 70,  einheit: "kg/Zyklus", icon: "☣️" }
      ],
      eiinkubation: 5,
      beschreibung: "Spaced Out! – wandelt Uranerz in angereichertes Uran um (für Nuklearreaktor).",
      tipp: "Beeta-Ranch unverzichtbar für Uran-Anreicherung im Atomreaktor-Betrieb.",
      varianten: []
    },
    {
      id: "pokepanzer",
      name: "Pokepanzer",
      englisch: "Pokeshell",
      pack: "spacedOut",
      icon: "🦀",
      img: "https://oxygennotincluded.wiki.gg/images/Pokeshell.png",
      farbe: "#8a5a3a",
      lebensraum: "Salz- oder Süßwasser / Boden",
      maxProStall: 8,
      nahrung: [
        { name: "Schalen (Eier anderer Tiere)", menge: 140, einheit: "kg/Zyklus" }
      ],
      produktion: [
        { name: "Schale (Pokepanzer-Schale)", menge: 100, einheit: "kg/Zyklus", icon: "🐚" }
      ],
      eiinkubation: 5,
      beschreibung: "Spaced Out! – produziert Schalen für Baustoffherstellung.",
      tipp: "Pokepanzer-Schale → Keramik-Herstellung.",
      varianten: [
        { name: "Medipanzer",    sonderNahrung: "Eier",    sonderProduktion: "Schale + Heilmittel-Zutat" },
        { name: "Eichenpanzer",  sonderNahrung: "Holz",    sonderProduktion: "Holzkohle" }
      ]
    },
    {
      id: "sweetle",
      name: "Sweetle",
      englisch: "Sweetle",
      pack: "spacedOut",
      icon: "🐛",
      img: "https://oxygennotincluded.wiki.gg/images/Sweetle.png",
      farbe: "#c8609a",
      lebensraum: "Saccharose-reiche Umgebung",
      maxProStall: 8,
      nahrung: [
        { name: "Saccharose", menge: 70000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Nektar", menge: 3000, einheit: "g/Zyklus", icon: "🍯" }
      ],
      eiinkubation: 4,
      beschreibung: "Spaced Out! – wandelt Saccharose in Nektar um.",
      tipp: "Nektar → Phytoöl → Kunststoff-Alternative in Spaced Out!",
      varianten: [
        { name: "Grubgrub", sonderNahrung: "Wühlfrucht", sonderProduktion: "Talg (für Kochen)" }
      ]
    },
    {
      id: "steckschnecke",
      name: "Steckschnecke",
      englisch: "Plug Slug",
      pack: "spacedOut",
      icon: "🐌",
      img: "https://oxygennotincluded.wiki.gg/images/Plug_Slug.png",
      farbe: "#7a7a9a",
      lebensraum: "Elektrische Kabel / Gestein",
      maxProStall: 4,
      nahrung: [
        { name: "Strom (aus Kabeln, die sie bewohnen)", menge: 0, einheit: "–" }
      ],
      produktion: [
        { name: "Strom (gibt Energie weiter)", menge: 0, einheit: "passiv", icon: "⚡" }
      ],
      eiinkubation: 5,
      beschreibung: "Spaced Out! – lebt in Kabeln, leitet Strom über größere Distanzen.",
      tipp: "Ermöglicht Stromverteilung ohne Kabelverbindungen auf verschiedenen Planeten.",
      varianten: [
        { name: "Dunstschnecke",  sonderNahrung: "Strom", sonderProduktion: "Strom + Wärmeabgabe in Gas" },
        { name: "Schwammschnecke",sonderNahrung: "Strom", sonderProduktion: "Strom + Wärmeabgabe in Flüssigkeit" }
      ]
    },

    // ════════════════════════════════════════════════════════
    // FROSTY PLANET PACK
    // ════════════════════════════════════════════════════════
    {
      id: "bammut",
      name: "Bammut",
      englisch: "Bammoth",
      pack: "frostyPlanet",
      icon: "🦣",
      img: "https://oxygennotincluded.wiki.gg/images/Bammoth.png",
      farbe: "#8a9aaa",
      lebensraum: "Kalte Umgebungen (Frost-Planetoid)",
      maxProStall: 4,
      nahrung: [
        { name: "Federnkürbis / Nosh-Bohnen", menge: 140, einheit: "kg/Zyklus" }
      ],
      produktion: [
        { name: "Bammoth-Bratling (Nahrung)", menge: 1,  einheit: "alle 5 Zyklen", icon: "🥩" },
        { name: "Schilffaser",                menge: 30, einheit: "kg/Zyklus",     icon: "🧵" },
        { name: "Fleisch",                    menge: 50, einheit: "kg/Zyklus",     icon: "🍖" }
      ],
      eiinkubation: 6,
      beschreibung: "Frosty Planet Pack – produziert Nahrung, Schilffaser und Fleisch.",
      tipp: "Bammut-Ranch liefert Schilffaser für Anzüge UND Nahrung – sehr effizient!",
      varianten: [
        { name: "Königliches Bammut", sonderNahrung: "Besondere Pflanzen", sonderProduktion: "Mehr Schilffaser + seltene Materialien" }
      ]
    },
    {
      id: "flox",
      name: "Flox",
      englisch: "Flox",
      pack: "frostyPlanet",
      icon: "🦊",
      img: "https://oxygennotincluded.wiki.gg/images/Flox.png",
      farbe: "#cc7a3a",
      lebensraum: "Kalte Wälder / Frostige Biome",
      maxProStall: 8,
      nahrung: [
        { name: "Dornenblüten-Blätter / Eispflanzen", menge: 100, einheit: "kg/Zyklus" }
      ],
      produktion: [
        { name: "Erde",  menge: 50, einheit: "kg/Zyklus", icon: "🟫" },
        { name: "Holz",  menge: 30, einheit: "kg/Zyklus", icon: "🪵" },
        { name: "Glas",  menge: 20, einheit: "kg/Zyklus", icon: "🔷" }
      ],
      eiinkubation: 5,
      beschreibung: "Frosty Planet Pack – produziert Erde, Holz und Glas.",
      tipp: "Passive Glas- und Holzproduktion ohne Verarbeitung.",
      varianten: []
    },
    {
      id: "zapfrobbe",
      name: "Zapfrobbe",
      englisch: "Spigot Seal",
      pack: "frostyPlanet",
      icon: "🦭",
      img: "https://oxygennotincluded.wiki.gg/images/Spigot_Seal.png",
      farbe: "#5a8aaa",
      lebensraum: "Kalte Gewässer / Eis",
      maxProStall: 4,
      nahrung: [
        { name: "Nektar / Saccharose", menge: 70000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Ethanol",             menge: 30000, einheit: "g/Zyklus", icon: "🍶" },
        { name: "Talg",                menge: 10000, einheit: "g/Zyklus", icon: "🧈" }
      ],
      eiinkubation: 6,
      beschreibung: "Frosty Planet Pack – wandelt Nektar in Ethanol und Talg um.",
      tipp: "Ethanol → Treibstoff für Raketen. Talg → Kochen (hohe Kalorien).",
      varianten: []
    },

    // ════════════════════════════════════════════════════════
    // PREHISTORIC PLANET PACK
    // ════════════════════════════════════════════════════════
    {
      id: "dartel",
      name: "Dartel",
      englisch: "Dartle",
      pack: "prehistoricPlanet",
      icon: "🦎",
      img: "https://oxygennotincluded.wiki.gg/images/Dartle.png",
      farbe: "#6a9a5a",
      lebensraum: "Feuchte Biome / Tautropfen-Quellen",
      maxProStall: 8,
      nahrung: [
        { name: "Tautropfen", menge: 50000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Bleichstein", menge: 10000, einheit: "g/Zyklus", icon: "🟡" },
        { name: "Chlor",       menge: 5000,  einheit: "g/Zyklus", icon: "🟢" }
      ],
      eiinkubation: 4,
      beschreibung: "Prehistoric Planet Pack – produziert Bleichstein und Chlor.",
      tipp: "Bleichstein → Desinfektionsmittel und Oxylith-Herstellung.",
      varianten: []
    },
    {
      id: "jawbo",
      name: "Jawbo",
      englisch: "Jawbo",
      pack: "prehistoricPlanet",
      icon: "🐊",
      img: "https://oxygennotincluded.wiki.gg/images/Jawbo.png",
      farbe: "#4a7a5a",
      lebensraum: "Gewässer / Pacu-reiche Zonen",
      maxProStall: 4,
      nahrung: [
        { name: "Pacu / Pacu-Filet", menge: 50000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Rost", menge: 60000, einheit: "g/Zyklus", icon: "🟤" }
      ],
      eiinkubation: 6,
      beschreibung: "Prehistoric Planet Pack – frisst Fisch, produziert Rost.",
      tipp: "Rost → Sauerstoffdiffusor (O₂-Produktion ohne Strom).",
      varianten: []
    },
    {
      id: "lumba",
      name: "Lumba",
      englisch: "Lumb",
      pack: "prehistoricPlanet",
      icon: "🦕",
      img: "https://oxygennotincluded.wiki.gg/images/Lumb.png",
      farbe: "#7a9a5a",
      lebensraum: "Sumpfbiome / große offene Räume (2×2 Kacheln)",
      maxProStall: 4,
      nahrung: [
        { name: "Ovagro-Feige / Dornenbeere / Sumpf-Gelee", menge: 200, einheit: "kg/Zyklus" }
      ],
      produktion: [
        { name: "Torf",   menge: 100, einheit: "kg/Zyklus", icon: "🟫" },
        { name: "Algen",  menge: 50,  einheit: "kg/Zyklus", icon: "🟢" },
        { name: "Fleisch", menge: 50, einheit: "kg/Zyklus", icon: "🍖" }
      ],
      eiinkubation: 8,
      beschreibung: "Prehistoric Planet Pack – großes 2×2-Tier, produziert Torf und Algen.",
      tipp: "Lumba-Ranch liefert Algen für Pacu-Fütterung – guter Kreislauf!",
      varianten: [
        { name: "Blum (Lumba-Variante)", sonderNahrung: "Pflanzen", sonderProduktion: "Mehr Algen" }
      ]
    },
    {
      id: "mimika",
      name: "Mimika",
      englisch: "Mimika",
      pack: "prehistoricPlanet",
      icon: "🌸",
      img: "https://oxygennotincluded.wiki.gg/images/Mimika.png",
      farbe: "#c890c0",
      lebensraum: "Blütenreiche Biome",
      maxProStall: 8,
      nahrung: [
        { name: "Bestäubt Pflanzen (braucht keine direkte Nahrung)", menge: 0, einheit: "–" }
      ],
      produktion: [
        { name: "Mimika-Knospe (Sonderpflanzen-Samen)", menge: 1, einheit: "alle 10 Zyklen", icon: "🌺" }
      ],
      eiinkubation: 5,
      beschreibung: "Prehistoric Planet Pack – bestäubt Pflanzen und produziert seltene Knospen.",
      tipp: "Mimika erhöht den Ernte-Ertrag umliegender Pflanzen durch Bestäubung.",
      varianten: []
    },
    {
      id: "rhex",
      name: "Rhex",
      englisch: "Rhex",
      pack: "prehistoricPlanet",
      icon: "🦖",
      img: "https://oxygennotincluded.wiki.gg/images/Rhex.png",
      farbe: "#8a4a3a",
      lebensraum: "Weite Areale (frisst andere Kreaturen)",
      maxProStall: 2,
      nahrung: [
        { name: "Dartel / Pips / Hatch (andere Kreaturen)", menge: 1, einheit: "Kreatur/Zyklus" }
      ],
      produktion: [
        { name: "Brauseis",   menge: 50, einheit: "kg/Zyklus", icon: "🧊" },
        { name: "Federfaser", menge: 20, einheit: "kg/Zyklus", icon: "🪶" },
        { name: "Zähes Fleisch", menge: 30, einheit: "kg/Zyklus", icon: "🥩" }
      ],
      eiinkubation: 10,
      beschreibung: "Prehistoric Planet Pack – Raubtier, das andere Kreaturen frisst.",
      tipp: "Rhex-Ranch braucht eine Kreatur-Zucht (z.B. Dartel) als Futterquelle.",
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
  materialien: [
    {
      kategorie: "Rohmetalle (Erze) – Basisspiel",
      pack: "vanilla",
      eintraege: [
        { name: "Kupfererz",    englisch: "Copper Ore",   icon: "🟠", wärmeleitfähigkeit: 4.5,   schmelzpunkt: 1985, strom: false, dichte: 1500 },
        { name: "Eisenerz",     englisch: "Iron Ore",     icon: "🟤", wärmeleitfähigkeit: 4.0,   schmelzpunkt: 1538, strom: false, dichte: 1500 },
        { name: "Goldalmagam",  englisch: "Gold Amalgam", icon: "🟡", wärmeleitfähigkeit: 100.0, schmelzpunkt: 801,  strom: false, dichte: 2500 },
        { name: "Wolframit",    englisch: "Wolframite",   icon: "⬛", wärmeleitfähigkeit: 60.0,  schmelzpunkt: 3422, strom: false, dichte: 7500 },
        { name: "Aluminiumit",  englisch: "Aluminium Ore",icon: "⬜", wärmeleitfähigkeit: 5.0,   schmelzpunkt: 659,  strom: false, dichte: 2700 }
      ]
    },
    {
      kategorie: "Raffinierte Metalle – Basisspiel",
      pack: "vanilla",
      eintraege: [
        { name: "Kupfer",    englisch: "Copper",    icon: "🔶", wärmeleitfähigkeit: 9.2,   schmelzpunkt: 1985, strom: true, dichte: 1500 },
        { name: "Eisen",     englisch: "Iron",      icon: "⬜", wärmeleitfähigkeit: 14.0,  schmelzpunkt: 1538, strom: true, dichte: 1500 },
        { name: "Gold",      englisch: "Gold",      icon: "🟨", wärmeleitfähigkeit: 197.0, schmelzpunkt: 1063, strom: true, dichte: 2500 },
        { name: "Stahl",     englisch: "Steel",     icon: "🔩", wärmeleitfähigkeit: 54.0,  schmelzpunkt: 2427, strom: true, dichte: 7800 },
        { name: "Thermium",  englisch: "Thermium",  icon: "🔴", wärmeleitfähigkeit: 200.0, schmelzpunkt: 2977, strom: true, dichte: 5000 },
        { name: "Niobium",   englisch: "Niobium",   icon: "🔵", wärmeleitfähigkeit: 54.0,  schmelzpunkt: 2477, strom: true, dichte: 6000 },
        { name: "Aluminium", englisch: "Aluminium", icon: "⬜", wärmeleitfähigkeit: 205.0, schmelzpunkt: 659,  strom: true, dichte: 2700 }
      ]
    },
    {
      kategorie: "Steine & Gestein – Basisspiel",
      pack: "vanilla",
      eintraege: [
        { name: "Sedimentgestein", englisch: "Sedimentary Rock", icon: "⬜", wärmeleitfähigkeit: 2.0,  schmelzpunkt: 1530, strom: false, dichte: 2500 },
        { name: "Granit",          englisch: "Granite",          icon: "🪨", wärmeleitfähigkeit: 3.39, schmelzpunkt: 1198, strom: false, dichte: 2700 },
        { name: "Sandstein",       englisch: "Sandstone",        icon: "🟫", wärmeleitfähigkeit: 3.0,  schmelzpunkt: 1603, strom: false, dichte: 1600 },
        { name: "Obsidian",        englisch: "Obsidian",         icon: "⬛", wärmeleitfähigkeit: 2.0,  schmelzpunkt: 1420, strom: false, dichte: 2650 },
        { name: "Ablativgestein",  englisch: "Igneous Rock",     icon: "🔺", wärmeleitfähigkeit: 2.0,  schmelzpunkt: 1410, strom: false, dichte: 2400 },
        { name: "Mafin",           englisch: "Mafic Rock",       icon: "⬛", wärmeleitfähigkeit: 2.0,  schmelzpunkt: 1450, strom: false, dichte: 2900 }
      ]
    },
    {
      kategorie: "Baustoffe – Basisspiel",
      pack: "vanilla",
      eintraege: [
        { name: "Kunststoff", englisch: "Plastic",   icon: "🟦", wärmeleitfähigkeit: 0.170, schmelzpunkt: 160,  strom: false, dichte: 900  },
        { name: "Glas",       englisch: "Glass",     icon: "🔷", wärmeleitfähigkeit: 1.0,   schmelzpunkt: 1600, strom: false, dichte: 2500 },
        { name: "Keramik",    englisch: "Ceramic",   icon: "⬜", wärmeleitfähigkeit: 1.57,  schmelzpunkt: 1650, strom: false, dichte: 2000 },
        { name: "Diamant",    englisch: "Diamond",   icon: "💎", wärmeleitfähigkeit: 700.0, schmelzpunkt: 3600, strom: false, dichte: 3510 },
        { name: "Kohlenstoff",englisch: "Carbon",    icon: "⚫", wärmeleitfähigkeit: 2.0,   schmelzpunkt: 3600, strom: false, dichte: 2260 }
      ]
    },
    {
      kategorie: "Gase – Basisspiel",
      pack: "vanilla",
      eintraege: [
        { name: "Sauerstoff",             englisch: "Oxygen",          icon: "💨", wärmeleitfähigkeit: 0.024,  schmelzpunkt: -183, strom: false, dichte: 1 },
        { name: "Schmutziger Sauerstoff", englisch: "Polluted Oxygen", icon: "💚", wärmeleitfähigkeit: 0.024,  schmelzpunkt: -183, strom: false, dichte: 1 },
        { name: "CO₂",                   englisch: "Carbon Dioxide",  icon: "☁️", wärmeleitfähigkeit: 0.015,  schmelzpunkt: -78,  strom: false, dichte: 1 },
        { name: "Wasserstoff",            englisch: "Hydrogen",        icon: "🔵", wärmeleitfähigkeit: 0.168,  schmelzpunkt: -259, strom: false, dichte: 1 },
        { name: "Erdgas",                 englisch: "Natural Gas",     icon: "🔥", wärmeleitfähigkeit: 0.035,  schmelzpunkt: -182, strom: false, dichte: 1 },
        { name: "Chlor",                  englisch: "Chlorine",        icon: "🟢", wärmeleitfähigkeit: 0.0084, schmelzpunkt: -101, strom: false, dichte: 1 }
      ]
    },
    {
      kategorie: "Flüssigkeiten – Basisspiel",
      pack: "vanilla",
      eintraege: [
        { name: "Wasser",        englisch: "Water",          icon: "💧", wärmeleitfähigkeit: 0.609, schmelzpunkt: 0,   strom: false, dichte: 1000 },
        { name: "Schmutzwasser", englisch: "Polluted Water", icon: "🪣", wärmeleitfähigkeit: 0.580, schmelzpunkt: -20, strom: false, dichte: 1010 },
        { name: "Erdöl",         englisch: "Crude Oil",      icon: "🛢️", wärmeleitfähigkeit: 0.150, schmelzpunkt: -40, strom: false, dichte: 850  },
        { name: "Petroleum",     englisch: "Petroleum",      icon: "⛽", wärmeleitfähigkeit: 0.149, schmelzpunkt: -50, strom: false, dichte: 750  },
        { name: "Salzwasser",    englisch: "Salt Water",     icon: "🌊", wärmeleitfähigkeit: 0.609, schmelzpunkt: -10, strom: false, dichte: 1030 },
        { name: "Flüssiger O₂",  englisch: "Liquid Oxygen",  icon: "🧊", wärmeleitfähigkeit: 1.010, schmelzpunkt: -183,strom: false, dichte: 1141 }
      ]
    },
    {
      kategorie: "Neue Materialien – Spaced Out!",
      pack: "spacedOut",
      eintraege: [
        { name: "Regolith",     englisch: "Regolith",      icon: "🟫", wärmeleitfähigkeit: 0.02,  schmelzpunkt: 1410, strom: false, dichte: 1500 },
        { name: "Schwefel",     englisch: "Sulfur",        icon: "🟡", wärmeleitfähigkeit: 0.2,   schmelzpunkt: 115,  strom: false, dichte: 2000 },
        { name: "Sole",         englisch: "Brine",         icon: "💧", wärmeleitfähigkeit: 0.609, schmelzpunkt: -22,  strom: false, dichte: 1100 },
        { name: "Propangas",    englisch: "Propane",       icon: "🔥", wärmeleitfähigkeit: 0.020, schmelzpunkt: -188, strom: false, dichte: 1 },
        { name: "Synthesegas",  englisch: "Synthesis Gas", icon: "💨", wärmeleitfähigkeit: 0.029, schmelzpunkt: -200, strom: false, dichte: 1 },
        { name: "Phytoöl",      englisch: "Phyto Oil",     icon: "🌿", wärmeleitfähigkeit: 0.150, schmelzpunkt: -50,  strom: false, dichte: 800  },
        { name: "Saccharose",   englisch: "Sucrose",       icon: "🍬", wärmeleitfähigkeit: 0.5,   schmelzpunkt: 186,  strom: false, dichte: 1000 },
        { name: "Holz",         englisch: "Wood",          icon: "🪵", wärmeleitfähigkeit: 0.12,  schmelzpunkt: 400,  strom: false, dichte: 600  },
        { name: "Sperrholz",    englisch: "Plywood",       icon: "📦", wärmeleitfähigkeit: 0.12,  schmelzpunkt: 400,  strom: false, dichte: 600  }
      ]
    },
    {
      kategorie: "Neue Materialien – Frosty Planet Pack",
      pack: "frostyPlanet",
      eintraege: [
        { name: "Schnee",               englisch: "Snow",             icon: "❄️", wärmeleitfähigkeit: 0.5,  schmelzpunkt: 0,   strom: false, dichte: 400  },
        { name: "Bernstein",            englisch: "Amber",            icon: "🟠", wärmeleitfähigkeit: 1.0,  schmelzpunkt: 300, strom: false, dichte: 1050 },
        { name: "Gefrorenes Phytoöl",   englisch: "Frozen Phyto Oil", icon: "🧊", wärmeleitfähigkeit: 0.5,  schmelzpunkt: -50, strom: false, dichte: 900  },
        { name: "Verschmutzte Erde",    englisch: "Toxic Sand",       icon: "🟫", wärmeleitfähigkeit: 0.9,  schmelzpunkt: 800, strom: false, dichte: 1600 }
      ]
    }
  ],

  // ── KOCHGERÄTE ────────────────────────────────────────────
  geraete: [
    { name: "Einfacher Grill",  englisch: "Microbe Musher",  strom: 240, einheit: "W",               icon: "🥣" },
    { name: "Elektroherd",      englisch: "Electric Grill",  strom: 240, einheit: "W",               icon: "🍳" },
    { name: "Gasherd",          englisch: "Gas Range",       strom: 0,   einheit: "(Erdgas: 100g/s)", icon: "🔥" }
  ],

  // ── STROM ─────────────────────────────────────────────────
  strom: {
    generatoren: [
      { id: "hamsterrad",    name: "Hamsterrad",           watt: 400,  pack: "vanilla",   brennstoff: "–" },
      { id: "kohlegenerator",name: "Kohlegenerator",       watt: 600,  pack: "vanilla",   brennstoff: "Kohle: 1.000g/s" },
      { id: "gasgenerator",  name: "Naturgasgenerator",    watt: 800,  pack: "vanilla",   brennstoff: "Erdgas: 90g/s" },
      { id: "wasserstoffgen",name: "Wasserstoffgenerator", watt: 800,  pack: "vanilla",   brennstoff: "Wasserstoff: 100g/s" },
      { id: "petroleumgen",  name: "Petroleumgenerator",   watt: 2000, pack: "vanilla",   brennstoff: "Petroleum: 2.000g/s" },
      { id: "dampfturbine",  name: "Dampfturbine",         watt: 850,  pack: "vanilla",   brennstoff: "Dampf: 2kg/s" },
      { id: "solarpanel",    name: "Solarpanel",           watt: 380,  pack: "vanilla",   brennstoff: "Sonnenlicht" },
      { id: "kernreaktor",   name: "Kernkraftreaktor",     watt: 4000, pack: "spacedOut", brennstoff: "Angereichertes Uran" }
    ],
    verbraucher: [
      // ── Sauerstoff ──────────────────────────────────────────────────────
      // dauerverbraucher: true = läuft konstant; false = nur bei Bedarf/manuell
      { id: "algenentluefter",     name: "Algenentlüfter",          watt: 120,  kategorie: "Sauerstoff",   pack: "vanilla",   dauerverbraucher: true  },
      { id: "elektrolyseur",       name: "Elektrolyseur",           watt: 120,  kategorie: "Sauerstoff",   pack: "vanilla",   dauerverbraucher: true  },
      { id: "oxylgenerator",       name: "OXYL-Generator",          watt: 120,  kategorie: "Sauerstoff",   pack: "vanilla",   dauerverbraucher: true  },
      // ── Kühlung ─────────────────────────────────────────────────────────
      { id: "aquatuner",           name: "Aquatuner",               watt: 1200, kategorie: "Kühlung",      pack: "vanilla",   dauerverbraucher: false },
      { id: "thermoregler",        name: "Thermoregler",            watt: 120,  kategorie: "Kühlung",      pack: "vanilla",   dauerverbraucher: false },
      // ── Nahrung ─────────────────────────────────────────────────────────
      { id: "einfacher_grill",     name: "Einfacher Grill",         watt: 240,  kategorie: "Nahrung",      pack: "vanilla",   dauerverbraucher: false },
      { id: "elektroherd",         name: "Elektroherd",             watt: 240,  kategorie: "Nahrung",      pack: "vanilla",   dauerverbraucher: false },
      { id: "gasherd",             name: "Gasherd",                 watt: 0,    kategorie: "Nahrung",      pack: "vanilla",   dauerverbraucher: false },
      { id: "lebensmittelkuehler", name: "Lebensmittelkühler",      watt: 120,  kategorie: "Nahrung",      pack: "vanilla",   dauerverbraucher: true  },
      // ── Pumpen ──────────────────────────────────────────────────────────
      { id: "gaspumpe",            name: "Gaspumpe",                watt: 240,  kategorie: "Pumpen",       pack: "vanilla",   dauerverbraucher: false },
      { id: "fluessigkeitspumpe",  name: "Flüssigkeitspumpe",       watt: 240,  kategorie: "Pumpen",       pack: "vanilla",   dauerverbraucher: false },
      { id: "minigaspumpe",        name: "Mini-Gaspumpe",           watt: 120,  kategorie: "Pumpen",       pack: "vanilla",   dauerverbraucher: false },
      { id: "minifluessigpumpe",   name: "Mini-Flüssigkeitspumpe",  watt: 120,  kategorie: "Pumpen",       pack: "vanilla",   dauerverbraucher: false },
      // ── Produktion ──────────────────────────────────────────────────────
      { id: "metallraffinerie",    name: "Metallraffinerie",        watt: 1200, kategorie: "Produktion",   pack: "vanilla",   dauerverbraucher: false },
      { id: "glasofen",            name: "Glasofen",                watt: 1200, kategorie: "Produktion",   pack: "vanilla",   dauerverbraucher: false },
      { id: "steinbrecher",        name: "Steinbrecher",            watt: 480,  kategorie: "Produktion",   pack: "vanilla",   dauerverbraucher: false },
      { id: "polymerpresse",       name: "Polymerpresse",           watt: 480,  kategorie: "Produktion",   pack: "vanilla",   dauerverbraucher: false },
      { id: "anzugfabrik",         name: "Anzugfabrik",             watt: 480,  kategorie: "Produktion",   pack: "vanilla",   dauerverbraucher: false },
      { id: "schreinerei",         name: "Schreinerei",             watt: 120,  kategorie: "Produktion",   pack: "vanilla",   dauerverbraucher: false },
      { id: "kleidungsschneiderei",name: "Kleidungsschneiderei",    watt: 480,  kategorie: "Produktion",   pack: "vanilla",   dauerverbraucher: false },
      { id: "betonmischer",        name: "Betonmischer",            watt: 120,  kategorie: "Produktion",   pack: "vanilla",   dauerverbraucher: false },
      // ── Forschung ───────────────────────────────────────────────────────
      { id: "forschungsstation",   name: "Forschungsstation",       watt: 100,  kategorie: "Forschung",    pack: "vanilla",   dauerverbraucher: false },
      { id: "supercomputer",       name: "Supercomputer",           watt: 200,  kategorie: "Forschung",    pack: "vanilla",   dauerverbraucher: false },
      { id: "raumfahrtforschung",  name: "Raumfahrt-Forschungsstation", watt: 200, kategorie: "Forschung", pack: "vanilla",   dauerverbraucher: false },
      // ── Sanitär ─────────────────────────────────────────────────────────
      { id: "wasserreiniger",      name: "Wasserreiniger",          watt: 120,  kategorie: "Sanitär",      pack: "vanilla",   dauerverbraucher: true  },
      { id: "destillieranlage",    name: "Destillieranlage",        watt: 480,  kategorie: "Sanitär",      pack: "vanilla",   dauerverbraucher: false },
      { id: "desinfektion",        name: "Desinfektionsschleuse",   watt: 100,  kategorie: "Sanitär",      pack: "vanilla",   dauerverbraucher: false },
      // ── Beleuchtung ─────────────────────────────────────────────────────
      { id: "deckenlampe",         name: "Deckenlampe",             watt: 10,   kategorie: "Beleuchtung",  pack: "vanilla",   dauerverbraucher: true  },
      { id: "flutlicht",           name: "Flutlicht",               watt: 50,   kategorie: "Beleuchtung",  pack: "vanilla",   dauerverbraucher: true  },
      { id: "tischlampe",          name: "Tischlampe",              watt: 10,   kategorie: "Beleuchtung",  pack: "vanilla",   dauerverbraucher: true  },
      // ── Tierhaltung ─────────────────────────────────────────────────────
      { id: "pflegestation",       name: "Pflegestation",           watt: 120,  kategorie: "Tierhaltung",  pack: "vanilla",   dauerverbraucher: false },
      { id: "inkubator",           name: "Inkubator",               watt: 120,  kategorie: "Tierhaltung",  pack: "vanilla",   dauerverbraucher: true  },
      { id: "viehstation",         name: "Viehstation",             watt: 120,  kategorie: "Tierhaltung",  pack: "vanilla",   dauerverbraucher: false },
      // ── Komfort & Dekoration ────────────────────────────────────────────
      { id: "sauna",               name: "Sauna",                   watt: 120,  kategorie: "Komfort",      pack: "vanilla",   dauerverbraucher: false },
      { id: "massagekoje",         name: "Massagekoje",             watt: 60,   kategorie: "Komfort",      pack: "vanilla",   dauerverbraucher: false },
      { id: "oelraffinerie",       name: "Ölraffinerie",            watt: 480,  kategorie: "Energie",      pack: "vanilla",   dauerverbraucher: false },
      // ── Spaced Out! ─────────────────────────────────────────────────────
      { id: "interplanetarrakete", name: "Interplanetarraketen-Pad", watt: 480, kategorie: "Raumfahrt",    pack: "spacedOut", dauerverbraucher: false },
      { id: "atomreaktor_kuehlung",name: "Reaktorkühlpumpe",        watt: 480,  kategorie: "Raumfahrt",    pack: "spacedOut", dauerverbraucher: true  }
    ]
  }
};

// ── HILFSFUNKTIONEN ───────────────────────────────────────
function getPflanzeById(id)      { return ONI.pflanzen.find(p => p.id === id); }
function getTierById(id)         { return ONI.tiere.find(t => t.id === id); }
function kcalProZyklus(p)        { return p.kcalProErnte / p.wachstumszyklen; }
function pflanzenFuerDupes(p, n) {
  return Math.ceil((n * ONI.duplikantBedarf.kalorien.wert) / kcalProZyklus(p));
}
