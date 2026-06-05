package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import org.junit.Test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * login Phase 2 — LT-003, LT-004, EC-007, EC-012, BEH-006 (Tests B)
 *
 * HTTP success gate extracted from iOS LoginViewController login request handling.
 */
public class LoginHttpLogicTest {

    /** LT-003 / LT-004 (Tests B): HTTP 200 without error query succeeds. */
    @Test
    public void loginHttp_successOn200WithoutErrorCode() {
        assertTrue(isLoginHttpSuccess(200, ""));
    }

    /** LT-003 (Tests B): HTTP 200 with Error= query fails login. */
    @Test
    public void loginHttp_failsOn200WithErrorCode() {
        assertFalse(isLoginHttpSuccess(200, "-6"));
    }

    /** EC-007 / EC-012 (Tests B): non-200 status fails login. */
    @Test
    public void loginHttp_failsOnHttp500() {
        assertFalse(isLoginHttpSuccess(500, ""));
    }

    /** EC-006 (Tests B): network timeout (non-positive status) fails login. */
    @Test
    public void loginHttp_failsOnNetworkTimeout() {
        assertFalse(isLoginHttpSuccess(-1, ""));
    }

    /** BEH-006 (Tests B): duplicate request blocked while in flight. */
    @Test
    public void loginHttp_blocksDuplicateRequestWhileInFlight() {
        assertFalse(shouldStartLoginRequest(true));
        assertTrue(shouldStartLoginRequest(false));
    }

    /**
     * Mirrors iOS LoginViewController AF.request success branch:
     * status 200 and no Error= suffix in response URL query.
     */
    static boolean isLoginHttpSuccess(int statusCode, String errorCodeFromUrl) {
        if (statusCode != 200) {
            return false;
        }
        return errorCodeFromUrl == null || errorCodeFromUrl.isEmpty();
    }

    static boolean shouldStartLoginRequest(boolean requestInFlight) {
        return !requestInFlight;
    }
}
