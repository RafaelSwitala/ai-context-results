import { HttpProtocol, ConfigFilePayload, ConfigFileSettings } from '../types/storageConfig';
import {
  getCurrentConfigVersion,
  saveCurrentConfigVersion,
  saveLocale,
  saveSettingsPreferences,
  saveValidSettingsPreference,
} from './storageConfigStorage';

/** MAP-013, MAP-019, MAP-022 — BEH-009, STOR-010, ERRPATH-008 */

const CONFIG_FILE_PROTOCOL = 'FILE';

function parseProtocolValue(https: string): HttpProtocol {
  const parsed = Number.parseInt(https, 10);
  if (parsed === HttpProtocol.Http || parsed === HttpProtocol.Https || parsed === HttpProtocol.HttpsWithoutValidation) {
    return parsed;
  }
  return HttpProtocol.Https;
}

export function mapConfigFileToSettings(config: ConfigFilePayload): ConfigFileSettings {
  return {
    version: config.version,
    protocol: config.protocol,
    protocolVersion: config.protocolVersion,
    server: config.server,
    client: config.mandant ?? '',
    securityProtocol: parseProtocolValue(config.https),
    culture: config.culture,
    token: config.token,
    pin: config.pin,
  };
}

export function isValidConfigFileSettings(settings: ConfigFileSettings): boolean {
  return (
    settings.server.length > 0 &&
    settings.protocol === CONFIG_FILE_PROTOCOL &&
    settings.protocolVersion === '1'
  );
}

export type ConfigBootstrapResult = 'applied' | 'skipped' | 'not_present';

export async function applyBundledConfigIfNeeded(
  bundledConfig: ConfigFilePayload | null,
): Promise<ConfigBootstrapResult> {
  if (bundledConfig == null) {
    return 'not_present';
  }

  const settings = mapConfigFileToSettings(bundledConfig);
  if (!isValidConfigFileSettings(settings)) {
    return 'skipped';
  }

  const storedVersion = await getCurrentConfigVersion();
  if (storedVersion === settings.version) {
    return 'skipped';
  }

  await saveSettingsPreferences({
    server: settings.server,
    client: settings.client,
    protocol: settings.securityProtocol,
    token: settings.token,
    pin: settings.pin,
    locale: settings.culture,
  });
  await saveLocale(settings.culture);
  await saveValidSettingsPreference(true);
  await saveCurrentConfigVersion(settings.version);
  return 'applied';
}
