import { APIRequestContext, request } from '@playwright/test';
import { users } from '@core/config/users.config';
import { Role, ROLES } from '@core/constants/domain';
import { env } from '@core/env';
import { ENDPOINTS } from '@core/constants/endpoints';
import { BaseAPI } from '@core/base/BaseAPI';
import { authCsrfSchema } from '@api/schemas/authCsrf.schema';
import { logger } from '@core/loggers/logger';
import { fileExists } from '@core/utils/fileExists';

export async function fetchCsrfToken(
    baseApi: BaseAPI,
    baseURL: string,
    role: Role
): Promise<string> {
    const csrfResp = await baseApi.get(
        `${baseURL}${ENDPOINTS.csrf}`,
        authCsrfSchema
    );

    logger.info(`Role '${role}': Csrf token available`);
    return csrfResp.csrfToken;
}

async function loginAndSaveStorageState(
    apiContext: APIRequestContext,
    baseURL: string,
    role: Role,
    csrfToken: string,
    storagePath: string
): Promise<void> {
    await apiContext.post(`${baseURL}${ENDPOINTS.credentials}`, {
        form: {
            username: users[role].username,
            password: users[role].password,
            csrfToken,
        },
    });

    logger.info(`Role '${role}': Login successful`);

    await apiContext.storageState({ path: storagePath });
    logger.info(`Role '${role}': Storage state saved`);
}

async function setupRole(role: Role, baseURL: string): Promise<void> {
    if (role === 'guest') return;

    if (!users[role]) {
        throw new Error(`User config missing for role ${role}`);
    }

    const storagePath = `storage-states/${env.ENV}.${role}.json`;

    if (await fileExists(storagePath)) {
        logger.info(`Role '${role}': Storage state already exists, skipping`);
        return;
    }

    const apiContext = await request.newContext();
    const baseApi = new BaseAPI(apiContext);

    try {
        const csrfToken = await fetchCsrfToken(baseApi, baseURL, role);
        await loginAndSaveStorageState(
            apiContext,
            baseURL,
            role,
            csrfToken,
            storagePath
        );
    } finally {
        await apiContext.dispose();
    }
}

async function globalSetup(): Promise<void> {
    logger.info('GLOBAL SETUP STARTED');

    const baseURL = env.API_URL_PUBLIC;

    await Promise.all(
        ROLES.map((role) => setupRole(role, baseURL))
    );

    logger.info('GLOBAL SETUP FINISHED');
}

export default globalSetup;
