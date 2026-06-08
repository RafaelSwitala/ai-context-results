# Migration Mapping

| Field | Value |
|---|---|
| Feature | qr-code-scanner |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/qr-code-scanner/cursor/20260602-2017-cursor-qr-code-scanner/phase_1/14_migration_mapping.md |
| Status | READY_FOR_REVIEW |
| Created by | cursor |
| Last updated | 2026-06-02 20:17 (UTC+2) |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-001, EP-002, NAV-001, NAV-003, UI-005, UI-006 | src/screens/settings/SettingsScreen.tsx | `openQrScanner` | Adapt | QR-Icon startet Modal/Route |
| MAP-002 | EP-003, EP-004, BEH-002, BEH-014, UI-001, UI-003 | src/screens/qr/QrCodeScannerScreen.tsx | `QrCodeScannerScreen` | Add | Kamera-UI + Erklärungstext |
| MAP-003 | BEH-012, BEH-013, NAV-005, UI-002, UI-004 | src/screens/qr/QrCodeScannerScreen.tsx | `onCancel` | Adapt | Einheitliches Cancel; Back-Verhalten explizit |
| MAP-004 | NAV-002, NAV-004, BEH-006, BEH-007 | src/screens/qr/QrCodeScannerScreen.tsx | `onScanSuccess` | Adapt | Liefert normalisierte URL an Settings-Callback |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-005 | BEH-003, BEH-004, BEH-005, DEP-005 | src/features/qr/qrCodeParser.ts | `normalizeQrPayload` | Add | `http://localhost?` Prefix |
| MAP-006 | BEH-004, BEH-005, BEH-010, BEH-011, DEP-005 | src/features/qr/qrCodeParser.ts | `parseQrCode` / `isValidQrSettings` | Reuse/Adapt | Shared mit settings; iOS-strikte Validierung im Scanner |
| MAP-007 | BEH-002, DEP-001, DEP-003 | src/features/qr/useQrScanner.ts | `scanQrCode` | Add | Wrapper um expo-camera / vision-camera Barcode API |
| MAP-008 | ERRPATH-005, SEC-002 | src/features/qr/cameraPermission.ts | `ensureCameraPermission` | Add | Einheitlicher Permission-Flow vor MAP-002 |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-009 | STOR-001 | N/A | — | — | Scanner schreibt nicht; Übergabe in-memory an Settings |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-010 | API-001 | N/A | — | Kein Netzwerk im Scanner |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-011 | STATE-001, STATE-002, BEH-009 | `useQrScanSession` | idle | scanning → success \| error → retry |
| MAP-012 | STATE-003, STATE-004, STATE-005, BEH-011 | `useQrScanSession` | cameraActive | stop on success/error; restart on retry |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| MAP-013 | BEH-004, BEH-005, ERRPATH-002, ERRPATH-004 | Scanner validiert vollständig (`isValid`) | Scanner prüft nur `p=MB` | Adapt: Scanner nutzt `isValidQrSettings` (iOS-Regeln) | Strengeres, konsistentes Gate |
| MAP-014 | BEH-010, BEH-011 | Settings füllt ohne `isValid` | Settings füllt nur bei `isValid` | Adapt: Prefill nur wenn `isValidQrSettings` | Android-Verhalten + iOS-Sicherheit |
| MAP-015 | BEH-013 | Back nicht blockiert | Back disabled | Adapt: Cancel-Button primary; optional Back = Cancel | UX-Klarheit |
| MAP-016 | DEP-005, LT-013, LT-014 | Kein culture in Parser | culture + locale save in Settings | Adapt: `culture` optional in `parseQrCode` | settings-Feature-Alignment |
| MAP-017 | ERRPATH-005 | Kein dedizierter Permission-Dialog in Scanner-Basis | Dialog + finish | Adapt: `ensureCameraPermission` vor Screen | RN einheitlich |
| MAP-018 | DEP-001, DEP-002, DEP-003 | AVFoundation | CameraX + ML Kit | Add: eine RN-Kamera/Barcode-Stack | Technologie-Konsolidierung |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-019 | expo-camera oder react-native-vision-camera + barcode | Add | Ersetzt AVFoundation/CameraX/ML Kit | DEP-001, DEP-002, DEP-003 |
| MAP-020 | settings `qrCodeParser.ts` (settings run MAP-002) | Reuse | Kein doppelter Parser | MAP-006, DEP-005 |
| MAP-021 | @react-navigation/native modal/route | Reuse | Settings → Scanner Navigation | NAV-001, NAV-003 |
| MAP-022 | expo-haptics (optional) | Add | Parität iOS Haptic Success/Error | BEH-008 |

## Excluded From Migration (With Reason)

| Source IDs | Exclusion Reason |
|---|---|
| FB-005, ArticleScanner, BarcodeScanner | Separates Feature WebView-Barcode |
| FB-006, QRCodeCaptureActivity | Tot; nicht referenziert |
| BEH-010 ohne MAP-014 | Ersetzt durch einheitliches gültiges Prefill |
