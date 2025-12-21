// playwright.config.ts  // auth → ui-tests, HTML always; Allure enabled
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // Loads BASE_URL, USER, PASS

export default defineConfig({
  testDir: './src/tests',
  timeout: 40_000,
  expect: { timeout: 8_000 },

  // HTML always; Allure results captured (you can generate the static site when you need)
  reporter: [
    ['line'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results', suiteTitle: false }]
  ],

  use: {
    baseURL: process.env.BASE_URL,
    browserName: 'chromium',
    headless: true,
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    // 1) Auth bootstrap — creates storageState.json
    {
      name: 'auth',
      testMatch: ['**/setup/auth.setup.ts'],
      // use: {
      //   storageState: undefined
      // }
    },

    // 2) UI tests — reuse saved storageState.json
    {
      name: 'ui-tests',
      testMatch: ['**/e2e/**/*.spec.ts'],
      dependencies: ['auth'],
      // use: {
      //   storageState: 'storageState.json'
      // }
    }
  ]
});
