## Kontext
* Die Namen der KI´s lauten wie folgt: KI-1 = Codex, KI-2 = Cursor und KI-3 = Github Copilot.
* Bei der Durchführung habe ich immer darauf geachtet, dass sich in einem Ordner android-mobilebrowser, ios-mobilebrowser, rn-e-mobilebrowser, ai-context befinden.
* Jede KI-Hatte in der Ersten Phase einen seperaten Ordner auf die nur diese KI Zugriff hatte. Das war am Anfang nicht so, aber da mir aufgefallen ist dass KI´s gerne voneinander abschreibebn, habe ich sie getrennt voneinander verwaltet um korrekte Vergleichsergebnisse zu erhalten.
* Ich möchte bereits erste Ergebnisse sammeln für Phase 1 und Phase 2.
* Der Prompt lautete immer "Führe Phase [Phasennummer] auf das Feature [Featurename] aus." Beispielsweise "Führe Phase 3 auf das Feature webview aus."
* Im Ordner Forschung befinden sich alle relevante Dateien und Informationen. 
* Ziel ist es, Ergebnisse für die Bachelorarbeit zu sammeln, für Phase 1 und 2.



## Phasen Beschreibung
* Für die Features stotage-config, login, navigation, webview, settings, qr-code-scanner und barcode-scanner wurde mit drei KI´s die erste Phase umgesetzt. 
* Gehe zu ai-context und schaue dir die 5 Phasen an.
* Fülle für jede Phase in B-Opt\01-PhasenDescription.md eine Phasenbeschreibung durch. Kläre, was jede Phase macht, wofür sie zuständig ist, was das allgemeine Ziel ist, welchen Mehrwert diese Phasen haben. (Detailliert pro Phase)


## Ergebnisse Phase 1
* Gebe auch an, welchen Zweck alle Phasen zusammen haben in B-Opt\01-PhasenDescription.md. (Detailliert um die Methodik zu erklären).
* Im Ordner Own befinden sich die Ergebnisse, die ich anhand der 3 KI´s zusammengeführt habe. Ich habe geschaut welche Ergebnisse die stärksten waren, diese als Basis genommen und Teile durch weitere Ergänzt oder bessere Ersetzt. Diesen Own-Ordner habe ich anschließend für die Phase 2 vorbereitet, sodass jede KI wieder die selben Rahmenbedingungen hat. Die KI´s haben ab Phase 2 also keine Unterschiedliche Rahmenbedingungen gehabt sondern die gleichen wie die anderen KI´s.

## Ergebnisse Phase 2
* Für die Features stotage-config, login, navigation, webview, settings, wurde mit drei KI´s die zweite Phase umgesetzt. 
* Im Ordner Own befinden sich die Ergebnisse, die ich anhand der 3 KI´s zusammengeführt habe. Ich habe geschaut welche Ergebnisse die stärksten waren, diese als Basis genommen und Teile durch weitere Ergänzt oder bessere Ersetzt. Diesen Own-Ordner habe ich anschließend für die Phase 3 vorbereitet, sodass jede KI wieder die selben Rahmenbedingungen hat. Die KI´s haben ab Phase 3 also keine Unterschiedliche Rahmenbedingungen gehabt sondern die gleichen wie die anderen KI´s. (Die Tests sind für Phase 3 noch nicht relevant)

---

Alle Agenten müssen in seperaten Ordnern arbeiten. Beim Versuch, diese gemeinsam in ein FileSpace zu bringen, wurde ab dem 2. KI-Agenten abgeschaut was die anderen so machen und es wurde kopiert.
Um das zu beheben, habe ich jedem KI-Agenten ein seperates Projekt erstellt, wo nur er rein schauen darf.

---

# Phase 1
## Feature 1-storage-config
- Codex Ergebnisse komplett genommen. Unverändert.

## Feature 2-login
- Codex als Basis genommen

- Copilot ersetzt *Cross-Platform Summary* in [11]. Grund: präziser
- Copilot ersetzt *Behaviours* in [12]. Grund: präziser
- Copilot ersetzt *Error Paths* in [12]. Grund: präziser
- Copilot ersetzt *Dependencies* in [12]. Grund: präziser
- Copilot ersetzt *Testable Behaviours* in [13]. Grund: präziser
- Copilot ersetzt *Edge Cases* in [13]. Grund: präziser

## Feature 3-navigation
- Codex Ergebnisse komplett genommen. Unverändert.

## Feature 4-webview
- Codex als Basis genommen

- Copilot ergänzt [12] durch weiteren EntryPoint. EP-12 ist neu. Codex hat diesen nicht gehabt.

