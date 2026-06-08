# Feature Analysis

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P1 |
| Artifact ID | P1-A11 |
| Artifact Path | artifacts/navigation/claude/20260602-003/phase_1/11_feature_analysis.md |
| Status | IN_PROGRESS |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T18:30:00Z |

## Scope

| Field | Value | Source |
|---|---|---|
| Feature slug | navigation | prompt |
| User feature name | navigation | prompt |
| In scope | Screen transitions, routing, navigation stack management, deep linking, back navigation, screen presentation modes | analysis |
| Out of scope | URL schemes beyond deep linking, animation details, custom transitions | analysis |
| Open blockers | none | analysis |

## Discovery Summary

| Platform | Search Terms | Files Found | Relevant Files | Notes |
|---|---|---|---|---|
| iOS | ViewController, segue, storyboard, navigationController, performSegue, UIStoryboardSegue | 8 ViewControllers, 2 storyboards found | 6 relevant | Main.storyboard defines Segues (WEBVIEW, PINCODE, SETTINGS, BACK_TO_LOGIN) |
| Android | Intent, Activity, startActivity, finish, putExtra, ActivityStack | 11 Activities found | 5 relevant | BarcodeCaptureActivity, LoginActivity, WebviewActivity with Intent navigation |

## Relevant Files

| ID | Platform | Path | Main Symbol | Why Relevant | Source |
|---|---|---|---|---|---|
| IOS-FILE-003 | iOS | Source/Base.lproj/Main.storyboard | UIStoryboard | Central navigation graph defining all Segues and screen connections | file_search |
| IOS-FILE-004 | iOS | Source/AppDelegate.swift | AppDelegate | App lifecycle entry point, window management, logout navigation | file_search |
| IOS-FILE-005 | iOS | Source/SceneDelegate.swift | SceneDelegate | iOS 13+ scene-based navigation initialization | file_search |
| AND-FILE-003 | Android | app/src/main/java/.../App.java | App (Application) | Global app singleton, Intent constants (URL, ERROR, etc.), app lifecycle | file_search |
| AND-FILE-004 | Android | app/src/main/java/.../BarcodeCaptureActivity.java | BarcodeCaptureActivity | Navigation to WebviewActivity and LoginActivity via Intents | grep_search |
| AND-FILE-005 | Android | app/src/main/java/.../BaseActivity.java | BaseActivity | Base class for all Activities, shared navigation logic | file_search |

## Feature Boundary

| ID | Boundary Item | In/Out | Reason | Source |
|---|---|---|---|---|
| BOUND-001 | Screen-to-screen transitions (Segues/Intents) | IN | Core navigation mechanism | IOS-FILE-003, IOS-FILE-004, AND-FILE-003, AND-FILE-004 |
| BOUND-002 | Navigation stack management | IN | Back navigation, screen history | IOS-FILE-004, AND-FILE-004 |
| BOUND-003 | Data passing between screens | IN | URL parameters, error codes, scan results | AND-FILE-004 |
| BOUND-004 | App lifecycle (launch, background, terminate) | IN | Navigation state preservation | IOS-FILE-004, IOS-FILE-005, AND-FILE-003 |
| BOUND-005 | Deep linking | OUT | Beyond scope; handled by URL schemes separately | N/A |
| BOUND-006 | Custom transitions/animations | OUT | Not part of core navigation logic | N/A |
| BOUND-007 | Gesture-based navigation (swipe back) | IN (iOS) | Implicit in iOS navigation stack | IOS-FILE-003 |

## Cross-Platform Summary

| Topic | iOS | Android | Same/Different | Consequence |
|---|---|---|---|---|
| Navigation Mechanism | UIStoryboardSegue (presentation) | Intent-based (start activity) | Different architecture | RN must abstract both; use react-navigation stack |
| Screen Definition | Storyboard XML + ViewController class | Activity class | Different declarative vs imperative | RN screens defined as components |
| Data Passing | Segue prepare(), property injection | Intent.putExtra(), getIntent().getExtras() | Different pattern | RN uses route params or screen params |
| Back Navigation | Auto stack via UINavigationController or manual dismiss | finish() or back stack | Similar concept | RN goBack() unifies both |
| App Entry Point | UIApplication + AppDelegate + SceneDelegate (iOS 13+) | Application + Activity onCreate | Different lifecycle | RN has single entry point (App.tsx) |
| Navigation Constants | Hardcoded segue identifiers (WEBVIEW, PINCODE, SETTINGS, BACK_TO_LOGIN) | App class static constants (URL, ERROR, etc.) | Both hardcoded; different location | RN should use central navigation config |
| State Preservation | iOS: automatic with UIViewController lifecycle | Android: savedInstanceState + onRestoreInstanceState | Different approach | RN uses Redux or Context API |
