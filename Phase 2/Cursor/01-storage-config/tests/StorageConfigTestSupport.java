package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import android.content.Context;
import android.content.SharedPreferences;

import org.robolectric.RuntimeEnvironment;

import java.lang.reflect.Field;
import java.util.HashMap;

import de.onlinesoftwareag.boa.mobilebrowser4android.App;

/**
 * Injects App/SharedPreferences state for storage-config unit tests.
 */
public final class StorageConfigTestSupport {

    private StorageConfigTestSupport() {
    }

    public static SharedPreferences createPreferences() {
        Context context = RuntimeEnvironment.getApplication();
        return context.getSharedPreferences("storage-config-test", Context.MODE_PRIVATE);
    }

    public static void initApp(SharedPreferences preferences) throws Exception {
        App app = App.getInstance();
        app.SharedPreferences = preferences;
        app.DefaulLocale = "de-DE";
        app.AvailableLanguages = new HashMap<>();
        app.AvailableLanguages.put("de-DE", "Deutsch");
        app.AvailableLanguages.put("sk-SK", "Slovak");

        Field prefsField = PreferencesUtils.class.getDeclaredField("sharedpreferences");
        prefsField.setAccessible(true);
        prefsField.set(null, preferences);
    }

    public static void resetApp() throws Exception {
        Field prefsField = PreferencesUtils.class.getDeclaredField("sharedpreferences");
        prefsField.setAccessible(true);
        prefsField.set(null, null);
        App.getInstance().SharedPreferences = null;
    }
}
