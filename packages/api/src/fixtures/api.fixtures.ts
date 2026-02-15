import base from '@playwright/test'
import { request } from '@playwright/test'
import { ZboroviAPI } from '@api/clients/zboroviApi';
import { APIClients } from '@api/clients/api-clients';
import { getAuthenticatedClient } from '@core/auth/getAuthenticatedClient';

// Extend base fixture
export const test = base.extend<{
    api: APIClients;
    getAuthenticatedApi: (role: string) => Promise<APIClients>;
}>({
    // Unauthenticated API
    api: async ({ }, use) => {
        const ctx = await request.newContext();
        await use({ zborovi: new ZboroviAPI(ctx) });
        await ctx.dispose();
    },
    // Authenticated API factory with automatic cleanup
    getAuthenticatedApi: async ({ }, use) => {
        // Track all clients created in a single test
        const clients: { context: any }[] = [];
        // Pass this function to the test
        await use(async (role: string) => {
            const client = await getAuthenticatedClient(role);
            clients.push(client);
            return client;
        });
        // After the test finishes, dispose all contexts automatically
        await Promise.all(clients.map(c => c.context.dispose()));
    },
});
