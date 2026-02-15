import { request } from '@playwright/test';
import { users } from '@core/config/users.config';
import { ROLES } from '@core/constants/domain';
import { env } from '@core/env';
import { ENDPOINTS } from '@core/constants/endpoints';
import { BaseAPI } from '@core/base/BaseAPI';
import { authCsrfSchema } from '@api/schemas/authCsrf.schema';
import { logger } from '@core/loggers/logger';

async function globalSetup() {
  logger.info('GLOBAL SETUP STARTED');
  for (const ROLE of ROLES) {
    if (ROLE === 'guest') continue;

    if (!users[ROLE]) {

      throw new Error(`User config missing for role ${ROLE}`);
    }

    const baseURL = env.API_URL_PUBLIC
    const apiContext = await request.newContext({
    });
    const baseApi = new BaseAPI(apiContext)
    // const apiContext = await request.newContext({ baseURL: env.API_URL_PUBLIC });

    // 1. Get CSRF token
    const csrfResp = await baseApi.get(`${baseURL}${ENDPOINTS.csrf}`, authCsrfSchema);
    const csrfToken = csrfResp.csrfToken;
    logger.info(`Role '${ROLE}': Csrf token available`);
    // 2. Login via credentials callback
    await apiContext.post(`${baseURL}${ENDPOINTS.credentials}`, {
      form: {
        username: users[ROLE].username,
        password: users[ROLE].password,
        csrfToken: csrfToken,
      },
    });
    logger.info(`Role '${ROLE}': Login successful`);
    // 3. Save storage state
    await apiContext.storageState({ path: `cookie-storage/${ROLE}.json` });
    logger.info(`Role '${ROLE}': Storage state saved`);
    await apiContext.dispose();
  }
  logger.info('GLOBAL SETUP FINISHED');
}

export default globalSetup;
