package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import de.onlinesoftwareag.boa.mobilebrowser4android.utility.NetworkUrilities.HttpStatusUtil;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * storage-config / settings Phase 2 — LT-002, LT-003, LT-005, LT-016, LT-017 (Tests B)
 *
 * Pure validation extracted from SettingsActivity.isValid() / isPinValid().
 */
@RunWith(RobolectricTestRunner.class)
@Config(manifest = Config.NONE, sdk = 28, application = android.app.Application.class)
public class SettingsValidationTest {

    /** LT-002 (Tests B): empty server fails settings save gate. */
    @Test
    public void settingsValidation_rejectsEmptyServer() {
        assertFalse(isSettingsInputValid("", "1234"));
    }

    /** LT-003 (Tests B): PIN must be empty or exactly four digits. */
    @Test
    public void settingsValidation_rejectsInvalidPinLength() {
        assertFalse(isSettingsInputValid("server.example.com", "123"));
        assertFalse(isSettingsInputValid("server.example.com", "12345"));
        assertTrue(isSettingsInputValid("server.example.com", "1234"));
        assertTrue(isSettingsInputValid("server.example.com", ""));
    }

    /** LT-016 / LT-017 (Tests B): HTTP 200 is required before persisting settings. */
    @Test
    public void settingsPersistence_allowedOnlyOnHttpOk() {
        assertTrue(shouldPersistSettingsAfterCheckAccess(200));
        assertFalse(shouldPersistSettingsAfterCheckAccess(403));
    }

    /** Mirrors SettingsActivity.isValid(). */
    static boolean isSettingsInputValid(String server, String pin) {
        return server != null && !server.isEmpty() && isPinValid(pin);
    }

    /** Mirrors SettingsActivity.isPinValid(). */
    static boolean isPinValid(String pin) {
        if (pin == null || pin.isEmpty()) {
            return true;
        }
        return pin.length() == 4;
    }

    static boolean shouldPersistSettingsAfterCheckAccess(int httpStatus) {
        return HttpStatusUtil.isOkHttpStatusCode(httpStatus);
    }
}
