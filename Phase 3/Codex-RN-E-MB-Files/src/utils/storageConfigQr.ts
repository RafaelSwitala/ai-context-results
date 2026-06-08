import { HttpProtocol, QrStorageConfigValues, isHttpProtocol } from '../types/storageConfig';

const DEFAULT_AVAILABLE_CULTURES = ['de-DE', 'en-US'];

export function normalizeScannedQr(value: string | null | undefined): string {
  const scanned = (value ?? '').trim();
  if (!scanned) {
    return '';
  }

  return scanned.includes('?') ? scanned : `http://localhost?${scanned}`;
}

function readProtocol(raw: string | null): HttpProtocol {
  const protocol = Number(raw);
  return isHttpProtocol(protocol) ? protocol : HttpProtocol.Https;
}

function fallbackCulture(culture: string | null, availableCultures: readonly string[], defaultCulture: string): string | null {
  if (!culture) {
    return defaultCulture || null;
  }

  return availableCultures.includes(culture) ? culture : defaultCulture || null;
}

export function parseStorageConfigQr(
  value: string,
  options: { availableCultures?: readonly string[]; defaultCulture?: string } = {},
): QrStorageConfigValues {
  const normalized = normalizeScannedQr(value);
  const defaults: QrStorageConfigValues = {
    protocolName: null,
    protocolVersion: null,
    server: null,
    client: null,
    token: null,
    pin: null,
    protocol: HttpProtocol.Https,
    culture: options.defaultCulture ?? null,
  };

  if (!normalized) {
    return defaults;
  }

  try {
    const url = new URL(normalized);
    const params = url.searchParams;
    const defaultCulture = options.defaultCulture ?? DEFAULT_AVAILABLE_CULTURES[0];
    const availableCultures = options.availableCultures ?? DEFAULT_AVAILABLE_CULTURES;

    return {
      protocolName: params.get('p'),
      protocolVersion: params.get('v'),
      server: params.get('server'),
      client: params.get('mandant'),
      token: params.get('token'),
      pin: params.get('pin'),
      protocol: readProtocol(params.get('https')),
      culture: fallbackCulture(params.get('culture'), availableCultures, defaultCulture),
    };
  } catch {
    return defaults;
  }
}

export function isValidQrSettings(settings: QrStorageConfigValues): boolean {
  return Boolean(settings.server && settings.protocolName === 'MB' && settings.protocolVersion === '1');
}
