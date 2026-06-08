import { HttpProtocol, QrCodeSettings } from '../types/storageConfig';

const DEFAULT_LOCALE = 'de-DE';

/** BEH-004, BEH-005, BEH-013, BEH-014, MAP-005, MAP-023 */

export function normalizeScannedQr(raw: string): string {
  if (raw.includes('?')) {
    return raw;
  }
  return `http://localhost?${raw}`;
}

function parseProtocolValue(https: string | null): HttpProtocol {
  if (https == null) {
    return HttpProtocol.Https;
  }
  const parsed = Number.parseInt(https, 10);
  if (parsed === HttpProtocol.Http || parsed === HttpProtocol.Https || parsed === HttpProtocol.HttpsWithoutValidation) {
    return parsed;
  }
  return HttpProtocol.Https;
}

export function parseStorageConfigQr(
  url: string,
  options?: {
    defaultLocale?: string;
    availableLocales?: string[];
  },
): QrCodeSettings {
  const settings: QrCodeSettings = {
    protocol: null,
    protocolVersion: null,
    server: null,
    client: null,
    securityProtocol: HttpProtocol.Https,
    token: null,
    pin: null,
    culture: options?.defaultLocale ?? DEFAULT_LOCALE,
  };

  try {
    const queryIndex = url.indexOf('?');
    const query = queryIndex >= 0 ? url.slice(queryIndex + 1) : url;
    const params = new URLSearchParams(query);

    settings.protocol = params.get('p');
    settings.protocolVersion = params.get('v');
    settings.server = params.get('server');
    settings.client = params.get('mandant');
    settings.securityProtocol = parseProtocolValue(params.get('https'));
    settings.token = params.get('token');
    settings.pin = params.get('pin');

    const culture = params.get('culture');
    const available = options?.availableLocales ?? [DEFAULT_LOCALE];
    if (culture && available.includes(culture)) {
      settings.culture = culture;
    }
  } catch {
    return settings;
  }

  return settings;
}

export function isValidQrSettings(settings: QrCodeSettings): boolean {
  return (
    Boolean(settings.server && settings.server.length > 0) &&
    settings.protocol === 'MB' &&
    settings.protocolVersion === '1'
  );
}

export function isValidScannedQrPayload(
  raw: string,
  options?: {
    defaultLocale?: string;
    availableLocales?: string[];
  },
): boolean {
  const normalized = normalizeScannedQr(raw);
  const params = new URLSearchParams(
    normalized.includes('?') ? normalized.slice(normalized.indexOf('?') + 1) : normalized,
  );
  if (params.get('p') !== 'MB') {
    return false;
  }
  const parsed = parseStorageConfigQr(normalized, options);
  return isValidQrSettings(parsed);
}
