import XCTest
@testable import MobileBrowserV2

final class StorageConfigQRCodeParserTests: XCTestCase {
    func testParserMapsValidSettings() {
        let settings = QRCodeParser.parse(
            url: "https://s.prestige.de/s/demo?p=MB&v=1&server=os10.prestige.de&mandant=108&https=1&token=abc&pin=1234"
        )

        XCTAssertTrue(settings.isValid())
        XCTAssertEqual(settings.Protocol, "MB")
        XCTAssertEqual(settings.ProtocolVersion, "1")
        XCTAssertEqual(settings.Server, "os10.prestige.de")
        XCTAssertEqual(settings.Client, "108")
        XCTAssertEqual(settings.Token, "abc")
        XCTAssertEqual(settings.Pin, "1234")
        XCTAssertEqual(settings.SecurityProtocol, .https)
    }

    func testParserDefaultsInvalidHttpsToHttps() {
        let settings = QRCodeParser.parse(
            url: "https://s.prestige.de/s/demo?p=MB&v=1&server=os10.prestige.de&mandant=108&https=x"
        )

        XCTAssertTrue(settings.isValid())
        XCTAssertEqual(settings.SecurityProtocol, .https)
    }

    func testParserRejectsMissingProtocol() {
        let settings = QRCodeParser.parse(
            url: "https://s.prestige.de/s/demo?v=1&server=os10.prestige.de&mandant=108"
        )

        XCTAssertFalse(settings.isValid())
    }
}
