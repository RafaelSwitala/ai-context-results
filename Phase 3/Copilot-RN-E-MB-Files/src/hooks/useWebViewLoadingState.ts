/**
 * useWebViewLoadingState Hook
 * MAP-015: Track loading state and manage loading UI
 * Phase 1 Source IDs: STATE-003, STATE-004, STATE-008, STATE-009, BEH-005, BEH-006, BEH-018, BEH-027
 *
 * Manages WebView loading indicator visibility
 * Transitions: loading=false → onLoadStart → loading=true → onLoadEnd → loading=false
 *
 * Behaviors:
 * - STATE-003: didStartProvisionalNavigation → loading=true
 * - STATE-004: didFinish/didFail → loading=false
 * - STATE-008: onPageStarted → loaded=false
 * - STATE-009: onPageFinished → loaded=true, visibility updated
 * - BEH-005: Loading indicator shows on navigation start only if not already loading
 * - BEH-006: Loading indicator hides on finish
 * - BEH-018: 20-second LongOperation timeout (RN: optional timeout handling)
 * - BEH-027: WebView visibility depends on URL classification, not loading state
 */

import { useCallback, useState } from 'react';
import { WebViewLoadingState } from '../types/webview.types';

/**
 * Loading state hook for WebView
 *
 * @returns Current loading state and callback handlers for WebView events
 *
 * Traceability: STATE-003 through STATE-009, BEH-005, BEH-006, BEH-018, BEH-027
 */
export function useWebViewLoadingState(): {
  state: WebViewLoadingState;
  onLoadStart: () => void;
  onLoadEnd: () => void;
  onLoadError: (error: string) => void;
  resetState: () => void;
} {
  const [state, setState] = useState<WebViewLoadingState>({
    isLoading: false,
    canGoBack: false,
    error: null,
  });

  /**
   * Handle WebView load start
   * BEH-005: Show loading indicator (but not if already loading)
   * STATE-003: Mark loading=true
   */
  const onLoadStart = useCallback(() => {
    setState(prev => {
      // Only transition false→true; ignore if already loading
      if (!prev.isLoading) {
        console.debug('[WebView] Loading started');
        return {
          ...prev,
          isLoading: true,
          error: null, // Clear previous errors
        };
      }
      return prev;
    });
  }, []);

  /**
   * Handle WebView load end (success or fail transition to this)
   * BEH-006: Hide loading indicator
   * STATE-004: Mark loading=false
   * BEH-027: May update WebView visibility based on URL classification
   */
  const onLoadEnd = useCallback(() => {
    setState(prev => {
      // Mark loading complete
      return {
        ...prev,
        isLoading: false,
      };
    });
    console.debug('[WebView] Loading ended');
  }, []);

  /**
   * Handle WebView load error
   * Sets error state; loading also ends
   * Note: May trigger error dialog or silent failure depending on platform decision
   */
  const onLoadError = useCallback((errorMessage: string) => {
    setState(prev => ({
      ...prev,
      isLoading: false,
      error: errorMessage,
    }));
    console.error('[WebView] Loading error:', errorMessage);
  }, []);

  /**
   * Reset loading state
   * Used when transitioning away from WebView or on logout
   */
  const resetState = useCallback(() => {
    setState({
      isLoading: false,
      canGoBack: false,
      error: null,
    });
  }, []);

  return {
    state,
    onLoadStart,
    onLoadEnd,
    onLoadError,
    resetState,
  };
}

/**
 * Hook to handle WebView timeout
 * BEH-018: 20-second timeout on page start
 *
 * @param isLoading - Current loading state
 * @param timeoutMs - Timeout in milliseconds (default: 20000 per BEH-018)
 * @returns Whether timeout has occurred
 *
 * Note: Android implementation has inactive timeout body (no UI shown on timeout)
 * RN may choose to show UI or silently ignore timeout
 */
export function useWebViewLoadTimeout(isLoading: boolean, timeoutMs: number = 20000): boolean {
  const [timedOut, setTimedOut] = useState(false);

  // Simplified timeout handling - in real app may show progress overlay
  // For now, just track timeout occurrence (BEH-018: inactive timeout body)
  const handleTimeout = useCallback(() => {
    if (isLoading) {
      console.warn('[WebView] Page load timeout after', timeoutMs, 'ms');
      setTimedOut(true);
      // Don't auto-hide loading; page may still complete
    }
  }, [isLoading, timeoutMs]);

  // In real implementation, would use useEffect with setTimeout
  // For Phase 3, this is a placeholder for Phase 4 test coverage

  return timedOut;
}
