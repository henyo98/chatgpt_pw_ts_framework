import { defineConfig, devices } from '@playwright/test';
import { env } from '@core/env';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './packages', // or maybe: testDir: 'packages', 
  timeout: 10_000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['allure-playwright', { outputFolder: 'reports/allure-results' }],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['junit', { outputFile: 'reports/junit.xml' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: env.BASE_URL,
    screenshot: env.ENABLE_MEDIA === 'true' ? 'only-on-failure' : 'off',
    video: env.ENABLE_MEDIA === 'true' ? 'retain-on-failure' : 'off',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: env.ENABLE_MEDIA === 'true' ? 'retain-on-failure' : 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'user', use: { storageState: undefined } },
    { name: 'zboradmin', use: { storageState: undefined } },
    { name: 'superadmin', use: { storageState: undefined } },
    {
      name: 'UI Tests',
      testDir: './src/ui/tests',
    },
    {
      name: 'API Tests',
      testDir: './src/api/tests',
    },
    {
      name: 'DB Tests',
      testDir: './src/db/tests',
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
