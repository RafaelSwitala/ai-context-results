package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import android.content.SharedPreferences;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import de.onlinesoftwareag.boa.mobilebrowser4android.App;
import de.onlinesoftwareag.boa.mobilebrowser4android.utility.NetworkUrilities.HttpStatusUtil;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * storage-config PreferencesUtils / URL builder tests.
 */
@RunWith(RobolectricTestRunner.class)
@Config(manifest = Config.NONE, sdk = 28, application = android.app.Application.class)
public class PreferencesUtilsStorageConfigTest {

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

    /** LT-021: login URL contains MobileBrowser app marker and Culture query param. */
    @Test
    public void buildLoginUrl_includesCulture() {
        String url = PreferencesUtils.buildLoginUrl(
                "os10.prestige.de", "108", "user1", "cGFzcw==", true);

        assertTrue(url.contains("App=MobileBrowser"));
        assertTrue(url.contains("Culture=de-DE"));
        assertTrue(url.contains("user=user1"));
    }

    /** LT-023: server already contains scheme — no duplicate http prefix. */
    @Test
    public void buildLoginUrl_doesNotDoubleScheme() {
        String url = PreferencesUtils.buildLoginUrl(
                "https://os10.prestige.de", "108", "user1", "", true);

        assertFalse(url.contains("https://https://"));
        assertTrue(url.startsWith("https://os10.prestige.de"));
    }

    /** LT-024: empty client still builds MobileBrowser path segment. */
    @Test
    public void buildLoginUrl_allowsEmptyClient() {
        String url = PreferencesUtils.buildLoginUrl("server.example.com", "", "user1", "", true);

        assertTrue(url.contains(String.format(App.URL_PATH)));
        assertTrue(url.contains(App.DEFAULT));
    }

    /** LT-022: Douglas DNS migration rewrites stored server name. */
    @Test
    public void replaceDouglasServerName_migratesOldDns() {
        preferences.edit()
                .putString("preference_server_key", "prestigeweb01.dhag.rd.local")
                .putString("preference_client_key", "")
                .putString("preference_user_key", "")
                .putString("preference_password_key", "")
                .putString("preference_token_key", "")
                .putString("preference_pin_key", "")
                .putInt("preference_protocol_key", PreferencesUtils.PROTOCOL_HTTPS)
                .putBoolean("preference_valid_settings_key", false)
                .putBoolean("preference_valid_login_key", false)
                .commit();

        PreferencesUtils.replaceDouglasServerName();

        assertEquals("prestigeweb01.douglas-informatik.de",
                preferences.getString("preference_server_key", ""));
    }

    /** LT-026: invalid protocol values must not be persisted. */
    @Test
    public void saveProtocolPreference_ignoresOutOfRange() {
        preferences.edit().putInt("preference_protocol_key", PreferencesUtils.PROTOCOL_HTTPS).commit();

        PreferencesUtils.saveProtocolPreference(-1);
        PreferencesUtils.saveProtocolPreference(3);

        assertEquals(PreferencesUtils.PROTOCOL_HTTPS,
                preferences.getInt("preference_protocol_key", -1));
    }

    /** LT-016 / LT-017: HTTP status gate used before persisting settings. */
    @Test
    public void httpStatusUtil_okBranchMatchesSaveGate() {
        assertTrue(HttpStatusUtil.isOkHttpStatusCode(200));
        assertFalse(HttpStatusUtil.isOkHttpStatusCode(500));
    }

    /** LT-008 / LT-019: query-only payloads normalize then parse as valid MB QR. */
    @Test
    public void normalizeQueryOnlyPayload_thenParseValid() {
        String queryOnly = "p=MB&v=1&server=test.example.com&mandant=1&https=1&token=&pin=1234";
        String normalized = queryOnly.contains("?") ? queryOnly : "http://localhost?" + queryOnly;

        QRCodeSettings settings = QRCodeParser.parse(normalized);
        assertTrue(settings.isValid());
    }
}
