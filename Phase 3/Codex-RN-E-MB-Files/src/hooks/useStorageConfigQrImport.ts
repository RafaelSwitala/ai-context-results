import { useCallback, useState } from 'react';

import { EditableStorageConfigValues } from '../types/storageConfig';
import { isValidQrSettings, parseStorageConfigQr } from '../utils/storageConfigQr';

export type QrImportResult =
  | { ok: true; values: Partial<EditableStorageConfigValues> }
  | { ok: false; error: 'invalid-qr' };

export function useStorageConfigQrImport(options: { availableCultures?: readonly string[]; defaultCulture?: string } = {}) {
  const [lastError, setLastError] = useState<string | null>(null);

  const importQr = useCallback(
    (scannedValue: string): QrImportResult => {
      const parsed = parseStorageConfigQr(scannedValue, options);
      if (!isValidQrSettings(parsed)) {
        setLastError('invalid-qr');
        return { ok: false, error: 'invalid-qr' };
      }

      setLastError(null);
      return {
        ok: true,
        values: {
          server: parsed.server ?? '',
          client: parsed.client ?? '',
          token: parsed.token ?? '',
          pin: parsed.pin ?? '',
          protocol: parsed.protocol,
          locale: parsed.culture,
        },
      };
    },
    [options],
  );

  return { importQr, lastError };
}
