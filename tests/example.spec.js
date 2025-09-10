// @ts-check
import { test, expect } from '@playwright/test';

test('I can navigate to the Website', async ({ page }) => {
  await page.goto('https://staging.beequip.com/');

  await expect(page.getByRole('link', { name: 'Vind je materieel' })).toBeVisible();
});
