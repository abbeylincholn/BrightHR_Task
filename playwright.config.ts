import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 1,
  timeout: 40_000,
  expect: { timeout: 8_000 },
  reporter: [['line'], ['github'], ['html'], ['allure-playwright']],
  use: {
    headless: true,
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'safari',  use: { browserName: 'webkit'  } }
  ]
});
