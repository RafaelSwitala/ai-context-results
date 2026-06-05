//
//  WebviewErrorHandlingTests.swift
//  MobileBrowserV2Tests
//
//  webview Phase 2 — LT-004, LT-007, LT-020 (Tests A / Tests B)
//

import XCTest
@testable import MobileBrowserV2

final class WebviewErrorHandlingTests: XCTestCase {

    /** Tests B: empty URL does not resolve for load. */
    func testEmptyUrlDoesNotLoad() {
        XCTAssertNil(WebviewLoadLogic.resolveLoadUrl(from: ""))
    }

    /** Tests A / B: server error query in URL is classified. */
    func testServerErrorUrlIsDetected() {
        let url = "https://server/Login.aspx?Error=-6"
        XCTAssertTrue(WebviewErrorLogic.isServerErrorUrl(url))
        XCTAssertEqual(WebviewErrorLogic.extractErrorCode(from: url), "-6")
    }

    /** Tests A: login URL on page finish clears session. */
    func testLoginPageFinishClearsSession() {
        XCTAssertTrue(WebviewErrorLogic.shouldClearSession(on: "https://server/login.aspx"))
        XCTAssertFalse(WebviewErrorLogic.shouldClearSession(on: "https://server/Default.aspx"))
    }

    /** Tests A: about:blank hides WebView content. */
    func testAboutBlankHidesWebView() {
        XCTAssertEqual(WebviewErrorLogic.visibility(for: "about:blank"), .hidden)
        XCTAssertEqual(WebviewErrorLogic.visibility(for: "https://server/Default.aspx"), .visible)
    }
}

enum WebviewErrorLogic {
    enum Visibility { case hidden, visible }

    static func isServerErrorUrl(_ url: String) -> Bool {
        url.lowercased().contains(AppSettings.ERROR)
    }

    static func extractErrorCode(from url: String) -> String {
        guard let dash = url.lastIndex(of: "-") else { return "" }
        return String(url[dash...])
    }

    static func shouldClearSession(on url: String) -> Bool {
        url.lowercased().contains(AppSettings.LOGIN)
    }

    static func visibility(for url: String) -> Visibility {
        url.lowercased().contains(AppSettings.ABOUT_BLANK) ? .hidden : .visible
    }
}
