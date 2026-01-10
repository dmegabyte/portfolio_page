
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8000', 
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
     // FIX: Тестируем собранное приложение из папки dist, как указано в разделе 🛠️ Процесс разработки README.md
     command: 'npx serve -s dist -l 8000',
     url: 'http://localhost:8000',
     reuseExistingServer: !process.env.CI,
     stdout: 'ignore',
     stderr: 'pipe',
   },
});
