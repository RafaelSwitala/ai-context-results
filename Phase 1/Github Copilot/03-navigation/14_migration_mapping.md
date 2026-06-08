# Migration Mapping

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/navigation/claude/20260602-003/phase_1/14_migration_mapping.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T19:30:00Z |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-001, EP-002, EP-003 | index.tsx / App.tsx | React Native app entry point | Single entry point replaces AppDelegate + SceneDelegate | RN initializes navigation stack on launch |
| MAP-002 | BEH-001, NAV-001 through NAV-010 | navigation/RootNavigator.tsx | RootNavigator (Stack Navigator) | React Navigation replaces Segues and Intents | Single navigator unifies both platforms |
| MAP-003 | BEH-004 | screens/LoginScreen.tsx | Initial route in navigation stack | LoginScreen replaces storyboard LoginViewController | Shown on app startup |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-100 | BEH-005, BEH-010 | AuthService.logout() | async logout function | Centralized logout; calls API and clears session | Used before navigation to login |
| MAP-101 | BEH-006 | SessionService.checkValid() | async function | Check hasValidLogin on app foreground | Trigger session validation |
| MAP-102 | BEH-002, BEH-008 | NavigationService.navigate() | Generic screen transition | Abstraction for segue/intent navigation | Passes route params (data) |
| MAP-103 | BEH-011 | NavigationService.goBack() | Pop from stack | Unify iOS back + Android finish() | Used after logout or error |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-200 | BEH-005, BEH-006 | AsyncStorage or Redux | auth/hasValidLogin | NO | Session state flag |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-300 | API-001, API-003 | AuthService.logout() | DELETE /api/user/session | Logout endpoint; kill server-side session |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-400 | STATE-001, STATE-002 | RootNavigator initial state | LoginScreen | Navigation state tree |
| MAP-401 | STATE-003, STATE-004, STATE-005 | Redux or Context (auth state) | { isLoggedIn: false } | true on login, false on logout |
| MAP-402 | STATE-007, STATE-008 | App lifecycle context | App mounted | onAppPause triggers logout |
| MAP-403 | STATE-009, STATE-010 | Navigation stack | ['LoginScreen'] → ['WebviewScreen'] | Push/pop based on navigation |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| DIV-001 | BEH-001, BEH-007 | UIStoryboardSegue (declarative) | Intent-based (imperative) | React Navigation (declarative) | RN matches iOS declarative style |
| DIV-002 | BEH-002, BEH-008 | prepare(for:) property injection | Intent.putExtra() data | Navigation route params (object) | RN unifies both into single params pattern |
| DIV-003 | EP-001/EP-002 vs EP-006 | AppDelegate + SceneDelegate (multi-step) | Application.onCreate() (single) | Single App.tsx entry point | RN always has one entry |
| DIV-004 | BEH-003, BEH-009 | UIViewController dismiss/pop | Activity.finish() | NavigationService.goBack() | RN abstraction |
| DIV-005 | NAV-005 (unwind) | Unwind segue pattern | No direct equivalent | React Navigation linking | RN uses deep linking for complex flows |
| DIV-006 | STATE-005, STATE-008 | Lifecycle event + check | onPause call | App foreground/background listeners | RN uses AppState API |
| DIV-007 | ERRPATH-001 | Check on foreground notification | App lifecycle callback | useEffect + AppState listener | RN effect hook |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-DEP-001 | @react-navigation/native, @react-navigation/stack | REUSE | Core navigation library for screen transitions | BEH-001, BEH-007, MAP-002 |
| MAP-DEP-002 | @react-native-async-storage/async-storage | REUSE | Session state storage | MAP-200, BEH-006 |
| MAP-DEP-003 | react-native AppState API | REUSE | App lifecycle (foreground/background) | BEH-006, BEH-010 |
| MAP-DEP-004 | redux or @react-navigation/native linking | ADD | State management for navigation + session | MAP-401, BEH-005 |
