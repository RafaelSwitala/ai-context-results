package de.onlinesoftwareag.boa.mobilebrowser4android;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.robolectric.Shadows.shadowOf;

import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.test.core.app.ApplicationProvider;

import java.lang.reflect.Field;
import java.util.HashMap;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.Robolectric;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;
import org.robolectric.shadows.ShadowAlertDialog;

import de.onlinesoftwareag.boa.mobilebrowser4android.utility.LoginPreferences;
import de.onlinesoftwareag.boa.mobilebrowser4android.utility.PreferencesUtils;
import de.onlinesoftwareag.boa.mobilebrowser4android.utility.StringUtils;

@RunWith(RobolectricTestRunner.class)
@Config(sdk = 35)
public class LoginFeatureTest {
    private SharedPreferences sharedPreferences;

    @Before
    public void setUp() throws Exception {
        Context context = ApplicationProvider.getApplicationContext();
        sharedPreferences = context.getSharedPreferences("login-feature-test", Context.MODE_PRIVATE);
        sharedPreferences.edit().clear().commit();

        App app = App.getInstance();
        app.SharedPreferences = sharedPreferences;
        app.DefaulLocale = "de-DE";
        app.AbbrAppName = "MB";
        app.IsDebug = false;
        app.AvailableLanguages = new HashMap<>();
        app.AvailableLanguages.put("de-DE", "Deutsch");

        Field field = PreferencesUtils.class.getDeclaredField("sharedpreferences");
        field.setAccessible(true);
        field.set(null, sharedPreferences);

        PreferencesUtils.saveLocale("de-DE");
        ShadowAlertDialog.reset();
    }

    @Test
    public void loginValidationBlocksMissingUsername() {
        PreferencesUtils.saveSettingsPreferences(
                "os10.prestige.de",
                "108",
                "",
                "",
                PreferencesUtils.PROTOCOL_HTTPS);
        PreferencesUtils.saveValidSettingsPreference(true);

        LoginActivity activity = Robolectric.buildActivity(LoginActivity.class).setup().get();
        ((EditText) activity.findViewById(R.id.input_user)).setText("");
        ((EditText) activity.findViewById(R.id.input_password)).setText("secret");

        ((Button) activity.findViewById(R.id.btn_login)).performClick();

        AlertDialog dialog = ShadowAlertDialog.getLatestAlertDialog();
        assertNotNull(dialog);
        assertEquals(
                activity.getString(R.string.login_error_generic),
                shadowOf(dialog).getMessage());
        assertFalse(PreferencesUtils.hasValidLoginPreference());
        assertNull(shadowOf(activity).getNextStartedActivity());
    }

    @Test
    public void loginPersistsEncodedPasswordAndStartsWebview() {
        PreferencesUtils.saveSettingsPreferences(
                "os10.prestige.de",
                "108",
                "",
                "",
                PreferencesUtils.PROTOCOL_HTTPS);
        PreferencesUtils.saveValidSettingsPreference(true);

        LoginActivity activity = Robolectric.buildActivity(LoginActivity.class).setup().get();
        ((EditText) activity.findViewById(R.id.input_user)).setText("demo");
        ((EditText) activity.findViewById(R.id.input_password)).setText("secret!");

        ((Button) activity.findViewById(R.id.btn_login)).performClick();

        LoginPreferences prefs = PreferencesUtils.getLoginPreferences();
        String encodedPassword = StringUtils.encodeBase64("secret!");
        assertEquals("demo", prefs.user);
        assertEquals(encodedPassword, prefs.password);
        assertTrue(prefs.hasValidLogin);

        Intent nextIntent = shadowOf(activity).getNextStartedActivity();
        assertNotNull(nextIntent);
        assertEquals(WebviewActivity.class.getName(), nextIntent.getComponent().getClassName());
        assertEquals(
                "https://os10.prestige.de/PrestigeEnterprise.MobileBrowser108/Default.aspx"
                        + "?user=demo&password=" + encodedPassword
                        + "&App=MobileBrowser&Culture=de-DE",
                nextIntent.getStringExtra(App.URL));
    }

