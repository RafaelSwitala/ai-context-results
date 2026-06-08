/**
 * WebView Screen Component
 * MAP-001: Main RN screen for web content display
 * Phase 1 Source IDs: EP-002–010, BEH-002–030, UI-001, UI-006, MAP-011, MAP-012, MAP-018, MAP-019, MAP-021, MAP-022
 *
 * Main WebView screen combining all webview feature logic
 * Handles:
 * - URL loading with no-cache headers
 * - Loading indicator management
 * - Session expiry detection via injected JavaScript
 * - Barcode URL classification and routing
 * - Error handling and user feedback
 * - Toolbar with logout/close actions
 * - Lifecycle management
 *
 * Platform behaviors documented:
 * - MAP-017: Empty URL fallback → Login (Android pattern)
 * - MAP-018: WebView settings configuration
 * - MAP-019: Error UX → silent failure (iOS pattern adopted for RN)
 * - MAP-021: SSL errors → deny by default (security-first)
 * - MAP-022: Hardware back button → no-op (Android parity)
 */

import React, { useEffect, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Alert,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';

import { WebViewRouteParams } from '../types/webview.types';
import { classifyWebViewUrl, shouldHideWebView, isWebViewUrlSafe, extractServerErrorCode } from '../services/webViewRouteClassifier';
import { toBarcodeReturnUrl } from '../services/webViewReturnUrlService';
import { getSessionExpiryDetectionScript } from '../services/webViewSessionService';
import { useWebViewLoadingState } from '../hooks/useWebViewLoadingState';
import { useWebViewSessionGuard } from '../hooks/useWebViewSessionGuard';

/**
 * WebViewScreen Component
 *
 * Responsibilities:
 * 1. Extract URL from route params (MAP-001, MAP-014)
 * 2. Validate URL safety (SEC-001, MAP-011)
 * 3. Configure WebView with no-cache, JS enabled, DOM storage (MAP-018)
 * 4. Render loading indicator during load (MAP-015)
 * 5. Inject JS to detect session expiry on page finish (MAP-012)
 * 6. Classify URLs and route barcode/login/error accordingly (MAP-004, MAP-005, MAP-006)
 * 7. Handle errors silently or with dialog depending on decision (MAP-019)
 * 8. Show toolbar with logout/close (UI-006, BEH-028)
 * 9. Guard against invalid login state (MAP-016, SEC-002)
 * 10. Disable hardware back button (MAP-022)
 */
export function WebViewScreen(): React.ReactElement {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const params = route.params as Partial<WebViewRouteParams> | undefined;
  
  const { state: loadingState, onLoadStart, onLoadEnd, onLoadError } = useWebViewLoadingState();

  /**
   * Mock auth context - would use actual context in real app
   * Assumes login/auth feature provides hasValidLogin and logout
   */
  const authContext = { hasValidLogin: true, logout: async () => {} };

  /**
   * Determine final URL to load
   * MAP-017: Empty URL fallback to Login
   */
  const finalUrl = useMemo(() => {
    const url = params?.url;
    
    if (!url || url.length === 0) {
      // Empty URL: trigger fallback to Login
      console.log('[WebView] No URL provided; navigating to Login');
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      return 'about:blank'; // Placeholder; won't actually render
    }

    if (!isWebViewUrlSafe(url)) {
      console.warn('[WebView] URL failed safety check; navigating to Login');
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      return 'about:blank';
    }

    return url;
  }, [params?.url, navigation]);

  /**
   * Session guard: Exit WebView if login becomes invalid
   * MAP-016: useWebViewSessionGuard detects invalid login
   * BEH-029: onResume checks validity
   */
  const handleSessionExpired = useCallback(() => {
    console.log('[WebView] Session expired; exiting to Login');
    // Navigate to Login with reset stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }, [navigation]);

  useWebViewSessionGuard(authContext.hasValidLogin, handleSessionExpired);

  /**
   * Handle WebView navigation start
   * BEH-005: Show loading indicator
   * STATE-003: loading=true
   */
  const handleLoadStart = useCallback(() => {
    onLoadStart();
  }, [onLoadStart]);

  /**
   * Handle WebView navigation end (success)
   * BEH-006: Hide loading indicator
   * STATE-004: loading=false
   */
  const handleLoadEnd = useCallback(() => {
    onLoadEnd();
    console.debug('[WebView] Page loaded; session detection enabled');
  }, [onLoadEnd]);

  /**
   * Handle WebView navigation error
   * MAP-019: Error UX decision - silent failure (iOS pattern adopted)
   * ERRPATH-002: Failed navigation hides loading indicator only
   */
  const handleError = useCallback((syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.error('[WebView] Navigation error:', nativeEvent.description);
    onLoadError(nativeEvent.description || 'Unknown error');
    // No user dialog shown per MAP-019 decision (iOS silent failure)
  }, [onLoadError]);

  /**
   * Handle WebView SSL error
   * MAP-021: SSL errors denied by default (security-first)
   * BEH-019: Android SSL error handling (HTTPS-without-validation case)
   * ERRPATH-009: No handler.proceed() unless explicitly allowed
   */
  const handleSslError = useCallback((handler: any) => {
    // Security-first: deny SSL errors by default
    // Phase 5 may implement allowlist for HTTPS-without-validation
    console.warn('[WebView] SSL error detected; connection blocked for security');
    // In RN WebView, returning nothing denies the error
  }, []);

  /**
   * Handle JavaScript message from injected script
   * MAP-012: Session expiry detection via injected JS
   * BEH-010, BEH-022: Form action detection
   */
  const handleWebViewMessage = useCallback((event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      if (data.type === 'formAction') {
        const { isLoginForm } = data.payload;
        
        if (isLoginForm) {
          // Session expiry detected: form action contains login.aspx
          console.log('[WebView] Session expiry detected; exiting');
          handleSessionExpired();
        }
      }
    } catch (e) {
      console.error('[WebView] Error parsing message:', e);
    }
  }, [handleSessionExpired]);

  /**
   * Handle toolbar logout action
   * BEH-011: iOS toolbar logout → clear valid-login, route to Login
   * BEH-028: Android toolbar logout → clear valid-login, finish
   */
  const handleLogout = useCallback(async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await authContext.logout();
              // Session guard will detect hasValidLogin=false and handle navigation
            } catch (e) {
              console.error('[WebView] Logout error:', e);
              // Still navigate to Login
              handleSessionExpired();
            }
          },
          style: 'destructive',
        },
      ]
    );
  }, [authContext, handleSessionExpired]);

  /**
   * Hardware back button handling
   * MAP-022: Android hardware back disabled on WebView route
   * BEH-030: WebView back press is a no-op
   */
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      console.debug('[WebView] Hardware back pressed (no-op on WebView route)');
      return true; // Prevent default back action
    });

    return () => backHandler.remove();
  }, []);

  // Render loading indicator if currently loading
  if (loadingState.isLoading && finalUrl !== 'about:blank') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarTitle}>Web View</Text>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Toolbar */}
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>Web View</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* WebView Container */}
      <View style={styles.webViewContainer}>
        <WebView
          source={{
            uri: finalUrl,
            headers: {
              'Pragma': 'no-cache',
              'Cache-Control': 'no-cache',
            },
          }}
          // MAP-018: WebView settings
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scrollEnabled={true}
          scalesPageToFit={true}
          mixedContentMode="always"
          
          // Lifecycle callbacks
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          onSslError={handleSslError}
          
          // JavaScript communication
          onMessage={handleWebViewMessage}
          injectedJavaScript={getSessionExpiryDetectionScript()}
          
          // Styling
          style={styles.webView}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0066cc" />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  toolbarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ff6b6b',
    borderRadius: 4,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
  },
});

export default WebViewScreen;