- Cursor ergänzt [12] durch weiteres Behaviour. BEH-032 ist neu. Codex hat diesen nicht gehabt.

## Feature 5-settings
- Codex Ergebnisse komplett genommen. Unverändert.

## Feature 6-qr-code-scanner
- Copilot Ergebnisse komplett genommen. Unverändert.

## Feature 7-barcode-scanner
- Codex als Basis genommen

- Copilot ergänzt [11] durch Analysis Notes, iOS Implementation (Legacy), Android Implementation (Active), Key Similarities, Key Divergences, Risks And Dependencies.
- Warum?: beschreibt Architektur, beschreibt Implementierungsstatus, erklärt Unterschiede, erklärt Risiken
- Copilot ersetzt *Legacy Test Cases To Create* in [13]. Grund: erzeugt stärkere: Risikotests, Divergenztests, Migrationstests
- Copilot ersetzt *Phase2, Phase3, Phase4, Phase5* in [15]. Grund: Codex eher generisch. Copilot hat klare Deliverables, Validierung, Abnahmekriterien.

- Cursor ergänzt [11] durch Irrelevant Hits (Out of Scope)
- Cursor ergänzt [14] durch Excluded From Migration (With Reason) 
- Cursor ergänzt [15] durch Inputs For Later Phases (No Rediscovery) und Known Build/Test Notes
- Cursor ergänzt [16] durch Self-Validation (VAL-P1)


# Phase 2
- Cursor als Basis verwendet, Ideen von Codex und Copilot ergänzt. Siehe Phase2Schlussfolgerungen.md

# Unit-Test-Ergänzung — Report

**Datum:** 2026-06-05  
**Basis:** Vorbereitete Testklassen in `android-mobilebrowser/.../utility` und `ios-mobilebrowser/MobileBrowserV2Tests`  
**Ideenquellen:** `Tests/Codex-Tests` (vollständige Feature-/Integrationstests) und `Tests/Copilot-Tests` (thematische Stub-/Skelett-Tests)

## Vorgehen

1. Bestehende Testklassen in Android (`utility`) und iOS (`MobileBrowserV2Tests`) inventarisiert und mit Tests A/B abgeglichen.
2. Bereits implementierte Tests nicht blind übernommen; nur Lücken und fehlerhafte Platzhalter ergänzt bzw. korrigiert.
3. Neue Tests als **reine Logik-Tests** (extrahierte Hilfsmethoden, analog zu Phase-2-Stil) umgesetzt — keine Robolectric-Activity-Tests aus Codex-Tests kopiert.

### Bereits vollständig (keine Änderung nötig)

| Bereich | Android | iOS |
|---------|---------|-----|
| Storage-Config (URL, Preferences, QR Basis) | `PreferencesUtilsStorageConfigTest`, `QRCodeParserTest`, `ConfigFileSettingsTest` | `StorageConfigUrlUtilsTests`, `StorageConfigQRCodeParserTests` |
| Login URL / Preferences | `StringUtilsLoginTest`, `PreferencesUtilsLoginTest` | `LoginUrlUtilsTests`, `LoginPreferencesUtilsTests` |
| Navigation Scan / Guard | `NavigationLoginGuardTest`, `NavigationQrScannerRouteTest`, `WebviewScanResultTest` | `NavigationLoginGuardTests`, `NavigationScanResultTests`, `WebviewScanResultTests` |
| WebView Load (Basis) | `WebviewActivityLogicTest` | `WebviewLoadLogicTests`, `WebviewSessionGuardTests` |

### Behobene Unvollständigkeit

| Klasse | Problem | Quelle |
|--------|---------|--------|
| `NavigationRouteLogicTest` (Android) | `buildScanResultUrl_cancelUsesOriginalUrl` prüfte nur `returnUrl == returnUrl`; Hilfsmethode unterstützte kein `null`-Cancel | Codex-Tests (`NavigationFeatureTests` / `WebviewFeatureTests`) |

---

## Neu implementierte Testklassen

### Android (`utility`)

| Klasse | Ideenquelle | Inhalt |
|--------|-------------|--------|
| `SettingsValidationTest` | **Copilot-Tests** (`SettingsValidationTest`) | Server leer, PIN-Länge, HTTP-200-Gate für Settings-Persistenz |
| `LoginHttpLogicTest` | **Copilot-Tests** (`LoginHttpTest`) | HTTP-200/Error-Code/Timeout, Request-in-flight |
| `WebviewErrorHandlingTest` | **Copilot-Tests** (`WebViewErrorHandlingTest`, `WebViewSessionTest`) | Leere URL, Server-Error-URL, einmaliger Error-Dialog, Login-Page-Session-Clear |

