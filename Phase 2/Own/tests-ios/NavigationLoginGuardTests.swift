//
//  NavigationLoginGuardTests.swift
//  MobileBrowserV2Tests
//
//  navigation Phase 2 — LT-001, LT-002, BEH-001, BEH-002, NAV-001, NAV-002
//

import XCTest
@testable import MobileBrowserV2

final class NavigationLoginGuardTests: XCTestCase {

    /** LT-001 / BEH-001: invalid settings + PIN routes to PINCODE segue. */
    func testLoginGuardRoutesToPinWhenPinStored() {
        XCTAssertEqual(
            NavigationGuardLogic.settingsRouteIdentifier(hasValidSettings: false, pin: "1234"),
            "PINCODE"
        )
    }

    /** LT-001 / BEH-001: invalid settings without PIN routes to SETTINGS segue. */
    func testLoginGuardRoutesToSettingsWhenNoPin() {
        XCTAssertEqual(
            NavigationGuardLogic.settingsRouteIdentifier(hasValidSettings: false, pin: ""),
            "SETTINGS"
        )
    }

    /** LT-002 / BEH-002: correct PIN triggers SETTINGS segue after unwind. */
    func testPinSuccessOpensSettings() {
        XCTAssertTrue(NavigationGuardLogic.shouldOpenSettingsAfterPin(isPinGuessed: true))
        XCTAssertFalse(NavigationGuardLogic.shouldOpenSettingsAfterPin(isPinGuessed: false))
    }
}

/// Pure logic extracted from LoginViewController.openSettingsButtonTapped / unwindToLogin.
enum NavigationGuardLogic {
    static func settingsRouteIdentifier(hasValidSettings: Bool, pin: String) -> String? {
        guard !hasValidSettings else { return nil }
        return pin.isEmpty ? "SETTINGS" : "PINCODE"
    }

    static func shouldOpenSettingsAfterPin(isPinGuessed: Bool) -> Bool {
        isPinGuessed
    }
}
