# ============================================================
# KalkulatorSync bauen + in den ONI Dev-Mod-Ordner installieren
# Braucht KEINE Installation: nutzt den Windows-eigenen csc.exe
# Aufruf:  powershell -ExecutionPolicy Bypass -File build_mod.ps1
# ============================================================
$ErrorActionPreference = "Stop"

$spiel   = "E:\SteamLibrary\steamapps\common\OxygenNotIncluded\OxygenNotIncluded_Data\Managed"
$csc     = "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe"
$hier    = Split-Path -Parent $MyInvocation.MyCommand.Path
$build   = Join-Path $hier "build"
$devMods = Join-Path ([Environment]::GetFolderPath("MyDocuments")) "Klei\OxygenNotIncluded\mods\Dev\KalkulatorSync"

if (-not (Test-Path $spiel)) { throw "Spielordner nicht gefunden: $spiel" }
New-Item -ItemType Directory -Force $build | Out-Null

# WICHTIG: /nostdlib + BCL des Spiels, sonst Typkonflikte (netstandard-Facade)
$refs = @(
  "$spiel\mscorlib.dll",
  "$spiel\System.dll",
  "$spiel\System.Core.dll",
  "$spiel\netstandard.dll",
  "$spiel\Assembly-CSharp.dll",
  "$spiel\Assembly-CSharp-firstpass.dll",
  "$spiel\0Harmony.dll",
  "$spiel\Newtonsoft.Json.dll",
  "$spiel\UnityEngine.dll",
  "$spiel\UnityEngine.CoreModule.dll",
  "$spiel\UnityEngine.UI.dll"
) | ForEach-Object { "/reference:`"$_`"" }

Write-Host "Kompiliere KalkulatorSync.dll ..."
& $csc /nologo /noconfig /nostdlib+ /target:library /optimize+ `
  /out:"$build\KalkulatorSync.dll" `
  @refs `
  "$hier\src\KalkulatorSync.cs"
if ($LASTEXITCODE -ne 0) { throw "Kompilierung fehlgeschlagen (Code $LASTEXITCODE)" }

Write-Host "Installiere in Dev-Mod-Ordner: $devMods"
New-Item -ItemType Directory -Force $devMods | Out-Null
Copy-Item "$build\KalkulatorSync.dll" $devMods -Force
Copy-Item "$hier\mod.yaml"      $devMods -Force
Copy-Item "$hier\mod_info.yaml" $devMods -Force

Write-Host ""
Write-Host "FERTIG. Naechste Schritte:"
Write-Host "1. ONI starten -> Mods -> 'ONI Kalkulator Sync' (Dev) aktivieren -> Neustart"
Write-Host "2. Spielstand laden, ~10 s warten"
Write-Host "3. Pruefen: %LOCALAPPDATA%\KalkulatorSync\colony_live.json"
