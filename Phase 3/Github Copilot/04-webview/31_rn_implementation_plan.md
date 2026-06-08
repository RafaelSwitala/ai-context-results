# RN Implementation Plan

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P3 |
| Artifact ID | P3-A31 |
| Artifact Path | artifacts/webview/claude/20260602-004/phase_3 |
| Status | IN_PROGRESS |
| Created by | Claude / GitHub Copilot |
| Last updated | 2026-06-07 |

## Implementation Plan

| Mapping ID | RN Target Path | RN Symbol | Strategy | Source IDs | Implementation Order |
|---|---|---|---|---|---|
| MAP-001 | src/screens/WebViewScreen.tsx | WebViewScreen | Add | EP-002–005, EP-008–010, BEH-002–007, BEH-016–030, UI-001, UI-006 | 1 |
| MAP-002 | src/navigation/AppNavigator.tsx | WebView route | Add/Adapt | EP-001, EP-007, BEH-001, BEH-014, NAV-001, NAV-006 | 2 |
| MAP-003 | src/screens/BarcodeScannerScreen.tsx | BarcodeScannerScreen | Add/Adapt | EP-006, EP-011, BEH-013, BEH-031, NAV-005, NAV-009 | 3 |
| MAP-004 | src/services/webViewRouteClassifier.ts | classifyWebViewUrl | Add | IOS-FILE-006, AND-FILE-005, BEH-008, BEH-009, BEH-020, BEH-025, BEH-026, BEH-027 | 0 (dependency) |
| MAP-005 | src/services/webViewReturnUrlService.ts | toBarcodeReturnUrl, buildScanResultUrl | Add | BEH-008, BEH-013, BEH-023, BEH-024, BEH-031, ERRPATH-008 | 1 (dependency) |
| MAP-006 | src/services/webViewSessionService.ts | handleSessionExpired, ensureValidLogin | Add/Adapt | BEH-010, BEH-011, BEH-022, BEH-028, BEH-029, STOR-001, STOR-003, SEC-002 | 1 (dependency) |
| MAP-007 | src/utils/serverErrorMapper.ts | mapServerError | Reuse | BEH-021, BEH-025, ERRPATH-005, ERRPATH-006, ERRPATH-007 | 1 (dependency) |
| MAP-008 | existing auth/login storage | hasValidLogin | Reuse | STOR-001, STOR-003, SEC-002 | (dependency) |
| MAP-009 | existing login/settings storage | server, client, user, password, protocol | Reuse | STOR-002, STOR-004 | (dependency) |
| MAP-010 | src/navigation route params | url, returnUrl | Add | STOR-005, SEC-001 | 1 (type definition) |
| MAP-011 | WebViewScreen | WebView source uri, headers | Add | API-001, API-003, BEH-004, BEH-017 | 1 (WebViewScreen impl) |
| MAP-012 | WebViewScreen | injected JS handler | Add | API-002, API-004, BEH-010, BEH-022 | 1 (WebViewScreen impl) |
| MAP-013 | N/A | N/A | N/A | API-005 | (adjacent feature) |
| MAP-014 | src/hooks/useWebViewRouteParams.ts | useWebViewRouteParams | Add | STATE-001, STATE-002, STATE-006, STATE-007, STOR-005 | 1 (dependency) |
| MAP-015 | src/hooks/useWebViewLoadingState.ts | useWebViewLoadingState | Add | STATE-003, STATE-004, STATE-008, STATE-009, BEH-005, BEH-006, BEH-018, BEH-027 | 1 (dependency) |
| MAP-016 | src/hooks/useWebViewSessionGuard.ts | useWebViewSessionGuard | Add | STATE-005, STATE-010, SEC-002 | 1 (dependency) |
| MAP-017 | WebViewScreen | Empty URL handling | Add | BEH-002, BEH-015, STATE-002, STATE-006 | 1 (WebViewScreen impl) |
| MAP-018 | WebViewScreen | WebView settings | Add | BEH-016, SEC-005 | 1 (WebViewScreen impl) |
| MAP-019 | WebViewScreen | Error UX | Platform decision documented | BEH-007, BEH-021, ERRPATH-002, ERRPATH-005, ERRPATH-006 | Post-implementation decision |
| MAP-020 | WebViewScreen + classifier | Barcode permission branch | Add | BEH-008, BEH-020, BEH-023, BEH-024, ERRPATH-008, SEC-004 | 1 (dependency + screen impl) |
| MAP-021 | WebViewScreen | SSL bypass handling | Explicit block | BEH-019, ERRPATH-009, SEC-003 | 1 (WebViewScreen impl, decision logged) |
| MAP-022 | WebViewScreen | Hardware back no-op | Add | BEH-030 | 1 (WebViewScreen impl) |
| MAP-023 | package.json | react-native-webview | Reuse | DEP-001, DEP-004, DEP-007, RN-FILE-001 | (already present) |
| MAP-024 | package.json | @react-navigation/native | Reuse | DEP-003, DEP-008, RN-FILE-001 | (already present) |
| MAP-025 | package.json | Jest/jest-expo | Reuse | DEP-008, RN-FILE-001 | (already present) |
| MAP-026 | permission handling | Camera/scanner permission | Add if needed | DEP-006, SEC-004 | 1 (may use expo-permissions) |

