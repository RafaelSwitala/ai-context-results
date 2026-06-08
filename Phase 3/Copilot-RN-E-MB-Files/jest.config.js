module.exports = {
  preset: 'jest-expo',

  testMatch: ['**/__tests__/**/*.test.ts?(x)'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo|expo-secure-store|@react-native-async-storage)/)',
  ],

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/__tests__/**',
  ],

  verbose: true,
};