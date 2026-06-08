import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Platform } from 'react-native';

import { resolveSettingsAccessRoute, resolveSettingsGate } from '../navigation/authGate';
import { readAuthSnapshot, setHasValidLogin } from '../services/authStorageService';
import { buildLoginUrl, buildLoginUrlFromPreferences } from '../services/loginUrlService';
import { submitLogin } from '../services/loginService';
import {
  loadStorageConfig,
  saveLocale,
  saveLoginPreferences,
  saveSettingsPreferences,
  saveValidSettingsPreference,
} from '../services/storageConfigStorage';
import { HttpProtocol } from '../types/storageConfig';
import { resetAsyncStorageMock } from './mocks/asyncStorage';
import { resetSecureStoreMock } from './mocks/secureStore';

describe('RT-LOGIN login parity', () => {
  beforeEach(() => {
    Object.defineProperty(Platform, 'OS', { configurable: true, value: 'ios' });
    resetAsyncStorageMock();
    resetSecureStoreMock();
    jest.clearAllMocks();
  });

  it('RT-LOGIN-001 [LT-001, LT-002] rejects missing credentials and invalid settings before request', async () => {
    await expect(submitLogin({ userName: '', password: 'secret' })).resolves.toEqual({
      ok: false,
      error: 'missing-username',
    });
    await expect(submitLogin({ userName: 'demo', password: '' })).resolves.toEqual({
      ok: false,
      error: 'missing-password',
    });
    await expect(submitLogin({ userName: 'demo', password: 'secret' })).resolves.toEqual({
      ok: false,
      error: 'invalid-settings',
    });
  });

  it('RT-LOGIN-002 [LT-003, LT-004, LT-021] builds login URL with user, Base64 password, App marker and Culture', () => {
    const url = buildLoginUrl({
      server: 'os10.prestige.de',
      client: '108',
      userName: 'testuser',
      password: 'secret',
      protocol: HttpProtocol.Https,
      locale: 'de-DE',
    });

    const parsed = new URL(url);
    expect(url).toContain('os10.prestige.de');
    expect(parsed.searchParams.get('user')).toBe('testuser');
    expect(parsed.searchParams.get('password')).toBe('c2VjcmV0');
    expect(parsed.searchParams.get('App')).toBe('MobileBrowser');
    expect(parsed.searchParams.get('Culture')).toBe('de-DE');
  });

  it('RT-LOGIN-003 [LT-003, LT-004] stores credentials and valid-login after HTTP 200 without server Error query', async () => {
    await saveSettingsPreferences({
      server: 'os10.prestige.de',
      client: '108',
      token: 'abc',
      pin: '',
      protocol: HttpProtocol.Https,
    });
    await saveValidSettingsPreference(true);
    await saveLocale('de-DE');

    const httpGet = jest.fn(async () => ({ status: 200, url: 'https://server/Default.aspx' } as { status: number } & { url: string }));
    const result = await submitLogin({ userName: 'demo user', password: 'secret' }, { preflightEnabled: true }, httpGet);

    expect(result).toMatchObject({ ok: true });
    expect(httpGet).toHaveBeenCalledTimes(1);
    await expect(loadStorageConfig()).resolves.toMatchObject({
      userName: 'demo user',
      password: 'secret',
      hasValidLogin: true,
    });
  });

  it('RT-LOGIN-004 [LT-003] rejects HTTP 200 responses with Error query and does not set valid-login', async () => {
    await saveSettingsPreferences({
      server: 'os10.prestige.de',
      client: '108',
      token: '',
      pin: '',
      protocol: HttpProtocol.Https,
    });
    await saveValidSettingsPreference(true);

    const httpGet = jest.fn(async () => ({ status: 200, url: 'https://server/Login.aspx?Error=-6' } as { status: number } & { url: string }));
    await expect(submitLogin({ userName: 'demo', password: 'secret' }, { preflightEnabled: true }, httpGet)).resolves.toEqual({
      ok: false,
      error: 'server-error',
      errorCode: '-6',
    });
    await expect(loadStorageConfig()).resolves.toMatchObject({ hasValidLogin: false });
  });

  it('RT-LOGIN-005 [LT-003, LT-004] rejects non-OK and network-failed login preflight', async () => {
    await saveSettingsPreferences({
      server: 'os10.prestige.de',
      client: '108',
      token: '',
      pin: '',
      protocol: HttpProtocol.Https,
    });
    await saveValidSettingsPreference(true);

    await expect(submitLogin({ userName: 'demo', password: 'secret' }, { preflightEnabled: true }, jest.fn(async () => ({ status: 500 })))).resolves.toEqual({
      ok: false,
      error: 'preflight-failed',
    });
    await expect(submitLogin({ userName: 'demo', password: 'secret' }, { preflightEnabled: true }, jest.fn(async () => {
      throw new Error('timeout');
    }))).resolves.toEqual({
      ok: false,
      error: 'preflight-failed',
    });
  });

  it('RT-LOGIN-006 [LT-003, LT-004, LT-007] reads auth snapshot and clears valid-login on logout/background reset', async () => {
    await saveSettingsPreferences({
      server: 'server.example.com',
      client: '108',
      token: 'token',
      pin: '1234',
      protocol: HttpProtocol.Https,
    });
    await saveLoginPreferences('testuser', 'secret');
    await saveValidSettingsPreference(true);
    await setHasValidLogin(true);

    await expect(readAuthSnapshot()).resolves.toMatchObject({
      userName: 'testuser',
      password: 'secret',
      pin: '1234',
      hasValidSettings: true,
      hasValidLogin: true,
    });

    await setHasValidLogin(false);
    await expect(readAuthSnapshot()).resolves.toMatchObject({ hasValidLogin: false });
  });

  it('RT-LOGIN-007 [LT-005] resolves invalid-settings routes to Settings or PIN by stored PIN', () => {
    expect(resolveSettingsGate({ hasValidSettings: true, pin: '' })).toBe('login');
    expect(resolveSettingsGate({ hasValidSettings: false, pin: '' })).toBe('settings');
    expect(resolveSettingsGate({ hasValidSettings: false, pin: '1234' })).toBe('pin');
    expect(resolveSettingsAccessRoute({ pin: '' })).toBe('settings');
    expect(resolveSettingsAccessRoute({ pin: '1234' })).toBe('pin');
  });

  it('RT-LOGIN-008 [LT-011, LT-023, LT-024] rebuilds login URL from stored preferences', async () => {
    await saveSettingsPreferences({
      server: 'https://os10.prestige.de',
      client: '',
      token: '',
      pin: '',
      protocol: HttpProtocol.Https,
    });
    await saveLoginPreferences('storedUser', 'secret');
    await saveLocale('de-DE');

    const url = await buildLoginUrlFromPreferences();
    const parsed = new URL(url);

    expect(url).toContain('https://os10.prestige.de');
    expect(url).not.toContain('https://https://');
    expect(url).toContain('/PrestigeEnterprise.MobileBrowser/');
    expect(parsed.searchParams.get('user')).toBe('storedUser');
    expect(parsed.searchParams.get('password')).toBe('c2VjcmV0');
    expect(parsed.searchParams.get('Culture')).toBe('de-DE');
  });
});
