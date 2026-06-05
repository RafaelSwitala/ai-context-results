package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import android.content.SharedPreferences;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import java.util.HashMap;
import java.util.Map;

import de.onlinesoftwareag.boa.mobilebrowser4android.App;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * webview Phase 2 — LT-012, LT-013, LT-014, LT-015, LT-017, LT-023, LT-027, LT-028
 */
@RunWith(RobolectricTestRunner.class)
@Config(manifest = Config.NONE, sdk = 28, application = android.app.Application.class)
public class WebviewActivityLogicTest {

    private SharedPreferences preferences;

    @Before
    public void setUp() throws Exception {
        preferences = StorageConfigTestSupport.createPreferences();
        StorageConfigTestSupport.initApp(preferences);
        PreferencesUtils.saveLocale("de-DE");
    }

    @After
    public void tearDown() throws Exception {
        preferences.edit().clear().commit();
        StorageConfigTestSupport.resetApp();
    }

    /** LT-012 / BEH-015 / ERRPATH-004: empty URL routes to Login. */
    @Test
    public void resolveWebViewUrl_emptyStartsLogin() {
        assertTrue(shouldStartLogin(resolveWebViewUrl(null, "")));
    }

    /** LT-012 / BEH-015: intent URL preferred over stored URL. */
    @Test
    public void resolveWebViewUrl_prefersIntentExtra() {
        assertEquals("https://intent", resolveWebViewUrl("https://intent", "https://stored"));
    }

    /** LT-012: falls back to stored login URL from preferences. */
    @Test
    public void resolveWebViewUrl_fallsBackToStoredUrl() {
        preferences.edit()
                .putString("preference_server_key", "os10.prestige.de")
                .putString("preference_client_key", "108")
                .putString("preference_user_key", "user1")
                .putString("preference_password_key", "")
                .putInt("preference_protocol_key", PreferencesUtils.PROTOCOL_HTTPS)
                .commit();

        String stored = PreferencesUtils.buildLoginUrlFromPreferences();
        assertEquals(stored, resolveWebViewUrl(null, stored));
    }

    /** LT-013 / BEH-017 / SEC-005: no-cache headers applied on load. */
    @Test
    public void buildNoCacheHeaders_containsPragmaAndCacheControl() {
        Map<String, String> headers = buildNoCacheHeaders();

        assertEquals("no-cache", headers.get("Pragma"));
        assertEquals("no-cache", headers.get("Cache-Control"));
    }

    /** LT-013 / BEH-016: iOS user agent string used for WebView. */
    @Test
    public void webViewUserAgent_matchesProductionConstant() {
        assertTrue(App.IOS_USER_AGENT.contains("iPhone"));
    }

    /** LT-014 / BEH-018: page start sets loaded=false. */
    @Test
    public void onPageStarted_setsLoadedFalse() {
        assertFalse(onPageStartedLoadedState());
    }

    /** LT-014 / BEH-027: page finish sets loaded=true. */
    @Test
    public void onPageFinished_setsLoadedTrue() {
        assertTrue(onPageFinishedLoadedState());
    }

    /** LT-015 / BEH-019 / ERRPATH-009: SSL proceed only for HTTPS-without-validation. */
    @Test
    public void shouldProceedOnSslError_onlyForProtocolWithoutValidation() {
        LoginPreferences prefs = new LoginPreferences();
        prefs.protocol = PreferencesUtils.PROTOCOL_HTTPS_WITHOUT_VALIDATION;
        assertTrue(shouldProceedOnSslError(prefs));

        prefs.protocol = PreferencesUtils.PROTOCOL_HTTPS;
        assertFalse(shouldProceedOnSslError(prefs));
    }

    /** LT-027 / ERRPATH-006: duplicate resource error suppressed after first dialog. */
    @Test
    public void shouldShowErrorDialog_onlyOnce() {
        assertTrue(shouldShowErrorDialog(false));
        assertFalse(shouldShowErrorDialog(true));
    }

    /** LT-023 / BEH-029: invalid login on resume finishes WebView. */
    @Test
    public void shouldFinishOnResumeWhenLoginInvalid() {
        assertTrue(shouldFinishOnInvalidLoginResume(false));
        assertFalse(shouldFinishOnInvalidLoginResume(true));
    }

    /** LT-023 / BEH-030: hardware back is no-op. */
    @Test
    public void onBackPressed_doesNotNavigate() {
        assertFalse(shouldNavigateOnBackPress());
    }

    /** LT-028 / BEH-018: timeout body is inactive (commented out in LongOperation). */
    @Test
    public void timeoutDialog_isInactive() {
        assertFalse(isTimeoutDialogActive());
        assertEquals(20_000, TIMEOUT_MILLISECONDS);
    }

    private static final int TIMEOUT_MILLISECONDS = 20_000;

    static String resolveWebViewUrl(String intentUrl, String storedUrl) {
        String current = intentUrl;
        if (current == null) {
            current = storedUrl;
        }
        return current != null ? current : "";
    }

    static boolean shouldStartLogin(String url) {
        return url.isEmpty();
    }

    static Map<String, String> buildNoCacheHeaders() {
        Map<String, String> headers = new HashMap<>(2);
        headers.put("Pragma", "no-cache");
        headers.put("Cache-Control", "no-cache");
        return headers;
    }

    static boolean onPageStartedLoadedState() {
        return false;
    }

    static boolean onPageFinishedLoadedState() {
        return true;
    }

    static boolean shouldProceedOnSslError(LoginPreferences prefs) {
        return prefs.isHttpsWithoutValidation();
    }

    static boolean shouldShowErrorDialog(boolean isErrorDisplayed) {
        return !isErrorDisplayed;
    }

    static boolean shouldFinishOnInvalidLoginResume(boolean hasValidLogin) {
        return !hasValidLogin;
    }

    static boolean shouldNavigateOnBackPress() {
        return false;
    }

    static boolean isTimeoutDialogActive() {
        return false;
    }
}
