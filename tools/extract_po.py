# ============================================================
# ONI Kalkulator – Werkzeug: strings.po -> i18n/de.json
# + Namensabgleich der Website-Daten gegen das dt. Sprachpaket
#
# Aufruf:  python tools/extract_po.py <pfad-zu-strings.po> [pairs.json]
# Schreibt: i18n/de.json (EN->DE Wörterbuch, relevante Kategorien)
# ============================================================
import json
import re
import sys
import os

TAG_RE = re.compile(r"<[^>]+>")          # <link=...>, <style=...>, </...>
RELEVANTE_FAMILIEN = (
    "STRINGS.CREATURES.SPECIES.",        # Pflanzen + Tiere
    "STRINGS.ITEMS.FOOD.",               # Nahrungsmittel/Rezepte
    "STRINGS.ITEMS.INGREDIENTS.",
    "STRINGS.BUILDINGS.PREFABS.",        # Gebäude
    "STRINGS.ELEMENTS.",                 # Materialien/Elemente
    "STRINGS.DUPLICANTS.TRAITS.",        # Eigenschaften (AP2)
    "STRINGS.DUPLICANTS.ATTRIBUTES.",    # Attribute/Skills (AP2)
    "STRINGS.DUPLICANTS.DISEASES.",      # Krankheiten (AP2)
    "STRINGS.DISEASES.",
    "STRINGS.MISC.TAGS.",                # Rohstoff-Tags (Fleisch, Ei, ...)
)


def po_lesen(pfad):
    """Liest eine .po und liefert Liste (msgctxt, msgid, msgstr)."""
    eintraege = []
    ctxt = mid = mstr = None
    modus = None

    def ablegen():
        nonlocal ctxt, mid, mstr
        if ctxt and mid and mstr:
            eintraege.append((ctxt, mid, mstr))
        ctxt = mid = mstr = None

    with open(pfad, encoding="utf-8-sig") as f:
        for zeile in f:
            zeile = zeile.strip()
            if zeile.startswith("msgctxt "):
                ablegen()
                ctxt = json.loads(zeile[8:])
                modus = "ctxt"
            elif zeile.startswith("msgid "):
                mid = json.loads(zeile[6:])
                modus = "id"
            elif zeile.startswith("msgstr "):
                mstr = json.loads(zeile[7:])
                modus = "str"
            elif zeile.startswith('"'):
                teil = json.loads(zeile)
                if modus == "id":
                    mid = (mid or "") + teil
                elif modus == "str":
                    mstr = (mstr or "") + teil
    ablegen()
    return eintraege


def saeubern(text):
    """Entfernt <link>/<style>-Tags, weiche Bindestriche und doppelte Leerzeichen."""
    text = TAG_RE.sub("", text).replace("­", "")
    return re.sub(r"\s+", " ", text).strip()


def main():
    po_pfad = sys.argv[1] if len(sys.argv) > 1 else "strings.po"
    pairs_pfad = sys.argv[2] if len(sys.argv) > 2 else None
    projekt = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    eintraege = po_lesen(po_pfad)
    print(f"strings.po gelesen: {len(eintraege)} Einträge gesamt")

    # EN->DE Wörterbuch nur für .NAME-Schlüssel relevanter Familien
    en_zu_de = {}
    nach_schluessel = {}
    for ctxt, mid, mstr in eintraege:
        if not ctxt.endswith(".NAME"):
            continue
        if not any(ctxt.startswith(f) for f in RELEVANTE_FAMILIEN):
            continue
        en = saeubern(mid)
        de = saeubern(mstr)
        if not en or not de:
            continue
        nach_schluessel[ctxt] = {"en": en, "de": de}
        en_zu_de.setdefault(en.lower(), de)

    print(f"Relevante .NAME-Einträge: {len(nach_schluessel)}")

    i18n_dir = os.path.join(projekt, "i18n")
    os.makedirs(i18n_dir, exist_ok=True)
    ausgabe = {
        "_hinweis": "GENERIERT aus strings.po (Workshop 929139073) – NICHT von Hand ändern. Neu erzeugen: python tools/extract_po.py",
        "enZuDe": en_zu_de,
        "schluessel": nach_schluessel,
    }
    ziel = os.path.join(i18n_dir, "de.json")
    with open(ziel, "w", encoding="utf-8") as f:
        json.dump(ausgabe, f, ensure_ascii=False, indent=1)
    print(f"geschrieben: {ziel} ({os.path.getsize(ziel)//1024} KB)")

    # ── Abgleich mit Website-Namen ──────────────────────────
    if pairs_pfad:
        with open(pairs_pfad, encoding="utf-8") as f:
            paare = json.load(f)
        fehlt, falsch, ok = [], [], 0
        for p in paare:
            en = (p.get("en") or "").strip().lower()
            if not en:
                continue
            soll = en_zu_de.get(en)
            if soll is None:
                fehlt.append(p)
            elif soll.lower() != p["de"].strip().lower():
                falsch.append({**p, "soll": soll})
            else:
                ok += 1
        print(f"\nABGLEICH: {ok} korrekt · {len(falsch)} abweichend · {len(fehlt)} nicht im Sprachpaket gefunden")
        if falsch:
            print("\n-- ABWEICHUNGEN (Website -> Sprachpaket) --")
            for p in falsch:
                print(f"  [{p['typ']}] {p['en']}: '{p['de']}'  ->  '{p['soll']}'")
        if fehlt:
            print("\n-- NICHT GEFUNDEN (evtl. anderer engl. Name) --")
            for p in fehlt:
                print(f"  [{p['typ']}] {p['en']} ('{p['de']}')")


if __name__ == "__main__":
    main()
