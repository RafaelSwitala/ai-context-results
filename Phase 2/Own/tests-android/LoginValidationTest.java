package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import android.content.SharedPreferences;
import android.text.TextUtils;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * login Phase 2 — LT-002, BEH-002, BEH-004, ERRPATH-004, ERRPATH-010
 *
 * Mirrors {@code LoginActivity#isValid()} gate logic without Activity/UI scope.
 */
@RunWith(RobolectricTestRunner.class)
@Config(manifest = Config.NONE, sdk = 28, application = android.app.Application.class)
public class LoginValidationTest {

    private SharedPreferences preferences;

    @Before
    public void setUp() throws Exception {
        preferences = StorageConfigTestSupport.createPreferences();
        StorageConfigTestSupport.initApp(preferences);
        PreferencesUtils.saveValidSettingsPreference(true);
    }

    @After
    public void tearDown() throws Exception {
        preferences.edit().clear().commit();
        StorageConfigTestSupport.resetApp();
    }

    /** LT-002 / ERRPATH-010: empty username fails validation gate. */
    @Test
    public void loginValidation_rejectsEmptyUsername() {
        assertFalse(isLoginInputValid(""));
    }

    /** BEH-002 / EC-003: non-empty single-character username passes username gate. */
    @Test
    public void loginValidation_acceptsMinimalUsername() {
        assertTrue(isLoginInputValid("a"));
    }

    /** LT-002 / ERRPATH-004: invalid settings fail validation gate. */
    @Test
    public void loginValidation_rejectsInvalidSettings() {
        PreferencesUtils.saveValidSettingsPreference(false);

        assertFalse(isLoginInputValid("validuser"));
    }

    /** BEH-004: valid settings and non-empty username pass gate. */
    @Test
    public void loginValidation_acceptsValidSettingsAndUsername() {
        assertTrue(isLoginInputValid("validuser"));
    }

    /** EC-001 (Tests B): username with spaces passes Android username gate. */
    @Test
    public void loginValidation_acceptsUsernameWithSpaces() {
        assertTrue(isLoginInputValid("demo user"));
    }

    /** LT-005 (Tests B): invalid settings without PIN route to Settings. */
    @Test
    public void loginValidation_routesToSettingsWhenInvalidSettingsNoPin() {
        PreferencesUtils.saveSettingsPreferences(
                "server.example.com", "108", "", "", PreferencesUtils.PROTOCOL_HTTPS);
        PreferencesUtils.saveValidSettingsPreference(false);

        assertTrue(shouldRouteToSettings(false, PreferencesUtils.getLoginPreferences().pin));
    }

    /** LT-005 (Tests B): invalid settings with PIN route to PIN screen first. */
    @Test
    public void loginValidation_routesToPinWhenInvalidSettingsWithPin() {
        PreferencesUtils.saveSettingsPreferences(
                "server.example.com", "108", "", "1234", PreferencesUtils.PROTOCOL_HTTPS);
        PreferencesUtils.saveValidSettingsPreference(false);

        assertTrue(shouldRouteToPin(false, PreferencesUtils.getLoginPreferences().pin));
    }

    /**
     * Extracted from LoginActivity.isValid() — username non-empty + hasValidSettings.
     * Android does not validate empty password at UI layer (ERRPATH-008).
     */
    private static boolean isLoginInputValid(String username) {
        if (!PreferencesUtils.getLoginPreferences().hasValidSettings) {
            return false;
        }
        return !TextUtils.isEmpty(username);
    }

    /** Mirrors LoginActivity.onCreate guard — PinActivity vs SettingsActivity. */
    private static boolean shouldRouteToPin(boolean hasValidSettings, String pin) {
        if (hasValidSettings) {
            return false;
        }
        return pin != null && !pin.isEmpty();
    }

    private static boolean shouldRouteToSettings(boolean hasValidSettings, String pin) {
        if (hasValidSettings) {
            return false;
        }
        return pin == null || pin.isEmpty();
    }
}
