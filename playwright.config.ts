import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const testURL = process.env.TEST_URL || 'https://localhost:3601';
const config: PlaywrightTestConfig = {
  webServer: {
    command: 'yarn start:bootstrap-independent',
    url: 'https://localhost:3601/?navigation',
    ignoreHTTPSErrors: true,
    timeout: 600000,
  },
  use: {
    headless: true,
    trace: !process.env.CI ? 'retain-on-failure' : 'off',
    ignoreHTTPSErrors: true,
    browserName: 'chromium',
    locale: 'ru',
    timezoneId: 'Europe/Moscow',
    launchOptions: {
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--start-maximized'],
    },
    baseURL: testURL,
    actionTimeout: 5_000,
    screenshot: !process.env.CI ? 'only-on-failure' : 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '__tests__/utils/data/local-storage/configuratorLocalStorage.json',
      },
      expect: { timeout: 5_000 },
      testDir: '__tests__/specs',
      fullyParallel: true,
    },
  ],
  reporter: process.env.CI
    ? [['junit', { outputFile: 'results.xml' }], ['list']]
    : [['html', { open: 'never' }], ['list']],
  timeout: 120_000,
  workers: 2,
  retries: 1,
  forbidOnly: !!process.env.CI,
};

export default config;
