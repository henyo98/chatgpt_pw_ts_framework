import { Page } from "@playwright/test";

export async function waitForLoadState(page: Page) {
    await page.waitForLoadState('load');
}
