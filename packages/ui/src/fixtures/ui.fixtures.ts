import base from '@playwright/test';
import { BrowserContext, Page } from '@playwright/test';

export const test = base.extend<{
    uiContext: BrowserContext;
    uiPage: Page;

    uiContextUnauthenticated: BrowserContext;
    uiPageUnauthenticated: Page;

    getAuthenticatedPage: (role: string) => Promise<{ context: BrowserContext; page: Page }>;
    getUnauthenticatedPage: () => Promise<{ context: BrowserContext; page: Page }>;
}>({
    // -----------------------------
    // Authenticated UI context
    // -----------------------------
    uiContext: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: 'storageStates/default.json',
        });

        await use(context);
        await context.close();
    },

    uiPage: async ({ uiContext }, use) => {
        const page = await uiContext.newPage();
        await use(page);
        await page.close();
    },

    // -----------------------------
    // Unauthenticated UI context
    // -----------------------------
    uiContextUnauthenticated: async ({ browser }, use) => {
        const context = await browser.newContext(); // no storageState

        await use(context);
        await context.close();
    },

    uiPageUnauthenticated: async ({ uiContextUnauthenticated }, use) => {
        const page = await uiContextUnauthenticated.newPage();
        await use(page);
        await page.close();
    },

    // -----------------------------
    // Role-based authenticated factory
    // -----------------------------
    getAuthenticatedPage: async ({ browser }, use) => {
        const contexts: BrowserContext[] = [];

        await use(async (role: string) => {
            const context = await browser.newContext({
                storageState: `storageStates/${role}.json`,
            });

            const page = await context.newPage();
            contexts.push(context);

            return { context, page };
        });

        await Promise.all(contexts.map(ctx => ctx.close()));
    },

    // -----------------------------
    // Unauthenticated factory
    // -----------------------------
    getUnauthenticatedPage: async ({ browser }, use) => {
        const contexts: BrowserContext[] = [];

        await use(async () => {
            const context = await browser.newContext();
            const page = await context.newPage();

            contexts.push(context);
            return { context, page };
        });

        await Promise.all(contexts.map(ctx => ctx.close()));
    },
});
