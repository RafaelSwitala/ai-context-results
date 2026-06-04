Alle Agenten müssen in seperaten Ordnern arbeiten. Beim Versuch, diese gemeinsam in ein FileSpace zu bringen, wurde ab dem 2. KI-Agenten abgeschaut was die anderen so machen und es wurde kopiert.
Um das zu beheben, habe ich jedem KI-Agenten ein seperates Projekt erstellt, wo nur er rein schauen darf.


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