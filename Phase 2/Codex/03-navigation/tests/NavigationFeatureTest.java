package de.onlinesoftwareag.boa.mobilebrowser4android;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.robolectric.Shadows.shadowOf;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;

import androidx.appcompat.widget.Toolbar;
import androidx.test.core.app.ApplicationProvider;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.Robolectric;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;
import org.robolectric.shadows.ShadowActivity;

import de.onlinesoftwareag.boa.mobilebrowser4android.utility.LoginPreferences;
import de.onlinesoftwareag.boa.mobilebrowser4android.utility.PreferencesUtils;
import de.onlinesoftwareag.boa.mobilebrowser4android.utility.StringUtils;

@RunWith(RobolectricTestRunner.class)
@Config(sdk = 35)
public class NavigationFeatureTest {
    private SharedPreferences sharedPreferences;

    @Before
    public void setUp() throws Exception {
        Context context = ApplicationProvider.getApplicationContext();
        sharedPreferences = context.getSharedPreferences("navigation-feature-test", Context.MODE_PRIVATE);
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
    }

    @Test
    public void loginGuardRoutesInvalidSettingsToSettingsWithoutPinAndPinWithPin() {
        saveSettings(false, "");

        LoginActivity settingsActivity = Robolectric.buildActivity(LoginActivity.class).setup().get();
        Intent settingsIntent = shadowOf(settingsActivity).getNextStartedActivity();
        assertNotNull(settingsIntent);
        assertEquals(SettingsActivity.class.getName(), settingsIntent.getComponent().getClassName());

        saveSettings(false, "1234");

        LoginActivity pinActivity = Robolectric.buildActivity(LoginActivity.class).setup().get();
        Intent pinIntent = shadowOf(pinActivity).getNextStartedActivity();
        assertNotNull(pinIntent);
        assertEquals(PinActivity.class.getName(), pinIntent.getComponent().getClassName());
    }

    @Test
    public void loginSettingsIconRepeatsPinOrSettingsGuard() {
        saveSettings(true, "");

        LoginActivity settingsActivity = Robolectric.buildActivity(LoginActivity.class).setup().get();
        ((ImageView) settingsActivity.findViewById(R.id.display_settings)).performClick();
        Intent settingsIntent = shadowOf(settingsActivity).getNextStartedActivity();
        assertNotNull(settingsIntent);
        assertEquals(SettingsActivity.class.getName(), settingsIntent.getComponent().getClassName());

        saveSettings(true, "1234");

        LoginActivity pinActivity = Robolectric.buildActivity(LoginActivity.class).setup().get();
        ((ImageView) pinActivity.findViewById(R.id.display_settings)).performClick();
        Intent pinIntent = shadowOf(pinActivity).getNextStartedActivity();
        assertNotNull(pinIntent);
        assertEquals(PinActivity.class.getName(), pinIntent.getComponent().getClassName());
    }

    @Test
    public void successfulLoginStartsWebviewWithUrlExtra() {
        saveSettings(true, "");
        LoginActivity activity = Robolectric.buildActivity(LoginActivity.class).setup().get();
        ((EditText) activity.findViewById(R.id.input_user)).setText("demo");
        ((EditText) activity.findViewById(R.id.input_password)).setText("secret");

        ((Button) activity.findViewById(R.id.btn_login)).performClick();

        Intent nextIntent = shadowOf(activity).getNextStartedActivity();
        assertNotNull(nextIntent);
        assertEquals(WebviewActivity.class.getName(), nextIntent.getComponent().getClassName());
        assertEquals(
                "https://os10.prestige.de/PrestigeEnterprise.MobileBrowser108/Default.aspx"
                        + "?user=demo&password=" + StringUtils.encodeBase64("secret")
                        + "&App=MobileBrowser&Culture=de-DE",
                nextIntent.getStringExtra(App.URL));
    }

    @Test
    public void loginBackPressMovesTaskToBackground() {
        saveSettings(true, "");
        LoginActivity activity = Robolectric.buildActivity(LoginActivity.class).setup().get();

        activity.onBackPressed();

        assertFalse(activity.isFinishing());
        assertNull(shadowOf(activity).getNextStartedActivity());
    }

    @Test
    public void settingsQrButtonStartsScannerAndQrResultFillsControls() {
        saveSettings(true, "");
        SettingsActivity activity = Robolectric.buildActivity(SettingsActivity.class).setup().get();

        ((ImageView) activity.findViewById(R.id.display_qrcode)).performClick();

        ShadowActivity shadowActivity = shadowOf(activity);
        Intent scannerIntent = shadowActivity.getNextStartedActivityForResult().intent;
        assertNotNull(scannerIntent);
        assertEquals(QRCodeScannerActivity.class.getName(), scannerIntent.getComponent().getClassName());

        Intent qrResult = new Intent();
        qrResult.putExtra(
                QRCodeScannerActivity.QRCodeObject,
                "https://scan.local?s=1&p=MB&v=1&server=os11.prestige.de"
                        + "&mandant=209&https=0&token=abc&pin=9876&culture=de-DE");

        activity.onActivityResult(9011, Activity.RESULT_OK, qrResult);

        assertEquals("os11.prestige.de", ((EditText) activity.findViewById(R.id.server)).getText().toString());
        assertEquals("209", ((EditText) activity.findViewById(R.id.client)).getText().toString());
        assertEquals("abc", ((EditText) activity.findViewById(R.id.token)).getText().toString());
        assertEquals("9876", ((EditText) activity.findViewById(R.id.pin)).getText().toString());
        assertEquals("de-DE", PreferencesUtils.getLocale());
    }

