import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '.env'), override: true });
export default defineConfig({
  testDir: "./tests",
  timeout: 15000,
  expect: {
    timeout: 20000
  },
  reporter: [['html'], ['junit', { outputFile: './playwright-report/results.xml' }], ['list']],
  use: {
    actionTimeout: 100000,
    navigationTimeout: 100000,
    headless: false,
    // retries: 1,
    trace: 'on-first-retry',

    //apptype : "fd1" as string,
    baseURL: process.env.BASE_URL,
  },
  projects: [
    {
      name: 'Chromium',
      use: {
          ...devices['Desktop Chrome'],
          viewport: { width: 1920, height: 1080 },
          navigationTimeout: 100000,
      },
    }
  ],
});
