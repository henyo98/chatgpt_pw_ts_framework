import { Page, BrowserContext } from '@playwright/test';

export class BasePage {
    private static pages = new Map<string, Page>();

    protected page: Page;

    protected constructor(page: Page) {
        this.page = page;
    }

    /**
     * Get or create a shared page for a user.
     * The first call creates a page. Later calls reuse it.
     */
    static async forUser(user: string, context: BrowserContext): Promise<Page> {
        const existing = this.pages.get(user);
        if (existing && !existing.isClosed()) return existing;

        const page = await context.newPage();
        this.pages.set(user, page);
        return page;
    }

    /**
     * Allows tests/fixtures to explicitly open a new page when they want.
     */
    static async newPage(context: BrowserContext): Promise<Page> {
        return context.newPage();
    }

    goto(url: string) { return this.page.goto(url); }
}