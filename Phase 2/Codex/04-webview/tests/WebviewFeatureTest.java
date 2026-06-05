package de.onlinesoftwareag.boa.mobilebrowser4android;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.robolectric.Shadows.shadowOf;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;

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

import de.onlinesoftwareag.boa.mobilebrowser4android.utility.PreferencesUtils;
import de.onlinesoftwareag.boa.mobilebrowser4android.utility.StringUtils;

@RunWith(RobolectricTestRunner.class)
@Config(sdk = 35)
public class WebviewFeatureTest {
    private static final String WEBVIEW_URL =
            "https://os10.prestige.de/PrestigeEnterprise.MobileBrowser108/Default.aspx";

    private SharedPreferences sharedPreferences;

    @Before
    public void setUp() throws Exception {
        Context context = ApplicationProvider.getApplicationContext();
        sharedPreferences = context.getSharedPreferences("webview-feature-test", Context.MODE_PRIVATE);
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
        PreferencesUtils.saveSettingsPreferences(
                "os10.prestige.de",
                "108",
                "",
                "",
                PreferencesUtils.PROTOCOL_HTTPS);
        PreferencesUtils.saveLoginPreferences("demo", StringUtils.encodeBase64("secret"));
        PreferencesUtils.saveValidSettingsPreference(true);
        PreferencesUtils.saveValidLoginPreference(true);
    }

    @Test
    public void loginPassesUrlExtraToWebviewActivity() {
        LoginActivity activity = Robolectric.buildActivity(LoginActivity.class).setup().get();
        ((android.widget.EditText) activity.findViewById(R.id.input_user)).setText("demo");
        ((android.widget.EditText) activity.findViewById(R.id.input_password)).setText("secret");

        ((android.widget.Button) activity.findViewById(R.id.btn_login)).performClick();

        Intent nextIntent = shadowOf(activity).getNextStartedActivity();
        assertNotNull(nextIntent);
        assertEquals(WebviewActivity.class.getName(), nextIntent.getComponent().getClassName());
        assertEquals(
                WEBVIEW_URL + "?user=demo&password=" + StringUtils.encodeBase64("secret")
                        + "&App=MobileBrowser&Culture=de-DE",
                nextIntent.getStringExtra(App.URL));
    }

    @Test
    public void webviewUsesIntentUrlStoredUrlAndEmptyFallback() {
        WebviewActivity intentActivity = buildWebviewActivityWithUrl(WEBVIEW_URL);
        assertEquals(WEBVIEW_URL, shadowOf((WebView) intentActivity.findViewById(R.id.webView)).getLastLoadedUrl());

        PreferencesUtils.saveLoginPreferences("demo", StringUtils.encodeBase64("secret"));
        WebviewActivity storedActivity = Robolectric.buildActivity(WebviewActivity.class).setup().get();
        assertEquals(
                WEBVIEW_URL + "?user=demo&password=" + StringUtils.encodeBase64("secret")
                        + "&App=MobileBrowser&Culture=de-DE",
                shadowOf((WebView) storedActivity.findViewById(R.id.webView)).getLastLoadedUrl());

        PreferencesUtils.saveLoginPreferences("", "");
        WebviewActivity emptyActivity = Robolectric.buildActivity(WebviewActivity.class).setup().get();
        Intent nextIntent = shadowOf(emptyActivity).getNextStartedActivity();
        assertNotNull(nextIntent);
        assertEquals(LoginActivity.class.getName(), nextIntent.getComponent().getClassName());
    }

    @Test
    public void webviewAppliesSettingsAndNoCacheHeaders() {
        WebviewActivity activity = buildWebviewActivityWithUrl(WEBVIEW_URL);
        WebView webView = activity.findViewById(R.id.webView);
        WebSettings settings = webView.getSettings();

        assertTrue(settings.getJavaScriptEnabled());
        assertEquals(WebSettings.LOAD_NO_CACHE, settings.getCacheMode());
        assertTrue(settings.getDomStorageEnabled());
        assertTrue(settings.getJavaScriptCanOpenWindowsAutomatically());
        assertTrue(settings.getLoadWithOverviewMode());
        assertTrue(settings.getBuiltInZoomControls());
        assertTrue(settings.getUseWideViewPort());
        assertTrue(settings.supportZoom());
        assertTrue(settings.supportMultipleWindows());
        assertEquals(App.IOS_USER_AGENT, settings.getUserAgentString());

        Map<String, String> headers = shadowOf(webView).getLastAdditionalHttpHeaders();
        assertEquals("no-cache", headers.get("Pragma"));
        assertEquals("no-cache", headers.get("Cache-Control"));
    }

