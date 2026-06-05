import XCTest
@testable import MobileBrowserV2

final class NavigationFeatureTests: XCTestCase {
    override func setUp() {
        super.setUp()
        PreferencesUtils.saveSettingsPreferences(
            server: "os10.prestige.de",
            client: "108",
            token: nil,
            pin: nil,
            httpProtocol: HttpProtocolEnum.https.rawValue
        )
        PreferencesUtils.saveLoginPreferences(user: "demo", password: "secret")
        PreferencesUtils.saveValidSettingsPreference(false)
        PreferencesUtils.saveValidLoginPreference(false)
    }

    func testLoginSettingsGuardOpensSettingsWithoutPin() {
        PreferencesUtils.pin = nil
        let viewController = RecordingLoginNavigationViewController()

        viewController.openSettingsButtonTapped(UIBarButtonItem())

        XCTAssertEqual(viewController.performedSegueIdentifier, "SETTINGS")
    }

    func testLoginSettingsGuardOpensPinWithStoredPin() {
        PreferencesUtils.pin = "1234"
        let viewController = RecordingLoginNavigationViewController()

        viewController.openSettingsButtonTapped(UIBarButtonItem())

        XCTAssertEqual(viewController.performedSegueIdentifier, "PINCODE")
    }

    func testPinSuccessUnwindOpensSettings() {
        let login = RecordingLoginNavigationViewController()
        let pin = PinCodeViewController()
        pin.isPinCodeGuessed = true
        let segue = UIStoryboardSegue(identifier: "BACK_TO_LOGIN", source: pin, destination: login)

        login.unwindToLogin(segue: segue)

        XCTAssertEqual(login.performedSegueIdentifier, "SETTINGS")
    }

    func testWebviewPreparePassesRebuiltUrlToWrapper() {
        PreferencesUtils.saveValidLoginPreference(true)
        let login = LoginViewController()
        let wrapper = WebsiteWrapperViewController()
        let segue = UIStoryboardSegue(identifier: "WEBVIEW", source: login, destination: wrapper)

        login.prepare(for: segue, sender: nil)

        XCTAssertEqual(
            wrapper.url,
            "https://os10.prestige.de/PrestigeEnterprise.MobileBrowser108/Default.aspx?user=demo&password=c2VjcmV0&App=MobileBrowser"
        )
    }

    func testArticleScannerAddsScanResultOnlyWhenCodeExists() {
        let scanner = ArticleScannerViewController()
        scanner.redirectUrl = "https://os10.prestige.de/scan"
        scanner.codeValue = "4711"
        let wrapper = WebsiteWrapperViewController()
        let segue = UIStoryboardSegue(identifier: "BACK_TO_WEBVIEW", source: scanner, destination: wrapper)

        scanner.prepare(for: segue, sender: nil)

        XCTAssertEqual(wrapper.url, "https://os10.prestige.de/scan&ScanResult=4711")

        let cancelScanner = ArticleScannerViewController()
        cancelScanner.redirectUrl = "https://os10.prestige.de/scan"
        let cancelWrapper = WebsiteWrapperViewController()
        let cancelSegue = UIStoryboardSegue(identifier: "BACK_TO_WEBVIEW", source: cancelScanner, destination: cancelWrapper)

        cancelScanner.prepare(for: cancelSegue, sender: nil)

        XCTAssertEqual(cancelWrapper.url, "https://os10.prestige.de/scan")
    }

    func testRouteConstantsPreserveNavigationTokens() {
        XCTAssertEqual(AppSettings.BARCODESCANNER, "barcodescanner")
        XCTAssertEqual(AppSettings.HTTP, "http://")
        XCTAssertEqual(AppSettings.SCAN_RESULT, "&ScanResult=")
        XCTAssertEqual(AppSettings.LOGIN, "login.aspx")
        XCTAssertEqual(AppSettings.ERROR, "error=-")
    }
}

private final class RecordingLoginNavigationViewController: LoginViewController {
    var performedSegueIdentifier: String?

    override func performSegue(withIdentifier identifier: String, sender: Any?) {
        performedSegueIdentifier = identifier
    }
}
