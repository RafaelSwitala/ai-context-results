import { useCallback, useState } from 'react';

import { resolveSettingsAccessRoute, resolveSettingsGate } from '../navigation/authGate';
import { readAuthSnapshot } from '../services/authStorageService';

export function useSettingsGateState() {
  const [loadingGate, setLoadingGate] = useState(false);

  const resolveInitialRoute = useCallback(async () => {
    setLoadingGate(true);
    const snapshot = await readAuthSnapshot();
    setLoadingGate(false);
    return resolveSettingsGate(snapshot);
  }, []);

  const resolveSettingsRoute = useCallback(async () => {
    setLoadingGate(true);
    const snapshot = await readAuthSnapshot();
    setLoadingGate(false);
    return resolveSettingsAccessRoute(snapshot);
  }, []);

  return { loadingGate, resolveInitialRoute, resolveSettingsRoute };
}
