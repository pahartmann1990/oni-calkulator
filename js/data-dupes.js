// ============================================================
// ONI KALKULATOR – Duplikanten-Daten (AP2)
// Traits + Krankheiten. Deutsche Namen: offizielles Sprachpaket
// (Workshop 929139073). Effekte: oxygennotincluded.wiki.gg
// Basiswerte pro Duplikant (Standard-Schwierigkeit):
//   Kalorien 1.000 kcal/Zyklus · Sauerstoff 100 g/s (= 60 kg/Zyklus)
//   CO₂-Ausstoß 2 g/s (= 1,2 kg/Zyklus)
// ============================================================

// Eigenschaften (Traits) – kcalZyklus & o2GproS sind ZUSCHLÄGE auf die Basis
ONI.traits = [
  { id: "calorieburner",  name: "Bodenloser Magen",  englisch: "Bottomless Stomach",
    kcalZyklus: 500, o2GproS: 0,
    info: "+500 kcal Bedarf pro Zyklus", quelle: "wiki/Traits" },
  { id: "mouthbreather",  name: "Mundatmer",          englisch: "Mouth Breather",
    kcalZyklus: 0, o2GproS: 100,
    info: "Verdoppelt den Sauerstoffverbrauch (200 g/s)", quelle: "wiki/Traits" },
  { id: "diverslung",     name: "Taucherlunge",       englisch: "Diver's Lungs",
    kcalZyklus: 0, o2GproS: -25,
    info: "Nur 75 g/s Sauerstoffverbrauch", quelle: "wiki/Traits" },
  { id: "gourmet",        name: "Gourmet",            englisch: "Gourmet",
    kcalZyklus: 0, o2GproS: 0,
    info: "Erwartet hohe Speisenqualität (Moral)", quelle: "wiki/Traits" },
  { id: "simpletastes",   name: "Geschrumpfte Geschmacksnerven", englisch: "Shrivelled Tastebuds",
    kcalZyklus: 0, o2GproS: 0,
    info: "Speisenqualität-Erwartung −1 (anspruchslos)", quelle: "wiki/Traits" },
  { id: "irongut",        name: "Magen aus Stahl",    englisch: "Iron Gut",
    kcalZyklus: 0, o2GproS: 0,
    info: "Keine Lebensmittelvergiftung durch rohes Essen", quelle: "wiki/Traits" },
  { id: "flatulence",     name: "Flatulenzen",        englisch: "Flatulent",
    kcalZyklus: 0, o2GproS: 0,
    info: "Gibt regelmäßig Erdgas ab (~5 g alle ~10 s)", quelle: "wiki/Traits" },
  { id: "smallbladder",   name: "Kleine Blase",       englisch: "Small Bladder",
    kcalZyklus: 0, o2GproS: 0,
    info: "Muss häufiger zur Toilette", quelle: "wiki/Traits" },
  { id: "anemic",         name: "Anämisch",           englisch: "Anemic",
    kcalZyklus: 0, o2GproS: 0,
    info: "Athletik −5 (läuft langsamer)", quelle: "wiki/Traits" },
  { id: "narcolepsy",     name: "Narkoleptisch",      englisch: "Narcoleptic",
    kcalZyklus: 0, o2GproS: 0,
    info: "Schläft zufällig ein", quelle: "wiki/Traits" },
  { id: "nightowl",       name: "Nachteule",          englisch: "Night Owl",
    kcalZyklus: 0, o2GproS: 0,
    info: "Arbeitet nachts besser, tagsüber −3", quelle: "wiki/Traits" },
  { id: "earlybird",      name: "Frühaufsteher",      englisch: "Early Bird",
    kcalZyklus: 0, o2GproS: 0,
    info: "Morgens +2 auf alles", quelle: "wiki/Traits" },
  { id: "snorer",         name: "Schnarcher",         englisch: "Loud Sleeper",
    kcalZyklus: 0, o2GproS: 0,
    info: "Weckt andere im Schlafraum", quelle: "wiki/Traits" },
  { id: "greenthumb",     name: "Grüner Daumen",      englisch: "Green Thumb",
    kcalZyklus: 0, o2GproS: 0,
    info: "Landwirtschaft +2, Interesse an Pflanzen", quelle: "wiki/Traits" },
  { id: "germresistant",  name: "Keimresistent",      englisch: "Germ Resistant",
    kcalZyklus: 0, o2GproS: 0,
    info: "Erkrankt seltener", quelle: "wiki/Traits" },
  { id: "biohazardous",   name: "Biogefährdung",      englisch: "Biohazardous",
    kcalZyklus: 0, o2GproS: 0,
    info: "Erkrankt leichter (schwaches Immunsystem)", quelle: "wiki/Traits" }
];

// Krankheiten – Effekte sind im Spiel v. a. Produktivität/Stress;
// wo keine gesicherte Zahl existiert, NUR Info-Text (kein erfundener Wert!)
ONI.krankheiten = [
  { id: "gesund",          name: "Gesund",                    englisch: "Healthy",
    info: "Keine Einschränkungen" },
  { id: "foodsickness",    name: "Lebensmittelvergiftung",    englisch: "Food Poisoning",
    info: "Häufige Toilettengänge, Ausdauer sinkt stark – Dupe fällt teils aus. Quelle: verkeimtes Wasser/Essen" },
  { id: "slimesickness",   name: "Schleimlunge",              englisch: "Slimelung",
    info: "Husten, Arbeit unterbrochen, braucht Medizin/Krankenstation. Quelle: Schleim-Keime in der Luft" },
  { id: "allergies",       name: "Allergische Reaktion",      englisch: "Allergic Reaction",
    info: "Dauerniesen, Produktivität sinkt. Quelle: Blumenduft (Pollen)" },
  { id: "sunburnsickness", name: "Sonnenbrand",               englisch: "Sunburn",
    info: "+Stress, unangenehm. Quelle: direktes Sonnenlicht" },
  { id: "zombiesickness",  name: "Zombiesporen",              englisch: "Zombie Spores",
    info: "SCHWER: alle Attribute massiv reduziert, sofort behandeln! Quelle: Sporenblüte im Ölbiom" },
  { id: "radiationsickness", name: "Strahlenkrankheit",       englisch: "Radiation Sickness",
    info: "Erbrechen, Ausfall – Strahlenquelle meiden, Rad-Tabletten. (Spaced Out!)" }
];

// Basisbedarf eines Duplikanten (Standard-Schwierigkeit, Quelle: wiki)
ONI.dupeBasis = {
  kcalZyklus: 1000,
  o2GproS: 100,       // 60 kg/Zyklus
  co2GproS: 2         // 1,2 kg/Zyklus
};
