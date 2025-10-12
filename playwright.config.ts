
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8000', // Assuming the app is served locally for tests
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // This command is illustrative. In a real CI/CD, you would serve the static files.
  // For local testing, you can run a static server in a separate terminal.
  // Example: `npx serve -s . -l 8000`
  webServer: {
     command: 'npx serve -s . -l 8000',
     url: 'http://localhost:8000',
     reuseExistingServer: !process.env.CI,
     stdout: 'ignore',
     stderr: 'pipe',
   },
});
