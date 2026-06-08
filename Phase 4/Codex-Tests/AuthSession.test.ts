import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import {
  isNavigationAuthenticated,
  logoutAndReset,
  resetToLoginIfInvalid,
} from '../services/navigationAuthGuard';
import { logoutCurrentSession } from '../services/sessionService';
import {
  ensureValidLogin,
  handleSessionExpired,
  logoutFromWebView,
} from '../services/webViewSessionService';
import {
  loadStorageConfig,
  saveLoginPreferences,
  saveSettingsPreferences,
  saveValidLoginPreference,
} from '../services/storageConfigStorage';
import { HttpProtocol } from '../types/storageConfig';
import { resetAsyncStorageMock } from './mocks/asyncStorage';
import { resetSecureStoreMock } from './mocks/secureStore';

describe('RT-SESSION auth and WebView session parity', () => {
  beforeEach(() => {
    resetAsyncStorageMock();
    resetSecureStoreMock();
    jest.clearAllMocks();
  });

  it('RT-SESSION-001 [LT-005, LT-019, LT-026] resets guarded routes when valid-login is false', async () => {
    const onReset = jest.fn();

    await expect(isNavigationAuthenticated()).resolves.toBe(false);
    await expect(resetToLoginIfInvalid(onReset)).resolves.toBe(true);
    await expect(ensureValidLogin(onReset)).resolves.toBe(false);
    expect(onReset).toHaveBeenCalledTimes(2);

    await saveValidLoginPreference(true);
    onReset.mockClear();

    await expect(isNavigationAuthenticated()).resolves.toBe(true);
    await expect(resetToLoginIfInvalid(onReset)).resolves.toBe(false);
    await expect(ensureValidLogin(onReset)).resolves.toBe(true);
    expect(onReset).not.toHaveBeenCalled();
  });

  it('RT-SESSION-002 [LT-007, LT-008, LT-018] clears valid-login on explicit session expiry', async () => {
    await saveValidLoginPreference(true);
    const onReset = jest.fn();

    await handleSessionExpired(onReset);

    await expect(loadStorageConfig()).resolves.toMatchObject({ hasValidLogin: false });
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('RT-SESSION-003 [LT-007, LT-008, LT-022] logout clears valid-login before route reset', async () => {
    await saveValidLoginPreference(true);
    const onReset = jest.fn();

    await logoutAndReset(onReset);

    await expect(loadStorageConfig()).resolves.toMatchObject({ hasValidLogin: false });
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('RT-SESSION-004 [LT-007, LT-008] logout cleanup is best effort and receives token, user and service URL when available', async () => {
    await saveSettingsPreferences({
      server: 'server.example.com',
      client: '108',
      token: 'token',
      pin: '',
      protocol: HttpProtocol.Https,
    });
    await saveLoginPreferences('testuser', 'secret');
    await saveValidLoginPreference(true);

    const cleanup = jest.fn(async (_input: { token: string; userName: string; serviceBaseUrl: string }) => undefined);
    await logoutCurrentSession(cleanup);

    expect(cleanup).toHaveBeenCalledWith({
      token: 'token',
      userName: 'testuser',
      serviceBaseUrl: 'https://server.example.com/prestigeenterprise.services108',
    });
    await expect(loadStorageConfig()).resolves.toMatchObject({ hasValidLogin: false });
  });

  it('RT-SESSION-005 [LT-008, LT-022] WebView logout invokes reset even when cleanup fails', async () => {
    await saveSettingsPreferences({
      server: 'server.example.com',
      client: '108',
      token: 'token',
      pin: '',
      protocol: HttpProtocol.Https,
    });
    await saveLoginPreferences('testuser', 'secret');
    await saveValidLoginPreference(true);

    const onReset = jest.fn();
    await logoutFromWebView(onReset, jest.fn(async (_input: { token: string; userName: string; serviceBaseUrl: string }) => {
      throw new Error('cleanup failed');
    }));

    expect(onReset).toHaveBeenCalledTimes(1);
    await expect(loadStorageConfig()).resolves.toMatchObject({ hasValidLogin: false });
  });
});
