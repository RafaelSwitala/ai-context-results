import { useCallback, useEffect, useState } from 'react';

import { resolveSettingsButtonGate, resolveSettingsGate } from '../navigation/authGate';
import { SettingsGateRoute } from '../types/auth';

/** MAP-015 — BEH-005, NAV-003, NAV-004 */

export function useSettingsGateState(onNavigate: (route: SettingsGateRoute) => void) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    void resolveSettingsGate()
      .then((route) => {
        if (!active) {
          return;
        }
        if (route) {
          onNavigate(route);
          return;
        }
        setReady(true);
      })
      .catch(() => {
        if (active) {
          setReady(true);
        }
      });
    return () => {
      active = false;
    };
  }, [onNavigate]);

  const openSettings = useCallback(async () => {
    const route = await resolveSettingsButtonGate();
    onNavigate(route);
  }, [onNavigate]);

  return { ready, openSettings };
}
