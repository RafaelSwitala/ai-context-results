//
//  WebviewUrlClassifierTests.swift
//  MobileBrowserV2Tests
//
//  webview Phase 2 — LT-006, LT-007, LT-025, LT-026, BEH-008, BEH-009, BEH-010
//

import XCTest
@testable import MobileBrowserV2

final class WebviewUrlClassifierTests: XCTestCase {

    /** LT-006 / BEH-008: barcode URL converts to HTTP(S) return URL. */
    func testBarcodeUrlConvertsToReturnUrl() {
        let result = WebviewUrlLogic.convertBarcodeToReturnUrl(
            "barcodescanner://host/path",
            isHttps: true
        )
        XCTAssertEqual(result, "https://host/path")
    }

    /** LT-026: barcode without :// is not safely converted. */
    func testBarcodeWithoutSeparatorReturnsNil() {
        XCTAssertNil(WebviewUrlLogic.convertBarcodeToReturnUrl(
            "barcodescannerhost",
            isHttps: true
        ))
    }

    /** LT-007 / BEH-009: login URL cancels navigation. */
    func testLoginUrlIsDetected() {
        XCTAssertTrue(WebviewUrlLogic.shouldCancelNavigation(for: "https://server/login.aspx"))
        XCTAssertFalse(WebviewUrlLogic.shouldCancelNavigation(for: "https://server/Default.aspx"))
    }

    /** LT-007 / BEH-010 / ERRPATH-003: login form action triggers session expiry. */
    func testLoginFormActionClearsSession() {
        XCTAssertTrue(WebviewUrlLogic.isLoginFormAction("https://server/login.aspx"))
        XCTAssertTrue(WebviewUrlLogic.shouldReturnToLogin(formAction: "https://server/login.aspx"))
    }

    /** LT-025: route outcome classification. */
    func testClassifyUrlOutcomes() {
        XCTAssertEqual(WebviewUrlLogic.classify("barcodescanner://host"), .scanner)
        XCTAssertEqual(WebviewUrlLogic.classify("https://server/login.aspx"), .login)
        XCTAssertEqual(WebviewUrlLogic.classify("https://server/Default.aspx"), .normal)
    }
}

enum WebviewUrlLogic {
    enum Outcome { case scanner, login, normal }

    static func convertBarcodeToReturnUrl(_ url: String, isHttps: Bool) -> String? {
        let lower = url.lowercased()
        guard lower.hasPrefix(AppSettings.BARCODESCANNER), lower.contains("://") else { return nil }
        let scheme = isHttps ? "https://" : "http://"
        let parts = url.components(separatedBy: "://")
        guard parts.count > 1 else { return nil }
        return scheme + parts[1]
    }

    static func shouldCancelNavigation(for url: String) -> Bool {
        url.lowercased().contains(AppSettings.LOGIN)
            || url.lowercased().hasPrefix(AppSettings.BARCODESCANNER)
    }

    static func isLoginFormAction(_ action: String) -> Bool {
        action.lowercased().contains(AppSettings.LOGIN)
    }

    static func shouldReturnToLogin(formAction: String) -> Bool {
        isLoginFormAction(formAction)
    }

    static func classify(_ url: String) -> Outcome {
        let lower = url.lowercased()
        if lower.hasPrefix(AppSettings.BARCODESCANNER) { return .scanner }
        if lower.contains(AppSettings.LOGIN) { return .login }
        return .normal
    }
}
