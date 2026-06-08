import { useCallback, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import { buildLoginUrlFromPreferences } from '../services/loginUrlService';
import {
  ensureValidLogin,
  handleSessionExpired,
  logoutFromWebView,
} from '../services/webViewSessionService';
import {
  useNavigationAuthGuard,
  useNoOpBackHandler,
  useWebViewBackHandler,
} from './useNavigationAuthGuard';

/** MAP-016, MAP-022 — STATE-005, STATE-010, SEC-002, BEH-004, BEH-029 */

export function useWebViewSessionGuard(
  resetToLogin: () => void,
  onForegroundReload: (url: string) => void,
) {
  const [hasValidLogin, setHasValidLogin] = useState(true);

  useNavigationAuthGuard(resetToLogin);
  useNoOpBackHandler();
  useWebViewBackHandler(hasValidLogin);

  useEffect(() => {
    void ensureValidLogin().then(setHasValidLogin);
  }, []);

  useEffect(() => {
    const onAppStateChange = (nextState: AppStateStatus) => {
      if (nextState !== 'active') {
        return;
      }
      void (async () => {
        const valid = await ensureValidLogin();
        setHasValidLogin(valid);
        if (!valid) {
          resetToLogin();
          return;
        }
        const url = await buildLoginUrlFromPreferences();
        if (url.length > 0) {
          onForegroundReload(url);
        }
      })();
    };
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, [resetToLogin, onForegroundReload]);

  const logout = useCallback(async () => {
    await logoutFromWebView();
    resetToLogin();
  }, [resetToLogin]);

  const onSessionExpired = useCallback(async () => {
    await handleSessionExpired();
    resetToLogin();
  }, [resetToLogin]);

  return { hasValidLogin, logout, onSessionExpired };
}
