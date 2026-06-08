import { jest } from '@jest/globals';

export const asyncStorageValues = new Map<string, string>();

const AsyncStorage = {
  getItem: jest.fn((key: string) => Promise.resolve(asyncStorageValues.get(key) ?? null)),
  setItem: jest.fn((key: string, value: string) => {
    asyncStorageValues.set(key, value);
    return Promise.resolve();
  }),
  removeItem: jest.fn((key: string) => {
    asyncStorageValues.delete(key);
    return Promise.resolve();
  }),
  clear: jest.fn(() => {
    asyncStorageValues.clear();
    return Promise.resolve();
  }),
};

export function resetAsyncStorageMock(): void {
  asyncStorageValues.clear();
  AsyncStorage.getItem.mockClear();
  AsyncStorage.setItem.mockClear();
  AsyncStorage.removeItem.mockClear();
  AsyncStorage.clear.mockClear();
}

export default AsyncStorage;
