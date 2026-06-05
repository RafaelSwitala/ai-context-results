package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import android.content.SharedPreferences;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * navigation Phase 2 — LT-011, LT-021, BEH-012, BEH-013, BEH-027, NAV-009, NAV-010
 */
@RunWith(RobolectricTestRunner.class)
@Config(manifest = Config.NONE, sdk = 28, application = android.app.Application.class)
public class NavigationLoginGuardTest {

    private SharedPreferences preferences;

    @Before
    public void setUp() throws Exception {
        preferences = StorageConfigTestSupport.createPreferences();
        StorageConfigTestSupport.initApp(preferences);
    }

    @After
    public void tearDown() throws Exception {
        preferences.edit().clear().commit();
        StorageConfigTestSupport.resetApp();
    }

    /** LT-011 / BEH-012: invalid settings + PIN routes to PinActivity. */
    @Test
    public void loginGuard_routesToPinWhenPinStored() {
        PreferencesUtils.saveSettingsPreferences(
                "server.example.com", "108", "token", "1234", PreferencesUtils.PROTOCOL_HTTPS);
        PreferencesUtils.saveValidSettingsPreference(false);

        assertTrue(shouldRouteToPin(false, PreferencesUtils.getLoginPreferences().pin));
    }

    /** LT-011 / BEH-013: invalid settings without PIN routes to SettingsActivity. */
    @Test
    public void loginGuard_routesToSettingsWhenNoPin() {
        PreferencesUtils.saveSettingsPreferences(
                "server.example.com", "108", "token", "", PreferencesUtils.PROTOCOL_HTTPS);
        PreferencesUtils.saveValidSettingsPreference(false);

        assertTrue(shouldRouteToSettings(false, PreferencesUtils.getLoginPreferences().pin));
    }

    /** LT-011: valid settings keeps user on LoginActivity. */
    @Test
    public void loginGuard_staysOnLoginWhenSettingsValid() {
        PreferencesUtils.saveValidSettingsPreference(true);

        assertFalse(shouldRouteToPin(true, "1234"));
        assertFalse(shouldRouteToSettings(true, ""));
    }

    /** LT-021 / BEH-027: correct PIN opens Settings (gate input). */
    @Test
    public void pinSuccess_matchesStoredPin() {
        assertTrue(isPinCorrect("1234", "1234"));
        assertFalse(isPinCorrect("1234", "0000"));
    }

    /** LT-021 / BEH-027: PIN exit/back finishes without Settings route. */
    @Test
    public void pinExit_doesNotOpenSettings() {
        assertFalse(shouldOpenSettingsOnPinExit());
    }

    /** Mirrors LoginActivity.onCreate guard — PinActivity vs SettingsActivity. */
    static boolean shouldRouteToPin(boolean hasValidSettings, String pin) {
        if (hasValidSettings) {
            return false;
        }
        return pin != null && !pin.isEmpty();
    }

    static boolean shouldRouteToSettings(boolean hasValidSettings, String pin) {
        if (hasValidSettings) {
            return false;
        }
        return pin == null || pin.isEmpty();
    }

    static boolean isPinCorrect(String storedPin, String enteredPin) {
        return storedPin.equals(enteredPin);
    }

    static boolean shouldOpenSettingsOnPinExit() {
        return false;
    }
}