    @Test
    public void webviewEmptyUrlStartsLoginActivity() {
        saveSettings(true, "");
        PreferencesUtils.saveLoginPreferences("", "");

        WebviewActivity activity = Robolectric.buildActivity(WebviewActivity.class).setup().get();

        Intent nextIntent = shadowOf(activity).getNextStartedActivity();
        assertNotNull(nextIntent);
        assertEquals(LoginActivity.class.getName(), nextIntent.getComponent().getClassName());
    }

    @Test
    public void webviewLoadsNonEmptyUrlWithNoCacheHeaders() {
        saveSettings(true, "");
        PreferencesUtils.saveValidLoginPreference(true);
        String url = "https://os10.prestige.de/PrestigeEnterprise.MobileBrowser108/Default.aspx";
        Intent intent = new Intent(ApplicationProvider.getApplicationContext(), WebviewActivity.class);
        intent.putExtra(App.URL, url);

        WebviewActivity activity = Robolectric.buildActivity(WebviewActivity.class, intent).setup().get();
        WebView webView = activity.findViewById(R.id.webView);

        assertEquals(url, shadowOf(webView).getLastLoadedUrl());
        Map<String, String> headers = shadowOf(webView).getLastAdditionalHttpHeaders();
        assertEquals("no-cache", headers.get("Pragma"));
        assertEquals("no-cache", headers.get("Cache-Control"));
    }

    @Test
    public void webviewToolbarLogoutResetsAuthAndFinishes() {
        saveSettings(true, "");
        PreferencesUtils.saveLoginPreferences("demo", StringUtils.encodeBase64("secret"));
        PreferencesUtils.saveValidLoginPreference(true);
        Intent intent = new Intent(ApplicationProvider.getApplicationContext(), WebviewActivity.class);
        intent.putExtra(App.URL, "https://os10.prestige.de/PrestigeEnterprise.MobileBrowser108/Default.aspx");
        WebviewActivity activity = Robolectric.buildActivity(WebviewActivity.class, intent).setup().get();

        Toolbar toolbar = activity.findViewById(R.id.menu_toolbar);
        toolbar.getMenu().performIdentifierAction(R.id.action_logged_out, 0);

        assertFalse(PreferencesUtils.hasValidLoginPreference());
        assertTrue(activity.isFinishing());
    }

    @Test
    public void webviewResumeInvalidAuthFinishesAndBackPressIsNoOp() {
        saveSettings(true, "");
        PreferencesUtils.saveValidLoginPreference(true);
        Intent intent = new Intent(ApplicationProvider.getApplicationContext(), WebviewActivity.class);
        intent.putExtra(App.URL, "https://os10.prestige.de/PrestigeEnterprise.MobileBrowser108/Default.aspx");
        WebviewActivity activity = Robolectric.buildActivity(WebviewActivity.class, intent).setup().get();

        activity.onBackPressed();
        assertFalse(activity.isFinishing());

        PreferencesUtils.saveValidLoginPreference(false);
        activity.onResume();
        assertTrue(activity.isFinishing());
    }

    @Test
    public void pinSuccessStartsSettingsAndExitOrBackFinishes() {
        saveSettings(false, "1234");
        PinActivity matchActivity = Robolectric.buildActivity(PinActivity.class).setup().get();

        clickDigits(matchActivity, R.id.button1, R.id.button2, R.id.button3, R.id.button4);

        Intent settingsIntent = shadowOf(matchActivity).getNextStartedActivity();
        assertNotNull(settingsIntent);
        assertEquals(SettingsActivity.class.getName(), settingsIntent.getComponent().getClassName());
        assertTrue(matchActivity.isFinishing());

        saveSettings(false, "1234");
        PinActivity exitActivity = Robolectric.buildActivity(PinActivity.class).setup().get();
        ((Button) exitActivity.findViewById(R.id.buttonExit)).performClick();
        assertTrue(exitActivity.isFinishing());

        saveSettings(false, "1234");
        PinActivity backActivity = Robolectric.buildActivity(PinActivity.class).setup().get();
        backActivity.onBackPressed();
        assertTrue(backActivity.isFinishing());
    }

    @Test
    public void routeConstantsPreserveLegacyNavigationTokens() {
        assertEquals("URL", App.URL);
        assertEquals("barcodescanner", App.BARCODESCANNER);
        assertEquals("&ScanResult=", App.SCAN_RESULT);
        assertEquals("login.aspx", App.LOGIN);
        assertEquals("error=-", App.ERROR);
    }

    private void saveSettings(boolean validSettings, String pin) {
        PreferencesUtils.saveSettingsPreferences(
                "os10.prestige.de",
                "108",
                "",
                pin,
                PreferencesUtils.PROTOCOL_HTTPS);
        PreferencesUtils.saveValidSettingsPreference(validSettings);
        PreferencesUtils.saveLocale("de-DE");
    }

    private void clickDigits(PinActivity activity, int... buttonIds) {
        for (int buttonId : buttonIds) {
            ((Button) activity.findViewById(buttonId)).performClick();
        }
    }
}
