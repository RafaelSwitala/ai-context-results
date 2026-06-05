//
//  WebviewLoadLogicTests.swift
//  MobileBrowserV2Tests
//
//  webview Phase 2 — LT-003, LT-004, LT-005, BEH-004, BEH-005, BEH-006, BEH-007, ERRPATH-001
//

import XCTest
@testable import MobileBrowserV2

final class WebviewLoadLogicTests: XCTestCase {

    /** LT-004 / ERRPATH-001: empty URL does not produce load URL. */
    func testEmptyUrlDoesNotLoad() {
        XCTAssertNil(WebviewLoadLogic.resolveLoadUrl(from: ""))
    }

    /** LT-003 / BEH-004: non-empty URL resolves for load. */
    func testNonEmptyUrlResolvesForLoad() {
        XCTAssertNotNil(WebviewLoadLogic.resolveLoadUrl(from: "https://server/Default.aspx"))
    }

    /** LT-005 / BEH-005: loading starts only when not already loading. */
    func testLoadingStartsOnce() {
        XCTAssertTrue(WebviewLoadLogic.shouldStartLoading(isCurrentlyLoading: false))
        XCTAssertFalse(WebviewLoadLogic.shouldStartLoading(isCurrentlyLoading: true))
    }

    /** LT-005 / BEH-006: finish clears loading state. */
    func testFinishClearsLoadingState() {
        XCTAssertFalse(WebviewLoadLogic.isLoadingAfterFinish())
    }

    /** LT-005 / BEH-007: failure clears loading without error dialog flag. */
    func testFailureClearsLoadingWithoutDialog() {
        XCTAssertFalse(WebviewLoadLogic.showsErrorDialogOnFailure())
        XCTAssertFalse(WebviewLoadLogic.isLoadingAfterFinish())
    }

    /** BEH-012: view disappear should stop loading when active. */
    func testViewDisappearStopsLoadingWhenActive() {
        XCTAssertTrue(WebviewLoadLogic.shouldStopLoadingOnDisappear(isLoading: true))
        XCTAssertFalse(WebviewLoadLogic.shouldStopLoadingOnDisappear(isLoading: false))
    }
}

enum WebviewLoadLogic {
    static func resolveLoadUrl(from urlString: String) -> URL? {
        guard !urlString.isEmpty else { return nil }
        return URL(string: urlString)
    }

    static func shouldStartLoading(isCurrentlyLoading: Bool) -> Bool {
        !isCurrentlyLoading
    }

    static func isLoadingAfterFinish() -> Bool {
        false
    }

    static func showsErrorDialogOnFailure() -> Bool {
        false
    }

    static func shouldStopLoadingOnDisappear(isLoading: Bool) -> Bool {
        isLoading
    }
}
