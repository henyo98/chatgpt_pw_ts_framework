import { test, expect } from '../fixtures/authFixtures';
import { withUsers } from '../fixtures/withUsers';

withUsers(['user','zboradmin'] as any, (role) => {
  test(`@smoke ${role} can see dashboard`, async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
  });
});