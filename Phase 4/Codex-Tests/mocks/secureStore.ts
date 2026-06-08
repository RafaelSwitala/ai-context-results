import { jest } from '@jest/globals';

export const secureStoreValues = new Map<string, string>();

export const getItemAsync = jest.fn((key: string) => Promise.resolve(secureStoreValues.get(key) ?? null));

export const setItemAsync = jest.fn((key: string, value: string) => {
  secureStoreValues.set(key, value);
  return Promise.resolve();
});

export function resetSecureStoreMock(): void {
  secureStoreValues.clear();
  getItemAsync.mockClear();
  setItemAsync.mockClear();
}
