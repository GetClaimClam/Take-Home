import { test, expect, Page, ConsoleMessage } from '@playwright/test';

test('homepage has correct title', async ({ page }: { page: Page }) => {
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check that the page has loaded with the correct title
  const title = await page.title();
  expect(title).toContain('Chariot Claims - Get the money you deserve');
});

test('homepage loads without errors', async ({ page }: { page: Page }) => {
  await page.goto('/');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Check for error messages in console logs
  const consoleLogs: string[] = [];
  page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() === 'error') {
      consoleLogs.push(msg.text());
    }
  });
  
  // Verify no error logs were captured
  expect(consoleLogs.length).toBe(0);
});
