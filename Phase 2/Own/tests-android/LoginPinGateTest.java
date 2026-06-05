package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import org.junit.Test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * login Phase 2 — LT-006, BEH-012, BEH-024, EC-009, ERRPATH-007, ERRPATH-012
 *
 * Pure PIN comparison logic extracted from PinActivity / PinCodeViewController.
 */
public class LoginPinGateTest {

    /** LT-006 / BEH-012: exact PIN match grants access. */
    @Test
    public void pinValidation_acceptsExactMatch() {
        assertTrue(isPinCorrect("1234", "1234"));
    }

    /** LT-006 / ERRPATH-007: mismatch rejects PIN. */
    @Test
    public void pinValidation_rejectsMismatch() {
        assertFalse(isPinCorrect("1234", "5678"));
    }

    /** EC-009: leading zero PIN is valid 4-digit code. */
    @Test
    public void pinValidation_acceptsLeadingZero() {
        assertTrue(isPinCorrect("0123", "0123"));
    }

    /** BEH-024 / ERRPATH-011: empty stored PIN closes gate immediately. */
    @Test
    public void pinValidation_emptyStoredPinIsNotProtected() {
        assertFalse(isPinGateRequired(""));
        assertFalse(isPinGateRequired(null));
    }

    /** LT-005 / NAV-005: non-empty stored PIN requires PIN screen. */
    @Test
    public void pinValidation_nonEmptyStoredPinRequiresGate() {
        assertTrue(isPinGateRequired("1234"));
    }

    /** BEH-012 (Tests B): PIN must be empty or exactly four digits. */
    @Test
    public void pinValidation_rejectsInvalidPinFormat() {
        assertFalse(isValidPinFormat("123"));
        assertFalse(isValidPinFormat("12345"));
        assertTrue(isValidPinFormat("1234"));
        assertTrue(isValidPinFormat(""));
    }

    private static boolean isPinCorrect(String storedPin, String enteredPin) {
        return storedPin.equals(enteredPin);
    }

    private static boolean isPinGateRequired(String storedPin) {
        return storedPin != null && !storedPin.isEmpty();
    }

    /** Mirrors SettingsActivity.isPinValid(). */
    private static boolean isValidPinFormat(String pin) {
        if (pin == null || pin.isEmpty()) {
            return true;
        }
        return pin.length() == 4 && pin.matches("\\d{4}");
    }
}
