module.exports = {
  testEnvironment: 'node',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testMatch: ['**/__tests__/**/*.test.ts?(x)'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['babel-preset-expo'] }],
  },

  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo|expo-secure-store|expo-modules-core|@react-native-async-storage)/)',
  ],

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/__tests__/**',
  ],

  verbose: true,
};