## Dependency Plan

| Dependency | Add/Reuse | Reason | Source IDs | Status |
|---|---|---|---|---|
| react-native-webview | Reuse | Present in RN dependencies for WebViewScreen. | DEP-001, DEP-004, DEP-007 | VERIFIED |
| @react-navigation/native | Reuse | Present in RN dependencies for WebView route params and resets. | DEP-003, DEP-008 | VERIFIED |
| Jest/jest-expo | Reuse | Present for tests. | DEP-008 | VERIFIED |
| camera/scanner permission | Add if barcode scanner uses native permission API | Barcode route needs CAMERA permission branch. May reuse barcode scanner feature if already implemented. | DEP-006, SEC-004 | TBD (post-barcode impl) |
| expo-permissions or react-native-permissions | Reuse or minimal add | Camera permission requests. | SEC-004 | TBD |

## Implementation Decisions And Risks

| Decision | Reason | Risk | Mitigation |
|---|---|---|---|
| Single RN WebViewScreen for both iOS/Android | Unify platform divergence via explicit behavior | Android and iOS may render/behave differently; CSS media queries insufficient | Document platform-specific behavior in comments; Phase 5 validation includes platform-specific testing |
| Empty URL fallback → Login | Android behavior; iOS emulates | On iOS, user sees empty WebView silently | Document decision; Phase 5 validates behavior |
| Error UX: Android-style dialog (vs iOS silent failure) | Keep Android pattern as reference; RN decides | iOS historically didn't show error dialogs | MAP-019 decision log created for Phase 3 review |
| SSL bypass: Explicit deny (vs conditional allow) | Security-first default | Server may require `HTTPS-without-validation`; will need explicit allowlist in Phase 5 | Document SEC-003 requirement; Phase 5 security validation |
| Barcode permission check in RN service | Separate from screen logic | Expo permission APIs may vary from Android native | Use expo-permissions wrapper; mock in Phase 4 tests |

## Phase 3 Success Criteria

- [ ] All MAP-001 through MAP-026 are mapped to RN target paths/symbols
- [ ] All dependencies documented (reuse or add)
- [ ] TypeScript types defined for route params, URLs, classification results
- [ ] All services and hooks implemented with Phase 1 source traceability
- [ ] WebViewScreen renders and handles lifecycle, loading, errors
- [ ] No business logic in screens; all logic in services/hooks
- [ ] Static validation (tsc, lint) passes or issues documented
- [ ] Code report documents all files changed, commands run, and any unresolved issues
- [ ] Mapping status records each MAP-* as IMPLEMENTED, PARTIAL, EXCLUDED, or BLOCKED with evidence
