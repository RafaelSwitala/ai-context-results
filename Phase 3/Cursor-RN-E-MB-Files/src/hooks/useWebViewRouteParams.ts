import { useCallback, useEffect, useState } from 'react';

import { buildLoginUrlFromPreferences } from '../services/loginUrlService';
import {
  resolveWebViewUrl,
  shouldRouteToLoginOnEmptyUrl,
} from '../services/webViewNavigationService';

/** MAP-014 — STATE-001, STATE-002, STATE-006, STATE-007, STOR-005 */

export function useWebViewRouteParams(routeUrl: string, onEmptyUrl: () => void) {
  const [currentUrl, setCurrentUrl] = useState(routeUrl);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const storedUrl = await buildLoginUrlFromPreferences();
      const resolved = resolveWebViewUrl(routeUrl, storedUrl);
      if (cancelled) {
        return;
      }
      if (shouldRouteToLoginOnEmptyUrl(resolved)) {
        onEmptyUrl();
        return;
      }
      setCurrentUrl(resolved);
      setReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [routeUrl, onEmptyUrl]);

  const updateUrl = useCallback((url: string) => {
    setCurrentUrl(url);
  }, []);

  return { currentUrl, setCurrentUrl: updateUrl, ready };
}
