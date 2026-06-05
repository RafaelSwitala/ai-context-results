# Legacy Test Quality

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P2 |
| Artifact ID | P2-A24 |
| Artifact Path | artifacts/navigation/codex/20260602-1757-codex-navigation/phase_2/24_legacy_test_quality.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-04T17:50:19+02:00 |

## Quality Review

| Test ID | Behavior Assertion | Deterministic | Failure Sensitive | Weakness | Action |
|---|---|---|---|---|---|
| LT-001 | Yes - iOS seam asserts `SETTINGS` vs `PINCODE` identifiers | Yes | Yes | NOT_RUN locally | Keep file; require macOS/Xcode target wiring. |
| LT-002 | Yes - iOS seam asserts PIN unwind to `SETTINGS` | Yes | Yes | NOT_RUN locally | Keep file; require macOS/Xcode target wiring. |
| LT-003 | Yes - iOS seam asserts rebuilt URL is passed to wrapper | Yes | Yes | NOT_RUN locally | Keep file; require macOS/Xcode target wiring. |
| LT-004 | Partial - planned around wrapper URL handoff | Yes | Medium | Storyboard child embedding not executable locally | Cover with macOS XCTest or UI test. |
| LT-005 | Partial - WebView load/auth semantics documented | Yes | Medium | WKWebView runtime unavailable | Cover with macOS XCTest using WebView doubles. |
| LT-006 | Partial - logout route documented | Yes | Medium | Action sheet and delete callback not unit-executed locally | Extract logout route seam in later refactor or add simulator test. |
| LT-007 | Partial - barcode URL route documented | Yes | Medium | WKNavigationAction not built locally | Extract URL classifier service in RN/Phase 3. |
| LT-008 | Partial - login form return documented | Yes | Medium | JavaScript callback not unit-executed locally | Cover in RN URL/auth service tests. |
| LT-009 | Partial - QR route documented | Yes | Medium | AVFoundation scanner callback not executable locally | Synthetic scanner tests need macOS/iOS runtime. |
| LT-010 | Yes - iOS seam asserts `ScanResult` append and cancel URL | Yes | Yes | NOT_RUN locally | Keep file; require macOS/Xcode target wiring. |
| LT-011 | Yes - Android asserts Login guard and settings icon target activities | Yes | Yes | None | No action. |
| LT-012 | Yes - Android asserts WebviewActivity target and `App.URL` payload | Yes | Yes | None | No action. |
| LT-013 | No executable assertion | N/A | N/A | PopupMenu item click not stable in local Robolectric | Add instrumentation/UI test or extract route handler. |
| LT-014 | Partial - asserts no finish/no navigation after back | Yes | Medium | Does not directly prove `moveTaskToBack(true)` because shadow API is not exposed | Accept as weak unit seam; confirm with UI/instrumentation if needed. |
| LT-015 | Yes - Android asserts QR scanner intent and QR result fills controls | Yes | Yes | Save/cancel network/back branches not executed | Add separate settings Phase 2 or mocked network seam if required. |
| LT-016 | Partial via LT-015 and parser tests | Yes | Medium | Scanner Activity itself skipped because CameraX/MLKit runtime is heavy | Add scanner callback seam or instrumentation test. |
| LT-017 | Yes - Android asserts empty URL routes Login and non-empty loads with no-cache headers | Yes | Yes | None | No action. |
| LT-018 | No executable branch assertion | N/A | N/A | WebView barcode permission branch requires native callback and permission state | Extract URL/permission classifier or add instrumentation test. |
| LT-019 | Yes - Android asserts toolbar logout and invalid-auth resume/back behavior | Yes | Yes | Login-form/error callback branches not executed | Cover in RN pure service tests; add WebViewClient seam later. |
| LT-020 | No executable scanner assertion | N/A | N/A | BarcodeScannerActivity requires CameraX/MLKit lifecycle | Add scanner route seam or instrumentation test. |
| LT-021 | Yes - Android asserts PIN success, exit and back finish behavior | Yes | Yes | None | No action. |
| LT-022 | Yes on Android; iOS seam written but not run | Yes | Yes | Cross-platform result is partly NOT_RUN | Re-run iOS on macOS. |
| LT-023 | No executable assertion | N/A | N/A | iOS WKNavigationAction not executable locally | Cover in extracted URL classifier. |
| LT-024 | No executable assertion | N/A | N/A | Duplicate-code guard is private scanner runtime state | Add scanner route seam or instrumentation test. |
| LT-025 | Yes - Android WebView back no-op is asserted | Yes | Yes | None | No action. |
| LT-026 | Partial through WebView invalid-auth guard | Yes | Medium | Scanner invalid-auth branches skipped/not run | Add scanner route seam or instrumentation test. |
| LT-027 | No executable assertion | N/A | N/A | Camera permission denied path requires permission/runtime branch | Add instrumentation or extracted permission service test. |

## Coverage Gaps

| Source ID | Gap | Risk | Follow-up |
|---|---|---|---|
| DEP-001; DEP-002; DEP-003 | iOS storyboard, WKWebView and AVFoundation paths are not executable in this Windows environment | iOS legacy evidence remains seam-only | Add/wire XCTest target and run on macOS/Xcode. |
| DEP-006; BEH-019; BEH-025; BEH-026; ERRPATH-007 | Android scanner Activities depend on CameraX/MLKit runtime and private duplicate-code state | Scanner route parity has weaker legacy evidence | Extract scanner route handlers or run instrumentation tests with mocked scanner callbacks. |
| BEH-021; ERRPATH-006; SEC-003 | Barcode permission branch is not unit-executed | Camera-denied fallback could regress without legacy unit failure | Move permission decision into a testable service in RN and add instrumentation for legacy if needed. |
| BEH-015; NAV-014 | License popup route skipped | Android-only license route has weaker evidence | Add UI/instrumentation test or expose route handler. |
| OUT-005 | Coverage percentages unavailable | Quantitative comparison cannot include legacy coverage | Add Jacoco/Xcode coverage tooling as a separate infrastructure task. |
