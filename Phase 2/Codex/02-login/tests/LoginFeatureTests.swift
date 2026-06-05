import XCTest
@testable import MobileBrowserV2

final class LoginFeatureTests: XCTestCase {
    override func setUp() {
        super.setUp()
        PreferencesUtils.saveSettingsPreferences(
            server: "",
            client: nil,
            token: nil,
            pin: nil,
            httpProtocol: HttpProtocolEnum.https.rawValue
        )
        PreferencesUtils.saveLoginPreferences(user: "", password: "")
        PreferencesUtils.saveValidSettingsPreference(false)
        PreferencesUtils.saveValidLoginPreference(false)
    }

    func testLoginRequiresUsernameBeforeRequest() {
        PreferencesUtils.saveValidSettingsPreference(true)
        let viewController = RecordingLoginViewController()
        let username = UITextField()
        let password = UITextField()
        username.text = ""
        password.text = "secret"
        viewController.userName = username
        viewController.password = password

        viewController.LoginButtonTouchUp(UIButton())

        XCTAssertEqual(viewController.presentedAlert?.message, Messages.usernameNotFound)
        XCTAssertFalse(PreferencesUtils.hasValidLoginPreference())
    }

    func testLoginRequiresPasswordBeforeRequest() {
        PreferencesUtils.saveValidSettingsPreference(true)
        let viewController = RecordingLoginViewController()
        let username = UITextField()
        let password = UITextField()
        username.text = "demo"
        password.text = ""
        viewController.userName = username
        viewController.password = password

        viewController.LoginButtonTouchUp(UIButton())

        XCTAssertEqual(viewController.presentedAlert?.message, Messages.passwordNotFound)
        XCTAssertFalse(PreferencesUtils.hasValidLoginPreference())
    }

    func testInvalidSettingsBlockLoginBeforeUrlBuild() {
        let viewController = RecordingLoginViewController()
        let username = UITextField()
        let password = UITextField()
        username.text = "demo"
        password.text = "secret"
        viewController.userName = username
        viewController.password = password

        viewController.LoginButtonTouchUp(UIButton())

        XCTAssertEqual(viewController.presentedAlert?.message, Messages.loginErrorGeneric)
        XCTAssertFalse(PreferencesUtils.hasValidLoginPreference())
    }

    func testLoginUrlAndSuccessStatePersistenceUseCredentials() {
        PreferencesUtils.saveSettingsPreferences(
            server: "os10.prestige.de",
            client: "108",
            token: nil,
            pin: nil,
            httpProtocol: HttpProtocolEnum.https.rawValue
        )

        let url = UrlUtils.buildLoginUrl(
            server: "os10.prestige.de",
            client: "108",
            user: "demo user",
            password: "pa$$ word",
            isHttps: true
        )

        XCTAssertEqual(
            url,
            "https://os10.prestige.de/PrestigeEnterprise.MobileBrowser108/Default.aspx?user=demo%20user&password=cGEkJCB3b3Jk&App=MobileBrowser"
        )

        PreferencesUtils.saveLoginPreferences(user: "demo user", password: "pa$$ word")
        PreferencesUtils.saveValidLoginPreference(true)

        XCTAssertEqual(PreferencesUtils.userName, "demo user")
        XCTAssertEqual(PreferencesUtils.password, "pa$$ word")
        XCTAssertTrue(PreferencesUtils.hasValidLoginPreference())
    }

    func testPinGateAcceptsOnlyExactMatch() {
        let viewController = RecordingPinCodeViewController()
        viewController.pinCode = "1234"
        viewController.loadViewIfNeeded()

        let pinView = try XCTUnwrap(viewController.view.subviews.compactMap { $0 as? PinCodeView }.first)
        ["1", "2", "3", "4"].forEach { pinView.insertText($0) }

        XCTAssertTrue(viewController.isPinCodeGuessed)
        XCTAssertEqual(viewController.performedSegueIdentifier, "BACK_TO_LOGIN")
    }

    func testPinGateRejectsMismatchAndClearsEntry() {
        let viewController = RecordingPinCodeViewController()
        viewController.pinCode = "1234"
        viewController.loadViewIfNeeded()

        let pinView = try XCTUnwrap(viewController.view.subviews.compactMap { $0 as? PinCodeView }.first)
        ["1", "2", "3", "5"].forEach { pinView.insertText($0) }

        let errorField = try XCTUnwrap(
            viewController.view.subviews.compactMap { $0 as? UITextField }
                .first { $0.text == Messages.invalidPin }
        )
        XCTAssertFalse(viewController.isPinCodeGuessed)
        XCTAssertFalse(errorField.isHidden)
        XCTAssertEqual(pinView.code, "")
    }

    func testAppBackgroundLogoutResetsValidLoginFlag() {
        PreferencesUtils.saveLoginPreferences(user: "demo", password: "secret")
        PreferencesUtils.saveValidLoginPreference(true)

        AppDelegate().logout {}

        XCTAssertFalse(PreferencesUtils.hasValidLoginPreference())
    }
}

private final class RecordingLoginViewController: LoginViewController {
    var presentedAlert: UIAlertController?

    override func present(
        _ viewControllerToPresent: UIViewController,
        animated flag: Bool,
        completion: (() -> Void)? = nil
    ) {
        presentedAlert = viewControllerToPresent as? UIAlertController
        completion?()
    }
}

private final class RecordingPinCodeViewController: PinCodeViewController {
    var performedSegueIdentifier: String?

    override func performSegue(withIdentifier identifier: String, sender: Any?) {
        performedSegueIdentifier = identifier
    }
}