    @Test
    public void invalidSettingsRouteToSettingsWithoutPinAndPinActivityWithPin() {
        PreferencesUtils.saveSettingsPreferences(
                "os10.prestige.de",
                "108",
                "",
                "",
                PreferencesUtils.PROTOCOL_HTTPS);
        PreferencesUtils.saveValidSettingsPreference(false);

        LoginActivity noPinActivity = Robolectric.buildActivity(LoginActivity.class).setup().get();
        Intent settingsIntent = shadowOf(noPinActivity).getNextStartedActivity();
        assertNotNull(settingsIntent);
        assertEquals(SettingsActivity.class.getName(), settingsIntent.getComponent().getClassName());

        setUpPreferencesWithPin("1234");

        LoginActivity pinActivity = Robolectric.buildActivity(LoginActivity.class).setup().get();
        Intent pinIntent = shadowOf(pinActivity).getNextStartedActivity();
        assertNotNull(pinIntent);
        assertEquals(PinActivity.class.getName(), pinIntent.getComponent().getClassName());
    }

    @Test
    public void settingsButtonRouteUsesPinWhenStored() throws Exception {
        setUpPreferencesWithPin("1234");
        PreferencesUtils.saveValidSettingsPreference(true);

        LoginActivity activity = Robolectric.buildActivity(LoginActivity.class).setup().get();
        ((ImageView) activity.findViewById(R.id.display_settings)).performClick();

        Intent nextIntent = shadowOf(activity).getNextStartedActivity();
        assertNotNull(nextIntent);
        assertEquals(PinActivity.class.getName(), nextIntent.getComponent().getClassName());
    }

    @Test
    public void pinGateAcceptsExactMatchAndRejectsMismatch() {
        setUpPreferencesWithPin("1234");

        PinActivity matchActivity = Robolectric.buildActivity(PinActivity.class).setup().get();
        clickDigits(matchActivity, R.id.button1, R.id.button2, R.id.button3, R.id.button4);

        Intent settingsIntent = shadowOf(matchActivity).getNextStartedActivity();
        assertNotNull(settingsIntent);
        assertEquals(SettingsActivity.class.getName(), settingsIntent.getComponent().getClassName());
        assertTrue(matchActivity.isFinishing());

        setUpPreferencesWithPin("1234");

        PinActivity mismatchActivity = Robolectric.buildActivity(PinActivity.class).setup().get();
        clickDigits(mismatchActivity, R.id.button1, R.id.button2, R.id.button3, R.id.button5);

        assertEquals(
                mismatchActivity.getString(R.string.invalid_pin),
                ((TextView) mismatchActivity.findViewById(R.id.statusMessage)).getText().toString());
        assertEquals("1235", mismatchActivity.userEntered);
        assertNull(shadowOf(mismatchActivity).getNextStartedActivity());
    }

    @Test
    public void appLogoutResetsValidLoginFlag() {
        PreferencesUtils.saveSettingsPreferences(
                "os10.prestige.de",
                "108",
                "",
                "",
                PreferencesUtils.PROTOCOL_HTTPS);
        PreferencesUtils.saveLoginPreferences("demo", StringUtils.encodeBase64("secret"));
        PreferencesUtils.saveValidLoginPreference(true);

        App.getInstance().logout();

        assertFalse(PreferencesUtils.hasValidLoginPreference());
    }

    private void setUpPreferencesWithPin(String pin) {
        PreferencesUtils.saveSettingsPreferences(
                "os10.prestige.de",
                "108",
                "",
                pin,
                PreferencesUtils.PROTOCOL_HTTPS);
        PreferencesUtils.saveValidSettingsPreference(false);
    }

    private void clickDigits(PinActivity activity, int... buttonIds) {
        for (int buttonId : buttonIds) {
            ((Button) activity.findViewById(buttonId)).performClick();
        }
    }
}
