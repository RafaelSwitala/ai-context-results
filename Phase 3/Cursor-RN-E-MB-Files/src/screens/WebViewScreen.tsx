import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { useCameraPermissions } from 'expo-camera';

import EmbeddedBrowser from '../components/EmbeddedBrowser';
import {
  WEBVIEW_INJECTED_LOGIN_FORM_CHECK,
  WEBVIEW_IOS_USER_AGENT,
  WEBVIEW_NO_CACHE_HEADERS,
} from '../constants/webView.constants';
import { useWebViewLoadingState } from '../hooks/useWebViewLoadingState';
import { useWebViewRouteParams } from '../hooks/useWebViewRouteParams';
import { useWebViewSessionGuard } from '../hooks/useWebViewSessionGuard';
import { RootStackParamList } from '../navigation/types';
import { getLoginPreferences } from '../services/storageConfigStorage';
import {
  classifyWebViewUrl,
  extractErrorCodeFromUrl,
  WebViewRouteOutcome,
} from '../services/webViewRouteClassifier';
import { toBarcodeReturnUrl } from '../services/webViewReturnUrlService';
import { mapServerError } from '../utils/serverErrorMapper';
import { protocolUsesHttps } from '../utils/storageConfigValidation';
import { isWebPlatform } from '../utils/webDevPolicy';

type Props = NativeStackScreenProps<RootStackParamList, 'WebView'>;

/** MAP-001 — EP-002..EP-011, BEH-002..BEH-031, UI-001, UI-004..UI-006 */

export default function WebViewScreen({ navigation, route }: Props) {
  const [, requestCameraPermission] = useCameraPermissions();
  const [reloadKey, setReloadKey] = useState(0);
  const errorDisplayedRef = useRef(false);
  const webViewRef = useRef<WebView>(null);

  const resetToLogin = useCallback(() => {
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }, [navigation]);

  const { currentUrl, setCurrentUrl, ready } = useWebViewRouteParams(route.params.url, resetToLogin);

  const onForegroundReload = useCallback(
    (url: string) => {
      setCurrentUrl(url);
      setReloadKey((key) => key + 1);
    },
    [setCurrentUrl],
  );

  const { logout, onSessionExpired } = useWebViewSessionGuard(resetToLogin, onForegroundReload);
  const {
    isLoading,
    hidden,
    startLoading,
    finishLoading,
    updateVisibilityFromUrl,
  } = useWebViewLoadingState();

  const showAndroidStyleError = useCallback(
    (errorCode: string | null | undefined) => {
      if (Platform.OS !== 'android') {
        finishLoading();
        return;
      }
      if (errorDisplayedRef.current) {
        return;
      }
      errorDisplayedRef.current = true;
      webViewRef.current?.injectJavaScript("document.body.innerHTML='';");
      Alert.alert(
        'Fehler',
        mapServerError(errorCode),
        [{ text: 'OK', onPress: () => resetToLogin() }],
        { cancelable: false },
      );
    },
    [finishLoading, resetToLogin],
  );

  const handleBarcodeRoute = useCallback(
    async (url: string) => {
      const prefs = await getLoginPreferences();
      const returnUrl = toBarcodeReturnUrl(url, protocolUsesHttps(prefs.protocol));
      if (returnUrl == null) {
        return;
      }

      const permission = await requestCameraPermission();
      if (permission?.granted) {
        navigation.navigate('BarcodeScanner', { returnUrl });
        return;
      }

      Alert.alert(
        'Wichtige Information',
        'Für den Barcode-Scanner wird Kamerazugriff benötigt. Die Seite wird ohne Scan fortgesetzt.',
        [{ text: 'OK', onPress: () => setCurrentUrl(returnUrl) }],
        { cancelable: false },
      );
    },
    [navigation, requestCameraPermission, setCurrentUrl],
  );

  const processUrl = useCallback(
    (url: string) => {
      updateVisibilityFromUrl(url);
      const outcome = classifyWebViewUrl(url);

      if (outcome === WebViewRouteOutcome.Scanner) {
        void handleBarcodeRoute(url);
        return false;
      }
      if (outcome === WebViewRouteOutcome.LoginRoute) {
        void onSessionExpired();
        return false;
      }
      if (outcome === WebViewRouteOutcome.Error) {
        const code = extractErrorCodeFromUrl(url);
        showAndroidStyleError(code);
        return false;
      }
      return outcome === WebViewRouteOutcome.Normal || outcome === WebViewRouteOutcome.Hidden;
    },
    [handleBarcodeRoute, onSessionExpired, showAndroidStyleError, updateVisibilityFromUrl],
  );

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    processUrl(navState.url);
  };

  const onShouldStartLoadWithRequest = (request: { url: string }) => {
    startLoading();
    return processUrl(request.url);
  };

  const onLoadStart = () => {
    errorDisplayedRef.current = false;
    startLoading();
  };

  const onLoadEnd = () => {
    finishLoading();
  };

  const onHttpError = (event: { nativeEvent: { statusCode: number } }) => {
    showAndroidStyleError(String(event.nativeEvent.statusCode));
  };

  const onError = (event: { nativeEvent: { description: string } }) => {
    showAndroidStyleError(event.nativeEvent.description);
  };

  const onMessage = async (event: { nativeEvent: { data: string } }) => {
    if (event.nativeEvent.data === 'LOGIN_FORM') {
      await onSessionExpired();
    }
  };

  const onCloseApp = () => {
    if (Platform.OS === 'android') {
      const { BackHandler } = require('react-native');
      BackHandler.exitApp();
    } else {
      resetToLogin();
    }
  };

  if (!ready) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Pressable style={styles.toolbarButton} onPress={() => void logout()}>
          <Text style={styles.toolbarText}>Abmelden</Text>
        </Pressable>
        <Pressable style={styles.toolbarButton} onPress={onCloseApp}>
          <Text style={styles.toolbarText}>App schließen</Text>
        </Pressable>
      </View>
      {isLoading ? (
        <View style={styles.progressBar}>
          <ActivityIndicator size="small" />
        </View>
      ) : null}
      {!hidden ? (
        isWebPlatform() ? (
          <EmbeddedBrowser
            uri={currentUrl}
            reloadKey={reloadKey}
            onLoadStart={onLoadStart}
            onLoadEnd={onLoadEnd}
            style={styles.webview}
          />
        ) : (
          <WebView
            key={reloadKey}
            ref={webViewRef}
            source={{ uri: currentUrl, headers: WEBVIEW_NO_CACHE_HEADERS }}
            style={styles.webview}
            userAgent={WEBVIEW_IOS_USER_AGENT}
            javaScriptEnabled
            domStorageEnabled
            setSupportMultipleWindows
            scalesPageToFit
            onNavigationStateChange={onNavigationStateChange}
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            onLoadStart={onLoadStart}
            onLoadEnd={onLoadEnd}
            onHttpError={onHttpError}
            onError={onError}
            injectedJavaScript={WEBVIEW_INJECTED_LOGIN_FORM_CHECK}
            onMessage={onMessage}
            cacheEnabled={false}
            incognito
            sharedCookiesEnabled={false}
          />
        )
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#333',
  },
  toolbarButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  toolbarText: {
    color: '#fff',
    fontWeight: '600',
  },
  progressBar: {
    alignItems: 'center',
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
  },
  webview: {
    flex: 1,
  },
});
