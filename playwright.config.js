import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  reporter: [['html'], ['junit', { outputFile: './playwright-report/results.xml' }], ['list']],
  use: {
    baseURL: process.env.BASE_URL
  },
  projects: [
    {
      name: 'Chromium',
      use: {
          ...devices['Desktop Chrome'],
          viewport: { width: 1920, height: 1080 },
      },
    }
  ],
});
