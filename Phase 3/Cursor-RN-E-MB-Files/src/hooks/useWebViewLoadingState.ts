import { useCallback, useState } from 'react';

import { shouldHideWebView } from '../services/webViewRouteClassifier';

/** MAP-015 — STATE-003, STATE-004, STATE-008, STATE-009, BEH-005, BEH-006, BEH-018, BEH-027 */

export function useWebViewLoadingState() {
  const [isLoading, setIsLoading] = useState(false);
  const [hidden, setHidden] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading((prev) => (prev ? prev : true));
  }, []);

  const finishLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const updateVisibilityFromUrl = useCallback((url: string) => {
    setHidden(shouldHideWebView(url));
  }, []);

  return {
    isLoading,
    hidden,
    startLoading,
    finishLoading,
    updateVisibilityFromUrl,
    setHidden,
  };
}
