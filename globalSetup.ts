import { request } from '@playwright/test';
import { users } from '@core/config/users.config';
import { ROLES } from '@core/constants/domain';
import { env } from '@core/env';
import { ENDPOINTS } from '@core/constants/endpoints';

async function globalSetup() {
  for (const ROLE of ROLES) {
    if (ROLE === 'guest') break;
    
    if (!users[ROLE]) {
      throw new Error(`User config missing for role ${ROLE}`);
    }

    const apiContext = await request.newContext({ baseURL: env.BASE_URL }); //

    // 1. Get CSRF token
    const csrfResp = await apiContext.get(ENDPOINTS.csrf);
    const { csrfToken } = await csrfResp.json();

    // 2. Login via credentials callback
    await apiContext.post(ENDPOINTS.credentials, {
      form: {
        username: users[ROLE].username,
        password: users[ROLE].password,
        csrfToken: csrfToken,
      },
    });

    // 3. Save storage state
    await apiContext.storageState({ path: `@core/src/storage/${users[ROLE].username}.json` });
    await apiContext.dispose();
  }
}

export default globalSetup;
