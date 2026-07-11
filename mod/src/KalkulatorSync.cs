// ============================================================
// KalkulatorSync – Begleit-Mod zum ONI Kalkulator
// Schreibt alle 5 Sekunden den Kolonie-Zustand als JSON nach
//   %LOCALAPPDATA%\KalkulatorSync\colony_live.json
// NUR LESEND: patcht eine einzige Stelle (Game.Update),
// schreibt nichts in den Spielstand, sendet nichts ins Internet.
// Sprache: C# 5 (kompilierbar mit dem Windows-eigenen csc.exe)
// ============================================================
using System;
using System.Collections.Generic;
using System.IO;
using HarmonyLib;
using Newtonsoft.Json;
using UnityEngine;

namespace KalkulatorSync
{
    public class Mod : KMod.UserMod2
    {
        public override void OnLoad(Harmony harmony)
        {
            base.OnLoad(harmony);
            Debug.Log("[KalkulatorSync] geladen - exportiert colony_live.json alle 5 s");
        }
    }

    [HarmonyPatch(typeof(Game), "Update")]
    public static class Game_Update_Patch
    {
        private static float naechsterExport = 0f;

        public static void Postfix()
        {
            try
            {
                if (Time.unscaledTime < naechsterExport) return;
                naechsterExport = Time.unscaledTime + 5f;
                Exporter.Schreiben();
            }
            catch (Exception e)
            {
                // Ein Exportfehler darf NIE das Spiel beeinträchtigen
                Debug.LogWarning("[KalkulatorSync] Export fehlgeschlagen: " + e.Message);
            }
        }
    }

    public static class Exporter
    {
        public static void Schreiben()
        {
            if (Game.Instance == null || Components.LiveMinionIdentities == null) return;

            var daten = new Dictionary<string, object>();
            daten["modVersion"] = "1.0.0";
            // Kein Zeitstempel noetig: die Website liest die Frische am Datei-Aenderungsdatum ab
            daten["zyklus"] = GameClock.Instance != null ? GameClock.Instance.GetCycle() + 1 : 0;
            daten["zyklusProzent"] = GameClock.Instance != null ? Mathf.RoundToInt(GameClock.Instance.GetCurrentCycleAsPercentage() * 100f) : 0;

            var dupes = new List<Dictionary<string, object>>();
            foreach (MinionIdentity minion in Components.LiveMinionIdentities.Items)
            {
                if (minion == null) continue;
                var d = new Dictionary<string, object>();
                d["name"] = minion.GetProperName();
                d["kalorien"] = LiesAmount(minion, Db.Get().Amounts.Calories);
                d["gesundheit"] = LiesAmount(minion, Db.Get().Amounts.HitPoints);
                d["stress"] = LiesAmount(minion, Db.Get().Amounts.Stress);
                d["krankheiten"] = LiesKrankheiten(minion);
                d["traits"] = LiesTraits(minion);
                dupes.Add(d);
            }
            daten["anzahlDuplikanten"] = dupes.Count;
            daten["duplikanten"] = dupes;

            string json = JsonConvert.SerializeObject(daten, Formatting.Indented);
            string ordner = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "KalkulatorSync");
            Directory.CreateDirectory(ordner);
            string ziel = Path.Combine(ordner, "colony_live.json");
            string temp = ziel + ".tmp";
            // Atomar: erst komplett schreiben, dann umbenennen -> nie halbe Datei lesbar
            File.WriteAllText(temp, json);
            if (File.Exists(ziel)) File.Delete(ziel);
            File.Move(temp, ziel);
        }

        private static float LiesAmount(MinionIdentity minion, Klei.AI.Amount amount)
        {
            try
            {
                var inst = amount.Lookup(minion.gameObject);
                return inst != null ? inst.value : -1f;
            }
            catch (Exception) { return -1f; }
        }

        private static List<string> LiesKrankheiten(MinionIdentity minion)
        {
            var liste = new List<string>();
            try
            {
                var mods = minion.GetComponent<MinionModifiers>();
                if (mods != null && mods.sicknesses != null)
                {
                    foreach (var si in mods.sicknesses.ModifierList)
                    {
                        if (si != null && si.modifier != null) liste.Add(si.modifier.Name);
                    }
                }
            }
            catch (Exception) { }
            return liste;
        }

        private static List<string> LiesTraits(MinionIdentity minion)
        {
            var liste = new List<string>();
            try
            {
                var traits = minion.GetComponent<Klei.AI.Traits>();
                if (traits != null)
                {
                    foreach (var t in traits.TraitList)
                    {
                        if (t != null) liste.Add(t.Name);
                    }
                }
            }
            catch (Exception) { }
            return liste;
        }
    }
}
