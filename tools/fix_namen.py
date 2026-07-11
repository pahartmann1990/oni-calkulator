# ============================================================
# Einmaliges Korrektur-Skript: deutsche Namen in js/data.js an
# das offizielle Sprachpaket (Workshop 929139073) angleichen.
# Bricht ab, wenn eine Ersetzung nicht EXAKT wie erwartet passt.
# ============================================================
import io
import sys
import os

PROJEKT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATEI = os.path.join(PROJEKT, "js", "data.js")

# (alt, neu, erwartete_anzahl)
ERSETZUNGEN = [
    # ── Pflanzen ──
    ('name: "Balsamlilien"', 'name: "Balsamlilie"', 1),
    ('"Oxyfarn"', '"Oxifarn"', 1),                       # name-Zeile
    ('name: "Ovagro"', 'name: "Ovagro-Knoten"', 1),
    # ── Tiere ──
    ('name: "Muh"', 'name: "Gasende Muh"', 1),
    ('name: "Bammuth"', 'name: "Bammut"', 1),
    ('name: "Lumba"', 'name: "Lumb"', 1),
    ('englisch: "Lumba"', 'englisch: "Lumb"', 1),
    # ── Materialien (einzeilige Einträge, Name vor englisch) ──
    ('{ name: "Rohkupfererz"', '{ name: "Kupfererz"', 1),
    ('{ name: "Golderz",', '{ name: "Goldamalgam",', 1),
    ('{ name: "Niobium",', '{ name: "Niob",', 1),
    ('{ name: "Ablativgestein",', '{ name: "Magmatit",', 1),
    ('{ name: "Maficgestein",', '{ name: "Mafisches Gestein",', 1),
    # Ressource "Schmutzwasser": Materialtabelle + 3 Tier-/Pflanzen-Referenzen
    ('name: "Schmutzwasser"', 'name: "Verschmutztes Wasser"', 4),
    # CO₂: NUR der Materialtabellen-Eintrag (Referenzen behalten die Formel CO₂)
    ('name: "CO₂",                 englisch: "Carbon Dioxide"',
     'name: "Kohlendioxid",        englisch: "Carbon Dioxide"', 1),
    ('{ name: "Soleeis",', '{ name: "Sole-Eis",', 1),
    ('{ name: "Fossil",', '{ name: "Fossilien",', 1),
    ('{ name: "Sucrose",', '{ name: "Saccharose",', 1),
    ('{ name: "Fullerit",', '{ name: "Fulleren",', 1),
    ('name: "Schmutziger Sauerstoff", englisch: "Polluted O2"',
     'name: "Verschmutzter Sauerstoff", englisch: "Polluted Oxygen"', 1),
    ('name: "Flüssig-CO₂",', 'name: "Flüssiges Kohlendioxid",', 1),
    ('englisch: "Liquid CO2"', 'englisch: "Liquid Carbon Dioxide"', 1),
    ('name: "Kühlmittel", englisch: "Supercoolant"',
     'name: "Superkühlmittel", englisch: "Super Coolant"', 0),  # Formatvariante unbekannt -> unten Fallback
    ('englisch: "Hydrogen"', 'englisch: "Hydrogen Gas"', 1),
    ('name: "Chlor", englisch: "Chlorine"', 'name: "Chlorgas", englisch: "Chlorine Gas"', 0),
    ('name: "Kalkstein", englisch: "Limestone"', 'name: "Kalk", englisch: "Lime"', 0),
    # ── Strom (Format ohne Leerzeichen: name:"...") ──
    ('name:"Kohlegenerator"', 'name:"Kohle-Generator"', 1),
    ('name:"Petroleumgenerator"', 'name:"Petroleum-Generator"', 1),
    ('name:"Erdgasgenerator"', 'name:"Erdgas-Generator"', 1),
    ('name:"Wasserstoffgenerator"', 'name:"Wasserstoff-Generator"', 1),
    ('name:"Solarpanel"', 'name:"Solarmodul"', 1),
    ('name:"Atomreaktor"', 'name:"Forschungsreaktor"', 1),
    ('englisch:"Nuclear Reactor"', 'englisch:"Research Reactor"', 0),
    ('name:"Kohlensäure-Abscheider"', 'name:"Luftreiniger"', 1),
    ('name:"OXYL-Generator"', 'name:"Sauerstoff-Diffusor"', 1),
    ('name:"Wasseraufbereiter"', 'name:"Flüssigkeitsfilter"', 1),
    ('englisch:"Water Purifier"', 'englisch:"Water Sieve"', 0),
    ('name:"Friteuse"', 'name:"Fritteuse"', 1),
    ('name:"Räucherofen"', 'name:"Smoker"', 1),
    ('name:"Aquatuner"', 'name:"Wasserkühler"', 1),
    ('name:"Thermo-Regler"', 'name:"Klimagerät"', 1),
    ('name:"Supercomputer"', 'name:"Super-Computer"', 1),
    ('name:"Glasofen"', 'name:"Glasschmiede"', 1),
    ('name:"Polymerpresse"', 'name:"Polymer-Presse"', 1),
    ('name:"Duschkabine"', 'name:"Dusche"', 1),
    ('name:"Spültoilette"', 'name:"Toilette"', 1),
    ('englisch:"Flush Toilet"', 'englisch:"Lavatory"', 0),
    ('name:"Leuchtstab"', 'name:"Lampe"', 1),
    ('englisch:"Floor Lamp"', 'englisch:"Lamp"', 0),
    ('name:"Kleine Gaspumpe"', 'name:"Mini-Gaspumpe"', 1),
    ('name:"Pneumatischer Lader"', 'name:"Förderschienen-Belader"', 1),
    ('englisch:"Pneumatic Loader"', 'englisch:"Conveyor Loader"', 0),
    ('name:"Transformator"', 'name:"Kleiner Transformator"', 1),
    ('name:"Kleiner Akku"', 'name:"Batterie"', 1),
    ('englisch:"Small Battery"', 'englisch:"Battery"', 0),
    ('name:"Smarter Akku"', 'name:"Intelligente Batterie"', 1),
    # ── Rezepte (Hauptliste + eingebettete Pflanzen-Rezepte) ──
    ('name: "Stechapfelspieß"', 'name: "Stechapfel Spieß"', 2),
    ('name: "Happs-Miam"', 'name: "Happs Miam"', None),
    ('name: "Soufflé-Pfannkuchen"', 'name: "Soufflé Pfannkuchen"', 2),
    ('englisch: "Souffle Pancakes"', 'englisch: "Soufflé Pancakes"', 0),
    ('englisch: "Surf n Turf"', 'englisch: "Surf\'n\'Turf"', 0),
    # Rezept-Gerätereferenzen (geraet-Feld)
    ('geraet: "Friteuse"', 'geraet: "Fritteuse"', None),      # None = beliebig viele
    ('geraet: "Räucherofen"', 'geraet: "Smoker"', None),
]


