import { createElement, useEffect, useState } from 'react';
import { ActivityIndicator, AppState, BackHandler, Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { logoutAndReset, resetToLoginIfInvalid } from '../services/navigationAuthGuard';
import { classifyWebViewFormAction, classifyWebViewUrl, WebViewNavigationDecision } from '../services/webViewNavigationService';
import { loadStorageConfig } from '../services/storageConfigStorage';
import { HttpProtocol } from '../types/storageConfig';
import { mapServerError } from '../utils/serverErrorMapper';

type Props = {
  url: string;
  onBarcodeRequest: (returnUrl: string) => void;
  onCloseApp: () => void;
  onLogout: () => void;
  onReturnToLogin: () => void;
};

export default function WebViewScreen({ url, onBarcodeRequest, onCloseApp, onLogout, onReturnToLogin }: Props) {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [loading, setLoading] = useState(Platform.OS === 'web');
  const [protocol, setProtocol] = useState<HttpProtocol>(HttpProtocol.Https);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    void resetToLoginIfInvalid(onReturnToLogin);
    void loadStorageConfig().then((settings) => setProtocol(settings.protocol));
  }, [onReturnToLogin]);

  useEffect(() => {
    const backSubscription = BackHandler.addEventListener('hardwareBackPress', () => true);
    const appStateSubscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        void resetToLoginIfInvalid(onReturnToLogin);
      }
    });

    return () => {
      backSubscription.remove();
      appStateSubscription.remove();
    };
  }, [onReturnToLogin]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      setLoading(true);
    }
  }, [currentUrl]);

  const applyDecision = (decision: WebViewNavigationDecision): boolean => {
    if (decision.action === 'load') {
      setErrorMessage(null);
      setCurrentUrl(decision.url);
      return true;
    }

    if (decision.action === 'open-barcode-scanner') {
      onBarcodeRequest(decision.returnUrl);
      return false;
    }

    setErrorMessage(decision.action === 'return-to-login' && decision.reason === 'error-url' ? mapServerError('-') : null);
    onReturnToLogin();
    return false;
  };

  return (
    <View style={styles.screen}>
      <View style={styles.toolbar}>
        <Text style={styles.title}>WebView</Text>
        {loading ? <ActivityIndicator size="small" /> : null}
        <Pressable
          style={styles.closeButton}
          onPress={() => {
            void logoutAndReset(onLogout);
          }}
        >
          <Text style={styles.closeButtonText}>Logout</Text>
        </Pressable>
        <Pressable style={styles.closeButton} onPress={onCloseApp}>
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {Platform.OS === 'web' ? (
        <View style={styles.webFrameContainer}>
          {createElement('iframe', {
            allow: 'clipboard-read; clipboard-write',
            onLoad: () => setLoading(false),
            src: currentUrl,
            style: { border: 0, flex: 1, height: '100%', width: '100%' },
            title: 'PRESTIGE MobileBrowser',
          })}
          <View style={styles.webFallbackBar}>
            <Text style={styles.webFallbackText}>Falls die Seite leer bleibt, blockiert der Server vermutlich die Einbettung im Browser.</Text>
            <Pressable style={styles.webOpenButton} onPress={() => void Linking.openURL(currentUrl)}>
              <Text style={styles.webOpenButtonText}>Neu öffnen</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <WebView
          cacheEnabled={false}
          domStorageEnabled
          javaScriptCanOpenWindowsAutomatically
          javaScriptEnabled
          onError={(event) => {
            setErrorMessage(mapServerError(event.nativeEvent.description));
            onReturnToLogin();
          }}
          onHttpError={(event) => {
            setErrorMessage(mapServerError(event.nativeEvent.statusCode));
            onReturnToLogin();
          }}
          onLoadEnd={() => setLoading(false)}
          onLoadStart={() => setLoading(true)}
          onMessage={(event) => {
            const decision = classifyWebViewFormAction(event.nativeEvent.data);
            if (decision) {
              void logoutAndReset(onReturnToLogin);
            }
          }}
          onShouldStartLoadWithRequest={(request) => {
            const decision = classifyWebViewUrl(request.url, protocol);
            return applyDecision(decision);
          }}
          source={{ uri: currentUrl, headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' } }}
          injectedJavaScript="window.ReactNativeWebView.postMessage((document.getElementsByTagName('form')[0] || {}).action || ''); true;"
          style={styles.webview}
          userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    borderColor: '#0f6bff',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  closeButtonText: {
    color: '#0f6bff',
    fontWeight: '700',
  },
  error: {
    color: '#a11d33',
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  screen: {
    flex: 1,
  },
  toolbar: {
    alignItems: 'center',
    borderBottomColor: '#e1e8f0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 12,
  },
  title: {
    color: '#102a43',
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  webview: {
    flex: 1,
  },
  webFallbackBar: {
    alignItems: 'center',
    borderTopColor: '#e1e8f0',
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 12,
  },
  webFallbackText: {
    color: '#52616f',
    flex: 1,
    fontSize: 13,
  },
  webFrameContainer: {
    flex: 1,
  },
  webOpenButton: {
    backgroundColor: '#0f6bff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  webOpenButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