### iOS (`MobileBrowserV2Tests`)

| Klasse | Ideenquelle | Inhalt |
|--------|-------------|--------|
| `LoginValidationTests` | **Codex-Tests** (`LoginFeatureTests`) | Leerer User/Passwort, ungültige Settings, User mit Leerzeichen |
| `LoginHttpLogicTests` | **Copilot-Tests** (`LoginHttpTest`) | HTTP-Erfolg/Fehler, Spinner-Duplikat-Schutz |
| `SettingsValidationTests` | **Copilot-Tests** (`SettingsValidationTest`) | Server/PIN-Validierung, HTTP-200-Gate |
| `WebviewErrorHandlingTests` | **Codex-Tests** + **Copilot-Tests** | Leere URL, Error-URL, Login-Session, `about:blank`-Sichtbarkeit |

---

## Ergänzungen in bestehenden Testklassen

### Android

| Klasse | Neue Tests | Ideenquelle |
|--------|------------|-------------|
| `LoginValidationTest` | `loginValidation_acceptsUsernameWithSpaces`, `loginValidation_routesToSettingsWhenInvalidSettingsNoPin`, `loginValidation_routesToPinWhenInvalidSettingsWithPin` | **Copilot-Tests** (Routing LT-005), **Codex-Tests** (Login-Guard) |
| `LoginPinGateTest` | `pinValidation_rejectsInvalidPinFormat` | **Copilot-Tests** (`PinGateTest`) |
| `WebviewUrlClassifierTest` | `routeConstants_includeAboutBlank` | **Codex-Tests** (`WebviewFeatureTest.routeConstantsClassifyLegacyWebviewTokens`) |
| `QRCodeParserTest` | `parse_normalizesQueryOnlyPayload` | **Codex-Tests** (`PreferencesUtilsTest` / Navigation QR-Normalisierung) |

### iOS

| Klasse | Neue Tests | Ideenquelle |
|--------|------------|-------------|
| `LoginPinValidationTests` | `testPinFormatMustBeFourDigitsOrEmpty` | **Copilot-Tests** (`PinGateTest`) |
| `WebviewUrlClassifierTests` | Erweiterte `testClassifyUrlOutcomes` (error, hidden), `testRouteConstantsMatchLegacyWebviewTokens` | **Codex-Tests** (`WebviewFeatureTests`) |
| `NavigationUrlClassifierTests` | `testServerErrorUrlIsDetected`, `testShouldHideWebViewForSpecialRoutes` | **Codex-Tests** (`NavigationFeatureTests`) |

---

## Bewusst nicht übernommen (Plattform / bereits abgedeckt)

| Copilot-Tests / Codex-Tests Idee | Grund |
|------------------------|--------|
| Leeres Passwort bei Login (Copilot-Tests `LoginValidationTest`) | Android validiert kein Passwort in `LoginActivity.isValid()` — nur iOS (`LoginValidationTests`) |
| Robolectric Activity-Tests (Codex-Tests `LoginFeatureTest`, `NavigationFeatureTest`, `WebviewFeatureTest`) | Bereits als Referenz in `Tests/Codex-Tests`; Produktivtests bleiben reine Utility-Logik |
| `LoginPersistenceTest`, `LoginUITest`, `LoginNavigationTest` (Copilot-Tests) | Inhaltlich durch `PreferencesUtilsLoginTest` / Codex-Tests abgedeckt oder UI-/Integrations-scope |
| iOS QR `culture`-Mapping (Codex-Tests Android `QRCodeParserTest`) | iOS-`QRCodeParser` hat kein `Culture`-Feld |
| Copilot-Tests Skelette mit `assertTrue(true)`-Logik | Nur als **Ideenliste** genutzt, nicht 1:1 kopiert |

---

## Testausführung

- **Android:** `gradlew :app:testMobilebrowserDebugUnitTest --tests "de.onlinesoftwareag.boa.mobilebrowser4android.utility.*"` — **103 Tests, alle grün**
- **iOS:** Lokal auf macOS mit Xcode-Test-Target (siehe `MobileBrowserV2Tests/README.md`)

---

## Kurzstatistik

| | Android neu | Android ergänzt | iOS neu | iOS ergänzt |
|--|-------------|-----------------|---------|-------------|
| Testklassen | 3 | 4 Klassen | 4 | 3 Klassen |
| Einzeltests (ca.) | 11 | 7 | 14 | 8 |

*Bereit für Phase 3*


# Phase 3

# Phase 4
Prompt für Phase 4 lautet: Führe Phase 4 [Dateiangabe] aus.

# Phase 5
Prompt für Phase 5 lautet: Führe Phase 5 [Dateiangabe] aus.