package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import android.content.SharedPreferences;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * login Phase 2 — LT-002, LT-004, LT-005, LT-007, BEH-005, BEH-009, BEH-010, EC-002
 */
@RunWith(RobolectricTestRunner.class)
@Config(manifest = Config.NONE, sdk = 28, application = android.app.Application.class)
public class PreferencesUtilsLoginTest {

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

    /** LT-002: invalid settings gate blocks login path. */
    @Test
    public void hasValidSettingsPreference_falseWhenNotConfigured() {
        PreferencesUtils.saveValidSettingsPreference(false);

        assertFalse(PreferencesUtils.hasValidSettingsPreference());
        assertFalse(PreferencesUtils.getLoginPreferences().hasValidSettings);
    }

    /** LT-004 / BEH-009 / BEH-010 / STOR-006..STOR-008: credentials and login flag persist. */
    @Test
    public void saveLoginPreferences_persistsEncodedPasswordAndValidLoginFlag() {
        String encodedPassword = StringUtils.encodeBase64("secret");

        PreferencesUtils.saveLoginPreferences("testuser", encodedPassword);
        PreferencesUtils.saveValidLoginPreference(true);

        LoginPreferences prefs = PreferencesUtils.getLoginPreferences();
        assertEquals("testuser", prefs.user);
        assertEquals(encodedPassword, prefs.password);
        assertTrue(prefs.hasValidLogin);
        assertTrue(PreferencesUtils.hasValidLoginPreference());
    }

    /** LT-004 / BEH-005: login URL includes user and encoded password parameter. */
    @Test
    public void buildLoginUrl_includesEncodedPassword() {
        String encoded = StringUtils.encodeBase64("p@ss!");

        String url = PreferencesUtils.buildLoginUrl(
                "os10.prestige.de", "108", "user1", encoded, true);

        assertTrue(url.contains("user=user1"));
        assertTrue(url.contains("&password=" + encoded));
        assertTrue(url.contains("App=MobileBrowser"));
    }

    /** EC-002: special characters in password survive Base64 embedding in URL. */
    @Test
    public void buildLoginUrl_acceptsSpecialCharacterPassword() {
        String encoded = StringUtils.encodeBase64("!@#$%^&*");

        String url = PreferencesUtils.buildLoginUrl(
                "server.example.com", "108", "user1", encoded, true);

        assertTrue(url.contains("&password=" + encoded));
    }

    /** LT-005 / NAV-004: PIN present when settings invalid — routing decision input. */
    @Test
    public void getLoginPreferences_pinPresentWhenStored() {
        PreferencesUtils.saveSettingsPreferences(
                "server.example.com", "108", "token", "1234", PreferencesUtils.PROTOCOL_HTTPS);
        PreferencesUtils.saveValidSettingsPreference(false);

        LoginPreferences prefs = PreferencesUtils.getLoginPreferences();
        assertFalse(prefs.hasValidSettings);
        assertFalse(prefs.pin.isEmpty());
    }

    /** LT-005 / NAV-004: no PIN when settings invalid — settings route input. */
    @Test
    public void getLoginPreferences_pinEmptyRoutesToSettings() {
        PreferencesUtils.saveSettingsPreferences(
                "server.example.com", "108", "token", "", PreferencesUtils.PROTOCOL_HTTPS);
        PreferencesUtils.saveValidSettingsPreference(false);

        LoginPreferences prefs = PreferencesUtils.getLoginPreferences();
        assertFalse(prefs.hasValidSettings);
        assertTrue(prefs.pin.isEmpty());
    }

    /** LT-007 / STATE-004 / BEH-007: background logout clears valid login flag. */
    @Test
    public void saveValidLoginPreference_falseOnLogout() {
        PreferencesUtils.saveValidLoginPreference(true);
        assertTrue(PreferencesUtils.hasValidLoginPreference());

        PreferencesUtils.saveValidLoginPreference(false);

        assertFalse(PreferencesUtils.hasValidLoginPreference());
        assertFalse(PreferencesUtils.getLoginPreferences().hasValidLogin);
    }

    /** BEH-017 / API-002: buildLoginUrlFromPreferences uses stored credentials. */
    @Test
    public void buildLoginUrlFromPreferences_usesStoredUserAndPassword() {
        String encoded = StringUtils.encodeBase64("secret");
        preferences.edit()
                .putString("preference_server_key", "os10.prestige.de")
                .putString("preference_client_key", "108")
                .putString("preference_user_key", "storedUser")
                .putString("preference_password_key", encoded)
                .putInt("preference_protocol_key", PreferencesUtils.PROTOCOL_HTTPS)
                .commit();

        String url = PreferencesUtils.buildLoginUrlFromPreferences();

        assertTrue(url.contains("storedUser"));
        assertTrue(url.contains("&password=" + encoded));
    }
}
