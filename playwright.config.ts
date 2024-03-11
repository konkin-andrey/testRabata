import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  timeout: 25000,
  fullyParallel: true,
  expect: {
    timeout: 25000
  },
  reporter: [["line"], ["allure-playwright"]],
  use: {
    actionTimeout: 100000,
    navigationTimeout: 100000,
    headless: false,
    // retries: 1,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Chromium',
      use: {
          ...devices['Desktop Chrome'],
          viewport: { width: 1920, height: 1080 },
          navigationTimeout: 100000,
          settings: {
            mail: process.env.MAILOSAUR_SERVER_1 as string,
            //mozilaMail: process.env.MAILOSAUR_SERVER_2 as string
          }
      } as any,
    },
    {
      name: 'Mozila',
      use: {
          ...devices['Desktop Firefox'],
          viewport: { width: 1920, height: 1080 },
          navigationTimeout: 100000,
          settings: {
            //chromeMail: process.env.MAILOSAUR_SERVER_1 as string,
            mail: process.env.MAILOSAUR_SERVER_2 as string
          }
      },
    }
  ],
});
