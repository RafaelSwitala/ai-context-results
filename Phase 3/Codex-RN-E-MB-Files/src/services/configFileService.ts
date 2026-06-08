import { ConfigFileValues, HttpProtocol, isHttpProtocol } from '../types/storageConfig';
import {
  loadStorageConfig,
  saveCurrentConfigVersion,
  saveLocale,
  saveSettingsPreferences,
  saveValidSettingsPreference,
} from './storageConfigStorage';

type RawConfigFile = {
  version?: unknown;
  protocol?: unknown;
  protocolVersion?: unknown;
  mandant?: unknown;
  server?: unknown;
  https?: unknown;
  token?: unknown;
  pin?: unknown;
  culture?: unknown;
};

function asString(value: unknown): string | null {
  return typeof value === 'string' ? value : null;
}

function parseProtocol(value: unknown): HttpProtocol {
  const protocol = Number(value);
  return isHttpProtocol(protocol) ? protocol : HttpProtocol.Https;
}

export function parseConfigFile(json: string): ConfigFileValues | null {
  try {
    const raw = JSON.parse(json) as RawConfigFile;
    return {
      version: asString(raw.version),
      protocolName: asString(raw.protocol),
      protocolVersion: asString(raw.protocolVersion),
      server: asString(raw.server),
      client: asString(raw.mandant),
      token: asString(raw.token),
      pin: asString(raw.pin),
      culture: asString(raw.culture),
      protocol: parseProtocol(raw.https),
    };
  } catch {
    return null;
  }
}

export function isValidConfigFile(settings: ConfigFileValues | null): settings is ConfigFileValues {
  return Boolean(settings?.server && settings.protocolName === 'FILE' && settings.protocolVersion === '1');
}

export async function applyConfigFileIfNewer(json: string | null | undefined): Promise<boolean> {
  if (!json) {
    return false;
  }

  const config = parseConfigFile(json);
  if (!isValidConfigFile(config) || !config.version) {
    return false;
  }

  const current = await loadStorageConfig();
  if (current.currentConfigVersion === config.version) {
    return false;
  }

  await saveSettingsPreferences({
    server: config.server ?? '',
    client: config.client ?? '',
    token: config.token ?? '',
    pin: config.pin ?? '',
    protocol: config.protocol,
  });
  await saveLocale(config.culture);
  await saveCurrentConfigVersion(config.version);
  await saveValidSettingsPreference(true);

  return true;
}