    @Test
    public void urlOverrideSuppressesBarcodeAndLoginButAllowsNormalUrls() {
        WebviewActivity activity = buildWebviewActivityWithUrl(WEBVIEW_URL);
        WebView webView = activity.findViewById(R.id.webView);
        WebViewClient client = webView.getWebViewClient();
        ProgressBar progressBar = activity.findViewById(R.id.progressBar1);
        progressBar.setVisibility(View.GONE);

        assertTrue(client.shouldOverrideUrlLoading(webView, "barcodescanner://os10.prestige.de/return"));
        assertTrue(client.shouldOverrideUrlLoading(webView, "https://os10.prestige.de/login.aspx"));
        assertFalse(client.shouldOverrideUrlLoading(webView, "https://os10.prestige.de/page.aspx"));
        assertEquals(View.VISIBLE, progressBar.getVisibility());
    }

    @Test
    public void pageStartAndFinishUpdateLoadingAndVisibility() {
        WebviewActivity activity = buildWebviewActivityWithUrl(WEBVIEW_URL);
        WebView webView = activity.findViewById(R.id.webView);
        WebViewClient client = webView.getWebViewClient();
        ProgressBar progressBar = activity.findViewById(R.id.progressBar1);

        client.onPageStarted(webView, WEBVIEW_URL, null);
        assertFalse(activity.loaded);

        client.onPageFinished(webView, WEBVIEW_URL);

        assertTrue(activity.loaded);
        assertEquals(View.GONE, progressBar.getVisibility());
        assertEquals(View.VISIBLE, webView.getVisibility());
    }

    @Test
    public void pageFinishLoginErrorBarcodeAndAboutBlankHideOrRouteAsExpected() {
        WebviewActivity loginActivity = buildWebviewActivityWithUrl(WEBVIEW_URL);
        WebView loginWebView = loginActivity.findViewById(R.id.webView);
        loginWebView.getWebViewClient().onPageFinished(loginWebView, "https://os10.prestige.de/login.aspx");

        assertFalse(PreferencesUtils.hasValidLoginPreference());
        assertNotNull(shadowOf(loginActivity).getNextStartedActivity());
        assertTrue(loginActivity.isFinishing());
        assertEquals(View.GONE, loginWebView.getVisibility());

        PreferencesUtils.saveValidLoginPreference(true);
        WebviewActivity hiddenActivity = buildWebviewActivityWithUrl(WEBVIEW_URL);
        WebView hiddenWebView = hiddenActivity.findViewById(R.id.webView);
        WebViewClient hiddenClient = hiddenWebView.getWebViewClient();

        hiddenClient.onPageFinished(hiddenWebView, "about:blank");
        assertEquals(View.GONE, hiddenWebView.getVisibility());

        hiddenClient.onPageFinished(hiddenWebView, "barcodescanner://os10.prestige.de/scan");
        assertEquals(View.GONE, hiddenWebView.getVisibility());
    }

    @Test
    public void toolbarLifecycleAndBackBehaviorsPreserveSessionGuard() {
        WebviewActivity activity = buildWebviewActivityWithUrl(WEBVIEW_URL);
        ProgressBar progressBar = activity.findViewById(R.id.progressBar1);
        progressBar.setVisibility(View.VISIBLE);

        activity.onPause();
        assertEquals(View.GONE, progressBar.getVisibility());

        activity.onBackPressed();
        assertFalse(activity.isFinishing());

        Toolbar toolbar = activity.findViewById(R.id.menu_toolbar);
        toolbar.getMenu().performIdentifierAction(R.id.action_logged_out, 0);
        assertFalse(PreferencesUtils.hasValidLoginPreference());
        assertTrue(activity.isFinishing());
    }

    @Test
    public void invalidLoginOnResumeFinishesWebview() {
        WebviewActivity activity = buildWebviewActivityWithUrl(WEBVIEW_URL);

        PreferencesUtils.saveValidLoginPreference(false);
        activity.onResume();

        assertTrue(activity.isFinishing());
    }

    @Test
    public void routeConstantsClassifyLegacyWebviewTokens() {
        assertEquals("URL", App.URL);
        assertEquals("barcodescanner", App.BARCODESCANNER);
        assertEquals("login.aspx", App.LOGIN);
        assertEquals("error=-", App.ERROR);
        assertEquals("about:blank", App.ABOUT_BLANK);
        assertEquals("&ScanResult=", App.SCAN_RESULT);
    }

    private WebviewActivity buildWebviewActivityWithUrl(String url) {
        Intent intent = new Intent(ApplicationProvider.getApplicationContext(), WebviewActivity.class);
        intent.putExtra(App.URL, url);
        return Robolectric.buildActivity(WebviewActivity.class, intent).setup().get();
    }
}
