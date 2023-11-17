/**
 * Untuk penjelasan rinci tentang setiap properti konfigurasi, kunjungi:
 * https://jestjs.io/docs/configuration
 */

/** @typedef {import('jest').Config.InitialOptions} JestConfig */

/** @type {JestConfig} */
const config = {
  // Pola glob yang digunakan Jest untuk mendeteksi file tes
  testMatch: [
    '**/tests/**/*.test.[jt]s',
  ],

  // Pemetaan dari ekspresi reguler ke paths untuk transformers
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest',
  },

  testEnvironment: 'jsdom',
};

module.exports = config;
