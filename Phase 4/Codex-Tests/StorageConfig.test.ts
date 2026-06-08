import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import {
  applyConfigFileIfNewer,
  isValidConfigFile,
  parseConfigFile,
} from '../services/configFileService';
import {
  buildCheckAccessUrl,
  checkAccess,
  DEFAULT_PAGE,
  isOkHttpStatus,
  MOBILE_BROWSER_PATH,
} from '../services/storageConfigService';
import {
  loadStorageConfig,
  replaceDouglasServerName,
  saveProtocolPreference,
  saveSettingsPreferences,
  saveValidSettingsPreference,
  STORAGE_CONFIG_KEYS,
} from '../services/storageConfigStorage';
import { DEFAULT_STORAGE_CONFIG, HttpProtocol } from '../types/storageConfig';
import {
  isValidQrSettings,
  normalizeScannedQr,
  parseStorageConfigQr,
} from '../utils/storageConfigQr';
import { asyncStorageValues, resetAsyncStorageMock } from './mocks/asyncStorage';
import { resetSecureStoreMock } from './mocks/secureStore';

describe('RT-STORAGE storage-config URL, QR and persistence parity', () => {
  beforeEach(() => {
    resetAsyncStorageMock();
    resetSecureStoreMock();
    jest.clearAllMocks();
  });

  it('RT-STORAGE-001 [LT-011, LT-023, LT-024] builds check-access URLs without double scheme and with empty client path', () => {
    expect(buildCheckAccessUrl('https://os10.prestige.de', '108', HttpProtocol.Https)).toBe(
      `https://os10.prestige.de${MOBILE_BROWSER_PATH}108/${DEFAULT_PAGE}`,
    );
    expect(buildCheckAccessUrl('server.example.com', '', HttpProtocol.Https)).toBe(
      `https://server.example.com${MOBILE_BROWSER_PATH}/${DEFAULT_PAGE}`,
    );
    expect(buildCheckAccessUrl('server.example.com', '108', HttpProtocol.Http)).toBe(
      `http://server.example.com${MOBILE_BROWSER_PATH}108/${DEFAULT_PAGE}`,
    );
    expect(buildCheckAccessUrl('', '108', HttpProtocol.Https)).toBeNull();
  });

  it('RT-STORAGE-002 [LT-016, LT-017] accepts only OK HTTP statuses before persistence', async () => {
    expect(isOkHttpStatus(200)).toBe(true);
    expect(isOkHttpStatus(299)).toBe(true);
    expect(isOkHttpStatus(403)).toBe(false);
    expect(isOkHttpStatus(500)).toBe(false);

    const okGet = jest.fn(async (_url: string, _init?: RequestInit) => ({ status: 200 }));
    await expect(checkAccess({ server: 'server.example.com', client: '108', protocol: HttpProtocol.Https }, okGet)).resolves.toMatchObject({
      ok: true,
      status: 200,
    });
    expect(okGet).toHaveBeenCalledWith(
      `https://server.example.com${MOBILE_BROWSER_PATH}108/${DEFAULT_PAGE}`,
      { headers: { 'Cache-Control': 'no-cache' } },
    );

    const failedGet = jest.fn(async (_url: string, _init?: RequestInit) => ({ status: 403 }));
    await expect(checkAccess({ server: 'server.example.com', client: '108', protocol: HttpProtocol.Https }, failedGet)).resolves.toMatchObject({
      ok: false,
      reason: 'http-status',
      status: 403,
    });
  });

  it('RT-STORAGE-003 [LT-006, LT-007, LT-018, LT-027] parses QR fields, HTTPS defaults and culture fallback', () => {
    const qr = 'https://example.test?p=MB&v=1&server=os10.prestige.de&mandant=108&https=1&token=abc&pin=1234&culture=sk-SK';
    const settings = parseStorageConfigQr(qr, {
      availableCultures: ['de-DE', 'sk-SK'],
      defaultCulture: 'de-DE',
    });

    expect(settings).toMatchObject({
      protocolName: 'MB',
      protocolVersion: '1',
      server: 'os10.prestige.de',
      client: '108',
      token: 'abc',
      pin: '1234',
      protocol: HttpProtocol.Https,
      culture: 'sk-SK',
    });
    expect(isValidQrSettings(settings)).toBe(true);

    expect(parseStorageConfigQr('https://example.test?p=MB&v=1&server=x&mandant=1').protocol).toBe(HttpProtocol.Https);
    expect(parseStorageConfigQr('https://example.test?p=MB&v=1&server=x&mandant=1&https=x').protocol).toBe(HttpProtocol.Https);
    expect(parseStorageConfigQr('https://example.test?p=MB&v=1&server=os10.prestige.de&mandant=108&culture=xx-XX', { availableCultures: ['de-DE'], defaultCulture: 'de-DE' }).culture).toBe('de-DE');
  });

  it('RT-STORAGE-004 [LT-008, LT-009, LT-019] normalizes query-only QR payloads and rejects invalid MB protocol', () => {
    const queryOnly = 'p=MB&v=1&server=test.example.com&mandant=108&https=1&token=&pin=1234';
    expect(normalizeScannedQr(queryOnly)).toBe(`http://localhost?${queryOnly}`);
    expect(isValidQrSettings(parseStorageConfigQr(queryOnly))).toBe(true);
    expect(isValidQrSettings(parseStorageConfigQr('https://example.test?v=1&server=test.example.com&mandant=1&https=1'))).toBe(false);
  });

  it('RT-STORAGE-005 [LT-022, LT-026] migrates Douglas DNS and ignores invalid protocol writes', async () => {
    asyncStorageValues.set(STORAGE_CONFIG_KEYS.server, 'prestigeweb01.dhag.rd.local');
    await expect(replaceDouglasServerName()).resolves.toBe(true);
    expect(asyncStorageValues.get(STORAGE_CONFIG_KEYS.server)).toBe('prestigeweb01.douglas-informatik.de');

    await expect(saveProtocolPreference(HttpProtocol.Https)).resolves.toBe(true);
    await expect(saveProtocolPreference(-1 as HttpProtocol)).resolves.toBe(false);
    await expect(saveProtocolPreference(3 as HttpProtocol)).resolves.toBe(false);
    expect(asyncStorageValues.get(STORAGE_CONFIG_KEYS.protocol)).toBe(String(HttpProtocol.Https));
  });

  it('RT-STORAGE-006 [LT-001, LT-004, LT-016, LT-017] saves settings fields only through the storage service contract', async () => {
    await expect(loadStorageConfig()).resolves.toMatchObject(DEFAULT_STORAGE_CONFIG);

    await saveSettingsPreferences({
      server: 'server.example.com',
      client: '108',
      token: 'token',
      pin: '1234',
      protocol: HttpProtocol.HttpsWithoutValidation,
    });
    await saveValidSettingsPreference(true);

    await expect(loadStorageConfig()).resolves.toMatchObject({
      server: 'server.example.com',
      client: '108',
      token: 'token',
      pin: '1234',
      protocol: HttpProtocol.HttpsWithoutValidation,
      hasValidSettings: true,
    });
  });

  it('RT-STORAGE-007 [LT-012, LT-013] applies newer valid config files and rejects invalid or same-version files', async () => {
    const json = JSON.stringify({
      protocol: 'FILE',
      protocolVersion: '1',
      server: 'os10.prestige.de',
      mandant: '108',
      https: 1,
      token: 'abc',
      pin: '1234',
      culture: 'de-DE',
      version: '2',
    });

    expect(isValidConfigFile(parseConfigFile(json))).toBe(true);
    await expect(applyConfigFileIfNewer(json)).resolves.toBe(true);
    await expect(loadStorageConfig()).resolves.toMatchObject({
      server: 'os10.prestige.de',
      client: '108',
      token: 'abc',
      pin: '1234',
      protocol: HttpProtocol.Https,
      currentConfigVersion: '2',
      hasValidSettings: true,
    });
    await expect(applyConfigFileIfNewer(json)).resolves.toBe(false);
    await expect(applyConfigFileIfNewer(JSON.stringify({ protocol: 'FILE', protocolVersion: '1', server: '', version: '3' }))).resolves.toBe(false);
  });
});
