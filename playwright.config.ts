import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './e2e', timeout: 45000, retries: process.env.CI ? 1 : 0,
  use: { baseURL: 'http://127.0.0.1:4173/paper-bazaar-3d_3/', headless: true, screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  webServer: { command: 'npm run preview -- --host 127.0.0.1 --port 4173 --base /paper-bazaar-3d_3/', url: 'http://127.0.0.1:4173/paper-bazaar-3d_3/', reuseExistingServer: !process.env.CI },
})
