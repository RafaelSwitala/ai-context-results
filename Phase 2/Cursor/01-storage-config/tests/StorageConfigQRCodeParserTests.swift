//
//  StorageConfigQRCodeParserTests.swift
//  MobileBrowserV2Tests
//
//  storage-config Phase 2 — LT-006, LT-007, LT-005 (validation)
//

import XCTest
@testable import MobileBrowserV2

final class StorageConfigQRCodeParserTests: XCTestCase {

    private let validQr = "https://example.test?p=MB&v=1&server=os10.prestige.de&mandant=108&https=1&token=abc&pin=1234"

    /** LT-006: QR parser maps valid settings. */
    func testParseMapsValidSettings() {
        let settings = QRCodeParser.parse(url: validQr)

        XCTAssertEqual(settings.Protocol, "MB")
        XCTAssertEqual(settings.ProtocolVersion, "1")
        XCTAssertEqual(settings.Server, "os10.prestige.de")
        XCTAssertEqual(settings.Client, "108")
        XCTAssertEqual(settings.SecurityProtocol, .https)
        XCTAssertEqual(settings.Token, "abc")
        XCTAssertEqual(settings.Pin, "1234")
        XCTAssertTrue(settings.isValid())
    }

    /** LT-007: absent or invalid https defaults to HTTPS. */
    func testParseDefaultsHttpsWhenMissingOrInvalid() {
        let withoutHttps = "https://example.test?p=MB&v=1&server=test.example.com&mandant=1&token=&pin=1234"
        let invalidHttps = "https://example.test?p=MB&v=1&server=test.example.com&mandant=1&https=x&token=&pin=1234"

        XCTAssertEqual(QRCodeParser.parse(url: withoutHttps).SecurityProtocol, .https)
        XCTAssertEqual(QRCodeParser.parse(url: invalidHttps).SecurityProtocol, .https)
    }

    /** LT-009 / invalid QR: missing MB protocol fails validation. */
    func testParseInvalidWithoutMbProtocol() {
        let invalid = "https://example.test?v=1&server=test.example.com&mandant=1&https=1"
        XCTAssertFalse(QRCodeParser.parse(url: invalid).isValid())
    }

    /** LT-008: query-only payload normalizes then parses. */
    func testNormalizeQueryOnlyThenParse() {
        var code = "p=MB&v=1&server=test.example.com&mandant=108&https=1&token=&pin=1234"
        if !code.contains("?") {
            code = "http://localhost?" + code
        }
        XCTAssertTrue(QRCodeParser.parse(url: code).isValid())
    }
}
