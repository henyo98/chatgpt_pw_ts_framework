import { test as base, request, BrowserContext } from '@playwright/test';
import { TokenManager } from '@core/auth/tokenManager';
import { CookieManager } from '@core/auth/cookieManager';
import { users } from '@core/config/users.config';
import { BasePage } from '@core/base/BasePage';
import { URLS } from '@core/constants/urls';

const cookieManager = new CookieManager();
const tokenManager = new TokenManager(30_000);

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
  token: async ({ }, use, testInfo) => {
    const user = testInfo.project.name;
    const api = await request.newContext();
    const creds = users[user];

    const token = await tokenManager.getToken(user, async () => {
      const res = await api.post(`${URLS.api}/auth/login`, {
        data: { username: creds.username, password: creds.password }
      });
      const status = res.status();
      if (status < 200 || status >= 300) throw new Error(`Auth login failed ${status}: ${await res.text()}`);
      const body = await res.json();

      const t = (body.accessToken as string) || (body.token as string) || (body.access_token as string);
      const expiresIn = (body.expiresInSec as number) || (body.expires_in as number) || (body.expiresIn as number) || 3600;
      if (!t) throw new Error('Auth response did not include a token');

      return { token: t, expiresInSec: expiresIn };
    });

    await use(token);
    await api.dispose();
  }
});