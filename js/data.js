// ============================================================
// ONI KALKULATOR – Spieldaten v2.0
// Quelle: Ni42/Oxygen_Not_Included_German (offizielle Community-Übersetzung)
//         ONI Wiki (oxygennotincluded.wiki.gg), Klei Entertainment
// Bilder: © Klei Entertainment – verlinkt vom ONI Wiki
// 1 Zyklus = 600 Sekunden | Wachstum: Heim = in Pflanztrog, Wild = Naturboden
// ============================================================

const BASE_IMG = "img/game/";  // Original-Spielgrafiken, lokal (Quelle: oxygennotincluded.wiki.gg)

const ONI = {

  // ── DLC PACKS ─────────────────────────────────────────────
  packs: [
    { id: "vanilla",           name: "Basisspiel",              icon: "🌍" },
    { id: "spacedOut",         name: "Spaced Out!",             icon: "🚀" },
    { id: "frostyPlanet",      name: "Frosty Planet Pack",      icon: "❄️" },
    { id: "bionicBooster",     name: "Bionic Booster Pack",     icon: "🦾" },
    { id: "prehistoricPlanet", name: "Prehistoric Planet Pack", icon: "🦕" },
    { id: "aquaticPlanet",     name: "Aquatic Planet Pack",     icon: "🌊" }
  ],

  // ── DUPLIKANT GRUNDBEDARF (pro Zyklus = 600 Sekunden) ─────
  // Quelle: oxygennotincluded.wiki.gg – Standard-Schwierigkeit.
  // Kalorien 1.000 kcal/Zyklus (nicht 2.000!), CO₂ 2 g/s = 1,2 kg/Zyklus.
  // Toilette (Lavatory): 5 kg Wasser rein, 11,7 kg verschmutzt raus pro Nutzung (~1×/Zyklus).
  duplikantBedarf: {
    kalorien:          { wert: 1000,  einheit: "kcal", icon: "🍽️", name: "Kalorien" },
    sauerstoff:        { wert: 60000, einheit: "g",    icon: "💨", name: "Sauerstoff (verbraucht)" },
    co2Produktion:     { wert: 1200,  einheit: "g",    icon: "☁️", name: "CO₂ (produziert)" },
    wasserToilette:    { wert: 5000,  einheit: "g",    icon: "💧", name: "Wasser (Toilette)" },
    schmutzwasser:     { wert: 11700, einheit: "g",    icon: "🪣", name: "Verschmutztes Wasser (produziert)" },
    wasserWaschbecken: { wert: 5000,  einheit: "g",    icon: "🚿", name: "Wasser (Waschbecken)" }
  },

  // ── PFLANZEN ──────────────────────────────────────────────
  // typ: "nahrung" | "ressource" | "wild-einmalig" | "dekor"
  // wachstumszyklen    = Heimanbau (Pflanztrog, von Duplikant)
  // wachstumszyklenwild = Natürliches Wachstum (Bodenpflanzung / Wildnis)
  pflanzen: [

    // ═══════════════════════════════════════════════════
    // BASISSPIEL – Nahrungspflanzen
    // ═══════════════════════════════════════════════════
    {
      id: "mehlholz",
      name: "Mehlholz",
      englisch: "Mealwood",
      typ: "nahrung",
      pack: "vanilla",
      icon: "🌿",
      img: BASE_IMG + "Mealwood.png",
      wachstumszyklen: 3,
      wachstumszyklenwild: 12,
      kcalProErnte: 600,
      ernteMenge: "1× Mehllaus (600 kcal)",
      inputs: [
        { name: "Schmutzerde (Dünger)", menge: 10, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Sauerstoff, Schmutziger Sauerstoff oder CO₂",
      temperatur: { min: 10, max: 30 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Einfachste und schnellste Nahrungspflanze. Schlechte Nahrungsqualität (-1), aber kein Wasser nötig.",
      tipp: "Ideal für den Spielstart. Wild: 12 Zyklen. Im Pflanztrog: nur 3 Zyklen. Verarbeitung zu Läusebrot (+Wasser) für bessere Qualität.",
      rezepte: [
        { name: "Läusebrot", kcal: 1700, geraet: "Mikrobenmatscher", zutaten: ["1.200 kcal Mehllaus", "50 kg Wasser"] }
      ]
    },
    {
      id: "dornenblüte",
      name: "Dornenblüte",
      englisch: "Bristle Blossom",
      typ: "nahrung",
      pack: "vanilla",
      icon: "🌸",
      img: BASE_IMG + "Bristle_Blossom.png",
      wachstumszyklen: 6,
      wachstumszyklenwild: 24,
      kcalProErnte: 1600,
      ernteMenge: "1 kg Dornenbeere (1.600 kcal)",
      inputs: [
        { name: "Wasser", menge: 20, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Sauerstoff, Schmutziger Sauerstoff oder CO₂",
      temperatur: { min: 5, max: 30 },
      licht: true,
      dunkelheit: false,
      beschreibung: "Braucht mind. 200 Lux Licht und Wasser. Mittlere Nahrungsqualität (0).",
      tipp: "Benötigt Beleuchtung! Deckenlampe oder Hakenlicht über den Pflanztrögen planen. Wild: 24 Zyklen.",
      rezepte: [
        { name: "Knorpelbeere (gegrillt)", kcal: 2000, geraet: "Elektrogrill", zutaten: ["1 kg Dornenbeere"] },
        { name: "Beerenmatsch", kcal: 4000, geraet: "Mikrobenmatscher", zutaten: ["5 Graupelweizenkörner", "1.600 kcal Dornenbeere"] },
        { name: "Gefüllte Beere", kcal: 4400, geraet: "Gasherd", zutaten: ["2 kg Knorpelbeere", "2 kg Pinchapfeffer-Nuss"] }
      ]
    },
    {
      id: "daemmerkappe",
      name: "Dämmerkappe",
      englisch: "Dusk Cap",
      typ: "nahrung",
      pack: "vanilla",
      icon: "🍄",
      img: BASE_IMG + "Dusk_Cap.png",
      wachstumszyklen: 8,
      wachstumszyklenwild: 30,
      kcalProErnte: 2400,
      ernteMenge: "1 kg Pilz (2.400 kcal)",
      inputs: [
        { name: "Schleim", menge: 4, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Nur CO₂ (0,15–10 kg/m³)",
      temperatur: { min: 5, max: 35 },
      licht: false,
      dunkelheit: true,
      beschreibung: "Braucht CO₂-Atmosphäre und absolute Dunkelheit. Mittlere Qualität (0).",
      tipp: "Perfekt für CO₂-Verarbeitung. Schleim kommt von Pufts. Licht ausschalten! Wild: 30 Zyklen.",
      rezepte: [
        { name: "Frittierter Pilz", kcal: 2800, geraet: "Elektrogrill", zutaten: ["1 kg Pilz"] },
        { name: "Pilzwrap", kcal: 4800, geraet: "Gasherd", zutaten: ["1 kg Frittierter Pilz", "4 kg Salat"] },
        { name: "Pilzquiche", kcal: 6400, geraet: "Gasherd", zutaten: ["1 kg Omelett", "1 kg Salat", "1 kg Frittierter Pilz"] }
      ]
    },
    {
      id: "graupelweizen",
      name: "Graupelweizen",
      englisch: "Sleet Wheat",
      typ: "nahrung",
      pack: "vanilla",
      icon: "🌾",
      img: BASE_IMG + "Sleet_Wheat.png",
      wachstumszyklen: 18,
      wachstumszyklenwild: 72,
      kcalProErnte: 0,
      ernteMenge: "18 Graupelweizenkörner (roh nicht essbar)",
      inputs: [
        { name: "Wasser", menge: 20, einheit: "kg/Zyklus" },
        { name: "Schmutzerde", menge: 5, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Sauerstoff, Schmutziger Sauerstoff oder CO₂",
      temperatur: { min: -55, max: 5 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Kältepflanze! Körner sind roh nicht essbar, werden zu Frostbrötchen oder anderen Rezepten verarbeitet.",
      tipp: "Braucht Kältebereich (<5°C). Körner sind vielseitig einsetzbar in Rezepten. Wild: 72 Zyklen.",
      rezepte: [
        { name: "Frostbrötchen", kcal: 1200, geraet: "Elektrogrill", zutaten: ["3 Graupelweizenkörner"] },
        { name: "Pfefferbrot", kcal: 4000, geraet: "Gasherd", zutaten: ["10 Körner", "1 kg Pinchapfeffer-Nuss"] },
        { name: "Soufflé Pfannkuchen", kcal: 3600, geraet: "Elektrogrill", zutaten: ["1 kg Rohes Ei", "2 Graupelweizenkörner"] }
      ]
    },
    {
      id: "pinchapfeffer",
      name: "Pinchapfeffer-Pflanze",
      englisch: "Pincha Pepperplant",
      typ: "nahrung",
      pack: "vanilla",
      icon: "🌶️",
      img: BASE_IMG + "Pincha_Pepperplant.png",
      wachstumszyklen: 8,
      wachstumszyklenwild: 32,
      kcalProErnte: 0,
      ernteMenge: "Pinchapfeffer-Nuss (0 kcal, nur Zutat)",
      inputs: [
        { name: "Verschmutztes Wasser", menge: 35, einheit: "kg/Zyklus" },
        { name: "Phosphorit", menge: 1, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Beliebig",
      temperatur: { min: 35, max: 85 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Heiße Pflanze. Nuss hat 0 kcal, wird nur als Gewürz in Rezepten verwendet.",
      tipp: "Braucht warmen Bereich (35–85°C) und Phosphorit + Schmutzwasser. Die Nuss wertet viele Gerichte auf.",
      rezepte: [
        { name: "Pfefferbrot", kcal: 4000, geraet: "Gasherd", zutaten: ["10 Körner", "1 kg Pinchapfeffer-Nuss"] },
        { name: "Gefüllte Beere", kcal: 4400, geraet: "Gasherd", zutaten: ["2 kg Knorpelbeere", "2 kg Pinchapfeffer-Nuss"] },
        { name: "Pikanter Tofu", kcal: 4000, geraet: "Gasherd", zutaten: ["1 kg Tofu", "1 kg Pinchapfeffer-Nuss"] }
      ]
    },
    {
      id: "wasserkraut",
      name: "Wasserkraut",
      englisch: "Waterweed",
      typ: "nahrung",
      pack: "vanilla",
      icon: "🥬",
      img: BASE_IMG + "Waterweed.png",
      wachstumszyklen: 12,
      wachstumszyklenwild: 48,
      kcalProErnte: 4800,
      ernteMenge: "12 kg Salat (4.800 kcal gesamt)",
      inputs: [
        { name: "Salzwasser", menge: 5, einheit: "kg/Zyklus" },
        { name: "Bleichstein", menge: 0.5, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Untergetaucht (Wasser, Salzwasser oder Sole)",
      temperatur: { min: 22, max: 65 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Wächst untergetaucht in Wasser/Salzwasser. Hoher Kalorienertrag. Qualität 0.",
      tipp: "~400 kcal/Zyklus/Pflanze. Braucht partiell untergetauchten Pflanztrog. Salat ist Zutat für viele High-End-Gerichte.",
      rezepte: [
        { name: "Pilzwrap", kcal: 4800, geraet: "Gasherd", zutaten: ["1 kg Frittierter Pilz", "4 kg Salat"] },
        { name: "Pilzquiche", kcal: 6400, geraet: "Gasherd", zutaten: ["1 Omelett", "1 kg Salat", "1 Frittierter Pilz"] },
        { name: "Frostburger", kcal: 6000, geraet: "Gasherd", zutaten: ["1 Frostbrötchen", "1 kg Salat", "1 kg Barbeque"] }
      ]
    },
    {
      id: "happspross",
      name: "Happspross",
      englisch: "Nosh Sprout",
      typ: "nahrung",
      pack: "vanilla",
      icon: "🫘",
      img: BASE_IMG + "Nosh_Sprout.png",
      wachstumszyklen: 21,
      wachstumszyklenwild: 84,
      kcalProErnte: 0,
      ernteMenge: "12 Happsbohnen (roh nicht essbar, Qualität 3 nach Verarbeitung)",
      inputs: [
        { name: "Ethanol", menge: 20, einheit: "kg/Zyklus" },
        { name: "Schmutzerde", menge: 5, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "CO₂ (0,03–10 kg/m³)",
      temperatur: { min: -25, max: 0 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Kältepflanze! Braucht CO₂ und Ethanol. Bohnen verarbeiten für hohe Qualitätsstufe.",
      tipp: "12 Bohnen / 21 Zyklen. Ethanol aus Ethanol-Destillieranlage. Wild: 84 Zyklen.",
      rezepte: [
        { name: "Tofu", kcal: 3600, geraet: "Mikrobenmatscher", zutaten: ["6 Happsbohnen", "50 kg Wasser"] },
        { name: "Currybohnen", kcal: 5000, geraet: "Gasherd", zutaten: ["4 Tonic Root", "4 Happsbohnen"] },
        { name: "Pikanter Tofu", kcal: 4000, geraet: "Gasherd", zutaten: ["1 kg Tofu", "1 kg Pinchapfeffer-Nuss"] }
      ]
    },

    // ═══════════════════════════════════════════════════
    // BASISSPIEL – Ressourcenpflanzen
    // ═══════════════════════════════════════════════════
    {
      id: "fingerhutschilf",
      name: "Fingerhutschilf",
      englisch: "Thimble Reed",
      typ: "ressource",
      pack: "vanilla",
      icon: "🎋",
      img: BASE_IMG + "Thimble_Reed.png",
      wachstumszyklen: 2,
      wachstumszyklenwild: 8,
      kcalProErnte: 0,
      ernteMenge: "1 Schilffaser (Textilien)",
      inputs: [
        { name: "Schmutzwasser (Bewässerung)", menge: 160, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Sauerstoff, CO₂, Wasser oder Schmutzwasser",
      temperatur: { min: 22, max: 37 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Industrie-Pflanze. Schilffaser für Duplikanten-Kleidung. Kein Nahrungsmittel.",
      tipp: "Hoher Wasserbedarf! 160 kg Schmutzwasser/Zyklus. Notwendig für Wärme-/Kälteschutzkleidung.",
      rezepte: []
    },
    {
      id: "balsamlilie",
      name: "Balsamlilie",
      englisch: "Balm Lily",
      typ: "ressource",
      pack: "vanilla",
      icon: "🌺",
      img: BASE_IMG + "Balm_Lily.png",
      wachstumszyklen: 12,
      wachstumszyklenwild: 48,
      kcalProErnte: 0,
      ernteMenge: "2 Balsamlilienblüten (Medizin)",
      inputs: [],
      atmosphaere: "Nur Chlor (0,15–10 kg/m³)",
      temperatur: { min: 35, max: 85 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Medizinpflanze. Balsamlilienblüten für Heilsalbe. Braucht Chloratmosphäre.",
      tipp: "Chloratmosphäre nötig. Blüten für medizinische Stationen verwenden.",
      rezepte: []
    },
    {
      id: "keuchwurz",
      name: "Keuchwurz",
      englisch: "Wheezewort",
      typ: "ressource",
      pack: "vanilla",
      icon: "❄️",
      img: BASE_IMG + "Wheezewort.png",
      wachstumszyklen: 0,
      wachstumszyklenwild: 0,
      kcalProErnte: 0,
      ernteMenge: "Kühlt Gas um 5°C (Heimanbau: 1 kg/s)",
      inputs: [
        { name: "Phosphorit", menge: 4, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Beliebig",
      temperatur: { min: -60, max: 95 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Kühl-Pflanze. Kühlt umliegendes Gas passiv um 5°C. Heimanbau 4× effizienter.",
      tipp: "Perfekt für passive Kühlung ohne Strom. Im Pflanztrog: 1 kg/s Gas-Kühlung. Wild: nur 250g/s.",
      rezepte: []
    },
    {
      id: "oxyfarn",
      name: "Oxifarn",
      englisch: "Oxyfern",
      typ: "ressource",
      pack: "vanilla",
      icon: "🌿",
      img: BASE_IMG + "Oxyfern.png",
      wachstumszyklen: 0,
      wachstumszyklenwild: 0,
      kcalProErnte: 0,
      ernteMenge: "31,3 g/s Sauerstoff (Heim), 7,8 g/s (Wild)",
      inputs: [
        { name: "Wasser", menge: 19, einheit: "kg/Zyklus" },
        { name: "Schmutzerde", menge: 4, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Nur CO₂ (0,03–10 kg/m³)",
      temperatur: { min: 0, max: 40 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Wandelt CO₂ in Sauerstoff um. Kein Elektrolyseur nötig für kleine Kolonien.",
      tipp: "Pro Oxifarn: ~1,88 kg O₂/Zyklus. Für 8 Dupes (480g O₂/min nötig) etwa 14 Oxifarne.",
      rezepte: []
    },
    {
      id: "arbor-baum",
      name: "Arbor-Baum",
      englisch: "Arbor Tree",
      typ: "ressource",
      pack: "vanilla",
      icon: "🌳",
      img: BASE_IMG + "Arbor_Tree.png",
      wachstumszyklen: 5,
      wachstumszyklenwild: 18,
      kcalProErnte: 0,
      ernteMenge: "Bis zu 1.500 kg Holz (5 Äste × 300 kg)",
      inputs: [
        { name: "Verschmutztes Wasser", menge: 70, einheit: "kg/Zyklus" },
        { name: "Schmutzerde", menge: 10, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Beliebig",
      temperatur: { min: 15, max: 40 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Holz-Produktionspflanze für Ethanol-Destillieranlage (Brennstoff für Erdgasgenerator).",
      tipp: "Holz → Ethanol (Destillieranlage) → Stromgenerator. Nachhaltiger Brennstoffkreislauf.",
      rezepte: []
    },

    // ═══════════════════════════════════════════════════
    // BASISSPIEL – Einmalig wachsende Wildpflanzen
    // ═══════════════════════════════════════════════════
    {
      id: "schmutzwurzel",
      name: "Vergrabene Schmutzwurzel",
      englisch: "Buried Muckroot",
      typ: "wild-einmalig",
      pack: "vanilla",
      icon: "🥔",
      img: BASE_IMG + "Buried_Muckroot.png",
      wachstumszyklen: 0,
      wachstumszyklenwild: 0,
      kcalProErnte: 800,
      ernteMenge: "1 Schmutzwurzel (800 kcal, einmalig)",
      inputs: [],
      atmosphaere: "Beliebig",
      temperatur: { min: -50, max: 50 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Einmalige Wildpflanze. Findet man im Sandstein-Biom. Kann nicht neu gepflanzt werden.",
      tipp: "Frühspiel-Nahrung. Kann nicht in Pflanztrögen angebaut werden.",
      rezepte: []
    },
    {
      id: "hexalent",
      name: "Hexalent",
      englisch: "Hexalent",
      typ: "wild-einmalig",
      pack: "vanilla",
      icon: "🌵",
      img: BASE_IMG + "Hexalent.png",
      wachstumszyklen: 0,
      wachstumszyklenwild: 0,
      kcalProErnte: 1200,
      ernteMenge: "1 Hexalentfrucht (~1.200 kcal, einmalig)",
      inputs: [],
      atmosphaere: "Beliebig",
      temperatur: { min: -50, max: 50 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Einmalige Wildpflanze. Im Wald- und Ödland-Biom. Kann nicht neu gepflanzt werden.",
      tipp: "Einmalige Notfallnahrung. Höherer Kaloriengehalt als Schmutzwurzel.",
      rezepte: []
    },

    // ═══════════════════════════════════════════════════
    // SPACED OUT! – Nahrungspflanzen
    // ═══════════════════════════════════════════════════
    {
      id: "mooreimer",
      name: "Mooreimer",
      englisch: "Bog Bucket",
      typ: "nahrung",
      pack: "spacedOut",
      icon: "🪣",
      img: BASE_IMG + "Bog_Bucket_(Spaced_Out).png",
      wachstumszyklen: 7,
      wachstumszyklenwild: 26,
      kcalProErnte: 1840,
      ernteMenge: "1 kg Moorgelee (1.840 kcal)",
      inputs: [
        { name: "Verschmutztes Wasser", menge: 40, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Sauerstoff, Schmutziger Sauerstoff oder CO₂",
      temperatur: { min: 10, max: 30 },
      licht: false,
      dunkelheit: true,
      beschreibung: "Braucht Dunkelheit! Schmutzwasser als Bewässerung. ~263 kcal/Zyklus.",
      tipp: "Ähnlich wie Dämmerkappe aber mit Schmutzwasser. Licht ausschalten! Wild: 26 Zyklen.",
      rezepte: [
        { name: "Sumpfige Leckereien", kcal: 2240, geraet: "Elektrogrill", zutaten: ["1 kg Moorgelee"] }
      ]
    },
    {
      id: "spindelduerreWuehlfrucht",
      name: "Spindeldürre Wühlfruchtpflanze",
      englisch: "Spindly Grubfruit Plant",
      typ: "nahrung",
      pack: "spacedOut",
      icon: "🌱",
      img: BASE_IMG + "Grubfruit_Plant.png",
      wachstumszyklen: 4,
      wachstumszyklenwild: 16,
      kcalProErnte: 800,
      ernteMenge: "1 Spindeldürre Wühlfrucht (800 kcal)",
      inputs: [
        { name: "Schwefel", menge: 10, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Sauerstoff, Schmutziger Sauerstoff oder CO₂",
      temperatur: { min: 15, max: 50 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Braucht Schwefel als Dünger. Im Ödland-Biom zu finden. 200 kcal/Zyklus.",
      tipp: "Schwefel kommt aus Schwefel-Geyser oder Schwefel-Biom. Wild: 16 Zyklen.",
      rezepte: [
        { name: "Gebratene Wühlfruchtnuss", kcal: 1200, geraet: "Elektrogrill", zutaten: ["1 kg Spindeldürre Wühlfrucht"] }
      ]
    },
    {
      id: "sumpfmangold",
      name: "Sumpfmangold",
      englisch: "Swamp Chard",
      typ: "wild-einmalig",
      pack: "spacedOut",
      icon: "🥦",
      img: BASE_IMG + "Swamp_Chard.png",
      wachstumszyklen: 0,
      wachstumszyklenwild: 0,
      kcalProErnte: 2400,
      ernteMenge: "1 Sumpfmangoldherz (2.400 kcal, einmalig)",
      inputs: [],
      atmosphaere: "Sumpfbiom",
      temperatur: { min: 0, max: 40 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Einmalige Wildpflanze im Sumpfbiom (Spaced Out!). Nicht anbaubar.",
      tipp: "Kann nur einmal geerntet werden. Qualität -1 (Erbärmlich) trotz hoher Kalorienzahl.",
      rezepte: []
    },

    // ═══════════════════════════════════════════════════
    // FROSTY PLANET PACK – Nahrungspflanzen
    // ═══════════════════════════════════════════════════
    {
      id: "stechapfelstrauch",
      name: "Stechapfelstrauch",
      englisch: "Pikeapple Bush",
      typ: "nahrung",
      pack: "frostyPlanet",
      icon: "🍎",
      img: BASE_IMG + "Pikeapple_Bush.png",
      wachstumszyklen: 3,
      wachstumszyklenwild: 12,
      kcalProErnte: 800,
      ernteMenge: "1 Stechapfel (800 kcal)",
      inputs: [
        { name: "Phosphorit", menge: 5, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Sauerstoff, Schmutziger Sauerstoff oder CO₂",
      temperatur: { min: -55, max: -14 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Frostpflanze! Braucht Kältebereich (-55°C bis -14°C). ~267 kcal/Zyklus.",
      tipp: "Schnell wie Mehlholz (3 Zyklen), aber extreme Kälte nötig. Wild: 12 Zyklen.",
      rezepte: [
        { name: "Stechapfel Spieß", kcal: 1200, geraet: "Elektrogrill", zutaten: ["1 Stechapfel"] },
        { name: "Beerenmatsch", kcal: 4000, geraet: "Mikrobenmatscher", zutaten: ["5 Körner", "1.600 kcal Stechapfel/Dornenbeere"] }
      ]
    },
    {
      id: "federruebenpflanze",
      name: "Federrübenpflanze",
      englisch: "Plume Squash Plant",
      typ: "nahrung",
      pack: "frostyPlanet",
      icon: "🥕",
      img: BASE_IMG + "Plume_Squash_Plant.png",
      wachstumszyklen: 9,
      wachstumszyklenwild: 36,
      kcalProErnte: 4000,
      ernteMenge: "1 Federrübe (4.000 kcal)",
      inputs: [
        { name: "Ethanol", menge: 15, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Sauerstoff, Schmutziger Sauerstoff oder CO₂",
      temperatur: { min: -55, max: -14 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Hoher Kalorienertrag im Kältebereich. ~444 kcal/Zyklus. Braucht Ethanol.",
      tipp: "Bestes Frosty Planet Nahrungsmittel. Ethanol aus Holz/Destillierung. Wild: 36 Zyklen.",
      rezepte: [
        { name: "Rübenpommes", kcal: 5400, geraet: "Fritteuse", zutaten: ["1 kg Federrübe", "1 kg Fett"] }
      ]
    },
    {
      id: "sorbeerpflanze",
      name: "Sorbeerpflanze",
      englisch: "Sherberry Plant",
      typ: "wild-einmalig",
      pack: "frostyPlanet",
      icon: "🫐",
      img: BASE_IMG + "Sherberry_Plant.png",
      wachstumszyklen: 0,
      wachstumszyklenwild: 0,
      kcalProErnte: 800,
      ernteMenge: "2 Sorbeerbeeren (800 kcal, einmalig)",
      inputs: [],
      atmosphaere: "Eisbiom",
      temperatur: { min: -80, max: 0 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Einmalige Wildpflanze im Eisbiom (Frosty Planet Pack). Nicht anbaubar.",
      tipp: "Notfallnahrung im Eisbiom. Nur einmal erntbar.",
      rezepte: []
    },
    {
      id: "bonbonbaum",
      name: "Bonbonbaum",
      englisch: "Bonbon Tree",
      typ: "ressource",
      pack: "frostyPlanet",
      icon: "🌲",
      img: BASE_IMG + "Bonbon_Tree.png",
      wachstumszyklen: 5,
      wachstumszyklenwild: 18,
      kcalProErnte: 0,
      ernteMenge: "Bis zu 375 kg Holz + Nektar (bei Licht)",
      inputs: [
        { name: "Schnee", menge: 100, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Beliebig",
      temperatur: { min: -75, max: -15 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Holz + Nektar-Produzent im Frostbereich. Nektar wird bei 10.000+ Lux produziert.",
      tipp: "Nektar bei ausreichend Licht (10.000 Lux). Holz für Brennstoff oder Ethanol-Destillierung.",
      rezepte: []
    },

    // ═══════════════════════════════════════════════════
    // PREHISTORIC PLANET PACK – Pflanzen
    // ═══════════════════════════════════════════════════
    {
      id: "schweiszkornstaengel",
      name: "Schweißkornstängel",
      englisch: "Sweatcorn Stalk",
      typ: "nahrung",
      pack: "prehistoricPlanet",
      icon: "🌽",
      img: BASE_IMG + "Sweatcorn_Stalk.png",
      wachstumszyklen: 3,
      wachstumszyklenwild: 12,
      kcalProErnte: 800,
      ernteMenge: "1 Schweißkorn (~800 kcal)",
      inputs: [
        { name: "Torf oder Kohle", menge: 10, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Sauerstoff, Schmutziger Sauerstoff oder CO₂",
      temperatur: { min: -5, max: 40 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Braucht Bestäubung durch Mimika oder Divergentes Tier. 3-Zyklus-Ernte wie Mehlholz.",
      tipp: "Mimika-Bud in der Nähe halten für Bestäubung. Wild: 12 Zyklen.",
      rezepte: [
        { name: "Gemüsepuffer (Smoker)", kcal: 11450, geraet: "Smoker", zutaten: ["5.600 kcal Gemüse (Schweißkorn/Stechapfel etc.)"] }
      ]
    },
    {
      id: "ovagro",
      name: "Ovagro-Knoten",
      englisch: "Ovagro Node",
      typ: "nahrung",
      pack: "prehistoricPlanet",
      icon: "🍈",
      img: BASE_IMG + "Ovagro_Node.png",
      wachstumszyklen: 3,
      wachstumszyklenwild: 12,
      kcalProErnte: 325,
      ernteMenge: "1 Ovagro-Feige (325 kcal) pro Ranke pro Ernte",
      inputs: [
        { name: "Wasser", menge: 90, einheit: "kg/Zyklus (alle Ranken zusammen)" }
      ],
      atmosphaere: "Beliebig",
      temperatur: { min: 25, max: 45 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Baum mit bis zu 24 Ranken, jede produziert alle 3 Zyklen 1 Feige. Sehr hoher Gesamtertrag.",
      tipp: "Mit 24 Ranken: bis zu 2.600 kcal/Zyklus. Braucht viel Wasser (90 kg/Zyklus gesamt).",
      rezepte: []
    },
    {
      id: "riesenwedel",
      name: "Riesenwedel",
      englisch: "Megafrond",
      typ: "nahrung",
      pack: "prehistoricPlanet",
      icon: "🌿",
      img: BASE_IMG + "Megafrond.png",
      wachstumszyklen: 9,
      wachstumszyklenwild: 36,
      kcalProErnte: 0,
      ernteMenge: "36 Wedelkörner (roh 0 kcal, wie Graupelweizen-Körner)",
      inputs: [
        { name: "Chlor", menge: 54, einheit: "kg/Zyklus" }
      ],
      atmosphaere: "Nur Chlor (0,5–10 kg/m³)",
      temperatur: { min: -45, max: 15 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Prähistorisches Äquivalent zu Graupelweizen. Wedelkörner ersetzen Graupelweizenkörner in Rezepten.",
      tipp: "Wedelkörner können in ALLEN Graupelweizen-Rezepten verwendet werden. Chlorbiom-Pflanze.",
      rezepte: [
        { name: "Frostbrötchen", kcal: 1200, geraet: "Elektrogrill", zutaten: ["3 Wedelkörner"] },
        { name: "Pfefferbrot", kcal: 4000, geraet: "Gasherd", zutaten: ["10 Wedelkörner", "1 kg Pinchapfeffer-Nuss"] }
      ]
    },
    {
      id: "snaktus",
      name: "Snaktus",
      englisch: "Snactus",
      typ: "wild-einmalig",
      pack: "prehistoricPlanet",
      icon: "🌵",
      img: BASE_IMG + "Snactus.png",
      wachstumszyklen: 0,
      wachstumszyklenwild: 0,
      kcalProErnte: 800,
      ernteMenge: "1 Snakfrucht (800 kcal, einmalig)",
      inputs: [],
      atmosphaere: "Gartenbiom",
      temperatur: { min: -5, max: 40 },
      licht: false,
      dunkelheit: false,
      beschreibung: "Einmalige Wildpflanze im Gartenbiom (Prehistoric Planet Pack). Nicht anbaubar.",
      tipp: "Notfallnahrung im Gartenbiom. Nur einmal erntbar.",
      rezepte: []
    }
  ],

  // ── TIERE ─────────────────────────────────────────────────
  tiere: [

    // ═══════════════════════════════════════════════════
    // BASISSPIEL
    // ═══════════════════════════════════════════════════
    {
      id: "hatch",
      name: "Hatch",
      englisch: "Hatch",
      pack: "vanilla",
      icon: "🦎",
      img: BASE_IMG + "Hatch.png",
      lebensraum: "Land",
      maxProStall: 8,
      eiinkubation: 20,
      nahrung: [
        { name: "Feststoffe (Erde, Stein, Kohle, Metall ...)", menge: 140000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Kohle (aus Biomasse/Nahrung)", menge: 0, einheit: "aus gefressen. Feststoffen", icon: "⚫" }
      ],
      varianten: [
        { name: "Glatt-Hatch (Smooth Hatch)", sonderNahrung: "Roherz, Metalllegierungen", sonderProduktion: "Roherz (×2 Masse)" },
        { name: "Glühend-Hatch (Molten Hatch)", sonderNahrung: "Rohöl, Schweres Rohöl", sonderProduktion: "Ignit" },
        { name: "Stein-Hatch (Stone Hatch)", sonderNahrung: "Sand, Sedimentgestein", sonderProduktion: "Quarzsand (×2 Masse)" },
        { name: "Weiser Hatch (Sage Hatch)", sonderNahrung: "Schleim, Schmutzgestein", sonderProduktion: "Erde" }
      ],
      tipp: "Vielseitigste Stall-Kreatur. Wandelt Feststoffe in Kohle um. Varianten je nach Biom-Ressourcen wählen."
    },
    {
      id: "puft",
      name: "Puft",
      englisch: "Puft",
      pack: "vanilla",
      icon: "🫧",
      img: BASE_IMG + "Puft.png",
      lebensraum: "Luft",
      maxProStall: 4,
      eiinkubation: 20,
      nahrung: [
        { name: "Schmutziger Sauerstoff", menge: 150000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Schleim", menge: 0, einheit: "aus Schmutz-O₂", icon: "🟢" }
      ],
      varianten: [
        { name: "Blitzblank-Puft (Squeaky Puft)", sonderNahrung: "Chlor", sonderProduktion: "Plastik" },
        { name: "Prinz-Puft (Prince Puft)", sonderNahrung: "Sauerstoff", sonderProduktion: "Schleimwasser" }
      ],
      tipp: "Wandelt Schmutzigen Sauerstoff in Schleim (für Dämmerkappe) um. Blitzblank-Puft produziert Plastik aus Chlor!"
    },
    {
      id: "drecko",
      name: "Drecko",
      englisch: "Drecko",
      pack: "vanilla",
      icon: "🦕",
      img: BASE_IMG + "Drecko.png",
      lebensraum: "Land/Klettern",
      maxProStall: 8,
      eiinkubation: 20,
      nahrung: [
        { name: "Gasgras", menge: 200000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Schilffaser (Rasur)", menge: 0, einheit: "per Scherung", icon: "🧶" }
      ],
      varianten: [
        { name: "Schimmer-Drecko (Glossy Drecko)", sonderNahrung: "Gasgras", sonderProduktion: "Plastik (Rasur)" }
      ],
      tipp: "Schilffaser für Duplikanten-Kleidung. Schimmer-Drecko produziert wertvolleres Plastik!"
    },
    {
      id: "pacu",
      name: "Pacu",
      englisch: "Pacu",
      pack: "vanilla",
      icon: "🐟",
      img: BASE_IMG + "Pacu.png",
      lebensraum: "Wasser",
      maxProStall: 4,
      eiinkubation: 20,
      nahrung: [
        { name: "Algae / Seekamm-Blätter", menge: 0, einheit: "Filterfresser" }
      ],
      produktion: [
        { name: "Pacu-Filet (Schlachtung)", menge: 0, einheit: "pro Tier", icon: "🐟" }
      ],
      varianten: [
        { name: "Tropischer Pacu (Tropical Pacu)", sonderNahrung: "Warmes Wasser >30°C", sonderProduktion: "Pacu-Filet + Roheier" },
        { name: "Salzwasser-Pacu (Saltvine Pacu)", sonderNahrung: "Salzwasser-Algen", sonderProduktion: "Pacu-Filet" }
      ],
      tipp: "Pacu-Filet für Gekochte Meeresfrüchte und Fisch Taco (FP). Tropischer Pacu legt Eier!"
    },
    {
      id: "pip",
      name: "Pip",
      englisch: "Pip",
      pack: "vanilla",
      icon: "🐿️",
      img: BASE_IMG + "Pip.png",
      lebensraum: "Land",
      maxProStall: 8,
      eiinkubation: 20,
      nahrung: [
        { name: "Pflanzensamen (Arbor-Samen etc.)", menge: 0, einheit: "pflanzt Samen ein" }
      ],
      produktion: [
        { name: "Pflanzt Arbor-Baum-Samen", menge: 0, einheit: "in Boden", icon: "🌱" }
      ],
      varianten: [],
      tipp: "Pflanzt Arbor-Baum-Samen automatisch ein. Nützlich für automatische Holzfarmen."
    },
    {
      id: "leuchtkaefer",
      name: "Leuchtkäfer",
      englisch: "Shine Bug",
      pack: "vanilla",
      icon: "🪲",
      img: BASE_IMG + "Shine_Bug.png",
      lebensraum: "Luft",
      maxProStall: 6,
      eiinkubation: 20,
      nahrung: [
        { name: "Phosphorit", menge: 20000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Licht (2.000 Lux Radius 8)", menge: 0, einheit: "passiv", icon: "💡" }
      ],
      varianten: [
        { name: "Regenbogen-Leuchtkäfer (Rainbow Shine Bug)", sonderNahrung: "Phosphorit", sonderProduktion: "Licht + Dekor +40" }
      ],
      tipp: "Natürliche Lichtquelle! Nützlich für Dornenblüten-Farmen. Braucht Phosphorit."
    },
    {
      id: "schubwuehlmaus",
      name: "Schubwühlmaus",
      englisch: "Shove Vole",
      pack: "vanilla",
      icon: "🐭",
      img: BASE_IMG + "Shove_Vole.png",
      lebensraum: "Land (gräbt)",
      maxProStall: 8,
      eiinkubation: 20,
      nahrung: [
        { name: "Regolith, Sand, Feststoffe", menge: 200000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Schmutzerde", menge: 0, einheit: "aus gefressen. Material", icon: "🟤" }
      ],
      varianten: [],
      tipp: "Wandelt Regolith/Sand in Schmutzerde um. Nützlich auf Weltraum-Biomen mit viel Regolith."
    },
    {
      id: "slickster",
      name: "Slickster",
      englisch: "Slickster",
      pack: "vanilla",
      icon: "🐛",
      img: BASE_IMG + "Slickster.png",
      lebensraum: "Luft (CO₂)",
      maxProStall: 4,
      eiinkubation: 20,
      nahrung: [
        { name: "CO₂", menge: 100000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Rohöl", menge: 0, einheit: "aus CO₂", icon: "🛢️" }
      ],
      varianten: [
        { name: "Öl-Slickster (Oily Slickster)", sonderNahrung: "CO₂", sonderProduktion: "Schweres Rohöl" },
        { name: "Ungeschickter Slickster (Longhair Slickster)", sonderNahrung: "CO₂", sonderProduktion: "Rohöl + Schilffaser" }
      ],
      tipp: "Wandelt CO₂ in Rohöl um – für Petrolium/Plastik-Produktion. CO₂-Überschuss sinnvoll nutzen!"
    },
    {
      id: "morb",
      name: "Morb",
      englisch: "Morb",
      pack: "vanilla",
      icon: "🦠",
      img: BASE_IMG + "Morb.png",
      lebensraum: "Luft",
      maxProStall: 6,
      eiinkubation: 20,
      nahrung: [
        { name: "Schmutziger Sauerstoff", menge: 0, einheit: "kein Bedarf" }
      ],
      produktion: [
        { name: "Schmutziger Sauerstoff + Slimekeim-Sporen", menge: 0, einheit: "passiv", icon: "☣️" }
      ],
      varianten: [],
      tipp: "ACHTUNG: Produziert Sliemkeim-Sporen! Nicht in Wohnbereichen halten. Nur in isolierten Räumen."
    },

    // ═══════════════════════════════════════════════════
    // SPACED OUT!
    // ═══════════════════════════════════════════════════
    {
      id: "muh",
      name: "Gasende Muh",
      englisch: "Gassy Moo",
      pack: "spacedOut",
      icon: "🐄",
      img: BASE_IMG + "Gassy_Moo.png",
      lebensraum: "Land (Mondbiom)",
      maxProStall: 4,
      eiinkubation: 20,
      nahrung: [
        { name: "Gasgras-Pflanzenhülle", menge: 400000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Erdgas", menge: 0, einheit: "passiv (Gasstöße)", icon: "⛽" }
      ],
      varianten: [],
      tipp: "Lebt auf dem Moo-Mondlet. Produziert Erdgas für Gasmotor-Generatoren. Gasgras zum Füttern nötig."
    },
    {
      id: "beeta",
      name: "Beeta",
      englisch: "Beeta",
      pack: "spacedOut",
      icon: "🐝",
      img: BASE_IMG + "Beeta.png",
      lebensraum: "Luft",
      maxProStall: 6,
      eiinkubation: 20,
      nahrung: [
        { name: "Rohöl oder Erdgas", menge: 0, einheit: "sucht selbst" }
      ],
      produktion: [
        { name: "Strahlung (Radioaktiv!)", menge: 0, einheit: "passiv", icon: "☢️" },
        { name: "Honigwabe (Schlachtung)", menge: 0, einheit: "pro Tier", icon: "🍯" }
      ],
      varianten: [],
      tipp: "Strahlt Radioaktivität aus – für Strahlungsforschung. Honigwabe für Nahrungsverarbeitung."
    },
    {
      id: "pokepanzer",
      name: "Pokepanzer",
      englisch: "Pokeshell",
      pack: "spacedOut",
      icon: "🦞",
      img: BASE_IMG + "Pokeshell.png",
      lebensraum: "Land",
      maxProStall: 6,
      eiinkubation: 20,
      nahrung: [
        { name: "Pflanzliche Biomasse, Leichen", menge: 200000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Algenpanzer (Schlachtung)", menge: 0, einheit: "Chitinschale", icon: "🦀" }
      ],
      varianten: [],
      tipp: "Chitinschale für Herstellung von Gebäuden. Frisst Leichen – nützlich für Leichen-Management."
    },
    {
      id: "sweetle",
      name: "Sweetle",
      englisch: "Sweetle",
      pack: "spacedOut",
      icon: "🐞",
      img: BASE_IMG + "Sweetle.png",
      lebensraum: "Land",
      maxProStall: 8,
      eiinkubation: 20,
      nahrung: [
        { name: "Phosphorit", menge: 20000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Zucker (Sucrose)", menge: 0, einheit: "aus Phosphorit", icon: "🍬" }
      ],
      varianten: [],
      tipp: "Wandelt Phosphorit in Sucrose (Zucker) um – benötigt für Wühlfruchtkonserve und andere Rezepte."
    },
    {
      id: "steckschnecke",
      name: "Steckschnecke",
      englisch: "Plug Slug",
      pack: "spacedOut",
      icon: "🐌",
      img: BASE_IMG + "Plug_Slug.png",
      lebensraum: "Land (Kabel)",
      maxProStall: 4,
      eiinkubation: 20,
      nahrung: [
        { name: "Elektrische Leitungen (frisst Strom)", menge: 0, einheit: "passiv" }
      ],
      produktion: [
        { name: "Strom (gibt gespeicherten Strom ab)", menge: 0, einheit: "passiv", icon: "⚡" }
      ],
      varianten: [],
      tipp: "Lebt auf Kabeln. Nimmt Strom auf wenn zu viel vorhanden, gibt ihn bei Mangel ab. Natürlicher Akkumulator!"
    },

    // ═══════════════════════════════════════════════════
    // FROSTY PLANET PACK
    // ═══════════════════════════════════════════════════
    {
      id: "bammuth",
      name: "Bammut",
      englisch: "Bammoth",
      pack: "frostyPlanet",
      icon: "🦣",
      img: BASE_IMG + "Bammoth.png",
      lebensraum: "Land (Kälte)",
      maxProStall: 4,
      eiinkubation: 25,
      nahrung: [
        { name: "Stechapfel oder andere Kältepflanzen", menge: 200000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Rohes Fleisch (Schlachtung) – Zartes Bruststück", menge: 0, einheit: "pro Tier", icon: "🥩" },
        { name: "Knochen (Schlachtung)", menge: 0, einheit: "pro Tier", icon: "🦴" }
      ],
      varianten: [],
      tipp: "Großes Kälte-Tier aus dem Frosty Planet Pack. Fleisch für Zartes Bruststück (Smoker)."
    },
    {
      id: "flox",
      name: "Flox",
      englisch: "Flox",
      pack: "frostyPlanet",
      icon: "🦊",
      img: BASE_IMG + "Flox.png",
      lebensraum: "Land (Kälte)",
      maxProStall: 6,
      eiinkubation: 20,
      nahrung: [
        { name: "Phosphorit (Kältebereich)", menge: 20000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Kühlt Umgebung passiv", menge: 0, einheit: "Wärmepumpe", icon: "❄️" }
      ],
      varianten: [],
      tipp: "Natürliche Kühlung! Hält Kältezonen kalt ohne Stromverbrauch. Phosphorit zum Füttern."
    },
    {
      id: "zapfrobbe",
      name: "Zapfrobbe",
      englisch: "Spigot Seal",
      pack: "frostyPlanet",
      icon: "🦭",
      img: BASE_IMG + "Spigot_Seal.png",
      lebensraum: "Wasser (Kälte)",
      maxProStall: 4,
      eiinkubation: 20,
      nahrung: [
        { name: "Seekamm-Blätter oder Fische", menge: 0, einheit: "Filterfresser" }
      ],
      produktion: [
        { name: "Rohe Schalentiere (Schlachtung)", menge: 0, einheit: "pro Tier", icon: "🦀" }
      ],
      varianten: [],
      tipp: "Lebt in Kaltwasser. Rohe Schalentiere für Schalentier-Tempura (Fritteuse, FP)."
    },

    // ═══════════════════════════════════════════════════
    // PREHISTORIC PLANET PACK
    // ═══════════════════════════════════════════════════
    {
      id: "dartel",
      name: "Dartel",
      englisch: "Dartle",
      pack: "prehistoricPlanet",
      icon: "🦎",
      img: BASE_IMG + "Dartle.png",
      lebensraum: "Land",
      maxProStall: 8,
      eiinkubation: 18,
      nahrung: [
        { name: "Tautropfen (aus Tautropf-Pflanze)", menge: 0, einheit: "sucht selbst" }
      ],
      produktion: [
        { name: "Rohes Fleisch (Schlachtung)", menge: 0, einheit: "pro Tier", icon: "🥩" }
      ],
      varianten: [],
      tipp: "Kleines Tier aus PP. Frisst Tautropfen von Tautropf-Pflanzen. Fleischquelle."
    },
    {
      id: "jawbo",
      name: "Jawbo",
      englisch: "Jawbo",
      pack: "prehistoricPlanet",
      icon: "🐊",
      img: BASE_IMG + "Jawbo.png",
      lebensraum: "Wasser",
      maxProStall: 4,
      eiinkubation: 22,
      nahrung: [
        { name: "Seekamm-Blätter", menge: 0, einheit: "Unterwasser" }
      ],
      produktion: [
        { name: "Jawbo-Filet (Schlachtung)", menge: 0, einheit: "pro Tier", icon: "🐟" }
      ],
      varianten: [],
      tipp: "Prähistorischer Fisch. Jawbo-Filet für Geräucherten Fisch (Smoker, PP)."
    },
    {
      id: "lumba",
      name: "Lumb",
      englisch: "Lumb",
      pack: "prehistoricPlanet",
      icon: "🐘",
      img: "",
      lebensraum: "Land",
      maxProStall: 4,
      eiinkubation: 25,
      nahrung: [
        { name: "Pflanzliche Biomasse", menge: 200000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Zähes Fleisch (Schlachtung)", menge: 0, einheit: "pro Tier", icon: "🥩" }
      ],
      varianten: [],
      tipp: "Großes Prähistorie-Tier. Zähes Fleisch für Zartes Bruststück (Smoker, PP)."
    },
    {
      id: "mimika",
      name: "Mimika",
      englisch: "Mimika",
      pack: "prehistoricPlanet",
      icon: "🌸",
      img: BASE_IMG + "Mimika.png",
      lebensraum: "Luft/Land",
      maxProStall: 6,
      eiinkubation: 15,
      nahrung: [
        { name: "Mimika-Bud (Pflanze) oder Nektar", menge: 0, einheit: "selbständig" }
      ],
      produktion: [
        { name: "Bestäubung (erhöht Pflanzenernte)", menge: 0, einheit: "passiv", icon: "🌺" },
        { name: "Mimillet (nach Bestäubung)", menge: 0, einheit: "passiv", icon: "🌾" }
      ],
      varianten: [],
      tipp: "Bestäubt Schweißkornstängel und andere PP-Pflanzen. Mimillet für Geröstetes Mimillet!"
    },
    {
      id: "rhex",
      name: "Rhex",
      englisch: "Rhex",
      pack: "prehistoricPlanet",
      icon: "🦖",
      img: BASE_IMG + "Rhex.png",
      lebensraum: "Land",
      maxProStall: 2,
      eiinkubation: 30,
      nahrung: [
        { name: "Große Mengen organisches Material", menge: 500000, einheit: "g/Zyklus" }
      ],
      produktion: [
        { name: "Sehr viel Zähes Fleisch (Schlachtung)", menge: 0, einheit: "pro Tier", icon: "🥩" }
      ],
      varianten: [],
      tipp: "Größtes Prehistoric Planet-Tier. Hoher Fleischertrag, aber braucht sehr viel Futter!"
    }
  ],

  // ── STALL INFO ────────────────────────────────────────────
  stallInfo: {
    groesse: "Mindestens 4×2 Fliesen (96 Fliesen für volle Kapazität empfohlen)",
    benoetigt: [
      "Grooming Station (Pflegestation) – erhöht Ei-Produktionsrate",
      "Stall-Klappe (Critter Drop-off) – sortiert Tiere in Stall",
      "Automatischer Stall (Auto-Wrangler) – für Schlachtung/Sortierung",
      "Nahrungsstation oder direktes Futter im Raum",
      "Belüftung / richtige Atmosphäre je nach Tierart",
      "Temperatur beachten (Hatch: 0–75°C, Puft: –20–75°C)"
    ],
    tipp: "Ideale Stallgröße: 12×8 = 96 Fliesen für 8 Tiere. Grooming Station regelmäßig nutzen für maximale Ei-Rate!"
  },

  // ── MATERIALIEN ───────────────────────────────────────────
  materialien: [
    {
      kategorie: "⛏️ Roherze & Gestein",
      pack: "vanilla",
      eintraege: [
        { name: "Kupfererz",   englisch: "Copper Ore",       icon: "🟠", img: BASE_IMG + "Copper_Ore.png",       wärmeleitfähigkeit: 4.5,   schmelzpunkt: 1084,  strom: false },
        { name: "Eisenerz",       englisch: "Iron Ore",          icon: "🟤", img: BASE_IMG + "Iron_Ore.png",          wärmeleitfähigkeit: 4.0,   schmelzpunkt: 1535,  strom: false },
        { name: "Goldamalgam",        englisch: "Gold Amalgam",      icon: "🟡", img: BASE_IMG + "Gold_Amalgam.png",      wärmeleitfähigkeit: 4.5,   schmelzpunkt: 1063,  strom: false },
        { name: "Rohöl",          englisch: "Crude Oil",         icon: "🛢️", img: BASE_IMG + "Crude_Oil.png",         wärmeleitfähigkeit: 0.15,  schmelzpunkt: -40,   strom: false },
        { name: "Sandstein",      englisch: "Sandstone",         icon: "🪨", img: BASE_IMG + "Sandstone.png",         wärmeleitfähigkeit: 2.9,   schmelzpunkt: 1600,  strom: false },
        { name: "Granit",         englisch: "Granite",           icon: "🪨", img: BASE_IMG + "Granite.png",           wärmeleitfähigkeit: 3.39,  schmelzpunkt: 1870,  strom: false },
        { name: "Basalt",         englisch: "Basalt",            icon: "🪨", img: BASE_IMG + "Basalt.png",            wärmeleitfähigkeit: 2.0,   schmelzpunkt: 1300,  strom: false },
        { name: "Kalk",           englisch: "Lime",              icon: "🪨", img: BASE_IMG + "Lime.png",              wärmeleitfähigkeit: 2.0,   schmelzpunkt: 2570,  strom: false },
        { name: "Schleim",        englisch: "Slime",             icon: "🟢", img: BASE_IMG + "Slime.png",             wärmeleitfähigkeit: 0.96,  schmelzpunkt: 0,     strom: false },
        { name: "Regolith",       englisch: "Regolith",          icon: "⚪", img: BASE_IMG + "Regolith.png",          wärmeleitfähigkeit: 0.8,   schmelzpunkt: 9726,  strom: false }
      ]
    },
    {
      kategorie: "🔧 Raffinierte Metalle",
      pack: "vanilla",
      eintraege: [
        { name: "Kupfer",         englisch: "Copper",             icon: "🟠", img: BASE_IMG + "Copper.png",             wärmeleitfähigkeit: 60.0,  schmelzpunkt: 1984,  strom: true  },
        { name: "Eisen",          englisch: "Iron",               icon: "⚙️", img: BASE_IMG + "Iron.png",               wärmeleitfähigkeit: 55.0,  schmelzpunkt: 1535,  strom: true  },
        { name: "Gold",           englisch: "Gold",               icon: "🥇", img: BASE_IMG + "Gold.png",               wärmeleitfähigkeit: 60.0,  schmelzpunkt: 1063,  strom: true  },
        { name: "Stahl",          englisch: "Steel",              icon: "🔩", img: BASE_IMG + "Steel.png",              wärmeleitfähigkeit: 54.0,  schmelzpunkt: 2427,  strom: true  },
        { name: "Thermium",       englisch: "Thermium",           icon: "🌡️", img: BASE_IMG + "Thermium.png",           wärmeleitfähigkeit: 200.0, schmelzpunkt: 2977,  strom: true  },
        { name: "Wolfram",        englisch: "Tungsten",           icon: "⚫", img: BASE_IMG + "Tungsten.png",           wärmeleitfähigkeit: 60.0,  schmelzpunkt: 3422,  strom: true  },
        { name: "Niob",        englisch: "Niobium",            icon: "🔵", img: BASE_IMG + "Niobium.png",            wärmeleitfähigkeit: 54.0,  schmelzpunkt: 2477,  strom: true  },
        { name: "Aluminium",      englisch: "Aluminum",           icon: "⚪", img: BASE_IMG + "Aluminum.png",           wärmeleitfähigkeit: 205.0, schmelzpunkt: 660,   strom: true  }
      ]
    },
    {
      kategorie: "🌡️ Isoliermaterialien",
      pack: "vanilla",
      eintraege: [
        { name: "Magmatit",  englisch: "Igneous Rock",      icon: "🟫", img: BASE_IMG + "Igneous_Rock.png",      wärmeleitfähigkeit: 2.0,   schmelzpunkt: 1410,  strom: false },
        { name: "Mafisches Gestein",    englisch: "Mafic Rock",        icon: "⚫", img: BASE_IMG + "Mafic_Rock.png",        wärmeleitfähigkeit: 1.7,   schmelzpunkt: 1500,  strom: false },
        { name: "Sedimentgestein", englisch: "Sedimentary Rock",  icon: "🟤", img: BASE_IMG + "Sedimentary_Rock.png",  wärmeleitfähigkeit: 2.93,  schmelzpunkt: 1410,  strom: false },
        { name: "Abyssalit",       englisch: "Abyssalite",        icon: "🟣", img: BASE_IMG + "Abyssalite.png",        wärmeleitfähigkeit: 0.00001, schmelzpunkt: 3422, strom: false },
        { name: "Keramik",         englisch: "Ceramic",           icon: "🟠", img: BASE_IMG + "Ceramic.png",           wärmeleitfähigkeit: 0.62,  schmelzpunkt: 1705,  strom: false },
        { name: "Plastik",         englisch: "Plastic",           icon: "🔷", img: BASE_IMG + "Plastic.png",           wärmeleitfähigkeit: 0.18,  schmelzpunkt: 159,   strom: false }
      ]
    },
    {
      kategorie: "💧 Flüssigkeiten (wichtige)",
      pack: "vanilla",
      eintraege: [
        { name: "Wasser",         englisch: "Water",              icon: "💧", img: BASE_IMG + "Water.png",              wärmeleitfähigkeit: 0.61,  schmelzpunkt: 0,     strom: false },
        { name: "Verschmutztes Wasser",  englisch: "Polluted Water",     icon: "🟤", img: BASE_IMG + "Polluted_Water.png",     wärmeleitfähigkeit: 0.58,  schmelzpunkt: -20,   strom: false },
        { name: "Petroleum",      englisch: "Petroleum",          icon: "⚫", img: BASE_IMG + "Petroleum.png",          wärmeleitfähigkeit: 0.2,   schmelzpunkt: -57,   strom: false },
        { name: "Superkühlmittel", englisch: "Super Coolant",     icon: "🔵", img: BASE_IMG + "Super_Coolant.png",      wärmeleitfähigkeit: 9.46,  schmelzpunkt: -271,  strom: false },
        { name: "Ethanol",        englisch: "Ethanol",            icon: "🍷", img: BASE_IMG + "Ethanol.png",            wärmeleitfähigkeit: 0.17,  schmelzpunkt: -114,  strom: false },
        { name: "Salzwasser",     englisch: "Salt Water",         icon: "🌊", img: BASE_IMG + "Salt_Water.png",         wärmeleitfähigkeit: 0.62,  schmelzpunkt: -7,    strom: false },
        { name: "Flüssiges Kohlendioxid",   englisch: "Liquid Carbon Dioxide",         icon: "🫧", img: BASE_IMG + "Liquid_Carbon_Dioxide.png",         wärmeleitfähigkeit: 0.1,   schmelzpunkt: -56,   strom: false }
      ]
    },
    {
      kategorie: "🌬️ Gase (wichtige)",
      pack: "vanilla",
      eintraege: [
        { name: "Sauerstoff",          englisch: "Oxygen",          icon: "💨", img: BASE_IMG + "Oxygen.png",          wärmeleitfähigkeit: 0.026, schmelzpunkt: -218,  strom: false },
        { name: "Verschmutzter Sauerstoff", englisch: "Polluted Oxygen", icon: "🟡", img: BASE_IMG + "Polluted_Oxygen.png", wärmeleitfähigkeit: 0.024, schmelzpunkt: -219,  strom: false },
        { name: "Kohlendioxid",        englisch: "Carbon Dioxide",  icon: "☁️", img: BASE_IMG + "Carbon_Dioxide.png",  wärmeleitfähigkeit: 0.015, schmelzpunkt: -56,   strom: false },
        { name: "Wasserstoff",         englisch: "Hydrogen Gas",        icon: "🔵", img: BASE_IMG + "Hydrogen_Gas.png",        wärmeleitfähigkeit: 0.168, schmelzpunkt: -259,  strom: false },
        { name: "Chlorgas",            englisch: "Chlorine Gas",    icon: "🟡", img: BASE_IMG + "Chlorine.png",        wärmeleitfähigkeit: 0.009, schmelzpunkt: -101,  strom: false },
        { name: "Erdgas",              englisch: "Natural Gas",     icon: "⛽", img: BASE_IMG + "Natural_Gas.png",     wärmeleitfähigkeit: 0.035, schmelzpunkt: -182,  strom: false }
      ]
    }
  ],

  // ── MATERIALIEN ERGÄNZUNG DLC ────────────────────────────
  // (werden an materialien[] angehängt via app.js)
  materialienDLC: [
    {
      kategorie: "🌨️ Frosty Planet – Ressourcen",
      pack: "frostyPlanet",
      eintraege: [
        { name: "Eis",            englisch: "Ice",            icon: "🧊", img: BASE_IMG + "Ice.png",            wärmeleitfähigkeit: 2.18,  schmelzpunkt: 0,    strom: false },
        { name: "Schnee",         englisch: "Snow",           icon: "❄️", img: BASE_IMG + "Snow.png",           wärmeleitfähigkeit: 0.60,  schmelzpunkt: 0,    strom: false },
        { name: "Sole-Eis",        englisch: "Brine Ice",      icon: "🧊", img: BASE_IMG + "Brine_Ice.png",      wärmeleitfähigkeit: 2.21,  schmelzpunkt: -7,   strom: false },
        { name: "Sole",           englisch: "Brine",          icon: "🌊", img: BASE_IMG + "Brine.png",          wärmeleitfähigkeit: 0.42,  schmelzpunkt: -24,  strom: false },
        { name: "Torf",           englisch: "Peat",           icon: "🟫", img: BASE_IMG + "Peat.png",           wärmeleitfähigkeit: 0.15,  schmelzpunkt: 2527, strom: false },
        { name: "Nektar",         englisch: "Nectar",         icon: "🍯", img: BASE_IMG + "Nectar.png",         wärmeleitfähigkeit: 0.15,  schmelzpunkt: -30,  strom: false }
      ]
    },
    {
      kategorie: "🦕 Prehistoric Planet – Ressourcen",
      pack: "prehistoricPlanet",
      eintraege: [
        { name: "Bernstein",      englisch: "Amber",          icon: "🟠", img: BASE_IMG + "Amber.png",          wärmeleitfähigkeit: 0.69,  schmelzpunkt: 95,   strom: false },
        { name: "Harz",           englisch: "Resin",          icon: "🟤", img: BASE_IMG + "Resin.png",          wärmeleitfähigkeit: 0.20,  schmelzpunkt: 190,  strom: false },
        { name: "Fossilien",         englisch: "Fossil",         icon: "🦴", img: BASE_IMG + "Fossil.png",         wärmeleitfähigkeit: 2.9,   schmelzpunkt: 1600, strom: false },
        { name: "Phytoöl",        englisch: "Phyto Oil",      icon: "🫙", img: BASE_IMG + "Phyto_Oil.png",      wärmeleitfähigkeit: 0.15,  schmelzpunkt: -60,  strom: false },
        { name: "Torf",           englisch: "Peat",           icon: "🟫", img: BASE_IMG + "Peat.png",           wärmeleitfähigkeit: 0.15,  schmelzpunkt: 2527, strom: false }
      ]
    },
    {
      kategorie: "🚀 Spaced Out! – Ressourcen",
      pack: "spacedOut",
      eintraege: [
        { name: "Uranerz",        englisch: "Uranium Ore",    icon: "☢️", img: BASE_IMG + "Uranium_Ore.png",    wärmeleitfähigkeit: 4.0,   schmelzpunkt: 1132, strom: false },
        { name: "Angereichertes Uran", englisch: "Enriched Uranium", icon: "☢️", img: BASE_IMG + "Enriched_Uranium.png", wärmeleitfähigkeit: 18.5,  schmelzpunkt: 1132, strom: true  },
        { name: "Blei",           englisch: "Lead",           icon: "⚫", img: BASE_IMG + "Lead.png",           wärmeleitfähigkeit: 35.3,  schmelzpunkt: 328,  strom: true  },
        { name: "Saccharose",        englisch: "Sucrose",        icon: "🍬", img: BASE_IMG + "Sucrose_(Spaced_Out).png",        wärmeleitfähigkeit: 0.19,  schmelzpunkt: 186,  strom: false },
        { name: "Fulleren",       englisch: "Fullerene",      icon: "🔵", img: BASE_IMG + "Fullerene.png",      wärmeleitfähigkeit: 0.0,   schmelzpunkt: 3527, strom: false }
      ]
    }
  ],

  // ── O2 QUELLEN (für Sauerstoff-Rechner) ──────────────────
  o2Quellen: [
    {
      id: "elektrolyseur",
      name: "Elektrolyseur",
      englisch: "Electrolyzer",
      icon: "⚗️",
      img: BASE_IMG + "Electrolyzer.png",
      o2ProZyklus: 53280,   // g/Zyklus (888 g/s × 600s)
      wasserVerbrauch: 71.4, // kg/Zyklus
      stromVerbrauch: 120,   // Watt
      pack: "vanilla",
      tipp: "Bester O₂-Erzeuger. Produziert auch Wasserstoff (2/3 O₂, 1/3 H₂). Braucht Pumpen!"
    },
    {
      id: "oxyl_destillierung",
      name: "Sauerstoff-Diffusor",
      englisch: "Oxygen Diffuser",
      icon: "🌀",
      img: BASE_IMG + "Oxygen_Diffuser.png",
      o2ProZyklus: 54000,   // g/Zyklus (90 g/s × 600s)
      wasserVerbrauch: 0,
      stromVerbrauch: 120,
      pack: "vanilla",
      tipp: "Einfacher O₂-Erzeuger aus Algenmasse. Kein Wasser nötig. Gut für Spielstart."
    },
    {
      id: "oxyfarn",
      name: "Oxifarn (Heim)",
      englisch: "Oxyfern (Tamed)",
      icon: "🌿",
      img: BASE_IMG + "Oxyfern.png",
      o2ProZyklus: 18780,   // g/Zyklus (31.3 g/s × 600s)
      wasserVerbrauch: 19,
      stromVerbrauch: 0,
      pack: "vanilla",
      tipp: "Passiv, stromlos. 1 Oxifarn ≈ 1,88 kg O₂/Zyklus. Braucht CO₂-Atmosphäre und Wasser."
    },
    {
      id: "oxyfarn_wild",
      name: "Oxifarn (Wild)",
      englisch: "Oxyfern (Wild)",
      icon: "🌱",
      img: BASE_IMG + "Oxyfern.png",
      o2ProZyklus: 4695,    // g/Zyklus (7.825 g/s × 600s)
      wasserVerbrauch: 4.75,
      stromVerbrauch: 0,
      pack: "vanilla",
      tipp: "Wild: nur 1/4 der Produktion. Pflanzen in Pflanztröge für volle Effizienz!"
    }
  ],

  // ── ALLE REZEPTE ──────────────────────────────────────────
  // qualitaet: -1=Erbärmlich, 0=Schrecklich, 1=Schlecht, 2=Standard,
  //            3=Gut, 4=Toll, 5=Hervorragend, 6=Außergewöhnlich
  rezepte: [
    // ─ Mikrobenmatscher ─
    { id: "matschriegel",     name: "Matschriegel",          englisch: "Mush Bar",
      geraet: "Mikrobenmatscher", pack: "vanilla",   kcalAusgang: 800,  qualitaet: -1,
      haltbarkeit: 4,   zutaten: ["75 kg Erde", "75 kg Wasser"],
      tipp: "Notfallnahrung. Sehr schlechte Qualität – senkt Moral!"
    },
    { id: "laeusebot",        name: "Läusebrot",             englisch: "Liceloaf",
      geraet: "Mikrobenmatscher", pack: "vanilla",   kcalAusgang: 1700, qualitaet: 0,
      haltbarkeit: 8,   zutaten: ["1.200 kcal Mehllaus", "50 kg Wasser"],
      tipp: "Erste Verbesserung gegenüber roher Mehllaus. Einfach herzustellen."
    },
    { id: "tofu",             name: "Tofu",                  englisch: "Tofu",
      geraet: "Mikrobenmatscher", pack: "vanilla",   kcalAusgang: 3600, qualitaet: 2,
      haltbarkeit: 8,   zutaten: ["6 Happsbohnen", "50 kg Wasser"],
      tipp: "Gute Basis für High-End-Rezepte. Happspross-Farm nötig."
    },
    { id: "beerenmatsch",     name: "Beerenmatsch",          englisch: "Berry Sludge",
      geraet: "Mikrobenmatscher", pack: "vanilla",   kcalAusgang: 4000, qualitaet: 3,
      haltbarkeit: 8,   zutaten: ["5 Graupelweizenkörner ODER Wedelkörner", "1.600 kcal Dornenbeere ODER Stechapfel"],
      tipp: "Sehr gute Qualität ohne Strom! Nur Mikrobenmatscher nötig."
    },
    { id: "pemmikan",         name: "Pemmikan",              englisch: "Pemmican",
      geraet: "Mikrobenmatscher", pack: "frostyPlanet", kcalAusgang: 2600, qualitaet: 2,
      haltbarkeit: 50,  zutaten: ["1.600 kcal Fleisch (beliebig)", "1 kg Fett"],
      tipp: "Frosty Planet Pack. Sehr lange haltbar (50 Zyklen)! Ideal für Expeditionen."
    },
    // ─ Elektrogrill ─
    { id: "eingelegte_mahlzeit", name: "Eingelegte Mahlzeit", englisch: "Pickled Meal",
      geraet: "Elektrogrill", pack: "vanilla",        kcalAusgang: 1800, qualitaet: -1,
      haltbarkeit: 50,  zutaten: ["3 kg Mehllaus"],
      tipp: "Schlechte Qualität aber sehr lange haltbar (50 Zyklen)."
    },
    { id: "frittierter_matsch",  name: "Frittierter Matsch", englisch: "Mush Fry",
      geraet: "Elektrogrill", pack: "vanilla",        kcalAusgang: 1050, qualitaet: 0,
      haltbarkeit: 8,   zutaten: ["1 kg Matschriegel"],
      tipp: "Aus Matschriegel – verbessert Qualität leicht aber immer noch schlecht."
    },
    { id: "knorpelbeere",     name: "Knorpelbeere",          englisch: "Gristle Berry",
      geraet: "Elektrogrill", pack: "vanilla",        kcalAusgang: 2000, qualitaet: 1,
      haltbarkeit: 8,   zutaten: ["1 kg Dornenbeere"],
      tipp: "Wichtige Zutat für Gefüllte Beere (Q4) und Beerenmatsch (Q3)."
    },
    { id: "frittierter_pilz", name: "Frittierter Pilz",      englisch: "Fried Mushroom",
      geraet: "Elektrogrill", pack: "vanilla",        kcalAusgang: 2800, qualitaet: 1,
      haltbarkeit: 8,   zutaten: ["1 kg Pilz (Dämmerkappe)"],
      tipp: "Zutat für Pilzwrap (Q4) und Pilzquiche (Q5)."
    },
    { id: "frostbroetchen",   name: "Frostbrötchen",         englisch: "Frost Bun",
      geraet: "Elektrogrill", pack: "vanilla",        kcalAusgang: 1200, qualitaet: 2,
      haltbarkeit: 8,   zutaten: ["3 Graupelweizenkörner ODER Wedelkörner"],
      tipp: "Wichtige Zutat für Pfefferbrot (Q5) und Frostburger (Q5)."
    },
    { id: "omelett",          name: "Omelett",               englisch: "Omelette",
      geraet: "Elektrogrill", pack: "vanilla",        kcalAusgang: 2800, qualitaet: 2,
      haltbarkeit: 8,   zutaten: ["1 kg Rohes Ei (von Tieren)"],
      tipp: "Eier von Pacu (Tropisch), Hatch, Drecko etc. Zutat für Pilzquiche (Q5)."
    },
    { id: "souffle_pfannkuchen", name: "Soufflé Pfannkuchen", englisch: "Soufflé Pancakes",
      geraet: "Elektrogrill", pack: "vanilla",        kcalAusgang: 3600, qualitaet: 3,
      haltbarkeit: 8,   zutaten: ["1 kg Rohes Ei", "2 Graupelweizenkörner ODER Wedelkörner"],
      tipp: "Gute Qualität ohne Gasherd! Bestes Frühspiel-Essen mit Eiern."
    },
    { id: "barbeque",         name: "Barbeque",              englisch: "Barbeque",
      geraet: "Elektrogrill", pack: "vanilla",        kcalAusgang: 4000, qualitaet: 3,
      haltbarkeit: 8,   zutaten: ["2 kg Fleisch (von Hatch, Pacu etc.)"],
      tipp: "Hohe Kalorien + gute Qualität. Zutat für Surf'n'Turf (Q4) und Frostburger (Q5)."
    },
    { id: "meeresfrüchte",    name: "Gekochte Meeresfrüchte", englisch: "Cooked Seafood",
      geraet: "Elektrogrill", pack: "vanilla",        kcalAusgang: 1600, qualitaet: 3,
      haltbarkeit: 8,   zutaten: ["1 kg Pacu-Filet ODER Rohe Schalentiere"],
      tipp: "Gut in Qualität. Zutat für Surf'n'Turf (Q4)."
    },
    { id: "sumpfige_leckereien", name: "Sumpfige Leckereien", englisch: "Swampy Delights",
      geraet: "Elektrogrill", pack: "spacedOut",      kcalAusgang: 2240, qualitaet: 1,
      haltbarkeit: 8,   zutaten: ["1 kg Moorgelee (Mooreimer, Spaced Out!)"],
      tipp: "Spaced Out! Exklusiv. Mooreimer-Farm benötigt."
    },
    { id: "roast_grubfrucht", name: "Gebratene Wühlfruchtnuss", englisch: "Roast Grubfruit Nut",
      geraet: "Elektrogrill", pack: "spacedOut",      kcalAusgang: 1200, qualitaet: 1,
      haltbarkeit: 8,   zutaten: ["1 kg Spindeldürre Wühlfrucht"],
      tipp: "Spaced Out! Exklusiv. Schwefel für Pflanze nötig."
    },
    { id: "wuehlfruchtkonserve", name: "Wühlfruchtkonserve", englisch: "Grubfruit Preserve",
      geraet: "Elektrogrill", pack: "spacedOut",      kcalAusgang: 2400, qualitaet: 3,
      haltbarkeit: 50,  zutaten: ["8 kg Wühlfrucht (Wühlfruchtpflanze)", "4 kg Sucrose (Sweetle)"],
      tipp: "Spaced Out! Sehr lange haltbar (50 Zyklen). Sweetle-Ranch für Sucrose nötig."
    },
    { id: "geröstetes_mimillet", name: "Geröstetes Mimillet", englisch: "Toasted Mimillet",
      geraet: "Elektrogrill", pack: "prehistoricPlanet", kcalAusgang: 1500, qualitaet: 1,
      haltbarkeit: 8,   zutaten: ["1 Mimillet (Mimika-Pflanze + Bestäubung)"],
      tipp: "Prehistoric Planet. Mimika-Buds + Mimika-Tier für Bestäubung nötig."
    },
    { id: "stechapfelspies",  name: "Stechapfel Spieß",        englisch: "Pikeapple Skewer",
      geraet: "Elektrogrill", pack: "frostyPlanet",   kcalAusgang: 1200, qualitaet: 1,
      haltbarkeit: 8,   zutaten: ["1 Stechapfel (Stechapfelstrauch, FP)"],
      tipp: "Frosty Planet. Einfach herzustellen – Kältebereich (-55°C bis -14°C) nötig."
    },
    // ─ Gasherd ─
    { id: "gefuellte_beere",  name: "Gefüllte Beere",         englisch: "Stuffed Berry",
      geraet: "Gasherd",      pack: "vanilla",        kcalAusgang: 4400, qualitaet: 4,
      haltbarkeit: 8,   zutaten: ["2 kg Knorpelbeere (Elektrogrill)", "2 kg Pinchapfeffer-Nuss"],
      tipp: "Großartig! Kombiniert Dornenblüte + Pinchapfeffer-Pflanze."
    },
    { id: "pilzwrap",         name: "Pilzwrap",               englisch: "Mushroom Wrap",
      geraet: "Gasherd",      pack: "vanilla",        kcalAusgang: 4800, qualitaet: 4,
      haltbarkeit: 8,   zutaten: ["1 kg Frittierter Pilz (Elektrogrill)", "4 kg Salat (Wasserkraut)"],
      tipp: "Viel Salat benötigt (4 kg). Wasserkraut-Farm + Dämmerkappe kombinieren."
    },
    { id: "surf_turf",        name: "Surf'n'Turf",            englisch: "Surf'n'Turf",
      geraet: "Gasherd",      pack: "vanilla",        kcalAusgang: 6000, qualitaet: 4,
      haltbarkeit: 8,   zutaten: ["1 kg Barbeque (Elektrogrill)", "1 kg Gekochte Meeresfrüchte"],
      tipp: "Braucht Land- UND Wasservieh. Sehr gute Kalorien!"
    },
    { id: "pfefferbrot",      name: "Pfefferbrot",            englisch: "Pepper Bread",
      geraet: "Gasherd",      pack: "vanilla",        kcalAusgang: 4000, qualitaet: 5,
      haltbarkeit: 8,   zutaten: ["10 Graupelweizenkörner ODER Wedelkörner", "1 kg Pinchapfeffer-Nuss"],
      tipp: "Hervorragende Qualität! Viel Graupelweizen oder Riesenwedel nötig."
    },
    { id: "pilzquiche",       name: "Pilzquiche",             englisch: "Mushroom Quiche",
      geraet: "Gasherd",      pack: "vanilla",        kcalAusgang: 6400, qualitaet: 5,
      haltbarkeit: 8,   zutaten: ["1 kg Omelett (Elektrogrill)", "1 kg Salat", "1 kg Frittierter Pilz"],
      tipp: "Hervorragend! Höchste Kalorien unter den Q5-Rezepten."
    },
    { id: "pikanter_tofu",    name: "Pikanter Tofu",          englisch: "Spicy Tofu",
      geraet: "Gasherd",      pack: "vanilla",        kcalAusgang: 4000, qualitaet: 5,
      haltbarkeit: 8,   zutaten: ["1 kg Tofu (Mikrobenmatscher)", "1 kg Pinchapfeffer-Nuss"],
      tipp: "Veganes High-End-Essen! Happspross + Pinchapfeffer kombinieren."
    },
    { id: "frostburger",      name: "Frostburger",            englisch: "Frost Burger",
      geraet: "Gasherd",      pack: "vanilla",        kcalAusgang: 6000, qualitaet: 5,
      haltbarkeit: 8,   zutaten: ["1 Frostbrötchen (Elektrogrill)", "1 kg Salat", "1 kg Barbeque"],
      tipp: "Hervorragend! Braucht Graupelweizen + Wasserkraut + Fleisch."
    },
    { id: "currybohnen",      name: "Currybohnen",            englisch: "Curried Beans",
      geraet: "Gasherd",      pack: "vanilla",        kcalAusgang: 5000, qualitaet: 4,
      haltbarkeit: 8,   zutaten: ["4 Tonikwurzel (Tonic Root)", "4 Happsbohnen"],
      tipp: "Toll! Happspross-Farm + Tonikwurzel-Quelle nötig."
    },
    { id: "beerkuchen",       name: "Gemischter Beerenkuchen", englisch: "Mixed Berry Pie",
      geraet: "Gasherd",      pack: "spacedOut",      kcalAusgang: 4200, qualitaet: 5,
      haltbarkeit: 8,   zutaten: ["3 Körner", "4 kg Wühlfrucht", "1 kg Knorpelbeere"],
      tipp: "Spaced Out! Hervorragend. Spindeldürre Wühlfruchtpflanze + Dornenblüte + Körner."
    },
    // ─ Fritteuse (Frosty Planet Pack) ─
    { id: "ruebenpommes",     name: "Rübenpommes",            englisch: "Squash Fries",
      geraet: "Fritteuse",     pack: "frostyPlanet",   kcalAusgang: 5400, qualitaet: 3,
      haltbarkeit: 8,   zutaten: ["1 kg Federrübe (Federrübenpflanze)", "1 kg Fett"],
      tipp: "Frosty Planet. Sehr hohe Kalorien (5.400 kcal)! Gute Effizienz."
    },
    { id: "happs_miam",       name: "Happs Miam",            englisch: "Nosh Noms",
      geraet: "Fritteuse",     pack: "frostyPlanet",   kcalAusgang: 5000, qualitaet: 3,
      haltbarkeit: 8,   zutaten: ["6 Happsbohnen (Happspross)", "1 kg Fett"],
      tipp: "Happspross ist Basisspiel-Pflanze, Fritteuse braucht Frosty Planet Pack."
    },
    { id: "fisch_taco",       name: "Fisch Taco",             englisch: "Fish Taco",
      geraet: "Fritteuse",     pack: "frostyPlanet",   kcalAusgang: 4200, qualitaet: 4,
      haltbarkeit: 8,   zutaten: ["1 kg Pacu-Filet", "2 Körner", "2,4 kg Fett"],
      tipp: "Toll! Pacu-Ranch + Getreide + Fett kombinieren."
    },
    { id: "schalentier_tempura", name: "Schalentier-Tempura", englisch: "Shellfish Tempura",
      geraet: "Fritteuse",     pack: "frostyPlanet",   kcalAusgang: 4200, qualitaet: 4,
      haltbarkeit: 8,   zutaten: ["1 kg Rohe Schalentiere (Zapfrobbe/Pokepanzer)", "2 Körner", "2,4 kg Fett"],
      tipp: "Wie Fisch Taco aber mit Schalentieren. Zapfrobbe aus Frosty Planet Pack nutzen."
    },
    // ─ Smoker (Prehistoric Planet Pack) ─
    { id: "zartes_bruststueck", name: "Zartes Bruststück",    englisch: "Tender Brisket",
      geraet: "Smoker",  pack: "prehistoricPlanet", kcalAusgang: 16000, qualitaet: 5,
      haltbarkeit: 8,   zutaten: ["6 kg Zähes Fleisch (Lumba/Rhex)", "100 kg Torf/Holz (Brennstoff)"],
      tipp: "Prehistoric Planet. Massiver Kalorienertrag (16.000 kcal)! Lumba-Ranch empfohlen."
    },
    { id: "geraeucherter_fisch", name: "Geräucherter Fisch",  englisch: "Smoked Fish",
      geraet: "Smoker",  pack: "prehistoricPlanet", kcalAusgang: 11200, qualitaet: 4,
      haltbarkeit: 8,   zutaten: ["6.000 kcal Pacu-Filet ODER Jawbo-Filet", "100 kg Torf/Holz"],
      tipp: "Jawbo aus PP oder normaler Pacu verwendbar. Sehr hohe Kalorien."
    },
    { id: "gemuesepuffer",    name: "Gemüsepuffer",           englisch: "Veggie Poppers",
      geraet: "Smoker",  pack: "prehistoricPlanet", kcalAusgang: 11450, qualitaet: 4,
      haltbarkeit: 8,   zutaten: ["5.600 kcal Gemüse (Schweißkorn / Stechapfel / Spindeldürre Wühlfrucht)", "100 kg Torf/Holz"],
      tipp: "Vegetarische Option für Smoker. Schweißkornstängel liefert schnell Biomasse."
    }
  ],

  // ── STROM ─────────────────────────────────────────────────
  strom: {
    generatoren: [
      { id:"gen_hamster",    name:"Hamsterrad",           englisch:"Manual Generator",      icon:"🏃", img:BASE_IMG+"Manual_Generator.png",      watt:400,  brennstoff:"Duplikant-Arbeit",        pack:"vanilla",          dauerverbraucher:false },
      { id:"gen_kohle",      name:"Kohle-Generator",       englisch:"Coal Generator",         icon:"🪨", img:BASE_IMG+"Coal_Generator.png",        watt:600,  brennstoff:"1,2 kg Kohle/Zyklus",    pack:"vanilla",          dauerverbraucher:true  },
      { id:"gen_petrol",     name:"Petroleum-Generator",   englisch:"Petroleum Generator",   icon:"⛽", img:BASE_IMG+"Petroleum_Generator.png",   watt:2000, brennstoff:"2 kg Petroleum/Zyklus",  pack:"vanilla",          dauerverbraucher:true  },
      { id:"gen_erdgas",     name:"Erdgas-Generator",      englisch:"Natural Gas Generator", icon:"🔥", img:BASE_IMG+"Natural_Gas_Generator.png", watt:800,  brennstoff:"90 g Erdgas/Sek",        pack:"vanilla",          dauerverbraucher:true  },
      { id:"gen_wasserstoff",name:"Wasserstoff-Generator", englisch:"Hydrogen Generator",    icon:"💠", img:BASE_IMG+"Hydrogen_Generator.png",    watt:800,  brennstoff:"100 g H₂/Sek",           pack:"vanilla",          dauerverbraucher:true  },
      { id:"gen_solar",      name:"Solarmodul",           englisch:"Solar Panel",            icon:"☀️", img:BASE_IMG+"Solar_Panel.png",           watt:380,  brennstoff:"Sonnenlicht (Weltraum)", pack:"vanilla",          dauerverbraucher:false },
      { id:"gen_dampf",      name:"Dampfturbine",         englisch:"Steam Turbine",          icon:"♨️", img:BASE_IMG+"Steam_Turbine.png",         watt:850,  brennstoff:"Dampf 125–200°C",        pack:"vanilla",          dauerverbraucher:false },
      { id:"gen_nuclear",    name:"Forschungsreaktor",          englisch:"Research Reactor",        icon:"☢️", img:BASE_IMG+"Research_Reactor.png",       watt:9000, brennstoff:"Angereichertes Uran",    pack:"spacedOut",        dauerverbraucher:true  }
    ],
    verbraucher: [
      { id:"vb_elektrolyseur",    name:"Elektrolyseur",          englisch:"Electrolyzer",            icon:"⚗️", img:BASE_IMG+"Electrolyzer.png",           kat:"🫁 Lebenserhaltung",    watt:120,  pack:"vanilla",          dauerverbraucher:true,  tipp:"O₂+H₂ Erzeugung: 53 kg O₂/Zyklus. Braucht Wasser." },
      { id:"vb_kohleabscheider",  name:"Luftreiniger", englisch:"Carbon Skimmer",          icon:"☁️", img:BASE_IMG+"Carbon_Skimmer.png",         kat:"🫁 Lebenserhaltung",    watt:120,  pack:"vanilla",          dauerverbraucher:true,  tipp:"Entfernt CO₂ aus der Luft. Braucht Wasser." },
      { id:"vb_oxyl",             name:"Sauerstoff-Diffusor",         englisch:"Oxygen Diffuser",         icon:"🌀", img:BASE_IMG+"Oxygen_Diffuser.png",        kat:"🫁 Lebenserhaltung",    watt:120,  pack:"vanilla",          dauerverbraucher:true,  tipp:"Einfache O₂-Quelle aus Algen. 90 g/s O₂." },
      { id:"vb_wasseraufber",     name:"Flüssigkeitsfilter",      englisch:"Water Sieve",          icon:"💧", img:BASE_IMG+"Water_Sieve.png",         kat:"🫁 Lebenserhaltung",    watt:120,  pack:"vanilla",          dauerverbraucher:false, tipp:"Reinigt Schmutzwasser zu Wasser." },
      { id:"vb_mikrobenmatscher", name:"Mikrobenmatscher",       englisch:"Microbe Musher",          icon:"🧪", img:BASE_IMG+"Microbe_Musher.png",         kat:"🍽️ Nahrungsproduktion", watt:60,   pack:"vanilla",          dauerverbraucher:false, tipp:"Einfache Rezepte. Nur bei Bedarf aktiv." },
      { id:"vb_grill",            name:"Elektrogrill",           englisch:"Electric Grill",          icon:"🔥", img:BASE_IMG+"Electric_Grill.png",         kat:"🍽️ Nahrungsproduktion", watt:60,   pack:"vanilla",          dauerverbraucher:false, tipp:"Mittlere Rezepte. Basis für Gasherd-Kombinationen." },
      { id:"vb_gasherd",          name:"Gasherd",                englisch:"Gas Range",               icon:"🍽️",img:BASE_IMG+"Gas_Range.png",              kat:"🍽️ Nahrungsproduktion", watt:0,    pack:"vanilla",          dauerverbraucher:false, tipp:"Kein Strom! Benötigt Erdgas oder Wasserstoff." },
      { id:"vb_friteuse",         name:"Fritteuse",               englisch:"Deep Fryer",              icon:"🛢️",img:BASE_IMG+"Deep_Fryer.png",             kat:"🍽️ Nahrungsproduktion", watt:60,   pack:"frostyPlanet",     dauerverbraucher:false, tipp:"Frosty Planet. Hochkalorische Rezepte mit Fett." },
      { id:"vb_raeucherofen",     name:"Smoker",            englisch:"Smoker",                  icon:"💨", img:BASE_IMG+"Smoker.png",                 kat:"🍽️ Nahrungsproduktion", watt:0,    pack:"prehistoricPlanet",dauerverbraucher:false, tipp:"Kein Strom. PP-Exklusiv. Benötigt Torf/Holz." },
      { id:"vb_aquatuner",        name:"Wasserkühler",              englisch:"Thermo Aquatuner",        icon:"❄️", img:BASE_IMG+"Thermo_Aquatuner.png",       kat:"🧊 Temperatur",         watt:1200, pack:"vanilla",          dauerverbraucher:false, tipp:"Kühlt Flüssigkeiten -14°C/Durchgang. Schweres Kabel!" },
      { id:"vb_thermo_reg",       name:"Klimagerät",          englisch:"Thermo Regulator",        icon:"🌡️",img:BASE_IMG+"Thermo_Regulator.png",       kat:"🧊 Temperatur",         watt:960,  pack:"vanilla",          dauerverbraucher:false, tipp:"Kühlt Gas -14°C/Durchgang." },
      { id:"vb_kuehlschrank",     name:"Kühlschrank",            englisch:"Refrigerator",            icon:"🧊", img:BASE_IMG+"Refrigerator.png",           kat:"🧊 Temperatur",         watt:120,  pack:"vanilla",          dauerverbraucher:true,  tipp:"Verlängert Haltbarkeit von Nahrung massiv." },
      { id:"vb_forschung",        name:"Forschungsstation",      englisch:"Research Station",        icon:"🔬", img:BASE_IMG+"Research_Station.png",       kat:"🔬 Forschung & Bau",    watt:100,  pack:"vanilla",          dauerverbraucher:false, tipp:"Basisforschung." },
      { id:"vb_fab_super",        name:"Super-Computer",          englisch:"Super Computer",          icon:"🖥️",img:BASE_IMG+"Super_Computer.png",         kat:"🔬 Forschung & Bau",    watt:120,  pack:"vanilla",          dauerverbraucher:false, tipp:"Fortgeschrittene Forschung." },
      { id:"vb_metallraffinerie", name:"Metallraffinerie",       englisch:"Metal Refinery",          icon:"🏭", img:BASE_IMG+"Metal_Refinery.png",         kat:"🔬 Forschung & Bau",    watt:1200, pack:"vanilla",          dauerverbraucher:false, tipp:"Schmilzt Erze. Schweres Kabel empfohlen!" },
      { id:"vb_glasofen",         name:"Glasschmiede",               englisch:"Glass Forge",             icon:"🫧", img:BASE_IMG+"Glass_Forge.png",            kat:"🔬 Forschung & Bau",    watt:800,  pack:"vanilla",          dauerverbraucher:false, tipp:"Produziert Glas aus Sand." },
      { id:"vb_polymerpresse",    name:"Polymer-Presse",          englisch:"Polymer Press",           icon:"🔷", img:BASE_IMG+"Polymer_Press.png",          kat:"🔬 Forschung & Bau",    watt:240,  pack:"vanilla",          dauerverbraucher:false, tipp:"Plastik aus Petroleum." },
      { id:"vb_dusche",           name:"Dusche",            englisch:"Shower",                  icon:"🚿", img:BASE_IMG+"Shower.png",                 kat:"🚿 Hygiene",            watt:0,    pack:"vanilla",          dauerverbraucher:false, tipp:"Kein Strom. Wasser → Schmutzwasser." },
      { id:"vb_waschbecken",      name:"Waschbecken",            englisch:"Sink",                    icon:"🪣", img:BASE_IMG+"Sink.png",                   kat:"🚿 Hygiene",            watt:0,    pack:"vanilla",          dauerverbraucher:false, tipp:"Kein Strom. Hygienepunkt." },
      { id:"vb_toilette",         name:"Plumpsklo",              englisch:"Outhouse",                icon:"🚽", img:BASE_IMG+"Outhouse.png",               kat:"🚿 Hygiene",            watt:0,    pack:"vanilla",          dauerverbraucher:false, tipp:"Kein Strom. Basistoilette." },
      { id:"vb_spueltoilette",    name:"Toilette",           englisch:"Lavatory",            icon:"🚽", img:BASE_IMG+"Lavatory.png",           kat:"🚿 Hygiene",            watt:0,    pack:"vanilla",          dauerverbraucher:false, tipp:"Kein Strom. Braucht Wasser." },
      { id:"vb_lampe",            name:"Deckenlampe",            englisch:"Ceiling Light",           icon:"💡", img:BASE_IMG+"Ceiling_Light.png",          kat:"💡 Beleuchtung",        watt:10,   pack:"vanilla",          dauerverbraucher:true,  tipp:"4×4 Tiles. Pflicht für Dornenblüte (≥200 Lux)." },
      { id:"vb_lichtstab",        name:"Lampe",             englisch:"Lamp",              icon:"🕯️",img:BASE_IMG+"Lamp.png",             kat:"💡 Beleuchtung",        watt:10,   pack:"vanilla",          dauerverbraucher:true,  tipp:"Bodenlampe. Breitere Ausleuchtung." },
      { id:"vb_gaspumpe",         name:"Gaspumpe",               englisch:"Gas Pump",                icon:"💨", img:BASE_IMG+"Gas_Pump.png",               kat:"⚙️ Pumpen & Transport", watt:240,  pack:"vanilla",          dauerverbraucher:false, tipp:"500 g/s Gas. Nur bei Bedarf." },
      { id:"vb_fluessigpumpe",    name:"Flüssigkeitspumpe",      englisch:"Liquid Pump",             icon:"💧", img:BASE_IMG+"Liquid_Pump.png",            kat:"⚙️ Pumpen & Transport", watt:240,  pack:"vanilla",          dauerverbraucher:false, tipp:"10 kg/s Flüssigkeit. Nur bei Bedarf." },
      { id:"vb_kleingaspumpe",    name:"Mini-Gaspumpe",        englisch:"Mini Gas Pump",           icon:"🌬️",img:BASE_IMG+"Mini_Gas_Pump.png",          kat:"⚙️ Pumpen & Transport", watt:60,   pack:"vanilla",          dauerverbraucher:false, tipp:"125 g/s Gas. Günstig und kompakt." },
      { id:"vb_foerderband",      name:"Förderschienen-Belader",    englisch:"Conveyor Loader",        icon:"📦", img:BASE_IMG+"Conveyor_Loader.png",       kat:"⚙️ Pumpen & Transport", watt:120,  pack:"vanilla",          dauerverbraucher:false, tipp:"Raketenfracht laden/entladen." },
      { id:"vb_transformator",    name:"Kleiner Transformator",          englisch:"Power Transformer",       icon:"🔌", img:BASE_IMG+"Power_Transformer.png",      kat:"🔌 Elektrik",           watt:0,    pack:"vanilla",          dauerverbraucher:false, tipp:"Verbindet Kreise. Max. 1.000W." },
      { id:"vb_transfomator_lg",  name:"Großer Transformator",   englisch:"Large Power Transformer", icon:"🔌", img:BASE_IMG+"Large_Power_Transformer.png",kat:"🔌 Elektrik",           watt:0,    pack:"vanilla",          dauerverbraucher:false, tipp:"Max. 4.000W." },
      { id:"vb_akku_klein",       name:"Batterie",           englisch:"Battery",           icon:"🔋", img:BASE_IMG+"Battery.png",          kat:"🔌 Elektrik",           watt:0,    pack:"vanilla",          dauerverbraucher:false, tipp:"Kapazität: 10 kJ." },
      { id:"vb_akku_gross",       name:"Intelligente Batterie",           englisch:"Smart Battery",           icon:"🔋", img:BASE_IMG+"Smart_Battery.png",          kat:"🔌 Elektrik",           watt:0,    pack:"vanilla",          dauerverbraucher:false, tipp:"Kapazität: 20 kJ. Automatisierbar." }
    ]
  }

};
