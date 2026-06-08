import { useCallback, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import { getValidLoginFlag, setValidLoginFlag } from '../services/authStorageService';
import { logout } from '../services/sessionService';

/** MAP-014, MAP-021 — STATE-001..STATE-004, BEH-007, EP-005, EP-006 */

export function useAuthState() {
  const [hasValidLogin, setHasValidLogin] = useState(false);

  const refresh = useCallback(async () => {
    setHasValidLogin(await getValidLoginFlag());
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    const onAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === 'background' || nextState === 'inactive') {
        void logout().then(() => {
          setHasValidLogin(false);
        });
      }
    };

    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  const markLoggedIn = useCallback(async () => {
    await setValidLoginFlag(true);
    setHasValidLogin(true);
  }, []);

  return { hasValidLogin, refresh, markLoggedIn };
}