def main():
    with io.open(DATEI, encoding="utf-8") as f:
        text = f.read()

    fehler = []
    protokoll = []
    for alt, neu, erwartet in ERSETZUNGEN:
        n = text.count(alt)
        if erwartet is None:
            if n > 0:
                text = text.replace(alt, neu)
            protokoll.append(f"  {n}x  {alt}  ->  {neu}")
        elif erwartet == 0:
            # optionale Ersetzung (Formatvariante): 0 oder 1 erlaubt
            if n > 1:
                fehler.append(f"MEHRDEUTIG ({n}x): {alt}")
            elif n == 1:
                text = text.replace(alt, neu)
                protokoll.append(f"  1x  {alt}  ->  {neu}")
            else:
                protokoll.append(f"  0x  (übersprungen) {alt}")
        else:
            if n != erwartet:
                fehler.append(f"ERWARTET {erwartet}x, GEFUNDEN {n}x: {alt}")
            else:
                text = text.replace(alt, neu)
                protokoll.append(f"  {n}x  {alt}  ->  {neu}")

    if fehler:
        print("ABBRUCH – nichts geschrieben. Probleme:")
        for f_ in fehler:
            print(" ", f_)
        sys.exit(1)

    with io.open(DATEI, "w", encoding="utf-8", newline="") as f:
        f.write(text)
    print("data.js aktualisiert. Ersetzungen:")
    print("\n".join(protokoll))


if __name__ == "__main__":
    main()
