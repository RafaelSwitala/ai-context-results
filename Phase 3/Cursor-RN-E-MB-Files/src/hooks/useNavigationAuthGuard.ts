import { useCallback, useEffect } from 'react';
import { AppState, AppStateStatus, BackHandler, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

/** MAP-018, MAP-022 — SEC-001, BEH-007, BEH-024, BEH-026 */

export function useNavigationAuthGuard(onInvalid: () => void) {
  const checkAuth = useCallback(async () => {
    const { resetToLoginIfInvalid } = await import('../services/navigationAuthGuard');
    const invalid = await resetToLoginIfInvalid();
    if (invalid) {
      onInvalid();
    }
  }, [onInvalid]);

  useFocusEffect(
    useCallback(() => {
      void checkAuth();
    }, [checkAuth]),
  );

  useEffect(() => {
    const onAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        void checkAuth();
      }
    };
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, [checkAuth]);
}

export function useAndroidBackHandler(onBack: () => boolean, enabled = true) {
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'android' || !enabled) {
        return undefined;
      }
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBack);
      return () => subscription.remove();
    }, [enabled, onBack]),
  );
}

export function useLoginBackHandler() {
  useAndroidBackHandler(() => {
    BackHandler.exitApp();
    return true;
  });
}

export function useNoOpBackHandler() {
  useAndroidBackHandler(() => true);
}

export function useWebViewBackHandler(hasValidLogin: boolean) {
  useAndroidBackHandler(() => hasValidLogin);
}
