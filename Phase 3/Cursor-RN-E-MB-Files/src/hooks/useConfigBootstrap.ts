import { useEffect, useState } from 'react';

import { applyBundledConfigIfNeeded, ConfigBootstrapResult } from '../services/configFileService';
import { ConfigFilePayload } from '../types/storageConfig';

/** MAP-019 — STATE-004, BEH-009 */

export function useConfigBootstrap(bundledConfig: ConfigFilePayload | null): {
  status: ConfigBootstrapResult | 'pending';
} {
  const [status, setStatus] = useState<ConfigBootstrapResult | 'pending'>('pending');

  useEffect(() => {
    let active = true;
    void applyBundledConfigIfNeeded(bundledConfig).then((result) => {
      if (active) {
        setStatus(result);
      }
    });
    return () => {
      active = false;
    };
  }, [bundledConfig]);

  return { status };
}
