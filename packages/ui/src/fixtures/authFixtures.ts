import { test as base, request, BrowserContext } from '@playwright/test';
import { TokenManager } from '@core/auth/tokenManager';
import { CookieManager } from '@core/auth/cookieManager';
import { users } from '@core/config/users.config';
import { BasePage } from '@core/base/BasePage';

const cookieManager = new CookieManager();
const tokenManager = new TokenManager();

export const test = base.extend<{
  authContext: BrowserContext;
  page: any;
  token: string;
}>({
  authContext: async ({ browser }, use, testInfo) => {
    const user = testInfo.project.name;
    const context = await browser.newContext();
    await cookieManager.load(user, context);
    await use(context);
    await cookieManager.save(user, context);
    await context.close();
  },
  page: async ({ authContext }, use, testInfo) => {
    const user = testInfo.project.name;
    const page = await BasePage.forUser(user, authContext);
    await use(page);
  },
  token: async ({}, use, testInfo) => {
    const user = testInfo.project.name;
    const api = await request.newContext();
    const creds = users[user];
    const token = await tokenManager.getToken(user, async () => ({ token: creds.username, expiresInSec: 3600 }));
    await use(token);
    await api.dispose();
  }
});